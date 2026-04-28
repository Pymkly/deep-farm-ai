# Gestion des images du site

Toutes les images affichées sur la landing page sont déclarées dans **un seul fichier de configuration** :

```
src/config/images.ts
```

Pour changer une image, **on n'édite jamais les composants** — on touche uniquement ce fichier.

---

## Inventaire des images

| Clé config       | Composant qui l'affiche                          | Fichier source actuel              | Ratio | Dimensions  | Texte alternatif (alt)            |
| ---------------- | ------------------------------------------------ | ---------------------------------- | ----- | ----------- | --------------------------------- |
| `hero`           | `src/components/landing/Hero.tsx`                | `src/assets/hero-paddy.jpg`        | 16:9  | 1920 × 1080 | codé en dur dans `Hero.tsx`       |
| `challenge`      | `src/components/landing/Challenge.tsx`           | `src/assets/farmer-phone.jpg`      | 4:5   | 1024 × 1024 | i18n `challenge.imageAlt`         |
| `solarIot`       | `src/components/landing/SolarIoT.tsx`            | `src/assets/iot-system.jpg`        | 16:9  | 1920 × 1080 | i18n `solar.imageAlt`             |

> Les fichiers de `src/assets/` qui n'apparaissent pas dans cette table ne sont pas affichés (ex. `iot-station.jpg` est aujourd'hui inutilisé).

---

## Procédure pour changer une image

### 1. Déposer le nouveau fichier

Placer le nouveau fichier dans `src/assets/`. Formats recommandés : `.jpg`, `.webp`. Respecter le **ratio** indiqué dans la table ci-dessus pour éviter le recadrage involontaire.

### 2. Mettre à jour `src/config/images.ts`

Modifier l'`import` de la clé concernée :

```ts
// avant
import farmerPhone from "@/assets/farmer-phone.jpg";

// après
import farmerPhone from "@/assets/nouveau-fichier.jpg";
```

Si la nouvelle image a des **dimensions intrinsèques différentes**, ajuster aussi les champs `width` et `height` de la même clé. Ces champs n'imposent pas la taille d'affichage (le CSS s'en charge) — ils servent au navigateur à réserver l'espace pour éviter les sauts de mise en page.

### 3. Mettre à jour le texte alternatif (si le sujet a changé)

- Pour `challenge` et `solarIot` : éditer `src/lib/i18n.tsx`, dans les blocs anglais ET français, les clés `challenge.imageAlt` ou `solar.imageAlt`.
- Pour `hero` : l'alt est codé en dur dans `src/components/landing/Hero.tsx` (ligne 24). Le modifier directement si la nouvelle image change le sujet.

### 4. Supprimer l'ancien fichier (facultatif)

Si l'ancien fichier de `src/assets/` n'est plus référencé nulle part, le supprimer pour ne pas alourdir le build. Vérifier d'abord avec une recherche du nom de fichier dans le projet.

### 5. Vérifier visuellement

```
npm run dev
```

- L'image se charge sur `http://localhost:5173`.
- Vérifier les overlays au-dessus de l'image (ex. l'encart « 2.8 t/ha » dans la section Challenge, le bandeau dégradé sur le Hero, les étapes en bas du visuel SolarIoT) : ils doivent rester lisibles sur la nouvelle image.
- Tester en mobile et desktop : le ratio configuré doit être conservé.

---

## Ajouter une nouvelle image (cas où on crée une nouvelle section)

1. Déposer le fichier dans `src/assets/`.
2. Dans `src/config/images.ts`, ajouter un import et une nouvelle clé dans l'objet `siteImages` :

   ```ts
   import maNouvelleImage from "@/assets/ma-nouvelle-image.jpg";

   export const siteImages = {
     // … clés existantes …
     maSection: {
       src: maNouvelleImage,
       width: 1600,
       height: 900,
     },
   } satisfies Record<string, SiteImage>;
   ```

3. Dans le composant qui doit l'afficher, importer la config et l'utiliser :

   ```tsx
   import { siteImages } from "@/config/images";

   <img
     src={siteImages.maSection.src}
     width={siteImages.maSection.width}
     height={siteImages.maSection.height}
     alt="…"
   />
   ```

4. Mettre à jour la table « Inventaire des images » plus haut dans ce document.

---

## Pourquoi ce système

- **Une seule source de vérité.** L'image, sa largeur et sa hauteur sont déclarées une fois.
- **Imports statiques conservés.** Vite continue de hasher et d'optimiser les fichiers (cache long-terme côté navigateur).
- **Aucune chasse au composant.** Pour changer un visuel, on lit la table ci-dessus et on édite une seule ligne dans `src/config/images.ts`.
