"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import { tickEngine } from "@/lib/tick-engine";
import { inputManager } from "@/lib/input-manager";

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 15% Scroll Sensitivity Refinement for intentional, controllable cinematic gestures
    const instance = new Lenis({
      duration: prefersReducedMotion ? 0.8 : 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 0.85,
      touchMultiplier: 0.88,
    });

    instance.on("scroll", (e: { scroll: number; progress: number; velocity: number; direction: number }) => {
      inputManager.updateScroll(e.scroll, e.progress, e.velocity, e.direction);
    });

    setLenis(instance);

    const unsubscribe = tickEngine.subscribe("lenis-smooth-scroll", () => {
      instance.raf(performance.now());
    });

    return () => {
      unsubscribe();
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
