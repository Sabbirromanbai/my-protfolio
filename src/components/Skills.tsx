"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon } from "./Icons";
import { skillsByCategory, skillCategoryIcons, skillCategories, type SkillCategoryId } from "@/data/skills";

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  // `hasAppeared` latches the entrance reveal; `onScreen` lets us pause the
  // continuous decorative animations while the section is off-screen.
  const [hasAppeared, setHasAppeared] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<SkillCategoryId>("frontend");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setOnScreen(entry.isIntersecting);
        if (entry.isIntersecting) setHasAppeared(true);
      },
      { threshold: 0.08 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  // Subtle 3D tilt: one delegated pointer listener on the grid (no per-card
  // handlers). Desktop pointers only, and never when reduced motion is set.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    let raf = 0;
    let currentCard: HTMLElement | null = null;

    const MAX_TILT = 4; // degrees — keeps the effect subtle

    const resetCard = (card: HTMLElement) => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const card = (event.target as HTMLElement | null)?.closest?.("[data-tilt]");
      if (!(card instanceof HTMLElement)) return;

      if (currentCard && currentCard !== card) resetCard(currentCard);
      currentCard = card;

      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.setProperty("--tilt-x", `${(-py * MAX_TILT).toFixed(2)}deg`);
        card.style.setProperty("--tilt-y", `${(px * MAX_TILT).toFixed(2)}deg`);
      });
    };

    const onLeaveGrid = () => {
      cancelAnimationFrame(raf);
      if (currentCard) {
        resetCard(currentCard);
        currentCard = null;
      }
    };

    grid.addEventListener("pointermove", onMove);
    grid.addEventListener("pointerleave", onLeaveGrid);
    return () => {
      cancelAnimationFrame(raf);
      grid.removeEventListener("pointermove", onMove);
      grid.removeEventListener("pointerleave", onLeaveGrid);
      if (currentCard) resetCard(currentCard);
    };
  }, []);

  const active = skillsByCategory.find((category) => category.id === activeCategory);
  if (!active) return null;
  const ActiveCategoryIcon = skillCategoryIcons[active.id];

  const reveal = hasAppeared
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-4";

  return (
    <section
      ref={sectionRef}
      id="skills"
      aria-label="My Skills"
      className={`relative isolate overflow-hidden border-t border-zinc-200/80 bg-white py-20 transition-colors sm:py-28 dark:border-zinc-800/80 dark:bg-zinc-950 ${
        hasAppeared && !onScreen ? "skills-anim-paused" : ""
      }`}
    >
      {/* Slow ambient gradient glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="skills-glow-a absolute left-[-10rem] top-10 h-72 w-72 rounded-full bg-violet-400/10 blur-3xl dark:bg-violet-600/10" />
        <div className="skills-glow-b absolute right-[-8rem] bottom-16 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-500/10" />
      </div>

      <div className="@container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header reveal */}
        <div
          className={`flex flex-col items-start transition-all duration-700 ease-out motion-reduce:opacity-100 motion-reduce:translate-y-0 ${reveal}`}
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
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
          className={`mt-10 flex flex-wrap gap-2.5 transition-all duration-700 ease-out motion-reduce:opacity-100 motion-reduce:translate-y-0 ${reveal}`}
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
                className={`group inline-flex min-h-11 items-center gap-2 rounded-xl border border-zinc-200/90 bg-zinc-50/80 px-3.5 py-2 text-xs font-bold shadow-2xs backdrop-blur-sm transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-95 motion-reduce:transform-none sm:text-sm dark:border-zinc-800 dark:bg-zinc-900/60 ${
                  isActive
                    ? "border-transparent bg-linear-to-r text-white shadow-md shadow-indigo-950/20"
                    : "text-zinc-700 hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600 dark:text-zinc-200 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
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
          {/* Panel header */}
          <div
            className={`flex flex-wrap items-center gap-3 rounded-2xl border border-zinc-200/70 bg-white/60 px-4 py-3 shadow-2xs backdrop-blur-sm transition-all duration-700 ease-out dark:border-zinc-800/70 dark:bg-zinc-900/50 ${reveal} motion-reduce:opacity-100 motion-reduce:translate-y-0`}
          >
            <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200/80 bg-white shadow-2xs dark:border-zinc-800 dark:bg-zinc-800/80 ${active.iconClass}`}>
              <ActiveCategoryIcon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-zinc-900 sm:text-lg dark:text-zinc-50">{active.title}</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{active.description}</p>
            </div>
            <span className="ml-auto text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
              {active.skills.length} skills — tap a card for details
            </span>
          </div>

          {/* Grid: 1 column on very narrow screens, 2 on typical mobile,
              a third column once the container is wide enough (tablet/desktop).
              Container queries react to real available space, not viewport. */}
          <ul
            ref={gridRef}
            className="mt-5 grid grid-cols-1 gap-4 @xs:grid-cols-2 @3xl:grid-cols-3"
            aria-label={`${active.title} skills`}
          >
            {active.skills.map((skill, idx) => (
              <li key={skill.slug} className="skill-reveal" style={{ animationDelay: `${(idx % 9) * 65}ms` }}>
                <Link
                  href={`/skills/${skill.slug}`}
                  aria-label={`View details of ${skill.name}`}
                  data-tilt
                  className="skills-card group relative isolate block h-full cursor-pointer rounded-2xl bg-linear-to-br from-zinc-200/90 via-zinc-100 to-zinc-200/90 p-px shadow-sm outline-none hover:shadow-lg hover:shadow-indigo-500/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:from-zinc-800/90 dark:via-zinc-800 dark:to-zinc-800/90 dark:hover:shadow-indigo-950/40"
                >
                  {/* Hover border glow: accent gradient ring (masked to the 1px edge) */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 rounded-2xl p-px bg-linear-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100 [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] ${active.accentGradient}`}
                  />
                  {/* Always-on soft ambient glow inside the card (slow drift) */}
                  <span
                    aria-hidden="true"
                    className={`skills-ambient pointer-events-none absolute -inset-1.5 -z-10 rounded-3xl bg-linear-to-br blur-xl ${active.accentGradient}`}
                  />

                  {/* Glass card body */}
                  <div className="relative flex h-full flex-col overflow-hidden rounded-[15px] bg-white/75 p-4 backdrop-blur-md sm:p-5 dark:bg-zinc-950/75">
                    {/* Animated shine sweep on hover */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-0 top-0 h-full w-1/3 -translate-x-full skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-[transform,opacity] duration-700 ease-out group-hover:translate-x-[420%] group-hover:opacity-100 dark:via-white/10"
                    />

                    <div className="flex items-start justify-between gap-3">
                      <span aria-hidden="true" className="skills-float inline-flex" style={{ animationDelay: `${(idx % 5) * 320}ms` }}>
                        <span
                          className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-white to-zinc-100 shadow-sm ring-1 ring-zinc-200/70 transition-transform duration-300 group-hover:rotate-2 group-hover:scale-110 group-active:scale-95 motion-reduce:transform-none dark:from-zinc-800 dark:to-zinc-900 dark:ring-zinc-700/60 ${skill.iconClass}`}
                        >
                          <skill.Icon className="h-6 w-6" />
                        </span>
                      </span>
                      <ArrowUpRightIcon className="h-4 w-4 shrink-0 text-zinc-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 motion-reduce:transform-none" />
                    </div>

                    <h4 className="mt-4 text-[15px] font-bold tracking-tight text-zinc-900 transition-colors duration-300 group-hover:text-indigo-600 sm:text-base dark:text-zinc-100 dark:group-hover:text-indigo-400">
                      {skill.name}
                    </h4>
                    <p className="@max-xs:line-clamp-2 mt-1.5 flex-1 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
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
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
