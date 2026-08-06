"use client";

import React from "react";
import { Sparkles, Search, Compass, Palette, Code, CheckCircle, Rocket, HelpCircle } from "lucide-react";

export default function ProcessSpatialPlane() {
  const steps = [
    {
      num: "01",
      title: "Discover",
      desc: "Tell us about your idea, business, or project. Share your vision, goals, and requirements with us. We'll understand your needs, explore creative possibilities, and provide the best direction to bring your idea to life.",
      note: "Connect via WhatsApp, phone, or email within 24 hours.",
      icon: Search,
    },
    {
      num: "02",
      title: "Research & Strategy",
      desc: "We research your industry, competitors, and target audience to understand what makes your business unique. Based on these insights, we create a strategic roadmap that defines the project's goals, UX, tech stack, features, and future scalability.",
      icon: Compass,
    },
    {
      num: "03",
      title: "Design",
      desc: "Design is more than appearance—it's the first impression of your brand. We transform ideas into modern, immersive, and intuitive interfaces that combine creativity with usability. We refine iteratively until you are completely satisfied.",
      icon: Palette,
    },
    {
      num: "04",
      title: "Development",
      desc: "Once the design is approved, our development team brings it to life using modern technologies and industry best practices. We build fast, secure, scalable, and high performance digital solutions with clean architecture.",
      icon: Code,
    },
    {
      num: "05",
      title: "Review & Refinement",
      desc: "Excellence is achieved through continuous improvement. Every feature undergoes rigorous testing for functionality, performance, security, responsiveness, and user experience to ensure it exceeds expectations before launch.",
      icon: CheckCircle,
    },
    {
      num: "06",
      title: "Launch & Growth",
      desc: "Launching your project is only the beginning of our partnership. We ensure a smooth deployment, monitor performance, resolve post-launch issues, and provide continuous support and strategic improvements.",
      icon: Rocket,
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-col items-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-accent/10 border border-gold-accent/30 backdrop-blur-md mb-3">
        <Sparkles className="w-3.5 h-3.5 text-gold-accent" />
        <span className="text-[11px] font-mono tracking-widest text-gold-accent uppercase font-semibold">
          METHODOLOGY // FROM ENQUIRY TO DELIVERY
        </span>
      </div>

      {/* Main Heading */}
      <h2 className="text-2xl md:text-4xl font-bold font-syne tracking-tight text-white mb-3 text-center">
        From Enquiry to Delivery: <span className="bg-gradient-to-r from-gold-accent via-cyan-glow to-electric-blue bg-clip-text text-transparent">Our 6-Step Process</span>
      </h2>

      {/* Hero Banner */}
      <div className="w-full p-4 rounded-xl bg-space-black/70 border border-white/10 backdrop-blur-xl mb-5 text-center">
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-light">
          Great experiences aren't built by chance—they're built through a process. Every project follows a structured journey, ensuring clarity, creativity, and quality from the first conversation to the final launch.
        </p>
      </div>

      {/* Responsive 3x2 Grid (Desktop 3cols, Tablet 2cols, Mobile 1col) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 w-full mb-5">
        {steps.map((step, idx) => {
          const IconComp = step.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-xl bg-space-black/60 border border-white/10 backdrop-blur-xl hover:border-cyan-glow/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-bold font-mono text-cyan-glow group-hover:scale-110 transition-transform">
                    {step.num}
                  </span>
                  <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-cyan-glow">
                    <IconComp className="w-3.5 h-3.5" />
                  </div>
                </div>
                <h3 className="text-sm font-bold font-syne text-white mb-1.5">{step.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-light mb-2">
                  {step.desc}
                </p>
              </div>
              {step.note && (
                <div className="mt-1.5 p-1.5 rounded-lg bg-cyan-glow/10 border border-cyan-glow/20 text-[10px] font-mono text-cyan-glow">
                  {step.note}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Consulting Section */}
      <div className="w-full p-4 rounded-xl bg-gradient-to-r from-space-black via-space-black to-space-black/90 border border-gold-accent/30 backdrop-blur-xl text-left">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="p-1.5 rounded-lg bg-gold-accent/10 border border-gold-accent/30 text-gold-accent">
            <HelpCircle className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold font-syne text-white">We Help You Launch</h3>
        </div>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-light">
          Building a website is only the beginning. Our consultancy goes beyond that—we help you create a complete digital presence that strengthens your brand, reaches the right audience, and supports long-term business growth. From digital marketing strategies and online branding to business consultation and growth planning, we work alongside you to turn your vision into lasting digital success.
        </p>
      </div>
    </div>
  );
}
