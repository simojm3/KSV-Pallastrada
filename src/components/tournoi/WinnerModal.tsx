'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Match } from '@/types/tournoi';

const COLORS = ['#E8A23C', '#FAF6EC', '#5A8A2E', '#E63946', '#7FA8C9', '#C24A2C', '#FFD700'];

interface ConfettoPiece {
  id: number;
  left: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  isCircle: boolean;
}

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function Confetti({ pieces }: { pieces: ConfettoPiece[] }) {
  return (
    <>
      <style>{`
        @keyframes confetti-fall {
          0%   { transform: translateY(-8vh) rotate(0deg); opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateY(105vh) rotate(800deg); opacity: 0; }
        }
      `}</style>
      <div className="fixed inset-0 pointer-events-none z-[55] overflow-hidden">
        {pieces.map((p) => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.left}%`,
              top: 0,
              width: p.size,
              height: p.size,
              background: p.color,
              borderRadius: p.isCircle ? '50%' : '2px',
              animation: `confetti-fall ${p.duration}s ease-in ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>
    </>
  );
}

interface Props {
  finalMatch: Match;
  troisieméMatch?: Match;
}

export default function WinnerModal({ finalMatch, troisieméMatch }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const key = `winner-modal-dismissed-${finalMatch.id}`;
    if (!sessionStorage.getItem(key)) {
      setOpen(true);
    }
  }, [finalMatch.id]);

  const pieces = useMemo<ConfettoPiece[]>(() => (
    Array.from({ length: 70 }, (_, i) => ({
      id: i,
      left: seededRandom(i * 3) * 100,
      size: seededRandom(i * 7) * 8 + 5,
      color: COLORS[i % COLORS.length],
      delay: seededRandom(i * 11) * 4,
      duration: seededRandom(i * 13) * 2 + 2.5,
      isCircle: seededRandom(i * 17) > 0.5,
    }))
  ), []);

  if (!mounted || !open) return null;

  const domScore = finalMatch.scoreDomicile ?? 0;
  const extScore = finalMatch.scoreExterieur ?? 0;
  const champion = domScore >= extScore ? finalMatch.equipeDomicile : finalMatch.equipeExterieur;
  const runnerUp = domScore >= extScore ? finalMatch.equipeExterieur : finalMatch.equipeDomicile;

  let thirdPlace: { nom: string } | null = null;
  if (troisieméMatch && troisieméMatch.statut === 'TERMINE') {
    const d = troisieméMatch.scoreDomicile ?? 0;
    const e = troisieméMatch.scoreExterieur ?? 0;
    thirdPlace = d >= e ? troisieméMatch.equipeDomicile : troisieméMatch.equipeExterieur;
  }

  function dismiss() {
    sessionStorage.setItem(`winner-modal-dismissed-${finalMatch.id}`, '1');
    setOpen(false);
  }

  return (
    <>
      <Confetti pieces={pieces} />

      {/* Overlay */}
      <div
        className="fixed inset-0 z-[56] flex items-center justify-center p-4"
        style={{ background: 'rgba(6,16,31,0.88)', backdropFilter: 'blur(6px)' }}
        onClick={dismiss}
      >
        <div
          className="relative w-full max-w-lg text-center"
          style={{
            background: '#081A2E',
            border: '1px solid rgba(232,162,60,0.3)',
            borderTop: '3px solid #E8A23C',
            padding: '48px 32px 40px',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={dismiss}
            className="absolute top-4 right-4 font-mono text-[11px] px-3 py-1.5 transition-colors hover:opacity-70"
            style={{ color: 'rgba(166,173,185,0.4)', border: '1px solid rgba(250,246,236,0.08)' }}
          >
            ✕ CLOSE
          </button>

          {/* Trophy */}
          <div className="text-6xl mb-4 select-none" style={{ filter: 'drop-shadow(0 0 24px rgba(232,162,60,0.6))' }}>
            🏆
          </div>

          <p className="font-mono text-[10px] tracking-[0.28em] mb-3" style={{ color: '#E8A23C' }}>
            TOURNOI KSV PALLASTRADA · 7 JUIN 2026
          </p>

          <h2
            className="font-display text-paper leading-none mb-2"
            style={{ fontSize: 'clamp(40px, 10vw, 80px)' }}
          >
            {champion.nom.toUpperCase()}
          </h2>

          <p className="font-mono text-[13px] tracking-[0.14em] mb-8" style={{ color: '#E8A23C' }}>
            🥇 CHAMPION DU TOURNOI
          </p>

          <p className="font-sans text-[15px] leading-relaxed mb-10" style={{ color: 'rgba(250,246,236,0.6)' }}>
            Félicitations à <strong style={{ color: '#FAF6EC' }}>{champion.nom}</strong> pour cette
            magnifique victoire&nbsp;! Une performance remarquable tout au long du tournoi.
          </p>

          {/* Score final */}
          <div
            className="flex items-center justify-center gap-4 mb-10 py-4 px-6"
            style={{ background: 'rgba(250,246,236,0.03)', border: '1px solid rgba(250,246,236,0.07)' }}
          >
            <span className="font-sans font-semibold text-paper text-sm flex-1 text-right">{finalMatch.equipeDomicile.nom}</span>
            <span className="font-display tabular-nums" style={{ fontSize: 36, color: '#FAF6EC', minWidth: 72, textAlign: 'center' }}>
              {domScore} – {extScore}
            </span>
            <span className="font-sans font-semibold text-paper text-sm flex-1 text-left">{finalMatch.equipeExterieur.nom}</span>
          </div>

          {/* Podium */}
          <div className="flex items-end justify-center gap-3">
            {/* 2nd */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl">🥈</span>
              <div
                className="flex items-end justify-center px-3"
                style={{ height: 56, background: 'rgba(250,246,236,0.05)', border: '1px solid rgba(250,246,236,0.1)' }}
              >
                <span className="font-mono text-[9px] tracking-[0.1em] pb-2" style={{ color: 'rgba(166,173,185,0.6)' }}>
                  {runnerUp.nom.toUpperCase()}
                </span>
              </div>
              <span className="font-mono text-[9px]" style={{ color: 'rgba(166,173,185,0.4)' }}>2ÈME</span>
            </div>

            {/* 1st */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl animate-bounce">🥇</span>
              <div
                className="flex items-end justify-center px-4"
                style={{ height: 80, background: 'rgba(232,162,60,0.1)', border: '1px solid rgba(232,162,60,0.3)' }}
              >
                <span className="font-mono text-[10px] tracking-[0.1em] pb-2 font-bold" style={{ color: '#E8A23C' }}>
                  {champion.nom.toUpperCase()}
                </span>
              </div>
              <span className="font-mono text-[9px] font-bold" style={{ color: '#E8A23C' }}>1ER</span>
            </div>

            {/* 3rd */}
            {thirdPlace && (
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl">🥉</span>
                <div
                  className="flex items-end justify-center px-3"
                  style={{ height: 40, background: 'rgba(250,246,236,0.03)', border: '1px solid rgba(250,246,236,0.08)' }}
                >
                  <span className="font-mono text-[9px] tracking-[0.1em] pb-2" style={{ color: 'rgba(166,173,185,0.5)' }}>
                    {thirdPlace.nom.toUpperCase()}
                  </span>
                </div>
                <span className="font-mono text-[9px]" style={{ color: 'rgba(166,173,185,0.4)' }}>3ÈME</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
