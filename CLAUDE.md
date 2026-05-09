# CLAUDE.md — Sport Club Website

## Vue d'ensemble du projet

Site web pour une association sportive regroupant 3 clubs (Football, Vélo, Hiking).
Inclut un espace tournoi de football avec suivi live des scores, géré par un admin.

---

## Stack technique

| Outil | Usage |
|---|---|
| Next.js 14 (App Router) | Framework principal |
| TypeScript | Typage strict partout |
| Tailwind CSS | Styles |
| Prisma | ORM |
| PostgreSQL (Railway) | Base de données |
| next-intl | Internationalisation (FR, EN, DE, IT) |
| NextAuth.js v5 | Authentification admin (credentials) |
| SWR | Data fetching + polling live scores |
| Zod | Validation des données |
| Resend | Envoi d'emails (formulaire contact) |

---

## Architecture des dossiers

```
src/
├── app/
│   └── [locale]/
│       ├── layout.tsx
│       ├── page.tsx                    # Accueil
│       ├── clubs/
│       │   ├── football/page.tsx
│       │   ├── velo/page.tsx
│       │   └── hiking/page.tsx
│       ├── contact/page.tsx
│       ├── tournoi/
│       │   ├── page.tsx                # Vue publique live scores
│       │   └── admin/
│       │       ├── login/page.tsx
│       │       ├── page.tsx            # Dashboard admin
│       │       ├── groupes/page.tsx    # Gestion des groupes
│       │       └── matchs/page.tsx     # Gestion des matchs
│       └── api/
│           ├── auth/[...nextauth]/route.ts
│           ├── contact/route.ts
│           ├── tournoi/
│           │   ├── equipes/route.ts
│           │   ├── groupes/route.ts
│           │   ├── matchs/route.ts
│           │   └── scores/route.ts
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── LanguageSwitcher.tsx
│   ├── tournoi/
│   │   ├── LiveScoreBoard.tsx
│   │   ├── GroupTable.tsx
│   │   ├── MatchCard.tsx
│   │   ├── Bracket.tsx
│   │   └── admin/
│   │       ├── AdminMatchForm.tsx
│   │       ├── AdminGroupManager.tsx
│   │       └── AdminScoreUpdater.tsx
│   └── ui/                             # Composants réutilisables
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   └── validations.ts
├── i18n/
│   ├── routing.ts
│   └── request.ts
└── messages/
    ├── fr.json
    ├── en.json
    ├── de.json
    └── it.json
```

---

## Internationalisation

- Librairie : `next-intl` avec App Router
- Locales supportées : `fr`, `en`, `de`, `it`
- Locale par défaut : `fr`
- Routing : `/fr/...`, `/en/...`, `/de/...`, `/it/...`
- Sélecteur de langue dans le Header (codes texte : FR / EN / DE / IT)
- Les clés de traduction sont dans `src/messages/*.json`
- **Ne jamais hardcoder du texte visible** dans les composants — toujours utiliser `useTranslations()`

---

## Authentification admin

- NextAuth.js v5 avec provider `Credentials`
- Un seul compte admin (email + mot de passe en variable d'environnement)
- Les routes `/[locale]/tournoi/admin/*` sont protégées par middleware
- Redirection vers `/[locale]/tournoi/admin/login` si non authentifié
- Session JWT, pas de base de données pour les sessions

---

## Tournoi de Football — 7 juin 2026

### Format
- 2 groupes de 4 équipes (Groupe A et Groupe B)
- Phase de groupes : chaque équipe joue contre les 3 autres de son groupe
- Phase finale : les 2 premiers de chaque groupe → demi-finales + finale (+ match 3e place)

### Vue publique (`/tournoi`)
- Rafraîchissement automatique toutes les **15 secondes** via SWR polling
- Affichage des groupes avec classement (pts, J, G, N, P, +/-)
- Liste des matchs avec horaires et scores
- Bracket de la phase finale
- Indicateur visuel "LIVE" quand un match est en cours

### Interface admin (`/tournoi/admin`)
- Protégée par authentification
- Gestion des équipes : créer/modifier les 8 équipes
- Gestion des groupes : assigner les équipes aux groupes
- Gestion des matchs : créer un match (équipe A vs équipe B, heure, terrain)
- Mise à jour des scores : changer le score en temps réel, marquer un match comme "EN COURS" / "TERMINÉ" / "À VENIR"

---

## Modèle de données Prisma

```prisma
model Equipe {
  id        String   @id @default(cuid())
  nom       String
  logo      String?
  groupeId  String?
  groupe    Groupe?  @relation(fields: [groupeId], references: [id])
  matchsDomicile Match[] @relation("Domicile")
  matchsExterieur Match[] @relation("Exterieur")
  createdAt DateTime @default(now())
}

model Groupe {
  id      String   @id @default(cuid())
  nom     String   // "Groupe A" ou "Groupe B"
  equipes Equipe[]
}

model Match {
  id            String      @id @default(cuid())
  equipeDomicile   Equipe   @relation("Domicile", fields: [equipeDomicileId], references: [id])
  equipeDomicileId String
  equipeExterieur  Equipe   @relation("Exterieur", fields: [equipeExterieId], references: [id])
  equipeExterieId  String
  scoreDomicile Int?
  scoreExterieur Int?
  statut        MatchStatut @default(A_VENIR)
  phase         MatchPhase  @default(GROUPES)
  heure         DateTime?
  terrain       String?
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
}

enum MatchStatut {
  A_VENIR
  EN_COURS
  TERMINE
}

enum MatchPhase {
  GROUPES
  DEMI_FINALE
  TROISIEME_PLACE
  FINALE
}
```

---

## Variables d'environnement

Créer un fichier `.env.local` à la racine :

```env
# Base de données
DATABASE_URL="postgresql://..."

# Auth admin
NEXTAUTH_SECRET="your-secret-here"
ADMIN_EMAIL="admin@association.ch"
ADMIN_PASSWORD="your-secure-password"
NEXTAUTH_URL="http://localhost:3000"

# Email (Resend)
RESEND_API_KEY="re_..."
CONTACT_EMAIL="contact@association.ch"
```

---

## Design & UI

- Palette principale : vert foncé (`#1a4731`) + blanc + accents orange (`#f97316`)
- Font : Titre → `Bebas Neue` / Corps → `Inter`
- Responsive : mobile-first
- Header fixe avec navigation + sélecteur de langue
- Chaque page club a sa propre couleur d'accent :
  - Football : vert + blanc (couleurs terrain)
  - Vélo : bleu électrique
  - Hiking : terre / ocre
- Page tournoi : fond sombre, scores bien lisibles, badge LIVE animé rouge

---

## Règles de développement

1. **TypeScript strict** — pas de `any`, interfaces pour tous les types de données
2. **Composants Server par défaut** — `'use client'` uniquement si nécessaire (interactivité, hooks)
3. **Traductions** — toujours via `useTranslations()`, jamais de texte hardcodé
4. **API Routes** — valider les inputs avec Zod avant tout traitement
5. **Admin** — vérifier la session côté serveur dans chaque route admin
6. **Polling** — utiliser SWR avec `refreshInterval: 15000` sur la page tournoi publique
7. **Erreurs** — toujours gérer les états loading / error / empty dans les composants

---

## Ordre de développement recommandé

1. Setup Next.js + Tailwind + TypeScript + next-intl (routing multilingue)
2. Layout global (Header, Footer, LanguageSwitcher)
3. Fichiers de traduction JSON (toutes les clés, toutes les langues)
4. Pages statiques (Accueil, 3 clubs, Contact)
5. Formulaire contact + API route Resend
6. Schéma Prisma + migrations
7. Auth admin (NextAuth)
8. Interface admin tournoi (CRUD équipes, groupes, matchs)
9. Vue publique tournoi (live scores, classements, bracket)
10. Tests, responsive, polish
