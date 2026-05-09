import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function ProtectedAdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  const session = await auth();
  if (!session) redirect(`/${locale}/tournoi/admin/login`);

  return (
    <div className="flex h-screen bg-navy-deep overflow-hidden">
      <AdminSidebar locale={locale} userEmail={session.user?.email} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
