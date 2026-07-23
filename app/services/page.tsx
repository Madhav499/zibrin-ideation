"use client";

import React from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ServicesSection from "@/sections/galaxy";
import AiLaboratory from "@/sections/ai-lab";
import SeoSection from "@/sections/seo";
import Card3DTilt from "@/components/card-3d-tilt";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const NoomoSpatialPortal = dynamic(() => import("@/components/noomo-spatial-portal"), { ssr: false });

export default function ServicesPage() {
  const servicePackages = [
    {
      name: "ENTERPRISE WEB PLATFORM",
      price: "₹1,50,000",
      period: "starting base",
      desc: "Full-stack server-rendered web applications with high-speed WebGL animations and responsive layout design.",
      features: [
        "Next.js 15 App Router architecture",
        "TailwindCSS modern design system",
        "Responsive across 100% of viewports",
        "Search Engine (SEO/AEO/GEO) indexing",
        "Razorpay / Stripe payment integration"
      ],
      color: "border-cyan-glow/30"
    },
    {
      name: "COGNITIVE AI AGENT ECOSYSTEM",
      price: "₹2,50,000",
      period: "starting base",
      desc: "Autonomous conversational AI agents, custom RAG vector databases, and automated workflow pipelines.",
      features: [
        "Custom OpenAI & Claude fine-tuning",
        "Pinecone / PostgreSQL vector search",
        "Autonomous lead generation agents",
        "Multi-modal chat UI console",
        "API integration with CRM systems"
      ],
      color: "border-neon-violet/40 shadow-neon-violet"
    },
    {
      name: "CROSS-PLATFORM MOBILE SUITE",
      price: "₹2,00,000",
      period: "starting base",
      desc: "Native-performance mobile application suite for iOS and Android built on Flutter framework.",
      features: [
        "Single codebase for iOS & Android",
        "Firebase real-time backend sync",
        "Bluetooth & hardware API hooks",
        "App Store & Google Play publishing",
        "Push notification engine"
      ],
      color: "border-electric-blue/30"
    }
  ];

  const ServicesHeader = (
    <section className="container mx-auto px-4 md:px-8 py-16 relative overflow-hidden text-center">
      <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/5 border border-white/10 rounded-full mb-6">
        <Sparkles className="w-3.5 h-3.5 text-cyan-glow" />
        <span className="text-[10px] font-mono text-neutral-300 uppercase tracking-widest">
          SYS // SERVICES GALAXY & CAPABILITIES
        </span>
      </div>

      <h1 className="text-4xl md:text-6xl font-syne font-extrabold uppercase text-white mb-6 tracking-tight">
        ENGINEERING <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-glow via-electric-blue to-neon-violet">SOLUTIONS</span>
      </h1>

      <p className="text-base md:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
        From 3D web surfaces to autonomous AI brains and enterprise search engine indexing. Explore our service suite with Indian Rupee (₹) pricing.
      </p>
    </section>
  );

  const ServiceTiers = (
    <section className="container mx-auto px-4 md:px-8 py-12">
      <div className="max-w-3xl mb-12 text-left">
        <span className="text-[10px] font-mono text-cyan-glow tracking-widest uppercase block mb-2">
          TRANSACTION TIERS
        </span>
        <h2 className="text-3xl md:text-4xl font-syne font-extrabold uppercase text-white mb-4">
          SERVICE INVESTMENT TIERS (₹)
        </h2>
        <p className="text-sm text-neutral-400">
          Clear, transparent pricing in Indian Rupees tailored for Indian enterprises and global startups.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {servicePackages.map((pkg, idx) => (
          <Card3DTilt key={idx} intensity={14}>
            <div className={`glass-panel p-8 rounded-xl ${pkg.color} bg-space-black/60 h-full flex flex-col justify-between relative`}>
              <div>
                <span className="text-[9px] font-mono text-cyan-glow uppercase tracking-widest block mb-2">
                  PACKAGE 0{idx + 1}
                </span>
                <h3 className="text-base font-orbitron font-bold text-white mb-4 uppercase">
                  {pkg.name}
                </h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-orbitron font-bold text-cyan-glow">{pkg.price}</span>
                  <span className="text-xs font-mono text-neutral-400">{pkg.period}</span>
                </div>
                <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
                  {pkg.desc}
                </p>

                <div className="space-y-2.5 border-t border-white/10 pt-6 font-mono text-xs">
                  {pkg.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-glow shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Link
                  href="/builder"
                  className="w-full py-3 bg-gradient-to-r from-electric-blue to-neon-violet text-white text-xs font-mono font-bold tracking-widest rounded flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-neon-blue cursor-pointer"
                >
                  <span>CONFIGURE THIS STACK</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Card3DTilt>
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen flex flex-col bg-space-black text-white relative">
      <Navbar />

      <main className="flex-grow pt-28 pb-16 relative z-10 overflow-hidden">
        
        {/* PORTAL 1: Services Header -> Services Galaxy */}
        <NoomoSpatialPortal
          type="cloudServer"
          title="SYS // SERVICES GALAXY"
          subtitle="CLOUD & FULL-STACK CAPABILITIES"
          pageA={ServicesHeader}
          pageB={<ServicesSection />}
        />

        {/* PORTAL 2: Services Galaxy -> Service Tiers */}
        <NoomoSpatialPortal
          type="dataMonolith"
          title="SYS // PRICING TIERS"
          subtitle="INDIAN_RUPEES_INR"
          pageA={<ServicesSection />}
          pageB={ServiceTiers}
        />

        {/* PORTAL 3: Service Tiers -> AI Laboratory & SEO */}
        <NoomoSpatialPortal
          type="aiNeural"
          title="SYS // AI LABORATORY & SEO ENGINE"
          subtitle="COGNITIVE_MODELS_AND_GEO"
          pageA={ServiceTiers}
          pageB={
            <div className="space-y-12">
              <AiLaboratory />
              <SeoSection />
            </div>
          }
        />

      </main>

      <Footer />
    </div>
  );
}
