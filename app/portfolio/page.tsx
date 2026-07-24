"use client";

import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CinematicSpatialShell from "@/components/cinematic-spatial-shell";
import { Monitor } from "lucide-react";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen flex flex-col text-white relative">
      <Navbar />

      <main className="flex-grow relative z-10">
        <CinematicSpatialShell
          eyebrow="SYS // CASE MONOLITHS & DEPLOYMENTS"
          title={
            <>
              ENGINEERING
              <span className="block bg-gradient-to-r from-cyan-glow via-electric-blue to-neon-violet bg-clip-text text-transparent">
                PORTFOLIO
              </span>
            </>
          }
          description="Explore production systems, IoT telemetry platforms, telehealth suites, and fintech trading engines engineered by Zibrin."
          stats={[
            { label: "Projects", value: "24" },
            { label: "Latency", value: "<3ms" },
            { label: "Impact", value: "₹10Cr+" },
          ]}
          cards={[
            {
              title: "Industrial telemetry",
              description: "Resilient data systems built for real-time operational visibility and secure high-throughput delivery.",
              accent: "cyan",
            },
            {
              title: "Telehealth experience",
              description: "Cross-platform care journeys with responsive interfaces and real-time device data flows.",
              accent: "blue",
            },
            {
              title: "Fintech execution",
              description: "Secure trading boards and transaction surfaces engineered for speed and trust.",
              accent: "violet",
            },
          ]}
          primaryCta={{ label: "Discuss A Project", href: "/contact" }}
          secondaryCta={{ label: "See Process", href: "/process" }}
        />
      </main>

      <Footer />
    </div>
  );
}
