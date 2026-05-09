import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';

export function generateMetadata() {
  return { title: 'Admin Access — KSV Pallastrada' };
}

export default async function AdminLoginPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const session = await auth();

  if (session) {
    redirect(`/${locale}/tournoi/admin`);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: '#081A2E' }}
    >
      <div className="w-full max-w-sm px-6">
        <div className="mb-8">
          <p className="font-mono text-[10px] tracking-[0.2em] mb-3" style={{ color: 'rgba(166,173,185,0.5)' }}>
            KSV PALLASTRADA
          </p>
          <h1 className="font-display text-paper" style={{ fontSize: 48 }}>
            ADMIN ACCESS
          </h1>
        </div>
        <div style={{ background: '#0A1829', border: '1px solid rgba(250,246,236,0.08)', padding: '40px' }}>
          <LoginForm locale={locale} />
        </div>
      </div>
    </div>
  );
}
