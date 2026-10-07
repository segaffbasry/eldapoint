/* eslint-disable @next/next/no-img-element */
import { Button, Icon } from "@/components/ui";
import { range } from "@/lib/content";

/* 4. Product range. The live CTA band ("Discover the future...") becomes the heading of the live six-photo gallery,
   laid out as a hairline-ruled 3 x 2 grid (McMaster's card rows). Each tile names its product family; on hover the
   photo leans in slightly and the arrow steps out. */
export function Range() {
  return (
    <section className="range section" id="products" data-tone="light" aria-labelledby="range-title" tabIndex={-1}>
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2" id="range-title" data-reveal="head">{range.title}</h2>
          <div data-reveal="label"><Button href={range.cta.href}>{range.cta.label}</Button></div>
        </div>
        <ul className="range-grid" data-reveal="cards">
          {range.items.map((p) => (
            <li key={p.name}>
              <a className="range-item" href={p.href} target="_blank" rel="noopener">
                <span className="range-media"><img src={p.image} alt={p.alt} loading="lazy" /></span>
                <span className="range-text">
                  <span className="range-name">{p.name}</span>
                  <span className="range-group">{p.group}</span>
                </span>
                <Icon name="out" className="range-arrow" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
