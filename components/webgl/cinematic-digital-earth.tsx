"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ExternalLink } from "lucide-react";

// Official High-Resolution NASA Satellite Texture URLs (NASA Blue Marble & Black Marble)
const NASA_ASSET_URLS = {
  day: "https://raw.githubusercontent.com/vasturiano/three-globe/master/example/img/earth-blue-marble.jpg",
  night: "https://raw.githubusercontent.com/vasturiano/three-globe/master/example/img/earth-night.jpg",
  topology: "https://raw.githubusercontent.com/vasturiano/three-globe/master/example/img/earth-topology.png",
  water: "https://raw.githubusercontent.com/vasturiano/three-globe/master/example/img/earth-water.png",
};

// Physical Atmospheric Rayleigh Scattering Shader Material
const AtmosphericRayleighShader = {
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vEyeVector;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vEyeVector = normalize(-mvPosition.xyz);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    varying vec3 vEyeVector;
    uniform vec3 color;
    void main() {
      float intensity = pow(0.65 - dot(vNormal, vEyeVector), 3.2);
      gl_FragColor = vec4(color, intensity * 0.75);
    }
  `,
};

function PhotorealisticNASAEarth({ isHovered, onZoomChange }: { isHovered: boolean; onZoomChange: (zoomed: boolean) => void }) {
  const earthGroupRef = useRef<THREE.Group>(null);
  const earthMeshRef = useRef<THREE.Mesh>(null);
  const cloudMeshRef = useRef<THREE.Mesh>(null);
  const markerRef = useRef<THREE.Group>(null);

  const [textures, setTextures] = useState<{
    dayMap: THREE.Texture | null;
    nightMap: THREE.Texture | null;
    topologyMap: THREE.Texture | null;
    waterMap: THREE.Texture | null;
  }>({
    dayMap: null,
    nightMap: null,
    topologyMap: null,
    waterMap: null,
  });

  // Load Real NASA Satellite Assets asynchronously with fallback textures
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");

    loader.load(NASA_ASSET_URLS.day, (tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      setTextures((prev) => ({ ...prev, dayMap: tex }));
    });

    loader.load(NASA_ASSET_URLS.night, (tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      setTextures((prev) => ({ ...prev, nightMap: tex }));
    });

    loader.load(NASA_ASSET_URLS.topology, (tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      setTextures((prev) => ({ ...prev, topologyMap: tex }));
    });

    loader.load(NASA_ASSET_URLS.water, (tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      setTextures((prev) => ({ ...prev, waterMap: tex }));
    });
  }, []);

  // Atmospheric Scattering Material
  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: AtmosphericRayleighShader.vertexShader,
      fragmentShader: AtmosphericRayleighShader.fragmentShader,
      uniforms: {
        color: { value: new THREE.Color(0x3ef2ff) },
      },
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
  }, []);

  // Rajkot coordinates on 3D Earth sphere radius = 1.3
  // Lat: 22.3039° N, Lon: 70.8022° E
  const lat = 22.3039;
  const lon = 70.8022;
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const radius = 1.305;
  const markerX = -(radius * Math.sin(phi) * Math.cos(theta));
  const markerY = radius * Math.cos(phi);
  const markerZ = radius * Math.sin(phi) * Math.sin(theta);

  // Target rotation for Rajkot reveal
  const targetRotationY = -((lon * Math.PI) / 180) - Math.PI / 2;
  const targetRotationX = (lat * Math.PI) / 180;

  useFrame((state) => {
    if (!earthGroupRef.current || !earthMeshRef.current || !cloudMeshRef.current) return;

    const time = state.clock.getElapsedTime();

    // 40-Second Google Earth Studio Reveal Sequence
    // 0 -> 26s: Continuous smooth global orbit rotation (~40s per revolution)
    // 26 -> 30s: Eased rotation slowing & turn to Rajkot, Gujarat, India
    // 30 -> 35s: Hold on Rajkot Headquarters reveal
    // 35 -> 40s: Smooth zoom back out to global orbit
    const cycle = time % 40;
    const isZoomed = cycle >= 26 && cycle < 35;
    onZoomChange(isZoomed);

    if (cycle < 24) {
      earthMeshRef.current.rotation.y = time * 0.16;
      cloudMeshRef.current.rotation.y = time * 0.12;
    } else if (cycle >= 24 && cycle < 35) {
      // Eased smooth transition to Rajkot, India
      earthMeshRef.current.rotation.y += (targetRotationY - earthMeshRef.current.rotation.y) * 0.04;
      earthMeshRef.current.rotation.x += (targetRotationX - earthMeshRef.current.rotation.x) * 0.04;
      cloudMeshRef.current.rotation.y = earthMeshRef.current.rotation.y * 0.98;
    } else {
      // Resume global orbit
      earthMeshRef.current.rotation.x += (0 - earthMeshRef.current.rotation.x) * 0.04;
      earthMeshRef.current.rotation.y += 0.003;
      cloudMeshRef.current.rotation.y += 0.002;
    }

    // Camera distance interpolation
    const targetCamZ = isZoomed ? 2.45 : 3.8;
    state.camera.position.z += (targetCamZ - state.camera.position.z) * 0.04;

    // Beacon pulse animation
    if (markerRef.current) {
      const pulse = 1 + Math.sin(time * 5) * 0.2;
      markerRef.current.scale.setScalar(isZoomed ? pulse * 1.25 : pulse);
    }
  });

  return (
    <group ref={earthGroupRef}>
      {/* 1. Main NASA Satellite PBR Earth Sphere */}
      <mesh ref={earthMeshRef}>
        <sphereGeometry args={[1.3, 64, 64]} />
        <meshStandardMaterial
          map={textures.dayMap ?? undefined}
          emissiveMap={textures.nightMap ?? undefined}
          emissive={0xfffaed}
          emissiveIntensity={isHovered ? 1.5 : 1.2}
          bumpMap={textures.topologyMap ?? undefined}
          bumpScale={0.04}
          roughnessMap={textures.waterMap ?? undefined}
          roughness={0.35}
          metalness={0.1}
        />

        {/* 3D Holographic Rajkot HQ Vertical Light Beam & Beacon */}
        <group ref={markerRef} position={[markerX, markerY, markerZ]}>
          {/* Vertical Light Beam */}
          <mesh position={[0, 0.25, 0]}>
            <cylinderGeometry args={[0.015, 0.08, 0.5, 16]} />
            <meshBasicMaterial color={0x3ef2ff} transparent opacity={0.65} blending={THREE.AdditiveBlending} />
          </mesh>

          {/* Core Glowing Beacon Dot */}
          <mesh>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshBasicMaterial color={0x3ef2ff} />
          </mesh>

          {/* Glowing Beacon Pulse Rings */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.05, 0.09, 32]} />
            <meshBasicMaterial color={0x3ef2ff} transparent opacity={0.85} side={THREE.DoubleSide} />
          </mesh>

          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.1, 0.14, 32]} />
            <meshBasicMaterial color={0x8b5cff} transparent opacity={0.5} side={THREE.DoubleSide} />
          </mesh>

          <pointLight color={0x3ef2ff} intensity={4.0} distance={2.0} />
        </group>
      </mesh>

      {/* 2. Independent Cloud Layer Sphere */}
      <mesh ref={cloudMeshRef}>
        <sphereGeometry args={[1.32, 48, 48]} />
        <meshStandardMaterial
          color={0xffffff}
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 3. Atmospheric Rayleigh Scattering Outer Shell */}
      <mesh material={atmosphereMaterial}>
        <sphereGeometry args={[1.36, 32, 32]} />
      </mesh>

      {/* 4. Deep Space Background Starfield */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array(
                Array.from({ length: 350 * 3 }, () => (Math.random() - 0.5) * 24)
              ),
              3,
            ]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} color={0xffffff} transparent opacity={0.7} />
      </points>
    </group>
  );
}

export default function CinematicDigitalEarth() {
  const [isHovered, setIsHovered] = useState(false);
  const [isHQZoomed, setIsHQZoomed] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full h-36 sm:h-40 rounded-xl bg-space-black/90 border border-cyan-glow/30 backdrop-blur-xl relative overflow-hidden group shadow-[0_0_20px_rgba(62,242,255,0.15)] transition-all duration-300 hover:border-cyan-glow/60"
    >
      {/* 3D WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[6, 4, 6]} intensity={2.2} color={0xffffff} />
        <pointLight position={[-6, -4, -6]} intensity={0.8} color={0x8b5cff} />

        <PhotorealisticNASAEarth isHovered={isHovered} onZoomChange={setIsHQZoomed} />
      </Canvas>

      {/* HUD Floating Glass Label */}
      <div
        className={`absolute bottom-2.5 left-3 right-3 z-20 flex items-center justify-between p-2 rounded-lg bg-space-black/85 border border-cyan-glow/40 backdrop-blur-md transition-all duration-500 ${
          isHQZoomed ? "opacity-100 translate-y-0" : "opacity-90 translate-y-0"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-glow animate-ping shrink-0" />
          <div>
            <div className="text-[10px] font-mono font-bold text-white leading-tight flex items-center gap-1">
              <span>ZIBRIN INFOTECH HQ</span>
              {isHQZoomed && <span className="text-[9px] text-cyan-glow font-normal">(LOCATED)</span>}
            </div>
            <div className="text-[9px] font-mono text-cyan-glow/90">
              Rajkot, Gujarat, India
            </div>
          </div>
        </div>

        <a
          href="https://maps.google.com/?q=Rajkot+Gujarat+India"
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 py-1 rounded bg-cyan-glow/10 border border-cyan-glow/30 text-[9px] font-mono text-cyan-glow hover:bg-cyan-glow hover:text-space-black transition-all flex items-center gap-1 shrink-0"
        >
          <span>Maps</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>
    </div>
  );
}
