"use client";

import React, { useState, useEffect, useRef } from "react";
import servicesData from "@/content/services/services.json";
import { Globe, Cpu, Smartphone, Layers, Cloud, Search, ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function ServicesGalaxy() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderState = useRef({ isOffscreen: false, isTabVisible: true });

  const activeService = servicesData[activeIndex];

  const iconMap: Record<string, React.ComponentType<any>> = {
    Globe: Globe,
    Cpu: Cpu,
    Smartphone: Smartphone,
    Layers: Layers,
    Cloud: Cloud,
    Search: Search,
  };

  useEffect(() => {
    // Detect mobile viewports to toggle adaptive layouts
    const handleViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleViewport();
    window.addEventListener("resize", handleViewport);
    return () => window.removeEventListener("resize", handleViewport);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Skip rendering canvases on mobile

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Visibility API listeners
    const handleVisibility = () => {
      renderState.current.isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Culling Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        renderState.current.isOffscreen = !entry.isIntersecting;
      });
    });
    observer.observe(canvas);

    const render = () => {
      if (renderState.current.isOffscreen || !renderState.current.isTabVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw faint orbit tracks
      ctx.strokeStyle = "rgba(47, 128, 255, 0.05)";
      ctx.lineWidth = 1;
      for (let r = 80; r <= 200; r += 40) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Center Core
      const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, 25);
      grad.addColorStop(0, "#FFFFFF");
      grad.addColorStop(0.4, "#3EF2FF");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 25, 0, Math.PI * 2);
      ctx.fill();

      // Orbit step
      angle += prefersReducedMotion ? 0 : 0.003;

      servicesData.forEach((service, index) => {
        const offsetAngle = angle + (index * (Math.PI * 2)) / servicesData.length;
        const orbitRadius = 100 + (index % 3) * 35;
        const x = cx + Math.cos(offsetAngle) * orbitRadius;
        const y = cy + Math.sin(offsetAngle) * orbitRadius;

        const isCurrent = index === activeIndex;

        ctx.strokeStyle = isCurrent ? "rgba(139, 92, 255, 0.3)" : "rgba(62, 242, 255, 0.06)";
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.stroke();

        if (isCurrent) {
          ctx.strokeStyle = "#3EF2FF";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x, y, 14, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.fillStyle = isCurrent ? "#8B5CFF" : "#2F80FF";
        ctx.beginPath();
        ctx.arc(x, y, isCurrent ? 8 : 5, 0, Math.PI * 2);
        ctx.fill();

        if (isCurrent) {
          ctx.fillStyle = "#FFFFFF";
          ctx.font = "bold 9px var(--font-orbitron)";
          ctx.textAlign = "center";
          ctx.fillText(service.name.toUpperCase(), x, y - 20);
        }
      });

      animId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 400;
      canvas.height = canvas.parentElement?.clientHeight || 400;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    render();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", handleResize);
    };
  }, [activeIndex, isMobile]);

  const SelectedIcon = iconMap[activeService.icon] || Globe;

  // Render Mobile-first Adaptive Accordion cards
  if (isMobile) {
    return (
      <div className="space-y-4 w-full">
        {servicesData.map((item, idx) => {
          const ItemIcon = iconMap[item.icon] || Globe;
          const isOpen = idx === activeIndex;

          return (
            <div
              key={idx}
              className={`glass-panel border-white/5 rounded-xl overflow-hidden transition-all duration-300 ${
                isOpen ? "border-cyan-glow/30 bg-cyan-glow/5" : "bg-space-black/40"
              }`}
            >
              {/* Trigger */}
              <button
                onClick={() => setActiveIndex(idx)}
                className="w-full flex items-center justify-between p-5 text-left interactive"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isOpen ? "bg-cyan-glow/20 text-cyan-glow" : "bg-white/5 text-neutral-400"}`}>
                    <ItemIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-orbitron font-bold text-white uppercase tracking-wider">
                    {item.name}
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-cyan-glow">
                  {isOpen ? "ACTIVE" : "EXPAND &gt;"}
                </span>
              </button>

              {/* Expander */}
              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-white/5 space-y-4 animate-float" style={{ animationDuration: "10s" }}>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {item.description}
                  </p>

                  <div>
                    <h4 className="text-[10px] font-mono text-cyan-glow uppercase tracking-wider mb-2">
                      Core Deliverables
                    </h4>
                    <ul className="space-y-1.5">
                      {item.deliverables.map((del, dIdx) => (
                        <li key={dIdx} className="flex items-center gap-2 text-xs text-neutral-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-neon-violet" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <div>
                      <span className="block text-[8px] font-mono text-neutral-500 uppercase tracking-widest">
                        TIMELINE / BUDGET
                      </span>
                      <span className="text-xs font-orbitron font-bold text-white">
                        {item.timeline} // <span className="text-cyan-glow">{item.priceRange}</span>
                      </span>
                    </div>
                    <a
                      href="#product-builder"
                      className="px-4 py-2 bg-gradient-to-r from-electric-blue to-neon-violet text-white text-[10px] font-mono tracking-widest rounded border border-cyan-glow/20 flex items-center gap-1.5 shadow-neon-blue"
                    >
                      <span>CONFIGURE</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // Desktop layout with 3D Orbit Canvas
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full min-h-[500px]">
      <div className="lg:col-span-5 h-[350px] lg:h-[450px] relative flex items-center justify-center glass-panel border-white/5 rounded-xl overflow-hidden order-2 lg:order-1 bg-space-black/50">
        <canvas ref={canvasRef} className="absolute inset-0 block pointer-events-none" />
        <div className="absolute inset-x-0 bottom-4 flex flex-wrap justify-center gap-2 px-4 z-20">
          {servicesData.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`px-3 py-1 text-[10px] font-mono tracking-widest rounded border transition-all duration-300 ${
                idx === activeIndex
                  ? "bg-cyan-glow/20 border-cyan-glow text-white shadow-neon-cyan"
                  : "bg-space-black border-white/10 text-neutral-400 hover:border-cyan-glow/30"
              }`}
            >
              {item.name.split(" ")[0].toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-7 flex flex-col justify-between glass-panel border-cyan-glow/15 p-6 md:p-8 rounded-xl h-[450px] overflow-y-auto order-1 lg:order-2 bg-gradient-to-br from-space-black to-card-bg relative">
        <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-cyan-glow/50">
          SYS // SPEC_MODULE_0{activeIndex + 1}
        </div>
        
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-cyan-glow/10 border border-cyan-glow/30 rounded-lg text-cyan-glow shadow-neon-cyan">
              <SelectedIcon className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-orbitron text-white font-bold tracking-wide">
                {activeService.name}
              </h3>
              <p className="text-xs text-neutral-500 font-mono tracking-widest uppercase">
                {activeService.metrics}
              </p>
            </div>
          </div>

          <p className="text-neutral-300 text-sm leading-relaxed mb-6">
            {activeService.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="text-[11px] font-mono text-cyan-glow tracking-widest uppercase mb-2">
                Core Deliverables
              </h4>
              <ul className="space-y-1.5">
                {activeService.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-neutral-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neon-violet" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-mono text-cyan-glow tracking-widest uppercase mb-2">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {activeService.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 mt-auto">
          <div className="flex flex-wrap gap-y-4 justify-between items-center">
            <div className="flex gap-6">
              <div>
                <span className="block text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
                  EST. DURATION
                </span>
                <span className="text-sm font-orbitron font-bold text-white">
                  {activeService.timeline}
                </span>
              </div>
              <div>
                <span className="block text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
                  BUDGET BRACKET
                </span>
                <span className="text-sm font-orbitron font-bold text-cyan-glow">
                  {activeService.priceRange}
                </span>
              </div>
            </div>
            
            <a
              href="#product-builder"
              className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-electric-blue to-neon-violet text-white text-xs font-mono tracking-widest rounded border border-cyan-glow/20 hover:scale-105 transition-all duration-300 shadow-neon-blue"
            >
              <span>CONFIGURE SERVICE</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
