"use client";

import React, { useEffect, useRef, useState } from "react";
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
  isLast: boolean;
}

function TimelineCard({ item, visible, delay, isLast }: CardProps) {
  const cfg = CATEGORY_CONFIG[item.category];

  return (
    <div className="relative flex gap-4 sm:gap-6">
      {/* ── Vertical timeline track ─────────────────────────────────────── */}
      <div className="flex flex-col items-center">
        {/* Icon bubble */}
        <div
          className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border shadow-sm transition-transform duration-300 hover:scale-110 motion-reduce:transform-none ${cfg.iconBg}`}
        >
          {/* Gradient top accent on icon bubble */}
          <div
            className={`absolute inset-x-0 top-0 h-1 rounded-t-xl bg-gradient-to-r ${cfg.gradient} opacity-0 transition-opacity duration-300`}
            aria-hidden="true"
          />
          <cfg.Icon className="h-5 w-5" />
        </div>

        {/* Connecting line below icon */}
        {!isLast && (
          <div className="mt-2 w-px flex-1 bg-gradient-to-b from-zinc-300 to-zinc-100 dark:from-zinc-700 dark:to-zinc-900" />
        )}
      </div>

      {/* ── Card body ───────────────────────────────────────────────────── */}
      <div
        style={{ transitionDelay: `${delay}ms` }}
        className={`group mb-10 flex-1 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/90 p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-500/5 motion-reduce:transform-none sm:p-6 dark:border-zinc-800/80 dark:bg-zinc-900/80 dark:hover:border-indigo-500/50 dark:hover:bg-zinc-900 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        } motion-reduce:opacity-100 motion-reduce:translate-y-0`}
      >
        {/* Gradient top border on hover */}
        <div
          className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${cfg.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
          aria-hidden="true"
        />

        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {/* Category badge */}
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${cfg.badgeBg} ${cfg.badgeText}`}
            >
              {item.badge}
            </span>

            {/* "Ongoing" pill */}
            {item.current && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                Ongoing
              </span>
            )}
          </div>

          {/* Period */}
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
          <p className="mt-0.5 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {item.organisation}
          </p>
          {item.subtitle && (
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
              {item.subtitle}
            </p>
          )}
        </div>

        {/* Bullet points */}
        <ul className="mt-4 flex flex-col gap-2">
          {item.points.map((point) => (
            <li key={point} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500 dark:text-indigo-400" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
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
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

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

        {/* ── Timeline ────────────────────────────────────────────────── */}
        <div className="mt-14 max-w-3xl">
          {timelineData.map((item, idx) => (
            <TimelineCard
              key={item.id}
              item={item}
              visible={isVisible}
              delay={idx * 120}
              isLast={idx === timelineData.length - 1}
            />
          ))}
        </div>

        {/* ── Edit hint (dev-only style note) ─────────────────────────── */}
      </div>
    </section>
  );
}
