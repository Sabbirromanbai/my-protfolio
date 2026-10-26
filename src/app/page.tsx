import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import EducationExperience from "@/components/EducationExperience";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. About Me Section */}
      <About />

      {/* 3. Skills Section */}
      <Skills />

      {/* 4. Education & Experience — also anchors #experience via id="education" */}
      <EducationExperience />

      <section
        id="projects"
        className="border-t border-zinc-200/80 py-24 dark:border-zinc-800/80"
        aria-label="Projects Section Placeholder"
      >
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Section Target
          </span>
          <h2 className="mt-2 text-2xl font-bold text-zinc-800 dark:text-zinc-200 sm:text-3xl">
            Projects
          </h2>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Ready to be populated in Step 3.
          </p>
        </div>
      </section>

      <section
        id="contact"
        className="border-t border-zinc-200/80 py-24 dark:border-zinc-800/80"
        aria-label="Contact Section Placeholder"
      >
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Section Target
          </span>
          <h2 className="mt-2 text-2xl font-bold text-zinc-800 dark:text-zinc-200 sm:text-3xl">
            Contact
          </h2>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Ready to be populated in Step 4.
          </p>
        </div>
      </section>
    </div>
  );
}
