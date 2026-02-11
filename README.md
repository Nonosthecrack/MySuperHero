# My SUper Hero

Application Vue 3 + TypeScript + Vite pour rechercher et afficher des fiches de super-héros.

## Aperçu
- Interface simple et sombre pour chercher des super-héros via l'API SuperHero (https://superheroapi.com).
- La clé API est fournie via une variable d'environnement `VITE_SUPERHERO_API_KEY` (voir ci-dessous).

## Prérequis
- Node.js (LTS recommandé, ex. 18.x ou 20.x)
- npm ou yarn

## Installation
1. Cloner le dépôt:

```bash
git clone <repo-url> MySuperHero
cd MySuperHero
```

2. Installer les dépendances:

```bash
npm install
# ou
yarn install
```

## Scripts utiles
- Démarrer le serveur de développement:

```bash
npm run dev
```

- Compiler pour la production:

```bash
npm run build
```

- Servir la build en local pour vérification (preview):

```bash
npm run preview
```

## Configuration de développement (CORS)
Pendant le développement, Vite est configuré pour rediriger les appels vers `/api/superhero/*` vers `https://superheroapi.com/api/<TOKEN>/...` en injectant la clé depuis `VITE_SUPERHERO_API_KEY` (voir `vite.config.ts`). Cela évite les erreurs CORS lors des tests locaux.

## Utilisation
1. Lancer `npm run dev` et ouvrir http://localhost:3000 (ou l'URL indiquée par Vite).
2. Saisir un nom dans la barre de recherche pour obtenir une liste de correspondances.
3. Cliquer sur un héros pour voir ses détails (biographie, caractéristiques, connexions, etc.).

## Notes de sécurité / déploiement
- Ne commitez jamais de clé API dans le dépôt.
- En production, ne placez pas la clé API dans le bundle client — mettez en place un petit proxy serveur (Express, serverless function, etc.) qui lit la clé depuis une variable d'environnement serveur (ex: `SUPERHERO_API_KEY`) et relaie les requêtes vers `https://superheroapi.com/api/<TOKEN>/...`.

Exemple minimal (Express):

```js
// server/index.js
import express from 'express'
import fetch from 'node-fetch'

const app = express()
const TOKEN = process.env.SUPERHERO_API_KEY

app.use('/api/superhero/*', async (req, res) => {
	const upstream = `https://superheroapi.com/api/${TOKEN}/${req.params[0]}`
	const r = await fetch(upstream)
	const json = await r.json()
	res.json(json)
})

app.listen(process.env.PORT || 3000)
```

## Fichiers clés
- `src/services/superhero.service.ts` : appels réseau (utilise des routes relatives `/api/superhero/...`).
- `vite.config.ts` : proxy dev et chargement des variables `VITE_`.
- `src/style.css`, `src/components/` : styles et composants UI.

## Débogage
- Si `npm run build` échoue pour des raisons TypeScript, exécutez `npm run build` localement pour lire les erreurs: la commande exécute `vue-tsc` avant la build Vite.
- Vérifiez que `VITE_SUPERHERO_API_KEY` est défini dans `.env` lors du dev.

