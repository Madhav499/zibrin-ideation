"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Globe, Layers, MessageSquare, Search } from "lucide-react";

interface Node {
  id: string;
  name: string;
  x: number;
  y: number;
  r: number;
  color: string;
  glowColor: string;
  info: string;
}

export default function SeoCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeNode, setActiveNode] = useState<Node | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const nodesRef = useRef<Node[]>([]);
  const hoverPos = useRef({ x: 0, y: 0 });
  const renderState = useRef({ isOffscreen: false, isTabVisible: true });

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
    let pulses: Array<{
      from: string;
      to: string;
      progress: number;
      speed: number;
      size: number;
      color: string;
    }> = [];

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const initNodes = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = 400;

      const w = canvas.width;
      const h = canvas.height;

      nodesRef.current = [
        {
          id: "web",
          name: "ZIBRIN CORE SITE",
          x: w * 0.12,
          y: h * 0.5,
          r: 22,
          color: "#3EF2FF",
          glowColor: "rgba(62, 242, 255, 0.4)",
          info: "Technical SEO structure built with schema mapping & entity graphs."
        },
        {
          id: "google",
          name: "GOOGLE SGE",
          x: w * 0.35,
          y: h * 0.25,
          r: 16,
          color: "#2F80FF",
          glowColor: "rgba(47, 128, 255, 0.4)",
          info: "Crawl-ready semantic structure optimized for Google AI Overviews."
        },
        {
          id: "chatgpt",
          name: "CHATGPT / SEARCHGPT",
          x: w * 0.35,
          y: h * 0.5,
          r: 16,
          color: "#10A37F",
          glowColor: "rgba(16, 163, 127, 0.4)",
          info: "Optimized for GPT crawlers and natural language citation blocks."
        },
        {
          id: "gemini",
          name: "GEMINI SEARCH",
          x: w * 0.35,
          y: h * 0.75,
          r: 16,
          color: "#8B5CFF",
          glowColor: "rgba(139, 92, 255, 0.4)",
          info: "High semantic mapping. Directly queries schemas & official data graphs."
        },
        {
          id: "perplexity",
          name: "PERPLEXITY AI",
          x: w * 0.58,
          y: h * 0.38,
          r: 16,
          color: "#22C55E",
          glowColor: "rgba(34, 197, 94, 0.4)",
          info: "GEO Answer structures targeting factual citations & web references."
        },
        {
          id: "users",
          name: "TARGET USER",
          x: w * 0.58,
          y: h * 0.62,
          r: 18,
          color: "#EAB308",
          glowColor: "rgba(234, 179, 8, 0.4)",
          info: "Highly qualified organic visitors querying details for conversions."
        },
        {
          id: "conversions",
          name: "CONVERSION HUBS",
          x: w * 0.86,
          y: h * 0.5,
          r: 24,
          color: "#FFFFFF",
          glowColor: "rgba(255, 255, 255, 0.4)",
          info: "Booking consultations, proposal generations, and sign-ups."
        }
      ];

      // Reset pulses (set speed to 0 if reduced motion)
      const baseSpeed = prefersReducedMotion ? 0 : 0.005;
      pulses = [
        { from: "web", to: "google", progress: 0, speed: baseSpeed * 1.2, size: 3, color: "#3EF2FF" },
        { from: "web", to: "chatgpt", progress: 0.3, speed: baseSpeed * 1.6, size: 3, color: "#3EF2FF" },
        { from: "web", to: "gemini", progress: 0.6, speed: baseSpeed * 1.0, size: 3, color: "#3EF2FF" },
        { from: "google", to: "perplexity", progress: 0.1, speed: baseSpeed * 1.4, size: 3.5, color: "#2F80FF" },
        { from: "chatgpt", to: "perplexity", progress: 0.4, speed: baseSpeed * 1.8, size: 3.5, color: "#10A37F" },
        { from: "perplexity", to: "users", progress: 0.2, speed: baseSpeed * 1.2, size: 4, color: "#22C55E" },
        { from: "gemini", to: "users", progress: 0.5, speed: baseSpeed * 1.4, size: 4, color: "#8B5CFF" },
        { from: "users", to: "conversions", progress: 0, speed: baseSpeed * 1.6, size: 5, color: "#EAB308" }
      ];
    };

    initNodes();
    window.addEventListener("resize", initNodes);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let found: Node | null = null;
      nodesRef.current.forEach((n) => {
        const dx = mouseX - n.x;
        const dy = mouseY - n.y;
        if (Math.sqrt(dx * dx + dy * dy) < n.r + 10) {
          found = n;
        }
      });
      setActiveNode(found);
      hoverPos.current = { x: mouseX, y: mouseY };
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    // Visibility observer
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

      // Grid background
      ctx.strokeStyle = "rgba(47, 128, 255, 0.03)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Connection paths
      pulses.forEach((p) => {
        const fromNode = nodesRef.current.find((n) => n.id === p.from);
        const toNode = nodesRef.current.find((n) => n.id === p.to);
        if (!fromNode || !toNode) return;

        ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();

        p.progress += p.speed;
        if (p.progress >= 1) {
          p.progress = 0;
        }

        const px = fromNode.x + (toNode.x - fromNode.x) * p.progress;
        const py = fromNode.y + (toNode.y - fromNode.y) * p.progress;

        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Nodes
      nodesRef.current.forEach((n) => {
        const isHovered = activeNode?.id === n.id;

        ctx.shadowBlur = isHovered ? 20 : 6;
        ctx.shadowColor = n.glowColor;

        ctx.strokeStyle = n.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = isHovered ? n.color : "rgba(8, 12, 28, 0.9)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r - 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;

        ctx.fillStyle = isHovered ? "#3EF2FF" : "#8B9BB4";
        ctx.font = "bold 9px var(--font-orbitron)";
        ctx.textAlign = "center";
        ctx.fillText(n.name, n.x, n.y + n.r + 14);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", initNodes);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [activeNode, isMobile]);

  // Mobile fallback - responsive SVG diagram with CSS animation
  if (isMobile) {
    return (
      <div className="flex flex-col gap-6 w-full p-5 glass-panel border-white/5 rounded-xl bg-space-black/50">
        <div className="flex items-center gap-3 border-b border-white/5 pb-3">
          <Globe className="w-5 h-5 text-cyan-glow animate-pulse" />
          <h4 className="text-xs font-orbitron font-bold text-white uppercase tracking-wider">
            Zibrin SEO pipeline
          </h4>
        </div>
        
        {/* Simple vertical visual timeline representing flow */}
        <div className="relative pl-6 space-y-6">
          {/* Connector bar */}
          <div className="absolute left-[9px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-cyan-glow via-neon-violet to-white" />
          
          <div className="relative flex gap-3">
            <div className="w-5 h-5 rounded-full border border-cyan-glow bg-space-black flex items-center justify-center text-[9px] text-cyan-glow font-mono z-10">1</div>
            <div>
              <h5 className="text-[11px] font-orbitron font-bold text-white uppercase">ZIBRIN SEO MATRIX</h5>
              <p className="text-[10px] text-neutral-400">JSON-LD knowledge schemas feed entity nodes.</p>
            </div>
          </div>
          <div className="relative flex gap-3">
            <div className="w-5 h-5 rounded-full border border-electric-blue bg-space-black flex items-center justify-center text-[9px] text-electric-blue font-mono z-10">2</div>
            <div>
              <h5 className="text-[11px] font-orbitron font-bold text-white uppercase">AI SEARCH AGENTS</h5>
              <p className="text-[10px] text-neutral-400">ChatGPT, Perplexity, Gemini cite structured facts.</p>
            </div>
          </div>
          <div className="relative flex gap-3">
            <div className="w-5 h-5 rounded-full border border-gold-accent bg-space-black flex items-center justify-center text-[9px] text-gold-accent font-mono z-10">3</div>
            <div>
              <h5 className="text-[11px] font-orbitron font-bold text-white uppercase">CONVERSION METRICS</h5>
              <p className="text-[10px] text-neutral-400">Target traffic is mapped contextually directly to qualified pipeline leads.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop canvas layout
  return (
    <div className="w-full relative h-[400px] border border-white/5 bg-space-black/80 rounded-xl overflow-hidden glass-panel">
      <canvas ref={canvasRef} className="block w-full h-full cursor-crosshair" />

      {activeNode ? (
        <div 
          className="absolute z-30 p-4 rounded bg-space-black/95 border border-cyan-glow/20 max-w-[240px] pointer-events-none transition-all duration-200"
          style={{
            left: `${Math.min(hoverPos.current.x + 15, nodesRef.current.length > 0 ? nodesRef.current[nodesRef.current.length - 1].x - 120 : 0)}px`,
            top: `${Math.min(hoverPos.current.y + 15, 300)}px`
          }}
        >
          <p className="text-[10px] font-mono text-cyan-glow uppercase tracking-wider mb-1">
            {activeNode.name}
          </p>
          <p className="text-xs text-neutral-400 leading-normal">
            {activeNode.info}
          </p>
        </div>
      ) : (
        <div className="absolute top-4 left-4 p-3 bg-white/5 border border-white/10 rounded font-mono text-[9px] text-neutral-400 pointer-events-none">
          INFO // HOVER NODES TO DISCOVER SEMANTIC LAYER DETAILS
        </div>
      )}
    </div>
  );
}
