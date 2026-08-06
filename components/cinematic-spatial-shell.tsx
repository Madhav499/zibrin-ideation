"use client";

import React from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { TransitionLink } from "@/providers/transition-provider";

interface SpatialCard {
  title: string;
  description: string;
  href?: string;
  accent?: "cyan" | "blue" | "violet";
}

interface SpatialStat {
  label: string;
  value: string;
}

interface CinematicSpatialShellProps {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  stats?: SpatialStat[];
  cards?: SpatialCard[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  children?: React.ReactNode;
}

const accentClasses: Record<NonNullable<SpatialCard["accent"]>, string> = {
  cyan: "border-cyan-glow/30 bg-cyan-glow/10 text-cyan-glow",
  blue: "border-electric-blue/30 bg-electric-blue/10 text-electric-blue",
  violet: "border-neon-violet/30 bg-neon-violet/10 text-neon-violet",
};

export default function CinematicSpatialShell({
  eyebrow,
  title,
  description,
  stats,
  cards,
  primaryCta,
  secondaryCta,
  children,
}: CinematicSpatialShellProps) {
  return (
    <section className="relative min-h-screen px-4 py-24 md:px-8 md:py-28 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(63,242,255,0.12),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(139,92,255,0.16),transparent_38%),linear-gradient(135deg,rgba(5,7,15,0.94),rgba(5,7,15,0.75))]" />

      <div className="relative mx-auto flex min-h-[78vh] w-full max-w-7xl flex-col justify-center rounded-[2rem] border border-white/10 bg-space-black/55 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:p-8 lg:p-10">
        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:items-center">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-[0.35em] text-neutral-300">
              <Sparkles className="h-3.5 w-3.5 text-cyan-glow" />
              <span>{eyebrow}</span>
            </div>

            <div className="max-w-3xl space-y-4">
              <h1 className="text-4xl font-syne font-extrabold uppercase leading-[0.9] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-neutral-300 sm:text-lg">
                {description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {primaryCta ? (
                <TransitionLink
                  href={primaryCta.href}
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-glow/35 bg-cyan-glow/10 px-4 py-2 text-[11px] font-mono font-semibold uppercase tracking-[0.3em] text-cyan-glow transition hover:bg-cyan-glow/20"
                >
                  <span>{primaryCta.label}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </TransitionLink>
              ) : null}

              {secondaryCta ? (
                <TransitionLink
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-mono font-semibold uppercase tracking-[0.3em] text-neutral-200 transition hover:border-electric-blue/40 hover:text-white"
                >
                  <span>{secondaryCta.label}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </TransitionLink>
              ) : null}
            </div>

            {stats && stats.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xl font-orbitron font-semibold text-white">{stat.value}</div>
                    <div className="mt-1 text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="space-y-4">
            {cards && cards.length > 0
              ? cards.map((card) => (
                  <div
                    key={card.title}
                    className={`rounded-[1.4rem] border p-5 shadow-[0_20px_50px_rgba(0,0,0,0.25)] ${accentClasses[card.accent ?? "cyan"]}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-orbitron font-semibold uppercase tracking-[0.2em] text-white">
                          {card.title}
                        </h2>
                        <p className="mt-2 text-sm leading-7 text-neutral-300">{card.description}</p>
                      </div>
                      {card.href ? (
                        <TransitionLink href={card.href} className="mt-1 text-cyan-glow">
                          <ArrowUpRight className="h-4 w-4" />
                        </TransitionLink>
                      ) : null}
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>

        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
