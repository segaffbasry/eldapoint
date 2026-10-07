// Keyboard check of the full-screen menu: Tab to the toggle, open with Enter, confirm focus moved inside, Tab round
// the whole trap, close with Esc, and confirm focus is back on the toggle. Prints what happened as JSON.
import { chromium } from "playwright-core";
const url = process.argv[2] ?? "http://127.0.0.1:3046/";
const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: "load" });
await page.waitForTimeout(2400);
const active = () => page.evaluate(() => { const a = document.activeElement; return a ? `${a.tagName} ${(a.textContent || a.getAttribute("aria-label") || "").trim().slice(0, 30)}` : null; });
let reached = null;
for (let i = 0; i < 12; i++) { await page.keyboard.press("Tab"); if ((await active())?.includes("Menu")) { reached = i + 1; break; } }
await page.keyboard.press("Enter");
await page.waitForTimeout(900);
const firstInside = await active();
const inMenu = await page.evaluate(() => !!document.activeElement?.closest("#site-menu"));
const count = await page.evaluate(() => document.querySelectorAll("#site-menu a[href], #site-menu button").length);
let escaped = false;
for (let i = 0; i < count + 2; i++) { await page.keyboard.press("Tab"); if (!(await page.evaluate(() => !!document.activeElement?.closest("#site-menu")))) { escaped = true; break; } }
await page.keyboard.press("Escape");
await page.waitForTimeout(900);
const after = await page.evaluate(() => ({ focus: document.activeElement?.className, expanded: document.querySelector(".menu-toggle")?.getAttribute("aria-expanded"), menuVisible: getComputedStyle(document.querySelector("#site-menu")).visibility }));
console.log(JSON.stringify({ tabsToToggle: reached, firstInside, inMenu, focusables: count, focusEscapedTrap: escaped, after }));
await browser.close();
