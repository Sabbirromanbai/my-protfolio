export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  location?: string;
  avatarUrl?: string; // e.g. "/profile.jpg" or empty for default avatar
  resumeUrl?: string; // e.g. "/resume.pdf" or empty for fallback
  socialLinks?: SocialLinks;
}

export interface NavItem {
  label: string;
  href: string;
}

// ──────────────────────────────────────────────
// Education & Experience types
// ──────────────────────────────────────────────

export type TimelineCategory = "education" | "experience" | "learning";

export interface TimelineItem {
  id: string;
  category: TimelineCategory;
  /** Short label shown as the colored badge, e.g. "Education" */
  badge: string;
  /** Main title, e.g. "SSC – Science" or "Self-Taught Developer" */
  title: string;
  /** Institution / organisation / platform name */
  organisation: string;
  /** Display period, e.g. "2021 – 2023" or "2024 – Present" */
  period: string;
  /** One-liner shown below the title */
  subtitle?: string;
  /** Bullet points describing what was covered / achieved */
  points: string[];
  /** Set true while the item is still ongoing */
  current?: boolean;
}
