/* eslint-disable @next/next/no-img-element */
import { Button, Icon } from "@/components/ui";
import { collaborate, contact } from "@/lib/content";

/* 7. Collaborate. The live film CTA ("Forge the future...") over the welder photo the live quick links use, merged
   with the live "Contact us for a quote" block, whose form is broken on the live site: the real phone, email and
   address stand in for it, and "Get in touch" goes to the contact page. */
export function Collaborate() {
  return (
    <section className="collab" id="contact" data-tone="dark" aria-labelledby="collab-title" tabIndex={-1} data-late>
      <div className="collab-media" aria-hidden="true"><img src={collaborate.image.src} alt="" loading="lazy" data-parallax /></div>
      <div className="wrap collab-inner">
        <h2 className="h2 collab-title" id="collab-title" data-reveal="head">{collaborate.title}</h2>
        <div className="collab-card" data-reveal="label">
          <p className="collab-quote">{collaborate.quote}</p>
          <ul className="collab-list">
            <li><a href={contact.tel}><Icon name="phone" />{contact.phone}</a></li>
            <li><a href={`mailto:${contact.email}`}><Icon name="mail" />{contact.email}</a></li>
            <li><span className="collab-addr"><Icon name="pin" /><span>{contact.address.join(", ")}</span></span></li>
          </ul>
          <Button href={collaborate.cta.href} tone="dark">{collaborate.cta.label}</Button>
        </div>
      </div>
    </section>
  );
}
