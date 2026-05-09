// Design system showcase
function DesignSystem() {
  const swatches = [
    ['Navy / Primary', PAL.navy, '#0E2A4A'],
    ['Navy Deep', PAL.navyDeep, '#081A2E'],
    ['Cream / Surface', PAL.cream, '#F4EEE2'],
    ['Paper', PAL.paper, '#FAF6EC'],
    ['Ink', PAL.ink, '#0A0F18'],
    ['Stone', PAL.stone, '#5C6577'],
    ['Grass · Football', PAL.grass, '#5A8A2E'],
    ['Sun · Cycling', PAL.sun, '#E8A23C'],
    ['Brick · Hiking', PAL.brick, '#C24A2C'],
    ['Live Red', PAL.live, '#E63946'],
  ];
  return (
    <div style={{ width: 1440, background: PAL.paper, fontFamily: FONT_SANS, color: PAL.ink, padding: '64px 72px' }}>
      <PulseStyles />
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48 }}>
        <div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.2em', color: PAL.stone, marginBottom: 12 }}>
            00 — DESIGN SYSTEM
          </div>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 88, letterSpacing: '-0.01em', margin: 0, lineHeight: 0.9 }}>
            VISUAL <span style={{ color: PAL.brick }}>LANGUAGE.</span>
          </h1>
          <p style={{ fontSize: 16, color: PAL.stone, maxWidth: 520, marginTop: 16, lineHeight: 1.6 }}>
            Anchored in the navy of the KSV crest. Warmed by alpine sunset, grass and brick.
            Built for big type, dense data, and live broadcast moments.
          </p>
        </div>
        <LogoImg size={140} />
      </div>

      {/* Color tokens */}
      <Section title="01 · COLOR" subtitle="Tokens & semantic roles">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
          {swatches.map(([name, hex, code]) => (
            <div key={name} style={{ background: '#fff', border: `1px solid ${PAL.line}` }}>
              <div style={{ height: 110, background: hex, borderBottom: `1px solid ${PAL.line}` }} />
              <div style={{ padding: '12px 14px' }}>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 13, letterSpacing: '0.06em' }}>{name.toUpperCase()}</div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: PAL.stone, marginTop: 4 }}>{code}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Type */}
      <Section title="02 · TYPE" subtitle="Anton · Inter · JetBrains Mono">
        <div style={{ background: '#fff', border: `1px solid ${PAL.line}`, padding: '40px 44px' }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 140, lineHeight: 0.85, letterSpacing: '-0.01em', color: PAL.navy }}>
            UNIS PAR<br/>LE SPORT.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginTop: 40, paddingTop: 32, borderTop: `1px solid ${PAL.line}` }}>
            <TypeSpec font={FONT_DISPLAY} sample="DISPLAY 88" name="Anton — Display" usage="Headlines, scores, hero" />
            <TypeSpec font={FONT_SANS} sample="The quick brown fox jumps over the lazy dog 0123456789" name="Inter — Body" usage="Paragraphs, UI, navigation" weight={500} fs={20} />
            <TypeSpec font={FONT_MONO} sample="LIVE · 67' · 2 — 1 · STAGE 04" name="JetBrains Mono — Data" usage="Scores, timers, codes" fs={16} />
          </div>
        </div>
      </Section>

      {/* Components */}
      <Section title="03 · COMPONENTS" subtitle="Buttons · Badges · Cards · Tables">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <Panel title="BUTTONS">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <BtnPrimary>REJOINDRE LE CLUB</BtnPrimary>
              <BtnSecondary>VOIR LE TOURNOI</BtnSecondary>
              <BtnGhost>EN SAVOIR PLUS →</BtnGhost>
              <BtnIcon />
            </div>
          </Panel>
          <Panel title="BADGES">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <Badge kind="live" />
              <Badge kind="upcoming" />
              <Badge kind="finished" />
              <Badge kind="soon" />
            </div>
          </Panel>
          <Panel title="SCORE CARD" pad={0}>
            <ScorePreview />
          </Panel>
          <Panel title="STANDING ROW" pad={0}>
            <StandingPreview />
          </Panel>
        </div>
      </Section>

      {/* Logo lockups */}
      <Section title="04 · MARK" subtitle="Lockups & spacing">
        <div style={{ background: '#fff', border: `1px solid ${PAL.line}`, padding: 40, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <LogoImg size={120} />
            <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: PAL.stone, letterSpacing: '0.14em' }}>PRIMARY</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: 24, background: PAL.navy }}>
            <LogoImg size={120} invert />
            <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: '#FAF6EC99', letterSpacing: '0.14em' }}>REVERSED</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <Wordmark scale={1.4} />
            <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: PAL.stone, letterSpacing: '0.14em' }}>HORIZONTAL</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <div style={{ textAlign: 'center', fontFamily: FONT_DISPLAY, color: PAL.navy }}>
              <LogoImg size={64} />
              <div style={{ fontSize: 22, marginTop: 10, letterSpacing: '0.04em' }}>KSV</div>
              <div style={{ fontSize: 11, opacity: 0.7, letterSpacing: '0.22em' }}>PALLASTRADA</div>
              <div style={{ fontSize: 9, opacity: 0.5, letterSpacing: '0.3em', marginTop: 4 }}>BERNE · 1947</div>
            </div>
            <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: PAL.stone, letterSpacing: '0.14em' }}>STACKED</span>
          </div>
        </div>
      </Section>
    </div>
  );
}

function Section({ title, subtitle, children }) {
  return (
    <section style={{ marginBottom: 56 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 12, borderBottom: `1px solid ${PAL.line}` }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 22, letterSpacing: '0.02em' }}>{title}</div>
        <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: PAL.stone, letterSpacing: '0.14em' }}>{subtitle}</div>
      </div>
      {children}
    </section>
  );
}

function Panel({ title, children, pad = 24 }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${PAL.line}` }}>
      <div style={{ padding: '14px 20px', borderBottom: `1px solid ${PAL.line}`, fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.14em', color: PAL.stone }}>{title}</div>
      <div style={{ padding: pad }}>{children}</div>
    </div>
  );
}

function TypeSpec({ font, sample, name, usage, weight = 700, fs = 28 }) {
  return (
    <div>
      <div style={{ fontFamily: font, fontSize: fs, fontWeight: weight, color: PAL.navy, lineHeight: 1.2, marginBottom: 16 }}>
        {sample}
      </div>
      <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.14em', color: PAL.ink }}>{name.toUpperCase()}</div>
      <div style={{ fontSize: 12, color: PAL.stone, marginTop: 4 }}>{usage}</div>
    </div>
  );
}

function BtnPrimary({ children, dark = false }) {
  return (
    <button style={{
      background: dark ? '#FAF6EC' : PAL.navy,
      color: dark ? PAL.navy : '#FAF6EC',
      border: 'none', padding: '14px 22px',
      fontFamily: FONT_DISPLAY, fontSize: 13, letterSpacing: '0.14em',
      cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10,
    }}>
      {children}
      <span style={{ width: 18, height: 1, background: 'currentColor' }} />
      <span>→</span>
    </button>
  );
}
function BtnSecondary({ children }) {
  return (
    <button style={{
      background: 'transparent', color: PAL.navy, border: `1.5px solid ${PAL.navy}`,
      padding: '12px 20px', fontFamily: FONT_DISPLAY, fontSize: 13, letterSpacing: '0.14em', cursor: 'pointer',
    }}>{children}</button>
  );
}
function BtnGhost({ children }) {
  return (
    <button style={{
      background: 'transparent', color: PAL.navy, border: 'none',
      padding: '12px 0', fontFamily: FONT_SANS, fontWeight: 600, fontSize: 13, letterSpacing: '0.06em',
      cursor: 'pointer', borderBottom: `1.5px solid ${PAL.navy}`,
    }}>{children}</button>
  );
}
function BtnIcon() {
  return (
    <button style={{
      width: 44, height: 44, borderRadius: '50%', background: PAL.sun, border: 'none', cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: PAL.ink, fontSize: 18,
    }}>↗</button>
  );
}

function ScorePreview() {
  return (
    <div style={{ background: PAL.navyDeep, color: '#FAF6EC', padding: 20, fontFamily: FONT_SANS }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <Badge kind="live" />
        <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.14em', opacity: 0.6 }}>67' · MATCH 04</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 16 }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 18 }}>PALLASTRADA</div>
          <div style={{ fontSize: 11, opacity: 0.5, fontFamily: FONT_MONO, letterSpacing: '0.1em' }}>HOME</div>
        </div>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 56, lineHeight: 1, color: PAL.sun }}>2 — 1</div>
        <div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 18 }}>FC ARANJUEZ</div>
          <div style={{ fontSize: 11, opacity: 0.5, fontFamily: FONT_MONO, letterSpacing: '0.1em' }}>AWAY</div>
        </div>
      </div>
    </div>
  );
}

function StandingPreview() {
  const rows = [
    [1, 'PALLASTRADA', 5, 4, 1, 0, 12, 'W'],
    [2, 'BERN UNITED', 5, 3, 1, 1, 9, 'W'],
    [3, 'LUZERN ALPS', 5, 2, 1, 2, 7, 'D'],
    [4, 'FC ARANJUEZ', 5, 0, 1, 4, 1, 'L'],
  ];
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: FONT_MONO, fontSize: 12 }}>
      <thead>
        <tr style={{ background: PAL.cream, color: PAL.stone, fontSize: 10, letterSpacing: '0.14em' }}>
          {['#','EQUIPE','J','V','N','D','PTS','FORM'].map(h => (
            <th key={h} style={{ padding: '10px 12px', textAlign: h === 'EQUIPE' ? 'left' : 'center', fontWeight: 600 }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={r[0]} style={{ borderTop: i ? `1px solid ${PAL.line}` : 'none', background: i === 0 ? '#FAF6EC' : '#fff' }}>
            <td style={{ padding: '12px', textAlign: 'center', color: i === 0 ? PAL.navy : PAL.stone, fontWeight: 700 }}>{r[0]}</td>
            <td style={{ padding: '12px', fontFamily: FONT_DISPLAY, fontSize: 13, letterSpacing: '0.04em', color: PAL.navy }}>{r[1]}</td>
            {r.slice(2,7).map((v,j) => <td key={j} style={{ padding: '12px', textAlign: 'center', color: PAL.ink }}>{v}</td>)}
            <td style={{ padding: '12px', textAlign: 'center' }}>
              <span style={{
                display: 'inline-block', width: 22, height: 22, lineHeight: '22px',
                background: r[7] === 'W' ? PAL.grass : r[7] === 'D' ? PAL.stoneL : PAL.brick,
                color: '#fff', fontWeight: 700, fontSize: 11,
              }}>{r[7]}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Object.assign(window, { DesignSystem, BtnPrimary, BtnSecondary, BtnGhost, BtnIcon, Section, Panel, ScorePreview, StandingPreview });
