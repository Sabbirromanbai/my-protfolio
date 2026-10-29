"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowUpRightIcon,
  ExternalLinkIcon,
  GithubIcon,
} from "./Icons";
import { projects, type Project } from "@/data/projects";

/**
 * Accent RGB triplets ("R G B") per project, consumed by the `.proj-*` CSS
 * variables in globals.css. Coordinated with each project's `accent` gradient;
 * unknown ids fall back to indigo.
 */
const PROJECT_RGB: Record<string, string> = {
  bazardor: "16 185 129", // emerald
  fitlog: "34 211 238", // cyan
  "school-app": "59 130 246", // blue
  "pioneer-bank": "99 102 241", // indigo
  "pin-matcher": "217 70 239", // fuchsia
};

function ProjectPreview({ project }: { project: Project }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
      {!imageFailed ? (
        <div className="proj-image-drift absolute inset-0">
          <Image
            src={project.image}
            alt={`${project.title} project screenshot`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:[transform:perspective(900px)_rotateX(1.6deg)_rotateY(-1.6deg)_scale(1.06)] motion-reduce:group-hover:transform-none"
            onError={() => setImageFailed(true)}
          />
        </div>
      ) : (
        <div className={`relative flex h-full items-center justify-center overflow-hidden bg-linear-to-br ${project.accent}`}>
          <div aria-hidden="true" className="absolute -left-10 -top-12 h-40 w-40 rounded-full bg-white/25 blur-3xl" />
          <div aria-hidden="true" className="absolute -bottom-12 -right-8 h-44 w-44 rounded-full bg-black/10 blur-3xl" />
          <div className="relative w-[78%] rounded-xl border border-white/30 bg-white/15 p-3 shadow-2xl backdrop-blur-md sm:p-4">
            <div className="flex items-center gap-1.5 border-b border-white/20 pb-3">
              <span className="h-2 w-2 rounded-full bg-white/80" />
              <span className="h-2 w-2 rounded-full bg-white/50" />
              <span className="h-2 w-2 rounded-full bg-white/30" />
              <span className="ml-auto rounded-full bg-white/20 px-2 py-1 text-[9px] font-semibold text-white">PROJECT PREVIEW</span>
            </div>
            <div className="py-5 sm:py-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75">{project.eyebrow}</p>
              <p className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">{project.title}</p>
              <div className="mt-4 flex gap-2">
                <span className="h-2 w-16 rounded-full bg-white/70" />
                <span className="h-2 w-10 rounded-full bg-white/35" />
                <span className="h-2 w-7 rounded-full bg-white/20" />
              </div>
            </div>
          </div>
          <span className="absolute bottom-3 left-3 rounded-full border border-white/25 bg-black/20 px-3 py-1 text-[10px] font-medium text-white/90 backdrop-blur">
            Add screenshot: {project.image}
          </span>
        </div>
      )}
      {/* Gentle floating light accents over the screenshot */}
      <span aria-hidden="true" className="proj-bubble pointer-events-none absolute left-6 top-8 h-2.5 w-2.5 rounded-full bg-white/40 blur-[2px] dark:bg-white/25" style={{ animationDelay: "0s" }} />
      <span aria-hidden="true" className="proj-bubble pointer-events-none absolute right-10 top-1/3 h-1.5 w-1.5 rounded-full bg-white/30 blur-[2px] dark:bg-white/20" style={{ animationDelay: "1.6s" }} />
      {/* Animated shine sweep on hover */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-[transform,opacity] duration-700 ease-out group-hover:translate-x-[420%] group-hover:opacity-100 dark:via-white/10" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-white/10 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
      {project.featured && (
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-black/25 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-md">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300 motion-reduce:animate-none" />
          Featured
        </span>
      )}
    </div>
  );
}

interface CardProps {
  project: Project;
  index: number;
  spans: boolean;
}

function ProjectCard({ project, index, spans }: CardProps) {
  const accentRgb = PROJECT_RGB[project.id] ?? "99 102 241";

  return (
    <div
      style={{ animationDelay: `${index * 120}ms` }}
      className={`project-reveal relative isolate h-full ${spans ? "sm:col-span-2" : ""}`}
    >
      {/* Slow ambient accent glow behind the card */}
      <span
        aria-hidden="true"
        className={`proj-orb pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-linear-to-br ${project.accent}`}
      />

      <article
        className="proj-card group relative isolate flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-zinc-200/70 bg-white/75 shadow-lg shadow-zinc-900/5 backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/60 dark:shadow-black/20"
        style={{ "--proj-accent": accentRgb } as CSSProperties}
      >
        {/* Animated accent ring (masked 1px conic sweep) */}
        <span aria-hidden="true" className="proj-card-ring pointer-events-none absolute inset-0 rounded-[1.4rem]" />

        {/* Static accent top bar */}
        <div className={`absolute inset-x-0 top-0 z-10 h-1 bg-linear-to-r ${project.accent}`} />

        <ProjectPreview project={project} />

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
                  {project.eyebrow}
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-900/50">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {project.status}
                </span>
              </div>
              <h3 className="mt-2 text-xl font-bold tracking-tight text-zinc-950 transition-colors duration-300 group-hover:text-indigo-700 dark:text-white dark:group-hover:text-indigo-300 sm:text-2xl">
                {project.title}
              </h3>
            </div>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} repository on GitHub`}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition-all duration-300 hover:rotate-6 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 hover:shadow-md hover:shadow-indigo-500/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-90 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300 motion-reduce:transform-none"
            >
              <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none" />
            </a>
          </div>

          <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            {project.description}
          </p>

          <p className="mt-2 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
            {project.longDescription}
          </p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} technology stack`}>
            {project.technologies.map(({ name, className, Icon }) => (
              <li
                key={name}
                className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200/80 bg-zinc-50/80 px-2.5 py-1.5 text-[11px] font-semibold text-zinc-700 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-300 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-200 motion-reduce:transform-none"
              >
                <Icon className={`h-3.5 w-3.5 ${className}`} />
                {name}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-zinc-200/80 pt-4 dark:border-white/10">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-zinc-950 px-4 py-2 text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-white dark:text-zinc-950 dark:hover:bg-indigo-200 motion-reduce:transform-none"
              >
                <ExternalLinkIcon className="h-3.5 w-3.5" />
                Live Demo
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-zinc-200 px-4 py-2 text-xs font-bold text-zinc-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-white/15 dark:text-zinc-200 dark:hover:border-indigo-400/40 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-200 motion-reduce:transform-none"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              Source Code
            </a>
            <Link
              href={`/projects/${project.id}`}
              aria-label={`View details of ${project.title}`}
              className="ml-auto inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-950/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-600/30 hover:brightness-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 motion-reduce:transform-none"
            >
              View Details
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  // `hasAppeared` latches the entrance reveal; `onScreen` pauses the continuous
  // decorative animations while the section is off-screen.
  const [hasAppeared, setHasAppeared] = useState(false);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    // Safety net: if IntersectionObserver is unavailable, reveal immediately;
    // otherwise reveal everything shortly after even if the observer is blocked.
    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => { setHasAppeared(true); setOnScreen(true); });
      const fallback = window.setTimeout(() => setHasAppeared(true), 2500);
      return () => {
        cancelAnimationFrame(frame);
        window.clearTimeout(fallback);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setOnScreen(entry.isIntersecting);
        if (entry.isIntersecting) setHasAppeared(true);
      },
      { threshold: 0.08 }
    );

    observer.observe(element);

    // Safety net: if the observer never fires (blocked JS, odd browsers),
    // reveal everything after a short delay so content is never stuck hidden.
    const fallback = window.setTimeout(() => setHasAppeared(true), 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  // The first featured project becomes the wide hero card; every row of the
  // 3-column grid then stays completely filled (2 + 1 / 1 + 1 + 1).
  const firstFeaturedId = React.useMemo(
    () => projects.find((project) => project.featured)?.id ?? null,
    []
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-labelledby="projects-heading"
      className={`relative isolate overflow-hidden border-t border-zinc-200/80 bg-white py-20 sm:py-28 dark:border-white/10 dark:bg-zinc-950 ${
        hasAppeared && !onScreen ? "proj-anim-paused" : ""
      }`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="proj-ambient-a absolute left-[-10rem] top-16 h-72 w-72 rounded-full bg-violet-400/10 blur-3xl dark:bg-violet-600/10" />
        <div className="proj-ambient-b absolute right-[-8rem] top-1/3 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-500/10" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent" />
      </div>

      <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${hasAppeared ? "projects-visible" : ""}`}>
        <div className="mb-11 flex flex-col gap-5 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-indigo-50/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-700 dark:border-indigo-400/20 dark:bg-indigo-400/10 dark:text-indigo-300">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              Selected work
            </span>
            <h2 id="projects-heading" className="mt-4 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl dark:text-white">
              Projects that show{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent">
                my progress.
              </span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-600 sm:text-base dark:text-zinc-400">
              A selection of things I have built while learning, experimenting, and turning web development concepts into practical experiences.
            </p>
          </div>
          <a
            href="https://github.com/Sabbirromanbai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-bold text-zinc-800 shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-700 hover:shadow-lg hover:shadow-indigo-500/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-95 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-100 dark:hover:border-indigo-400/40 dark:hover:text-indigo-300 motion-reduce:transform-none"
          >
            <GithubIcon className="h-4 w-4" />
            Explore GitHub
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              spans={project.id === firstFeaturedId}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-5 sm:flex-row sm:items-center sm:p-6 dark:border-white/10 dark:bg-white/[0.03]">
          <div>
            <p className="text-sm font-bold text-zinc-900 dark:text-white">More projects are in progress.</p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">I keep learning by building, testing, and improving one project at a time.</p>
          </div>
          <a
            href="https://github.com/Sabbirromanbai?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-700 transition-colors hover:text-violet-700 dark:text-indigo-300 dark:hover:text-violet-300"
          >
            View all repositories <ArrowUpRightIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
