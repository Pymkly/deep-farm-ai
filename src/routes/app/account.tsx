import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authApi, type Utilisateur } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { erreurFormulaire } from "@/lib/erreurs";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/app/account")({
  head: () => ({
    meta: [{ title: "Your account — Deep Farm" }, { name: "robots", content: "noindex" }],
  }),
  component: AccountPage,
});

function AccountPage() {
  const { t } = useI18n();
  // The `/app` layout already guards the session, so `utilisateur` is set here.
  const { utilisateur, majUtilisateur } = useAuth();

  if (!utilisateur) return null;

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto w-full max-w-xl px-4 py-10 sm:px-6">
        <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          {t("account.title")}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">{t("account.subtitle")}</p>

        <Identite utilisateur={utilisateur} />
        <FormulaireNom utilisateur={utilisateur} onMaj={majUtilisateur} />
        <FormulaireMotDePasse />
      </div>
    </div>
  );
}

function Identite({ utilisateur }: { utilisateur: Utilisateur }) {
  const { t, locale } = useI18n();

  const date = new Date(utilisateur.cree_le);
  const membre = Number.isNaN(date.getTime())
    ? utilisateur.cree_le
    : date.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

  return (
    <dl className="mt-8 grid grid-cols-1 gap-4 rounded-xl border border-border bg-muted/30 p-5 text-sm sm:grid-cols-2">
      <div>
        <dt className="text-xs uppercase tracking-wider text-muted-foreground">
          {t("auth.field.email")}
        </dt>
        <dd className="mt-1 break-all font-medium">{utilisateur.email}</dd>
      </div>
      <div>
        <dt className="text-xs uppercase tracking-wider text-muted-foreground">
          {t("account.role")}
        </dt>
        <dd className="mt-1 font-medium">{t(`account.role.${utilisateur.role}`)}</dd>
      </div>
      <div>
        <dt className="text-xs uppercase tracking-wider text-muted-foreground">
          {t("account.member")}
        </dt>
        <dd className="mt-1 font-medium">{membre}</dd>
      </div>
    </dl>
  );
}

function Message({ texte, type }: { texte: string; type: "ok" | "erreur" }) {
  const ok = type === "ok";
  return (
    <p
      role={ok ? "status" : "alert"}
      className={`flex items-start gap-1.5 text-xs ${ok ? "text-primary" : "text-destructive"}`}
    >
      {ok ? (
        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      ) : (
        <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      )}
      {texte}
    </p>
  );
}

function FormulaireNom({
  utilisateur,
  onMaj,
}: {
  utilisateur: Utilisateur;
  onMaj: (u: Utilisateur) => void;
}) {
  const { t } = useI18n();
  const [nom, setNom] = useState(utilisateur.nom_complet);
  const [erreur, setErreur] = useState<string | null>(null);
  const [succes, setSucces] = useState(false);
  const [envoi, setEnvoi] = useState(false);

  const schema = z
    .string()
    .trim()
    .min(1, { message: t("auth.validation.nameRequired") })
    .max(120, { message: t("auth.validation.nameTooLong") });

  const soumettre = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreur(null);
    setSucces(false);

    const result = schema.safeParse(nom);
    if (!result.success) return setErreur(result.error.issues[0].message);

    setEnvoi(true);
    try {
      // PATCH is partial: only the changed field goes out.
      onMaj(await authApi.renommer(result.data));
      setSucces(true);
    } catch (err) {
      const { global, champs } = erreurFormulaire(err, t);
      setErreur(champs.nom_complet ?? global);
    } finally {
      setEnvoi(false);
    }
  };

  return (
    <form onSubmit={soumettre} noValidate className="mt-10 space-y-3">
      <h2 className="font-display text-lg font-semibold">{t("account.profile.title")}</h2>

      <div className="space-y-1.5">
        <Label htmlFor="nom_complet">{t("auth.field.name")}</Label>
        <Input
          id="nom_complet"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          maxLength={120}
          disabled={envoi}
          aria-invalid={Boolean(erreur)}
        />
        {erreur && <Message texte={erreur} type="erreur" />}
        {succes && <Message texte={t("account.profile.saved")} type="ok" />}
      </div>

      <Button
        type="submit"
        variant="outline"
        disabled={envoi || nom.trim() === utilisateur.nom_complet}
      >
        {t("account.profile.save")}
      </Button>
    </form>
  );
}

function FormulaireMotDePasse() {
  const { t } = useI18n();
  const [actuel, setActuel] = useState("");
  const [nouveau, setNouveau] = useState("");
  const [erreur, setErreur] = useState<string | null>(null);
  const [succes, setSucces] = useState(false);
  const [envoi, setEnvoi] = useState(false);

  const soumettre = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreur(null);
    setSucces(false);

    if (!actuel) return setErreur(t("auth.error.field.mot_de_passe_actuel"));
    if (nouveau.length < 8) return setErreur(t("auth.validation.passwordTooShort"));
    if (nouveau.length > 72) return setErreur(t("auth.validation.passwordTooLong"));

    setEnvoi(true);
    try {
      // The API requires the current password: a stolen token must not be
      // enough to lock the owner out.
      await authApi.changerMotDePasse(actuel, nouveau);
      setActuel("");
      setNouveau("");
      setSucces(true);
    } catch (err) {
      const { global, champs } = erreurFormulaire(err, t);
      setErreur(champs.mot_de_passe ?? global);
    } finally {
      setEnvoi(false);
    }
  };

  return (
    <form onSubmit={soumettre} noValidate className="mt-10 space-y-3">
      <h2 className="font-display text-lg font-semibold">{t("account.password.title")}</h2>

      <div className="space-y-1.5">
        <Label htmlFor="actuel">{t("auth.field.currentPassword")}</Label>
        <Input
          id="actuel"
          type="password"
          autoComplete="current-password"
          value={actuel}
          onChange={(e) => setActuel(e.target.value)}
          maxLength={72}
          disabled={envoi}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="nouveau">{t("auth.field.password")}</Label>
        <Input
          id="nouveau"
          type="password"
          autoComplete="new-password"
          value={nouveau}
          onChange={(e) => setNouveau(e.target.value)}
          maxLength={72}
          disabled={envoi}
          aria-describedby="nouveau-hint"
        />
        <p id="nouveau-hint" className="text-xs text-muted-foreground">
          {t("auth.password.hint")}
        </p>
        {erreur && <Message texte={erreur} type="erreur" />}
        {succes && <Message texte={t("account.password.saved")} type="ok" />}
      </div>

      <Button type="submit" variant="outline" disabled={envoi || !actuel || !nouveau}>
        {t("account.password.save")}
      </Button>
    </form>
  );
}
