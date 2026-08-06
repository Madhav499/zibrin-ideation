"use client";

import React from "react";

/**
 * HTML content wrapper — visual transitions are handled entirely by the WebGL camera.
 * No CSS fade/slide/scale transforms.
 */
export default function PageTransitionWrapper({ children }: { children: React.ReactNode }) {
  return <div className="relative z-10 w-full min-h-screen">{children}</div>;
}
