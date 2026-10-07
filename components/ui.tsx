import type { ReactNode } from "react";
import { brandIcons } from "@/lib/brand-icons";

const glyphs = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
  // BE's footer arrow (TheFooter icon-arrow), redrawn on a 24 grid: an up-right arrow.
  out: <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
  play: <path d="M8 5.5v13l11-6.5z" fill="currentColor" />,
  pause: <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" />,
  phone: <path d="M6.6 3.5h3l1.5 4-2 1.3a11 11 0 0 0 6.1 6.1l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />,
  mail: <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><rect x="3.5" y="5.5" width="17" height="13" rx="1.5" /><path d="m4 6.5 8 6.5 8-6.5" /></g>,
  pin: <g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></g>,
};

export type IconName = keyof typeof glyphs | keyof typeof brandIcons;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const brand = (brandIcons as Record<string, string>)[name];
  return (
    <svg className={`icon ${className ?? ""}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {brand ? <path d={brand} fill="currentColor" /> : glyphs[name as keyof typeof glyphs]}
    </svg>
  );
}

const ext = (href: string) => (href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener" });

/* THE COPIED INTERACTION: Breakthrough Energy's footer primary link (assets/default-D0PYt-Z_.js, "TheFooter").
   The content is set twice. The second copy sits exactly over the first, filled with the accent, and starts fully
   clipped from the right: BE's clip-path rect(0 0% 100% 0), written here as inset(0 100% 0 0). On mouseenter it
   opens to the full width, on mouseleave it closes again, both over 0.3s with GSAP power2.out. BE drives it with
   gsap.to; a CSS transition on the same property, duration and curve gives the identical motion and also works
   for keyboard focus. Curve and duration are the variables --wipe-ease and --wipe-dur in globals.css.
   Used for the three Explore tiles, the buttons and the footer's primary links. */
export function Wipe({ href, children, className, label }: { href: string; children: ReactNode; className?: string; label?: string }) {
  return (
    <a href={href} className={`wipe ${className ?? ""}`} aria-label={label} {...ext(href)}>
      <span className="wipe-face">{children}</span>
      <span className="wipe-face wipe-over" aria-hidden="true">{children}</span>
    </a>
  );
}

/* A button built on the same wipe: a hairline box whose label and arrow are re-set in white on red as it fills. */
export function Button({ href, children, tone = "light", className }: { href: string; children: ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <Wipe href={href} className={`btn btn-${tone} ${className ?? ""}`}>
      <span className="btn-label">{children}</span><Icon name={href.startsWith("#") ? "arrow" : "out"} />
    </Wipe>
  );
}

/* A text link with a short arrow that steps right on hover; used inside cards and copy. */
export function More({ href, children, sr }: { href: string; children: ReactNode; sr?: string }) {
  return (
    <a className="more" href={href} {...ext(href)}>
      <span>{children}</span>{sr && <span className="sr-only"> {sr}</span>}<Icon name="arrow" />
    </a>
  );
}
