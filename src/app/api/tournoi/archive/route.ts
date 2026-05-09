export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { computeStandings } from '@/lib/standings';

async function ensureArchivesTable() {
  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS archives (
      id TEXT PRIMARY KEY,
      nom TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      data JSONB NOT NULL
    )
  `;
}

export async function GET() {
  try {
    await ensureArchivesTable();
    const rows = await prisma.$queryRaw<
      { id: string; nom: string; created_at: string; data: unknown }[]
    >`SELECT id, nom, created_at, data->>'champion' AS champion FROM archives ORDER BY created_at DESC`;
    return NextResponse.json(rows);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json().catch(() => ({}));
    const nom: string = body.nom?.trim() || `Tournoi ${new Date().getFullYear()}`;

    await ensureArchivesTable();

    // ── Snapshot current tournament data ──
    const [groupes, allMatchs, butsRaw] = await Promise.all([
      prisma.groupe.findMany({ include: { equipes: true }, orderBy: { nom: 'asc' } }),
      prisma.match.findMany({
        include: { equipeDomicile: true, equipeExterieur: true },
        orderBy: [{ phase: 'asc' }, { ordre: 'asc' }, { heure: 'asc' }],
      }),
      prisma.$queryRaw<{ id: string; matchId: string; equipeId: string; minute: number | null; buteur: string | null }[]>`
        SELECT id, "matchId", "equipeId", minute, buteur FROM buts
      `,
    ]);

    const groupMatchs = allMatchs.filter((m) => m.phase === 'GROUPES');
    const matchsFinale = allMatchs.filter((m) => m.phase !== 'GROUPES');

    const groupesSnapshot = groupes.map((g) => {
      const teamIds = new Set(g.equipes.map((e) => e.id));
      const matchs = groupMatchs
        .filter((m) => teamIds.has(m.equipeDomicileId))
        .map((m) => ({ ...m, buts: butsRaw.filter((b) => b.matchId === m.id) }));
      const standings = computeStandings(
        g.equipes as Parameters<typeof computeStandings>[0],
        matchs as Parameters<typeof computeStandings>[1]
      );
      return { ...g, matchs, standings };
    });

    const matchsFinaleSnapshot = matchsFinale.map((m) => ({
      ...m,
      buts: butsRaw.filter((b) => b.matchId === m.id),
    }));

    // Determine podium
    const finalMatch = matchsFinale.find((m) => m.phase === 'FINALE' && m.statut === 'TERMINE');
    const thirdMatch = matchsFinale.find((m) => m.phase === 'TROISIEME_PLACE' && m.statut === 'TERMINE');
    let champion = null, runnerUp = null, thirdPlace = null;
    if (finalMatch) {
      const d = finalMatch.scoreDomicile ?? 0;
      const e = finalMatch.scoreExterieur ?? 0;
      champion   = d >= e ? finalMatch.equipeDomicile : finalMatch.equipeExterieur;
      runnerUp   = d >= e ? finalMatch.equipeExterieur : finalMatch.equipeDomicile;
    }
    if (thirdMatch) {
      const d = thirdMatch.scoreDomicile ?? 0;
      const e = thirdMatch.scoreExterieur ?? 0;
      thirdPlace = d >= e ? thirdMatch.equipeDomicile : thirdMatch.equipeExterieur;
    }

    const snapshot = {
      groupes: groupesSnapshot,
      matchsFinale: matchsFinaleSnapshot,
      champion,
      runnerUp,
      thirdPlace,
      archivedAt: new Date().toISOString(),
    };

    const id = crypto.randomUUID();
    const dataJson = JSON.stringify(snapshot);
    await prisma.$executeRaw`
      INSERT INTO archives (id, nom, data) VALUES (${id}, ${nom}, ${dataJson}::jsonb)
    `;

    // ── Reset tournament ──
    await prisma.$executeRaw`DELETE FROM buts`;
    await prisma.match.deleteMany();
    await prisma.equipe.deleteMany();
    await prisma.groupe.deleteMany();
    await prisma.$executeRaw`UPDATE config SET "liveVisible" = false WHERE id = 'main'`;

    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch (e) {
    console.error('[archive POST]', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
