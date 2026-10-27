import type { Project } from "@/types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * FEATURED PROJECTS DATA
 *
 * How to edit this file:
 *   1. Change titles / descriptions / categories directly below.
 *   2. Add a screenshot to `public/projects/` (e.g. `public/projects/fitlog.png`)
 *      and point `imageUrl` at it: imageUrl: "/projects/fitlog.png".
 *      Leave `imageUrl` empty to keep the gradient placeholder.
 *   3. Paste your real links into `links`:
 *        live:    "https://your-live-demo.com"
 *        github:  "https://github.com/your-username/your-repo"
 *        details: "https://..." (or an internal route like "/projects/fitlog")
 *      Empty strings are hidden automatically — no broken links are rendered.
 *   4. Update `tech` with the technologies each project actually uses. The
 *      available keys are listed in `ProjectTech` in `src/types/index.ts`.
 *
 * NOTE: No screenshots, repository links, live URLs, or stack details were
 * available in this repository. The tech lists below are reasonable starting
 * points based on each project's description — please verify them.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const projects: Project[] = [
  {
    id: "fitlog",
    title: "FitLog",
    category: "Fitness Tracking",
    description: "A fitness and workout tracking application.",
    imageUrl: "", // e.g. "/projects/fitlog.png"
    imageAlt: "Preview of the FitLog workout tracking application",
    accent: "emerald",
    // TODO: confirm the real stack used by FitLog
    tech: ["react", "typescript", "tailwind"],
    links: {
      live: "",
      github: "",
      details: "",
    },
  },
  {
    id: "pioneer-bank",
    title: "Pioneer Bank",
    category: "Banking Interface",
    description: "A banking interface built for frontend practice.",
    imageUrl: "", // e.g. "/projects/pioneer-bank.png"
    imageAlt: "Preview of the Pioneer Bank interface",
    accent: "indigo",
    // TODO: confirm the real stack used by Pioneer Bank
    tech: ["html", "css", "javascript"],
    links: {
      live: "",
      github: "",
      details: "",
    },
  },
  {
    id: "pin-matcher",
    title: "Pin Matcher",
    category: "JavaScript App",
    description: "A JavaScript-based PIN matching application.",
    imageUrl: "", // e.g. "/projects/pin-matcher.png"
    imageAlt: "Preview of the Pin Matcher application",
    accent: "violet",
    // TODO: confirm the real stack used by Pin Matcher
    tech: ["javascript", "html", "css"],
    links: {
      live: "",
      github: "",
      details: "",
    },
  },
];
