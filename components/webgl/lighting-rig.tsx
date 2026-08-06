"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useWebglEngine } from "@/providers/webgl-engine-provider";
import { useTransition } from "@/providers/transition-provider";
import { BRAND_COLORS } from "@/lib/world-config";

export default function LightingRig() {
  const { targetZ, cameraZ } = useWebglEngine();
  const { transitionStage, transitionProgress } = useTransition();

  const cyanLightRef = useRef<THREE.PointLight>(null);
  const violetLightRef = useRef<THREE.PointLight>(null);
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const currentZRef = useRef(targetZ);

  useFrame((state, delta) => {
    currentZRef.current += (targetZ - currentZRef.current) * (delta * 3.2);
    const time = state.clock.getElapsedTime();
    const focalZ = currentZRef.current;

    if (cyanLightRef.current) {
      cyanLightRef.current.position.set(
        16 + Math.sin(time * 0.7) * 2,
        12 + Math.cos(time * 0.5) * 1.5,
        focalZ + 14
      );
    }
    if (violetLightRef.current) {
      violetLightRef.current.position.set(
        -14 + Math.cos(time * 0.6) * 2,
        -10 + Math.sin(time * 0.8) * 1.5,
        focalZ + 10
      );
    }
    if (keyLightRef.current) {
      keyLightRef.current.position.set(10, 24, cameraZ - 8);
      keyLightRef.current.target.position.set(0, 0, focalZ);
      keyLightRef.current.target.updateMatrixWorld();
    }

    // Dim lights during transition exit
    if (transitionStage === "exiting" && cyanLightRef.current && violetLightRef.current) {
      const dim = 1 - transitionProgress * 0.45;
      cyanLightRef.current.intensity = 6 * dim;
      violetLightRef.current.intensity = 5.5 * dim;
    } else if (cyanLightRef.current && violetLightRef.current) {
      cyanLightRef.current.intensity = 6;
      violetLightRef.current.intensity = 5.5;
    }
  });

  return (
    <>
      <ambientLight intensity={0.35} color={BRAND_COLORS.spaceBlack} />
      <hemisphereLight args={["#1a2844", "#05070F", 0.6]} />
      <directionalLight
        ref={keyLightRef}
        intensity={1.4}
        color={BRAND_COLORS.electricBlue}
        castShadow={false}
      />
      <pointLight
        ref={cyanLightRef}
        color={BRAND_COLORS.cyanGlow}
        intensity={6}
        distance={120}
        decay={2}
      />
      <pointLight
        ref={violetLightRef}
        color={BRAND_COLORS.neonViolet}
        intensity={5.5}
        distance={120}
        decay={2}
      />
    </>
  );
}
