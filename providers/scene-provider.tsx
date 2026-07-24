"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import CameraRig from "@/components/webgl/camera-rig";
import WorldManager from "@/components/webgl/world-manager";
import LightingSystem from "@/components/webgl/lighting-system";
import ParticleSystem from "@/components/webgl/particle-system";
import RouteController from "@/components/webgl/route-controller";

export type WorldKey = "hero" | "about" | "services" | "portfolio" | "process" | "contact" | "builder";

export const WORLD_Z_MAP: Record<WorldKey, number> = {
  hero: 0,
  about: -80,
  services: -160,
  portfolio: -240,
  process: -240,
  contact: -320,
  builder: -320,
};

interface SceneContextType {
  activeWorld: WorldKey;
  targetZ: number;
  isTransitioning: boolean;
  transitionProgress: number;
  qualityTier: "high" | "medium" | "low";
  setWorld: (worldKey: WorldKey) => void;
}

const SceneContext = createContext<SceneContextType>({
  activeWorld: "hero",
  targetZ: 0,
  isTransitioning: false,
  transitionProgress: 0,
  qualityTier: "high",
  setWorld: () => {},
});

export const useScene = () => useContext(SceneContext);

export default function SceneProvider({ children }: { children: React.ReactNode }) {
  const [activeWorld, setActiveWorld] = useState<WorldKey>("hero");
  const [targetZ, setTargetZ] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [transitionProgress, setTransitionProgress] = useState<number>(0);
  const [qualityTier, setQualityTier] = useState<"high" | "medium" | "low">("high");

  // Determine GPU capability / Device pixel ratio / Reduced motion
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || isMobile) {
      setQualityTier("medium");
    } else {
      setQualityTier("high");
    }
  }, []);

  const setWorld = useCallback((worldKey: WorldKey) => {
    const newZ = WORLD_Z_MAP[worldKey] ?? 0;
    setActiveWorld(worldKey);
    setTargetZ(newZ);
  }, []);

  return (
    <SceneContext.Provider
      value={{
        activeWorld,
        targetZ,
        isTransitioning,
        transitionProgress,
        qualityTier,
        setWorld,
      }}
    >
      {/* Route Controller syncs Next.js route with R3F 3D World Z-positions */}
      <RouteController />

      {/* Persistent Single Three.js WebGL Canvas Lifecycle */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-space-black">
        <Canvas
          camera={{ position: [0, 0, 15], fov: 45, near: 0.1, far: 1000 }}
          dpr={qualityTier === "high" ? [1, 2] : [1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        >
          {/* Lighting System */}
          <LightingSystem />

          {/* Cinematic Camera Rig */}
          <CameraRig targetZ={targetZ} />

          {/* Volumetric Particle System across Z-depth */}
          <ParticleSystem qualityTier={qualityTier} />

          {/* 3D World Manager hosting all 5 spatial environments */}
          <WorldManager activeWorld={activeWorld} />
        </Canvas>
      </div>

      {/* HTML Overlays sitting cleanly above WebGL canvas */}
      <div className="relative z-10">{children}</div>
    </SceneContext.Provider>
  );
}
