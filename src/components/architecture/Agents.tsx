import { FileText, Image as ImageIcon, LineChart, CloudSun } from "lucide-react";
import { Reveal } from "@/components/landing/Reveal";
import { useI18n } from "@/lib/i18n";

export function Agents() {
  const { t } = useI18n();

  const agents = [
    {
      icon: FileText,
      name: t("arch.agent.doc.name"),
      detail: t("arch.agent.doc.detail"),
      accent: "primary" as const,
    },
    {
      icon: ImageIcon,
      name: t("arch.agent.image.name"),
      detail: t("arch.agent.image.detail"),
      accent: "sky" as const,
    },
    {
      icon: LineChart,
      name: t("arch.agent.timeseries.name"),
      detail: t("arch.agent.timeseries.detail"),
      accent: "sky" as const,
    },
    {
      icon: CloudSun,
      name: t("arch.agent.weather.name"),
      detail: t("arch.agent.weather.detail"),
      accent: "primary" as const,
    },
  ];

  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-sky">
            {t("arch.agents.eyebrow")}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {t("arch.agents.title")}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {agents.map((a, i) => {
            const Icon = a.icon;
            const isPrimary = a.accent === "primary";
            return (
              <Reveal key={a.name} delay={0.05 * i}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
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
                    {a.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {a.detail}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
