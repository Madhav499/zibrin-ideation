"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ContactSection from "@/sections/contact";
import Card3DTilt from "@/components/card-3d-tilt";
import { MapPin, Phone, Mail, Clock, Send, Sparkles, CheckCircle2 } from "lucide-react";

const NoomoSpatialPortal = dynamic(() => import("@/components/noomo-spatial-portal"), { ssr: false });

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Enterprise Web App",
    budget: "₹2 Lakh - ₹5 Lakh",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValues.name || !formValues.email) return;
    setFormSubmitted(true);
  };

  const ContactHeader = (
    <section className="container mx-auto px-4 md:px-8 py-16 text-center relative overflow-hidden">
      <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/5 border border-white/10 rounded-full mb-6">
        <Sparkles className="w-3.5 h-3.5 text-cyan-glow" />
        <span className="text-[10px] font-mono text-neutral-300 uppercase tracking-widest">
          SYS // INDIA AI COMMAND CENTER
        </span>
      </div>

      <h1 className="text-4xl md:text-6xl font-syne font-extrabold uppercase text-white mb-6 tracking-tight">
        CONNECT WITH <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-glow via-electric-blue to-neon-violet">OUR TEAM</span>
      </h1>

      <p className="text-base md:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
        Whether you want to build with our AI conversational assistant or speak directly to our engineering leadership in Mumbai.
      </p>
    </section>
  );

  const DirectContactForm = (
    <section className="container mx-auto px-4 md:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 5 Cols: India Office Info */}
        <div className="lg:col-span-5 space-y-6">
          <Card3DTilt intensity={10}>
            <div className="glass-panel border-cyan-glow/20 p-6 md:p-8 rounded-xl bg-space-black/60 space-y-6">
              <div>
                <span className="text-[9px] font-mono text-cyan-glow uppercase tracking-widest block mb-1">
                  HEADQUARTERS LOCATION
                </span>
                <h3 className="text-xl font-orbitron font-bold text-white mb-2">
                  ZIBRIN INFOTECH INDIA
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  Our main technology laboratory operates out of the financial and tech hub of Mumbai, India.
                </p>
              </div>

              <div className="space-y-4 pt-2 border-t border-white/10 font-mono text-xs text-neutral-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-cyan-glow shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Address:</strong>
                    <span>Bandra-Kurla Complex (BKC), Mumbai, Maharashtra 400051, India</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-neon-violet shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Phone Lines:</strong>
                    <span>+91 98765 43210</span>
                    <span className="block text-neutral-500 text-[10px]">+91 22 6789 0123</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-cyan-glow shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Email Inquiry:</strong>
                    <span>contact@zibrin.info</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Operating Hours:</strong>
                    <span>Mon - Sat // 9:00 AM - 9:00 PM IST (UTC+05:30)</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-lg text-[10px] font-mono text-neutral-400">
                <div className="text-cyan-glow font-bold uppercase mb-1">GST & Corporate Details</div>
                <div>Zibrin Infotech Private Limited</div>
                <div>GSTIN: 27AAAAA0000A1Z5</div>
              </div>
            </div>
          </Card3DTilt>
        </div>

        {/* Right 7 Cols: Direct Message Form */}
        <div className="lg:col-span-7">
          <Card3DTilt intensity={8}>
            <div className="glass-panel border-cyan-glow/20 p-6 md:p-8 rounded-xl bg-space-black/70 relative">
              <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-cyan-glow/40">
                FORM // DIRECT_TRANSMISSION
              </div>

              <h3 className="text-xl font-orbitron font-bold text-white mb-2 uppercase">
                SEND DIRECT INQUIRY
              </h3>
              <p className="text-xs text-neutral-400 font-mono mb-6 uppercase tracking-wider">
                Fill out your project details for an immediate response from our Mumbai engineering leads.
              </p>

              {formSubmitted ? (
                <div className="p-8 border border-cyan-glow/40 bg-cyan-glow/10 rounded-lg text-center space-y-4 animate-pulse-glow">
                  <CheckCircle2 className="w-12 h-12 text-cyan-glow mx-auto" />
                  <h4 className="text-lg font-orbitron font-bold text-white">Transmission Received</h4>
                  <p className="text-xs text-neutral-300 max-w-md mx-auto">
                    Thank you, <strong className="text-cyan-glow">{formValues.name}</strong>. Our senior solution architect will reach out to <strong className="text-white">{formValues.email}</strong> within 4 hours.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-xs font-mono text-white transition-all"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-neutral-400 uppercase tracking-widest mb-1.5">
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={formValues.name}
                        onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded text-white focus:outline-none focus:border-cyan-glow transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-neutral-400 uppercase tracking-widest mb-1.5">
                        PHONE NUMBER (+91) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formValues.phone}
                        onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded text-white focus:outline-none focus:border-cyan-glow transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-neutral-400 uppercase tracking-widest mb-1.5">
                        WORK EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        value={formValues.email}
                        onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                        placeholder="rahul@company.in"
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded text-white focus:outline-none focus:border-cyan-glow transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-neutral-400 uppercase tracking-widest mb-1.5">
                        SERVICE REQUIRED
                      </label>
                      <select
                        value={formValues.service}
                        onChange={(e) => setFormValues({ ...formValues, service: e.target.value })}
                        className="w-full px-4 py-2.5 bg-space-black border border-white/10 rounded text-white focus:outline-none focus:border-cyan-glow transition-all"
                      >
                        <option value="Enterprise Web App">Enterprise Web App (Next.js 15)</option>
                        <option value="Cognitive AI System">Cognitive AI Agent Ecosystem</option>
                        <option value="Cross-Platform Mobile Suite">Cross-Platform Mobile Suite (Flutter)</option>
                        <option value="Custom ERP / CRM">Custom ERP / CRM Platform</option>
                        <option value="GEO / AEO Search Strategy">GEO / AEO Search Strategy</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-neutral-400 uppercase tracking-widest mb-1.5">
                      ESTIMATED BUDGET RANGE (₹)
                    </label>
                    <select
                      value={formValues.budget}
                      onChange={(e) => setFormValues({ ...formValues, budget: e.target.value })}
                      className="w-full px-4 py-2.5 bg-space-black border border-white/10 rounded text-white focus:outline-none focus:border-cyan-glow transition-all"
                    >
                      <option value="₹1.5 Lakh - ₹5 Lakh">₹1.5 Lakh - ₹5 Lakh</option>
                      <option value="₹5 Lakh - ₹15 Lakh">₹5 Lakh - ₹15 Lakh</option>
                      <option value="₹15 Lakh - ₹50 Lakh">₹15 Lakh - ₹50 Lakh</option>
                      <option value="₹50 Lakh+">₹50 Lakh+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] text-neutral-400 uppercase tracking-widest mb-1.5">
                      PROJECT REQUIREMENTS & OBJECTIVES
                    </label>
                    <textarea
                      rows={4}
                      value={formValues.message}
                      onChange={(e) => setFormValues({ ...formValues, message: e.target.value })}
                      placeholder="Tell us about your product goals, timeline, and key technical specifications..."
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded text-white focus:outline-none focus:border-cyan-glow transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-electric-blue to-neon-violet text-white text-xs font-mono font-bold tracking-widest rounded border border-cyan-glow/20 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 transition-all shadow-neon-blue cursor-pointer"
                  >
                    <span>TRANSMIT PROJECT PROPOSAL</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </Card3DTilt>
        </div>

      </div>
    </section>
  );

  return (
    <div className="min-h-screen flex flex-col bg-space-black text-white relative">
      <Navbar />

      <main className="flex-grow pt-28 pb-16 relative z-10 overflow-hidden">
        
        {/* PORTAL 1: Contact Header -> Direct Contact Form */}
        <NoomoSpatialPortal
          type="globalNetwork"
          title="SYS // MUMBAI COMMAND HUB"
          subtitle="INDIAN_ENTERPRISE_LAB"
          pageA={ContactHeader}
          pageB={DirectContactForm}
        />

        {/* PORTAL 2: Direct Contact Form -> AI Chat Console */}
        <NoomoSpatialPortal
          type="aiNeural"
          title="SYS // AI CONVERSATIONAL CONSOLE"
          subtitle="AUTOMATED_PROPOSAL"
          pageA={DirectContactForm}
          pageB={<ContactSection />}
        />

      </main>

      <Footer />
    </div>
  );
}
