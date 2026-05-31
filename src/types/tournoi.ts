export type MatchStatut = 'A_VENIR' | 'EN_COURS' | 'TERMINE';
export type MatchPhase = 'GROUPES' | 'DEMI_FINALE' | 'TROISIEME_PLACE' | 'FINALE';

export interface Equipe {
  id: string;
  nom: string;
  abreviation?: string | null;
  logo: string | null;
  groupeId: string | null;
  groupe?: { id: string; nom: string } | null;
}

export interface Groupe {
  id: string;
  nom: string;
  equipes: Equipe[];
}

export interface But {
  id: string;
  matchId: string;
  equipeId: string;
  minute: number | null;
  buteur: string | null;
}

export interface Match {
  id: string;
  equipeDomicile: Equipe;
  equipeDomicileId: string;
  equipeExterieur: Equipe;
  equipeExterieId: string;
  scoreDomicile: number | null;
  scoreExterieur: number | null;
  statut: MatchStatut;
  phase: MatchPhase;
  heure: string | null;
  terrain: string | null;
  ordre: number | null;
  buts?: But[];
}

export interface StandingRow {
  equipe: Equipe;
  joues: number;
  gagnes: number;
  nuls: number;
  perdus: number;
  buts_pour: number;
  buts_contre: number;
  diff: number;
  points: number;
}

export interface GroupeWithData extends Groupe {
  matchs: Match[];
  standings: StandingRow[];
}

export interface TournoiData {
  groupes: GroupeWithData[];
  matchsFinale: Match[];
  lastUpdated: string;
}
