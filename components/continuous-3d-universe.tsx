"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Continuous3DUniverse() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x3ef2ff, 5, 50);
    cyanLight.position.set(10, 10, 10);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x8b5cff, 5, 50);
    violetLight.position.set(-10, -10, 10);
    scene.add(violetLight);

    // -------------------------------------------------------------
    // CREATE MEANINGFUL IT & SOFTWARE ENGINEERING 3D MODELS
    // -------------------------------------------------------------
    const universeGroup = new THREE.Group();
    scene.add(universeGroup);

    // 1. IT Model: 3D Cloud Server Stack Disks
    const serverGroup = new THREE.Group();
    for (let i = 0; i < 3; i++) {
      const diskGeo = new THREE.CylinderGeometry(2.5, 2.5, 0.4, 32);
      const diskMat = new THREE.MeshStandardMaterial({
        color: 0x05070f,
        emissive: 0x0c1838,
        roughness: 0.15,
        metalness: 0.85,
      });
      const disk = new THREE.Mesh(diskGeo, diskMat);
      disk.position.y = (i - 1) * 0.9;
      serverGroup.add(disk);

      // Light ring on each server disk
      const ringGeo = new THREE.TorusGeometry(2.52, 0.05, 16, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: i === 1 ? 0x8b5cff : 0x3ef2ff });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = (i - 1) * 0.9;
      serverGroup.add(ring);
    }
    serverGroup.position.set(6, 4, -2);
    universeGroup.add(serverGroup);

    // 2. IT Model: 3D Neural Brain AI Cluster
    const neuralGroup = new THREE.Group();
    const nodeCount = 14;
    const nodePositions: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5
      );
      nodePositions.push(pos);
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 16, 16),
        new THREE.MeshStandardMaterial({
          color: i % 2 === 0 ? 0x3ef2ff : 0x8b5cff,
          emissive: i % 2 === 0 ? 0x154050 : 0x301050,
          roughness: 0.2,
          metalness: 0.8,
        })
      );
      sphere.position.copy(pos);
      neuralGroup.add(sphere);
    }
    // Synapse Lines
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 3.2) {
          const lineGeo = new THREE.BufferGeometry().setFromPoints([
            nodePositions[i],
            nodePositions[j],
          ]);
          const lineMat = new THREE.LineBasicMaterial({
            color: 0x3ef2ff,
            transparent: true,
            opacity: 0.3,
          });
          const line = new THREE.Line(lineGeo, lineMat);
          neuralGroup.add(line);
        }
      }
    }
    neuralGroup.position.set(-7, -5, -1);
    universeGroup.add(neuralGroup);

    // 3. IT Model: 3D Database Cylinder Monolith
    const dbGroup = new THREE.Group();
    const dbGeo = new THREE.CylinderGeometry(2.2, 2.2, 4.5, 32, 4, true);
    const dbMat = new THREE.MeshStandardMaterial({
      color: 0x3ef2ff,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const dbMesh = new THREE.Mesh(dbGeo, dbMat);
    dbGroup.add(dbMesh);

    const dbCore = new THREE.Mesh(
      new THREE.CylinderGeometry(1.8, 1.8, 4.2, 32),
      new THREE.MeshStandardMaterial({ color: 0x05070f, roughness: 0.2, metalness: 0.9 })
    );
    dbGroup.add(dbCore);
    dbGroup.position.set(7, -14, -2);
    universeGroup.add(dbGroup);

    // 4. IT Model: 3D Code Matrix Terminal Cube
    const matrixGroup = new THREE.Group();
    const cubeGeo = new THREE.BoxGeometry(3.6, 3.6, 3.6);
    const cubeMat = new THREE.MeshStandardMaterial({
      color: 0x05070f,
      emissive: 0x081828,
      roughness: 0.1,
      metalness: 0.9,
    });
    const matrixCube = new THREE.Mesh(cubeGeo, cubeMat);
    matrixGroup.add(matrixCube);

    const wireMat = new THREE.MeshBasicMaterial({ color: 0x3ef2ff, wireframe: true, transparent: true, opacity: 0.5 });
    const wireMesh = new THREE.Mesh(cubeGeo, wireMat);
    wireMesh.scale.set(1.05, 1.05, 1.05);
    matrixGroup.add(wireMesh);
    matrixGroup.position.set(-6, -22, -1);
    universeGroup.add(matrixGroup);

    // 5. IT Model: 3D Cyber Security Quantum Shield
    const shieldGroup = new THREE.Group();
    const shieldGeo = new THREE.IcosahedronGeometry(2.8, 1);
    const shieldMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cff,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const shield = new THREE.Mesh(shieldGeo, shieldMat);
    shieldGroup.add(shield);

    const shieldCore = new THREE.Mesh(
      new THREE.OctahedronGeometry(1.6, 0),
      new THREE.MeshStandardMaterial({ color: 0x3ef2ff, metalness: 0.9, roughness: 0.1 })
    );
    shieldGroup.add(shieldCore);
    shieldGroup.position.set(6, -30, -1);
    universeGroup.add(shieldGroup);

    // 6. IT Model: 3D Global Edge Satellite Network Globe
    const globeGroup = new THREE.Group();
    const globeGeo = new THREE.SphereGeometry(3.2, 24, 24);
    const globeMat = new THREE.MeshStandardMaterial({
      color: 0x05070f,
      emissive: 0x0a1428,
      roughness: 0.2,
      metalness: 0.8,
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    globeGroup.add(globeMesh);

    const globeWireMat = new THREE.MeshBasicMaterial({ color: 0x3ef2ff, wireframe: true, transparent: true, opacity: 0.4 });
    const globeWire = new THREE.Mesh(globeGeo, globeWireMat);
    globeWire.scale.set(1.03, 1.03, 1.03);
    globeGroup.add(globeWire);
    globeGroup.position.set(-6, -38, -1);
    universeGroup.add(globeGroup);

    // Ambient Floating IT Particle Field
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 120;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 30;
      posArray[i + 1] = (Math.random() - 0.5) * 60;
      posArray[i + 2] = (Math.random() - 0.5) * 15;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.09,
      color: 0x3ef2ff,
      transparent: true,
      opacity: 0.5,
    });
    const particleField = new THREE.Points(particleGeo, particleMat);
    scene.add(particleField);

    // Mouse Tracking for subtle parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Scroll Listener for continuous Y-axis camera translation
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();

      // Translate 3D universe camera seamlessly with page scroll
      // As user scrolls down, camera Y follows scrollY smoothly without breaking content
      const targetY = -(scrollY * 0.012);
      camera.position.y += (targetY - camera.position.y) * 0.08;

      // Mouse Parallax drift
      camera.position.x += (mouseX * 0.8 - camera.position.x) * 0.05;

      // Rotate individual IT 3D Models
      serverGroup.rotation.y = time * 0.4;
      neuralGroup.rotation.y = time * 0.3;
      neuralGroup.rotation.x = time * 0.2;

      dbGroup.rotation.y = time * 0.35;
      matrixGroup.rotation.y = time * 0.5;
      matrixGroup.rotation.x = time * 0.25;

      shieldGroup.rotation.y = time * 0.4;
      shieldGroup.rotation.z = time * 0.2;

      globeGroup.rotation.y = time * 0.3;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
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
    >
      {/* Background Volumetric Glow Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(62,242,255,0.03),transparent_75%)] pointer-events-none" />
    </div>
  );
}
