"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useWebglEngine } from "@/providers/webgl-engine-provider";
import { ROUTE_WORLD_MAP } from "@/lib/world-config";

export default function RouteWorldSync() {
  const pathname = usePathname();
  const { setWorld } = useWebglEngine();

  useEffect(() => {
    if (pathname === "/") return;

    const worldKey = ROUTE_WORLD_MAP[pathname];
    if (worldKey) {
      setWorld(worldKey);
    }
  }, [pathname, setWorld]);

  return null;
}
