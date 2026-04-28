import { Reveal } from "./Reveal";
import { ArrowRight, Sprout, ThermometerSun, Waves, SunMedium } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { siteImages } from "@/config/images";
import { useI18n } from "@/lib/i18n";

export function SolarIoT() {
  const { t } = useI18n();
  const components = [
    {
      icon: Sprout,
      name: t("solar.npk.name"),
      detail: t("solar.npk.detail"),
      accent: "primary" as const,
    },
    {
      icon: ThermometerSun,
      name: t("solar.dht.name"),
      detail: t("solar.dht.detail"),
      accent: "sky" as const,
    },
    {
      icon: Waves,
      name: t("solar.tl.name"),
      detail: t("solar.tl.detail"),
      accent: "sky" as const,
    },
    {
      icon: SunMedium,
      name: t("solar.hub.name"),
      detail: t("solar.hub.detail"),
      accent: "primary" as const,
    },
  ];

  const steps = [
    t("solar.step.panel"),
    t("solar.step.sensors"),
    t("solar.step.hub"),
    t("solar.step.cloud"),
    t("solar.step.app"),
  ];

  return (
    <section
      id="iot"
      className="relative overflow-hidden bg-background py-24 sm:py-32"
    >
      <div className="absolute inset-0 ring-grid opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-sky">
              {t("solar.eyebrow")}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight sm:text-5xl">
              {t("solar.title")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-balance text-base text-muted-foreground sm:text-lg">
              {t("solar.intro")}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 overflow-hidden rounded-3xl border border-border bg-ink shadow-xl">
            <div className="relative aspect-[16/9] w-full">
              <img
                src={siteImages.solarIot.src}
                alt={t("solar.imageAlt")}
                width={siteImages.solarIot.width}
                height={siteImages.solarIot.height}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-white/90 sm:bottom-6 sm:left-6">
                {steps.map((step, i, arr) => (
                  <span key={step} className="flex items-center gap-2">
                    <span className="rounded-full border border-white/30 bg-white/10 px-2.5 py-1 backdrop-blur">
                      {step}
                    </span>
                    {i < arr.length - 1 && (
                      <ArrowRight className="h-3 w-3 text-primary" />
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {components.map((c, i) => {
            const Icon = c.icon;
            const isPrimary = c.accent === "primary";
            return (
              <Reveal key={c.name} delay={0.05 * i}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div
                    className={`absolute inset-x-0 top-0 h-0.5 ${
                      isPrimary ? "bg-primary" : "bg-sky"
                    }`}
                    aria-hidden="true"
                  />
                  <div
                    className={`grid h-12 w-12 place-items-center rounded-xl ${
                      isPrimary
                        ? "bg-primary/10 text-primary"
                        : "bg-sky/10 text-sky"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                    {c.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {c.detail}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 flex justify-center">
            <Link
              to="/architecture"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-md"
            >
              {t("solar.cta")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
