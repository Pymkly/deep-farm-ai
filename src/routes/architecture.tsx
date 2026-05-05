import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Github,
  Mail,
  FileText,
  Image as ImageIcon,
  LineChart,
  CloudSun,
  ArrowRight,
  Cpu,
  Database,
  Brain,
  Smartphone,
} from "lucide-react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Reveal } from "@/components/landing/Reveal";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/architecture")({
  head: () => ({
    meta: [
      { title: "How Deep Farm works — Architecture" },
      {
        name: "description",
        content:
          "Inside Deep Farm: solar IoT, vector search, LangGraph multi-agent AI, and an open-source stack delivering rice-farming advice in under a minute.",
      },
      {
        property: "og:title",
        content: "How Deep Farm works — Architecture",
      },
      {
        property: "og:description",
        content:
          "Solar IoT, vector search, and Agentic AI — the full Deep Farm technical stack, fully open-source under MIT.",
      },
    ],
  }),
  component: ArchitecturePage,
});

function ArchitecturePage() {
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

  const decisions = [
    { q: t("arch.decision.cnn.q"), a: t("arch.decision.cnn.a") },
    { q: t("arch.decision.langgraph.q"), a: t("arch.decision.langgraph.a") },
    { q: t("arch.decision.milvus.q"), a: t("arch.decision.milvus.a") },
    { q: t("arch.decision.deepseek.q"), a: t("arch.decision.deepseek.a") },
    { q: t("arch.decision.mcp.q"), a: t("arch.decision.mcp.a") },
  ];

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
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

        {/* Architecture diagram */}
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

        {/* Agents */}
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

        {/* Why these technology choices */}
        <section className="border-y border-border bg-secondary/40 py-24 sm:py-32">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.2em] text-sky">
                {t("arch.decisions.eyebrow")}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {t("arch.decisions.title")}
              </h2>
            </Reveal>
            <div className="mt-12 divide-y divide-border rounded-2xl border border-border bg-card">
              {decisions.map((d, i) => (
                <Reveal key={d.q} delay={0.04 * i}>
                  <div className="p-6 sm:p-8">
                    <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                      {d.q}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {d.a}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Open source */}
        <section className="bg-background py-24 sm:py-32">
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

        {/* Final CTA */}
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
      </main>
      <Footer />
    </>
  );
}
