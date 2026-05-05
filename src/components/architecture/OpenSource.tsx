import { Github } from "lucide-react";
import { Reveal } from "@/components/landing/Reveal";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export function OpenSource() {
  const { t } = useI18n();

  return (
    <section id="opensource" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-primary">
            {t("arch.os.eyebrow")}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {t("arch.os.title")}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
              <p className="text-xs font-semibold uppercase tracking-wider text-sky">
                {t("arch.os.license.label")}
              </p>
              <p className="mt-3 font-display text-2xl font-bold tracking-tight">
                {t("arch.os.license.value")}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("arch.os.license.desc")}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                {t("arch.os.cost.label")}
              </p>
              <p className="mt-3 font-display text-2xl font-bold tracking-tight">
                {t("arch.os.cost.value")}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("arch.os.cost.desc")}
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-8">
            <Button asChild variant="outline" size="lg">
              <a
                href="https://github.com/deep-farm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                {t("arch.os.cta")}
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
