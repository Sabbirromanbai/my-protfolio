"use client";

import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
import Link from "next/link";
import { navItems, personalInfo } from "@/data/portfolioData";
import { DownloadIcon, GithubIcon } from "./Icons";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);
  // Polished background transition once the page is scrolled.
  const [scrolled, setScrolled] = useState(false);
  // Scroll-spy: which page section is currently in view.
  const [activeSection, setActiveSection] = useState<string>("home");
  // Sliding active-section indicator geometry (desktop pill).
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });

  const listRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const closeMenu = () => setIsMenuOpen(false);

  // Logo: show "SABBIR HOSSEN" (full name minus leading "MD" prefix)
  const rawName =
    personalInfo.name && personalInfo.name.trim().length > 0
      ? personalInfo.name
      : "MD SABBIR HOSSEN";
  const logoName = rawName.startsWith("MD ")
    ? rawName.slice(3)
    : rawName.split(" ")[0];

  const [brandFirst, ...brandRest] = logoName.split(" ");
  const brandSecond = brandRest.join(" ");

  // Core desktop navigation links for visual balance
  const desktopNavLinks = [
    { label: "Home", href: "/#home" },
    { label: "About", href: "/#about" },
    { label: "Skills", href: "/#skills" },
    { label: "Projects", href: "/#projects" },
    { label: "Contact", href: "/#contact" },
  ];

  const hasGithub = Boolean(
    personalInfo.socialLinks?.github && personalInfo.socialLinks.github.trim().length > 0
  );

  const hasResume = Boolean(
    personalInfo.resumeUrl && personalInfo.resumeUrl.trim().length > 0
  );

  const handleResumeFallbackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setNoticeMessage(
      "Resume PDF not found. Place your file in 'public/resume.pdf' and set resumeUrl in 'src/data/portfolioData.ts' to enable download."
    );
    setTimeout(() => {
      setNoticeMessage(null);
    }, 6000);
  };

  // Scroll listener (rAF-throttled): background transition + scroll-spy
  useEffect(() => {
    const ids = navItems
      .map((item) => item.href.replace("/#", ""))
      .filter(Boolean);

    let raf = 0;
    const measure = () => {
      raf = 0;
      setScrolled(window.scrollY > 12);
      const marker = window.scrollY + window.innerHeight * 0.35;
      let currentId = ids[0] ?? "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= marker) currentId = id;
      }
      setActiveSection(currentId);
    };
    const requestMeasure = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", requestMeasure, { passive: true });
    window.addEventListener("resize", requestMeasure);
    return () => {
      window.removeEventListener("scroll", requestMeasure);
      window.removeEventListener("resize", requestMeasure);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Position the sliding indicator under the active desktop link.
  const measureIndicator = useCallback(() => {
    const list = listRef.current;
    const el = linkRefs.current[activeSection];
    if (!list || !el) return;
    const listRect = list.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    setIndicator({
      left: rect.left - listRect.left,
      width: rect.width,
      ready: true,
    });
  }, [activeSection]);

  useLayoutEffect(() => {
    measureIndicator();
  }, [measureIndicator]);

  useEffect(() => {
    const onResize = () => measureIndicator();
    window.addEventListener("resize", onResize);
    if (document.fonts?.ready) {
      document.fonts.ready.then(onResize).catch(() => {});
    }
    return () => window.removeEventListener("resize", onResize);
  }, [measureIndicator]);

  // Escape closes the mobile drawer.
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMenuOpen]);

  return (
    <header className="animate-nav-enter sticky top-0 z-50 bg-transparent px-3 pt-3 pb-1 sm:px-5">
      {/* Floating pill: translucent glass + gradient edge + ambient glow */}
      <div className="relative mx-auto max-w-6xl">
        {/* Ambient glow floating beneath the pill */}
        <span
          aria-hidden="true"
          className={`nav-glow pointer-events-none absolute -inset-x-6 -bottom-2 top-2 -z-10 rounded-[1.6rem] blur-2xl transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-70"
          }`}
        />
        <div
          className={`relative overflow-visible rounded-2xl border shadow-sm backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-300 ${
            scrolled
              ? "border-white/50 bg-white/80 shadow-lg shadow-indigo-950/10 dark:border-white/10 dark:bg-zinc-950/80 dark:shadow-black/40"
              : "border-white/40 bg-white/55 dark:border-white/5 dark:bg-zinc-950/55"
          }`}
        >
          {/* Animated gradient edge: masked 1px conic sweep on the pill */}
          <span aria-hidden="true" className="nav-ring pointer-events-none absolute inset-0 rounded-2xl" />

          <div className="flex h-14 items-center justify-between gap-2 px-3 sm:h-16 sm:px-4">
            {/* 1. Left: Legendary Futuristic Logo */}
            <Link
              href="/#home"
              onClick={closeMenu}
              aria-label="Back to top of the homepage"
              className="group relative flex shrink-0 items-center rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {/* Gradient icon capsule */}
              <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500 shadow-md shadow-indigo-500/40 ring-1 ring-inset ring-white/30 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-violet-500/50 group-active:scale-95 motion-reduce:transform-none">
                {/* Glass sheen */}
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-xl bg-linear-to-t from-transparent via-white/25 to-white/30" />
                <span className="relative select-none font-mono text-[11px] font-black leading-none tracking-wider text-white">SH</span>
              </span>

              {/* Name with gradient split coloring */}
              <span className="ml-2 flex shrink items-baseline gap-0 whitespace-nowrap text-[13px] font-extrabold leading-none tracking-tight sm:ml-2.5 sm:text-[15px]">
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-violet-500 bg-clip-text text-transparent transition-all duration-300 group-hover:from-indigo-500 group-hover:via-violet-500 group-hover:to-cyan-500">
                  {brandFirst}
                </span>
                {brandSecond && (
                  <>
                    <span className="mx-0.5 font-light text-zinc-300 sm:mx-1 dark:text-zinc-600">/</span>
                    <span className="bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 bg-clip-text text-transparent transition-all duration-300 group-hover:from-cyan-400 group-hover:via-teal-400 group-hover:to-emerald-400">
                      {brandSecond}
                  </span>
                  </>
                )}
              </span>
            </Link>

            {/* 2. Center: Desktop Navigation Links + sliding active indicator */}
            <nav aria-label="Desktop Navigation" className="hidden items-center md:flex">
              <ul ref={listRef} className="relative flex items-center gap-1 rounded-full px-1 py-1">
                {/* Sliding gradient pill behind the active section */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 h-9 -translate-y-1/2 rounded-full bg-linear-to-r from-indigo-600 via-violet-600 to-cyan-500 shadow-md shadow-indigo-500/30 transition-[transform,width,opacity] duration-300 ease-out motion-reduce:transition-none"
                  style={{
                    transform: `translateX(${indicator.left}px)`,
                    width: `${indicator.width}px`,
                    opacity: indicator.ready ? 1 : 0,
                  }}
                />
                {desktopNavLinks.map((item) => {
                  const isActive = item.href.replace("/#", "") === activeSection;
                  return (
                    <li key={item.href}>
                      <Link
                        ref={(node) => {
                          linkRefs.current[item.href.replace("/#", "")] = node;
                        }}
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className={`relative inline-flex min-h-9 items-center rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 lg:px-4 lg:text-sm ${
                          isActive
                            ? "text-white"
                            : "text-zinc-600 hover:bg-white/70 hover:text-indigo-600 dark:text-zinc-200 dark:hover:bg-white/10 dark:hover:text-indigo-300"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* 3. Right: Actions (Theme Toggle, GitHub, Resume CTA) */}
            <div className="flex shrink-0 items-center gap-2">
              <ThemeToggle />

              {/* GitHub (secondary, icon only) */}
              {hasGithub && (
                <a
                  href={personalInfo.socialLinks?.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile (opens in new tab)"
                  className="hidden h-10 w-10 items-center justify-center rounded-xl border border-zinc-200/80 bg-white/70 text-zinc-600 shadow-2xs backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-md hover:shadow-indigo-500/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:border-indigo-400/50 dark:hover:text-indigo-300 motion-reduce:transform-none md:inline-flex"
                >
                  <GithubIcon className="h-4.5 w-4.5" />
                </a>
              )}

              {/* Resume (primary premium CTA with glow) */}
              {hasResume ? (
                <a
                  href={personalInfo.resumeUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative hidden items-center gap-2 overflow-hidden rounded-full bg-linear-to-r from-indigo-600 via-violet-600 to-cyan-500 px-4 py-2.5 text-[13px] font-bold text-white shadow-md shadow-indigo-500/35 ring-1 ring-inset ring-white/25 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/50 hover:brightness-110 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 motion-reduce:transform-none md:inline-flex lg:px-5 lg:text-sm"
                >
                  {/* Sheen sweep on hover */}
                  <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -translate-x-full skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[300%]" />
                  <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-t from-transparent via-white/15 to-white/20" />
                  <DownloadIcon className="relative h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5 motion-reduce:transform-none" />
                  <span className="relative">Resume</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={handleResumeFallbackClick}
                  title="Add resume.pdf to public/ and configure resumeUrl in src/data/portfolioData.ts"
                  className="hidden items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50/70 px-4 py-2.5 text-[13px] font-semibold text-indigo-700 transition-colors hover:border-indigo-300 hover:bg-indigo-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-300 dark:hover:bg-indigo-950/70 md:inline-flex"
                >
                  <DownloadIcon className="h-4 w-4" />
                  <span>Resume</span>
                </button>
              )}

              {/* Mobile: animated hamburger (icon-only morph) */}
              <button
                type="button"
                id="mobile-menu-button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navigation"
                aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200/80 bg-white/70 text-zinc-700 shadow-2xs backdrop-blur transition-all duration-300 hover:border-indigo-300 hover:text-indigo-600 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:border-indigo-400/50 dark:hover:text-indigo-300 md:hidden"
              >
                <span aria-hidden="true" className="relative block h-4 w-5">
                  <span
                    className={`absolute left-0 top-1/2 h-[2px] w-full rounded-full bg-current transition-all duration-300 motion-reduce:transition-none ${
                      isMenuOpen ? "translate-y-0 rotate-45" : "-translate-y-[4px]"
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-1/2 h-[2px] rounded-full bg-current transition-all duration-300 motion-reduce:transition-none ${
                      isMenuOpen ? "w-full translate-y-0 -rotate-45" : "w-3.5 translate-y-[4px]"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer: floating glass panel with staggered entrance */}
        {isMenuOpen && (
          <div
            id="mobile-navigation"
            aria-label="Mobile Navigation"
            className="animate-nav-drop absolute inset-x-0 top-[calc(100%+0.5rem)] z-50 rounded-2xl border border-white/50 bg-white/85 p-2.5 shadow-xl shadow-indigo-950/10 backdrop-blur-2xl md:hidden dark:border-white/10 dark:bg-zinc-950/90 dark:shadow-black/40"
          >
            <nav aria-label="Mobile Navigation Links">
              <ul className="flex flex-col">
                {navItems.map((item, idx) => {
                  const isActive = item.href.replace("/#", "") === activeSection;
                  return (
                    <li
                      key={item.href}
                      className="animate-nav-item"
                      style={{ animationDelay: `${idx * 40 + 80}ms` }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        aria-current={isActive ? "page" : undefined}
                        className={`flex min-h-12 items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-indigo-600 active:bg-zinc-200/60 dark:active:bg-white/10 ${
                          isActive
                            ? "bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-200 dark:bg-indigo-500/15 dark:text-indigo-300 dark:ring-indigo-400/30"
                            : "text-zinc-700 hover:bg-zinc-100/90 hover:text-indigo-600 dark:text-zinc-200 dark:hover:bg-white/10 dark:hover:text-indigo-300"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                            isActive
                              ? "bg-gradient-to-r from-indigo-500 to-violet-500"
                              : "bg-zinc-300 dark:bg-zinc-600"
                          }`}
                          aria-hidden="true"
                        />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Mobile Bottom Actions: Primary Resume CTA & Secondary GitHub Button */}
            <div className="mt-2.5 flex flex-col gap-2.5 border-t border-zinc-200/70 pt-3 dark:border-white/10">
              {hasResume ? (
                <a
                  href={personalInfo.resumeUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  aria-label="Download Resume (opens in a new tab)"
                  className="group relative flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-cyan-500 py-3 text-sm font-bold text-white shadow-md shadow-indigo-500/35 ring-1 ring-inset ring-white/25 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/50 hover:brightness-110 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-indigo-600"
                >
                  <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -translate-x-full skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[300%]" />
                  <DownloadIcon className="h-4 w-4" />
                  <span>Download Resume</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    handleResumeFallbackClick(e);
                    closeMenu();
                  }}
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50/70 py-3 text-sm font-semibold text-indigo-700 transition-colors hover:border-indigo-300 hover:bg-indigo-100 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-indigo-600 dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-300 dark:hover:bg-indigo-950/70"
                >
                  <DownloadIcon className="h-4 w-4" />
                  <span>Download Resume</span>
                </button>
              )}

              {hasGithub && (
                <a
                  href={personalInfo.socialLinks?.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-zinc-200/80 bg-zinc-50/80 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-indigo-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <GithubIcon className="h-4.5 w-4.5" />
                  <span>View GitHub Profile</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Non-intrusive Configuration Toast/Notice when Resume PDF is clicked before being uploaded */}
      {noticeMessage && (
        <div
          role="status"
          aria-live="polite"
          className="mx-auto mt-2 max-w-6xl rounded-xl border border-indigo-100 bg-indigo-50/95 px-4 py-2.5 text-xs text-indigo-900 shadow-sm backdrop-blur dark:border-indigo-900/50 dark:bg-zinc-900 dark:text-indigo-200"
        >
          <div className="flex items-center justify-between">
            <span>{noticeMessage}</span>
            <button
              type="button"
              onClick={() => setNoticeMessage(null)}
              className="ml-3 font-semibold text-indigo-600 hover:text-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 dark:text-indigo-400"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
