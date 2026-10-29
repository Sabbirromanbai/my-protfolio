"use client";

import React, { useState } from "react";
import Link from "next/link";
import { navItems, personalInfo } from "@/data/portfolioData";
import { MenuIcon, CloseIcon, DownloadIcon, GithubIcon } from "./Icons";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Logo: show "SABBIR HOSSEN" (full name minus leading "MD" prefix)
  const rawName =
    personalInfo.name && personalInfo.name.trim().length > 0
      ? personalInfo.name
      : "MD SABBIR HOSSEN";
  const logoName = rawName.startsWith("MD ")
    ? rawName.slice(3)
    : rawName.split(" ")[0];

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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/90 backdrop-blur-md transition-colors dark:border-zinc-800/80 dark:bg-zinc-950/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* 1. Left: Colorful Stylish Logo */}
        <Link
          href="/#home"
          onClick={closeMenu}
          className="group flex items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {/* Icon badge with gradient */}
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500 shadow-md shadow-indigo-500/30 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-violet-500/40 group-hover:scale-105">
            <span className="font-black text-white font-mono text-xs leading-none select-none">SH</span>
          </span>

          {/* Name with gradient split coloring */}
          <span className="flex items-baseline gap-0 text-base font-extrabold tracking-tight leading-none">
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-violet-500 bg-clip-text text-transparent transition-all duration-300 group-hover:from-indigo-500 group-hover:via-violet-500 group-hover:to-cyan-500">
              SABBIR
            </span>
            <span className="mx-1 text-zinc-300 dark:text-zinc-600 font-light">/</span>
            <span className="bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 bg-clip-text text-transparent transition-all duration-300 group-hover:from-cyan-400 group-hover:via-teal-400 group-hover:to-emerald-400">
              HOSSEN
            </span>
          </span>
        </Link>

        {/* 2. Center: Desktop Navigation Links */}
        <nav aria-label="Desktop Navigation" className="hidden items-center md:flex">
          <ul className="flex items-center space-x-1">
            {desktopNavLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3.5 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-indigo-400"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 3. Right: Desktop Actions (Theme Toggle, Secondary GitHub, Primary Resume CTA) */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Light / Dark Mode Toggle */}
          <ThemeToggle />

          {/* GitHub Icon Link (Secondary Action: outline style) */}
          {hasGithub && (
            <a
              href={personalInfo.socialLinks?.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile (opens in new tab)"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 shadow-2xs transition-all hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              <GithubIcon className="h-4.5 w-4.5" />
            </a>
          )}

          {/* View / Download Resume (Primary CTA: premium gradient pill with glow) */}
          {hasResume ? (
            <a
              href={personalInfo.resumeUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex h-9 items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 px-4 text-sm font-semibold text-white shadow-md shadow-indigo-500/25 ring-1 ring-inset ring-white/25 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/35 hover:brightness-110 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-white/20 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105 motion-reduce:transform-none">
                <DownloadIcon className="h-3 w-3" />
              </span>
              <span>Download Resume</span>
            </a>
          ) : (
            <button
              type="button"
              onClick={handleResumeFallbackClick}
              title="Add resume.pdf to public/ and configure resumeUrl in src/data/portfolioData.ts"
              className="inline-flex h-9 items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50/70 px-4 text-sm font-medium text-indigo-700 transition-colors hover:border-indigo-300 hover:bg-indigo-100 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-300 dark:hover:bg-indigo-950/70"
            >
              <DownloadIcon className="h-4 w-4" />
              <span>Download Resume</span>
            </button>
          )}
        </div>

        {/* Mobile Right: Theme Toggle & Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            id="mobile-menu-button"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white p-2 text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-indigo-400"
          >
            {isMenuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Non-intrusive Configuration Toast/Notice when Resume PDF is clicked before being uploaded */}
      {noticeMessage && (
        <div
          role="status"
          aria-live="polite"
          className="border-t border-indigo-100 bg-indigo-50/95 px-4 py-2.5 text-xs text-indigo-900 transition-all dark:border-indigo-900/50 dark:bg-zinc-900 dark:text-indigo-200"
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between">
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

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile Navigation"
          className="border-b border-zinc-200/80 bg-white/95 px-4 pt-3 pb-6 shadow-lg backdrop-blur-md transition-all md:hidden dark:border-zinc-800/80 dark:bg-zinc-950/95"
        >
          <ul className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="flex min-h-[44px] items-center rounded-xl px-3.5 py-2.5 text-base font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-indigo-600 active:bg-zinc-200/70 focus-visible:outline-2 focus-visible:outline-indigo-600 dark:text-zinc-200 dark:hover:bg-zinc-900 dark:hover:text-indigo-400 dark:active:bg-zinc-800"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Bottom Actions: Primary Resume CTA & Secondary GitHub Button */}
          <div className="mt-4 flex flex-col gap-3 border-t border-zinc-100 pt-4 dark:border-zinc-800">
            {/* Primary Resume Action */}
            {hasResume ? (
              <a
                href={personalInfo.resumeUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                aria-label="Download Resume (opens in a new tab)"
                className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-500/25 ring-1 ring-inset ring-white/25 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/35 hover:brightness-110 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-white/20">
                  <DownloadIcon className="h-3 w-3" />
                </span>
                <span>Download Resume</span>
              </a>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  handleResumeFallbackClick(e);
                  closeMenu();
                }}
                className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50/70 py-3 text-sm font-medium text-indigo-700 transition-colors hover:border-indigo-300 hover:bg-indigo-100 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-indigo-600 dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-300 dark:hover:bg-indigo-950/70"
              >
                <DownloadIcon className="h-4 w-4" />
                <span>Download Resume</span>
              </button>
            )}

            {/* Secondary GitHub Action */}
            {hasGithub && (
              <a
                href={personalInfo.socialLinks?.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50/70 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-indigo-600 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-white"
              >
                <GithubIcon className="h-4.5 w-4.5" />
                <span>View GitHub Profile</span>
              </a>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
