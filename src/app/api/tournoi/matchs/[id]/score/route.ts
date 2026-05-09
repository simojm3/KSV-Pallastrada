export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { z } from 'zod';
import { pusher, PUSHER_CHANNEL, PUSHER_EVENT } from '@/lib/pusher';

const scoreSchema = z.object({
  scoreDomicile: z.number().int().min(0).nullable(),
  scoreExterieur: z.number().int().min(0).nullable(),
  statut: z.enum(['A_VENIR', 'EN_COURS', 'TERMINE']),
});

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const data = scoreSchema.parse(body);
    const match = await prisma.match.update({
      where: { id: params.id },
      data,
      include: { equipeDomicile: true, equipeExterieur: true },
    });
    pusher.trigger(PUSHER_CHANNEL, PUSHER_EVENT, { matchId: params.id }).catch((err) => {
      console.error('[Pusher] trigger failed:', err);
    });
    return NextResponse.json(match);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
