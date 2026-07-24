"use client";

import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CinematicSpatialShell from "@/components/cinematic-spatial-shell";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { TransitionLink } from "@/providers/transition-provider";

export default function ServicesPage() {
  const servicePackages = [
    {
      name: "ENTERPRISE WEB PLATFORM",
      price: "₹1,50,000",
      period: "starting base",
      desc: "Full-stack server-rendered web applications with high-speed WebGL architectures and responsive layout design.",
      features: [
        "Next.js 15 App Router architecture",
        "TailwindCSS modern design system",
        "Responsive across 100% of viewports",
        "Search Engine (SEO/AEO/GEO) indexing",
        "Razorpay / Stripe payment integration",
      ],
      color: "border-cyan-glow/30",
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
        "API integration with CRM systems",
      ],
      color: "border-neon-violet/40 shadow-neon-violet",
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
        "Push notification engine",
      ],
      color: "border-electric-blue/30",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col text-white relative">
      <Navbar />

      <main className="flex-grow relative z-10">
        <CinematicSpatialShell
          eyebrow="SYS // SERVICES GALAXY & CAPABILITIES"
          title={
            <>
              ENGINEERING
              <span className="block bg-gradient-to-r from-cyan-glow via-electric-blue to-neon-violet bg-clip-text text-transparent">
                SOLUTIONS
              </span>
            </>
          }
          description="From immersive 3D web surfaces to autonomous AI brains and enterprise search intelligence, explore our service suite with transparent pricing."
          stats={[
            { label: "Delivery", value: "4-20w" },
            { label: "Pricing", value: "₹" },
            { label: "Focus", value: "AI + Web" },
          ]}
          cards={[
            {
              title: "Immersive platforms",
              description: "High-performance Next.js experiences engineered for speed, clarity, and spatial storytelling.",
              accent: "cyan",
            },
            {
              title: "Autonomous operations",
              description: "Deploy intelligent agents, workflows, and retrieval pipelines with enterprise-grade confidence.",
              accent: "blue",
            },
            {
              title: "Search intelligence",
              description: "Architectures designed to capture both traditional search visibility and AI-native discovery.",
              accent: "violet",
            },
          ]}
          primaryCta={{ label: "Configure Stack", href: "/builder" }}
          secondaryCta={{ label: "Explore Portfolio", href: "/portfolio" }}
        />

        <section className="container mx-auto px-4 py-10 md:px-8 md:py-16">
          <div className="grid gap-8 md:grid-cols-3">
            {servicePackages.map((pkg, idx) => (
              <div key={idx} className={`rounded-[1.4rem] border bg-space-black/60 p-8 ${pkg.color}`}>
                <span className="mb-3 block text-[9px] font-mono uppercase tracking-[0.3em] text-cyan-glow">PACKAGE 0{idx + 1}</span>
                <h3 className="mb-4 font-orbitron text-base font-bold uppercase text-white">{pkg.name}</h3>
                <div className="mb-4 flex items-baseline gap-2">
                  <span className="text-3xl font-orbitron font-bold text-cyan-glow">{pkg.price}</span>
                  <span className="text-xs font-mono text-neutral-400">{pkg.period}</span>
                </div>
                <p className="mb-6 text-sm leading-7 text-neutral-400">{pkg.desc}</p>
                <div className="space-y-2.5 border-t border-white/10 pt-6 font-mono text-xs text-neutral-300">
                  {pkg.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-cyan-glow" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <TransitionLink href="/builder" className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-electric-blue to-neon-violet px-4 py-3 text-[11px] font-mono font-semibold uppercase tracking-[0.3em] text-white">
                    <span>Configure This Stack</span>
                    <ArrowRight className="h-4 w-4" />
                  </TransitionLink>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
