"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, Globe } from "lucide-react";
import gsap from "gsap";

const HeroCanvas = dynamic(() => import("@/features/hero/hero-canvas"), { ssr: false });

export default function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const btn1Ref = useRef<HTMLAnchorElement | null>(null);
  const btn2Ref = useRef<HTMLAnchorElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Heading construction timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.6 });

      // 1. "ENGINEERING" letter-by-letter path lock (simulated via key-frame typing and rotation reveals)
      const engineeringLetters = document.querySelectorAll(".eng-char");
      tl.fromTo(
        engineeringLetters,
        { opacity: 0, scale: 0.3, rotationX: 90, filter: "blur(5px)" },
        { 
          opacity: 1, 
          scale: 1, 
          rotationX: 0, 
          filter: "blur(0px)",
          duration: 0.8, 
          stagger: 0.05, 
          ease: "back.out(1.8)" 
        }
      );

      // 2. "THE FUTURE" combination dial align/lock reveal
      const futureLetters = document.querySelectorAll(".future-char");
      tl.fromTo(
        futureLetters,
        { opacity: 0, rotationY: 180, scale: 1.5, color: "#3EF2FF" },
        { 
          opacity: 1, 
          rotationY: 0, 
          scale: 1, 
          color: "#8B5CFF", 
          duration: 0.6, 
          stagger: 0.06, 
          ease: "power2.inOut" 
        },
        "-=0.4"
      );

      // 3. "TOGETHER" zoom-bloom reveal (from depth)
      tl.fromTo(
        ".together-word",
        { opacity: 0, scale: 0.4, filter: "blur(20px)", textShadow: "0 0 40px #3EF2FF" },
        { opacity: 1, scale: 1, filter: "blur(0px)", textShadow: "0 0 10px rgba(62,242,255,0.4)", duration: 0.8, ease: "power3.out" },
        "-=0.2"
      );

      // 4. CTAs & badges slide/fade
      tl.fromTo(
        [badgeRef.current, btn1Ref.current, btn2Ref.current],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        "-=0.3"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const titleString = "ENGINEERING";
  const futureString = "THE FUTURE";

  return (
    <section ref={containerRef} className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden pt-20">
      {/* Dynamic particles core canvas background */}
      <HeroCanvas />

      {/* Volumetric background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(62,242,255,0.04),transparent_65%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-violet/10 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" style={{ animationDuration: "8s" }} />

      <div className="container mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-none">
        <div className="lg:col-span-8 flex flex-col text-left pointer-events-auto">
          
          {/* Status Diagnostic Badge */}
          <div 
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full w-fit mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow animate-ping" />
            <span className="text-[10px] font-mono tracking-widest text-neutral-300 uppercase">
              SYS // LAB_MATRIX: BOOT_READY
            </span>
          </div>

          {/* Constructed Title block */}
          <h1 ref={headingRef} className="text-4xl md:text-6xl lg:text-7xl font-syne font-extrabold tracking-tight text-white mb-6 uppercase leading-tight select-none">
            {/* 1. Engineering letters */}
            <span className="block mb-2">
              {titleString.split("").map((char, idx) => (
                <span key={idx} className="eng-char inline-block origin-bottom">
                  {char}
                </span>
              ))}
            </span>
            
            {/* 2. The Future locks */}
            <span className="block mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-glow via-electric-blue to-neon-violet glow-text-cyan">
              {futureString.split("").map((char, idx) => (
                <span key={idx} className="future-char inline-block origin-center" style={{ perspective: "600px" }}>
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>

            {/* 3. Together bloom */}
            <span className="together-word block">
              TOGETHER.
            </span>
          </h1>

          <p className="text-sm md:text-base text-neutral-400 max-w-xl mb-8 leading-relaxed">
            Building intelligent digital ecosystems that transform ambitious concepts into scalable, enterprise-grade reality. We construct software for the infinite future.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <a
              ref={btn1Ref}
              href="/builder"
              className="px-6 sm:px-8 py-3.5 bg-gradient-to-r from-electric-blue to-neon-violet text-white text-xs font-mono tracking-widest rounded border border-cyan-glow/20 flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300 shadow-neon-blue cursor-pointer"
            >
              <span>START YOUR JOURNEY</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              ref={btn2Ref}
              href="/services"
              className="px-6 sm:px-8 py-3.5 bg-white/5 border border-white/10 hover:border-cyan-glow/40 hover:bg-cyan-glow/5 text-white text-xs font-mono tracking-widest rounded flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
            >
              <span>EXPLORE SERVICES</span>
              <Globe className="w-4 h-4 text-cyan-glow" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-[9px] font-mono text-neutral-500 tracking-widest uppercase">
          SCROLL TO EXPLORE
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-glow to-transparent" />
      </div>
    </section>
  );
}
