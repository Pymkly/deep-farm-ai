import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { I18nProvider } from "@/lib/i18n";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/architecture")({
  head: () => ({
    meta: [
      { title: "Architecture — Deep Farm" },
      {
        name: "description",
        content:
          "Technical architecture of Deep Farm: solar IoT stations, edge computing on Raspberry Pi, and the multi-agent AI tutor.",
      },
      { property: "og:title", content: "Architecture — Deep Farm" },
      {
        property: "og:description",
        content:
          "How Deep Farm combines solar IoT and Agentic AI to support rice farmers in Madagascar.",
      },
    ],
  }),
  component: ArchitecturePage,
});

function ArchitecturePage() {
  return (
    <I18nProvider>
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-32">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
        <h1 className="mt-8 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Architecture
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Detailed technical documentation is on the way. This page will cover
          the full Deep Farm stack: solar IoT hardware, edge processing on
          Raspberry Pi, the LangGraph multi-agent orchestration, and the
          offline-first farmer app.
        </p>
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-muted/40 p-8 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Coming soon
          </p>
          <p className="mt-2 font-display text-xl font-semibold">
            Full architecture deep-dive
          </p>
        </div>
      </main>
      <Footer />
    </I18nProvider>
  );
}
