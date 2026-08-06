"use client";

import React, { useEffect, useRef, useState } from "react";
import { Globe, MapPin, Sparkles } from "lucide-react";

export default function ClientTrustMap() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeSite, setActiveSite] = useState<any>(null);

  const locations = [
    { name: "Silicon Valley, USA", project: "Nexis Telemetry Suite", lat: 0.3, lng: 0.45, stats: "40% latency drop" },
    { name: "London, UK", project: "VitalsSync Hub", lat: 0.45, lng: 0.4, stats: "200k active patients" },
    { name: "Berlin, Germany", project: "LeadSprint CRM Backend", lat: 0.48, lng: 0.42, stats: "₹10,00,000/mo labor save" },
    { name: "Tokyo, Japan", project: "Zenith Exchange Dashboard", lat: 0.75, lng: 0.65, stats: "Sub-3ms Websockets sync" },
    { name: "Mumbai, India", project: "Zibrin Headquarters (BKC)", lat: 0.65, lng: 0.58, stats: "Core India Lab Command Nucleus" },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Array<{ x: number; y: number; alpha: number; size: number }> = [];

    const init = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = 360;

      // Initialize background dots for world layout simulation
      particles = [];
      const density = 600;
      for (let i = 0; i < density; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          alpha: 0.1 + Math.random() * 0.4,
          size: 1 + Math.random() * 1.5,
        });
      }
    };

    init();
    window.addEventListener("resize", init);

    const render = () => {
      ctx.fillStyle = "#05070F";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render dotted backdrop representing continents
      particles.forEach((p) => {
        ctx.fillStyle = `rgba(62, 242, 255, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      const w = canvas.width;
      const h = canvas.height;

      // Draw connection vectors mapping global network
      // Anchor Mumbai center
      const centerLoc = locations.find((l) => l.name.includes("Mumbai")) || locations[4];
      const cx = centerLoc.lat * w;
      const cy = centerLoc.lng * h;

      locations.forEach((loc) => {
        const tx = loc.lat * w;
        const ty = loc.lng * h;

        // Draw connections
        ctx.strokeStyle = "rgba(139, 92, 255, 0.15)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.quadraticCurveTo((cx + tx) / 2, Math.min(cy, ty) - 40, tx, ty); // arc
        ctx.stroke();

        // Draw targets
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#3EF2FF";
        ctx.fillStyle = "#3EF2FF";
        ctx.beginPath();
        ctx.arc(tx, ty, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <section id="network" className="relative py-20 md:py-32 w-full overflow-hidden bg-space-black">
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-glow/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[10px] font-mono text-cyan-glow tracking-widest uppercase block mb-3">
            08 // THE GLOBAL TRUST COMMAND
          </span>
          <h2 className="text-3xl md:text-5xl font-syne font-extrabold uppercase text-white mb-6">
            GLOBAL NETWORK
          </h2>
          <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
            Our systems run on load-balanced edge platforms spanning the globe. Check active project locations and their verified telemetry parameters.
          </p>
        </div>

        {/* World Network Monitor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Map canvas */}
          <div className="lg:col-span-8 h-[360px] relative glass-panel border-white/5 rounded-xl overflow-hidden bg-space-black/50">
            <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(47,128,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(47,128,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
            
            {/* Map Pin overlays */}
            {locations.map((loc, idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => setActiveSite(loc)}
                  className="absolute p-1 cursor-pointer transition-transform duration-300 hover:scale-125 z-20 group"
                  style={{
                    left: `${loc.lat * 95}%`,
                    top: `${loc.lng * 85}%`
                  }}
                >
                  <MapPin className="w-4 h-4 text-cyan-glow group-hover:text-white drop-shadow-[0_0_8px_rgba(62,242,255,0.6)]" />
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-5 bg-space-black/90 border border-white/10 px-2 py-0.5 rounded text-[8px] font-mono text-neutral-300 opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none">
                    {loc.name.split(",")[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Success Stories status widget */}
          <div className="lg:col-span-4 glass-panel border-cyan-glow/15 p-6 rounded-xl bg-space-black/50 flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-3 font-mono text-[9px] text-cyan-glow/40">
              SYS // MAP_DIAG_08
            </div>

            {activeSite ? (
              <div>
                <span className="text-[9px] font-mono text-cyan-glow uppercase tracking-widest block mb-2">
                  TELEMETRY REPORT
                </span>
                <h4 className="text-xs font-orbitron font-bold text-white uppercase mb-1">
                  {activeSite.project}
                </h4>
                <p className="text-[11px] text-neutral-500 font-mono mb-4">
                  LOCATION: {activeSite.name}
                </p>
                <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                  <span className="text-cyan-glow block text-[8px] font-mono uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 animate-pulse" />
                    <span>MEASURED ROI OUTCOME</span>
                  </span>
                  <p className="text-xs text-white leading-normal font-bold">
                    {activeSite.stats}
                  </p>
                </div>
              </div>
            ) : (
              <div className="my-auto text-center py-8">
                <Globe className="w-8 h-8 text-neutral-600 mx-auto mb-3 animate-spin" style={{ animationDuration: "12s" }} />
                <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                  CLICK ACTIVE MAP MAP-PINS TO INITIALIZE DATA REPORTS
                </p>
              </div>
            )}

            <div className="border-t border-white/5 pt-4 mt-6 text-[10px] font-mono text-neutral-500 uppercase tracking-widest flex justify-between items-center">
              <span>ORBITAL SYNC</span>
              <span className="text-cyan-glow">ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
