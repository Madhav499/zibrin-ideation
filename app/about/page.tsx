"use client";

import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CinematicSpatialShell from "@/components/cinematic-spatial-shell";
import { ShieldCheck, Cpu, Code2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col text-white relative">
      <Navbar />

      <main className="flex-grow relative z-10">
        <CinematicSpatialShell
          eyebrow="SYS // ABOUT ZIBRIN INFOTECH INDIA"
          title={
            <>
              ENGINEERING THE
              <span className="block bg-gradient-to-r from-cyan-glow via-electric-blue to-neon-violet bg-clip-text text-transparent">
                INFINITE FUTURE
              </span>
            </>
          }
          description="Headquartered in Mumbai, India, Zibrin Infotech is a next-generation technology laboratory where cognitive AI engineering, robust full-stack development, and 3D web surfaces converge."
          stats={[
            { label: "Lab Base", value: "Mumbai" },
            { label: "Engineers", value: "20+" },
            { label: "Delivery", value: "Global" },
          ]}
          cards={[
            {
              title: "Zero technical debt",
              description: "Clean, modular, typed codebases powered by Next.js, TypeScript, and modern state machines.",
              accent: "cyan",
            },
            {
              title: "AI Agent Integration",
              description: "Custom autonomous AI agents, fine-tuned RAG vectors, and multi-model LLM orchestration.",
              accent: "blue",
            },
            {
              title: "Security & Speed",
              description: "Sub-100ms global response speeds with edge node caching and enterprise-grade encryption.",
              accent: "violet",
            },
          ]}
          primaryCta={{ label: "View Services", href: "/services" }}
          secondaryCta={{ label: "See Portfolio", href: "/portfolio" }}
        />

        <section className="container mx-auto px-4 py-10 md:px-8 md:py-16">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-[1.4rem] border border-cyan-glow/20 bg-space-black/50 p-6">
              <Code2 className="mb-4 h-6 w-6 text-cyan-glow" />
              <h3 className="mb-2 font-orbitron text-base font-bold uppercase text-white">Zero technical debt</h3>
              <p className="text-sm leading-7 text-neutral-400">Clean, modular, typed codebases powered by Next.js 15, TypeScript, and modern state machines.</p>
            </div>
            <div className="rounded-[1.4rem] border border-electric-blue/20 bg-space-black/50 p-6">
              <Cpu className="mb-4 h-6 w-6 text-electric-blue" />
              <h3 className="mb-2 font-orbitron text-base font-bold uppercase text-white">AI Agent Integration</h3>
              <p className="text-sm leading-7 text-neutral-400">Custom autonomous AI agents, fine-tuned RAG vectors, and multi-model LLM orchestration.</p>
            </div>
            <div className="rounded-[1.4rem] border border-neon-violet/20 bg-space-black/50 p-6">
              <ShieldCheck className="mb-4 h-6 w-6 text-neon-violet" />
              <h3 className="mb-2 font-orbitron text-base font-bold uppercase text-white">Security & Speed</h3>
              <p className="text-sm leading-7 text-neutral-400">Sub-100ms global response speeds with edge node caching and enterprise-grade encryption.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
