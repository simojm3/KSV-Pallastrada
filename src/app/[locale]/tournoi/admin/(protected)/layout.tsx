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
    /*
     * fixed inset-0 z-50 → covers the entire viewport and sits on top of
     * the public site Header that is rendered by the parent [locale]/layout.tsx.
     * This avoids restructuring the whole routing hierarchy while keeping
     * the admin dashboard fully isolated visually.
     */
    <div className="fixed inset-0 z-50 flex flex-col lg:flex-row bg-navy-deep overflow-hidden">
      <AdminSidebar locale={locale} userEmail={session.user?.email} />
      <main className="flex-1 overflow-y-auto min-h-0 pb-16 lg:pb-0">
        {children}
      </main>
    </div>
  );
}
