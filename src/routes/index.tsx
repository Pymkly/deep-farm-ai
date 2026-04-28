import { createFileRoute } from "@tanstack/react-router";
import { I18nProvider } from "@/lib/i18n";
import { AnnouncementBar } from "@/components/landing/AnnouncementBar";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { KeyFigures } from "@/components/landing/KeyFigures";
import { Challenge } from "@/components/landing/Challenge";
import { Solution } from "@/components/landing/Solution";
import { Demo } from "@/components/landing/Demo";
import { PilotFarm } from "@/components/landing/PilotFarm";
import { Partners } from "@/components/landing/Partners";
import { IOAI } from "@/components/landing/IOAI";
import { GetInvolved } from "@/components/landing/GetInvolved";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Deep Farm — AI for Rice Farmers in Madagascar" },
      {
        name: "description",
        content:
          "Open-source, multi-agent digital tutor combining solar IoT and Agentic AI to transform Malagasy rice farming. 94% disease detection accuracy, ~80€ per family.",
      },
      { property: "og:title", content: "Deep Farm — AI for Rice Farmers in Madagascar" },
      {
        property: "og:description",
        content:
          "Solar IoT + Agentic AI tutor for Malagasy rice farmers. Erasmus+ #101128032. Featured at IOAI 2026.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <I18nProvider>
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <Challenge />
        <KeyFigures />
        <Solution />
        <Demo />
        <PilotFarm />
        <Partners />
        <IOAI />
        <GetInvolved />
      </main>
      <Footer />
    </I18nProvider>
  );
}
