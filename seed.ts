// prisma/seed.ts
// Lance avec : npx prisma db seed

import { PrismaClient, MatchPhase, MatchStatut } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Nettoyage
  await prisma.match.deleteMany()
  await prisma.equipe.deleteMany()
  await prisma.groupe.deleteMany()

  // Création des groupes
  const groupeA = await prisma.groupe.create({
    data: { nom: 'Groupe A' }
  })

  const groupeB = await prisma.groupe.create({
    data: { nom: 'Groupe B' }
  })

  // Équipes Groupe A
  const [equipeA1, equipeA2, equipeA3, equipeA4] = await Promise.all([
    prisma.equipe.create({ data: { nom: 'FC Berne', groupeId: groupeA.id } }),
    prisma.equipe.create({ data: { nom: 'SC Zürich', groupeId: groupeA.id } }),
    prisma.equipe.create({ data: { nom: 'Servette', groupeId: groupeA.id } }),
    prisma.equipe.create({ data: { nom: 'FC Basel', groupeId: groupeA.id } }),
  ])

  // Équipes Groupe B
  const [equipeB1, equipeB2, equipeB3, equipeB4] = await Promise.all([
    prisma.equipe.create({ data: { nom: 'FC Lausanne', groupeId: groupeB.id } }),
    prisma.equipe.create({ data: { nom: 'FC Sion', groupeId: groupeB.id } }),
    prisma.equipe.create({ data: { nom: 'FC Luzern', groupeId: groupeB.id } }),
    prisma.equipe.create({ data: { nom: 'FC St. Gallen', groupeId: groupeB.id } }),
  ])

  // Matchs de groupe A (round-robin : chaque équipe joue contre les 3 autres)
  const matchsGroupeA = [
    { domicileId: equipeA1.id, exterieId: equipeA2.id, heure: new Date('2026-06-07T09:00:00'), terrain: 'Terrain 1', ordre: 1 },
    { domicileId: equipeA3.id, exterieId: equipeA4.id, heure: new Date('2026-06-07T09:00:00'), terrain: 'Terrain 2', ordre: 2 },
    { domicileId: equipeA1.id, exterieId: equipeA3.id, heure: new Date('2026-06-07T11:00:00'), terrain: 'Terrain 1', ordre: 3 },
    { domicileId: equipeA2.id, exterieId: equipeA4.id, heure: new Date('2026-06-07T11:00:00'), terrain: 'Terrain 2', ordre: 4 },
    { domicileId: equipeA1.id, exterieId: equipeA4.id, heure: new Date('2026-06-07T13:00:00'), terrain: 'Terrain 1', ordre: 5 },
    { domicileId: equipeA2.id, exterieId: equipeA3.id, heure: new Date('2026-06-07T13:00:00'), terrain: 'Terrain 2', ordre: 6 },
  ]

  // Matchs de groupe B
  const matchsGroupeB = [
    { domicileId: equipeB1.id, exterieId: equipeB2.id, heure: new Date('2026-06-07T09:00:00'), terrain: 'Terrain 3', ordre: 7 },
    { domicileId: equipeB3.id, exterieId: equipeB4.id, heure: new Date('2026-06-07T09:00:00'), terrain: 'Terrain 4', ordre: 8 },
    { domicileId: equipeB1.id, exterieId: equipeB3.id, heure: new Date('2026-06-07T11:00:00'), terrain: 'Terrain 3', ordre: 9 },
    { domicileId: equipeB2.id, exterieId: equipeB4.id, heure: new Date('2026-06-07T11:00:00'), terrain: 'Terrain 4', ordre: 10 },
    { domicileId: equipeB1.id, exterieId: equipeB4.id, heure: new Date('2026-06-07T13:00:00'), terrain: 'Terrain 3', ordre: 11 },
    { domicileId: equipeB2.id, exterieId: equipeB3.id, heure: new Date('2026-06-07T13:00:00'), terrain: 'Terrain 4', ordre: 12 },
  ]

  for (const m of matchsGroupeA) {
    await prisma.match.create({
      data: {
        equipeDomicileId: m.domicileId,
        equipeExterieId: m.exterieId,
        heure: m.heure,
        terrain: m.terrain,
        ordre: m.ordre,
        statut: MatchStatut.A_VENIR,
        phase: MatchPhase.GROUPES,
      }
    })
  }

  for (const m of matchsGroupeB) {
    await prisma.match.create({
      data: {
        equipeDomicileId: m.domicileId,
        equipeExterieId: m.exterieId,
        heure: m.heure,
        terrain: m.terrain,
        ordre: m.ordre,
        statut: MatchStatut.A_VENIR,
        phase: MatchPhase.GROUPES,
      }
    })
  }

  // Matchs phase finale (placeholders — équipes à définir après groupes)
  await prisma.match.createMany({
    data: [
      {
        equipeDomicileId: equipeA1.id, // Placeholder : 1er Groupe A
        equipeExterieId: equipeB2.id,  // Placeholder : 2e Groupe B
        heure: new Date('2026-06-07T15:30:00'),
        terrain: 'Terrain 1',
        ordre: 13,
        statut: MatchStatut.A_VENIR,
        phase: MatchPhase.DEMI_FINALE,
      },
      {
        equipeDomicileId: equipeB1.id, // Placeholder : 1er Groupe B
        equipeExterieId: equipeA2.id,  // Placeholder : 2e Groupe A
        heure: new Date('2026-06-07T15:30:00'),
        terrain: 'Terrain 2',
        ordre: 14,
        statut: MatchStatut.A_VENIR,
        phase: MatchPhase.DEMI_FINALE,
      },
      {
        equipeDomicileId: equipeA3.id, // Placeholder
        equipeExterieId: equipeB3.id,  // Placeholder
        heure: new Date('2026-06-07T17:30:00'),
        terrain: 'Terrain 2',
        ordre: 15,
        statut: MatchStatut.A_VENIR,
        phase: MatchPhase.TROISIEME_PLACE,
      },
      {
        equipeDomicileId: equipeA1.id, // Placeholder
        equipeExterieId: equipeB1.id,  // Placeholder
        heure: new Date('2026-06-07T18:00:00'),
        terrain: 'Terrain 1',
        ordre: 16,
        statut: MatchStatut.A_VENIR,
        phase: MatchPhase.FINALE,
      },
    ]
  })

  console.log('✅ Seed terminé avec succès!')
  console.log(`   - 2 groupes créés`)
  console.log(`   - 8 équipes créées`)
  console.log(`   - ${matchsGroupeA.length + matchsGroupeB.length} matchs de groupes créés`)
  console.log(`   - 4 matchs de phase finale créés (placeholders)`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
