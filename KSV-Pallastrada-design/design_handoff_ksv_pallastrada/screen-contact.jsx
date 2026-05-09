// Contact page — desktop + mobile

function ContactDesktop() {
  return (
    <div style={{ width: 1440, fontFamily: FONT_SANS, background: PAL.cream, color: PAL.ink, minHeight: 1400 }}>
      <PulseStyles />
      <Nav active="contact" />

      {/* Hero */}
      <section style={{ padding: '64px 56px 40px', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.22em', color: PAL.navy, marginBottom: 14 }}>06 — CONTACT</div>
            <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 168, lineHeight: 0.86, margin: 0, letterSpacing: '-0.018em', color: PAL.navy }}>
              Écrivez-nous,<br />passez nous voir.
            </h1>
          </div>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: PAL.stone, maxWidth: 460, margin: '0 0 20px auto' }}>
            Une question sur les inscriptions ? Envie de rejoindre une équipe, devenir bénévole, sponsoriser le tournoi ?
            Le bureau du club est ouvert du mardi au samedi. Nous répondons sous 48 heures.
          </p>
        </div>
      </section>

      {/* Form + side info */}
      <section style={{ padding: '40px 56px 80px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48 }}>
        {/* FORM */}
        <div style={{ background: '#fff', border: `1px solid ${PAL.line}`, padding: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 36, margin: 0, color: PAL.navy }}>Formulaire</h2>
            <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.16em', color: PAL.stone }}>RÉPONSE SOUS 48H</span>
          </div>

          {/* Subject pills */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.16em', color: PAL.stone, marginBottom: 12 }}>SUJET</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {[
                ['Inscription', true],
                ['Bénévolat', false],
                ['Sponsor', false],
                ['Tournoi', false],
                ['Presse', false],
                ['Autre', false],
              ].map(([label, active]) => (
                <span key={label} style={{
                  padding: '10px 16px', fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.14em',
                  background: active ? PAL.navy : 'transparent',
                  color: active ? '#FAF6EC' : PAL.navy,
                  border: `1px solid ${active ? PAL.navy : PAL.line}`,
                }}>{label.toUpperCase()}</span>
              ))}
            </div>
          </div>

          {/* fields */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <Field label="Prénom" placeholder="Jean" />
            <Field label="Nom" placeholder="Müller" />
            <Field label="Email" placeholder="jean.muller@example.ch" />
            <Field label="Téléphone" placeholder="+41 79 123 45 67" optional />
          </div>

          <div style={{ marginTop: 20 }}>
            <Field label="Club concerné" placeholder="" select options={['Football','Vélo','Hiking','Tous les clubs','Pas applicable']} />
          </div>

          <div style={{ marginTop: 20 }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.16em', color: PAL.stone, marginBottom: 8 }}>MESSAGE</div>
            <div style={{
              border: `1px solid ${PAL.line}`, padding: '16px 18px', background: PAL.paper,
              minHeight: 140, fontFamily: FONT_SANS, fontSize: 15, color: PAL.stoneL,
            }}>
              Bonjour, je souhaite m'inscrire à la section football pour mon fils de 12 ans...
            </div>
          </div>

          <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: PAL.stone }}>
              <span style={{ width: 18, height: 18, border: `1.5px solid ${PAL.navy}`, background: PAL.navy, position: 'relative' }}>
                <span style={{ position: 'absolute', top: 2, left: 5, width: 5, height: 9, borderRight: '2px solid #FAF6EC', borderBottom: '2px solid #FAF6EC', transform: 'rotate(45deg)' }} />
              </span>
              J'accepte la <span style={{ textDecoration: 'underline', color: PAL.navy }}>politique de confidentialité</span>.
            </label>
            <button style={{
              padding: '16px 28px', background: PAL.navy, color: '#FAF6EC', border: 'none',
              fontFamily: FONT_DISPLAY, fontSize: 13, letterSpacing: '0.16em',
            }}>ENVOYER LE MESSAGE →</button>
          </div>
        </div>

        {/* SIDE INFO */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* address card */}
          <div style={{ background: PAL.navy, color: '#FAF6EC', padding: 28 }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.18em', opacity: 0.6, marginBottom: 14 }}>BUREAU DU CLUB</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 28, lineHeight: 1.2, marginBottom: 18 }}>
              KSV Pallastrada<br />Stade du Neufeld
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.7, opacity: 0.85 }}>
              Studerstrasse 19<br />
              3012 Bern · Schweiz
            </div>
            <div style={{ marginTop: 22, paddingTop: 18, borderTop: '1px solid rgba(250,246,236,0.15)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, fontSize: 13 }}>
              <div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.16em', opacity: 0.55 }}>EMAIL</div>
                <div style={{ marginTop: 4 }}>info@pallastrada.ch</div>
              </div>
              <div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.16em', opacity: 0.55 }}>TÉLÉPHONE</div>
                <div style={{ marginTop: 4 }}>+41 31 302 47 19</div>
              </div>
            </div>
          </div>

          {/* hours */}
          <div style={{ background: '#fff', border: `1px solid ${PAL.line}`, padding: 24 }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.18em', color: PAL.stone, marginBottom: 14 }}>HORAIRES BUREAU</div>
            {[
              ['Mardi — Vendredi', '16:00 — 19:00'],
              ['Samedi', '09:00 — 12:00'],
              ['Dim — Lundi', 'Fermé', true],
            ].map(([d, h, off]) => (
              <div key={d} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${PAL.line}`, fontSize: 14, opacity: off ? 0.45 : 1 }}>
                <span style={{ color: PAL.ink }}>{d}</span>
                <span style={{ fontFamily: FONT_MONO, color: PAL.navy }}>{h}</span>
              </div>
            ))}
          </div>

          {/* map placeholder */}
          <div style={{ height: 220, background: PAL.navy, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.18,
              backgroundImage: `linear-gradient(rgba(250,246,236,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(250,246,236,0.4) 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }} />
            <div style={{ position: 'absolute', top: 12, left: 16, fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.18em', color: '#FAF6EC', opacity: 0.7 }}>
              CARTE — STUDERSTR. 19
            </div>
            {/* river */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <path d="M0,140 Q100,80 220,120 T440,90" fill="none" stroke="#7FA8C9" strokeWidth="14" opacity="0.5" />
            </svg>
            {/* pin */}
            <div style={{ position: 'absolute', top: '52%', left: '54%', transform: 'translate(-50%, -100%)' }}>
              <div style={{ width: 36, height: 36, borderRadius: 99, background: PAL.sun, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_DISPLAY, fontSize: 14, color: PAL.navy, boxShadow: `0 0 0 6px ${PAL.sun}33` }}>★</div>
              <div style={{ width: 2, height: 14, background: PAL.sun, margin: '0 auto' }} />
            </div>
            <div style={{ position: 'absolute', bottom: 12, left: 16, right: 16, display: 'flex', justifyContent: 'space-between', fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.16em', color: '#FAF6EC' }}>
              <span style={{ opacity: 0.6 }}>BERN · LÄNGGASSE</span>
              <span>OUVRIR ITINÉRAIRE →</span>
            </div>
          </div>
        </aside>
      </section>

      {/* Three contacts strip */}
      <section style={{ background: PAL.navy, color: '#FAF6EC', padding: '60px 56px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 28 }}>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 48, margin: 0, lineHeight: 0.95 }}>Contact direct par section.</h2>
          <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.18em', opacity: 0.55 }}>3 SECTIONS · 3 RESPONSABLES</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { c: 'FOOTBALL', n: 'Markus Steiner', r: 'Président · Football', mail: 'football@pallastrada.ch', tel: '+41 79 412 88 33', accent: PAL.grass },
            { c: 'VÉLO', n: 'Léa Brunner', r: 'Coordinatrice · Vélo', mail: 'velo@pallastrada.ch', tel: '+41 78 226 91 04', accent: PAL.sun },
            { c: 'HIKING', n: 'Tobias Ammann', r: 'Responsable · Randonnées', mail: 'hiking@pallastrada.ch', tel: '+41 76 318 27 55', accent: PAL.sky },
          ].map(p => (
            <div key={p.c} style={{ background: 'rgba(250,246,236,0.04)', border: '1px solid rgba(250,246,236,0.1)', padding: 28, borderTop: `3px solid ${p.accent}` }}>
              <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.18em', color: p.accent, marginBottom: 18 }}>{p.c}</div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 28, marginBottom: 6 }}>{p.n}</div>
              <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 22 }}>{p.r}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 18, borderTop: '1px solid rgba(250,246,236,0.1)', fontSize: 14 }}>
                <span>{p.mail}</span>
                <span style={{ fontFamily: FONT_MONO, fontSize: 13, opacity: 0.7 }}>{p.tel}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '80px 56px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 56 }}>
          <div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.22em', color: PAL.navy, marginBottom: 16 }}>FAQ</div>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 56, margin: 0, lineHeight: 0.92, color: PAL.navy }}>
              Réponses<br />rapides.
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: PAL.stone, marginTop: 18 }}>
              Une question revient souvent ? Elle est probablement ici. Sinon, le formulaire reste à votre disposition.
            </p>
          </div>
          <div>
            {[
              ['Comment inscrire mon enfant au foot ?', true],
              ['Quels sont les frais d\'adhésion par section ?', false],
              ['Puis-je essayer une séance avant de m\'inscrire ?', false],
              ['Comment devenir bénévole ou coach ?', false],
              ['Le club organise-t-il des sorties intersections ?', false],
            ].map(([q, open], i) => (
              <div key={i} style={{ borderBottom: `1px solid ${PAL.line}`, padding: '22px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: PAL.navy }}>{q}</span>
                  <span style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: PAL.navy, transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
                </div>
                {open && (
                  <p style={{ marginTop: 14, fontSize: 15, lineHeight: 1.65, color: PAL.stone }}>
                    L'inscription se fait en ligne via le formulaire ci-dessus, avec sélection de "Football" comme sujet.
                    Une réponse vous parvient sous 48h, suivie d'une séance d'essai gratuite avec le coach de la catégorie d'âge concernée.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Field({ label, placeholder, optional, select, options }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.16em', color: PAL.stone }}>{label.toUpperCase()}</span>
        {optional && <span style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.14em', color: PAL.stoneL }}>OPTIONNEL</span>}
      </div>
      <div style={{
        border: `1px solid ${PAL.line}`, padding: '14px 18px', background: PAL.paper,
        fontFamily: FONT_SANS, fontSize: 15, color: PAL.stoneL, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span>{placeholder || (select ? 'Sélectionnez...' : '')}</span>
        {select && <span style={{ color: PAL.navy }}>▾</span>}
      </div>
    </div>
  );
}

function ContactMobile() {
  return (
    <div style={{ width: 390, fontFamily: FONT_SANS, background: PAL.cream, color: PAL.ink, overflow: 'hidden' }}>
      <PulseStyles />
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', background: PAL.cream, borderBottom: `1px solid ${PAL.line}` }}>
        <Wordmark color={PAL.navy} scale={0.8} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: 11, fontWeight: 700, padding: '4px 7px', background: PAL.navy, color: '#FAF6EC' }}>FR</span>
          <div style={{ width: 22, height: 14, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <span style={{ height: 2, background: PAL.navy }} /><span style={{ height: 2, background: PAL.navy }} />
          </div>
        </div>
      </header>

      <section style={{ padding: '32px 20px 16px' }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.22em', color: PAL.navy }}>06 — CONTACT</div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 60, lineHeight: 0.86, margin: '12px 0 0', letterSpacing: '-0.018em', color: PAL.navy }}>
          Écrivez-nous.
        </h1>
        <p style={{ fontSize: 15, lineHeight: 1.55, color: PAL.stone, marginTop: 14 }}>
          Inscriptions, bénévolat, sponsoring — réponse sous 48h.
        </p>
      </section>

      {/* address */}
      <section style={{ padding: '0 20px 20px' }}>
        <div style={{ background: PAL.navy, color: '#FAF6EC', padding: 22 }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.16em', opacity: 0.55, marginBottom: 8 }}>BUREAU DU CLUB</div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 22, lineHeight: 1.2 }}>Stade du Neufeld<br />Studerstr. 19, Bern</div>
          <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(250,246,236,0.15)', fontSize: 13, opacity: 0.85, lineHeight: 1.6 }}>
            info@pallastrada.ch<br />
            <span style={{ fontFamily: FONT_MONO }}>+41 31 302 47 19</span>
          </div>
        </div>
      </section>

      {/* form compact */}
      <section style={{ padding: '0 20px 20px' }}>
        <div style={{ background: '#fff', border: `1px solid ${PAL.line}`, padding: 22 }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 26, marginBottom: 16, color: PAL.navy }}>Formulaire</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
            {['Inscription','Bénévolat','Sponsor','Tournoi','Autre'].map((s, i) => (
              <span key={s} style={{
                padding: '7px 11px', fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.14em',
                background: i === 0 ? PAL.navy : 'transparent', color: i === 0 ? '#FAF6EC' : PAL.navy,
                border: `1px solid ${i === 0 ? PAL.navy : PAL.line}`,
              }}>{s.toUpperCase()}</span>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Field label="Prénom & Nom" placeholder="Jean Müller" />
            <Field label="Email" placeholder="jean@example.ch" />
            <Field label="Club" placeholder="" select options={['Football','Vélo','Hiking']} />
            <div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.16em', color: PAL.stone, marginBottom: 8 }}>MESSAGE</div>
              <div style={{ border: `1px solid ${PAL.line}`, padding: '14px 16px', background: PAL.paper, minHeight: 100, fontSize: 14, color: PAL.stoneL }}>
                Bonjour, je souhaite m'inscrire...
              </div>
            </div>
          </div>
          <button style={{ marginTop: 20, width: '100%', padding: 14, background: PAL.navy, color: '#FAF6EC', border: 'none', fontFamily: FONT_DISPLAY, fontSize: 12, letterSpacing: '0.16em' }}>
            ENVOYER →
          </button>
        </div>
      </section>

      {/* per-section */}
      <section style={{ padding: '0 20px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { c: 'FOOTBALL', n: 'Markus Steiner', mail: 'football@pallastrada.ch', accent: PAL.grass },
          { c: 'VÉLO', n: 'Léa Brunner', mail: 'velo@pallastrada.ch', accent: PAL.sun },
          { c: 'HIKING', n: 'Tobias Ammann', mail: 'hiking@pallastrada.ch', accent: PAL.sky },
        ].map(p => (
          <div key={p.c} style={{ background: '#fff', border: `1px solid ${PAL.line}`, borderLeft: `3px solid ${p.accent}`, padding: 18 }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.18em', color: p.accent }}>{p.c}</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 20, marginTop: 6, color: PAL.navy }}>{p.n}</div>
            <div style={{ fontSize: 13, color: PAL.stone, marginTop: 6 }}>{p.mail}</div>
          </div>
        ))}
      </section>

      <div style={{ background: PAL.navy, color: '#FAF6EC', padding: '24px 20px', fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.14em', opacity: 0.6 }}>
        © 2026 KSV PALLASTRADA · BERNE
      </div>
    </div>
  );
}

Object.assign(window, { ContactDesktop, ContactMobile, Field });
