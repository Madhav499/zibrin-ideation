"use client";

import React from "react";
import { Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";

interface HeroSpatialPlaneProps {
  onNavigate: (worldKey: "services" | "contact") => void;
}

export default function HeroSpatialPlane({ onNavigate }: HeroSpatialPlaneProps) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-6 flex flex-col items-center text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-glow/10 border border-cyan-glow/30 backdrop-blur-md mb-4 sm:mb-6">
        <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-glow animate-pulse" />
        <span className="text-[10px] sm:text-xs font-mono tracking-widest text-cyan-glow uppercase font-semibold">
          ZIBRIN INFOTECH // DIGITAL ENGINEERING & SOFTWARE SOLUTIONS
        </span>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-syne tracking-tight text-white mb-4 sm:mb-6 leading-tight">
        Your Vision. Our Innovation. <br />
        <span className="bg-gradient-to-r from-cyan-glow via-electric-blue to-neon-violet bg-clip-text text-transparent">
          One Extraordinary Digital Experience.
        </span>
      </h1>

      {/* Sub-headline */}
      <p className="text-xs sm:text-base text-slate-300 max-w-3xl leading-relaxed mb-6 sm:mb-8 font-light">
        Welcome to <strong className="text-cyan-glow font-medium">Zibrin Infotech</strong>. We transform your ideas into colourful, immersive websites and applications that reflect the dedication, craftsmanship, and vision behind every business.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <button
          onClick={() => onNavigate("services")}
          className="group relative inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-cyan-glow to-electric-blue text-space-black font-semibold text-xs sm:text-sm shadow-[0_0_30px_rgba(62,242,255,0.4)] hover:shadow-[0_0_45px_rgba(62,242,255,0.7)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span>Explore Services</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => onNavigate("contact")}
          className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-xs sm:text-sm backdrop-blur-md hover:border-cyan-glow/40 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span>Connect With Us</span>
        </button>
      </div>

      {/* Why Choose Zibrin Infotech Card */}
      <div className="w-full max-w-3xl p-4 sm:p-5 rounded-2xl bg-space-black/70 border border-cyan-glow/20 backdrop-blur-xl shadow-2xl relative overflow-hidden group hover:border-cyan-glow/50 transition-all duration-500 text-left">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-glow/10 rounded-full blur-3xl group-hover:bg-cyan-glow/20 transition-all duration-500" />
        <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
          <div className="p-1.5 sm:p-2 rounded-lg bg-cyan-glow/10 border border-cyan-glow/30 text-cyan-glow">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <h3 className="text-base sm:text-xl font-bold font-syne text-white">Why Choose Zibrin Infotech?</h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
          Your vision becomes our blueprint. Instead of asking you to fit into a template, we create experiences through your eyes—your style, your story, and your way of presenting your brand.
        </p>
      </div>
    </div>
  );
}
