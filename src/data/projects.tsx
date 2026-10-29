import type { ComponentType } from "react";
import {
  HtmlIcon,
  CssIcon,
  JsIcon,
  TsIcon,
  ReactIcon,
  NextjsIcon,
  TailwindIcon,
  NodeIcon,
  ApiIcon,
  MongoIcon,
  AuthIcon,
  GitIcon,
  VscodeIcon,
  NpmIcon,
} from "@/components/TechIcons";

/**
 * Projects — single source of truth for the Featured Projects section
 * and the /projects/[id] details pages.
 *
 * Details below are verified against each project's real repository,
 * README, and deployed site. Live URLs are only set when verified.
 */

export type ProjectTech = {
  name: string;
  className: string;
  Icon: ComponentType<{ className?: string }>;
};

export interface Project {
  id: string;
  title: string;
  /** Short label shown above the title, e.g. "Fitness · Workout Planner". */
  eyebrow: string;
  description: string;
  longDescription: string;
  /** Screenshot in `public/projects/`. Empty shows a gradient placeholder. */
  image: string;
  imageAlt: string;
  /** Gradient classes used for accents and placeholders. */
  accent: string;
  technologies: ProjectTech[];
  liveUrl?: string;
  githubUrl: string;
  featured?: boolean;
  status: string;
  /** Detail-page-only content */
  overview: string;
  features: string[];
  challenges: string[];
  improvements: string[];
}

const tech = {
  next: { name: "Next.js", className: "text-zinc-900 dark:text-white", Icon: NextjsIcon },
  react: { name: "React", className: "text-cyan-500", Icon: ReactIcon },
  ts: { name: "TypeScript", className: "text-blue-600", Icon: TsIcon },
  tailwind: { name: "Tailwind CSS", className: "text-cyan-600", Icon: TailwindIcon },
  daisyui: { name: "DaisyUI", className: "text-emerald-500", Icon: NpmIcon },
  html: { name: "HTML5", className: "text-orange-600", Icon: HtmlIcon },
  css: { name: "CSS3", className: "text-blue-500", Icon: CssIcon },
  js: { name: "JavaScript", className: "text-amber-500", Icon: JsIcon },
  api: { name: "REST API", className: "text-violet-500", Icon: ApiIcon },
  mongo: { name: "MongoDB", className: "text-green-600", Icon: MongoIcon },
  auth: { name: "Better Auth", className: "text-indigo-500", Icon: AuthIcon },
  node: { name: "Node.js", className: "text-green-500", Icon: NodeIcon },
  git: { name: "Git", className: "text-orange-500", Icon: GitIcon },
  vscode: { name: "VS Code", className: "text-blue-500", Icon: VscodeIcon },
} satisfies Record<string, ProjectTech>;

export const projects: Project[] = [
  {
    id: "bazardor",
    title: "BazarDor",
    eyebrow: "Assignment 7 · Market Price Tracker",
    description:
      "A Bangla web app for tracking daily market prices of essential products in Bangladesh.",
    longDescription:
      "Browse daily product prices across categories, compare today's price with the previous one, and explore product details with a Bangla interface.",
    image: "/projects/bazardor.png",
    imageAlt: "BazarDor homepage showing daily Bangladeshi market price categories",
    accent: "from-emerald-400 via-green-500 to-teal-500",
    technologies: [tech.next, tech.react, tech.js, tech.tailwind, tech.mongo, tech.auth, tech.api],
    liveUrl: "https://assignment-7-ten-chi.vercel.app/",
    githubUrl: "https://github.com/Sabbirromanbai/Assignment-7",
    featured: true,
    status: "Live project",
    overview:
      "BazarDor helps users check the daily prices of essential market products in Bangladesh. Users can explore product categories, compare price changes, view product details, and access their profile through secure authentication. The interface is fully in Bangla with Bangla number formatting.",
    features: [
      "View daily prices of essential market products.",
      "Browse products by category.",
      "Compare today's prices with previous prices.",
      "User registration and login with email and password.",
      "Google and GitHub social authentication.",
      "User profile page with GitHub avatar.",
      "Dynamic product and category data from an API.",
      "Bangla interface with Bangla number formatting.",
      "Responsive design for mobile, tablet, and desktop.",
    ],
    challenges: [
      "Configuring Better Auth with MongoDB, including Google and GitHub social login environment setup.",
      "Formatting numbers and prices in Bangla consistently across the interface.",
      "Mapping dynamic API product data to category-based browsing and detail views.",
    ],
    improvements: [
      "Add price history charts so users can see trends per product.",
      "Add an admin panel for updating product prices.",
      "Introduce saved favourites and price change notifications.",
    ],
  },
  {
    id: "fitlog",
    title: "FitLog",
    eyebrow: "Assignment 6 · Workout Planner",
    description:
      "A workout library for exploring exercises, planning sessions, and saving favourite workouts.",
    longDescription:
      "Browse workout details, build a personal plan, save workouts for later, sort exercises, and track workout metrics — all in a dark, gym-themed interface.",
    image: "/projects/fitlog.png",
    imageAlt: "FitLog hero page with the Workout Library headline and Browse Workouts button",
    accent: "from-lime-400 via-emerald-500 to-cyan-500",
    technologies: [tech.next, tech.react, tech.ts, tech.tailwind, tech.daisyui, tech.api],
    liveUrl: "https://assignment-06-kappa.vercel.app/",
    githubUrl: "https://github.com/Sabbirromanbai/A-6",
    featured: true,
    status: "Live project",
    overview:
      "FitLog is a dark-themed workout library and planning application built with Next.js. Users can explore workouts from an API, view detailed exercise information, add workouts to a personal plan, save favourites, and track live workout metrics — plans persist through localStorage.",
    features: [
      "Browse workouts from the FitLog API.",
      "Detailed workout pages with equipment, tags, and step-by-step instructions.",
      "Add workouts to a personal plan and mark them as done.",
      "Save favourite workouts for later with instant toast feedback.",
      "Live metrics: total exercises, workout minutes, and estimated calories.",
      "Sort workouts by duration, calories, or rating.",
      "Plans and saved workouts persist in localStorage.",
      "Custom 404 page and fully responsive layout.",
    ],
    challenges: [
      "Synchronising Today's Plan and Saved workouts state across pages with React Context and localStorage.",
      "Lifting the sorting and metrics logic into reusable, type-safe TypeScript utilities.",
      "Keeping hand-rolled dark theming accessible with readable contrast throughout DaisyUI components.",
    ],
    improvements: [
      "Add a weekly progress view with saved session history.",
      "Support filtering workouts by muscle group or equipment.",
      "Introduce an account system so plans sync across devices.",
    ],
  },
  {
    id: "school-app",
    title: "School App",
    eyebrow: "Landing Page · Smart Education System",
    description:
      "A modern school website landing page, built purely with HTML, CSS, and JavaScript DOM skills.",
    longDescription:
      "EdurLab is a smart education system landing page covering institution features, facilities, and statistics with a polished presentation.",
    image: "/projects/school-app.png",
    imageAlt: "School App (EdurLab) landing page hero in Bangla with dashboard preview",
    accent: "from-blue-500 via-cyan-500 to-teal-400",
    technologies: [tech.html, tech.css, tech.js, tech.git, tech.vscode],
    liveUrl: "https://school-app-one-orpin.vercel.app/",
    githubUrl: "https://github.com/Sabbirromanbai/school-app",
    status: "Live project",
    overview:
      "A static landing page for a fictional smart school management system, deployed on Vercel. It was built without any framework to sharpen core HTML, CSS, and JavaScript DOM manipulation and animation skills.",
    features: [
      "Clean, modern landing page for a school management system.",
      "Bangla content presentation.",
      "Interactive sections built with vanilla JavaScript.",
      "Responsive layout for phones, tablets, and desktops.",
    ],
    challenges: [
      "Building polished layouts and interactions without a framework or utility library.",
      "Animating section reveals with plain CSS transitions triggered by JavaScript.",
    ],
    improvements: [
      "Rebuild sections as reusable React components.",
      "Add a contact form with client-side validation.",
      "Improve image optimisation and add lazy loading.",
    ],
  },
  {
    id: "pioneer-bank",
    title: "Pioneer Bank",
    eyebrow: "Practice · Banking UI",
    description:
      "A beginner-friendly banking interface created to practise DOM manipulation and interactive UI logic.",
    longDescription:
      "Practise event handling, balance calculations, and updating interface content in response to user actions.",
    image: "/projects/pioneer-bank.png",
    imageAlt: "Pioneer Bank login page with Email Address and password fields",
    accent: "from-blue-500 via-indigo-500 to-violet-500",
    technologies: [tech.html, tech.css, tech.js, tech.git, tech.vscode],
    liveUrl: "https://sabbirromanbai.github.io/pioneer-bank/",
    githubUrl: "https://github.com/Sabbirromanbai/pioneer-bank",
    status: "Live project",
    overview:
      "A simple banking interface deployed via GitHub Pages. It demonstrates login handling, deposit and withdraw flows, and balance calculations — driven entirely by DOM manipulation and event handling.",
    features: [
      "Login flow with email and password entry.",
      "Deposit and withdraw actions updating balances instantly.",
      "Calculated totals rendered dynamically to the page.",
      "Interactive UI driven by event handling and form data (ideal for practice).",
    ],
    challenges: [
      "Keeping displayed balance values consistent as transactions accumulate.",
      "Validating form input without any library before acting on it.",
    ],
    improvements: [
      "Add transaction history persistence.",
      "Introduce distinct user accounts.",
      "Improve form validation feedback with inline error styles.",
    ],
  },
  {
    id: "pin-matcher",
    title: "Pin Matcher",
    eyebrow: "Practice · Interactive UI",
    description:
      "A small interactive application for practising PIN generation, matching, and validation logic.",
    longDescription:
      "A focused JavaScript practice project for connecting user input, conditional logic, and visible feedback.",
    image: "/projects/pin-matcher.png",
    imageAlt: "Pin Matcher application interface for generating and verifying PINs",
    accent: "from-fuchsia-500 via-violet-500 to-indigo-500",
    technologies: [tech.html, tech.css, tech.js, tech.git, tech.vscode],
    liveUrl: "https://sabbirromanbai.github.io/pin-matcher/",
    githubUrl: "https://github.com/Sabbirromanbai/pin-matcher",
    status: "Live project",
    overview:
      "An interactive PIN Matcher application: generate a random PIN, enter it on a keypad, submit, and verify. Wrong and right attempts get immediate visual feedback, with try counters handling validation logic.",
    features: [
      "Random 4-digit PIN generation.",
      "Keypad input for entering the PIN.",
      "Match verification with success and error feedback.",
      "Limited attempts with a counter for validation practice.",
    ],
    challenges: [
      "Wiring numeric keypad input to the verification logic state.",
      "Designing clear, instant success and error feedback states in plain CSS.",
    ],
    improvements: [
      "Add shake animations on failed attempts.",
      "Include reset and hint flows for a better user experience.",
      "Refactor verification logic into small, testable functions.",
    ],
  },
];

export function getProject(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

export const projectIds = projects.map((project) => project.id);
