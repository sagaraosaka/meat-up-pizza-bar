import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "screenshots");
const PORT = 8765;
const BASE = `http://localhost:${PORT}`;

function startServer() {
  return spawn("python3", ["-m", "http.server", String(PORT), "--directory", root], {
    stdio: "ignore",
  });
}

async function waitForServer(url, timeoutMs = 5000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // not ready yet
    }
    await new Promise((r) => setTimeout(r, 150));
  }
  throw new Error("server did not start in time");
}

async function waitForAllImagesLoaded(page, timeoutMs = 8000) {
  const height = await page.evaluate(() => document.body.scrollHeight);
  const step = await page.evaluate(() => window.innerHeight);
  for (let y = 0; y <= height; y += step) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(150);
  }
  try {
    await page.waitForFunction(
      () => [...document.querySelectorAll("img")].every((img) => img.complete && img.naturalWidth > 0),
      { timeout: timeoutMs }
    );
  } catch {
    // タイムアウトしても撮影は続行する（未読込の画像がある場合は呼び出し側のログで分かる）
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
}

const pages = [
  { path: "/", name: "top" },
  { path: "/party/", name: "party" },
  { path: "/wedding-after-party/", name: "wedding" },
];

const widths = [
  { width: 375, height: 812, label: "375" },
  { width: 1280, height: 800, label: "1280" },
];

async function main() {
  await mkdir(outDir, { recursive: true });
  const server = startServer();
  await waitForServer(BASE + "/");

  const browser = await chromium.launch();

  for (const w of widths) {
    for (const p of pages) {
      const context = await browser.newContext({
        viewport: { width: w.width, height: w.height },
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      await page.goto(BASE + p.path, { waitUntil: "networkidle" });
      await page.waitForTimeout(300);
      await waitForAllImagesLoaded(page);
      const unloaded = await page.evaluate(
        () => [...document.querySelectorAll("img")].filter((img) => !(img.complete && img.naturalWidth > 0)).length
      );
      if (unloaded > 0) {
        console.warn(`  warning: ${p.name}-${w.label} has ${unloaded} unloaded <img> at capture time`);
      }
      await page.screenshot({
        path: path.join(outDir, `${p.name}-${w.label}-full.png`),
        fullPage: true,
      });
      await context.close();
      console.log(`saved ${p.name}-${w.label}-full.png`);
    }
  }

  // top page header+hero: before/after .is-scrolled, both widths
  for (const w of widths) {
    const context = await browser.newContext({
      viewport: { width: w.width, height: w.height },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(outDir, `top-${w.label}-header-top.png`),
    });
    console.log(`saved top-${w.label}-header-top.png`);

    await page.evaluate(() => window.scrollTo(0, 400));
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(outDir, `top-${w.label}-header-scrolled.png`),
    });
    console.log(`saved top-${w.label}-header-scrolled.png`);
    await context.close();
  }

  await browser.close();
  server.kill();
  console.log("done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
