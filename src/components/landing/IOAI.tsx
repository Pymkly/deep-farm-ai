import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
import { Reveal } from "./Reveal";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export function IOAI() {
  const { t } = useI18n();
  return (
    <section id="ioai" className="relative overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div className="absolute inset-0">
        <div className="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/30 blur-[120px]" />
        <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-earth/30 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/80 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-earth animate-pulse" />
            {t("ioai.badge")}
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 text-balance text-3xl font-bold leading-[1.05] sm:text-6xl">
            {t("ioai.title")}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-white/75">
            {t("ioai.body")}
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/70">
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4 text-earth" /> {t("ioai.date")}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-earth" /> {t("ioai.location")}
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-10">
            <Button asChild variant="earth" size="xl">
              <a href="https://ioai-summit.org" target="_blank" rel="noopener noreferrer">
                {t("ioai.cta")}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
