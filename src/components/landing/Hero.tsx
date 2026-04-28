import { motion } from "framer-motion";
import { Play, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-paddy.jpg";
import { useState } from "react";
import { VideoModal } from "./VideoModal";

const partners = ["Erasmus+", "ESTIA", "IT University", "UNIVA", "ANAE"];

export function Hero() {
  const [videoOpen, setVideoOpen] = useState(false);
  return (
    <section id="top" className="relative -mt-16 min-h-[100svh] w-full overflow-hidden bg-ink text-white">
      <img
        src={heroImg}
        alt="Rice paddies at sunrise in the highlands of Madagascar"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink/85" />
      <div className="absolute inset-0 grain opacity-30 mix-blend-overlay" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col px-4 pb-16 pt-32 sm:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/80 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-earth" />
            Open-source · Erasmus+ #101128032
          </span>
          <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            AI for Rice Farmers in Madagascar
          </h1>
          <p className="mt-6 max-w-2xl text-balance text-lg text-white/80 sm:text-xl">
            An open-source, multi-agent digital tutor combining solar IoT and Agentic AI
            to transform Malagasy rice farming.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button asChild variant="hero" size="xl">
              <a href="#project">
                Discover the project
                <ArrowDown className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="heroGhost" size="xl" onClick={() => setVideoOpen(true)}>
              <Play className="h-4 w-4" />
              Watch the demo
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-auto"
        >
          <div className="border-t border-white/15 pt-6">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">In partnership with</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3">
              {partners.map((p) => (
                <span
                  key={p}
                  className="text-sm font-semibold text-white/85 sm:text-base"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </section>
  );
}
