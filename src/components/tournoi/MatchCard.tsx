'use client';

import { useTranslations } from 'next-intl';
import type { Match } from '@/types/tournoi';

export default function MatchCard({ match }: { match: Match }) {
  const t = useTranslations('tournoi');

  const isLive = match.statut === 'EN_COURS';
  const isDone = match.statut === 'TERMINE';
  const hasScore = match.scoreDomicile !== null && match.scoreExterieur !== null;

  const heure = match.heure
    ? new Date(match.heure).toLocaleTimeString('fr-CH', { hour: '2-digit', minute: '2-digit' })
    : null;

  const homeLead = hasScore && match.scoreDomicile! > match.scoreExterieur!;
  const awayLead = hasScore && match.scoreExterieur! > match.scoreDomicile!;

  return (
    <div
      style={{
        background: isLive ? 'rgba(230,57,70,0.06)' : 'rgba(250,246,236,0.02)',
        border: `1px solid ${isLive ? 'rgba(230,57,70,0.25)' : 'rgba(250,246,236,0.07)'}`,
        borderTop: isLive ? '2px solid #E63946' : undefined,
      }}
    >
      <div className="px-3 py-3 flex items-center gap-2 sm:gap-3">
        {/* Time / status */}
        <div className="w-10 sm:w-14 shrink-0 text-center">
          {isLive ? (
            <div className="flex flex-col items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-live animate-live-pulse" />
              <span className="font-mono text-[9px] tracking-[0.14em] font-bold text-live">{t('live_badge')}</span>
            </div>
          ) : heure ? (
            <span className="font-mono text-[11px] tabular-nums" style={{ color: 'rgba(166,173,185,0.5)' }}>{heure}</span>
          ) : (
            <span className="font-mono text-[11px]" style={{ color: 'rgba(166,173,185,0.2)' }}>—</span>
          )}
        </div>

        {/* Teams + score */}
        <div className="flex-1 flex items-center gap-2 min-w-0">
          {/* Home */}
          <div className="flex-1 text-right min-w-0">
            <div
              className="font-mono font-bold tracking-widest"
              style={{
                fontSize: 16,
                color: isDone
                  ? (homeLead ? '#FAF6EC' : 'rgba(250,246,236,0.35)')
                  : isLive
                  ? '#FAF6EC'
                  : 'rgba(250,246,236,0.6)',
              }}
            >
              {match.equipeDomicile.abreviation ?? match.equipeDomicile.nom.slice(0, 3).toUpperCase()}
            </div>
            <div
              className="font-sans text-[9px] truncate mt-0.5"
              style={{ color: 'rgba(166,173,185,0.3)' }}
            >
              {match.equipeDomicile.nom}
            </div>
          </div>

          {/* Score */}
          <div className="shrink-0 min-w-[52px] sm:min-w-[64px] text-center">
            {hasScore ? (
              <span
                className="font-display tabular-nums"
                style={{
                  fontSize: isLive ? 26 : 22,
                  color: isLive ? '#FAF6EC' : 'rgba(250,246,236,0.65)',
                  letterSpacing: '0.04em',
                }}
              >
                {match.scoreDomicile} – {match.scoreExterieur}
              </span>
            ) : (
              <span
                className="font-display"
                style={{ fontSize: 22, color: 'rgba(250,246,236,0.12)' }}
              >
                {t('match_vs')}
              </span>
            )}
          </div>

          {/* Away */}
          <div className="flex-1 min-w-0">
            <div
              className="font-mono font-bold tracking-widest"
              style={{
                fontSize: 16,
                color: isDone
                  ? (awayLead ? '#FAF6EC' : 'rgba(250,246,236,0.35)')
                  : isLive
                  ? '#FAF6EC'
                  : 'rgba(250,246,236,0.6)',
              }}
            >
              {match.equipeExterieur.abreviation ?? match.equipeExterieur.nom.slice(0, 3).toUpperCase()}
            </div>
            <div
              className="font-sans text-[9px] truncate mt-0.5"
              style={{ color: 'rgba(166,173,185,0.3)' }}
            >
              {match.equipeExterieur.nom}
            </div>
          </div>
        </div>

        {/* Terrain + Badge */}
        <div className="shrink-0 text-right flex flex-col items-end gap-1">
          {match.terrain && (() => {
            const num = match.terrain.match(/\d+/)?.[0] ?? '1';
            const isT1 = num === '1';
            return (
              <span
                className="font-mono text-[9px] tracking-[0.12em] px-2 py-0.5 flex items-center gap-1 whitespace-nowrap"
                style={{
                  background: isT1 ? 'rgba(230,57,70,0.12)' : 'rgba(90,138,46,0.12)',
                  color:      isT1 ? 'rgba(230,57,70,0.9)'  : 'rgba(90,138,46,0.9)',
                  border:     `1px solid ${isT1 ? 'rgba(230,57,70,0.3)' : 'rgba(90,138,46,0.3)'}`,
                }}
              >
                ⚑ {t('terrain')} {num}
              </span>
            );
          })()}
          <div className="hidden sm:block">
            {isDone && (
              <span
                className="font-mono text-[9px] tracking-[0.14em] px-2 py-1"
                style={{ border: '1px solid rgba(166,173,185,0.2)', color: 'rgba(166,173,185,0.4)' }}
              >
                {t('finished_badge')}
              </span>
            )}
            {!isLive && !isDone && (
              <span className="font-mono text-[9px] tracking-[0.14em] px-2 py-1 bg-navy text-paper opacity-50">
                {t('upcoming_badge')}
              </span>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
