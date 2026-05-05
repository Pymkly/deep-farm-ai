/**
 * Chiffres clés — Section "Impact" de la landing.
 *
 * Pour modifier un chiffre : change `value` et/ou `suffix`.
 * Pour modifier un label : change `fr` et/ou `en`.
 * Pour ajouter / retirer : ajoute ou supprime un objet de la liste.
 * L'ordre du tableau = l'ordre d'affichage à l'écran.
 */

import type { Locale } from "@/lib/i18n";

export type Figure = {
  value: number;
  suffix: string;
  label: Record<Locale, string>;
};

export const figures: Figure[] = [
  {
    value: 94,
    suffix: "%",
    label: {
      fr: "Précision sur la détection des maladies",
      en: "Accuracy on disease detection",
    },
  },
  {
    value: 2,
    suffix: "",
    label: {
      fr: "Riziculteurs ont testé le système",
      en: "Farmers tested the system",
    },
  },
  {
    value: 92,
    suffix: "%",
    label: {
      fr: "Taux de satisfaction",
      en: "Satisfaction rate",
    },
  },
  {
    value: 50,
    suffix: "",
    label: {
      fr: "Pages ANAE vectorisées",
      en: "ANAE pages vectorized",
    },
  },
  {
    value: 80,
    suffix: "€",
    label: {
      fr: "Coût total par famille",
      en: "Total cost per family",
    },
  },
];
