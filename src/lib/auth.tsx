import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import {
  authApi,
  definirGestionJetonInvalide,
  definirJeton,
  type ReponseAuth,
  type Utilisateur,
} from "./api";

const STORAGE_KEY = "deepfarm.auth";

export type Statut = "chargement" | "connecte" | "anonyme";

export type EtatAuth = {
  statut: Statut;
  jeton: string | null;
  utilisateur: Utilisateur | null;
};

const ANONYME: EtatAuth = { statut: "anonyme", jeton: null, utilisateur: null };
const CHARGEMENT: EtatAuth = { statut: "chargement", jeton: null, utilisateur: null };

// Module-level store rather than a plain context: the session must also be
// readable outside React (route guards) without threading a provider through.
let etat: EtatAuth = CHARGEMENT;
const abonnes = new Set<() => void>();

function publier(suivant: EtatAuth) {
  etat = suivant;
  definirJeton(suivant.jeton);
  for (const abonne of abonnes) abonne();
}

function souscrire(abonne: () => void) {
  abonnes.add(abonne);
  return () => abonnes.delete(abonne);
}

/** Current session, readable outside React. */
export function etatAuth(): EtatAuth {
  return etat;
}

type Persiste = {
  access_token: string;
  expires_at: number;
  utilisateur: Utilisateur;
};

function ecrire(reponse: ReponseAuth) {
  const persiste: Persiste = {
    access_token: reponse.access_token,
    expires_at: Date.now() + reponse.expires_in * 1000,
    utilisateur: reponse.utilisateur,
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persiste));
  } catch {
    // Private browsing or a full quota: the session simply does not survive a reload.
  }
  publier({
    statut: "connecte",
    jeton: persiste.access_token,
    utilisateur: persiste.utilisateur,
  });
}

function purger() {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }
  publier(ANONYME);
}

/**
 * Reads the stored session. Runs on mount, never during render: localStorage
 * does not exist during SSR, and the first client render must match the server.
 */
function restaurer() {
  if (typeof window === "undefined") return;

  let brut: string | null = null;
  try {
    brut = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  if (!brut) return publier(ANONYME);

  let persiste: Persiste;
  try {
    persiste = JSON.parse(brut) as Persiste;
  } catch {
    return purger();
  }

  // Expired token: drop it without a round trip. The API has no refresh token,
  // so there is nothing to renew.
  if (!persiste?.access_token || !(persiste.expires_at > Date.now())) {
    return purger();
  }

  publier({
    statut: "connecte",
    jeton: persiste.access_token,
    utilisateur: persiste.utilisateur,
  });
}

// A token can stop being valid before it expires (account disabled by an admin):
// any 401 on an authenticated call ends the session here.
definirGestionJetonInvalide(purger);

export function AuthProvider({ children }: { children: ReactNode }) {
  useEffect(restaurer, []);
  return <>{children}</>;
}

export function useAuth() {
  const courant = useSyncExternalStore(souscrire, etatAuth, () => CHARGEMENT);

  return {
    ...courant,
    estConnecte: courant.statut === "connecte",

    connexion: async (email: string, motDePasse: string) => {
      // The API stores emails lowercased; normalising here avoids a needless 409.
      const reponse = await authApi.connexion(email.trim().toLowerCase(), motDePasse);
      ecrire(reponse);
      return reponse.utilisateur;
    },

    inscription: async (nomComplet: string, email: string, motDePasse: string) => {
      const reponse = await authApi.inscription(
        nomComplet.trim(),
        email.trim().toLowerCase(),
        motDePasse,
      );
      ecrire(reponse);
      return reponse.utilisateur;
    },

    /** The API is stateless: signing out is forgetting the token. */
    deconnexion: purger,

    /** After a PATCH /auth/moi, keep the cached account in sync. */
    majUtilisateur: (utilisateur: Utilisateur) => {
      if (etat.statut !== "connecte") return;
      publier({ ...etat, utilisateur });
      try {
        const brut = window.localStorage.getItem(STORAGE_KEY);
        if (!brut) return;
        const persiste = JSON.parse(brut) as Persiste;
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...persiste, utilisateur }));
      } catch {
        // ignore
      }
    },
  };
}
