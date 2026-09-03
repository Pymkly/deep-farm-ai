import { createFileRoute, Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

import { AppSidebar } from "@/components/backoffice/AppSidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { titreParChemin } from "@/config/backoffice";
import { useAuth } from "@/lib/auth";
import { useI18n, type Locale } from "@/lib/i18n";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [{ title: "Deep Farm — Workspace" }, { name: "robots", content: "noindex" }],
  }),
  component: AppLayout,
});

function AppLayout() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const { statut, utilisateur, deconnexion } = useAuth();

  // The token lives in localStorage, so the guard can only run on the client:
  // during SSR the session is always "chargement".
  useEffect(() => {
    if (statut === "anonyme") {
      navigate({
        to: "/login",
        search: { redirect: location.pathname },
        replace: true,
      });
    }
  }, [statut, location.pathname, navigate]);

  if (statut !== "connecte" || !utilisateur) {
    return (
      <div className="grid min-h-svh place-items-center bg-background">
        <p className="text-sm text-muted-foreground">{t("account.loading")}</p>
      </div>
    );
  }

  const titre = titreParChemin[location.pathname];

  return (
    <SidebarProvider className="h-svh">
      <AppSidebar utilisateur={utilisateur} onDeconnexion={deconnexion} />

      <SidebarInset className="min-w-0 overflow-hidden">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-1 h-4" />
          <h1 className="truncate font-display text-sm font-semibold tracking-tight">
            {titre ? t(titre) : t("app.shell.label")}
          </h1>
          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              {/* The label collapses on narrow screens; the arrow carries it. */}
              <Link to="/" aria-label={t("app.nav.site")} title={t("app.nav.site")}>
                <ArrowLeft className="size-4 sm:mr-2" />
                <span className="hidden sm:inline">{t("app.nav.site")}</span>
              </Link>
            </Button>
            <BasculeLangue />
          </div>
        </header>

        {/* min-h-0 so a scrolling child (the chat thread) stays inside the
            viewport instead of pushing the page height. */}
        <div className="min-h-0 flex-1">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

function BasculeLangue() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center rounded-full border border-border p-0.5 text-xs font-semibold">
      {(["en", "fr"] as Locale[]).map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={`rounded-full px-2.5 py-1 transition-colors ${
            locale === l
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
