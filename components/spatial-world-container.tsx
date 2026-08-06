"use client";

import React, { useRef, useEffect, useState } from "react";
import { useWebglEngine } from "@/providers/webgl-engine-provider";
import { WORLD_Z, WorldKey } from "@/lib/world-config";

import HeroSpatialPlane from "./spatial/hero-spatial-plane";
import AboutSpatialPlane from "./spatial/about-spatial-plane";
import ServicesSpatialPlane from "./spatial/services-spatial-plane";
import ProcessSpatialPlane from "./spatial/process-spatial-plane";
import PortfolioSpatialPlane from "./spatial/portfolio-spatial-plane";
import BlogSpatialPlane from "./spatial/blog-spatial-plane";
import ContactSpatialPlane from "./spatial/contact-spatial-plane";

interface SpatialPlaneWrapperProps {
  worldKey: WorldKey;
  children: React.ReactNode;
}

function SpatialPlaneWrapper({ worldKey, children }: SpatialPlaneWrapperProps) {
  const { cameraZ } = useWebglEngine();
  const worldZ = WORLD_Z[worldKey];

  // Camera offset in webgl engine is 18 (camera sits at worldZ + 18 when focused)
  // Distance from camera to plane focal z:
  const dist = cameraZ - (worldZ + 18);

  let scale = 1;
  let opacity = 1;
  let blur = 0;
  let pointerEvents: "auto" | "none" = "none";
  let translateZ = 0;

  if (dist > 40) {
    // Far ahead in the future (camera hasn't reached it yet)
    scale = 0.3;
    opacity = 0;
    blur = 20;
    pointerEvents = "none";
  } else if (dist > 12) {
    // Emerging from space
    const norm = 1 - (dist - 12) / 28; // 0 to 1
    scale = 0.35 + norm * 0.65; // 0.35 -> 1.0
    opacity = Math.max(0, Math.min(1, norm));
    blur = (1 - norm) * 16;
    pointerEvents = norm > 0.85 ? "auto" : "none";
  } else if (dist >= -12) {
    // Focal viewing position
    scale = 1.0;
    opacity = 1.0;
    blur = 0;
    pointerEvents = "auto";
  } else if (dist >= -50) {
    // Zooming past (1 -> 2 -> 4 -> 8 effect)
    const norm = (-dist - 12) / 38; // 0 to 1
    scale = 1.0 + norm * 4.5; // 1.0 -> 5.5
    opacity = Math.max(0, 1 - norm * 1.2);
    blur = norm * 14;
    pointerEvents = "none";
  } else {
    // Far behind
    scale = 6.0;
    opacity = 0;
    blur = 24;
    pointerEvents = "none";
  }

  if (opacity <= 0.01) return null; // Performance optimization while staying mounted

  return (
    <div
      className="absolute inset-0 flex items-center justify-center transition-all duration-75 ease-out"
      style={{
        transform: `scale(${scale}) translateZ(${translateZ}px)`,
        opacity: opacity,
        filter: blur > 0.5 ? `blur(${blur}px)` : "none",
        pointerEvents: pointerEvents,
        willChange: "transform, opacity, filter",
      }}
    >
      <div className="w-full max-h-[85vh] overflow-y-auto custom-scrollbar">
        {children}
      </div>
    </div>
  );
}

export default function SpatialWorldContainer() {
  const { setScrollTargetZ } = useWebglEngine();

  const handleNavigate = (worldKey: WorldKey) => {
    const targetZ = WORLD_Z[worldKey];
    setScrollTargetZ(targetZ);
  };

  return (
    <div className="fixed inset-0 z-10 overflow-hidden pointer-events-none">
      <SpatialPlaneWrapper worldKey="hero">
        <HeroSpatialPlane onNavigate={(key) => handleNavigate(key)} />
      </SpatialPlaneWrapper>

      <SpatialPlaneWrapper worldKey="about">
        <AboutSpatialPlane />
      </SpatialPlaneWrapper>

      <SpatialPlaneWrapper worldKey="services">
        <ServicesSpatialPlane />
      </SpatialPlaneWrapper>

      <SpatialPlaneWrapper worldKey="process">
        <ProcessSpatialPlane />
      </SpatialPlaneWrapper>

      <SpatialPlaneWrapper worldKey="portfolio">
        <PortfolioSpatialPlane />
      </SpatialPlaneWrapper>

      <SpatialPlaneWrapper worldKey="blog">
        <BlogSpatialPlane />
      </SpatialPlaneWrapper>

      <SpatialPlaneWrapper worldKey="contact">
        <ContactSpatialPlane />
      </SpatialPlaneWrapper>
    </div>
  );
}
