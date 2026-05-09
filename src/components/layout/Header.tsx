'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const locale = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Dark variant on home page (dark hero background) and tournament page
  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;
  const isTournoi = pathname.includes('/tournoi') && !pathname.includes('/admin');
  const dark = isHomePage || isTournoi;

  const fg = dark ? '#FAF6EC' : '#0E2A4A';
  const muted = dark ? 'rgba(250,246,236,0.6)' : 'rgba(14,42,74,0.55)';
  const borderColor = dark ? 'rgba(250,246,236,0.12)' : '#E3DCCB';

  const navLinks = [
    { href: `/${locale}`, key: 'home', label: t('home') },
    { href: `/${locale}/clubs/football`, key: 'football', label: t('football') },
    { href: `/${locale}/clubs/velo`, key: 'velo', label: t('velo') },
    { href: `/${locale}/clubs/hiking`, key: 'hiking', label: t('hiking') },
    { href: `/${locale}/tournoi`, key: 'tournoi', label: t('tournoi'), live: true },
    { href: `/${locale}/contact`, key: 'contact', label: t('contact') },
  ];

  const isActive = (href: string) => pathname === href;

  const bg = dark ? '#0E2A4A' : '#FAF6EC';

  return (
    <header
      style={{ borderBottom: `1px solid ${borderColor}`, background: bg }}
      className="sticky top-0 z-50"
    >
      <div className="flex items-center justify-between px-5 md:px-14 py-5">
        {/* Wordmark */}
        <Link href={`/${locale}`} className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/logo.png"
            alt="KSV Pallastrada"
            width={36}
            height={36}
            className="rounded-full block"
          />
          <div className="leading-none font-display">
            <div className="text-lg tracking-[0.04em]" style={{ color: fg }}>KSV</div>
            <div className="text-[13px] tracking-[0.18em] mt-0.5 opacity-70" style={{ color: fg }}>PALLASTRADA</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="relative inline-flex items-center gap-1.5 text-[13px] font-semibold tracking-[0.08em] font-sans transition-colors"
              style={{ color: isActive(link.href) ? fg : muted }}
            >
              {link.label.toUpperCase()}
              {link.live && (
                <span
                  className="w-1.5 h-1.5 rounded-full bg-live animate-live-pulse"
                  style={{ boxShadow: '0 0 0 3px rgba(230,57,70,0.2)' }}
                />
              )}
              {isActive(link.href) && (
                <span
                  className="absolute left-0 right-0 h-0.5"
                  style={{ bottom: -22, background: fg }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Language switcher */}
        <div className="hidden lg:block">
          <LanguageSwitcher dark={dark} />
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-1 transition-colors"
          style={{ color: fg }}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          className="lg:hidden px-5 pb-5 flex flex-col gap-3"
          style={{ borderTop: `1px solid ${borderColor}`, background: dark ? '#081A2E' : '#FAF6EC' }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 py-2 text-sm font-semibold tracking-[0.08em] font-sans"
              style={{ color: isActive(link.href) ? fg : muted }}
            >
              {link.label.toUpperCase()}
              {link.live && (
                <span className="w-1.5 h-1.5 rounded-full bg-live animate-live-pulse" />
              )}
            </Link>
          ))}
          <div className="pt-2" style={{ borderTop: `1px solid ${borderColor}` }}>
            <LanguageSwitcher dark={dark} />
          </div>
        </nav>
      )}
    </header>
  );
}
