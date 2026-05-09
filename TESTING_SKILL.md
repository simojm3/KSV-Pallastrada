# SKILL — Test systématique du site KSV Pallastrada

## Objectif
Tester l'intégralité du site de manière systématique : navigation, traductions, formulaires, tournoi, admin, responsive. Identifier et corriger chaque erreur avant de passer à la suivante.

## Méthode
- Tester **une chose à la fois**, dans l'ordre défini
- Pour chaque test : décrire ce qui est testé, le résultat attendu, le résultat observé
- Si échec : corriger immédiatement avant de continuer
- Produire un rapport final avec le statut de chaque test

---

## PRÉ-REQUIS AVANT DE TESTER

```bash
# 1. Vérifier que le serveur tourne
npm run dev

# 2. Vérifier que la BDD est accessible et seedée
npx prisma db push
npx tsx prisma/seed.ts

# 3. Vérifier que les variables d'env sont présentes
cat .env.local | grep -E "DATABASE_URL|NEXTAUTH_SECRET|ADMIN_EMAIL|ADMIN_PASSWORD"
```

---

## BLOC 1 — Routing & Navigation (toutes les langues)

Pour chaque locale (`fr`, `en`, `de`, `it`), tester que les URLs suivantes retournent HTTP 200 et chargent sans erreur console :

```
/{locale}                        → Page d'accueil
/{locale}/clubs/football         → Page Football
/{locale}/clubs/velo             → Page Vélo
/{locale}/clubs/hiking           → Page Randonnée
/{locale}/contact                → Page Contact
/{locale}/tournoi                → Page Tournoi publique
/{locale}/tournoi/admin          → Redirige vers /login si non auth
/{locale}/tournoi/admin/login    → Page Login admin
```

**Commande de vérification rapide :**
```bash
for locale in fr en de it; do
  for path in "" "/clubs/football" "/clubs/velo" "/clubs/hiking" "/contact" "/tournoi"; do
    url="http://localhost:3000/${locale}${path}"
    status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    echo "$status $url"
  done
done
```

**Attendu :** tous les statuts = 200. Corriger toute erreur 404 ou 500 avant de continuer.

---

## BLOC 2 — Internationalisation

Tester que les textes changent bien selon la langue. Vérifier ces éléments visuellement sur chaque locale :

| Élément | FR | EN | DE | IT |
|---|---|---|---|---|
| Titre hero accueil | "Bienvenue à..." | "Welcome to..." | "Willkommen..." | "Benvenuti..." |
| Label nav "Randonnée" | "Randonnée" | "Hiking" | "Wandern" | "Escursionismo" |
| Badge tournoi | "EN DIRECT" | "LIVE" | "LIVE" | "IN DIRETTA" |
| Bouton contact | "Envoyer le message" | "Send message" | "Nachricht senden" | "Invia messaggio" |
| Footer tagline | "Trois sports..." | "Three sports..." | "Drei Sportarten..." | "Tre sport..." |

**Tester le sélecteur de langue :**
- Depuis `/fr`, cliquer sur EN → vérifie que l'URL devient `/en` et les textes changent
- Depuis `/en`, cliquer sur DE → vérifie `/de`
- Depuis `/de`, cliquer sur IT → vérifie `/it`
- Depuis `/it`, cliquer sur FR → vérifie `/fr`

**Chercher les textes hardcodés :**
```bash
# Chercher du texte FR hardcodé dans les composants (hors fichiers JSON)
grep -r "Accueil\|Bienvenue\|Randonnée\|Envoyer" src/components/ src/app/
grep -r "Welcome\|Football\|Contact" src/components/ --include="*.tsx" | grep -v "useTranslations\|messages"
```

**Attendu :** aucun texte visible hardcodé dans les composants.

---

## BLOC 3 — Liens de navigation

Tester chaque lien du header et footer. Vérifier qu'il n'y a pas de liens cassés (404) et que la page active est mise en évidence dans la nav.

**Header — tester en locale `fr` :**
- [ ] Logo → `/fr`
- [ ] "Accueil" → `/fr`
- [ ] "Football" → `/fr/clubs/football`
- [ ] "Vélo" → `/fr/clubs/velo`
- [ ] "Randonnée" → `/fr/clubs/hiking`
- [ ] "Tournoi" → `/fr/tournoi`
- [ ] "Contact" → `/fr/contact`
- [ ] FR / EN / DE / IT → changement de locale correct

**Footer — tester les liens rapides définis**

**Vérification automatique des liens :**
```bash
# Installer et lancer un link checker
npx broken-link-checker http://localhost:3000/fr --recursive --exclude-external
```

---

## BLOC 4 — Formulaire de Contact

**Test 1 — Validation côté client :**
- Soumettre le formulaire vide → vérifier que les champs requis sont signalés
- Entrer un email invalide (ex: "test") → vérifier le message d'erreur
- Entrer un email valide mais laisser le message vide → erreur attendue

**Test 2 — Soumission valide :**
```
Nom: Test Utilisateur
Email: test@example.com
Sujet: Test depuis checklist
Message: Ceci est un message de test automatique.
```
- Vérifier que le bouton passe en état "loading" pendant l'envoi
- Vérifier le message de succès affiché
- Vérifier dans les logs Resend (dashboard resend.com) que l'email est bien reçu

**Test 3 — API route directe :**
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","subject":"Test","message":"Message test"}'
```
**Attendu :** `{"success": true}`

**Test 4 — Données invalides :**
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"","email":"pasunemail","message":""}'
```
**Attendu :** `400` avec message d'erreur de validation Zod.

---

## BLOC 5 — Authentification Admin

**Test 1 — Protection des routes :**
```bash
# Ces URLs doivent rediriger vers /login (302), pas retourner 200
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/fr/tournoi/admin
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/fr/tournoi/admin/groupes
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/fr/tournoi/admin/matchs
```
**Attendu :** tous retournent 302 (redirect vers login).

**Test 2 — Login avec mauvais identifiants :**
- Aller sur `/fr/tournoi/admin/login`
- Entrer email correct + mauvais mot de passe → message d'erreur attendu
- Entrer email incorrect + bon mot de passe → message d'erreur attendu

**Test 3 — Login valide :**
- Entrer les identifiants corrects (depuis `.env.local`)
- Vérifier la redirection vers `/fr/tournoi/admin`
- Vérifier que le dashboard est accessible

**Test 4 — Déconnexion :**
- Cliquer sur "Se déconnecter"
- Vérifier la redirection vers `/fr/tournoi/admin/login`
- Tenter d'accéder à `/fr/tournoi/admin` directement → doit rediriger vers login

---

## BLOC 6 — Interface Admin Tournoi (CRUD)

Se connecter d'abord avec le compte admin.

**Test Équipes :**
- [ ] La liste des 8 équipes issues du seed s'affiche
- [ ] Créer une nouvelle équipe "Équipe Test" dans Groupe A → apparaît dans la liste
- [ ] Modifier le nom de "Équipe Test" en "FC Test" → changement visible
- [ ] Supprimer "FC Test" → disparaît de la liste
- [ ] Vérifier via Prisma Studio que la BDD est bien à jour : `npx prisma studio`

**Test Groupes :**
- [ ] Les 2 groupes (A et B) s'affichent avec leurs équipes
- [ ] Déplacer une équipe du Groupe A vers Groupe B → changement visible immédiatement

**Test Matchs :**
- [ ] La liste de tous les matchs s'affiche (12 matchs de groupes + 4 phase finale)
- [ ] Filtrer par phase "Groupes" → seulement les 12 matchs de groupes
- [ ] Filtrer par phase "Finale" → seulement les matchs K.O.
- [ ] Modifier un match : passer le statut de "À VENIR" à "EN COURS"
- [ ] Mettre à jour le score : 2 - 1 → vérifier que le score apparaît dans la liste
- [ ] Passer le match à "TERMINÉ" → vérifier le changement de statut

**Test API directe (avec session) :**
```bash
# Récupérer tous les matchs (public)
curl http://localhost:3000/api/tournoi/matchs
# Attendu : JSON avec la liste des matchs

# Récupérer les équipes (public)
curl http://localhost:3000/api/tournoi/equipes
# Attendu : JSON avec les 8 équipes et leur groupe

# Tentative de mutation sans auth → doit retourner 401
curl -X PUT http://localhost:3000/api/tournoi/matchs/[UN_ID] \
  -H "Content-Type: application/json" \
  -d '{"statut":"EN_COURS"}'
# Attendu : 401 Unauthorized
```

---

## BLOC 7 — Vue Publique Tournoi (Live Scores)

**Test 1 — Affichage initial :**
- [ ] Les 2 tables de groupes s'affichent (Groupe A, Groupe B)
- [ ] Chaque table contient 4 équipes avec les colonnes J/G/N/P/BP/BC/+/-/Pts
- [ ] Les matchs de groupe sont listés avec heure et terrain
- [ ] Le bracket de phase finale est visible

**Test 2 — Calcul du classement :**
Depuis l'admin, entrer des scores pour 2-3 matchs du Groupe A :
- Match 1 : FC Berne 2 - 0 SC Zürich (TERMINÉ)
- Match 2 : Servette 1 - 1 FC Basel (TERMINÉ)

Vérifier dans la vue publique :
- [ ] FC Berne : 1J 1G 0N 0P 2BP 0BC +2 3Pts
- [ ] SC Zürich : 1J 0G 0N 1P 0BP 2BC -2 0Pts
- [ ] Servette : 1J 0G 1N 0P 1BP 1BC 0 1Pt
- [ ] FC Basel : 1J 0G 1N 0P 1BP 1BC 0 1Pt

**Test 3 — Badge LIVE :**
- Depuis l'admin, passer un match à "EN COURS"
- Recharger la vue publique → le badge LIVE animé doit apparaître
- Le match EN COURS doit être mis en évidence visuellement

**Test 4 — Polling automatique :**
- Ouvrir la vue publique dans le navigateur
- Depuis l'admin dans un autre onglet, modifier un score
- Attendre max 15 secondes → le score doit se mettre à jour sans recharger la page

**Test 5 — Vérification du polling dans le code :**
```bash
grep -r "refreshInterval" src/
# Attendu : refreshInterval: 15000 sur les appels SWR du tournoi
```

---

## BLOC 8 — Responsive Mobile

Tester ces pages en vue mobile (375px de large, simuler avec DevTools) :

- [ ] Header : menu hamburger ou navigation adaptée, pas de débordement horizontal
- [ ] Page d'accueil : les 3 cards clubs s'empilent verticalement
- [ ] Page tournoi : les 2 tables de groupes passent en colonne (une au-dessus de l'autre)
- [ ] Tableau de classement : toutes les colonnes lisibles sans scroll horizontal
- [ ] Formulaire contact : champs pleine largeur
- [ ] Interface admin : utilisable sur mobile (tableau des matchs scrollable)

```bash
# Vérifier l'absence de overflow horizontal
# Dans la console du navigateur (mobile DevTools) :
document.querySelectorAll('*').forEach(el => {
  if (el.scrollWidth > document.documentElement.clientWidth) {
    console.log('Overflow:', el, el.scrollWidth);
  }
});
```

---

## BLOC 9 — Performance & Erreurs Console

**Vérifier la console navigateur sur chaque page :**
```
- Zéro erreur rouge (erreurs JS, erreurs React, erreurs réseau)
- Zéro warning hydration Next.js
- Zéro 404 sur les assets (images, fonts, CSS)
```

**Vérifier les logs serveur (terminal npm run dev) :**
```
- Zéro erreur Prisma
- Zéro erreur next-intl (clé manquante, locale inconnue)
- Zéro erreur NextAuth
```

**Vérifier les clés de traduction manquantes :**
```bash
# next-intl log les clés manquantes en développement
# Chercher dans les logs : "Missing message" ou "MISSING_MESSAGE"
npm run dev 2>&1 | grep -i "missing"
```

**Build de production (test final) :**
```bash
npm run build
# Attendu : build sans erreur TypeScript, sans warning critique
# Vérifier la taille des bundles dans la sortie
```

---

## RAPPORT FINAL

À la fin de tous les tests, générer ce rapport :

```markdown
# Rapport de tests — KSV Pallastrada
Date : [DATE]

## Résumé
- Tests passés : X / Y
- Erreurs corrigées pendant les tests : X
- Avertissements restants : X

## Détail par bloc
| Bloc | Statut | Notes |
|---|---|---|
| 1 - Routing & Navigation | ✅ / ❌ | |
| 2 - Internationalisation | ✅ / ❌ | |
| 3 - Liens | ✅ / ❌ | |
| 4 - Formulaire Contact | ✅ / ❌ | |
| 5 - Auth Admin | ✅ / ❌ | |
| 6 - CRUD Admin | ✅ / ❌ | |
| 7 - Live Scores | ✅ / ❌ | |
| 8 - Responsive | ✅ / ❌ | |
| 9 - Performance | ✅ / ❌ | |

## Bugs restants (non bloquants)
- [ ] ...

## Prêt pour la production
[ ] Oui / [ ] Non — raison : ...
```
