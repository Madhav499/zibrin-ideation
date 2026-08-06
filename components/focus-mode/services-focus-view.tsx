"use client";

import React, { useState, useMemo } from "react";
import { Search, Code, Database, ArrowRight, CheckCircle2 } from "lucide-react";
import { useFocusMode } from "@/providers/focus-mode-provider";

export default function ServicesFocusView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"services" | "tech" | "cloud">("services");
  const { openFocus } = useFocusMode();

  const servicesList = [
    { title: "Website Development", category: "Web Engineering", desc: "Custom responsive websites built with Next.js, React, and WebGL." },
    { title: "E-Commerce Development", category: "Web Engineering", desc: "High-conversion digital storefronts with 3D product visualizers and instant checkout." },
    { title: "Mobile App Development", category: "Mobile Systems", desc: "Native & cross-platform mobile apps for iOS and Android." },
    { title: "Android App Development", category: "Mobile Systems", desc: "Performant Android applications optimized for phone & tablet devices." },
    { title: "React Native App Development", category: "Mobile Systems", desc: "Cross-platform mobile apps built with React Native and Expo." },
    { title: "Flutter App Development", category: "Mobile Systems", desc: "Beautiful multi-platform apps built with Flutter and Dart." },
    { title: "Custom Software Development", category: "Enterprise Solutions", desc: "Tailored enterprise software architectures designed for scale." },
    { title: "CRM Development", category: "Enterprise Solutions", desc: "Custom Customer Relationship Management platforms tailored to workflow." },
    { title: "ERP Development", category: "Enterprise Solutions", desc: "Enterprise Resource Planning systems integrating logistics and ops." },
    { title: "AI Chatbot Development", category: "Cognitive AI", desc: "Autonomous AI chatbots trained on custom data for 24/7 support." },
    { title: "OpenAI Integration", category: "Cognitive AI", desc: "Deep API integrations with GPT-4, OpenAI embeddings, and fine-tuned models." },
    { title: "UI Design", category: "Design Systems", desc: "Futuristic, user-centric interfaces crafted with precision typography." },
    { title: "UX Design", category: "Design Systems", desc: "Intuitive user journeys, wireframes, and interactive prototypes." },
    { title: "Responsive Web Design", category: "Design Systems", desc: "Adaptive layouts pixel-perfect across desktop, tablet, and mobile." },
    { title: "API Development", category: "Backend Infrastructure", desc: "Robust REST & GraphQL microservices with zero latency." },
    { title: "API Integration", category: "Backend Infrastructure", desc: "Seamless third-party payment, CRM, and analytics API connectors." },
    { title: "Database Administration", category: "Data Architecture", desc: "Database scaling, indexing, replication, and query optimization." },
    { title: "Database Management", category: "Data Architecture", desc: "End-to-end data lifecycle management and automated backups." },
    { title: "SEO (Search Engine Optimization)", category: "Growth & Visibility", desc: "Technical SEO and speed optimization to rank #1 on Google." },
    { title: "AEO (Answer Engine Optimization)", category: "Growth & Visibility", desc: "Optimizing content schema for AI search engines like Perplexity & ChatGPT." },
    { title: "GEO (Generative Engine Optimization)", category: "Growth & Visibility", desc: "Structuring brand citations for Generative AI search models." },
    { title: "Website Maintenance", category: "Support & Security", desc: "Continuous uptime monitoring, security patches, and bug fixes." },
    { title: "Application Maintenance", category: "Support & Security", desc: "Proactive app maintenance, SDK updates, and speed optimizations." },
    { title: "Technical Support", category: "Support & Security", desc: "24/7 technical helpdesk and server administration." },
    { title: "Web Scraping", category: "Data Intelligence", desc: "Automated web crawlers and data extraction pipelines." },
    { title: "Data Collection & Processing", category: "Data Intelligence", desc: "ETL data pipelines and real-time processing clusters." },
    { title: "Play Store Deployment", category: "Cloud & DevOps", desc: "Google Play Store submission, compliance, and release management." },
    { title: "App Store Deployment", category: "Cloud & DevOps", desc: "Apple App Store review guidelines compliance and deployment." },
    { title: "Cloud Deployment", category: "Cloud & DevOps", desc: "AWS, Vercel, GCP, and Azure serverless infrastructure setup." },
  ];

  const technologies = [
    { name: "Python", cat: "Backend & AI" },
    { name: "JavaScript", cat: "Frontend" },
    { name: "HTML5", cat: "Markup" },
    { name: "CSS3", cat: "Styling" },
    { name: "React.js", cat: "Frontend" },
    { name: "React Native (Expo)", cat: "Mobile" },
    { name: "Node.js", cat: "Backend" },
    { name: "Express.js", cat: "Backend" },
    { name: "PHP", cat: "Backend" },
    { name: "Flutter", cat: "Mobile" },
    { name: "OpenAI API", cat: "AI" },
    { name: "Git", cat: "DevOps" },
    { name: "GitHub", cat: "DevOps" },
  ];

  const databasesAndCloud = [
    "MongoDB",
    "MySQL",
    "Firebase",
    "Supabase",
    "Cloudinary Platforms",
    "Web Applications",
    "Android Applications",
    "iOS Applications",
    "Cross-Platform Applications",
    "SaaS Products",
    "Business Software Solutions",
  ];

  const filteredServices = useMemo(() => {
    if (!searchTerm) return servicesList;
    const term = searchTerm.toLowerCase();
    return servicesList.filter(
      (s) => s.title.toLowerCase().includes(term) || s.category.toLowerCase().includes(term) || s.desc.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-space-black via-space-black to-space-black border border-cyan-glow/30 backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold font-syne text-white mb-1">
            Solutions Without Limits. <span className="bg-gradient-to-r from-cyan-glow to-electric-blue bg-clip-text text-transparent">Concepts to Reality.</span>
          </h2>
          <p className="text-xs text-slate-300 font-light max-w-2xl">
            Filter or search through our complete technical matrix below.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-cyan-glow" />
          <input
            type="text"
            placeholder="Search 29+ services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-space-black/90 border border-white/15 text-white text-xs font-mono focus:border-cyan-glow focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Tabs Control Bar */}
      <div className="flex items-center gap-2 p-1 rounded-xl bg-space-black/80 border border-white/10 w-fit">
        <button
          onClick={() => setActiveTab("services")}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer ${
            activeTab === "services"
              ? "bg-cyan-glow text-space-black shadow-[0_0_15px_rgba(62,242,255,0.4)]"
              : "text-slate-300 hover:text-white"
          }`}
        >
          Services ({filteredServices.length})
        </button>
        <button
          onClick={() => setActiveTab("tech")}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer ${
            activeTab === "tech"
              ? "bg-electric-blue text-white shadow-[0_0_15px_rgba(47,128,255,0.4)]"
              : "text-slate-300 hover:text-white"
          }`}
        >
          Technologies ({technologies.length})
        </button>
        <button
          onClick={() => setActiveTab("cloud")}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer ${
            activeTab === "cloud"
              ? "bg-neon-violet text-white shadow-[0_0_15px_rgba(139,92,255,0.4)]"
              : "text-slate-300 hover:text-white"
          }`}
        >
          Databases & Cloud
        </button>
      </div>

      {/* Single Unified Tab Content Area */}
      <div className="w-full">
        {activeTab === "services" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredServices.map((srv, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-space-black/70 border border-white/10 backdrop-blur-xl hover:border-cyan-glow/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="text-[10px] font-mono text-cyan-glow uppercase tracking-wider mb-1.5 font-semibold">
                    {srv.category}
                  </div>
                  <h3 className="text-sm font-bold font-syne text-white mb-1.5 group-hover:text-cyan-glow transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light mb-3">
                    {srv.desc}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] font-mono text-slate-400">
                  <span>ZIBRIN // CAPABILITY</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-glow" />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "tech" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
            {technologies.map((t, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-space-black/70 border border-electric-blue/20 backdrop-blur-xl hover:border-electric-blue/50 transition-all text-center flex flex-col items-center justify-center gap-1.5"
              >
                <Code className="w-4 h-4 text-electric-blue mb-1" />
                <span className="text-xs font-bold font-mono text-white">{t.name}</span>
                <span className="text-[10px] font-mono text-cyan-glow/80">{t.cat}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "cloud" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {databasesAndCloud.map((c, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-space-black/70 border border-neon-violet/20 backdrop-blur-xl hover:border-neon-violet/50 transition-all flex items-center gap-3"
              >
                <Database className="w-4 h-4 text-neon-violet shrink-0" />
                <span className="text-xs font-semibold text-white">{c}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Action Footer */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-glow/10 via-electric-blue/10 to-neon-violet/10 border border-cyan-glow/30 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <h4 className="text-xs sm:text-sm font-bold font-syne text-white">Have a custom software requirement?</h4>
          <p className="text-[11px] text-slate-300 font-light">Connect directly with our engineering team for a technical roadmap.</p>
        </div>
        <button
          onClick={() => openFocus("contact")}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-glow to-electric-blue text-space-black font-semibold text-xs transition-all hover:scale-105 cursor-pointer shrink-0 flex items-center gap-2"
        >
          <span>Open Contact Console</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
