"use client";

import React, { useState, useCallback } from "react";
import { MessageSquare, X, Phone, Mail, Send, CheckCircle2, Sparkles, MessageCircle } from "lucide-react";

export default function PersistentContactDrawer() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneOrEmail: "",
    message: "",
  });

  const toggleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={toggleOpen}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-glow via-electric-blue to-neon-violet text-space-black font-semibold text-xs shadow-[0_0_30px_rgba(62,242,255,0.5)] hover:shadow-[0_0_45px_rgba(62,242,255,0.8)] transition-all duration-150 ease-out hover:scale-105 active:scale-95 cursor-pointer transform-gpu-3d"
          aria-label="Toggle Contact Us Panel"
        >
          {open ? (
            <X className="w-4 h-4 text-space-black" />
          ) : (
            <MessageSquare className="w-4 h-4 text-space-black animate-pulse" />
          )}
          <span className="font-mono tracking-wider font-bold uppercase">
            {open ? "Close" : "Contact Us"}
          </span>
          {!open && (
            <span className="w-2 h-2 rounded-full bg-space-black animate-ping" />
          )}
        </button>
      </div>

      {/* Expandable Slide-Over Drawer */}
      {open && (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#080C1B] border-l border-cyan-glow/30 p-6 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300 transform-gpu-3d">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-glow" />
                <h3 className="text-lg font-bold font-syne text-white">Instant Contact Console</h3>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-150 cursor-pointer active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3 mb-6">
              <a
                href="https://wa.me/917573892447"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 flex items-center justify-between transition-all duration-150 active:scale-95"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                  <div className="text-left">
                    <div className="text-xs font-mono font-bold">Chat on WhatsApp</div>
                    <div className="text-[11px] text-emerald-300/80">+91 7573892447</div>
                  </div>
                </div>
                <span className="text-xs font-mono">Chat Now →</span>
              </a>

              <a
                href="tel:+917573892447"
                className="w-full p-3 rounded-xl bg-cyan-glow/10 border border-cyan-glow/30 text-cyan-glow hover:bg-cyan-glow/20 flex items-center justify-between transition-all duration-150 active:scale-95"
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-cyan-glow" />
                  <div className="text-left">
                    <div className="text-xs font-mono font-bold">Call Direct</div>
                    <div className="text-[11px] text-cyan-300/80">+91 7573892447</div>
                  </div>
                </div>
                <span className="text-xs font-mono">Call →</span>
              </a>
            </div>

            {/* Quick Enquiry Form */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h4 className="text-sm font-bold font-syne text-white mb-3">Send a Quick Message</h4>

              {submitted ? (
                <div className="p-4 rounded-lg bg-cyan-glow/10 border border-cyan-glow/30 text-center flex flex-col items-center gap-2">
                  <CheckCircle2 className="w-8 h-8 text-cyan-glow" />
                  <div className="text-xs font-bold text-white">Message Sent!</div>
                  <p className="text-[11px] text-slate-300">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-space-black border border-white/10 text-white text-xs focus:border-cyan-glow focus:outline-none transition-colors duration-150"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Phone or Email"
                      value={formData.phoneOrEmail}
                      onChange={(e) => setFormData({ ...formData, phoneOrEmail: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-space-black border border-white/10 text-white text-xs focus:border-cyan-glow focus:outline-none transition-colors duration-150"
                    />
                  </div>
                  <div>
                    <textarea
                      required
                      rows={3}
                      placeholder="Your Brief / Requirement"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-space-black border border-white/10 text-white text-xs focus:border-cyan-glow focus:outline-none resize-none transition-colors duration-150"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-glow to-electric-blue text-space-black font-semibold text-xs shadow-[0_0_15px_rgba(62,242,255,0.3)] hover:scale-[1.02] active:scale-95 transition-all duration-150 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Drawer Footer Info */}
          <div className="pt-4 border-t border-white/10 text-center space-y-1">
            <div className="text-[11px] font-mono text-slate-400">
              <Mail className="w-3 h-3 inline mr-1 text-cyan-glow" />
              zibrininfotech@gmail.com
            </div>
            <div className="text-[10px] font-mono text-slate-500">
              Rajkot , Gujarat , India // Hevin Savaliya
            </div>
          </div>
        </div>
      )}
    </>
  );
}
