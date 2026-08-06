"use client";

import React, { useState } from "react";
import { ArrowRight, Sparkles, CheckCircle2, RefreshCw } from "lucide-react";

interface BuilderData {
  goal: string;
  scale: string;
  features: string[];
}

export default function DigitalProductBuilder({ onComplete }: { onComplete?: (data: any) => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<BuilderData>({
    goal: "",
    scale: "",
    features: [],
  });

  const goals = [
    { id: "web", title: "Enterprise Web App", desc: "NextJS 15 server-rendered platform.", basePrice: 150000, baseWeeks: 6 },
    { id: "ai", title: "Cognitive AI System", desc: "Autonomous AI agents, RAG, custom LLMs.", basePrice: 250000, baseWeeks: 8 },
    { id: "mobile", title: "Cross-Platform Mobile App", desc: "Flutter native-performance suite.", basePrice: 200000, baseWeeks: 10 },
    { id: "crm", title: "Custom ERP / CRM", desc: "Consolidated enterprise operations pipeline.", basePrice: 350000, baseWeeks: 12 },
  ];

  const scales = [
    { id: "mvp", title: "VC-Backed Startup MVP", desc: "Rapid prototype focused on core features.", multiplier: 0.9 },
    { id: "scale", title: "Commercial Scaling", desc: "Optimized for high traffic, security, and SEO.", multiplier: 1.2 },
    { id: "enterprise", title: "Elite Command Core", desc: "Maximum specifications, custom shaders, multi-tier databases.", multiplier: 1.6 },
  ];

  const features = [
    { id: "ai-bot", title: "OpenAI / Claude Chat Integrations", desc: "Live client-facing conversational assistants.", price: 50000, weeks: 2 },
    { id: "billing", title: "Razorpay / Stripe Billing", desc: "Recurring subscriptions, multi-tenant invoices.", price: 35000, weeks: 1 },
    { id: "seo", title: "GEO / AEO Search Pipeline", desc: "Structured knowledge graphs indexed for search engines.", price: 40000, weeks: 1 },
    { id: "cloud", title: "Dockerized AWS Setup", desc: "CI/CD automated deployment pipelines.", price: 60000, weeks: 2 },
    { id: "support", title: "Post-Launch Laboratory Care", desc: "Ongoing server diagnostics and updates.", price: 25000, weeks: 0 },
  ];

  const handleGoalSelect = (goalId: string) => {
    setFormData((prev) => ({ ...prev, goal: goalId }));
    setStep(2);
  };

  const handleScaleSelect = (scaleId: string) => {
    setFormData((prev) => ({ ...prev, scale: scaleId }));
    setStep(3);
  };

  const toggleFeature = (featureId: string) => {
    setFormData((prev) => {
      const exists = prev.features.includes(featureId);
      if (exists) {
        return { ...prev, features: prev.features.filter((id) => id !== featureId) };
      } else {
        return { ...prev, features: [...prev.features, featureId] };
      }
    });
  };

  const resetBuilder = () => {
    setFormData({ goal: "", scale: "", features: [] });
    setStep(1);
  };

  // Calculations
  const selectedGoal = goals.find((g) => g.id === formData.goal);
  const selectedScale = scales.find((s) => s.id === formData.scale);

  let totalPrice = 0;
  let totalWeeks = 0;
  let recommendedStack: string[] = [];

  if (selectedGoal && selectedScale) {
    let basePrice = selectedGoal.basePrice;
    let baseWeeks = selectedGoal.baseWeeks;

    // Apply scale multiplier
    basePrice *= selectedScale.multiplier;
    baseWeeks *= selectedScale.multiplier;

    // Sum features
    const featuresPrice = formData.features.reduce((sum, fId) => {
      const feat = features.find((f) => f.id === fId);
      return sum + (feat?.price || 0);
    }, 0);

    const featuresWeeks = formData.features.reduce((sum, fId) => {
      const feat = features.find((f) => f.id === fId);
      return sum + (feat?.weeks || 0);
    }, 0);

    totalPrice = Math.round(basePrice + featuresPrice);
    totalWeeks = Math.round(baseWeeks + featuresWeeks);

    // Recommended stack based on selections
    if (formData.goal === "web") recommendedStack = ["Next.js 15", "TypeScript", "TailwindCSS", "PostgreSQL", "Vercel"];
    if (formData.goal === "ai") recommendedStack = ["Python", "OpenAI Assistant API", "Pinecone VectorDB", "LangChain", "AWS"];
    if (formData.goal === "mobile") recommendedStack = ["Flutter", "Dart", "Firebase", "Node.js", "SQLite"];
    if (formData.goal === "crm") recommendedStack = ["Laravel", "PostgreSQL", "React", "Docker", "AWS"];

    if (formData.features.includes("seo")) recommendedStack.push("JSON-LD Entity Graphs");
    if (formData.features.includes("billing")) recommendedStack.push("Stripe Billing");
  }

  const handleNext = () => {
    if (step === 3) {
      setStep(4);
    }
  };

  const handleConsult = () => {
    if (onComplete) {
      onComplete({
        ...formData,
        calculatedPrice: totalPrice,
        calculatedWeeks: totalWeeks,
        recommendedStack,
      });
    }
    // Scroll smoothly to contact section
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full glass-panel border-cyan-glow/15 rounded-xl p-6 md:p-8 bg-space-black/60 relative overflow-hidden">
      <div className="absolute top-0 left-0 p-4 font-mono text-[9px] text-cyan-glow/40">
        SYS // PROJECT_BUILDER_INIT
      </div>

      {step < 4 && (
        <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
            STEP 0{step} OF 03
          </span>
          <div className="flex gap-1">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-8 h-1 rounded ${s <= step ? "bg-cyan-glow shadow-neon-cyan" : "bg-neutral-800"}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step 1: Goal Select */}
      {step === 1 && (
        <div>
          <h3 className="text-xl md:text-2xl font-orbitron font-bold tracking-wide text-white mb-2">
            Select Your Project Goal
          </h3>
          <p className="text-xs text-neutral-400 font-mono mb-6 uppercase tracking-wider">
            Define the core digital structure of your future system.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goals.map((g) => (
              <button
                key={g.id}
                onClick={() => handleGoalSelect(g.id)}
                className="text-left p-5 border border-white/10 rounded-lg hover:border-cyan-glow/40 bg-white/5 hover:bg-cyan-glow/5 transition-all duration-300 interactive glass-panel-hover"
              >
                <h4 className="text-sm font-orbitron font-bold text-white mb-1">{g.title}</h4>
                <p className="text-xs text-neutral-400">{g.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Scale Select */}
      {step === 2 && (
        <div>
          <h3 className="text-xl md:text-2xl font-orbitron font-bold tracking-wide text-white mb-2">
            Define Project Scale
          </h3>
          <p className="text-xs text-neutral-400 font-mono mb-6 uppercase tracking-wider">
            Determine security requirements, speed constraints, and visual assets complexity.
          </p>
          <div className="grid grid-cols-1 gap-4 mb-6">
            {scales.map((s) => (
              <button
                key={s.id}
                onClick={() => handleScaleSelect(s.id)}
                className="text-left p-5 border border-white/10 rounded-lg hover:border-cyan-glow/40 bg-white/5 hover:bg-cyan-glow/5 transition-all duration-300 interactive glass-panel-hover"
              >
                <h4 className="text-sm font-orbitron font-bold text-white mb-1">{s.title}</h4>
                <p className="text-xs text-neutral-400">{s.desc}</p>
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep(1)}
            className="text-xs text-cyan-glow font-mono tracking-widest hover:underline"
          >
            &lt; BACK TO GOALS
          </button>
        </div>
      )}

      {/* Step 3: Features Config */}
      {step === 3 && (
        <div>
          <h3 className="text-xl md:text-2xl font-orbitron font-bold tracking-wide text-white mb-2">
            Customize Advanced Integrations
          </h3>
          <p className="text-xs text-neutral-400 font-mono mb-6 uppercase tracking-wider">
            Select specialized components for your digital ecosystem.
          </p>
          <div className="space-y-3 mb-6">
            {features.map((f) => {
              const isSelected = formData.features.includes(f.id);
              return (
                <div
                  key={f.id}
                  onClick={() => toggleFeature(f.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-between ${
                    isSelected ? "border-cyan-glow bg-cyan-glow/5" : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <div>
                    <h4 className="text-xs font-orbitron font-bold text-white mb-0.5">{f.title}</h4>
                    <p className="text-[11px] text-neutral-400">{f.desc}</p>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected ? "border-cyan-glow bg-cyan-glow" : "border-white/20"
                    }`}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 bg-space-black rounded-full" />}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={() => setStep(2)}
              className="text-xs text-cyan-glow font-mono tracking-widest hover:underline"
            >
              &lt; BACK TO SCALE
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-gradient-to-r from-electric-blue to-neon-violet text-white text-xs font-mono tracking-widest rounded border border-cyan-glow/20 flex items-center gap-1 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>GENERATE SPECIFICATIONS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Summary Output */}
      {step === 4 && selectedGoal && selectedScale && (
        <div className="space-y-6">
          <div className="flex justify-between items-start border-b border-white/5 pb-4">
            <div>
              <h3 className="text-xl md:text-2xl font-orbitron font-bold tracking-wide text-white">
                Specifications Mapped
              </h3>
              <p className="text-[10px] text-neutral-500 font-mono mt-0.5 uppercase tracking-widest">
                AUTOMATED SYSTEM DIAGNOSTICS COMPLETED
              </p>
            </div>
            <button
              onClick={resetBuilder}
              className="p-2 border border-white/10 rounded hover:border-cyan-glow/30 text-neutral-400 hover:text-white transition-all duration-300 flex items-center gap-1.5 text-[9px] font-mono tracking-wider"
            >
              <RefreshCw className="w-3 h-3" />
              <span>RECALCULATE</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Timeline */}
            <div className="glass-panel p-5 border-white/5 rounded-lg bg-space-black/40">
              <span className="block text-[9px] font-mono text-neutral-500 uppercase tracking-widest mb-1">
                ESTIMATED TIMELINE
              </span>
              <span className="text-2xl font-orbitron font-bold text-white">{totalWeeks} WEEKS</span>
            </div>

            {/* Price */}
            <div className="glass-panel p-5 border-cyan-glow/20 rounded-lg bg-cyan-glow/5 shadow-neon-cyan">
              <span className="block text-[9px] font-mono text-neutral-500 uppercase tracking-widest mb-1">
                BUDGET RANGE
              </span>
              <span className="text-2xl font-orbitron font-bold text-cyan-glow">
                ₹{totalPrice.toLocaleString('en-IN')} - ₹{(totalPrice + 50000).toLocaleString('en-IN')}
              </span>
            </div>

            {/* Core Tech Stack */}
            <div className="glass-panel p-5 border-white/5 rounded-lg bg-space-black/40">
              <span className="block text-[9px] font-mono text-neutral-500 uppercase tracking-widest mb-1">
                PROPOSED STACK
              </span>
              <div className="flex flex-wrap gap-1 mt-1">
                {recommendedStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-1.5 py-0.5 bg-white/5 border border-white/15 rounded text-[9px] font-mono text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Path summary card */}
          <div className="p-5 border border-white/5 bg-white/5 rounded-lg">
            <h4 className="text-xs font-orbitron font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-glow" />
              <span>Design System Recommendation</span>
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Based on selecting a <strong className="text-white">{selectedScale.title}</strong> targeting a{" "}
              <strong className="text-white">{selectedGoal.title}</strong>, we recommend utilizing a serverless architecture powered by{" "}
              <strong>Next.js 15 Edge rendering</strong> and secure <strong>JSON-LD entity data schemas</strong> to maximize your answer engine (AEO) search visibility.
            </p>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleConsult}
              className="flex-1 px-8 py-3 bg-gradient-to-r from-electric-blue to-neon-violet text-white text-xs font-mono tracking-widest rounded border border-cyan-glow/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-neon-blue cursor-pointer"
            >
              <span>GENERATE CRM PROPOSAL</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
