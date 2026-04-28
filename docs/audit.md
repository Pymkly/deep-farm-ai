# Audit du projet Deep Farm

Date : 2026-04-28

## Routes (`src/routes/`)

- `__root.tsx` — shell racine avec composant 404, fixe `<html lang="en">`
- `index.tsx` — landing page, compose 11 sections à l'intérieur de `<I18nProvider>`
- `architecture.tsx` — page architecture, également enveloppée dans son propre `<I18nProvider>`
- `login.tsx` — page de connexion avec validation zod ; **non** enveloppée dans `I18nProvider`

## Composants principaux

**Sections landing** (`src/components/landing/`) : `AnnouncementBar`, `Header`, `Hero`, `Challenge`, `KeyFigures`, `Solution`, `SolarIoT`, `Demo`, `PilotFarm`, `Partners`, `IOAI`, `GetInvolved`, `Footer`, plus les utilitaires `Counter`, `Reveal`, `VideoModal`.

**Primitives UI** (`src/components/ui/`) : kit shadcn/ui complet (~45 fichiers) — accordion, button, dialog, form, sidebar, etc.

**Autres** : `lib/i18n.tsx`, `lib/utils.ts`, `hooks/use-mobile.tsx`.

## i18n EN/FR — **majoritairement visuel, pas réellement implémenté**

`src/lib/i18n.tsx:7-25` définit un dictionnaire avec **seulement 7 clés**, toutes sous le namespace `nav.*` (project, how, impact, science, team, news, contact).

**Usages réels de traduction** : seul `Header.tsx` appelle `t(...)` — pour les 6 liens de navigation et le bouton "Contact" (`Header.tsx:67,107,131,141`).

**Partout ailleurs** :
- `Footer.tsx` importe `useI18n` mais lit uniquement `locale`/`setLocale` pour afficher un toggle EN/FR (`Footer.tsx:10,81`) — aucun appel à `t()`.
- Toutes les autres sections landing (`Hero`, `Challenge`, `Solution`, `KeyFigures`, `SolarIoT`, `Demo`, `PilotFarm`, `Partners`, `IOAI`, `GetInvolved`) contiennent des chaînes anglaises codées en dur, sans hook de traduction.
- Le label "Sign in" dans `Header.tsx:104` est également codé en dur.
- `<html lang="en">` est codé en dur dans `__root.tsx:55` et ne reflète jamais les changements de langue.

**Deux autres problèmes concrets** :
1. L'état est en mémoire (`useState<Locale>("en")`) — aucune persistance dans localStorage/URL/cookies, donc le toggle se réinitialise au rafraîchissement.
2. Chaque route monte son **propre** `I18nProvider`, donc changer la langue sur `/` puis naviguer vers `/architecture` réinitialise en anglais. Le provider devrait vivre dans `__root.tsx`.

**Verdict** : la pastille EN/FR est branchée à un vrai contexte, mais la basculer ne retraduit que 7 labels de nav. Le reste de la page est en anglais uniquement. Parler d'"implémenté" serait généreux — c'est un stub.
