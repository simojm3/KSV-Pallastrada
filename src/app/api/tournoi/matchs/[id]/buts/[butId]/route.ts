export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { pusher, PUSHER_CHANNEL, PUSHER_EVENT } from '@/lib/pusher';

export async function DELETE(_req: Request, { params }: { params: { id: string; butId: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await prisma.$executeRaw`DELETE FROM buts WHERE id = ${params.butId} AND "matchId" = ${params.id}`;
  pusher.trigger(PUSHER_CHANNEL, PUSHER_EVENT, { matchId: params.id }).catch((err) => {
    console.error('[Pusher] trigger failed:', err);
  });
  return new NextResponse(null, { status: 204 });
}
