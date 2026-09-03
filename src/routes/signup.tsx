import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Sprout, Mail, Lock, User, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { erreurFormulaire } from "@/lib/erreurs";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create an account — Deep Farm" },
      {
        name: "description",
        content:
          "Create a Deep Farm account to access your sensor data, AI tutor, and farm dashboard.",
      },
      { property: "og:title", content: "Create an account — Deep Farm" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SignupPage,
});

const schema = (t: (cle: string) => string) =>
  z
    .object({
      nom: z
        .string()
        .trim()
        .min(1, { message: t("auth.validation.nameRequired") })
        .max(120, { message: t("auth.validation.nameTooLong") }),
      email: z
        .string()
        .trim()
        .min(1, { message: t("auth.validation.emailRequired") })
        .email({ message: t("auth.validation.emailInvalid") })
        .max(255, { message: t("auth.validation.emailTooLong") }),
      password: z
        .string()
        .min(8, { message: t("auth.validation.passwordTooShort") })
        .max(72, { message: t("auth.validation.passwordTooLong") }),
      // Front-end only: never sent to the API.
      confirmation: z.string(),
    })
    .refine((valeurs) => valeurs.password === valeurs.confirmation, {
      path: ["confirmation"],
      message: t("auth.validation.passwordMismatch"),
    });

type Champs = {
  nom?: string;
  email?: string;
  password?: string;
  confirmation?: string;
};

function SignupPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { inscription, statut } = useAuth();

  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [errors, setErrors] = useState<Champs>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [envoi, setEnvoi] = useState(false);

  useEffect(() => {
    if (statut === "connecte") navigate({ to: "/app/chat", replace: true });
  }, [statut, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError(null);

    const result = schema(t).safeParse({ nom, email, password, confirmation });
    if (!result.success) {
      const fieldErrors: Champs = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof Champs;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setEnvoi(true);
    try {
      // A 201 already carries the token: the account is signed in right away,
      // there is no email verification step.
      await inscription(result.data.nom, result.data.email, result.data.password);
      navigate({ to: "/app/chat", replace: true });
    } catch (erreur) {
      const { global, champs } = erreurFormulaire(erreur, t);
      setGlobalError(global);
      setErrors({
        nom: champs.nom_complet,
        email: champs.email,
        password: champs.mot_de_passe,
      });
    } finally {
      setEnvoi(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-6 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 self-start font-display font-bold text-primary"
        >
          <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground">
            <Sprout className="h-3.5 w-3.5" />
          </span>
          <span className="text-base tracking-tight">Deep Farm</span>
        </Link>

        <div className="mt-16">
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {t("auth.signup.title")}
          </h1>
          <p className="mt-3 text-base text-muted-foreground">{t("auth.signup.subtitle")}</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="nom">{t("auth.field.name")}</Label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="nom"
                type="text"
                autoComplete="name"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                maxLength={120}
                disabled={envoi}
                aria-invalid={Boolean(errors.nom)}
                aria-describedby={errors.nom ? "nom-error" : undefined}
                className="pl-9"
              />
            </div>
            {errors.nom && (
              <p id="nom-error" className="flex items-center gap-1.5 text-xs text-destructive">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.nom}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">{t("auth.field.email")}</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={255}
                disabled={envoi}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className="pl-9"
              />
            </div>
            {errors.email && (
              <p id="email-error" className="flex items-center gap-1.5 text-xs text-destructive">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">{t("auth.field.password")}</Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={72}
                disabled={envoi}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? "password-error" : "password-hint"}
                className="pl-9"
              />
            </div>
            {errors.password ? (
              <p id="password-error" className="flex items-center gap-1.5 text-xs text-destructive">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.password}
              </p>
            ) : (
              <p id="password-hint" className="text-xs text-muted-foreground">
                {t("auth.password.hint")}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="confirmation">{t("auth.field.passwordConfirm")}</Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="confirmation"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
                maxLength={72}
                disabled={envoi}
                aria-invalid={Boolean(errors.confirmation)}
                aria-describedby={errors.confirmation ? "confirmation-error" : undefined}
                className="pl-9"
              />
            </div>
            {errors.confirmation && (
              <p
                id="confirmation-error"
                className="flex items-center gap-1.5 text-xs text-destructive"
              >
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.confirmation}
              </p>
            )}
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={envoi}>
            {envoi ? t("auth.action.signingUp") : t("auth.action.signup")}
          </Button>

          {globalError && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{globalError}</span>
            </div>
          )}
        </form>

        <div className="mt-12 rounded-xl border border-dashed border-border bg-muted/40 p-5 text-center text-sm text-muted-foreground">
          {t("auth.link.hasAccount")}{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            {t("auth.link.signin")}
          </Link>
        </div>

        <Link
          to="/"
          className="mt-8 self-center text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground"
        >
          {t("auth.back")}
        </Link>
      </div>
    </main>
  );
}
