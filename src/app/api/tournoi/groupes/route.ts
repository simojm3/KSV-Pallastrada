export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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
