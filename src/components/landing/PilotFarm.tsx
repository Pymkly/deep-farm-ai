import { ArrowRight, MapPin } from "lucide-react";
import { Reveal } from "./Reveal";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export function PilotFarm() {
  const { t } = useI18n();
  const stats = [
    { v: "18", l: t("pilot.stat.plots") },
    { v: "2 ha", l: t("pilot.stat.surface") },
    { v: "12", l: t("pilot.stat.stations") },
    { v: "3", l: t("pilot.stat.regions") },
  ];
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative aspect-square w-full max-w-md mx-auto">
              {/* Stylized Madagascar SVG */}
              <svg viewBox="0 0 400 600" className="h-full w-full">
                <defs>
                  <linearGradient id="mada" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.45 0.1 134)" />
                    <stop offset="100%" stopColor="oklch(0.32 0.08 134)" />
                  </linearGradient>
                </defs>
                <path
                  d="M200 30 C 240 50, 270 90, 280 140 C 295 190, 290 240, 285 290 C 280 340, 295 380, 280 430 C 260 490, 220 540, 180 560 C 150 570, 130 555, 125 520 C 115 470, 130 420, 120 370 C 110 320, 95 280, 110 230 C 125 180, 145 130, 165 80 C 175 50, 185 30, 200 30 Z"
                  fill="url(#mada)"
                  stroke="oklch(0.25 0.06 134)"
                  strokeWidth="2"
                />
                {/* Marker on Antananarivo (~ middle highlands) */}
                <g transform="translate(200, 250)">
                  <circle r="40" fill="oklch(0.65 0.13 55 / 0.2)" className="origin-center animate-ping" style={{ animationDuration: "2.5s" }} />
                  <circle r="20" fill="oklch(0.65 0.13 55 / 0.35)" />
                  <circle r="9" fill="oklch(0.65 0.13 55)" />
                  <circle r="3" fill="white" />
                </g>
                <text x="245" y="255" fill="oklch(0.18 0.02 140)" fontSize="14" fontWeight="600" fontFamily="Manrope">
                  Iarinarivo
                </text>
              </svg>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-earth">
              <MapPin className="h-3 w-3" /> {t("pilot.eyebrow")}
            </p>
            <h2 className="mt-3 text-balance text-3xl font-bold leading-tight sm:text-5xl">
              {t("pilot.title")}
            </h2>
            <p className="mt-5 max-w-lg text-foreground/70">
              {t("pilot.body")}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border">
              {stats.map((s) => (
                <div key={s.l} className="bg-background p-5">
                  <div className="font-display text-3xl font-bold text-primary">{s.v}</div>
                  <p className="mt-1 text-xs text-muted-foreground">{s.l}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button variant="default" size="lg">
                {t("pilot.cta")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
