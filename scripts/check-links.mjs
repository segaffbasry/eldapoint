// Link check. eldapoint-group.co.uk answers every scripted request with a Cloudflare challenge, so destinations are
// verified against the site's own URL inventory as the Wayback Machine indexed it (sitemap index + crawled pages),
// plus the live mega menu that the homepage snapshot carries (each menu URL is a page the site links to itself).
// Prints every href on the built homepage with its status. Usage: node scripts/check-links.mjs [url]
const url = process.argv[2] ?? "http://127.0.0.1:3046/";
const html = await (await fetch(url)).text();
const hrefs = [...new Set([...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1].replaceAll("&amp;", "&")))]
  .filter((h) => !h.startsWith("/_next") && !h.startsWith("/fonts") && !h.startsWith("/media") && !h.endsWith(".svg") && !h.endsWith(".ico"));
const cdx = await (await fetch("https://web.archive.org/cdx/search/cdx?url=eldapoint-group.co.uk*&output=txt&collapse=urlkey&fl=original&limit=20000")).text();
const norm = (u) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/[?#].*$/, "").replace(/\/$/, "").toLowerCase();
const known = new Set(cdx.split("\n").filter(Boolean).map(norm));
const menu = await import("node:fs").then((fs) => fs.readFileSync(new URL("../_scrape/wb-home-20250521.html", import.meta.url), "utf8"));
const linked = new Set([...menu.matchAll(/href="(?:https?:\/\/web\.archive\.org\/web\/\d+\/)?(https?:\/\/www\.eldapoint-group\.co\.uk[^"]*)"/g)].map((m) => norm(m[1])));
let bad = 0;
for (const h of hrefs) {
  let status;
  if (h.startsWith("#")) status = (h === "#top" || html.includes(`id="${h.slice(1)}"`)) ? "anchor ok" : "MISSING ANCHOR";
  else if (h.startsWith("tel:") || h.startsWith("mailto:")) status = "contact";
  else if (!h.includes("eldapoint-group.co.uk")) status = "external (social)";
  else status = known.has(norm(h)) ? "in archive index" : linked.has(norm(h)) ? "linked from live homepage" : "UNVERIFIED";
  if (/MISSING|UNVERIFIED/.test(status)) bad++;
  console.log(`${status.padEnd(26)} ${h}`);
}
console.log(`\n${hrefs.length} unique hrefs, ${bad} problems`);
