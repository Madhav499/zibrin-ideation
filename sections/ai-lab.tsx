"use client";

import React, { useState, useEffect, useRef } from "react";
import { Cpu, MessageSquare, Terminal, Eye, Brain } from "lucide-react";

const TypingHeader = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [start, setStart] = useState(false);
  const elementRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setStart(true);
      }
    }, { threshold: 0.1 });
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!start) return;
    let idx = 0;
    const interval = setInterval(() => {
      if (idx <= text.length) {
        setDisplayedText(text.slice(0, idx));
        idx++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [start, text]);

  return (
    <h2 ref={elementRef} className="text-3xl md:text-5xl font-syne font-extrabold uppercase text-white mb-6 font-mono min-h-[40px] md:min-h-[60px]">
      {displayedText}
      <span className="animate-pulse text-cyan-glow">|</span>
    </h2>
  );
};

export default function AiLaboratory() {
  const [activeTab, setActiveTab] = useState("agent-1");
  const [logs, setLogs] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputTask, setInputTask] = useState("");

  const agents = [
    {
      id: "agent-1",
      name: "RAG COGNITIVE EMBEDDER",
      status: "STABLE",
      latency: "14ms",
      accuracy: "99.2%",
      usage: "LLM knowledge indexing & PDF parsing",
      tech: "OpenAI + Pinecone Vector Store",
    },
    {
      id: "agent-2",
      name: "VOICE DISPATCH PIPELINE",
      status: "ACTIVE",
      latency: "85ms",
      accuracy: "98.5%",
      usage: "Real-time speech-to-text voice agents",
      tech: "Vapi + Deepgram + Python",
    },
    {
      id: "agent-3",
      name: "PREDICTIVE DATA ANALYTICS",
      status: "STANDBY",
      latency: "250ms",
      accuracy: "95.8%",
      usage: "Customer cohort retention tracking",
      tech: "TensorFlow + Node + Python",
    },
  ];

  useEffect(() => {
    // Generate initial live noise-logs
    const initialLogs = [
      "[SYS] AI LAB KERNEL LOADED [0x992FE]",
      "[OK] VECTOR STORE CONNECTED: Pinecone DB",
      "[INFO] COGNITIVE EMBEDDER STANDBY FOR COMMANDS..."
    ];
    setLogs(initialLogs);
  }, []);

  const runSimulation = () => {
    if (!inputTask.trim() || isProcessing) return;

    setIsProcessing(true);
    const newLogs = [
      `[USER] RUN TASK: "${inputTask}"`,
      "[SYS] INITIATING RAG PIPELINE INTERPOLATION...",
      "[INFO] MATCHING TOPICAL SEMANTIC VECTOR EMBEDDINGS...",
      "[SYS] PARSING EXTRACTED TEXT CHUNKS...",
      "[OK] 14 SEMANTIC MATCHES IDENTIFIED IN 12ms",
      "[SYS] SYNTHESIZING AI SUMMARY VIA GPT-4o...",
      "[READY] RESPONSE GENERATION COMPLETE."
    ];

    let logIndex = 0;
    const interval = setInterval(() => {
      if (logIndex < newLogs.length) {
        setLogs((prev) => [...prev, newLogs[logIndex]]);
        logIndex++;
      } else {
        clearInterval(interval);
        setIsProcessing(false);
        setInputTask("");
      }
    }, 450);
  };

  const selectedAgent = agents.find((a) => a.id === activeTab) || agents[0];

  return (
    <section id="ai-laboratory" className="relative py-20 md:py-32 w-full overflow-hidden bg-space-black">
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-glow/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="text-[10px] font-mono text-cyan-glow tracking-widest uppercase block mb-3">
            07 // THE COGNITIVE AI LABORATORY
          </span>
          <TypingHeader text="AI LABORATORY" />
          <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
            Experiment with our live autonomous agent models. Inspect status logs, latency parameters, and run vector simulation pipelines directly from our laboratory telemetry panel.
          </p>
        </div>

        {/* Diagnostic Command Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left panel: Agent Selector */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {agents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => setActiveTab(agent.id)}
                className={`p-5 rounded-lg border text-left transition-all duration-300 relative overflow-hidden ${
                  agent.id === activeTab
                    ? "border-cyan-glow bg-cyan-glow/5 shadow-neon-cyan"
                    : "border-white/5 bg-white/[0.01] hover:border-white/20"
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
                    SYSTEM INSTANCE
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold ${
                      agent.status === "ACTIVE" || agent.status === "STABLE"
                        ? "bg-cyan-glow/20 text-cyan-glow"
                        : "bg-neutral-800 text-neutral-500"
                    }`}
                  >
                    {agent.status}
                  </span>
                </div>
                <h4 className="text-xs font-orbitron font-bold text-white uppercase tracking-wider mb-1">
                  {agent.name}
                </h4>
                <p className="text-[11px] text-neutral-400 font-mono">
                  LAT: {agent.latency} // ACC: {agent.accuracy}
                </p>
              </button>
            ))}
          </div>

          {/* Right panel: Active agent telemetry & simulation */}
          <div className="lg:col-span-8 glass-panel border-cyan-glow/15 p-6 md:p-8 rounded-xl bg-space-black/50 flex flex-col justify-between min-h-[400px]">
            <div>
              <div className="flex justify-between items-start border-b border-white/5 pb-4 mb-6">
                <div>
                  <h3 className="text-sm font-orbitron font-bold text-white uppercase tracking-wide">
                    {selectedAgent.name} TELEMETRY
                  </h3>
                  <p className="text-[10px] text-neutral-500 font-mono mt-0.5">
                    CORE TARGET: {selectedAgent.tech}
                  </p>
                </div>
                <Brain className="w-5 h-5 text-cyan-glow animate-pulse" />
              </div>

              {/* Vector Logs Terminal Screen */}
              <div className="p-4 bg-black/80 rounded border border-white/5 font-mono text-[10px] text-neutral-400 h-[180px] overflow-y-auto space-y-1 mb-6">
                {logs.map((log, idx) => (
                  <div key={idx} className="flex items-start">
                    <span className="text-neutral-600 mr-2">[{new Date().toLocaleTimeString()}]</span>
                    <span className={log.includes("[USER]") ? "text-white" : log.includes("[OK]") ? "text-cyan-glow" : "text-neutral-400"}>
                      {log}
                    </span>
                  </div>
                ))}
                {isProcessing && (
                  <div className="text-cyan-glow animate-pulse flex items-center gap-1.5 mt-2">
                    <Cpu className="w-3 h-3 animate-spin" />
                    <span>SYNAPSES FIRING...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Simulated Query execution */}
            <div className="flex gap-2">
              <input
                type="text"
                value={inputTask}
                onChange={(e) => setInputTask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && runSimulation()}
                disabled={isProcessing}
                placeholder="Submit simulated RAG task (e.g. 'Fetch telemetry summaries')..."
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded font-mono text-xs text-white focus:outline-none focus:border-cyan-glow"
              />
              <button
                onClick={runSimulation}
                disabled={isProcessing}
                className="px-5 py-2 bg-cyan-glow/20 hover:bg-cyan-glow/30 border border-cyan-glow/40 rounded text-cyan-glow text-xs font-mono tracking-widest hover:scale-105 transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none"
              >
                EXECUTE
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
