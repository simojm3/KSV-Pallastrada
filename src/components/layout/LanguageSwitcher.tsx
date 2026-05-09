'use client';

import { usePathname } from 'next/navigation';

const locales = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
  { code: 'it', label: 'IT' },
] as const;

interface LanguageSwitcherProps {
  dark?: boolean;
}

export default function LanguageSwitcher({ dark = false }: LanguageSwitcherProps) {
  const rawPathname = usePathname();
  // Derive active locale and path directly from URL — always in sync
  const activeLocale = rawPathname.match(/^\/(fr|en|de|it)/)?.[1] ?? 'fr';
  const pathWithoutLocale = rawPathname.replace(/^\/(fr|en|de|it)/, '') || '/';

  return (
    <div className="flex items-center gap-0.5 font-mono text-[11px] font-medium">
      {locales.map(({ code, label }) => (
        <a
          key={code}
          href={`/${code}${pathWithoutLocale}`}
          className="px-2 py-1.5 rounded tracking-[0.08em] transition-colors"
          style={{
            background: activeLocale === code
              ? (dark ? '#FAF6EC' : '#0E2A4A')
              : 'transparent',
            color: activeLocale === code
              ? (dark ? '#0E2A4A' : '#FAF6EC')
              : (dark ? 'rgba(250,246,236,0.5)' : 'rgba(14,42,74,0.5)'),
          }}
          aria-current={activeLocale === code ? 'true' : undefined}
        >
          {label}
        </a>
      ))}
    </div>
  );
}
