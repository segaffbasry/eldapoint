"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { EASE, EASE_IO, onIntro, reducedMotion } from "@/components/Motion";
import { Button, Icon } from "@/components/ui";
import { BAND } from "@/lib/logo";
import { hero } from "@/lib/content";

const HOLD = 6; // seconds each still is shown before the cross-fade

/* The opening scene, navy like the preloader curtain. The live hero is a welding film on domain-locked Vimeo, so its
   own poster frames stand in for it: two stills cross-fade on a slow push-in, the way the film cuts between shots
   (a portrait frame on phones). Because it moves by itself, it has a pause control, and it stops when off-screen.
   Behind the headline, the logo's band is drawn in outline at architectural scale (OSE's giant outlined mark); it
   traces itself in as part of the entrance. The entrance waits for intro:done:
     stills settle from 1.12 to 1.04, the headline lines rise out of their masks, the band outline draws, then the
     lead and buttons. This is one of only two places (with the preloader) where heavier motion is used. */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  pausedRef.current = paused;

  useEffect(() => {
    const el = root.current; if (!el) return;
    if (reducedMotion()) { el.classList.add("is-in"); return; }
    const stills = Array.from(el.querySelectorAll<HTMLElement>(".hero-still"));
    const lines = el.querySelectorAll(".hero-line > span");
    const outline = el.querySelector<SVGPathElement>(".hero-band path")!;
    const len = outline.getTotalLength();
    gsap.set(outline, { strokeDasharray: len, strokeDashoffset: len });

    // The cross-fade loop. Each still pushes in slowly while it is shown; after HOLD seconds the next one fades in
    // above it. Every running tween is tracked so the pause control and the off-screen check can freeze them all.
    const live = new Set<gsap.core.Animation>();
    const track = <T extends gsap.core.Animation>(t: T) => { live.add(t); t.eventCallback("onComplete", () => live.delete(t)); if (frozen()) t.pause(); return t; };
    let visible = true;
    let started = false;
    const frozen = () => pausedRef.current || !visible;
    const show = (i: number) => {
      const s = stills[i], prev = stills[(i - 1 + stills.length) % stills.length];
      gsap.set(prev, { zIndex: 1 }); gsap.set(s, { zIndex: 2 });
      track(gsap.fromTo(s.querySelector("img"), { scale: 1.04 }, { scale: 1.1, duration: HOLD + 1.4, ease: "none" }));
      track(gsap.fromTo(s, { opacity: 0 }, { opacity: 1, duration: 1.4, ease: EASE_IO, onComplete: () => { gsap.set(prev, { opacity: 0 }); } }));
      track(gsap.delayedCall(HOLD, () => show((i + 1) % stills.length)));
    };
    const startCycle = () => {
      started = true;
      track(gsap.fromTo(stills[0].querySelector("img"), { scale: 1.04 }, { scale: 1.1, duration: HOLD, ease: "none" }));
      track(gsap.delayedCall(HOLD - 1.4, () => show(1)));
    };
    const sync = () => { live.forEach((t) => (frozen() ? t.pause() : t.resume())); };
    (el as HTMLElement & { _sync?: () => void })._sync = sync;

    const off = onIntro(() => {
      el.classList.add("is-in");
      gsap.timeline({ onComplete: startCycle })
        .fromTo(stills[0].querySelector("img"), { scale: 1.12 }, { scale: 1.04, duration: 1.6, ease: EASE }, 0)
        .fromTo(lines, { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: EASE, stagger: 0.09 }, 0.1)
        .to(outline, { strokeDashoffset: 0, duration: 1.8, ease: EASE_IO }, 0.15)
        .fromTo(el.querySelectorAll("[data-hero-in]"), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: EASE, stagger: 0.08 }, 0.5);
    });

    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (started) sync(); });
    io.observe(el);
    return () => { off(); io.disconnect(); live.forEach((t) => t.kill()); };
  }, []);

  const toggle = () => {
    pausedRef.current = !paused;
    setPaused(!paused);
    (root.current as (HTMLElement & { _sync?: () => void }) | null)?._sync?.();
  };

  return (
    <section className="hero" id="top" ref={root} data-tone="dark" aria-labelledby="hero-title">
      <div className="hero-media">
        {hero.stills.map((s, i) => (
          <div className="hero-still" key={s.src} style={{ opacity: i === 0 ? 1 : 0 }}>
            <picture>
              {i === 0 && <source media="(max-width: 640px)" srcSet={hero.mobile} />}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.src} alt={i === 0 ? s.alt : ""} fetchPriority={i === 0 ? "high" : "auto"} loading={i === 0 ? "eager" : "lazy"} />
            </picture>
          </div>
        ))}
        <div className="hero-shade" />
      </div>
      <svg className="hero-band" viewBox="-2 -2 304 92" aria-hidden="true" focusable="false"><path d={BAND} /></svg>
      <div className="hero-body wrap">
        <h1 className="hero-title" id="hero-title">
          {hero.title.map((l) => <span className="hero-line" key={l}><span>{l}</span></span>)}
        </h1>
        <p className="hero-lead" data-hero-in>{hero.lead}</p>
        <div className="hero-ctas" data-hero-in>
          <Button href={hero.primary.href} tone="dark">{hero.primary.label}</Button>
          <a className="hero-link" href={hero.secondary.href}>{hero.secondary.label}<Icon name="arrow" /></a>
        </div>
      </div>
      <button className="hero-pause" type="button" onClick={toggle} aria-pressed={paused} data-hero-in>
        <Icon name={paused ? "play" : "pause"} /><span className="sr-only">{paused ? "Play" : "Pause"} the background images</span>
      </button>
    </section>
  );
}
