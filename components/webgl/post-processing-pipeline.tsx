"use client";

import React from "react";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
  SSAO,
  ChromaticAberration,
  Noise,
  Vignette,
  ToneMapping,
} from "@react-three/postprocessing";
import { BlendFunction, ToneMappingMode } from "postprocessing";
import { useWebglEngine } from "@/providers/webgl-engine-provider";
import { useTransition } from "@/providers/transition-provider";

export default function PostProcessingPipeline() {
  const { qualityTier } = useWebglEngine();
  const { transitionStage, transitionProgress } = useTransition();

  const isTransitioning = transitionStage !== "idle";
  const transitionBlur = isTransitioning
    ? transitionStage === "exiting"
      ? transitionProgress * 0.004
      : (1 - transitionProgress) * 0.005
    : 0;

  const dofFocusDistance = isTransitioning ? 0.015 + transitionBlur * 2 : 0.012;
  const dofBokehScale = isTransitioning ? 3 + transitionProgress * 4 : 2.5;

  if (qualityTier === "low") {
    return (
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.55}
          luminanceThreshold={0.85}
          luminanceSmoothing={0.4}
          mipmapBlur
        />
        <Vignette offset={0.3} darkness={0.55} blendFunction={BlendFunction.NORMAL} />
      </EffectComposer>
    );
  }

  if (qualityTier === "medium") {
    return (
      <EffectComposer multisampling={2}>
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        <Bloom
          intensity={0.65}
          luminanceThreshold={0.78}
          luminanceSmoothing={0.35}
          mipmapBlur
        />
        <SSAO samples={8} radius={0.04} intensity={18} luminanceInfluence={0.5} />
        <Noise opacity={0.025} blendFunction={BlendFunction.OVERLAY} />
        <Vignette offset={0.28} darkness={0.6} blendFunction={BlendFunction.NORMAL} />
        <ChromaticAberration
          offset={[transitionBlur + 0.0004, transitionBlur + 0.0004]}
          blendFunction={BlendFunction.NORMAL}
          radialModulation={false}
          modulationOffset={0.15}
        />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer multisampling={4}>
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      <Bloom
        intensity={0.75}
        luminanceThreshold={0.72}
        luminanceSmoothing={0.3}
        mipmapBlur
      />
      <DepthOfField
        focusDistance={dofFocusDistance}
        focalLength={0.028}
        bokehScale={dofBokehScale}
        height={480}
      />
      <SSAO samples={16} radius={0.05} intensity={22} luminanceInfluence={0.6} />
      <Noise opacity={0.035} blendFunction={BlendFunction.OVERLAY} />
      <Vignette offset={0.25} darkness={0.65} blendFunction={BlendFunction.NORMAL} />
      <ChromaticAberration
        offset={[transitionBlur + 0.0006, transitionBlur + 0.0006]}
        blendFunction={BlendFunction.NORMAL}
        radialModulation
        modulationOffset={0.2}
      />
    </EffectComposer>
  );
}
