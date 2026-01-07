# AGENTS.md - Instructions pour les Agents IA

Ce fichier contient les instructions, contextes et conventions que tout agent IA (ou développeur humain) doit suivre en travaillant sur ce projet.

## 1. Identité & Objectif du Projet
**Nom :** Finance AI
**But :** Application de gestion financière personnelle "Local-First" avec enrichissement IA.
**Philosophie :** Code propre, typage strict, performance, et respect de la stack technique définie.

## 2. Stack Technique (Strict)
*   **Next.js :** Version 16+. Utiliser l'App Router (`src/app`).
*   **Styling :** Tailwind CSS 4. Pas de CSS modules ni de CSS-in-JS autre.
*   **UI Kit :** Shadcn UI. Utiliser `npx shadcn@latest add [component]` pour ajouter des composants.
*   **Database :** PostgreSQL.
*   **ORM :** Drizzle ORM. Définition du schema dans `src/db/schema`.
*   **Auth :** Better-Auth.
*   **I18n :** `next-intl`.

## 3. Conventions de Code

### TypeScript
*   **Strict Mode :** Activé.
*   **Interdiction du `any` :** Sauf cas de force majeure (ex: librairies tierces non typées). Dans ce cas, utiliser `eslint-disable-next-line` avec justification.
*   **Interfaces :** Préfixer ou nommer clairement (ex: `Transaction` vs `ParsedTransaction`).

### Architecture Next.js
*   **Server Actions :** Utiliser pour toutes les mutations de données (POST, PUT, DELETE). Placer dans `src/app/actions`.
*   **Server Components :** Par défaut. Fetching de données direct via Drizzle dans le composant asynchrone.
*   **Client Components :** Uniquement pour l'interactivité (hooks `useState`, `useEffect`, events). Ajouter `'use client'` en haut du fichier.

### Base de Données & Drizzle
*   Chaque modification de schema nécessite une migration :
    1.  Modifier `src/db/schema/index.ts`.
    2.  Lancer `npx drizzle-kit push` (ou `generate` + `migrate` en prod).
*   Ne jamais écrire de SQL brut si Drizzle permet de le faire via son API query builder.

### Gestion des Erreurs
*   Utiliser des blocs `try/catch` dans les Server Actions.
*   Retourner des objets d'erreur structurés à l'UI.

## 4. Instructions Spécifiques aux Fonctionnalités

### Moteur d'Import
*   Les parsers (`csv`, `xls`, `qif`) doivent être robustes et gérer les erreurs de formatage.
*   Ne jamais stocker le fichier brut sur le disque en V1 (traitement en mémoire ou stream).

### Intégration IA
*   Le service IA (`GeminiService`) doit être isolé derrière l'interface `AIService`.
*   Gérer les cas où l'IA échoue ou timeout (fallback sur "Uncategorized").
*   Ne jamais envoyer de données personnellement identifiables (PII) autre que le libellé de transaction au LLM.

## 5. Tests & Vérifications
*   Avant de commiter, lancer `npm run lint`.
*   Vérifier que le build passe : `npx tsc --noEmit`.
*   Si modification UI, vérifier le rendu responsive (Mobile/Desktop).

## 6. Commandes Utiles
*   `npm run dev` : Lancer le serveur de dev.
*   `npx drizzle-kit studio` : Explorer la DB.
*   `docker compose up -d` : Lancer la DB locale.
