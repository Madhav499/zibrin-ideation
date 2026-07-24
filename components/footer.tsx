"use client";

import React from "react";
import { TransitionLink } from "@/providers/transition-provider";
import ZibrinLogo from "@/features/logo/logo";
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-space-black border-t border-white/10 py-12 md:py-16 mt-auto relative overflow-hidden">
      {/* Glow highlight bottom backdrop */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-t from-cyan-glow/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Logo & India Office Info column */}
          <div className="md:col-span-5 flex flex-col items-start space-y-4">
            <div className="flex items-center gap-3">
              <ZibrinLogo size={36} animated={false} />
              <div className="flex flex-col">
                <span className="font-orbitron tracking-widest text-sm font-bold text-white">
                  ZIBRIN INFOTECH
                </span>
                <span className="text-[9px] font-mono text-cyan-glow tracking-wider">
                  INDIA // AI & FULL-STACK LAB
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed font-sans">
              India's premier digital engineering laboratory. We construct high-frequency web platforms, enterprise AI agent models, and Generative Engine Optimization (GEO) systems.
            </p>

            {/* Indian Contact Info Badges */}
            <div className="space-y-2 text-xs font-mono text-neutral-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-glow shrink-0" />
                <span>Bandra-Kurla Complex (BKC), Mumbai, MH 400051, India</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-neon-violet shrink-0" />
                <span>+91 98765 43210 / +91 22 6789 0123</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-glow shrink-0" />
                <span>contact@zibrin.info</span>
              </div>

              <div className="flex items-center gap-2 text-neutral-400 text-[11px]">
                <Clock className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                <span>Hours: Mon - Sat // 9:00 AM - 9:00 PM IST (UTC+05:30)</span>
              </div>
            </div>
          </div>

          {/* Quick links columns */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-mono text-cyan-glow uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <span>LAB DIRECTORIES</span>
            </h4>
            <div className="flex flex-col gap-2.5 font-mono text-xs">
              <TransitionLink href="/" className="text-neutral-400 hover:text-cyan-glow transition-colors">
                &gt; Home Command
              </TransitionLink>
              <TransitionLink href="/about" className="text-neutral-400 hover:text-cyan-glow transition-colors">
                &gt; About Us (Chamber)
              </TransitionLink>
              <TransitionLink href="/services" className="text-neutral-400 hover:text-cyan-glow transition-colors">
                &gt; Services Galaxy (₹)
              </TransitionLink>
              <TransitionLink href="/portfolio" className="text-neutral-400 hover:text-cyan-glow transition-colors">
                &gt; Case Monoliths
              </TransitionLink>
              <TransitionLink href="/process" className="text-neutral-400 hover:text-cyan-glow transition-colors">
                &gt; Pipeline Factory
              </TransitionLink>
              <TransitionLink href="/contact" className="text-neutral-400 hover:text-cyan-glow transition-colors">
                &gt; Contact Us (India)
              </TransitionLink>
              <TransitionLink href="/builder" className="text-neutral-400 hover:text-cyan-glow transition-colors">
                &gt; Product Configurator (₹)
              </TransitionLink>
            </div>
          </div>

          {/* Core Principles & Currency Badge */}
          <div className="md:col-span-4">
            <h4 className="text-[10px] font-mono text-cyan-glow uppercase tracking-widest mb-4">
              CORE PRINCIPLES
            </h4>
            <ul className="text-xs text-neutral-400 space-y-2 font-mono mb-6">
              <li>&gt; INFINITE DEVELOPMENT & INNOVATION</li>
              <li>&gt; HUMAN-CENTERED COGNITIVE AI</li>
              <li>&gt; HIGH-PERFORMANCE 3D WEB SURFACES</li>
              <li>&gt; INDIAN ENTERPRISE & GLOBAL STANDARDS</li>
            </ul>

            <div className="p-4 glass-panel border-cyan-glow/20 rounded-lg bg-cyan-glow/5">
              <span className="text-[9px] font-mono text-cyan-glow uppercase tracking-widest block mb-1">
                TRANSACTION CURRENCY
              </span>
              <span className="text-sm font-orbitron font-bold text-white flex items-center gap-1.5">
                <span>INDIAN RUPEES (INR - ₹)</span>
              </span>
              <p className="text-[10px] text-neutral-400 mt-1">
                All pricing & proposals formatted in Indian Rupees for seamless GST & Indian banking compliance.
              </p>
            </div>
          </div>

        </div>

        {/* Diagnostic bottom footer */}
        <div className="border-t border-white/10 pt-8 flex flex-wrap gap-4 justify-between items-center text-[10px] font-mono text-neutral-400">
          <div>
            &copy; {new Date().getFullYear()} ZIBRIN INFOTECH PRIVATE LIMITED. MUMBAI, INDIA. ALL RIGHTS RESERVED.
          </div>
          <div className="flex flex-wrap gap-4">
            <span>GSTIN: 27AAAAA0000A1Z5</span>
            <span className="text-cyan-glow">SYS_RUN: OK</span>
            <span>AEO_SYNC: ENGAGED</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

