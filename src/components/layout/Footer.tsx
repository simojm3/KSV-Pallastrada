import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

interface FooterProps {
  locale: string;
}

export default async function Footer({ locale }: FooterProps) {
  const t = await getTranslations({ locale, namespace: 'footer' });

  const columns = [
    {
      title: t('col_clubs'),
      links: [
        { label: 'Football', href: '/clubs/football' },
        { label: t('link_membership'), href: '/contact' },
      ],
    },
    {
      title: t('col_tournament'),
      links: [
        { label: t('link_calendar'), href: '/tournoi' },
        { label: t('link_standings'), href: '/tournoi' },
        { label: t('link_broadcast'), href: '/tournoi' },
        { label: t('link_archives'), href: '/tournoi' },
      ],
    },
    {
      title: t('col_association'),
      links: [
        { label: t('link_about'), href: '/' },
        { label: t('link_committee'), href: '/' },
        { label: t('link_sponsors'), href: '/' },
        { label: t('link_press'), href: '/' },
      ],
    },
    {
      title: t('col_contact'),
      links: [
        { label: 'Hochfeldstrasse 65, 3012 Bern', href: '/contact' },
        { label: 'contact@ksv-pallastrada.ch', href: '/contact' },
      ],
    },
  ];

  return (
    <footer className="bg-navy text-paper px-5 pt-14 pb-7 sm:px-14 sm:pt-14 sm:pb-7">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10 mb-12">
        {/* Brand col */}
        <div>
          <Link href={`/${locale}`} className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="KSV Pallastrada" width={36} height={36} className="rounded-full" />
            <div className="leading-none font-display">
              <div className="text-lg tracking-[0.04em]">KSV</div>
              <div className="text-[13px] tracking-[0.18em] mt-0.5 opacity-70">PALLASTRADA</div>
            </div>
          </Link>
          <p className="mt-4 text-[13px] leading-relaxed opacity-65 max-w-[280px] font-sans">
            {t('description')}
          </p>
        </div>

        {/* Link columns */}
        {columns.map((col) => (
          <div key={col.title}>
            <div className="font-display text-[13px] tracking-[0.18em] mb-4 opacity-60">
              {col.title}
            </div>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-[13px] opacity-85 hover:opacity-100 transition-opacity font-sans"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-6 text-[11px] font-mono tracking-[0.1em] opacity-55"
        style={{ borderTop: '1px solid rgba(250,246,236,0.12)' }}
      >
        <span>{t('copyright')}</span>
        <span>{t('tagline')}</span>
        <a
          href="https://apexdigital.ch"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-100 transition-opacity"
        >
          {t('made_by')} <span className="text-sun">Apex Digital</span>
        </a>
      </div>
    </footer>
  );
}
