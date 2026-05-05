import { useEffect, useState } from "react";
import { Menu, X, Sprout } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useI18n, type Locale } from "@/lib/i18n";
import { navByPath, defaultNavLinks } from "@/config/nav";

export function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const links = navByPath[location.pathname] ?? defaultNavLinks;
  // On non-home pages, always render the opaque/dark-text style.
  const [scrolled, setScrolled] = useState(!isHome);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { locale, setLocale, t } = useI18n();

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-[0_1px_0_rgba(0,0,0,0.02)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className={`flex items-center gap-2 px-4 font-display font-bold transition-colors ${
            scrolled ? "text-primary" : "text-white"
          }`}
        >
          <span className="grid h-6 w-6 place-items-center rounded-md bg-primary text-primary-foreground">
            <Sprout className="h-3 w-3" />
          </span>
          <span className="text-base tracking-tight">Deep Farm</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.hash}
              href={`#${l.hash}`}
              className={`text-sm font-medium transition-colors ${
                scrolled
                  ? "text-foreground/70 hover:text-primary"
                  : "text-white/85 hover:text-white"
              }`}
            >
              {t(l.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div
            className={`hidden sm:flex items-center rounded-full border p-0.5 text-xs font-semibold transition-colors ${
              scrolled
                ? "border-border bg-background/60"
                : "border-white/30 bg-white/10 backdrop-blur"
            }`}
          >
            {(["en", "fr"] as Locale[]).map((l) => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className={`rounded-full px-2.5 py-1 transition-colors ${
                  locale === l
                    ? "bg-primary text-primary-foreground"
                    : scrolled
                      ? "text-muted-foreground hover:text-foreground"
                      : "text-white/80 hover:text-white"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <Button
            asChild
            size="sm"
            variant="outline"
            className={`hidden sm:inline-flex ${
              scrolled
                ? ""
                : "border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:text-white"
            }`}
          >
            <Link to="/login">{t("header.signin")}</Link>
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/" hash="contact">{t("nav.contact")}</Link>
          </Button>
          <button
            className={`lg:hidden p-2 transition-colors ${
              scrolled ? "text-foreground" : "text-white"
            }`}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="flex flex-col px-4 py-3">
            {links.map((l) => (
              <a
                key={l.hash}
                href={`#${l.hash}`}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 text-sm font-medium text-foreground/80"
              >
                {t(l.key)}
              </a>
            ))}
            <Button asChild variant="outline" className="mt-2">
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                {t("header.signin")}
              </Link>
            </Button>
            <Button asChild className="mt-2">
              <Link to="/" hash="contact" onClick={() => setMobileOpen(false)}>
                {t("nav.contact")}
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
