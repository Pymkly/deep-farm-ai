import { HandHeart, GitBranch, Plug, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

const items = [
  {
    icon: HandHeart,
    audience: "For NGOs & funders",
    title: "Support a regional deployment",
    desc: "Partner with us to bring Deep Farm to a new region. Every 80€ equips one family for a full season.",
    cta: "Get in touch",
    href: "#contact",
  },
  {
    icon: GitBranch,
    audience: "For researchers",
    title: "Collaborate or fork on GitHub",
    desc: "MIT licensed. Reproduce our experiments, contribute agents, or extend RAG to other crops.",
    cta: "View repository",
    href: "https://github.com",
  },
  {
    icon: Plug,
    audience: "For institutions",
    title: "Integrate Deep Farm via MCP",
    desc: "Plug our agentic tutor into your existing extension services using the Model Context Protocol.",
    cta: "Read documentation",
    href: "#",
  },
];

export function GetInvolved() {
  return (
    <section id="news" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-earth">Get involved</p>
            <h2 className="mt-3 text-balance text-3xl font-bold leading-tight sm:text-5xl">
              Three ways to grow this with us.
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
