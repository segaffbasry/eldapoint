/* eslint-disable @next/next/no-img-element */
import { More } from "@/components/ui";
import { group } from "@/lib/content";

/* 2. The group. The live intro split (HQ aerial beside the copy, every inline link kept), followed by what the
   live page only mentions: the five companies themselves, as a hairline-ruled row (McMaster's card rows). Their
   real logos are shown as single-colour marks (CSS masks filled with navy) so no hue outside the palette appears. */
export function Group() {
  return (
    <section className="group section" id="group" data-tone="light" aria-labelledby="group-title" tabIndex={-1}>
      <div className="wrap group-split">
        <figure className="group-media">
          <div className="frame frame-square" data-reveal="image">
            <img src={group.image.src} alt={group.image.alt} loading="lazy" data-parallax />
          </div>
          <figcaption className="caption" data-reveal="label">{group.image.alt}</figcaption>
        </figure>
        <div className="group-copy">
          <h2 className="h2 group-title" id="group-title" data-reveal="head">{group.statement}</h2>
          <p className="body" data-reveal="text">
            {group.body.map((r, i) => (typeof r === "string" ? r : <a key={i} className="inline" href={r.href} target="_blank" rel="noopener">{r.label}</a>))}
          </p>
          <div data-reveal="label"><More href={group.more.href}>{group.more.label}</More></div>
        </div>
      </div>
      <div className="wrap">
        <ul className="companies" data-reveal="cards" aria-label="The five companies of the Eldapoint Group">
          {group.companies.map((c) => (
            <li key={c.name}>
              <a href={c.href} target="_blank" rel="noopener" className="company">
                <span className="company-logo" style={{ maskImage: `url(${c.logo})`, WebkitMaskImage: `url(${c.logo})` }} role="img" aria-label={c.name} />
                <span className="company-note">{c.note}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
