import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { z } from 'zod';

const groupeUpdateSchema = z.object({
  equipeIds: z.array(z.string()),
});

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { equipeIds } = groupeUpdateSchema.parse(body);

    await prisma.equipe.updateMany({
      where: { id: { in: equipeIds } },
      data: { groupeId: params.id },
    });

    const groupe = await prisma.groupe.findUnique({
      where: { id: params.id },
      include: { equipes: true },
    });
    return NextResponse.json(groupe);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
