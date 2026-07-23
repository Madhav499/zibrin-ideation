"use client";

import React, { useState, useRef, MouseEvent } from "react";

interface Card3DTiltProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
}

export default function Card3DTilt({
  children,
  className = "",
  glare = true,
}: Card3DTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / rect.width) * 100;
    const yPct = (mouseY / rect.height) * 100;

    // Calculate subtle parallax offsets (-8px to +8px) for inner elements
    const shiftX = ((mouseX - rect.width / 2) / (rect.width / 2)) * 8;
    const shiftY = ((mouseY - rect.height / 2) / (rect.height / 2)) * 8;

    cardRef.current.style.setProperty("--elem-shift-x", `${shiftX}px`);
    cardRef.current.style.setProperty("--elem-shift-y", `${shiftY}px`);

    setGlarePos({ x: xPct, y: yPct, opacity: 0.2 });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.setProperty("--elem-shift-x", `0px`);
      cardRef.current.style.setProperty("--elem-shift-y", `0px`);
    }
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative group ${isHovered ? "inner-3d-active" : ""} ${className}`}
      style={{
        // Outer template container stays 100% stable so user can click, write, & read easily
        transform: "none",
      }}
    >
      {children}

      {/* Specular Glare Reflection on Hover */}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-30 rounded-inherit overflow-hidden"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(62, 242, 255, 0.3) 0%, rgba(139, 92, 255, 0.1) 40%, transparent 70%)`,
            borderRadius: "inherit",
          }}
        />
      )}
    </div>
  );
}
