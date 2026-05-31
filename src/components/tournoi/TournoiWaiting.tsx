import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import CountdownTimer from './CountdownTimer';

export default async function TournoiWaiting({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'tournoi' });

  const labels = {
    days: t('countdown_days'),
    hours: t('countdown_hours'),
    minutes: t('countdown_minutes'),
    seconds: t('countdown_seconds'),
  };

  // Fetch teams for the ticker
  const groupes = await prisma.groupe.findMany({
    include: { equipes: { orderBy: { nom: 'asc' } } },
    orderBy: { nom: 'asc' },
  }).catch(() => []);

  // Build ticker items: group name + team names
  const tickerItems: { label: string; accent?: boolean }[] = [];
  for (const g of groupes) {
    tickerItems.push({ label: g.nom.toUpperCase(), accent: true });
    for (const e of g.equipes) {
      tickerItems.push({ label: e.nom });
    }
  }
  // Fallback if DB not seeded yet
  if (tickerItems.length === 0) {
    ['GROUPE A', 'Pallastrada', 'Mazay', 'FC Pichangueros',
     'GROUPE B', 'Bärn Ost', 'Kariim', 'Joda Pichanguera']
      .forEach((label, i) => tickerItems.push({ label, accent: i === 0 || i === 4 }));
  }

  return (
    <div className="relative" style={{ minHeight: '100vh', background: '#06101F' }}>
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.6 }}
      >
        <source src="/pallastrada.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(6,16,31,0.35) 0%, rgba(6,16,31,0.5) 50%, rgba(6,16,31,0.85) 100%)',
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center w-full px-4 sm:px-8 py-20"
        style={{ minHeight: '100vh' }}
      >
        <p className="font-mono text-[11px] tracking-[0.28em] mb-8" style={{ color: 'rgba(232,162,60,0.8)' }}>
          {t('waiting_label')}
        </p>

        <h1
          className="font-display text-paper leading-none mb-6"
          style={{ fontSize: 'clamp(48px, 10vw, 140px)' }}
        >
          {t('waiting_title_1')}
          <br />
          <span style={{ color: '#E8A23C' }}>{t('waiting_title_2')}</span>
        </h1>

        <p className="font-sans text-lg mb-16" style={{ color: 'rgba(166,173,185,0.7)', maxWidth: 480 }}>
          {t('waiting_subtitle')}{' '}
          <strong style={{ color: '#FAF6EC' }}>{t('waiting_date')}</strong>.
        </p>

        <CountdownTimer labels={labels} />

        <div
          className="mt-16 font-mono text-[10px] tracking-[0.22em]"
          style={{ color: 'rgba(166,173,185,0.35)' }}
        >
          {t('waiting_footer')}
        </div>
      </div>

      {/* ── Teams ticker ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden"
        style={{
          borderTop: '1px solid rgba(232,162,60,0.2)',
          background: 'rgba(6,16,31,0.75)',
          backdropFilter: 'blur(6px)',
          height: 44,
        }}
      >
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{ width: 80, background: 'linear-gradient(to right, rgba(6,16,31,0.9), transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{ width: 80, background: 'linear-gradient(to left, rgba(6,16,31,0.9), transparent)' }}
        />

        {/* Scrolling content — duplicated for seamless loop */}
        <div className="flex items-center h-full animate-ticker" style={{ width: 'max-content' }}>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-0 h-full" aria-hidden={copy === 1}>
              {tickerItems.map((item, i) => (
                <span key={i} className="flex items-center">
                  {/* Separator dot */}
                  <span
                    className="mx-5 w-1 h-1 rounded-full shrink-0"
                    style={{ background: item.accent ? '#E8A23C' : 'rgba(166,173,185,0.3)' }}
                  />
                  <span
                    className="font-mono text-[11px] tracking-[0.18em] whitespace-nowrap"
                    style={{
                      color: item.accent ? 'rgba(232,162,60,0.9)' : 'rgba(250,246,236,0.55)',
                      fontWeight: item.accent ? 700 : 400,
                    }}
                  >
                    {item.label}
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
