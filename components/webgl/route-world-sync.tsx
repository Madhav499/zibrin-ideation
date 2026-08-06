"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useWebglEngine } from "@/providers/webgl-engine-provider";
import { ROUTE_WORLD_MAP, WORLD_Z } from "@/lib/world-config";

export default function RouteWorldSync() {
  const pathname = usePathname();
  const { setScrollTargetZ } = useWebglEngine();

  useEffect(() => {
    const worldKey = ROUTE_WORLD_MAP[pathname] || "hero";
    const targetZ = WORLD_Z[worldKey];
    setScrollTargetZ(targetZ);
  }, [pathname, setScrollTargetZ]);

  return null;
}
