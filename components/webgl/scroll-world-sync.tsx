"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "@/providers/lenis-provider";
import { useWebglEngine } from "@/providers/webgl-engine-provider";
import { HOME_SCROLL_Z_MIN, HOME_SCROLL_Z_MAX } from "@/lib/world-config";

export default function ScrollWorldSync() {
  const pathname = usePathname();
  const lenis = useLenis();
  const { setScrollTargetZ } = useWebglEngine();

  useEffect(() => {
    if (pathname !== "/" || !lenis) return;

    const handleScroll = (e: { scroll: number; limit: number }) => {
      const progress = e.limit > 0 ? Math.min(1, Math.max(0, e.scroll / e.limit)) : 0;
      const z = HOME_SCROLL_Z_MIN + progress * (HOME_SCROLL_Z_MAX - HOME_SCROLL_Z_MIN);
      setScrollTargetZ(z);
    };

    lenis.on("scroll", handleScroll);
    handleScroll({ scroll: lenis.scroll, limit: lenis.limit });

    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, [pathname, lenis, setScrollTargetZ]);

  return null;
}
