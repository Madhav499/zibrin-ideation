"use client";

import React, { useState, useMemo } from "react";
import { Search, Sparkles, BookOpen, Clock, ArrowUpRight, Tag } from "lucide-react";

export default function BlogFocusView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  const articles = [
    {
      title: "Building Spatial WebGL Experiences with Next.js 16",
      category: "Frontend Architecture",
      readTime: "5 min read",
      date: "August 2026",
      desc: "How to decouple vertical scrolling into continuous 3D Z-axis camera journeys using Three.js and React Server Components.",
      link: "https://www.ramotion.com/blog/",
      tags: ["WebGL", "Next.js", "Three.js"],
    },
    {
      title: "Optimizing for GEO & AEO: The Future of AI Search",
      category: "Generative Engine Optimization",
      readTime: "7 min read",
      date: "July 2026",
      desc: "A comprehensive guide on structuring website content for LLMs, Answer Engines, and Generative Search indexing.",
      link: "https://cuberto.com/blog/",
      tags: ["AEO", "GEO", "AI Search"],
    },
    {
      title: "Deploying Custom OpenAI Chatbots for Enterprise CRM",
      category: "AI Engineering",
      readTime: "6 min read",
      date: "July 2026",
      desc: "Architecting zero-latency AI agents integrated directly with business workflows, databases, and customer support channels.",
      link: "https://www.ramotion.com/blog/",
      tags: ["OpenAI", "Chatbots", "CRM"],
    },
    {
      title: "Flutter vs. React Native: Cross-Platform Performance in 2026",
      category: "Mobile Systems",
      readTime: "8 min read",
      date: "June 2026",
      desc: "In-depth technical benchmarks comparing GPU rendering speeds, bundle sizes, and native bridge performance.",
      link: "https://www.ramotion.com/blog/",
      tags: ["Flutter", "React Native", "Mobile"],
    },
    {
      title: "Zero Technical Debt Architecture for SaaS Scaling",
      category: "Software Design",
      readTime: "6 min read",
      date: "May 2026",
      desc: "Best practices for modular TypeScript monorepos, state machines, and serverless edge databases.",
      link: "https://cuberto.com/blog/",
      tags: ["SaaS", "TypeScript", "Architecture"],
    },
  ];

  const tags = ["All", "WebGL", "AI Search", "OpenAI", "Mobile", "SaaS"];

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchesSearch =
        art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag === "All" || art.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [searchTerm, selectedTag]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-space-black via-space-black to-space-black border border-neon-violet/30 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-neon-violet/10 rounded-full blur-3xl" />
        <h2 className="text-2xl md:text-4xl font-bold font-syne text-white mb-2">
          Engineering Journal & <span className="bg-gradient-to-r from-neon-violet via-cyan-glow to-electric-blue bg-clip-text text-transparent">Insights Library</span>
        </h2>
        <p className="text-xs md:text-sm text-slate-300 font-light leading-relaxed max-w-3xl">
          Discover our latest technical writing on WebGL rendering engines, AI agent architectures, Generative Engine Optimization, and enterprise software design.
        </p>
      </div>

      {/* Controls Bar: Search & Tags */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neon-violet" />
          <input
            type="text"
            placeholder="Search articles & engineering guides..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-space-black/80 border border-white/15 text-white text-xs font-mono focus:border-neon-violet focus:outline-none transition-colors"
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                selectedTag === tag
                  ? "bg-neon-violet text-white shadow-[0_0_15px_rgba(139,92,255,0.4)]"
                  : "bg-space-black/60 border border-white/10 text-slate-300 hover:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredArticles.map((art, idx) => (
          <a
            key={idx}
            href={art.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl bg-space-black/70 border border-white/10 backdrop-blur-xl hover:border-neon-violet/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-neon-violet mb-3">
                <span className="font-semibold">{art.category}</span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {art.readTime}
                </span>
              </div>
              <h3 className="text-lg font-bold font-syne text-white mb-3 group-hover:text-cyan-glow transition-colors">
                {art.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light mb-4">
                {art.desc}
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-cyan-glow">
              <span>{art.date}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
