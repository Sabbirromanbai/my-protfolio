"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { timelineData } from "@/data/portfolioData";
import { TimelineCategory } from "@/types";
import {
  AcademicCapIcon,
  LightBulbIcon,
  BookOpenIcon,
  CalendarIcon,
  CheckCircleIcon,
} from "./Icons";

// ─── Config ──────────────────────────────────────────────────────────────────

const CATEGORY_CONFIG: Record<
  TimelineCategory,
  {
    gradient: string;
    iconBg: string;
    badgeBg: string;
    badgeText: string;
    Icon: React.ComponentType<{ className?: string }>;
  }
> = {
  education: {
    gradient: "from-indigo-500 to-violet-500",
    iconBg: "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/40",
    badgeBg: "bg-indigo-100 dark:bg-indigo-950/60",
    badgeText: "text-indigo-700 dark:text-indigo-300",
    Icon: AcademicCapIcon,
  },
  learning: {
    gradient: "from-violet-500 to-cyan-500",
    iconBg: "bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 border-violet-100 dark:border-violet-900/40",
    badgeBg: "bg-violet-100 dark:bg-violet-950/60",
    badgeText: "text-violet-700 dark:text-violet-300",
    Icon: LightBulbIcon,
  },
  experience: {
    gradient: "from-emerald-500 to-teal-500",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/40",
    badgeBg: "bg-emerald-100 dark:bg-emerald-950/60",
    badgeText: "text-emerald-700 dark:text-emerald-300",
    Icon: BookOpenIcon,
  },
};

// ─── Individual Timeline Card ─────────────────────────────────────────────────

interface CardProps {
  item: (typeof timelineData)[number];
  visible: boolean;
  delay: number;
}

function TimelineCard({ item, visible, delay }: CardProps) {
  const cfg = CATEGORY_CONFIG[item.category];
  const isSvg = item.imageUrl?.endsWith(".svg") ?? false;
  const isCover = item.imageFit === "cover" && !isSvg;
  const aspect = isSvg ? "aspect-[16/5]" : isCover ? "aspect-[16/9]" : "aspect-square";
  const objectFit = isCover ? "object-cover" : "object-contain";

  return (
    <div className="relative flex gap-4 pb-10 sm:gap-6">
      {/* ── Animated node on the continuous rail ────────────────────────── */}
      <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center sm:h-[52px] sm:w-[52px]">
        {/* Rotating ring (continuous, transform-only) */}
        <span
          aria-hidden="true"
          className="absolute inset-[-5px] rounded-2xl border border-dashed border-indigo-300/70 dark:border-indigo-500/50 opacity-80 animate-spin [animation-duration:9s] motion-reduce:animate-none"
        />
        {/* Expanding pulse ring (continuous, transform+opacity) */}
        <span aria-hidden="true" className="absolute inset-[-3px] rounded-2xl border border-indigo-400/50 dark:border-indigo-500/50">
          <span className="absolute inset-0 rounded-2xl border border-indigo-500/70 animate-ping opacity-40 motion-reduce:animate-none" />
        </span>
        {/* Glowing bubble (continuous) */}
        <div
          className={`animate-timeline-glow relative z-10 flex h-11 w-11 items-center justify-center rounded-xl border shadow-sm transition-transform duration-300 hover:scale-110 motion-reduce:transform-none ${cfg.iconBg}`}
        >
          <cfg.Icon className="h-5 w-5" />
        </div>
      </div>

      {/* ── Card body: image LEFT / info RIGHT on desktop, stacked on mobile ── */}
      <div
        style={{ transitionDelay: `${delay}ms` }}
        className={`tl-card group relative mb-0 flex-1 overflow-hidden rounded-2xl border border-zinc-200 bg-white/90 p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10 motion-reduce:transform-none sm:p-5 dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:bg-zinc-900 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        } motion-reduce:opacity-100 motion-reduce:translate-y-0`}
      >
        {/* Animated gradient border (continuous conic sweep, masked ring) */}
        <span aria-hidden="true" className="tl-card-ring pointer-events-none absolute inset-0 z-[-1] rounded-2xl" />

        <div className="flex flex-col gap-4 pr-0.5 sm:flex-row sm:gap-5">
          {/* Institution image — LEFT on desktop, ABOVE on mobile */}
          {item.imageUrl && (
            <div className="animate-timeline-float w-full shrink-0 self-center sm:w-40 md:w-44">
              <div className={`relative overflow-hidden rounded-xl border border-zinc-200/80 bg-white p-2 shadow-md shadow-indigo-500/10 dark:border-zinc-700/80 dark:bg-zinc-950 ${aspect} transition-transform duration-500 group-hover:[transform:perspective(700px)_rotateX(4deg)_rotateY(-5deg)] motion-reduce:transform-none`}>
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt ?? item.organisation}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 90vw, 176px"
                  className={objectFit}
                />
              </div>
            </div>
          )}

          {/* Education information — RIGHT on desktop, BELOW on mobile */}
          <div className="min-w-0 flex-1">
            {/* Header row */}
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${cfg.badgeBg} ${cfg.badgeText}`}>
                  {item.badge}
                </span>
                {item.current && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </span>
                    {item.badge === "Currently Learning" ? "In Progress" : "Ongoing"}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                <CalendarIcon className="h-3.5 w-3.5" />
                <span>{item.period}</span>
              </div>
            </div>

            {/* Title & Organisation */}
            <div className="mt-3">
              <h3 className="text-base font-bold text-zinc-900 transition-colors group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-400 sm:text-lg">
                {item.title}
              </h3>
              <p className="mt-0.5 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                {item.organisation}
              </p>
              {item.subtitle && (
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {item.subtitle}
                </p>
              )}
            </div>

            {/* Bullet points */}
            <ul className="mt-4 flex flex-col gap-2">
              {item.points.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500 dark:text-indigo-400" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function EducationExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      aria-label="Education and Experience"
      className="relative border-t border-zinc-200/80 bg-zinc-50/50 py-20 transition-colors sm:py-28 dark:border-zinc-800/80 dark:bg-zinc-950/40"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ──────────────────────────────────────────── */}
        <div
          className={`flex flex-col items-start transition-all duration-700 ease-out motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            My Background
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Education &amp;{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            My academic background, self-learning journey, and ongoing growth as a developer.
          </p>
          <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600" />
        </div>

        {/* ── Timeline with continuous flowing light rail ──────────────── */}
        <div className="relative mt-14">
          {/* Rail base (clearly visible in both themes) */}
          <div
            aria-hidden="true"
            className="absolute bottom-2 left-[21px] top-3 w-0.5 overflow-visible rounded-full bg-gradient-to-b from-zinc-300 via-indigo-200/80 to-zinc-200 dark:from-zinc-700 dark:via-indigo-500/40 dark:to-zinc-800 sm:left-[25.5px]"
          >
            {/* Bright flowing gradient light (continuous, transform-only) */}
            <span className="tl-beam animate-tl-beam absolute left-1/2 top-0 h-1/4 w-1 -translate-x-1/2 rounded-full motion-reduce:hidden" />
          </div>

          {timelineData.map((item, idx) => (
            <TimelineCard
              key={item.id}
              item={item}
              visible={isVisible}
              delay={idx * 120}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        /* Bright flowing light: bright gradient segment glowing while it travels */
        .tl-beam {
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(52, 211, 153, 0.9),
            rgba(99, 102, 241, 1),
            rgba(168, 85, 247, 0.9),
            rgba(34, 211, 238, 0.9),
            transparent
          );
          box-shadow: 0 0 18px 5px rgba(129, 140, 248, 0.45);
          filter: saturate(1.4);
        }
        @keyframes tl-beam-travel {
          0% { transform: translate(-50%, -100%); }
          100% { transform: translate(-50%, 400%); }
        }
        .animate-tl-beam {
          animation: tl-beam-travel 4.5s ease-in-out infinite;
        }

        /* Animated gradient border: masked conic ring sweep (transform-free, single element) */
        @property --tl-angle {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }
        @keyframes tl-ring-spin {
          to { --tl-angle: 360deg; }
        }
        .tl-card-ring {
          background: conic-gradient(
            from var(--tl-angle),
            transparent 0deg,
            rgba(99, 102, 241, 0.9) 70deg,
            rgba(168, 85, 247, 0.9) 130deg,
            rgba(34, 211, 238, 0.9) 190deg,
            transparent 260deg
          );
          padding: 1.5px;
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask-composite: exclude;
          animation: tl-ring-spin 6s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-tl-beam,
          .tl-card-ring {
            animation: none;
          }
          .tl-card-ring {
            background: linear-gradient(90deg, rgba(99,102,241,0.5), rgba(168,85,247,0.5), rgba(34,211,238,0.5));
          }
        }
      `}</style>
    </section>
  );
}
