"use client";

import React, { createContext, useContext, useState, useCallback, useRef } from "react";

export type FocusKey = "services" | "blog" | "contact" | "portfolio";

interface FocusModeContextType {
  activeFocusKey: FocusKey | null;
  openFocus: (key: FocusKey) => void;
  closeFocus: () => void;
  saveScrollPosition: (key: string, top: number) => void;
  getScrollPosition: (key: string) => number;
}

const FocusModeContext = createContext<FocusModeContextType>({
  activeFocusKey: null,
  openFocus: () => {},
  closeFocus: () => {},
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
        saveScrollPosition,
        getScrollPosition,
      }}
    >
      {children}
    </FocusModeContext.Provider>
  );
}
