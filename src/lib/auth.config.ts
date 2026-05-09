import type { NextAuthConfig } from 'next-auth';

/**
 * Edge-compatible subset of the NextAuth config.
 * Used by middleware to verify JWTs without importing Node.js-only modules.
 * The full config (with Credentials provider) lives in auth.ts.
 */
export const authConfig = {
  providers: [],
  session: { strategy: 'jwt' as const },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  pages: {
    signIn: '/fr/tournoi/admin/login',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = (user as { role?: string }).role ?? null;
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string | null }).role =
          (token.role as string | null) ?? null;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
