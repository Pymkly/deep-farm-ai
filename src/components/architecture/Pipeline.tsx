import { ArrowRight, Cpu, Database, Brain, Smartphone } from "lucide-react";
import { Reveal } from "@/components/landing/Reveal";
import { useI18n } from "@/lib/i18n";

export function Pipeline() {
  const { t } = useI18n();

  const layers = [
    {
      label: t("arch.layer.iot"),
      icon: Cpu,
      accent: "primary" as const,
      items: [
        t("arch.layer.iot.1"),
        t("arch.layer.iot.2"),
        t("arch.layer.iot.3"),
        t("arch.layer.iot.4"),
      ],
    },
    {
      label: t("arch.layer.backend"),
      icon: Database,
      accent: "sky" as const,
      items: [
        t("arch.layer.backend.1"),
        t("arch.layer.backend.2"),
        t("arch.layer.backend.3"),
        t("arch.layer.backend.4"),
      ],
    },
    {
      label: t("arch.layer.ai"),
      icon: Brain,
      accent: "primary" as const,
      items: [
        t("arch.layer.ai.1"),
        t("arch.layer.ai.2"),
        t("arch.layer.ai.3"),
        t("arch.layer.ai.4"),
      ],
    },
    {
      label: t("arch.layer.ui"),
      icon: Smartphone,
      accent: "sky" as const,
      items: [
        t("arch.layer.ui.1"),
        t("arch.layer.ui.2"),
        t("arch.layer.ui.3"),
        t("arch.layer.ui.4"),
      ],
    },
  ];

  return (
    <section className="bg-ink py-24 text-ink-foreground sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-primary">
            {t("arch.pipeline.eyebrow")}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {t("arch.pipeline.title")}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 grid gap-4 lg:grid-cols-4">
            {layers.map((layer, i, arr) => {
              const Icon = layer.icon;
              const isPrimary = layer.accent === "primary";
              return (
                <div key={layer.label} className="relative">
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-white/[0.05] hover:shadow-xl hover:shadow-primary/10">
                    <div
                      className={`grid h-10 w-10 place-items-center rounded-lg ${
                        isPrimary
                          ? "bg-primary/15 text-primary"
                          : "bg-sky/15 text-sky"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
                      {`0${i + 1} · ${layer.label}`}
                    </p>
                    <ul className="mt-3 space-y-1.5 text-sm text-white/85">
                      {layer.items.map((it) => (
                        <li key={it} className="flex items-start gap-2">
                          <span
                            className={`mt-2 h-1 w-1 shrink-0 rounded-full ${
                              isPrimary ? "bg-primary" : "bg-sky"
                            }`}
                          />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {i < arr.length - 1 && (
                    <ArrowRight
                      aria-hidden="true"
                      className="absolute right-[-14px] top-1/2 hidden h-5 w-5 -translate-y-1/2 text-white/30 lg:block"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <pre className="mt-12 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur text-[12px] leading-relaxed text-white/80 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-white/[0.05] hover:shadow-xl hover:shadow-primary/10 sm:text-sm">
            <code>{`Field sensors  →  Raspberry Pi  →  FastAPI  →  MongoDB / Milvus / PostgreSQL
                                            │
                                            ▼
                                    LangGraph supervisor
                          ┌─────────┬──────────┬──────────┐
                          ▼         ▼          ▼          ▼
                     Document    Image    Time series   Weather
                          └─────────┴──────────┴──────────┘
                                            │
                                            ▼
                                       DeepSeek LLM
                                            │
                                            ▼
                            Mobile app  ◀── MCP ──▶  Web platform`}</code>
          </pre>
        </Reveal>
      </div>
    </section>
  );
}
