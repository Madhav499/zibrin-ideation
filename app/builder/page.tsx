"use client";

import React from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BuilderSection from "@/sections/builder-section";
import { Sparkles } from "lucide-react";

const NoomoSpatialPortal = dynamic(() => import("@/components/noomo-spatial-portal"), { ssr: false });

export default function BuilderPage() {
  const BuilderHeader = (
    <section className="container mx-auto px-4 md:px-8 py-16 text-center relative overflow-hidden">
      <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/5 border border-white/10 rounded-full mb-6">
        <Sparkles className="w-3.5 h-3.5 text-cyan-glow" />
        <span className="text-[10px] font-mono text-neutral-300 uppercase tracking-widest">
          SYS // DIGITAL PRODUCT CONFIGURATOR (₹)
        </span>
      </div>

      <h1 className="text-4xl md:text-6xl font-syne font-extrabold uppercase text-white mb-6 tracking-tight">
        BUILD YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-glow via-electric-blue to-neon-violet">SYSTEM</span>
      </h1>

      <p className="text-base md:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
        Select your product goals, scaling level, and specialized integrations to estimate timelines and budget ranges in Indian Rupees (₹).
      </p>
    </section>
  );

  return (
    <div className="min-h-screen flex flex-col bg-space-black text-white relative">
      <Navbar />

      <main className="flex-grow pt-28 pb-16 relative z-10 overflow-hidden">
        
        {/* PORTAL: Header -> Product Configurator */}
        <NoomoSpatialPortal
          type="techPrism"
          title="SYS // PRODUCT CONFIGURATOR STAGE"
          subtitle="INDIAN_RUPEES_INR"
          pageA={BuilderHeader}
          pageB={<BuilderSection />}
        />

      </main>

      <Footer />
    </div>
  );
}
