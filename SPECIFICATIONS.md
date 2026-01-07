# Spécifications Techniques et Fonctionnelles - Finance AI

## 1. Vue d'ensemble
Application web moderne de gestion des finances personnelles, mettant l'accent sur l'automatisation via l'Intelligence Artificielle et la souveraineté des données (import manuel privilégié en V1).

## 2. Stack Technique
*   **Framework Frontend/Backend :** Next.js 16 (App Router)
*   **Langage :** TypeScript (Strict Mode)
*   **Styles :** Tailwind CSS 4
*   **Composants UI :** Shadcn UI
*   **Base de Données :** PostgreSQL 15 (Dockerisé)
*   **ORM :** Drizzle ORM
*   **Authentification :** Better-Auth (Email/Password pour V1)
*   **Internationalisation :** next-intl (Français / Anglais)
*   **IA / LLM :** Intégration modulaire (Actuellement : Google Gemini via API)

## 3. Architecture de Données (Schema)

### Users (`user`)
*   Identité de l'utilisateur (Nom, Email, Mot de passe hashé).
*   Support pour OAuth (préparé pour le futur).

### Comptes Bancaires (`bank_account`)
*   Représente un compte physique (Compte Courant, Épargne, Investissement).
*   Champs : Nom, Type, Devise, Solde actuel, Nom de la banque.

### Transactions (`transaction`)
*   Le cœur du système.
*   Champs : Date, Montant, Devise, Description, Description Brute (Raw), Statut (En attente/Validé).
*   **Enrichissement IA :** `is_recurring`, `recurrence_frequency`, `category_id`.

### Catégories (`category`)
*   Classification hiérarchique des dépenses/revenus.

### Presets d'Import (`import_preset`)
*   Sauvegarde les configurations de mapping pour les fichiers bancaires.
*   Permet de réutiliser le mapping "Colonne A -> Date", "Colonne B -> Montant" pour les imports futurs.

## 4. Fonctionnalités V1

### 4.1. Gestion Multi-Comptes
*   Création manuelle de comptes (Courant, Épargne, etc.).
*   Vue consolidée du patrimoine.

### 4.2. Moteur d'Importation
*   **Formats supportés :**
    *   CSV (Comma Separated Values)
    *   Excel (XLS, XLSX)
    *   QIF (Quicken Interchange Format) - Compatible Microsoft Money & Quicken.
*   **Mapping Intelligent :**
    *   L'utilisateur mappe les colonnes de son fichier vers les champs de la base de données.
    *   Possibilité de sauvegarder ce mapping (Preset) pour réutilisation.

### 4.3. Intelligence Artificielle (Categorization & Insights)
*   Analyse de chaque transaction importée via LLM (Gemini).
*   **Détection :**
    *   Catégorie suggérée (ex: "Alimentation", "Transport").
    *   Récurrence (ex: Détection d'abonnements Netflix, Spotify).
*   **Validation :** Badge de confiance et validation utilisateur requise pour confirmer les suggestions.

### 4.4. Dashboard
*   Vue synthétique des finances.
*   Indicateurs clés : Solde total, Évolution mensuelle.

## 5. Roadmap & Évolutions Futures
*   **V2 :** Connexion API Bancaire directe (GoCardless / Plaid).
*   **V2 :** Support LLM Local (Ollama) pour confidentialité totale.
*   **V2 :** Graphiques avancés et budget prévisionnel.
