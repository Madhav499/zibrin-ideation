"use client";

import React from "react";
import { Sparkles, Search, Compass, Palette, Code, CheckCircle, Rocket, HelpCircle } from "lucide-react";

export default function ProcessSpatialPlane() {
  const steps = [
    {
      num: "01",
      title: "Discover",
      desc: "Share your vision, goals, and requirements. We explore creative possibilities and provide strategic direction.",
      note: "Response within 24 hours.",
      icon: Search,
    },
    {
      num: "02",
      title: "Research & Strategy",
      desc: "We analyze industry insights to build a strategic roadmap defining goals, UX, tech stack, and scalability.",
      icon: Compass,
    },
    {
      num: "03",
      title: "Design",
      desc: "We create modern, immersive, and intuitive interfaces, refining iteratively until completely satisfied.",
      icon: Palette,
    },
    {
      num: "04",
      title: "Development",
      desc: "Our engineering team builds fast, secure, scalable, and high performance digital solutions.",
      icon: Code,
    },
    {
      num: "05",
      title: "Review & Refinement",
      desc: "Rigorous testing across performance, security, and responsiveness to guarantee excellence.",
      icon: CheckCircle,
    },
    {
      num: "06",
      title: "Launch & Growth",
      desc: "Smooth deployment, performance monitoring, continuous support, and strategic improvements.",
      icon: Rocket,
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-5 flex flex-col items-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-accent/10 border border-gold-accent/30 backdrop-blur-md mb-2.5 sm:mb-3">
        <Sparkles className="w-3.5 h-3.5 text-gold-accent" />
        <span className="text-[10px] sm:text-xs font-mono tracking-widest text-gold-accent uppercase font-semibold">
          METHODOLOGY // FROM ENQUIRY TO DELIVERY
        </span>
      </div>

      {/* Main Heading */}
      <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-syne tracking-tight text-white mb-2.5 sm:mb-3 text-center">
        From Enquiry to Delivery: <span className="bg-gradient-to-r from-gold-accent via-cyan-glow to-electric-blue bg-clip-text text-transparent">Our 6-Step Process</span>
      </h2>

      {/* Hero Banner */}
      <div className="w-full p-3 sm:p-4 rounded-xl bg-space-black/70 border border-white/10 backdrop-blur-xl mb-4 text-center">
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
          Every project follows a structured journey, ensuring clarity, creativity, and quality from first conversation to launch.
        </p>
      </div>

      {/* Adaptive Grid: Desktop 3x2, Laptop 2x3, Tablet 2x3, Mobile 1 Column */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5 w-full mb-4 sm:mb-5">
        {steps.map((step, idx) => {
          const IconComp = step.icon;
          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-space-black/60 border border-white/10 backdrop-blur-xl hover:border-cyan-glow/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-lg font-bold font-mono text-cyan-glow group-hover:scale-110 transition-transform">
                    {step.num}
                  </span>
                  <div className="p-1 rounded-lg bg-white/5 border border-white/10 text-cyan-glow">
                    <IconComp className="w-3.5 h-3.5" />
                  </div>
                </div>
                <h3 className="text-xs sm:text-sm font-bold font-syne text-white mb-1">{step.title}</h3>
                <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed font-light mb-1.5">
                  {step.desc}
                </p>
              </div>
              {step.note && (
                <div className="mt-1 p-1 rounded-lg bg-cyan-glow/10 border border-cyan-glow/20 text-[10px] font-mono text-cyan-glow">
                  {step.note}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Consulting Section */}
      <div className="w-full p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-space-black via-space-black to-space-black/90 border border-gold-accent/30 backdrop-blur-xl text-left">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="p-1 rounded-lg bg-gold-accent/10 border border-gold-accent/30 text-gold-accent">
            <HelpCircle className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-xs sm:text-sm font-bold font-syne text-white">We Help You Launch</h3>
        </div>
        <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed font-light">
          We complement engineering with digital marketing, branding, and consultation to support long-term business growth.
        </p>
      </div>
    </div>
  );
}
