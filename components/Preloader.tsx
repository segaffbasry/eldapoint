"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Logo } from "@/components/Logo";
import { EASE, EASE_IO, INTRO_DONE, reducedMotion } from "@/components/Motion";
import { getLenis } from "@/lib/scroll";

/* The company signing its name. The Eldapoint lock-up is a red band (a road that runs right under the name, then
   rises) carrying the wordmark, so it is built the way it reads:
     0.05 to 0.60  the band is laid down: a wipe with the band's own slanted leading edge, left to right
     0.22 to 0.92  "Eldapoint" rises onto it, letter by letter (9 letterforms, 0.045s apart)
     0.82 to 1.06  the red dot drops onto the i
     0.86 to 1.10  "GROUP" appears on the band
     0.00 to 1.20  a counter runs 0 to 100 (the playbook asks for an obvious progress element)
     1.20 to 1.40  hold
     1.40 to 1.95  exit: the lock-up flies to the header logo while the navy curtain (the hero's opening colour)
                   lifts away like a shutter; the handover fires at 1.40 so the hero entrance overlaps the exit
   One GSAP timeline, about 1.95s. Plays on every load (playbook: loaders must be noticed); skipped with reduced
   motion; hidden without JavaScript; a failsafe finishes it after 2.6s whatever happens. */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const el = root.current;
    let handed = false;
    const handover = () => {
      if (handed) return; handed = true;
      html.classList.remove("is-loading");
      html.dataset.intro = "done";
      getLenis()?.start();
      window.dispatchEvent(new Event(INTRO_DONE));
    };
    if (!el || !html.classList.contains("is-loading") || reducedMotion()) {
      if (el) el.style.display = "none";
      html.classList.add("logo-landed");
      handover();
      return;
    }
    window.scrollTo(0, 0);
    const mark = el.querySelector<HTMLElement>(".preloader-mark")!;
    const q = (s: string) => Array.from(el.querySelectorAll<SVGElement>(`[data-part="${s}"]`));
    const count = el.querySelector<HTMLElement>(".preloader-count")!;
    const target = document.querySelector<HTMLElement>(".header-logo .logo");
    const flight = () => {
      if (!target) return { x: 0, y: -40, scale: 0.4 };
      const a = mark.getBoundingClientRect(), b = target.getBoundingClientRect();
      return { x: b.left + b.width / 2 - (a.left + a.width / 2), y: b.top + b.height / 2 - (a.top + a.height / 2), scale: b.width / a.width };
    };

    // The band's wipe: the same slanted edge as the image reveals (see bandClip in Motion), in the band's own box.
    const band = { p: 0 };
    const lean = 30;
    const clip = () => {
      const x = -lean + band.p * (100 + lean * 2);
      return `polygon(0% 0%, ${x + lean}% 0%, ${x}% 100%, 0% 100%)`;
    };
    const bandEl = q("band")[0];
    bandEl.style.clipPath = clip();
    gsap.set(q("letter"), { y: 26, opacity: 0 });
    gsap.set(q("dot"), { y: -22, opacity: 0 });
    gsap.set(q("group"), { y: 6, opacity: 0 });
    const counter = { v: 0 };

    const tl = gsap.timeline({ onComplete: () => { el.style.display = "none"; html.classList.add("logo-landed"); } });
    tl.add(() => el.classList.add("is-active"), 0)
      .to(counter, { v: 100, duration: 1.2, ease: "power1.inOut", onUpdate: () => { count.textContent = String(Math.round(counter.v)).padStart(3, "0"); } }, 0)
      .to(el.querySelector(".preloader-fill"), { scaleX: 1, duration: 1.2, ease: "power1.inOut" }, 0)
      .to(band, { p: 1, duration: 0.55, ease: EASE_IO, onUpdate: () => { bandEl.style.clipPath = clip(); } }, 0.05)
      .to(q("letter"), { y: 0, opacity: 1, duration: 0.34, ease: EASE, stagger: 0.045 }, 0.22)
      .to(q("dot"), { y: 0, opacity: 1, duration: 0.24, ease: "back.out(2)" }, 0.82)
      .to(q("group"), { y: 0, opacity: 1, duration: 0.2, ease: EASE, stagger: 0.03 }, 0.86)
      .add(handover, 1.4)
      .to(el.querySelector(".preloader-meta"), { opacity: 0, duration: 0.25, ease: "none" }, 1.4)
      // Measured when the exit starts (tweens initialise lazily), so any late layout shift is accounted for.
      .to(mark, { x: () => flight().x, y: () => flight().y, scale: () => flight().scale, duration: 0.55, ease: EASE_IO }, 1.4)
      .to(el.querySelector(".preloader-curtain"), { clipPath: "inset(0% 0% 100% 0%)", duration: 0.55, ease: EASE_IO }, 1.42);

    const failsafe = window.setTimeout(() => { tl.progress(1); }, 2600);
    return () => { window.clearTimeout(failsafe); tl.kill(); };
  }, []);

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="preloader-curtain">
        <div className="preloader-meta wrap">
          <span className="preloader-count">000</span>
          <span className="preloader-bar"><span className="preloader-fill" /></span>
        </div>
      </div>
      <div className="preloader-mark"><Logo title="" parts /></div>
    </div>
  );
}
