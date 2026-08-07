"use client";

import React, { useRef, useEffect, useState } from "react";
import { useWebglEngine } from "@/providers/webgl-engine-provider";
import { useFocusMode } from "@/providers/focus-mode-provider";
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

const BASE_WORLD_SCALE: Record<WorldKey, number> = {
  hero: 1.0,
  about: 0.95,
  services: 0.95,
  process: 0.92,
  portfolio: 0.95,
  blog: 0.95,
  contact: 0.95,
};

const WORLD_Y_OFFSET: Record<WorldKey, number> = {
  hero: 0,
  about: 108,
  services: 0,
  process: 0,
  portfolio: 0,
  blog: 0,
  contact: 0,
};

function SpatialPlaneWrapper({ worldKey, children }: SpatialPlaneWrapperProps) {
  const { cameraZ } = useWebglEngine();
  const { activeFocusKey } = useFocusMode();
  const worldZ = WORLD_Z[worldKey];
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [fitScale, setFitScale] = useState(1.0);

  useEffect(() => {
    const measure = () => {
      if (!contentRef.current) return;
      const contentHeight = contentRef.current.scrollHeight;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      let topMargin = 100;
      let bottomMargin = 60;
      if (vw < 640) {
        topMargin = 80;
        bottomMargin = 40;
      } else if (vw < 1024) {
        topMargin = 90;
        bottomMargin = 50;
      }

      const availableHeight = Math.max(200, vh - topMargin - bottomMargin);
      if (contentHeight > 0) {
        const ratio = availableHeight / contentHeight;
        setFitScale(Math.min(1.0, ratio));
      }
    };

    measure();
    const handleResize = () => measure();
    window.addEventListener("resize", handleResize);

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && contentRef.current) {
      observer = new ResizeObserver(() => measure());
      observer.observe(contentRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (observer) observer.disconnect();
    };
  }, []);

  const baseScale = BASE_WORLD_SCALE[worldKey] ?? 1.0;
  const effectiveFocalScale = baseScale * fitScale;
  const yOffset = WORLD_Y_OFFSET[worldKey] ?? 0;

  // Distance from camera to plane focal z:
  const dist = cameraZ - (worldZ + 18);

  let scale = 1;
  let opacity = 1;
  let blur = 0;
  let pointerEvents: "auto" | "none" = "none";
  let translateZ = 0;

  if (dist > 40) {
    scale = 0.3 * effectiveFocalScale;
    opacity = 0;
    blur = 20;
    pointerEvents = "none";
  } else if (dist > 12) {
    const norm = 1 - (dist - 12) / 28;
    scale = (0.35 + norm * 0.65) * effectiveFocalScale;
    opacity = Math.max(0, Math.min(1, norm));
    blur = (1 - norm) * 16;
    pointerEvents = norm > 0.85 ? "auto" : "none";
  } else if (dist >= -12) {
    scale = effectiveFocalScale;
    opacity = 1.0;
    blur = 0;
    pointerEvents = "auto";
  } else if (dist >= -50) {
    const norm = (-dist - 12) / 38;
    scale = (1.0 + norm * 4.5) * effectiveFocalScale;
    opacity = Math.max(0, 1 - norm * 1.2);
    blur = norm * 14;
    pointerEvents = "none";
  } else {
    scale = 6.0 * effectiveFocalScale;
    opacity = 0;
    blur = 24;
    pointerEvents = "none";
  }

  if (opacity <= 0.01) return null;

  // Disable CSS transitions during Focus Mode or instant teleport to eliminate 75ms interpolation lag
  const isFocusActive = activeFocusKey !== null;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        transform: `scale(${scale}) translateY(${yOffset}px) translateZ(${translateZ}px)`,
        opacity: opacity,
        filter: blur > 0.5 ? `blur(${blur}px)` : "none",
        pointerEvents: pointerEvents,
        transition: isFocusActive ? "none" : "all 75ms ease-out",
        willChange: "transform, opacity, filter",
      }}
    >
      <div ref={contentRef} className="w-full flex flex-col items-center justify-center pointer-events-auto">
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
