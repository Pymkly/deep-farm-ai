import type { LucideIcon } from "lucide-react";
import { Bell, LayoutDashboard, MessageSquare, Radio, Sprout } from "lucide-react";

/**
 * Navigation du back-office (`/app`).
 *
 * Le sidebar est piloté par ce fichier : pour ajouter une section, il suffit
 * d'ajouter une entrée ici et de créer la route correspondante dans
 * `src/routes/app/`. Voir `docs/add-page.md` (section « Routes imbriquées »).
 *
 * Pour ajouter une section :
 *   1. Créer `src/routes/app/<nom>.tsx`
 *   2. Ajouter l'entrée ci-dessous avec `to: "/app/<nom>"`
 *   3. Ajouter la clé i18n `app.nav.<nom>` dans `src/lib/i18n.tsx` (EN + FR)
 */

/** Section livrée : rendue comme un vrai lien. */
export type LienApp = {
  /** Chemin TanStack de la section. La route doit exister. */
  to: string;
  /** Clé i18n du label. */
  key: string;
  icon: LucideIcon;
};

/**
 * Section annoncée mais pas encore livrée : rendue grisée et inerte, sans
 * chemin — elle ne peut donc jamais mener à un 404. Le jour où la route
 * existe, il suffit de déplacer l'entrée dans `liens` avec son `to`.
 */
export type LienBientot = {
  key: string;
  icon: LucideIcon;
};

export type GroupeApp = {
  /** Clé i18n du titre du groupe. */
  key: string;
  liens?: LienApp[];
  bientot?: LienBientot[];
};

export const groupesApp: GroupeApp[] = [
  {
    key: "app.group.workspace",
    liens: [{ to: "/app/chat", key: "app.nav.chat", icon: MessageSquare }],
  },
  {
    key: "app.group.farm",
    bientot: [
      { key: "app.nav.dashboard", icon: LayoutDashboard },
      { key: "app.nav.plots", icon: Sprout },
      { key: "app.nav.sensors", icon: Radio },
      { key: "app.nav.alerts", icon: Bell },
    ],
  },
];

/** Titre affiché dans la barre du haut, par chemin. */
export const titreParChemin: Record<string, string> = {
  "/app/chat": "app.nav.chat",
  "/app/account": "app.nav.account",
};
