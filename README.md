# Deep Farm — front

Site et back-office de **Deep Farm**, tuteur numérique open source pour les
riziculteurs malgaches : IoT solaire et IA multi-agents (Erasmus+ #101128032).

- **Landing page publique** — le projet, l'impact, l'IoT, la science, l'équipe.
- **Back-office** (`/app`) — pour un utilisateur connecté : chat avec l'agent
  Deep Farm, gestion du compte. La sidebar est prévue pour accueillir les
  sections à venir (tableau de bord, parcelles, capteurs, alertes).

TanStack Start · React 19 · Tailwind CSS 4 · shadcn/ui · déploiement Cloudflare.

---

## Démarrage rapide

Il faut **Node.js 22.12 ou plus récent**.

```bash
git clone <url-du-depot> deep-farm-ai
cd deep-farm-ai
bun install          # ou : npm install
cp .env.example .env # adresse de l'API Deep Farm
bun run dev          # ou : npm run dev
```

Le site tourne sur **<http://localhost:8080>**.

> Ce dépôt est le front seul. L'**API Deep Farm** est un projet séparé, attendu
> sur le port `8001`. Sans elle, la landing page fonctionne, mais pas la
> connexion ni le back-office.

**Vous partez de zéro (Node.js pas encore installé, Windows/macOS/Linux) ?**
Suivez [`docs/installation.md`](./docs/installation.md) — c'est le guide
complet, dépannage compris.

---

## Commandes

| Commande | Ce qu'elle fait |
| --- | --- |
| `bun run dev` | Serveur de développement, port 8080 |
| `bun run build` | Version de production dans `dist/` |
| `bun run preview` | Sert le build en local |
| `bun run lint` | ESLint + Prettier |
| `bun run format` | Reformate le code |
| `npx tsc --noEmit` | Vérifie les types (pas de suite de tests dans ce dépôt) |

## Documentation

| Document | Sujet |
| --- | --- |
| [`docs/installation.md`](./docs/installation.md) | Installer et lancer le projet, de Node.js au déploiement |
| [`docs/add-page.md`](./docs/add-page.md) | Ajouter une page au site |
| [`docs/images-config.md`](./docs/images-config.md) | Changer les images de la landing page |
| [`docs/audit.md`](./docs/audit.md) | État des lieux du projet (avril 2026) |
