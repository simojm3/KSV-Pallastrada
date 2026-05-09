# Handoff — KSV Pallastrada Website

## Overview
This bundle contains the visual design for **KSV Pallastrada**, a sport association based in Berne (Switzerland) covering three clubs: **Football, Cycling (Vélo), Hiking**. It includes 4 page designs (Home, Football, Tournament/Live scores, Contact), each in **desktop (1440)** and **mobile (390)** versions, plus a complete design system overview.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing the intended look and behavior. They are **not** production code to copy verbatim. Your task is to **recreate these designs in the target stack (Next.js 14 + Tailwind CSS)** using the project's established patterns, components, and conventions.

The HTML prototypes use inline-styled React components purely for fast visual iteration. In the real codebase you should:
- Translate styles to Tailwind utility classes
- Split each section into proper Next.js components/pages
- Wire i18n for FR / EN / DE / IT (placeholder copy is in French, the dominant language)
- Replace placeholder photos and stripe-pattern image slots with real assets

## Fidelity
**High-fidelity.** The designs include final colors, typography, spacing, component structure, and interaction badges. Reproduce pixel-faithfully.

## Tech target
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **i18n**: 4 languages (FR · EN · DE · IT) — French is dominant in mocks
- **Routes**: `/`, `/football`, `/velo`, `/hiking`, `/tournoi`, `/contact`

---

## Design Tokens

### Colors
| Token | Hex | Role |
|---|---|---|
| `navy` | `#0E2A4A` | Primary brand (logo color) — headlines, dark surfaces, primary buttons |
| `navy-deep` | `#081A2E` | Tournament dashboard background, footer-deep variant |
| `cream` | `#F4EFE2` | Page background (light) |
| `paper` | `#FAF6EC` | Surface / card background on light pages, light text on dark |
| `ink` | `#1A1D24` | Body text |
| `stone` | `#6B6655` | Muted body text |
| `stone-light` | `#A39E8B` | Disabled / placeholder |
| `line` | `#E2DCC9` | Hairlines, dividers, input borders |
| `sun` | `#E8A04A` | Accent — CTAs, score highlights, sunset reference |
| `grass` | `#4A6B2E` | Football club accent (grass-green) |
| `brick` | `#C2562A` | Vélo accent (warm earth) |
| `sky` | `#7FA8C9` | Hiking accent (alpine sky) |
| `live` | `#E1322B` | LIVE badge red — broadcast signal |

Tailwind config (suggested):
```js
colors: {
  navy: { DEFAULT: '#0E2A4A', deep: '#081A2E' },
  cream: '#F4EFE2', paper: '#FAF6EC',
  ink: '#1A1D24', stone: { DEFAULT: '#6B6655', light: '#A39E8B' },
  line: '#E2DCC9',
  sun: '#E8A04A', grass: '#4A6B2E', brick: '#C2562A', sky: '#7FA8C9',
  live: '#E1322B',
}
```

### Typography
- **Display**: `Anton` (Google Fonts), regular 400. Use for headlines, scores, big numbers, button labels (uppercase + 0.16em tracking). Range 24–200px.
- **Body**: `Inter` (Google Fonts), 400 / 500 / 600 / 700. Use for paragraphs, nav labels, form fields. Range 13–20px.
- **Mono**: `JetBrains Mono` (Google Fonts), 400 / 700. Use for data, timestamps, eyebrow labels (`02 — FOOTBALL`), tabular numbers, metadata. Range 9–14px with 0.14–0.22em letter-spacing.

### Spacing & layout
- Desktop content padding: `56px` horizontal
- Mobile content padding: `20px` horizontal
- Section vertical rhythm: `80px` (desktop), `32px` (mobile)
- Card padding: `22–28px`
- Hairline width: `1px solid line`
- **No rounded corners** on most surfaces — sharp edges are part of the editorial language. Pills and badges use `borderRadius: 3–99px`.

### Iconography
The HTML mocks intentionally do **not** ship custom illustrative SVGs (only the navy circle logo). Use a single icon set in production (Lucide or Heroicons recommended) at consistent stroke weight. The logo PNG at `assets/logo.png` is the only branded mark — preserve its colors and proportions; never recolor it except via a white "knockout" inversion on dark backgrounds.

---

## Screens

### 1. Homepage (`/`)
**Purpose**: Welcome, club identity, surface the 3 sports + tournament CTA.

**Layout (desktop)**:
1. **Nav** — logo left · menu center (Accueil / Football / Vélo / Hiking / Tournoi · LIVE / Contact) · language switcher right (FR active)
2. **Hero** — full-bleed photo (`assets/football.jpg`) with cream overlay split, large Anton headline "UNIS PAR LE SPORT, ENGAGÉS POUR DEMAIN.", subline, primary CTA + outline CTA. Numbered eyebrow "00 — KSV PALLASTRADA · BERNE".
3. **Live tournament banner** — full-width navy bar with pulsing LIVE dot, current match score, "VOIR EN DIRECT →".
4. **3 clubs section** — grid of 3 large cards (Football / Vélo / Hiking) with the matching photo, accent color stripe, eyebrow, name, one-line motto, "DÉCOUVRIR →".
5. **About / values strip** — two-column with portrait of Berne skyline placeholder + body copy.
6. **Stories / news** — 3-up card row, mono date eyebrow + Anton headline.
7. **Footer** — navy, 4 columns + brand line.

**Mobile**: Single column, hero crops to 70vh, clubs become full-width stacked cards.

### 2. Football page (`/football`)
**Purpose**: Deep dive on the football club.

Sections (top → bottom): Nav · Hero with grass-tinted photo + "FOOTBALL" eyebrow · Stats strip (`140 joueurs / 6 équipes / 1947 fondation / 23 titres`) · Next match card (large score-card preview with navy bg + sun accent) · Teams grid (U9 → Senior, 6 cards) · Calendar table (next 5 fixtures with Badge UPCOMING/LIVE/FINISHED) · History block · CTA "Rejoindre" · Footer.

### 3. Tournament — Live (`/tournoi`)
**Purpose**: Live broadcast-style dashboard. **Dark background** (`navy-deep`).

Sections: Dark nav (white text) · Live header with animated pulse dot, current featured match scoreboard at huge size · 2 group tables (Group A / Group B) styled like a sports broadcast: monospace columns, leader row highlighted with sun · Match list (live + upcoming + finished, with badges) · Knockout bracket (single-elimination, 4 → 2 → final) drawn with connecting lines · Ticker bar scrolling at the bottom.

**Animations**:
- LIVE dot: 1.4s pulse (opacity + scale)
- Featured score blink on goal (subtle 0.3s)
- Ticker: linear scroll, 40s loop

### 4. Contact (`/contact`)
**Purpose**: Form + addresses + per-club leads.

Sections: Nav · Hero "Écrivez-nous, passez nous voir." · Form card (subject pills, name/email/phone/club fields, message textarea, consent checkbox, submit button) + side info (navy address card, hours table, map placeholder with sun pin) · Per-section contacts (3 cards: Football / Vélo / Hiking, each with section accent border-top) · FAQ with expandable rows · Footer.

---

## Components to build

| Component | Notes |
|---|---|
| `<Nav>` | Logo + menu + language switcher. Variants: `light` (cream pages), `dark` (tournament). LIVE menu item has pulsing red dot. |
| `<LangSwitcher>` | FR / EN / DE / IT mono pills, current = navy bg + cream fg, others = transparent + muted. |
| `<Wordmark>` | Logo image + KSV / PALLASTRADA stacked Anton lockup. |
| `<Badge kind>` | `live` (red bg, white pulsing dot), `upcoming` (navy bg, cream fg), `finished` (transparent + stone border), `soon` (sun bg). Mono 11px, tracked. |
| `<ScoreCard>` | Two-row card, team name (Anton 17) + score (Anton 36, sun for leader). Variants: live (navy bg) / upcoming (cream + line) / finished (paper + stone). |
| `<StandingsTable>` | Grid `20px / 1fr / repeat(7, 30px)` — Pos, Club, MP, W, D, L, GF, GA, Pts. Leader row tinted `sun/8`. |
| `<Bracket>` | Single-elim, 4-2-1 columns. Match cell = mini score card. Connector lines via SVG paths or pseudo-elements. |
| `<Button>` | Primary (navy/cream), accent (sun/ink), outline (transparent + navy border), club variants (grass / brick / sky). All Anton 13px, uppercase, 0.16em tracking, square corners, optional `→` suffix. |
| `<EyebrowLabel>` | `JetBrains Mono` 11px, 0.22em tracking. Pattern: `01 — SECTION TITLE`. |
| `<Field>` | Form input — paper bg, line border, 14px Inter, label above in mono eyebrow, optional badge in upper-right. |
| `<ImagePlaceholder>` | Striped 135° pattern with mono caption box — only for dev; replace with real assets. |
| `<Footer>` | 5-col grid (brand / clubs / tournoi / association / contact) on navy. |

---

## Interactions
- **Nav menu**: active item gets 2px navy underline 22px below baseline.
- **LIVE pulse**: keyframe `pulse` (1.4s, ease-in-out, infinite) — opacity 1→0.4→1, scale 1→0.85→1.
- **Score blink** (on goal): 0.3s ease, sun glow flash on the changed digit.
- **Ticker**: `@keyframes ticker { to { transform: translateX(-50%) } }`, 40s linear infinite, content duplicated for seamless loop.
- **Card hover** (clubs, stories): lift 2px, accent stripe widens from 4 → 6px (200ms ease).
- **Form**: client-side validation, errors below field in `live` red 12px mono, submit button disables until consent checked.
- **Bracket**: hover a match → highlight the path (winning lineage) with sun stroke.

## State requirements (Tournament page)
- Live polling of match scores (e.g., every 15s) — design assumes Server-Sent Events or SWR refresh.
- `matchStatus`: `live` | `upcoming` | `finished` drives badge + card variant.
- `activeGoal` transient flag for the score-blink animation (clear after 800ms).

## i18n
All visible strings are FR. Keys should be grouped per page:
```
common.nav.home / football / cycling / hiking / tournament / contact
home.hero.title / hero.lede / banner.cta
tournament.live.label / status.live / status.upcoming / status.finished
…
```
DE: "Vereint durch den Sport." · EN: "United by sport." · IT: "Uniti dallo sport." (suggested hero translations.)

---

## Files in this bundle

- `index.html` — Pan/zoom design canvas; open this to see all screens.
- `assets/logo.png` — KSV Pallastrada logo, primary mark. Do not modify.
- `assets/football.jpg`, `hiking.jpg`, `cycling.jpg`, `moodboard.png` — reference photos, palette source.
- `shared.jsx` — Nav, Wordmark, Badge, Footer, color/font constants — read for exact spacing/weights.
- `system.jsx` — Component library showcase + palette swatches with hex.
- `screen-home.jsx`, `screen-football.jsx`, `screen-tournament.jsx`, `screen-contact.jsx` — per-page reference layouts (desktop + mobile in each).
- `design-canvas.jsx` — viewer scaffold; ignore in production.

Open `index.html` in a browser to navigate the canvas. Use it as the source of truth for layout, color and copy decisions.
