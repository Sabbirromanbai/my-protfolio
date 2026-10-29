"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { personalInfo } from "@/data/portfolioData";
import {
  ArrowRightIcon,
  CodeBracketIcon,
  DownloadIcon,
  ExternalLinkIcon,
  ServerIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  FacebookIcon,
  UserAvatarIcon,
} from "./Icons";

// Cycling titles for the animated designation line
const TITLES = [
  "Frontend Developer",
  "Full Stack Developer",
  "React Developer",
  "Next.js Developer",
];

// Floating mini info cards beside the profile photo (verified facts only)
const MINI_CARDS = [
  {
    title: "5 Live Projects",
    subtitle: "Built & deployed",
    Icon: CodeBracketIcon,
    className: "-left-10 top-24 z-10 lg:-left-16",
    delay: "0s",
  },
  {
    title: "React · Next.js",
    subtitle: "Frontend → Backend",
    Icon: ServerIcon,
    className: "-right-8 bottom-20 z-10 lg:-right-14",
    delay: "3s",
  },
];

function useTypingAnimation(words: string[], typingSpeed = 80, deletingSpeed = 50, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        setDisplayed(current.slice(0, displayed.length + 1));
        if (displayed.length + 1 === current.length) {
          // Full word typed — pause then start deleting
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        // Deleting backward
        setDisplayed(current.slice(0, displayed.length - 1));
        if (displayed.length - 1 === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pause]);

  return displayed;
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showNotice, setShowNotice] = useState(false);
  // Hero is on-screen when the page loads; pause the always-on animations
  // whenever the section scrolls out of view.
  const [onScreen, setOnScreen] = useState(true);
  const animatedTitle = useTypingAnimation(TITLES);

  // Pause decorative animations while off-screen (transform/opacity motion only).
  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Cursor-reactive depth: gently translates the aurora layers and tilts the
  // profile card. Desktop pointers only, never with reduced motion.
  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let nx = 0; // -0.5 .. 0.5 across the section
    let ny = 0;

    const update = () => {
      raf = 0;
      element.style.setProperty("--hmx", nx.toFixed(3));
      element.style.setProperty("--hmy", ny.toFixed(3));
    };
    const requestUpdate = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = element.getBoundingClientRect();
      nx = (event.clientX - rect.left) / rect.width - 0.5;
      ny = (event.clientY - rect.top) / rect.height - 0.5;
      requestUpdate();
    };
    const onLeave = () => {
      nx = 0;
      ny = 0;
      requestUpdate();
    };

    element.addEventListener("pointermove", onMove);
    element.addEventListener("pointerleave", onLeave);
    return () => {
      element.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Collect social links only when a valid, non-empty URL is provided
  const socials = [
    { label: "GitHub", href: personalInfo.socialLinks?.github, Icon: GithubIcon },
    { label: "LinkedIn", href: personalInfo.socialLinks?.linkedin, Icon: LinkedinIcon },
    { label: "Twitter", href: personalInfo.socialLinks?.twitter, Icon: TwitterIcon },
    { label: "Facebook", href: personalInfo.socialLinks?.facebook, Icon: FacebookIcon },
  ];

  const activeSocials = socials.filter(
    (item) => typeof item.href === "string" && item.href.trim().length > 0
  );

  const hasResume = Boolean(
    personalInfo.resumeUrl && personalInfo.resumeUrl.trim().length > 0
  );

  const handleResumeFallbackClick = () => {
    setShowNotice(true);
    setTimeout(() => setShowNotice(false), 6000);
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-label="Introduction & Hero"
      className={`relative isolate overflow-hidden py-16 sm:py-24 lg:py-32 ${onScreen ? "" : "hero-anim-paused"}`}
    >
      {/* ── Futuristic atmosphere: slow aurora, soft grid, gentle particles ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="hero-parallax-a absolute -left-32 -top-24">
          <div className="animate-hero-aurora-a h-[26rem] w-[26rem] rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-500/10" />
        </div>
        <div className="hero-parallax-b absolute -right-32 top-1/4">
          <div className="animate-hero-aurora-b h-[30rem] w-[30rem] rounded-full bg-violet-400/15 blur-3xl dark:bg-violet-500/10" />
        </div>
        <div className="hero-parallax-c absolute -bottom-32 left-1/4">
          <div className="animate-hero-aurora-c h-[24rem] w-[24rem] rounded-full bg-cyan-300/15 blur-3xl dark:bg-cyan-500/10" />
        </div>

        {/* Subtle drifting grid, masked to the centre, slight counter-parallax */}
        <div className="hero-parallax-grid absolute inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_65%_60%_at_50%_35%,black,transparent)]">
          <div className="animate-hero-grid h-[calc(100%+44px)] w-[calc(100%+44px)] [background-image:linear-gradient(to_right,rgba(99,102,241,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.10)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_40%,black,transparent)] dark:[background-image:linear-gradient(to_right,rgba(129,140,248,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(129,140,248,0.14)_1px,transparent_1px)]" />
        </div>

        {/* A few soft floating particles */}
        <span className="animate-hero-particle absolute left-[12%] top-[32%] h-1.5 w-1.5 rounded-full bg-indigo-400/70" style={{ animationDelay: "0s" }} />
        <span className="animate-hero-particle absolute left-[26%] top-[64%] h-1 w-1 rounded-full bg-cyan-400/70" style={{ animationDelay: "2.1s", animationDuration: "8s" }} />
        <span className="animate-hero-particle absolute right-[16%] top-[26%] h-1 w-1 rounded-full bg-violet-400/70" style={{ animationDelay: "1.2s", animationDuration: "6.5s" }} />
        <span className="animate-hero-particle absolute right-[30%] top-[70%] h-1.5 w-1.5 rounded-full bg-cyan-400/60" style={{ animationDelay: "3.4s", animationDuration: "9s" }} />
        <span className="animate-hero-particle absolute left-1/2 top-[18%] h-1 w-1 rounded-full bg-indigo-300/70" style={{ animationDelay: "4.2s", animationDuration: "7.5s" }} />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Introduction & Details */}
          <div className="relative flex flex-col items-start lg:col-span-7">
            {/* 1. Status Badge: Currently Learning & Building */}
            <div className="hero-rise relative inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-700 shadow-xs dark:text-emerald-300" style={{ animationDelay: "60ms" }}>
              <span aria-hidden="true" className="animate-hero-badge-ring absolute -inset-[3px] rounded-full border border-emerald-400/50 motion-reduce:animate-none" />
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              Currently Learning &amp; Building
            </div>

            {/* 2. Professional Heading */}
            <div className="mt-6 hero-rise" style={{ animationDelay: "160ms" }}>
              <span className="text-xs font-bold tracking-widest uppercase text-zinc-500 dark:text-zinc-400">
                Welcome to my portfolio
              </span>
              <h1 className="mt-2 font-black leading-[1.05] tracking-tight text-zinc-900 text-[clamp(2.25rem,4.5vw+1rem,4.5rem)] dark:text-zinc-50">
                Hi, I&apos;m
                <span className="animate-hero-gradient mt-2 block bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-clip-text pb-1 text-transparent">
                  {personalInfo.name}
                </span>
              </h1>
              <p className="mt-3 h-9 text-xl font-semibold sm:text-2xl lg:text-3xl">
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
                  {animatedTitle}
                </span>
                {/* Blinking cursor */}
                <span
                  className="ml-1 inline-block h-[1.1em] w-0.5 bg-indigo-500 align-middle animate-pulse dark:bg-indigo-400"
                  aria-hidden="true"
                />
              </p>
            </div>

            {/* 3. Readable Introduction */}
            <p className="hero-rise mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-300" style={{ animationDelay: "300ms" }}>
              {personalInfo.bio}
            </p>

            {/* 4. Action Buttons: View Projects & Download Resume */}
            <div className="hero-rise mt-8 flex flex-wrap items-center gap-4" style={{ animationDelay: "420ms" }}>
              <Link
                href="/#projects"
                aria-label="View my projects"
                className="group relative inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-[length:210%_auto] bg-left px-6 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition-all duration-300 hover:bg-right hover:shadow-[0_0_28px_-4px_rgba(99,102,241,0.65)] hover:shadow-indigo-500/40 active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 motion-reduce:transform-none motion-reduce:transition-colors"
              >
                <span>View My Work</span>
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-0.5 motion-reduce:transform-none" />
              </Link>

              {hasResume ? (
                <a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Resume (opens in a new tab)"
                  title="View Resume (opens in a new tab)"
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl border-2 border-zinc-300 bg-white px-6 text-sm font-semibold text-zinc-800 shadow-xs transition-all duration-300 hover:border-violet-500 hover:bg-violet-50/50 hover:text-violet-600 hover:shadow-[0_0_24px_-8px_rgba(168,85,247,0.5)] hover:-translate-y-0.5 active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 motion-reduce:transform-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-violet-400 dark:hover:bg-violet-950/40 dark:hover:text-violet-400"
                >
                  <ExternalLinkIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-active:translate-y-0 motion-reduce:transform-none" />
                  <span>View Resume</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={handleResumeFallbackClick}
                  title="Add resume.pdf to public/ and configure resumeUrl in src/data/portfolioData.ts"
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50/70 px-6 text-sm font-semibold text-indigo-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-indigo-100 hover:shadow-[0_0_20px_-8px_rgba(99,102,241,0.5)] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 motion-reduce:transform-none dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-300 dark:hover:bg-indigo-950/70"
                >
                  <DownloadIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5 group-active:translate-y-0 motion-reduce:transform-none" />
                  <span>Download Resume</span>
                </button>
              )}
            </div>

            {/* Fallback Notice for Resume */}
            {showNotice && (
              <div className="mt-3 rounded-lg border border-indigo-200 bg-indigo-50/90 p-3 text-xs text-indigo-900 dark:border-indigo-900/50 dark:bg-zinc-900 dark:text-indigo-300">
                Resume PDF not found. Place your file in{" "}
                <code className="font-semibold text-indigo-700 dark:text-indigo-200">
                  public/resume.pdf
                </code>{" "}
                and set <code className="font-semibold">resumeUrl</code> in{" "}
                <code className="font-semibold">src/data/portfolioData.ts</code>.
              </div>
            )}

            {/* 5. Social Media Links (Only displayed if valid URLs are provided) */}
            {activeSocials.length > 0 && (
              <div className="hero-rise mt-10 border-t border-zinc-200/80 pt-6 dark:border-zinc-800/80" style={{ animationDelay: "540ms" }}>
                <p className="text-xs font-semibold tracking-wider uppercase text-zinc-500 dark:text-zinc-400 mb-3">
                  Connect With Me
                </p>
                <div className="flex items-center gap-3">
                  {activeSocials.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400 hover:text-indigo-600 hover:shadow-[0_0_18px_-6px_rgba(99,102,241,0.55)] hover:shadow-indigo-500/30 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 motion-reduce:transform-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-indigo-400 dark:hover:text-indigo-400"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Profile Photo Card — 3D tilt wrapper for cursor depth */}
          <div className="flex justify-center lg:col-span-5">
            <div className="hero-tilt w-full max-w-sm sm:max-w-md">
            <div className="animate-hero-pop group relative">
              {/* Orbiting rings + dot around the profile card (continuous) */}
              <span
                aria-hidden="true"
                className="absolute -inset-6 hidden rounded-full border border-dashed border-indigo-300/40 motion-reduce:animate-none sm:block dark:border-indigo-500/30 animate-hero-halo [animation-duration:24s] [animation-direction:reverse]"
              />
              <span
                aria-hidden="true"
                className="absolute -inset-11 hidden rounded-full border border-indigo-200/40 motion-reduce:animate-none sm:block dark:border-indigo-500/20 animate-hero-halo [animation-duration:38s]"
              />
              <span
                aria-hidden="true"
                className="absolute -inset-6 hidden rounded-full motion-reduce:animate-none sm:block animate-hero-halo [animation-duration:14s]"
              >
                <span className="absolute left-1/2 top-[-4px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_12px_3px_rgba(34,211,238,0.55)]" />
              </span>

              {/* Slowly rotating conic halo behind the card */}
              <div
                aria-hidden="true"
                className="animate-hero-halo absolute -inset-3 rounded-[2rem] bg-[conic-gradient(from_0deg,rgba(99,102,241,0.45),rgba(139,92,246,0.4),rgba(34,211,238,0.4),rgba(99,102,241,0.45))] opacity-70 blur-xl dark:opacity-50"
              />

              {/* Pulsing dual-color ambient glow (Indigo to Violet to Cyan) */}
              <div
                aria-hidden="true"
                className="animate-hero-glow absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500/25 via-violet-500/25 to-cyan-500/20 blur-xl"
              />

              <div className="animate-hero-float relative">
                {personalInfo.avatarUrl ? (
                  <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-400/60 via-violet-400/40 to-cyan-400/60 p-[3px] shadow-xl transition-shadow duration-500 group-hover:shadow-[0_0_40px_-8px_rgba(99,102,241,0.55)] dark:from-indigo-500/70 dark:via-violet-500/50 dark:to-cyan-500/70">
                    <div className="relative overflow-hidden rounded-[calc(1.5rem-3px)] bg-white/85 p-2 backdrop-blur-xs dark:bg-zinc-900/85">
                      <div className="relative overflow-hidden rounded-2xl">
                      <Image
                        src={personalInfo.avatarUrl}
                        alt={`${personalInfo.name} profile photo`}
                        width={400}
                        height={400}
                        priority
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 420px"
                        className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
                      />
                      {/* Soft gradient sheen on hover */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-cyan-400/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      />
                      </div>
                    </div>
                  </div>
                ) : (
                /* Visually attractive, accessible placeholder card */
                <div className="relative flex aspect-square w-full flex-col items-center justify-center rounded-3xl border border-zinc-200/80 bg-white/90 p-8 text-center shadow-xl backdrop-blur-xs dark:border-zinc-800/80 dark:bg-zinc-900/90">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 p-1 border border-indigo-100 text-indigo-600 shadow-inner dark:from-indigo-950/60 dark:to-violet-950/60 dark:border-indigo-900/50 dark:text-indigo-400 mb-4">
                    <UserAvatarIcon className="h-12 w-12" />
                  </div>

                  <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                    Photo Preview
                  </span>

                  <h3 className="mt-3 text-base font-bold text-zinc-900 dark:text-zinc-100">
                    Profile Photo Area
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-xs">
                    Place your photo in{" "}
                    <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                      public/profile.jpg
                    </code>{" "}
                    and set{" "}
                    <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                      avatarUrl: &quot;/profile.jpg&quot;
                    </code>{" "}
                    in <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">portfolioData.ts</code>.
                  </p>
                </div>
              )}
              </div>

              {/* Mini info cards floating on either side (desktop) */}
              {MINI_CARDS.map(({ title, subtitle, Icon, className, delay }, i) => (
                <div
                  key={i}
                  aria-hidden="true"
                  className={`animate-hero-float absolute hidden items-center gap-2.5 rounded-2xl border border-zinc-200/70 bg-white/85 p-3 shadow-lg shadow-indigo-500/10 backdrop-blur-md motion-reduce:animate-none lg:flex dark:border-white/10 dark:bg-zinc-900/75 dark:shadow-indigo-950/40 ${className}`}
                  style={{ animationDelay: delay }}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/15 to-violet-500/15 text-indigo-600 dark:text-indigo-400">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-zinc-900 dark:text-zinc-100">{title}</span>
                    <span className="block text-[11px] font-medium text-zinc-500 dark:text-zinc-400">{subtitle}</span>
                  </span>
                </div>
              ))}
            </div>
            </div>

            {/* Mini info cards stacked cleanly on small screens */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:hidden">
              {MINI_CARDS.map(({ title, subtitle, Icon }, i) => (
                <div
                  key={i}
                  aria-hidden="true"
                  className="animate-timeline-float flex items-center gap-2.5 rounded-2xl border border-zinc-200/70 bg-white/85 p-3 shadow-md shadow-indigo-500/10 backdrop-blur-md motion-reduce:animate-none dark:border-white/10 dark:bg-zinc-900/75"
                  style={{ animationDelay: `${i * 1.6}s` }}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/15 to-violet-500/15 text-indigo-600 dark:text-indigo-400">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-zinc-900 dark:text-zinc-100">{title}</span>
                    <span className="block text-[11px] font-medium text-zinc-500 dark:text-zinc-400">{subtitle}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Animated scroll indicator ─────────────────────────────────── */}
        <Link
          href="/#about"
          aria-label="Scroll to the About section"
          className="mx-auto mt-14 flex w-fit flex-col items-center gap-1.5 text-zinc-400 transition-colors duration-200 hover:text-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-zinc-500 dark:hover:text-indigo-400"
        >
          <span className="flex h-9 w-5 items-start justify-center rounded-full border-2 border-current p-1.5">
            <span className="animate-hero-scroll-dot block h-1.5 w-1.5 rounded-full bg-current motion-reduce:animate-none" />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-widest">Scroll</span>
        </Link>
      </div>
    </section>
  );
}
