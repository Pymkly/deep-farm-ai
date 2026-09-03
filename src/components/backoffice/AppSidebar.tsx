import { Link, useLocation } from "@tanstack/react-router";
import { ChevronsUpDown, LogOut, Sprout, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { groupesApp } from "@/config/backoffice";
import type { Utilisateur } from "@/lib/api";
import { useI18n } from "@/lib/i18n";

/** Two letters at most: a photo-less avatar still needs to be recognisable. */
function initiales(nom: string) {
  const mots = nom.trim().split(/\s+/).filter(Boolean);
  if (mots.length === 0) return "?";
  if (mots.length === 1) return mots[0].slice(0, 2).toUpperCase();
  return (mots[0][0] + mots[mots.length - 1][0]).toUpperCase();
}

export function AppSidebar({
  utilisateur,
  onDeconnexion,
}: {
  utilisateur: Utilisateur;
  onDeconnexion: () => void;
}) {
  const { t } = useI18n();
  const location = useLocation();
  const { isMobile, setOpenMobile } = useSidebar();

  // On mobile the sidebar is a sheet: navigating has to close it.
  const fermerSiMobile = () => {
    if (isMobile) setOpenMobile(false);
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" className="hover:bg-transparent">
              <Link to="/app/chat" onClick={fermerSiMobile}>
                <span className="grid aspect-square size-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
                  <Sprout className="size-4" />
                </span>
                <span className="grid flex-1 text-left leading-tight">
                  <span className="truncate font-display text-sm font-bold tracking-tight">
                    Deep Farm
                  </span>
                  <span className="truncate text-xs text-sidebar-foreground/60">
                    {t("app.shell.label")}
                  </span>
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {groupesApp.map((groupe) => (
          <SidebarGroup key={groupe.key}>
            <SidebarGroupLabel className="uppercase tracking-wider">
              {t(groupe.key)}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {groupe.liens?.map((lien) => (
                  <SidebarMenuItem key={lien.key}>
                    <SidebarMenuButton
                      asChild
                      tooltip={t(lien.key)}
                      isActive={location.pathname === lien.to}
                    >
                      <Link to={lien.to} onClick={fermerSiMobile}>
                        <lien.icon />
                        <span>{t(lien.key)}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

                {groupe.bientot?.map((lien) => (
                  <SidebarMenuItem key={lien.key}>
                    <SidebarMenuButton
                      aria-disabled
                      tooltip={`${t(lien.key)} — ${t("app.nav.soon")}`}
                      className="cursor-default opacity-50"
                    >
                      <lien.icon />
                      <span>{t(lien.key)}</span>
                      <span className="ml-auto rounded-full border border-sidebar-border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider group-data-[collapsible=icon]:hidden">
                        {t("app.nav.soon")}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <span className="grid aspect-square size-8 shrink-0 place-items-center rounded-lg bg-primary-soft text-xs font-semibold text-foreground">
                    {initiales(utilisateur.nom_complet)}
                  </span>
                  <span className="grid flex-1 text-left leading-tight">
                    <span className="truncate text-sm font-medium">{utilisateur.nom_complet}</span>
                    <span className="truncate text-xs text-sidebar-foreground/60">
                      {utilisateur.email}
                    </span>
                  </span>
                  <ChevronsUpDown className="ml-auto size-4 opacity-60" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={8}
                className="w-56"
              >
                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                  {t(`account.role.${utilisateur.role}`)}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/app/account" onClick={fermerSiMobile}>
                    <User className="mr-2 size-4" />
                    {t("app.nav.account")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onDeconnexion} className="text-destructive">
                  <LogOut className="mr-2 size-4" />
                  {t("account.signout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
