"use client";

import React, { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface CameraRigProps {
  targetZ: number;
}

export default function CameraRig({ targetZ }: CameraRigProps) {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const currentZRef = useRef(15);
  const targetCamZRef = useRef(targetZ + 15);

  useEffect(() => {
    targetCamZRef.current = targetZ + 15;
  }, [targetZ]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;

      // Max 2 degrees rotation tilt (~0.035 rad)
      mouseRef.current.targetX = normX * 0.035;
      mouseRef.current.targetY = -normY * 0.035;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // 1. Mouse Rotation Inertia with smooth damping
    mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

    // 2. Micro Floating & Space Breathing (Sine waves)
    const floatY = Math.sin(time * 1.2) * 0.18;
    const floatX = Math.cos(time * 0.95) * 0.12;

    // 3. Smooth Z Travel interpolation to target world position
    currentZRef.current += (targetCamZRef.current - currentZRef.current) * (delta * 2.8);

    camera.position.x = floatX + mouseRef.current.x * 12;
    camera.position.y = floatY + mouseRef.current.y * 12;
    camera.position.z = currentZRef.current;

    camera.rotation.x = mouseRef.current.y;
    camera.rotation.y = mouseRef.current.x;
  });

  return null;
}
