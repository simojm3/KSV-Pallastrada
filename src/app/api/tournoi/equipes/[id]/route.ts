export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { equipeSchema } from '@/lib/validations';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const data = equipeSchema.parse(body);

    // Update standard fields via Prisma ORM
    const { abreviation, ...rest } = data;
    await prisma.equipe.update({ where: { id: params.id }, data: rest });

    // Update abreviation via raw SQL (column added after initial client generation)
    if (abreviation !== undefined) {
      await prisma.$executeRawUnsafe(
        `UPDATE equipes SET abreviation = $1 WHERE id = $2`,
        abreviation,
        params.id,
      );
    }

    // Return the full updated row
    const rows = await prisma.$queryRawUnsafe<Record<string, unknown>[]>(
      `SELECT id, nom, abreviation, logo, "groupeId", "createdAt", "updatedAt" FROM equipes WHERE id = $1`,
      params.id,
    );
    return NextResponse.json(rows[0] ?? {});
  } catch (e: unknown) {
    console.error('[PUT equipe]', e);
    if (e instanceof Error && e.constructor.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await prisma.equipe.delete({ where: { id: params.id } });
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
