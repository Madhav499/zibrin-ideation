"use client";

import React, { useState } from "react";
import { Sparkles, Phone, Mail, MapPin, User, Globe, Send, MessageSquare, CheckCircle2, Clock } from "lucide-react";
import CinematicDigitalEarth from "@/components/webgl/cinematic-digital-earth";

export default function ContactFocusView() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    phone: "",
    email: "",
    cityCountry: "",
    serviceOfInterest: "",
    timePeriod: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-space-black via-space-black to-space-black border border-cyan-glow/30 backdrop-blur-xl relative overflow-hidden">
        <h2 className="text-xl md:text-3xl font-bold font-syne text-white mb-1">
          Let's Build Something <span className="bg-gradient-to-r from-cyan-glow via-electric-blue to-neon-violet bg-clip-text text-transparent">Extraordinary Together</span>
        </h2>
        <p className="text-xs text-slate-300 font-light max-w-3xl">
          Share your vision with us, and our team will connect with you within 24 hours to discuss the best way forward.
        </p>
      </div>

      {/* Two-Column Unclipped Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Full 8-Field Enquiry Form */}
        <div className="lg:col-span-7 p-5 rounded-xl bg-space-black/80 border border-cyan-glow/30 backdrop-blur-xl">
          <h3 className="text-base font-bold font-syne text-white mb-3">Send Us an Enquiry</h3>

          {submitted ? (
            <div className="p-6 rounded-xl bg-cyan-glow/10 border border-cyan-glow/30 text-center flex flex-col items-center gap-2">
              <CheckCircle2 className="w-10 h-10 text-cyan-glow animate-bounce" />
              <h4 className="text-base font-bold text-white font-syne">Enquiry Received!</h4>
              <p className="text-xs text-slate-300">
                Thank you for connecting with Zibrin Infotech. Our team will review your project brief and reach out within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 px-5 py-2 rounded-lg bg-cyan-glow/20 border border-cyan-glow/40 text-cyan-glow text-xs font-mono font-semibold"
              >
                Send Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-mono focus:border-cyan-glow focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-mono focus:border-cyan-glow focus:outline-none transition-colors"
                    placeholder="Acme Corp"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 mb-1">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-mono focus:border-cyan-glow focus:outline-none transition-colors"
                    placeholder="+91 7573892447"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-mono focus:border-cyan-glow focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 mb-1">City / Country *</label>
                  <input
                    type="text"
                    required
                    value={formData.cityCountry}
                    onChange={(e) => setFormData({ ...formData, cityCountry: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-mono focus:border-cyan-glow focus:outline-none transition-colors"
                    placeholder="Rajkot, India"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 mb-1">Product / Service of Interest</label>
                  <input
                    type="text"
                    value={formData.serviceOfInterest}
                    onChange={(e) => setFormData({ ...formData, serviceOfInterest: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-mono focus:border-cyan-glow focus:outline-none transition-colors"
                    placeholder="Website Dev / AI Chatbot"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-300 mb-1">Time Period</label>
                <input
                  type="text"
                  value={formData.timePeriod}
                  onChange={(e) => setFormData({ ...formData, timePeriod: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-mono focus:border-cyan-glow focus:outline-none transition-colors"
                  placeholder="Immediate / 1 Month"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-300 mb-1">Your Message / Brief *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-mono focus:border-cyan-glow focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your project vision..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-glow to-electric-blue text-space-black font-semibold text-xs font-mono tracking-widest uppercase shadow-[0_0_25px_rgba(62,242,255,0.3)] hover:shadow-[0_0_35px_rgba(62,242,255,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Send Enquiry</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Contact Details, WhatsApp, Map, Hours */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-xl bg-space-black/80 border border-white/10 backdrop-blur-xl">
            <h3 className="text-base font-bold font-syne text-white mb-3">Contact Information</h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-cyan-glow/10 border border-cyan-glow/30 text-cyan-glow shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400">Phone / WhatsApp</div>
                  <a href="tel:+917573892447" className="text-xs font-semibold font-mono text-white hover:text-cyan-glow transition-colors">
                    +91 7573892447
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-electric-blue/10 border border-electric-blue/30 text-electric-blue shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400">Email</div>
                  <a href="mailto:zibrininfotech@gmail.com" className="text-xs font-semibold font-mono text-white hover:text-cyan-glow transition-colors">
                    zibrininfotech@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-neon-violet/10 border border-neon-violet/30 text-neon-violet shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400">Address</div>
                  <div className="text-xs font-semibold font-mono text-white">Rajkot , Gujarat , India</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-gold-accent/10 border border-gold-accent/30 text-gold-accent shrink-0">
                  <User className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400">Contact Person</div>
                  <div className="text-xs font-semibold font-mono text-white">Hevin Savaliya</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-cyan-glow/10 border border-cyan-glow/30 text-cyan-glow shrink-0">
                  <Globe className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400">Website</div>
                  <a href="https://www.zibrininfotech.com" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold font-mono text-white hover:text-cyan-glow transition-colors">
                    www.zibrininfotech.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Chat Box */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/70 to-space-black border border-emerald-500/30 backdrop-blur-xl">
            <h4 className="text-xs font-bold font-syne text-white mb-1">Prefer to Chat on WhatsApp?</h4>
            <p className="text-[11px] text-slate-300 mb-2 font-light">
              Start an instant conversation directly with our engineering experts.
            </p>
            <a
              href="https://wa.me/917573892447"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-space-black font-semibold text-xs font-mono transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:scale-105"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat on WhatsApp (+91 7573892447)</span>
            </a>
          </div>

          {/* Business Hours & Map */}
          <div className="p-3.5 rounded-xl bg-space-black/80 border border-white/10 backdrop-blur-xl text-center space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-cyan-glow">
              <Clock className="w-3.5 h-3.5" />
              <span>Business Hours: Mon - Sat (9:00 AM - 7:00 PM IST)</span>
            </div>
            {/* Real-Time 3D Digital Earth Headquarters Visualizer */}
            <CinematicDigitalEarth />
          </div>
        </div>
      </div>
    </div>
  );
}
