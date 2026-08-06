"use client";

import React from "react";
import { Sparkles, Terminal, Activity, Eye } from "lucide-react";
import Card3DTilt from "@/components/card-3d-tilt";
import DeveloperWorkspace from "@/components/developer-workspace";

export default function WhoWeAre() {
  const cards = [
    {
      icon: Eye,
      title: "FUTURE VISION",
      subtitle: "Zibrin evolves before technology.",
      desc: "We align architectures to support the demands of tomorrow. We map data schemas, entity structures, and scaling plans that outlast standard framework life cycles.",
      color: "text-cyan-glow",
      border: "border-cyan-glow/20",
    },
    {
      icon: Terminal,
      title: "THE LAB MISSION",
      subtitle: "Beyond coding. We engineer.",
      desc: "Our target is not just deploying websites, but engineering complete digital ecosystems: custom ERP engines, LLM fine-tuning structures, and extreme-performance frontends.",
      color: "text-electric-blue",
      border: "border-electric-blue/20",
    },
    {
      icon: Activity,
      title: "OUR CULTURE",
      subtitle: "Innovation never stops.",
      desc: "Operating as an elite R&D laboratory. Every developer is a system architect focused on code cleanliness, Core Web Vitals optimization, and robust security practices.",
      color: "text-neon-violet",
      border: "border-neon-violet/20",
    },
    {
      icon: Sparkles,
      title: "AI FIRST PHILOSOPHY",
      subtitle: "Human + Machine intelligence.",
      desc: "Deploying production-ready AI pipelines. We bridge raw algorithms with practical business workflows, developing agent networks that cut labor overhead in half.",
      color: "text-gold-accent",
      border: "border-gold-accent/20",
    },
  ];

  return (
    <section id="about" className="relative py-16 md:py-28 w-full overflow-hidden bg-space-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,255,0.03),transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <span className="text-[10px] font-mono text-cyan-glow tracking-widest uppercase block mb-3">
            01 // THE INNOVATION CHAMBER
          </span>
          <h2 className="text-3xl md:text-5xl font-syne font-extrabold uppercase text-white mb-6">
            WHO WE ARE
          </h2>
          <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
            Imagine if every visitor feels: <strong className="text-white">“These aren’t website developers. These people engineer the future.”</strong> We are a digital engineering laboratory based in India, building software for global scale.
          </p>
        </div>

        {/* 3D Holographic Developer Workstation (source.gif) */}
        <DeveloperWorkspace />

        {/* 4 Cards Grid with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-12">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Card3DTilt key={idx} intensity={10}>
                <div
                  className={`glass-panel ${card.border} p-6 md:p-8 rounded-xl flex flex-col justify-between group transition-all duration-500 hover:bg-white/[0.02] bg-space-black/40 h-full`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-3 rounded-lg bg-white/5 border border-white/10 ${card.color}`}>
                        <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <span className="font-mono text-[9px] text-neutral-600">
                        SYS // NODE_0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-base md:text-lg font-orbitron font-bold text-white mb-2 uppercase tracking-wider">
                      {card.title}
                    </h3>
                    <p className="text-xs text-cyan-glow/80 font-mono mb-4">
                      {card.subtitle}
                    </p>
                    <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                    <span>ACTIVE RUNTIME CONFIG</span>
                    <span className="text-neutral-400">READY</span>
                  </div>
                </div>
              </Card3DTilt>
            );
          })}
        </div>
      </div>
    </section>
  );
}
