import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ArchiveTeam { id: string; nom: string }
interface ArchiveBut { id: string; matchId: string; equipeId: string; minute: number | null; buteur: string | null }
interface ArchiveMatch {
  id: string;
  equipeDomicile: ArchiveTeam;
  equipeExterieur: ArchiveTeam;
  equipeDomicileId: string;
  equipeExterieId: string;
  scoreDomicile: number | null;
  scoreExterieur: number | null;
  statut: string;
  phase: string;
  heure: string | null;
  terrain: string | null;
  ordre: number | null;
  buts: ArchiveBut[];
}
interface ArchiveStanding {
  equipe: ArchiveTeam;
  joues: number; gagnes: number; nuls: number; perdus: number;
  buts_pour: number; buts_contre: number; diff: number; points: number;
}
interface ArchiveGroupe {
  id: string; nom: string;
  equipes: ArchiveTeam[];
  matchs: ArchiveMatch[];
  standings: ArchiveStanding[];
}
interface ArchiveData {
  groupes: ArchiveGroupe[];
  matchsFinale: ArchiveMatch[];
  champion: ArchiveTeam | null;
  runnerUp: ArchiveTeam | null;
  thirdPlace: ArchiveTeam | null;
  archivedAt: string;
}

const PHASE_LABELS: Record<string, string> = {
  GROUPES: 'Group stage',
  DEMI_FINALE: 'Semi-final',
  TROISIEME_PLACE: '3rd place',
  FINALE: 'Final',
};
const PHASE_ORDER = ['DEMI_FINALE', 'TROISIEME_PLACE', 'FINALE'];

export default async function ArchiveDetailPage({
  params,
}: {
  params: { locale: string; id: string };
}) {
  const { locale, id } = params;
  await auth();

  let archive: { id: string; nom: string; created_at: string; data: ArchiveData } | null = null;
  try {
    const rows = await prisma.$queryRaw<{ id: string; nom: string; created_at: string; data: ArchiveData }[]>`
      SELECT id, nom, created_at, data FROM archives WHERE id = ${id}
    `;
    archive = rows[0] ?? null;
  } catch { /* */ }

  if (!archive) notFound();

  const { data } = archive;
  const date = new Date(archive.created_at).toLocaleDateString('fr-CH', {
    day: '2-digit', month: 'long', year: 'numeric',
  });

  const finaleMatch = data.matchsFinale.find((m) => m.phase === 'FINALE');

  return (
    <div className="p-6 sm:p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/${locale}/tournoi/admin/archives`}
          className="font-mono text-[10px] tracking-[0.16em] mb-4 inline-block transition-opacity hover:opacity-60"
          style={{ color: 'rgba(166,173,185,0.4)' }}
        >
          ← ARCHIVES
        </Link>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-display text-paper" style={{ fontSize: 40 }}>{archive.nom.toUpperCase()}</h1>
            <p className="font-mono text-[11px] mt-1" style={{ color: 'rgba(166,173,185,0.4)' }}>{date}</p>
          </div>
          <span
            className="font-mono text-[10px] tracking-[0.14em] px-3 py-1.5"
            style={{ border: '1px solid rgba(166,173,185,0.2)', color: 'rgba(166,173,185,0.4)' }}
          >
            READ-ONLY ARCHIVE
          </span>
        </div>
      </div>

      {/* Podium */}
      {data.champion && (
        <section className="mb-12 p-6 sm:p-8" style={{ background: 'rgba(6,16,31,0.6)', border: '1px solid rgba(232,162,60,0.2)', borderTop: '2px solid #E8A23C' }}>
          <p className="font-mono text-[10px] tracking-[0.2em] mb-6" style={{ color: 'rgba(166,173,185,0.4)' }}>FINAL STANDINGS</p>
          <div className="flex items-end justify-center gap-4 sm:gap-8 mb-6">
            {/* 2nd */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl sm:text-3xl">🥈</span>
              <div className="flex items-end justify-center px-3 sm:px-5" style={{ height: 80, background: 'rgba(250,246,236,0.04)', border: '1px solid rgba(250,246,236,0.08)', borderBottom: 'none' }}>
                <p className="font-display text-center pb-2" style={{ fontSize: 'clamp(10px, 2vw, 15px)', color: 'rgba(250,246,236,0.6)' }}>
                  {data.runnerUp?.nom.toUpperCase()}
                </p>
              </div>
            </div>
            {/* 1st */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl sm:text-4xl">🥇</span>
              <div className="flex items-end justify-center px-4 sm:px-8" style={{ height: 120, background: 'rgba(232,162,60,0.12)', border: '1px solid rgba(232,162,60,0.3)', borderBottom: 'none' }}>
                <p className="font-display text-center pb-2 font-bold" style={{ fontSize: 'clamp(12px, 2.5vw, 18px)', color: '#E8A23C' }}>
                  {data.champion.nom.toUpperCase()}
                </p>
              </div>
            </div>
            {/* 3rd */}
            {data.thirdPlace && (
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl sm:text-3xl">🥉</span>
                <div className="flex items-end justify-center px-3 sm:px-5" style={{ height: 56, background: 'rgba(250,246,236,0.02)', border: '1px solid rgba(250,246,236,0.06)', borderBottom: 'none' }}>
                  <p className="font-display text-center pb-2" style={{ fontSize: 'clamp(10px, 2vw, 14px)', color: 'rgba(250,246,236,0.45)' }}>
                    {data.thirdPlace.nom.toUpperCase()}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div style={{ borderTop: '2px solid rgba(250,246,236,0.08)' }} />
          {finaleMatch && (
            <div className="flex items-center justify-center gap-4 mt-4">
              <span className="font-sans text-sm" style={{ color: 'rgba(250,246,236,0.5)' }}>{finaleMatch.equipeDomicile.nom}</span>
              <span className="font-display tabular-nums" style={{ fontSize: 28, color: '#FAF6EC' }}>
                {finaleMatch.scoreDomicile} – {finaleMatch.scoreExterieur}
              </span>
              <span className="font-sans text-sm" style={{ color: 'rgba(250,246,236,0.5)' }}>{finaleMatch.equipeExterieur.nom}</span>
            </div>
          )}
        </section>
      )}

      {/* Group standings */}
      {data.groupes.map((g) => (
        <section key={g.id} className="mb-10">
          <h2 className="font-mono text-[10px] tracking-[0.2em] mb-3" style={{ color: 'rgba(166,173,185,0.4)' }}>{g.nom.toUpperCase()}</h2>
          <div style={{ border: '1px solid rgba(250,246,236,0.07)' }}>
            {/* Standings table */}
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(250,246,236,0.06)', background: '#06101F' }}>
                  {['TEAM','J','G','N','P','BP','BC','+/-','PTS'].map((h) => (
                    <th key={h} className="font-mono text-[9px] tracking-[0.14em] px-3 py-2 text-left" style={{ color: 'rgba(166,173,185,0.4)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {g.standings.map((row, i) => (
                  <tr key={row.equipe.id} style={{ background: i % 2 === 0 ? '#0A1829' : '#081522', borderBottom: '1px solid rgba(250,246,236,0.04)' }}>
                    <td className="font-sans text-[13px] px-3 py-2.5" style={{ color: i < 2 ? '#FAF6EC' : 'rgba(250,246,236,0.5)' }}>{row.equipe.nom}</td>
                    {[row.joues, row.gagnes, row.nuls, row.perdus, row.buts_pour, row.buts_contre, row.diff].map((v, j) => (
                      <td key={j} className="font-mono text-[11px] tabular-nums px-3 py-2.5" style={{ color: 'rgba(166,173,185,0.5)' }}>{v}</td>
                    ))}
                    <td className="font-mono text-[12px] tabular-nums font-bold px-3 py-2.5" style={{ color: '#E8A23C' }}>{row.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Matches */}
            {g.matchs.map((m) => (
              <ArchiveMatchRow key={m.id} match={m} />
            ))}
          </div>
        </section>
      ))}

      {/* Knockout */}
      {data.matchsFinale.length > 0 && (
        <section className="mb-10">
          <h2 className="font-mono text-[10px] tracking-[0.2em] mb-3" style={{ color: 'rgba(166,173,185,0.4)' }}>KNOCKOUT STAGE</h2>
          <div className="flex flex-col gap-2">
            {PHASE_ORDER.flatMap((phase) =>
              data.matchsFinale
                .filter((m) => m.phase === phase)
                .map((m) => (
                  <div key={m.id}>
                    <p className="font-mono text-[9px] tracking-[0.16em] mb-1 mt-2" style={{ color: 'rgba(166,173,185,0.3)' }}>
                      {PHASE_LABELS[phase]?.toUpperCase()}
                    </p>
                    <ArchiveMatchRow match={m} />
                  </div>
                ))
            )}
          </div>
        </section>
      )}
    </div>
  );
}

function ArchiveMatchRow({ match }: { match: ArchiveMatch }) {
  const hasScore = match.scoreDomicile !== null && match.scoreExterieur !== null;
  const heure = match.heure
    ? new Date(match.heure).toLocaleTimeString('fr-CH', { hour: '2-digit', minute: '2-digit' })
    : null;
  const domLead = hasScore && match.scoreDomicile! > match.scoreExterieur!;
  const extLead = hasScore && match.scoreExterieur! > match.scoreDomicile!;

  return (
    <div className="flex items-center gap-3 px-4 py-3" style={{ borderTop: '1px solid rgba(250,246,236,0.04)', background: '#0A1829' }}>
      {heure && <span className="font-mono text-[10px] w-10 shrink-0" style={{ color: 'rgba(166,173,185,0.3)' }}>{heure}</span>}
      <span className="flex-1 text-right font-sans text-[13px] truncate" style={{ color: domLead ? '#FAF6EC' : 'rgba(250,246,236,0.45)' }}>
        {match.equipeDomicile.nom}
      </span>
      <span className="font-display tabular-nums shrink-0 min-w-[56px] text-center" style={{ fontSize: 20, color: hasScore ? '#FAF6EC' : 'rgba(250,246,236,0.15)' }}>
        {hasScore ? `${match.scoreDomicile} – ${match.scoreExterieur}` : 'vs'}
      </span>
      <span className="flex-1 font-sans text-[13px] truncate" style={{ color: extLead ? '#FAF6EC' : 'rgba(250,246,236,0.45)' }}>
        {match.equipeExterieur.nom}
      </span>
      <span className="font-mono text-[9px] shrink-0 px-2 py-0.5" style={{ border: '1px solid rgba(166,173,185,0.15)', color: 'rgba(166,173,185,0.35)' }}>
        {match.statut === 'TERMINE' ? 'FT' : match.statut === 'EN_COURS' ? 'LIVE' : '–'}
      </span>
    </div>
  );
}
