"use client";

import React, { useEffect, useRef } from "react";

interface Section3DDividerProps {
  label?: string;
  sublabel?: string;
}

export default function Section3DDivider({ label = "SYS // LEVEL TRANSITION", sublabel = "0x3F_DEPTH_NODE" }: Section3DDividerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = 120;
    };
    resize();
    window.addEventListener("resize", resize);

    const nodes: Array<{ x: number; y: number; z: number; speed: number }> = [];
    for (let i = 0; i < 40; i++) {
      nodes.push({
        x: (Math.random() - 0.5) * canvas.width * 1.5,
        y: (Math.random() - 0.5) * 60,
        z: Math.random() * 400 + 50,
        speed: 0.5 + Math.random() * 1.2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      angle += 0.015;

      // Draw center 3D wireframe ring projection
      const numSegments = 24;
      const radius = 38;
      ctx.lineWidth = 1;

      ctx.beginPath();
      for (let i = 0; i <= numSegments; i++) {
        const theta = (i / numSegments) * Math.PI * 2 + angle;
        const x3d = Math.cos(theta) * radius;
        const z3d = Math.sin(theta) * radius;

        // Perspective projection
        const scale = 300 / (300 + z3d);
        const px = cx + x3d * scale;
        const py = cy + (Math.sin(angle * 0.7) * 10) * scale;

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = "rgba(62, 242, 255, 0.4)";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#3EF2FF";
      ctx.stroke();

      // Inner counter-rotating ring
      ctx.beginPath();
      for (let i = 0; i <= numSegments; i++) {
        const theta = (i / numSegments) * Math.PI * 2 - angle * 1.3;
        const x3d = Math.cos(theta) * (radius * 0.65);
        const z3d = Math.sin(theta) * (radius * 0.65);

        const scale = 300 / (300 + z3d);
        const px = cx + x3d * scale;
        const py = cy + (Math.cos(angle * 0.7) * 6) * scale;

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = "rgba(139, 92, 255, 0.6)";
      ctx.shadowColor = "#8B5CFF";
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw connecting laser beam line extending left and right
      const grad = ctx.createLinearGradient(0, cy, canvas.width, cy);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(0.3, "rgba(62, 242, 255, 0.1)");
      grad.addColorStop(0.5, "rgba(62, 242, 255, 0.7)");
      grad.addColorStop(0.7, "rgba(139, 92, 255, 0.1)");
      grad.addColorStop(1, "transparent");

      ctx.strokeStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(canvas.width, cy);
      ctx.stroke();

      // Floating spatial nodes
      nodes.forEach((n) => {
        n.z -= n.speed;
        if (n.z < 10) n.z = 450;

        const scale = 250 / n.z;
        const px = cx + n.x * scale;
        const py = cy + n.y * scale;

        const alpha = Math.min(1, (450 - n.z) / 250) * 0.6;
        ctx.fillStyle = n.z % 2 === 0 ? `rgba(62, 242, 255, ${alpha})` : `rgba(139, 92, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, Math.max(1, 2.5 * scale), 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative w-full h-24 my-6 overflow-hidden flex items-center justify-center pointer-events-none select-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 px-4 py-1 bg-space-black/80 border border-cyan-glow/20 rounded-full backdrop-blur-md flex items-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow animate-ping" />
        <span className="text-[9px] font-mono text-neutral-300 tracking-widest uppercase">
          {label}
        </span>
        <span className="text-[8px] font-mono text-cyan-glow/60 border-l border-white/10 pl-2">
          {sublabel}
        </span>
      </div>
    </div>
  );
}
