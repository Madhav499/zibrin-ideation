"use client";

import React from "react";
import { Sparkles, Target, Compass, Award, Heart, CheckCircle2, Shield, Flame, Users, Eye } from "lucide-react";

export default function AboutSpatialPlane() {
  const coreValues = [
    {
      title: "Vision First",
      desc: "Every project begins with your vision. We listen, understand, and transform your ideas into digital experiences that truly represent your brand.",
      icon: Eye,
      color: "from-cyan-glow to-electric-blue",
    },
    {
      title: "Creativity Without Limits",
      desc: "We don't believe in ordinary solutions. Every website, application, and digital product is crafted with originality, innovation, and purpose.",
      icon: Flame,
      color: "from-electric-blue to-neon-violet",
    },
    {
      title: "Quality in Every Pixel",
      desc: "From strategy to launch, every detail is carefully designed, developed, and tested to deliver a premium digital experience.",
      icon: Award,
      color: "from-neon-violet to-cyan-glow",
    },
    {
      title: "Innovation",
      desc: "We continuously explore new technologies, AI, design trends, and development practices to create solutions that are ready for tomorrow.",
      icon: Sparkles,
      color: "from-cyan-glow to-neon-violet",
    },
    {
      title: "Partnership",
      desc: "Your success is our success. We work as an extension of your team, building long-term relationships through trust, collaboration, and shared goals.",
      icon: Users,
      color: "from-electric-blue to-cyan-glow",
    },
    {
      title: "Transparency",
      desc: "Clear communication, honest timelines, and complete project visibility—so you're always confident in every step of the journey.",
      icon: Shield,
      color: "from-neon-violet to-electric-blue",
    },
    {
      title: "Excellence",
      desc: "Good isn't enough. We challenge ourselves to deliver experiences that exceed expectations and leave a lasting impression.",
      icon: Target,
      color: "from-gold-accent to-cyan-glow",
    },
    {
      title: "Client Focus",
      desc: "Your ideas inspire everything we build. Every decision, every feature, and every experience is shaped around your goals and your vision.",
      icon: Heart,
      color: "from-cyan-glow to-electric-blue",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-6 flex flex-col items-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-violet/10 border border-neon-violet/30 backdrop-blur-md mb-4">
        <Sparkles className="w-4 h-4 text-neon-violet" />
        <span className="text-xs font-mono tracking-widest text-neon-violet uppercase font-semibold">
          ABOUT US // YOUR TRUSTED DIGITAL PARTNER
        </span>
      </div>

      {/* Main Heading */}
      <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight text-white mb-4 text-center">
        About Zibrininfotech: <span className="bg-gradient-to-r from-neon-violet via-cyan-glow to-electric-blue bg-clip-text text-transparent">Your Trusted Digital Partner</span>
      </h2>

      {/* Story Banner */}
      <div className="w-full p-6 rounded-2xl bg-space-black/70 border border-white/10 backdrop-blur-xl mb-8">
        <h3 className="text-xl font-bold font-syne text-cyan-glow mb-2">Our Story</h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed font-light">
          Behind every business is a dream, countless hours of dedication, and someone who believed in an idea before anyone else did. Our purpose is to honour that journey by transforming your vision into immersive digital experiences that don't just showcase your work—they make people feel the passion behind it. Because the future isn't built by technology alone; it's built by the people courageous enough to imagine something different.
        </p>
      </div>

      {/* Mission & Vision Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-8">
        <div className="p-6 rounded-2xl bg-space-black/70 border border-cyan-glow/20 backdrop-blur-xl hover:border-cyan-glow/50 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-cyan-glow/10 border border-cyan-glow/30 text-cyan-glow">
              <Target className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold font-syne text-white">Our Mission</h4>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed font-light">
            Our mission is to transform static websites into living digital experiences where design, technology, and storytelling work together to create lasting impressions.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-space-black/70 border border-neon-violet/20 backdrop-blur-xl hover:border-neon-violet/50 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-neon-violet/10 border border-neon-violet/30 text-neon-violet">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold font-syne text-white">Our Vision</h4>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed font-light">
            We envision a future where every business can present its work exactly as it was imagined—without limits, without compromise, and with complete creative freedom.
          </p>
        </div>
      </div>

      {/* Core Values Grid */}
      <div className="w-full mb-6">
        <h3 className="text-xl font-bold font-syne text-white mb-4 text-center">Our Core Values</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {coreValues.map((v, idx) => {
            const IconComp = v.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-space-black/60 border border-white/10 backdrop-blur-lg hover:border-cyan-glow/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 w-fit text-cyan-glow mb-3">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <h5 className="text-base font-bold font-syne text-white mb-2">{v.title}</h5>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">{v.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Our Promise Banner */}
      <div className="w-full p-4 rounded-xl bg-gradient-to-r from-cyan-glow/10 via-neon-violet/10 to-electric-blue/10 border border-cyan-glow/30 backdrop-blur-md text-center">
        <p className="text-sm md:text-base font-medium text-white">
          <strong className="text-cyan-glow">Our Promise:</strong> Every project is built with dedication, precision, and genuine care. Our promise is simple: to create a digital experience you'll be proud to call your own.
        </p>
      </div>
    </div>
  );
}
