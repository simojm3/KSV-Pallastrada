# Prompt de démarrage — Session 1 Claude Code

Colle ce prompt dans Claude Code pour initialiser le projet depuis zéro.

---

## PROMPT À COPIER

```
Je veux créer un site web pour une association sportive. Voici les fichiers de référence du projet :
- CLAUDE.md (architecture complète)
- messages/*.json (traductions FR/EN/DE/IT déjà complètes)
- prisma/schema.prisma (modèle de données)
- prisma/seed.ts (données de test)
- .env.example (variables d'environnement nécessaires)
- package.json (dépendances)

Commence par l'étape 1 : initialiser le projet Next.js 14 avec App Router, TypeScript, Tailwind CSS, et configurer next-intl pour le routing multilingue (fr, en, de, it — défaut : fr).

Crée exactement cette structure de dossiers :
src/app/[locale]/ avec layout.tsx et page.tsx
src/i18n/routing.ts et request.ts
src/messages/ (copie les fichiers JSON fournis)
middleware.ts (pour next-intl)
next.config.ts (avec next-intl plugin)

Respecte scrupuleusement les conventions de CLAUDE.md.
N'installe pas encore Prisma ni NextAuth — on s'en occupera après.

Une fois le routing multilingue fonctionnel, crée le layout global avec :
- Header fixe : logo + navigation (Accueil, Football, Vélo, Randonnée, Tournoi, Contact) + sélecteur de langue (FR/EN/DE/IT)
- Footer : nom de l'association, liens rapides, copyright
- Design : palette vert foncé #1a4731 + blanc + orange #f97316, font Bebas Neue pour les titres, Inter pour le corps

Tous les textes via useTranslations(), zéro texte hardcodé.
```

---

## PROMPT SESSION 2 — Pages statiques

```
Le routing multilingue et le layout sont en place.

Crée maintenant les pages statiques :

1. Page d'accueil (/[locale]) :
   - Section hero avec titre, sous-titre, CTA
   - Section "Nos clubs" avec 3 cards (Football, Vélo, Randonnée) linkées vers leurs pages
   - Bannière tournoi (date 7 juin 2026, CTA vers /tournoi)
   - Section "Rejoignez-nous" avec CTA vers /contact

2. Page Football (/[locale]/clubs/football) :
   - Hero avec couleurs vert/blanc
   - Description du club, horaires d'entraînement, responsable

3. Page Vélo (/[locale]/clubs/velo) :
   - Hero avec accent bleu électrique
   - Description, horaires des sorties

4. Page Randonnée (/[locale]/clubs/hiking) :
   - Hero avec accent ocre/terre
   - Description, programme mensuel

5. Page Contact (/[locale]/contact) :
   - Formulaire : nom, email, sujet, message + bouton envoi
   - Gestion état loading/success/error
   - API route /api/contact qui envoie l'email via Resend (utilise les variables RESEND_API_KEY et CONTACT_RECIPIENT_EMAIL)

Tous les textes via useTranslations(), design cohérent avec le layout global.
```

---

## PROMPT SESSION 3 — Base de données et Auth

```
Les pages statiques sont finies.

Maintenant configure Prisma + NextAuth :

1. Installe et configure Prisma avec le schema fourni dans prisma/schema.prisma
2. Configure NextAuth v5 avec provider Credentials :
   - Email/password depuis les variables d'environnement (ADMIN_EMAIL, ADMIN_PASSWORD)
   - Session JWT
   - Callbacks pour inclure le rôle dans la session
3. Crée le middleware pour protéger toutes les routes /[locale]/tournoi/admin/*
   - Redirection vers /[locale]/tournoi/admin/login si non authentifié
   - Attention : le middleware next-intl est déjà en place, il faut les combiner
4. Page de login admin : /[locale]/tournoi/admin/login
   - Formulaire email + password
   - Gestion erreur "identifiants incorrects"
   - Redirection vers /[locale]/tournoi/admin après connexion réussie
5. Lance le seed : npx tsx prisma/seed.ts pour prépeupler la BDD

Suis scrupuleusement CLAUDE.md pour l'architecture des fichiers.
```

---

## PROMPT SESSION 4 — Interface Admin Tournoi

```
Auth et BDD sont configurés.

Crée l'interface d'administration du tournoi (toutes les routes sous /[locale]/tournoi/admin) :

1. Layout admin : sidebar avec navigation (Dashboard, Équipes, Groupes, Matchs) + bouton déconnexion
2. Dashboard : vue d'ensemble (nb équipes, nb matchs, nb matchs EN COURS)
3. Page Équipes : liste des 8 équipes, CRUD (créer, modifier, supprimer, assigner à un groupe)
4. Page Groupes : affichage des 2 groupes avec leurs équipes, possibilité de déplacer une équipe
5. Page Matchs : liste de tous les matchs avec :
   - Filtres par phase (Groupes / Demi-finales / Finale)
   - Pour chaque match : bouton "Modifier" → modal avec champs score domicile, score extérieur, statut (À VENIR / EN COURS / TERMINÉ)
   - Bouton "Ajouter un match" avec formulaire complet

API Routes nécessaires :
- GET/POST /api/tournoi/equipes
- GET/PUT/DELETE /api/tournoi/equipes/[id]
- GET/PUT /api/tournoi/groupes
- GET/POST /api/tournoi/matchs
- GET/PUT/DELETE /api/tournoi/matchs/[id]
- PUT /api/tournoi/matchs/[id]/score (mise à jour score uniquement)

Toutes les API routes vérifient la session admin avant d'autoriser les mutations.
Validation Zod sur tous les inputs.
```

---

## PROMPT SESSION 5 — Vue publique Tournoi Live

```
L'interface admin est prête.

Crée maintenant la vue publique du tournoi (/[locale]/tournoi) :

1. En-tête : titre "Tournoi de Football", date "7 juin 2026", badge LIVE animé si des matchs sont EN COURS
2. Section Groupes : 2 tables côte à côte (Groupe A / Groupe B) avec classement calculé dynamiquement :
   - Colonnes : Équipe, J, G, N, P, BP, BC, +/-, Pts
   - Tri par points décroissants, puis diff de buts
   - Les 2 premiers de chaque groupe mis en évidence (qualifiés)
3. Section Matchs de groupe : liste des matchs avec heure, terrain, équipes, score (ou heure si à venir), statut
4. Section Phase finale : bracket visuel (demi-finales → finale + match 3e place)
5. Rafraîchissement automatique : utilise SWR avec refreshInterval: 15000 sur l'endpoint GET /api/tournoi/matchs et GET /api/tournoi/equipes
6. Indicateur discret en bas de page : "Mise à jour automatique toutes les 15 secondes"

Design : fond sombre (#0f1a12), scores en grande taille, badge LIVE rouge pulsant, lisible sur mobile.
Tous les textes via useTranslations().
```
