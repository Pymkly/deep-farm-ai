import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { t } = useI18n();
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-4xl px-6 pb-16 pt-32 sm:pt-40">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> {t("arch.back")}
        </Link>
        <p className="mt-10 text-xs uppercase tracking-[0.2em] text-sky">
          {t("arch.eyebrow")}
        </p>
        <h1 className="mt-3 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          {t("arch.title")}
        </h1>
        <p className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
          {t("arch.intro")}
        </p>
      </div>
    </section>
  );
}
