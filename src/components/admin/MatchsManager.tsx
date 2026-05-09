'use client';

import { useState, useEffect, useCallback } from 'react';

type Statut = 'A_VENIR' | 'EN_COURS' | 'TERMINE';
type Phase = 'GROUPES' | 'DEMI_FINALE' | 'TROISIEME_PLACE' | 'FINALE';
type PhaseFilter = 'ALL' | Phase;

interface Equipe { id: string; nom: string }
interface But {
  id: string;
  matchId: string;
  equipeId: string;
  minute: number | null;
  buteur: string | null;
}
interface Match {
  id: string;
  equipeDomicile: Equipe;
  equipeExterieur: Equipe;
  equipeDomicileId: string;
  equipeExterieId: string;
  scoreDomicile: number | null;
  scoreExterieur: number | null;
  statut: Statut;
  phase: Phase;
  heure: string | null;
  terrain: string | null;
  ordre: number | null;
}

const PHASE_LABELS: Record<Phase, string> = {
  GROUPES: 'Group stage',
  DEMI_FINALE: 'Semi-final',
  TROISIEME_PLACE: '3rd place',
  FINALE: 'Final',
};

const STATUT_CONFIG: Record<Statut, { label: string; dotColor: string; textColor: string }> = {
  A_VENIR:  { label: 'Upcoming',   dotColor: 'rgba(250,246,236,0.3)',   textColor: 'rgba(250,246,236,0.4)' },
  EN_COURS: { label: 'Live',       dotColor: '#E63946',                  textColor: '#E63946' },
  TERMINE:  { label: 'Finished',   dotColor: 'rgba(250,246,236,0.2)',   textColor: 'rgba(250,246,236,0.3)' },
};

const PHASE_ORDER: Phase[] = ['GROUPES', 'DEMI_FINALE', 'TROISIEME_PLACE', 'FINALE'];
const PHASE_FILTERS: { key: PhaseFilter; label: string }[] = [
  { key: 'ALL', label: 'ALL' },
  { key: 'GROUPES', label: 'GROUPS' },
  { key: 'DEMI_FINALE', label: 'SEMI-FINALS' },
  { key: 'TROISIEME_PLACE', label: '3RD PLACE' },
  { key: 'FINALE', label: 'FINAL' },
];

const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  background: '#06101F',
  border: '1px solid rgba(250,246,236,0.1)',
  padding: '10px 14px',
  fontFamily: 'var(--font-inter), sans-serif',
  fontSize: 14,
  color: '#FAF6EC',
  outline: 'none',
  borderRadius: 0,
};

export default function MatchsManager() {
  const [matchs, setMatchs] = useState<Match[]>([]);
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<PhaseFilter>('ALL');
  const [editMatch, setEditMatch] = useState<Match | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const load = useCallback(async () => {
    const [mRes, eRes] = await Promise.all([
      fetch('/api/tournoi/matchs'),
      fetch('/api/tournoi/equipes'),
    ]);
    const mData = await mRes.json();
    const eData = await eRes.json();
    setMatchs(Array.isArray(mData) ? mData : []);
    setEquipes(Array.isArray(eData) ? eData : []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleDelete(id: string) {
    if (!confirm('Delete this match?')) return;
    await fetch(`/api/tournoi/matchs/${id}`, { method: 'DELETE' });
    await load();
  }

  const filtered = filter === 'ALL' ? matchs : matchs.filter((m) => m.phase === filter);
  const grouped = PHASE_ORDER.reduce<Record<Phase, Match[]>>((acc, p) => {
    acc[p] = filtered.filter((m) => m.phase === p);
    return acc;
  }, { GROUPES: [], DEMI_FINALE: [], TROISIEME_PLACE: [], FINALE: [] });

  if (loading) return <Spinner />;

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-paper" style={{ fontSize: 40 }}>MATCHES</h1>
          <p className="font-mono text-[11px] mt-1" style={{ color: 'rgba(166,173,185,0.4)' }}>
            {matchs.length} matches scheduled
          </p>
        </div>
        {!showAdd && (
          <button
            onClick={() => setShowAdd(true)}
            className="font-mono text-[12px] font-bold tracking-[0.12em] px-5 py-2.5 bg-sun text-ink transition-opacity hover:opacity-85"
          >
            + NEW MATCH
          </button>
        )}
      </div>

      {showAdd && (
        <AddMatchForm
          equipes={equipes}
          onSave={async () => { await load(); setShowAdd(false); }}
          onCancel={() => setShowAdd(false)}
        />
      )}

      {/* Live panel — shown when matches are in progress */}
      {matchs.filter((m) => m.statut === 'EN_COURS').length > 0 && (
        <LivePanel
          liveMatchs={matchs.filter((m) => m.statut === 'EN_COURS')}
          onScoreUpdate={load}
        />
      )}

      {/* Phase filter tabs */}
      <div className="flex gap-1.5 flex-wrap mb-6">
        {PHASE_FILTERS.map((f) => {
          const count = f.key === 'ALL' ? matchs.length : matchs.filter((m) => m.phase === f.key).length;
          if (f.key !== 'ALL' && count === 0) return null;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="font-mono text-[11px] tracking-[0.1em] px-4 py-1.5 transition-colors"
              style={{
                background: filter === f.key ? '#E8A23C' : 'rgba(250,246,236,0.04)',
                color: filter === f.key ? '#0A0F18' : 'rgba(250,246,236,0.4)',
                border: `1px solid ${filter === f.key ? '#E8A23C' : 'rgba(250,246,236,0.08)'}`,
              }}
            >
              {f.label}
              <span
                className="ml-1.5 text-[10px]"
                style={{ color: filter === f.key ? 'rgba(10,15,24,0.6)' : 'rgba(250,246,236,0.2)' }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Match list */}
      <div className="flex flex-col gap-8">
        {PHASE_ORDER.map((phase) => {
          const list = grouped[phase];
          if (list.length === 0) return null;
          return (
            <div key={phase}>
              <h2 className="font-mono text-[10px] tracking-[0.2em] mb-3" style={{ color: 'rgba(166,173,185,0.3)' }}>
                {PHASE_LABELS[phase].toUpperCase()}
              </h2>
              <div style={{ border: '1px solid rgba(250,246,236,0.07)' }}>
                {list.map((match, i) => (
                  <MatchRow
                    key={match.id}
                    match={match}
                    onEdit={() => setEditMatch(match)}
                    onDelete={() => handleDelete(match.id)}
                    isLast={i === list.length - 1}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <p className="font-sans text-sm italic py-8 text-center" style={{ color: 'rgba(166,173,185,0.3)' }}>
            No matches for this phase.
          </p>
        )}
      </div>

      {editMatch && (
        <ScoreModal
          match={editMatch}
          onSave={async () => { await load(); setEditMatch(null); }}
          onClose={() => setEditMatch(null)}
        />
      )}
    </div>
  );
}

function LivePanel({ liveMatchs, onScoreUpdate }: {
  liveMatchs: Match[];
  onScoreUpdate: () => Promise<void>;
}) {
  return (
    <div
      className="mb-8 p-5"
      style={{ background: 'rgba(230,57,70,0.05)', border: '1px solid rgba(230,57,70,0.2)', borderTop: '3px solid #E63946' }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-live animate-live-pulse shrink-0" />
        <span className="font-mono text-[11px] tracking-[0.2em] font-bold text-live">LIVE</span>
        <span className="font-mono text-[11px]" style={{ color: 'rgba(166,173,185,0.4)' }}>
          — {liveMatchs.length} match{liveMatchs.length > 1 ? 'es' : ''} in progress
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {liveMatchs.map((match) => (
          <LiveMatchCard key={match.id} match={match} onScoreUpdate={onScoreUpdate} />
        ))}
      </div>
    </div>
  );
}

function LiveMatchCard({ match, onScoreUpdate }: {
  match: Match;
  onScoreUpdate: () => Promise<void>;
}) {
  const [buts, setButs] = useState<But[]>([]);
  const [adding, setAdding] = useState<string | null>(null);

  const loadButs = useCallback(async () => {
    const res = await fetch(`/api/tournoi/matchs/${match.id}/buts`);
    const data = await res.json();
    return Array.isArray(data) ? data as But[] : [];
  }, [match.id]);

  useEffect(() => {
    loadButs().then(setButs);
  }, [loadButs]);

  async function addBut(equipeId: string) {
    setAdding(equipeId);
    try {
      await fetch(`/api/tournoi/matchs/${match.id}/buts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ equipeId }),
      });
      const list = await loadButs();
      setButs(list);
      const dom = list.filter((b) => b.equipeId === match.equipeDomicileId).length;
      const ext = list.filter((b) => b.equipeId === match.equipeExterieId).length;
      await fetch(`/api/tournoi/matchs/${match.id}/score`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scoreDomicile: dom, scoreExterieur: ext, statut: 'EN_COURS' }),
      });
      await onScoreUpdate();
    } finally {
      setAdding(null);
    }
  }

  async function deleteBut(butId: string) {
    await fetch(`/api/tournoi/matchs/${match.id}/buts/${butId}`, { method: 'DELETE' });
    const list = await loadButs();
    setButs(list);
    const dom = list.filter((b) => b.equipeId === match.equipeDomicileId).length;
    const ext = list.filter((b) => b.equipeId === match.equipeExterieId).length;
    await fetch(`/api/tournoi/matchs/${match.id}/score`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scoreDomicile: dom, scoreExterieur: ext, statut: 'EN_COURS' }),
    });
    await onScoreUpdate();
  }

  const homeButs = buts.filter((b) => b.equipeId === match.equipeDomicileId).length;
  const awayButs = buts.filter((b) => b.equipeId === match.equipeExterieId).length;

  return (
    <div style={{ background: '#0A1829', border: '1px solid rgba(250,246,236,0.07)' }}>
      {/* Score display */}
      <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid rgba(250,246,236,0.05)' }}>
        <span className="font-sans font-semibold text-paper text-sm flex-1 text-right truncate pr-3">
          {match.equipeDomicile.nom}
        </span>
        <span className="font-display tabular-nums shrink-0" style={{ fontSize: 28, color: '#FAF6EC', minWidth: 80, textAlign: 'center' }}>
          {homeButs} – {awayButs}
        </span>
        <span className="font-sans font-semibold text-paper text-sm flex-1 truncate pl-3">
          {match.equipeExterieur.nom}
        </span>
      </div>

      {/* Goal buttons */}
      <div className="grid grid-cols-2 gap-0" style={{ borderBottom: buts.length > 0 ? '1px solid rgba(250,246,236,0.05)' : undefined }}>
        {[
          { id: match.equipeDomicileId, nom: match.equipeDomicile.nom },
          { id: match.equipeExterieId, nom: match.equipeExterieur.nom },
        ].map((team, i) => (
          <button
            key={team.id}
            onClick={() => addBut(team.id)}
            disabled={adding !== null}
            className="py-4 font-mono text-[13px] font-bold tracking-[0.06em] transition-opacity hover:opacity-80 disabled:opacity-40"
            style={{
              background: 'rgba(232,162,60,0.1)',
              color: '#E8A23C',
              borderRight: i === 0 ? '1px solid rgba(250,246,236,0.05)' : undefined,
            }}
          >
            {adding === team.id ? '...' : `⚽ ${team.nom}`}
          </button>
        ))}
      </div>

      {/* Goals list */}
      {buts.length > 0 && (
        <div className="px-4 py-2 flex flex-wrap gap-2">
          {buts.map((but) => {
            const isHome = but.equipeId === match.equipeDomicileId;
            const teamName = isHome ? match.equipeDomicile.nom : match.equipeExterieur.nom;
            return (
              <div
                key={but.id}
                className="flex items-center gap-1.5 px-2 py-1"
                style={{ background: 'rgba(250,246,236,0.04)', border: '1px solid rgba(250,246,236,0.08)' }}
              >
                <span className="text-[11px]">⚽</span>
                <span className="font-mono text-[10px]" style={{ color: 'rgba(250,246,236,0.6)' }}>{teamName}</span>
                <button
                  onClick={() => deleteBut(but.id)}
                  className="font-mono text-[10px] ml-1 transition-colors hover:text-live"
                  style={{ color: 'rgba(194,74,44,0.5)' }}
                >✕</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function MatchRow({ match, onEdit, onDelete, isLast }: {
  match: Match;
  onEdit: () => void;
  onDelete: () => void;
  isLast: boolean;
}) {
  const cfg = STATUT_CONFIG[match.statut];
  const heure = match.heure
    ? new Date(match.heure).toLocaleTimeString('fr-CH', { hour: '2-digit', minute: '2-digit' })
    : null;
  const hasScore = match.scoreDomicile !== null && match.scoreExterieur !== null;

  return (
    <div
      className="flex items-center gap-4 px-5 py-4 transition-colors"
      style={{
        background: '#0A1829',
        borderBottom: isLast ? 'none' : '1px solid rgba(250,246,236,0.05)',
      }}
    >
      <span
        className={`w-2 h-2 rounded-full shrink-0 ${match.statut === 'EN_COURS' ? 'animate-live-pulse' : ''}`}
        style={{ background: cfg.dotColor }}
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-sm font-sans">
          <span className="text-paper font-medium truncate">{match.equipeDomicile.nom}</span>
          {hasScore ? (
            <span className="font-display px-1" style={{ fontSize: 20, color: '#FAF6EC' }}>
              {match.scoreDomicile} – {match.scoreExterieur}
            </span>
          ) : (
            <span className="font-mono text-[11px] px-1" style={{ color: 'rgba(250,246,236,0.2)' }}>vs</span>
          )}
          <span className="text-paper font-medium truncate">{match.equipeExterieur.nom}</span>
        </div>
        <div className="flex items-center gap-3 mt-0.5">
          {heure && <span className="font-mono text-[10px]" style={{ color: 'rgba(166,173,185,0.3)' }}>{heure}</span>}
          {match.terrain && <span className="font-mono text-[10px]" style={{ color: 'rgba(166,173,185,0.3)' }}>{match.terrain}</span>}
          <span className="font-mono text-[10px] tracking-[0.1em]" style={{ color: cfg.textColor }}>{cfg.label.toUpperCase()}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onEdit}
          className="font-mono text-[11px] tracking-[0.08em] px-3 py-1.5 transition-colors"
          style={{ border: '1px solid rgba(232,162,60,0.3)', color: 'rgba(232,162,60,0.7)' }}
        >
          SCORE
        </button>
        <button
          onClick={onDelete}
          className="font-mono text-[11px] px-3 py-1.5 transition-colors"
          style={{ border: '1px solid rgba(194,74,44,0.2)', color: 'rgba(194,74,44,0.4)' }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

function GoalsSection({ match, onScoreChange }: {
  match: Match;
  onScoreChange: (dom: number, ext: number) => void;
}) {
  const [buts, setButs] = useState<But[]>([]);
  const [loadingButs, setLoadingButs] = useState(true);
  const [adding, setAdding] = useState<string | null>(null);
  const [butError, setButError] = useState('');

  const syncScore = useCallback(async (list: But[]) => {
    const dom = list.filter((b) => b.equipeId === match.equipeDomicileId).length;
    const ext = list.filter((b) => b.equipeId === match.equipeExterieId).length;
    onScoreChange(dom, ext);
    await fetch(`/api/tournoi/matchs/${match.id}/score`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scoreDomicile: dom, scoreExterieur: ext, statut: match.statut }),
    });
  }, [match.id, match.equipeDomicileId, match.equipeExterieId, match.statut, onScoreChange]);

  const loadButs = useCallback(async () => {
    const res = await fetch(`/api/tournoi/matchs/${match.id}/buts`);
    const data = await res.json();
    const list: But[] = Array.isArray(data) ? data : [];
    setButs(list);
    setLoadingButs(false);
    return list;
  }, [match.id]);

  useEffect(() => { loadButs(); }, [loadButs]);

  async function addBut(equipeId: string) {
    setAdding(equipeId);
    setButError('');
    try {
      const res = await fetch(`/api/tournoi/matchs/${match.id}/buts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ equipeId }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setButError(err?.error ?? 'Erreur lors de l\'ajout du but.');
        return;
      }
      const list = await loadButs();
      await syncScore(list);
    } catch {
      setButError('Network error.');
    } finally {
      setAdding(null);
    }
  }

  async function deleteBut(butId: string) {
    await fetch(`/api/tournoi/matchs/${match.id}/buts/${butId}`, { method: 'DELETE' });
    const list = await loadButs();
    await syncScore(list);
  }

  const teams = [
    { id: match.equipeDomicileId, nom: match.equipeDomicile.nom },
    { id: match.equipeExterieId, nom: match.equipeExterieur.nom },
  ];

  return (
    <div className="mb-6">
      <label className="block font-mono text-[10px] tracking-[0.18em] mb-3" style={{ color: 'rgba(166,173,185,0.5)' }}>
        BUTS {!loadingButs && `(${buts.length})`}
      </label>

      {/* Quick-add buttons */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {teams.map((team) => {
          const isLive = match.statut === 'EN_COURS';
          return (
            <button
              key={team.id}
              type="button"
              onClick={() => addBut(team.id)}
              disabled={!isLive || adding !== null}
              title={!isLive ? 'Disponible uniquement quand le match est EN COURS' : undefined}
              className="py-3 font-mono text-[12px] font-bold tracking-[0.08em] transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: 'rgba(232,162,60,0.12)', border: '1px solid rgba(232,162,60,0.35)', color: '#E8A23C' }}
            >
              {adding === team.id ? '...' : `⚽ ${team.nom}`}
            </button>
          );
        })}
      </div>
      {match.statut !== 'EN_COURS' && (
        <p className="font-mono text-[10px] mb-3" style={{ color: 'rgba(166,173,185,0.35)' }}>
          Set the match to LIVE to record goals.
        </p>
      )}

      {butError && (
        <p className="font-sans text-[11px] mb-2" style={{ color: '#C24A2C' }}>{butError}</p>
      )}

      {/* Goals list */}
      {loadingButs ? (
        <p className="font-mono text-[11px]" style={{ color: 'rgba(166,173,185,0.3)' }}>Loading...</p>
      ) : (
        <div className="flex flex-col gap-1">
          {buts.length === 0 && (
            <p className="font-mono text-[11px] italic" style={{ color: 'rgba(166,173,185,0.25)' }}>No goals recorded.</p>
          )}
          {buts.map((but) => {
            const isHome = but.equipeId === match.equipeDomicileId;
            const teamName = isHome ? match.equipeDomicile.nom : match.equipeExterieur.nom;
            return (
              <div key={but.id} className="flex items-center gap-2 px-3 py-1.5" style={{ background: 'rgba(250,246,236,0.03)', border: '1px solid rgba(250,246,236,0.06)' }}>
                <span className="text-[12px]">⚽</span>
                <span className="font-sans text-[12px] flex-1" style={{ color: 'rgba(250,246,236,0.7)' }}>{teamName}</span>
                <button
                  onClick={() => deleteBut(but.id)}
                  className="font-mono text-[10px] px-2 py-0.5 transition-colors"
                  style={{ color: 'rgba(194,74,44,0.5)', border: '1px solid rgba(194,74,44,0.2)' }}
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ScoreModal({ match, onSave, onClose }: {
  match: Match;
  onSave: () => Promise<void>;
  onClose: () => void;
}) {
  const [dom, setDom] = useState(match.scoreDomicile?.toString() ?? '');
  const [ext, setExt] = useState(match.scoreExterieur?.toString() ?? '');
  const [statut, setStatut] = useState<Statut>(match.statut);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const res = await fetch(`/api/tournoi/matchs/${match.id}/score`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scoreDomicile: dom !== '' ? parseInt(dom) : (statut === 'EN_COURS' ? 0 : null),
          scoreExterieur: ext !== '' ? parseInt(ext) : (statut === 'EN_COURS' ? 0 : null),
          statut,
        }),
      });
      if (!res.ok) throw new Error();
      await onSave();
    } catch {
      setError('An error occurred.');
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative w-full max-w-md shadow-2xl"
        style={{ background: '#081A2E', border: '1px solid rgba(250,246,236,0.1)', padding: 32 }}
      >
        <p className="font-mono text-[10px] tracking-[0.2em] mb-1" style={{ color: '#E8A23C' }}>
          {PHASE_LABELS[match.phase].toUpperCase()}
        </p>
        <h2 className="font-display text-paper mb-6" style={{ fontSize: 28 }}>EDIT MATCH</h2>

        <form onSubmit={submit}>
          {/* Teams */}
          <div className="flex items-center gap-3 mb-6 p-4" style={{ background: 'rgba(250,246,236,0.03)', border: '1px solid rgba(250,246,236,0.07)' }}>
            <div className="flex-1 text-right">
              <p className="font-sans font-semibold text-paper text-sm">{match.equipeDomicile.nom}</p>
              <p className="font-mono text-[10px]" style={{ color: 'rgba(166,173,185,0.4)' }}>HOME</p>
            </div>
            <span className="font-display text-[20px]" style={{ color: 'rgba(250,246,236,0.2)' }}>VS</span>
            <div className="flex-1">
              <p className="font-sans font-semibold text-paper text-sm">{match.equipeExterieur.nom}</p>
              <p className="font-mono text-[10px]" style={{ color: 'rgba(166,173,185,0.4)' }}>AWAY</p>
            </div>
          </div>

          {/* Score inputs */}
          <div className="mb-5">
            <label className="block font-mono text-[10px] tracking-[0.18em] mb-2" style={{ color: 'rgba(166,173,185,0.5)' }}>SCORE</label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="0"
                value={dom}
                onChange={(e) => setDom(e.target.value)}
                placeholder="—"
                className="flex-1 text-center font-display"
                style={{ ...inputStyle, fontSize: 32, padding: '12px' }}
              />
              <span className="font-display" style={{ fontSize: 28, color: 'rgba(250,246,236,0.3)' }}>–</span>
              <input
                type="number"
                min="0"
                value={ext}
                onChange={(e) => setExt(e.target.value)}
                placeholder="—"
                className="flex-1 text-center font-display"
                style={{ ...inputStyle, fontSize: 32, padding: '12px' }}
              />
            </div>
          </div>

          {/* Status buttons */}
          <div className="mb-6">
            <label className="block font-mono text-[10px] tracking-[0.18em] mb-2" style={{ color: 'rgba(166,173,185,0.5)' }}>STATUT</label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['A_VENIR', 'EN_COURS', 'TERMINE'] as Statut[]).map((s) => {
                const cfg = STATUT_CONFIG[s];
                const isSelected = statut === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatut(s)}
                    className="py-2.5 font-mono text-[10px] tracking-[0.1em] font-bold transition-colors"
                    style={{
                      background: isSelected ? (s === 'EN_COURS' ? 'rgba(230,57,70,0.15)' : 'rgba(232,162,60,0.15)') : 'rgba(250,246,236,0.03)',
                      border: `1px solid ${isSelected ? (s === 'EN_COURS' ? '#E63946' : '#E8A23C') : 'rgba(250,246,236,0.08)'}`,
                      color: isSelected ? (s === 'EN_COURS' ? '#E63946' : '#E8A23C') : 'rgba(250,246,236,0.35)',
                    }}
                  >
                    <span
                      className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${s === 'EN_COURS' ? 'animate-live-pulse' : ''}`}
                      style={{ background: cfg.dotColor, verticalAlign: 'middle' }}
                    />
                    {cfg.label.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>

          <GoalsSection
            match={match}
            onScoreChange={(d, e) => { setDom(String(d)); setExt(String(e)); }}
          />

          {error && <p className="font-sans text-sm mb-4" style={{ color: '#C24A2C' }}>{error}</p>}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 font-mono text-[12px] font-bold tracking-[0.12em] py-3 bg-sun text-ink transition-opacity disabled:opacity-50"
            >
              {saving ? 'SAVING...' : 'SAVE'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="font-mono text-[12px] tracking-[0.1em] px-5 py-3 transition-colors"
              style={{ border: '1px solid rgba(250,246,236,0.1)', color: 'rgba(250,246,236,0.4)' }}
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddMatchForm({ equipes, onSave, onCancel }: {
  equipes: Equipe[];
  onSave: () => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    equipeDomicileId: '',
    equipeExterieId: '',
    phase: 'GROUPES' as Phase,
    heure: '',
    terrain: '',
    ordre: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function set(key: string, val: string) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.equipeDomicileId || !form.equipeExterieId) return;
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/tournoi/matchs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          equipeDomicileId: form.equipeDomicileId,
          equipeExterieId: form.equipeExterieId,
          phase: form.phase,
          heure: form.heure || null,
          terrain: form.terrain || null,
          ordre: form.ordre ? parseInt(form.ordre) : null,
        }),
      });
      if (!res.ok) throw new Error();
      await onSave();
    } catch {
      setError('An error occurred.');
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="mb-8 p-6"
      style={{ background: 'rgba(232,162,60,0.05)', border: '1px solid rgba(232,162,60,0.25)' }}
    >
      <h3 className="font-display text-paper mb-5" style={{ fontSize: 22 }}>NEW MATCH</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-mono text-[10px] tracking-[0.18em] mb-1.5" style={{ color: 'rgba(166,173,185,0.5)' }}>HOME TEAM *</label>
          <select required value={form.equipeDomicileId} onChange={(e) => set('equipeDomicileId', e.target.value)}
            style={{ ...inputStyle, appearance: 'none' }}>
            <option value="">— Choose —</option>
            {equipes.map((eq) => <option key={eq.id} value={eq.id}>{eq.nom}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-mono text-[10px] tracking-[0.18em] mb-1.5" style={{ color: 'rgba(166,173,185,0.5)' }}>AWAY TEAM *</label>
          <select required value={form.equipeExterieId} onChange={(e) => set('equipeExterieId', e.target.value)}
            style={{ ...inputStyle, appearance: 'none' }}>
            <option value="">— Choose —</option>
            {equipes.map((eq) => <option key={eq.id} value={eq.id}>{eq.nom}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-mono text-[10px] tracking-[0.18em] mb-1.5" style={{ color: 'rgba(166,173,185,0.5)' }}>PHASE *</label>
          <select value={form.phase} onChange={(e) => set('phase', e.target.value)}
            style={{ ...inputStyle, appearance: 'none' }}>
            {PHASE_ORDER.map((p) => <option key={p} value={p}>{PHASE_LABELS[p]}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-mono text-[10px] tracking-[0.18em] mb-1.5" style={{ color: 'rgba(166,173,185,0.5)' }}>TIME</label>
          <input type="datetime-local" value={form.heure} onChange={(e) => set('heure', e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label className="block font-mono text-[10px] tracking-[0.18em] mb-1.5" style={{ color: 'rgba(166,173,185,0.5)' }}>FIELD</label>
          <input type="text" placeholder="Field A" value={form.terrain} onChange={(e) => set('terrain', e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label className="block font-mono text-[10px] tracking-[0.18em] mb-1.5" style={{ color: 'rgba(166,173,185,0.5)' }}>DISPLAY ORDER</label>
          <input type="number" min="1" placeholder="1" value={form.ordre} onChange={(e) => set('ordre', e.target.value)} style={inputStyle} />
        </div>
      </div>
      {error && <p className="font-sans text-sm mb-4" style={{ color: '#C24A2C' }}>{error}</p>}
      <div className="flex gap-3">
        <button type="submit" disabled={saving}
          className="font-mono text-[12px] font-bold tracking-[0.12em] px-5 py-2.5 bg-sun text-ink transition-opacity disabled:opacity-50">
          {saving ? 'CREATING...' : 'CREATE MATCH'}
        </button>
        <button type="button" onClick={onCancel}
          className="font-mono text-[12px] tracking-[0.1em] px-5 py-2.5 transition-colors"
          style={{ border: '1px solid rgba(250,246,236,0.1)', color: 'rgba(250,246,236,0.4)' }}>
          CANCEL
        </button>
      </div>
    </form>
  );
}

function Spinner() {
  return (
    <div className="flex items-center justify-center h-64">
      <div
        className="w-8 h-8 border-2 rounded-full animate-spin"
        style={{ borderColor: 'rgba(250,246,236,0.1)', borderTopColor: '#E8A23C' }}
      />
    </div>
  );
}
