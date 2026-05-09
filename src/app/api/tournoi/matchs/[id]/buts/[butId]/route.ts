import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function DELETE(_req: Request, { params }: { params: { id: string; butId: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await prisma.$executeRaw`DELETE FROM buts WHERE id = ${params.butId} AND "matchId" = ${params.id}`;
  return new NextResponse(null, { status: 204 });
}
