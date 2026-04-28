import { Camera, Sparkles, FileText, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export function Demo() {
  const { t } = useI18n();
  const agents = [
    t("demo.agent.document"),
    t("demo.agent.image"),
    t("demo.agent.timeSeries"),
    t("demo.agent.weather"),
  ];

  return (
    <section id="science" className="relative bg-ink py-24 text-white sm:py-32">
      <div className="absolute inset-0 grain opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-sky">{t("demo.eyebrow")}</p>
            <h2 className="mt-3 text-balance text-3xl font-bold leading-tight sm:text-5xl">
              {t("demo.title")}
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {/* Step 1 */}
          <Reveal delay={0}>
            <Step number="01" title={t("demo.step1.title")} icon={Camera}>
              <div className="mx-auto mt-4 w-44 rounded-[2rem] border-[10px] border-white/15 bg-gradient-to-b from-emerald-900 to-emerald-950 p-3 shadow-xl">
                <div className="aspect-[9/16] rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-950 p-3">
                  <div className="rounded-md bg-black/30 px-2 py-1 text-[10px] text-white/80">Deep Farm</div>
                  <div className="mt-3 grid h-24 place-items-center rounded-lg border-2 border-dashed border-white/30 text-white/60">
                    <Camera className="h-6 w-6" />
                  </div>
                  <p className="mt-3 text-center text-[10px] text-white/70">{t("demo.step1.scan")}</p>
                  <div className="mt-3 mx-auto h-7 w-7 rounded-full border-2 border-white" />
                </div>
              </div>
              <p className="mt-5 text-sm text-white/70">
                {t("demo.step1.body")}
              </p>
            </Step>
          </Reveal>

          {/* Step 2 */}
          <Reveal delay={0.12}>
            <Step number="02" title={t("demo.step2.title")} icon={Sparkles}>
              <div className="mt-4 space-y-2">
                {agents.map((a, i) => (
                  <motion.div
                    key={a}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.25 }}
                    className="flex items-center gap-3 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm"
                  >
                    <span className="h-2 w-2 rounded-full bg-sky animate-pulse" />
                    <span className="font-mono text-xs text-white/80">{a}</span>
                    <span className="ml-auto text-[10px] text-emerald-300">{t("demo.step2.active")}</span>
                  </motion.div>
                ))}
              </div>
              <p className="mt-5 text-sm text-white/70">
                {t("demo.step2.body")}
              </p>
            </Step>
          </Reveal>

          {/* Step 3 */}
          <Reveal delay={0.24}>
            <Step number="03" title={t("demo.step3.title")} icon={FileText}>
              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 text-xs text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  {t("demo.step3.confidence")}
                </div>
                <p className="mt-2 text-base font-semibold">{t("demo.step3.disease")}</p>
                <p className="mt-2 text-xs leading-relaxed text-white/70">
                  {t("demo.step3.recommendation")}
                </p>
                <div className="mt-3 flex items-center gap-2 rounded-md bg-sky/10 px-2 py-1.5 text-[10px] text-sky">
                  <FileText className="h-3 w-3" />
                  {t("demo.step3.source")}
                </div>
              </div>
              <p className="mt-5 text-sm text-white/70">
                {t("demo.step3.body")}
              </p>
            </Step>
          </Reveal>
        </div>

        <div className="mt-12 flex justify-center">
          <Button variant="heroGhost" size="lg">
            {t("demo.cta")}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function Step({
  number,
  title,
  icon: Icon,
  children,
}: {
  number: string;
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-white/40">{number}</span>
        <Icon className="h-4 w-4 text-sky" />
      </div>
      <h3 className="mt-2 text-xl font-bold">{title}</h3>
      {children}
    </div>
  );
}
