"use client";

import React from "react";
import { Sparkles, Phone, Mail, MapPin, ArrowRight, MessageSquare } from "lucide-react";
import { useFocusMode } from "@/providers/focus-mode-provider";

export default function ContactSpatialPlane() {
  const { openFocus } = useFocusMode();

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-6 flex flex-col items-center text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-glow/10 border border-cyan-glow/30 backdrop-blur-md mb-4">
        <Sparkles className="w-4 h-4 text-cyan-glow animate-pulse" />
        <span className="text-xs font-mono tracking-widest text-cyan-glow uppercase font-semibold">
          CONTACT DESTINATION // GET IN TOUCH
        </span>
      </div>

      {/* Main Heading */}
      <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight text-white mb-4">
        Let's Build Something <br />
        <span className="bg-gradient-to-r from-cyan-glow via-electric-blue to-neon-violet bg-clip-text text-transparent">
          Extraordinary Together
        </span>
      </h2>

      {/* Short Introduction */}
      <p className="text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed font-light mb-8">
        Whether you're planning a website, mobile application, custom software, or AI solution, we're here to help. Your vision starts with a conversation. Let's make it happen.
      </p>

      {/* Contact Quick Preview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-8">
        <div className="p-4 rounded-2xl bg-space-black/70 border border-white/10 backdrop-blur-xl flex flex-col items-center text-center">
          <Phone className="w-5 h-5 text-cyan-glow mb-2" />
          <div className="text-[10px] font-mono text-slate-400">Direct Phone / WhatsApp</div>
          <div className="text-xs font-bold font-mono text-white mt-1">+91 7573892447</div>
        </div>

        <div className="p-4 rounded-2xl bg-space-black/70 border border-white/10 backdrop-blur-xl flex flex-col items-center text-center">
          <Mail className="w-5 h-5 text-electric-blue mb-2" />
          <div className="text-[10px] font-mono text-slate-400">Direct Email</div>
          <div className="text-xs font-bold font-mono text-white mt-1">zibrininfotech@gmail.com</div>
        </div>

        <div className="p-4 rounded-2xl bg-space-black/70 border border-white/10 backdrop-blur-xl flex flex-col items-center text-center">
          <MapPin className="w-5 h-5 text-neon-violet mb-2" />
          <div className="text-[10px] font-mono text-slate-400">Location Base</div>
          <div className="text-xs font-bold font-mono text-white mt-1">Rajkot , Gujarat , India</div>
        </div>
      </div>

      {/* Open Contact Console Trigger */}
      <button
        onClick={() => openFocus("contact")}
        className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-glow via-electric-blue to-neon-violet text-space-black font-semibold font-mono tracking-widest text-xs uppercase shadow-[0_0_35px_rgba(62,242,255,0.4)] hover:shadow-[0_0_50px_rgba(62,242,255,0.7)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <MessageSquare className="w-4 h-4 text-space-black" />
        <span>Open Full Contact Console & Form</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
