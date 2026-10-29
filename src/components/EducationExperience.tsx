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
    Icon: React.ComponentType<{ className?: string }>;
  }
> = {
  education: {
    Icon: AcademicCapIcon,
  },
  learning: {
    Icon: LightBulbIcon,
  },
  experience: {
    Icon: BookOpenIcon,
  },
};

/**
 * One distinct but coordinated accent per timeline stage (applied in order,
 * cycling if more items are ever added). `rgb` is an "R G B" triplet consumed
 * by the CSS variables in globals.css; `ringRgb` drives the rotating conic
 * ring; `gradient`/`badge`/`orb` are static Tailwind strings so every class
 * stays scannable.
 */
const ITEM_ACCENTS = [
  {
    // SSC — indigo
    gradient: "from-indigo-500 to-violet-500",
    rgb: "99 102 241",
    ringRgb: "99 102 241",
    badge:
      "bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:ring-indigo-900/60",
    text: "text-indigo-600 dark:text-indigo-400",
    orb: "bg-indigo-400/20 dark:bg-indigo-500/25",
  },
  {
    // HSC — sky
    gradient: "from-sky-500 to-blue-500",
    rgb: "14 165 233",
    ringRgb: "56 189 248",
    badge:
      "bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:ring-sky-900/60",
    text: "text-sky-600 dark:text-sky-400",
    orb: "bg-sky-400/20 dark:bg-sky-500/25",
  },
  {
    // Started Web Development — violet
    gradient: "from-violet-500 to-fuchsia-500",
    rgb: "168 85 247",
    ringRgb: "168 85 247",
    badge:
      "bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200 dark:bg-violet-950/60 dark:text-violet-300 dark:ring-violet-900/60",
    text: "text-violet-600 dark:text-violet-400",
    orb: "bg-violet-400/20 dark:bg-violet-500/25",
  },
  {
    // Programming Hero — emerald
    gradient: "from-emerald-500 to-teal-500",
    rgb: "16 185 129",
    ringRgb: "52 211 153",
    badge:
      "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:ring-emerald-900/60",
    text: "text-emerald-600 dark:text-emerald-400",
    orb: "bg-emerald-400/20 dark:bg-emerald-500/25",
  },
] as const;

// ─── Individual Timeline Card ─────────────────────────────────────────────────

interface CardProps {
  item: (typeof timelineData)[number];
  accent: (typeof ITEM_ACCENTS)[number];
  visible: boolean;
  delay: number;
  index: number;
}

function TimelineCard({ item, accent, visible, delay, index }: CardProps) {
  const cfg = CATEGORY_CONFIG[item.category];
  const isSvg = item.imageUrl?.endsWith(".svg") ?? false;
  const isCover = item.imageFit === "cover" && !isSvg;
  const aspect = isSvg ? "aspect-[16/5]" : isCover ? "aspect-[16/9]" : "aspect-square";
  const objectFit = isCover ? "object-cover" : "object-contain";
  // Alternating sides on desktop: even rows sit left of the rail, odd rows right.
  const cardOnLeft = index % 2 === 0;

  return (
    <li className="relative pb-12 last:pb-0 sm:pb-16">
      {/* ── Timeline node on the central rail ─────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute left-[21.5px] top-8 z-10 -translate-x-1/2 sm:left-[25.5px] lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2"
      >
        <div className="relative flex h-11 w-11 items-center justify-center sm:h-[52px] sm:w-[52px]">
          {/* Soft halo */}
          <span
            className="absolute inset-[-4px] rounded-2xl blur-md"
            style={{ backgroundColor: `rgba(${accent.rgb} / 0.25)` }}
          />
          {/* Static ring */}
          <span className="absolute inset-[-4px] rounded-2xl border border-white/50 shadow-2xs dark:border-white/10" />
          {/* Expanding pulse for currently-active stages only */}
          {item.current && (
            <span className="absolute inset-[-2px] rounded-2xl border border-emerald-400/50">
              <span className="absolute inset-0 rounded-2xl border border-emerald-500/60 animate-ping opacity-40 motion-reduce:animate-none" />
            </span>
          )}
          {/* Gradient bubble with stage icon */}
          <div
            className={`relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-md ${accent.gradient}`}
            style={{ boxShadow: `0 6px 18px -6px rgba(${accent.rgb} / 0.65)` }}
          >
            <cfg.Icon className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* ── Connector stem (desktop only, rail → card) ────────────────────── */}
      <span
        aria-hidden="true"
        className={`hidden lg:block absolute top-1/2 h-px w-10 ${
          cardOnLeft ? "left-1/2" : "right-1/2"
        }`}
        style={{
          background: `linear-gradient(${cardOnLeft ? "90deg" : "270deg"}, rgba(${accent.rgb} / 0.5), transparent)`,
        }}
      />

      {/* ── Content column: full width on mobile, alternating half on desktop ── */}
      <div
        className={`relative isolate ml-12 sm:ml-14 lg:ml-0 lg:w-[calc(50%-2.75rem)] ${
          cardOnLeft ? "lg:mr-auto" : "lg:ml-auto"
        }`}
      >
        {/* Staggered entrance reveal (transform+opacity only) */}
        <div
          style={{ transitionDelay: `${delay}ms` }}
          className={`relative isolate transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          } motion-reduce:opacity-100 motion-reduce:translate-y-0`}
        >
          {/* Slow drifting ambient orb behind the card */}
          <span
            aria-hidden="true"
            className={`edu-orb pointer-events-none absolute -inset-5 -z-10 rounded-3xl blur-2xl ${accent.orb}`}
          />

          {/* ── Glass card ────────────────────────────────────────────────── */}
          <article
            className="edu-card group relative isolate overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/75 p-4 shadow-lg shadow-zinc-900/5 backdrop-blur-md sm:p-5 dark:border-zinc-800/70 dark:bg-zinc-900/60"
            style={{
              "--edu-accent": accent.rgb,
              "--edu-ring": accent.ringRgb,
            } as React.CSSProperties}
          >
            {/* Animated accent ring (masked 1px conic sweep) */}
            <span
              aria-hidden="true"
              className="edu-card-ring pointer-events-none absolute inset-0 z-10 rounded-3xl"
            />

            <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
              {/* Institution image — LEFT on desktop, ABOVE on mobile */}
              {item.imageUrl && (
                <div className="animate-timeline-float w-full shrink-0 self-center sm:w-40 md:w-44">
                  <div
                    className={`relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-md shadow-zinc-900/10 dark:border-zinc-700/80 dark:bg-zinc-950 ${aspect} transition-transform duration-500 ease-out group-hover:[transform:perspective(700px)_rotateX(4deg)_rotateY(-5deg)] motion-reduce:transform-none`}
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.imageAlt ?? item.organisation}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 88vw, 176px"
                      className={`${objectFit} transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100`}
                    />
                  </div>
                </div>
              )}

              {/* Information — RIGHT on desktop, BELOW on mobile */}
              <div className="min-w-0 flex-1">
                {/* Header row */}
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${accent.badge}`}
                    >
                      {item.badge}
                    </span>
                    {item.current && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:ring-emerald-900/60">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        </span>
                        {item.badge === "Currently Learning" ? "In Progress" : "Ongoing"}
                      </span>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200/80 bg-white/70 px-2.5 py-1 text-[11px] font-semibold text-zinc-600 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-300">
                    <CalendarIcon className="h-3.5 w-3.5 shrink-0" />
                    {item.period}
                  </span>
                </div>

                {/* Title & Organisation */}
                <div className="mt-3">
                  <h3
                    className={`text-base font-extrabold tracking-tight text-zinc-900 transition-colors duration-300 sm:text-lg dark:text-zinc-50 ${accent.text} group-hover:opacity-90`}
                  >
                    {item.title}
                  </h3>
                  <p className={`mt-0.5 text-sm font-semibold ${accent.text}`}>
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
                      <CheckCircleIcon className={`mt-0.5 h-4 w-4 shrink-0 ${accent.text}`} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </div>
      </div>
    </li>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function EducationExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
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

  // Scroll-linked timeline progress: the glowing fill grows down the rail as
  // the section scrolls into view. rAF-throttled, no re-renders.
  useEffect(() => {
    const rail = timelineRef.current;
    const fill = fillRef.current;
    if (!rail || !fill ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = rail.getBoundingClientRect();
      const total = rect.height;
      if (total <= 0) return;
      const revealed = Math.min(Math.max(window.innerHeight * 0.72 - rect.top, 0), total);
      fill.style.height = `${((revealed / total) * 100).toFixed(2)}%`;
    };
    const requestUpdate = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      aria-label="Education and Experience"
      className="relative isolate overflow-hidden border-t border-zinc-200/80 bg-zinc-50/60 py-20 transition-colors sm:py-28 dark:border-zinc-800/80 dark:bg-zinc-950/40"
    >
      {/* Ambient section glows (slow drift) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="edu-ambient-a absolute left-[-9rem] top-24 h-72 w-72 rounded-full bg-violet-400/10 blur-3xl dark:bg-violet-600/10" />
        <div className="edu-ambient-b absolute right-[-9rem] bottom-24 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-500/10" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ──────────────────────────────────────────── */}
        <div
          className={`flex flex-col items-start transition-all duration-700 ease-out motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
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

        {/* ── Timeline: rail centered on desktop, left on mobile ─────────── */}
        <div ref={timelineRef} className="relative mt-14">
          {/* Rail base */}
          <div
            aria-hidden="true"
            className="absolute bottom-4 left-[21.5px] top-4 w-0.5 rounded-full bg-gradient-to-b from-zinc-300 via-indigo-200/60 to-zinc-200 dark:from-zinc-700 dark:via-indigo-500/30 dark:to-zinc-800 sm:left-[25.5px] lg:left-1/2 lg:-translate-x-1/2"
          >
            {/* Scroll-linked progress fill (grows as the timeline enters view) */}
            <span
              ref={fillRef}
              className="absolute inset-x-0 top-0 h-0 overflow-hidden rounded-full bg-gradient-to-b from-indigo-500 via-violet-500 to-cyan-500 shadow-[0_0_12px_2px_rgba(99,102,241,0.35)]"
            />
            {/* Bright flowing beam riding the fill (continuous, transform-only) */}
            <span className="edu-beam animate-edu-beam absolute left-1/2 top-0 h-1/4 w-[3px] motion-reduce:hidden" />
          </div>

          <ol className="list-none">
            {timelineData.map((item, idx) => (
              <TimelineCard
                key={item.id}
                item={item}
                index={idx}
                accent={ITEM_ACCENTS[idx % ITEM_ACCENTS.length]}
                visible={isVisible}
                delay={idx * 140}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
