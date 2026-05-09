import Link from 'next/link';
import Image from 'next/image';

interface ClubPageTemplateProps {
  locale: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  accent: string;           // hex color e.g. '#5A8A2E'
  joinCta?: string;
  stats: { n: string; label: string }[];
  teams: string[];
  nextMatch?: { home: string; away: string; date: string; time: string };
}

export default function ClubPageTemplate({
  locale,
  image,
  title,
  subtitle,
  description,
  accent,
  joinCta,
  stats,
  teams,
  nextMatch,
}: ClubPageTemplateProps) {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative" style={{ minHeight: '70vh' }}>
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover"
          style={{ filter: 'brightness(0.45)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(8,26,46,0.95) 0%, rgba(8,26,46,0.4) 60%, transparent 100%)' }}
        />
        <div className="absolute inset-0 flex flex-col justify-end" style={{ padding: '0 56px 72px' }}>
          <div className="w-14 h-0.5 mb-6" style={{ background: accent }} />
          <h1
            className="font-display text-paper leading-none mb-4"
            style={{ fontSize: 'clamp(72px, 14vw, 220px)' }}
          >
            {title.toUpperCase()}.
          </h1>
          <p className="font-sans text-paper opacity-65 text-xl mb-8">{subtitle}</p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex self-start font-mono text-[13px] font-bold tracking-[0.12em] px-7 py-3.5 transition-opacity hover:opacity-85"
            style={{ background: accent, color: '#FAF6EC' }}
          >
            {joinCta ? joinCta.toUpperCase() : 'NOUS REJOINDRE'} →
          </Link>
        </div>
      </section>

      {/* ─── Stats strip ─── */}
      <section className="bg-navy" style={{ padding: '0 56px' }}>
        <div className="flex flex-wrap">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="py-10 pr-12"
              style={{ borderRight: i < stats.length - 1 ? '1px solid rgba(250,246,236,0.1)' : 'none', marginRight: i < stats.length - 1 ? '3rem' : 0 }}
            >
              <div className="font-display leading-none mb-1" style={{ fontSize: 56, color: '#E8A23C' }}>
                {s.n}
              </div>
              <div className="font-mono text-[11px] tracking-[0.18em] text-stone-l">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── About + Teams ─── */}
      <section className="bg-paper" style={{ padding: '80px 56px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Description */}
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-stone mb-5">À PROPOS</p>
            <p className="font-sans text-ink text-lg leading-relaxed mb-8" style={{ opacity: 0.8 }}>
              {description}
            </p>
            {nextMatch && (
              <div className="bg-navy p-6" style={{ borderTop: `3px solid ${accent}` }}>
                <p className="font-mono text-[10px] tracking-[0.2em] text-stone-l mb-4">PROCHAIN MATCH</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-paper" style={{ fontSize: 28 }}>{nextMatch.home}</span>
                  <span className="font-mono text-[13px] text-stone-l font-bold">VS</span>
                  <span className="font-display text-paper" style={{ fontSize: 28 }}>{nextMatch.away}</span>
                </div>
                <div className="flex items-center gap-4 font-mono text-[11px] tracking-[0.12em] text-stone-l">
                  <span>{nextMatch.date}</span>
                  <span>·</span>
                  <span>{nextMatch.time}</span>
                </div>
              </div>
            )}
          </div>

          {/* Teams grid */}
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-stone mb-5">NOS ÉQUIPES</p>
            <div className="grid grid-cols-2 gap-0.5">
              {teams.map((team) => (
                <div
                  key={team}
                  className="flex items-center gap-3 p-4 bg-cream"
                  style={{ borderLeft: `3px solid ${accent}` }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: accent }} />
                  <span className="font-sans text-[14px] font-semibold text-navy">{team}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Join CTA ─── */}
      <section className="bg-navy-deep" style={{ padding: '72px 56px' }}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <h2 className="font-display text-paper leading-none" style={{ fontSize: 72 }}>
            PRÊT À JOUER<br />
            <span style={{ color: accent }}>AVEC NOUS?</span>
          </h2>
          <Link
            href={`/${locale}/contact`}
            className="shrink-0 font-mono text-[13px] font-bold tracking-[0.12em] px-8 py-4 transition-opacity hover:opacity-85"
            style={{ background: accent, color: '#FAF6EC' }}
          >
            {joinCta ? joinCta.toUpperCase() : 'CONTACTER LE CLUB'} →
          </Link>
        </div>
      </section>
    </>
  );
}
