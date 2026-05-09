// Football club page — desktop + mobile

function FootballDesktop() {
  const fixtures = [
    { d: 'SAM 13.09', h: '16:00', t: 'Pallastrada — FC Köniz', loc: 'Neufeld · Terrain A', s: 'upcoming' },
    { d: 'SAM 06.09', h: '14:00', t: 'BSC YB Am. — Pallastrada', loc: 'Wankdorf · Terrain 2', s: 'finished', score: '1 — 3' },
    { d: 'DIM 31.08', h: '15:30', t: 'Pallastrada — FC Thun U23', loc: 'Neufeld · Terrain A', s: 'finished', score: '2 — 2' },
    { d: 'SAM 20.09', h: '16:00', t: 'FC Spiez — Pallastrada', loc: 'Lachenstrasse', s: 'upcoming' },
  ];
  return (
    <div style={{ width: 1440, fontFamily: FONT_SANS, background: PAL.cream, color: PAL.ink }}>
      <PulseStyles />
      <Nav active="football" />

      {/* Hero */}
      <section style={{ position: 'relative', height: 640, overflow: 'hidden' }}>
        <img src="assets/football.jpg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,26,46,0.4) 0%, rgba(8,26,46,0.85) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, padding: '60px 56px', color: '#FAF6EC', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.22em' }}>CLUB N°01 · DEPUIS 1947</div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.18em', textAlign: 'right' }}>
              <div style={{ opacity: 0.7 }}>SAISON 26/27</div>
              <div>312 LICENCIÉS · 6 ÉQUIPES</div>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: '0.22em', opacity: 0.85, marginBottom: 18 }}>
              CLUB / FOOTBALL —
            </div>
            <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 220, lineHeight: 0.85, margin: 0, letterSpacing: '-0.015em', textTransform: 'uppercase' }}>
              FOOTBALL.
            </h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 28 }}>
              <p style={{ fontSize: 17, lineHeight: 1.55, maxWidth: 540, margin: 0 }}>
                Le club historique de Pallastrada. Six équipes, du U13 aux seniors,
                un seul mantra : passion, esprit d'équipe, respect du jeu.
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                <button style={{ padding: '16px 24px', background: PAL.grass, color: '#fff', border: 'none', fontFamily: FONT_DISPLAY, fontSize: 13, letterSpacing: '0.14em' }}>
                  REJOINDRE UNE ÉQUIPE →
                </button>
                <button style={{ padding: '16px 24px', background: 'transparent', color: '#FAF6EC', border: '1px solid rgba(250,246,236,0.4)', fontFamily: FONT_DISPLAY, fontSize: 13, letterSpacing: '0.14em' }}>
                  CALENDRIER
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strip stats */}
      <section style={{ background: PAL.navy, color: '#FAF6EC', padding: '40px 56px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 24, borderTop: '1px solid rgba(250,246,236,0.08)' }}>
        {[
          ['312', 'LICENCIÉS'],
          ['6', 'ÉQUIPES'],
          ['18', 'BÉNÉVOLES'],
          ['2.4M', 'KM PARCOURUS'],
          ['79', 'SAISONS'],
        ].map(([n, l]) => (
          <div key={l}>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 56, lineHeight: 1, color: PAL.sun }}>{n}</div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.18em', opacity: 0.65, marginTop: 6 }}>{l}</div>
          </div>
        ))}
      </section>

      {/* Two col: about + next match */}
      <section style={{ padding: '100px 56px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56 }}>
        <div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.22em', color: PAL.navy, marginBottom: 16 }}>02 — LE CLUB</div>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 72, lineHeight: 0.92, margin: 0, color: PAL.navy }}>
            Le terrain<br />comme école.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 32 }}>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: PAL.ink, margin: 0 }}>
              Fondé en 1947 par un groupe d'ouvriers du quartier Länggasse, le club n'a jamais perdu son ADN populaire.
              Toujours formateur, toujours collectif — du gamin qui découvre le ballon au vétéran du dimanche.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: PAL.stone, margin: 0 }}>
              Nos six équipes s'entraînent au Stade du Neufeld, deux soirs par semaine.
              Le club assure les licences, les déplacements régionaux et un pot d'après-match qui fait partie du patrimoine.
            </p>
          </div>

          {/* Teams */}
          <div style={{ marginTop: 48, paddingTop: 28, borderTop: `1px solid ${PAL.line}` }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.18em', color: PAL.stone, marginBottom: 18 }}>NOS ÉQUIPES</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {[
                { l: '1ère équipe', cat: 'Seniors · 2L', n: '24' },
                { l: '2ème équipe', cat: 'Seniors · 4L', n: '22' },
                { l: 'M-21', cat: 'Espoirs', n: '26' },
                { l: 'M-17', cat: 'Juniors A', n: '24' },
                { l: 'M-15', cat: 'Juniors B', n: '22' },
                { l: 'M-13', cat: 'Juniors C', n: '20' },
              ].map(t => (
                <div key={t.l} style={{ background: PAL.paper, border: `1px solid ${PAL.line}`, padding: '18px 20px' }}>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: PAL.navy }}>{t.l}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.12em' }}>
                    <span style={{ color: PAL.stone }}>{t.cat}</span>
                    <span style={{ color: PAL.navy }}>{t.n} JOUEURS</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Next match card */}
        <aside>
          <div style={{ background: PAL.navy, color: '#FAF6EC', padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 22, fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.18em' }}>
              <Badge kind="upcoming">PROCHAIN MATCH</Badge>
              <span style={{ opacity: 0.5 }}>J+3</span>
            </div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 14, letterSpacing: '0.18em', opacity: 0.7 }}>SAMEDI 13 SEPT. · 16H00</div>
            <div style={{ marginTop: 18, paddingTop: 18, borderTop: '1px solid rgba(250,246,236,0.15)' }}>
              {[
                { t: 'KSV PALLASTRADA', sub: 'HOME', logo: true },
                { t: 'FC KÖNIZ', sub: 'AWAY' },
              ].map((m, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 0', borderTop: i ? '1px solid rgba(250,246,236,0.08)' : 'none' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 99, background: m.logo ? PAL.cream : '#1B3A5C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {m.logo && <LogoImg size={38} />}
                  </div>
                  <div>
                    <div style={{ fontFamily: FONT_DISPLAY, fontSize: 22, letterSpacing: '0.04em' }}>{m.t}</div>
                    <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.16em', opacity: 0.5, marginTop: 2 }}>{m.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 18, paddingTop: 18, borderTop: '1px solid rgba(250,246,236,0.15)', fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.12em', opacity: 0.7 }}>
              STADE DU NEUFELD · TERRAIN A · BERNE
            </div>
            <button style={{ marginTop: 20, width: '100%', padding: 14, background: PAL.sun, color: PAL.ink, border: 'none', fontFamily: FONT_DISPLAY, fontSize: 13, letterSpacing: '0.14em' }}>
              RAPPEL AGENDA →
            </button>
          </div>

          {/* Form */}
          <div style={{ marginTop: 16, background: PAL.paper, border: `1px solid ${PAL.line}`, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14, fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.18em', color: PAL.stone }}>
              <span>FORME · 5 DERNIERS</span>
              <span>3V · 1N · 1D</span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['W','W','D','W','L'].map((r, i) => (
                <span key={i} style={{
                  flex: 1, padding: '10px 0', textAlign: 'center', fontFamily: FONT_DISPLAY, fontSize: 16, color: '#fff',
                  background: r === 'W' ? PAL.grass : r === 'D' ? PAL.stoneL : PAL.brick,
                }}>{r}</span>
              ))}
            </div>
          </div>
        </aside>
      </section>

      {/* Fixtures */}
      <section style={{ padding: '0 56px 100px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 56, margin: 0, color: PAL.navy }}>Calendrier · 1ère équipe</h2>
          <div style={{ display: 'flex', gap: 16, fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.16em' }}>
            <span style={{ color: PAL.navy, borderBottom: `2px solid ${PAL.navy}`, paddingBottom: 6 }}>TOUS</span>
            <span style={{ color: PAL.stone, paddingBottom: 6 }}>À VENIR</span>
            <span style={{ color: PAL.stone, paddingBottom: 6 }}>TERMINÉS</span>
          </div>
        </div>
        <div style={{ background: '#fff', border: `1px solid ${PAL.line}` }}>
          {fixtures.map((m, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '120px 80px 1fr 1fr 100px 120px', gap: 20,
              alignItems: 'center', padding: '22px 28px',
              borderTop: i ? `1px solid ${PAL.line}` : 'none',
            }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 16, letterSpacing: '0.06em', color: PAL.navy }}>{m.d}</div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 13, color: PAL.stone }}>{m.h}</div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: PAL.ink }}>{m.t}</div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.12em', color: PAL.stone }}>{m.loc}</div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 24, color: m.s === 'finished' ? PAL.navy : PAL.stoneL, textAlign: 'right' }}>
                {m.score || '—'}
              </div>
              <div style={{ textAlign: 'right' }}>
                <Badge kind={m.s} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FootballMobile() {
  return (
    <div style={{ width: 390, fontFamily: FONT_SANS, background: PAL.cream, color: PAL.ink, overflow: 'hidden' }}>
      <PulseStyles />
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', background: PAL.cream, borderBottom: `1px solid ${PAL.line}` }}>
        <Wordmark color={PAL.navy} scale={0.8} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: 11, fontWeight: 700, color: PAL.navy }}>FR</span>
          <div style={{ width: 22, height: 14, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <span style={{ height: 2, background: PAL.navy }} /><span style={{ height: 2, background: PAL.navy }} />
          </div>
        </div>
      </header>

      <section style={{ position: 'relative', height: 540, overflow: 'hidden' }}>
        <img src="assets/football.jpg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,26,46,0.3), rgba(8,26,46,0.92))' }} />
        <div style={{ position: 'absolute', left: 20, right: 20, bottom: 24, color: '#FAF6EC' }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.22em', opacity: 0.8 }}>CLUB N°01 — DEPUIS 1947</div>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 96, lineHeight: 0.86, margin: '14px 0 0', letterSpacing: '-0.01em' }}>FOOTBALL.</h1>
          <p style={{ fontSize: 14, lineHeight: 1.5, opacity: 0.92, marginTop: 16 }}>
            Six équipes, un seul mantra : passion, esprit d'équipe, respect du jeu.
          </p>
          <button style={{ marginTop: 18, width: '100%', padding: 14, background: PAL.grass, color: '#fff', border: 'none', fontFamily: FONT_DISPLAY, fontSize: 13, letterSpacing: '0.14em' }}>
            REJOINDRE UNE ÉQUIPE →
          </button>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: PAL.navy, color: '#FAF6EC', padding: '24px 20px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {[['312','LICENCIÉS'],['6','ÉQUIPES'],['79','SAISONS']].map(([n, l]) => (
          <div key={l}>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 36, color: PAL.sun, lineHeight: 1 }}>{n}</div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.16em', opacity: 0.7, marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </section>

      {/* Next match */}
      <section style={{ padding: '36px 20px' }}>
        <div style={{ background: PAL.navy, color: '#FAF6EC', padding: 22 }}>
          <Badge kind="upcoming">PROCHAIN MATCH</Badge>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 14, letterSpacing: '0.16em', marginTop: 14, opacity: 0.7 }}>SAMEDI 13.09 · 16H</div>
          {[['KSV PALLASTRADA', true], ['FC KÖNIZ', false]].map(([n, fav], i) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderTop: i ? '1px solid rgba(250,246,236,0.08)' : '1px solid rgba(250,246,236,0.15)', marginTop: i ? 0 : 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 99, background: fav ? PAL.cream : '#1B3A5C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {fav && <LogoImg size={32} />}
              </div>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: 18 }}>{n}</span>
            </div>
          ))}
          <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(250,246,236,0.15)', fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.12em', opacity: 0.6 }}>
            STADE DU NEUFELD · TERRAIN A
          </div>
        </div>
      </section>

      {/* Fixtures */}
      <section style={{ padding: '0 20px 36px' }}>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 32, margin: '0 0 16px', color: PAL.navy }}>Calendrier</h2>
        <div style={{ background: '#fff', border: `1px solid ${PAL.line}` }}>
          {[
            { d: 'SAM 13.09', t: 'Pallastrada — FC Köniz', s: 'upcoming' },
            { d: 'SAM 06.09', t: 'BSC YB Am. — Pallastrada', s: 'finished', score: '1 — 3' },
            { d: 'DIM 31.08', t: 'Pallastrada — FC Thun', s: 'finished', score: '2 — 2' },
          ].map((m, i) => (
            <div key={i} style={{ padding: 16, borderTop: i ? `1px solid ${PAL.line}` : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: 13, letterSpacing: '0.06em', color: PAL.navy }}>{m.d}</span>
                <Badge kind={m.s} size="sm" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: 16 }}>{m.t}</span>
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: 18, color: m.s === 'finished' ? PAL.navy : PAL.stoneL }}>{m.score || '—'}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ background: PAL.navy, color: '#FAF6EC', padding: '24px 20px', fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.14em', opacity: 0.6 }}>
        © 2026 KSV PALLASTRADA · BERNE
      </div>
    </div>
  );
}

Object.assign(window, { FootballDesktop, FootballMobile });
