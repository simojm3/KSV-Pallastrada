import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { equipeSchema } from '@/lib/validations';

export async function GET() {
  try {
    const equipes = await prisma.equipe.findMany({
      include: { groupe: true },
      orderBy: { nom: 'asc' },
    });
    return NextResponse.json(equipes);
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
    const equipe = await prisma.equipe.create({ data });
    return NextResponse.json(equipe, { status: 201 });
  } catch (e: unknown) {
    if (e instanceof Error && e.constructor.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
