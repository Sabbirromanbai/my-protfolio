import { NavItem, PersonalInfo, TimelineItem } from "@/types";

export const navItems: NavItem[] = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Education", href: "/#education" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

export const personalInfo: PersonalInfo = {
  // Replace with your real name and professional title
  name: "MD SABBIR HOSSEN",
  title: "Frontend / Full-Stack Developer",
  tagline: "Building modern, responsive, and performant web experiences.",
  bio: "I am a dedicated web developer passionate about building scalable, user-friendly applications using React, Next.js, and TypeScript. Committed to writing clean code and solving real-world problems.",
  email: "sabbirbai811@gmail.com",
  phone: "+880 1608941748",
  // Optional — shown as a "Location" card in the Contact section when set.
  location: "",
  // Leave empty to display the built-in avatar placeholder, or add your image to public/profile.jpg
  avatarUrl: "/profile.jpg",
  // Leave empty to display an informative notice, or add your PDF to public/resume.pdf
  resumeUrl: "/Md_Sabbir_Hossen_Developer_Resume.pdf",
  // Social links will only be displayed when a valid URL is provided below
  socialLinks: {
    github: "", // e.g., "https://github.com/your-username"
    linkedin: "", // e.g., "https://linkedin.com/in/your-username"
    twitter: "",
    facebook: "",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// EDUCATION & EXPERIENCE TIMELINE
// How to edit: update the items below with your real details.
// Each item has:  id, category ("education"/"experience"/"learning"),
//                badge, title, organisation, period, subtitle, points, current
// ─────────────────────────────────────────────────────────────────────────────
export const timelineData: TimelineItem[] = [
  // ── EDUCATION ITEMS ──────────────────────────────────────────────────────
  {
    id: "ssc",
    category: "education",
    badge: "Education",
    title: "SSC – Science",
    organisation: "KACHALONG GOVERNMENT HIGH SCHOOL",
    period: "2014 – 2019",
    subtitle: "Secondary School Certificate",
    imageUrl: "/SchoolImage.jfif",
    imageAlt: "Kachalong Government High School crest",
    points: [
      "Completed secondary education with a focus on Science.",
      "Developed analytical thinking and problem-solving foundations.",
    ],
  },
  {
    id: "hsc",
    category: "education",
    badge: "Education",
    title: "HSC – Science",
    organisation: "KACHALONG GOVERNMENT COLLEGE",
    period: "2020 – 2022",
    subtitle: "Higher Secondary Certificate",
    imageUrl: "/CollegeImage.jfif",
    imageAlt: "Kachalong Government College crest",
    points: [
      "Continued with Science group at higher secondary level.",
      "Strengthened logical reasoning and mathematics skills.",
    ],
  },

  // ── LEARNING JOURNEY ─────────────────────────────────────────────────────
  {
    id: "webdev-start",
    category: "learning",
    badge: "Self-Learning",
    title: "Started Web Development",
    organisation: "Self-Taught — Online Resources",
    period: "2024 – Present",
    current: true,
    subtitle: "Aspiring Full-Stack Developer",
    imageUrl: "/webdevelopment.jpeg",
    imageAlt: "Web development concept graphic with connected backend, database, and mobile icons",
    imageFit: "cover",
    points: [
      "Learning HTML, CSS, and JavaScript as the core foundation of the web.",
      "Practiced React and Next.js by building hands-on UI projects.",
      "Explored TypeScript for type-safe, maintainable application code.",
      "Building backend skills with Node.js, Express.js, and MongoDB.",
      "Following modern best practices: component design, REST APIs, and auth.",
    ],
  },
  {
    id: "programming-hero",
    category: "learning",
    badge: "Currently Learning",
    title: "AI-Driven Full Stack Web Engineering",
    organisation: "Programming Hero — Batch 14",
    period: "2024 – Present",
    current: true,
    subtitle: "Structured Full-Stack Web Development Program",
    // User-provided local image (dedicated PH logo asset)
    imageUrl: "/Programming-hero.jpg",
    imageAlt: "Programming Hero glowing logo mark",
    points: [
      "Batch 14 — currently learning the AI-Driven Full Stack Web Engineering curriculum.",
      "Following a structured full-stack web development program.",
      "Building real-world projects covering frontend and backend topics.",
      "Practising React, Next.js, Node.js, Express.js, and MongoDB together.",
      "Developing this portfolio as part of the Durbar assignment.",
    ],
  },
];
