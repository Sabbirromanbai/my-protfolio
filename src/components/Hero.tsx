"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { personalInfo } from "@/data/portfolioData";
import {
  ArrowRightIcon,
  DownloadIcon,
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
  const [showNotice, setShowNotice] = useState(false);
  const animatedTitle = useTypingAnimation(TITLES);

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
      id="home"
      aria-label="Introduction & Hero"
      className="relative overflow-hidden py-16 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Introduction & Details */}
          <div className="flex flex-col items-start lg:col-span-7">
            {/* 1. Status Badge: Currently Learning & Building */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              Currently Learning &amp; Building
            </div>

            {/* 2. Professional Heading */}
            <div className="mt-6">
              <span className="text-xs font-bold tracking-widest uppercase text-zinc-500 dark:text-zinc-400">
                Welcome to my portfolio
              </span>
              <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-zinc-50 leading-[1.1]">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent">
                  {personalInfo.name}
                </span>
              </h1>
              <p className="mt-3 h-8 text-xl font-semibold text-indigo-600 sm:text-2xl dark:text-indigo-400">
                {animatedTitle}
                {/* Blinking cursor */}
                <span
                  className="ml-0.5 inline-block w-0.5 h-6 bg-indigo-500 dark:bg-indigo-400 align-middle animate-pulse"
                  aria-hidden="true"
                />
              </p>
            </div>

            {/* 3. Readable Introduction */}
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-300">
              {personalInfo.bio}
            </p>

            {/* 4. Action Buttons: View Projects & Download Resume */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/#projects"
                className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition-all duration-200 hover:from-indigo-500 hover:to-violet-500 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span>View Projects</span>
                <ArrowRightIcon className="h-4 w-4" />
              </Link>

              {hasResume ? (
                <a
                  href={personalInfo.resumeUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border-2 border-zinc-300 bg-white px-6 text-sm font-semibold text-zinc-800 shadow-xs transition-all duration-200 hover:border-violet-500 hover:bg-violet-50/50 hover:text-violet-600 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-violet-400 dark:hover:bg-violet-950/40 dark:hover:text-violet-400"
                >
                  <DownloadIcon className="h-4 w-4" />
                  <span>Download Resume</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={handleResumeFallbackClick}
                  title="Add resume.pdf to public/ and configure resumeUrl in src/data/portfolioData.ts"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50/70 px-6 text-sm font-semibold text-indigo-700 transition-all duration-200 hover:border-indigo-300 hover:bg-indigo-100 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-300 dark:hover:bg-indigo-950/70"
                >
                  <DownloadIcon className="h-4 w-4" />
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
              <div className="mt-10 border-t border-zinc-200/80 pt-6 dark:border-zinc-800/80">
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
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-400 hover:text-indigo-600 hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-indigo-400 dark:hover:text-indigo-400"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Profile Photo Card with Subtle Ambient Glow */}
          <div className="flex justify-center lg:col-span-5">
            <div className="animate-hero-pop group relative w-full max-w-sm sm:max-w-md">
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
                  <div className="relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/80 p-2 shadow-xl backdrop-blur-xs transition-colors duration-300 group-hover:border-indigo-300 dark:border-zinc-800/80 dark:bg-zinc-900/80 dark:group-hover:border-indigo-500/50">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
