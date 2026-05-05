import { Reveal } from "@/components/landing/Reveal";
import { useI18n } from "@/lib/i18n";

export function Decisions() {
  const { t } = useI18n();

  const decisions = [
    { q: t("arch.decision.cnn.q"), a: t("arch.decision.cnn.a") },
    { q: t("arch.decision.langgraph.q"), a: t("arch.decision.langgraph.a") },
    { q: t("arch.decision.milvus.q"), a: t("arch.decision.milvus.a") },
    { q: t("arch.decision.deepseek.q"), a: t("arch.decision.deepseek.a") },
    { q: t("arch.decision.mcp.q"), a: t("arch.decision.mcp.a") },
  ];

  return (
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
  );
}
