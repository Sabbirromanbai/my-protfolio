import React from "react";

interface TechIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function HtmlIcon({ className = "w-4 h-4", ...props }: TechIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path
        d="M3 2l1.8 17.6L12 22l7.2-2.4L21 2H3z"
        fill="#E34F26"
      />
      <path
        d="M12 3.8v16.3l5.6-1.8L19 3.8H12z"
        fill="#EF652A"
      />
      <path
        d="M12 7.7H7.6l.3 3.1h4.1V7.7zm0 5.4H9.7l.2 2.3 2.1.6v2.2l-4.1-1.2-.4-5h4.5v1.1zM16.4 7.7l-.3 3.1h-4.1V7.7h4.4zm-.5 4.3l-.4 3.4-3.5 1v-2.2l1.9-.5.2-1.7h-2.1v-1.1h4l-.1 1.1z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function CssIcon({ className = "w-4 h-4", ...props }: TechIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path
        d="M3 2l1.8 17.6L12 22l7.2-2.4L21 2H3z"
        fill="#1572B6"
      />
      <path
        d="M12 3.8v16.3l5.6-1.8L19 3.8H12z"
        fill="#33A9DC"
      />
      <path
        d="M12 7.5H7.5l.2 2.6h4.3V7.5zm0 4.6H9.5l.2 2.5 2.3.6v2.2l-4.3-1.2-.5-5.2h4.8v1.1zM16.5 7.5H12v2.6h4.1l-.3 2.6H12v2.1h2.2l-.2 2.4-2 .5v2.2l4.1-1.1.7-8.8h-.3z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function JsIcon({ className = "w-4 h-4", ...props }: TechIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...props}>
      <rect width="24" height="24" rx="4" fill="#F7DF1E" />
      <path
        d="M7.5 17.5c.8.5 1.7.8 2.5.8 1.4 0 2.2-.7 2.2-2.1v-6.7h-2.2v6.7c0 .6-.3.9-.8.9-.4 0-.8-.2-1.1-.4l-.6.8zm7.2-.2c1 .6 2.1.9 3.2.9 1.9 0 3.1-1 3.1-2.5 0-1.5-.9-2.2-2.4-2.8-.9-.4-1.4-.7-1.4-1.3 0-.5.4-.9 1.2-.9.8 0 1.5.3 2 .7l.7-1.3c-.6-.5-1.5-.8-2.6-.8-1.8 0-3 1-3 2.5 0 1.5 1 2.2 2.5 2.8.9.4 1.3.8 1.3 1.4 0 .6-.5 1-1.4 1-.9 0-1.8-.4-2.4-.9l-.8 1.4z"
        fill="#000000"
      />
    </svg>
  );
}

export function TsIcon({ className = "w-4 h-4", ...props }: TechIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...props}>
      <rect width="24" height="24" rx="4" fill="#3178C6" />
      <path
        d="M5 9h6v1.8H9v6.7H6.8v-6.7H5V9zm9.7 8.3c1 .6 2.1.9 3.2.9 1.9 0 3.1-1 3.1-2.5 0-1.5-.9-2.2-2.4-2.8-.9-.4-1.4-.7-1.4-1.3 0-.5.4-.9 1.2-.9.8 0 1.5.3 2 .7l.7-1.3c-.6-.5-1.5-.8-2.6-.8-1.8 0-3 1-3 2.5 0 1.5 1 2.2 2.5 2.8.9.4 1.3.8 1.3 1.4 0 .6-.5 1-1.4 1-.9 0-1.8-.4-2.4-.9l-.8 1.4z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function ReactIcon({ className = "w-4 h-4", ...props }: TechIconProps) {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} {...props}>
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export function NextjsIcon({ className = "w-4 h-4", ...props }: TechIconProps) {
  return (
    <svg
      viewBox="0 0 180 180"
      className={className}
      fill="currentColor"
      {...props}
    >
      <circle cx="90" cy="90" r="90" fill="currentColor" fillOpacity="0.1" />
      <path
        d="M149.508 157.086L69.8392 54H54V125.97H66.8369V69.8886L139.999 164.845C143.333 162.614 146.509 160.012 149.508 157.086Z"
        fill="currentColor"
      />
      <rect x="115" y="54" width="12.8369" height="71.97" fill="currentColor" />
    </svg>
  );
}

export function TailwindIcon({ className = "w-4 h-4", ...props }: TechIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#06B6D4" className={className} {...props}>
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
    </svg>
  );
}

export function NodeIcon({ className = "w-4 h-4", ...props }: TechIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#339933" className={className} {...props}>
      <path d="M12 2l9.5 5.5v11L12 24l-9.5-5.5v-11L12 2zm0 2.3L4.5 8.7v8.6L12 21.6l7.5-4.3V8.7L12 4.3zm-1 4.2h2v4.8l3.2-1.8 1 1.7L12 16.3l-5.2-3.1 1-1.7 3.2 1.8V8.5z" />
    </svg>
  );
}

export function ExpressIcon({ className = "w-4 h-4", ...props }: TechIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8m-4-4l4 4-4 4" />
    </svg>
  );
}

export function ApiIcon({ className = "w-4 h-4", ...props }: TechIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#8B5CF6"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
      <path d="M12 8v8m-4-4h8" />
    </svg>
  );
}

export function MongoIcon({ className = "w-4 h-4", ...props }: TechIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#47A248" className={className} {...props}>
      <path d="M12.5 1.5s-6 5.8-6 11.2c0 4.2 3.1 7.8 5.5 9.3v-5.2c-.3-.2-.7-.4-1-.7-1.4-1.2-1.4-3.1-1.4-3.1s1.3.4 2.4-.4v-11.1zm.5 0v11.1c1.1.8 2.4.4 2.4.4s0 1.9-1.4 3.1c-.3.3-.7.5-1 .7v5.2c2.4-1.5 5.5-5.1 5.5-9.3 0-5.4-6-11.2-6-11.2z" />
    </svg>
  );
}

export function MongooseIcon({ className = "w-4 h-4", ...props }: TechIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#E11D48" className={className} {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-5.5h4v2h-4zm-1.5-4h7v2h-7zm0-4h7v2h-7z" />
    </svg>
  );
}

export function AuthIcon({ className = "w-4 h-4", ...props }: TechIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#F59E0B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function GitIcon({ className = "w-4 h-4", ...props }: TechIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#F05032" className={className} {...props}>
      <path d="M21.6 10.9L13.1 2.4a2.2 2.2 0 00-3.1 0L8.2 4.2l3.4 3.4a2.6 2.6 0 013.3 3.3l3.3 3.3a2.6 2.6 0 11-1.3 1.3l-3.2-3.2v4.8a2.6 2.6 0 11-1.8 0v-4.9a2.6 2.6 0 01-1.4-3.4L5.1 5.5 2.4 8.2a2.2 2.2 0 000 3.1l8.5 8.5a2.2 2.2 0 003.1 0l7.6-7.6a2.2 2.2 0 000-3.1z" />
    </svg>
  );
}

export function VscodeIcon({ className = "w-4 h-4", ...props }: TechIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#007ACC" className={className} {...props}>
      <path d="M17.6 2.1l-8 7.3-4.5-3.5L2 7.6v8.8l3.1 1.7 4.5-3.5 8 7.3 4.4-2.1V4.2l-4.4-2.1zm-8 11.2l-3.3 2.5V8.2l3.3 2.5v2.6zm8.4 4.5l-6-5.8 6-5.8v11.6z" />
    </svg>
  );
}

export function NpmIcon({ className = "w-4 h-4", ...props }: TechIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...props}>
      <rect width="24" height="24" rx="3" fill="#CB3837" />
      <path d="M4 6h16v12h-8V9h-4v9H4V6z" fill="#FFFFFF" />
    </svg>
  );
}
