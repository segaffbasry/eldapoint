// Side-by-side check of the copied interaction. Hovers a footer link and samples the overlay's clip-path every frame,
// then prints it next to Breakthrough Energy's measured curve (sampled the same way on breakthroughenergy.org,
// 2026-10-07: 0ms 0%, 30ms 28.7%, 63ms 52.5%, 96ms 69.9%, 130ms 82.4%, 162ms 90.9%, 196ms 96.2%, 230ms 98.8%,
// 296ms 100%). Also clicks a link to confirm the link guard keeps the demo on the page.
import { chromium } from "playwright-core";
const url = process.argv[2] ?? "http://127.0.0.1:3046/";
const BE = [[0, 0], [30, 28.7], [63, 52.5], [96, 69.9], [130, 82.4], [162, 90.9], [196, 96.2], [230, 98.8], [296, 100]];
const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: "load" });
await page.waitForTimeout(2400);
await page.evaluate(() => { document.querySelector(".footer-big").scrollIntoView({ block: "center" }); });
await page.waitForTimeout(800);
const box = await page.locator(".footer-big").first().boundingBox();
await page.mouse.move(box.x - 20, box.y + box.height / 2);
await page.evaluate(() => {
  const o = document.querySelector(".footer-big .wipe-over"); window.__w = [];
  const t0 = performance.now();
  (function f() { const m = getComputedStyle(o).clipPath.match(/inset\(0px ([\d.]+)%/) ?? getComputedStyle(o).clipPath.match(/inset\(([\d.]+)px/);
    const right = getComputedStyle(o).clipPath; window.__w.push([Math.round(performance.now() - t0), right]); if (performance.now() - t0 < 420) requestAnimationFrame(f); })();
});
await page.mouse.move(box.x + 30, box.y + box.height / 2);
await page.waitForTimeout(500);
const samples = await page.evaluate(() => window.__w);
const ours = samples.map(([t, c]) => { const m = c.match(/inset\(0px ([\d.]+)%/); return [t, m ? +(100 - Number(m[1])).toFixed(1) : (c === "inset(0px)" || c === "none" ? 100 : c)]; });
const before = page.url();
await page.locator(".range-item").first().click();
await page.waitForTimeout(600);
console.log(JSON.stringify({ be: BE, ours: ours.filter((_, i) => i % 2 === 0), linkGuard: { before, after: page.url(), pages: browser.contexts()[0].pages().length } }));
await browser.close();
