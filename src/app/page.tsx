import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import EducationExperience from "@/components/EducationExperience";
import FeaturedProjects from "@/components/FeaturedProjects";
import Contact from "@/components/Contact";

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

      {/* 5. Featured Projects Section */}
      <FeaturedProjects />

      {/* 6. Contact Section */}
      <Contact />
    </div>
  );
}
