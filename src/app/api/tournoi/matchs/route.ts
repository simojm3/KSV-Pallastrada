export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { matchCreateSchema } from '@/lib/validations';

export async function GET() {
  try {
    const matchs = await prisma.match.findMany({
      include: {
        equipeDomicile: true,
        equipeExterieur: true,
      },
      orderBy: [{ phase: 'asc' }, { ordre: 'asc' }, { heure: 'asc' }],
    });
    return NextResponse.json(matchs);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const data = matchCreateSchema.parse(body);

    const match = await prisma.match.create({
      data: {
        equipeDomicileId: data.equipeDomicileId,
        equipeExterieId: data.equipeExterieId,
        heure: data.heure ? new Date(data.heure) : null,
        terrain: data.terrain ?? null,
        phase: data.phase,
        ordre: data.ordre ?? null,
      },
      include: { equipeDomicile: true, equipeExterieur: true },
    });
    return NextResponse.json(match, { status: 201 });
  } catch (e: unknown) {
    if (e instanceof Error && e.constructor.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
