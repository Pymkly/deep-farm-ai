/**
 * Single entry point for every call to the Deep Farm API.
 *
 * The API contract lives in CONTRAT_AUTH.md. Two things it guarantees and that
 * this module relies on: the token travels in a header (no cookie, so never
 * `credentials: "include"`), and errors come in two shapes — `detail` as a
 * string for business errors, `detail` as an array for 422 validation.
 */

const BASE = (
  (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:8001"
).replace(/\/+$/, "");

export type Role = "utilisateur" | "admin";

export type Utilisateur = {
  id: string;
  email: string;
  nom_complet: string;
  actif: boolean;
  role: Role;
  cree_le: string;
};

export type ReponseAuth = {
  access_token: string;
  token_type: string;
  expires_in: number;
  utilisateur: Utilisateur;
};

/** Both error shapes, already normalised. */
export class ApiError extends Error {
  readonly status: number;
  /** Business error message, verbatim from the API. Null for 422. */
  readonly detail: string | null;
  /** 422 only: field name (last segment of `loc`) -> raw Pydantic message. */
  readonly champs: Record<string, string>;
  /** True when the request never reached the server. */
  readonly reseau: boolean;
  /** True when the client gave up waiting. The server may still be working. */
  readonly delai: boolean;

  constructor(
    status: number,
    detail: string | null,
    champs: Record<string, string> = {},
    reseau = false,
    delai = false,
  ) {
    super(detail ?? `HTTP ${status}`);
    this.name = "ApiError";
    this.status = status;
    this.detail = detail;
    this.champs = champs;
    this.reseau = reseau;
    this.delai = delai;
  }
}

// The auth store owns the token; the client only mirrors it.
let jetonCourant: string | null = null;
let surJetonInvalide: (() => void) | null = null;

export function definirJeton(jeton: string | null) {
  jetonCourant = jeton;
}

/** Called once by the auth store: a 401 on an authenticated call ends the session. */
export function definirGestionJetonInvalide(gestion: () => void) {
  surJetonInvalide = gestion;
}

function analyser(texte: string): unknown {
  try {
    return JSON.parse(texte);
  } catch {
    return null;
  }
}

function normaliser(status: number, corps: unknown): ApiError {
  const detail = (corps as { detail?: unknown } | null)?.detail;

  if (typeof detail === "string") return new ApiError(status, detail);

  if (Array.isArray(detail)) {
    const champs: Record<string, string> = {};
    for (const item of detail as Array<{ loc?: unknown; msg?: unknown }>) {
      const loc = item?.loc;
      if (!Array.isArray(loc) || loc.length === 0) continue;
      const champ = String(loc[loc.length - 1]);
      if (!(champ in champs)) champs[champ] = String(item?.msg ?? "");
    }
    return new ApiError(status, null, champs);
  }

  return new ApiError(status, null);
}

type Options = {
  methode?: "GET" | "POST" | "PATCH" | "DELETE";
  corps?: unknown;
  avecJeton?: boolean;
  /** Give up after this long. Omitted: whatever the browser decides. */
  delaiMs?: number;
};

export async function request<T>(chemin: string, options: Options = {}): Promise<T> {
  const { methode = "GET", corps, avecJeton = false, delaiMs } = options;

  const entetes: Record<string, string> = {};
  // FormData writes its own Content-Type, multipart boundary included: setting
  // one here would produce a body the server cannot split.
  const multipart = typeof FormData !== "undefined" && corps instanceof FormData;
  if (corps !== undefined && !multipart) entetes["Content-Type"] = "application/json";
  if (avecJeton && jetonCourant) entetes.Authorization = `Bearer ${jetonCourant}`;

  let reponse: Response;
  try {
    reponse = await fetch(`${BASE}${chemin}`, {
      method: methode,
      headers: entetes,
      body: corps === undefined ? undefined : multipart ? corps : JSON.stringify(corps),
      signal: delaiMs ? AbortSignal.timeout(delaiMs) : undefined,
    });
  } catch (erreur) {
    // Told apart because the wording differs: a dead network is worth retrying
    // at once, a deadline means the server is probably still busy.
    const delai = erreur instanceof DOMException && erreur.name === "TimeoutError";
    throw new ApiError(0, null, {}, !delai, delai);
  }

  // A 401 on a call that carried a token means the session is over: the API has
  // no refresh token, so this is never something to retry.
  if (reponse.status === 401 && avecJeton) surJetonInvalide?.();

  if (reponse.status === 204) return undefined as T;

  const texte = await reponse.text();
  const donnees = texte ? analyser(texte) : null;

  if (!reponse.ok) throw normaliser(reponse.status, donnees);
  return donnees as T;
}

export const authApi = {
  connexion: (email: string, mot_de_passe: string) =>
    request<ReponseAuth>("/auth/connexion", {
      methode: "POST",
      corps: { email, mot_de_passe },
    }),

  inscription: (nom_complet: string, email: string, mot_de_passe: string) =>
    request<ReponseAuth>("/auth/inscription", {
      methode: "POST",
      corps: { email, nom_complet, mot_de_passe },
    }),

  moi: () => request<Utilisateur>("/auth/moi", { avecJeton: true }),

  renommer: (nom_complet: string) =>
    request<Utilisateur>("/auth/moi", {
      methode: "PATCH",
      corps: { nom_complet },
      avecJeton: true,
    }),

  changerMotDePasse: (mot_de_passe_actuel: string, mot_de_passe: string) =>
    request<Utilisateur>("/auth/moi", {
      methode: "PATCH",
      corps: { mot_de_passe, mot_de_passe_actuel },
      avecJeton: true,
    }),
};

/**
 * Multi-agent chat. Contract: CONTRAT_CHAT.md.
 *
 * Three traits of this API shape everything the UI does with it:
 *
 *  - An answer is the result of several chained agent calls. `etapes` lists
 *    them in execution order, and it is the only way the user can see where
 *    the answer came from.
 *  - `etapes` is empty when the orchestrator answers on its own — a greeting,
 *    or a request for detail. That is a real answer, not an error, and it
 *    gets no "how this was built" section.
 *  - There is no conversation thread. Every call starts from scratch, so a
 *    follow-up like "and tomorrow?" means nothing to the server.
 *
 * A failing agent does NOT produce an HTTP error: the call still returns 200
 * and the incident shows up inside that step's `sortie`. See `etapeEchouee`.
 */
export type Etape = {
  /** `rag_image`, `rag_texte`, `meteo` — and more later on. */
  agent: string;
  /** What the orchestrator asked this agent, rewritten from the question. */
  consigne: string;
  /** The agent's raw answer, line breaks and numbered lists included. */
  sortie: string;
};

export type ReponseChat = {
  reponse: string;
  /**
   * Where the photo was stored, relative to the project root. Not a URL: no
   * route serves it back, so a preview has to stay client-side. Feed it to
   * `demander` to ask a second question about the same photo.
   */
  image: string | null;
  etapes: Etape[];
};

export type CatalogueAgents = {
  orchestrateur: string;
  /** agent id -> what it does. The list grows; never switch on a fixed set. */
  agents: Record<string, string>;
};

/** Question length accepted by the API, mirrored here to fail before the trip. */
export const QUESTION_MIN = 3;
export const QUESTION_MAX = 2000;

/** Photo rules, mirrored from the API so a doomed upload never leaves. */
export const EXTENSIONS_IMAGE = [".bmp", ".jpeg", ".jpg", ".png", ".webp"];
export const TAILLE_IMAGE_MAX = 10 * 1024 * 1024;

/**
 * The models run locally: ~10 s for one step, ~35 s for a first photo while
 * the vision model loads. The contract calls 120 s the floor for a client
 * timeout, so this ceiling only ever catches a genuinely stuck request.
 */
const DELAI_CHAT = 180_000;

/** True when a step carries an agent failure rather than an answer. */
export function etapeEchouee(sortie: string) {
  return /^[EÉ]chec de l['\u2019\s]\s*agent/i.test(sortie.trimStart());
}

export const chatApi = {
  /**
   * Ask a question. `image` re-opens a photo already uploaded, by handing back
   * the path a previous answer returned — sending anything else earns a 400.
   */
  demander: (question: string, image?: string) =>
    request<ReponseChat>("/chat", {
      methode: "POST",
      corps: image ? { question, image } : { question },
      avecJeton: true,
      delaiMs: DELAI_CHAT,
    }),

  /**
   * Upload a photo and ask about it in one call. The question is optional:
   * left out, the API asks its own ("what is going on and what should be
   * done?"). The answer carries the stored path for follow-up questions.
   */
  televerser: (photo: File, question?: string) => {
    const corps = new FormData();
    corps.append("photo", photo);
    if (question) corps.append("question", question);
    return request<ReponseChat>("/chat/image", {
      methode: "POST",
      corps,
      avecJeton: true,
      delaiMs: DELAI_CHAT,
    });
  },

  agents: () => request<CatalogueAgents>("/chat/agents", { avecJeton: true }),
};
