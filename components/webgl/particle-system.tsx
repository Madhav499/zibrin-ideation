"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleSystemProps {
  qualityTier: "high" | "medium" | "low";
}

export default function ParticleSystem({ qualityTier }: ParticleSystemProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const count = useMemo(() => {
    if (qualityTier === "high") return 350;
    if (qualityTier === "medium") return 180;
    return 90;
  }, [qualityTier]);

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      pos[idx] = (Math.random() - 0.5) * 45;
      pos[idx + 1] = (Math.random() - 0.5) * 45;
      pos[idx + 2] = Math.random() * 40 - 380; // Span Z = +20 to Z = -380
      spd[i] = 0.02 + Math.random() * 0.04;
    }

    return [pos, spd];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color={0x3ef2ff}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
