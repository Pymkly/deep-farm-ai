# Ajouter une nouvelle page au site

Ce projet utilise **TanStack Router** avec un système de **routes par fichier** : chaque fichier dans `src/routes/` correspond à une URL. Le plugin Vite régénère automatiquement la "carte des routes" (`src/routeTree.gen.ts`) à chaque sauvegarde — tu n'as jamais à toucher ce fichier.

Ce guide montre comment ajouter une page de A à Z, en prenant comme exemple la création d'une page `/contact`.

---

## Vue d'ensemble — fichiers concernés

| Action | Fichier | Pourquoi |
|---|---|---|
| ✅ **Créer** | `src/routes/<nom>.tsx` | C'est la nouvelle page. Le nom du fichier = le segment d'URL. |
| ✏️ **Éditer** (si textes traduits) | `src/lib/i18n.tsx` | Ajouter les clés FR + EN pour les textes de la page. |
| ✏️ **Éditer** (pour ajouter un lien) | `src/components/landing/Header.tsx` ou autre | Pour qu'un visiteur puisse cliquer et arriver sur la page. |
| 🚫 **Ne jamais toucher** | `src/routeTree.gen.ts` | Auto-généré. Si tu y touches, ce sera écrasé au prochain dev/build. |

---

## Étape 1 — Créer le fichier de route

Crée un nouveau fichier dans `src/routes/`. Le **nom du fichier** détermine l'URL :

| Nom du fichier | URL résultante |
|---|---|
| `src/routes/contact.tsx` | `/contact` |
| `src/routes/about.tsx` | `/about` |
| `src/routes/legal-notice.tsx` | `/legal-notice` |

> ⚠️ Évite les majuscules et les espaces dans le nom du fichier. Utilise des minuscules avec tirets si plusieurs mots (`legal-notice.tsx`).

Pour notre exemple : crée `src/routes/contact.tsx`.

---

## Étape 2 — Contenu minimal de la page

Voici la **structure minimale** d'une route. Copie-colle ce squelette dans le fichier que tu viens de créer, en remplaçant `contact` et `ContactPage` par les noms de ta page :

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  return (
    <div>
      <h1>Contact</h1>
    </div>
  );
}
```

### Points d'attention

- **La string passée à `createFileRoute(...)` doit correspondre EXACTEMENT au chemin du fichier**. Pour `src/routes/contact.tsx`, c'est `"/contact"`. Pour `src/routes/legal-notice.tsx`, c'est `"/legal-notice"`. Une erreur ici casse le build.
- Le composant peut s'appeler comme tu veux (ici `ContactPage`), mais reste cohérent.

---

## Étape 3 — Ajouter le Header et le Footer (optionnel mais recommandé)

Si la page doit ressembler aux autres (avec navigation en haut et bas), importe `Header` et `Footer` :

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-24">
        <h1 className="text-4xl font-bold">Contact</h1>
        {/* ton contenu ici */}
      </main>
      <Footer />
    </>
  );
}
```

> Inspire-toi de `src/routes/architecture.tsx` pour voir un exemple complet de page avec header, sections et footer.

---

## Étape 4 — SEO / Meta tags (optionnel mais recommandé)

Pour que la page ait son propre titre dans l'onglet du navigateur et soit bien partagée sur les réseaux sociaux, ajoute un bloc `head` dans la route :

```tsx
export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Deep Farm" },
      {
        name: "description",
        content: "Contactez l'équipe Deep Farm pour rejoindre le projet.",
      },
      { property: "og:title", content: "Contact — Deep Farm" },
      {
        property: "og:description",
        content: "Contactez l'équipe Deep Farm pour rejoindre le projet.",
      },
    ],
  }),
  component: ContactPage,
});
```

> Pour les pages **privées** (ex : `/login`), ajoute `{ name: "robots", content: "noindex" }` pour que Google ne l'indexe pas. Voir `src/routes/login.tsx` ligne 23.

---

## Étape 5 — Internationalisation (si la page contient du texte)

Le projet supporte FR + EN via `src/lib/i18n.tsx`. Si ta page affiche du texte visible aux utilisateurs, **ne mets pas le texte en dur** dans le composant — passe par i18n.

### 5.1. Ajouter les clés dans `src/lib/i18n.tsx`

Ouvre `src/lib/i18n.tsx` et ajoute tes clés **dans les deux dictionnaires** (`en` et `fr`). Exemple :

Dans la section `en` (vers la ligne 15+), ajoute un bloc :

```ts
  // Contact
  "contact.title": "Get in touch",
  "contact.intro": "Send us a message and we'll get back to you.",
```

Dans la section `fr` (vers la ligne 230+), ajoute le même bloc traduit :

```ts
  // Contact
  "contact.title": "Nous contacter",
  "contact.intro": "Envoyez-nous un message, nous reviendrons vers vous.",
```

> ⚠️ Les **clés** (à gauche du `:`) doivent être **strictement identiques** dans les deux sections. Seules les valeurs (à droite) changent.

### 5.2. Utiliser les clés dans la page

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  const { t } = useI18n();
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-24">
        <h1 className="text-4xl font-bold">{t("contact.title")}</h1>
        <p className="mt-4 text-muted-foreground">{t("contact.intro")}</p>
      </main>
      <Footer />
    </>
  );
}
```

---

## Étape 6 — Ajouter un lien vers la nouvelle page

À ce stade, la page existe mais personne ne peut la trouver. Il faut ajouter un lien depuis une page existante.

### Option A — Lien dans le Header (visible sur tout le site)

Ouvre `src/components/landing/Header.tsx`. Vers la **ligne 7-14**, tu vois la liste `links` :

```tsx
const links = [
  { href: "#project", key: "nav.project" },
  { href: "#how", key: "nav.how" },
  // ...
];
```

Cette liste contient des **ancres** (qui scrollent dans la page d'accueil), pas de vraies routes. Pour une **vraie page**, il faut un `<Link to="...">` à part. Regarde comment le bouton "Connexion" est fait (ligne 96-107) — il utilise `<Link to="/login">` :

```tsx
<Button asChild size="sm" variant="outline" className="...">
  <Link to="/login">{t("header.signin")}</Link>
</Button>
```

Tu peux dupliquer ce pattern pour ajouter un bouton vers `/contact`.

### Option B — Lien depuis le bouton "Contact" actuel de la home

Le bouton "Contact" du header pointe actuellement vers `#contact` (ancre de la home). Si tu veux qu'il pointe vers ta vraie page `/contact`, modifie `src/components/landing/Header.tsx` ligne 106-108 :

**Avant :**
```tsx
<Button asChild size="sm" className="hidden sm:inline-flex">
  <a href="#contact">{t("nav.contact")}</a>
</Button>
```

**Après :**
```tsx
<Button asChild size="sm" className="hidden sm:inline-flex">
  <Link to="/contact">{t("nav.contact")}</Link>
</Button>
```

> N'oublie pas d'importer `Link` en haut du fichier s'il n'est pas déjà là :
> ```tsx
> import { Link } from "@tanstack/react-router";
> ```

### Option C — Lien depuis n'importe quelle section

Dans n'importe quel composant `landing/`, utilise :

```tsx
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

<Button asChild variant="outline">
  <Link to="/contact">Nous contacter</Link>
</Button>
```

> 💡 **Bonus** : le `to="..."` est **typé**. Si tu fais une faute de frappe (`/cntact`), TypeScript et l'éditeur te le signalent.

---

## Étape 7 — Tester

1. Lance le dev server (s'il ne tourne pas déjà) :
   ```
   bun run dev
   ```
2. Ouvre `http://localhost:5173/contact` dans le navigateur (ou le port indiqué dans la console).
3. Vérifie :
   - La page s'affiche correctement ✅
   - Le titre dans l'onglet du navigateur est bon ✅
   - Tester le toggle FR/EN du header → les textes traduits changent ✅
   - Cliquer sur le lien que tu as ajouté → on arrive bien sur `/contact` ✅
   - Cliquer sur le logo Deep Farm → on revient sur `/` ✅

---

## Pour aller plus loin

### Routes imbriquées (sous-pages)

Si tu veux une structure type `/dashboard` + `/dashboard/settings` + `/dashboard/profile` :

```
src/routes/
├── dashboard.tsx              ← layout pour toutes les sous-pages
└── dashboard/
    ├── index.tsx              ← /dashboard (page d'accueil du dashboard)
    ├── settings.tsx           ← /dashboard/settings
    └── profile.tsx            ← /dashboard/profile
```

Le fichier `dashboard.tsx` doit contenir un `<Outlet />` qui sera remplacé par la sous-page active.

### Routes avec paramètres dynamiques

Pour une URL comme `/blog/mon-article-123` :

1. Crée `src/routes/blog/$slug.tsx` (le `$` indique un paramètre)
2. Récupère le paramètre :
   ```tsx
   export const Route = createFileRoute("/blog/$slug")({
     component: BlogPost,
   });

   function BlogPost() {
     const { slug } = Route.useParams();
     return <h1>Article : {slug}</h1>;
   }
   ```

---

## Dépannage

| Symptôme | Cause probable | Solution |
|---|---|---|
| `Page not found` (404) sur la nouvelle URL | Le `routeTree.gen.ts` n'a pas été régénéré | Arrête le serveur dev (`Ctrl+C`), relance `bun run dev` |
| Erreur TypeScript : `"/maPage" is not assignable…` | Le path dans `createFileRoute("...")` ne correspond pas au nom du fichier | Vérifie que la string est strictement le chemin du fichier (sans `.tsx`) |
| Le texte traduit ne s'affiche pas, j'ai juste la clé brute (ex: `contact.title`) | La clé n'existe pas dans le dictionnaire courant | Vérifie que la clé est ajoutée dans **les deux** sections `en` et `fr` de `src/lib/i18n.tsx`, identiquement |
| `<Link to="/contact">` est souligné en rouge dans l'éditeur | TypeScript n'a pas encore vu la nouvelle route | Sauvegarde le fichier de route, attends que `routeTree.gen.ts` se régénère, puis relance le serveur de langue de l'éditeur si besoin |
| Le scroll ne remonte pas en haut quand je change de page | C'est déjà géré globalement | Vérifie que tu utilises `<Link>` de `@tanstack/react-router`, pas une balise `<a href="...">` |
