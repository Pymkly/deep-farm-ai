# Mise en place du projet

Guide pour installer et lancer le front Deep Farm sur une machine neuve, en
partant de zéro — Node.js compris.

---

## 0. Ce que ce dépôt contient (et ce qu'il ne contient pas)

Ce dépôt est **uniquement le front** : la landing page publique, plus un
back-office pour l'utilisateur connecté (chat multi-agents, compte).

L'**API Deep Farm est un projet séparé**, qui tourne à part sur le port `8001`.
Sans elle, une partie du site fonctionne quand même :

| Ce qui marche sans l'API | Ce qui ne marche pas sans l'API |
| --- | --- |
| La landing page (`/`) | La connexion (`/login`) et l'inscription (`/signup`) |
| La page architecture (`/architecture`) | Le back-office (`/app/…`) : chat, compte |
| Le bilinguisme EN/FR, la navigation | |

Si vous voulez seulement travailler sur la landing page, vous pouvez sauter
l'étape 4 et ignorer les erreurs de connexion.

---

## 1. Prérequis

### 1.1. Node.js — **version 22.12 minimum**

Ce n'est pas une préférence : trois dépendances refusent de démarrer en dessous.

| Paquet | Version de Node exigée |
| --- | --- |
| `@tanstack/react-start` | ≥ 22.12.0 |
| `wrangler` (déploiement Cloudflare) | ≥ 22.0.0 |
| `vite` 7 | ≥ 20.19.0 |

Prenez la **LTS 22** (ou plus récent). Vérifiez ce que vous avez :

```bash
node -v
```

Si la commande est introuvable, ou si le numéro est inférieur à `v22.12.0` :

**Windows**

```powershell
winget install OpenJS.NodeJS.LTS
```

Ou l'installeur `.msi` depuis <https://nodejs.org>. Fermez et rouvrez le
terminal après l'installation, sinon `node` reste introuvable.

**macOS**

```bash
brew install node@22
```

**Linux (Debian/Ubuntu)**

Le paquet `nodejs` des dépôts est souvent trop ancien. Passez par nvm :

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
# rouvrir le terminal, puis :
nvm install 22
nvm use 22
```

> 💡 nvm existe aussi pour macOS, et sous Windows sous le nom **nvm-windows**.
> C'est le plus confortable si vous jonglez entre plusieurs projets qui
> n'utilisent pas la même version de Node.

### 1.2. Git

```bash
git --version
```

Sinon : <https://git-scm.com/downloads> (Windows/macOS), ou
`sudo apt install git` (Debian/Ubuntu).

### 1.3. Bun (facultatif, mais recommandé)

Le dépôt versionne un `bun.lock` : c'est **Bun** qui a servi à installer les
dépendances, et lui seul garantit exactement les mêmes versions que la machine
d'origine. `npm` fonctionne aussi (voir l'étape 3), simplement il recalcule les
versions au lieu de suivre ce verrou.

```bash
# macOS / Linux
curl -fsSL https://bun.sh/install | bash

# Windows (PowerShell)
powershell -c "irm bun.sh/install.ps1 | iex"
```

Vérification : `bun -v`.

---

## 2. Récupérer le projet

```bash
git clone <url-du-depot> deep-farm-ai
cd deep-farm-ai
```

Le travail en cours se fait sur la branche `dev` :

```bash
git checkout dev
```

---

## 3. Installer les dépendances

**Avec Bun** (suit le `bun.lock`, donc les versions exactes) :

```bash
bun install
```

**Avec npm** :

```bash
npm install
```

Comptez une à trois minutes selon la connexion. Le dossier `node_modules/`
créé fait plusieurs centaines de Mo ; il est ignoré par Git.

> ⚠️ `npm install` écrit un `package-lock.json` que le dépôt ne contient pas.
> Ne le committez pas tant que le projet reste sur Bun : deux verrous
> concurrents finissent toujours par diverger.

---

## 4. Brancher l'API

Le front lit l'adresse de l'API dans une variable d'environnement. Si le dépôt
contient un `.env.example`, copiez-le :

```bash
# macOS / Linux
cp .env.example .env

# Windows (PowerShell)
Copy-Item .env.example .env
```

Sinon, créez un fichier `.env` à la racine avec cette seule ligne :

```
VITE_API_URL=http://localhost:8001
```

Adaptez la valeur si votre API écoute ailleurs. Trois choses à savoir :

- **`.env` est ignoré par Git** (voir `.gitignore`). Il ne part jamais sur le
  dépôt : chaque machine a le sien.
- **Sans fichier `.env`, le front retombe sur `http://localhost:8001`**
  (`src/lib/api.ts`). En développement local avec l'API au port par défaut,
  l'étape est donc facultative — mais mieux vaut le fichier explicite.
- **Tout ce qui commence par `VITE_` finit dans le bundle envoyé au
  navigateur.** N'y mettez jamais de secret : une clé d'API privée dans un
  `VITE_*` est publique.

Après toute modification de `.env`, **redémarrez le serveur de dev** : les
variables sont injectées à la compilation, pas lues à chaud.

---

## 5. Lancer le projet

```bash
bun run dev     # ou : npm run dev
```

Le site est servi sur **<http://localhost:8080>**.

> Le port `8080` est imposé par la configuration partagée
> (`@lovable.dev/vite-tanstack-config`). Le changer dans `vite.config.ts` n'a
> aucun effet — la config le remet à 8080 en affichant un avertissement. Si le
> port est déjà pris, passez par la ligne de commande, la seule qui l'emporte :
>
> ```bash
> bun run dev --port 5173        # ou : npm run dev -- --port 5173
> ```

Pour arrêter : `Ctrl+C` dans le terminal.

---

## 6. Vérifier que tout est en place

| À faire | Résultat attendu |
| --- | --- |
| Ouvrir <http://localhost:8080> | La landing page Deep Farm s'affiche |
| Cliquer sur `EN` / `FR` en haut à droite | Les textes changent de langue |
| Ouvrir <http://localhost:8080/architecture> | La page architecture s'affiche |
| Ouvrir <http://localhost:8080/app/chat> sans être connecté | Redirection vers `/login` |
| Se connecter (API lancée) | Arrivée sur le chat, sidebar à gauche |

Si la connexion renvoie une erreur réseau, c'est presque toujours que l'API
n'est pas démarrée — voir le dépannage plus bas.

---

## 7. Les commandes du projet

| Commande | Ce qu'elle fait |
| --- | --- |
| `bun run dev` | Serveur de développement, rechargement à chaud, port 8080 |
| `bun run build` | Construit la version de production dans `dist/` |
| `bun run build:dev` | Même chose, en mode `development` (non minifié) |
| `bun run preview` | Sert le résultat de `build` en local, pour vérifier avant de déployer |
| `bun run lint` | ESLint + Prettier sur tout le projet |
| `bun run format` | Reformate le code avec Prettier |

Il n'y a **pas de suite de tests** dans ce dépôt aujourd'hui. Pour vérifier
qu'une modification ne casse rien, l'outil disponible est le compilateur
TypeScript :

```bash
npx tsc --noEmit
```

Aucune sortie = aucun problème de types.

---

## 8. Où se trouve quoi

```
src/
├── routes/              ← une page = un fichier (TanStack Router)
│   ├── __root.tsx       ← coquille HTML, providers globaux, page 404
│   ├── index.tsx        ← la landing page
│   ├── architecture.tsx
│   ├── login.tsx  signup.tsx  account.tsx
│   ├── app.tsx          ← coquille du back-office (garde de session + sidebar)
│   └── app/             ← les pages du back-office
│       ├── chat.tsx     ← le chat multi-agents
│       └── account.tsx
├── components/
│   ├── landing/         ← les sections de la page d'accueil
│   ├── backoffice/      ← la sidebar du back-office
│   └── ui/              ← primitives shadcn/ui (ne pas modifier sans raison)
├── config/              ← navigation, images, chiffres clés
├── lib/
│   ├── api.ts           ← TOUS les appels à l'API passent par là
│   ├── auth.tsx         ← session, jeton, connexion/déconnexion
│   ├── erreurs.ts       ← traduction des erreurs API en messages lisibles
│   └── i18n.tsx         ← dictionnaires EN + FR
└── styles.css           ← couleurs, polices, design tokens
```

`src/routeTree.gen.ts` est **généré automatiquement** à chaque sauvegarde. On
n'y touche jamais.

---

## 9. Construire et déployer

```bash
bun run build
```

Produit `dist/client/` (le site) et `dist/server/` (le rendu côté serveur).
Pour vérifier le résultat localement avant de publier : `bun run preview`.

> ⚠️ `VITE_API_URL` est figée **au moment du build**. Un build fait avec
> `http://localhost:8001` dans `.env` produira un site qui cherche l'API sur la
> machine du visiteur. Mettez l'adresse publique de l'API avant de construire.

Le projet est configuré pour **Cloudflare Workers** (`wrangler.jsonc`, nom du
worker : `tanstack-start-app`). Le déploiement se fait avec :

```bash
npx wrangler login
npx wrangler deploy
```

Cela suppose un compte Cloudflare et les droits sur le worker. Cette partie
n'a pas été rejouée lors de la rédaction de ce guide : traitez-la comme la
configuration en place, pas comme une procédure vérifiée.

---

## 10. Dépannage

| Symptôme | Cause | Solution |
| --- | --- | --- |
| `Unsupported engine` / erreurs bizarres à l'install | Node trop ancien | `node -v` ; installer Node 22.12+ (étape 1.1) |
| `node` ou `git` : commande introuvable après installation | Le terminal a gardé l'ancien `PATH` | Fermer et rouvrir le terminal |
| `Port 8080 is in use` | Autre appli sur 8080 | `bun run dev -- --port 5173` |
| Le site s'affiche mais la connexion échoue avec une erreur réseau | L'API n'est pas lancée, ou pas à l'adresse de `VITE_API_URL` | Démarrer l'API sur `8001` ; vérifier `.env` ; **redémarrer le dev** |
| J'ai changé `.env`, rien ne bouge | Les `VITE_*` sont injectées à la compilation | Arrêter (`Ctrl+C`) et relancer `bun run dev` |
| `404` sur une page que je viens de créer | L'arbre des routes n'a pas été régénéré | Arrêter et relancer le serveur de dev |
| `bun run lint` affiche des milliers d'erreurs `Delete ␍` | **Sous Windows**, Git convertit les fins de ligne en CRLF à la récupération, alors que Prettier attend des LF | Voir juste en dessous |

### Les milliers d'erreurs `Delete ␍` sous Windows

Le dépôt n'a pas de `.gitattributes`, et Git sous Windows est en général réglé
sur `core.autocrlf=true` : les fichiers arrivent sur le disque avec des fins de
ligne Windows (CRLF), que Prettier attend en LF et signale **une par une**. Sur
un clone neuf, `lint` remonte plus de 7 000 erreurs de ce seul motif. Le code
est correct : c'est du bruit, mais il rend la commande inutilisable.

Le plus simple, pour ce dépôt seulement — **à faire sur un clone propre, sans
modification en cours**, car la dernière commande écrase le répertoire de
travail :

```bash
git config core.autocrlf false
git rm --cached -r .
git reset --hard
```

Variante sans toucher aux fichiers : ajouter `"endOfLine": "auto"` dans
`.prettierrc`.

Il restera ensuite **environ 80 erreurs `prettier/prettier`** : de la mise en
forme jamais passée par Prettier dans des fichiers anciens, sans rapport avec
les fins de ligne. Un coup de `bun run format` les efface. Les 9 avertissements
`react-refresh/only-export-components` qui subsistent sont connus et sans
conséquence.

La solution durable est d'ajouter au dépôt un `.gitattributes` contenant
`* text=auto eol=lf` — à décider avec la personne qui le maintient.

---

## 11. Pour aller plus loin

| Document | Sujet |
| --- | --- |
| [`add-page.md`](./add-page.md) | Ajouter une page au site, de A à Z |
| [`images-config.md`](./images-config.md) | Changer les images de la landing page |
| [`audit.md`](./audit.md) | État des lieux du projet (avril 2026) |

Les contrats d'API (`CONTRAT_AUTH.md` pour l'authentification,
`CONTRAT_CHAT.md` pour le chat multi-agents) décrivent les routes, les formes
de réponse et les erreurs. `src/lib/api.ts` y renvoie en commentaire :
demandez-les à l'équipe si vous ne les trouvez pas dans le dépôt.
