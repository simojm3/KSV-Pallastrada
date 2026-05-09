'use client';

import { useTranslations } from 'next-intl';
import type { Match } from '@/types/tournoi';

interface Props {
  finalMatch: Match;
  troisièmeMatch?: Match;
}

interface PodiumEntry {
  rank: 1 | 2 | 3;
  nom: string;
  medal: string;
  height: number;
  accentColor: string;
  labelColor: string;
}

export default function PodiumSection({ finalMatch, troisièmeMatch }: Props) {
  const t = useTranslations('tournoi');

  const domScore = finalMatch.scoreDomicile ?? 0;
  const extScore = finalMatch.scoreExterieur ?? 0;
  const champion = domScore >= extScore ? finalMatch.equipeDomicile : finalMatch.equipeExterieur;
  const runnerUp  = domScore >= extScore ? finalMatch.equipeExterieur : finalMatch.equipeDomicile;

  let thirdNom: string | null = null;
  if (troisièmeMatch && troisièmeMatch.statut === 'TERMINE') {
    const d = troisièmeMatch.scoreDomicile ?? 0;
    const e = troisièmeMatch.scoreExterieur ?? 0;
    thirdNom = d >= e ? troisièmeMatch.equipeDomicile.nom : troisièmeMatch.equipeExterieur.nom;
  }

  // Podium entries ordered: 2nd (left), 1st (centre), 3rd (right)
  const entries: PodiumEntry[] = [
    { rank: 2, nom: runnerUp.nom,  medal: '🥈', height: 120, accentColor: 'rgba(180,180,200,0.15)', labelColor: 'rgba(250,246,236,0.55)' },
    { rank: 1, nom: champion.nom,  medal: '🥇', height: 180, accentColor: 'rgba(232,162,60,0.18)',  labelColor: '#E8A23C' },
    ...(thirdNom ? [{ rank: 3 as const, nom: thirdNom, medal: '🥉', height: 80, accentColor: 'rgba(180,130,80,0.12)', labelColor: 'rgba(250,246,236,0.4)' }] : []),
  ];

  return (
    <section className="mb-16">
      {/* Section header */}
      <h2 className="font-display text-paper mb-10 flex items-center gap-6 text-3xl sm:text-5xl">
        {t('winner_podium_title')}
        <span className="h-px flex-1" style={{ background: 'rgba(250,246,236,0.1)' }} />
        <span className="text-3xl">🏆</span>
      </h2>

      {/* Podium visual */}
      <div
        className="p-6 sm:p-10"
        style={{ background: 'rgba(6,16,31,0.6)', border: '1px solid rgba(232,162,60,0.15)', borderTop: '2px solid #E8A23C' }}
      >
        {/* Team name labels above blocks */}
        <div className="flex items-end justify-center gap-3 sm:gap-6 mb-0">
          {entries.map((e) => (
            <div
              key={e.rank}
              className="flex flex-col items-center"
              style={{ width: e.rank === 1 ? 180 : 140, maxWidth: '30vw' }}
            >
              {/* Medal + name above the block */}
              <div className="text-center mb-3">
                <div className="text-3xl sm:text-4xl mb-2">{e.medal}</div>
                <p
                  className="font-display leading-tight px-1"
                  style={{
                    fontSize: e.rank === 1 ? 'clamp(14px, 3vw, 22px)' : 'clamp(12px, 2.5vw, 17px)',
                    color: e.rank === 1 ? '#FAF6EC' : 'rgba(250,246,236,0.65)',
                  }}
                >
                  {e.nom.toUpperCase()}
                </p>
              </div>

              {/* Podium block */}
              <div
                className="w-full flex items-center justify-center"
                style={{
                  height: e.height,
                  background: e.accentColor,
                  border: `1px solid ${e.rank === 1 ? 'rgba(232,162,60,0.4)' : 'rgba(250,246,236,0.08)'}`,
                  borderBottom: 'none',
                }}
              >
                <span
                  className="font-display"
                  style={{
                    fontSize: e.rank === 1 ? 56 : 40,
                    color: e.labelColor,
                    opacity: 0.4,
                  }}
                >
                  {t(`winner_rank_${e.rank}` as 'winner_rank_1' | 'winner_rank_2' | 'winner_rank_3')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Ground line */}
        <div style={{ borderTop: '2px solid rgba(250,246,236,0.1)', marginTop: 0 }} />

        {/* Final score */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <p className="font-mono text-[10px] tracking-[0.2em]" style={{ color: 'rgba(166,173,185,0.4)' }}>
            {t('winner_final_score').toUpperCase()}
          </p>
          <div className="flex items-center gap-3">
            <span className="font-sans text-sm font-semibold" style={{ color: 'rgba(250,246,236,0.7)' }}>
              {finalMatch.equipeDomicile.nom}
            </span>
            <span className="font-display tabular-nums" style={{ fontSize: 28, color: '#FAF6EC', letterSpacing: '0.04em' }}>
              {domScore} – {extScore}
            </span>
            <span className="font-sans text-sm font-semibold" style={{ color: 'rgba(250,246,236,0.7)' }}>
              {finalMatch.equipeExterieur.nom}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
