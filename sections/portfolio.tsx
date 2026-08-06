"use client";

import React, { useState, useEffect, useRef } from "react";
import portfolioData from "@/content/case-studies/case-studies.json";
import { Laptop, Smartphone, Tablet, Monitor, X, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import Card3DTilt from "@/components/card-3d-tilt";

export default function PortfolioUniverse() {
  const [activeProject, setActiveProject] = useState<typeof portfolioData[0] | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  const deviceIcons: Record<string, React.ComponentType<any>> = {
    laptop: Laptop,
    phone: Smartphone,
    tablet: Tablet,
    desktop: Monitor,
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Projection animation on viewport entry
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, transform: "perspective(600px) translate3d(0, 0, -120px) rotateX(15deg)", filter: "blur(8px)" },
        {
          opacity: 1,
          transform: "perspective(600px) translate3d(0, 0, 0) rotateX(0deg)",
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="portfolio" className="relative py-20 md:py-32 w-full overflow-hidden bg-space-black">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-neon-violet/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="text-[10px] font-mono text-cyan-glow tracking-widest uppercase block mb-3">
            04 // PORTFOLIO UNIVERSE
          </span>
          <h2 ref={titleRef} className="text-3xl md:text-5xl font-syne font-extrabold uppercase text-white mb-6 tracking-wide">
            CASE STUDIES
          </h2>
          <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
            Case studies project forward from virtual workspace frames. Hover to initialize circuit assembly.
          </p>
        </div>

        {/* 3D Holographic Monitor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {portfolioData.map((project, idx) => {
            const DeviceIcon = deviceIcons[project.deviceType] || Laptop;

            return (
              <Card3DTilt key={idx} intensity={12}>
                <div
                  onClick={() => setActiveProject(project)}
                  className="energy-border glass-panel p-6 rounded-xl bg-space-black/40 cursor-pointer group transition-all duration-500 hover:bg-white/[0.01] hover:shadow-[0_0_20px_rgba(62,242,255,0.15)] relative overflow-hidden h-full flex flex-col justify-between"
                >
                {/* SVG path drawing border on hover */}
                <div className="energy-border-line">
                  <svg className="absolute inset-0 w-full h-full">
                    <rect
                      x="0.75"
                      y="0.75"
                      width="99.5%"
                      height="99.5%"
                      rx="12"
                      fill="none"
                      stroke="url(#loader-blue-grad)"
                      strokeWidth="1.5"
                      strokeDasharray="100 600"
                      strokeDashoffset="0"
                      className="transition-all duration-1000 group-hover:stroke-dashoffset-[700]"
                    />
                  </svg>
                </div>

                <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-neutral-600">
                  MONITOR_0{idx + 1}
                </div>

                {/* Device Icon and Title with Assembly/Unlock look */}
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="p-2.5 bg-cyan-glow/10 border border-cyan-glow/20 rounded-lg text-cyan-glow group-hover:bg-cyan-glow/20 group-hover:border-cyan-glow/40 transition-all duration-300">
                    <DeviceIcon className="w-5 h-5 group-hover:rotate-6 transition-transform" />
                  </div>
                  <div>
                    <h3 className="text-sm font-orbitron font-bold text-white uppercase group-hover:text-cyan-glow transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-[10px] font-mono text-neutral-500 uppercase">
                      CLIENT // {project.client}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed mb-6 relative z-10">
                  {project.description.slice(0, 110)}...
                </p>

                {/* Stacks */}
                <div className="flex flex-wrap gap-1 mb-4 relative z-10">
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] font-mono text-neutral-400 group-hover:border-cyan-glow/20 group-hover:text-white transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="border-t border-white/5 pt-4 flex justify-between items-center text-[10px] font-mono text-neutral-500 relative z-10">
                  <span>ROI: {project.results.split(" ")[0]}</span>
                  <span className="text-cyan-glow group-hover:translate-x-1 transition-transform">
                    PROJECT SYSTEM &gt;
                  </span>
                </div>
              </div>
            </Card3DTilt>
            );
          })}
        </div>
      </div>

      {/* Holographic Spec Details Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-space-black/85 backdrop-blur-md">
          <div className="glass-panel border-cyan-glow/30 p-6 md:p-8 rounded-xl max-w-2xl w-full bg-gradient-to-b from-space-black to-card-bg relative animate-pulse-glow max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-4 right-4 p-2 border border-white/10 rounded hover:border-cyan-glow/40 text-neutral-400 hover:text-white transition-all duration-300 cursor-pointer animate-pulse"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-[9px] font-mono text-cyan-glow uppercase tracking-widest block mb-1">
              SYS // HOLO_SPEC_ACTIVE
            </span>
            <h3 className="text-xl md:text-2xl font-orbitron font-bold text-white uppercase tracking-wide mb-4">
              {activeProject.title}
            </h3>

            <div className="space-y-4 mb-6">
              <div>
                <span className="text-neutral-500 block text-[9px] font-mono uppercase tracking-wider">
                  CASE OVERVIEW
                </span>
                <p className="text-xs md:text-sm text-neutral-300 leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-neutral-500 block text-[9px] font-mono uppercase tracking-wider">
                    ESTIMATED BUDGET
                  </span>
                  <span className="text-sm font-orbitron font-bold text-cyan-glow">
                    {activeProject.priceRange}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[9px] font-mono uppercase tracking-wider">
                    TIMELINE
                  </span>
                  <span className="text-sm font-orbitron font-bold text-white">
                    {activeProject.duration}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-neutral-500 block text-[9px] font-mono uppercase tracking-wider mb-1.5">
                  CORE TECH INTEGRATIONS
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                <span className="text-cyan-glow block text-[9px] font-mono uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>MEASURED BUSINESS ROI</span>
                </span>
                <p className="text-xs text-white leading-relaxed font-bold">
                  {activeProject.results}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-white/5 pt-4">
              <button
                onClick={() => setActiveProject(null)}
                className="px-5 py-2 border border-white/10 hover:border-cyan-glow/30 text-neutral-400 hover:text-white text-xs font-mono tracking-widest rounded transition-all duration-300 cursor-pointer"
              >
                CLOSE SPECIFICATION
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
