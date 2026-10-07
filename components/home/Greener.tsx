/* eslint-disable @next/next/no-img-element */
import { More } from "@/components/ui";
import { greener } from "@/lib/content";

/* 6. Sustainability: the live split, verbatim, with the forest image opening beside it. */
export function Greener() {
  return (
    <section className="greener section" id="sustainability" data-tone="light" aria-labelledby="greener-title" tabIndex={-1} data-late>
      <div className="wrap greener-split">
        <div className="greener-copy">
          <h2 className="h2" id="greener-title" data-reveal="head">{greener.title}</h2>
          {greener.body.map((b) => <p className="body" key={b.slice(0, 20)} data-reveal="text">{b}</p>)}
          <div data-reveal="label"><More href={greener.more.href}>{greener.more.label}</More></div>
        </div>
        <div className="frame frame-wide" data-reveal="image">
          <img src={greener.image.src} alt={greener.image.alt} loading="lazy" data-parallax />
        </div>
      </div>
    </section>
  );
}
