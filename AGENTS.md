<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Guide

Personal developer portfolio built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4. Single-page site: Hero → About → Skills → Education/Experience, with Projects and Contact still placeholders in `src/app/page.tsx`.

## Commands

- `npm run dev` — start dev server at http://localhost:3000 (Turbopack; also rewrites the AGENTS.md block above)
- `npm run build` — production build; use this as the primary correctness check
- `npm run start` — serve the production build
- `npm run lint` — ESLint (`eslint-config-next` core-web-vitals + typescript)
- `npx tsc --noEmit` — type-check only
- No test framework is configured; do not invent test commands.

## Layout

- `src/app/layout.tsx` — root layout, Geist fonts, metadata, anti-FOUC theme script in `<head>`, `Navbar` + `<main>` shell.
- `src/app/page.tsx` — composes the page sections in order.
- `src/components/` — presentational section components plus `Icons.tsx` (UI icons) and `TechIcons.tsx` (brand/tech icons).
- `src/data/portfolioData.ts` — **single source of truth** for all editable content: nav items, personal info, timeline. Change copy/data here, not inside components.
- `src/types/index.ts` — shared interfaces (`PersonalInfo`, `NavItem`, `TimelineItem`, `TimelineCategory`, `SocialLinks`).
- `src/app/globals.css` — Tailwind import, dark variant, CSS variables, `scroll-margin-top` for sticky navbar.
- `public/` — static assets; `profile.jpg` is referenced by `personalInfo.avatarUrl`.

Path alias: `@/*` → `./src/*`. Use `@/components/...`, `@/data/...`, `@/types` for cross-directory imports; relative `./` only within `src/components`.

## Conventions

**Components**
- Default export, PascalCase function per file, one section component per file. Icons are named exports taking `className`.
- Server Components by default. Add `"use client"` only when hooks, refs, browser APIs, or event handlers are used (currently `Navbar`, `Hero`, `Skills`, `ThemeToggle`, `EducationExperience`).
- Import React explicitly when using `React.*` types (e.g. `React.ComponentType`) — the codebase does this consistently.
- Keep components data-driven: map over arrays/objects from `portfolioData.ts` or local config constants rather than hand-writing repeated markup.

**Data & placeholders**
- Missing values are intentionally empty strings; UI branches on them (e.g. empty `resumeUrl` shows a notice instead of a broken link, empty `socialLinks` hide icons). Preserve this pattern.
- Placeholder content is marked with `TODO`, `[ Your ... ]`, or comments — do not treat it as real data.

**Styling (Tailwind v4)**
- Utilities live directly in `className`; no CSS modules or styled-components. Global CSS is only for tokens/resets.
- Dark mode uses a class strategy: `@custom-variant dark (&:where(.dark, .dark *))`. Write `dark:` variants; never use `darkMode: 'media'` assumptions. Every new surface needs both light and dark styles.
- Theme is stored in `localStorage['theme']`, applied by toggling `.dark` on `<html>`, synchronized via `useSyncExternalStore` in `ThemeToggle.tsx`, and pre-applied by the inline script in `layout.tsx` to avoid a flash. Don't replace this with `next-themes` or a class-less approach.
- Palette: indigo → violet → cyan gradients for emphasis, zinc neutrals, emerald for accents/status. Reuse existing patterns (gradient text, `rounded-2xl` cards, `border-zinc-200/80 dark:border-zinc-800/80`, subtle hover lift).
- Section pattern: `<section id="..." aria-label="...">` → `mx-auto max-w-6xl px-4 sm:px-6 lg:px-8` → eyebrow label, `<h2>`, gradient underline, content grid.
- Accessibility is expected: semantic landmarks, `aria-label`, `aria-expanded`/`aria-controls`, visible focus styles, decorative elements marked `aria-hidden="true"`.
- Respect reduced motion with `motion-reduce:*` on animated/hover-transform elements. Scroll-triggered reveals use `IntersectionObserver` + staggered `transitionDelay` (see `Skills.tsx`).

**Next.js usage**
- Use `next/link` for internal navigation (`/#section` anchors) and `next/image` for images, always with explicit sizing.
- `next.config.ts` enables `cacheComponents` and `partialPrefetching`, and routes CSS through `@tailwindcss/turbopack`. Don't add a duplicate PostCSS/Tailwind pipeline.
- Navbar anchors must match real `id`s on sections (`#home`, `#about`, `#skills`, `#education`, `#experience`, `#projects`, `#contact`). When adding a section, update `navItems` in `portfolioData.ts` and the desktop link list in `Navbar.tsx`.
- `layout.tsx` uses the generated `LayoutProps<"/">` type — keep this style for typed route props.

## Change checklist

1. Edit content in `src/data/portfolioData.ts` and types in `src/types/index.ts`.
2. Keep light/dark parity and mobile behavior; verify at `sm`, `md`, and `lg` breakpoints.
3. Run `npm run lint` and `npm run build`.
4. Do not remove or reorder the `nextjs-agent-rules` block above; leave it in the file.
