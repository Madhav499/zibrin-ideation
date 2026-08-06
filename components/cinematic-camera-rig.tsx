"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTransition } from "@/providers/transition-provider";

export default function CinematicCameraRig() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isTransitioning, transitionStage, transitionProgress } = useTransition();

  const transitionRef = useRef({ isTransitioning, transitionStage, transitionProgress });

  useEffect(() => {
    transitionRef.current = { isTransitioning, transitionStage, transitionProgress };
  }, [isTransitioning, transitionStage, transitionProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Dynamic Lighting Engine
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const cyanPointLight = new THREE.PointLight(0x3ef2ff, 4, 60);
    cyanPointLight.position.set(12, 12, 12);
    scene.add(cyanPointLight);

    const violetPointLight = new THREE.PointLight(0x8b5cff, 4, 60);
    violetPointLight.position.set(-12, -12, 12);
    scene.add(violetPointLight);

    // 3. Ambient 3D Space Particle Field (Foreground, Midground, Background)
    const particleCount = window.innerWidth < 768 ? 70 : 160;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const speedArray = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      posArray[idx] = (Math.random() - 0.5) * 40;
      posArray[idx + 1] = (Math.random() - 0.5) * 40;
      posArray[idx + 2] = (Math.random() - 0.5) * 50 - 10;
      speedArray[i] = 0.02 + Math.random() * 0.05;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      color: 0x3ef2ff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 4. Mouse Rotation Inertia & Parallax (Max 2° tilt)
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const maxDegreeInRad = (2 * Math.PI) / 180; // 2 degrees max tilt

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;

      targetRotY = normX * maxDegreeInRad;
      targetRotX = -normY * maxDegreeInRad;
      mouseX = normX;
      mouseY = normY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 5. Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // 6. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();
      const { isTransitioning, transitionStage, transitionProgress } = transitionRef.current;

      // Mouse Inertia & Smooth Deceleration
      currentRotX += (targetRotX - currentRotX) * 0.05;
      currentRotY += (targetRotY - currentRotY) * 0.05;

      // Micro Floating & Space Breathing (Sine wave)
      const floatY = Math.sin(time * 1.2) * 0.15;
      const floatX = Math.cos(time * 0.9) * 0.1;

      // Camera base coordinates
      let camZ = 15;
      let camY = floatY;
      let camX = floatX + mouseX * 0.5;

      // 7. Dynamic Lighting & Camera Flight during Page Transitions
      if (isTransitioning) {
        if (transitionStage === "exiting") {
          // Camera moves forward into 3D space, lights dim slightly
          camZ = 15 - transitionProgress * 12;
          ambientLight.intensity = 0.8 - transitionProgress * 0.4;
          cyanPointLight.intensity = 4 - transitionProgress * 2;
        } else if (transitionStage === "entering") {
          // Camera flies back out from distance, lights gradually illuminate
          camZ = 3 + (1 - transitionProgress) * 12;
          ambientLight.intensity = 0.4 + (1 - transitionProgress) * 0.4;
          cyanPointLight.intensity = 2 + (1 - transitionProgress) * 2;
        }
      } else {
        ambientLight.intensity = 0.8;
        cyanPointLight.intensity = 4;
      }

      camera.position.x = camX;
      camera.position.y = camY;
      camera.position.z = camZ;
      camera.rotation.x = currentRotX;
      camera.rotation.y = currentRotY;

      // Particle space flight speed acceleration during transition
      const positions = particleGeo.attributes.position.array as Float32Array;
      const speedMultiplier = isTransitioning ? 3.5 : 1.0;

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3 + 2;
        positions[idx] += speedArray[i] * speedMultiplier;
        if (positions[idx] > 20) {
          positions[idx] = -30;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      particles.rotation.y = time * 0.05;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
}
