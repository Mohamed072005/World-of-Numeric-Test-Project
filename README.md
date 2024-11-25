# Outil d'Analyse E-commerce

Un tableau de bord d'analyse pour administrateurs de sites e-commerce permettant de visualiser et analyser les tendances de ventes, les performances des produits et la répartition des ventes par catégorie.

## Fonctionnalités Principales

- 📊 **Analyse des Ventes**
  - Suivi des produits les plus vendus
  - Analyse des tendances de ventes dans le temps
  - Répartition des ventes par catégorie
  
- 📈 **Visualisations**
  - Graphiques dynamiques des tendances
  - Diagrammes de répartition par catégorie
  - Tableaux de classement des produits

## Documentation API

Une documentation interactive complète de l'API est disponible via Swagger UI. Après avoir lancé le serveur, visitez :
```
http://localhost:4000/api#/
```

## Architecture du Projet

```
├── server/         # Backend NestJS
│   ├── src/
│   │   ├── products/    # Gestion des produits
│   │   ├── sales/       # Gestion des ventes
│   │   
│   │
└── client/         # Frontend Vue.js
    ├── src/
    │   ├── components/  # Composants réutilisables
    │   └── store/       # État global Vuex
```

## Backend (NestJS)

### Technologies Utilisées

- NestJS v10
- MongoDB avec Mongoose
- Swagger pour la documentation API
- TypeScript

### Configuration

1. Installation des dépendances :
```bash
cd server
npm install
```

2. Configuration des variables d'environnement :
```bash
cp .env.example .env
```

3. Démarrage du serveur de développement :
```bash
npm run start:dev
```

## Frontend (Vue.js)

### Technologies Utilisées

- Vue.js 3
- Vue Router 4
- Vuex 4
- Chart.js pour les visualisations
- Axios pour les requêtes API
- Tailwind CSS pour le style
- TypeScript

### Configuration

1. Installation des dépendances :
```bash
cd client
npm install
```

2. Démarrage du serveur de développement :
```bash
npm run dev
```

### Scripts Disponibles

- `npm run dev` - Démarrage du serveur de développement
- `npm run build` - Construction pour la production
- `npm run preview` - Prévisualisation de la version de production

## Prérequis de Développement

- Node.js (version LTS recommandée)
- MongoDB
- npm

## Structure de la Base de Données

### Collections MongoDB

- **Products**
  - Nom des produits
  - Catégories
  - Prix

- **Sales**
  - Dates
  - Quantités
  - Prix de vente

## Configuration des Variables d'Environnement

### Backend (.env)
```bash
# Créer un fichier .env dans le dossier server
DB_URL=mongodb://localhost:27017/your_database_name
PORT=4000
```

### Frontend (.env)
```bash
# Créer un fichier .env dans le dossier client
VITE_BASE_URL=http://localhost:4000
```

## Installation & Déploiement

### Installation Locale

1. Cloner le repository
```bash
git clone https://github.com/Mohamed072005/World-of-Numeric-Test-Project.git
cd World-of-Numeric-Test-Project
```

2. Installer les dépendances pour le backend et le frontend
```bash
cd server && npm install
cd ../client && npm install
```

3. Configurer les variables d'environnement
```bash
cp server/.env.example server/.env
```

4. Importer les données initiales
```bash
cd server
# Assurez-vous que vos fichiers CSV sont dans le bon dossier
node dbSeed.js
```

5. Lancer l'application
```bash
# Terminal 1 - Backend (http://localhost:3000)
cd server && npm run start:dev

# Terminal 2 - Frontend (http://localhost:5173)
cd client && npm run dev
```
