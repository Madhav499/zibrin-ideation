"use client";

import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

export default function ZibrinLogo({ className = "", size = 48, animated = true }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${animated ? "animate-logo-breath" : ""}`}
    >
      <defs>
        {/* Glow Gradients */}
        <linearGradient id="electric-blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2F80FF" />
          <stop offset="100%" stopColor="#3EF2FF" />
        </linearGradient>

        <linearGradient id="neon-violet-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8B5CFF" />
          <stop offset="100%" stopColor="#3EF2FF" />
        </linearGradient>

        <linearGradient id="cyan-glow-grad" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#3EF2FF" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#2F80FF" />
        </linearGradient>

        {/* Glow Filters */}
        <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background soft glow ring */}
      <circle
        cx="100"
        cy="100"
        r="80"
        stroke="url(#electric-blue-grad)"
        strokeWidth="0.5"
        strokeDasharray="4 8"
        className="opacity-40 animate-[spin_40s_linear_infinite]"
      />

      {/* Orbiting Satellite Node */}
      <circle
        cx="100"
        cy="20"
        r="3"
        fill="#3EF2FF"
        filter="url(#glow-filter)"
        className="animate-[spin_8s_linear_infinite]"
        style={{ transformOrigin: "100px 100px" }}
      />

      {/* Neural network circuit points connected to logo */}
      <g className="opacity-30">
        <line x1="100" y1="50" x2="135" y2="25" stroke="#3EF2FF" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="135" cy="25" r="2" fill="#3EF2FF" />
        
        <line x1="45" y1="100" x2="20" y2="100" stroke="#8B5CFF" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="20" cy="100" r="2" fill="#8B5CFF" />

        <line x1="155" y1="100" x2="180" y2="100" stroke="#2F80FF" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="180" cy="100" r="2" fill="#2F80FF" />
      </g>

      {/* Outer loop - Right Lobes of Infinity (Möbius Ribbon Part 1) */}
      <path
        d="M 100 100 C 130 65, 175 65, 175 100 C 175 135, 130 135, 100 100"
        stroke="url(#neon-violet-grad)"
        strokeWidth="14"
        strokeLinecap="round"
        filter="url(#glow-filter)"
        className="opacity-95"
      />

      {/* Inner loop - Left Lobes of Infinity (Möbius Ribbon Part 2) */}
      <path
        d="M 100 100 C 70 135, 25 135, 25 100 C 25 65, 70 65, 100 100"
        stroke="url(#electric-blue-grad)"
        strokeWidth="14"
        strokeLinecap="round"
        filter="url(#glow-filter)"
        className="opacity-95"
      />

      {/* The letter Z transition Overlay: Top and Bottom bars forming a sharp cyber Z shape */}
      <path
        d="M 45 70 L 155 70 M 45 130 L 155 130"
        stroke="url(#cyan-glow-grad)"
        strokeWidth="10"
        strokeLinecap="round"
        className="opacity-90"
      />

      {/* Upward Growth Arrow hidden inside the center intersection pointing to Zenith */}
      <path
        d="M 100 65 L 120 85 M 100 65 L 80 85 M 100 65 L 100 115"
        stroke="#FFFFFF"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glow-filter)"
      />
    </svg>

  );
}
