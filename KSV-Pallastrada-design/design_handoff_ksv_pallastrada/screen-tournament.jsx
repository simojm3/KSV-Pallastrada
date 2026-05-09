// Tournament — live broadcast dashboard

function TournamentDesktop() {
  return (
    <div style={{ width: 1440, fontFamily: FONT_SANS, background: '#06101F', color: '#FAF6EC', minHeight: 1800 }}>
      <PulseStyles />
      <Nav active="tournament" dark />

      {/* Live header */}
      <section style={{ padding: '40px 56px 28px', borderBottom: '1px solid rgba(250,246,236,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <Badge kind="live" />
              <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.2em', opacity: 0.7 }}>
                EN DIRECT · 3 MATCHS · DIFFUSION 14:32 LOCAL
              </span>
            </div>
            <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 96, margin: 0, lineHeight: 0.9, letterSpacing: '-0.01em' }}>
              Tournoi <span style={{ color: PAL.sun }}>Pallastrada</span> '26
            </h1>
            <div style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: '0.18em', opacity: 0.6, marginTop: 14 }}>
              16 ÉQUIPES · 4 GROUPES · 12.06 — 28.06.2026 · STADE DU NEUFELD
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.14em' }}>
            {['DIRECT','GROUPES','TABLEAU','STATS'].map((t, i) => (
              <span key={t} style={{
                padding: '10px 16px',
                background: i === 0 ? '#FAF6EC' : 'rgba(250,246,236,0.05)',
                color: i === 0 ? PAL.navy : '#FAF6EC',
              }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE SCORES — 3 cards */}
      <section style={{ padding: '32px 56px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <span style={{ width: 8, height: 8, borderRadius: 99, background: PAL.live, animation: 'pulse 1.4s infinite' }} />
          <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.18em' }}>EN COURS — TROIS MATCHS EN MÊME TEMPS</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { home: 'PALLASTRADA', a: 'BSC YB AM.', s1: 2, s2: 1, t: '67\'', last: '58\' · BUT G. RIVA · CSC', terrain: 'TERRAIN A · GR. A', fav: 'home' },
            { home: 'BERN UNITED', a: 'LUZERN ALPS', s1: 0, s2: 0, t: '34\'', last: '21\' · CARTON JAUNE M. WEBER', terrain: 'TERRAIN B · GR. B' },
            { home: 'FC OBERLAND', a: 'GENÈVE-S.', s1: 1, s2: 3, t: '78\'', last: '74\' · BUT M. KELLER · TÊTE', terrain: 'TERRAIN C · GR. C', fav: 'away' },
          ].map((m, i) => (
            <article key={i} style={{
              background: 'linear-gradient(180deg, #0E1B2F 0%, #081424 100%)',
              border: '1px solid rgba(250,246,236,0.08)', padding: 24, position: 'relative', overflow: 'hidden',
            }}>
              {/* accent stripe */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: PAL.live }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <Badge kind="live" />
                <span style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: '0.14em', color: PAL.sun, animation: 'liveBlink 1.6s infinite' }}>{m.t}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[[m.home, m.s1, m.fav === 'home'], [m.a, m.s2, m.fav === 'away']].map(([n, s, lead], j) => (
                  <div key={j} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 30, height: 30, borderRadius: 99, background: lead ? PAL.cream : '#1B3A5C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {n === 'PALLASTRADA' && <LogoImg size={26} />}
                      </div>
                      <span style={{ fontFamily: FONT_DISPLAY, fontSize: 19, letterSpacing: '0.04em', opacity: lead ? 1 : 0.85 }}>{n}</span>
                    </div>
                    <span style={{ fontFamily: FONT_DISPLAY, fontSize: 56, lineHeight: 1, color: lead ? PAL.sun : '#FAF6EC' }}>{s}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid rgba(250,246,236,0.08)', fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.14em', opacity: 0.55 }}>
                {m.terrain}
              </div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.12em', color: PAL.sun, marginTop: 8, opacity: 0.85 }}>
                ▸ {m.last}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FEATURED MATCH BIG */}
      <section style={{ padding: '24px 56px 40px' }}>
        <div style={{ background: '#0A1829', border: '1px solid rgba(250,246,236,0.08)', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }} />
          <div style={{ position: 'relative', padding: '40px 48px', display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr', alignItems: 'center', gap: 32 }}>
            {/* HOME */}
            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
                <div style={{ width: 100, height: 100, borderRadius: 99, background: PAL.cream, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <LogoImg size={88} />
                </div>
              </div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 36, letterSpacing: '0.02em' }}>FC PALLASTRADA</div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.16em', opacity: 0.55, marginTop: 6 }}>BERN · GROUPE A · 1ER</div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6, marginTop: 14 }}>
                {['W','W','D','W','W'].map((r, i) => (
                  <span key={i} style={{
                    width: 22, height: 22, fontFamily: FONT_MONO, fontSize: 11, fontWeight: 700, color: '#fff', textAlign: 'center', lineHeight: '22px',
                    background: r === 'W' ? PAL.grass : r === 'D' ? PAL.stoneL : PAL.brick,
                  }}>{r}</span>
                ))}
              </div>
            </div>

            {/* SCORE */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 10 }}>
                <Badge kind="live" />
                <span style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: '0.14em', color: PAL.sun, animation: 'liveBlink 1.6s infinite' }}>67' · 2ᵉ MI-TEMPS</span>
              </div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 200, lineHeight: 0.85, letterSpacing: '-0.02em' }}>
                <span style={{ color: PAL.sun }}>2</span><span style={{ opacity: 0.4, padding: '0 16px' }}>—</span><span>1</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 28, marginTop: 14, fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.14em', opacity: 0.7 }}>
                <span style={{ color: PAL.sun }}>● 14' MÜLLER</span>
                <span style={{ color: PAL.sun }}>● 41' HUBER</span>
                <span style={{ opacity: 0.5 }}>○ 58' G. RIVA</span>
              </div>
            </div>

            {/* AWAY */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 12 }}>
                <div style={{ width: 100, height: 100, borderRadius: 99, background: PAL.brick, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_DISPLAY, fontSize: 38, color: '#FAF6EC' }}>
                  YB
                </div>
              </div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 36, letterSpacing: '0.02em' }}>BSC YB AM.</div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.16em', opacity: 0.55, marginTop: 6 }}>BERN · GROUPE A · 2ÈME</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 14 }}>
                {['W','D','W','L','W'].map((r, i) => (
                  <span key={i} style={{
                    width: 22, height: 22, fontFamily: FONT_MONO, fontSize: 11, fontWeight: 700, color: '#fff', textAlign: 'center', lineHeight: '22px',
                    background: r === 'W' ? PAL.grass : r === 'D' ? PAL.stoneL : PAL.brick,
                  }}>{r}</span>
                ))}
              </div>
            </div>
          </div>

          {/* timeline */}
          <div style={{ position: 'relative', height: 56, borderTop: '1px solid rgba(250,246,236,0.08)', display: 'flex', alignItems: 'center', padding: '0 48px' }}>
            <div style={{ position: 'absolute', left: 48, right: 48, height: 2, background: 'rgba(250,246,236,0.1)' }} />
            <div style={{ position: 'absolute', left: 48, height: 2, width: 'calc((100% - 96px) * 0.745)', background: PAL.sun }} />
            {[
              { x: 0.155, lbl: '14\'', col: PAL.sun, side: 'top' },
              { x: 0.455, lbl: '41\'', col: PAL.sun, side: 'top' },
              { x: 0.645, lbl: '58\'', col: '#FAF6EC', side: 'bottom' },
              { x: 0.745, lbl: '67\'', col: PAL.live, side: 'now' },
            ].map((e, i) => (
              <div key={i} style={{
                position: 'absolute', left: `calc(48px + (100% - 96px) * ${e.x})`, transform: 'translateX(-50%)',
                top: '50%', width: e.side === 'now' ? 14 : 8, height: e.side === 'now' ? 14 : 8, borderRadius: 99,
                background: e.col, marginTop: -6, animation: e.side === 'now' ? 'pulse 1.4s infinite' : 'none',
              }} />
            ))}
            <span style={{ position: 'absolute', left: 48, top: 8, fontFamily: FONT_MONO, fontSize: 10, opacity: 0.5, letterSpacing: '0.14em' }}>0'</span>
            <span style={{ position: 'absolute', right: 48, top: 8, fontFamily: FONT_MONO, fontSize: 10, opacity: 0.5, letterSpacing: '0.14em' }}>90'</span>
          </div>
        </div>
      </section>

      {/* GROUPS A + B */}
      <section style={{ padding: '40px 56px', borderTop: '1px solid rgba(250,246,236,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 32 }}>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 56, margin: 0, lineHeight: 0.9 }}>Groupes</h2>
          <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.18em', opacity: 0.55 }}>JOURNÉE 3 / 5 · 24 MATCHS JOUÉS</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {[
            { letter: 'A', teams: [
              { p: 1, n: 'FC PALLASTRADA', mp: 3, w: 2, d: 1, l: 0, gd: 5, pts: 7, you: true },
              { p: 2, n: 'BSC YB AM.', mp: 3, w: 2, d: 0, l: 1, gd: 2, pts: 6 },
              { p: 3, n: 'FC KÖNIZ', mp: 3, w: 1, d: 1, l: 1, gd: -1, pts: 4 },
              { p: 4, n: 'FC THUN', mp: 3, w: 0, d: 0, l: 3, gd: -6, pts: 0 },
            ]},
            { letter: 'B', teams: [
              { p: 1, n: 'BERN UNITED', mp: 3, w: 3, d: 0, l: 0, gd: 7, pts: 9 },
              { p: 2, n: 'LUZERN ALPS', mp: 3, w: 1, d: 1, l: 1, gd: 0, pts: 4 },
              { p: 3, n: 'FC SPIEZ', mp: 3, w: 1, d: 0, l: 2, gd: -2, pts: 3 },
              { p: 4, n: 'FC INTERLAKEN', mp: 3, w: 0, d: 1, l: 2, gd: -5, pts: 1 },
            ]},
          ].map(g => (
            <div key={g.letter} style={{ background: '#0A1829', border: '1px solid rgba(250,246,236,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid rgba(250,246,236,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 40, height: 40, background: PAL.sun, color: PAL.navy, fontFamily: FONT_DISPLAY, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{g.letter}</div>
                  <span style={{ fontFamily: FONT_DISPLAY, fontSize: 22, letterSpacing: '0.04em' }}>GROUPE {g.letter}</span>
                </div>
                <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.14em', opacity: 0.5 }}>4 ÉQUIPES · 6 MATCHS</span>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: FONT_MONO, fontSize: 13 }}>
                <thead>
                  <tr style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.16em', opacity: 0.5 }}>
                    <th style={{ padding: '10px 14px', textAlign: 'left' }}>#</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left' }}>ÉQUIPE</th>
                    <th style={{ padding: '10px 6px', textAlign: 'center' }}>J</th>
                    <th style={{ padding: '10px 6px', textAlign: 'center' }}>V</th>
                    <th style={{ padding: '10px 6px', textAlign: 'center' }}>N</th>
                    <th style={{ padding: '10px 6px', textAlign: 'center' }}>D</th>
                    <th style={{ padding: '10px 6px', textAlign: 'center' }}>±</th>
                    <th style={{ padding: '10px 14px', textAlign: 'center', color: '#FAF6EC', opacity: 0.85 }}>PTS</th>
                  </tr>
                </thead>
                <tbody>
                  {g.teams.map((r, i) => {
                    const qual = r.p <= 2;
                    return (
                      <tr key={r.n} style={{
                        borderTop: '1px solid rgba(250,246,236,0.06)',
                        background: r.you ? 'rgba(232,162,60,0.08)' : 'transparent',
                      }}>
                        <td style={{ padding: '14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ width: 4, height: 22, background: qual ? PAL.sun : 'transparent' }} />
                          <span style={{ color: qual ? PAL.sun : 'rgba(250,246,236,0.5)' }}>{r.p}</span>
                        </td>
                        <td style={{ padding: '14px', fontFamily: FONT_DISPLAY, fontSize: 16, letterSpacing: '0.04em', color: r.you ? PAL.sun : '#FAF6EC' }}>
                          {r.n}{r.you && <span style={{ marginLeft: 8, fontFamily: FONT_MONO, fontSize: 9, color: PAL.sun, letterSpacing: '0.14em' }}>★</span>}
                        </td>
                        <td style={{ padding: '14px 6px', textAlign: 'center', opacity: 0.85 }}>{r.mp}</td>
                        <td style={{ padding: '14px 6px', textAlign: 'center', color: PAL.grass }}>{r.w}</td>
                        <td style={{ padding: '14px 6px', textAlign: 'center', opacity: 0.85 }}>{r.d}</td>
                        <td style={{ padding: '14px 6px', textAlign: 'center', color: 'rgba(250,246,236,0.6)' }}>{r.l}</td>
                        <td style={{ padding: '14px 6px', textAlign: 'center', opacity: 0.85, color: r.gd > 0 ? PAL.grass : r.gd < 0 ? PAL.brick : 'rgba(250,246,236,0.7)' }}>{r.gd > 0 ? `+${r.gd}` : r.gd}</td>
                        <td style={{ padding: '14px', textAlign: 'center', fontFamily: FONT_DISPLAY, fontSize: 18, color: '#FAF6EC' }}>{r.pts}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div style={{ padding: '12px 24px', fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.14em', opacity: 0.45, borderTop: '1px solid rgba(250,246,236,0.06)' }}>
                <span style={{ display: 'inline-block', width: 8, height: 8, background: PAL.sun, marginRight: 6, verticalAlign: 'middle' }} /> QUALIFICATION 1/4 DE FINALE
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BRACKET */}
      <section style={{ padding: '60px 56px', borderTop: '1px solid rgba(250,246,236,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 32 }}>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 56, margin: 0, lineHeight: 0.9 }}>Tableau final</h2>
          <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.18em', opacity: 0.55 }}>QUARTS · DEMIS · FINALE · 24 — 28.06</span>
        </div>
        <Bracket />
      </section>

      {/* FIXTURES TODAY */}
      <section style={{ padding: '40px 56px 80px', borderTop: '1px solid rgba(250,246,236,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24 }}>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 40, margin: 0 }}>Aujourd'hui</h2>
          <div style={{ display: 'flex', gap: 16, fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.16em' }}>
            <span style={{ color: '#FAF6EC', borderBottom: '2px solid #FAF6EC', paddingBottom: 6 }}>SAM 14</span>
            <span style={{ opacity: 0.5, paddingBottom: 6 }}>DIM 15</span>
            <span style={{ opacity: 0.5, paddingBottom: 6 }}>LUN 16</span>
          </div>
        </div>
        <div style={{ background: '#0A1829', border: '1px solid rgba(250,246,236,0.08)' }}>
          {[
            { time: '12:00', t: 'FC Köniz — FC Thun', s: '3 — 0', state: 'finished', g: 'A' },
            { time: '14:30', t: 'FC Pallastrada — BSC YB Am.', s: '2 — 1', state: 'live', g: 'A', t2: '67\'' },
            { time: '14:30', t: 'Bern United — Luzern Alps', s: '0 — 0', state: 'live', g: 'B', t2: '34\'' },
            { time: '14:30', t: 'FC Oberland — Genève-Sud', s: '1 — 3', state: 'live', g: 'C', t2: '78\'' },
            { time: '17:00', t: 'FC Spiez — FC Interlaken', s: '— vs —', state: 'upcoming', g: 'B' },
            { time: '19:30', t: 'Vaud All-Stars — Pallastrada', s: '— vs —', state: 'upcoming', g: 'A' },
          ].map((m, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '70px 60px 1fr auto 100px 90px', gap: 16,
              alignItems: 'center', padding: '16px 24px',
              borderTop: i ? '1px solid rgba(250,246,236,0.06)' : 'none',
              background: m.state === 'live' ? 'rgba(230,57,70,0.05)' : 'transparent',
            }}>
              <span style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: '0.1em', opacity: 0.7 }}>{m.time}</span>
              <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.14em', opacity: 0.5 }}>GR. {m.g}</span>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: 18, letterSpacing: '0.04em' }}>{m.t}</span>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: m.state === 'live' ? PAL.sun : m.state === 'finished' ? '#FAF6EC' : 'rgba(250,246,236,0.4)' }}>{m.s}</span>
              <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.14em', textAlign: 'center', color: m.state === 'live' ? PAL.live : 'rgba(250,246,236,0.5)' }}>{m.t2 || (m.state === 'finished' ? 'TERMINÉ' : '')}</span>
              <div style={{ textAlign: 'right' }}><Badge kind={m.state} size="sm" /></div>
            </div>
          ))}
        </div>
      </section>

      <Footer dark />
    </div>
  );
}

function Bracket() {
  const TeamCell = ({ name, score, win, fav }) => (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '10px 14px', background: win ? 'rgba(232,162,60,0.1)' : 'transparent',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 6, height: 6, background: fav ? PAL.sun : 'rgba(250,246,236,0.3)' }} />
        <span style={{ fontFamily: FONT_DISPLAY, fontSize: 14, letterSpacing: '0.04em', color: win ? PAL.sun : '#FAF6EC', opacity: name ? 1 : 0.4 }}>
          {name || 'À DÉTERMINER'}
        </span>
      </div>
      <span style={{ fontFamily: FONT_DISPLAY, fontSize: 16, color: win ? PAL.sun : '#FAF6EC' }}>{score ?? '—'}</span>
    </div>
  );
  const Round = ({ title, gap, matches }) => (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', gap }}>
      <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.18em', opacity: 0.55 }}>{title}</div>
      {matches.map((m, i) => (
        <div key={i} style={{ background: '#0A1829', border: '1px solid rgba(250,246,236,0.08)' }}>
          <div style={{ padding: '6px 14px', borderBottom: '1px solid rgba(250,246,236,0.06)', fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.14em', opacity: 0.5, display: 'flex', justifyContent: 'space-between' }}>
            <span>{m.label}</span>
            <span>{m.date}</span>
          </div>
          <TeamCell {...m.a} />
          <div style={{ height: 1, background: 'rgba(250,246,236,0.05)' }} />
          <TeamCell {...m.b} />
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, alignItems: 'stretch' }}>
      <Round title="QUARTS · 24.06" gap={22} matches={[
        { label: 'Q1', date: '14:00', a: { name: 'FC PALLASTRADA', score: 3, win: true, fav: true }, b: { name: 'FC INTERLAKEN', score: 1 } },
        { label: 'Q2', date: '16:30', a: { name: 'FC SPIEZ', score: 0 }, b: { name: 'GENÈVE-SUD', score: 2, win: true } },
        { label: 'Q3', date: '14:00', a: { name: 'BERN UNITED', score: 4, win: true }, b: { name: 'FC THUN', score: 1 } },
        { label: 'Q4', date: '16:30', a: { name: 'BSC YB AM.', score: 1 }, b: { name: 'LUZERN ALPS', score: 1, win: true } },
      ]} />
      <Round title="DEMIS · 26.06" gap={120} matches={[
        { label: 'S1', date: '15:00', a: { name: 'FC PALLASTRADA', score: 2, win: true, fav: true }, b: { name: 'GENÈVE-SUD', score: 1 } },
        { label: 'S2', date: '18:00', a: { name: 'BERN UNITED', score: null }, b: { name: 'LUZERN ALPS', score: null } },
      ]} />
      <Round title="FINALE · 28.06" gap={300} matches={[
        { label: 'F · STADE NEUFELD', date: '17:00', a: { name: 'FC PALLASTRADA', score: null, fav: true }, b: { name: null, score: null } },
      ]} />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.18em', opacity: 0.55, marginBottom: 10 }}>VAINQUEUR</div>
        <div style={{ background: 'linear-gradient(180deg, #0A1829, #061320)', border: '2px solid rgba(232,162,60,0.4)', padding: 24, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 12, right: 14, fontFamily: FONT_DISPLAY, fontSize: 12, letterSpacing: '0.18em', color: PAL.sun }}>★ COUPE 2026</div>
          <div style={{ marginTop: 10, fontFamily: FONT_DISPLAY, fontSize: 34, lineHeight: 1.05, letterSpacing: '-0.01em', color: PAL.sun }}>
            En attente<br />du sacre.
          </div>
          <div style={{ marginTop: 24, paddingTop: 14, borderTop: '1px solid rgba(232,162,60,0.2)', fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.16em', opacity: 0.7 }}>
            DIM 28.06 · 17:00 · STADE DU NEUFELD
          </div>
        </div>
      </div>
    </div>
  );
}

function TournamentMobile() {
  return (
    <div style={{ width: 390, fontFamily: FONT_SANS, background: '#06101F', color: '#FAF6EC', overflow: 'hidden' }}>
      <PulseStyles />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid rgba(250,246,236,0.1)' }}>
        <Wordmark color="#FAF6EC" scale={0.8} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: 11, fontWeight: 700, padding: '4px 7px', background: '#FAF6EC', color: PAL.navy }}>FR</span>
          <div style={{ width: 22, height: 14, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <span style={{ height: 2, background: '#FAF6EC' }} /><span style={{ height: 2, background: '#FAF6EC' }} />
          </div>
        </div>
      </div>

      <div style={{ padding: '24px 20px 16px' }}>
        <Badge kind="live" />
        <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 56, margin: '14px 0 0', lineHeight: 0.9, letterSpacing: '-0.01em' }}>
          Tournoi <span style={{ color: PAL.sun }}>'26.</span>
        </h1>
        <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.18em', opacity: 0.6, marginTop: 12 }}>16 ÉQUIPES · J3/5 · 24 MATCHS JOUÉS</div>
      </div>

      {/* tabs */}
      <div style={{ padding: '0 20px', display: 'flex', gap: 8, marginBottom: 16 }}>
        {['DIRECT','GROUPES','TABLEAU'].map((t, i) => (
          <span key={t} style={{
            padding: '8px 12px', fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.14em',
            background: i === 0 ? '#FAF6EC' : 'rgba(250,246,236,0.05)',
            color: i === 0 ? PAL.navy : '#FAF6EC',
          }}>{t}</span>
        ))}
      </div>

      {/* Featured match */}
      <div style={{ margin: '0 20px 20px', background: '#0A1829', border: '1px solid rgba(250,246,236,0.08)', overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(250,246,236,0.08)' }}>
          <Badge kind="live" />
          <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: PAL.sun, animation: 'liveBlink 1.6s infinite' }}>67' · 2ᵉ MT</span>
        </div>
        <div style={{ padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <LogoImg size={28} />
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: 16 }}>PALLASTRADA</span>
            </div>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 44, color: PAL.sun, lineHeight: 1 }}>2</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderTop: '1px solid rgba(250,246,236,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: 99, background: PAL.brick, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_DISPLAY, fontSize: 11 }}>YB</div>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: 16 }}>BSC YB AM.</span>
            </div>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 44, lineHeight: 1 }}>1</span>
          </div>
        </div>
        <div style={{ padding: '8px 16px 14px', fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.14em', opacity: 0.55, borderTop: '1px solid rgba(250,246,236,0.06)' }}>
          ▸ 58' · BUT G. RIVA — TERRAIN A
        </div>
      </div>

      {/* Group A mini table */}
      <div style={{ margin: '0 20px 20px', background: '#0A1829', border: '1px solid rgba(250,246,236,0.08)' }}>
        <div style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(250,246,236,0.08)' }}>
          <div style={{ width: 28, height: 28, background: PAL.sun, color: PAL.navy, fontFamily: FONT_DISPLAY, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>A</div>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: 17, letterSpacing: '0.04em' }}>GROUPE A</span>
        </div>
        {[
          { p: 1, n: 'PALLASTRADA', pts: 7, you: true },
          { p: 2, n: 'BSC YB AM.', pts: 6 },
          { p: 3, n: 'FC KÖNIZ', pts: 4 },
          { p: 4, n: 'FC THUN', pts: 0 },
        ].map(r => (
          <div key={r.n} style={{
            padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderTop: '1px solid rgba(250,246,236,0.05)',
            background: r.you ? 'rgba(232,162,60,0.08)' : 'transparent',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: FONT_DISPLAY, fontSize: 14 }}>
              <span style={{ width: 4, height: 18, background: r.p <= 2 ? PAL.sun : 'transparent' }} />
              <span style={{ opacity: 0.6, fontFamily: FONT_MONO, fontSize: 11 }}>{r.p}</span>
              <span style={{ color: r.you ? PAL.sun : '#FAF6EC' }}>{r.n}</span>
            </div>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 18 }}>{r.pts}</span>
          </div>
        ))}
      </div>

      {/* Today schedule */}
      <div style={{ margin: '0 20px 20px' }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 24, marginBottom: 12 }}>Aujourd'hui</div>
        {[
          { time: '12:00', t: 'KÖNIZ — THUN', s: '3 — 0', state: 'finished' },
          { time: '14:30', t: 'PALLAS. — YB AM.', s: '2 — 1', state: 'live' },
          { time: '17:00', t: 'SPIEZ — INTERL.', s: '— vs —', state: 'upcoming' },
        ].map((m, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '12px 14px', background: m.state === 'live' ? 'rgba(230,57,70,0.06)' : '#0A1829',
            border: '1px solid rgba(250,246,236,0.08)', borderBottom: 'none',
            ...(i === 2 ? { borderBottom: '1px solid rgba(250,246,236,0.08)' } : {}),
          }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.1em', opacity: 0.6, minWidth: 50 }}>{m.time}</span>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 14, flex: 1, textAlign: 'left', paddingLeft: 8 }}>{m.t}</span>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 16, color: m.state === 'live' ? PAL.sun : m.state === 'finished' ? '#FAF6EC' : 'rgba(250,246,236,0.4)' }}>{m.s}</span>
          </div>
        ))}
      </div>

      <div style={{ background: '#040912', padding: '24px 20px', borderTop: '1px solid rgba(250,246,236,0.1)', fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.14em', opacity: 0.5 }}>
        © 2026 KSV PALLASTRADA · BERNE
      </div>
    </div>
  );
}

Object.assign(window, { TournamentDesktop, TournamentMobile });
