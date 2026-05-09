import NextAuth from 'next-auth';
import createIntlMiddleware from 'next-intl/middleware';
import { authConfig } from './src/lib/auth.config';
import { routing } from './src/i18n/routing';
import { NextResponse } from 'next/server';

const intlMiddleware = createIntlMiddleware(routing);

// Edge-safe auth instance (no Credentials provider, just JWT verification)
const { auth } = NextAuth(authConfig);

// Matches /fr/tournoi/admin, /en/tournoi/admin/matchs, etc.
// but NOT /xx/tournoi/admin/login
const ADMIN_GUARD = /^\/(?:fr|en|de|it)\/tournoi\/admin(?!\/login)/;

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const pathname = nextUrl.pathname;

  // Redirect unauthenticated users away from admin routes
  if (ADMIN_GUARD.test(pathname) && !session) {
    const locale = pathname.split('/')[1] ?? 'fr';
    return NextResponse.redirect(
      new URL(`/${locale}/tournoi/admin/login`, nextUrl.origin)
    );
  }

  // Delegate locale detection/redirect to next-intl for all other routes
  return intlMiddleware(req);
});

export const config = {
  matcher: [
    // Match everything except Next.js internals and static files
    '/((?!_next|_vercel|.*\\..*).*)',
    '/',
  ],
};
