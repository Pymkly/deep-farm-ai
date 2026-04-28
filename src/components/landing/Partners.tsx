import { Reveal } from "./Reveal";

// TODO: Replace these placeholder logos with real logo image files.
// To swap a placeholder for a real logo, replace the rendered <span> inside
// the <a> below with an <img src={...} alt={p.name} /> tag.
export const partners = [
  { name: "ESTIA", url: "https://www.estia.fr" },
  { name: "IT University", url: "https://ituniversity.mg" },
  { name: "UNIVA", url: "https://www.univa.mg" },
  { name: "ANAE", url: "https://www.anae.mg" },
  { name: "AFRIA", url: "https://afria-ai.org" },
  { name: "Erasmus+", url: "https://erasmus-plus.ec.europa.eu" },
  { name: "Univ. Antananarivo", url: "https://www.univ-antananarivo.mg" },
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
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
            {partners.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.name} (opens in new tab)`}
                title={p.name}
                /* PLACEHOLDER LOGO — replace the inner <svg> block with <img src="/logos/xxx.svg" alt={p.name} /> */
                data-logo-placeholder={p.name}
                className="group relative grid h-20 place-items-center overflow-hidden rounded-xl border border-dashed border-border bg-background px-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md"
              >
                <svg
                  viewBox="0 0 120 48"
                  className="h-10 w-auto text-muted-foreground/40 transition-colors group-hover:text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  aria-hidden="true"
                >
                  <rect x="1" y="1" width="118" height="46" rx="6" />
                  <line x1="1" y1="1" x2="119" y2="47" />
                  <line x1="119" y1="1" x2="1" y2="47" />
                </svg>
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded bg-background/80 px-1.5 text-[9px] font-medium uppercase tracking-wider text-muted-foreground/60">
                  Logo
                </span>
              </a>
            ))}
          </div>
          <p className="mt-4 text-center text-[11px] uppercase tracking-wider text-muted-foreground/50">
            Logo placeholders — replace with official artwork
          </p>
        </Reveal>
      </div>
    </section>
  );
}
