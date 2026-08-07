"use client";

import React, { useEffect, useRef } from "react";
import { X, Sparkles } from "lucide-react";
import { useFocusMode, FocusKey } from "@/providers/focus-mode-provider";

import ServicesFocusView from "./services-focus-view";
import BlogFocusView from "./blog-focus-view";
import ContactFocusView from "./contact-focus-view";
import PortfolioFocusView from "./portfolio-focus-view";

const FOCUS_TITLES: Record<FocusKey, { title: string; badge: string }> = {
  services: { title: "Services & Capabilities Matrix", badge: "FOCUS MODE // SERVICES" },
  blog: { title: "Insights & Engineering Journal", badge: "FOCUS MODE // BLOG" },
  contact: { title: "Instant Contact Console", badge: "FOCUS MODE // CONTACT" },
  portfolio: { title: "Portfolio Showcase", badge: "FOCUS MODE // PORTFOLIO" },
};

export default function FocusModeOverlay() {
  const { activeFocusKey, closeFocus, saveScrollPosition, getScrollPosition } = useFocusMode();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const previousFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!activeFocusKey) return;

    if (document.activeElement instanceof HTMLElement) {
      previousFocusedElement.current = document.activeElement;
    }

    if (containerRef.current) {
      containerRef.current.focus();
    }

    const savedTop = getScrollPosition(activeFocusKey);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = savedTop;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeFocus();
        return;
      }

      const scrollEl = scrollContainerRef.current;
      if (!scrollEl) return;

      const scrollAmount = 80;
      const pageAmount = scrollEl.clientHeight * 0.85;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          scrollEl.scrollBy({ top: scrollAmount, behavior: "smooth" });
          break;
        case "ArrowUp":
          e.preventDefault();
          scrollEl.scrollBy({ top: -scrollAmount, behavior: "smooth" });
          break;
        case "PageDown":
          e.preventDefault();
          scrollEl.scrollBy({ top: pageAmount, behavior: "smooth" });
          break;
        case "PageUp":
          e.preventDefault();
          scrollEl.scrollBy({ top: -pageAmount, behavior: "smooth" });
          break;
        case " ":
          e.preventDefault();
          if (e.shiftKey) {
            scrollEl.scrollBy({ top: -pageAmount, behavior: "smooth" });
          } else {
            scrollEl.scrollBy({ top: pageAmount, behavior: "smooth" });
          }
          break;
        case "Home":
          e.preventDefault();
          scrollEl.scrollTo({ top: 0, behavior: "smooth" });
          break;
        case "End":
          e.preventDefault();
          scrollEl.scrollTo({ top: scrollEl.scrollHeight, behavior: "smooth" });
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (previousFocusedElement.current) {
        previousFocusedElement.current.focus();
      }
    };
  }, [activeFocusKey, closeFocus, getScrollPosition]);

  const handleScroll = () => {
    if (activeFocusKey && scrollContainerRef.current) {
      saveScrollPosition(activeFocusKey, scrollContainerRef.current.scrollTop);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
  };

  if (!activeFocusKey) return null;

  const metadata = FOCUS_TITLES[activeFocusKey];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 lg:p-6 bg-[#05070F]/95 transition-opacity duration-300 animate-in fade-in"
      onWheel={handleWheel}
    >
      <div
        className="absolute inset-0 bg-[#05070F]/40 pointer-events-auto cursor-pointer"
        onClick={closeFocus}
        aria-hidden="true"
      />

      <div
        ref={containerRef}
        tabIndex={-1}
        className="relative z-10 w-full sm:w-[94vw] md:w-[90vw] lg:w-[88vw] max-w-[1700px] h-full sm:h-[94vh] md:h-[92vh] max-h-[96vh] bg-[#080C1B] border border-cyan-glow/30 sm:rounded-3xl shadow-[0_0_90px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden outline-none animate-in zoom-in-95 duration-300 transform-gpu-3d"
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-[#05070F] shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-glow/10 border border-cyan-glow/30 text-cyan-glow">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-cyan-glow uppercase font-bold block">
                {metadata.badge}
              </span>
              <h2 className="text-sm sm:text-base font-bold font-syne text-white">
                {metadata.title}
              </h2>
            </div>
          </div>

          <button
            onClick={closeFocus}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-glow/40 text-slate-300 hover:text-white transition-all duration-150 text-xs font-mono cursor-pointer active:scale-95"
            aria-label="Close Focus Mode (ESC)"
          >
            <span>CLOSE</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-cyan-glow hidden sm:inline">ESC</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 focus-scrollbar overscroll-contain"
        >
          {activeFocusKey === "services" && <ServicesFocusView />}
          {activeFocusKey === "blog" && <BlogFocusView />}
          {activeFocusKey === "contact" && <ContactFocusView />}
          {activeFocusKey === "portfolio" && <PortfolioFocusView />}
        </div>
      </div>
    </div>
  );
}
