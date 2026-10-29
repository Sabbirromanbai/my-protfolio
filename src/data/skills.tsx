import React from "react";
import {
  ApiIcon,
  AuthIcon,
  CardIcon,
  CssIcon,
  ExpressIcon,
  FlaskIcon,
  GitIcon,
  HtmlIcon,
  JsIcon,
  KeyIcon,
  MongoIcon,
  MongooseIcon,
  NextjsIcon,
  NodeIcon,
  NpmIcon,
  ReactIcon,
  ShieldIcon,
  SparklesIcon,
  TailwindIcon,
  TsIcon,
  UiBoxIcon,
  VscodeIcon,
} from "@/components/TechIcons";
import { CodeBracketIcon, GithubIcon, LayersIcon, ServerIcon } from "@/components/Icons";
import { projects } from "./projects";

/**
 * Skills — single source of truth for the Skills Explorer section
 * and /skills/[slug] details pages. Statuses are honest self-assessment:
 * "Comfortable" = used in real projects, "Learning" = course + practice,
 * "Exploring" = early stage. No proficiency percentages are claimed.
 */

export type SkillStatus = "Comfortable" | "Learning" | "Exploring";

export interface Skill {
  slug: string;
  name: string;
  categoryId: SkillCategoryId;
  Icon: React.ComponentType<{ className?: string }>;
  iconClass: string;
  overview: string;
  useCases: string[];
  status: SkillStatus;
  statusNote: string;
  roadmap: string[];
  /** Project IDs from `projects.tsx` where the skill is verified in use. */
  relatedProjects: string[];
}

export type SkillCategoryId =
  | "frontend"
  | "ui-libraries"
  | "backend"
  | "database"
  | "auth"
  | "tools"
  | "payments-testing-ai";

export const skillCategories: {
  id: SkillCategoryId;
  title: string;
  description: string;
  accentGradient: string;
  iconClass: string;
}[] = [
  { id: "frontend", title: "Frontend", description: "Responsive, modern, accessible interfaces.", accentGradient: "from-indigo-500 via-violet-500 to-cyan-500", iconClass: "text-indigo-500 dark:text-indigo-400" },
  { id: "ui-libraries", title: "UI Libraries", description: "Component systems for polished products.", accentGradient: "from-fuchsia-500 via-violet-500 to-purple-500", iconClass: "text-fuchsia-500 dark:text-fuchsia-400" },
  { id: "backend", title: "Backend", description: "Server-side logic and RESTful services.", accentGradient: "from-violet-500 via-indigo-500 to-blue-500", iconClass: "text-violet-500 dark:text-violet-400" },
  { id: "database", title: "Database", description: "Persistent data models and queries.", accentGradient: "from-emerald-500 via-teal-500 to-cyan-500", iconClass: "text-emerald-500 dark:text-emerald-400" },
  { id: "auth", title: "Authentication & Security", description: "Secure login flows and access control.", accentGradient: "from-amber-500 via-orange-500 to-rose-500", iconClass: "text-amber-500 dark:text-amber-400" },
  { id: "tools", title: "Developer Tools", description: "Workflow, version control, and editors.", accentGradient: "from-cyan-500 via-sky-500 to-blue-500", iconClass: "text-cyan-500 dark:text-cyan-400" },
  { id: "payments-testing-ai", title: "Payments, Testing & AI", description: "Integrations, quality, and AI features.", accentGradient: "from-pink-500 via-rose-500 to-orange-500", iconClass: "text-pink-500 dark:text-pink-400" },
];

export const skills: Skill[] = [
  // ── Frontend ──────────────────────────────────────────────────────────
  {
    slug: "html", name: "HTML5", categoryId: "frontend", Icon: HtmlIcon, iconClass: "text-orange-500",
    overview: "The structural foundation of every page I build, from static practice sites to Next.js applications.",
    useCases: ["Semantic page structure", "Forms and accessible inputs", "SEO-friendly markup"],
    status: "Comfortable", statusNote: "Used in every project, including deployed ones.",
    roadmap: ["Semantic HTML & landmarks", "Forms & validation attributes", "Accessibility patterns (ARIA)"],
    relatedProjects: ["pioneer-bank", "pin-matcher", "school-app"],
  },
  {
    slug: "css", name: "CSS3", categoryId: "frontend", Icon: CssIcon, iconClass: "text-blue-500",
    overview: "Styling, layout, and responsive design fundamentals that underpin my Tailwind and framework work.",
    useCases: ["Flexbox/Grid layouts", "Responsive breakpoints", "Transitions and keyframe animations"],
    status: "Comfortable", statusNote: "Daily styling across all live projects.",
    roadmap: ["Custom properties & theming", "Animations & transitions", "Container queries"],
    relatedProjects: ["pioneer-bank", "pin-matcher", "school-app"],
  },
  {
    slug: "javascript", name: "JavaScript", categoryId: "frontend", Icon: JsIcon, iconClass: "text-amber-500",
    overview: "My core programming language for DOM logic, interactive UIs, and modern framework code.",
    useCases: ["DOM manipulation", "Event handling & state logic", "ES6+ modules and async code"],
    status: "Comfortable", statusNote: "Driven the whole UI logic of my interactive projects.",
    roadmap: ["Modern ES2020+ features", "Fetch & async patterns", "Testing JavaScript code"],
    relatedProjects: ["pioneer-bank", "pin-matcher", "school-app"],
  },
  {
    slug: "typescript", name: "TypeScript", categoryId: "frontend", Icon: TsIcon, iconClass: "text-blue-600",
    overview: "Type-safe JavaScript that I use to keep larger React/Next.js codebases predictable.",
    useCases: ["Typed props and state", "Shared domain interfaces", "Safer API data handling"],
    status: "Learning", statusNote: "Built FitLog and this portfolio with it.",
    roadmap: ["Basic & utility types", "Generics in components", "Strict-mode codebase practice"],
    relatedProjects: ["fitlog"],
  },
  {
    slug: "react", name: "React", categoryId: "frontend", Icon: ReactIcon, iconClass: "text-cyan-500",
    overview: "Component-based UI library used in all of my dashboard-style application projects.",
    useCases: ["Reusable component design", "Hooks: state & effects", "Context for shared state"],
    status: "Learning", statusNote: "Building hands-on UI projects with it.",
    roadmap: ["Hooks deep-dive", "Context & composition", "Performance optimisation"],
    relatedProjects: ["fitlog", "bazardor"],
  },
  {
    slug: "nextjs", name: "Next.js", categoryId: "frontend", Icon: NextjsIcon, iconClass: "text-zinc-700 dark:text-zinc-200",
    overview: "App Router framework for my deployed projects — routing, metadata, and server components.",
    useCases: ["App Router pages & routing", "Server Components & metadata", "Vercel deployments"],
    status: "Learning", statusNote: "Two assignments deployed live on Vercel.",
    roadmap: ["App Router fundamentals", "Data fetching & caching", "Image & font optimisation"],
    relatedProjects: ["bazardor", "fitlog"],
  },
  {
    slug: "tailwind", name: "Tailwind CSS", categoryId: "frontend", Icon: TailwindIcon, iconClass: "text-cyan-600",
    overview: "Utility-first CSS framework used for the design systems of this portfolio and my assignments.",
    useCases: ["Theming with design tokens", "Dark mode variants", "Responsive utility layouts"],
    status: "Comfortable", statusNote: "Primary styling tool in all recent projects.",
    roadmap: ["Custom theme tokens", "Advanced selectors & variants", "Motion with utilities"],
    relatedProjects: ["bazardor", "fitlog"],
  },

  // ── UI Libraries ─────────────────────────────────────────────────────
  {
    slug: "heroui", name: "HeroUI", categoryId: "ui-libraries", Icon: UiBoxIcon, iconClass: "text-fuchsia-500",
    overview: "React component library from the course stack, used for fast, consistent product UI.",
    useCases: ["Prebuilt accessible components", "Theming and variants", "Rapid dashboard UIs"],
    status: "Exploring", statusNote: "Introduced through the Programming Hero stack.",
    roadmap: ["Installation & theming", "Core component patterns", "Custom variants"],
    relatedProjects: [],
  },
  {
    slug: "shadcn", name: "shadcn/ui", categoryId: "ui-libraries", Icon: UiBoxIcon, iconClass: "text-zinc-700 dark:text-zinc-100",
    overview: "Copy-in component library I am learning for owning the code of my UI components.",
    useCases: ["Copy-in component ownership", "Radix-backed primitives", "Theme-consistent design systems"],
    status: "Exploring", statusNote: "Started following the course curriculum.",
    roadmap: ["Setup with Tailwind", "Form & dialog components", "Dark mode support"],
    relatedProjects: [],
  },
  {
    slug: "daisyui", name: "daisyUI", categoryId: "ui-libraries", Icon: UiBoxIcon, iconClass: "text-emerald-500",
    overview: "Tailwind component library used in my deployed FitLog assignment.",
    useCases: ["Themed Tailwind components", "Utility + component hybrid styling", "Fast prototype UI"],
    status: "Comfortable", statusNote: "Used across FitLog's interface.",
    roadmap: ["Theme system", "Component composition", "Custom design tokens"],
    relatedProjects: ["fitlog"],
  },

  // ── Backend ──────────────────────────────────────────────────────────
  {
    slug: "nodejs", name: "Node.js", categoryId: "backend", Icon: NodeIcon, iconClass: "text-green-500",
    overview: "JavaScript runtime that powers the server side of my Next.js and API work.",
    useCases: ["Server-side runtime for Next.js", "Auth server setup", "Package tooling"],
    status: "Learning", statusNote: "Learning through course backend modules.",
    roadmap: ["Modules & the runtime model", "npm scripts & tooling", "Environment configuration"],
    relatedProjects: [],
  },
  {
    slug: "expressjs", name: "Express.js", categoryId: "backend", Icon: ExpressIcon, iconClass: "text-zinc-700 dark:text-zinc-200",
    overview: "Web framework for building REST APIs, following the course backend curriculum.",
    useCases: ["REST route design", "Middleware chains", "Error-handling patterns"],
    status: "Learning", statusNote: "Building backend modules from the course.",
    roadmap: ["Routing & controllers", "Middleware & validation", "Serving a Mongo-backed API"],
    relatedProjects: [],
  },
  {
    slug: "rest-apis", name: "REST APIs", categoryId: "backend", Icon: ApiIcon, iconClass: "text-violet-500",
    overview: "Consuming and designing REST endpoints that feed data into my applications.",
    useCases: ["Fetching product/workout data", "Auth request flows", "API integration in Next.js"],
    status: "Comfortable", statusNote: "Integrated live APIs in deployed projects.",
    roadmap: ["HTTP methods & status codes", "Designing clean endpoints", "Caching strategies"],
    relatedProjects: ["bazardor", "fitlog"],
  },
  {
    slug: "cors", name: "CORS", categoryId: "backend", Icon: ShieldIcon, iconClass: "text-rose-500",
    overview: "Cross-origin rules that connect separate frontend and API deployments safely.",
    useCases: ["Configuring allowed origins", "Credentials in cross-origin requests", "Debugging blocked requests"],
    status: "Learning", statusNote: "Configured while wiring frontends to APIs.",
    roadmap: ["Same-origin policy basics", "Preflight & headers", "Production-safe origin config"],
    relatedProjects: [],
  },
  {
    slug: "modular-pattern", name: "Modular Pattern", categoryId: "backend", Icon: CodeBracketIcon, iconClass: "text-indigo-500",
    overview: "Structuring server code into focused, reusable modules instead of one-file programs.",
    useCases: ["Separated route/service modules", "Reusable utility exports", "Testable code structure"],
    status: "Learning", statusNote: "Practising through course code-organisation modules.",
    roadmap: ["Module pattern basics", "Folder structure conventions", "Refactor legacy code practice"],
    relatedProjects: [],
  },

  // ── Database ─────────────────────────────────────────────────────────
  {
    slug: "mongodb", name: "MongoDB", categoryId: "database", Icon: MongoIcon, iconClass: "text-green-600",
    overview: "NoSQL document database used with Better Auth in my deployed assignment.",
    useCases: ["User & auth data storage", "Product document models", "Connection configuration"],
    status: "Learning", statusNote: "Wired into BazarDor's auth and data flows.",
    roadmap: ["CRUD operations", "Queries & indexes", "Schema design for apps"],
    relatedProjects: ["bazardor"],
  },
  {
    slug: "mongoose", name: "Mongoose", categoryId: "database", Icon: MongooseIcon, iconClass: "text-rose-500",
    overview: "ODM library for defining MongoDB schemas and validating application data.",
    useCases: ["Schema definitions", "Model-based queries", "Data validation hooks"],
    status: "Learning", statusNote: "Practising schemas in course backends.",
    roadmap: ["Schema & model basics", "Validation & hooks", "Relationships & population"],
    relatedProjects: [],
  },
  {
    slug: "odm", name: "ODM", categoryId: "database", Icon: LayersIcon, iconClass: "text-teal-500",
    overview: "Object-document mapping concepts that sit between application code and MongoDB documents.",
    useCases: ["Mapping documents to models", "Consistent data validation", "Cleaner data access layers"],
    status: "Exploring", statusNote: "Studying the concepts around Mongoose.",
    roadmap: ["ODM vs ORM concepts", "Model layer design", "Advanced relations"],
    relatedProjects: [],
  },

  // ── Authentication & Security ────────────────────────────────────────
  {
    slug: "better-auth", name: "Better Auth", categoryId: "auth", Icon: AuthIcon, iconClass: "text-amber-500",
    overview: "Auth framework integrated end-to-end in my BazarDor assignment.",
    useCases: ["Email/password sign-in", "Session management", "Protected profile pages"],
    status: "Learning", statusNote: "Configured in BazarDor with MongoDB.",
    roadmap: ["Core setup & adapters", "Social provider config", "Session & access control"],
    relatedProjects: ["bazardor"],
  },
  {
    slug: "authentication", name: "Authentication", categoryId: "auth", Icon: KeyIcon, iconClass: "text-orange-500",
    overview: "Verifying users with credentials and social login across real deployments.",
    useCases: ["Email/password flows", "Profile-protected routes", "Client session handling"],
    status: "Learning", statusNote: "Implemented full flows in BazarDor.",
    roadmap: ["Sessions vs tokens", "Password hashing basics", "Protected route patterns"],
    relatedProjects: ["bazardor"],
  },
  {
    slug: "rbac", name: "RBAC", categoryId: "auth", Icon: ShieldIcon, iconClass: "text-violet-500",
    overview: "Role-based access control concepts for granting users permission by role.",
    useCases: ["Admin vs user permissions", "Route-level access rules", "Role-scoped APIs"],
    status: "Exploring", statusNote: "Studying theory from the curriculum.",
    roadmap: ["Roles & permissions model", "Role checks in gates", "Role-aware UI"],
    relatedProjects: [],
  },
  {
    slug: "oauth-concepts", name: "OAuth", categoryId: "auth", Icon: KeyIcon, iconClass: "text-sky-500",
    overview: "OAuth concepts learned hands-on by setting up Google and GitHub social login.",
    useCases: ["Google & GitHub providers", "Redirect & callback flows", "Environment credentials"],
    status: "Learning", statusNote: "Configured real providers in BazarDor.",
    roadmap: ["Authorization code flow", "Client credentials setup", "Provider account linking"],
    relatedProjects: ["bazardor"],
  },

  // ── Developer Tools ──────────────────────────────────────────────────
  {
    slug: "git", name: "Git", categoryId: "tools", Icon: GitIcon, iconClass: "text-orange-500",
    overview: "Version control used across all of my public repositories.",
    useCases: ["Commit history discipline", "Branching for features", "Resolving conflicts"],
    status: "Comfortable", statusNote: "Used daily for every project.",
    roadmap: ["Branching strategies", "Interactive rebase", "Tagging releases"],
    relatedProjects: ["bazardor", "fitlog"],
  },
  {
    slug: "github", name: "GitHub", categoryId: "tools", Icon: GithubIcon, iconClass: "text-zinc-800 dark:text-zinc-100",
    overview: "Hosting, collaboration, and Pages/Vercel deployment workflows for my projects.",
    useCases: ["Public project repositories", "GitHub Pages deployments", "Vercel integration"],
    status: "Comfortable", statusNote: "All projects are hosted publicly here.",
    roadmap: ["Actions for CI", "Project boards & issues", "Contribution workflow"],
    relatedProjects: ["bazardor", "fitlog"],
  },
  {
    slug: "vscode", name: "VS Code", categoryId: "tools", Icon: VscodeIcon, iconClass: "text-blue-500",
    overview: "My daily editor for all frontend and backend work.",
    useCases: ["Integrated terminal workflows", "Debugging configurations", "Extension ecosystem"],
    status: "Comfortable", statusNote: "Primary development environment.",
    roadmap: ["Task automation", "Debugger mastery", "Refactor tooling"],
    relatedProjects: [],
  },
  {
    slug: "ai-coding-tools", name: "AI Coding Tools", categoryId: "tools", Icon: SparklesIcon, iconClass: "text-fuchsia-500",
    overview: "AI-assisted development tools for code suggestions, reviews, and learning acceleration.",
    useCases: ["Code explanation while learning", "Boilerplate generation", "Debugging assistance"],
    status: "Exploring", statusNote: "Integrating into my daily workflow.",
    roadmap: ["Prompt-driven development", "AI pair-programming habits", "Reviewing AI output critically"],
    relatedProjects: [],
  },
  {
    slug: "npm", name: "npm", categoryId: "tools", Icon: NpmIcon, iconClass: "text-red-500",
    overview: "Package manager and scripts behind every project's dependency workflow.",
    useCases: ["Dependency management", "Custom run scripts", "Keeping dev/CI builds working"],
    status: "Comfortable", statusNote: "Used in each project's setup.",
    roadmap: ["Scripts & lifecycles", "Workspaces & pinning", "Audit & update flow"],
    relatedProjects: [],
  },

  // ── Payments, Testing & AI ───────────────────────────────────────────
  {
    slug: "stripe", name: "Stripe", categoryId: "payments-testing-ai", Icon: CardIcon, iconClass: "text-indigo-500",
    overview: "Payment processing platform on the course integration roadmap.",
    useCases: ["Checkout sessions", "Webhook-based fulfilment", "Test-mode payment flows"],
    status: "Exploring", statusNote: "Upcoming course module — studying docs.",
    roadmap: ["Test-mode integration", "Checkout & webhooks", "Production hardening"],
    relatedProjects: [],
  },
  {
    slug: "sslcommerz", name: "SSLCommerz", categoryId: "payments-testing-ai", Icon: CardIcon, iconClass: "text-emerald-500",
    overview: "Bangladeshi payment gateway API covered in the course curriculum.",
    useCases: ["Local currency payments", "Sandbox order flow", "Gateway callbacks"],
    status: "Exploring", statusNote: "Upcoming course module — studying docs.",
    roadmap: ["Sandbox setup", "Order initiation & IPN", "Sandbox-to-live checklist"],
    relatedProjects: [],
  },
  {
    slug: "testing", name: "Testing", categoryId: "payments-testing-ai", Icon: FlaskIcon, iconClass: "text-rose-500",
    overview: "Writing reliable code with unit and integration testing as I grow beyond manual QA.",
    useCases: ["Component unit tests", "Utility function tests", "Regression checks for UI logic"],
    status: "Exploring", statusNote: "Beginning with fundamentals from the course.",
    roadmap: ["Vitest/Jest basics", "Testing React components", "E2E flow testing"],
    relatedProjects: [],
  },
  {
    slug: "ai-integration", name: "AI Integration", categoryId: "payments-testing-ai", Icon: SparklesIcon, iconClass: "text-violet-500",
    overview: "Connecting AI-powered features into apps through provider APIs.",
    useCases: ["Chat/assistant features", "Content generation endpoints", "AI-backed search ideas"],
    status: "Exploring", statusNote: "Course module in progress.",
    roadmap: ["Provider API basics", "Streaming responses", "Practical app integration"],
    relatedProjects: [],
  },
];

export const skillsByCategory = skillCategories.map((category) => ({
  ...category,
  skills: skills.filter((skill) => skill.categoryId === category.id),
}));

export function getSkill(slug: string): Skill | undefined {
  return skills.find((skill) => skill.slug === slug);
}

/** Resolve verified related projects for a skill. */
export function getRelatedProjects(skill: Skill) {
  return skill.relatedProjects
    .map((id) => projects.find((project) => project.id === id))
    .filter((project) => project !== undefined);
}

export const skillCategoryIcons: Record<SkillCategoryId, React.ComponentType<{ className?: string }>> = {
  frontend: ReactIcon,
  "ui-libraries": UiBoxIcon,
  backend: ServerIcon,
  database: MongoIcon,
  auth: ShieldIcon,
  tools: VscodeIcon,
  "payments-testing-ai": CardIcon,
};
