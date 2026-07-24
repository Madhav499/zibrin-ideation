"use client";

import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CinematicSpatialShell from "@/components/cinematic-spatial-shell";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Enterprise Web App",
    budget: "₹2 Lakh - ₹5 Lakh",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValues.name || !formValues.email) return;
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-space-black text-white relative">
      <Navbar />

      <main className="flex-grow relative z-10 overflow-hidden">
        <CinematicSpatialShell
          eyebrow="SYS // INDIA AI COMMAND CENTER"
          title={
            <>
              CONNECT WITH
              <span className="block bg-gradient-to-r from-cyan-glow via-electric-blue to-neon-violet bg-clip-text text-transparent">
                OUR TEAM
              </span>
            </>
          }
          description="Whether you want to build with our AI conversational assistant or speak directly to our engineering leadership in Mumbai, we are ready to respond."
          stats={[
            { label: "HQ", value: "Mumbai" },
            { label: "Response", value: "4 hrs" },
            { label: "Reach", value: "Global" },
          ]}
          cards={[
            {
              title: "Headquarters",
              description: "Bandra-Kurla Complex, Mumbai, Maharashtra 400051, India.",
              accent: "cyan",
            },
            {
              title: "Direct inquiry",
              description: "Open for enterprise builds, AI systems, and immersive product experiences.",
              accent: "blue",
            },
            {
              title: "Corporate details",
              description: "Zibrin Infotech Private Limited · GSTIN 27AAAAA0000A1Z5.",
              accent: "violet",
            },
          ]}
          primaryCta={{ label: "Book A Call", href: "mailto:contact@zibrin.info" }}
          secondaryCta={{ label: "Visit Builder", href: "/builder" }}
        />

        <section className="container mx-auto px-4 py-10 md:px-8 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[1.4rem] border border-cyan-glow/20 bg-space-black/60 p-8">
              <span className="mb-2 block text-[9px] font-mono uppercase tracking-[0.3em] text-cyan-glow">HEADQUARTERS LOCATION</span>
              <h3 className="mb-3 font-orbitron text-xl font-bold uppercase text-white">ZIBRIN INFOTECH INDIA</h3>
              <p className="mb-6 text-sm leading-7 text-neutral-400">Our main technology laboratory operates out of the financial and tech hub of Mumbai, India.</p>
              <div className="space-y-4 border-t border-white/10 pt-6 font-mono text-xs text-neutral-300">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-glow" />
                  <div><strong className="block text-white">Address:</strong><span>Bandra-Kurla Complex (BKC), Mumbai, Maharashtra 400051, India</span></div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-neon-violet" />
                  <div><strong className="block text-white">Phone Lines:</strong><span>+91 98765 43210</span><span className="mt-1 block text-[10px] text-neutral-500">+91 22 6789 0123</span></div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-cyan-glow" />
                  <div><strong className="block text-white">Email Inquiry:</strong><span>contact@zibrin.info</span></div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-yellow-400" />
                  <div><strong className="block text-white">Operating Hours:</strong><span>Mon - Sat // 9:00 AM - 9:00 PM IST (UTC+05:30)</span></div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.4rem] border border-cyan-glow/20 bg-space-black/70 p-8">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="font-orbitron text-xl font-bold uppercase text-white">SEND DIRECT INQUIRY</h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-neutral-400">Fill out your project details for an immediate response from our Mumbai engineering leads.</p>
                </div>
              </div>

              {formSubmitted ? (
                <div className="rounded-[1rem] border border-cyan-glow/30 bg-cyan-glow/10 p-8 text-center">
                  <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-cyan-glow" />
                  <h4 className="mb-3 font-orbitron text-lg font-bold uppercase text-white">Transmission received</h4>
                  <p className="text-sm leading-7 text-neutral-300">Thank you, <strong className="text-cyan-glow">{formValues.name}</strong>. Our senior solution architect will reach out to <strong className="text-white">{formValues.email}</strong> within 4 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[10px] uppercase tracking-[0.3em] text-neutral-400">YOUR NAME *</label>
                      <input type="text" required value={formValues.name} onChange={(e) => setFormValues({ ...formValues, name: e.target.value })} placeholder="e.g. Rahul Sharma" className="w-full rounded border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none transition focus:border-cyan-glow" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[10px] uppercase tracking-[0.3em] text-neutral-400">PHONE NUMBER (+91) *</label>
                      <input type="tel" required value={formValues.phone} onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })} placeholder="+91 98765 43210" className="w-full rounded border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none transition focus:border-cyan-glow" />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[10px] uppercase tracking-[0.3em] text-neutral-400">WORK EMAIL *</label>
                      <input type="email" required value={formValues.email} onChange={(e) => setFormValues({ ...formValues, email: e.target.value })} placeholder="rahul@company.in" className="w-full rounded border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none transition focus:border-cyan-glow" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[10px] uppercase tracking-[0.3em] text-neutral-400">SERVICE REQUIRED</label>
                      <select value={formValues.service} onChange={(e) => setFormValues({ ...formValues, service: e.target.value })} className="w-full rounded border border-white/10 bg-space-black px-4 py-2.5 text-white outline-none transition focus:border-cyan-glow">
                        <option value="Enterprise Web App">Enterprise Web App (Next.js 15)</option>
                        <option value="Cognitive AI System">Cognitive AI Agent Ecosystem</option>
                        <option value="Cross-Platform Mobile Suite">Cross-Platform Mobile Suite (Flutter)</option>
                        <option value="Custom ERP / CRM">Custom ERP / CRM Platform</option>
                        <option value="GEO / AEO Search Strategy">GEO / AEO Search Strategy</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] uppercase tracking-[0.3em] text-neutral-400">ESTIMATED BUDGET RANGE (₹)</label>
                    <select value={formValues.budget} onChange={(e) => setFormValues({ ...formValues, budget: e.target.value })} className="w-full rounded border border-white/10 bg-space-black px-4 py-2.5 text-white outline-none transition focus:border-cyan-glow">
                      <option value="₹1.5 Lakh - ₹5 Lakh">₹1.5 Lakh - ₹5 Lakh</option>
                      <option value="₹5 Lakh - ₹15 Lakh">₹5 Lakh - ₹15 Lakh</option>
                      <option value="₹15 Lakh - ₹50 Lakh">₹15 Lakh - ₹50 Lakh</option>
                      <option value="₹50 Lakh+">₹50 Lakh+</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] uppercase tracking-[0.3em] text-neutral-400">PROJECT REQUIREMENTS & OBJECTIVES</label>
                    <textarea rows={4} value={formValues.message} onChange={(e) => setFormValues({ ...formValues, message: e.target.value })} placeholder="Tell us about your product goals, timeline, and key technical specifications..." className="w-full rounded border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none transition focus:border-cyan-glow" />
                  </div>
                  <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-electric-blue to-neon-violet px-4 py-3 text-[11px] font-mono font-semibold uppercase tracking-[0.3em] text-white">
                    <span>Transmit Project Proposal</span>
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
