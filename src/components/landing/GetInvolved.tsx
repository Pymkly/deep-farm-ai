import { HandHeart, GitBranch, Plug, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { useI18n } from "@/lib/i18n";

export function GetInvolved() {
  const { t } = useI18n();
  const items = [
    {
      icon: HandHeart,
      audience: t("getInvolved.ngo.audience"),
      title: t("getInvolved.ngo.title"),
      desc: t("getInvolved.ngo.desc"),
      cta: t("getInvolved.ngo.cta"),
      href: "#contact",
    },
    {
      icon: GitBranch,
      audience: t("getInvolved.researcher.audience"),
      title: t("getInvolved.researcher.title"),
      desc: t("getInvolved.researcher.desc"),
      cta: t("getInvolved.researcher.cta"),
      href: "https://github.com",
    },
    {
      icon: Plug,
      audience: t("getInvolved.institution.audience"),
      title: t("getInvolved.institution.title"),
      desc: t("getInvolved.institution.desc"),
      cta: t("getInvolved.institution.cta"),
      href: "#",
    },
  ];

  return (
    <section id="news" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-earth">{t("getInvolved.eyebrow")}</p>
            <h2 className="mt-3 text-balance text-3xl font-bold leading-tight sm:text-5xl">
              {t("getInvolved.title")}
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.1}>
              <a
                href={it.href}
                className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary">
                  <it.icon className="h-5 w-5" />
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-earth">
                  {it.audience}
                </p>
                <h3 className="mt-2 text-xl font-bold tracking-tight">{it.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">{it.desc}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  {it.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
