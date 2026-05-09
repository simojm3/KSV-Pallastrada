'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

interface AdminSidebarProps {
  locale: string;
  userEmail: string | null | undefined;
}

const NAV = [
  { key: 'dashboard', label: 'Dashboard', icon: '◈', path: '' },
  { key: 'equipes', label: 'Teams', icon: '⬟', path: '/equipes' },
  { key: 'groupes', label: 'Groups', icon: '⬡', path: '/groupes' },
  { key: 'matchs', label: 'Matches', icon: '◉', path: '/matchs' },
];

export default function AdminSidebar({ locale, userEmail }: AdminSidebarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const base = `/${locale}/tournoi/admin`;

  function isActive(path: string) {
    const full = base + path;
    return path === '' ? pathname === full : pathname.startsWith(full);
  }

  const navLinks = NAV.map((item) => ({
    ...item,
    href: base + item.path,
    active: isActive(item.path),
  }));

  return (
    <>
      {/* Mobile top bar */}
      <div
        className="lg:hidden flex items-center justify-between px-5 py-4"
        style={{ background: '#081A2E', borderBottom: '1px solid rgba(250,246,236,0.1)' }}
      >
        <span className="font-display text-paper tracking-wider" style={{ fontSize: 22 }}>ADMIN</span>
        <button
          onClick={() => setOpen(!open)}
          className="p-1"
          style={{ color: 'rgba(250,246,236,0.6)' }}
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/60" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 flex flex-col
          transform transition-transform duration-200
          lg:relative lg:translate-x-0 lg:z-auto
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ background: '#081A2E', borderRight: '1px solid rgba(250,246,236,0.08)' }}
      >
        {/* Logo */}
        <div className="px-6 py-6" style={{ borderBottom: '1px solid rgba(250,246,236,0.08)' }}>
          <p className="font-mono text-[10px] tracking-[0.2em] mb-1" style={{ color: 'rgba(166,173,185,0.5)' }}>
            KSV PALLASTRADA
          </p>
          <h2 className="font-display text-paper" style={{ fontSize: 26 }}>TOURNAMENT</h2>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
          {navLinks.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm font-sans font-medium transition-colors"
              style={{
                background: item.active ? 'rgba(232,162,60,0.1)' : 'transparent',
                color: item.active ? '#E8A23C' : 'rgba(250,246,236,0.45)',
                borderLeft: item.active ? '2px solid #E8A23C' : '2px solid transparent',
              }}
            >
              <span className="text-base leading-none">{item.icon}</span>
              {item.label}
            </Link>
          ))}

          <div className="pt-4 mt-4" style={{ borderTop: '1px solid rgba(250,246,236,0.08)' }}>
            <Link
              href={`/${locale}/tournoi`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm font-sans transition-colors"
              style={{ color: 'rgba(250,246,236,0.3)', borderLeft: '2px solid transparent' }}
            >
              <span>↗</span>
              Public view
            </Link>
          </div>
        </nav>

        {/* User + sign out */}
        <div className="px-4 py-4" style={{ borderTop: '1px solid rgba(250,246,236,0.08)' }}>
          {userEmail && (
            <p className="font-mono text-[10px] tracking-[0.1em] px-3 mb-3 truncate" style={{ color: 'rgba(166,173,185,0.35)' }}>
              {userEmail}
            </p>
          )}
          <button
            onClick={() => signOut({ callbackUrl: `/${locale}/tournoi/admin/login` })}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-sans transition-colors"
            style={{ color: 'rgba(194,74,44,0.7)' }}
          >
            <span>⏻</span>
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
