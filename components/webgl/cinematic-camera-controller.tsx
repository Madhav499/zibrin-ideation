"use client";

import React, { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useWebglEngine } from "@/providers/webgl-engine-provider";
import { useTransition } from "@/providers/transition-provider";
import { CAMERA_OFFSET } from "@/lib/world-config";

export default function CinematicCameraController() {
  const { camera } = useThree();
  const { targetZ, setCameraZ } = useWebglEngine();
  const { transitionStage, transitionProgress } = useTransition();

  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const velocityRef = useRef({ z: 0, x: 0, y: 0 });
  const currentZRef = useRef(CAMERA_OFFSET);
  const currentXRef = useRef(0);
  const currentYRef = useRef(0);
  const currentRotXRef = useRef(0);
  const currentRotYRef = useRef(0);
  const targetZRef = useRef(targetZ);

  useEffect(() => {
    targetZRef.current = targetZ;
  }, [targetZ]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseRef.current.targetX = normX * 0.04;
      mouseRef.current.targetY = -normY * 0.04;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const touch = e.touches[0];
      const normX = (touch.clientX / window.innerWidth - 0.5) * 2;
      const normY = (touch.clientY / window.innerHeight - 0.5) * 2;
      mouseRef.current.targetX = normX * 0.025;
      mouseRef.current.targetY = -normY * 0.025;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const dt = Math.min(delta, 0.05);

    // Smooth cursor parallax
    mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
    mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

    // Micro floating drift
    const floatY = Math.sin(time * 1.1) * 0.35;
    const floatX = Math.cos(time * 0.85) * 0.22;

    // Base camera target Z (world focal plane + offset)
    let desiredZ = targetZRef.current + CAMERA_OFFSET;

    // Transition cinematic pullback / push-in
    if (transitionStage === "exiting") {
      const p = transitionProgress;
      desiredZ += p * 45;
    } else if (transitionStage === "entering") {
      const p = 1 - transitionProgress;
      desiredZ += p * 60;
    }

    // Spring-damped Z travel with acceleration/deceleration
    const zDiff = desiredZ - currentZRef.current;
    velocityRef.current.z += zDiff * 8 * dt;
    velocityRef.current.z *= Math.pow(0.82, dt * 60);
    currentZRef.current += velocityRef.current.z * dt;

    // Pan targets
    const panX = floatX + mouseRef.current.x * 14;
    const panY = floatY + mouseRef.current.y * 10;

    currentXRef.current += (panX - currentXRef.current) * 0.08;
    currentYRef.current += (panY - currentYRef.current) * 0.08;

    // Transition rotation
    let targetRotX = mouseRef.current.y;
    let targetRotY = mouseRef.current.x;

    if (transitionStage === "exiting") {
      const p = transitionProgress;
      targetRotX += p * 0.12;
      targetRotY -= p * 0.18;
    } else if (transitionStage === "entering") {
      const p = 1 - transitionProgress;
      targetRotX += p * 0.08;
      targetRotY += p * 0.12;
    }

    currentRotXRef.current += (targetRotX - currentRotXRef.current) * 0.07;
    currentRotYRef.current += (targetRotY - currentRotYRef.current) * 0.07;

    camera.position.set(currentXRef.current, currentYRef.current, currentZRef.current);
    camera.rotation.set(currentRotXRef.current, currentRotYRef.current, 0);

    setCameraZ(currentZRef.current);
  });

  return null;
}
