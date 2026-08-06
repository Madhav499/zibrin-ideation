"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useWebglEngine } from "@/providers/webgl-engine-provider";
import { BRAND_COLORS, WORLD_Z } from "@/lib/world-config";
import type { WorldKey } from "@/lib/world-config";

interface TransitionObjectProps {
  worldKey: WorldKey;
  targetZOffset?: number; // Position relative to worldZ
  children: React.ReactNode;
}

function TransitionObject({ worldKey, targetZOffset = -25, children }: TransitionObjectProps) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const { cameraZ } = useWebglEngine();

  const objectZ = WORLD_Z[worldKey] + targetZOffset;

  useFrame((state) => {
    if (!groupRef.current || !innerRef.current) return;

    const time = state.clock.getElapsedTime();
    const distToCamera = cameraZ - objectZ; // Positive when camera is in front of object

    // When camera approaches object:
    // Distance 40 -> 0: Object expands from small scale 0.5 to huge 3.5, camera enters object
    // Distance < 0 (camera passed object): Object disperses/scales up to 6.0 and fades
    let scale = 1.0;
    let opacity = 1.0;

    if (distToCamera > 0 && distToCamera < 50) {
      // Approaching
      const norm = 1 - distToCamera / 50; // 0 to 1
      scale = 0.6 + norm * 2.2; // 0.6 -> 2.8
      opacity = Math.min(1, norm * 1.5);
    } else if (distToCamera <= 0 && distToCamera > -30) {
      // Camera passing through
      const norm = Math.abs(distToCamera) / 30; // 0 to 1
      scale = 2.8 + norm * 3.2; // 2.8 -> 6.0 (Explosion / fly-through)
      opacity = Math.max(0, 1 - norm * 1.2);
    } else if (distToCamera >= 50) {
      // Far ahead
      scale = 0.4;
      opacity = 0;
    } else {
      // Far behind
      scale = 6.0;
      opacity = 0;
    }

    innerRef.current.rotation.y = time * 0.4;
    innerRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
    groupRef.current.position.z = objectZ;
    groupRef.current.scale.setScalar(scale);

    // Pass opacity down if possible via material uniforms or traversal
    groupRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => {
            mat.transparent = true;
            mat.opacity = opacity * (mat.userData.baseOpacity ?? 0.85);
          });
        } else if (mesh.material) {
          mesh.material.transparent = true;
          mesh.material.opacity = opacity * (mesh.material.userData.baseOpacity ?? 0.85);
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      <group ref={innerRef}>{children}</group>
    </group>
  );
}

// 1. HERO -> ABOUT: Holographic Energy Orb & Particle Explosion Core
function HeroOrb() {
  return (
    <TransitionObject worldKey="hero" targetZOffset={-25}>
      {/* Outer Wireframe Shield */}
      <mesh>
        <icosahedronGeometry args={[4.5, 2]} />
        <meshStandardMaterial
          color={BRAND_COLORS.cyanGlow}
          emissive={BRAND_COLORS.cyanGlow}
          emissiveIntensity={0.3}
          wireframe
          transparent
          userData={{ baseOpacity: 0.8 }}
        />
      </mesh>

      {/* Core Plasma Sphere */}
      <mesh>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshStandardMaterial
          color={BRAND_COLORS.neonViolet}
          emissive={BRAND_COLORS.neonViolet}
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.9}
          userData={{ baseOpacity: 0.95 }}
        />
      </mesh>

      {/* Orbital Ring 1 */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[5.8, 0.12, 16, 64]} />
        <meshBasicMaterial
          color={BRAND_COLORS.cyanGlow}
          transparent
          userData={{ baseOpacity: 0.9 }}
        />
      </mesh>

      {/* Orbital Ring 2 */}
      <mesh rotation={[0, Math.PI / 3, Math.PI / 4]}>
        <torusGeometry args={[6.4, 0.08, 16, 64]} />
        <meshBasicMaterial
          color={BRAND_COLORS.electricBlue}
          transparent
          userData={{ baseOpacity: 0.75 }}
        />
      </mesh>
    </TransitionObject>
  );
}

// 2. ABOUT -> SERVICES: 3D Double Helix DNA Structure
function AboutDNA() {
  const pairs = useMemo(() => {
    const arr = [];
    const count = 18;
    for (let i = 0; i < count; i++) {
      const y = (i - count / 2) * 0.7;
      const angle = i * 0.4;
      const radius = 2.2;
      arr.push({ y, angle, radius });
    }
    return arr;
  }, []);

  return (
    <TransitionObject worldKey="about" targetZOffset={-25}>
      <group>
        {pairs.map((p, idx) => {
          const x1 = Math.cos(p.angle) * p.radius;
          const z1 = Math.sin(p.angle) * p.radius;
          const x2 = Math.cos(p.angle + Math.PI) * p.radius;
          const z2 = Math.sin(p.angle + Math.PI) * p.radius;

          return (
            <group key={idx} position={[0, p.y, 0]}>
              {/* Strand Node 1 */}
              <mesh position={[x1, 0, z1]}>
                <sphereGeometry args={[0.3, 12, 12]} />
                <meshStandardMaterial
                  color={BRAND_COLORS.cyanGlow}
                  emissive={BRAND_COLORS.cyanGlow}
                  emissiveIntensity={0.5}
                  userData={{ baseOpacity: 0.9 }}
                />
              </mesh>
              {/* Strand Node 2 */}
              <mesh position={[x2, 0, z2]}>
                <sphereGeometry args={[0.3, 12, 12]} />
                <meshStandardMaterial
                  color={BRAND_COLORS.neonViolet}
                  emissive={BRAND_COLORS.neonViolet}
                  emissiveIntensity={0.5}
                  userData={{ baseOpacity: 0.9 }}
                />
              </mesh>
              {/* Connecting Rung */}
              <mesh
                position={[(x1 + x2) / 2, 0, (z1 + z2) / 2]}
                rotation={[0, -p.angle, 0]}
              >
                <boxGeometry args={[p.radius * 2, 0.08, 0.08]} />
                <meshBasicMaterial
                  color={idx % 2 === 0 ? BRAND_COLORS.electricBlue : BRAND_COLORS.goldAccent}
                  transparent
                  userData={{ baseOpacity: 0.75 }}
                />
              </mesh>
            </group>
          );
        })}
      </group>
    </TransitionObject>
  );
}

// 3. SERVICES -> PROCESS: AI Neural Synapse Network
function ServicesNeuralNet() {
  const nodes = useMemo(() => {
    const pts = [];
    const count = 16;
    for (let i = 0; i < count; i++) {
      pts.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6
        )
      );
    }
    return pts;
  }, []);

  return (
    <TransitionObject worldKey="services" targetZOffset={-25}>
      <group>
        {nodes.map((pos, idx) => (
          <mesh key={idx} position={pos}>
            <sphereGeometry args={[0.4, 16, 16]} />
            <meshStandardMaterial
              color={idx % 2 === 0 ? BRAND_COLORS.cyanGlow : BRAND_COLORS.electricBlue}
              emissive={idx % 2 === 0 ? BRAND_COLORS.cyanGlow : BRAND_COLORS.neonViolet}
              emissiveIntensity={0.6}
              userData={{ baseOpacity: 0.9 }}
            />
          </mesh>
        ))}

        {nodes.map((p1, i) =>
          nodes.slice(i + 1).map((p2, j) => {
            if (p1.distanceTo(p2) < 4.8) {
              const geo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
              return (
                <line key={`${i}-${j}`}>
                  <bufferGeometry attach="geometry" {...geo} />
                  <lineBasicMaterial
                    attach="material"
                    color={BRAND_COLORS.cyanGlow}
                    transparent
                    userData={{ baseOpacity: 0.5 }}
                  />
                </line>
              );
            }
            return null;
          })
        )}
      </group>
    </TransitionObject>
  );
}

// 4. PROCESS -> PORTFOLIO: Digital Cyber Tunnel & Torus Rings
function ProcessCyberTunnel() {
  const rings = useMemo(() => [0, 1, 2, 3, 4, 5], []);

  return (
    <TransitionObject worldKey="process" targetZOffset={-25}>
      <group>
        {rings.map((idx) => {
          const zPos = (idx - 2.5) * 2.5;
          const scale = 1 + idx * 0.15;
          return (
            <group key={idx} position={[0, 0, zPos]} scale={[scale, scale, 1]}>
              <mesh rotation={[0, 0, (idx * Math.PI) / 6]}>
                <torusGeometry args={[4.2, 0.15, 6, 6]} />
                <meshStandardMaterial
                  color={BRAND_COLORS.spaceBlack}
                  emissive={idx % 2 === 0 ? BRAND_COLORS.cyanGlow : BRAND_COLORS.neonViolet}
                  emissiveIntensity={0.5}
                  metalness={0.9}
                  userData={{ baseOpacity: 0.85 }}
                />
              </mesh>
              <mesh rotation={[0, 0, -(idx * Math.PI) / 6]}>
                <torusGeometry args={[4.6, 0.05, 16, 48]} />
                <meshBasicMaterial
                  color={BRAND_COLORS.electricBlue}
                  transparent
                  userData={{ baseOpacity: 0.6 }}
                />
              </mesh>
            </group>
          );
        })}
      </group>
    </TransitionObject>
  );
}

// 5. PORTFOLIO -> BLOG: Floating 3D Holographic Display Screens
function PortfolioScreens() {
  return (
    <TransitionObject worldKey="portfolio" targetZOffset={-25}>
      <group>
        {/* Left Floating Display Frame */}
        <group position={[-5, 1, 0]} rotation={[0, 0.3, 0.1]}>
          <mesh>
            <boxGeometry args={[4.5, 3.2, 0.2]} />
            <meshStandardMaterial
              color={BRAND_COLORS.spaceBlack}
              emissive={BRAND_COLORS.cyanGlow}
              emissiveIntensity={0.15}
              metalness={0.95}
              userData={{ baseOpacity: 0.9 }}
            />
          </mesh>
          <mesh scale={[1.04, 1.04, 1.04]}>
            <boxGeometry args={[4.5, 3.2, 0.2]} />
            <meshBasicMaterial
              color={BRAND_COLORS.cyanGlow}
              wireframe
              transparent
              userData={{ baseOpacity: 0.6 }}
            />
          </mesh>
        </group>

        {/* Right Floating Display Frame */}
        <group position={[5, -1, 1]} rotation={[0, -0.3, -0.1]}>
          <mesh>
            <boxGeometry args={[4.5, 3.2, 0.2]} />
            <meshStandardMaterial
              color={BRAND_COLORS.spaceBlack}
              emissive={BRAND_COLORS.neonViolet}
              emissiveIntensity={0.15}
              metalness={0.95}
              userData={{ baseOpacity: 0.9 }}
            />
          </mesh>
          <mesh scale={[1.04, 1.04, 1.04]}>
            <boxGeometry args={[4.5, 3.2, 0.2]} />
            <meshBasicMaterial
              color={BRAND_COLORS.neonViolet}
              wireframe
              transparent
              userData={{ baseOpacity: 0.6 }}
            />
          </mesh>
        </group>

        {/* Central Prism Monolith */}
        <mesh position={[0, 0, -1]}>
          <octahedronGeometry args={[2.5, 0]} />
          <meshStandardMaterial
            color={BRAND_COLORS.goldAccent}
            emissive={BRAND_COLORS.goldAccent}
            emissiveIntensity={0.3}
            metalness={0.9}
            userData={{ baseOpacity: 0.9 }}
          />
        </mesh>
      </group>
    </TransitionObject>
  );
}

// 6. BLOG -> CONTACT: Matrix Data Stream Particle Stream
function BlogDataStream() {
  const cubes = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      x: (Math.random() - 0.5) * 9,
      y: (Math.random() - 0.5) * 9,
      z: (Math.random() - 0.5) * 5,
      size: 0.4 + Math.random() * 0.6,
    }));
  }, []);

  return (
    <TransitionObject worldKey="blog" targetZOffset={-25}>
      <group>
        {cubes.map((c, i) => (
          <mesh key={i} position={[c.x, c.y, c.z]}>
            <boxGeometry args={[c.size, c.size, c.size]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? BRAND_COLORS.cyanGlow : BRAND_COLORS.neonViolet}
              emissive={i % 2 === 0 ? BRAND_COLORS.cyanGlow : BRAND_COLORS.neonViolet}
              emissiveIntensity={0.5}
              wireframe={i % 3 === 0}
              userData={{ baseOpacity: 0.85 }}
            />
          </mesh>
        ))}
      </group>
    </TransitionObject>
  );
}

// 7. CONTACT WORLD GATEWAY: Infinite Glowing Gateway Rings
function ContactGateway() {
  return (
    <TransitionObject worldKey="contact" targetZOffset={-15}>
      <group>
        <mesh>
          <octahedronGeometry args={[4.2, 0]} />
          <meshStandardMaterial
            color={BRAND_COLORS.neonViolet}
            emissive={BRAND_COLORS.neonViolet}
            emissiveIntensity={0.4}
            metalness={0.9}
            roughness={0.1}
            userData={{ baseOpacity: 0.9 }}
          />
        </mesh>
        <mesh scale={[1.15, 1.15, 1.15]}>
          <octahedronGeometry args={[4.2, 0]} />
          <meshBasicMaterial
            color={BRAND_COLORS.cyanGlow}
            wireframe
            transparent
            userData={{ baseOpacity: 0.6 }}
          />
        </mesh>
        <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[6.5, 0.15, 16, 64]} />
          <meshBasicMaterial
            color={BRAND_COLORS.goldAccent}
            transparent
            userData={{ baseOpacity: 0.8 }}
          />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[7.2, 0.1, 16, 64]} />
          <meshBasicMaterial
            color={BRAND_COLORS.cyanGlow}
            transparent
            userData={{ baseOpacity: 0.6 }}
          />
        </mesh>
      </group>
    </TransitionObject>
  );
}

export default function WorldZones() {
  return (
    <group>
      <HeroOrb />
      <AboutDNA />
      <ServicesNeuralNet />
      <ProcessCyberTunnel />
      <PortfolioScreens />
      <BlogDataStream />
      <ContactGateway />
    </group>
  );
}
