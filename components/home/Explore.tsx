/* eslint-disable @next/next/no-img-element */
import { Icon, Wipe } from "@/components/ui";
import { explore, facts } from "@/lib/content";

/* 3. Explore. The group's figures from About Us count up across a ruled row, then the live page's three quick
   links (Capabilities, Products, Sectors) become tall tiles: a photo on top, the live sentence below. The text
   panel carries the copied Breakthrough Energy wipe: on hover or focus a red copy of the panel opens from the left
   in 0.3s (power2.out) and closes the same way. */
export function Explore() {
  return (
    <section className="explore section band-mist" id="explore" data-tone="light" aria-labelledby="explore-title" tabIndex={-1}>
      <div className="wrap">
        <div className="explore-head">
          <h2 className="h2" id="explore-title" data-reveal="head">{explore.title}</h2>
          <dl className="facts" data-reveal="cards">
            {facts.map((f) => (
              <div className="fact" key={f.label}>
                <dt className="fact-label">{f.label}</dt>
                <dd className="fact-value"><span data-count={f.value} {...(f.value >= 9000 ? { "data-group": "1" } : {})}>{f.value >= 9000 ? f.value.toLocaleString("en-GB") : f.value}</span>{f.suffix}</dd>
              </div>
            ))}
          </dl>
        </div>
        <ul className="tiles" data-reveal="cards">
          {explore.tiles.map((t) => (
            <li key={t.title} className="tile">
              <div className="tile-media"><img src={t.image} alt={t.alt} loading="lazy" /></div>
              <Wipe href={t.href} className="tile-link">
                <span className="tile-title">{t.title}</span>
                <span className="tile-text">{t.text}</span>
                <span className="tile-cta">{t.cta}<Icon name="out" /></span>
              </Wipe>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
