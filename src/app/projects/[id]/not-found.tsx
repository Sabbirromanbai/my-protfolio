import Link from "next/link";
import { ArrowRightIcon } from "@/components/Icons";

export default function ProjectNotFound() {
  return (
    <section
      aria-label="Project not found"
      className="relative isolate flex min-h-[70vh] items-center justify-center overflow-hidden bg-white px-4 py-20 dark:bg-zinc-950"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-8rem] top-10 h-72 w-72 rounded-full bg-violet-400/10 blur-3xl dark:bg-violet-600/10" />
        <div className="absolute right-[-6rem] bottom-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-500/10" />
      </div>

      <div className="mx-auto max-w-md text-center">
        <p className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-clip-text text-6xl font-black tracking-tight text-transparent sm:text-7xl">
          404
        </p>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl dark:text-white">
          Project not found
        </h1>
        <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
          The project you are looking for does not exist or has been moved. Check out the projects section instead.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/#projects"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-950/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-600/30 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 motion-reduce:transform-none"
          >
            <ArrowRightIcon className="h-4 w-4 rotate-180" />
            Back to Projects
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-bold text-zinc-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-200 dark:hover:border-indigo-400/40 dark:hover:text-indigo-300 motion-reduce:transform-none"
          >
            Go Home
          </Link>
        </div>
      </div>
    </section>
  );
}
