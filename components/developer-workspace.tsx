"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Card3DTilt from "@/components/card-3d-tilt";
import { Terminal, Cpu, Activity, Code2, Sparkles, ShieldCheck, Zap } from "lucide-react";
import developerGif from "@/source.gif";

export default function DeveloperWorkspace() {
  const [activeTab, setActiveTab] = useState<"workspace" | "terminal" | "metrics">("workspace");
  const [locCount, setLocCount] = useState(48920);

  useEffect(() => {
    const interval = setInterval(() => {
      setLocCount((prev) => prev + Math.floor(Math.random() * 5) + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full my-12 relative">
      {/* Volumetric glow backdrop */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-72 bg-gradient-to-r from-cyan-glow/10 via-electric-blue/15 to-neon-violet/10 rounded-full blur-[110px] pointer-events-none" />

      <Card3DTilt intensity={12} className="w-full">
        <div className="w-full glass-panel border-cyan-glow/30 rounded-2xl overflow-hidden bg-space-black/80 shadow-[0_0_50px_rgba(62,242,255,0.15)] relative">
          
          {/* Holographic Header Bar */}
          <div className="px-4 md:px-6 py-3 border-b border-white/10 bg-white/5 flex flex-wrap items-center justify-between gap-3">
            {/* Window control dots */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-400/50 shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-400/50 shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-400/50 shadow-sm" />
              <span className="ml-2 text-[10px] font-mono text-cyan-glow tracking-widest uppercase font-bold flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-cyan-glow" />
                <span>DEV // COMMAND_CORE_v4.8</span>
              </span>
            </div>

            {/* Tab Toggles */}
            <div className="flex items-center gap-1 bg-space-black/60 p-1 rounded-lg border border-white/10">
              <button
                onClick={() => setActiveTab("workspace")}
                className={`px-3 py-1 rounded text-[10px] font-mono tracking-wider transition-all duration-300 flex items-center gap-1 ${
                  activeTab === "workspace"
                    ? "bg-cyan-glow/20 text-cyan-glow border border-cyan-glow/40 shadow-neon-cyan"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>3D WORKSPACE</span>
              </button>

              <button
                onClick={() => setActiveTab("terminal")}
                className={`px-3 py-1 rounded text-[10px] font-mono tracking-wider transition-all duration-300 flex items-center gap-1 ${
                  activeTab === "terminal"
                    ? "bg-cyan-glow/20 text-cyan-glow border border-cyan-glow/40 shadow-neon-cyan"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <Terminal className="w-3 h-3" />
                <span>AGENT LOGS</span>
              </button>

              <button
                onClick={() => setActiveTab("metrics")}
                className={`px-3 py-1 rounded text-[10px] font-mono tracking-wider transition-all duration-300 flex items-center gap-1 ${
                  activeTab === "metrics"
                    ? "bg-cyan-glow/20 text-cyan-glow border border-cyan-glow/40 shadow-neon-cyan"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <Activity className="w-3 h-3" />
                <span>TELEMETRY</span>
              </button>
            </div>
          </div>

          {/* Main Visual Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch min-h-[380px] md:min-h-[460px]">
            
            {/* Left 8 Cols: Developer Working Screen / GIF Container */}
            <div className="lg:col-span-8 relative bg-black/90 flex items-center justify-center overflow-hidden group">
              {/* Scanline hologram effect over GIF */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(62,242,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(62,242,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-space-black via-transparent to-transparent z-10 pointer-events-none" />

              {/* Holographic corner brackets */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-glow z-20 pointer-events-none" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-cyan-glow z-20 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-cyan-glow z-20 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-cyan-glow z-20 pointer-events-none" />

              {/* Developer GIF animation */}
              <div className="relative w-full h-[320px] md:h-[440px] flex items-center justify-center p-2">
                <img
                  src={typeof developerGif === "string" ? developerGif : (developerGif as any)?.src || "/source.gif"}
                  alt="Zibrin Lead AI Engineer Coding 3D Workstation"
                  className="w-full h-full object-contain rounded-lg shadow-2xl filter brightness-105 contrast-110"
                />
              </div>

              {/* Floating Live Indicator Badge */}
              <div className="absolute bottom-6 left-6 z-20 bg-space-black/90 border border-cyan-glow/40 px-3 py-1.5 rounded-full backdrop-blur-md flex items-center gap-2 shadow-neon-cyan">
                <span className="w-2 h-2 rounded-full bg-cyan-glow animate-ping" />
                <span className="text-[10px] font-mono text-white tracking-widest uppercase font-bold">
                  LIVE // LEAD ENGINEER CODING REAL-TIME ARCHITECTURE
                </span>
              </div>
            </div>

            {/* Right 4 Cols: Dynamic Workspace Diagnostics / Tabs */}
            <div className="lg:col-span-4 p-6 border-t lg:border-t-0 lg:border-l border-white/10 bg-space-black/90 flex flex-col justify-between">
              
              {activeTab === "workspace" && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-[10px] font-mono text-cyan-glow uppercase tracking-widest">
                      ACTIVE ENVIRONMENT
                    </span>
                    <span className="px-2 py-0.5 bg-green-500/20 text-green-400 border border-green-500/30 rounded text-[9px] font-mono">
                      SYNCED
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-orbitron font-bold text-white mb-1">
                      Lead Engineering Command
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                      Our engineers construct high-frequency web platforms, multi-agent AI brains, and custom 3D shader environments in real-time.
                    </p>
                  </div>

                  {/* Telemetry Stats */}
                  <div className="space-y-2 font-mono text-xs">
                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between">
                      <span className="text-neutral-400 text-[11px] flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5 text-cyan-glow" />
                        <span>COMPILED LOC:</span>
                      </span>
                      <span className="text-cyan-glow font-bold">{locCount.toLocaleString()}</span>
                    </div>

                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between">
                      <span className="text-neutral-400 text-[11px] flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-neon-violet" />
                        <span>QUANTUM AI NODES:</span>
                      </span>
                      <span className="text-white font-bold">128 ACTIVE</span>
                    </div>

                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between">
                      <span className="text-neutral-400 text-[11px] flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                        <span>CYBERNETIC SECURITY:</span>
                      </span>
                      <span className="text-green-400 font-bold">MIL-SPEC 256</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "terminal" && (
                <div className="font-mono text-[11px] space-y-2 text-neutral-300">
                  <span className="text-[10px] text-cyan-glow uppercase tracking-widest block mb-2">
                    &gt; AI AGENT REASONING STREAM
                  </span>
                  <div className="p-3 bg-black/60 border border-white/10 rounded-lg space-y-1.5 h-[240px] overflow-y-auto">
                    <p className="text-cyan-glow">[0.001s] Initializing Next.js 15 Server Components...</p>
                    <p className="text-neutral-400">[0.012s] Mounting Three.js 3D WebGL Shader Pipeline.</p>
                    <p className="text-purple-400">[0.045s] Connecting PyTorch Vector Embeddings Engine.</p>
                    <p className="text-green-400">[0.089s] Generative Engine Optimization (GEO) Graph Built.</p>
                    <p className="text-neutral-300">[0.120s] Indian Rupee (₹) Pricing Schema Verified.</p>
                    <p className="text-cyan-glow animate-pulse">[0.150s] System Ready for Client Deployment.</p>
                  </div>
                </div>
              )}

              {activeTab === "metrics" && (
                <div className="space-y-4 font-mono text-xs">
                  <span className="text-[10px] text-cyan-glow uppercase tracking-widest block">
                    TELEMETRY DASHBOARD
                  </span>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-neutral-400">GPU WebGL Render Latency</span>
                      <span className="text-cyan-glow">2.4 ms</span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-glow w-[25%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-neutral-400">AEO/GEO Indexing Rate</span>
                      <span className="text-neon-violet">99.8%</span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full bg-neon-violet w-[98%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-neutral-400">FPS Frame Rate Stability</span>
                      <span className="text-green-400">60.0 FPS</span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full bg-green-400 w-[100%]" />
                    </div>
                  </div>
                </div>
              )}

              {/* Status footer button */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-yellow-400 animate-bounce" />
                  <span className="text-[10px] font-mono text-neutral-400 uppercase">
                    MUMBAI CORE HUB
                  </span>
                </div>
                <a
                  href="#contact"
                  className="px-3 py-1.5 bg-gradient-to-r from-electric-blue to-neon-violet text-white rounded text-[10px] font-mono tracking-wider hover:scale-105 transition-all duration-300 shadow-neon-blue cursor-pointer"
                >
                  HIRE THE TEAM
                </a>
              </div>

            </div>

          </div>

        </div>
      </Card3DTilt>
    </div>
  );
}
