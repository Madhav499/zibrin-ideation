"use client";

import React, { useState } from "react";
import StartupLoader from "@/features/loader/loader";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CinematicSpatialShell from "@/components/cinematic-spatial-shell";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <StartupLoader onComplete={() => setLoaded(true)} />}

      <div className={loaded ? "opacity-100" : "opacity-0 pointer-events-none"}>
        <Navbar />

        <main className="relative z-10 flex min-h-screen flex-col overflow-x-hidden">
          <CinematicSpatialShell
            eyebrow="SYS // ZIBRIN INFOTECH INDIA"
            title={
              <>
                ENGINEERING THE
                <span className="block bg-gradient-to-r from-cyan-glow via-electric-blue to-neon-violet bg-clip-text text-transparent">
                  INFINITE FUTURE
                </span>
              </>
            }
            description="We design cinematic digital systems, immersive AI products, and high-performance web experiences that feel like a premium spatial platform rather than a conventional agency website."
            stats={[
              { label: "Launches", value: "50+" },
              { label: "AI Systems", value: "12" },
              { label: "Global Reach", value: "24/7" },
            ]}
            cards={[
              {
                title: "Immersive WebGL Platform",
                description: "Our frontend architecture now centers on a persistent 3D world with cinematic navigation and spatial storytelling.",
                href: "/services",
                accent: "cyan",
              },
              {
                title: "Cognitive AI Lab",
                description: "From autonomous agents to search intelligence, every surface is designed to feel alive and dimensional.",
                href: "/portfolio",
                accent: "blue",
              },
              {
                title: "Enterprise Delivery",
                description: "The same brand, content, and structure remain in place while the experience becomes deeply immersive.",
                href: "/contact",
                accent: "violet",
              },
            ]}
            primaryCta={{ label: "Build With Us", href: "/builder" }}
            secondaryCta={{ label: "Explore Services", href: "/services" }}
          />
        </main>

        <Footer />
      </div>
    </>
  );
}
