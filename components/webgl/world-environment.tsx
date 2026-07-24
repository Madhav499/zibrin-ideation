"use client";

import { FogExp2 } from "three";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { Environment, Stars } from "@react-three/drei";
import { useWebglEngine } from "@/providers/webgl-engine-provider";

export default function WorldEnvironment() {
  const { scene } = useThree();
  const { qualityTier } = useWebglEngine();

  useEffect(() => {
    scene.fog = new FogExp2("#05070F", 0.0045);
    return () => {
      scene.fog = null;
    };
  }, [scene]);

  return (
    <>
      <Environment preset="night" environmentIntensity={0.35} />
      {qualityTier !== "low" && (
        <Stars
          radius={300}
          depth={80}
          count={qualityTier === "high" ? 4000 : 2000}
          factor={3}
          saturation={0.2}
          fade
          speed={0.3}
        />
      )}
    </>
  );
}
