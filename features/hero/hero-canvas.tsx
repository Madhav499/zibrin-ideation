"use client";

import React, { useEffect, useRef } from "react";
import { tickEngine } from "@/lib/tick-engine";
import { inputManager } from "@/lib/input-manager";
import { qualityManager } from "@/lib/quality-manager";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderState = useRef({ isOffscreen: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Array<{
      x: number;
      y: number;
      ox: number;
      oy: number;
      size: number;
      color: string;
      angle: number;
      speed: number;
      orbitRadius: number;
    }> = [];

    const techs = [
      "REACT", "FLUTTER", "COGNITIVE AI", "CLOUD EDGE", 
      "POSTGRES", "CYBER SEC", "AEO / SEO", "AUTOMATION", "REST API"
    ];

    let planets: Array<{
      name: string;
      angle: number;
      speed: number;
      radius: number;
      size: number;
      color: string;
    }> = [];

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const init = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = 650;

      const w = canvas.width;
      const profile = qualityManager.getProfile();
      
      let coreParticleCount = Math.floor(140 * profile.particleMultiplier);
      if (w < 768) {
        coreParticleCount = Math.floor(40 * profile.particleMultiplier);
      }

      particles = [];
      for (let i = 0; i < coreParticleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const orbitRadius = 40 + Math.random() * 85;
        const speed = prefersReducedMotion ? 0 : 0.003 + Math.random() * 0.007;

        particles.push({
          x: canvas.width / 2 + Math.cos(angle) * orbitRadius,
          y: canvas.height / 2 + Math.sin(angle) * orbitRadius,
          ox: canvas.width / 2,
          oy: canvas.height / 2,
          size: 1 + Math.random() * 1.5,
          color: i % 3 === 0 ? "#3EF2FF" : i % 3 === 1 ? "#8B5CFF" : "#2F80FF",
          angle: angle,
          speed: speed,
          orbitRadius: orbitRadius,
        });
      }

      planets = techs.map((name, i) => {
        const angle = (i * (Math.PI * 2)) / techs.length;
        const speed = prefersReducedMotion ? 0 : 0.001 + (i % 3) * 0.0004;

        return {
          name,
          angle: angle,
          speed: speed,
          radius: w < 768 ? 120 + (i % 2) * 20 : 170 + (i % 2) * 45,
          size: w < 768 ? 4 : 6,
          color: i % 2 === 0 ? "#3EF2FF" : "#8B5CFF",
        };
      });
    };

    init();

    const handleResize = () => init();
    window.addEventListener("resize", handleResize);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          renderState.current.isOffscreen = !entry.isIntersecting;
        });
      },
      { threshold: 0.01 }
    );
    observer.observe(canvas);

    const render = () => {
      if (renderState.current.isOffscreen) return;

      inputManager.updateMouseLerp(0.12);
      ctx.fillStyle = "rgba(5, 7, 15, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Core nucleus
      const coreGradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 60);
      coreGradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
      coreGradient.addColorStop(0.2, "rgba(62, 242, 255, 0.6)");
      coreGradient.addColorStop(0.6, "rgba(139, 92, 255, 0.25)");
      coreGradient.addColorStop(1, "transparent");
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
      ctx.fill();

      // Render core particles
      const rect = canvas.getBoundingClientRect();
      const canvasMouseX = inputManager.mouse.x - rect.left;
      const canvasMouseY = inputManager.mouse.y - rect.top;

      particles.forEach((p) => {
        p.angle += p.speed;
        let targetX = centerX + Math.cos(p.angle) * p.orbitRadius;
        let targetY = centerY + Math.sin(p.angle) * p.orbitRadius;

        if (!prefersReducedMotion && canvasMouseX > 0 && canvasMouseX < canvas.width && canvasMouseY > 0 && canvasMouseY < canvas.height) {
          const dx = canvasMouseX - p.x;
          const dy = canvasMouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const force = (100 - dist) / 100;
            const angle = Math.atan2(dy, dx);
            targetX -= Math.cos(angle) * force * 35;
            targetY -= Math.sin(angle) * force * 35;
          }
        }

        p.x += (targetX - p.x) * 0.1;
        p.y += (targetY - p.y) * 0.1;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render orbiting technology planets
      planets.forEach((pl) => {
        pl.angle += pl.speed;
        const px = centerX + Math.cos(pl.angle) * pl.radius;
        const py = centerY + Math.sin(pl.angle) * pl.radius;

        if (canvas.width >= 768) {
          ctx.strokeStyle = `rgba(62, 242, 255, 0.05)`;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(px, py);
          ctx.stroke();
        }

        ctx.fillStyle = pl.color;
        ctx.beginPath();
        ctx.arc(px, py, pl.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.font = "bold 9px var(--font-orbitron)";
        ctx.textAlign = "center";
        ctx.fillText(pl.name, px, py - 10);
      });
    };

    const unsubscribe = tickEngine.subscribe("hero-canvas", render);

    return () => {
      unsubscribe();
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
