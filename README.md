# Finance AI App

Une application moderne de gestion des finances personnelles avec intégration IA, construite avec Next.js 16.

## Prérequis

*   **Node.js** v20 ou supérieur
*   **Docker** & **Docker Compose** (pour la base de données)
*   Une clé API **Google Gemini** (optionnelle pour le dev, requise pour les fonctionnalités IA)

## Installation et Démarrage Rapide

Suivez ces étapes pour lancer le projet localement.

### 1. Installation des dépendances

```bash
npm install
```

### 2. Configuration de l'environnement

Créez un fichier `.env` à la racine du projet (ou copiez un exemple s'il existe).

```bash
# .env
DATABASE_URL="postgres://postgres:password@localhost:5432/finance_app"
BETTER_AUTH_SECRET="votre_secret_genere_aleatoirement"
BETTER_AUTH_URL="http://localhost:3000" # Important pour l'auth
GEMINI_API_KEY="votre_cle_api_google_gemini"
```

> **Note:** Vous pouvez générer un secret pour `BETTER_AUTH_SECRET` avec `openssl rand -base64 32`.

### 3. Démarrage de la Base de Données

Nous utilisons Docker pour héberger PostgreSQL.

```bash
# Lance le conteneur DB en arrière-plan
docker compose up -d
```

Vérifiez que le conteneur tourne avec `docker ps`.

### 4. Initialisation de la Base de Données (Migrations)

Appliquez le schéma de la base de données via Drizzle Kit.

```bash
npx drizzle-kit push
```

Cette commande synchronise votre schéma TypeScript (`src/db/schema`) avec la base de données PostgreSQL.

### 5. Peupler la Base de Données (Seed)

Pour avoir des données de test (Utilisateur démo, comptes, transactions), lancez :

```bash
npm run seed
```

Cela créera :
*   Un utilisateur : `Demo User` (`demo@example.com`)
*   Deux comptes bancaires (Courant, Livret A)
*   Des catégories par défaut
*   Quelques transactions

### 6. Lancer l'application

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Utilisation

1.  **Dashboard :** Vue d'ensemble des comptes (Données mockées pour l'instant dans le composant Dashboard, mais les données réelles sont en DB).
2.  **Transactions :** Voir la liste des transactions.
3.  **Import :**
    *   Allez dans l'onglet Import.
    *   Upload un fichier CSV, XLS ou QIF.
    *   L'IA analysera les transactions (si la clé API est configurée).

## Commandes Utiles

*   `npm run lint` : Vérification du code (ESLint).
*   `npx drizzle-kit studio` : Outil visuel pour explorer la base de données.
*   `docker compose down` : Arrêter la base de données.

## Documentation

Voir [SPECIFICATIONS.md](./SPECIFICATIONS.md) pour les détails techniques et [AGENTS.md](./AGENTS.md) pour les conventions de développement.
