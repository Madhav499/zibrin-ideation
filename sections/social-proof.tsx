"use client";

import React, { useEffect, useRef } from "react";
import ZibrinLogo from "@/features/logo/logo";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SocialProof() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const endingLogoRef = useRef<HTMLDivElement | null>(null);
  const endingTextRef = useRef<HTMLHeadingElement | null>(null);

  const launches = [
    {
      code: "LAUNCH // Z-091",
      name: "Nexis Telemetry Dashboard",
      client: "Nexis Aerospace",
      status: "SUCCESSFUL DEPLOYMENT // ORBIT STABLE",
      review: "The Zibrin lab transformed our raw IoT streams into a beautiful, stable orbital telemetry deck. Outstanding precision.",
      officer: "Dr. K. Vance, Systems Architect",
    },
    {
      code: "LAUNCH // Z-092",
      name: "VitalsSync Hub Suite",
      client: "Aegis MedCare Corp",
      status: "SUCCESSFUL DEPLOYMENT // HIPAA SYNCD",
      review: "Incredible execution times. Deployed our entire healthcare patient vitals app in 12 weeks with zero audit failures.",
      officer: "Sarah Jenkins, Director of MedTech Ops",
    },
    {
      code: "LAUNCH // Z-093",
      name: "LeadSprint CRM Engine",
      client: "LeadSprint SaaS",
      status: "SUCCESSFUL DEPLOYMENT // REVENUE ACTIVE",
      review: "Bespoke OpenAI workflows built by Zibrin cut our support latency down to sub-minute marks. Client retention rose by 25%.",
      officer: "Marcus Brody, CEO & Product Lead",
    },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Animate the cosmos scroll ending entrance
      gsap.fromTo(
        [endingLogoRef.current, endingTextRef.current],
        { opacity: 0, scale: 0.8, filter: "blur(10px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: endingLogoRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {/* 1. Testimonials (Mission Control Launches) */}
      <section id="launches" className="relative py-20 md:py-32 w-full overflow-hidden bg-space-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,255,0.03),transparent_60%)] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl mb-16 md:mb-24">
            <span className="text-[10px] font-mono text-cyan-glow tracking-widest uppercase block mb-3">
              10 // MISSION CONTROL TESTIMONIALS
            </span>
            <h2 className="text-3xl md:text-5xl font-syne font-extrabold uppercase text-white mb-6">
              SUCCESSFUL LAUNCHES
            </h2>
            <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
              Instead of boring client testimonials, we track mission success parameters. Inspect telemetry review logs verified by mission officers.
            </p>
          </div>

          <div className="space-y-6">
            {launches.map((launch, idx) => (
              <div
                key={idx}
                className="glass-panel border-white/5 p-6 md:p-8 rounded-xl bg-space-black/40 hover:border-cyan-glow/20 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-cyan-glow/50">
                  {launch.code}
                </div>

                <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                  <div className="max-w-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-0.5 bg-cyan-glow/15 text-cyan-glow border border-cyan-glow/30 rounded text-[9px] font-mono tracking-widest">
                        {launch.status}
                      </span>
                    </div>
                    
                    <h4 className="text-base font-orbitron font-bold text-white uppercase mb-2">
                      {launch.name}
                    </h4>
                    
                    <p className="text-xs text-neutral-400 italic leading-relaxed">
                      &ldquo;{launch.review}&rdquo;
                    </p>
                  </div>

                  <div className="border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-8 flex flex-col justify-center min-w-[200px]">
                    <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block">
                      VERIFIED BY
                    </span>
                    <span className="text-xs font-bold text-white block mt-1">
                      {launch.officer}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono mt-0.5">
                      {launch.client}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Cosmos Scroll Ending (The Universe) */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-b from-space-black via-black to-[#020307] py-24 text-center overflow-hidden border-t border-white/5">
        {/* Cosmos deep space particles backing */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,255,0.06),transparent_65%)] pointer-events-none" />
        
        {/* Floating Stars backup decoration */}
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxIiBmaWxsPSIjM0VGMkZGIi8+PC9zdmc+')] bg-repeat pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center gap-8">
          {/* Breathing Logo */}
          <div ref={endingLogoRef} className="animate-logo-breath">
            <ZibrinLogo size={100} animated={false} />
          </div>

          {/* Master Cosmic Statement */}
          <h2 
            ref={endingTextRef}
            className="text-2xl md:text-5xl font-syne font-extrabold uppercase text-white tracking-widest max-w-3xl leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-glow to-[#8B5CFF]"
          >
            THE FUTURE NEVER STOPS DEVELOPING.
          </h2>

          <a
            href="#product-builder"
            className="px-8 py-3.5 bg-gradient-to-r from-electric-blue to-neon-violet text-white text-xs font-mono tracking-widest rounded border border-cyan-glow/20 flex items-center gap-2 hover:scale-105 transition-all duration-300 shadow-neon-blue cursor-pointer"
          >
            <span>START YOUR JOURNEY</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
