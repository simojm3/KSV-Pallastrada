export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { matchUpdateSchema } from '@/lib/validations';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const data = matchUpdateSchema.parse(body);

    const { heure, ...rest } = data;
    const match = await prisma.match.update({
      where: { id: params.id },
      data: {
        ...rest,
        ...(heure !== undefined ? { heure: heure ? new Date(heure) : null } : {}),
      },
      include: { equipeDomicile: true, equipeExterieur: true },
    });
    return NextResponse.json(match);
  } catch (e: unknown) {
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
    await prisma.match.delete({ where: { id: params.id } });
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
