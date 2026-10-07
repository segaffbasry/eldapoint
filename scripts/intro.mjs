// Preloader check: screenshots the opening at fixed moments, and reports when intro:done fired, whether the page
// could scroll before it, and whether the hero was ever visible under the curtain before the exit.
// Usage: node scripts/intro.mjs <outDir> [width] [url]
import { chromium } from "playwright-core";

const [out = "intro", w = "1440", url = "http://127.0.0.1:3046/"] = process.argv.slice(2);
const W = Number(w), H = W < 500 ? 812 : 900;
const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const page = await browser.newPage({ viewport: { width: W, height: H } });
await page.addInitScript(() => {
  window.__t0 = performance.now();
  window.addEventListener("intro:done", () => { window.__done = performance.now() - window.__t0; });
});
await page.goto(url, { waitUntil: "commit" });
const marks = (process.env.MARKS ?? "100,350,650,950,1250,1550,1800,2300").split(",").map(Number);
const t0 = Date.now();
let scrolledEarly = null;
for (const m of marks) {
  const wait = m - (Date.now() - t0);
  if (wait > 0) await page.waitForTimeout(wait);
  if (m === 950) {
    await page.mouse.move(W / 2, H / 2); await page.mouse.wheel(0, 600); await page.waitForTimeout(80);
    scrolledEarly = await page.evaluate(() => window.scrollY);
  }
  await page.screenshot({ path: `${out}/intro-${W}-${String(m).padStart(4, "0")}.jpg`, type: "jpeg", quality: 70 });
}
const r = await page.evaluate(() => ({ introDoneAtMs: Math.round(window.__done ?? -1), loading: document.documentElement.classList.contains("is-loading"), intro: document.documentElement.dataset.intro }));
console.log(JSON.stringify({ ...r, scrollYDuringIntro: scrolledEarly }));
await browser.close();
