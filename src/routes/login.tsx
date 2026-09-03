import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Sprout, Mail, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { erreurFormulaire } from "@/lib/erreurs";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/login")({
  // Where to come back to once signed in, set by the route guard.
  // Optional, so that plain <Link to="/login"> stays valid.
  validateSearch: (search: Record<string, unknown>): { redirect?: string } =>
    typeof search.redirect === "string" ? { redirect: search.redirect } : {},
  head: () => ({
    meta: [
      { title: "Sign in — Deep Farm" },
      {
        name: "description",
        content:
          "Sign in to the Deep Farm platform to access your sensor data, AI tutor, and farm dashboard.",
      },
      { property: "og:title", content: "Sign in — Deep Farm" },
      {
        property: "og:description",
        content: "Access your Deep Farm sensor data and AI tutor.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

const schema = (t: (cle: string) => string) =>
  z.object({
    email: z
      .string()
      .trim()
      .min(1, { message: t("auth.validation.emailRequired") })
      .email({ message: t("auth.validation.emailInvalid") })
      .max(255, { message: t("auth.validation.emailTooLong") }),
    password: z
      .string()
      .min(1, { message: t("auth.validation.passwordRequired") })
      // Mirrors the API: bcrypt silently ignores anything past 72 characters.
      .max(72, { message: t("auth.validation.passwordTooLong") }),
  });

function LoginPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();
  const { connexion, statut } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [envoi, setEnvoi] = useState(false);

  const cible = redirect && redirect.startsWith("/") ? redirect : "/app/chat";

  // Session restored from storage: no reason to show the form again.
  useEffect(() => {
    if (statut === "connecte") navigate({ href: cible, replace: true });
  }, [statut, cible, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotice(null);
    setGlobalError(null);

    const result = schema(t).safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as "email" | "password";
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setEnvoi(true);
    try {
      await connexion(result.data.email, result.data.password);
      navigate({ href: cible, replace: true });
    } catch (erreur) {
      const { global, champs } = erreurFormulaire(erreur, t);
      setGlobalError(global);
      setErrors({ email: champs.email, password: champs.mot_de_passe });
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
            {t("auth.signin.title")}
          </h1>
          <p className="mt-3 text-base text-muted-foreground">{t("auth.signin.subtitle")}</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-5">
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
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={72}
                disabled={envoi}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? "password-error" : undefined}
                className="pl-9"
              />
            </div>
            {errors.password && (
              <p id="password-error" className="flex items-center gap-1.5 text-xs text-destructive">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.password}
              </p>
            )}
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={envoi}>
            {envoi ? t("auth.action.signingIn") : t("auth.action.signin")}
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

          {notice && (
            <div
              role="status"
              className="rounded-lg border border-sky/30 bg-sky/5 p-3 text-sm text-foreground"
            >
              {notice}
            </div>
          )}

          <div className="text-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                // The API has no password reset (CONTRAT_AUTH.md, section 7).
                setNotice(t("auth.forgot.notice"));
              }}
              className="text-sm font-medium text-sky hover:underline"
            >
              {t("auth.link.forgot")}
            </a>
          </div>
        </form>

        <div className="mt-12 rounded-xl border border-dashed border-border bg-muted/40 p-5 text-center text-sm text-muted-foreground">
          {t("auth.link.noAccount")}{" "}
          <Link to="/signup" className="font-medium text-primary hover:underline">
            {t("auth.link.signup")}
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
