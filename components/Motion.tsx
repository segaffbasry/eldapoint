"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";
import { getLenis, setLenis } from "@/lib/scroll";
import { splitWords } from "@/lib/split";

gsap.registerPlugin(ScrollTrigger);

/* One easing family, both measured from the references (also --ease-out / --ease-io in globals.css):
   - "power2.out": the curve of BE's footer wipe (default-D0PYt-Z_.js, TheFooter) and OSE's reveals (inline script)
   - "power2.inOut": OSE's panel and wipe curve (inline script)
   GSAP's power2 is a cubic: CSS cubic-bezier(.215,.61,.355,1) out, (.645,.045,.355,1) in-out. */
export const EASE = "power2.out";
export const EASE_IO = "power2.inOut";

export const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Handover from the preloader: the hero entrance, the header and scrolling wait for this.
export const INTRO_DONE = "intro:done";
export const introDone = () => document.documentElement.dataset.intro === "done";
export function onIntro(fn: () => void) {
  if (introDone()) { fn(); return () => {}; }
  window.addEventListener(INTRO_DONE, fn, { once: true });
  return () => window.removeEventListener(INTRO_DONE, fn);
}

/* The image reveal is the logo's own band: a parallelogram whose right edge leans like the band's rising end
   (about 34 degrees from vertical in the source SVG: 46.14 across for 65.25 up). It sweeps left to right. */
const BAND_LEAN = 22; // percent of the frame width the slanted edge spans, top to bottom
const bandClip = (p: number) => {
  const x = -BAND_LEAN + p * (100 + BAND_LEAN * 2);
  return `polygon(0% 0%, ${x + BAND_LEAN}% 0%, ${x}% 100%, 0% 100%)`;
};

/* Page-wide behaviour:
   - the link guard: a private demo, so links keep their real hrefs but never leave the page; "#" links scroll
     through Lenis instead
   - Lenis on the GSAP ticker, synced with ScrollTrigger, stopped while the preloader plays
   - the reveal vocabulary, declared in markup with data-reveal (table in README.md):
       head   a heading: the whole phrase fades and rises once
       text   a paragraph: its words rise out of a mask, a few thousandths of a second apart
       label  small lines and buttons: a short fade and rise
       cards  a list: its children reveal in batches as they arrive (OSE's 0.03s card stagger, doubled for weight)
       image  a frame opened by the band-shaped wipe; an <img data-parallax> inside drifts about 10%
       count  a figure counts up from zero
     Anything inside [data-late] (the last chapters) plays at 0.75 of the duration. The footer has no reveals. */
export function Motion() {
  useEffect(() => {
    const guard = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      e.preventDefault();
      if (!href.startsWith("#")) return;
      const target = href === "#top" ? 0 : document.querySelector<HTMLElement>(href);
      if (target === null) return;
      const lenis = getLenis();
      // A menu link fires while the menu still has Lenis stopped; start() first so this scroll survives the close.
      if (lenis) { lenis.start(); lenis.scrollTo(target as HTMLElement | number, { duration: 1.3 }); }
      else if (typeof target === "number") window.scrollTo({ top: 0 });
      else target.scrollIntoView();
      if (typeof target !== "number") target.focus?.({ preventScroll: true });
    };
    document.addEventListener("click", guard, true);
    document.addEventListener("auxclick", guard, true);
    const unguard = () => { document.removeEventListener("click", guard, true); document.removeEventListener("auxclick", guard, true); };

    if (reducedMotion()) return unguard;

    // OSE runs Lenis at lerp 0.1; 0.12 settles a touch sooner, which keeps the end of the page from feeling laggy.
    const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1 });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    if (document.documentElement.classList.contains("is-loading")) lenis.stop();

    const ctx = gsap.context(() => {
      const pace = (el: Element) => (el.closest("[data-late]") ? 0.75 : 1);
      const once = (el: Element, start = "top 88%") => ({ trigger: el, start, once: true });

      gsap.utils.toArray<HTMLElement>('[data-reveal="head"]').forEach((el) => {
        gsap.fromTo(el, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1 * pace(el), ease: EASE, scrollTrigger: once(el) });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="text"]').forEach((el) => {
        const words = splitWords(el);
        gsap.set(el, { autoAlpha: 1 });
        gsap.fromTo(words, { yPercent: 105 }, { yPercent: 0, duration: 0.8 * pace(el), ease: EASE, stagger: 0.005, scrollTrigger: once(el) });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="label"]').forEach((el) => {
        gsap.fromTo(el, { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 * pace(el), ease: EASE, scrollTrigger: once(el, "top 94%") });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="cards"]').forEach((list) => {
        const items = Array.from(list.children) as HTMLElement[];
        gsap.set(list, { autoAlpha: 1 });
        gsap.set(items, { y: 28, autoAlpha: 0 });
        ScrollTrigger.batch(items, {
          start: "top 92%", once: true,
          onEnter: (batch) => gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.8 * pace(list), ease: EASE, stagger: 0.06 }),
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="image"]').forEach((el) => {
        const box = { p: 0 };
        gsap.set(el, { clipPath: bandClip(0) });
        gsap.to(box, {
          p: 1, duration: 1.2 * pace(el), ease: EASE_IO, scrollTrigger: once(el, "top 86%"),
          onUpdate: () => { el.style.clipPath = bandClip(box.p); },
          onComplete: () => { el.style.clipPath = "none"; },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((img) => {
        gsap.fromTo(img, { yPercent: -5, scale: 1.12 }, {
          yPercent: 5, scale: 1.12, ease: "none",
          scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const to = Number(el.dataset.count);
        const box = { v: 0 };
        const fmt = (v: number) => (to >= 10000 || el.dataset.group ? Math.round(v).toLocaleString("en-GB") : String(Math.round(v)));
        el.textContent = fmt(0);
        gsap.to(box, { v: to, duration: 1.6 * pace(el), ease: EASE, scrollTrigger: once(el), onUpdate: () => { el.textContent = fmt(box.v); } });
      });
    });
    document.documentElement.classList.add("motion-ready");

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      unguard();
      window.removeEventListener("load", refresh);
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);
  return null;
}
