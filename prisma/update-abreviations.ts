// prisma/update-abreviations.ts
// Met à jour les abréviations des équipes existantes
// Lance avec : npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/update-abreviations.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const MAP: Record<string, string> = {
  'Pallastrada':      'PST',
  'Mazay':            'MZA',
  'FC Pichangueros':  'PNG',
  'Bärn Ost':         'BÄO',
  'Kariim':           'KAR',
  'Joda Pichanguera': 'JPG',
};

async function main() {
  const equipes = await prisma.equipe.findMany();
  let updated = 0;

  for (const eq of equipes) {
    const abr = MAP[eq.nom];
    if (abr) {
      await prisma.$executeRawUnsafe(
        `UPDATE equipes SET abreviation = $1 WHERE id = $2`,
        abr,
        eq.id,
      );
      console.log(`✅  ${eq.nom}  →  ${abr}`);
      updated++;
    } else {
      console.log(`⚠️   Pas d'abréviation pour "${eq.nom}" — à définir dans l'admin`);
    }
  }

  console.log(`\n${updated} équipe(s) mise(s) à jour.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
