"use client";

import React from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WhoWeAre from "@/sections/who-we-are";
import Card3DTilt from "@/components/card-3d-tilt";
import { ShieldCheck, Cpu, Code2 } from "lucide-react";

const NoomoSpatialPortal = dynamic(() => import("@/components/noomo-spatial-portal"), { ssr: false });

export default function AboutPage() {
  const AboutHeader = (
    <section className="container mx-auto px-4 md:px-8 py-16 text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/5 border border-white/10 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-cyan-glow animate-ping" />
          <span className="text-[10px] font-mono text-neutral-300 uppercase tracking-widest">
            SYS // ABOUT ZIBRIN INFOTECH INDIA
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-syne font-extrabold uppercase text-white mb-6 tracking-tight">
          ENGINEERING THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-glow via-electric-blue to-neon-violet">INFINITE FUTURE</span>
        </h1>

        <p className="text-base md:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed font-sans">
          Headquartered in Mumbai, India, Zibrin Infotech is a next-generation technology laboratory where cognitive AI engineering, robust full-stack development, and 3D web surfaces converge.
        </p>
      </div>
    </section>
  );

  const TechnicalValues = (
    <section className="container mx-auto px-4 md:px-8 py-16">
      <div className="max-w-3xl mb-12">
        <span className="text-[10px] font-mono text-cyan-glow tracking-widest uppercase block mb-2">
          02 // OUR CORE ENGINE ETHOS
        </span>
        <h2 className="text-2xl md:text-4xl font-syne font-extrabold uppercase text-white mb-4">
          WHY LEADING COMPANIES TRUST US
        </h2>
        <p className="text-sm text-neutral-400">
          We combine Indian software engineering precision with global 3D design aesthetics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card3DTilt intensity={15}>
          <div className="glass-panel p-6 rounded-xl border-cyan-glow/20 bg-space-black/50 h-full flex flex-col justify-between">
            <div>
              <div className="p-3 w-fit rounded-lg bg-cyan-glow/10 border border-cyan-glow/30 text-cyan-glow mb-4">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-orbitron font-bold text-white mb-2">Zero technical debt</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Clean, modular, typed codebases powered by Next.js 15, TypeScript, and modern state machines.
              </p>
            </div>
            <span className="text-[9px] font-mono text-cyan-glow mt-6 block">PARAM // 100% TYPED</span>
          </div>
        </Card3DTilt>

        <Card3DTilt intensity={15}>
          <div className="glass-panel p-6 rounded-xl border-electric-blue/20 bg-space-black/50 h-full flex flex-col justify-between">
            <div>
              <div className="p-3 w-fit rounded-lg bg-electric-blue/10 border border-electric-blue/30 text-electric-blue mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-orbitron font-bold text-white mb-2">AI Agent Integration</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Custom autonomous AI agents, fine-tuned RAG vectors, and multi-model LLM orchestration.
              </p>
            </div>
            <span className="text-[9px] font-mono text-electric-blue mt-6 block">PARAM // AGENTIC READY</span>
          </div>
        </Card3DTilt>

        <Card3DTilt intensity={15}>
          <div className="glass-panel p-6 rounded-xl border-neon-violet/20 bg-space-black/50 h-full flex flex-col justify-between">
            <div>
              <div className="p-3 w-fit rounded-lg bg-neon-violet/10 border border-neon-violet/30 text-neon-violet mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-orbitron font-bold text-white mb-2">Security & Speed</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Sub-100ms global response speeds with edge node caching and enterprise-grade encryption.
              </p>
            </div>
            <span className="text-[9px] font-mono text-neon-violet mt-6 block">PARAM // EDGE CACHED</span>
          </div>
        </Card3DTilt>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen flex flex-col bg-space-black text-white relative">
      <Navbar />

      <main className="flex-grow pt-28 pb-16 relative z-10 overflow-hidden">
        
        {/* PORTAL 1: About Header -> Chamber of Innovation */}
        <NoomoSpatialPortal
          type="aiNeural"
          title="SYS // CHAMBER OF INNOVATION"
          subtitle="MUMBAI_AI_LAB"
          pageA={AboutHeader}
          pageB={<WhoWeAre />}
        />

        {/* PORTAL 2: Chamber -> Technical Values */}
        <NoomoSpatialPortal
          type="codeMatrix"
          title="SYS // TECHNICAL VALUES"
          subtitle="MIL-SPEC_STANDARDS"
          pageA={<WhoWeAre />}
          pageB={TechnicalValues}
        />

      </main>

      <Footer />
    </div>
  );
}
