import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Sprout, Mail, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
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

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .max(200, { message: "Password is too long" }),
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [notice, setNotice] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice(null);
    const result = loginSchema.safeParse({ email, password });
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
    // Placeholder — no backend call. Real auth lives in the platform app.
    setNotice(
      "The Deep Farm platform is currently in pilot. Authentication will be enabled soon."
    );
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
            Welcome to the Deep Farm platform
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Access your sensor data, AI tutor, and farm dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
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
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className="pl-9"
              />
            </div>
            {errors.email && (
              <p
                id="email-error"
                className="flex items-center gap-1.5 text-xs text-destructive"
              >
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={200}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                className="pl-9"
              />
            </div>
            {errors.password && (
              <p
                id="password-error"
                className="flex items-center gap-1.5 text-xs text-destructive"
              >
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.password}
              </p>
            )}
          </div>

          <Button type="submit" size="lg" className="w-full">
            Sign in
          </Button>

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
                setNotice(
                  "Password recovery will be available when the platform launches."
                );
              }}
              className="text-sm font-medium text-sky hover:underline"
            >
              Forgot your password?
            </a>
          </div>
        </form>

        <div className="mt-12 rounded-xl border border-dashed border-border bg-muted/40 p-5 text-sm text-muted-foreground">
          Don&apos;t have an account? The Deep Farm platform is currently in
          pilot phase.{" "}
          <Link
            to="/"
            hash="contact"
            className="font-medium text-primary hover:underline"
          >
            Contact us
          </Link>{" "}
          to request access.
        </div>

        <Link
          to="/"
          className="mt-8 self-center text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
