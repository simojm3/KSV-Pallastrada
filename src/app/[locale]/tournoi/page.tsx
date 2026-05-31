import { getTranslations, setRequestLocale } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import { computeStandings } from '@/lib/standings';
import LiveScoreBoard from '@/components/tournoi/LiveScoreBoard';
import TournoiWaiting from '@/components/tournoi/TournoiWaiting';
import type { TournoiData, Match } from '@/types/tournoi';

export const revalidate = 0;

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'tournoi' });
  return { title: `${t('title')} — KSV Pallastrada` };
}

async function getTournoiData(): Promise<TournoiData> {
  const [groupes, allGroupMatchs, matchsFinale] = await Promise.all([
    prisma.groupe.findMany({
      include: { equipes: true },
      orderBy: { nom: 'asc' },
    }),
    prisma.match.findMany({
      where: { phase: 'GROUPES' },
      include: { equipeDomicile: true, equipeExterieur: true },
      orderBy: [{ ordre: 'asc' }, { heure: 'asc' }],
    }),
    prisma.match.findMany({
      where: { phase: { in: ['DEMI_FINALE', 'TROISIEME_PLACE', 'FINALE'] } },
      include: { equipeDomicile: true, equipeExterieur: true },
      orderBy: [{ phase: 'asc' }, { ordre: 'asc' }],
    }),
  ]);

  return {
    groupes: groupes.map((g) => {
      const teamIds = new Set(g.equipes.map((e) => e.id));
      const matchs = allGroupMatchs.filter((m) => teamIds.has(m.equipeDomicileId)) as unknown as Match[];
      return { ...g, matchs, standings: computeStandings(g.equipes, matchs) };
    }),
    matchsFinale: matchsFinale as unknown as Match[],
    lastUpdated: new Date().toISOString(),
  };
}

export default async function TournoiPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'tournoi' });

  // Ensure config table + default row exist (resilient against dropped table)
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS config (
      id TEXT PRIMARY KEY,
      "liveVisible" BOOLEAN NOT NULL DEFAULT false
    )
  `).catch(() => {});
  await prisma.$executeRaw`INSERT INTO config (id, "liveVisible") VALUES ('main', false) ON CONFLICT (id) DO NOTHING`.catch(() => {});

  const [configRows, initialData] = await Promise.all([
    prisma.$queryRaw<{ liveVisible: boolean }[]>`SELECT "liveVisible" FROM config WHERE id = 'main'`.catch(() => []),
    getTournoiData().catch(() => undefined),
  ]);
  const config = { liveVisible: configRows[0]?.liveVisible ?? false };

  // Show waiting page (video + countdown) until admin activates live view
  if (!config.liveVisible) {
    return <TournoiWaiting locale={locale} />;
  }

  const hasLiveServer =
    initialData?.groupes.some((g: { matchs: Match[] }) => g.matchs.some((m: Match) => m.statut === 'EN_COURS')) ||
    initialData?.matchsFinale.some((m: Match) => m.statut === 'EN_COURS');

  return (
    <div style={{ background: '#06101F', minHeight: '100vh' }}>
      {/* ── Hero header ── */}
      <div className="px-5 pt-14 pb-10 sm:px-14 sm:pt-16 sm:pb-12" style={{ background: '#0A1829', borderBottom: '1px solid rgba(250,246,236,0.07)' }}>
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-5">
              {hasLiveServer && (
                <span
                  className="flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] font-bold px-2.5 py-1.5 text-white"
                  style={{ background: '#E63946' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-live-pulse" />
                  LIVE
                </span>
              )}
              <span className="font-mono text-[11px] tracking-[0.12em] text-stone-l">7 JUIN 2026 · BERNE</span>
            </div>
            <h1
              className="font-display text-paper leading-none"
              style={{ fontSize: 'clamp(56px, 10vw, 120px)' }}
            >
              {t('title').toUpperCase()}
            </h1>
            <p className="font-sans mt-3" style={{ fontSize: 15, color: 'rgba(166,173,185,0.7)' }}>
              2 groupes · 6 équipes · Phase finale · Résultats en direct
            </p>
          </div>
        </div>
      </div>

      {/* ── Live content ── */}
      <LiveScoreBoard fallbackData={initialData} />
    </div>
  );
}
