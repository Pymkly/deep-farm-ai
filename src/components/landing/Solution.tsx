import { Sun, BrainCircuit, Smartphone } from "lucide-react";
import { Reveal } from "./Reveal";

const pillars = [
  {
    icon: Sun,
    title: "Solar IoT Stations",
    points: [
      "12 autonomous solar stations",
      "68-day battery life",
      "NPK + water + climate sensors",
      "~80€ per family",
    ],
  },
  {
    icon: BrainCircuit,
    title: "Agentic AI Tutor",
    points: [
      "4 specialized agents (Document, Image, Time Series, Weather)",
      "LangGraph orchestration",
      "RAG on 42,000 ANAE pages",
      "Open-source LLM",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    points: [
      "Photo → diagnosis in <1 minute",
      "94% accuracy",
      "Sources cited from local documents",
      "Offline-first design",
    ],
  },
];

export function Solution() {
  return (
    <section id="how" className="relative bg-primary-soft/40 py-24 sm:py-32">
      <div className="absolute inset-0 ring-grid opacity-50 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]" />
      <div className="relative mx-auto max-w-7xl px-4">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-earth">Our Solution</p>
            <h2 className="mt-3 text-balance text-3xl font-bold leading-tight sm:text-5xl">
              Three layers, one digital tutor in every farmer's pocket.
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="group relative h-full rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:scale-110">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-bold tracking-tight">{p.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5 text-sm text-foreground/75">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
