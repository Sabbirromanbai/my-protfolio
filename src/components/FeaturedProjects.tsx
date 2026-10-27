"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import {
  ArrowUpRightIcon,
  ExternalLinkIcon,
  GithubIcon,
} from "./Icons";
import {
  HtmlIcon,
  CssIcon,
  JsIcon,
  TsIcon,
  ReactIcon,
  NextjsIcon,
  TailwindIcon,
} from "./TechIcons";

type Tech = {
  name: string;
  className: string;
  Icon: ComponentType<{ className?: string }>;
};

type Project = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  longDescription: string;
  image: string;
  accent: string;
  technologies: Tech[];
  liveUrl?: string;
  githubUrl: string;
  featured?: boolean;
  status: string;
};

const tech = {
  next: { name: "Next.js", className: "text-zinc-900 dark:text-white", Icon: NextjsIcon },
  react: { name: "React", className: "text-cyan-500", Icon: ReactIcon },
  ts: { name: "TypeScript", className: "text-blue-600", Icon: TsIcon },
  tailwind: { name: "Tailwind CSS", className: "text-cyan-600", Icon: TailwindIcon },
  html: { name: "HTML5", className: "text-orange-600", Icon: HtmlIcon },
  css: { name: "CSS3", className: "text-blue-500", Icon: CssIcon },
  js: { name: "JavaScript", className: "text-amber-500", Icon: JsIcon },
} satisfies Record<string, Tech>;

const projects: Project[] = [
  {
    id: "fitlog",
    title: "FitLog",
    eyebrow: "Fitness · Workout Planner",
    description:
      "A responsive workout library for exploring exercises, planning sessions, and saving favourite workouts.",
    longDescription:
      "Browse workout details, build a personal plan, save workouts for later, sort exercises, and track workout metrics.",
    image: "/projects/fitlog.png",
    accent: "from-emerald-400 via-teal-500 to-cyan-500",
    technologies: [tech.next, tech.react, tech.ts, tech.tailwind],
    liveUrl: "https://assignment-06-kappa.vercel.app/",
    githubUrl: "https://github.com/Sabbirromanbai/A-6",
    featured: true,
    status: "Live project",
  },
  {
    id: "pioneer-bank",
    title: "Pioneer Bank",
    eyebrow: "Frontend · Banking UI",
    description:
      "A beginner-friendly banking interface created to practise DOM manipulation and interactive UI logic.",
    longDescription:
      "Practise event handling, balance calculations, and updating interface content in response to user actions.",
    image: "/projects/pioneer-bank.png",
    accent: "from-blue-500 via-indigo-500 to-violet-500",
    technologies: [tech.html, tech.css, tech.js],
    githubUrl: "https://github.com/Sabbirromanbai/pioneer-bank",
    status: "Source available",
  },
  {
    id: "pin-matcher",
    title: "Pin Matcher",
    eyebrow: "JavaScript · Interactive UI",
    description:
      "A small interactive application for practising PIN generation, matching, and validation logic.",
    longDescription:
      "A focused JavaScript practice project for connecting user input, conditional logic, and visible feedback.",
    image: "/projects/pin-matcher.png",
    accent: "from-fuchsia-500 via-violet-500 to-indigo-500",
    technologies: [tech.html, tech.css, tech.js],
    githubUrl: "https://github.com/Sabbirromanbai/pin-matcher",
    status: "Source available",
  },
];

function ProjectPreview({ project }: { project: Project }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
      {!imageFailed ? (
        <Image
          src={project.image}
          alt={`${project.title} project screenshot`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transform-none"
          onError={() => setImageFailed(true)}
        />
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

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article
      style={{ animationDelay: `${index * 100}ms` }}
      className="project-reveal group relative flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-zinc-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-indigo-300 hover:shadow-2xl hover:shadow-indigo-950/10 motion-reduce:animate-none motion-reduce:transform-none dark:border-white/10 dark:bg-zinc-900/80 dark:hover:border-indigo-400/40 dark:hover:shadow-indigo-950/30"
    >
      <div className={`absolute inset-x-0 top-0 z-10 h-1 bg-linear-to-r ${project.accent}`} />
      <ProjectPreview project={project} />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
              {project.eyebrow}
            </p>
            <h3 className="mt-2 text-xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-2xl">
              {project.title}
            </h3>
          </div>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title} repository on GitHub`}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition-all duration-300 hover:rotate-6 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300 motion-reduce:transform-none"
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
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200/80 bg-zinc-50 px-2.5 py-1.5 text-[11px] font-semibold text-zinc-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-300 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-200 motion-reduce:transform-none"
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
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-zinc-950 px-4 py-2 text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-white dark:text-zinc-950 dark:hover:bg-indigo-200 motion-reduce:transform-none"
            >
              <ExternalLinkIcon className="h-3.5 w-3.5" />
              Live Demo
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-zinc-200 px-4 py-2 text-xs font-bold text-zinc-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-white/15 dark:text-zinc-200 dark:hover:border-indigo-400/40 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-200 motion-reduce:transform-none"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            Source Code
          </a>
          <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">
            <span className={`h-1.5 w-1.5 rounded-full ${project.liveUrl ? "bg-emerald-500" : "bg-amber-500"}`} />
            {project.status}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-labelledby="projects-heading"
      className="relative isolate overflow-hidden border-t border-zinc-200/80 bg-white py-20 sm:py-28 dark:border-white/10 dark:bg-zinc-950"
    >
      <style jsx>{`
        @keyframes projectReveal {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .project-reveal {
          opacity: 0;
        }
        .projects-visible .project-reveal {
          animation: projectReveal 650ms cubic-bezier(.2,.75,.25,1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .project-reveal,
          .projects-visible .project-reveal {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10rem] top-16 h-72 w-72 rounded-full bg-violet-400/10 blur-3xl dark:bg-violet-600/10" />
        <div className="absolute right-[-8rem] top-1/3 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-500/10" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent" />
      </div>

      <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${visible ? "projects-visible" : ""}`}>
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
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-bold text-zinc-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-100 dark:hover:border-indigo-400/40 dark:hover:text-indigo-300 motion-reduce:transform-none"
          >
            <GithubIcon className="h-4 w-4" />
            Explore GitHub
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
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
