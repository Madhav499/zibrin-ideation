"use client";

export type QualityTier = "ultra" | "high" | "medium" | "low";

export interface QualityProfile {
  tier: QualityTier;
  dpr: number;
  enablePostProcessing: boolean;
  particleMultiplier: number;
  enableShadows: boolean;
  enableBlur: boolean;
  antialias: boolean;
}

class DynamicQualityManager {
  private profile: QualityProfile = {
    tier: "high",
    dpr: 1.5,
    enablePostProcessing: true,
    particleMultiplier: 1.0,
    enableShadows: true,
    enableBlur: true,
    antialias: true,
  };

  private frameTimes: number[] = [];
  private listeners: Set<(profile: QualityProfile) => void> = new Set();
  private isInitialized: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.init();
    }
  }

  public init() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    const cores = typeof navigator !== "undefined" ? navigator.hardwareConcurrency || 4 : 4;
    const memory = typeof navigator !== "undefined" ? (navigator as unknown as { deviceMemory?: number }).deviceMemory || 8 : 8;
    const isMobile = window.innerWidth < 768;
    const isLowEndMobile = window.innerWidth < 480;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nativeDpr = window.devicePixelRatio || 1;

    let tier: QualityTier = "high";
    let targetDpr = 1.5;

    if (prefersReducedMotion || isLowEndMobile || cores <= 2 || memory <= 2) {
      tier = "low";
      targetDpr = 1.0;
    } else if (isMobile) {
      tier = "medium";
      targetDpr = 1.0;
    } else if (cores <= 4 || memory <= 4) {
      tier = "medium";
      targetDpr = 1.2;
    } else if (cores >= 8 && memory >= 8 && nativeDpr >= 2) {
      tier = "ultra";
      targetDpr = 2.0;
    } else {
      tier = "high";
      targetDpr = 1.75;
    }

    this.profile = this.buildProfile(tier, targetDpr);
  }

  private buildProfile(tier: QualityTier, dpr: number): QualityProfile {
    switch (tier) {
      case "ultra":
        return {
          tier,
          dpr: Math.min(dpr, 2.0),
          enablePostProcessing: true,
          particleMultiplier: 1.0,
          enableShadows: true,
          enableBlur: true,
          antialias: true,
        };
      case "high":
        return {
          tier,
          dpr: Math.min(dpr, 1.75),
          enablePostProcessing: true,
          particleMultiplier: 0.85,
          enableShadows: true,
          enableBlur: true,
          antialias: true,
        };
      case "medium":
        return {
          tier,
          dpr: Math.min(dpr, 1.5),
          enablePostProcessing: false,
          particleMultiplier: 0.6,
          enableShadows: false,
          enableBlur: true,
          antialias: true,
        };
      case "low":
      default:
        return {
          tier: "low",
          dpr: 1.0,
          enablePostProcessing: false,
          particleMultiplier: 0.3,
          enableShadows: false,
          enableBlur: false,
          antialias: false,
        };
    }
  }

  public recordFrame(deltaTime: number) {
    this.frameTimes.push(deltaTime);
    if (this.frameTimes.length > 60) {
      this.frameTimes.shift();

      const avgDelta = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
      const avgFps = 1 / Math.max(avgDelta, 0.001);

      if (avgFps < 45 && this.profile.tier !== "low") {
        if (this.profile.tier === "ultra") this.setTier("high");
        else if (this.profile.tier === "high") this.setTier("medium");
        else if (this.profile.tier === "medium") this.setTier("low");
        this.frameTimes = [];
      }
    }
  }

  public getProfile(): QualityProfile {
    return this.profile;
  }

  public setTier(tier: QualityTier) {
    const nativeDpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    this.profile = this.buildProfile(tier, nativeDpr);
    this.notify();
  }

  public subscribe(listener: (profile: QualityProfile) => void): () => void {
    this.listeners.add(listener);
    listener(this.profile);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.profile));
  }
}

export const qualityManager = new DynamicQualityManager();
