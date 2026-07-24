"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { TransitionLink } from "@/providers/transition-provider";
import ZibrinLogo from "@/features/logo/logo";
import { ArrowUpRight, Menu, X, Sparkles, PhoneCall } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Process", href: "/process" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled || mobileMenuOpen
          ? "bg-space-black/85 border-b border-white/10 py-3 md:py-4 backdrop-blur-lg shadow-2xl"
          : "bg-transparent py-5 md:py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Brand Logo Link */}
        <TransitionLink href="/" className="flex items-center gap-3 group interactive">
          <ZibrinLogo size={36} animated={true} />
          <div className="flex flex-col">
            <span className="font-orbitron tracking-widest text-sm font-bold text-white group-hover:text-cyan-glow transition-colors duration-300">
              ZIBRIN
            </span>
            <span className="text-[8px] font-mono text-cyan-glow/70 tracking-wider">
              INDIA // HQ
            </span>
          </div>
        </TransitionLink>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link, idx) => {
            const isActive = pathname === link.href;
            return (
              <TransitionLink
                key={idx}
                href={link.href}
                className={`text-xs font-mono tracking-widest uppercase relative py-1 transition-all duration-300 interactive group ${
                  isActive ? "text-cyan-glow font-bold" : "text-neutral-400 hover:text-white"
                }`}
              >
                <span>{link.name}</span>
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-cyan-glow transition-all duration-300 ${
                    isActive ? "w-full shadow-neon-cyan" : "w-0 group-hover:w-full"
                  }`}
                />
              </TransitionLink>
            );
          })}
        </nav>

        {/* Right Action buttons & Hamburger toggle */}
        <div className="flex items-center gap-3">
          {/* CTA Product Builder trigger */}
          <TransitionLink
            href="/builder"
            className="px-3.5 py-2 border border-cyan-glow/30 hover:border-cyan-glow bg-cyan-glow/10 hover:bg-cyan-glow/20 rounded text-[10px] font-mono tracking-widest text-cyan-glow hover:text-white transition-all duration-300 flex items-center gap-1.5 interactive cursor-pointer shadow-neon-cyan"
          >
            <Sparkles className="w-3 h-3 text-cyan-glow" />
            <span className="hidden sm:inline">BUILD PROJECT</span>
            <span className="sm:hidden">BUILD</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </TransitionLink>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 border border-white/10 rounded lg:hidden text-neutral-300 hover:text-cyan-glow hover:border-cyan-glow/40 bg-white/5 transition-all cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] h-[calc(100vh-60px)] bg-space-black/95 backdrop-blur-2xl border-t border-white/10 z-40 flex flex-col justify-between p-6 overflow-y-auto">
          <div className="space-y-4 pt-4">
            <div className="text-[10px] font-mono text-cyan-glow uppercase tracking-widest mb-4">
              SYS // COMMAND DIRECTORY
            </div>
            
            {navLinks.map((link, idx) => {
              const isActive = pathname === link.href;
              return (
                <TransitionLink
                  key={idx}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded-lg border text-sm font-orbitron font-bold tracking-wider transition-all duration-300 ${
                    isActive
                      ? "border-cyan-glow bg-cyan-glow/15 text-cyan-glow shadow-neon-cyan"
                      : "border-white/5 bg-white/5 text-white hover:border-white/20 hover:text-cyan-glow"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{link.name}</span>
                    <span className="text-[10px] font-mono text-neutral-500">0{idx + 1}</span>
                  </div>
                </TransitionLink>
              );
            })}
          </div>

          {/* Mobile Drawer Bottom Info */}
          <div className="pt-6 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-cyan-glow" />
                <span>+91 98765 43210</span>
              </span>
              <span className="text-cyan-glow">BKC, MUMBAI</span>
            </div>

            <TransitionLink
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 bg-gradient-to-r from-electric-blue to-neon-violet text-white text-xs font-mono font-bold tracking-widest rounded text-center flex items-center justify-center gap-2 shadow-neon-blue"
            >
              <span>CONNECT WITH INDIA AI LAB</span>
              <ArrowUpRight className="w-4 h-4" />
            </TransitionLink>
          </div>
        </div>
      )}
    </header>
  );
}

