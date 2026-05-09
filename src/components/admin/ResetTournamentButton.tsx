'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResetTournamentButton({ locale }: { locale: string }) {
  const router = useRouter();
  const [step, setStep] = useState<'idle' | 'confirm' | 'loading' | 'done'>('idle');
  const [error, setError] = useState('');
  const [typed, setTyped] = useState('');

  const CONFIRM_WORD = 'RESET';

  async function handleReset() {
    setStep('loading');
    setError('');
    try {
      const res = await fetch('/api/tournoi/reset', { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? 'Error');
        setStep('confirm');
        return;
      }
      setStep('done');
      setTimeout(() => router.refresh(), 1500);
    } catch {
      setError('Network error.');
      setStep('confirm');
    }
  }

  if (step === 'done') {
    return (
      <div
        className="p-5 flex items-center gap-3"
        style={{ background: 'rgba(90,138,46,0.1)', border: '1px solid rgba(90,138,46,0.3)' }}
      >
        <span style={{ color: '#5A8A2E' }}>✓</span>
        <span className="font-mono text-[12px] tracking-[0.1em]" style={{ color: 'rgba(90,138,46,0.9)' }}>
          TOURNAMENT RESET — Redirecting…
        </span>
      </div>
    );
  }

  if (step === 'confirm') {
    return (
      <div
        className="p-6"
        style={{ background: 'rgba(194,74,44,0.06)', border: '1px solid rgba(194,74,44,0.3)', borderTop: '2px solid #C24A2C' }}
      >
        <p className="font-mono text-[11px] tracking-[0.12em] mb-1 font-bold" style={{ color: '#C24A2C' }}>
          ⚠ IRREVERSIBLE ACTION
        </p>
        <p className="font-sans text-[13px] mb-5" style={{ color: 'rgba(250,246,236,0.55)' }}>
          This will permanently delete all teams, groups, matches, goals and reset the live toggle.
          Type <strong style={{ color: '#FAF6EC' }}>{CONFIRM_WORD}</strong> to confirm.
        </p>

        <div className="flex items-center gap-3 flex-wrap">
          <input
            type="text"
            value={typed}
            onChange={(e) => setTyped(e.target.value.toUpperCase())}
            placeholder={CONFIRM_WORD}
            className="font-mono text-[13px] px-4 py-2 w-32"
            style={{
              background: '#06101F',
              border: `1px solid ${typed === CONFIRM_WORD ? 'rgba(194,74,44,0.6)' : 'rgba(250,246,236,0.1)'}`,
              color: '#FAF6EC',
              outline: 'none',
            }}
          />
          <button
            onClick={handleReset}
            disabled={typed !== CONFIRM_WORD}
            className="font-mono text-[12px] font-bold tracking-[0.12em] px-5 py-2 transition-opacity disabled:opacity-30 hover:opacity-85"
            style={{ background: '#C24A2C', color: '#FAF6EC' }}
          >
            CONFIRM RESET
          </button>
          <button
            onClick={() => { setStep('idle'); setTyped(''); setError(''); }}
            className="font-mono text-[12px] tracking-[0.1em] px-5 py-2 transition-colors"
            style={{ border: '1px solid rgba(250,246,236,0.1)', color: 'rgba(250,246,236,0.4)' }}
          >
            CANCEL
          </button>
        </div>

        {error && (
          <p className="font-sans text-[12px] mt-3" style={{ color: '#C24A2C' }}>{error}</p>
        )}
      </div>
    );
  }

  if (step === 'loading') {
    return (
      <div
        className="p-5 flex items-center gap-3"
        style={{ background: 'rgba(194,74,44,0.06)', border: '1px solid rgba(194,74,44,0.2)' }}
      >
        <div
          className="w-4 h-4 border-2 rounded-full animate-spin shrink-0"
          style={{ borderColor: 'rgba(194,74,44,0.2)', borderTopColor: '#C24A2C' }}
        />
        <span className="font-mono text-[12px] tracking-[0.1em]" style={{ color: 'rgba(194,74,44,0.7)' }}>
          RESETTING…
        </span>
      </div>
    );
  }

  return (
    <div
      className="p-6 flex items-center justify-between gap-6 flex-wrap"
      style={{ background: 'rgba(194,74,44,0.04)', border: '1px solid rgba(194,74,44,0.15)' }}
    >
      <div>
        <p className="font-mono text-[11px] tracking-[0.16em] font-bold mb-1" style={{ color: 'rgba(194,74,44,0.7)' }}>
          DANGER ZONE
        </p>
        <p className="font-sans text-[13px]" style={{ color: 'rgba(250,246,236,0.45)' }}>
          Reset the entire tournament — deletes all teams, matches, and goals.
        </p>
      </div>
      <button
        onClick={() => setStep('confirm')}
        className="shrink-0 font-mono text-[12px] font-bold tracking-[0.12em] px-5 py-2.5 transition-opacity hover:opacity-85"
        style={{ border: '1px solid rgba(194,74,44,0.5)', color: '#C24A2C' }}
      >
        RESET TOURNAMENT
      </button>
    </div>
  );
}
