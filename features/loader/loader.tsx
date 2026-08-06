"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function StartupLoader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const particleRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const path1Ref = useRef<SVGPathElement | null>(null);
  const path2Ref = useRef<SVGPathElement | null>(null);
  const arrowRef = useRef<SVGPathElement | null>(null);
  const logoTextRef = useRef<HTMLDivElement | null>(null);
  const flashRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const t1 = gsap.timeline({
      onComplete: () => {
        // Smoothly exit loader
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: onComplete,
        });
      },
    });

    // 1. Initial State: Small glowing particle in absolute center
    gsap.set(particleRef.current, { scale: 0.1, opacity: 0 });
    gsap.set(svgRef.current, { opacity: 0 });
    gsap.set(logoTextRef.current, { opacity: 0, y: 15 });
    gsap.set(flashRef.current, { opacity: 0 });

    // Step 1: Glowing particle materializes
    t1.to(particleRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });

    // Step 2: Particle moves slightly, expanding into neural vectors (faint lines)
    t1.to(particleRef.current, {
      width: 140,
      height: 1,
      borderRadius: 0,
      background: "rgba(62, 242, 255, 0.4)",
      duration: 0.4,
      ease: "power2.inOut",
    });

    // Step 3: Vectors morph into the infinity loop paths
    t1.to(particleRef.current, {
      opacity: 0,
      duration: 0.2,
    }, "-=0.1");

    t1.to(svgRef.current, {
      opacity: 1,
      duration: 0.2,
    }, "-=0.2");

    // Draw the lobes (Möbius Infinity)
    t1.fromTo(
      [path1Ref.current, path2Ref.current],
      { strokeDasharray: 300, strokeDashoffset: 300 },
      { strokeDashoffset: 0, duration: 0.7, ease: "power1.inOut" },
      "-=0.1"
    );

    // Step 4: Arrow reveals, locking into the core Z structure
    t1.fromTo(
      arrowRef.current,
      { opacity: 0, scale: 0.8, y: -10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.5)" }
    );

    // Step 5: Logo Text Materialization
    t1.to(logoTextRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    }, "-=0.1");

    // Step 6: Intense energy pulse (Flash)
    t1.to(flashRef.current, {
      opacity: 1,
      duration: 0.15,
      ease: "power2.in",
    });
    
    t1.to(flashRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });

  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-space-black z-[99999] flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* Background space breathing */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(62,242,255,0.03),transparent_70%)] space-breath pointer-events-none" />

      {/* 1. Initial materializing particle */}
      <div
        ref={particleRef}
        className="w-3 h-3 bg-cyan-glow rounded-full shadow-[0_0_20px_rgba(62,242,255,0.8)] absolute z-10 pointer-events-none"
      />

      {/* 2. Drawing Möbius SVG Logo */}
      <div className="flex flex-col items-center gap-6 relative z-20">
        <svg
          ref={svgRef}
          width="110"
          height="110"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_15px_rgba(62,242,255,0.4)]"
        >
          <defs>
            <linearGradient id="loader-blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2F80FF" />
              <stop offset="100%" stopColor="#3EF2FF" />
            </linearGradient>

            <linearGradient id="loader-violet-grad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CFF" />
              <stop offset="100%" stopColor="#3EF2FF" />
            </linearGradient>

            <filter id="loader-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Möbius Infinity Ribbon Part 1 */}
          <path
            ref={path1Ref}
            d="M 100 100 C 130 65, 175 65, 175 100 C 175 135, 130 135, 100 100"
            stroke="url(#loader-violet-grad)"
            strokeWidth="14"
            strokeLinecap="round"
            filter="url(#loader-glow)"
          />

          {/* Möbius Infinity Ribbon Part 2 */}
          <path
            ref={path2Ref}
            d="M 100 100 C 70 135, 25 135, 25 100 C 25 65, 70 65, 100 100"
            stroke="url(#loader-blue-grad)"
            strokeWidth="14"
            strokeLinecap="round"
            filter="url(#loader-glow)"
          />

          {/* Z shape Upward arrow */}
          <path
            ref={arrowRef}
            d="M 100 65 L 120 85 M 100 65 L 80 85 M 100 65 L 100 115"
            stroke="#FFFFFF"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#loader-glow)"
          />
        </svg>

        {/* Brand details */}
        <div
          ref={logoTextRef}
          className="flex flex-col items-center text-center font-orbitron"
        >
          <h2 className="text-white text-sm font-bold tracking-[0.25em] uppercase">
            ZIBRIN LABS
          </h2>
          <span className="text-[8px] font-mono text-cyan-glow tracking-[0.4em] uppercase mt-1">
            ENGINEERING THE INFINITE
          </span>
        </div>
      </div>

      {/* 3. Energy flash overlay */}
      <div
        ref={flashRef}
        className="absolute inset-0 bg-white z-30 pointer-events-none"
      />
    </div>
  );
}
