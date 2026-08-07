"use client";

import React, { useEffect, useRef, useState } from "react";
import { tickEngine } from "@/lib/tick-engine";
import { inputManager } from "@/lib/input-manager";

interface PhotonParticle {
  x: number;
  y: number;
  alpha: number;
  size: number;
}

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // QCS V2 State (Ref-based for 0 React re-renders & 120+ FPS execution)
  const qcsState = useRef({
    // Layer 1: Quantum Core (9.5px solid ceramic white, 1:1 locked)
    coreX: 0,
    coreY: 0,
    coreRadius: 4.75, // 9.5px diameter

    // Inertia Outer Rings Position (12ms physical lag)
    outerX: 0,
    outerY: 0,

    // Dual Ring Dimensions & Targets
    innerRingRadius: 14, // 28px diameter
    targetInnerRingRadius: 14,
    outerRingRadius: 20, // 40px diameter
    targetOuterRingRadius: 20,

    // Rotations & Speeds
    energyAngle: 0,
    orbitAngle: 0,
    scanArcAngle: 0,
    scanArcSpeedMultiplier: 1.0,

    // Proximity Sensing System (40-60px radius)
    proximityFactor: 0, // 0 to 1
    closestInteractivePos: null as { x: number; y: number } | null,

    // Adaptive Contrast & Brightness multiplier (1.0 to 1.25)
    brightnessBoost: 1.0,

    // Interaction states
    type: "default" as "default" | "button" | "link" | "card" | "text",
    magneticTarget: null as { x: number; y: number } | null,

    // Click Sonar Pulse (100ms)
    clickProgress: 0,

    // Photon Particle Trail
    photons: [] as PhotonParticle[],
    lastSpawnPos: { x: 0, y: 0 },

    // 4s Idle Easter Egg
    idleTime: 0,
    easterEggActive: false,
    easterEggTimer: 0,
    easterEggPulseRadius: 0,
  });

  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handleQueryChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleQueryChange);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Click handler (100ms flash & sonar ripple)
    const handleMouseDown = () => {
      qcsState.current.clickProgress = 1.0;
    };

    window.addEventListener("mousedown", handleMouseDown, { passive: true });

    // Interaction State Delegation, Magnetic Attraction & Proximity Radar
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isText = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.closest("[contenteditable]");
      const buttonEl = target.closest("button") || target.closest("[role='button']");
      const linkEl = target.closest("a");
      const cardEl = target.closest(".glass-panel") || target.closest(".interactive-card") || target.closest("[data-card]");

      if (isText) {
        qcsState.current.type = "text";
        qcsState.current.magneticTarget = null;
        qcsState.current.brightnessBoost = 1.2;
      } else if (buttonEl) {
        const rect = buttonEl.getBoundingClientRect();
        qcsState.current.type = "button";
        qcsState.current.targetInnerRingRadius = 17; // Expands to 34px
        qcsState.current.targetOuterRingRadius = 24;
        qcsState.current.brightnessBoost = 1.25; // +25% brightness boost on hover
        qcsState.current.magneticTarget = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      } else if (linkEl) {
        qcsState.current.type = "link";
        qcsState.current.targetInnerRingRadius = 11; // 20% compression
        qcsState.current.targetOuterRingRadius = 16;
        qcsState.current.brightnessBoost = 1.2;
        qcsState.current.magneticTarget = null;
      } else if (cardEl) {
        qcsState.current.type = "card";
        qcsState.current.targetInnerRingRadius = 15;
        qcsState.current.targetOuterRingRadius = 22;
        qcsState.current.scanArcSpeedMultiplier = 2.5;
        qcsState.current.brightnessBoost = 1.2;
        qcsState.current.magneticTarget = null;
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest(".glass-panel");

      if (isInteractive) {
        qcsState.current.type = "default";
        qcsState.current.targetInnerRingRadius = 14;
        qcsState.current.targetOuterRingRadius = 20;
        qcsState.current.scanArcSpeedMultiplier = 1.0;
        qcsState.current.brightnessBoost = 1.0;
        qcsState.current.magneticTarget = null;
      }
    };

    // Proximity Sensing MouseMove Radar (Scans within 60px of interactive targets)
    const handleMouseMove = (e: MouseEvent) => {
      if (qcsState.current.type !== "default") return;

      const x = e.clientX;
      const y = e.clientY;

      // Fast element check near cursor pointer
      const elements = document.elementsFromPoint(x, y);
      let foundDist = 999;
      let targetCenter: { x: number; y: number } | null = null;

      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        if (el.tagName === "BUTTON" || el.tagName === "A" || el.closest("button") || el.closest("a") || el.classList.contains("glass-panel")) {
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dist = Math.hypot(cx - x, cy - y);
          if (dist < foundDist) {
            foundDist = dist;
            targetCenter = { x: cx, y: cy };
          }
          break;
        }
      }

      if (targetCenter && foundDist <= 60) {
        const prox = Math.max(0, 1 - foundDist / 60);
        qcsState.current.proximityFactor = prox;
        qcsState.current.closestInteractivePos = targetCenter;
      } else {
        qcsState.current.proximityFactor = 0;
        qcsState.current.closestInteractivePos = null;
      }
    };

    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });
    document.addEventListener("mousemove", handleMouseMove, { passive: true });

    // MASTER RENDER LOOP (100% Canvas, zero React state, 60-144 FPS)
    const render = (deltaTime: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const state = qcsState.current;

      // Update Mouse position (1:1 locked for core)
      inputManager.updateMouseLerp(1.0);
      const rawMouseX = inputManager.mouse.x;
      const rawMouseY = inputManager.mouse.y;

      state.coreX = rawMouseX;
      state.coreY = rawMouseY;

      // Subtle Magnetic Attraction (max 5px pull toward center of hovered button)
      let targetOuterX = rawMouseX;
      let targetOuterY = rawMouseY;

      if (state.magneticTarget && !mediaQuery.matches) {
        const dx = state.magneticTarget.x - rawMouseX;
        const dy = state.magneticTarget.y - rawMouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const pull = Math.min(5, dist * 0.05);
          const angle = Math.atan2(dy, dx);
          targetOuterX += Math.cos(angle) * pull;
          targetOuterY += Math.sin(angle) * pull;
        }
      }

      // 12ms Physical Inertia for Outer Rings
      state.outerX += (targetOuterX - state.outerX) * 0.28;
      state.outerY += (targetOuterY - state.outerY) * 0.28;

      // Track Idle state for 4s Easter Egg
      const moveDist = Math.hypot(rawMouseX - state.lastSpawnPos.x, rawMouseY - state.lastSpawnPos.y);
      if (moveDist > 1.5) {
        state.idleTime = 0;
        state.lastSpawnPos = { x: rawMouseX, y: rawMouseY };

        // Layer 5: Spawn Micro Photon Particle Trail (2-4 digital photons fading in 250ms)
        if (state.type !== "card" && !mediaQuery.matches) {
          state.photons.push({
            x: rawMouseX + (Math.random() - 0.5) * 4,
            y: rawMouseY + (Math.random() - 0.5) * 4,
            alpha: 0.9,
            size: Math.random() * 1.5 + 1.2,
          });
          if (state.photons.length > 8) state.photons.shift();
        }
      } else {
        state.idleTime += deltaTime;
      }

      // 4s Idle Easter Egg Trigger
      if (state.idleTime >= 4.0 && !state.easterEggActive) {
        state.easterEggActive = true;
        state.easterEggTimer = 1.0; // Show "SYSTEM READY" for 1 second
        state.easterEggPulseRadius = 5;
      }

      if (state.easterEggActive) {
        state.easterEggTimer -= deltaTime;
        state.easterEggPulseRadius += deltaTime * 40;
        if (state.easterEggTimer <= 0) {
          state.easterEggActive = false;
        }
      }

      // Proximity Glow Boost calculation (up to +20% brightness & stroke)
      const currentBrightness = state.brightnessBoost + state.proximityFactor * 0.2;

      // Smooth radius interpolation
      state.innerRingRadius += (state.targetInnerRingRadius - state.innerRingRadius) * 0.22;
      state.outerRingRadius += (state.targetOuterRingRadius - state.outerRingRadius) * 0.22;

      // Continuous Rotations (Energy = 8s, Orbit = 4s)
      if (state.type !== "button") {
        state.energyAngle += deltaTime * (Math.PI * 2 / 8.0);
        state.orbitAngle += deltaTime * (Math.PI * 2 / 4.0);
      }
      state.scanArcAngle += deltaTime * (Math.PI * 2 / 3.0) * state.scanArcSpeedMultiplier;

      // Decay Click Sonar Pulse (100ms total = 10 * deltaTime)
      if (state.clickProgress > 0) {
        state.clickProgress = Math.max(0, state.clickProgress - deltaTime * 10.0);
      }

      // SUBTLE DARK BACKPLATE (10-15% soft radial dark shadow to separate from busy backgrounds)
      ctx.save();
      const backplateGrad = ctx.createRadialGradient(state.outerX, state.outerY, 0, state.outerX, state.outerY, 32);
      backplateGrad.addColorStop(0, "rgba(0, 0, 0, 0.18)");
      backplateGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = backplateGrad;
      ctx.beginPath();
      ctx.arc(state.outerX, state.outerY, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Render Layer 5: Micro Photon Particle Trail
      for (let i = state.photons.length - 1; i >= 0; i--) {
        const p = state.photons[i];
        p.alpha -= deltaTime / 0.25; // Fade out in 250ms
        if (p.alpha <= 0) {
          state.photons.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.95})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = "#3EF2FF";
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Render Card Glass Subtle Self-Illumination Light (10% intensity)
      if (state.type === "card") {
        const grad = ctx.createRadialGradient(state.outerX, state.outerY, 0, state.outerX, state.outerY, 65);
        grad.addColorStop(0, "rgba(62, 242, 255, 0.15)");
        grad.addColorStop(1, "rgba(62, 242, 255, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(state.outerX, state.outerY, 65, 0, Math.PI * 2);
        ctx.fill();
      }

      // RENDER OUTER LAYERS (At inertia position outerX, outerY)
      ctx.save();
      ctx.translate(state.outerX, state.outerY);

      if (state.type === "text") {
        // Futuristic Text Cursor: Two parallel cyan lines with animated energy pulse
        ctx.strokeStyle = "#3EF2FF";
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        ctx.moveTo(-3.5, -9);
        ctx.lineTo(-3.5, 9);
        ctx.moveTo(3.5, -9);
        ctx.lineTo(3.5, 9);
        ctx.stroke();

        const energyY = Math.sin(performance.now() * 0.012) * 7;
        ctx.beginPath();
        ctx.arc(0, energyY, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.shadowBlur = 6;
        ctx.shadowColor = "#3EF2FF";
        ctx.fill();
        ctx.shadowBlur = 0;
      } else {
        // LAYER 4: Dynamic Scan Arc (Violet Accent #8B5CFF, ~30% outer ring arc)
        ctx.save();
        ctx.rotate(state.scanArcAngle);

        // 1px Dark Edge Outline for Arc
        ctx.beginPath();
        ctx.arc(0, 0, state.outerRingRadius + 4, 0, Math.PI * 0.6);
        ctx.strokeStyle = "rgba(5, 7, 15, 0.65)";
        ctx.lineWidth = 3.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, state.outerRingRadius + 4, 0, Math.PI * 0.6);
        ctx.strokeStyle = state.type === "button" ? "#FFFFFF" : "#8B5CFF";
        ctx.lineWidth = 2.0;
        ctx.shadowBlur = 6;
        ctx.shadowColor = "#8B5CFF";
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.restore();

        // LAYER 3: Outer Secondary Ring (Soft Electric Blue #2F80FF, 1.5px stroke) & 3 White Satellites
        // 1px Dark Edge Outline
        ctx.beginPath();
        ctx.arc(0, 0, state.outerRingRadius, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(5, 7, 15, 0.65)";
        ctx.lineWidth = 3.0;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, state.outerRingRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(47, 128, 255, ${0.45 * currentBrightness})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // 3 High-Visibility Pure White Satellites (+20% size = 2.2px radius)
        if (!state.easterEggActive) {
          for (let s = 0; s < 3; s++) {
            const satAngle = state.orbitAngle + (s * Math.PI * 2) / 3;
            const sx = Math.cos(satAngle) * state.outerRingRadius;
            const sy = Math.sin(satAngle) * state.outerRingRadius;

            // Satellite dark outline
            ctx.beginPath();
            ctx.arc(sx, sy, 3.2, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(5, 7, 15, 0.65)";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(sx, sy, 2.2, 0, Math.PI * 2);
            ctx.fillStyle = "#FFFFFF";
            ctx.shadowBlur = 6;
            ctx.shadowColor = "#3EF2FF";
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }

        // LAYER 2: Inner Primary Energy Ring (Electric Cyan #3EF2FF, 3.0px stroke, 90% opacity)
        ctx.save();
        ctx.rotate(state.energyAngle);

        // 1px Dark Edge Outline
        ctx.beginPath();
        ctx.arc(0, 0, state.innerRingRadius, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(5, 7, 15, 0.65)";
        ctx.lineWidth = 4.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, state.innerRingRadius, 0, Math.PI * 2);
        ctx.strokeStyle = "#3EF2FF";
        ctx.lineWidth = state.type === "button" ? 3.5 : 3.0;
        ctx.globalAlpha = Math.min(1.0, 0.9 * currentBrightness);
        ctx.shadowBlur = 6;
        ctx.shadowColor = "#3EF2FF";
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.restore();

        // Sonar Click Active Ripple (100ms duration)
        if (state.clickProgress > 0) {
          const rippleRadius = (1.0 - state.clickProgress) * 35;
          ctx.beginPath();
          ctx.arc(0, 0, rippleRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(62, 242, 255, ${state.clickProgress})`;
          ctx.lineWidth = 2.0;
          ctx.stroke();
        }

        // 4s Idle Holographic Easter Egg ("SYSTEM READY")
        if (state.easterEggActive) {
          ctx.beginPath();
          ctx.arc(0, 0, state.easterEggPulseRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(62, 242, 255, ${Math.max(0, state.easterEggTimer)})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.font = "bold 9px monospace";
          ctx.fillStyle = `rgba(62, 242, 255, ${Math.min(1.0, state.easterEggTimer * 2)})`;
          ctx.textAlign = "center";
          ctx.fillText("SYSTEM READY", 0, -state.outerRingRadius - 12);
        }
      }

      ctx.restore(); // End outer inertia rendering

      // RENDER LAYER 1: Quantum Core (9.5px solid ceramic pure white + 1.5px cyan halo, locked 1:1)
      if (state.type !== "text") {
        ctx.save();
        ctx.translate(state.coreX, state.coreY);

        // Core 1.5px Cyan Halo
        ctx.beginPath();
        ctx.arc(0, 0, state.coreRadius + 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(62, 242, 255, 0.45)";
        ctx.fill();

        // Core 1px Dark Edge Outline
        ctx.beginPath();
        ctx.arc(0, 0, state.coreRadius + 0.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(5, 7, 15, 0.65)";
        ctx.fill();

        // Solid Pure White Core (9.5px diameter)
        ctx.beginPath();
        ctx.arc(0, 0, state.coreRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();

        // Click 100ms white flash boost
        if (state.clickProgress > 0.8) {
          ctx.beginPath();
          ctx.arc(0, 0, state.coreRadius + 2.0, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#FFFFFF";
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        ctx.restore();
      }
    };

    const unsubscribe = tickEngine.subscribe("zibrin-qcs-v2-cursor", render);

    return () => {
      unsubscribe();
      mediaQuery.removeEventListener("change", handleQueryChange);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[99999] hidden md:block"
      />
      <noscript>
        <style>{`
          html, body, a, button, input, select, textarea {
            cursor: auto !important;
          }
        `}</style>
      </noscript>
    </>
  );
}
