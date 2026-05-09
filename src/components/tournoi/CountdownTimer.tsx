'use client';

import { useEffect, useState } from 'react';

const TARGET = new Date('2026-06-07T09:00:00+02:00');

function getTimeLeft() {
  const diff = TARGET.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

interface Labels {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

function Bloc({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="font-display leading-none tabular-nums"
        style={{ fontSize: 'clamp(56px, 10vw, 120px)', color: '#FAF6EC' }}
      >
        {String(value).padStart(2, '0')}
      </span>
      <span className="font-mono text-[10px] tracking-[0.22em] mt-2" style={{ color: 'rgba(166,173,185,0.6)' }}>
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer({ labels }: { labels: Labels }) {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <div className="flex items-end gap-6 md:gap-12">
      <Bloc value={time.days} label={labels.days} />
      <span className="font-display text-sun pb-4" style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>·</span>
      <Bloc value={time.hours} label={labels.hours} />
      <span className="font-display text-sun pb-4" style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>·</span>
      <Bloc value={time.minutes} label={labels.minutes} />
      <span className="font-display text-sun pb-4" style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>·</span>
      <Bloc value={time.seconds} label={labels.seconds} />
    </div>
  );
}
