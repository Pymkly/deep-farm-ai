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
import { I18nProvider } from "@/lib/i18n";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Reveal } from "@/components/landing/Reveal";
import { Button } from "@/components/ui/button";

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

const agents = [
  {
    icon: FileText,
    name: "Document Agent",
    detail:
      "RAG over 42,000 ANAE pages using nomic-embed-text-v1.5 embeddings.",
    accent: "primary" as const,
  },
  {
    icon: ImageIcon,
    name: "Image Agent",
    detail:
      "Vector similarity search using nomic-embed-vision-v1.5 (94% accuracy on rice diseases).",
    accent: "sky" as const,
  },
  {
    icon: LineChart,
    name: "Time Series Agent",
    detail: "Analyzes sensor data from MongoDB time-series collections.",
    accent: "sky" as const,
  },
  {
    icon: CloudSun,
    name: "Weather Agent",
    detail: "Connects to OpenMeteo API for forecasts.",
    accent: "primary" as const,
  },
];

const decisions = [
  {
    q: "Why vector search over CNN classification?",
    a: "A fine-tuned CNN locks the model into a closed set of classes and demands re-training every time a new disease appears. Vector similarity over an embeddings index lets us add new reference images on the fly, return ranked similar cases, and explain results — closer to how an agronomist actually reasons.",
  },
  {
    q: "Why LangGraph for orchestration?",
    a: "Farming questions rarely fit a single tool. LangGraph models the supervisor + specialist agents as a typed state graph, with explicit routing, retries, and observability. It is production-grade where ad-hoc chains break.",
  },
  {
    q: "Why Milvus as vector DB?",
    a: "Milvus scales horizontally, supports hybrid (dense + sparse) search, and runs fine on a single modest VM for the pilot — then clusters when we onboard more cooperatives. Open-source and battle-tested.",
  },
  {
    q: "Why DeepSeek as LLM?",
    a: "DeepSeek delivers GPT-4-class reasoning at a fraction of the cost, with permissive licensing. Critical when you serve smallholder farmers and every query has to stay under a few cents.",
  },
  {
    q: "Why MCP for interoperability?",
    a: "The Model Context Protocol exposes Deep Farm's agents as standard tools. Any MCP-compatible client — mobile app, web platform, future partner integrations — talks to the same backend without bespoke glue code.",
  },
];

function ArchitecturePage() {
  return (
    <I18nProvider>
      <Header />
      <main>
        {/* Hero */}
        <section className="border-b border-border bg-background">
          <div className="mx-auto max-w-4xl px-6 pb-16 pt-32 sm:pt-40">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" /> Back to home
            </Link>
            <p className="mt-10 text-xs uppercase tracking-[0.2em] text-sky">
              Technical deep-dive
            </p>
            <h1 className="mt-3 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              How Deep Farm works — Architecture
            </h1>
            <p className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
              Deep Farm combines solar-powered IoT, vector search, and a
              multi-agent AI system to deliver personalized rice-farming advice
              in under one minute. Here&apos;s how the pieces fit together.
            </p>
          </div>
        </section>

        {/* Architecture diagram */}
        <section className="bg-ink py-24 text-ink-foreground sm:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.2em] text-primary">
                The full picture
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Four layers, one pipeline
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-12 grid gap-4 lg:grid-cols-4">
                {[
                  {
                    label: "IoT layer",
                    icon: Cpu,
                    accent: "primary",
                    items: [
                      "Solar stations",
                      "Arduino Mega",
                      "ESP-01S Wi-Fi",
                      "Raspberry Pi hub",
                    ],
                  },
                  {
                    label: "Backend layer",
                    icon: Database,
                    accent: "sky",
                    items: [
                      "FastAPI gateway",
                      "MongoDB time-series",
                      "Milvus vectors",
                      "PostgreSQL metadata",
                    ],
                  },
                  {
                    label: "AI layer",
                    icon: Brain,
                    accent: "primary",
                    items: [
                      "LangGraph supervisor",
                      "4 specialist agents",
                      "DeepSeek LLM",
                      "Tool routing & retries",
                    ],
                  },
                  {
                    label: "Interface layer",
                    icon: Smartphone,
                    accent: "sky",
                    items: [
                      "Mobile app (offline-first)",
                      "Web platform",
                      "MCP protocol",
                      "Cooperative dashboards",
                    ],
                  },
                ].map((layer, i, arr) => {
                  const Icon = layer.icon;
                  const isPrimary = layer.accent === "primary";
                  return (
                    <div key={layer.label} className="relative">
                      <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
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
              <pre className="mt-12 overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-5 text-[12px] leading-relaxed text-white/80 sm:text-sm">
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
                The crew
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                The four agents
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {agents.map((a, i) => {
                const Icon = a.icon;
                const isPrimary = a.accent === "primary";
                return (
                  <Reveal key={a.name} delay={0.05 * i}>
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
                Trade-offs
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Why these technology choices?
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
                Built in the open
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Open-source &amp; reproducible
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-sky">
                    License
                  </p>
                  <p className="mt-3 font-display text-2xl font-bold tracking-tight">
                    MIT
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Fully open-source. Fork it, ship it, adapt it to your
                    cooperative.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Operating cost
                  </p>
                  <p className="mt-3 font-display text-2xl font-bold tracking-tight">
                    &lt; $20 / month
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Less than $20 per month to run the full platform for 100
                    farms.
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
                    Browse the code on GitHub
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
                Want to fork it or collaborate?
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mx-auto mt-5 max-w-xl text-balance text-lg text-white/70">
                Deep Farm is built with and for the agricultural community.
                Researchers, engineers, NGOs and cooperatives are all welcome.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="xl">
                  <a
                    href="https://github.com/deep-farm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                </Button>
                <Button asChild variant="outline" size="xl" className="border-white/30 bg-white/5 text-white hover:bg-white hover:text-ink">
                  <Link to="/" hash="contact">
                    <Mail className="h-4 w-4" />
                    Contact us
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </I18nProvider>
  );
}
