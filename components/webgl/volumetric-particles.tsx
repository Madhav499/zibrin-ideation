"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useWebglEngine } from "@/providers/webgl-engine-provider";

export default function VolumetricParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const { qualityTier, cameraZ } = useWebglEngine();

  const count = useMemo(() => {
    if (qualityTier === "high") return 600;
    if (qualityTier === "medium") return 300;
    return 150;
  }, [qualityTier]);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan = new THREE.Color(0x3ef2ff);
    const violet = new THREE.Color(0x8b5cff);

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      pos[idx] = (Math.random() - 0.5) * 60;
      pos[idx + 1] = (Math.random() - 0.5) * 40;
      pos[idx + 2] = Math.random() * 700 - 680;

      const mix = Math.random();
      const c = cyan.clone().lerp(violet, mix);
      col[idx] = c.r;
      col[idx + 1] = c.g;
      col[idx + 2] = c.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.02;
    pointsRef.current.position.z = cameraZ - 30;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={qualityTier === "high" ? 0.14 : 0.1}
        vertexColors
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
