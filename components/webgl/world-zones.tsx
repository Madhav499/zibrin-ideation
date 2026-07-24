"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useWebglEngine } from "@/providers/webgl-engine-provider";
import { useTransition } from "@/providers/transition-provider";
import { BRAND_COLORS, WORLD_Z } from "@/lib/world-config";
import type { WorldKey } from "@/lib/world-config";

interface WorldZoneProps {
  worldKey: WorldKey;
  children: React.ReactNode;
}

function WorldZone({ worldKey, children }: WorldZoneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const { targetZ, cameraZ, activeWorld } = useWebglEngine();
  const { transitionStage, transitionProgress } = useTransition();

  const worldZ = WORLD_Z[worldKey];
  const isActive = activeWorld === worldKey;

  useFrame((state, delta) => {
    if (!groupRef.current || !innerRef.current) return;

    const time = state.clock.getElapsedTime();
    const distToCamera = Math.abs(cameraZ - (worldZ + 18));
    const proximity = Math.max(0, 1 - distToCamera / 120);

    let scale = 0.65 + proximity * 0.35;
    let rotSpeed = 0.15 + proximity * 0.25;
    let yOffset = 0;

    if (transitionStage === "exiting" && !isActive) {
      const p = transitionProgress;
      scale *= 1 - p * 0.35;
      rotSpeed += p * 0.8;
      yOffset = -p * 3;
    } else if (transitionStage === "entering" && isActive) {
      const p = 1 - transitionProgress;
      scale = 0.5 + (1 - p) * 0.5;
      rotSpeed += p * 1.2;
      yOffset = p * 5;
    }

    innerRef.current.rotation.y = time * rotSpeed;
    innerRef.current.rotation.x = Math.sin(time * 0.4) * 0.15 * proximity;
    groupRef.current.position.y = yOffset;
    groupRef.current.scale.setScalar(scale);
  });

  return (
    <group ref={groupRef} position={[0, 0, worldZ]}>
      <group ref={innerRef}>{children}</group>
    </group>
  );
}

function HeroWorld() {
  return (
    <WorldZone worldKey="hero">
      <mesh>
        <icosahedronGeometry args={[5, 2]} />
        <meshStandardMaterial
          color={BRAND_COLORS.cyanGlow}
          emissive={BRAND_COLORS.cyanGlow}
          emissiveIntensity={0.15}
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.4, 32, 32]} />
        <meshStandardMaterial
          color={BRAND_COLORS.neonViolet}
          metalness={0.95}
          roughness={0.08}
          emissive={BRAND_COLORS.neonViolet}
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[6.5, 0.1, 16, 64]} />
        <meshBasicMaterial color={BRAND_COLORS.cyanGlow} transparent opacity={0.7} />
      </mesh>
      <mesh rotation={[0, Math.PI / 4, Math.PI / 5]}>
        <torusGeometry args={[7.2, 0.06, 12, 48]} />
        <meshBasicMaterial color={BRAND_COLORS.electricBlue} transparent opacity={0.5} />
      </mesh>
    </WorldZone>
  );
}

function AboutWorld() {
  return (
    <WorldZone worldKey="about">
      <mesh position={[-5, 2, 0]}>
        <icosahedronGeometry args={[3.5, 1]} />
        <meshStandardMaterial
          color={BRAND_COLORS.neonViolet}
          wireframe
          transparent
          opacity={0.75}
          emissive={BRAND_COLORS.neonViolet}
          emissiveIntensity={0.12}
        />
      </mesh>
      <mesh position={[5.5, -1.5, 0]}>
        <dodecahedronGeometry args={[3.6, 0]} />
        <meshStandardMaterial
          color={BRAND_COLORS.cyanGlow}
          metalness={0.85}
          roughness={0.15}
          emissive={BRAND_COLORS.cyanGlow}
          emissiveIntensity={0.1}
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[2.8, 0]} />
        <meshStandardMaterial
          color={BRAND_COLORS.electricBlue}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
    </WorldZone>
  );
}

function ServicesWorld() {
  const rings = useMemo(() => [-2.5, 0, 2.5], []);
  return (
    <WorldZone worldKey="services">
      {rings.map((yPos, i) => (
        <group key={i} position={[0, yPos, 0]} rotation={[0, (i * Math.PI) / 3, 0]}>
          <mesh>
            <cylinderGeometry args={[4.5, 4.5, 0.6, 32]} />
            <meshStandardMaterial
              color={BRAND_COLORS.spaceBlack}
              emissive={BRAND_COLORS.electricBlue}
              emissiveIntensity={0.08}
              metalness={0.9}
              roughness={0.12}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[4.6, 0.1, 16, 48]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? BRAND_COLORS.cyanGlow : BRAND_COLORS.neonViolet}
              transparent
              opacity={0.85}
            />
          </mesh>
          {/* Orbiting service nodes */}
          {[0, 1, 2, 3].map((j) => (
            <mesh
              key={j}
              position={[Math.cos(j * 1.57) * 5.5, 0, Math.sin(j * 1.57) * 5.5]}
            >
              <sphereGeometry args={[0.35, 12, 12]} />
              <meshStandardMaterial
                color={BRAND_COLORS.cyanGlow}
                emissive={BRAND_COLORS.cyanGlow}
                emissiveIntensity={0.5}
              />
            </mesh>
          ))}
        </group>
      ))}
    </WorldZone>
  );
}

function ProcessWorld() {
  const steps = 8;
  return (
    <WorldZone worldKey="process">
      {Array.from({ length: steps }).map((_, i) => {
        const angle = (i / steps) * Math.PI * 2;
        const r = 5;
        return (
          <group key={i} position={[Math.cos(angle) * r, Math.sin(angle) * r * 0.4, 0]}>
            <mesh>
              <boxGeometry args={[1.2, 1.2, 1.2]} />
              <meshStandardMaterial
                color={BRAND_COLORS.spaceBlack}
                emissive={i % 2 === 0 ? BRAND_COLORS.cyanGlow : BRAND_COLORS.neonViolet}
                emissiveIntensity={0.15}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          </group>
        );
      })}
      <mesh>
        <torusKnotGeometry args={[2.5, 0.3, 128, 16]} />
        <meshStandardMaterial
          color={BRAND_COLORS.electricBlue}
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>
    </WorldZone>
  );
}

function PortfolioWorld() {
  return (
    <WorldZone worldKey="portfolio">
      <mesh position={[-6, 0, 0]}>
        <boxGeometry args={[5, 5, 5]} />
        <meshStandardMaterial
          color={BRAND_COLORS.spaceBlack}
          emissive={BRAND_COLORS.cyanGlow}
          emissiveIntensity={0.06}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      <mesh position={[-6, 0, 0]} scale={[1.08, 1.08, 1.08]}>
        <boxGeometry args={[5, 5, 5]} />
        <meshBasicMaterial color={BRAND_COLORS.cyanGlow} wireframe transparent opacity={0.45} />
      </mesh>
      <mesh position={[6, 0, 0]}>
        <cylinderGeometry args={[4, 4, 7, 32, 4, true]} />
        <meshStandardMaterial
          color={BRAND_COLORS.neonViolet}
          wireframe
          transparent
          opacity={0.65}
          emissive={BRAND_COLORS.neonViolet}
          emissiveIntensity={0.1}
        />
      </mesh>
      <mesh position={[0, 3, -2]}>
        <octahedronGeometry args={[2, 0]} />
        <meshStandardMaterial color={BRAND_COLORS.goldAccent} metalness={0.9} roughness={0.2} />
      </mesh>
    </WorldZone>
  );
}

function TechWorld() {
  const orbitCount = 12;
  return (
    <WorldZone worldKey="tech">
      <mesh>
        <icosahedronGeometry args={[3, 1]} />
        <meshStandardMaterial
          color={BRAND_COLORS.electricBlue}
          metalness={0.85}
          roughness={0.15}
          emissive={BRAND_COLORS.electricBlue}
          emissiveIntensity={0.12}
        />
      </mesh>
      {Array.from({ length: orbitCount }).map((_, i) => {
        const angle = (i / orbitCount) * Math.PI * 2;
        const r = 6 + (i % 3) * 0.8;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * r, Math.sin(angle * 2) * 1.5, Math.sin(angle) * r]}
          >
            <tetrahedronGeometry args={[0.5, 0]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? BRAND_COLORS.cyanGlow : BRAND_COLORS.neonViolet}
              emissive={i % 2 === 0 ? BRAND_COLORS.cyanGlow : BRAND_COLORS.neonViolet}
              emissiveIntensity={0.3}
            />
          </mesh>
        );
      })}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.5, 6, 64]} />
        <meshBasicMaterial color={BRAND_COLORS.cyanGlow} transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
    </WorldZone>
  );
}

function AiLabWorld() {
  const nodes = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 8,
        z: (Math.random() - 0.5) * 6,
        s: 0.2 + Math.random() * 0.35,
      })),
    []
  );

  return (
    <WorldZone worldKey="ai-lab">
      <mesh>
        <sphereGeometry args={[3.5, 24, 24]} />
        <meshStandardMaterial
          color={BRAND_COLORS.neonViolet}
          wireframe
          transparent
          opacity={0.55}
          emissive={BRAND_COLORS.neonViolet}
          emissiveIntensity={0.15}
        />
      </mesh>
      {nodes.map((n, i) => (
        <mesh key={i} position={[n.x, n.y, n.z]}>
          <sphereGeometry args={[n.s, 8, 8]} />
          <meshStandardMaterial
            color={BRAND_COLORS.cyanGlow}
            emissive={BRAND_COLORS.cyanGlow}
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
    </WorldZone>
  );
}

function TrustWorld() {
  return (
    <WorldZone worldKey="trust">
      <mesh>
        <sphereGeometry args={[5, 32, 32]} />
        <meshStandardMaterial
          color={BRAND_COLORS.spaceBlack}
          emissive={BRAND_COLORS.electricBlue}
          emissiveIntensity={0.08}
          metalness={0.85}
          roughness={0.15}
        />
      </mesh>
      <mesh scale={[1.05, 1.05, 1.05]}>
        <sphereGeometry args={[5, 24, 24]} />
        <meshBasicMaterial color={BRAND_COLORS.cyanGlow} wireframe transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[6.8, 0.3, 16, 64]} />
        <meshStandardMaterial color={BRAND_COLORS.neonViolet} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Satellite nodes */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 8, Math.sin(angle) * 2, Math.sin(angle) * 3]}>
            <boxGeometry args={[0.4, 0.4, 0.8]} />
            <meshStandardMaterial
              color={BRAND_COLORS.cyanGlow}
              emissive={BRAND_COLORS.cyanGlow}
              emissiveIntensity={0.35}
            />
          </mesh>
        );
      })}
    </WorldZone>
  );
}

function ContactWorld() {
  return (
    <WorldZone worldKey="contact">
      <mesh>
        <octahedronGeometry args={[4.5, 0]} />
        <meshStandardMaterial
          color={BRAND_COLORS.neonViolet}
          metalness={0.9}
          roughness={0.1}
          emissive={BRAND_COLORS.neonViolet}
          emissiveIntensity={0.12}
        />
      </mesh>
      <mesh scale={[1.15, 1.15, 1.15]}>
        <octahedronGeometry args={[4.5, 0]} />
        <meshBasicMaterial color={BRAND_COLORS.cyanGlow} wireframe transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[6, 0.12, 16, 48]} />
        <meshBasicMaterial color={BRAND_COLORS.goldAccent} transparent opacity={0.7} />
      </mesh>
    </WorldZone>
  );
}

export default function WorldZones() {
  return (
    <group>
      <HeroWorld />
      <AboutWorld />
      <ServicesWorld />
      <ProcessWorld />
      <PortfolioWorld />
      <TechWorld />
      <AiLabWorld />
      <TrustWorld />
      <ContactWorld />
    </group>
  );
}
