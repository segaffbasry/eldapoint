import { Logo } from "@/components/Logo";
import { Icon, Wipe } from "@/components/ui";
import { contact, footer, legal, nav, socials } from "@/lib/content";

/* Footer. Static (no reveals at the bottom of the page; playbook). The three primary destinations sit in a ruled
   row with the copied Breakthrough Energy wipe, which is where BE itself uses it; then contact, socials and the
   live legal links. */
export function Footer() {
  const primary = [nav.products, nav.capabilities, nav.sectors, nav.cases];
  const out = { target: "_blank", rel: "noopener" };
  return (
    <footer className="footer" data-tone="dark">
      <div className="wrap">
        <nav className="footer-primary" aria-label="Explore Eldapoint">
          {primary.map((l) => (
            <Wipe key={l.label} href={l.href} className="footer-big"><span>{l.label}</span><Icon name="out" /></Wipe>
          ))}
        </nav>
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#top" className="footer-logo" aria-label="Eldapoint Group, back to the top"><Logo title="" /></a>
            <p>{footer.tagline}</p>
          </div>
          <div>
            <p className="footer-head">Contact us</p>
            <ul className="footer-list">
              <li><a href={contact.tel}>{contact.phone}</a></li>
              <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
              <li className="footer-addr">{contact.address.map((l) => <span key={l}>{l}</span>)}<span>{contact.company}</span></li>
            </ul>
          </div>
          <div>
            <p className="footer-head">The group</p>
            <ul className="footer-list">
              {[nav.about, nav.blog, nav.resources, nav.contact].map((l) => <li key={l.label}><a href={l.href} {...out}>{l.label}</a></li>)}
            </ul>
          </div>
          <div>
            <p className="footer-head">Follow us</p>
            <ul className="socials">
              {socials.map((s) => <li key={s.name}><a href={s.href} aria-label={s.name} {...out}><Icon name={s.icon} /></a></li>)}
            </ul>
          </div>
        </div>
        <div className="footer-base">
          <ul className="footer-legal">{legal.map((l) => <li key={l.label}><a href={l.href} {...out}>{l.label}</a></li>)}</ul>
          <p>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
