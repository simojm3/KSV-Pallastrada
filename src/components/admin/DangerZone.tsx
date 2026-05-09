'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CONFIRM_WORD = 'RESET';

type Mode = 'idle' | 'archive' | 'delete' | 'loading' | 'done';

export default function DangerZone({ locale }: { locale: string }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('idle');
  const [nom, setNom] = useState(`Tournoi ${new Date().getFullYear()}`);
  const [typed, setTyped] = useState('');
  const [error, setError] = useState('');

  function reset() { setMode('idle'); setTyped(''); setError(''); }

  async function doArchive() {
    setMode('loading');
    try {
      const res = await fetch('/api/tournoi/archive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? 'Error'); setMode('archive'); return; }
      setMode('done');
      setTimeout(() => router.refresh(), 1500);
    } catch { setError('Network error.'); setMode('archive'); }
  }

  async function doDelete() {
    setMode('loading');
    try {
      const res = await fetch('/api/tournoi/reset', { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? 'Error'); setMode('delete'); return; }
      setMode('done');
      setTimeout(() => router.refresh(), 1500);
    } catch { setError('Network error.'); setMode('delete'); }
  }

  if (mode === 'done') {
    return (
      <div className="p-5 flex items-center gap-3" style={{ background: 'rgba(90,138,46,0.1)', border: '1px solid rgba(90,138,46,0.3)' }}>
        <span style={{ color: '#5A8A2E' }}>✓</span>
        <span className="font-mono text-[12px] tracking-[0.1em]" style={{ color: 'rgba(90,138,46,0.9)' }}>DONE — Refreshing…</span>
      </div>
    );
  }

  if (mode === 'loading') {
    return (
      <div className="p-5 flex items-center gap-3" style={{ background: 'rgba(194,74,44,0.06)', border: '1px solid rgba(194,74,44,0.2)' }}>
        <div className="w-4 h-4 border-2 rounded-full animate-spin shrink-0" style={{ borderColor: 'rgba(194,74,44,0.2)', borderTopColor: '#C24A2C' }} />
        <span className="font-mono text-[12px] tracking-[0.1em]" style={{ color: 'rgba(194,74,44,0.7)' }}>PROCESSING…</span>
      </div>
    );
  }

  // ── Archive confirmation panel ──
  if (mode === 'archive') {
    return (
      <div className="p-6" style={{ background: 'rgba(232,162,60,0.05)', border: '1px solid rgba(232,162,60,0.25)', borderTop: '2px solid #E8A23C' }}>
        <p className="font-mono text-[11px] tracking-[0.12em] mb-1 font-bold" style={{ color: '#E8A23C' }}>ARCHIVE & START NEW TOURNAMENT</p>
        <p className="font-sans text-[13px] mb-5" style={{ color: 'rgba(250,246,236,0.5)' }}>
          The current tournament will be saved in read-only archives before being reset.
        </p>

        <div className="mb-4">
          <label className="block font-mono text-[10px] tracking-[0.18em] mb-1.5" style={{ color: 'rgba(166,173,185,0.5)' }}>ARCHIVE NAME</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full font-sans text-[13px] px-4 py-2"
            style={{ background: '#06101F', border: '1px solid rgba(250,246,236,0.1)', color: '#FAF6EC', outline: 'none' }}
          />
        </div>

        {error && <p className="font-sans text-[12px] mb-3" style={{ color: '#C24A2C' }}>{error}</p>}

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={doArchive}
            disabled={!nom.trim()}
            className="font-mono text-[12px] font-bold tracking-[0.12em] px-5 py-2.5 transition-opacity disabled:opacity-40 hover:opacity-85"
            style={{ background: '#E8A23C', color: '#0A0F18' }}
          >
            ARCHIVE & RESET
          </button>
          <button onClick={reset} className="font-mono text-[12px] tracking-[0.1em] px-5 py-2.5 transition-colors" style={{ border: '1px solid rgba(250,246,236,0.1)', color: 'rgba(250,246,236,0.4)' }}>
            CANCEL
          </button>
        </div>
      </div>
    );
  }

  // ── Delete (no archive) confirmation panel ──
  if (mode === 'delete') {
    return (
      <div className="p-6" style={{ background: 'rgba(194,74,44,0.06)', border: '1px solid rgba(194,74,44,0.3)', borderTop: '2px solid #C24A2C' }}>
        <p className="font-mono text-[11px] tracking-[0.12em] mb-1 font-bold" style={{ color: '#C24A2C' }}>⚠ DELETE WITHOUT ARCHIVING</p>
        <p className="font-sans text-[13px] mb-5" style={{ color: 'rgba(250,246,236,0.5)' }}>
          All data will be permanently lost. Type <strong style={{ color: '#FAF6EC' }}>{CONFIRM_WORD}</strong> to confirm.
        </p>

        <div className="flex items-center gap-3 flex-wrap">
          <input
            type="text"
            value={typed}
            onChange={(e) => setTyped(e.target.value.toUpperCase())}
            placeholder={CONFIRM_WORD}
            className="font-mono text-[13px] px-4 py-2 w-32"
            style={{ background: '#06101F', border: `1px solid ${typed === CONFIRM_WORD ? 'rgba(194,74,44,0.6)' : 'rgba(250,246,236,0.1)'}`, color: '#FAF6EC', outline: 'none' }}
          />
          <button
            onClick={doDelete}
            disabled={typed !== CONFIRM_WORD}
            className="font-mono text-[12px] font-bold tracking-[0.12em] px-5 py-2 transition-opacity disabled:opacity-30 hover:opacity-85"
            style={{ background: '#C24A2C', color: '#FAF6EC' }}
          >
            CONFIRM DELETE
          </button>
          <button onClick={reset} className="font-mono text-[12px] tracking-[0.1em] px-5 py-2 transition-colors" style={{ border: '1px solid rgba(250,246,236,0.1)', color: 'rgba(250,246,236,0.4)' }}>
            CANCEL
          </button>
        </div>

        {error && <p className="font-sans text-[12px] mt-3" style={{ color: '#C24A2C' }}>{error}</p>}
      </div>
    );
  }

  // ── Default idle state ──
  return (
    <div className="flex flex-col gap-2">
      {/* Primary: archive */}
      <div className="p-5 flex items-center justify-between gap-6 flex-wrap" style={{ background: 'rgba(232,162,60,0.04)', border: '1px solid rgba(232,162,60,0.15)' }}>
        <div>
          <p className="font-mono text-[11px] tracking-[0.14em] font-bold mb-0.5" style={{ color: 'rgba(232,162,60,0.8)' }}>ARCHIVE & START NEW TOURNAMENT</p>
          <p className="font-sans text-[12px]" style={{ color: 'rgba(250,246,236,0.35)' }}>Saves current results in read-only archives, then resets.</p>
        </div>
        <button
          onClick={() => setMode('archive')}
          className="shrink-0 font-mono text-[12px] font-bold tracking-[0.12em] px-5 py-2.5 transition-opacity hover:opacity-85"
          style={{ background: '#E8A23C', color: '#0A0F18' }}
        >
          ARCHIVE →
        </button>
      </div>

      {/* Secondary: delete */}
      <div className="p-4 flex items-center justify-between gap-6 flex-wrap" style={{ border: '1px solid rgba(194,74,44,0.12)' }}>
        <p className="font-sans text-[12px]" style={{ color: 'rgba(166,173,185,0.3)' }}>Delete without archiving (irreversible)</p>
        <button
          onClick={() => setMode('delete')}
          className="shrink-0 font-mono text-[11px] tracking-[0.1em] px-4 py-1.5 transition-opacity hover:opacity-70"
          style={{ border: '1px solid rgba(194,74,44,0.3)', color: 'rgba(194,74,44,0.5)' }}
        >
          DELETE
        </button>
      </div>
    </div>
  );
}
