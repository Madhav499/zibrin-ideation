"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import StartupLoader from "@/features/loader/loader";
import Navbar from "@/components/navbar";
import HeroSection from "@/sections/hero";
import WhoWeAre from "@/sections/who-we-are";
import ServicesSection from "@/sections/galaxy";
import EngineeringProcess from "@/sections/process";
import PortfolioUniverse from "@/sections/portfolio";
import SeoSection from "@/sections/seo";
import TechSection from "@/sections/tech";
import AiLaboratory from "@/sections/ai-lab";
import ClientTrustMap from "@/sections/trust";
import SocialProof from "@/sections/social-proof";
import BuilderSection from "@/sections/builder-section";
import ContactSection from "@/sections/contact";
import Footer from "@/components/footer";

const NoomoSpatialPortal = dynamic(() => import("@/components/noomo-spatial-portal"), { ssr: false });

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Startup Sequence overlay */}
      {!loaded && <StartupLoader onComplete={() => setLoaded(true)} />}

      {/* Main website contents loaded after HUD boot */}
      <div className={`transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <Navbar />

        <main className="flex-grow overflow-x-hidden relative z-10 bg-space-black">
          
          {/* Section 00: Hero Command Center */}
          <HeroSection />

          {/* PORTAL 1: AI Neural Core emerges out of nowhere from deep Z space */}
          <NoomoSpatialPortal
            type="aiNeural"
            title="01 // INNOVATION CHAMBER"
            subtitle="COGNITIVE AI MATRIX"
          />

          {/* Section 01: Chamber of Innovation */}
          <WhoWeAre />

          {/* PORTAL 2: Cloud Server Matrix emerges from deep space */}
          <NoomoSpatialPortal
            type="cloudServer"
            title="02 // SERVICES GALAXY"
            subtitle="CLOUD & FULL-STACK CAPABILITIES"
          />

          {/* Section 02: Planetary Services Galaxy */}
          <ServicesSection />

          {/* PORTAL 3: Code Architecture Cube emerges from deep space */}
          <NoomoSpatialPortal
            type="codeMatrix"
            title="03 // PRODUCTION FLOW FACTORY"
            subtitle="6-STAGE PIPELINE"
          />

          {/* Section 03: Production Flow Factory */}
          <EngineeringProcess />

          {/* PORTAL 4: Database Monolith emerges from deep space */}
          <NoomoSpatialPortal
            type="dataMonolith"
            title="04 // CASE MONOLITHS"
            subtitle="PRODUCTION DEPLOYMENTS"
          />

          {/* Section 04: Portfolio Case Monoliths */}
          <PortfolioUniverse />

          {/* PORTAL 5: Quantum Cyber Shield emerges from deep space */}
          <NoomoSpatialPortal
            type="cyberShield"
            title="05 // TECH UNIVERSE & SEO"
            subtitle="ORBITAL STACK & GEO ENGINE"
          />

          {/* Section 05: Technologies & SEO Engine */}
          <TechSection />
          <SeoSection />

          {/* PORTAL 6: AI Neural Cluster emerges from deep space */}
          <NoomoSpatialPortal
            type="aiNeural"
            title="06 // AI LABORATORY"
            subtitle="AGENT DIAGNOSTIC DECK"
          />

          {/* Section 06: AI Cognitive Laboratory */}
          <AiLaboratory />

          {/* PORTAL 7: Global Satellite Edge Network Globe emerges from deep space */}
          <NoomoSpatialPortal
            type="globalNetwork"
            title="07 // GLOBAL TRUST COMMAND"
            subtitle="MUMBAI INDIA CORE HUB"
          />

          {/* Section 07: Global Trust Map & Reviews */}
          <ClientTrustMap />
          <SocialProof />

          {/* PORTAL 8: Tech Configurator Diamond Prism emerges from deep space */}
          <NoomoSpatialPortal
            type="techPrism"
            title="08 // DIGITAL PRODUCT BUILDER & CONTACT"
            subtitle="CONFIGURE SYSTEM IN RUPEES (₹)"
          />

          {/* Section 08: Product Configurator & AI Contact */}
          <BuilderSection />
          <ContactSection />

        </main>

        <Footer />
      </div>
    </>
  );
}
