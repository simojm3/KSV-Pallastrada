import type { Equipe, Match, StandingRow } from '@/types/tournoi';

export function computeStandings(equipes: Equipe[], matchs: Match[]): StandingRow[] {
  const rows: Record<string, StandingRow> = {};

  for (const equipe of equipes) {
    rows[equipe.id] = {
      equipe,
      joues: 0, gagnes: 0, nuls: 0, perdus: 0,
      buts_pour: 0, buts_contre: 0, diff: 0, points: 0,
    };
  }

  for (const match of matchs) {
    if (
      match.statut !== 'TERMINE' ||
      match.scoreDomicile === null ||
      match.scoreExterieur === null
    ) continue;

    const dom = rows[match.equipeDomicileId];
    const ext = rows[match.equipeExterieId];
    if (!dom || !ext) continue;

    dom.joues++; ext.joues++;
    dom.buts_pour += match.scoreDomicile;
    dom.buts_contre += match.scoreExterieur;
    ext.buts_pour += match.scoreExterieur;
    ext.buts_contre += match.scoreDomicile;

    if (match.scoreDomicile > match.scoreExterieur) {
      dom.gagnes++; dom.points += 3; ext.perdus++;
    } else if (match.scoreDomicile < match.scoreExterieur) {
      ext.gagnes++; ext.points += 3; dom.perdus++;
    } else {
      dom.nuls++; dom.points++;
      ext.nuls++; ext.points++;
    }
  }

  for (const row of Object.values(rows)) {
    row.diff = row.buts_pour - row.buts_contre;
  }

  return Object.values(rows).sort(
    (a, b) =>
      b.points - a.points ||
      b.diff - a.diff ||
      b.buts_pour - a.buts_pour ||
      a.equipe.nom.localeCompare(b.equipe.nom)
  );
}
