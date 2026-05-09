export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

function computeGroupStandings(
  equipes: { id: string; nom: string }[],
  matchs: {
    statut: string;
    scoreDomicile: number | null;
    scoreExterieur: number | null;
    equipeDomicileId: string;
    equipeExterieId: string;
  }[]
) {
  const teamIds = new Set(equipes.map((e) => e.id));
  const rows: Record<string, { equipe: { id: string; nom: string }; points: number; diff: number; buts_pour: number }> = {};
  for (const eq of equipes) {
    rows[eq.id] = { equipe: eq, points: 0, diff: 0, buts_pour: 0 };
  }
  for (const m of matchs) {
    if (m.statut !== 'TERMINE' || m.scoreDomicile === null || m.scoreExterieur === null) continue;
    if (!teamIds.has(m.equipeDomicileId) || !teamIds.has(m.equipeExterieId)) continue;
    rows[m.equipeDomicileId].buts_pour += m.scoreDomicile;
    rows[m.equipeExterieId].buts_pour += m.scoreExterieur;
    rows[m.equipeDomicileId].diff += m.scoreDomicile - m.scoreExterieur;
    rows[m.equipeExterieId].diff += m.scoreExterieur - m.scoreDomicile;
    if (m.scoreDomicile > m.scoreExterieur) {
      rows[m.equipeDomicileId].points += 3;
    } else if (m.scoreExterieur > m.scoreDomicile) {
      rows[m.equipeExterieId].points += 3;
    } else {
      rows[m.equipeDomicileId].points += 1;
      rows[m.equipeExterieId].points += 1;
    }
  }
  return Object.values(rows).sort(
    (a, b) => b.points - a.points || b.diff - a.diff || b.buts_pour - a.buts_pour || a.equipe.nom.localeCompare(b.equipe.nom)
  );
}

export async function POST() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const [groupMatchs, groupes, knockoutMatchs] = await Promise.all([
      prisma.match.findMany({
        where: { phase: 'GROUPES' },
        include: { equipeDomicile: true, equipeExterieur: true },
      }),
      prisma.groupe.findMany({
        include: { equipes: true },
        orderBy: { nom: 'asc' },
      }),
      prisma.match.findMany({
        where: { phase: { in: ['DEMI_FINALE', 'TROISIEME_PLACE', 'FINALE'] } },
        include: { equipeDomicile: true, equipeExterieur: true },
        orderBy: { ordre: 'asc' },
      }),
    ]);

    const semis = knockoutMatchs.filter((m) => m.phase === 'DEMI_FINALE');
    const finaux = knockoutMatchs.filter((m) => m.phase === 'FINALE' || m.phase === 'TROISIEME_PLACE');

    // ── Phase 1 : generate semi-finals ──
    if (semis.length === 0) {
      if (groupMatchs.length === 0) {
        return NextResponse.json({ error: 'No group matches found' }, { status: 400 });
      }
      if (groupMatchs.some((m) => m.statut !== 'TERMINE')) {
        return NextResponse.json({ error: 'All group matches must be finished first' }, { status: 400 });
      }
      if (groupes.length < 2) {
        return NextResponse.json({ error: 'Need at least 2 groups' }, { status: 400 });
      }

      const groupeA = groupes[0];
      const groupeB = groupes[1];
      const standingsA = computeGroupStandings(groupeA.equipes, groupMatchs);
      const standingsB = computeGroupStandings(groupeB.equipes, groupMatchs);

      if (standingsA.length < 2 || standingsB.length < 2) {
        return NextResponse.json({ error: 'Each group needs at least 2 teams' }, { status: 400 });
      }

      // SF1: 1st Group A vs 2nd Group B
      // SF2: 1st Group B vs 2nd Group A
      const [sf1, sf2] = await Promise.all([
        prisma.match.create({
          data: {
            equipeDomicileId: standingsA[0].equipe.id,
            equipeExterieId: standingsB[1].equipe.id,
            phase: 'DEMI_FINALE',
            ordre: 1,
          },
          include: { equipeDomicile: true, equipeExterieur: true },
        }),
        prisma.match.create({
          data: {
            equipeDomicileId: standingsB[0].equipe.id,
            equipeExterieId: standingsA[1].equipe.id,
            phase: 'DEMI_FINALE',
            ordre: 2,
          },
          include: { equipeDomicile: true, equipeExterieur: true },
        }),
      ]);

      return NextResponse.json(
        {
          created: 'SEMI_FINALS',
          matches: [sf1, sf2],
          summary: `SF1: ${sf1.equipeDomicile.nom} vs ${sf1.equipeExterieur.nom} | SF2: ${sf2.equipeDomicile.nom} vs ${sf2.equipeExterieur.nom}`,
        },
        { status: 201 }
      );
    }

    // ── Phase 2 : generate final + 3rd place ──
    if (semis.length === 2 && finaux.length === 0) {
      if (semis.some((m) => m.statut !== 'TERMINE')) {
        return NextResponse.json({ error: 'Both semi-finals must be finished first' }, { status: 400 });
      }

      const sf1 = semis.find((m) => m.ordre === 1) ?? semis[0];
      const sf2 = semis.find((m) => m.ordre === 2) ?? semis[1];

      function getResult(m: typeof sf1) {
        if ((m.scoreDomicile ?? 0) >= (m.scoreExterieur ?? 0)) {
          return { winner: m.equipeDomicileId, loser: m.equipeExterieId };
        }
        return { winner: m.equipeExterieId, loser: m.equipeDomicileId };
      }

      const r1 = getResult(sf1);
      const r2 = getResult(sf2);

      const [finale, troisieme] = await Promise.all([
        prisma.match.create({
          data: {
            equipeDomicileId: r1.winner,
            equipeExterieId: r2.winner,
            phase: 'FINALE',
            ordre: 1,
          },
          include: { equipeDomicile: true, equipeExterieur: true },
        }),
        prisma.match.create({
          data: {
            equipeDomicileId: r1.loser,
            equipeExterieId: r2.loser,
            phase: 'TROISIEME_PLACE',
            ordre: 1,
          },
          include: { equipeDomicile: true, equipeExterieur: true },
        }),
      ]);

      return NextResponse.json(
        {
          created: 'FINAL_PHASE',
          matches: [finale, troisieme],
          summary: `Final: ${finale.equipeDomicile.nom} vs ${finale.equipeExterieur.nom} | 3rd: ${troisieme.equipeDomicile.nom} vs ${troisieme.equipeExterieur.nom}`,
        },
        { status: 201 }
      );
    }

    return NextResponse.json({ error: 'Nothing to generate at this stage' }, { status: 400 });
  } catch (e) {
    console.error('[generate-knockout]', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
