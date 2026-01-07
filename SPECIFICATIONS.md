# Spécifications Techniques et Fonctionnelles - Finance AI

## 1. Vue d'ensemble
Application web moderne de gestion des finances personnelles, mettant l'accent sur l'automatisation via l'Intelligence Artificielle et la souveraineté des données (import manuel privilégié en V1). L'application est conçue pour être "Local-First" dans sa philosophie (imports de fichiers), bien qu'hébergée sur serveur pour cette V1.

## 2. Stack Technique
*   **Framework Frontend/Backend :** Next.js 16 (App Router, Server Actions)
*   **Langage :** TypeScript (Strict Mode, Pas de `any` sauf nécessité absolue)
*   **Styles :** Tailwind CSS 4
*   **Composants UI :** Shadcn UI (Radix UI)
*   **Base de Données :** PostgreSQL 15+ (Dockerisé)
*   **ORM :** Drizzle ORM (Migrations gérées via `drizzle-kit`)
*   **Authentification :** Better-Auth (Email/Password pour V1, extensible OAuth)
*   **Internationalisation :** next-intl (Français / Anglais, routing basé sur `/subpath`)
*   **IA / LLM :** Abstraction `AIService`. Implémentation actuelle : Google Gemini via `google-generative-ai`.
*   **Validation de Données :** Zod
*   **Date Handling :** date-fns

## 3. Architecture de Données (Schema)

### Users (`user`)
*   **id:** Text (UUID)
*   **email:** Text (Unique)
*   **name:** Text
*   **emailVerified:** Boolean

### Comptes Bancaires (`bank_account`)
*   **id:** UUID
*   **userId:** FK User
*   **name:** Text (ex: "Compte Joint", "PEA")
*   **type:** Text (checking, savings, investment)
*   **currency:** Text (ISO code, def: EUR)
*   **bankName:** Text

### Transactions (`transaction`)
*   **id:** UUID
*   **bankAccountId:** FK BankAccount
*   **date:** Timestamp
*   **amount:** Decimal (Precision 10,2)
*   **description:** Text (Libellé nettoyé)
*   **rawDescription:** Text (Libellé banque original)
*   **categoryId:** FK Category (Nullable)
*   **status:** Text ('pending', 'validated')
*   **isRecurring:** Boolean (Détecté par IA)
*   **recurrenceFrequency:** Text (weekly, monthly, yearly)
*   **importId:** Text (Pour regrouper les transactions d'un même import)

### Catégories (`category`)
*   **id:** UUID
*   **name:** Text
*   **parentId:** UUID (Sous-catégories)

### Presets d'Import (`import_preset`)
*   **id:** UUID
*   **userId:** FK User
*   **format:** Text (csv, xls, qif)
*   **config:** JSONB (Mapping: `{ "date": "DateOp", "amount": "Montant", ... }`)

## 4. Fonctionnalités V1

### 4.1. Gestion Multi-Comptes
*   CRUD complet des comptes bancaires.
*   Support multi-devises (affichage simple pour l'instant).

### 4.2. Moteur d'Importation
*   **Formats supportés :**
    *   **CSV :** Parsing flexible (délimiteurs auto-détectés ou configurables).
    *   **Excel (XLS/XLSX) :** Lecture de la première feuille par défaut.
    *   **QIF :** Standard Money/Quicken.
*   **Flux d'Import :**
    1.  **Upload :** Fichier envoyé au serveur (Server Action).
    2.  **Preview :** Affichage des 5 premières lignes.
    3.  **Mapping :** L'utilisateur associe les colonnes (Date, Montant, Tiers).
    4.  **Traitement :** Parsing complet, conversion des formats numériques (ex: "1 200,00" -> 1200.00) et dates.
    5.  **Enrichissement IA :** Appel asynchrone pour catégoriser.

### 4.3. Intelligence Artificielle (Logique & Prompts)
L'IA est utilisée pour enrichir les transactions brutes.
*   **Service :** `GeminiService` (Google Generative AI).
*   **Input :** Description brute, Montant, Date.
*   **Output attendu (JSON) :**
    *   `categoryName`: Suggestion de catégorie standardisée.
    *   `isRecurring`: Booléen si c'est un abonnement/loyer.
    *   `recurrenceFrequency`: 'monthly', 'weekly', etc.
    *   `confidence`: Score 0-1.
*   **Prompt System :**
    > "Analyze this financial transaction. Identify the merchant/party. Deduce the most appropriate category. Check for recurrence patterns based on typical subscription services or utilities. Return purely JSON."

### 4.4. Dashboard & Visualisation
*   Cartes de synthèse : Solde Total, Dépenses du mois, Revenus du mois.
*   Liste des transactions récentes avec badge de statut.

### 4.5. Internationalisation
*   L'application doit être nativement bilingue FR/EN.
*   Détection de la locale utilisateur.
*   Fichiers de traduction JSON dans `/messages`.

## 5. Instructions pour le Développement (Conventions)
*   **Server Actions :** Privilégier les Server Actions pour les mutations de données (`src/app/actions`).
*   **Client Components :** Utiliser `'use client'` uniquement pour les composants interactifs (Forms, Dialogs).
*   **Typage :** Tout doit être typé via TypeScript. Utiliser Zod pour la validation des entrées API/Actions.
*   **Modularité :** Séparer la logique métier (`src/lib`) de l'UI (`src/components`).

## 6. Roadmap
*   **V2 :** Connecteurs bancaires API.
*   **V2 :** LLM Local (Ollama) pour privacy.
*   **V2 :** Budgeting avancé.
