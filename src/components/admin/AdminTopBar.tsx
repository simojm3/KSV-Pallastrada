'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SignOutButton from './SignOutButton';

interface AdminTopBarProps {
  locale: string;
}

export default function AdminTopBar({ locale }: AdminTopBarProps) {
  const pathname = usePathname();

  const navLinks = [
    { href: `/${locale}/tournoi/admin`, label: 'Dashboard', exact: true },
    { href: `/${locale}/tournoi/admin/equipes`, label: 'Teams', exact: false },
    { href: `/${locale}/tournoi/admin/matchs`, label: 'Matches', exact: false },
  ];

  return (
    <div
      className="px-6 py-3 flex items-center justify-between"
      style={{ background: '#081A2E', borderBottom: '1px solid rgba(250,246,236,0.08)' }}
    >
      <nav className="flex items-center gap-1">
        <span className="font-display text-paper tracking-wider mr-3" style={{ fontSize: 20 }}>ADMIN</span>
        {navLinks.map((link) => {
          const active = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href) && !pathname.endsWith('/admin');
          return (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm font-sans font-medium transition-colors"
              style={{
                color: active ? '#E8A23C' : 'rgba(250,246,236,0.45)',
                background: active ? 'rgba(232,162,60,0.08)' : 'transparent',
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="flex items-center gap-3">
        <Link
          href={`/${locale}/tournoi`}
          className="hidden sm:block text-sm font-sans transition-colors"
          style={{ color: 'rgba(250,246,236,0.3)' }}
        >
          ← Public view
        </Link>
        <SignOutButton locale={locale} />
      </div>
    </div>
  );
}
