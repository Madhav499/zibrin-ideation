"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { tickEngine } from "@/lib/tick-engine";
import { safeDisposeObject } from "@/lib/three-dispose";

export type ITModelType =
  | "aiNeural"
  | "cloudServer"
  | "codeMatrix"
  | "dataMonolith"
  | "cyberShield"
  | "globalNetwork"
  | "techPrism";

interface NoomoSpatialPortalProps {
  type: ITModelType;
  title: string;
  subtitle: string;
  pageA?: React.ReactNode;
  pageB?: React.ReactNode;
}

export default function NoomoSpatialPortal({
  type = "aiNeural",
  title = "3D SPATIAL PORTAL",
  subtitle = "EMERGING FROM DEEP SPACE",
  pageA,
  pageB,
}: NoomoSpatialPortalProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const renderState = useRef({ isOffscreen: false });
  const instanceIdRef = useRef(`noomo-${Math.random()}`);

  useEffect(() => {
    const container = containerRef.current;
    const canvasContainer = canvasRef.current;
    if (!container || !canvasContainer) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scene = new THREE.Scene();
    const width = window.innerWidth;
    const height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 16;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    canvasContainer.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x3ef2ff, 6, 80);
    pointLight1.position.set(15, 15, 15);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b5cff, 6, 80);
    pointLight2.position.set(-15, -15, 15);
    scene.add(pointLight2);

    const portalGroup = new THREE.Group();
    scene.add(portalGroup);

    let mainMesh: THREE.Object3D;

    switch (type) {
      case "aiNeural": {
        const group = new THREE.Group();
        const sphereGeo = new THREE.IcosahedronGeometry(3.6, 2);
        const sphereMat = new THREE.MeshStandardMaterial({
          color: 0x3ef2ff,
          emissive: 0x082535,
          wireframe: true,
          transparent: true,
          opacity: 0.9,
        });
        const sphere = new THREE.Mesh(sphereGeo, sphereMat);
        group.add(sphere);

        const innerCore = new THREE.Mesh(
          new THREE.IcosahedronGeometry(2.0, 1),
          new THREE.MeshStandardMaterial({ color: 0x8b5cff, metalness: 0.9, roughness: 0.1 })
        );
        group.add(innerCore);
        mainMesh = group;
        break;
      }
      case "cloudServer": {
        const group = new THREE.Group();
        for (let i = 0; i < 4; i++) {
          const disk = new THREE.Mesh(
            new THREE.CylinderGeometry(3.4, 3.4, 0.45, 32),
            new THREE.MeshStandardMaterial({ color: 0x05070f, emissive: 0x0a1c38, roughness: 0.1, metalness: 0.9 })
          );
          disk.position.y = (i - 1.5) * 1.1;
          group.add(disk);

          const ring = new THREE.Mesh(
            new THREE.TorusGeometry(3.45, 0.08, 16, 32),
            new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0x3ef2ff : 0x8b5cff })
          );
          ring.rotation.x = Math.PI / 2;
          ring.position.y = (i - 1.5) * 1.1;
          group.add(ring);
        }
        mainMesh = group;
        break;
      }
      case "codeMatrix": {
        const group = new THREE.Group();
        const cubeGeo = new THREE.BoxGeometry(4.2, 4.2, 4.2);
        const cubeMat = new THREE.MeshStandardMaterial({
          color: 0x05070f,
          emissive: 0x0a1428,
          roughness: 0.1,
          metalness: 0.9,
        });
        const cube = new THREE.Mesh(cubeGeo, cubeMat);
        group.add(cube);

        const wireMat = new THREE.MeshBasicMaterial({ color: 0x3ef2ff, wireframe: true });
        const wire = new THREE.Mesh(cubeGeo, wireMat);
        wire.scale.set(1.06, 1.06, 1.06);
        group.add(wire);
        mainMesh = group;
        break;
      }
      case "dataMonolith": {
        const group = new THREE.Group();
        const cylGeo = new THREE.CylinderGeometry(3.2, 3.2, 5.2, 32, 4, true);
        const cylMat = new THREE.MeshStandardMaterial({
          color: 0x8b5cff,
          wireframe: true,
          transparent: true,
          opacity: 0.8,
        });
        const cyl = new THREE.Mesh(cylGeo, cylMat);
        group.add(cyl);

        const core = new THREE.Mesh(
          new THREE.CylinderGeometry(2.3, 2.3, 5.0, 32),
          new THREE.MeshStandardMaterial({ color: 0x3ef2ff, metalness: 0.9, roughness: 0.1 })
        );
        group.add(core);
        mainMesh = group;
        break;
      }
      case "cyberShield": {
        const group = new THREE.Group();
        const outerRing = new THREE.Mesh(
          new THREE.TorusGeometry(4.0, 0.45, 16, 40),
          new THREE.MeshStandardMaterial({ color: 0x3ef2ff, metalness: 0.9 })
        );
        group.add(outerRing);

        const innerLock = new THREE.Mesh(
          new THREE.OctahedronGeometry(2.4, 0),
          new THREE.MeshStandardMaterial({ color: 0x8b5cff, metalness: 0.9, roughness: 0.1 })
        );
        group.add(innerLock);
        mainMesh = group;
        break;
      }
      case "globalNetwork": {
        const group = new THREE.Group();
        const sphereGeo = new THREE.SphereGeometry(3.8, 24, 24);
        const sphereMat = new THREE.MeshStandardMaterial({
          color: 0x05070f,
          emissive: 0x0c1a35,
          roughness: 0.2,
          metalness: 0.8,
        });
        const globe = new THREE.Mesh(sphereGeo, sphereMat);
        group.add(globe);

        const wireMat = new THREE.MeshBasicMaterial({ color: 0x3ef2ff, wireframe: true, transparent: true, opacity: 0.6 });
        const wire = new THREE.Mesh(sphereGeo, wireMat);
        wire.scale.set(1.04, 1.04, 1.04);
        group.add(wire);
        mainMesh = group;
        break;
      }
      case "techPrism":
      default: {
        const group = new THREE.Group();
        const prismGeo = new THREE.DodecahedronGeometry(3.8, 0);
        const prismMat = new THREE.MeshStandardMaterial({
          color: 0x3ef2ff,
          emissive: 0x082535,
          roughness: 0.1,
          metalness: 0.9,
        });
        const prism = new THREE.Mesh(prismGeo, prismMat);
        group.add(prism);

        const wireMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.5 });
        const wire = new THREE.Mesh(prismGeo, wireMat);
        wire.scale.set(1.05, 1.05, 1.05);
        group.add(wire);
        mainMesh = group;
        break;
      }
    }

    portalGroup.add(mainMesh);

    const particlesGeo = new THREE.BufferGeometry();
    const particleCount = 70;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 30;
    }
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.1,
      color: 0x3ef2ff,
      transparent: true,
      opacity: 0.7,
    });
    const particleField = new THREE.Points(particlesGeo, particleMat);
    scene.add(particleField);

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let currentProgress = 0;
    const handleScroll = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const active = rect.top < windowHeight * 1.5 && rect.bottom > -windowHeight * 0.5;
      setIsActive(active);

      const totalDist = rect.height - windowHeight;
      if (totalDist <= 0) return;

      const p = Math.max(0, Math.min(1, -rect.top / totalDist));
      currentProgress = p;
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        renderState.current.isOffscreen = !entry.isIntersecting;
      });
    });
    observer.observe(container);

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    const render = (deltaTime: number, elapsedTime: number) => {
      if (renderState.current.isOffscreen) return;

      portalGroup.rotation.y = elapsedTime * 0.5 + mouseX * 0.4;
      portalGroup.rotation.x = elapsedTime * 0.3 - mouseY * 0.4;
      particleField.rotation.y = elapsedTime * 0.1;

      let portalScale = 0.001;
      let portalZ = -50;
      let portalOpacity = 0;

      if (currentProgress < 0.35) {
        const phase1 = currentProgress / 0.35;
        portalScale = phase1 * 1.2;
        portalZ = -50 + phase1 * 50;
        portalOpacity = Math.min(1, phase1 * 2);
      } else if (currentProgress <= 0.65) {
        const phase2 = (currentProgress - 0.35) / 0.3;
        portalScale = 1.2 + phase2 * 3.5;
        portalZ = 0;
        portalOpacity = 1.0;
      } else {
        const phase3 = (currentProgress - 0.65) / 0.35;
        portalScale = 4.7 + phase3 * 4.5;
        portalZ = phase3 * 20;
        portalOpacity = Math.max(0, 1 - phase3 * 1.8);
      }

      portalGroup.scale.set(portalScale, portalScale, portalScale);
      portalGroup.position.z = portalZ;
      particleMat.opacity = portalOpacity * 0.8;

      renderer.render(scene, camera);
    };

    const unsubscribe = tickEngine.subscribe(instanceIdRef.current, render);

    return () => {
      unsubscribe();
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      safeDisposeObject(scene);
      renderer.dispose();
      if (renderer.domElement && canvasContainer.contains(renderer.domElement)) {
        canvasContainer.removeChild(renderer.domElement);
      }
    };
  }, [type]);

  const emergenceRatio = Math.max(0, Math.min(1, (progress - 0.50) / 0.50));
  const scalePageB = 0.88 + emergenceRatio * 0.12;

  return (
    <div className="w-full">
      {pageA && <div className="w-full relative z-10">{pageA}</div>}

      <div ref={containerRef} className="relative w-full h-[150vh] pointer-events-none">
        <div
          className={`sticky top-0 h-screen w-full overflow-hidden transition-opacity duration-300 ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
        >
          <div ref={canvasRef} className="absolute inset-0 z-20 pointer-events-none" />

          <div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 pointer-events-none transition-opacity duration-300"
            style={{ opacity: progress > 0.15 && progress < 0.85 ? 1 : 0 }}
          >
            <div className="px-5 py-2 bg-space-black/90 border border-cyan-glow/40 rounded-full backdrop-blur-xl shadow-neon-cyan flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-glow animate-ping" />
              <span className="text-xs font-orbitron font-bold text-white tracking-widest uppercase">
                {title}
              </span>
              <span className="text-[10px] font-mono text-cyan-glow/80 border-l border-white/10 pl-3">
                {subtitle}
              </span>
            </div>
          </div>
        </div>
      </div>

      {pageB && (
        <div
          className="w-full relative z-10 transition-all duration-300 ease-out"
          style={{
            opacity: emergenceRatio > 0.1 ? Math.min(1, emergenceRatio * 1.5) : 0.2,
            transform: `scale(${scalePageB}) translateY(${Math.max(0, (1 - emergenceRatio) * 60)}px)`,
          }}
        >
          {pageB}
        </div>
      )}
    </div>
  );
}
