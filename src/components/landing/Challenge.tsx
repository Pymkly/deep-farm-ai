import { Reveal } from "./Reveal";
import farmer from "@/assets/farmer-phone.jpg";
import { useI18n } from "@/lib/i18n";

export function Challenge() {
  const { t } = useI18n();
  return (
    <section id="project" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 lg:items-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-earth">{t("challenge.eyebrow")}</p>
            <h2 className="mt-3 text-balance text-3xl font-bold leading-tight sm:text-5xl">
              {t("challenge.title")}
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground/75 sm:text-lg">
              <p>
                {t("challenge.p1.before")}
                <strong className="text-foreground">{t("challenge.p1.bold")}</strong>
                {t("challenge.p1.after")}
              </p>
              <p>
                {t("challenge.p2.before")}
                <strong className="text-foreground">{t("challenge.p2.bold")}</strong>
                {t("challenge.p2.after")}
              </p>
              <p>
                {t("challenge.p3.before")}
                <strong className="text-foreground">{t("challenge.p3.bold")}</strong>
                {t("challenge.p3.after")}
              </p>
            </div>

            <div className="mt-10 rounded-2xl border-l-4 border-earth bg-earth/5 p-6">
              <p className="font-serif text-xl italic leading-snug text-foreground sm:text-2xl">
                {t("challenge.quote")}
              </p>
              <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{t("challenge.quoteSource")}</p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-primary/10 blur-2xl" />
              <div className="overflow-hidden rounded-2xl shadow-2xl shadow-primary/10">
                <img
                  src={farmer}
                  alt={t("challenge.imageAlt")}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-border bg-background p-4 shadow-xl sm:block">
                <div className="text-3xl font-bold text-primary">2.8 <span className="text-base text-muted-foreground">t/ha</span></div>
                <p className="text-xs text-muted-foreground">{t("challenge.statLabel")}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
