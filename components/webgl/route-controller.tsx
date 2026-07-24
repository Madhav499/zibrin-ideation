"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useScene, WorldKey } from "@/providers/scene-provider";

export default function RouteController() {
  const pathname = usePathname();
  const { setWorld } = useScene();

  useEffect(() => {
    let key: WorldKey = "hero";

    if (pathname === "/about") {
      key = "about";
    } else if (pathname === "/services") {
      key = "services";
    } else if (pathname === "/portfolio") {
      key = "portfolio";
    } else if (pathname === "/process") {
      key = "process";
    } else if (pathname === "/contact") {
      key = "contact";
    } else if (pathname === "/builder") {
      key = "builder";
    } else {
      key = "hero";
    }

    setWorld(key);
  }, [pathname, setWorld]);

  return null;
}
