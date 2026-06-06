'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

interface AdminSidebarProps {
  locale: string;
  userEmail: string | null | undefined;
}

const NAV = [
  { key: 'dashboard', label: 'Dashboard', icon: '◈', path: '' },
  { key: 'equipes',   label: 'Teams',     icon: '⬟', path: '/equipes' },
  { key: 'groupes',  label: 'Groups',    icon: '⬡', path: '/groupes' },
  { key: 'matchs',   label: 'Matches',   icon: '◉', path: '/matchs' },
];

export default function AdminSidebar({ locale, userEmail }: AdminSidebarProps) {
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

  const activeItem = navLinks.find((n) => n.active) ?? navLinks[0];

  return (
    <>
      {/* ── Mobile top bar (no hamburger — navigation is in the bottom bar) ── */}
      <div
        className="lg:hidden flex items-center justify-between px-4 py-3 shrink-0"
        style={{ background: '#081A2E', borderBottom: '1px solid rgba(250,246,236,0.1)' }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="font-mono text-[10px] tracking-[0.2em] shrink-0"
            style={{ color: 'rgba(166,173,185,0.4)' }}
          >
            ADMIN
          </span>
          <span style={{ color: 'rgba(250,246,236,0.2)' }}>/</span>
          <span className="font-display text-paper truncate" style={{ fontSize: 18 }}>
            {activeItem.label.toUpperCase()}
          </span>
        </div>
        <Link
          href={`/${locale}/tournoi`}
          className="shrink-0 font-mono text-[10px] tracking-[0.1em] px-2.5 py-1.5 ml-2 transition-opacity hover:opacity-75"
          style={{ color: 'rgba(250,246,236,0.35)', border: '1px solid rgba(250,246,236,0.1)' }}
        >
          ↗ VIEW
        </Link>
      </div>

      {/* ── Desktop sidebar ── */}
      <aside
        className="hidden lg:flex flex-col w-64 shrink-0"
        style={{ background: '#081A2E', borderRight: '1px solid rgba(250,246,236,0.08)' }}
      >
        {/* Logo */}
        <div className="px-6 py-6" style={{ borderBottom: '1px solid rgba(250,246,236,0.08)' }}>
          <p
            className="font-mono text-[10px] tracking-[0.2em] mb-1"
            style={{ color: 'rgba(166,173,185,0.5)' }}
          >
            KSV PALLASTRADA
          </p>
          <h2 className="font-display text-paper" style={{ fontSize: 26 }}>
            TOURNAMENT
          </h2>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
          {navLinks.map((item) => (
            <Link
              key={item.key}
              href={item.href}
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
            <p
              className="font-mono text-[10px] tracking-[0.1em] px-3 mb-3 truncate"
              style={{ color: 'rgba(166,173,185,0.35)' }}
            >
              {userEmail}
            </p>
          )}
          <button
            onClick={() => signOut({ callbackUrl: `/${locale}/tournoi/admin/login` })}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-sans transition-colors hover:opacity-80"
            style={{ color: 'rgba(194,74,44,0.7)' }}
          >
            <span>⏻</span>
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Mobile bottom navigation bar ── */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex"
        style={{
          background: '#081A2E',
          borderTop: '1px solid rgba(250,246,236,0.1)',
          height: 60,
        }}
      >
        {navLinks.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className="relative flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors"
            style={{ color: item.active ? '#E8A23C' : 'rgba(250,246,236,0.3)' }}
          >
            {item.active && (
              <span
                className="absolute top-0 left-1/4 right-1/4 h-0.5"
                style={{ background: '#E8A23C' }}
              />
            )}
            <span style={{ fontSize: 18, lineHeight: 1 }}>{item.icon}</span>
            <span className="font-mono text-[8px] tracking-[0.1em]">
              {item.label.toUpperCase()}
            </span>
          </Link>
        ))}

        {/* Sign out */}
        <button
          onClick={() => signOut({ callbackUrl: `/${locale}/tournoi/admin/login` })}
          className="flex-none flex flex-col items-center justify-center gap-0.5 px-4 transition-colors hover:opacity-80"
          style={{
            color: 'rgba(194,74,44,0.55)',
            borderLeft: '1px solid rgba(250,246,236,0.08)',
          }}
        >
          <span style={{ fontSize: 18, lineHeight: 1 }}>⏻</span>
          <span className="font-mono text-[8px] tracking-[0.1em]">EXIT</span>
        </button>
      </nav>
    </>
  );
}
