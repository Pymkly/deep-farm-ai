import { Reveal } from "./Reveal";

const partners = [
  "ESTIA",
  "IT University",
  "UNIVA",
  "ANAE",
  "AFRIA",
  "Erasmus+",
  "Univ. Antananarivo",
];

export function Partners() {
  return (
    <section id="team" className="border-y border-border bg-secondary/40 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Backed by leading institutions
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-7">
            {partners.map((p) => (
              <div
                key={p}
                className="grid h-20 place-items-center bg-background px-4 text-center"
              >
                <span className="font-display text-sm font-bold tracking-tight text-muted-foreground/60 transition-colors hover:text-primary sm:text-base">
                  {p}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
