"use client";

import React, { useEffect, useRef, useState } from "react";
import { FrontendIcon, ServerIcon, DatabaseIcon, ToolsIcon, GithubIcon } from "./Icons";
import {
  HtmlIcon,
  CssIcon,
  JsIcon,
  TsIcon,
  ReactIcon,
  NextjsIcon,
  TailwindIcon,
  NodeIcon,
  ExpressIcon,
  ApiIcon,
  MongoIcon,
  MongooseIcon,
  AuthIcon,
  GitIcon,
  VscodeIcon,
  NpmIcon,
} from "./TechIcons";

interface TechSkill {
  name: string;
  Icon: React.ComponentType<{ className?: string }>;
}

interface SkillCategory {
  title: string;
  description: string;
  CategoryIcon: React.ComponentType<{ className?: string }>;
  accentGradient: string;
  badgeGlow: string;
  skills: TechSkill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    description: "Building responsive, modern, and accessible user interfaces.",
    CategoryIcon: FrontendIcon,
    accentGradient: "from-indigo-500 to-cyan-500",
    badgeGlow: "group-hover:border-indigo-400/60 dark:group-hover:border-indigo-500/50",
    skills: [
      { name: "HTML5", Icon: HtmlIcon },
      { name: "CSS3", Icon: CssIcon },
      { name: "JavaScript", Icon: JsIcon },
      { name: "TypeScript", Icon: TsIcon },
      { name: "React", Icon: ReactIcon },
      { name: "Next.js", Icon: NextjsIcon },
      { name: "Tailwind CSS", Icon: TailwindIcon },
    ],
  },
  {
    title: "Backend",
    description: "Developing server-side logic, routing, and RESTful web services.",
    CategoryIcon: ServerIcon,
    accentGradient: "from-violet-500 to-indigo-500",
    badgeGlow: "group-hover:border-violet-400/60 dark:group-hover:border-violet-500/50",
    skills: [
      { name: "Node.js", Icon: NodeIcon },
      { name: "Express.js", Icon: ExpressIcon },
      { name: "REST APIs", Icon: ApiIcon },
    ],
  },
  {
    title: "Database & Authentication",
    description: "Structuring persistent data models and secure auth systems.",
    CategoryIcon: DatabaseIcon,
    accentGradient: "from-cyan-500 to-emerald-500",
    badgeGlow: "group-hover:border-cyan-400/60 dark:group-hover:border-cyan-500/50",
    skills: [
      { name: "MongoDB", Icon: MongoIcon },
      { name: "Mongoose", Icon: MongooseIcon },
      { name: "Better Auth", Icon: AuthIcon },
    ],
  },
  {
    title: "Tools & Workflow",
    description: "Version control, package management, and developer environments.",
    CategoryIcon: ToolsIcon,
    accentGradient: "from-emerald-500 to-teal-500",
    badgeGlow: "group-hover:border-emerald-400/60 dark:group-hover:border-emerald-500/50",
    skills: [
      { name: "Git", Icon: GitIcon },
      { name: "GitHub", Icon: GithubIcon },
      { name: "VS Code", Icon: VscodeIcon },
      { name: "npm", Icon: NpmIcon },
    ],
  },
];

export default function Skills() {
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

  return (
    <section
      ref={sectionRef}
      id="skills"
      aria-label="My Skills"
      className="relative border-t border-zinc-200/80 bg-white py-20 transition-colors sm:py-28 dark:border-zinc-800/80 dark:bg-zinc-950"
    >
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
            My{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Technologies I&apos;m learning and using to build web applications.
          </p>
          <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600" />
        </div>

        {/* 4-Category Grid with Staggered Fade-in and Upward Entrance */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {skillCategories.map(
            ({ title, description, CategoryIcon, accentGradient, badgeGlow, skills }, idx) => {
              // Staggered delays: 100ms, 200ms, 300ms, 400ms
              const transitionDelay = `${idx * 100}ms`;

              return (
                <div
                  key={title}
                  style={{ transitionDelay }}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-6 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-400 hover:bg-white hover:shadow-lg hover:shadow-indigo-500/5 motion-reduce:transform-none motion-reduce:transition-none sm:p-7 dark:border-zinc-800/80 dark:bg-zinc-900/60 dark:hover:bg-zinc-900 ${badgeGlow} ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                >
                  {/* Subtle top decorative border accent */}
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accentGradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                    aria-hidden="true"
                  />

                  <div>
                    {/* Header: Category Icon & Title */}
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-200/80 bg-white p-2.5 shadow-2xs transition-transform duration-300 group-hover:scale-110 group-hover:rotate-1 motion-reduce:transform-none dark:border-zinc-800 dark:bg-zinc-800/90 text-indigo-600 dark:text-indigo-400">
                        <CategoryIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-zinc-900 transition-colors group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-400">
                          {title}
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          {description}
                        </p>
                      </div>
                    </div>

                    {/* Skill Badges with Colorful Brand Icons */}
                    <div className="mt-6">
                      <ul
                        aria-label={`${title} skills`}
                        className="flex flex-wrap gap-2.5"
                      >
                        {skills.map(({ name, Icon }) => (
                          <li
                            key={name}
                            className="group/badge inline-flex items-center gap-2 rounded-xl border border-zinc-200/90 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-800 shadow-2xs transition-all duration-200 hover:scale-105 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-xs motion-reduce:transform-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
                          >
                            <span className="transition-transform duration-200 group-hover/badge:scale-110 motion-reduce:transform-none">
                              <Icon className="h-4 w-4 shrink-0" />
                            </span>
                            <span>{name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Status footer note */}
                  <div className="mt-6 flex items-center justify-between border-t border-zinc-200/60 pt-4 text-[11px] text-zinc-500 dark:border-zinc-800/60 dark:text-zinc-400">
                    <span>Practicing &amp; Applying</span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      {skills.length} technologies
                    </span>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
