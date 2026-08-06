"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CinematicCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function CinematicCard({ children, className = "", delay = 0 }: CinematicCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(
      el,
      {
        opacity: 0,
        z: -100,
        rotateX: 8,
        rotateY: -6,
        scale: 0.9,
      },
      {
        opacity: 1,
        z: 0,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 1.1,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`preserve-3d will-change-transform ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
