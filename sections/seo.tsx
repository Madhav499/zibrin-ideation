"use client";

import dynamic from "next/dynamic";
const SeoCanvas = dynamic(() => import("@/features/seo-command-center/seo-canvas"), { ssr: false });
import { Search, Sparkles, BookOpen } from "lucide-react";

export default function SeoSection() {
  return (
    <section id="seo" className="relative py-20 md:py-32 w-full overflow-hidden bg-space-black">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-glow/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-7">
            <span className="text-[10px] font-mono text-cyan-glow tracking-widest uppercase block mb-3">
              05 // THE SEO / AEO / GEO COMMAND CENTER
            </span>
            <h2 className="text-3xl md:text-5xl font-syne font-extrabold uppercase text-white mb-6 flex flex-wrap items-center gap-2 tracking-wide">
              <span>AI</span>
              <span className="w-3 h-3 rounded-full border border-cyan-glow/30 flex items-center justify-center"><span className="w-1 h-1 rounded-full bg-cyan-glow animate-ping" /></span>
              <span className="text-cyan-glow">SEARCH</span>
              <span className="w-3 h-3 rounded-full border border-neon-violet/30 flex items-center justify-center"><span className="w-1 h-1 rounded-full bg-neon-violet" /></span>
              <span>OPTIMIZATION</span>
            </h2>
            <p className="text-sm md:text-base text-neutral-400 leading-relaxed max-w-xl">
              Traditional keyword matching is obsolete. Search GPT, Gemini, Claude, and Perplexity query websites directly for semantic entity graphs. We engineer source layouts that ensure AI assistants citation-index your services.
            </p>
          </div>
          
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="glass-panel border-white/5 p-5 rounded-lg bg-space-black/50">
              <h4 className="text-xs font-orbitron font-bold text-white mb-1 uppercase flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-glow" />
                <span>AEO (Answer Engine Optimization)</span>
              </h4>
              <p className="text-[11px] text-neutral-400">
                Formatting direct natural language answers and structured FAQ tags so AI engines quickly fetch facts.
              </p>
            </div>
            <div className="glass-panel border-white/5 p-5 rounded-lg bg-space-black/50">
              <h4 className="text-xs font-orbitron font-bold text-white mb-1 uppercase flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-neon-violet" />
                <span>GEO (Generative Engine Optimization)</span>
              </h4>
              <p className="text-[11px] text-neutral-400">
                Structuring entity-relationship schemas (JSON-LD) to connect facts, credentials, and portfolios contextually.
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic SEO Command Flow Canvas */}
        <SeoCanvas />
      </div>
    </section>
  );
}
