"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const lastMouse = useRef({ x: 0, y: 0 });
  const cursorState = useRef({
    radius: 8,
    targetRadius: 8,
    color: "#3EF2FF",
    glow: 15,
    type: "default" as "default" | "hover" | "text",
  });
  const particles = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    alpha: number;
    size: number;
    color: string;
  }>>([]);
  const trail = useRef<Array<{ x: number; y: number }>>([]);
  const isHovered = useRef(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Detect reduced motion settings
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

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.targetX = e.clientX;
      mouse.current.targetY = e.clientY;
    };

    const handleMouseDown = () => {
      cursorState.current.targetRadius = 4;
      if (mediaQuery.matches) return; // Skip particles for reduced motion

      // Spawn explosion particles on click
      const colors = ["#2F80FF", "#8B5CFF", "#3EF2FF", "#FFFFFF"];
      for (let i = 0; i < 15; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 3.5;
        particles.current.push({
          x: mouse.current.x,
          y: mouse.current.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          size: 1.5 + Math.random() * 2.5,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const handleMouseUp = () => {
      if (cursorState.current.type === "hover") {
        cursorState.current.targetRadius = 24;
      } else if (cursorState.current.type === "text") {
        cursorState.current.targetRadius = 12;
      } else {
        cursorState.current.targetRadius = 8;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Event delegation for context-aware states
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isText = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.closest("[contenteditable]");
      const isInteractive = target.closest("a") || target.closest("button") || target.closest("[data-cursor='magnetic']") || target.closest(".interactive");

      if (isText) {
        cursorState.current.type = "text";
        cursorState.current.targetRadius = 12;
        cursorState.current.color = "#3EF2FF";
        cursorState.current.glow = 8;
      } else if (isInteractive) {
        isHovered.current = true;
        cursorState.current.type = "hover";
        cursorState.current.targetRadius = 24;
        cursorState.current.color = "#8B5CFF"; // Purple for AI/Hover
        cursorState.current.glow = 25;
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isText = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.closest("[contenteditable]");
      const isInteractive = target.closest("a") || target.closest("button") || target.closest("[data-cursor='magnetic']") || target.closest(".interactive");

      if (isText || isInteractive) {
        isHovered.current = false;
        cursorState.current.type = "default";
        cursorState.current.targetRadius = 8;
        cursorState.current.color = "#3EF2FF"; // Cyan for default
        cursorState.current.glow = 15;
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Save previous position for velocity calculations
      lastMouse.current.x = mouse.current.x;
      lastMouse.current.y = mouse.current.y;

      // Lerp mouse coordinates for smooth latency inertia
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.16;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.16;

      // Velocity vectors
      const dx = mouse.current.x - lastMouse.current.x;
      const dy = mouse.current.y - lastMouse.current.y;
      const velocity = Math.sqrt(dx * dx + dy * dy);

      // Lerp target cursor radius
      cursorState.current.radius += (cursorState.current.targetRadius - cursorState.current.radius) * 0.2;

      // Render custom neural trails (only if user prefers motion)
      if (!mediaQuery.matches) {
        trail.current.push({ x: mouse.current.x, y: mouse.current.y });
        if (trail.current.length > 18) {
          trail.current.shift();
        }

        if (trail.current.length > 1) {
          ctx.beginPath();
          ctx.moveTo(trail.current[0].x, trail.current[0].y);
          for (let i = 1; i < trail.current.length; i++) {
            const xc = (trail.current[i].x + trail.current[i - 1].x) / 2;
            const yc = (trail.current[i].y + trail.current[i - 1].y) / 2;
            ctx.quadraticCurveTo(trail.current[i - 1].x, trail.current[i - 1].y, xc, yc);
          }
          ctx.strokeStyle = "rgba(62, 242, 255, 0.1)";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Draw dynamic clicking burst particles
        particles.current.forEach((p, idx) => {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.025;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fill();
          ctx.globalAlpha = 1.0;

          if (p.alpha <= 0) {
            particles.current.splice(idx, 1);
          }
        });
      }

      // Draw custom context shape using canvas transformations
      ctx.save();
      ctx.translate(mouse.current.x, mouse.current.y);

      if (cursorState.current.type === "text") {
        // Text insert indicator (glowing vertical bar)
        ctx.shadowBlur = cursorState.current.glow;
        ctx.shadowColor = cursorState.current.color;
        ctx.strokeStyle = cursorState.current.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, -7);
        ctx.lineTo(0, 7);
        ctx.stroke();
      } else {
        // Scale / Stretch based on speed velocity vectors (bypass if reduced motion active)
        if (!mediaQuery.matches && velocity > 0.5 && cursorState.current.type === "default") {
          const angle = Math.atan2(dy, dx);
          ctx.rotate(angle);
          const stretchFactor = Math.min(velocity * 0.045, 1.0);
          ctx.scale(1 + stretchFactor, 1 / (1 + stretchFactor * 0.5));
        }

        // Outer glow loop
        ctx.beginPath();
        if (cursorState.current.type === "hover") {
          // Hollow ring for buttons
          ctx.arc(0, 0, cursorState.current.radius, 0, Math.PI * 2);
          ctx.strokeStyle = cursorState.current.color;
          ctx.lineWidth = 1.5;
          ctx.shadowBlur = cursorState.current.glow;
          ctx.shadowColor = cursorState.current.color;
          ctx.stroke();
        } else {
          // Solid dot for default
          ctx.arc(0, 0, cursorState.current.radius, 0, Math.PI * 2);
          ctx.fillStyle = cursorState.current.color;
          ctx.shadowBlur = cursorState.current.glow;
          ctx.shadowColor = cursorState.current.color;
          ctx.fill();
        }
      }

      ctx.restore();

      // Reset central dot inside the magnetic ring for visual precision
      if (cursorState.current.type === "hover") {
        ctx.beginPath();
        ctx.arc(mouse.current.x, mouse.current.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      mediaQuery.removeEventListener("change", handleQueryChange);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[99999] hidden md:block"
      />
      {/* HTML CSS Fallback for absolute progressive enhancement in case JS fails */}
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
