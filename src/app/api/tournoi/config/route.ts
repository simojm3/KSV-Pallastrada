import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

type ConfigRow = { id: string; liveVisible: boolean };

async function getConfig(): Promise<ConfigRow> {
  await prisma.$executeRaw`
    INSERT INTO config (id, "liveVisible")
    VALUES ('main', false)
    ON CONFLICT (id) DO NOTHING
  `;
  const rows = await prisma.$queryRaw<ConfigRow[]>`
    SELECT id, "liveVisible" FROM config WHERE id = 'main'
  `;
  return rows[0];
}

export async function GET() {
  const config = await getConfig();
  return NextResponse.json(config);
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { liveVisible } = await req.json();
  await prisma.$executeRaw`
    UPDATE config SET "liveVisible" = ${liveVisible} WHERE id = 'main'
  `;
  return NextResponse.json({ id: 'main', liveVisible });
}
