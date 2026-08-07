"use client";

import { useEffect, useRef } from "react";
import { useWebglEngine } from "@/providers/webgl-engine-provider";
import { useFocusMode } from "@/providers/focus-mode-provider";
import { useLenis } from "@/providers/lenis-provider";
import { HOME_SCROLL_Z_MIN, HOME_SCROLL_Z_MAX } from "@/lib/world-config";

export default function ScrollWorldSync() {
  const { setScrollTargetZ, targetZ } = useWebglEngine();
  const { activeFocusKey } = useFocusMode();
  const lenis = useLenis();
  const currentVirtualZ = useRef<number>(HOME_SCROLL_Z_MIN);
  const touchStartY = useRef<number | null>(null);

  // Sync virtual Z with external targetZ updates
  useEffect(() => {
    currentVirtualZ.current = targetZ;
  }, [targetZ]);

  // Pause Lenis when Focus Mode is open
  useEffect(() => {
    if (!lenis) return;
    if (activeFocusKey !== null) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [activeFocusKey, lenis]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (activeFocusKey !== null) return;

    const updateZ = (deltaZ: number) => {
      const nextZ = Math.max(HOME_SCROLL_Z_MAX, Math.min(HOME_SCROLL_Z_MIN, currentVirtualZ.current + deltaZ));
      currentVirtualZ.current = nextZ;
      setScrollTargetZ(nextZ);
    };

    // Refined 15% lower scroll sensitivity: deltaY * 0.10 allows deliberate section reading before transition
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const deltaZ = -e.deltaY * 0.10;
      updateZ(deltaZ);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartY.current === null || e.touches.length === 0) return;
      const currentY = e.touches[0].clientY;
      const diffY = touchStartY.current - currentY;
      touchStartY.current = currentY;

      const deltaZ = -diffY * 0.34;
      updateZ(deltaZ);
    };

    const handleTouchEnd = () => {
      touchStartY.current = null;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        updateZ(-21);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        updateZ(21);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setScrollTargetZ, activeFocusKey]);

  return null;
}
