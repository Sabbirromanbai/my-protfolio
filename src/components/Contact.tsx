"use client";

import React, { useEffect, useRef, useState } from "react";
import { personalInfo } from "@/data/portfolioData";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckCircleIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "./Icons";

// ─── Backend integration point ────────────────────────────────────────────────
// Paste a form endpoint here (Formspree, Getform, Basin, or your own API route)
// to enable real submissions, for example:
//   const FORM_ENDPOINT: string = "https://formspree.io/f/your-form-id";
//
// While this is empty, the form still validates normally, but it will NOT
// pretend to send anything. Instead it offers a pre-filled email draft using
// the address in `src/data/portfolioData.ts`.
const FORM_ENDPOINT: string = "";

// ─── Form types & validation ──────────────────────────────────────────────────

type FieldName = "name" | "email" | "subject" | "message";
type FormValues = Record<FieldName, string>;
type FormErrors = Partial<Record<FieldName, string>>;
type FormStatus = "idle" | "submitting" | "success" | "error" | "not-configured";

const EMPTY_FORM: FormValues = { name: "", email: "", subject: "", message: "" };

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.subject.trim()) {
    errors.subject = "Please add a subject.";
  }

  if (!values.message.trim()) {
    errors.message = "Please write a message.";
  }

  return errors;
}

// ─── Contact information card ─────────────────────────────────────────────────

interface ContactItemProps {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  Icon: React.ComponentType<{ className?: string }>;
  iconClass: string;
}

function ContactItem({
  label,
  value,
  href,
  external = false,
  Icon,
  iconClass,
}: ContactItemProps) {
  const content = (
    <>
      <span
        aria-hidden="true"
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${iconClass} text-white shadow-lg transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105 motion-reduce:transform-none`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
          {label}
        </span>
        <span className="mt-0.5 block break-words text-sm font-semibold text-white">
          {value}
        </span>
      </span>
      {href && (
        <ArrowUpRightIcon
          aria-hidden="true"
          className="ml-auto h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-indigo-300 motion-reduce:transform-none"
        />
      )}
    </>
  );

  const baseClass =
    "group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm transition-all duration-300";

  if (!href) {
    return <div className={baseClass}>{content}</div>;
  }

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${baseClass} hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-lg hover:shadow-indigo-950/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300 motion-reduce:transform-none motion-reduce:transition-none`}
    >
      {content}
    </a>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [values, setValues] = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const { email, phone, location, socialLinks } = personalInfo;
  const github = socialLinks?.github?.trim() ?? "";
  const linkedin = socialLinks?.linkedin?.trim() ?? "";

  // Gentle reveal once the section enters the viewport.
  useEffect(() => {
    const currentRef = sectionRef.current;
    if (!currentRef) return;

    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(currentRef);
    return () => observer.disconnect();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const field = event.target.name as FieldName;
    const { value } = event.target;

    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));

    if (status !== "idle" && status !== "submitting") {
      setStatus("idle");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    setStatus("idle");

    const firstInvalid = (Object.keys(nextErrors) as FieldName[])[0];
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    // No backend configured: never claim the message was sent.
    if (!FORM_ENDPOINT) {
      setStatus("not-configured");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setStatus("success");
      setValues(EMPTY_FORM);
    } catch {
      setStatus("error");
    }
  };

  // Pre-filled email draft used when no backend is configured.
  const directMailto = `mailto:${email}?subject=${encodeURIComponent(
    values.subject || "Portfolio contact"
  )}&body=${encodeURIComponent(
    `${values.message}\n\n— ${values.name}${values.email ? ` (${values.email})` : ""}`
  )}`;

  const fieldClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-sm text-white shadow-inner shadow-black/20 placeholder:text-zinc-500 transition-colors duration-200 focus:bg-white/[0.06] focus:outline-none focus:ring-2 ${
      hasError
        ? "border-rose-400/70 focus:border-rose-400 focus:ring-rose-400/25"
        : "border-white/10 focus:border-indigo-400/70 focus:ring-indigo-400/25"
    }`;

  const labelClass =
    "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-300";

  // Shared scroll-reveal classes. `delay` staggers each item slightly.
  const reveal = (delay: number, extra = "") => ({
    style: { transitionDelay: isVisible ? `${delay}ms` : "0ms" },
    className: `${extra} transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
      isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
    }`,
  });

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-labelledby="contact-heading"
      className="relative border-t border-zinc-200/80 bg-zinc-50 py-20 transition-colors sm:py-28 dark:border-zinc-800/80 dark:bg-zinc-950"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Dark glass panel, used in both light and dark themes */}
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-950 px-6 py-10 shadow-2xl shadow-indigo-950/20 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          {/* Decorative gradient glows */}
          <div
            aria-hidden="true"
            className="animate-glow-a pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-600/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            style={{ animationDelay: "-7s" }}
            className="animate-glow-b pointer-events-none absolute -bottom-28 -right-16 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            style={{ animationDelay: "-3s" }}
            className="animate-glow-c pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-violet-600/15 blur-3xl"
          />

          <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
            {/* ── Left: heading + contact information ─────────────────────── */}
            <div className="lg:col-span-5">
              <div {...reveal(0)}>
                <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/25 bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-indigo-300">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  Get In Touch
                </span>

                <h2
                  id="contact-heading"
                  className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl"
                >
                  Let&apos;s Build Something{" "}
                  <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    Great Together
                  </span>
                </h2>

                <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-400">
                  Have a project idea or an opportunity? I&apos;d love to hear from you.
                </p>
              </div>

              <ul className="mt-8 space-y-3">
                <li {...reveal(120)}>
                  <ContactItem
                    label="Email"
                    value={email}
                    href={`mailto:${email}`}
                    Icon={MailIcon}
                    iconClass="from-indigo-500 to-violet-500 shadow-indigo-500/30"
                  />
                </li>

                {phone && (
                  <li {...reveal(200)}>
                    <ContactItem
                      label="Phone"
                      value={phone}
                      href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                      Icon={PhoneIcon}
                      iconClass="from-emerald-500 to-teal-500 shadow-emerald-500/25"
                    />
                  </li>
                )}

                {github && (
                  <li {...reveal(280)}>
                    <ContactItem
                      label="GitHub"
                      value={github.replace(/^https?:\/\/(www\.)?github\.com\//, "")}
                      href={github}
                      external
                      Icon={GithubIcon}
                      iconClass="from-violet-500 to-fuchsia-500 shadow-violet-500/25"
                    />
                  </li>
                )}

                {linkedin && (
                  <li {...reveal(360)}>
                    <ContactItem
                      label="LinkedIn"
                      value={linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\//, "")}
                      href={linkedin}
                      external
                      Icon={LinkedinIcon}
                      iconClass="from-sky-500 to-cyan-500 shadow-sky-500/25"
                    />
                  </li>
                )}

                {location && (
                  <li {...reveal(440)}>
                    <ContactItem
                      label="Location"
                      value={location}
                      Icon={MapPinIcon}
                      iconClass="from-amber-500 to-orange-500 shadow-amber-500/25"
                    />
                  </li>
                )}
              </ul>

              <p
                {...reveal(
                  500,
                  "mt-6 text-xs leading-relaxed text-zinc-500"
                )}
              >
                Prefer a direct message? The email link opens your mail app with my
                address already filled in.
              </p>
            </div>

            {/* ── Right: contact form ─────────────────────────────────────── */}
            <div
              style={{ transitionDelay: isVisible ? "120ms" : "0ms" }}
              className={`lg:col-span-7 transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-xl shadow-black/20 backdrop-blur-sm sm:p-8">
                <h3 className="text-lg font-bold text-white">Send a message</h3>
                <p className="mt-1 text-sm text-zinc-400">
                  Share a few details and I&apos;ll get back to you.
                </p>

                <form noValidate onSubmit={handleSubmit} className="mt-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div {...reveal(200)}>
                      <label htmlFor="contact-name" className={labelClass}>
                        Name
                        <span aria-hidden="true" className="ml-1 text-indigo-400">
                          *
                        </span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={values.name}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "contact-name-error" : undefined}
                        placeholder="Your name"
                        className={fieldClass(Boolean(errors.name))}
                      />
                      {errors.name && (
                        <p id="contact-name-error" className="mt-1.5 text-xs text-rose-300">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div {...reveal(260)}>
                      <label htmlFor="contact-email" className={labelClass}>
                        Email
                        <span aria-hidden="true" className="ml-1 text-indigo-400">
                          *
                        </span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={values.email}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "contact-email-error" : undefined}
                        placeholder="you@example.com"
                        className={fieldClass(Boolean(errors.email))}
                      />
                      {errors.email && (
                        <p id="contact-email-error" className="mt-1.5 text-xs text-rose-300">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div {...reveal(320, "mt-4")}>
                    <label htmlFor="contact-subject" className={labelClass}>
                      Subject
                      <span aria-hidden="true" className="ml-1 text-indigo-400">
                        *
                      </span>
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      autoComplete="off"
                      required
                      value={values.subject}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.subject)}
                      aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                      placeholder="What would you like to talk about?"
                      className={fieldClass(Boolean(errors.subject))}
                    />
                    {errors.subject && (
                      <p id="contact-subject-error" className="mt-1.5 text-xs text-rose-300">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div {...reveal(380, "mt-4")}>
                    <label htmlFor="contact-message" className={labelClass}>
                      Message
                      <span aria-hidden="true" className="ml-1 text-indigo-400">
                        *
                      </span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      value={values.message}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "contact-message-error" : undefined}
                      placeholder="Tell me a little about your idea, project, or opportunity..."
                      className={`${fieldClass(Boolean(errors.message))} min-h-32 resize-y`}
                    />
                    {errors.message && (
                      <p id="contact-message-error" className="mt-1.5 text-xs text-rose-300">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div
                    {...reveal(
                      440,
                      "mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
                    )}
                  >
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="group relative inline-flex h-12 items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-950/40 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/25 hover:brightness-110 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none"
                    >
                      {/* One-time sheen sweep on hover */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full -skew-x-12 bg-white/25 blur-md transition-transform duration-700 ease-out group-hover:translate-x-[400%] motion-reduce:hidden"
                      />
                      <span className="relative">
                        {status === "submitting"
                          ? "Sending…"
                          : FORM_ENDPOINT
                            ? "Send Message"
                            : "Prepare Message"}
                      </span>
                      <ArrowRightIcon className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transform-none" />
                    </button>

                    <p className="text-xs text-zinc-500">
                      Prefer email?{" "}
                      <a
                        href={`mailto:${email}`}
                        className="font-semibold text-indigo-300 underline-offset-2 transition-colors hover:text-indigo-200 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300"
                      >
                        {email}
                      </a>
                    </p>
                  </div>

                  {/* Honest feedback — no message is ever claimed as sent unless
                      a real endpoint returned a successful response. */}
                  {status === "not-configured" && (
                    <div
                      role="status"
                      className="animate-contact-fade mt-5 rounded-xl border border-indigo-400/25 bg-indigo-500/10 p-4"
                    >
                      <p className="text-sm font-semibold text-indigo-100">
                        This form isn&apos;t connected yet — nothing was sent.
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-indigo-200/80">
                        Your details are still in the form. Send the same message
                        directly from your email app instead.
                      </p>
                      <a
                        href={directMailto}
                        className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300"
                      >
                        Open email draft
                        <ArrowUpRightIcon className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  )}

                  {status === "success" && (
                    <div
                      role="status"
                      className="animate-contact-fade mt-5 flex items-start gap-3 rounded-xl border border-emerald-400/25 bg-emerald-500/10 p-4 text-sm text-emerald-100"
                    >
                      <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                      <p>Thanks for reaching out — your message was sent successfully.</p>
                    </div>
                  )}

                  {status === "error" && (
                    <div
                      role="alert"
                      className="animate-contact-fade mt-5 rounded-xl border border-rose-400/25 bg-rose-500/10 p-4 text-sm text-rose-100"
                    >
                      Something went wrong, so your message wasn&apos;t sent. Please
                      try again, or email me directly at{" "}
                      <a
                        href={`mailto:${email}`}
                        className="font-semibold underline underline-offset-2 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-200"
                      >
                        {email}
                      </a>
                      .
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
