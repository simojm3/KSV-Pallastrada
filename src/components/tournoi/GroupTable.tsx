'use client';

import { useTranslations } from 'next-intl';
import type { GroupeWithData } from '@/types/tournoi';

export default function GroupTable({ groupe }: { groupe: GroupeWithData }) {
  const t = useTranslations('tournoi');

  return (
    <div>
      {/* Group header */}
      <div className="flex items-center gap-4 mb-3">
        <div
          className="flex items-center justify-center font-display text-paper"
          style={{ width: 36, height: 36, background: '#E8A23C', fontSize: 22, flexShrink: 0 }}
        >
          {groupe.nom.slice(-1)}
        </div>
        <h3 className="font-display text-paper" style={{ fontSize: 28 }}>{groupe.nom.toUpperCase()}</h3>
        <span
          className="ml-auto font-mono text-[10px] tracking-[0.16em]"
          style={{ color: 'rgba(166,173,185,0.4)' }}
        >
          Q = QUALIFIÉ
        </span>
      </div>

      <div className="overflow-x-auto" style={{ background: '#0A1829', border: '1px solid rgba(250,246,236,0.07)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(250,246,236,0.07)' }}>
              <th className="pl-4 pr-2 py-3 text-left w-8">
                <span className="font-mono text-[10px] tracking-[0.16em]" style={{ color: 'rgba(166,173,185,0.35)' }}>#</span>
              </th>
              <th className="px-2 py-3 text-left">
                <span className="font-mono text-[10px] tracking-[0.16em]" style={{ color: 'rgba(166,173,185,0.35)' }}>
                  {t('table_team').toUpperCase()}
                </span>
              </th>
              {(['table_played', 'table_won', 'table_drawn', 'table_lost', 'table_gd', 'table_points'] as const).map((k) => (
                <th key={k} className="px-2 py-3 text-center">
                  <span className="font-mono text-[10px] tracking-[0.16em]" style={{ color: k === 'table_points' ? 'rgba(232,162,60,0.7)' : 'rgba(166,173,185,0.35)' }}>
                    {t(k).toUpperCase()}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groupe.standings.map((row, idx) => {
              const qualified = idx < 2;
              return (
                <tr
                  key={row.equipe.id}
                  style={{
                    borderLeft: qualified ? '3px solid #E8A23C' : '3px solid transparent',
                    borderBottom: '1px solid rgba(250,246,236,0.05)',
                    background: qualified ? 'rgba(232,162,60,0.04)' : 'transparent',
                  }}
                >
                  <td className="pl-4 pr-2 py-3.5">
                    <span
                      className="font-mono text-[11px] font-bold"
                      style={{ color: qualified ? '#E8A23C' : 'rgba(166,173,185,0.35)' }}
                    >
                      {idx + 1}
                    </span>
                  </td>
                  <td className="px-2 py-3.5">
                    <span className="font-sans text-[14px] font-semibold" style={{ color: qualified ? '#FAF6EC' : 'rgba(250,246,236,0.55)' }}>
                      {row.equipe.nom}
                    </span>
                    {qualified && (
                      <span className="ml-2 font-mono text-[9px] tracking-[0.16em]" style={{ color: 'rgba(232,162,60,0.5)' }}>Q</span>
                    )}
                  </td>
                  <td className="px-2 py-3.5 text-center font-mono text-[12px] tabular-nums" style={{ color: 'rgba(166,173,185,0.5)' }}>{row.joues}</td>
                  <td className="px-2 py-3.5 text-center font-mono text-[12px] tabular-nums" style={{ color: 'rgba(166,173,185,0.5)' }}>{row.gagnes}</td>
                  <td className="px-2 py-3.5 text-center font-mono text-[12px] tabular-nums" style={{ color: 'rgba(166,173,185,0.5)' }}>{row.nuls}</td>
                  <td className="px-2 py-3.5 text-center font-mono text-[12px] tabular-nums" style={{ color: 'rgba(166,173,185,0.5)' }}>{row.perdus}</td>
                  <td
                    className="px-2 py-3.5 text-center font-mono text-[12px] tabular-nums font-bold"
                    style={{ color: row.diff > 0 ? '#5A8A2E' : row.diff < 0 ? '#C24A2C' : 'rgba(166,173,185,0.4)' }}
                  >
                    {row.diff > 0 ? `+${row.diff}` : row.diff}
                  </td>
                  <td className="px-2 py-3.5 pr-4 text-center">
                    <span className="font-display text-[24px]" style={{ color: '#E8A23C' }}>{row.points}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-2 mt-2 px-1">
        <span className="w-3 h-0.5" style={{ background: '#E8A23C' }} />
        <span className="font-mono text-[10px] tracking-[0.12em]" style={{ color: 'rgba(166,173,185,0.3)' }}>
          2 PREMIERS QUALIFIÉS
        </span>
      </div>
    </div>
  );
}
