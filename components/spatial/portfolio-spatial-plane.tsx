"use client";

import React from "react";
import { Sparkles, ArrowRight, ExternalLink } from "lucide-react";
import { useFocusMode } from "@/providers/focus-mode-provider";

export default function PortfolioSpatialPlane() {
  const { openFocus } = useFocusMode();

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-6 flex flex-col items-center text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-glow/10 border border-cyan-glow/30 backdrop-blur-md mb-4">
        <Sparkles className="w-4 h-4 text-cyan-glow" />
        <span className="text-xs font-mono tracking-widest text-cyan-glow uppercase font-semibold">
          PORTFOLIO SHOWCASE // HIGHLIGHTS
        </span>
      </div>

      {/* Main Heading */}
      <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight text-white mb-4">
        Case Monoliths & <br />
        <span className="bg-gradient-to-r from-cyan-glow via-electric-blue to-neon-violet bg-clip-text text-transparent">
          Platform Highlights
        </span>
      </h2>

      {/* Featured Highlight Preview */}
      <div className="w-full p-6 rounded-2xl bg-space-black/70 border border-cyan-glow/30 backdrop-blur-xl mb-8 text-left group hover:border-cyan-glow/60 transition-all">
        <div className="text-xs font-mono text-cyan-glow uppercase tracking-wider mb-2 font-semibold">
          FEATURED SYSTEM // ENTERPRISE AI & WEBGL
        </div>
        <h3 className="text-xl font-bold font-syne text-white mb-2 group-hover:text-cyan-glow transition-colors">
          Cognitive AI Automation Suite
        </h3>
        <p className="text-xs md:text-sm text-slate-300 font-light leading-relaxed mb-4">
          Custom autonomous agent architecture, LLM orchestration, and spatial dashboard built for real-time operations.
        </p>
        <div className="text-xs font-mono text-cyan-glow flex items-center gap-1 font-semibold">
          <span>View case study gallery inside Focus Mode</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* View All Projects Trigger */}
      <button
        onClick={() => openFocus("portfolio")}
        className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-glow via-electric-blue to-neon-violet text-space-black font-semibold font-mono tracking-widest text-xs uppercase shadow-[0_0_35px_rgba(62,242,255,0.4)] hover:shadow-[0_0_50px_rgba(62,242,255,0.7)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <span>View All Case Studies & Projects</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
