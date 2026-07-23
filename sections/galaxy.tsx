"use client";

import dynamic from "next/dynamic";
const ServicesGalaxy = dynamic(() => import("@/features/services/services-galaxy"), { ssr: false });

export default function ServicesSection() {
  return (
    <section id="galaxy" className="relative py-20 md:py-32 w-full overflow-hidden bg-space-black">
      {/* Visual background decorations */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-glow/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-neon-violet/5 rounded-full blur-[100px] pointer-events-none animate-pulse" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24 hologram-scan p-4 border border-cyan-glow/10 rounded bg-cyan-glow/[0.01]">
          <span className="text-[10px] font-mono text-cyan-glow tracking-widest uppercase block mb-3">
            02 // THE DIGITAL GALAXY
          </span>
          <h2 className="text-3xl md:text-5xl font-syne font-extrabold uppercase text-white mb-4 glow-text-cyan">
            SERVICES GALAXY
          </h2>
          <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
            Floating technology modules. Select active planetary bodies to configure timeline, deliverables, budget specifications, and core stack items.
          </p>
        </div>

        {/* Galaxy Dual-Panel Interface */}
        <ServicesGalaxy />
      </div>
    </section>
  );
}
