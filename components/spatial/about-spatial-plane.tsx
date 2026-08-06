"use client";

import React from "react";
import { Sparkles, Target, Compass, Award, Heart, CheckCircle2, Shield, Flame, Users, Eye } from "lucide-react";

export default function AboutSpatialPlane() {
  const coreValues = [
    {
      title: "Vision First",
      desc: "Every project begins with your vision. We transform your ideas into digital experiences.",
      icon: Eye,
    },
    {
      title: "Creativity Without Limits",
      desc: "Every product is crafted with originality, innovation, and purpose.",
      icon: Flame,
    },
    {
      title: "Quality in Every Pixel",
      desc: "Carefully designed, developed, and tested to deliver a premium digital experience.",
      icon: Award,
    },
    {
      title: "Innovation",
      desc: "We explore new tech, AI, and design trends to create future-ready solutions.",
      icon: Sparkles,
    },
    {
      title: "Partnership",
      desc: "Your success is our success. We work as an extension of your team.",
      icon: Users,
    },
    {
      title: "Transparency",
      desc: "Clear communication, honest timelines, and complete project visibility.",
      icon: Shield,
    },
    {
      title: "Excellence",
      desc: "We deliver experiences that exceed expectations and leave a lasting impression.",
      icon: Target,
    },
    {
      title: "Client Focus",
      desc: "Every decision and feature is shaped around your goals and your vision.",
      icon: Heart,
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-5 flex flex-col items-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neon-violet/10 border border-neon-violet/30 backdrop-blur-md mb-3 sm:mb-4">
        <Sparkles className="w-3.5 h-3.5 text-neon-violet" />
        <span className="text-[10px] sm:text-xs font-mono tracking-widest text-neon-violet uppercase font-semibold">
          ABOUT US // YOUR TRUSTED DIGITAL PARTNER
        </span>
      </div>

      {/* Main Heading */}
      <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-syne tracking-tight text-white mb-3 sm:mb-4 text-center">
        About Zibrininfotech: <span className="bg-gradient-to-r from-neon-violet via-cyan-glow to-electric-blue bg-clip-text text-transparent">Your Trusted Digital Partner</span>
      </h2>

      {/* Story Banner */}
      <div className="w-full p-4 sm:p-5 rounded-2xl bg-space-black/70 border border-white/10 backdrop-blur-xl mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-bold font-syne text-cyan-glow mb-1.5">Our Story</h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
          Behind every business is a dream and dedication. Our purpose is to honour that journey by transforming your vision into immersive digital experiences that make people feel the passion behind it.
        </p>
      </div>

      {/* Mission & Vision Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 w-full mb-4 sm:mb-6">
        <div className="p-4 sm:p-5 rounded-2xl bg-space-black/70 border border-cyan-glow/20 backdrop-blur-xl hover:border-cyan-glow/50 transition-all">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="p-1.5 rounded-lg bg-cyan-glow/10 border border-cyan-glow/30 text-cyan-glow">
              <Target className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold font-syne text-white">Our Mission</h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            To transform static websites into living digital experiences where design, technology, and storytelling work together seamlessly.
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-space-black/70 border border-neon-violet/20 backdrop-blur-xl hover:border-neon-violet/50 transition-all">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="p-1.5 rounded-lg bg-neon-violet/10 border border-neon-violet/30 text-neon-violet">
              <Compass className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold font-syne text-white">Our Vision</h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            A future where every business can present its work exactly as imagined—without limits or compromise.
          </p>
        </div>
      </div>

      {/* Core Values Grid */}
      <div className="w-full mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-bold font-syne text-white mb-3 text-center">Our Core Values</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 w-full">
          {coreValues.map((v, idx) => {
            const IconComp = v.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-space-black/60 border border-white/10 backdrop-blur-lg hover:border-cyan-glow/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 w-fit text-cyan-glow mb-2">
                    <IconComp className="w-3.5 h-3.5" />
                  </div>
                  <h5 className="text-xs sm:text-sm font-bold font-syne text-white mb-1">{v.title}</h5>
                  <p className="text-[11px] text-slate-300 leading-normal font-light">{v.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Our Promise Banner */}
      <div className="w-full p-3.5 rounded-xl bg-gradient-to-r from-cyan-glow/10 via-neon-violet/10 to-electric-blue/10 border border-cyan-glow/30 backdrop-blur-md text-center">
        <p className="text-xs sm:text-sm font-medium text-white">
          <strong className="text-cyan-glow">Our Promise:</strong> Every project is built with dedication and precision to create an experience you'll be proud to call your own.
        </p>
      </div>
    </div>
  );
}
