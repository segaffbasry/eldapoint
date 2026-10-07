/* All copy on the page, kept apart from the components. Everything is the live site's own wording:
   - the homepage (Wayback snapshot 2025-05-21; the live page is unchanged, see README "Recon")
   - the About Us page, for the five companies, the group facts and the nightclub line (snapshot 2025-05-24)
   Headings are set in sentence case where the live site shouts in capitals; nothing else is reworded.
   Every href is a real eldapoint-group.co.uk URL, checked against the sitemap index. Links never leave the demo
   (see the link guard in components/Motion.tsx); they are kept so the destinations can be verified. */

export const SITE = "https://www.eldapoint-group.co.uk";
const u = (path: string) => `${SITE}${path}`;

export type Link = { label: string; href: string };
export type Group = Link & { children: Link[] };

/* The live mega menu, in its own order. */
export const products: Group[] = [
  { label: "Enclosures & Housing", href: u("/products/enclosures-and-housing/"), children: [
    { label: "Steel Enclosures", href: u("/products/enclosures-and-housing/steel-enclosures/") },
    { label: "GRP Enclosures", href: u("/products/enclosures-and-housing/grp-enclosures/") },
    { label: "Network Rail Approved Enclosures", href: u("/products/enclosures-and-housing/network-rail-approved-enclosures/") },
    { label: "Renewable Energy Housings", href: u("/products/enclosures-and-housing/renewable-energy-housings/") },
    { label: "EV Charging Enclosures", href: u("/products/enclosures-and-housing/ev-charging-enclosures/") },
    { label: "Outdoor Telecom Cabinets", href: u("/products/enclosures-and-housing/telecoms-enclosures/") },
    { label: "Battery Stores (BESS Units)", href: u("/products/enclosures-and-housing/battery-stores-bess-units/") },
  ] },
  { label: "Steel Containers & Storage", href: u("/products/steel-containers-and-storage/"), children: [
    { label: "Steel Tanks", href: u("/products/steel-containers-and-storage/steel-tanks/") },
    { label: "Shipping Container Sales", href: u("/products/steel-containers-and-storage/shipping-containers/") },
    { label: "Steel Stillages", href: u("/products/steel-containers-and-storage/steel-stillages/") },
  ] },
  { label: "Prefabricated Buildings & Cabins", href: u("/products/prefabricated-buildings-and-cabins/"), children: [
    { label: "Temporary On Site Accommodation", href: u("/products/prefabricated-buildings-and-cabins/site-accommodation-cabins/") },
    { label: "Fibreglass (GRP) Buildings & Kiosks", href: u("/products/prefabricated-buildings-and-cabins/fibreglass-grp-buildings-and-kiosks/") },
    { label: "Modular Accommodation & Buildings", href: u("/products/prefabricated-buildings-and-cabins/modular-accommodation/") },
    { label: "Offshore & Marine Control Cabins", href: u("/products/prefabricated-buildings-and-cabins/offshore-and-marine-control-cabins/") },
    { label: "Anti-Vandal Units", href: u("/products/prefabricated-buildings-and-cabins/anti-vandal-units/") },
  ] },
  { label: "Shipping Container Conversions", href: u("/products/shipping-container-conversions/"), children: [
    { label: "Classrooms & Education", href: u("/products/shipping-container-conversions/classrooms-education/") },
    { label: "Data Centres, Switchgear & Electronic Housings", href: u("/products/shipping-container-conversions/data-centres-switchgear-electronic-housings/") },
    { label: "Sports & Leisure", href: u("/products/shipping-container-conversions/sports-leisure/") },
    { label: "Retail & Hospitality", href: u("/products/shipping-container-conversions/retail-hospitality/") },
    { label: "Office & Workspace", href: u("/products/shipping-container-conversions/office-workspace/") },
    { label: "Bespoke", href: u("/products/shipping-container-conversions/bespoke/") },
    { label: "Container Conversion FAQs", href: u("/products/container-conversion-faqs/") },
  ] },
  { label: "Waste Management", href: u("/products/waste-management/"), children: [
    { label: "Waste Containers", href: u("/products/waste-management/waste-containers/") },
    { label: "Skips", href: u("/products/waste-management/skips/") },
  ] },
  { label: "Industrial & Specialised Products", href: u("/products/industrial-and-specialised-products/"), children: [
    { label: "Water Storage and Filtration Tanks", href: u("/products/industrial-and-specialised-products/water-storage-and-filtration-tanks/") },
    { label: "Fire Rated Products", href: u("/products/industrial-and-specialised-products/fire-rated-products/") },
    { label: "Blast Units", href: u("/products/industrial-and-specialised-products/blast-units/") },
    { label: "Steel Pressings", href: u("/products/industrial-and-specialised-products/steel-pressings/") },
    { label: "Ion Safecharge Lithium Battery Charging & Storage Units", href: u("/products/industrial-and-specialised-products/ion-safecharge-lithium-battery-charging-storage-units/") },
  ] },
];

export const capabilities: Group[] = [
  { label: "Turnkey Project Management", href: u("/capabilities/turnkey-project-management/"), children: [] },
  { label: "Design & Modelling", href: u("/capabilities/design-and-modelling/"), children: [
    { label: "3D Product Renders & Modelling", href: u("/capabilities/design-and-modelling/3d-product-renders-and-modelling/") },
    { label: "2D & 3D CAD Services", href: u("/capabilities/design-and-modelling/bespoke-cad-design/") },
  ] },
  { label: "Installation & Servicing", href: u("/capabilities/installation-and-servicing/"), children: [
    { label: "Portable Building Installation", href: u("/capabilities/installation-and-servicing/installation/") },
    { label: "Reefer Servicing & Repair", href: u("/capabilities/installation-and-servicing/reefer-servicing-repair/") },
    { label: "Container Repair", href: u("/capabilities/installation-and-servicing/container-repair/") },
  ] },
  { label: "Fabrication & Assembly", href: u("/capabilities/fabrication-and-assembly/"), children: [
    { label: "Bespoke Steel Pressings", href: u("/capabilities/fabrication-and-assembly/steel-pressings/") },
    { label: "MIG GAS Welding", href: u("/capabilities/fabrication-and-assembly/mig-welding/") },
    { label: "Fibreglass (GRP) Panel Manufacture", href: u("/capabilities/fabrication-and-assembly/fibreglass-grp-panel-manufacture/") },
    { label: "Steel Fabrication", href: u("/capabilities/fabrication-and-assembly/steel-fabrication/") },
    { label: "Hydraulic Presses & Shears", href: u("/capabilities/fabrication-and-assembly/hydraulic-presses-shears/") },
    { label: "CNC Roller", href: u("/capabilities/fabrication-and-assembly/cnc-roller/") },
    { label: "Container Specialist Joinery", href: u("/capabilities/fabrication-and-assembly/joinery/") },
    { label: "Container Specialist Plumbing", href: u("/capabilities/fabrication-and-assembly/plumbing/") },
    { label: "External Cladding", href: u("/capabilities/fabrication-and-assembly/external-cladding/") },
  ] },
  { label: "Lifting & Moving Equipment", href: u("/capabilities/lifting-and-moving-equipment/"), children: [] },
  { label: "Container Storage & Depot Services", href: u("/capabilities/container-storage-and-depot-services/"), children: [] },
  { label: "Paint & Finish", href: u("/capabilities/paint-and-finish/"), children: [] },
];

export const sectors: Link[] = [
  ["Gas & Oil Production", "gas-oil-production"], ["Renewables", "renewables"], ["Utilities", "utilities"],
  ["Highways", "highways"], ["Rail", "rail"], ["Construction", "construction"], ["Marine", "marine"],
  ["Telecommunications", "telecommunications"], ["Waste", "waste"], ["Hospitality", "hospitality"], ["Retail", "retail"],
  ["Education", "education"], ["Healthcare", "healthcare"], ["Non-Profit Organisations", "non-profit-organisations"],
  ["Scientific & Technical", "scientific-and-technical"], ["Sports & Leisure", "sports-and-leisure"], ["Logistics", "logistics"],
  ["Government Organisations", "government-organisations"],
].map(([label, slug]) => ({ label, href: u(`/sectors/${slug}/`) }));

/* Top-level destinations (header and menu). */
export const nav = {
  products: { label: "Products", href: u("/products/") },
  capabilities: { label: "Capabilities", href: u("/capabilities/") },
  sectors: { label: "Sectors", href: u("/sectors/") },
  about: { label: "About Us", href: u("/about-us/") },
  cases: { label: "Case Studies", href: u("/case-studies/") },
  blog: { label: "Blog", href: u("/blog/") },
  resources: { label: "Resources", href: u("/resources/") },
  contact: { label: "Contact", href: u("/contact-us/") },
};

/* The homepage chapters, for the menu's "On this page" list. */
export const chapters: Link[] = [
  { label: "The group", href: "#group" },
  { label: "Explore", href: "#explore" },
  { label: "Products", href: "#products" },
  { label: "Projects", href: "#projects" },
  { label: "Sustainability", href: "#sustainability" },
  { label: "Contact", href: "#contact" },
];

export const contact = {
  phone: "+44 (0)151 548 9838",
  tel: "tel:+441515489838",
  email: "enquiries@eldapointgroup.co.uk",
  address: ["Eldapoint Industries Limited", "Charleywood Road", "Knowsley Industrial Park North", "Merseyside, L33 7SG"],
  company: "Company No. 14230209",
};

export const socials = [
  { name: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/company/eldapoint-group/about/" },
  { name: "Facebook", icon: "facebook", href: "https://www.facebook.com/eldapoint/" },
  { name: "Instagram", icon: "instagram", href: "https://www.instagram.com/eldapoint/" },
  { name: "X", icon: "x", href: "https://x.com/eldapoint/" },
] as const;

export const legal: Link[] = [
  { label: "Sitemap", href: u("/sitemap/") },
  { label: "Privacy Policy", href: u("/privacy-policy/") },
  { label: "Cookie Policy", href: u("/cookie-policy/") },
  { label: "Terms & Conditions", href: u("/terms-conditions/") },
  { label: "Modern Slavery Statement", href: u("/modern-slavery-statement/") },
  { label: "Sustainability", href: u("/sustainability/") },
  { label: "Corporate Responsibility Policy", href: u("/corporate-responsibility-policy/") },
];

/* 1. Hero. The H1 is the live page's; the line under it is the site's own title tag. */
export const hero = {
  title: ["Comprehensive engineering", "solutions for all sectors"],
  lead: "Reshaping the industrial landscape.",
  primary: { label: "Our full product range", href: u("/products/") },
  secondary: { label: "See our projects", href: "#projects" },
  // Poster frames of the live hero film (Vimeo 1023305035); the film itself is domain-locked.
  stills: [
    { src: "/media/hero-welder.jpg", alt: "A welder at work in an Eldapoint workshop, sparks flying from the torch" },
    { src: "/media/hero-sparks.jpg", alt: "Sparks and smoke around a welder in the Eldapoint fabrication shop" },
  ],
  mobile: "/media/hero-mobile.jpg",
};

/* 2. The group. The statement and body are the live intro, with all ten of its inline links. */
type Run = string | Link;
export const group = {
  statement: "The Eldapoint Group is comprised of five, best-in-class companies, enabling us to offer a complete engineering solution.",
  body: [
    "We manufacture ", { label: "GRP gatehouses and enclosures", href: u("/products/prefabricated-buildings-and-cabins/fibreglass-grp-buildings-and-kiosks/") }, ", ",
    { label: "modular buildings", href: u("/products/prefabricated-buildings-and-cabins/modular-accommodation/") }, ", ",
    { label: "anti-vandal units", href: u("/products/prefabricated-buildings-and-cabins/anti-vandal-units/") }, ", and ",
    { label: "container conversions", href: u("/products/shipping-container-conversions/") },
    " for people to work, relax, shop, learn and sleep. Our ",
    { label: "cabinets and enclosures", href: u("/products/enclosures-and-housing/") },
    " protect critical communication and electrical control equipment across the national ",
    { label: "rail", href: u("/sectors/rail/") }, " and ", { label: "road", href: u("/sectors/highways/") },
    " networks. We press and form tough ", { label: "steel", href: u("/products/industrial-and-specialised-products/steel-pressings/") },
    " and fiberglass sections, versatile building blocks for a whole spectrum of cross industry applications. Our materials handling products facilitate the ",
    { label: "transportation of goods", href: u("/products/steel-containers-and-storage/steel-stillages/") },
    " safely and efficiently on their journey from the factory to the warehouse and eventually the ",
    { label: "waste", href: u("/products/waste-management/") }, " stream.",
  ] as Run[],
  more: { label: "Our full product range", href: u("/products/") },
  image: { src: "/media/hq-knowsley.jpg", alt: "The Eldapoint Group Liverpool Headquarters" },
  // The five companies, from the About Us history (acquisition years and specialisms are its own words).
  companies: [
    { name: "Eldapoint", logo: "/brands/eldapoint.svg", note: "Founded in Essex in 1968, in Liverpool since 1982", href: u("/about-us/") },
    { name: "TF Jackson", logo: "/brands/tf-jackson.svg", note: "Portable modular buildings", href: u("/products/prefabricated-buildings-and-cabins/") },
    { name: "GWR Engineering", logo: "/brands/gwr-engineering.svg", note: "Pressings and formed metal sections", href: u("/products/industrial-and-specialised-products/steel-pressings/") },
    { name: "JS Burgess Engineering", logo: "/brands/js-burgess.svg", note: "Stillages, skips and containers", href: u("/products/steel-containers-and-storage/steel-stillages/") },
    { name: "Fibaform", logo: "/brands/fibaform.svg", note: "GRP gatehouses, cabinets, kiosks and enclosures", href: u("/products/prefabricated-buildings-and-cabins/fibreglass-grp-buildings-and-kiosks/") },
  ],
};

/* 3. Explore: the live quick links, with the group's facts from About Us above them. */
export const facts = [
  { value: 1968, suffix: "", label: "Founded in Essex" },
  { value: 7, suffix: "", label: "UK manufacturing sites" },
  { value: 250, suffix: "+", label: "Employees across the group" },
  { value: 9000, suffix: "", label: "Tonnes of high-grade steel processed last year" },
];

export const explore = {
  title: "Design, build and install, all within one group",
  // The live section has no heading; this line is built from the Capabilities card ("From design and modelling to
  // installation and servicing"). See README "Copy decisions".
  tiles: [
    { title: "Capabilities", text: "From design and modelling to installation and servicing, our capabilities span a wide range to meet diverse needs.", cta: "View all Services & Capabilities", href: u("/capabilities/"), image: "/media/grinder.jpg", alt: "An angle grinder throwing sparks across a steel workpiece" },
    { title: "Products", text: "Eldapoint offers a diverse product portfolio ranging from modular buildings and specialist enclosures to steel stillages and waste containers. Explore the range.", cta: "View all Products", href: u("/products/"), image: "/media/explore-products.jpg", alt: "Stacked shipping containers against a blue sky" },
    { title: "Sectors", text: "Our customer focus has positioned the Eldapoint Group as a trusted supplier across multiple sectors.", cta: "View all Sectors", href: u("/sectors/"), image: "/media/explore-sectors.jpg", alt: "A marine buoy with a GRP housing and solar panels, moored in a harbour" },
  ],
};

/* 4. Product range: the live six-photo gallery, with names from each tile's link destination. */
export const range = {
  title: "Discover the future with the Eldapoint Group. Explore our products today",
  cta: { label: "Explore now", href: u("/products/") },
  items: [
    { name: "Modular accommodation units", group: "Prefabricated Buildings & Cabins", href: u("/products/prefabricated-buildings-and-cabins/"), image: "/media/range-modular.jpg", alt: "Modular Accommodation Units" },
    { name: "GRP enclosures", group: "Enclosures & Housing", href: u("/products/enclosures-and-housing/grp-enclosures/"), image: "/media/range-grp-housing.jpg", alt: "A green GRP renewable energy housing with a solar panel, on a gravel base" },
    { name: "Shipping container conversions", group: "Container Conversions", href: u("/products/shipping-container-conversions/"), image: "/media/range-conversion.jpg", alt: "Container conversion with rooftop terrace" },
    { name: "Steel pressings", group: "Industrial & Specialised Products", href: u("/products/industrial-and-specialised-products/steel-pressings/"), image: "/media/range-pressings.jpg", alt: "Pressed steel sheets" },
    { name: "GRP gatehouses by Fibaform", group: "Fibreglass (GRP) Buildings & Kiosks", href: u("/products/prefabricated-buildings-and-cabins/fibreglass-grp-buildings-and-kiosks/"), image: "/media/range-gatehouse.jpg", alt: "GRP gatehouse by Fibaform" },
    { name: "Waste containers", group: "Waste Management", href: u("/products/waste-management/"), image: "/media/range-waste.jpg", alt: "Green dry mixed recycling containers with red lids" },
  ],
};

/* 5. Projects: six of the eleven case studies on the live slider (see README for the five left out), in the
   live order except that the waste-sector study leads: its photograph is the only one large enough for the wide card. */
export const projects = {
  title: "See our projects in action",
  intro: "Not sure what it is you're looking for? Have a look at some of our previous projects for inspiration.",
  all: { label: "View all case studies", href: u("/case-studies/") },
  items: [
    { title: "Supplying the Waste Management Sector", text: "The Eldapoint Group is a leading supplier of waste management containers, bins and skips.", href: u("/case-studies/supplying-the-waste-management-sector/"), image: "/media/cs-waste.jpg", alt: "Stacked yellow and red skips in a yard" },
    { title: "Shipping Container conversion for British Antarctic Survey", text: "When the British Antarctic Survey approached Eldapoint for specialist shipping container conversion units, it was a challenge we accepted.", href: u("/case-studies/shipping-container-conversion-for-british-antarctic-survey/"), image: "/media/cs-antarctic.jpg", alt: "Red container conversion units marked A1, SH and WC being prepared for the Antarctic" },
    { title: "Shipping container Pop-up Nightclub", text: "The Eldapoint Group provided a 40-foot container conversion for a \"Welcome to Hell\" rave in Liverpool's Baltic Triangle.", href: u("/case-studies/pop-up-nightclub/"), image: "/media/cs-nightclub.jpg", alt: "A black shipping container with the word CONTAINER projected around it" },
    { title: "Relocatable Equipment Buildings for the Rail Sector", text: "The Eldapoint Group assisted a major trackside contractor who required a number of REB's to house Trackside Signalling Equipment.", href: u("/case-studies/relocatable-equipment-building-for-the-rail-sector/"), image: "/media/cs-rail-reb.jpg", alt: "A relocatable equipment building lifted by crane" },
    { title: "Airport Portable Buildings", text: "A collaboration between TF Jackson and Fairoaks Airport showcasing the potential of modular building solutions for scalable, cost-effective aviation facilities.", href: u("/case-studies/airport-portable-buildings/"), image: "/media/cs-airport.jpg", alt: "A TF Jackson portable building being craned off a lorry" },
    { title: "Peak performance achieved in the Peak District for Farditch Farm", text: "This collaboration between TF Jackson and Farditch Farm Cottages showcases the potential of modular building solutions.", href: u("/case-studies/farditch-farm-buildings/"), image: "/media/cs-farditch.jpg", alt: "A timber-clad modular building with full-height glazing" },
  ],
};

/* 6. Sustainability: the live split, verbatim. */
export const greener = {
  title: "Our journey towards a greener future",
  body: [
    "Eldapoint is committed to safeguarding the environment for future generations by embracing sustainable practices and continuously improving our environmental performance.",
    "Our efforts will focus on reducing waste and promoting recycling, minimising our energy consumption and partnering with an environmentally responsible supply chain. We will continuously evolve our products to incorporate eco-friendly design features and align with the goals of our customer base as they innovate for a greener future.",
  ],
  more: { label: "Learn more", href: u("/sustainability/") },
  image: { src: "/media/greener-future.jpg", alt: "Aerial view of a lush forest with a factory-shaped clearing surrounded by mist." },
};

/* 7. Collaborate and contact. The live "Contact us for a quote" form is broken (it prints its shortcode), so the
   contact details stand in for it and "Get in touch" goes to the real contact page. */
export const collaborate = {
  title: "Forge the future with the Eldapoint Group. Collaborate with us now",
  quote: "Contact us for a quote",
  cta: { label: "Get in touch", href: u("/contact-us/") },
  image: { src: "/media/welder-quicklinks.jpg", alt: "" },
};

export const footer = {
  tagline: "Reshaping the industrial landscape",
  copyright: "Copyright © 2025 Eldapoint Industries Ltd",
};
