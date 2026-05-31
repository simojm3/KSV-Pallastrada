import Link from 'next/link';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { prisma } from '@/lib/prisma';

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'home' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tFootball = await getTranslations({ locale, namespace: 'clubs.football' });
  const tVelo = await getTranslations({ locale, namespace: 'clubs.velo' });
  const tHiking = await getTranslations({ locale, namespace: 'clubs.hiking' });

  const clubs = [
    {
      key: 'football',
      href: `/${locale}/clubs/football`,
      image: '/football.png',
      label: tNav('football').toUpperCase(),
      sub: tFootball('subtitle'),
      desc: tFootball('description'),
      accent: '#5A8A2E',
    },
    {
      key: 'velo',
      href: `/${locale}/clubs/velo`,
      image: '/cycling.jpg',
      label: tNav('velo').toUpperCase(),
      sub: tVelo('subtitle'),
      desc: tVelo('description'),
      accent: '#C24A2C',
    },
    {
      key: 'hiking',
      href: `/${locale}/clubs/hiking`,
      image: '/hiking.jpg',
      label: tNav('hiking').toUpperCase(),
      sub: tHiking('subtitle'),
      desc: tHiking('description'),
      accent: '#7FA8C9',
    },
  ];

  // Fetch teams for ticker
  const groupes = await prisma.groupe.findMany({
    include: { equipes: { orderBy: { nom: 'asc' } } },
    orderBy: { nom: 'asc' },
  }).catch(() => []);

  // Build ticker: fixed infos + teams from DB
  const baseItems = [
    'TOURNOI · 7 JUIN 2026 · BERNE',
    'FOOTBALL · VÉLO · RANDONNÉE',
    'INSCRIPTION OUVERTE · ADHÉSION 2026',
  ];
  const teamItems: string[] = [];
  for (const g of groupes) {
    teamItems.push(g.nom.toUpperCase());
    for (const e of g.equipes) teamItems.push(e.nom.toUpperCase());
  }
  const allItems = teamItems.length > 0
    ? [...baseItems, ...teamItems]
    : [...baseItems, 'PALLASTRADA', 'MAZAY', 'FC PICHANGUEROS', 'BÄRN OST', 'KARIIM', 'JODA PICHANGUERA'];

  const ticker = [...allItems, ...allItems].join('   ·   ');

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative bg-navy-deep" style={{ minHeight: '85vh' }}>
        <Image
          src="/home.jpg"
          alt="KSV Pallastrada"
          fill
          priority
          className="object-cover"
          style={{ filter: 'brightness(0.55)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(8,26,46,0.82) 0%, rgba(8,26,46,0.45) 60%, transparent 100%)' }}
        />
        <div className="relative z-10 flex flex-col justify-end h-full px-5 pb-12 sm:px-14 sm:pb-20" style={{ minHeight: '85vh' }}>
          <p className="font-mono text-[11px] tracking-[0.2em] text-paper opacity-60 mb-6">
            {t('hero_since')}
          </p>
          <h1 className="font-display text-paper leading-none mb-8" style={{ fontSize: 'clamp(64px, 10vw, 160px)', maxWidth: 900 }}>
            {t('hero_title').toUpperCase()},{' '}
            <span style={{ color: '#E8A23C' }}>{t('hero_cta').toUpperCase()}</span>.
          </h1>
          <div className="flex items-center gap-4">
            <Link
              href={`/${locale}/clubs/football`}
              className="font-mono text-[13px] font-bold tracking-[0.12em] px-7 py-3.5 bg-paper text-navy transition-opacity hover:opacity-90"
            >
              {t('clubs_title').toUpperCase()}
            </Link>
            <Link
              href={`/${locale}/tournoi`}
              className="font-mono text-[13px] font-bold tracking-[0.12em] px-7 py-3.5 border border-paper text-paper transition-opacity hover:opacity-80 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-live animate-live-pulse" />
              {tNav('tournoi').toUpperCase()}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Ticker ─── */}
      <div className="bg-navy overflow-hidden relative" style={{ height: 44 }}>
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{ width: 60, background: 'linear-gradient(to right, #0d1f35, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{ width: 60, background: 'linear-gradient(to left, #0d1f35, transparent)' }} />

        <div className="flex items-center h-full animate-ticker" style={{ width: 'max-content' }}>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center h-full" aria-hidden={copy === 1}>
              {allItems.map((item, i) => {
                const isGroup = groupes.some(g => g.nom.toUpperCase() === item);
                return (
                  <span key={i} className="flex items-center">
                    <span className="mx-5 w-1 h-1 rounded-full shrink-0"
                      style={{ background: isGroup ? '#E8A23C' : 'rgba(250,246,236,0.25)' }} />
                    <span className="font-mono text-[11px] tracking-[0.18em] whitespace-nowrap"
                      style={{ color: isGroup ? 'rgba(232,162,60,0.9)' : 'rgba(250,246,236,0.6)', fontWeight: isGroup ? 700 : 400 }}>
                      {item}
                    </span>
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* ─── 3 Clubs ─── */}
      <section className="bg-navy-deep px-5 py-14 sm:px-14 sm:py-20">
        <p className="font-mono text-[11px] tracking-[0.2em] text-stone-l mb-4">{t('clubs_title').toUpperCase()}</p>
        <h2 className="font-display text-paper leading-none mb-10 sm:mb-14 text-5xl sm:text-7xl">
          {t('clubs_subtitle').toUpperCase()}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
          {clubs.map((club) => (
            <Link key={club.key} href={club.href} className="group relative overflow-hidden" style={{ height: 480 }}>
              <Image
                src={club.image}
                alt={club.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ filter: 'brightness(0.5)' }}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(8,26,46,0.95) 0%, transparent 60%)' }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div
                  className="w-12 h-0.5 mb-5 transition-all duration-300 group-hover:w-20"
                  style={{ background: club.accent }}
                />
                <p className="font-mono text-[11px] tracking-[0.16em] mb-2 opacity-60" style={{ color: club.accent }}>
                  {club.sub.toUpperCase()}
                </p>
                <h3 className="font-display text-paper leading-none mb-3 text-5xl sm:text-6xl">
                  {club.label}
                </h3>
                <p className="font-sans text-[14px] leading-relaxed text-paper opacity-65 mb-6">
                  {club.desc}
                </p>
                <span className="font-mono text-[11px] tracking-[0.16em] font-bold" style={{ color: club.accent }}>
                  {t('club_see')} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Tournament banner ─── */}
      <section className="bg-navy-deep px-5 py-14 sm:px-14 sm:py-20">
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 p-6 sm:p-12"
          style={{ background: '#06101F', border: '1px solid rgba(250,246,236,0.08)' }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span
                className="font-mono text-[10px] tracking-[0.16em] font-bold px-2.5 py-1.5 text-white"
                style={{ background: '#E63946' }}
              >
                LIVE
              </span>
              <span className="font-mono text-[11px] tracking-[0.1em] text-stone-l">
                {t('tournoi_banner_date')}
              </span>
            </div>
            <h2 className="font-display text-paper leading-none" style={{ fontSize: 'clamp(48px, 8vw, 120px)' }}>
              {t('tournoi_banner_title').toUpperCase()}
            </h2>
          </div>
          <div className="shrink-0">
            <p className="font-sans text-[14px] text-stone-l mb-8 max-w-xs leading-relaxed">
              {t('hero_subtitle')}
            </p>
            <Link
              href={`/${locale}/tournoi`}
              className="inline-flex items-center gap-3 font-mono text-[13px] font-bold tracking-[0.12em] px-7 py-3.5 bg-sun text-ink transition-opacity hover:opacity-90"
            >
              <span className="w-2 h-2 rounded-full bg-ink animate-live-pulse" />
              {t('tournoi_banner_cta').toUpperCase()}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="bg-navy px-5 py-14 sm:px-14 sm:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {[
            { n: '2019', label: t('stat_fondation') },
            { n: '97', label: t('stat_members') },
            { n: '5', label: t('stat_teams') },
            { n: '3', label: t('stat_disciplines') },
          ].map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col items-start py-10 px-8"
              style={{ borderLeft: i === 0 ? 'none' : '1px solid rgba(250,246,236,0.1)' }}
            >
              <span className="font-display text-sun leading-none mb-2 text-5xl sm:text-7xl">
                {s.n}
              </span>
              <span className="font-mono text-[11px] tracking-[0.2em] text-stone-l">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Join CTA ─── */}
      <section className="bg-paper px-5 py-14 sm:px-14 sm:py-20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-stone mb-4">{t('join_title').toUpperCase()}</p>
            <h2 className="font-display text-navy leading-none text-5xl sm:text-7xl">
              {t('join_text').toUpperCase()}
            </h2>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row gap-4">
            <Link
              href={`/${locale}/contact`}
              className="font-mono text-[13px] font-bold tracking-[0.12em] px-7 py-3.5 bg-navy text-paper transition-opacity hover:opacity-85"
            >
              {tNav('contact').toUpperCase()}
            </Link>
            <Link
              href={`/${locale}/clubs/football`}
              className="font-mono text-[13px] font-bold tracking-[0.12em] px-7 py-3.5 border border-navy text-navy transition-opacity hover:opacity-70"
            >
              {t('join_cta').toUpperCase()}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
