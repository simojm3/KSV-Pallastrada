'use client';

import { useState, useTransition } from 'react';

export default function LiveToggle({ initial }: { initial: boolean }) {
  const [liveVisible, setLiveVisible] = useState(initial);
  const [pending, startTransition] = useTransition();

  const toggle = () => {
    const next = !liveVisible;
    startTransition(async () => {
      await fetch('/api/tournoi/config', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ liveVisible: next }),
      });
      setLiveVisible(next);
    });
  };

  return (
    <div
      className="mb-10 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      style={{
        background: liveVisible ? 'rgba(90,138,46,0.08)' : 'rgba(14,42,74,0.6)',
        border: `1px solid ${liveVisible ? 'rgba(90,138,46,0.3)' : 'rgba(250,246,236,0.08)'}`,
        borderLeft: `3px solid ${liveVisible ? '#5A8A2E' : '#E8A23C'}`,
      }}
    >
      <div>
        <p className="font-mono text-[10px] tracking-[0.2em] mb-1" style={{ color: 'rgba(166,173,185,0.5)' }}>
          TOURNAMENT PAGE
        </p>
        <p className="font-display text-paper" style={{ fontSize: 22 }}>
          {liveVisible ? 'LIVE RESULTS VISIBLE' : 'WAITING PAGE SHOWN'}
        </p>
        <p className="font-mono text-[11px] mt-1" style={{ color: 'rgba(166,173,185,0.4)' }}>
          {liveVisible
            ? 'The public sees live scores and standings.'
            : 'The public sees the countdown and waiting screen.'}
        </p>
      </div>

      <button
        onClick={toggle}
        disabled={pending}
        className="shrink-0 font-mono text-[12px] font-bold tracking-[0.14em] px-6 py-3 transition-opacity hover:opacity-80 disabled:opacity-50"
        style={{
          background: liveVisible ? '#E63946' : '#5A8A2E',
          color: '#FAF6EC',
        }}
      >
        {pending ? '...' : liveVisible ? '⏸ HIDE RESULTS' : '▶ GO LIVE'}
      </button>
    </div>
  );
}
