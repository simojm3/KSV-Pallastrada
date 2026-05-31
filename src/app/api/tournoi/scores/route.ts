export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { computeStandings } from '@/lib/standings';
import type { TournoiData, Match } from '@/types/tournoi';

export const revalidate = 0;

export async function GET() {
  try {
    // Ensure buts table exists (resilient against accidental drops)
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS buts (
        id TEXT PRIMARY KEY,
        "matchId" TEXT NOT NULL REFERENCES matchs(id) ON DELETE CASCADE,
        "equipeId" TEXT NOT NULL,
        minute INTEGER,
        buteur TEXT,
        "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `).catch(() => {});

    // Fetch abreviations via raw SQL (column added after initial Prisma client generation)
    const equipesAbr = await prisma.$queryRaw<{ id: string; abreviation: string | null }[]>`
      SELECT id, abreviation FROM equipes
    `.catch(() => [] as { id: string; abreviation: string | null }[]);
    const abrMap = new Map(equipesAbr.map((e) => [e.id, e.abreviation]));

    const [groupes, allMatchs, matchsFinale] = await Promise.all([
      prisma.groupe.findMany({
        include: { equipes: true },
        orderBy: { nom: 'asc' },
      }),
      prisma.match.findMany({
        where: { phase: 'GROUPES' },
        include: { equipeDomicile: true, equipeExterieur: true },
        orderBy: [{ ordre: 'asc' }, { heure: 'asc' }],
      }),
      prisma.match.findMany({
        where: { phase: { in: ['DEMI_FINALE', 'TROISIEME_PLACE', 'FINALE'] } },
        include: { equipeDomicile: true, equipeExterieur: true },
        orderBy: [{ phase: 'asc' }, { ordre: 'asc' }],
      }),
    ]);

    // Inject abreviation into equipe objects while preserving all original fields
    const withAbr = <T extends { id: string }>(equipe: T): T & { abreviation: string | null } => ({
      ...equipe,
      abreviation: abrMap.get(equipe.id) ?? null,
    });

    const data: TournoiData = {
      groupes: groupes.map((g) => {
        const teamIds = new Set(g.equipes.map((e) => e.id));
        const enrichedEquipes = g.equipes.map(withAbr);
        const groupMatchs = allMatchs
          .filter((m) => teamIds.has(m.equipeDomicileId))
          .map((m) => ({
            ...m,
            equipeDomicile: withAbr(m.equipeDomicile),
            equipeExterieur: withAbr(m.equipeExterieur),
          })) as unknown as Match[];
        return {
          ...g,
          equipes: enrichedEquipes as unknown as import('@/types/tournoi').Equipe[],
          matchs: groupMatchs,
          standings: computeStandings(enrichedEquipes as unknown as import('@/types/tournoi').Equipe[], groupMatchs),
        };
      }),
      matchsFinale: matchsFinale.map((m) => ({
        ...m,
        equipeDomicile: withAbr(m.equipeDomicile),
        equipeExterieur: withAbr(m.equipeExterieur),
      })) as unknown as Match[],
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
