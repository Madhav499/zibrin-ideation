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

    // If Focus Mode is open, DO NOT attach any global wheel or touch listeners to window!
    if (activeFocusKey !== null) return;

    // Helper to clamp Z between 0 (Hero) and -360 (Contact)
    const updateZ = (deltaZ: number) => {
      const nextZ = Math.max(HOME_SCROLL_Z_MAX, Math.min(HOME_SCROLL_Z_MIN, currentVirtualZ.current + deltaZ));
      currentVirtualZ.current = nextZ;
      setScrollTargetZ(nextZ);
    };

    // Wheel event listener for direct 3D Z-axis camera movement
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const deltaZ = -e.deltaY * 0.12;
      updateZ(deltaZ);
    };

    // Touch events for mobile spatial navigation
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

      const deltaZ = -diffY * 0.4;
      updateZ(deltaZ);
    };

    const handleTouchEnd = () => {
      touchStartY.current = null;
    };

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        updateZ(-25);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        updateZ(25);
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
