import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/architecture/Hero";
import { Pipeline } from "@/components/architecture/Pipeline";
import { Agents } from "@/components/architecture/Agents";
import { Decisions } from "@/components/architecture/Decisions";
import { OpenSource } from "@/components/architecture/OpenSource";
import { FinalCTA } from "@/components/architecture/FinalCTA";

export const Route = createFileRoute("/architecture")({
  head: () => ({
    meta: [
      { title: "How Deep Farm works — Architecture" },
      {
        name: "description",
        content:
          "Inside Deep Farm: solar IoT, vector search, LangGraph multi-agent AI, and an open-source stack delivering rice-farming advice in under a minute.",
      },
      {
        property: "og:title",
        content: "How Deep Farm works — Architecture",
      },
      {
        property: "og:description",
        content:
          "Solar IoT, vector search, and Agentic AI — the full Deep Farm technical stack, fully open-source under MIT.",
      },
    ],
  }),
  component: ArchitecturePage,
});

function ArchitecturePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Pipeline />
        <Agents />
        <Decisions />
        <OpenSource />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
