"use client";

import dynamic from "next/dynamic";
const DigitalProductBuilder = dynamic(() => import("@/features/product-builder/builder"), { ssr: false });

export default function BuilderSection() {
  return (
    <section id="product-builder" className="relative py-20 md:py-32 w-full overflow-hidden bg-space-black">
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-glow/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="text-[10px] font-mono text-cyan-glow tracking-widest uppercase block mb-3">
            09 // THE COGNITIVE PRODUCT CONFIGURATOR
          </span>
          <h2 className="text-3xl md:text-5xl font-syne font-extrabold uppercase text-white mb-6">
            PRODUCT CONFIGURATOR
          </h2>
          <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
            Configure your digital specifications directly. Select your project goals, scope boundaries, and advanced components to map our recommended technology stacks and timeline estimates.
          </p>
        </div>

        {/* Builder questionnaire card */}
        <div className="max-w-4xl mx-auto">
          <DigitalProductBuilder />
        </div>
      </div>
    </section>
  );
}
