"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScene } from "@/providers/scene-provider";

export default function LightingSystem() {
  const { targetZ } = useScene();
  const cyanLightRef = useRef<THREE.PointLight>(null);
  const violetLightRef = useRef<THREE.PointLight>(null);
  const currentZRef = useRef(targetZ);

  useFrame((_, delta) => {
    currentZRef.current += (targetZ - currentZRef.current) * (delta * 3.0);

    if (cyanLightRef.current) {
      cyanLightRef.current.position.set(12, 12, currentZRef.current + 10);
    }
    if (violetLightRef.current) {
      violetLightRef.current.position.set(-12, -12, currentZRef.current + 10);
    }
  });

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[10, 20, 15]} intensity={1.2} />
      <pointLight
        ref={cyanLightRef}
        color={0x3ef2ff}
        intensity={5}
        distance={80}
        decay={2}
      />
      <pointLight
        ref={violetLightRef}
        color={0x8b5cff}
        intensity={5}
        distance={80}
        decay={2}
      />
    </>
  );
}
