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
      <div className="px-4 py-3 flex items-center gap-3">
        {/* Time / status */}
        <div className="w-14 shrink-0 text-center">
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
        <div className="flex-1 flex items-center gap-3 min-w-0">
          {/* Home */}
          <span
            className="flex-1 text-right font-sans text-[14px] font-semibold truncate"
            style={{
              color: isDone
                ? (homeLead ? '#FAF6EC' : 'rgba(250,246,236,0.35)')
                : isLive
                ? '#FAF6EC'
                : 'rgba(250,246,236,0.6)',
            }}
          >
            {match.equipeDomicile.nom}
          </span>

          {/* Score */}
          <div className="shrink-0 min-w-[72px] text-center">
            {hasScore ? (
              <span
                className="font-display tabular-nums"
                style={{
                  fontSize: isLive ? 32 : 26,
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
          <span
            className="flex-1 font-sans text-[14px] font-semibold truncate"
            style={{
              color: isDone
                ? (awayLead ? '#FAF6EC' : 'rgba(250,246,236,0.35)')
                : isLive
                ? '#FAF6EC'
                : 'rgba(250,246,236,0.6)',
            }}
          >
            {match.equipeExterieur.nom}
          </span>
        </div>

        {/* Badge */}
        <div className="w-16 shrink-0 text-right">
          {isDone && (
            <span
              className="font-mono text-[9px] tracking-[0.14em] px-2 py-1"
              style={{ border: '1px solid rgba(166,173,185,0.2)', color: 'rgba(166,173,185,0.4)' }}
            >
              {t('finished_badge')}
            </span>
          )}
          {!isLive && !isDone && (
            <span
              className="font-mono text-[9px] tracking-[0.14em] px-2 py-1 bg-navy text-paper opacity-50"
            >
              {t('upcoming_badge')}
            </span>
          )}
        </div>
      </div>

      {/* Goals list */}
      {match.buts && match.buts.length > 0 && (
        <div
          className="px-4 pb-3 pt-0 flex flex-col gap-0.5"
          style={{ borderTop: '1px solid rgba(250,246,236,0.04)' }}
        >
          {match.buts.map((but) => {
            const isHome = but.equipeId === match.equipeDomicileId;
            const teamName = isHome ? match.equipeDomicile.nom : match.equipeExterieur.nom;
            return (
              <div
                key={but.id}
                className={`flex items-center gap-1.5 font-mono text-[10px] ${isHome ? 'justify-end flex-row-reverse' : ''}`}
                style={{ color: 'rgba(166,173,185,0.45)' }}
              >
                <span style={{ color: 'rgba(250,246,236,0.5)' }}>⚽</span>
                {but.minute && (
                  <span className="tabular-nums" style={{ color: 'rgba(232,162,60,0.7)' }}>
                    {but.minute}&apos;
                  </span>
                )}
                <span>{but.buteur ? but.buteur : teamName}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
