// Home page — desktop + mobile
function HomeDesktop() {
  return (
    <div style={{ width: 1440, background: PAL.paper, fontFamily: FONT_SANS, color: PAL.ink }}>
      <PulseStyles />
      <Nav active="home" />

      {/* HERO */}
      <section style={{ position: 'relative', height: 760, overflow: 'hidden' }}>
        <img src="assets/football.jpg" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          filter: 'brightness(0.7) saturate(1.05)',
        }} alt="" />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${PAL.navyDeep}aa 0%, transparent 30%, ${PAL.navyDeep}cc 100%)` }} />
        <div style={{ position: 'relative', height: '100%', padding: '64px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#FAF6EC' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.2em', opacity: 0.7 }}>
              N°01 · BERNE · CH<br/>
              <span style={{ opacity: 0.5 }}>46.9480° N · 7.4474° E</span>
            </div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.2em', opacity: 0.7, textAlign: 'right' }}>
              EST. 1947 · 78 ANS<br/>
              <span style={{ opacity: 0.5 }}>3 CLUBS · 412 MEMBRES</span>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', gap: 14, marginBottom: 24 }}>
              <Badge kind="live"><span style={{ display: 'flex', gap: 6, alignItems: 'center' }}><span style={{ width: 6, height: 6, borderRadius: 99, background: '#fff', animation: 'pulse 1.4s infinite' }} />TOURNOI EN COURS</span></Badge>
              <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.14em', opacity: 0.7, alignSelf: 'center' }}>JOURNÉE 04 / 08 · COUPE PALLASTRADA 2026</span>
            </div>
            <h1 style={{
              fontFamily: FONT_DISPLAY, fontSize: 200, lineHeight: 0.86, margin: 0,
              letterSpacing: '-0.015em',
            }}>
              UNIS PAR<br/>
              LE SPORT,<br/>
              <span style={{ color: PAL.sun }}>ENGAGÉS</span> POUR DEMAIN.
            </h1>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 32 }}>
              <p style={{ maxWidth: 460, fontSize: 15, lineHeight: 1.6, opacity: 0.85, margin: 0 }}>
                De la ville aux sommets, sur le terrain, les sentiers et les routes : trois clubs, une famille bernoise. Football, vélo, randonnée — vivons le sport ensemble.
              </p>
              <div style={{ display: 'flex', gap: 14 }}>
                <BtnPrimary dark>REJOINDRE LE CLUB</BtnPrimary>
                <button style={{
                  background: 'transparent', color: '#FAF6EC', border: '1.5px solid rgba(250,246,236,0.5)',
                  padding: '12px 20px', fontFamily: FONT_DISPLAY, fontSize: 13, letterSpacing: '0.14em',
                }}>VOIR LE TOURNOI →</button>
              </div>
            </div>
          </div>
        </div>
        {/* corner mark */}
        <div style={{ position: 'absolute', top: 56, right: 56 }}>
          <LogoImg size={72} invert />
        </div>
      </section>

      {/* TICKER */}
      <div style={{ background: PAL.navy, color: '#FAF6EC', padding: '14px 0', overflow: 'hidden', borderTop: '1px solid rgba(250,246,236,0.1)', borderBottom: '1px solid rgba(250,246,236,0.1)' }}>
        <div style={{ display: 'flex', gap: 48, animation: 'ticker 32s linear infinite', whiteSpace: 'nowrap', fontFamily: FONT_MONO, fontSize: 12, letterSpacing: '0.16em' }}>
          {Array(2).fill(0).map((_,k) => (
            <React.Fragment key={k}>
              {[
                ['LIVE', 'PALLASTRADA 2 — 1 ARANJUEZ · 67\''],
                ['NEXT', 'BERN UNITED vs LUZERN ALPS · DIM 16:00'],
                ['CYCLING', 'GRAND TOUR ALPIN — ÉTAPE 04 · GIMMELWALD'],
                ['HIKING', 'SORTIE NIESEN · SAM 06:30 · 12 PLACES'],
                ['NEWS', '78ᵉ ANNIVERSAIRE · GALA 24 MAI'],
              ].map((it, i) => (
                <span key={`${k}-${i}`} style={{ display: 'inline-flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ color: PAL.sun, fontWeight: 700 }}>· {it[0]} ·</span>
                  <span style={{ opacity: 0.85 }}>{it[1]}</span>
                </span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* CLUBS SECTION */}
      <section style={{ padding: '120px 56px 80px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.2em', color: PAL.stone, marginBottom: 14 }}>02 · NOS CLUBS</div>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 96, lineHeight: 0.9, margin: 0, color: PAL.navy, letterSpacing: '-0.01em' }}>
              TROIS DISCIPLINES.<br/>UNE <span style={{ color: PAL.brick }}>COMMUNAUTÉ.</span>
            </h2>
          </div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.14em', color: PAL.stone, textAlign: 'right' }}>
            03 CLUBS<br/>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 56, color: PAL.navy, letterSpacing: '-0.02em' }}>412</span><br/>
            MEMBRES ACTIFS
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {[
            { k: 'football', img: 'assets/football.jpg', name: 'FOOTBALL', tag: 'ESPRIT D\'ÉQUIPE · PASSION & RESPECT', n: '186', accent: PAL.grass, sub: 'JOUEURS' },
            { k: 'hiking', img: 'assets/hiking.jpg', name: 'HIKING', tag: 'NATURE & PARTAGE · DÉCOUVERTE', n: '142', accent: PAL.brick, sub: 'RANDONNEURS' },
            { k: 'cycling', img: 'assets/cycling.jpg', name: 'VÉLO', tag: 'ENDURANCE & DÉPASSEMENT', n: '084', accent: PAL.sun, sub: 'CYCLISTES' },
          ].map((c, i) => (
            <div key={c.k} style={{ background: PAL.navyDeep, color: '#FAF6EC', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
              <div style={{ position: 'relative', height: 380, overflow: 'hidden' }}>
                <img src={c.img} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85)' }} alt="" />
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 40%, ${PAL.navyDeep}ee 100%)` }} />
                <div style={{ position: 'absolute', top: 20, left: 20 }}>
                  <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.2em', background: '#FAF6EC', color: PAL.navy, padding: '4px 8px' }}>0{i+1}</span>
                </div>
                <div style={{ position: 'absolute', top: 20, right: 20 }}>
                  <LogoImg size={40} invert />
                </div>
              </div>
              <div style={{ padding: '28px 24px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
                  <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 56, margin: 0, letterSpacing: '-0.01em', color: c.accent }}>{c.name}</h3>
                  <span style={{ fontFamily: FONT_DISPLAY, fontSize: 32, opacity: 0.8 }}>{c.n}</span>
                </div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.14em', opacity: 0.6, marginBottom: 18 }}>{c.tag} · {c.sub}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid rgba(250,246,236,0.15)', fontFamily: FONT_DISPLAY, fontSize: 13, letterSpacing: '0.14em' }}>
                  <span>DÉCOUVRIR LE CLUB</span>
                  <span>↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TOURNAMENT BANNER */}
      <section style={{ margin: '0 56px 120px', position: 'relative', background: PAL.navyDeep, color: '#FAF6EC', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 400, height: 400, borderRadius: '50%', border: `1px solid ${PAL.sun}33` }} />
        <div style={{ position: 'absolute', top: -40, right: -40, width: 320, height: 320, borderRadius: '50%', border: `1px solid ${PAL.sun}55` }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', alignItems: 'stretch', minHeight: 440 }}>
          <div style={{ padding: '64px 56px' }}>
            <Badge kind="live" />
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 120, lineHeight: 0.88, margin: '20px 0 0', letterSpacing: '-0.015em' }}>
              COUPE<br/>PALLASTRADA<br/><span style={{ color: PAL.sun }}>2026.</span>
            </h2>
            <div style={{ display: 'flex', gap: 40, marginTop: 32, fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.14em', opacity: 0.85 }}>
              <div><div style={{ opacity: 0.5 }}>JOURNÉE</div><div style={{ fontFamily: FONT_DISPLAY, fontSize: 28, marginTop: 4 }}>04 / 08</div></div>
              <div><div style={{ opacity: 0.5 }}>ÉQUIPES</div><div style={{ fontFamily: FONT_DISPLAY, fontSize: 28, marginTop: 4 }}>08</div></div>
              <div><div style={{ opacity: 0.5 }}>MATCHS</div><div style={{ fontFamily: FONT_DISPLAY, fontSize: 28, marginTop: 4 }}>17 / 28</div></div>
            </div>
            <div style={{ marginTop: 32 }}>
              <BtnPrimary dark>SCORES EN DIRECT →</BtnPrimary>
            </div>
          </div>
          {/* Live score embed */}
          <div style={{ background: '#0A111C', padding: '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: '1px solid rgba(250,246,236,0.08)' }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.2em', opacity: 0.5, marginBottom: 16 }}>EN DIRECT · TERRAIN A</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <Badge kind="live" />
              <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: PAL.sun, animation: 'liveBlink 1.6s infinite' }}>67' · 2ᵉ MI-TEMPS</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 14, alignItems: 'center' }}>
              <div style={{ textAlign: 'right' }}>
                <LogoImg size={48} invert />
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 18, marginTop: 8 }}>PALLASTRADA</div>
              </div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 80, lineHeight: 1, color: PAL.sun, padding: '0 8px' }}>2 — 1</div>
              <div>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#FAF6EC22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_DISPLAY, fontSize: 18, color: '#FAF6EC' }}>FA</div>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 18, marginTop: 8 }}>FC ARANJUEZ</div>
              </div>
            </div>
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(250,246,236,0.1)', display: 'flex', justifyContent: 'space-between', fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.14em', opacity: 0.55 }}>
              <span>BUTS · 14' MÜLLER · 41' HUBER · 58' G. RIVA</span>
              <span>↗ MATCH</span>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE / VALUES */}
      <section style={{ padding: '0 56px 120px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 80, alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.2em', color: PAL.stone, marginBottom: 14 }}>03 · BERNE, NOTRE TERRAIN DE JEU</div>
          <p style={{ fontFamily: FONT_DISPLAY, fontSize: 56, lineHeight: 1.05, color: PAL.navy, margin: 0, letterSpacing: '-0.01em' }}>
            « De la ville aux sommets, sur le terrain, les sentiers et les routes — <span style={{ color: PAL.brick }}>vivons le sport ensemble.</span> »
          </p>
          <div style={{ marginTop: 32, fontFamily: FONT_MONO, fontSize: 12, letterSpacing: '0.14em', color: PAL.stone }}>
            — MARTIN HUBER, PRÉSIDENT
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            ['1947', 'FONDATION DE L\'ASSOCIATION'],
            ['412', 'MEMBRES ACTIFS · 2026'],
            ['28', 'COMPÉTITIONS PAR SAISON'],
            ['03', 'CLUBS · UNE FAMILLE'],
          ].map(([n, l]) => (
            <div key={l} style={{ display: 'flex', alignItems: 'baseline', gap: 24, paddingBottom: 14, borderBottom: `1px solid ${PAL.line}` }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 56, color: PAL.navy, minWidth: 120, letterSpacing: '-0.02em' }}>{n}</div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.16em', color: PAL.stone }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function HomeMobile() {
  return (
    <div style={{ width: 390, background: PAL.paper, fontFamily: FONT_SANS, color: PAL.ink, overflow: 'hidden' }}>
      <PulseStyles />
      {/* Top nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: `1px solid ${PAL.line}` }}>
        <Wordmark scale={0.85} />
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.14em', color: PAL.navy, fontWeight: 700, padding: '4px 7px', background: PAL.cream, borderRadius: 3 }}>FR</span>
          <div style={{ width: 28, height: 22, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <span style={{ height: 2, background: PAL.navy }} />
            <span style={{ height: 2, background: PAL.navy }} />
            <span style={{ height: 2, background: PAL.navy }} />
          </div>
        </div>
      </div>

      {/* Hero */}
      <div style={{ position: 'relative', height: 580, overflow: 'hidden' }}>
        <img src="assets/football.jpg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.65)' }} alt="" />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${PAL.navyDeep}66 0%, ${PAL.navyDeep}ee 100%)` }} />
        <div style={{ position: 'relative', height: '100%', padding: '24px 20px', color: '#FAF6EC', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Badge kind="live"><span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><span style={{ width: 5, height: 5, borderRadius: 99, background: '#fff', animation: 'pulse 1.4s infinite' }} />TOURNOI</span></Badge>
            <LogoImg size={44} invert />
          </div>
          <div>
            <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 76, lineHeight: 0.88, margin: 0, letterSpacing: '-0.015em' }}>
              UNIS PAR<br/>LE SPORT,<br/><span style={{ color: PAL.sun }}>ENGAGÉS</span><br/>POUR DEMAIN.
            </h1>
            <p style={{ fontSize: 13, lineHeight: 1.5, opacity: 0.85, marginTop: 16, marginBottom: 20 }}>
              Trois clubs, une famille bernoise. Football, vélo, randonnée.
            </p>
            <BtnPrimary dark>REJOINDRE</BtnPrimary>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div style={{ background: PAL.navy, color: '#FAF6EC', padding: '12px 0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 32, animation: 'ticker 18s linear infinite', whiteSpace: 'nowrap', fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.14em' }}>
          {Array(2).fill(0).map((_,k) => (
            <span key={k} style={{ display: 'inline-flex', gap: 16 }}>
              <span style={{ color: PAL.sun }}>· LIVE</span>
              <span>PALLASTRADA 2 — 1 ARANJUEZ · 67'</span>
              <span style={{ color: PAL.sun }}>· NEXT</span>
              <span>BERN UTD vs LUZERN · DIM 16:00</span>
            </span>
          ))}
        </div>
      </div>

      {/* Clubs */}
      <div style={{ padding: '40px 20px 24px' }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.2em', color: PAL.stone, marginBottom: 10 }}>02 · NOS CLUBS</div>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 44, lineHeight: 0.92, color: PAL.navy, margin: 0, letterSpacing: '-0.01em' }}>
          TROIS DISCIPLINES.<br/>UNE <span style={{ color: PAL.brick }}>COMMUNAUTÉ.</span>
        </h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '0 20px 32px' }}>
        {[
          { img: 'assets/football.jpg', name: 'FOOTBALL', tag: '186 JOUEURS', accent: PAL.grass, idx: '01' },
          { img: 'assets/hiking.jpg', name: 'HIKING', tag: '142 RANDONNEURS', accent: PAL.brick, idx: '02' },
          { img: 'assets/cycling.jpg', name: 'VÉLO', tag: '084 CYCLISTES', accent: PAL.sun, idx: '03' },
        ].map(c => (
          <div key={c.name} style={{ position: 'relative', height: 200, overflow: 'hidden', background: PAL.navyDeep }}>
            <img src={c.img} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }} alt="" />
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, ${PAL.navyDeep}ee 0%, transparent 60%)` }} />
            <div style={{ position: 'relative', padding: 20, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#FAF6EC' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.18em', background: '#FAF6EC', color: PAL.navy, padding: '3px 7px' }}>{c.idx}</span>
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: 13, letterSpacing: '0.14em' }}>↗</span>
              </div>
              <div>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 48, color: c.accent, lineHeight: 0.9, letterSpacing: '-0.01em' }}>{c.name}</div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.18em', opacity: 0.7, marginTop: 6 }}>{c.tag}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tournament banner */}
      <div style={{ margin: '0 20px 40px', background: PAL.navyDeep, color: '#FAF6EC', padding: 24 }}>
        <Badge kind="live" />
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 52, margin: '14px 0 0', lineHeight: 0.88, letterSpacing: '-0.015em' }}>
          COUPE<br/>PALLASTRADA<br/><span style={{ color: PAL.sun }}>2026.</span>
        </h2>
        <div style={{ background: '#0A111C', padding: 16, marginTop: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.14em', marginBottom: 12 }}>
            <span style={{ color: PAL.sun }}>67' · 2ᵉ MT</span>
            <span style={{ opacity: 0.5 }}>TERRAIN A</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 8 }}>
            <div style={{ textAlign: 'right', fontFamily: FONT_DISPLAY, fontSize: 13 }}>PALLASTRADA</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 44, color: PAL.sun, lineHeight: 1 }}>2—1</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 13 }}>FC ARANJUEZ</div>
          </div>
        </div>
        <div style={{ marginTop: 20 }}><BtnPrimary dark>SCORES LIVE →</BtnPrimary></div>
      </div>

      {/* footer */}
      <div style={{ background: PAL.navy, color: '#FAF6EC', padding: 24, fontFamily: FONT_SANS }}>
        <Wordmark color="#FAF6EC" scale={0.9} />
        <p style={{ fontSize: 12, opacity: 0.65, marginTop: 14, lineHeight: 1.5 }}>Association sportive bernoise depuis 1947.</p>
        <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid rgba(250,246,236,0.15)', fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.14em', opacity: 0.55 }}>© 2026 KSV PALLASTRADA · BERNE</div>
      </div>
    </div>
  );
}

Object.assign(window, { HomeDesktop, HomeMobile });
