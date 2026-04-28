import { Reveal } from "./Reveal";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import afria from "@/assets/partners/afria.jpg";
import anae from "@/assets/partners/anae.jpg";
import erasmus from "@/assets/partners/erasmus.jpg";
import estia from "@/assets/partners/estia.jpg";
import ituniversity from "@/assets/partners/ituniversity.jpg";
import univAntananarivo from "@/assets/partners/univ-antananarivo.jpg";
import univa from "@/assets/partners/univa.jpg";

type Partner = {
  name: string;
  url: string;
  logo?: string;
};

export const partners: Partner[] = [
  { name: "ESTIA", url: "https://www.estia.fr", logo: estia },
  { name: "IT University", url: "https://ituniversity.mg", logo: ituniversity },
  { name: "UNIVA", url: "https://www.univa.mg", logo: univa },
  { name: "ANAE", url: "https://www.anae.mg", logo: anae },
  { name: "AFRIA", url: "https://afria-ai.org", logo: afria },
  { name: "Erasmus+", url: "https://erasmus-plus.ec.europa.eu", logo: erasmus },
  { name: "Univ. Antananarivo", url: "https://www.univ-antananarivo.mg", logo: univAntananarivo },
];

export function Partners() {
  const { t } = useI18n();
  const hasMissingLogos = partners.some((p) => !p.logo);
  return (
    <section id="team" className="border-y border-border bg-secondary/40 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t("partners.eyebrow")}
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
                className={cn(
                  "group relative grid h-20 place-items-center overflow-hidden rounded-xl border bg-background px-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md",
                  p.logo ? "border-border" : "border-dashed border-border",
                )}
              >
                {p.logo ? (
                  <img
                    src={p.logo}
                    alt={p.name}
                    loading="lazy"
                    className="max-h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                  />
                ) : (
                  <>
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
                  </>
                )}
              </a>
            ))}
          </div>
          {hasMissingLogos && (
            <p className="mt-4 text-center text-[11px] uppercase tracking-wider text-muted-foreground/50">
              {t("partners.placeholderNotice")}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
