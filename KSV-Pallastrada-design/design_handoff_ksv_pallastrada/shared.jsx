// Shared tokens + components for KSV Pallastrada
const PAL = {
  navy: '#0E2A4A',
  navyDeep: '#081A2E',
  navyMid: '#1B3A5C',
  cream: '#F4EEE2',
  paper: '#FAF6EC',
  ink: '#0A0F18',
  stone: '#5C6577',
  stoneL: '#A6ADB9',
  line: '#E3DCCB',
  grass: '#5A8A2E',
  sun: '#E8A23C',
  brick: '#C24A2C',
  live: '#E63946',
  finished: '#7A8088',
};

const FONT_DISPLAY = "'Anton', 'Archivo Black', Impact, sans-serif";
const FONT_SANS = "'Inter', -apple-system, system-ui, sans-serif";
const FONT_MONO = "'JetBrains Mono', ui-monospace, monospace";

// Logo mark - accurate recreation as inline SVG
function LogoMark({ size = 40, ring = '#FAF6EC', body = PAL.navy }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ display: 'block' }}>
      <circle cx="50" cy="50" r="48" fill={body} />
      <circle cx="50" cy="50" r="44" fill="none" stroke={ring} strokeWidth="1.6" />
      {/* hat dome */}
      <path d="M30 64 Q30 48 50 48 Q70 48 70 64 Z" fill={ring} />
      {/* moustache cutout */}
      <path d="M42 56 Q44 60 50 60 Q56 60 58 56 Q57 64 50 64 Q43 64 42 56 Z" fill={body} />
      {/* hat brim */}
      <path d="M22 68 Q50 78 78 68 Q78 72 50 72 Q22 72 22 68 Z" fill={ring} />
    </svg>
  );
}

// Better: use the actual image file
function LogoImg({ size = 40, invert = false }) {
  return (
    <img src="assets/logo.png" alt="KSV Pallastrada"
      style={{
        width: size, height: size, display: 'block',
        borderRadius: '50%',
        filter: invert ? 'brightness(0) invert(1)' : 'none',
      }} />
  );
}

function Wordmark({ color = PAL.navy, scale = 1 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 * scale }}>
      <LogoImg size={36 * scale} />
      <div style={{ lineHeight: 1, fontFamily: FONT_DISPLAY }}>
        <div style={{ fontSize: 18 * scale, color, letterSpacing: '0.04em' }}>KSV</div>
        <div style={{ fontSize: 13 * scale, color, opacity: 0.7, letterSpacing: '0.18em', marginTop: 2 }}>PALLASTRADA</div>
      </div>
    </div>
  );
}

function Nav({ active = 'home', dark = false }) {
  const fg = dark ? '#FAF6EC' : PAL.navy;
  const muted = dark ? 'rgba(250,246,236,0.6)' : 'rgba(14,42,74,0.55)';
  const border = dark ? 'rgba(250,246,236,0.12)' : PAL.line;
  const items = [
    { k: 'home', l: 'ACCUEIL' },
    { k: 'football', l: 'FOOTBALL' },
    { k: 'cycling', l: 'VÉLO' },
    { k: 'hiking', l: 'HIKING' },
    { k: 'tournament', l: 'TOURNOI', live: true },
    { k: 'contact', l: 'CONTACT' },
  ];
  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 56px', borderBottom: `1px solid ${border}`,
      background: dark ? 'transparent' : 'transparent',
    }}>
      <Wordmark color={fg} />
      <nav style={{ display: 'flex', gap: 28, fontFamily: FONT_SANS, fontSize: 13, fontWeight: 600, letterSpacing: '0.08em' }}>
        {items.map(it => (
          <a key={it.k} style={{
            color: it.k === active ? fg : muted,
            textDecoration: 'none', position: 'relative',
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
            {it.l}
            {it.live && <span style={{
              width: 6, height: 6, borderRadius: 99, background: PAL.live,
              boxShadow: `0 0 0 3px ${PAL.live}33`,
            }} />}
            {it.k === active && <span style={{
              position: 'absolute', left: 0, right: 0, bottom: -22, height: 2, background: fg,
            }} />}
          </a>
        ))}
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: FONT_MONO, fontSize: 11, fontWeight: 500 }}>
        {['FR','EN','DE','IT'].map((l,i) => (
          <span key={l} style={{
            padding: '6px 8px', borderRadius: 4,
            background: i === 0 ? (dark ? '#FAF6EC' : PAL.navy) : 'transparent',
            color: i === 0 ? (dark ? PAL.navy : '#FAF6EC') : muted,
            letterSpacing: '0.08em',
          }}>{l}</span>
        ))}
      </div>
    </header>
  );
}

function Badge({ kind = 'live', children, size = 'md' }) {
  const cfg = {
    live: { bg: PAL.live, fg: '#fff', dot: true, label: 'LIVE' },
    upcoming: { bg: PAL.navy, fg: '#FAF6EC', dot: false, label: 'À VENIR' },
    finished: { bg: 'transparent', fg: PAL.stone, border: PAL.stoneL, dot: false, label: 'TERMINÉ' },
    soon: { bg: PAL.sun, fg: PAL.ink, dot: false, label: 'BIENTÔT' },
  }[kind];
  const s = size === 'sm' ? { fs: 10, px: 8, py: 3 } : { fs: 11, px: 10, py: 5 };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: `${s.py}px ${s.px}px`,
      background: cfg.bg, color: cfg.fg,
      border: cfg.border ? `1px solid ${cfg.border}` : 'none',
      fontFamily: FONT_MONO, fontSize: s.fs, fontWeight: 700, letterSpacing: '0.14em',
      borderRadius: 3,
    }}>
      {cfg.dot && <span style={{
        width: 6, height: 6, borderRadius: 99, background: '#fff',
        animation: 'pulse 1.4s ease-in-out infinite',
      }} />}
      {children || cfg.label}
    </span>
  );
}

function PulseStyles() {
  return <style>{`
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.85); }
    }
    @keyframes liveBlink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.55; }
    }
    @keyframes ticker {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  `}</style>;
}

// Striped placeholder
function Stripe({ w = '100%', h = 200, label = 'image', dark = false }) {
  const c1 = dark ? '#101826' : '#E9E1CF';
  const c2 = dark ? '#162035' : '#F0E9D8';
  return (
    <div style={{
      width: w, height: h, position: 'relative', overflow: 'hidden',
      background: `repeating-linear-gradient(135deg, ${c1} 0 12px, ${c2} 12px 24px)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <span style={{
        fontFamily: FONT_MONO, fontSize: 11, color: dark ? '#7A8294' : '#8A8470',
        background: dark ? '#0A111C' : '#FAF6EC', padding: '4px 8px', letterSpacing: '0.1em',
      }}>{label}</span>
    </div>
  );
}

function Footer({ dark = false }) {
  const bg = dark ? PAL.navyDeep : PAL.navy;
  return (
    <footer style={{
      background: bg, color: '#FAF6EC', padding: '56px 56px 28px',
      fontFamily: FONT_SANS,
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}>
        <div>
          <Wordmark color="#FAF6EC" />
          <p style={{ marginTop: 18, fontSize: 13, lineHeight: 1.6, opacity: 0.65, maxWidth: 280 }}>
            Association sportive bernoise depuis 1947. Football, vélo, randonnée — unis par le sport, engagés pour demain.
          </p>
        </div>
        {[
          ['CLUBS', ['Football','Vélo','Hiking','Adhésion']],
          ['TOURNOI', ['Calendrier','Classements','Diffusion','Archives']],
          ['ASSOCIATION', ['À propos','Comité','Sponsors','Presse']],
          ['CONTACT', ['Berne, CH','+41 31 555 0147','hello@ksv-pallastrada.ch']],
        ].map(([t, items]) => (
          <div key={t}>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 13, letterSpacing: '0.18em', marginBottom: 16, opacity: 0.6 }}>{t}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
              {items.map(i => <li key={i} style={{ opacity: 0.85 }}>{i}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 24, borderTop: '1px solid rgba(250,246,236,0.12)', fontSize: 11, fontFamily: FONT_MONO, opacity: 0.55, letterSpacing: '0.1em' }}>
        <span>© 2026 KSV PALLASTRADA · BERNE</span>
        <span>SPORT · NATURE · COMMUNAUTÉ</span>
      </div>
    </footer>
  );
}

Object.assign(window, { PAL, FONT_DISPLAY, FONT_SANS, FONT_MONO, LogoMark, LogoImg, Wordmark, Nav, Badge, PulseStyles, Stripe, Footer });
