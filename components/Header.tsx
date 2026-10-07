"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { EASE, EASE_IO, onIntro, reducedMotion } from "@/components/Motion";
import { Icon } from "@/components/ui";
import { capabilities, chapters, contact, nav, products, sectors, socials } from "@/lib/content";
import { getLenis } from "@/lib/scroll";

/* Full-screen menu. A navy panel drops from the top like a roller shutter (OSE's power2.inOut), then the live mega
   menu's three columns and the side column rise in, 0.04s apart. GSAP timeline in, the same timeline reversed out.
   Focus is trapped inside, Esc closes, and focus returns to the toggle. */
function Menu({ open, close }: { open: boolean; close: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const el = root.current; if (!el) return;
    const t = gsap.timeline({ paused: true, onReverseComplete: () => { el.style.visibility = "hidden"; } });
    t.fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: EASE_IO }, 0)
      // opacity, not autoAlpha: the links must be focusable the moment the menu opens.
      .fromTo(el.querySelectorAll("[data-menu-in]"), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: EASE, stagger: 0.04 }, 0.28);
    tl.current = t;
    return () => { t.kill(); };
  }, []);

  useEffect(() => {
    const el = root.current, t = tl.current; if (!el || !t) return;
    const lenis = getLenis();
    if (open) {
      el.style.visibility = "visible";
      t.timeScale(reducedMotion() ? 100 : 1).play();
      lenis?.stop();
      const focusables = () => Array.from(el.querySelectorAll<HTMLElement>("a[href], button"));
      focusables()[0]?.focus();
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") { close(); return; }
        if (e.key !== "Tab") return;
        const f = focusables(), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      };
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }
    if (t.progress() > 0) { lenis?.start(); t.timeScale(reducedMotion() ? 100 : 1.4).reverse(); }
  }, [open, close]);

  // Chapter links close the menu first; the link guard in Motion then scrolls through Lenis.
  const onClick = (e: React.MouseEvent) => { if ((e.target as Element).closest('a[href^="#"]')) close(); };
  const out = { target: "_blank", rel: "noopener" };

  return (
    <div className="menu" id="site-menu" ref={root} role="dialog" aria-modal="true" aria-label="Menu" inert={!open} data-lenis-prevent onClick={onClick}>
      <div className="menu-inner wrap">
        <nav className="menu-cols" aria-label="Eldapoint Group">
          <div className="menu-col" data-menu-in>
            <a className="menu-big" href={nav.products.href} {...out}>{nav.products.label}</a>
            <ul className="menu-list">{products.map((g) => <li key={g.label}><a href={g.href} {...out}>{g.label}</a></li>)}</ul>
          </div>
          <div className="menu-col" data-menu-in>
            <a className="menu-big" href={nav.capabilities.href} {...out}>{nav.capabilities.label}</a>
            <ul className="menu-list">{capabilities.map((g) => <li key={g.label}><a href={g.href} {...out}>{g.label}</a></li>)}</ul>
          </div>
          <div className="menu-col menu-col-sectors" data-menu-in>
            <a className="menu-big" href={nav.sectors.href} {...out}>{nav.sectors.label}</a>
            <ul className="menu-list menu-list-2">{sectors.map((s) => <li key={s.label}><a href={s.href} {...out}>{s.label}</a></li>)}</ul>
          </div>
        </nav>
        <div className="menu-side">
          <ul className="menu-more" data-menu-in>
            {[nav.about, nav.cases, nav.blog, nav.resources, nav.contact].map((l) => <li key={l.label}><a href={l.href} {...out}>{l.label}</a></li>)}
          </ul>
          <div data-menu-in>
            <p className="menu-head">On this page</p>
            <ul className="menu-list">{chapters.map((c) => <li key={c.href}><a href={c.href}>{c.label}</a></li>)}</ul>
          </div>
          <div className="menu-contact" data-menu-in>
            <a href={contact.tel}><Icon name="phone" />{contact.phone}</a>
            <a href={`mailto:${contact.email}`}><Icon name="mail" />{contact.email}</a>
            <ul className="socials">
              {socials.map((s) => <li key={s.name}><a href={s.href} aria-label={s.name} {...out}><Icon name={s.icon} /></a></li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* No bar and no box: the lock-up on the left, the live top-level destinations and the menu toggle on the right.
   Sections declare data-tone="dark" or "light"; whichever section is under the header sets its colour (white over
   the navy hero and photos, navy over the light page). It slides away on the way down and returns on the way up. */
export function Header() {
  const [open, setOpen] = useState(false);
  // Kept in state, not added to classList: React rewrites className on every render.
  const [entered, setEntered] = useState(false);
  const [tone, setTone] = useState<"dark" | "light">("dark");
  const bar = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => { setOpen(false); toggle.current?.focus(); }, []);

  useEffect(() => {
    const el = bar.current; if (!el) return;
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY, d = y - last;
      if (y < 120) { el.classList.remove("is-hidden"); last = y; return; }
      if (Math.abs(d) < 6) return;
      el.classList.toggle("is-hidden", d > 0);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const triggers = gsap.utils.toArray<HTMLElement>("[data-tone]").map((s) => ScrollTrigger.create({
      trigger: s, start: "top 44px", end: "bottom 44px",
      onToggle: (self) => { if (self.isActive) setTone(s.dataset.tone === "light" ? "light" : "dark"); },
    }));
    const off = onIntro(() => setEntered(true));
    return () => { window.removeEventListener("scroll", onScroll); triggers.forEach((t) => t.kill()); off(); };
  }, []);

  useEffect(() => { if (open) bar.current?.classList.remove("is-hidden"); }, [open]);

  const quick = [nav.products, nav.capabilities, nav.sectors, nav.cases];
  const out = { target: "_blank", rel: "noopener" };
  return (
    <>
      <header className={`site-header tone-${open ? "dark" : tone}${entered ? " is-in" : ""}${open ? " is-open" : ""}`} ref={bar}>
        <a href="#top" className="header-logo" aria-label="Eldapoint Group, back to the top"><Logo title="" /></a>
        <nav className="header-nav" aria-label="Main">
          <ul>{quick.map((l) => <li key={l.label}><a href={l.href} {...out}>{l.label}</a></li>)}</ul>
        </nav>
        <a className="header-cta" href={nav.contact.href} {...out}>{nav.contact.label}</a>
        <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="site-menu" onClick={() => (open ? close() : setOpen(true))}>
          <span className="menu-toggle-label">{open ? "Close" : "Menu"}</span>
          <span className="menu-toggle-lines" aria-hidden="true"><i /><i /></span>
        </button>
      </header>
      <Menu open={open} close={close} />
    </>
  );
}
