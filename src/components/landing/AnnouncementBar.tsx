import { useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  const { t } = useI18n();
  if (!open) return null;

  const fullText = t("announcement.text");
  const bold = t("announcement.boldFragment");
  const [before, after] = fullText.includes(bold)
    ? fullText.split(bold)
    : [fullText, ""];

  return (
    <div className="relative z-50 bg-ink text-ink-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 text-xs sm:text-sm">
        <div className="flex flex-1 items-center gap-2 truncate">
          <span className="hidden sm:inline-flex h-1.5 w-1.5 rounded-full bg-earth animate-pulse" />
          <span className="truncate">
            {before}
            <strong className="font-semibold">{bold}</strong>
            {after}
          </span>
          <a href="#ioai" className="hidden sm:inline-flex shrink-0 items-center gap-1 underline underline-offset-4 hover:text-earth">
            {t("announcement.learnMore")} <ArrowRight className="h-3 w-3" />
          </a>
        </div>
        <button
          onClick={() => setOpen(false)}
          aria-label={t("announcement.dismiss")}
          className="rounded p-1 hover:bg-white/10"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
