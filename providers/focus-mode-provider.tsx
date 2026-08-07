"use client";

import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { WORLD_Z } from "@/lib/world-config";

export type FocusKey = "services" | "blog" | "contact" | "portfolio";

interface FocusModeContextType {
  activeFocusKey: FocusKey | null;
  openFocus: (key: FocusKey) => void;
  closeFocus: () => void;
  launchDirectFocus: (key: FocusKey, routePath: string, targetZ?: number) => void;
  saveScrollPosition: (key: string, top: number) => void;
  getScrollPosition: (key: string) => number;
}

const FocusModeContext = createContext<FocusModeContextType>({
  activeFocusKey: null,
  openFocus: () => {},
  closeFocus: () => {},
  launchDirectFocus: () => {},
  saveScrollPosition: () => {},
  getScrollPosition: () => 0,
});

export const useFocusMode = () => useContext(FocusModeContext);

export default function FocusModeProvider({ children }: { children: React.ReactNode }) {
  const [activeFocusKey, setActiveFocusKey] = useState<FocusKey | null>(null);
  const scrollMemory = useRef<Record<string, number>>({});

  const openFocus = useCallback((key: FocusKey) => {
    setActiveFocusKey(key);
  }, []);

  const closeFocus = useCallback(() => {
    setActiveFocusKey(null);
  }, []);

  const launchDirectFocus = useCallback((key: FocusKey, routePath: string, targetZ?: number) => {
    const z = targetZ ?? (WORLD_Z[key as keyof typeof WORLD_Z] || 0);

    // 1. Silently update browser URL
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", routePath);
      // 2. Instantly snap background WebGL camera behind popup mask (0ms visible scrolling)
      window.dispatchEvent(new CustomEvent("webgl-instant-teleport", { detail: { z } }));
    }

    // 3. Open Focus Mode OS Window Popup immediately
    setActiveFocusKey(key);
  }, []);

  const saveScrollPosition = useCallback((key: string, top: number) => {
    scrollMemory.current[key] = top;
  }, []);

  const getScrollPosition = useCallback((key: string) => {
    return scrollMemory.current[key] || 0;
  }, []);

  return (
    <FocusModeContext.Provider
      value={{
        activeFocusKey,
        openFocus,
        closeFocus,
        launchDirectFocus,
        saveScrollPosition,
        getScrollPosition,
      }}
    >
      {children}
    </FocusModeContext.Provider>
  );
}
