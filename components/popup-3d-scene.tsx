"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface Popup3DSceneProps {
  position?: "left" | "right" | "center" | "full";
  className?: string;
  density?: "low" | "medium" | "high";
}

export default function Popup3DScene({
  position = "full",
  className = "",
  density = "medium",
}: Popup3DSceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Scene, Camera, Renderer setup
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 400;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x3ef2ff, 4, 50);
    cyanLight.position.set(10, 10, 10);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x8b5cff, 4, 50);
    violetLight.position.set(-10, -10, 10);
    scene.add(violetLight);

    // Create 3D Objects (Inspired by noomoagency 3D floating shapes)
    const group = new THREE.Group();
    scene.add(group);

    // 1. Central Metallic Torus Knot
    const torusGeo = new THREE.TorusKnotGeometry(2.2, 0.65, 100, 16);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0x0c1838,
      emissive: 0x1a3a68,
      roughness: 0.15,
      metalness: 0.85,
      wireframe: false,
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.position.set(position === "left" ? -8 : position === "right" ? 8 : 0, 0, 0);
    group.add(torusMesh);

    // Wireframe outer shell for 3D holographic depth
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x3ef2ff,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const wireframeMesh = new THREE.Mesh(torusGeo, wireframeMat);
    wireframeMesh.scale.set(1.08, 1.08, 1.08);
    torusMesh.add(wireframeMesh);

    // 2. Floating 3D Geometric Spheres & Cubes
    const count = density === "high" ? 14 : density === "medium" ? 8 : 5;
    const floatingObjects: Array<{
      mesh: THREE.Mesh;
      rotSpeedX: number;
      rotSpeedY: number;
      floatSpeed: number;
      initialY: number;
    }> = [];

    const geomList = [
      new THREE.IcosahedronGeometry(0.8, 0),
      new THREE.OctahedronGeometry(0.7, 0),
      new THREE.TorusGeometry(0.7, 0.25, 16, 32),
      new THREE.BoxGeometry(0.9, 0.9, 0.9),
    ];

    for (let i = 0; i < count; i++) {
      const geo = geomList[i % geomList.length];
      const mat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0x3ef2ff : 0x8b5cff,
        roughness: 0.2,
        metalness: 0.8,
        transparent: true,
        opacity: 0.75,
      });
      const mesh = new THREE.Mesh(geo, mat);

      const posX = (Math.random() - 0.5) * 22;
      const posY = (Math.random() - 0.5) * 10;
      const posZ = (Math.random() - 0.5) * 10 - 2;

      mesh.position.set(posX, posY, posZ);
      group.add(mesh);

      floatingObjects.push({
        mesh,
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        floatSpeed: 0.001 + Math.random() * 0.002,
        initialY: posY,
      });
    }

    // Mouse position tracking for 3D spatial tilt
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize listener
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 400;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId: number;
    const startTime = performance.now();

    const animate = () => {
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Group rotation based on mouse movement (3D interactive pop effect)
      group.rotation.y = mouseX * 0.4 + elapsedTime * 0.05;
      group.rotation.x = -mouseY * 0.3;

      // Rotate torus mesh
      torusMesh.rotation.x = elapsedTime * 0.2;
      torusMesh.rotation.y = elapsedTime * 0.3;

      // Float floating objects up and down
      floatingObjects.forEach((obj, idx) => {
        obj.mesh.rotation.x += obj.rotSpeedX;
        obj.mesh.rotation.y += obj.rotSpeedY;
        obj.mesh.position.y = obj.initialY + Math.sin(elapsedTime * 1.5 + idx) * 0.6;
      });

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
  }, [density, position]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-72 md:h-96 overflow-hidden pointer-events-none ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(62,242,255,0.05),transparent_70%)] pointer-events-none" />
    </div>
  );
}
