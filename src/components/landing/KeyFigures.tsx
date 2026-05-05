import { Counter } from "./Counter";
import { Reveal } from "./Reveal";
import { useI18n } from "@/lib/i18n";
import { figures } from "@/config/figures";

export function KeyFigures() {
  const { locale, t } = useI18n();

  return (
    <section id="impact" className="bg-ink py-20 text-ink-foreground sm:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <div className="mb-14 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-earth">{t("figures.eyebrow")}</p>
              <h2 className="mt-2 text-balance text-3xl font-bold sm:text-5xl">
                {t("figures.title")}
              </h2>
            </div>
            <p className="max-w-md text-sm text-white/60">
              {t("figures.intro")}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-5">
          {figures.map((f, i) => (
            <Reveal key={f.label.en} delay={i * 0.07} className="bg-ink">
              <div className="h-full p-6 sm:p-8">
                <div className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                  <Counter to={f.value} suffix={f.suffix} />
                </div>
                <p className="mt-3 text-sm leading-snug text-white/65">{f.label[locale]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
