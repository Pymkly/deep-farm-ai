import { ApiError } from "./api";

/**
 * Turns an API error into something a form can render.
 *
 * Pydantic's `msg` is English and aimed at developers, so it is never shown:
 * only `loc` is used, to point at the guilty field. The wording comes from the
 * dictionary.
 */
export function erreurFormulaire(
  erreur: unknown,
  t: (cle: string) => string,
): { global: string | null; champs: Record<string, string> } {
  if (!(erreur instanceof ApiError)) {
    return { global: t("auth.error.generic"), champs: {} };
  }

  if (erreur.reseau) return { global: t("auth.error.network"), champs: {} };

  switch (erreur.status) {
    case 422: {
      const champs: Record<string, string> = {};
      for (const champ of Object.keys(erreur.champs)) {
        champs[champ] = t(`auth.error.field.${champ}`);
      }
      return {
        global: Object.keys(champs).length ? null : t("auth.error.generic"),
        champs,
      };
    }

    // Signing up with an email that is already taken: more useful under the field.
    case 409:
      return { global: null, champs: { email: t("auth.error.emailTaken") } };

    // The API answers the same 401 for an unknown email and a wrong password,
    // on purpose. Do not try to tell them apart.
    case 401:
      return { global: t("auth.error.credentials"), champs: {} };

    case 400:
    case 403:
      return { global: erreur.detail ?? t("auth.error.generic"), champs: {} };

    default:
      return { global: erreur.detail ?? t("auth.error.generic"), champs: {} };
  }
}

/**
 * Same job as `erreurFormulaire`, but for a conversation rather than a form.
 *
 * The form wording is field-oriented — its 401 reads "wrong email or password",
 * which means nothing inside a thread — and a raw `detail` like "not found" is
 * developer-facing. Only 400 and 403 carry a message the API wrote for the user.
 */
export function erreurChat(erreur: unknown, t: (cle: string) => string): string {
  if (!(erreur instanceof ApiError)) return t("app.chat.error.generic");

  // Worth telling apart: the models run locally and are slow, so a deadline
  // usually means "still working", not "broken".
  if (erreur.delai) return t("app.chat.error.timeout");
  if (erreur.reseau) return t("auth.error.network");

  // The request already ended the session (see `api.ts`): the route guard is
  // about to send the user back to /login.
  if (erreur.status === 401) return t("app.chat.error.session");

  // The only validated field is `question` (CONTRAT_CHAT.md, section 4).
  if (erreur.status === 422) return t("app.chat.error.question");

  // 400 is the missing-image case, and its `detail` names the offending path.
  if ((erreur.status === 400 || erreur.status === 403) && erreur.detail) return erreur.detail;

  if (erreur.status === 429) return t("app.chat.error.busy");

  return t("app.chat.error.generic");
}
