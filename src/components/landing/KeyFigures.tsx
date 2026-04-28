import { Counter } from "./Counter";
import { Reveal } from "./Reveal";

const figures = [
  { value: 94, suffix: "%", label: "Accuracy on disease detection" },
  { value: 87, suffix: "", label: "Farmers tested the system" },
  { value: 92, suffix: "%", label: "Satisfaction rate" },
  { value: 42000, suffix: "", label: "ANAE pages vectorized" },
  { value: 80, suffix: "€", label: "Total cost per family" },
];

export function KeyFigures() {
  return (
    <section id="impact" className="bg-ink py-20 text-ink-foreground sm:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <div className="mb-14 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-earth">By the numbers</p>
              <h2 className="mt-2 text-balance text-3xl font-bold sm:text-5xl">
                Tangible impact, measured in the field.
              </h2>
            </div>
            <p className="max-w-md text-sm text-white/60">
              Pilot results from 18 plots in Iarinarivo over the 2025 cropping season,
              independently verified with ANAE protocols.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-5">
          {figures.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.07} className="bg-ink">
              <div className="h-full p-6 sm:p-8">
                <div className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                  <Counter to={f.value} suffix={f.suffix} />
                </div>
                <p className="mt-3 text-sm leading-snug text-white/65">{f.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
