export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function POST() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const [groupes, existingGroupMatchs] = await Promise.all([
      prisma.groupe.findMany({ include: { equipes: true }, orderBy: { nom: 'asc' } }),
      prisma.match.count({ where: { phase: 'GROUPES' } }),
    ]);

    if (groupes.length === 0) {
      return NextResponse.json({ error: 'No groups found. Create groups first.' }, { status: 400 });
    }
    if (groupes.every((g) => g.equipes.length === 0)) {
      return NextResponse.json({ error: 'Groups have no teams. Assign teams to groups first.' }, { status: 400 });
    }
    if (existingGroupMatchs > 0) {
      return NextResponse.json({ error: 'Group matches already exist.' }, { status: 400 });
    }

    const created: { id: string }[] = [];
    let ordre = 1;

    for (const groupe of groupes) {
      const teams = groupe.equipes;
      // Round-robin: each team vs every other team in the group
      for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
          const match = await prisma.match.create({
            data: {
              equipeDomicileId: teams[i].id,
              equipeExterieId: teams[j].id,
              phase: 'GROUPES',
              ordre: ordre++,
            },
          });
          created.push({ id: match.id });
        }
      }
    }

    return NextResponse.json({ created: created.length, matchs: created }, { status: 201 });
  } catch (e) {
    console.error('[generate-groups]', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
