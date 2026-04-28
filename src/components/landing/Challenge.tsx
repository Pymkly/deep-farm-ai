import { Reveal } from "./Reveal";
import farmer from "@/assets/farmer-phone.jpg";

export function Challenge() {
  return (
    <section id="project" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 lg:items-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-earth">The Challenge</p>
            <h2 className="mt-3 text-balance text-3xl font-bold leading-tight sm:text-5xl">
              Madagascar, once self-sufficient, now imports rice.
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground/75 sm:text-lg">
              <p>
                Rice represents <strong className="text-foreground">43% of agricultural value added</strong> and is
                eaten at every meal — yet the country imports hundreds of thousands of tons each year to meet demand.
              </p>
              <p>
                National yields stagnate at <strong className="text-foreground">2.8 t/ha</strong>, more than two times
                lower than comparable Asian basins (~6 t/ha), despite identical agro-climatic potential.
              </p>
              <p>
                Decades of <strong className="text-foreground">ANAE expert knowledge</strong> remain locked in PDF
                reports that never reach the farmer holding the spraying decision in their hand.
              </p>
            </div>

            <div className="mt-10 rounded-2xl border-l-4 border-earth bg-earth/5 p-6">
              <p className="font-serif text-xl italic leading-snug text-foreground sm:text-2xl">
                “30% of rice losses in sub-Saharan Africa are due to diseases and environmental stress.”
              </p>
              <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">FAO · 2023</p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-primary/10 blur-2xl" />
              <div className="overflow-hidden rounded-2xl shadow-2xl shadow-primary/10">
                <img
                  src={farmer}
                  alt="A Malagasy rice farmer in his paddy holding a smartphone"
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-border bg-background p-4 shadow-xl sm:block">
                <div className="text-3xl font-bold text-primary">2.8 <span className="text-base text-muted-foreground">t/ha</span></div>
                <p className="text-xs text-muted-foreground">National rice yield</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
