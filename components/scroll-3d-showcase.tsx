"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export type ShapeType =
  | "crystal"
  | "torusKnot"
  | "gearRibbon"
  | "matrixCube"
  | "cyberHelix"
  | "neuralBrain"
  | "globeWireframe"
  | "cyberPrism";

interface Scroll3DShowcaseProps {
  shapeType: ShapeType;
  title?: string;
  subtitle?: string;
}

export default function Scroll3DShowcase({
  shapeType = "crystal",
  title = "3D STAGE TRANSITION",
  subtitle = "SCROLL TO UNLOCK NEXT LEVEL",
}: Scroll3DShowcaseProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvasContainer = canvasContainerRef.current;
    if (!container || !canvasContainer) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const width = canvasContainer.clientWidth || window.innerWidth;
    const height = 480;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasContainer.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambient);

    const pointLight1 = new THREE.PointLight(0x3ef2ff, 5, 60);
    pointLight1.position.set(12, 12, 12);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b5cff, 5, 60);
    pointLight2.position.set(-12, -12, 12);
    scene.add(pointLight2);

    // Build Distinct 3D Geometries Based on shapeType
    const group = new THREE.Group();
    scene.add(group);

    let mainMesh: THREE.Mesh | THREE.Group;

    switch (shapeType) {
      case "crystal": {
        // 3D Cyber Octahedron Diamond Crystal
        const geo = new THREE.OctahedronGeometry(3.5, 0);
        const mat = new THREE.MeshStandardMaterial({
          color: 0x3ef2ff,
          roughness: 0.1,
          metalness: 0.9,
          wireframe: false,
        });
        mainMesh = new THREE.Mesh(geo, mat);
        
        const wireMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.4 });
        const wireMesh = new THREE.Mesh(geo, wireMat);
        wireMesh.scale.set(1.05, 1.05, 1.05);
        mainMesh.add(wireMesh);
        break;
      }

      case "torusKnot": {
        // 3D Interlocking Double Torus Knot
        const geo = new THREE.TorusKnotGeometry(2.8, 0.75, 120, 16);
        const mat = new THREE.MeshStandardMaterial({
          color: 0x8b5cff,
          emissive: 0x2a1055,
          roughness: 0.2,
          metalness: 0.8,
        });
        mainMesh = new THREE.Mesh(geo, mat);

        const wireMat = new THREE.MeshBasicMaterial({ color: 0x3ef2ff, wireframe: true, transparent: true, opacity: 0.35 });
        const wireMesh = new THREE.Mesh(geo, wireMat);
        wireMesh.scale.set(1.06, 1.06, 1.06);
        mainMesh.add(wireMesh);
        break;
      }

      case "gearRibbon": {
        // 3D Geometric Mobius Gear Ring
        const geo = new THREE.TorusGeometry(3.2, 0.8, 30, 100);
        const mat = new THREE.MeshStandardMaterial({
          color: 0x2f80ff,
          roughness: 0.15,
          metalness: 0.85,
        });
        mainMesh = new THREE.Mesh(geo, mat);

        const ring2Geo = new THREE.TorusGeometry(2.0, 0.4, 16, 60);
        const ring2Mat = new THREE.MeshStandardMaterial({ color: 0x3ef2ff, wireframe: true });
        const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
        mainMesh.add(ring2Mesh);
        break;
      }

      case "matrixCube": {
        // 3D Holographic Cube Matrix with Orbiting Satellites
        const cubeGroup = new THREE.Group();
        const geo = new THREE.BoxGeometry(3.2, 3.2, 3.2);
        const mat = new THREE.MeshStandardMaterial({
          color: 0x05070f,
          emissive: 0x102040,
          roughness: 0.1,
          metalness: 0.9,
        });
        const cube = new THREE.Mesh(geo, mat);
        cubeGroup.add(cube);

        const wireMat = new THREE.MeshBasicMaterial({ color: 0x3ef2ff, wireframe: true });
        const wire = new THREE.Mesh(geo, wireMat);
        wire.scale.set(1.04, 1.04, 1.04);
        cubeGroup.add(wire);

        // Satellites
        for (let i = 0; i < 6; i++) {
          const satGeo = new THREE.SphereGeometry(0.35, 16, 16);
          const satMat = new THREE.MeshStandardMaterial({ color: 0x8b5cff, emissive: 0x8b5cff });
          const sat = new THREE.Mesh(satGeo, satMat);
          const angle = (i / 6) * Math.PI * 2;
          sat.position.set(Math.cos(angle) * 5, Math.sin(angle) * 5, 0);
          cubeGroup.add(sat);
        }
        mainMesh = cubeGroup;
        break;
      }

      case "cyberHelix": {
        // 3D DNA Helix Mesh
        const helixGroup = new THREE.Group();
        const numNodes = 20;
        for (let i = 0; i < numNodes; i++) {
          const t = (i / numNodes) * Math.PI * 4;
          const y = (i - numNodes / 2) * 0.4;
          
          const s1 = new THREE.Mesh(
            new THREE.SphereGeometry(0.3, 16, 16),
            new THREE.MeshStandardMaterial({ color: 0x3ef2ff, metalness: 0.8 })
          );
          s1.position.set(Math.cos(t) * 2.2, y, Math.sin(t) * 2.2);
          helixGroup.add(s1);

          const s2 = new THREE.Mesh(
            new THREE.SphereGeometry(0.3, 16, 16),
            new THREE.MeshStandardMaterial({ color: 0x8b5cff, metalness: 0.8 })
          );
          s2.position.set(-Math.cos(t) * 2.2, y, -Math.sin(t) * 2.2);
          helixGroup.add(s2);
        }
        mainMesh = helixGroup;
        break;
      }

      case "neuralBrain": {
        // 3D Neural Network Cluster Spheres
        const brainGroup = new THREE.Group();
        const count = 18;
        for (let i = 0; i < count; i++) {
          const size = 0.4 + Math.random() * 0.5;
          const mesh = new THREE.Mesh(
            new THREE.IcosahedronGeometry(size, 1),
            new THREE.MeshStandardMaterial({
              color: i % 2 === 0 ? 0x3ef2ff : 0x8b5cff,
              roughness: 0.2,
              metalness: 0.8,
            })
          );
          mesh.position.set(
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 6
          );
          brainGroup.add(mesh);
        }
        mainMesh = brainGroup;
        break;
      }

      case "globeWireframe": {
        // 3D Cybernetic Globe Wireframe Grid
        const geo = new THREE.SphereGeometry(3.5, 24, 24);
        const mat = new THREE.MeshStandardMaterial({
          color: 0x05070f,
          emissive: 0x0c1838,
          roughness: 0.2,
          metalness: 0.8,
        });
        mainMesh = new THREE.Mesh(geo, mat);

        const wireMat = new THREE.MeshBasicMaterial({ color: 0x3ef2ff, wireframe: true, transparent: true, opacity: 0.5 });
        const wire = new THREE.Mesh(geo, wireMat);
        wire.scale.set(1.03, 1.03, 1.03);
        mainMesh.add(wire);
        break;
      }

      case "cyberPrism":
      default: {
        // 3D Star Cyber Prism
        const geo = new THREE.DodecahedronGeometry(3.2, 0);
        const mat = new THREE.MeshStandardMaterial({
          color: 0xd4af37,
          emissive: 0x332200,
          roughness: 0.1,
          metalness: 0.9,
        });
        mainMesh = new THREE.Mesh(geo, mat);

        const wireMat = new THREE.MeshBasicMaterial({ color: 0x3ef2ff, wireframe: true });
        const wire = new THREE.Mesh(geo, wireMat);
        wire.scale.set(1.05, 1.05, 1.05);
        mainMesh.add(wire);
        break;
      }
    }

    group.add(mainMesh);

    // Orbiting Background Particles
    const particlesGeo = new THREE.BufferGeometry();
    const particleCount = 60;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20;
    }
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0x3ef2ff,
      transparent: true,
      opacity: 0.6,
    });
    const particlesMesh = new THREE.Points(particlesGeo, particleMat);
    scene.add(particlesMesh);

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Scroll Progress Tracking for Pop-Up & Showcase Effect
    const handleScroll = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Progress: 0 when top enters bottom of screen, 0.5 at center, 1 when bottom leaves top
      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height))
      );
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Resize
    const handleResize = () => {
      if (!canvasContainer) return;
      const w = canvasContainer.clientWidth || window.innerWidth;
      camera.aspect = w / 480;
      camera.updateProjectionMatrix();
      renderer.setSize(w, 480);
    };
    window.addEventListener("resize", handleResize);

    // Render Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();

      // Determine scale & opacity pop-up effect based on scroll position
      // Pop-up in phase 1 (0 to 0.4), full showcase in center (0.4 to 0.6), scale out phase 3 (0.6 to 1.0)
      const containerRect = container.getBoundingClientRect();
      const centerDist = Math.abs(containerRect.top + containerRect.height / 2 - window.innerHeight / 2);
      const showcaseFactor = Math.max(0, 1 - centerDist / (window.innerHeight * 0.7));

      // Scale pop-up transformation
      const targetScale = 0.2 + showcaseFactor * 1.15;
      group.scale.set(targetScale, targetScale, targetScale);

      // Rotation & Floating
      group.rotation.y = time * 0.4 + mouseX * 0.3;
      group.rotation.x = time * 0.25 - mouseY * 0.3;
      particlesMesh.rotation.y = time * 0.05;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && canvasContainer.contains(renderer.domElement)) {
        canvasContainer.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [shapeType]);

  return (
    <div
      ref={containerRef}
      className="relative w-full my-12 py-16 overflow-hidden flex flex-col items-center justify-center pointer-events-none select-none"
    >
      {/* Volumetric ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(62,242,255,0.08),transparent_70%)] pointer-events-none" />

      {/* 3D Showcase Stage Canvas */}
      <div ref={canvasContainerRef} className="w-full max-w-4xl h-[400px] md:h-[480px] relative z-10 flex items-center justify-center" />

      {/* Pop-Up Showcase Label Badge */}
      <div className="relative z-20 -mt-16 px-6 py-2 bg-space-black/90 border border-cyan-glow/30 rounded-full backdrop-blur-xl shadow-neon-cyan flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-glow animate-ping" />
        <span className="text-xs font-orbitron font-bold text-white tracking-widest uppercase">
          {title}
        </span>
        <span className="text-[10px] font-mono text-cyan-glow/80 border-l border-white/10 pl-3">
          {subtitle}
        </span>
      </div>
    </div>
  );
}
