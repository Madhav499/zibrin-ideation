"use client";

import React from "react";
import ZibrinLogo from "@/features/logo/logo";
import { useFocusMode } from "@/providers/focus-mode-provider";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function Navbar() {
  const { openFocus } = useFocusMode();

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-transparent py-4 md:py-6 pointer-events-none transform-gpu-3d">
      <div className="container mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Persistent Element 1: Zibrin Logo (Top-Left) */}
        <div className="pointer-events-auto flex items-center gap-3 group cursor-pointer text-left">
          <ZibrinLogo size={38} animated={true} />
          <div className="flex flex-col">
            <span className="font-orbitron tracking-widest text-sm font-bold text-white group-hover:text-cyan-glow transition-colors duration-300">
              ZIBRIN
            </span>
            <span className="text-[8px] font-mono text-cyan-glow/80 tracking-wider">
              RAJKOT // GUJARAT
            </span>
          </div>
        </div>

        {/* Persistent Element 2: Floating "Get In Touch" Button (Top-Right) */}
        <div className="pointer-events-auto">
          <button
            onClick={() => openFocus("contact")}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-space-black/80 border border-cyan-glow/40 hover:border-cyan-glow bg-cyan-glow/10 hover:bg-cyan-glow/20 text-xs font-mono tracking-widest text-cyan-glow hover:text-white backdrop-blur-xl transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(62,242,255,0.25)] hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-glow group-hover:rotate-12 transition-transform" />
            <span className="font-semibold uppercase">GET IN TOUCH</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </header>
  );
}
