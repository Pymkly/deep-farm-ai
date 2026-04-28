import { createContext, useContext, useState, type ReactNode } from "react";

export type Locale = "en" | "fr";

type Dict = Record<string, string>;

const en: Dict = {
  "nav.project": "The Project",
  "nav.how": "How It Works",
  "nav.impact": "Impact",
  "nav.science": "Science & Tech",
  "nav.team": "Team",
  "nav.news": "News",
  "nav.contact": "Contact",
};

const fr: Dict = {
  "nav.project": "Le Projet",
  "nav.how": "Fonctionnement",
  "nav.impact": "Impact",
  "nav.science": "Science & Tech",
  "nav.team": "Équipe",
  "nav.news": "Actualités",
  "nav.contact": "Contact",
};

const DICTS: Record<Locale, Dict> = { en, fr };

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<Ctx>({
  locale: "en",
  setLocale: () => {},
  t: (k) => k,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const t = (key: string) => DICTS[locale][key] ?? DICTS.en[key] ?? key;
  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
