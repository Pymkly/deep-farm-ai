import { Github, Linkedin, Twitter, Mail, Sprout } from "lucide-react";
import { useI18n, type Locale } from "@/lib/i18n";

const sections = [
  ["The Project", "How It Works", "Impact", "Science & Tech", "Team", "News"],
  ["GitHub", "Documentation", "Research papers", "Press kit", "Contact"],
];

export function Footer() {
  const { locale, setLocale } = useI18n();
  return (
    <footer id="contact" className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid gap-12 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 font-display font-bold">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
                <Sprout className="h-4 w-4" />
              </span>
              <span className="text-xl tracking-tight">Deep Farm</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
              Open-source, multi-agent digital tutor for Malagasy rice farmers. Built with
              ESTIA, IT University, UNIVA and ANAE — funded by Erasmus+.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[
                { Icon: Github, label: "GitHub", href: "https://github.com" },
                { Icon: Linkedin, label: "LinkedIn", href: "#" },
                { Icon: Twitter, label: "X", href: "#" },
                { Icon: Mail, label: "Email", href: "mailto:hello@deepfarm.org" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-md border border-white/10 text-white/70 transition-colors hover:border-white/30 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 lg:col-span-2 lg:grid-cols-3">
            <FooterCol title="Explore" items={sections[0]} />
            <FooterCol title="Resources" items={sections[1]} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Contact</p>
              <ul className="mt-5 space-y-3 text-sm text-white/70">
                <li>hello@deepfarm.org</li>
                <li>ESTIA Bidart, France</li>
                <li>IT University, Antananarivo</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="grid h-10 w-14 shrink-0 place-items-center rounded bg-[#003399] text-[10px] font-bold text-yellow-400">
                ★ EU
              </div>
              <p className="max-w-xl text-xs leading-relaxed text-white/55">
                Co-funded by the European Union — Erasmus+ project #101128032. The views and
                opinions expressed are however those of the author(s) only and do not
                necessarily reflect those of the European Union.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-white/55">
              <span>© {new Date().getFullYear()} Deep Farm</span>
              <a href="#" className="hover:text-white">Legal</a>
              <a href="#" className="hover:text-white">Privacy</a>
              <div className="flex items-center rounded-full border border-white/15 p-0.5">
                {(["en", "fr"] as Locale[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLocale(l)}
                    className={`rounded-full px-2.5 py-0.5 font-semibold ${
                      locale === l ? "bg-white text-ink" : "text-white/60"
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-white/50">{title}</p>
      <ul className="mt-5 space-y-3 text-sm">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="text-white/70 hover:text-white">
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
