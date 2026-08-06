"use client";

import React from "react";
import { Sparkles, ArrowRight, BookOpen, ArrowUpRight } from "lucide-react";
import { useFocusMode } from "@/providers/focus-mode-provider";

export default function BlogSpatialPlane() {
  const { openFocus } = useFocusMode();

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-6 flex flex-col items-center text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-violet/10 border border-neon-violet/30 backdrop-blur-md mb-4">
        <Sparkles className="w-4 h-4 text-neon-violet" />
        <span className="text-xs font-mono tracking-widest text-neon-violet uppercase font-semibold">
          INSIGHTS & JOURNAL // ENGINEERING THOUGHTS
        </span>
      </div>

      {/* Main Heading */}
      <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight text-white mb-4">
        Latest Thinking & <br />
        <span className="bg-gradient-to-r from-neon-violet via-cyan-glow to-electric-blue bg-clip-text text-transparent">
          Engineering Insights
        </span>
      </h2>

      {/* Featured Preview Card */}
      <div className="w-full p-6 rounded-2xl bg-space-black/70 border border-neon-violet/30 backdrop-blur-xl mb-8 text-left group hover:border-neon-violet/60 transition-all">
        <div className="flex items-center justify-between text-xs font-mono text-neon-violet mb-2">
          <span>FEATURED ESSAY // FRONTEND ARCHITECTURE</span>
          <span className="text-slate-400">5 min read</span>
        </div>
        <h3 className="text-xl font-bold font-syne text-white mb-2 group-hover:text-cyan-glow transition-colors">
          Building Spatial WebGL Experiences with Next.js 16
        </h3>
        <p className="text-xs md:text-sm text-slate-300 font-light leading-relaxed mb-4">
          How to decouple vertical scrolling into continuous 3D Z-axis camera journeys using Three.js and React Server Components.
        </p>
        <div className="text-xs font-mono text-cyan-glow flex items-center gap-1 font-semibold">
          <span>Read inside Focus Mode</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Read Articles Trigger */}
      <button
        onClick={() => openFocus("blog")}
        className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-neon-violet via-cyan-glow to-electric-blue text-space-black font-semibold font-mono tracking-widest text-xs uppercase shadow-[0_0_35px_rgba(139,92,255,0.4)] hover:shadow-[0_0_50px_rgba(139,92,255,0.7)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <BookOpen className="w-4 h-4 text-space-black" />
        <span>Read Articles & Engineering Library</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
