// prisma/seed.ts — PALLASTRADA CUP 2026
// Lance avec : npm run db:seed

import { PrismaClient, MatchPhase, MatchStatut } from '@prisma/client';

const prisma = new PrismaClient();

// Heure locale Berne (UTC+2) → ISO string
const t = (time: string) => new Date(`2026-06-07T${time}:00+02:00`);

async function main() {
  console.log('🌱 Import PALLASTRADA CUP 2026...');

  // ── Nettoyage ────────────────────────────────────────────────
  await prisma.$executeRaw`DELETE FROM buts`;
  await prisma.match.deleteMany();
  await prisma.equipe.deleteMany();
  await prisma.groupe.deleteMany();

  // ── Groupes ──────────────────────────────────────────────────
  const groupeA = await prisma.groupe.create({ data: { nom: 'Groupe A' } });
  const groupeB = await prisma.groupe.create({ data: { nom: 'Groupe B' } });

  // ── Équipes Groupe A ─────────────────────────────────────────
  const PST = await prisma.equipe.create({ data: { nom: 'Pallastrada',     groupeId: groupeA.id } });
  const MZA = await prisma.equipe.create({ data: { nom: 'Mazay',           groupeId: groupeA.id } });
  const PNG = await prisma.equipe.create({ data: { nom: 'FC Pichangueros', groupeId: groupeA.id } });

  // ── Équipes Groupe B ─────────────────────────────────────────
  const BAO = await prisma.equipe.create({ data: { nom: 'Bärn Ost',        groupeId: groupeB.id } });
  const KAR = await prisma.equipe.create({ data: { nom: 'Kariim',          groupeId: groupeB.id } });
  const JPG = await prisma.equipe.create({ data: { nom: 'Joda Pichanguera',groupeId: groupeB.id } });

  // ── Matchs Groupe A (double round-robin) — Terrain 1 ─────────
  const matchsA = [
    { dom: MZA, ext: PNG, heure: t('13:30'), ordre: 1, terrain: 'Terrain 1' },
    { dom: PST, ext: MZA, heure: t('14:00'), ordre: 2, terrain: 'Terrain 1' },
    { dom: PNG, ext: PST, heure: t('14:30'), ordre: 3, terrain: 'Terrain 1' },
    { dom: PNG, ext: MZA, heure: t('15:00'), ordre: 4, terrain: 'Terrain 1' },
    { dom: MZA, ext: PST, heure: t('15:30'), ordre: 5, terrain: 'Terrain 1' },
    { dom: PST, ext: PNG, heure: t('16:00'), ordre: 6, terrain: 'Terrain 1' },
  ];

  // ── Matchs Groupe B (double round-robin) — Terrain 2 ─────────
  const matchsB = [
    { dom: KAR, ext: JPG, heure: t('13:30'), ordre: 1, terrain: 'Terrain 2' },
    { dom: BAO, ext: KAR, heure: t('14:00'), ordre: 2, terrain: 'Terrain 2' },
    { dom: JPG, ext: BAO, heure: t('14:30'), ordre: 3, terrain: 'Terrain 2' },
    { dom: JPG, ext: KAR, heure: t('15:00'), ordre: 4, terrain: 'Terrain 2' },
    { dom: KAR, ext: BAO, heure: t('15:30'), ordre: 5, terrain: 'Terrain 2' },
    { dom: BAO, ext: JPG, heure: t('16:00'), ordre: 6, terrain: 'Terrain 2' },
  ];

  for (const m of [...matchsA, ...matchsB]) {
    await prisma.match.create({
      data: {
        equipeDomicileId: m.dom.id,
        equipeExterieId:  m.ext.id,
        heure:            m.heure,
        terrain:          m.terrain,
        statut:           MatchStatut.A_VENIR,
        phase:            MatchPhase.GROUPES,
        ordre:            m.ordre,
      },
    });
  }

  // ── Phase finale (placeholders — rempli après classement) ────
  // Demi-finales 16:30 : 1er A vs 2e B  |  1er B vs 2e A
  await prisma.match.create({
    data: {
      equipeDomicileId: PST.id,
      equipeExterieId:  KAR.id,
      heure:    t('16:30'),
      terrain:  'Terrain 1',
      statut:   MatchStatut.A_VENIR,
      phase:    MatchPhase.DEMI_FINALE,
      ordre:    1,
    },
  });
  await prisma.match.create({
    data: {
      equipeDomicileId: BAO.id,
      equipeExterieId:  MZA.id,
      heure:    t('16:30'),
      terrain:  'Terrain 2',
      statut:   MatchStatut.A_VENIR,
      phase:    MatchPhase.DEMI_FINALE,
      ordre:    2,
    },
  });

  // 3e place 17:00 — Terrain 2
  await prisma.match.create({
    data: {
      equipeDomicileId: PNG.id,
      equipeExterieId:  JPG.id,
      heure:    t('17:00'),
      terrain:  'Terrain 2',
      statut:   MatchStatut.A_VENIR,
      phase:    MatchPhase.TROISIEME_PLACE,
      ordre:    1,
    },
  });

  // Finale 17:30 — Terrain 1
  await prisma.match.create({
    data: {
      equipeDomicileId: PST.id,
      equipeExterieId:  BAO.id,
      heure:    t('17:30'),
      terrain:  'Terrain 1',
      statut:   MatchStatut.A_VENIR,
      phase:    MatchPhase.FINALE,
      ordre:    1,
    },
  });

  console.log('✅ Import terminé !');
  console.log('   Groupe A : Pallastrada · Mazay · FC Pichangueros');
  console.log('   Groupe B : Bärn Ost · Kariim · Joda Pichanguera');
  console.log('   12 matchs de groupe + 4 matchs phase finale');
  console.log('   ⚠️  Les équipes des matchs finales sont des placeholders.');
  console.log('      Utilisez "Générer les demi-finales" dans l\'admin une fois les groupes terminés.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
