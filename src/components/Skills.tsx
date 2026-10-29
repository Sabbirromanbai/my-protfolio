"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon } from "./Icons";
import { skillsByCategory, skillCategoryIcons, skillCategories, type SkillCategoryId } from "@/data/skills";

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<SkillCategoryId>("frontend");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const active = skillsByCategory.find((category) => category.id === activeCategory);
  if (!active) return null;
  const ActiveCategoryIcon = skillCategoryIcons[active.id];

  return (
    <section
      ref={sectionRef}
      id="skills"
      aria-label="My Skills"
      className="relative isolate overflow-hidden border-t border-zinc-200/80 bg-white py-20 transition-colors sm:py-28 dark:border-zinc-800/80 dark:bg-zinc-950"
    >
      {/* Ambient gradient glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10rem] top-10 h-72 w-72 rounded-full bg-violet-400/10 blur-3xl dark:bg-violet-600/10" />
        <div className="absolute right-[-8rem] bottom-16 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-500/10" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header with Fade-in Effect */}
        <div
          className={`flex flex-col items-start transition-all duration-700 ease-out motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Technical Competencies
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Skills{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent">
              Explorer
            </span>
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Pick a category to explore the technologies I use and learn — every skill opens a detail page with real context.
          </p>
          <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600" />
        </div>

        {/* Category tabs (click/tap — never hover-dependent) */}
        <div
          role="tablist"
          aria-label="Skill categories"
          className={`mt-10 flex flex-wrap gap-2.5 transition-all duration-700 ease-out motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {skillCategories.map((category) => {
            const TabIcon = skillCategoryIcons[category.id];
            const isActive = category.id === activeCategory;
            return (
              <button
                key={category.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`skills-panel-${category.id}`}
                id={`skills-tab-${category.id}`}
                onClick={() => setActiveCategory(category.id)}
                className={`group inline-flex min-h-11 items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-95 motion-reduce:transform-none sm:text-sm ${
                  isActive
                    ? "border-transparent bg-linear-to-r text-white shadow-md shadow-indigo-950/20"
                    : "border-zinc-200/90 bg-zinc-50 text-zinc-700 hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600 dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-200 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
                } ${isActive ? category.accentGradient : ""}`}
              >
                <span className={`transition-transform duration-200 group-hover:scale-110 group-active:scale-95 motion-reduce:transform-none ${isActive ? "text-white" : category.iconClass}`}>
                  <TabIcon className="h-4 w-4" />
                </span>
                {category.title}
              </button>
            );
          })}
        </div>

        {/* Active category panel with staggered skill cards */}
        <div
          key={active.id}
          role="tabpanel"
          id={`skills-panel-${active.id}`}
          aria-labelledby={`skills-tab-${active.id}`}
          className="mt-8"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-900 ${active.iconClass}`}>
              <ActiveCategoryIcon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{active.title}</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{active.description}</p>
            </div>
            <span className="ml-auto text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
              {active.skills.length} skills — tap a card for details
            </span>
          </div>

          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label={`${active.title} skills`}>
            {active.skills.map((skill, idx) => (
              <li key={skill.slug} className="skill-reveal" style={{ animationDelay: `${idx * 70}ms` }}>
                <Link
                  href={`/skills/${skill.slug}`}
                  aria-label={`View details of ${skill.name}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/70 p-5 shadow-xs backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-500/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none dark:border-zinc-800/80 dark:bg-zinc-900/70 dark:backdrop-blur-sm dark:hover:border-indigo-500 dark:hover:shadow-indigo-950/30"
                >
                  {/* Gradient top accent */}
                  <div aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${active.accentGradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-zinc-200/80 bg-white shadow-2xs transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 group-active:scale-95 motion-reduce:transform-none dark:border-zinc-800 dark:bg-zinc-800/90 ${skill.iconClass}`}
                    >
                      <skill.Icon className="h-6 w-6" />
                    </span>
                    <ArrowUpRightIcon className="h-4 w-4 text-zinc-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 motion-reduce:transform-none" />
                  </div>

                  <h4 className="mt-4 text-base font-bold text-zinc-900 transition-colors group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-400">
                    {skill.name}
                  </h4>
                  <p className="mt-1.5 flex-1 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
                    {skill.overview}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-zinc-200/60 pt-3 text-[11px] dark:border-zinc-800/60">
                    <span
                      className={`inline-flex items-center gap-1.5 font-semibold ${
                        skill.status === "Comfortable"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : skill.status === "Learning"
                            ? "text-indigo-600 dark:text-indigo-400"
                            : "text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${skill.status === "Comfortable" ? "bg-emerald-500" : skill.status === "Learning" ? "bg-indigo-500" : "bg-amber-500"}`} />
                      {skill.status}
                    </span>
                    {skill.relatedProjects.length > 0 && (
                      <span className="text-zinc-500 dark:text-zinc-400">
                        in {skill.relatedProjects.length} project{skill.relatedProjects.length > 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style jsx>{`
        @keyframes skillReveal {
          from { opacity: 0; transform: translateY(14px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .skill-reveal {
          opacity: 0;
        }
        .skill-reveal > a {
          height: 100%;
        }
        .skill-reveal {
          animation: skillReveal 450ms cubic-bezier(0.2, 0.75, 0.25, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .skill-reveal {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
