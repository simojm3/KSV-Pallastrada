'use client';

import { useState, useEffect, useCallback } from 'react';

interface Groupe {
  id: string;
  nom: string;
}

interface Equipe {
  id: string;
  nom: string;
  abreviation: string | null;
  logo: string | null;
  groupeId: string | null;
  groupe: Groupe | null;
}

type Mode = 'idle' | 'add' | { type: 'edit'; equipe: Equipe };

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

export default function EquipesManager() {
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [groupes, setGroupes] = useState<Groupe[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<Mode>('idle');

  const load = useCallback(async () => {
    const [eRes, gRes] = await Promise.all([
      fetch('/api/tournoi/equipes'),
      fetch('/api/tournoi/groupes'),
    ]);
    const eData = await eRes.json();
    const gData = await gRes.json();
    setEquipes(Array.isArray(eData) ? eData : []);
    setGroupes(Array.isArray(gData) ? gData : []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleDelete(id: string) {
    if (!confirm('Delete this team? Associated matches will also be deleted.')) return;
    await fetch(`/api/tournoi/equipes/${id}`, { method: 'DELETE' });
    await load();
  }

  if (loading) return <Spinner />;

  return (
    <div className="px-3 py-4 sm:px-6 sm:py-6 lg:p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6 gap-3">
        <div>
          <h1 className="font-display text-paper" style={{ fontSize: 'clamp(24px, 6vw, 40px)' }}>TEAMS</h1>
          <p className="font-mono text-[11px] mt-1" style={{ color: 'rgba(166,173,185,0.4)' }}>
            {equipes.length} / 6 teams registered
          </p>
        </div>
        {mode === 'idle' && (
          <button
            onClick={() => setMode('add')}
            className="shrink-0 font-mono text-[11px] sm:text-[12px] font-bold tracking-[0.12em] px-3 sm:px-5 py-2.5 bg-sun text-ink transition-opacity hover:opacity-85"
          >
            + ADD
          </button>
        )}
      </div>

      {(mode === 'add' || (typeof mode === 'object' && mode.type === 'edit')) && (
        <EquipeForm
          groupes={groupes}
          initial={typeof mode === 'object' && mode.type === 'edit' ? mode.equipe : undefined}
          onSave={async () => { await load(); setMode('idle'); }}
          onCancel={() => setMode('idle')}
        />
      )}

      <div className="flex flex-col gap-8">
        {groupes.map((g) => {
          const members = equipes.filter((e) => e.groupeId === g.id);
          return (
            <GroupSection
              key={g.id}
              groupNom={g.nom}
              equipes={members}
              onEdit={(eq) => setMode({ type: 'edit', equipe: eq })}
              onDelete={handleDelete}
              editing={typeof mode === 'object' && mode.type === 'edit' ? mode.equipe.id : null}
            />
          );
        })}
        {equipes.filter((e) => !e.groupeId).length > 0 && (
          <GroupSection
            groupNom="No group"
            equipes={equipes.filter((e) => !e.groupeId)}
            onEdit={(eq) => setMode({ type: 'edit', equipe: eq })}
            onDelete={handleDelete}
            editing={typeof mode === 'object' && mode.type === 'edit' ? mode.equipe.id : null}
            dimmed
          />
        )}
      </div>
    </div>
  );
}

function GroupSection({
  groupNom,
  equipes,
  onEdit,
  onDelete,
  editing,
  dimmed,
}: {
  groupNom: string;
  equipes: Equipe[];
  onEdit: (e: Equipe) => void;
  onDelete: (id: string) => void;
  editing: string | null;
  dimmed?: boolean;
}) {
  return (
    <div>
      <h2
        className="font-mono text-[10px] tracking-[0.2em] mb-3"
        style={{ color: dimmed ? 'rgba(250,246,236,0.2)' : '#E8A23C' }}
      >
        {groupNom.toUpperCase()}{' '}
        <span style={{ color: 'rgba(250,246,236,0.2)', fontWeight: 400 }}>({equipes.length})</span>
      </h2>
      {equipes.length === 0 ? (
        <p className="font-sans text-sm italic" style={{ color: 'rgba(166,173,185,0.3)' }}>No teams</p>
      ) : (
        <div style={{ border: '1px solid rgba(250,246,236,0.07)' }}>
          {equipes.map((eq, i) => (
            <div
              key={eq.id}
              className="flex items-center justify-between px-3 sm:px-5 py-3 sm:py-4 transition-colors"
              style={{
                background: editing === eq.id ? 'rgba(232,162,60,0.08)' : i % 2 === 0 ? '#0A1829' : 'rgba(250,246,236,0.02)',
                borderBottom: i < equipes.length - 1 ? '1px solid rgba(250,246,236,0.05)' : 'none',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 flex items-center justify-center font-mono text-[11px] font-bold"
                  style={{ background: 'rgba(250,246,236,0.06)', color: 'rgba(250,246,236,0.5)' }}
                >
                  {eq.abreviation ?? eq.nom.slice(0, 3).toUpperCase()}
                </div>
                <div>
                  <span className="font-sans font-medium text-paper">{eq.nom}</span>
                  {eq.abreviation && (
                    <span className="ml-2 font-mono text-[10px]" style={{ color: 'rgba(166,173,185,0.4)' }}>
                      {eq.abreviation}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-1.5 sm:gap-2">
                <button
                  onClick={() => onEdit(eq)}
                  className="font-mono text-[11px] tracking-[0.08em] px-2 sm:px-3 py-1.5 transition-colors"
                  style={{ border: '1px solid rgba(250,246,236,0.12)', color: 'rgba(250,246,236,0.45)' }}
                >
                  <span className="hidden sm:inline">EDIT</span>
                  <span className="sm:hidden">✏</span>
                </button>
                <button
                  onClick={() => onDelete(eq.id)}
                  className="font-mono text-[11px] tracking-[0.08em] px-2 sm:px-3 py-1.5 transition-colors"
                  style={{ border: '1px solid rgba(194,74,44,0.2)', color: 'rgba(194,74,44,0.5)' }}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EquipeForm({
  groupes,
  initial,
  onSave,
  onCancel,
}: {
  groupes: Groupe[];
  initial?: Equipe;
  onSave: () => Promise<void>;
  onCancel: () => void;
}) {
  const [nom, setNom] = useState(initial?.nom ?? '');
  const [abreviation, setAbreviation] = useState(initial?.abreviation ?? '');
  const [groupeId, setGroupeId] = useState(initial?.groupeId ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!nom.trim()) return;
    setSaving(true);
    setError('');
    try {
      const payload = {
        nom: nom.trim(),
        abreviation: abreviation.trim().toUpperCase() || null,
        groupeId: groupeId || null,
      };
      const res = initial
        ? await fetch(`/api/tournoi/equipes/${initial.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
        : await fetch('/api/tournoi/equipes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
      if (!res.ok) throw new Error();
      await onSave();
    } catch {
      setError('Une erreur est survenue.');
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="mb-8 p-6"
      style={{ background: 'rgba(232,162,60,0.05)', border: '1px solid rgba(232,162,60,0.25)' }}
    >
      <h3 className="font-display text-paper mb-5" style={{ fontSize: 22 }}>
        {initial ? 'EDIT TEAM' : 'NEW TEAM'}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-mono text-[10px] tracking-[0.18em] mb-1.5" style={{ color: 'rgba(166,173,185,0.5)' }}>
            TEAM NAME *
          </label>
          <input
            autoFocus
            type="text"
            required
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="FC Example"
            style={inputStyle}
          />
        </div>
        <div>
          <label className="block font-mono text-[10px] tracking-[0.18em] mb-1.5" style={{ color: 'rgba(166,173,185,0.5)' }}>
            ABRÉVIATION <span style={{ color: 'rgba(166,173,185,0.3)' }}>(3–4 lettres)</span>
          </label>
          <input
            type="text"
            maxLength={4}
            value={abreviation}
            onChange={(e) => setAbreviation(e.target.value.toUpperCase())}
            placeholder="EX: PST"
            style={inputStyle}
          />
        </div>
        <div>
          <label className="block font-mono text-[10px] tracking-[0.18em] mb-1.5" style={{ color: 'rgba(166,173,185,0.5)' }}>
            GROUPE
          </label>
          <select
            value={groupeId}
            onChange={(e) => setGroupeId(e.target.value)}
            style={{ ...inputStyle, appearance: 'none' }}
          >
            <option value="">— No group —</option>
            {groupes.map((g) => (
              <option key={g.id} value={g.id}>{g.nom}</option>
            ))}
          </select>
        </div>
      </div>
      {error && <p className="font-sans text-sm mb-4" style={{ color: '#C24A2C' }}>An error occurred.</p>}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="font-mono text-[12px] font-bold tracking-[0.12em] px-5 py-2.5 bg-sun text-ink transition-opacity disabled:opacity-50"
        >
          {saving ? 'SAVING...' : 'SAVE'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="font-mono text-[12px] tracking-[0.12em] px-5 py-2.5 transition-colors"
          style={{ border: '1px solid rgba(250,246,236,0.12)', color: 'rgba(250,246,236,0.4)' }}
        >
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
