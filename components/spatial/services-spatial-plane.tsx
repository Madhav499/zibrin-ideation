"use client";

import React from "react";
import { Sparkles, ArrowRight, Layers, Cpu, Database, CheckCircle2 } from "lucide-react";
import { useFocusMode } from "@/providers/focus-mode-provider";

export default function ServicesSpatialPlane() {
  const { openFocus } = useFocusMode();

  const previewServices = [
    { title: "Website & E-Commerce", icon: Layers, desc: "Custom WebGL platforms, Next.js, and high-conversion e-commerce engines." },
    { title: "Mobile Apps (Android & iOS)", icon: Cpu, desc: "Cross-platform mobile engineering with React Native and Flutter." },
    { title: "Cognitive AI & Chatbots", icon: Sparkles, desc: "Custom OpenAI agent deployment, fine-tuned RAG vectors, and AI workflows." },
    { title: "Custom ERP & Software", icon: Database, desc: "Enterprise resource planning, CRM design, and zero-latency microservices." },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-5 flex flex-col items-center text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-glow/10 border border-cyan-glow/30 backdrop-blur-md mb-3 sm:mb-4">
        <Sparkles className="w-3.5 h-3.5 text-cyan-glow" />
        <span className="text-[10px] sm:text-xs font-mono tracking-widest text-cyan-glow uppercase font-semibold">
          SERVICES & CAPABILITIES // DISCOVERY
        </span>
      </div>

      {/* Main Heading */}
      <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-syne tracking-tight text-white mb-3 sm:mb-4">
        Solutions Without Limits. <br />
        <span className="bg-gradient-to-r from-cyan-glow via-electric-blue to-neon-violet bg-clip-text text-transparent">
          Concepts to Reality.
        </span>
      </h2>

      {/* Short Description */}
      <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed font-light mb-4 sm:mb-6">
        We don't define our work by a list of services. We define it by the problems we solve and the ideas we bring to life. Explore our capabilities below.
      </p>

      {/* 4 Preview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 w-full mb-6 sm:mb-8">
        {previewServices.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-space-black/70 border border-white/10 backdrop-blur-xl hover:border-cyan-glow/40 transition-all duration-300 flex flex-col text-left group"
            >
              <div className="p-2 sm:p-2.5 rounded-xl bg-cyan-glow/10 border border-cyan-glow/30 text-cyan-glow w-fit mb-2.5">
                <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold font-syne text-white mb-1.5 group-hover:text-cyan-glow transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Explore Services Focus Mode Trigger */}
      <button
        onClick={() => openFocus("services")}
        className="group relative inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-cyan-glow via-electric-blue to-neon-violet text-space-black font-semibold font-mono tracking-widest text-[11px] sm:text-xs uppercase shadow-[0_0_35px_rgba(62,242,255,0.4)] hover:shadow-[0_0_50px_rgba(62,242,255,0.7)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <span>Explore All 29+ Services & Tech Stack</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
