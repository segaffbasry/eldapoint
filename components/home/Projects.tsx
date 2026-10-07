/* eslint-disable @next/next/no-img-element */
import { More } from "@/components/ui";
import { projects } from "@/lib/content";

/* 5. Projects. Six of the live slider's eleven case studies (the ones with real photography; see README), as an
   editorial grid: the British Antarctic Survey conversion leads wide, the rest follow in a ruled two-up and
   three-up rhythm. Every card opens the real case study. */
export function Projects() {
  return (
    <section className="projects section band-mist" id="projects" data-tone="light" aria-labelledby="projects-title" tabIndex={-1}>
      <div className="wrap">
        <div className="section-head">
          <div>
            <h2 className="h2" id="projects-title" data-reveal="head">{projects.title}</h2>
            <p className="body section-intro" data-reveal="text">{projects.intro}</p>
          </div>
          <div data-reveal="label"><More href={projects.all.href}>{projects.all.label}</More></div>
        </div>
        <ul className="cases" data-reveal="cards">
          {projects.items.map((c, i) => (
            <li key={c.href} className={`case case-${i}`}>
              <a href={c.href} target="_blank" rel="noopener">
                <span className="case-media"><img src={c.image} alt={c.alt} loading="lazy" /></span>
                <span className="case-body">
                  <span className="case-title">{c.title}</span>
                  <span className="case-text">{c.text}</span>
                  <span className="case-more">Read the case study</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
