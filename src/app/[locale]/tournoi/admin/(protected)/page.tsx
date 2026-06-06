import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import LiveToggle from '@/components/admin/LiveToggle';
import DangerZone from '@/components/admin/DangerZone';

export default async function AdminDashboardPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const session = await auth();

  await prisma.$executeRaw`INSERT INTO config (id, "liveVisible") VALUES ('main', false) ON CONFLICT (id) DO NOTHING`;
  const [nbEquipes, nbMatchs, nbEnCours, nbTermines, configRows] = await Promise.all([
    prisma.equipe.count(),
    prisma.match.count(),
    prisma.match.count({ where: { statut: 'EN_COURS' } }),
    prisma.match.count({ where: { statut: 'TERMINE' } }),
    prisma.$queryRaw<{ liveVisible: boolean }[]>`SELECT "liveVisible" FROM config WHERE id = 'main'`,
  ]);
  const config = { liveVisible: configRows[0]?.liveVisible ?? false };

  const stats = [
    { label: 'Équipes', value: nbEquipes, note: '/ 8', accent: '#7FA8C9' },
    { label: 'Matchs', value: nbMatchs, note: 'total', accent: '#A6ADB9' },
    { label: 'En cours', value: nbEnCours, note: 'live', accent: '#E63946' },
    { label: 'Terminés', value: nbTermines, note: 'matchs', accent: '#5C6577' },
  ];

  const shortcuts = [
    { href: `/${locale}/tournoi/admin/equipes`, label: 'Équipes', desc: 'Ajouter, modifier, assigner aux groupes' },
    { href: `/${locale}/tournoi/admin/groupes`, label: 'Groupes', desc: 'Déplacer les équipes entre les groupes' },
    { href: `/${locale}/tournoi/admin/matchs`, label: 'Matchs', desc: 'Scores, statuts, créer des rencontres' },
    { href: `/${locale}/tournoi/admin/archives`, label: 'Archives', desc: 'Tournois passés — lecture seule' },
    { href: `/${locale}/tournoi`, label: 'Vue publique ↗', desc: 'Voir la page live scores' },
  ];

  return (
    <div className="px-3 py-4 sm:px-6 sm:py-6 lg:p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <p className="font-mono text-[10px] tracking-[0.2em] mb-2" style={{ color: 'rgba(166,173,185,0.5)' }}>
          TOURNOI · 7 JUIN 2026
        </p>
        <h1 className="font-display text-paper" style={{ fontSize: 'clamp(28px, 7vw, 48px)' }}>DASHBOARD</h1>
        <p className="font-mono text-[11px] mt-1" style={{ color: 'rgba(166,173,185,0.35)' }}>
          {session?.user?.email}
        </p>
      </div>

      {/* Live toggle */}
      <LiveToggle initial={config.liveVisible} />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-0.5 mb-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="p-4 sm:p-6"
            style={{ background: '#0A1829', borderTop: `2px solid ${s.accent}` }}
          >
            <div className="font-display leading-none mb-1" style={{ fontSize: 'clamp(36px, 8vw, 56px)', color: s.accent }}>
              {s.value}
            </div>
            <div className="font-mono text-[10px] tracking-[0.16em]" style={{ color: 'rgba(166,173,185,0.5)' }}>
              {s.label.toUpperCase()}
            </div>
            <div className="font-mono text-[10px]" style={{ color: 'rgba(166,173,185,0.25)' }}>{s.note}</div>
          </div>
        ))}
      </div>

      {/* Live banner */}
      {nbEnCours > 0 && (
        <div
          className="mb-8 px-6 py-4 flex items-center gap-3"
          style={{ background: 'rgba(230,57,70,0.08)', border: '1px solid rgba(230,57,70,0.25)', borderLeft: '3px solid #E63946' }}
        >
          <span className="w-2 h-2 rounded-full bg-live animate-live-pulse shrink-0" />
          <p className="font-sans text-[14px] font-semibold" style={{ color: '#FAF6EC' }}>
            {nbEnCours} match{nbEnCours > 1 ? 's' : ''} en cours
          </p>
          <Link
            href={`/${locale}/tournoi/admin/matchs`}
            className="ml-auto font-mono text-[11px] tracking-[0.1em]"
            style={{ color: 'rgba(230,57,70,0.7)' }}
          >
            GÉRER →
          </Link>
        </div>
      )}

      {/* Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5 mb-10">
        {shortcuts.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group flex flex-col gap-1 p-4 sm:p-6 transition-colors"
            style={{ background: '#0A1829', border: '1px solid rgba(250,246,236,0.06)' }}
          >
            <p
              className="font-display text-paper transition-colors group-hover:text-sun"
              style={{ fontSize: 24 }}
            >
              {s.label.toUpperCase()}
            </p>
            <p className="font-sans text-[13px]" style={{ color: 'rgba(166,173,185,0.45)' }}>{s.desc}</p>
          </Link>
        ))}
      </div>

      {/* Danger zone */}
      <div>
        <p className="font-mono text-[10px] tracking-[0.2em] mb-3" style={{ color: 'rgba(166,173,185,0.25)' }}>
          DANGER ZONE
        </p>
        <DangerZone locale={locale} />
      </div>
    </div>
  );
}
