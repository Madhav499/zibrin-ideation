"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CinematicTextAnimatorProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delay?: number;
}

export default function CinematicTextAnimator({
  text,
  className = "",
  as: Component = "h2",
  delay = 0,
}: CinematicTextAnimatorProps) {
  const containerRef = useRef<HTMLHeadingElement | HTMLParagraphElement | HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const chars = el.querySelectorAll(".char-depth");
    if (!chars.length) return;

    gsap.fromTo(
      chars,
      {
        opacity: 0,
        z: -60,
        rotateY: 25,
        scale: 0.85,
      },
      {
        opacity: 1,
        z: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.025,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [delay, text]);

  const words = text.split(" ");

  return (
    <Component
      ref={containerRef as any}
      className={`preserve-3d inline-block ${className}`}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-block">
        {words.map((word, wIdx) => (
          <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.3em]">
            {word.split("").map((char, cIdx) => (
              <span
                key={cIdx}
                className="char-depth inline-block will-change-transform"
                style={{ transformStyle: "preserve-3d" }}
              >
                {char}
              </span>
            ))}
          </span>
        ))}
      </span>
    </Component>
  );
}
