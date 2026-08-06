"use client";

import React, { useEffect, useRef, useState } from "react";

interface TechNode {
  name: string;
  angle: number;
  speed: number;
  orbitRadius: number;
  size: number;
  color: string;
  details: string;
}

export default function TechCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<TechNode | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });
  const nodes = useRef<TechNode[]>([]);
  const tooltipPos = useRef({ x: 0, y: 0 });
  const renderState = useRef({ isOffscreen: false, isTabVisible: true });

  const techList = [
    { name: "React", r: 85, color: "#61DAFB", desc: "Interactive dynamic SPA layout frontends." },
    { name: "Next.js", r: 120, color: "#FFFFFF", desc: "Enterprise SSR component engines." },
    { name: "Laravel", r: 155, color: "#FF2D20", desc: "Robust database MVC backend layers." },
    { name: "Flutter", r: 85, color: "#02569B", desc: "Cross-platform native mobile solutions." },
    { name: "Node.js", r: 120, color: "#339933", desc: "High-throughput asynchronous API servers." },
    { name: "Python", r: 155, color: "#3776AB", desc: "Generative LLMs, data models, and scripts." },
    { name: "Docker", r: 190, color: "#2496ED", desc: "Containerized reproducible sandbox servers." },
    { name: "AWS", r: 190, color: "#FF9900", desc: "Auto-scaling serverless cloud architectures." },
    { name: "Firebase", r: 85, color: "#FFCA28", desc: "Real-time state and database hubs." },
    { name: "MongoDB", r: 120, color: "#47A248", desc: "Scalable document storage caching." },
    { name: "Postgres", r: 155, color: "#4169E1", desc: "Relational structured database." }
  ];

  useEffect(() => {
    const handleViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleViewport();
    window.addEventListener("resize", handleViewport);
    return () => window.removeEventListener("resize", handleViewport);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const init = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = 420;

      const cpuCores = typeof navigator !== "undefined" ? navigator.hardwareConcurrency || 4 : 4;

      nodes.current = techList.map((t, idx) => ({
        name: t.name,
        angle: (idx * (Math.PI * 2)) / techList.length,
        speed: prefersReducedMotion 
          ? 0 
          : (0.001 + (idx % 3) * 0.0004) * (cpuCores <= 4 ? 0.7 : 1),
        orbitRadius: t.r,
        size: 5,
        color: t.color,
        details: t.desc
      }));
    };

    init();
    window.addEventListener("resize", init);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      mouse.current.targetX = mx;
      mouse.current.targetY = my;
      mouse.current.active = true;

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      let found: TechNode | null = null;
      nodes.current.forEach((n) => {
        const nx = cx + Math.cos(n.angle) * n.orbitRadius;
        const ny = cy + Math.sin(n.angle) * n.orbitRadius;
        const dx = mx - nx;
        const dy = my - ny;
        if (Math.sqrt(dx * dx + dy * dy) < n.size + 15) {
          found = n;
        }
      });
      setHoveredNode(found);
      tooltipPos.current = { x: mx, y: my };
    };

    const handleMouseLeave = () => {
      mouse.current.active = false;
      setHoveredNode(null);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Visibility API
    const handleVisibility = () => {
      renderState.current.isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Culling Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        renderState.current.isOffscreen = !entry.isIntersecting;
      });
    });
    observer.observe(canvas);

    const render = () => {
      if (renderState.current.isOffscreen || !renderState.current.isTabVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.fillStyle = "#05070F";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw faint tracks
      ctx.strokeStyle = "rgba(47, 128, 255, 0.03)";
      ctx.lineWidth = 1;
      [85, 120, 155, 190].forEach((r) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Draw Core
      const nucleusGradient = ctx.createRadialGradient(cx, cy, 2, cx, cy, 35);
      nucleusGradient.addColorStop(0, "#FFFFFF");
      nucleusGradient.addColorStop(0.3, "#3EF2FF");
      nucleusGradient.addColorStop(0.8, "rgba(139, 92, 255, 0.15)");
      nucleusGradient.addColorStop(1, "transparent");
      ctx.fillStyle = nucleusGradient;
      ctx.beginPath();
      ctx.arc(cx, cy, 35, 0, Math.PI * 2);
      ctx.fill();

      // Nodes
      nodes.current.forEach((n) => {
        n.angle += n.speed;

        const nx = cx + Math.cos(n.angle) * n.orbitRadius;
        const ny = cy + Math.sin(n.angle) * n.orbitRadius;

        const isCurrent = hoveredNode?.name === n.name;

        // Neural links
        nodes.current.forEach((other) => {
          if (other.name === n.name) return;
          const ox = cx + Math.cos(other.angle) * other.orbitRadius;
          const oy = cy + Math.sin(other.angle) * other.orbitRadius;

          const dx = nx - ox;
          const dy = ny - oy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.strokeStyle = `rgba(62, 242, 255, ${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(nx, ny);
            ctx.lineTo(ox, oy);
            ctx.stroke();
          }
        });

        // Connection line
        ctx.strokeStyle = isCurrent ? "rgba(139, 92, 255, 0.25)" : "rgba(255, 255, 255, 0.02)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        ctx.shadowBlur = isCurrent ? 20 : 6;
        ctx.shadowColor = n.color;
        ctx.fillStyle = n.color;

        ctx.beginPath();
        ctx.arc(nx, ny, isCurrent ? 8 : n.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = isCurrent ? "#FFFFFF" : "rgba(255, 255, 255, 0.55)";
        ctx.font = isCurrent ? "bold 10px var(--font-orbitron)" : "9px var(--font-inter)";
        ctx.textAlign = "center";
        ctx.fillText(n.name, nx, ny - 10);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", init);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hoveredNode, isMobile]);

  // Mobile Grid display fallback to optimize framerate metrics
  if (isMobile) {
    return (
      <div className="grid grid-cols-2 gap-4 w-full">
        {techList.map((tech, idx) => (
          <div
            key={idx}
            className="p-4 border border-white/5 bg-space-black/50 rounded-lg flex flex-col justify-center"
          >
            <h4
              className="text-xs font-orbitron font-bold uppercase tracking-wider mb-1"
              style={{ color: tech.color }}
            >
              {tech.name}
            </h4>
            <p className="text-[10px] text-neutral-400 leading-normal">
              {tech.desc}
            </p>
          </div>
        ))}
      </div>
    );
  }

  // Desktop canvas layout
  return (
    <div className="w-full relative h-[420px] bg-space-black/75 rounded-xl border border-white/5 overflow-hidden glass-panel">
      <canvas ref={canvasRef} className="block w-full h-full" />

      {hoveredNode ? (
        <div
          className="absolute z-30 p-4 rounded bg-space-black/95 border border-cyan-glow/20 pointer-events-none max-w-[200px]"
          style={{
            left: `${Math.min(tooltipPos.current.x + 15, nodes.current.length > 0 ? nodes.current[nodes.current.length - 1].orbitRadius + 180 : 0)}px`,
            top: `${Math.min(tooltipPos.current.y + 15, 330)}px`
          }}
        >
          <p className="text-[10px] font-mono text-cyan-glow uppercase tracking-wider mb-1">
            {hoveredNode.name} SPEC
          </p>
          <p className="text-xs text-neutral-400 leading-normal">
            {hoveredNode.details}
          </p>
        </div>
      ) : (
        <div className="absolute top-4 left-4 p-3 bg-white/5 border border-white/10 rounded font-mono text-[9px] text-neutral-400 pointer-events-none">
          SYSTEM // HOVER NODES TO SPECIFY CAPABILITIES
        </div>
      )}
    </div>
  );
}
