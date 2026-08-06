"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import MasterWorldScene from "@/components/webgl/master-world-scene";
import CinematicCameraController from "@/components/webgl/cinematic-camera-controller";
import LightingRig from "@/components/webgl/lighting-rig";
import VolumetricParticles from "@/components/webgl/volumetric-particles";
import RouteWorldSync from "@/components/webgl/route-world-sync";
import ScrollWorldSync from "@/components/webgl/scroll-world-sync";
import PostProcessingPipeline from "@/components/webgl/post-processing-pipeline";
import WorldEnvironment from "@/components/webgl/world-environment";
import {
  WORLD_Z,
  CAMERA_OFFSET,
  HOME_SCROLL_Z_MIN,
} from "@/lib/world-config";
import type { WorldKey } from "@/lib/world-config";

export type QualityTier = "high" | "medium" | "low";

interface WebglEngineContextType {
  activeWorld: WorldKey;
  targetZ: number;
  scrollTargetZ: number;
  cameraZ: number;
  qualityTier: QualityTier;
  isHomeScroll: boolean;
  setWorld: (key: WorldKey) => void;
  setScrollTargetZ: (z: number) => void;
  setCameraZ: (z: number) => void;
}

const WebglEngineContext = createContext<WebglEngineContextType>({
  activeWorld: "hero",
  targetZ: HOME_SCROLL_Z_MIN,
  scrollTargetZ: HOME_SCROLL_Z_MIN,
  cameraZ: HOME_SCROLL_Z_MIN + CAMERA_OFFSET,
  qualityTier: "high",
  isHomeScroll: true,
  setWorld: () => {},
  setScrollTargetZ: () => {},
  setCameraZ: () => {},
});

export const useWebglEngine = () => useContext(WebglEngineContext);

export type { WorldKey };
export { WORLD_Z, CAMERA_OFFSET };

export default function WebglEngineProvider({ children }: { children: React.ReactNode }) {
  const [activeWorld, setActiveWorld] = useState<WorldKey>("hero");
  const [targetZ, setTargetZ] = useState<number>(HOME_SCROLL_Z_MIN);
  const [scrollTargetZ, setScrollTargetZState] = useState<number>(HOME_SCROLL_Z_MIN);
  const [cameraZ, setCameraZ] = useState<number>(HOME_SCROLL_Z_MIN + CAMERA_OFFSET);
  const [isHomeScroll, setIsHomeScroll] = useState(true);
  const [qualityTier, setQualityTier] = useState<QualityTier>("high");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = window.innerWidth < 768;
    const isLowEnd = window.innerWidth < 480;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || isLowEnd) {
      setQualityTier("low");
    } else if (isMobile) {
      setQualityTier("medium");
    } else {
      setQualityTier("high");
    }
  }, []);

  const setWorld = useCallback((worldKey: WorldKey) => {
    const newZ = WORLD_Z[worldKey] ?? HOME_SCROLL_Z_MIN;
    setActiveWorld(worldKey);
    setTargetZ(newZ);
    setIsHomeScroll(false);
  }, []);

  const setScrollTargetZ = useCallback((z: number) => {
    setScrollTargetZState(z);
    setTargetZ(z);
    setIsHomeScroll(true);
  }, []);

  const dpr = useMemo<[number, number]>(() => {
    if (qualityTier === "high") return [1, 2];
    if (qualityTier === "medium") return [1, 1.5];
    return [1, 1.25];
  }, [qualityTier]);

  return (
    <WebglEngineContext.Provider
      value={{
        activeWorld,
        targetZ,
        scrollTargetZ,
        cameraZ,
        qualityTier,
        isHomeScroll,
        setWorld,
        setScrollTargetZ,
        setCameraZ,
      }}
    >
      <RouteWorldSync />
      <ScrollWorldSync />

      <div className="fixed inset-0 z-0 overflow-hidden bg-space-black" aria-hidden="true">
        <Canvas
          camera={{ position: [0, 0, CAMERA_OFFSET], fov: 42, near: 0.1, far: 1200 }}
          dpr={dpr}
          gl={{
            antialias: qualityTier !== "low",
            alpha: false,
            powerPreference: "high-performance",
            stencil: false,
          }}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
          <color attach="background" args={["#05070F"]} />

          <Suspense fallback={null}>
            <WorldEnvironment />
            <LightingRig />
            <CinematicCameraController />
            <VolumetricParticles />
            <MasterWorldScene />
            <PostProcessingPipeline />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10">{children}</div>
    </WebglEngineContext.Provider>
  );
}
