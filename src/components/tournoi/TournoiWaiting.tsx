import { getTranslations } from 'next-intl/server';
import CountdownTimer from './CountdownTimer';

export default async function TournoiWaiting({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'tournoi' });

  const labels = {
    days: t('countdown_days'),
    hours: t('countdown_hours'),
    minutes: t('countdown_minutes'),
    seconds: t('countdown_seconds'),
  };

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
    </div>
  );
}
