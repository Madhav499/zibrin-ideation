"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Target, Compass, Award, Heart, Shield, Flame, Users, Eye, X } from "lucide-react";

interface CoreValueItem {
  title: string;
  desc: string;
  icon: React.ElementType;
}

const CORE_VALUES: CoreValueItem[] = [
  {
    title: "Vision First",
    desc: "Every project begins with your vision. We transform your ideas into digital experiences.",
    icon: Eye,
  },
  {
    title: "Creativity Without Limits",
    desc: "Every product is crafted with originality, innovation, and purpose.",
    icon: Flame,
  },
  {
    title: "Quality in Every Pixel",
    desc: "Carefully designed, developed, and tested to deliver a premium digital experience.",
    icon: Award,
  },
  {
    title: "Innovation",
    desc: "We explore new tech, AI, and design trends to create future-ready solutions.",
    icon: Sparkles,
  },
  {
    title: "Partnership",
    desc: "Your success is our success. We work as an extension of your team.",
    icon: Users,
  },
  {
    title: "Transparency",
    desc: "Clear communication, honest timelines, and complete project visibility.",
    icon: Shield,
  },
  {
    title: "Excellence",
    desc: "We deliver experiences that exceed expectations and leave a lasting impression.",
    icon: Target,
  },
  {
    title: "Client Focus",
    desc: "Every decision and feature is shaped around your goals and your vision.",
    icon: Heart,
  },
];

function CoreValuesOrbit() {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Slow continuous rotation (~1 revolution per 100 seconds)
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (hoveredIndex === null) {
        setRotationAngle((prev) => (prev + dt * 3.6) % 360);
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [hoveredIndex]);

  const activeItem = hoveredIndex !== null ? CORE_VALUES[hoveredIndex] : null;
  const ActiveIcon = activeItem ? activeItem.icon : null;

  // Calculate smart panel positioning above hovered node
  let panelPos = { x: 0, y: -120 };
  if (hoveredIndex !== null) {
    const angleDeg = (hoveredIndex * 45 + rotationAngle) % 360;
    const angleRad = (angleDeg * Math.PI) / 180;
    const radiusX = isMobile ? 140 : 210;
    const radiusY = isMobile ? 95 : 110;

    const nodeX = Math.cos(angleRad) * radiusX;
    const nodeY = Math.sin(angleRad) * radiusY;

    // Place panel above hovered node with smart viewport clamping
    let px = nodeX;
    let py = nodeY - 110;

    // Horizontal clamping to keep panel inside visible area
    if (px < -120) px = -120;
    if (px > 120) px = 120;

    // Vertical top threshold adjustment
    if (nodeY < -70) {
      py = nodeY - 95;
    }

    panelPos = { x: px, y: py };
  }

  return (
    <div className="w-full flex flex-col items-center justify-center my-3 relative">
      {/* Title Header */}
      <div className="flex items-center justify-center gap-2 mb-3 z-10">
        <h3 className="text-sm sm:text-base font-bold font-syne text-white text-center">
          Our Core Values Orbit
        </h3>
        <span className="text-[10px] font-mono text-cyan-glow/80 bg-cyan-glow/10 px-2.5 py-0.5 rounded-full border border-cyan-glow/30">
          Hover node to explore
        </span>
      </div>

      {/* Desktop & Tablet Circular 3D Orbit System */}
      <div className="relative w-[340px] sm:w-[460px] md:w-[540px] h-[240px] sm:h-[260px] md:h-[280px] flex items-center justify-center">
        {/* Outer Orbital Ring */}
        <div className="absolute inset-x-8 sm:inset-x-12 inset-y-2 sm:inset-y-4 rounded-full border border-cyan-glow/20 shadow-[0_0_25px_rgba(62,242,255,0.15)] pointer-events-none animate-pulse" />

        {/* Center Node (Zibrin Core) */}
        <div className="z-10 flex flex-col items-center justify-center p-3 rounded-full bg-space-black/90 border border-cyan-glow/40 backdrop-blur-2xl shadow-[0_0_30px_rgba(62,242,255,0.3)] transition-transform duration-500 hover:scale-105">
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-cyan-glow to-neon-violet flex items-center justify-center shadow-lg">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-space-black animate-spin" style={{ animationDuration: "12s" }} />
          </div>
          <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-cyan-glow mt-1 uppercase font-bold">
            ZIBRIN CORE
          </span>
        </div>

        {/* 8 Orbital Nodes */}
        {CORE_VALUES.map((item, idx) => {
          const IconComp = item.icon;
          const isHovered = hoveredIndex === idx;

          // Calculate node coordinates on elliptical orbit path
          const angleDeg = (idx * 45 + rotationAngle) % 360;
          const angleRad = (angleDeg * Math.PI) / 180;
          const radiusX = isMobile ? 140 : 210;
          const radiusY = isMobile ? 95 : 110;

          const x = Math.cos(angleRad) * radiusX;
          const y = Math.sin(angleRad) * radiusY;

          return (
            <button
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setHoveredIndex(isHovered ? null : idx)}
              style={{
                transform: `translate(${x}px, ${y}px) scale(${isHovered ? 1.15 : 1.0})`,
              }}
              className={`absolute z-20 px-2.5 sm:px-3.5 py-1.5 rounded-full border backdrop-blur-xl transition-all duration-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer shadow-lg ${
                isHovered
                  ? "bg-space-black/95 border-cyan-glow shadow-[0_0_25px_rgba(62,242,255,0.6)] text-white scale-110"
                  : "bg-space-black/75 border-white/15 text-slate-300 hover:border-cyan-glow/60 hover:text-white"
              }`}
            >
              <div
                className={`p-1 rounded-full ${
                  isHovered ? "bg-cyan-glow text-space-black" : "bg-white/10 text-cyan-glow"
                }`}
              >
                <IconComp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
              <span className="text-[10px] sm:text-xs font-syne font-semibold whitespace-nowrap">
                {item.title}
              </span>
            </button>
          );
        })}

        {/* Floating Glass Information Panel (Positioned ABOVE Hovered Node, Layer z-50) */}
        {activeItem && ActiveIcon && (
          <div
            style={{
              transform: `translate(${panelPos.x}px, ${panelPos.y}px)`,
            }}
            className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[270px] sm:w-[310px] p-3.5 sm:p-4 rounded-2xl bg-space-black/95 border border-cyan-glow/60 backdrop-blur-2xl shadow-[0_15px_45px_rgba(62,242,255,0.45)] transition-all duration-250 ease-out animate-in fade-in slide-in-from-bottom-3 zoom-in-95 pointer-events-auto"
          >
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-cyan-glow/20 border border-cyan-glow/50 text-cyan-glow">
                  <ActiveIcon className="w-4 h-4" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold font-syne text-white">
                  {activeItem.title}
                </h4>
              </div>
              <button
                onClick={() => setHoveredIndex(null)}
                className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              {activeItem.desc}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AboutSpatialPlane() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-2 sm:py-3 flex flex-col items-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neon-violet/10 border border-neon-violet/30 backdrop-blur-md mb-2.5 sm:mb-3">
        <Sparkles className="w-3.5 h-3.5 text-neon-violet" />
        <span className="text-[10px] sm:text-xs font-mono tracking-widest text-neon-violet uppercase font-semibold">
          ABOUT US // YOUR TRUSTED DIGITAL PARTNER
        </span>
      </div>

      {/* Main Heading */}
      <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-syne tracking-tight text-white mb-2.5 sm:mb-3 text-center">
        About Zibrininfotech: <span className="bg-gradient-to-r from-neon-violet via-cyan-glow to-electric-blue bg-clip-text text-transparent">Your Trusted Digital Partner</span>
      </h2>

      {/* Story Banner */}
      <div className="w-full p-3.5 sm:p-4 rounded-2xl bg-space-black/70 border border-white/10 backdrop-blur-xl mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-bold font-syne text-cyan-glow mb-1">Our Story</h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
          Behind every business is a dream and dedication. Our purpose is to honour that journey by transforming your vision into immersive digital experiences that make people feel the passion behind it.
        </p>
      </div>

      {/* Mission & Vision Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 w-full mb-3 sm:mb-4">
        <div className="p-3.5 sm:p-4 rounded-2xl bg-space-black/70 border border-cyan-glow/20 backdrop-blur-xl hover:border-cyan-glow/50 transition-all">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="p-1.5 rounded-lg bg-cyan-glow/10 border border-cyan-glow/30 text-cyan-glow">
              <Target className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold font-syne text-white">Our Mission</h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            To transform static websites into living digital experiences where design, technology, and storytelling work together seamlessly.
          </p>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-space-black/70 border border-neon-violet/20 backdrop-blur-xl hover:border-neon-violet/50 transition-all">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="p-1.5 rounded-lg bg-neon-violet/10 border border-neon-violet/30 text-neon-violet">
              <Compass className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold font-syne text-white">Our Vision</h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            A future where every business can present its work exactly as imagined—without limits or compromise.
          </p>
        </div>
      </div>

      {/* Interactive Core Values Orbit */}
      <CoreValuesOrbit />

      {/* Our Promise Banner */}
      <div className="w-full p-3 sm:p-3.5 rounded-xl bg-gradient-to-r from-cyan-glow/10 via-neon-violet/10 to-electric-blue/10 border border-cyan-glow/30 backdrop-blur-md text-center mt-1">
        <p className="text-xs sm:text-sm font-medium text-white">
          <strong className="text-cyan-glow">Our Promise:</strong> Every project is built with dedication and precision to create an experience you'll be proud to call your own.
        </p>
      </div>
    </div>
  );
}
