import { Reveal } from "./Reveal";
import { ArrowRight, Sprout, ThermometerSun, Waves, SunMedium } from "lucide-react";
import { Link } from "@tanstack/react-router";
import iotSystem from "@/assets/iot-system.jpg";

const components = [
  {
    icon: Sprout,
    name: "NPK Soil Sensor",
    detail:
      "Measures Nitrogen, Phosphorus, Potassium in real time via RS-485 Modbus.",
    accent: "primary" as const,
  },
  {
    icon: ThermometerSun,
    name: "DHT22 Climate Sensor",
    detail:
      "Tracks air temperature and humidity, key indicators of disease risk.",
    accent: "sky" as const,
  },
  {
    icon: Waves,
    name: "TL-136 Water Level",
    detail:
      "Monitors irrigation depth with IP68 waterproof probe (4-20 mA output).",
    accent: "sky" as const,
  },
  {
    icon: SunMedium,
    name: "Solar-powered Hub",
    detail:
      "Arduino Mega + ESP-01S + Raspberry Pi. 12V solar battery, 68-day autonomy without recharge.",
    accent: "primary" as const,
  },
];

export function SolarIoT() {
  return (
    <section
      id="iot"
      className="relative overflow-hidden bg-background py-24 sm:py-32"
    >
      <div className="absolute inset-0 ring-grid opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Top: big picture */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-sky">
              Hardware · Edge AI
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight sm:text-5xl">
              Solar IoT in the field
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-balance text-base text-muted-foreground sm:text-lg">
              Deep Farm deploys autonomous solar IoT stations directly in rice
              fields. Each station collects soil and climate data every few
              seconds, runs offline for over 2 months without sun, and shares
              the data with our AI tutor.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 overflow-hidden rounded-3xl border border-border bg-ink shadow-xl">
            <div className="relative aspect-[16/9] w-full">
              <img
                src={iotSystem}
                alt="Diagram: solar panel powering field sensors connected to a Raspberry Pi station, syncing to the cloud and a farmer's smartphone"
                width={1920}
                height={1080}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-white/90 sm:bottom-6 sm:left-6">
                {[
                  "Solar panel",
                  "Field sensors",
                  "Raspberry Pi hub",
                  "Cloud",
                  "Farmer app",
                ].map((step, i, arr) => (
                  <span key={step} className="flex items-center gap-2">
                    <span className="rounded-full border border-white/30 bg-white/10 px-2.5 py-1 backdrop-blur">
                      {step}
                    </span>
                    {i < arr.length - 1 && (
                      <ArrowRight className="h-3 w-3 text-primary" />
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bottom: components */}
        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {components.map((c, i) => {
            const Icon = c.icon;
            const isPrimary = c.accent === "primary";
            return (
              <Reveal key={c.name} delay={0.05 * i}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div
                    className={`absolute inset-x-0 top-0 h-0.5 ${
                      isPrimary ? "bg-primary" : "bg-sky"
                    }`}
                    aria-hidden="true"
                  />
                  <div
                    className={`grid h-12 w-12 place-items-center rounded-xl ${
                      isPrimary
                        ? "bg-primary/10 text-primary"
                        : "bg-sky/10 text-sky"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                    {c.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {c.detail}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 flex justify-center">
            <Link
              to="/architecture"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-md"
            >
              Learn more about our architecture
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
