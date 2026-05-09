export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const groupes = await prisma.groupe.findMany({
      include: { equipes: { orderBy: { nom: 'asc' } } },
      orderBy: { nom: 'asc' },
    });
    return NextResponse.json(groupes);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const nom = body.nom?.trim();
    if (!nom) return NextResponse.json({ error: 'Name required' }, { status: 400 });

    const groupe = await prisma.groupe.create({
      data: { nom },
      include: { equipes: true },
    });
    return NextResponse.json(groupe, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
