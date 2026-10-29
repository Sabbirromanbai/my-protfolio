import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckCircleIcon,
  ExternalLinkIcon,
  GithubIcon,
  LightBulbIcon,
} from "@/components/Icons";

export async function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Projects`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Projects`,
      description: project.description,
      images: [{ url: project.image, alt: project.imageAlt }],
    },
  };
}

export default async function ProjectDetailsPage({
  params,
}: PageProps<"/projects/[id]">) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  return (
    <section aria-label={`${project.title} project details`} className="relative isolate overflow-hidden bg-white py-12 sm:py-16 dark:bg-zinc-950">
      {/* Animated gradient background accents */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className={`absolute left-[-10rem] -top-16 h-80 w-80 rounded-full bg-linear-to-br ${project.accent} opacity-10 blur-3xl dark:opacity-20`} />
        <div className={`absolute right-[-8rem] top-1/4 h-96 w-96 rounded-full bg-linear-to-tr ${project.accent} opacity-10 blur-3xl dark:opacity-15`} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Back to projects */}
        <Link
          href="/#projects"
          className="detail-fade inline-flex min-h-10 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-bold text-zinc-700 transition-all duration-200 hover:-translate-x-0.5 hover:border-indigo-300 hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-200 dark:hover:border-indigo-400/40 dark:hover:text-indigo-300 motion-reduce:transform-none"
        >
          <ArrowRightIcon className="h-4 w-4 rotate-180" />
          Back to Projects
        </Link>

        {/* Header */}
        <header style={{ animationDelay: "80ms" }} className="detail-fade mt-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
            {project.eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-zinc-950 sm:text-5xl dark:text-white">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base dark:text-zinc-300">
            {project.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-950/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-600/30 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 motion-reduce:transform-none"
              >
                <ExternalLinkIcon className="h-4 w-4" />
                Live Demo
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-bold text-zinc-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-200 dark:hover:border-indigo-400/40 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-200 motion-reduce:transform-none"
            >
              <GithubIcon className="h-4 w-4" />
              GitHub Repository
            </a>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              <span className={`h-1.5 w-1.5 rounded-full ${project.liveUrl ? "bg-emerald-500" : "bg-amber-500"}`} />
              {project.status}
            </span>
          </div>
        </header>

        {/* Screenshot */}
        <figure style={{ animationDelay: "160ms" }} className="detail-fade group mt-10 overflow-hidden rounded-2xl border border-zinc-200/80 shadow-xl shadow-zinc-950/5 dark:border-white/10 dark:shadow-indigo-950/20">
          <div className="relative aspect-[16/9] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1152px"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
            />
          </div>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-2 px-5 py-3 text-xs font-semibold text-indigo-700 transition-colors hover:text-violet-700 dark:text-indigo-300 dark:hover:text-violet-300"
            >
              Visit the live site
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </a>
          )}
        </figure>

        <div className="mt-12 grid gap-5 lg:grid-cols-5 lg:gap-8">
          {/* Overview + Features */}
          <div style={{ animationDelay: "240ms" }} className="detail-fade lg:col-span-3">
            <h2 className="text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl dark:text-white">
              Overview
            </h2>
            <div aria-hidden="true" className="mt-2 h-0.5 w-16 rounded-full bg-linear-to-r from-indigo-500 via-violet-500 to-cyan-500" />
            <p className="mt-4 text-sm leading-7 text-zinc-600 sm:text-base dark:text-zinc-300">
              {project.overview}
            </p>

            <h2 className="mt-10 text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl dark:text-white">
              Key Features
            </h2>
            <div aria-hidden="true" className="mt-2 h-0.5 w-16 rounded-full bg-linear-to-r from-indigo-500 via-violet-500 to-cyan-500" />
            <ul className="mt-5 grid gap-3 sm:grid-cols-2" aria-label={`${project.title} features`}>
              {project.features.map((feature, index) => (
                <li
                  key={feature}
                  style={{ animationDelay: `${320 + index * 60}ms` }}
                  className={`detail-fade flex items-start gap-2.5 rounded-xl border border-zinc-200/80 bg-zinc-50/80 p-3.5 text-sm leading-6 text-zinc-700 transition-colors duration-200 hover:border-indigo-300 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-200 dark:hover:border-indigo-400/40 ${project.features.length % 2 === 1 && index === project.features.length - 1 ? "sm:col-span-2" : ""}`}
                >
                  <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack + links */}
          <aside style={{ animationDelay: "240ms" }} className="detail-fade lg:col-span-2">
            <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-5 sm:p-6 dark:border-white/10 dark:bg-white/[0.03]">
              <h2 className="text-lg font-bold tracking-tight text-zinc-950 dark:text-white">
                Technology Stack
              </h2>
              <div aria-hidden="true" className="mt-2 h-0.5 w-16 rounded-full bg-linear-to-r from-indigo-500 via-violet-500 to-cyan-500" />
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} technology stack`}>
                {project.technologies.map(({ name, className, Icon }) => (
                  <li
                    key={name}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200/80 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-zinc-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-300 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-200 motion-reduce:transform-none"
                  >
                    <Icon className={`h-3.5 w-3.5 ${className}`} />
                    {name}
                  </li>
                ))}
              </ul>

              <h2 className="mt-7 text-lg font-bold tracking-tight text-zinc-950 dark:text-white">
                Project Links
              </h2>
              <div aria-hidden="true" className="mt-2 h-0.5 w-16 rounded-full bg-linear-to-r from-indigo-500 via-violet-500 to-cyan-500" />
              <div className="mt-5 flex flex-col gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center justify-between gap-2 rounded-xl bg-zinc-950 px-4 py-2.5 text-xs font-bold text-white transition-all duration-200 hover:translate-x-1 hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-white dark:text-zinc-950 dark:hover:bg-indigo-200 motion-reduce:transform-none"
                  >
                    <span className="inline-flex items-center gap-2">
                      <ExternalLinkIcon className="h-3.5 w-3.5" /> Live Demo
                    </span>
                    <ArrowUpRightIcon className="h-3.5 w-3.5" />
                  </a>
                )}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center justify-between gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-bold text-zinc-700 transition-all duration-200 hover:translate-x-1 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-white/15 dark:bg-white/[0.04] dark:text-zinc-200 dark:hover:border-indigo-400/40 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-200 motion-reduce:transform-none"
                >
                  <span className="inline-flex items-center gap-2">
                    <GithubIcon className="h-3.5 w-3.5" /> Source Code
                  </span>
                  <ArrowUpRightIcon className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* Challenges & improvements */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-14">
          <section
            style={{ animationDelay: "320ms" }}
            className="detail-fade rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-zinc-900/80"
            aria-labelledby="challenges-heading"
          >
            <h2 id="challenges-heading" className="text-lg font-bold tracking-tight text-zinc-950 dark:text-white">
              Challenges
            </h2>
            <div aria-hidden="true" className="mt-2 h-0.5 w-16 rounded-full bg-linear-to-r from-fuchsia-500 via-violet-500 to-indigo-500" />
            <ul className="mt-5 space-y-3" aria-label={`${project.title} challenges`}>
              {project.challenges.map((challenge) => (
                <li key={challenge} className="flex items-start gap-2.5 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                  {challenge}
                </li>
              ))}
            </ul>
          </section>

          <section
            style={{ animationDelay: "380ms" }}
            className="detail-fade rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-zinc-900/80"
            aria-labelledby="improvements-heading"
          >
            <h2 id="improvements-heading" className="flex items-center gap-2 text-lg font-bold tracking-tight text-zinc-950 dark:text-white">
              <LightBulbIcon className="h-5 w-5 text-amber-500" />
              Future Improvements
            </h2>
            <div aria-hidden="true" className="mt-2 h-0.5 w-16 rounded-full bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500" />
            <ul className="mt-5 space-y-3" aria-label={`${project.title} future improvements`}>
              {project.improvements.map((improvement) => (
                <li key={improvement} className="flex items-start gap-2.5 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  {improvement}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}
