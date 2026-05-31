export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { equipeSchema } from '@/lib/validations';

export async function GET() {
  try {
    // Use raw SQL to include abreviation (column added after initial client generation)
    const equipes = await prisma.$queryRaw<Record<string, unknown>[]>`
      SELECT e.id, e.nom, e.abreviation, e.logo, e."groupeId", e."createdAt", e."updatedAt",
             g.id AS "groupe_id", g.nom AS "groupe_nom"
      FROM equipes e
      LEFT JOIN groupes g ON g.id = e."groupeId"
      ORDER BY e.nom ASC
    `;
    // Reshape to match expected {groupe: {id, nom}} structure
    const shaped = equipes.map((e) => ({
      id: e.id,
      nom: e.nom,
      abreviation: e.abreviation ?? null,
      logo: e.logo ?? null,
      groupeId: e.groupeId ?? null,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
      groupe: e.groupe_id ? { id: e.groupe_id, nom: e.groupe_nom } : null,
    }));
    return NextResponse.json(shaped);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const data = equipeSchema.parse(body);
    const { abreviation, ...rest } = data;

    // Create via Prisma for standard fields
    const equipe = await prisma.equipe.create({ data: rest });

    // Set abreviation via raw SQL
    if (abreviation) {
      await prisma.$executeRawUnsafe(
        `UPDATE equipes SET abreviation = $1 WHERE id = $2`,
        abreviation,
        equipe.id,
      );
    }

    return NextResponse.json({ ...equipe, abreviation: abreviation ?? null }, { status: 201 });
  } catch (e: unknown) {
    console.error('[POST equipe]', e);
    if (e instanceof Error && e.constructor.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
