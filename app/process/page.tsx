"use client";

import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CinematicSpatialShell from "@/components/cinematic-spatial-shell";
import { GitBranch } from "lucide-react";

export default function ProcessPage() {
  return (
    <div className="min-h-screen flex flex-col text-white relative">
      <Navbar />

      <main className="flex-grow relative z-10">
        <CinematicSpatialShell
          eyebrow="SYS // 6-STAGE PRODUCTION PIPELINE"
          title={
            <>
              PRODUCTION
              <span className="block bg-gradient-to-r from-cyan-glow via-electric-blue to-neon-violet bg-clip-text text-transparent">
                FLOW FACTORY
              </span>
            </>
          }
          description="From initial architecture blueprinting to automated AI agent integration, production testing, and deployment, every system is engineered with cinematic clarity."
          stats={[
            { label: "Process", value: "6 Steps" },
            { label: "Testing", value: "100%" },
            { label: "Delivery", value: "Fast" },
          ]}
          cards={[
            {
              title: "Blueprinting",
              description: "Architecture decisions are mapped before code begins, keeping the system aligned with product intent.",
              accent: "cyan",
            },
            {
              title: "Execution",
              description: "Implementation is carried out in a high-clarity workflow with quality gates at every milestone.",
              accent: "blue",
            },
            {
              title: "Launch",
              description: "Every launch is designed to feel polished, resilient, and scalable from the first experience onward.",
              accent: "violet",
            },
          ]}
          primaryCta={{ label: "Start A Project", href: "/builder" }}
          secondaryCta={{ label: "Contact Us", href: "/contact" }}
        />
      </main>

      <Footer />
    </div>
  );
}
