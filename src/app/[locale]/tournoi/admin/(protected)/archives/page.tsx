import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function ArchivesPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  await auth();

  let archives: { id: string; nom: string; created_at: string; champion: string | null }[] = [];
  try {
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS archives (
        id TEXT PRIMARY KEY,
        nom TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        data JSONB NOT NULL
      )
    `;
    archives = await prisma.$queryRaw`
      SELECT id, nom, created_at,
             data->'champion'->>'nom' AS champion
      FROM archives
      ORDER BY created_at DESC
    `;
  } catch { /* table may not exist yet */ }

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <p className="font-mono text-[10px] tracking-[0.2em] mb-2" style={{ color: 'rgba(166,173,185,0.5)' }}>ADMIN</p>
        <h1 className="font-display text-paper" style={{ fontSize: 40 }}>ARCHIVES</h1>
        <p className="font-mono text-[11px] mt-1" style={{ color: 'rgba(166,173,185,0.35)' }}>
          {archives.length} tournament{archives.length !== 1 ? 's' : ''} archived
        </p>
      </div>

      {archives.length === 0 ? (
        <div className="py-16 text-center" style={{ border: '1px solid rgba(250,246,236,0.06)' }}>
          <p className="font-mono text-[12px] tracking-[0.1em]" style={{ color: 'rgba(166,173,185,0.3)' }}>
            No archives yet. Use "Archive & Start New Tournament" from the dashboard.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-0.5">
          {archives.map((a) => {
            const date = new Date(a.created_at).toLocaleDateString('fr-CH', {
              day: '2-digit', month: 'long', year: 'numeric',
            });
            return (
              <Link
                key={a.id}
                href={`/${locale}/tournoi/admin/archives/${a.id}`}
                className="group flex items-center justify-between gap-4 px-6 py-5 transition-colors"
                style={{ background: '#0A1829', border: '1px solid rgba(250,246,236,0.06)' }}
              >
                <div>
                  <p className="font-display text-paper group-hover:text-sun transition-colors" style={{ fontSize: 22 }}>
                    {a.nom.toUpperCase()}
                  </p>
                  <p className="font-mono text-[10px] mt-1" style={{ color: 'rgba(166,173,185,0.4)' }}>{date}</p>
                </div>
                <div className="text-right shrink-0">
                  {a.champion && (
                    <p className="font-sans text-[13px] font-semibold" style={{ color: '#E8A23C' }}>
                      🏆 {a.champion}
                    </p>
                  )}
                  <p className="font-mono text-[10px] mt-1" style={{ color: 'rgba(166,173,185,0.3)' }}>VIEW →</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
