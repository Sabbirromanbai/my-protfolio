import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckCircleIcon,
} from "@/components/Icons";
import { getRelatedProjects, getSkill, skillCategories, skills } from "@/data/skills";
import type { SkillStatus } from "@/data/skills";

export async function generateStaticParams() {
  return skills.map((skill) => ({ slug: skill.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) return { title: "Skill Not Found" };
  return {
    title: `${skill.name} | Skills`,
    description: skill.overview,
  };
}

const statusStyles: Record<SkillStatus, { badge: string; dot: string; label: string }> = {
  Comfortable: {
    badge: "border-emerald-300/80 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300",
    dot: "bg-emerald-500",
    label: "Comfortable — used in real projects",
  },
  Learning: {
    badge: "border-indigo-300/80 bg-indigo-50 text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300",
    dot: "bg-indigo-500",
    label: "Learning — course + hands-on practice",
  },
  Exploring: {
    badge: "border-amber-300/80 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300",
    dot: "bg-amber-500",
    label: "Exploring — early stage",
  },
};

export default async function SkillDetailsPage({
  params,
}: PageProps<"/skills/[slug]">) {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) notFound();

  const category = skillCategories.find((entry) => entry.id === skill.categoryId);
  const relatedProjects = getRelatedProjects(skill);
  const status = statusStyles[skill.status];

  return (
    <section aria-label={`${skill.name} skill details`} className="relative isolate overflow-hidden bg-white py-12 sm:py-16 dark:bg-zinc-950">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10rem] -top-16 h-80 w-80 rounded-full bg-linear-to-br from-indigo-500 to-cyan-500 opacity-10 blur-3xl dark:opacity-20" />
        <div className="absolute right-[-8rem] top-1/4 h-96 w-96 rounded-full bg-linear-to-tr from-violet-500 to-fuchsia-500 opacity-10 blur-3xl dark:opacity-15" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/#skills"
          className="detail-fade inline-flex min-h-10 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-bold text-zinc-700 transition-all duration-200 hover:-translate-x-0.5 hover:border-indigo-300 hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-200 dark:hover:border-indigo-400/40 dark:hover:text-indigo-300 motion-reduce:transform-none"
        >
          <ArrowRightIcon className="h-4 w-4 rotate-180" />
          Back to Skills
        </Link>

        {/* Header */}
        <header style={{ animationDelay: "80ms" }} className="detail-fade mt-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-200/80 bg-white shadow-lg shadow-zinc-950/5 dark:border-white/10 dark:bg-zinc-900 ${skill.iconClass}`}>
              <skill.Icon className="h-9 w-9" />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
                {category?.title}
              </p>
              <h1 className="mt-1 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl dark:text-white">
                {skill.name}
              </h1>
            </div>
            <span className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold ${status.badge}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
              {skill.status}
            </span>
          </div>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base dark:text-zinc-300">
            {skill.overview}
          </p>
        </header>

        <div className="mt-10 grid gap-5 lg:grid-cols-5 lg:gap-8">
          <div style={{ animationDelay: "160ms" }} className="detail-fade lg:col-span-3">
            <h2 className="text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl dark:text-white">
              Use Cases
            </h2>
            <div aria-hidden="true" className="mt-2 h-0.5 w-16 rounded-full bg-linear-to-r from-indigo-500 via-violet-500 to-cyan-500" />
            <ul className="mt-5 space-y-3" aria-label={`${skill.name} use cases`}>
              {skill.useCases.map((useCase) => (
                <li key={useCase} className="flex items-start gap-2.5 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  {useCase}
                </li>
              ))}
            </ul>

            {/* Related projects — only where verified */}
            <h2 className="mt-10 text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl dark:text-white">
              Related Projects
            </h2>
            <div aria-hidden="true" className="mt-2 h-0.5 w-16 rounded-full bg-linear-to-r from-indigo-500 via-violet-500 to-cyan-500" />
            {relatedProjects.length > 0 ? (
              <ul className="mt-5 grid gap-3 sm:grid-cols-2" aria-label={`Projects using ${skill.name}`}>
                {relatedProjects.map((project, index) => (
                  <li key={project.id} style={{ animationDelay: `${240 + index * 60}ms` }} className="detail-fade">
                    <Link
                      href={`/projects/${project.id}`}
                      className="group flex h-full min-h-24 flex-col justify-between overflow-hidden rounded-xl border border-zinc-200/80 bg-zinc-50/80 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-500/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 motion-reduce:transform-none dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-indigo-400/40"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-zinc-200/60 bg-zinc-100 dark:border-white/10 dark:bg-zinc-800">
                        <Image
                          src={project.image}
                          alt={project.imageAlt}
                          fill
                          sizes="(max-width: 640px) 100vw, 280px"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
                        />
                      </div>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-zinc-900 group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-400">
                        {project.title}
                        <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 rounded-xl border border-zinc-200/80 bg-zinc-50/80 p-4 text-sm leading-6 text-zinc-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-400">
                No deployed project uses this skill yet — I&apos;m learning it through course modules and practice. Links will appear here as real projects ship.
              </p>
            )}
          </div>

          <aside style={{ animationDelay: "160ms" }} className="detail-fade lg:col-span-2">
            <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-5 sm:p-6 dark:border-white/10 dark:bg-white/[0.03]">
              <h2 className="text-lg font-bold tracking-tight text-zinc-950 dark:text-white">
                Learning Status
              </h2>
              <div aria-hidden="true" className="mt-2 h-0.5 w-16 rounded-full bg-linear-to-r from-indigo-500 via-violet-500 to-cyan-500" />
              <div className={`mt-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold ${status.badge}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                {status.label}
              </div>
              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                {skill.statusNote}
              </p>

              <h2 className="mt-7 text-lg font-bold tracking-tight text-zinc-950 dark:text-white">
                Learning Roadmap
              </h2>
              <div aria-hidden="true" className="mt-2 h-0.5 w-16 rounded-full bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500" />
              <ol className="mt-5 space-y-3" aria-label={`${skill.name} learning roadmap`}>
                {skill.roadmap.map((step, index) => (
                  <li key={step} className="flex items-start gap-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-violet-500 text-[10px] font-bold text-white">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
