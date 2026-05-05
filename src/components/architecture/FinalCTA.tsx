import { Link } from "@tanstack/react-router";
import { Github, Mail } from "lucide-react";
import { Reveal } from "@/components/landing/Reveal";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export function FinalCTA() {
  const { t } = useI18n();

  return (
    <section className="bg-ink py-24 text-ink-foreground sm:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
            {t("arch.cta.title")}
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mx-auto mt-5 max-w-xl text-balance text-lg text-white/70">
            {t("arch.cta.intro")}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="hero" size="xl">
              <a
                href="https://github.com/deep-farm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </Button>
            <Button asChild variant="heroGhost" size="xl">
              <Link to="/" hash="contact">
                <Mail className="h-4 w-4" />
                {t("arch.cta.contact")}
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
