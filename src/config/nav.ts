/**
 * Navigation par page.
 *
 * Chaque clé du mapping correspond à un chemin (`location.pathname`).
 * Le Header affiche la liste de liens correspondant au chemin courant.
 *
 * Pour ajouter une page avec sa propre nav :
 *   1. Ajouter l'entrée ici (clé = chemin de la page)
 *   2. S'assurer que la page contient bien des `<section id="...">`
 *      qui correspondent au champ `hash` de chaque lien
 *   3. Ajouter les clés i18n (`nav.xxx`) dans `src/lib/i18n.tsx`
 */

export type NavLink = {
  /** Chemin cible (TanStack Route path). Permet le scroll inter-pages si différent du chemin courant. */
  to: string;
  /** ID de la section dans la page cible (sans le `#`). */
  hash: string;
  /** Clé i18n du label du lien. */
  key: string;
};

export const navByPath: Record<string, NavLink[]> = {
  "/": [
    { to: "/", hash: "project", key: "nav.project" },
    { to: "/", hash: "impact", key: "nav.impact" },
    { to: "/", hash: "how", key: "nav.how" },
    { to: "/", hash: "iot", key: "nav.iot" },
    { to: "/", hash: "science", key: "nav.science" },
    { to: "/", hash: "team", key: "nav.team" },
    { to: "/", hash: "news", key: "nav.news" },
  ],
  "/architecture": [
    { to: "/architecture", hash: "pipeline", key: "nav.arch.pipeline" },
    { to: "/architecture", hash: "agents", key: "nav.arch.agents" },
    { to: "/architecture", hash: "decisions", key: "nav.arch.decisions" },
    { to: "/architecture", hash: "opensource", key: "nav.arch.opensource" },
  ],
};

/** Liste de liens par défaut (vide) si la page courante n'a pas de nav configurée. */
export const defaultNavLinks: NavLink[] = [];
