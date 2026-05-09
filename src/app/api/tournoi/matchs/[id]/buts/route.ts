export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { z } from 'zod';
import { pusher, PUSHER_CHANNEL, PUSHER_EVENT } from '@/lib/pusher';

const butSchema = z.object({
  equipeId: z.string(),
  minute: z.number().int().min(1).max(120).nullable().optional(),
  buteur: z.string().max(60).nullable().optional(),
});

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const buts = await prisma.$queryRaw<{ id: string; matchId: string; equipeId: string; minute: number | null; buteur: string | null }[]>`
      SELECT id, "matchId", "equipeId", minute, buteur
      FROM buts
      WHERE "matchId" = ${params.id}
      ORDER BY minute ASC NULLS LAST, "createdAt" ASC
    `;
    return NextResponse.json(buts);
  } catch (e) {
    console.error('[GET buts]', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const data = butSchema.parse(body);
    const id = crypto.randomUUID();

    console.log('[POST but] matchId:', params.id, 'equipeId:', data.equipeId);

    await prisma.$executeRaw`
      INSERT INTO buts (id, "matchId", "equipeId", minute, buteur)
      VALUES (${id}, ${params.id}, ${data.equipeId}, ${null}, ${null})
    `;

    console.log('[POST but] inserted id:', id);
    pusher.trigger(PUSHER_CHANNEL, PUSHER_EVENT, { matchId: params.id }).catch((err) => {
      console.error('[Pusher] trigger failed:', err);
    });
    return NextResponse.json({ id, matchId: params.id, equipeId: data.equipeId }, { status: 201 });
  } catch (e) {
    console.error('[POST but]', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
