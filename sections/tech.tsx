"use client";

import dynamic from "next/dynamic";
const TechCanvas = dynamic(() => import("@/features/technology-universe/tech-canvas"), { ssr: false });

export default function TechSection() {
  return (
    <section id="technologies" className="relative py-20 md:py-32 w-full overflow-hidden bg-space-black">
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-neon-violet/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="text-[10px] font-mono text-cyan-glow tracking-widest uppercase block mb-3">
            06 // THE TECHNOLOGY UNIVERSE
          </span>
          <h2 className="text-3xl md:text-5xl font-syne font-extrabold uppercase text-white mb-6">
            ENGINEERING STACK
          </h2>
          <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
            We don't limit ourselves to templates. Our engineering core integrates advanced frameworks, containers, cloud platforms, and large language model APIs orbiting a unified system.
          </p>
        </div>

        {/* Orbit Canvas */}
        <TechCanvas />
      </div>
    </section>
  );
}
