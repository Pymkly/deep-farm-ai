import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function EventCard() {
  const { t } = useI18n();

  return (
    <a
      href="#ioai"
      aria-label={t("announcement.text")}
      className="group pointer-events-auto ml-auto flex max-w-[300px] items-start gap-3 rounded-2xl border border-primary/30 bg-primary/15 p-4 text-white shadow-xl shadow-primary/20 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/25 hover:shadow-primary/30"
    >
      <span className="relative mt-1 flex h-2.5 w-2.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
          {t("announcement.eyebrow")}
        </p>
        <p className="mt-0.5 text-sm font-semibold leading-snug">
          {t("announcement.boldFragment")}
        </p>
        <p className="mt-0.5 text-xs text-white/70">
          {t("announcement.date")}
        </p>
      </div>
      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-white/60 transition-transform group-hover:translate-x-0.5 group-hover:text-white" />
    </a>
  );
}
