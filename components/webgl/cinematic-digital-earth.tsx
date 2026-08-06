"use client";

import React, { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

declare global {
  interface Window {
    maplibregl?: any;
  }
}

export default function CinematicDigitalEarth() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHQZoomed, setIsHQZoomed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let animId: number;
    let mapInstance: any = null;

    // Dynamically load MapLibre GL JS 3D Satellite Globe library
    const loadScript = () => {
      if (window.maplibregl) {
        initGlobe();
        return;
      }

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css";
      document.head.appendChild(link);

      const script = document.createElement("script");
      script.src = "https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js";
      script.onload = () => {
        initGlobe();
      };
      document.head.appendChild(script);
    };

    const initGlobe = () => {
      if (!containerRef.current || mapRef.current) return;

      const maplibregl = window.maplibregl;
      if (!maplibregl) return;

      mapInstance = new maplibregl.Map({
        container: containerRef.current,
        style: {
          version: 8,
          sources: {
            "esri-satellite": {
              type: "raster",
              tiles: [
                "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
              ],
              tileSize: 256,
              attribution: "Esri, Maxar, Earthstar Geographics",
            },
          },
          layers: [
            {
              id: "esri-satellite-layer",
              type: "raster",
              source: "esri-satellite",
              minzoom: 0,
              maxzoom: 22,
            },
          ],
          sky: {
            "sky-color": "#020817",
            "horizon-color": "#1e3a8a",
            "fog-color": "#030712",
          },
        },
        projection: "globe", // Real 3D Earth Globe Projection
        center: [20, 20],
        zoom: 1.2,
        pitch: 0,
        bearing: 0,
        interactive: false, // Pure cinematic experience
        attributionControl: false,
      });

      mapRef.current = mapInstance;

      mapInstance.on("load", () => {
        setIsLoaded(true);
        startCinematicLoop(mapInstance);
      });
    };

    const startCinematicLoop = (map: any) => {
      let startTime = performance.now();

      const loop = (now: number) => {
        const elapsed = (now - startTime) / 1000;
        const cycle = elapsed % 40; // 40-second Google Earth Studio loop

        if (cycle < 24) {
          // Phase 1: Continuous Smooth Global 3D Orbit Rotation
          setIsHQZoomed(false);
          const currentLng = 20 + elapsed * 9.0;
          map.setCenter([currentLng, 15]);
          map.setZoom(1.2);
          map.setPitch(0);
        } else if (cycle >= 24 && cycle < 34) {
          // Phase 2: Smooth FlyTo Zoom to Rajkot, Gujarat, India HQ
          if (!isHQZoomed) {
            setIsHQZoomed(true);
            map.flyTo({
              center: [70.8022, 22.3039], // Rajkot, Gujarat, India
              zoom: 8.5,
              pitch: 55,
              bearing: 25,
              duration: 4000, // 4-second smooth satellite camera push
              essential: true,
            });
          }
        } else {
          // Phase 3: FlyTo Zoom Back to Global Orbit
          if (isHQZoomed) {
            setIsHQZoomed(false);
            map.flyTo({
              center: [70.8022 + 40, 20],
              zoom: 1.2,
              pitch: 0,
              bearing: 0,
              duration: 3500,
              essential: true,
            });
          }
        }

        animId = requestAnimationFrame(loop);
      };

      animId = requestAnimationFrame(loop);
    };

    loadScript();

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (mapInstance) {
        mapInstance.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full h-36 sm:h-40 rounded-xl bg-space-black/90 border border-cyan-glow/30 backdrop-blur-xl relative overflow-hidden group shadow-[0_0_20px_rgba(62,242,255,0.15)] transition-all duration-300 hover:border-cyan-glow/60"
    >
      {/* 3D Photorealistic Satellite Globe Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full"
        style={{
          filter: isHovered ? "brightness(1.1) contrast(1.05)" : "none",
          transition: "filter 0.3s ease",
        }}
      />

      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-space-black flex flex-col items-center justify-center gap-2">
          <div className="w-6 h-6 rounded-full border-2 border-cyan-glow border-t-transparent animate-spin" />
          <span className="text-[10px] font-mono text-cyan-glow tracking-widest uppercase">
            Loading Real Satellite 3D Earth...
          </span>
        </div>
      )}

      {/* Holographic Rajkot HQ Beacon Marker (Overlay when zoomed) */}
      {isHQZoomed && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
          <div className="relative flex flex-col items-center">
            {/* Vertical Light Beam */}
            <div className="w-0.5 h-12 bg-gradient-to-b from-cyan-glow via-cyan-glow/60 to-transparent animate-pulse" />
            {/* Core Beacon Dot */}
            <div className="w-3 h-3 rounded-full bg-cyan-glow shadow-[0_0_15px_#3ef2ff] animate-ping" />
            {/* Pulsing Outer Rings */}
            <div className="absolute w-8 h-8 rounded-full border border-cyan-glow/80 animate-ping" style={{ animationDuration: "2s" }} />
          </div>
        </div>
      )}

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
              {isHQZoomed && <span className="text-[9px] text-cyan-glow font-normal">(SATELLITE LOCATED)</span>}
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
          className="px-2 py-1 rounded bg-cyan-glow/10 border border-cyan-glow/30 text-[9px] font-mono text-cyan-glow hover:bg-cyan-glow hover:text-space-black transition-all flex items-center gap-1 shrink-0 pointer-events-auto"
        >
          <span>Maps</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>
    </div>
  );
}
