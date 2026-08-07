"use client";

import React, { useState, useMemo, memo } from "react";
import { ArrowUpRight } from "lucide-react";

interface ProjectItem {
  title: string;
  category: string;
  desc: string;
  tech: string[];
  link: string;
}

const ProjectCard = memo(function ProjectCard({ proj }: { proj: ProjectItem }) {
  return (
    <div className="p-6 rounded-2xl bg-[#0A0E1C] border border-white/10 hover:border-cyan-glow/40 transition-transform duration-150 ease-out flex flex-col justify-between group transform-gpu-3d hover:-translate-y-0.5">
      <div>
        <div className="text-[10px] font-mono text-cyan-glow uppercase tracking-wider mb-2 font-semibold">
          {proj.category}
        </div>
        <h3 className="text-xl font-bold font-syne text-white mb-3 group-hover:text-cyan-glow transition-colors duration-150">
          {proj.title}
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed font-light mb-4">
          {proj.desc}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {proj.tech.map((t, tIdx) => (
            <span
              key={tIdx}
              className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-cyan-glow">
        <span>CASE STUDY // CONCEPT</span>
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" />
      </div>
    </div>
  );
});

export default function PortfolioFocusView() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const projects = useMemo(() => [
    {
      title: "Cognitive AI Automation Suite",
      category: "AI Engineering",
      desc: "Custom autonomous agent architecture, LLM orchestration, and spatial dashboard built for enterprise operations.",
      tech: ["OpenAI", "Python", "Next.js", "TailwindCSS"],
      link: "#",
    },
    {
      title: "Next-Gen 3D E-Commerce Platform",
      category: "WebGL & E-Commerce",
      desc: "High-performance digital commerce platform with interactive 3D product visualizers and instant checkout.",
      tech: ["Three.js", "React", "Node.js", "MongoDB"],
      link: "#",
    },
    {
      title: "Cross-Platform Health SaaS",
      category: "Mobile Systems",
      desc: "HIPAA-compliant cross-platform mobile ecosystem providing tele-health diagnostics and real-time biometrics.",
      tech: ["Flutter", "Firebase", "Supabase", "Dart"],
      link: "#",
    },
    {
      title: "Real-Time Supply Chain ERP",
      category: "Enterprise Software",
      desc: "Enterprise resource planning system integrating IoT sensors, fleet tracking, and automated inventory reconciliation.",
      tech: ["React Native", "Express.js", "MySQL", "Docker"],
      link: "#",
    },
  ], []);

  const filters = useMemo(() => ["All", "AI Engineering", "WebGL & E-Commerce", "Mobile Systems", "Enterprise Software"], []);

  const filteredProjects = useMemo(() => {
    if (selectedFilter === "All") return projects;
    return projects.filter((p) => p.category === selectedFilter);
  }, [selectedFilter, projects]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-[#0A0E1C] border border-cyan-glow/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-glow/10 rounded-full blur-3xl" />
        <h2 className="text-2xl md:text-4xl font-bold font-syne text-white mb-2">
          Portfolio Showcase & <span className="bg-gradient-to-r from-cyan-glow via-electric-blue to-neon-violet bg-clip-text text-transparent">Case Monoliths</span>
        </h2>
        <p className="text-xs md:text-sm text-slate-300 font-light leading-relaxed max-w-3xl">
          Reserved for future projects. Explore active case study concepts engineered with WebGL, AI integration, and modern software standards.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedFilter(filter)}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-150 cursor-pointer ${
              selectedFilter === filter
                ? "bg-cyan-glow text-space-black font-semibold shadow-[0_0_15px_rgba(62,242,255,0.4)]"
                : "bg-space-black border border-white/10 text-slate-300 hover:text-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((proj, idx) => (
          <ProjectCard key={idx} proj={proj} />
        ))}
      </div>
    </div>
  );
}
