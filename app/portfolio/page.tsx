"use client";

import React from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PortfolioUniverse from "@/sections/portfolio";
import ClientTrustMap from "@/sections/trust";
import SocialProof from "@/sections/social-proof";
import { Monitor } from "lucide-react";

const NoomoSpatialPortal = dynamic(() => import("@/components/noomo-spatial-portal"), { ssr: false });

export default function PortfolioPage() {
  const PortfolioHeader = (
    <section className="container mx-auto px-4 md:px-8 py-16 text-center relative overflow-hidden">
      <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/5 border border-white/10 rounded-full mb-6">
        <Monitor className="w-3.5 h-3.5 text-cyan-glow" />
        <span className="text-[10px] font-mono text-neutral-300 uppercase tracking-widest">
          SYS // CASE MONOLITHS & DEPLOYMENTS
        </span>
      </div>

      <h1 className="text-4xl md:text-6xl font-syne font-extrabold uppercase text-white mb-6 tracking-tight">
        ENGINEERING <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-glow via-electric-blue to-neon-violet">PORTFOLIO</span>
      </h1>

      <p className="text-base md:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
        Explore active production systems, IoT telemetry platforms, telehealth suites, and fintech trading engines engineered by Zibrin.
      </p>
    </section>
  );

  const TrustAndReviews = (
    <div className="space-y-12">
      <ClientTrustMap />
      <SocialProof />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-space-black text-white relative">
      <Navbar />

      <main className="flex-grow pt-28 pb-16 relative z-10 overflow-hidden">
        
        {/* PORTAL 1: Header -> Portfolio Monoliths */}
        <NoomoSpatialPortal
          type="codeMatrix"
          title="SYS // CASE MONOLITHS"
          subtitle="PRODUCTION DEPLOYMENTS"
          pageA={PortfolioHeader}
          pageB={<PortfolioUniverse />}
        />

        {/* PORTAL 2: Portfolio Monoliths -> Global Trust Map & Reviews */}
        <NoomoSpatialPortal
          type="globalNetwork"
          title="SYS // GLOBAL TRUST COMMAND"
          subtitle="MUMBAI INDIA CORE HUB"
          pageA={<PortfolioUniverse />}
          pageB={TrustAndReviews}
        />

      </main>

      <Footer />
    </div>
  );
}
