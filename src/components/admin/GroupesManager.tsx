'use client';

import { useState, useEffect, useCallback } from 'react';

interface Equipe {
  id: string;
  nom: string;
  groupeId: string | null;
}

interface Groupe {
  id: string;
  nom: string;
  equipes: Equipe[];
}

export default function GroupesManager() {
  const [groupes, setGroupes] = useState<Groupe[]>([]);
  const [equipesSansGroupe, setEquipesSansGroupe] = useState<Equipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [moving, setMoving] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [customNom, setCustomNom] = useState('');
  const [createError, setCreateError] = useState('');

  const load = useCallback(async () => {
    const [gRes, eRes] = await Promise.all([
      fetch('/api/tournoi/groupes'),
      fetch('/api/tournoi/equipes'),
    ]);
    const gData = await gRes.json();
    const eData = await eRes.json();
    const groupesList: Groupe[] = Array.isArray(gData) ? gData : [];
    const equipesList: Equipe[] = Array.isArray(eData) ? eData : [];
    setGroupes(groupesList);
    setEquipesSansGroupe(equipesList.filter((e) => !e.groupeId));
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function initGroups() {
    setCreating(true);
    setCreateError('');
    try {
      await Promise.all([
        fetch('/api/tournoi/groupes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ nom: 'Groupe A' }) }),
        fetch('/api/tournoi/groupes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ nom: 'Groupe B' }) }),
      ]);
      await load();
    } catch { setCreateError('Error creating groups.'); }
    finally { setCreating(false); }
  }

  async function createGroupe(e: React.FormEvent) {
    e.preventDefault();
    if (!customNom.trim()) return;
    setCreating(true);
    setCreateError('');
    try {
      const res = await fetch('/api/tournoi/groupes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom: customNom.trim() }),
      });
      if (!res.ok) { setCreateError('Error'); return; }
      setCustomNom('');
      await load();
    } catch { setCreateError('Error'); }
    finally { setCreating(false); }
  }

  async function moveEquipe(equipeId: string, targetGroupeId: string) {
    setMoving(equipeId);
    await fetch(`/api/tournoi/equipes/${equipeId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ groupeId: targetGroupeId || null }),
    });
    await load();
    setMoving(null);
  }

  if (loading) return <Spinner />;

  const totalEquipes = groupes.reduce((s, g) => s + g.equipes.length, 0) + equipesSansGroupe.length;

  return (
    <div className="px-3 py-4 sm:px-6 sm:py-6 lg:p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="font-display text-paper" style={{ fontSize: 'clamp(24px, 6vw, 40px)' }}>GROUPS</h1>
        <p className="font-mono text-[11px] mt-1" style={{ color: 'rgba(166,173,185,0.4)' }}>
          {totalEquipes} teams — {groupes.length} group{groupes.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* No groups yet — init panel */}
      {groupes.length === 0 && (
        <div className="mb-8 p-6" style={{ background: 'rgba(232,162,60,0.05)', border: '1px solid rgba(232,162,60,0.2)', borderTop: '2px solid #E8A23C' }}>
          <p className="font-mono text-[11px] tracking-[0.16em] font-bold mb-1" style={{ color: '#E8A23C' }}>NO GROUPS YET</p>
          <p className="font-sans text-[13px] mb-5" style={{ color: 'rgba(250,246,236,0.45)' }}>
            Create the two groups to start assigning teams.
          </p>
          <button
            onClick={initGroups}
            disabled={creating}
            className="font-mono text-[12px] font-bold tracking-[0.12em] px-5 py-2.5 transition-opacity disabled:opacity-50 hover:opacity-85"
            style={{ background: '#E8A23C', color: '#0A0F18' }}
          >
            {creating ? 'CREATING...' : '+ CREATE GROUP A & GROUP B'}
          </button>
          {createError && <p className="font-sans text-[12px] mt-3" style={{ color: '#C24A2C' }}>{createError}</p>}
        </div>
      )}

      {/* Add custom group */}
      {groupes.length > 0 && (
        <form onSubmit={createGroupe} className="flex items-center gap-3 mb-6">
          <input
            type="text"
            value={customNom}
            onChange={(e) => setCustomNom(e.target.value)}
            placeholder="Group name..."
            className="font-sans text-[13px] px-4 py-2"
            style={{ background: '#06101F', border: '1px solid rgba(250,246,236,0.1)', color: '#FAF6EC', outline: 'none', width: 180 }}
          />
          <button
            type="submit"
            disabled={creating || !customNom.trim()}
            className="font-mono text-[11px] font-bold tracking-[0.1em] px-4 py-2 transition-opacity disabled:opacity-40 hover:opacity-85"
            style={{ background: 'rgba(232,162,60,0.12)', border: '1px solid rgba(232,162,60,0.3)', color: '#E8A23C' }}
          >
            + ADD GROUP
          </button>
          {createError && <span className="font-sans text-[12px]" style={{ color: '#C24A2C' }}>{createError}</span>}
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5 mb-8">
        {groupes.map((groupe) => (
          <div key={groupe.id} style={{ border: '1px solid rgba(250,246,236,0.07)', background: '#0A1829' }}>
            <div
              className="px-5 py-4 flex items-center justify-between"
              style={{ background: 'rgba(232,162,60,0.08)', borderBottom: '1px solid rgba(232,162,60,0.2)', borderLeft: '3px solid #E8A23C' }}
            >
              <h2 className="font-display text-sun" style={{ fontSize: 26 }}>{groupe.nom.toUpperCase()}</h2>
              <span className="font-mono text-[10px] tracking-[0.12em]" style={{ color: 'rgba(166,173,185,0.4)' }}>
                {groupe.equipes.length} TEAMS
              </span>
            </div>
            <div>
              {groupe.equipes.length === 0 ? (
                <p className="px-5 py-4 font-sans text-sm italic" style={{ color: 'rgba(166,173,185,0.3)' }}>
                  No teams in this group
                </p>
              ) : (
                groupe.equipes.map((eq, i) => {
                  const otherGroupes = groupes.filter((g) => g.id !== groupe.id);
                  return (
                    <EquipeRow
                      key={eq.id}
                      equipe={eq}
                      currentGroupeId={groupe.id}
                      otherGroupes={otherGroupes}
                      onMove={moveEquipe}
                      isMoving={moving === eq.id}
                      isLast={i === groupe.equipes.length - 1}
                    />
                  );
                })
              )}
            </div>
          </div>
        ))}
      </div>

      {equipesSansGroupe.length > 0 && (
        <div style={{ border: '1px solid rgba(250,246,236,0.07)', background: '#0A1829' }}>
          <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(250,246,236,0.07)' }}>
            <h2 className="font-mono text-[11px] tracking-[0.2em]" style={{ color: 'rgba(250,246,236,0.3)' }}>
              NO GROUP ({equipesSansGroupe.length})
            </h2>
          </div>
          {equipesSansGroupe.map((eq, i) => (
            <EquipeRow
              key={eq.id}
              equipe={eq}
              currentGroupeId={null}
              otherGroupes={groupes}
              onMove={moveEquipe}
              isMoving={moving === eq.id}
              isLast={i === equipesSansGroupe.length - 1}
            />
          ))}
        </div>
      )}

      {equipesSansGroupe.length === 0 && groupes.every((g) => g.equipes.length > 0) && (
        <div
          className="mt-6 px-6 py-4"
          style={{ background: 'rgba(90,138,46,0.08)', border: '1px solid rgba(90,138,46,0.3)', borderLeft: '3px solid #5A8A2E' }}
        >
          <p className="font-sans text-sm font-medium" style={{ color: '#5A8A2E' }}>
            ✓ All teams are assigned to a group
          </p>
        </div>
      )}
    </div>
  );
}

function EquipeRow({
  equipe,
  currentGroupeId,
  otherGroupes,
  onMove,
  isMoving,
  isLast,
}: {
  equipe: Equipe;
  currentGroupeId: string | null;
  otherGroupes: { id: string; nom: string }[];
  onMove: (equipeId: string, groupeId: string) => Promise<void>;
  isMoving: boolean;
  isLast: boolean;
}) {
  const [showSelect, setShowSelect] = useState(false);

  if (isMoving) {
    return (
      <div className="px-5 py-3.5 flex items-center gap-3" style={{ borderBottom: isLast ? 'none' : '1px solid rgba(250,246,236,0.05)' }}>
        <div
          className="w-4 h-4 border-2 rounded-full animate-spin"
          style={{ borderColor: 'rgba(250,246,236,0.1)', borderTopColor: '#E8A23C' }}
        />
        <span className="font-sans text-sm" style={{ color: 'rgba(166,173,185,0.4)' }}>Moving...</span>
      </div>
    );
  }

  return (
    <div
      className="px-3 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between gap-3"
      style={{ borderBottom: isLast ? 'none' : '1px solid rgba(250,246,236,0.05)' }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-7 h-7 flex items-center justify-center font-display text-[14px]"
          style={{ background: 'rgba(250,246,236,0.06)', color: 'rgba(250,246,236,0.4)' }}
        >
          {equipe.nom.charAt(0).toUpperCase()}
        </div>
        <span className="font-sans text-sm font-medium text-paper">{equipe.nom}</span>
      </div>

      {showSelect ? (
        <div className="flex items-center gap-2">
          <select
            autoFocus
            defaultValue=""
            onChange={(e) => {
              if (e.target.value) {
                onMove(equipe.id, e.target.value);
                setShowSelect(false);
              }
            }}
            style={{
              background: '#06101F',
              color: '#FAF6EC',
              border: '1px solid rgba(250,246,236,0.1)',
              padding: '6px 10px',
              fontSize: 12,
              fontFamily: 'var(--font-jetbrains), monospace',
              outline: 'none',
            }}
          >
            <option value="">— Choose a group —</option>
            {otherGroupes.map((g) => (
              <option key={g.id} value={g.id}>{g.nom}</option>
            ))}
            {currentGroupeId && <option value="">— Retirer du groupe —</option>}
          </select>
          <button
            onClick={() => setShowSelect(false)}
            className="font-mono text-[11px] px-2 py-1.5"
            style={{ color: 'rgba(250,246,236,0.3)' }}
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowSelect(true)}
          className="font-mono text-[11px] tracking-[0.08em] px-3 py-1.5 transition-colors"
          style={{ border: '1px solid rgba(250,246,236,0.1)', color: 'rgba(250,246,236,0.4)' }}
        >
          MOVE →
        </button>
      )}
    </div>
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
