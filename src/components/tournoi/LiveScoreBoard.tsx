'use client';

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useTranslations } from 'next-intl';
import type { TournoiData } from '@/types/tournoi';
import GroupTable from './GroupTable';
import MatchCard from './MatchCard';
import Bracket from './Bracket';
import WinnerModal from './WinnerModal';
import PodiumSection from './PodiumSection';
import { getPusherClient, PUSHER_CHANNEL, PUSHER_EVENT } from '@/lib/pusher-client';

const fetcher = async (url: string) => {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const json = await r.json();
  // Guard: if the API returned an error body, treat it as a fetch error
  if (!Array.isArray(json?.groupes)) throw new Error('Invalid data');
  return json;
};

export default function LiveScoreBoard({ fallbackData }: { fallbackData?: TournoiData }) {
  const t = useTranslations('tournoi');

  const { data, error, isValidating, mutate } = useSWR<TournoiData>(
    '/api/tournoi/scores',
    fetcher,
    {
      fallbackData,
      refreshInterval: (latest) => {
        const live =
          latest?.groupes?.some((g) => g.matchs?.some((m) => m.statut === 'EN_COURS')) ||
          latest?.matchsFinale?.some((m) => m.statut === 'EN_COURS');
        return live ? 3000 : 10000;
      },
      revalidateOnMount: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      dedupingInterval: 2000,
    }
  );

  useEffect(() => {
    const client = getPusherClient();
    const channel = client.subscribe(PUSHER_CHANNEL);
    const handler = () => mutate();
    channel.bind(PUSHER_EVENT, handler);
    return () => { channel.unbind(PUSHER_EVENT, handler); };
  }, [mutate]);

  const [secondsAgo, setSecondsAgo] = useState(0);
  useEffect(() => {
    setSecondsAgo(0);
    const iv = setInterval(() => setSecondsAgo((s) => s + 1), 1000);
    return () => clearInterval(iv);
  }, [data]);

  const finalMatch = data?.matchsFinale?.find((m) => m.phase === 'FINALE' && m.statut === 'TERMINE');
  const troisieméMatch = data?.matchsFinale?.find((m) => m.phase === 'TROISIEME_PLACE' && m.statut === 'TERMINE');

  const liveMatchs = [
    ...(data?.groupes?.flatMap((g) => g.matchs?.filter((m) => m.statut === 'EN_COURS') ?? []) ?? []),
    ...(data?.matchsFinale?.filter((m) => m.statut === 'EN_COURS') ?? []),
  ];
  const hasLive = liveMatchs.length > 0;

  if (!fallbackData && !data && !error) {
    return (
      <div className="py-32 flex flex-col items-center gap-4" style={{ color: 'rgba(166,173,185,0.4)' }}>
        <div
          className="w-8 h-8 border-2 rounded-full animate-spin"
          style={{ borderColor: 'rgba(250,246,236,0.1)', borderTopColor: '#E8A23C' }}
        />
        <p className="font-mono text-[12px] tracking-[0.1em]">{t('loading')}</p>
      </div>
    );
  }

  // If SWR revalidation fails but we already have data, keep showing it (don't blank the page)
  if (!data || !Array.isArray(data.groupes)) {
    if (error) {
      return (
        <div className="py-32 text-center">
          <p className="font-mono text-[12px] tracking-[0.1em]" style={{ color: 'rgba(166,173,185,0.4)' }}>
            {t('error')}
          </p>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="px-4 py-10 sm:px-8 lg:px-14">
      {finalMatch && (
        <WinnerModal finalMatch={finalMatch} troisieméMatch={troisieméMatch} />
      )}

      {finalMatch && (
        <PodiumSection finalMatch={finalMatch} troisièmeMatch={troisieméMatch} />
      )}

      {/* ── Live matches at top ── */}
      {hasLive && (
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span
              className="flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] font-bold px-2.5 py-1.5 text-white animate-live-blink"
              style={{ background: '#E63946' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-live-pulse" />
              {t('live_badge')}
            </span>
            <span className="font-mono text-[11px] tracking-[0.1em]" style={{ color: 'rgba(166,173,185,0.5)' }}>
              {liveMatchs.length === 1 ? '1 match en cours' : `${liveMatchs.length} matchs en cours`}
            </span>
          </div>
          <div
            className="flex flex-col gap-2 p-4 sm:p-6"
            style={{ background: 'rgba(230,57,70,0.05)', border: '1px solid rgba(230,57,70,0.2)', borderTop: '2px solid #E63946' }}
          >
            {liveMatchs.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}

      {/* Phase de groupes */}
      <section className="mb-16">
        <SectionTitle label={t('group_stage')} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {data.groupes.map((groupe) => (
            <div key={groupe.id} className="flex flex-col gap-6">
              <GroupTable groupe={groupe} />
              {groupe.matchs.length > 0 && (
                <div>
                  <p
                    className="font-mono text-[10px] tracking-[0.2em] mb-3"
                    style={{ color: 'rgba(166,173,185,0.4)' }}
                  >
                    MATCHS — {groupe.nom.toUpperCase()}
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {groupe.matchs.map((match) => (
                      <MatchCard key={match.id} match={match} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Phase finale */}
      {data.matchsFinale.length > 0 && (
        <section className="mb-16">
          <SectionTitle label={t('knockout_stage')} />
          <Bracket matchs={data.matchsFinale} />
        </section>
      )}

      {/* Refresh indicator */}
      <div
        className="flex items-center justify-between pt-6"
        style={{ borderTop: '1px solid rgba(250,246,236,0.06)' }}
      >
        <p className="font-mono text-[10px] tracking-[0.12em]" style={{ color: 'rgba(166,173,185,0.3)' }}>
          {t('next_refresh')}
        </p>
        <div className="flex items-center gap-2" style={{ color: 'rgba(166,173,185,0.25)' }}>
          {isValidating && (
            <div
              className="w-3 h-3 border rounded-full animate-spin"
              style={{ borderColor: 'rgba(250,246,236,0.1)', borderTopColor: 'rgba(250,246,236,0.5)' }}
            />
          )}
          <span className="font-mono text-[10px] tracking-[0.1em]">
            {secondsAgo === 0 ? "À l'instant" : `Il y a ${secondsAgo}s`}
          </span>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ label }: { label: string }) {
  return (
    <h2 className="font-display text-paper mb-8 flex items-center gap-6 text-3xl sm:text-5xl">
      {label.toUpperCase()}
      <span className="h-px flex-1" style={{ background: 'rgba(250,246,236,0.1)' }} />
    </h2>
  );
}
