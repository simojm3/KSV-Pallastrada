export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function DELETE() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    // Order matters: delete child tables first
    await prisma.$executeRaw`DELETE FROM buts`;
    await prisma.match.deleteMany();
    await prisma.equipe.deleteMany();
    await prisma.groupe.deleteMany();
    await prisma.$executeRaw`UPDATE config SET "liveVisible" = false WHERE id = 'main'`;

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[reset]', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
