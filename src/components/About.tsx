import React from "react";
import { BookOpenIcon, CodeBracketIcon, LayersIcon } from "./Icons";

const highlightCards = [
  {
    title: "Continuous Learning",
    description:
      "Passionate about staying updated with modern web standards, modern React paradigms, and scalable architecture.",
    Icon: BookOpenIcon,
  },
  {
    title: "Project-Based Practice",
    description:
      "Learning by doing—translating concepts into practical, production-ready web interfaces and functional applications.",
    Icon: CodeBracketIcon,
  },
  {
    title: "Full-Stack Journey",
    description:
      "Bridging intuitive frontend user experiences with robust backend services, APIs, and database management.",
    Icon: LayersIcon,
  },
];

const coreTechnologies = [
  "JavaScript",
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Tailwind CSS",
];

export default function About() {
  return (
    <section
      id="about"
      aria-label="About Me"
      className="relative border-t border-zinc-200/80 bg-zinc-50/50 py-20 transition-colors sm:py-28 dark:border-zinc-800/80 dark:bg-zinc-950/40"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Get To Know Me
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            About{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600" />
        </div>

        {/* Content Layout: 2 Columns on Desktop */}
        <div className="mt-12 grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: My Story & Philosophy */}
          <div className="flex flex-col space-y-5 lg:col-span-7">
            <p className="text-base leading-relaxed text-zinc-700 sm:text-lg dark:text-zinc-300">
              I am a self-taught, aspiring{" "}
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                Full-Stack Developer
              </strong>{" "}
              from Bangladesh, dedicated to building responsive, accessible, and
              user-centric web applications.
            </p>

            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              My journey began with a genuine curiosity about how modern websites
              work. Through consistent practice and building hands-on projects,
              I am continuously refining my skills across{" "}
              <span className="font-medium text-indigo-600 dark:text-indigo-400">
                JavaScript, React, Next.js, TypeScript, Node.js, Express.js,
              </span>{" "}
              and{" "}
              <span className="font-medium text-indigo-600 dark:text-indigo-400">
                MongoDB
              </span>
              .
            </p>

            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              I genuinely enjoy breaking down complex problems into clean,
              reusable code, building practical web applications that deliver real
              value, and exploring the latest developments across the modern web
              ecosystem.
            </p>

            {/* Core Tech Stack Badges */}
            <div className="pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Current Technology Focus
              </h3>
              <ul
                aria-label="Core technologies"
                className="mt-3 flex flex-wrap gap-2"
              >
                {coreTechnologies.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-lg border border-zinc-200/90 bg-white px-3 py-1.5 text-xs font-medium text-zinc-800 shadow-2xs transition-colors hover:border-indigo-400 hover:text-indigo-600 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-200 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: 3 Feature Highlight Cards */}
          <div className="flex flex-col space-y-4 lg:col-span-5">
            {highlightCards.map(({ title, description, Icon }) => (
              <div
                key={title}
                className="group relative rounded-2xl border border-zinc-200/80 bg-white/90 p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-400 hover:shadow-md hover:shadow-indigo-500/5 motion-reduce:transform-none motion-reduce:transition-none dark:border-zinc-800/80 dark:bg-zinc-900/80 dark:hover:border-indigo-500/60"
              >
                <div className="flex items-start gap-4">
                  {/* Icon Container with subtle soft gradient */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-50 text-indigo-600 shadow-inner transition-colors group-hover:scale-105 motion-reduce:transform-none dark:border-indigo-900/40 dark:from-indigo-950/60 dark:to-violet-950/60 dark:text-indigo-400">
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Text Content */}
                  <div>
                    <h3 className="text-base font-bold text-zinc-900 transition-colors group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-400">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-400">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
