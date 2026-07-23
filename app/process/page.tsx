"use client";

import React from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import EngineeringProcess from "@/sections/process";
import TechSection from "@/sections/tech";
import { GitBranch } from "lucide-react";

const NoomoSpatialPortal = dynamic(() => import("@/components/noomo-spatial-portal"), { ssr: false });

export default function ProcessPage() {
  const ProcessHeader = (
    <section className="container mx-auto px-4 md:px-8 py-16 text-center relative overflow-hidden">
      <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/5 border border-white/10 rounded-full mb-6">
        <GitBranch className="w-3.5 h-3.5 text-cyan-glow" />
        <span className="text-[10px] font-mono text-neutral-300 uppercase tracking-widest">
          SYS // 6-STAGE PRODUCTION PIPELINE
        </span>
      </div>

      <h1 className="text-4xl md:text-6xl font-syne font-extrabold uppercase text-white mb-6 tracking-tight">
        PRODUCTION <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-glow via-electric-blue to-neon-violet">FLOW FACTORY</span>
      </h1>

      <p className="text-base md:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
        From initial system architecture blueprinting to automated AI agent integration, production testing, and orbital deployment.
      </p>
    </section>
  );

  return (
    <div className="min-h-screen flex flex-col bg-space-black text-white relative">
      <Navbar />

      <main className="flex-grow pt-28 pb-16 relative z-10 overflow-hidden">
        
        {/* PORTAL 1: Header -> 6-Stage Engineering Process */}
        <NoomoSpatialPortal
          type="cloudServer"
          title="SYS // 6-STAGE PRODUCTION PIPELINE"
          subtitle="FACTORY_FLOW_ORCHESTRATOR"
          pageA={ProcessHeader}
          pageB={<EngineeringProcess />}
        />

        {/* PORTAL 2: 6-Stage Process -> Tech Stack Orbit */}
        <NoomoSpatialPortal
          type="codeMatrix"
          title="SYS // TECH UNIVERSE"
          subtitle="ORBITAL_STACK"
          pageA={<EngineeringProcess />}
          pageB={<TechSection />}
        />

      </main>

      <Footer />
    </div>
  );
}
