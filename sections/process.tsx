"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function EngineeringProcess() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { name: "Idea", desc: "Consultation, scope, parameters definition.", deliverables: ["Requirement Spec", "Core Goals List"] },
    { name: "Research", desc: "Competitor, keywords, entity mapping.", deliverables: ["GEO keyword map", "Entity graphs definition"] },
    { name: "Architecture", desc: "Database models, routing schemas.", deliverables: ["DB Schemas", "Next.js routing map"] },
    { name: "Design", desc: "Futuristic visual prototypes, shaders.", deliverables: ["UX wireframes", "Custom vector paths"] },
    { name: "Development", desc: "Next.js 15, React 19, TS assembly.", deliverables: ["Clean source code", "Component structures"] },
    { name: "Testing", desc: "Lint checks, Lighthouse audits.", deliverables: ["Lighthouse audit report", "E2E automated scripts"] },
    { name: "Deployment", desc: "Vercel edge load balanced server.", deliverables: ["Sitemap & SSL config", "Edge routing activation"] },
    { name: "Growth", desc: "Continuous scale, AEO index monitor.", deliverables: ["Performance diagnostics", "AI search citation checks"] },
  ];

  return (
    <section id="process" className="relative py-20 md:py-32 w-full overflow-hidden bg-space-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(62,242,255,0.02),transparent_50%)] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="text-[10px] font-mono text-cyan-glow tracking-widest uppercase block mb-3">
            03 // THE PRODUCTION PIPELINE
          </span>
          <h2 className="text-3xl md:text-5xl font-syne font-extrabold uppercase text-white mb-6">
            ENGINEERING PROCESS
          </h2>
          <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
            We don't follow static timelines. We orchestrate a dynamic production pipeline where each stage powers the next, flowing energy from concept to autonomous growth.
          </p>
        </div>

        {/* Dynamic Pipeline visualization */}
        <div className="glass-panel border-white/5 p-6 md:p-8 rounded-xl bg-space-black/50 mb-8 relative">
          <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-cyan-glow/40">
            SYS // PIPELINE_FLOW_READY
          </div>

          {/* Desktop flow line */}
          <div className="hidden lg:flex items-center justify-between relative mb-8 pt-8 pb-4">
            {/* Background connecting energy flow bar */}
            <div className="absolute left-4 right-4 top-1/2 h-[2px] bg-neutral-900 z-0">
              <div 
                className="h-full bg-gradient-to-r from-cyan-glow via-electric-blue to-neon-violet transition-all duration-500 shadow-neon-cyan" 
                style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
              />
            </div>

            {steps.map((step, idx) => {
              const isActive = idx === activeStep;
              const isPassed = idx < activeStep;

              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className="flex flex-col items-center z-10 focus:outline-none relative group"
                >
                  <div
                    className={`w-10 h-10 rounded-full border flex items-center justify-center font-mono text-[11px] transition-all duration-300 ${
                      isActive
                        ? "bg-cyan-glow border-cyan-glow text-space-black font-bold scale-110 shadow-neon-cyan"
                        : isPassed
                        ? "bg-space-black border-neon-violet text-neon-violet shadow-neon-violet"
                        : "bg-space-black border-white/10 text-neutral-500 hover:border-white/30"
                    }`}
                  >
                    0{idx + 1}
                  </div>
                  <span
                    className={`mt-3 text-[10px] font-mono tracking-widest uppercase transition-colors duration-300 ${
                      isActive ? "text-cyan-glow font-bold" : "text-neutral-500 group-hover:text-white"
                    }`}
                  >
                    {step.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mobile vertical flow */}
          <div className="lg:hidden flex flex-col gap-4 mb-8">
            {steps.map((step, idx) => {
              const isActive = idx === activeStep;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`flex items-center gap-4 p-3 border rounded-lg text-left transition-all duration-300 ${
                    isActive
                      ? "border-cyan-glow bg-cyan-glow/5"
                      : "border-white/5 bg-white/[0.01]"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center font-mono text-xs ${
                      isActive ? "bg-cyan-glow border-cyan-glow text-space-black" : "border-white/10 text-neutral-500"
                    }`}
                  >
                    0{idx + 1}
                  </div>
                  <div>
                    <h4 className={`text-xs font-orbitron font-bold uppercase ${isActive ? "text-cyan-glow" : "text-neutral-400"}`}>
                      {step.name}
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed stage panel */}
          <div className="border-t border-white/5 pt-6 mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8">
              <h3 className="text-lg font-orbitron font-bold text-white uppercase tracking-wider mb-2">
                STAGE 0{activeStep + 1} // {steps[activeStep].name}
              </h3>
              <p className="text-xs md:text-sm text-neutral-400 leading-relaxed max-w-xl">
                {steps[activeStep].desc}
              </p>
            </div>
            
            <div className="md:col-span-4 bg-white/5 border border-white/10 p-4 rounded-lg">
              <span className="block text-[9px] font-mono text-cyan-glow uppercase tracking-widest mb-2">
                ACTIVE DELIVERABLES
              </span>
              <ul className="space-y-1.5">
                {steps[activeStep].deliverables.map((del, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-neutral-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neon-violet" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
