"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, Cpu, Calendar, Sparkles, CheckCircle2, User } from "lucide-react";

interface Message {
  sender: "ai" | "user";
  text: string;
  isProposal?: boolean;
}

export default function AiContactCenter() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [step, setStep] = useState(0); // 0: Init, 1: Industry, 2: Budget, 3: Timeline, 4: Email, 5: Complete
  const [userData, setUserData] = useState({
    requirements: "",
    industry: "",
    budget: "",
    timeline: "",
    email: "",
  });
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Initial message
    triggerAiMessage("System online. I am ZIBRIN-AI. Tell me, what ambitious digital product are we engineering today?");
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const triggerAiMessage = (text: string, delay = 800) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: "ai", text }]);
    }, delay);
  };

  const handleSend = (textToSend?: string) => {
    const val = textToSend || inputVal.trim();
    if (!val) return;

    if (!textToSend) setInputVal("");

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: val }]);

    // Progress flow
    if (step === 0) {
      setUserData((prev) => ({ ...prev, requirements: val }));
      setStep(1);
      triggerAiMessage("Acknowledged. Which primary industry sector does this platform serve? (e.g. SaaS, Fintech, Medtech, Startups)");
    } else if (step === 1) {
      setUserData((prev) => ({ ...prev, industry: val }));
      setStep(2);
      triggerAiMessage("Excellent. What is your estimated budget threshold for this implementation? (e.g. ₹2 Lakh, ₹5 Lakh, ₹15 Lakh+)");
    } else if (step === 2) {
      setUserData((prev) => ({ ...prev, budget: val }));
      setStep(3);
      triggerAiMessage("Understood. What is your target timeline for the initial version launch? (e.g. 1 Month, 3 Months, 6 Months)");
    } else if (step === 3) {
      setUserData((prev) => ({ ...prev, timeline: val }));
      setStep(4);
      triggerAiMessage("Understood. Finally, what is your corporate email address so our laboratory can route this proposal?");
    } else if (step === 4) {
      setUserData((prev) => ({ ...prev, email: val }));
      setStep(5);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: "Compiling system parameters... Generating engineering proposal." },
          { sender: "ai", text: "", isProposal: true }
        ]);
      }, 1200);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const quickReplies = [
    ["Build an AI web app", "Telehealth mobile hub", "Custom enterprise ERP"],
    ["SaaS startup", "Fintech platform", "Healthcare MedTech", "E-commerce"],
    ["₹1.5 Lakh - ₹5 Lakh", "₹5 Lakh - ₹15 Lakh", "₹15 Lakh+"],
    ["Immediate (1 Month)", "Standard (3 Months)", "Flexible (6 Months)"]
  ];

  return (
    <div className="w-full glass-panel border-cyan-glow/15 rounded-xl flex flex-col h-[520px] bg-space-black/70 overflow-hidden">
      {/* Console Header */}
      <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-glow animate-ping" />
          <span className="text-[10px] font-mono text-cyan-glow tracking-widest uppercase">
            AI CORE ASSISTANT // ONLINE
          </span>
        </div>
        <span className="text-[9px] font-mono text-neutral-500">
          SYSTEM PRE-PROPOSAL SECURE TUNNEL
        </span>
      </div>

      {/* Messages viewport */}
      <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 font-mono text-xs scroll-smooth">
        {messages.map((msg, idx) => {
          if (msg.isProposal) {
            return (
              <div key={idx} className="glass-panel border-cyan-glow/30 p-5 rounded-lg bg-cyan-glow/5 max-w-md mr-auto shadow-neon-cyan relative overflow-hidden animate-pulse-glow">
                <div className="absolute top-0 right-0 p-3 text-[9px] text-cyan-glow/50">
                  SYS // PROP_GEN
                </div>
                
                <h4 className="text-sm font-orbitron font-bold text-white mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-glow" />
                  <span>Zibrin Proposal Summary</span>
                </h4>

                <div className="space-y-2 mb-4 text-[11px] text-neutral-300">
                  <div>
                    <span className="text-neutral-500 block text-[9px] uppercase tracking-wider">PROJECT GOAL</span>
                    <span className="text-white font-bold">{userData.requirements}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-neutral-500 block text-[9px] uppercase tracking-wider">INDUSTRY</span>
                      <span className="text-white">{userData.industry}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[9px] uppercase tracking-wider">BUDGET TARGET</span>
                      <span className="text-cyan-glow font-bold">{userData.budget}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-neutral-500 block text-[9px] uppercase tracking-wider">TIMELINE</span>
                      <span className="text-white">{userData.timeline}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[9px] uppercase tracking-wider">ROUTING EMAIL</span>
                      <span className="text-white">{userData.email}</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => alert("Connecting with calendar... Booking meeting with engineering team!")}
                  className="w-full py-2 bg-gradient-to-r from-electric-blue to-neon-violet text-white text-xs font-bold rounded border border-cyan-glow/20 flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-95 transition-all duration-300"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>BOOK DISCOVERY MEETING</span>
                </button>
              </div>
            );
          }

          const isAi = msg.sender === "ai";
          return (
            <div
              key={idx}
              className={`flex items-start gap-2.5 max-w-[80%] ${
                isAi ? "mr-auto" : "ml-auto flex-row-reverse"
              }`}
            >
              <div
                className={`p-2 rounded-full border ${
                  isAi
                    ? "bg-cyan-glow/10 border-cyan-glow/30 text-cyan-glow"
                    : "bg-neon-violet/10 border-neon-violet/30 text-neon-violet"
                }`}
              >
                {isAi ? <Cpu className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
              </div>
              <div
                className={`p-3 rounded-lg leading-relaxed ${
                  isAi
                    ? "bg-white/5 border border-white/10 text-neutral-300"
                    : "bg-cyan-glow/10 border border-cyan-glow/20 text-white"
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-cyan-glow">
            <Cpu className="w-3.5 h-3.5 animate-spin" />
            <span className="animate-pulse">ZIBRIN-AI IS COMPILING DATA...</span>
          </div>
        )}
      </div>

      {/* Quick replies suggestions */}
      {step < 4 && !isTyping && quickReplies[step] && (
        <div className="px-4 py-2 border-t border-white/5 bg-space-black/80 flex flex-wrap gap-1.5">
          {quickReplies[step].map((reply, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(reply)}
              className="px-2.5 py-1 bg-white/5 border border-white/10 rounded hover:border-cyan-glow/40 hover:bg-cyan-glow/5 text-[10px] text-neutral-400 hover:text-white transition-all duration-300 interactive"
            >
              {reply}
            </button>
          ))}
        </div>
      )}

      {/* Input panel */}
      <div className="p-4 border-t border-white/5 bg-space-black/90 flex gap-2">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={step === 5 || isTyping}
          placeholder={
            step === 5
              ? "PROPOSAL READY. SYSTEM COMPLETED."
              : "Type your query here or select an option above..."
          }
          className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded font-mono text-xs text-white focus:outline-none focus:border-cyan-glow transition-all duration-300"
        />
        <button
          onClick={() => handleSend()}
          disabled={step === 5 || isTyping}
          className="p-2 bg-gradient-to-r from-electric-blue to-neon-violet rounded border border-cyan-glow/20 hover:scale-105 active:scale-95 text-white transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none interactive cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
