"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { WorldKey } from "@/providers/scene-provider";

interface WorldManagerProps {
  activeWorld: WorldKey;
}

export default function WorldManager({ activeWorld }: WorldManagerProps) {
  const heroGroupRef = useRef<THREE.Group>(null);
  const aboutGroupRef = useRef<THREE.Group>(null);
  const servicesGroupRef = useRef<THREE.Group>(null);
  const projectsGroupRef = useRef<THREE.Group>(null);
  const contactGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. Hero World (z = 0)
    if (heroGroupRef.current) {
      heroGroupRef.current.rotation.y = time * 0.35;
      heroGroupRef.current.rotation.x = time * 0.2;
    }

    // 2. About World (z = -80)
    if (aboutGroupRef.current) {
      aboutGroupRef.current.rotation.y = time * 0.3;
      aboutGroupRef.current.rotation.z = time * 0.15;
    }

    // 3. Services World (z = -160)
    if (servicesGroupRef.current) {
      servicesGroupRef.current.rotation.y = time * 0.4;
    }

    // 4. Projects World (z = -240)
    if (projectsGroupRef.current) {
      projectsGroupRef.current.rotation.y = time * 0.35;
      projectsGroupRef.current.rotation.x = time * 0.25;
    }

    // 5. Contact World (z = -320)
    if (contactGroupRef.current) {
      contactGroupRef.current.rotation.y = time * 0.25;
    }
  });

  return (
    <group>
      {/* ------------------------------------------------------------- */}
      {/* WORLD 00: Hero Command Center (z = 0) */}
      {/* ------------------------------------------------------------- */}
      <group position={[0, 0, 0]}>
        <group ref={heroGroupRef}>
          {/* Outer Quantum AI Icosahedron Shield */}
          <mesh>
            <icosahedronGeometry args={[4.2, 2]} />
            <meshStandardMaterial
              color={0x3ef2ff}
              emissive={0x082535}
              wireframe
              transparent
              opacity={0.85}
            />
          </mesh>

          {/* Inner Glowing Cognitive Core */}
          <mesh>
            <icosahedronGeometry args={[2.4, 1]} />
            <meshStandardMaterial
              color={0x8b5cff}
              metalness={0.9}
              roughness={0.1}
              emissive={0x200840}
            />
          </mesh>
        </group>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* WORLD 01: About Innovation Chamber (z = -80) */}
      {/* ------------------------------------------------------------- */}
      <group position={[0, 0, -80]}>
        <group ref={aboutGroupRef}>
          <mesh position={[-6, 2, 0]}>
            <sphereGeometry args={[2.5, 24, 24]} />
            <meshStandardMaterial color={0x8b5cff} wireframe transparent opacity={0.7} />
          </mesh>

          <mesh position={[6, -2, 0]}>
            <octahedronGeometry args={[3.0, 1]} />
            <meshStandardMaterial color={0x3ef2ff} metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* WORLD 02: Services Galaxy (z = -160) */}
      {/* ------------------------------------------------------------- */}
      <group position={[0, 0, -160]}>
        <group ref={servicesGroupRef}>
          {[ -1.8, 0, 1.8 ].map((yPos, i) => (
            <group key={i} position={[0, yPos, 0]}>
              <mesh>
                <cylinderGeometry args={[4.0, 4.0, 0.5, 32]} />
                <meshStandardMaterial
                  color={0x05070f}
                  emissive={0x0a1c38}
                  roughness={0.1}
                  metalness={0.9}
                />
              </mesh>
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[4.1, 0.08, 16, 32]} />
                <meshBasicMaterial color={i % 2 === 0 ? 0x3ef2ff : 0x8b5cff} />
              </mesh>
            </group>
          ))}
        </group>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* WORLD 03: Case Monoliths & Projects (z = -240) */}
      {/* ------------------------------------------------------------- */}
      <group position={[0, 0, -240]}>
        <group ref={projectsGroupRef}>
          <mesh position={[-5, 0, 0]}>
            <boxGeometry args={[4.5, 4.5, 4.5]} />
            <meshStandardMaterial color={0x05070f} emissive={0x081828} roughness={0.1} metalness={0.9} />
          </mesh>
          <mesh position={[-5, 0, 0]} scale={[1.06, 1.06, 1.06]}>
            <boxGeometry args={[4.5, 4.5, 4.5]} />
            <meshBasicMaterial color={0x3ef2ff} wireframe transparent opacity={0.5} />
          </mesh>

          <mesh position={[5, 0, 0]}>
            <cylinderGeometry args={[3.5, 3.5, 6.0, 32, 4, true]} />
            <meshStandardMaterial color={0x8b5cff} wireframe transparent opacity={0.7} />
          </mesh>
        </group>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* WORLD 04: Global Trust & Contact Hub (z = -320) */}
      {/* ------------------------------------------------------------- */}
      <group position={[0, 0, -320]}>
        <group ref={contactGroupRef}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[4.5, 28, 28]} />
            <meshStandardMaterial color={0x05070f} emissive={0x0c1a35} roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[0, 0, 0]} scale={[1.04, 1.04, 1.04]}>
            <sphereGeometry args={[4.5, 28, 28]} />
            <meshBasicMaterial color={0x3ef2ff} wireframe transparent opacity={0.5} />
          </mesh>

          <mesh position={[0, 0, 0]}>
            <torusGeometry args={[5.8, 0.25, 16, 40]} />
            <meshStandardMaterial color={0x8b5cff} metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
