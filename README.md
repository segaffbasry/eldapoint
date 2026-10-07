# Eldapoint Group: homepage redesign (private prospect demo)

Live site: https://www.eldapoint-group.co.uk/
Repo: https://github.com/segaffbasry/eldapoint

One route (`/`). Next.js 16 App Router, TypeScript, GSAP + ScrollTrigger, Lenis. No UI kits or CSS frameworks.
Private prospect demo: noindex/nofollow, no sitemap, PostHog EU, and links that never leave the page.

```bash
npm install
npm run dev        # http://127.0.0.1:3046
npm run build      # static: "/" plus Next's own /_not-found (and the generated /icon.svg)
npm run media      # re-fetch every image (Optimole CDN) and rewrite public/media
npm run logo       # re-split the official logo SVG into lib/logo.ts
```
Checks (need a running server; default URL is the dev port): `node scripts/shots.mjs <width> <dir> [url] [--reduced]`,
`node scripts/intro.mjs <dir> [width] [url]`, `node scripts/menu.mjs [url]`, `node scripts/wipe.mjs [url]`,
`node scripts/check-links.mjs [url]`.

---

## The page

| # | Section (id) | Ground | Lead imagery | Live items | Here | Gap explained |
|---|---|---|---|---|---|---|
| 1 | Hero (`#top`) | Navy (opening scene) | Two poster frames of the live welding film, cross-fading; portrait frame on phones | 1 film | 2 stills | The film is domain-locked Vimeo (see Recon). Pause control kept. |
| 2 | The group (`#group`) | White | Knowsley HQ aerial | Intro copy + 10 inline links + "Our Full Product Range" | All of it, plus the **five companies** (logos + specialism) from About Us | Companies added: the live page says "five companies" but never names them |
| 3 | Explore (`#explore`) | Mist | 3 tile photos | 3 quick links | 3 tiles + 4 group facts (About Us) | Facts added from About Us (1968, 7 sites, 250+ staff, 9,000 tonnes) |
| 4 | Product range (`#products`) | White | 6 product photos | CTA band + 6 gallery tiles | Both, merged | none |
| 5 | Projects (`#projects`) | Mist | 6 case photos | 11 case studies | 6 | Pacing cap. The 5 left out: Glencoe DNO Enclosure, Designing Stillages, Cyclewise, Aston Villa (all four are video-only cards whose mp4s sit behind Cloudflare and are not archived) and Farringdon REB steel pressings (only a 420px image exists). All are one click away via "View all case studies". |
| 6 | Sustainability (`#sustainability`) | White | Forest image | Split copy + Learn More | Same, verbatim | none |
| 7 | Collaborate (`#contact`) | Navy over welder photo | Welder photo | Film CTA + "Contact us for a quote" form | CTA + phone, email, address + Get in touch | The live form is broken (prints its shortcode); the film is domain-locked |
| | Footer | Navy | | Newsletter heading, contact, socials, legal, agency credit | Contact, socials, legal, 4 big links | Newsletter heading had no form behind it; agency credit dropped |

**Page height (production build, measured by `scripts/shots.mjs`):**

| Width | Height | Viewports |
|---|---|---|
| 1440 x 900 | 7,115px | 7.9 |
| 768 x 1024 | 9,049px | 8.8 |
| 375 x 812 | 8,884px | 10.9 |

No horizontal scroll, no broken images and no console errors at any of the three widths.

### Copy decisions
- All copy is Eldapoint's own: the homepage, plus About Us for the five companies, the facts and the nightclub sentence. Headings are set in sentence case instead of the live all-caps.
- One line is composed rather than copied: the Explore heading, "Design, build and install, all within one group". It is built from the live Capabilities sentence ("From design and modelling to installation and servicing"), because the live block has no heading.
- Case study excerpts are cut at a sentence end. The live cards truncate mid-word ("peak sea..."). The nightclub excerpt uses the About Us sentence about the same project.
- The hero lead is the site's title tag, "Reshaping the industrial landscape".
- No em or en dashes anywhere (checked in the built HTML).

---

## Systems

### Palette and type
Navy `#002B49`, Red `#E0362C`, Mist `#EDEDED` and White, confirmed 2026-10-07. Tints are these at reduced opacity, and no other hue appears.
- **Red on white is 4.44:1**, just under AA for small text. So red is used for rules, arrows, figures' underlines and the large footer wipe, never for body-size text.
- Wipes on light grounds fill navy. Buttons on dark grounds fill white.
- The five group logos carry their own accents (JSB orange, Fibaform blue). They are drawn as CSS masks filled with navy, so they stay inside the palette and keep their real shapes.

Montserrat only (the live site's sole family), self-hosted as the variable woff2 from `@fontsource-variable`. Display is 600 in sentence case. The type scale follows McMaster: H1 68px max, H2 38px max, body 17px, measure 64ch.

### Spacing
CSS variables in `app/globals.css`:
- `--sp-section`: 88px at 1440, 56px on phones. It is the only vertical padding, so no section stacks two.
- `--sp-head`: heading block to content.
- `--gutter`: 16 to 48px.

### Preloader (`components/Preloader.tsx`)
Built from the real logo. `scripts/logo.py` splits the official header SVG into:
- the red band
- the 9 "Eldapoint" letterforms
- the i-dot
- the 5 "GROUP" letters

The lock-up reads as a name written on a road, so it is built that way, on one GSAP timeline:
- **0.05 to 0.60s:** the band is laid down by a wipe with the band's own slanted edge.
- **0.22 to 0.92s:** the letters rise onto it one by one.
- **0.82s:** the red dot drops onto the i.
- **0.86s:** GROUP appears.
- **0 to 1.2s:** a 000 to 100 counter and a red hairline fill run. The playbook asks for an obvious progress element.
- **1.20 to 1.40s:** hold.
- **1.40 to 1.95s:** exit. The lock-up flies onto the header logo while the navy curtain (the hero's opening colour) lifts like a shutter.

Handover happens at 1.40s: `is-loading` is removed, `data-intro="done"` is set and `intro:done` is dispatched. The hero entrance overlaps the exit. Lenis is stopped until then.

Other rules:
- Plays on every load (playbook).
- Skipped with reduced motion.
- Hidden by `<noscript>`.
- CSS starting states stop the finished logo from flashing before hydration.
- A failsafe completes it at 2.6s.

Measured on the production build: `intro:done` at 1.48s (1440) and 1.53s (375) after navigation. scrollY stayed 0 when a wheel scroll was attempted mid-intro.

### Motion (`components/Motion.tsx`)
Lenis runs on the GSAP ticker with ScrollTrigger synced. Its lerp is 0.12; OSE uses 0.1, and the playbook prefers the slightly firmer value for the page bottom. Anchor links go through Lenis. The menu and preloader stop it.

There is one easing family, measured from the references:
- `power2.out` (BE's wipe, OSE's reveals), CSS `cubic-bezier(.215,.61,.355,1)`
- `power2.inOut` (OSE's panels), CSS `cubic-bezier(.645,.045,.355,1)`

| Move | Applied to | What it does | Duration |
|---|---|---|---|
| `head` | every H2 | the whole phrase fades and rises 24px | 1.0s |
| `text` | paragraphs | words rise out of a line mask, 5ms apart | 0.8s |
| `label` | small lines, buttons, more-links | fade and rise 12px | 0.6s |
| `cards` | lists (companies, facts, tiles, range, cases) | batched, rise 28px, 60ms stagger (OSE's 30ms, doubled for heavier cards) | 0.8s |
| `image` | framed photos | opened by a parallelogram wipe with the logo band's lean, left to right; the photo inside drifts about 10% (`data-parallax`) | 1.2s |
| `count` | the four facts | counts up from zero | 1.6s |

Every move plays once. Moves inside `[data-late]` (sustainability, collaborate) run at 0.75x. The footer has no reveals. Per-character motion appears only in the preloader and the hero.

### Hero (`components/home/Hero.tsx`)
- Two poster frames of the live film cross-fade every 6s on a slow push-in. They pause off-screen and with the pause button.
- The logo band is drawn in outline at architectural scale behind the headline: OSE's giant outlined mark, applied to Eldapoint's own shape. It traces itself in with `stroke-dashoffset` during the entrance.
- The headline lines rise out of masks after `intro:done`.
- The photos keep their natural colour (about 90% saturation) under a navy gradient for legibility. There is no duotone (playbook).

### The copied interaction (`Wipe` in `components/ui.tsx`)
This is Breakthrough Energy's footer primary-link wipe, read from `assets/default-D0PYt-Z_.js` (TheFooter):
- The content is set twice.
- The copy on top is filled and clipped `rect(0 0% 100% 0)`.
- `mouseenter` animates it to `rect(0 100% 100% 0)` in 0.3s `power2.out`; `mouseleave` reverses it the same way.

It is rebuilt as a CSS transition on the same property, duration and curve: `--wipe-dur`, `--wipe-ease`. This also works for keyboard focus.

Side by side (`scripts/wipe.mjs`, sampled per frame), BE vs this build:

| Time | BE | This build |
|---|---|---|
| ~30ms | 28.7% | 30.4% |
| ~65ms | 52.5% | 55.1% |
| ~100ms | 69.9% | 72.2% |
| ~165ms | 90.9% | 90.7% |
| 300ms | 100% | 100% |

It is used in four places:
- the footer's four big links (red fill, exactly where BE uses it)
- the three Explore tiles (navy fill)
- every button (navy fill on light grounds, white fill on dark)

### Header and menu (`components/Header.tsx`)
- **Header:** no bar or box. Sections declare `data-tone`, and the header turns white over dark grounds and navy over light ones. It hides on scroll down and returns on scroll up.
- **Menu:** full screen, opened by a navy shutter. It holds the live mega menu: Products (6 groups), Capabilities (7), Sectors (18), plus About, Case Studies, Blog, Resources, Contact, the on-page chapters, phone, email and socials.
  - It is one GSAP timeline that plays in and reverses out.
  - Focus is trapped. `scripts/menu.mjs`: Tab reaches the toggle, Enter opens it, focus lands on "Products", the trap holds across all 51 focusables, and Esc closes it and returns focus to the toggle.

### Private-demo settings
- `robots: noindex, nofollow, nocache`. No sitemap (`/sitemap.xml` returns 404).
- PostHog EU lives in `lib/posthog.ts`: key from `NEXT_PUBLIC_POSTHOG_KEY` with a literal fallback, `defaults: 2026-05-30`, pageview, pageleave, autocapture, session recording and `register({ site })`. UTM parameters are registered too. `scroll_depth` fires once each at 25/50/75/100. Surveys are disabled, and the script has no `id`.
- **Link guard:** every link keeps its real href but never navigates; "#" links scroll through Lenis. Checked by clicking a product tile, which left the URL unchanged with no new tab.
- No visible tracking or Regen UI.

### Links
`scripts/check-links.mjs` covers 72 unique hrefs with **0 problems**:
- every eldapoint-group.co.uk URL is one the live homepage itself links to (or appears in the archive index)
- every `#` anchor exists
- the rest are tel/mailto links and the four social profiles

External links carry `target="_blank" rel="noopener"`.

### Images
All images are Eldapoint's own:
- **Homepage images** come through the Optimole CDN at full size (`scripts/media.sh`).
- **Explore tiles:** two of the photos come from About Us.
- **Hero frames:** the live film's poster frames, decoded from the saved page.
- **Group logos:** the "use on blue bg" SVGs from About Us.
- **Main logo:** the official header SVG.

`_scrape/` holds the raw sources and is gitignored.

### Files
```
app/layout.tsx         metadata (noindex), boot script, PostHog, font + hero preloads
app/page.tsx           the single route: Preloader, Header, 7 sections, Footer, Motion
app/globals.css        tokens, spacing, type scale, every component's styles
components/Motion.tsx  Lenis, link guard, reveal vocabulary, easing constants
components/Preloader.tsx, Header.tsx (+ Menu), Logo.tsx, ui.tsx (Icon, Wipe, Button, More)
components/home/       Hero, Group, Explore, Range, Projects, Greener, Collaborate, Footer
lib/content.ts         every word and URL on the page
lib/logo.ts            generated logo parts
scripts/               media.sh, logo.py, shots/intro/menu/wipe/check-links .mjs
```

---



---

## Recon note (Phase 1, 2026-10-07; palette, type and hero decisions confirmed by you the same day)

### Access problems and how they were handled
- **Every eldapoint-group.co.uk URL is behind a Cloudflare managed challenge** ("Verify you are human"). This includes the HTML, CSS, JS and `/wp-content/uploads/*.mp4`. Curl and the built-in browser both stop at the challenge, and I don't solve CAPTCHAs.
- **Homepage HTML and text** come from the Wayback Machine snapshot of 2025-05-21 (`_scrape/wb-home-20250521.html`). Later snapshots are challenge pages. The zip of the live page you sent (2026-10-07) contains the same hero poster frames, the same welder quick-links image, the same HQ photo and the same Vimeo IDs. So the homepage has not materially changed since that snapshot.
- **Images** are served by the Optimole CDN (`mlqrzi5uqnon.i.optimole.com/...`), which is *not* behind the challenge. Every homepage image is downloaded at full size into `_scrape/img/`.
- **Films:** the hero film is Vimeo `1023305035` (desktop) / `1026479487` (mobile), and the CTA band film is `888632799` / `888641339`. These are domain-locked: yt-dlp returns 401, and the player shows "couldn't verify the security of your connection". The four case-study mp4s are behind Cloudflare and not archived. **Only the poster frames are available** (in the zip, decoded to `_scrape/live/decoded/`).
- In the zip, the images were base64 text files (AVIF/WebP) and most stylesheets were Cloudflare challenge pages. Colours and type were therefore measured from computed styles on the rendered archive page.

### 1. Live homepage inventory (top to bottom)
| # | Section | Content | Count |
|---|---|---|---|
| 0 | Header | Logo, search, "Resources" button, phone, mega menu (Products 6 groups / 29 items, Capabilities 7 groups / 14 items, Sectors 18, About Us, Case Studies, Blog) | 3 mega menus |
| 1 | Hero | Vimeo welding film (desktop + mobile cuts), no headline over it (the poster frame has "BRIDGING TODAY'S..." burned in) | 1 film |
| 2 | Intro split | H1 "COMPREHENSIVE ENGINEERING SOLUTIONS FOR ALL SECTORS", 2 paragraphs with 10 inline links, "Our Full Product Range...", HQ aerial photo (Knowsley) | 1 image, 11 links |
| 3 | CTA band | "DISCOVER THE FUTURE WITH THE ELDAPOINT GROUP. EXPLORE OUR PRODUCTS TODAY" + "Explore now" over the navy chevron pattern | 1 |
| 4 | Quick links | Capabilities / Products / Sectors, each with a sentence and a "View all" link, over the welder photo | 3 |
| 5 | Case studies | "SEE OUR PROJECTS IN ACTION" + intro + "View all case studies", slider of 11 cards (7 images, 4 mp4 loops) | 11 |
| 6 | Product gallery | 6 linked photo tiles: modular units, GRP/renewable housing, container conversion, steel pressings, Fibaform GRP gatehouse, waste containers | 6 |
| 7 | Sustainability split | "OUR JOURNEY TOWARDS A GREENER FUTURE", 2 paragraphs, "Learn More...", forest image | 1 |
| 8 | Film CTA | Vimeo film + "FORGE THE FUTURE WITH THE ELDAPOINT GROUP. COLLABORATE WITH US NOW" + button | 1 film |
| 9 | Contact | "CONTACT US FOR A QUOTE" (contact-form-7 shortcode is broken and renders as raw text on the live page) | 0 |
| 10 | Footer | Newsletter heading, contact (phone, email, address, company no.), 5 social links, 7 legal links, credit | |

Sitemap check: all 11 case-study URLs exist in `eg_case_studies-sitemap.xml` (from the Wayback CDX index). The nav URLs match `page-sitemap.xml`.

### 2. Brand
- **Logo:** an official vector exists (`eldapoint-group-logo-web-header-300px.svg`, 300x87.65). It contains:
  - the **red chevron/road band** (one path, `#df362c`)
  - 9 white letterform paths for "Eldapoint", plus the red **i-dot**
  - the "GROUP" letters
  
  It is already split by shape, so the preloader can animate the band, each letter, the dot and GROUP separately. Light version = white letters (as served). Dark version = navy `#002B49` letters (recolour only).
- **Favicon:** will be built from the red band + navy letters, cropped square.
- **Brand film:** see "Films" above. Poster frames are available (welder, 1920x800 and 960x1707).
- **Fonts:** Montserrat only (Google Fonts, self-hosted by their Breeze plugin). Headings are 700 uppercase at 40/48 (H1/H2) and 24/28 (H3). Body is 400 16/24.

### 3. Palette (measured, computed styles on the rendered page)
| Role | Hex | Source |
|---|---|---|
| Navy | `#002B49` | `bg`/`color` rgb(0,43,73): header, panels, footer |
| Red | `#E0362C` | rgb(224,54,44): links, buttons, accent (logo uses `#DF362C`) |
| Mist | `#EDEDED` | rgb(237,237,237): light panels |
| White | `#FFFFFF` | page ground |

Also present but minor: link blue `#1468A0` and grey-green `#D0D5D2`. Both are dropped in the proposal.
**Proposed palette: Navy / Red / Mist / White. Awaiting confirmation.**

### 4. Site structure
- Nav: Home, Products, Capabilities, Sectors, About Us, Case Studies, Blog, plus "Resources" and Contact.
- Footer groups: Contact (tel +44 (0)151 548 9838, enquiries@eldapointgroup.co.uk, Eldapoint Industries Limited, Charleywood Road, Knowsley Industrial Park North, Merseyside L33 7SG, Company No. 14230209), Follow us, and Legal (Sitemap, Privacy, Cookie, T&Cs, Modern Slavery, Sustainability, Corporate Responsibility).
- Social: LinkedIn (eldapoint-group and eldapoint), Facebook, Instagram, X.

### 5. References: what each is for
- **eng.mcmaster.ca → LOOK & LAYOUT.** White ground, full-bleed photo hero with the headline bottom-left, hairline-ruled card rows (4-up icon tiles), and text/photo split bands. The type scale is calm (H1 about 64px, H2 about 32px).
- **ose-engineering.fr → MOTION & SCROLL.** Dark opening scene, a giant outlined brand mark sitting behind the content, a film window that settles into place, and calm staggered card entrances. Its corner brackets, mono labels and ruled grids are *not* taken (playbook: no "AI-looking" decoration). Its scroll recolouring is also not taken (playbook: one dark opening, then a steady light page).
- **breakthroughenergy.org (ref#) → the copied interaction.** It is the footer primary link wipe:
  - a duplicate layer sits over each tile, with an accent fill and dark text, at `clip-path: rect(0 0% 100% 0)`;
  - on `mouseenter` it animates to `rect(0 100% 100% 0)` over **0.3s, GSAP `power2.out`**;
  - on `mouseleave` it animates back to 0% with the same curve.
  
  Read from `assets/default-D0PYt-Z_.js` (TheFooter). BE's own film-window hero was already used on the INTEC demo, so it is not reused here.

### 6. Proposed homepage (7 sections + footer, target about 6.5 viewports at 1440)
1. **Hero** (navy opening scene): welding film/poster full-bleed, H1 bottom-left, short intro line, 2 CTAs.
2. **Group intro split**: the "five best-in-class companies" copy with the real inline links, beside the Knowsley HQ aerial photo.
3. **Explore tiles**: Capabilities / Products / Sectors as three tall tiles using the BE wipe (red fill), over the welder photo.
4. **Product range**: the 6 real gallery photos as a ruled 3x2 grid (McMaster card rows), with the "Discover the future" CTA line.
5. **Projects**: 6 of the 11 case studies (mixed large/small cards) + "View all case studies". 5 are cut for pacing. The 4 video cards need poster stills (to source from the case-study pages via Optimole).
6. **Greener future split**: forest image + copy + "Learn More".
7. **Collaborate band + contact**: "Forge the future" over the welder still, with phone, email and address beside it. This replaces the broken form.
8. **Footer** (static, no reveals).

Images that lead: hero = welding poster frame (or the film); section 2 = HQ aerial; section 3 = welder quick-links photo.
