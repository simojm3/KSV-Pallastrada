'use client';

import { useTranslations } from 'next-intl';
import type { Match } from '@/types/tournoi';

function BracketMatchCard({ match }: { match: Match }) {
  const isLive = match.statut === 'EN_COURS';
  const isDone = match.statut === 'TERMINE';
  const hasScore = match.scoreDomicile !== null && match.scoreExterieur !== null;

  const winDom = hasScore && match.scoreDomicile! > match.scoreExterieur!;
  const winExt = hasScore && match.scoreExterieur! > match.scoreDomicile!;

  function TeamRow({ name, score, isWinner }: { name: string; score: number | null; isWinner: boolean }) {
    return (
      <div
        className="flex items-center justify-between px-4 py-2.5 gap-3"
        style={{ background: isWinner ? 'rgba(232,162,60,0.08)' : 'transparent' }}
      >
        <span
          className="text-sm font-sans font-semibold truncate"
          style={{ color: isDone ? (isWinner ? '#FAF6EC' : 'rgba(250,246,236,0.3)') : isLive ? '#FAF6EC' : 'rgba(250,246,236,0.55)' }}
        >
          {name || '?'}
        </span>
        <span
          className="font-display tabular-nums shrink-0"
          style={{ fontSize: 24, color: score !== null ? (isWinner ? '#E8A23C' : 'rgba(250,246,236,0.35)') : 'rgba(250,246,236,0.12)' }}
        >
          {score ?? '–'}
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        border: `1px solid ${isLive ? 'rgba(230,57,70,0.3)' : 'rgba(250,246,236,0.08)'}`,
        borderTop: isLive ? '2px solid #E63946' : undefined,
        background: '#0A1829',
      }}
    >
      {isLive && (
        <div
          className="flex items-center gap-1.5 px-4 py-1.5"
          style={{ background: 'rgba(230,57,70,0.1)', borderBottom: '1px solid rgba(230,57,70,0.2)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-live animate-live-pulse" />
          <span className="font-mono text-[9px] tracking-[0.14em] font-bold text-live">LIVE</span>
        </div>
      )}
      <div style={{ borderBottom: '1px solid rgba(250,246,236,0.06)' }}>
        <TeamRow name={match.equipeDomicile.nom} score={match.scoreDomicile} isWinner={winDom} />
      </div>
      <TeamRow name={match.equipeExterieur.nom} score={match.scoreExterieur} isWinner={winExt} />
      {match.heure && (
        <div
          className="px-4 py-1.5"
          style={{ background: 'rgba(250,246,236,0.02)', borderTop: '1px solid rgba(250,246,236,0.05)' }}
        >
          <span className="font-mono text-[10px] tabular-nums" style={{ color: 'rgba(166,173,185,0.3)' }}>
            {new Date(match.heure).toLocaleTimeString('fr-CH', { hour: '2-digit', minute: '2-digit' })}
            {match.terrain ? ` · ${match.terrain}` : ''}
          </span>
        </div>
      )}
    </div>
  );
}

function PlaceholderCard() {
  return (
    <div style={{ border: '1px dashed rgba(250,246,236,0.1)', background: '#0A1829' }}>
      <div className="px-4 py-2.5" style={{ borderBottom: '1px solid rgba(250,246,236,0.06)' }}>
        <span className="font-sans text-sm" style={{ color: 'rgba(166,173,185,0.2)' }}>À déterminer</span>
      </div>
      <div className="px-4 py-2.5">
        <span className="font-sans text-sm" style={{ color: 'rgba(166,173,185,0.2)' }}>À déterminer</span>
      </div>
    </div>
  );
}

function RoundLabel({ label }: { label: string }) {
  return (
    <p className="font-mono text-[10px] tracking-[0.2em] mb-3" style={{ color: 'rgba(166,173,185,0.4)' }}>
      {label.toUpperCase()}
    </p>
  );
}

export default function Bracket({ matchs }: { matchs: Match[] }) {
  const t = useTranslations('tournoi');

  const semis = matchs.filter((m) => m.phase === 'DEMI_FINALE');
  const finale = matchs.filter((m) => m.phase === 'FINALE');
  const third = matchs.filter((m) => m.phase === 'TROISIEME_PLACE');

  if (matchs.length === 0) {
    return (
      <p className="font-mono text-[12px] tracking-[0.1em]" style={{ color: 'rgba(166,173,185,0.3)', fontStyle: 'italic' }}>
        Les matchs de la phase finale seront affichés après la phase de groupes.
      </p>
    );
  }

  return (
    <div>
      {/* Desktop bracket */}
      <div className="hidden md:flex items-start gap-0">
        <div className="flex-1 flex flex-col gap-4">
          <RoundLabel label={t('semifinals')} />
          {semis.length > 0 ? semis.map((m) => <BracketMatchCard key={m.id} match={m} />) : <PlaceholderCard />}
        </div>

        <div className="flex flex-col items-center justify-around px-6 pt-8 self-stretch">
          <svg width="32" height="80" viewBox="0 0 32 80" fill="none" style={{ color: 'rgba(250,246,236,0.15)' }}>
            <path d="M0 20 H16 V60 H0" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M16 40 H32" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="flex-1">
          <RoundLabel label={t('final')} />
          {finale.length > 0 ? finale.map((m) => <BracketMatchCard key={m.id} match={m} />) : <PlaceholderCard />}
        </div>
      </div>

      {third.length > 0 && (
        <div className="hidden md:block mt-8 max-w-xs">
          <RoundLabel label={t('third_place')} />
          {third.map((m) => <BracketMatchCard key={m.id} match={m} />)}
        </div>
      )}

      {/* Mobile stacked */}
      <div className="md:hidden flex flex-col gap-8">
        {semis.length > 0 && (
          <div>
            <RoundLabel label={t('semifinals')} />
            <div className="flex flex-col gap-3">{semis.map((m) => <BracketMatchCard key={m.id} match={m} />)}</div>
          </div>
        )}
        {finale.length > 0 && (
          <div>
            <RoundLabel label={t('final')} />
            <div className="flex flex-col gap-3">{finale.map((m) => <BracketMatchCard key={m.id} match={m} />)}</div>
          </div>
        )}
        {third.length > 0 && (
          <div>
            <RoundLabel label={t('third_place')} />
            <div className="flex flex-col gap-3">{third.map((m) => <BracketMatchCard key={m.id} match={m} />)}</div>
          </div>
        )}
      </div>
    </div>
  );
}
