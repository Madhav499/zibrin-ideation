"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AiContactCenter = dynamic(() => import("@/features/contact/ai-contact"), { ssr: false });

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const chars = document.querySelectorAll(".contact-char");
      gsap.fromTo(
        chars,
        { opacity: 0, scale: 0.1, y: () => Math.random() * 30 - 15, x: () => Math.random() * 30 - 15, filter: "blur(8px)" },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          x: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.04,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const titleText = "START YOUR JOURNEY";

  return (
    <section ref={containerRef} id="contact" className="relative py-20 md:py-32 w-full overflow-hidden bg-space-black">
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-neon-violet/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="text-[10px] font-mono text-cyan-glow tracking-widest uppercase block mb-3">
            09 // THE AI CONTACT CONSOLE
          </span>
          <h2 ref={titleRef} className="text-3xl md:text-5xl font-syne font-extrabold uppercase text-white mb-6 tracking-wide select-none">
            {titleText.split("").map((char, idx) => (
              <span key={idx} className="contact-char inline-block origin-center">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>
          <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
            We don't use standard boring web forms. Introduce your concept to our AI laboratory engine, specify your scope parameters, and watch the system compile an engineering proposal.
          </p>
        </div>

        {/* Conversational chatbot widget */}
        <div className="max-w-3xl mx-auto">
          <AiContactCenter />
        </div>
      </div>
    </section>
  );
}
