'use client';

import { signOut } from 'next-auth/react';

export default function SignOutButton({ locale }: { locale: string }) {
  return (
    <button
      onClick={() =>
        signOut({ callbackUrl: `/${locale}/tournoi/admin/login` })
      }
      className="text-sm text-white/70 hover:text-white transition-colors"
    >
      Sign out
    </button>
  );
}
