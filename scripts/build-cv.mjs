/**
 * Renders scripts/cv/cv.html to public/Eyaas-Ajmal-CV.pdf via headless Chrome.
 *
 * Chrome's print-to-pdf keeps a real text layer, which is the whole point: the
 * previous download was a JPG, so an applicant tracking system parsing it got
 * nothing at all. Editing the CV means editing the HTML and re-running this.
 *
 *   npm run build:cv
 */

import { execFileSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = resolve(root, "scripts/cv/cv.html");
const output = resolve(root, "public/Eyaas-Ajmal-CV.pdf");

/** Usual install locations, plus an override for anything else. */
const candidates = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);

const browser = candidates.find((p) => existsSync(p));

if (!browser) {
  console.error(
    "No Chrome or Edge binary found. Set CHROME_PATH to one and re-run.\nLooked in:\n  " +
      candidates.join("\n  "),
  );
  process.exit(1);
}

execFileSync(
  browser,
  [
    "--headless=new",
    "--disable-gpu",
    // Without this Chrome stamps the page URL and a date into the margins,
    // which lands in the extracted text and confuses parsers.
    "--no-pdf-header-footer",
    // Give web fonts and layout a moment to settle before the snapshot.
    "--virtual-time-budget=3000",
    "--run-all-compositor-stages-before-draw",
    `--print-to-pdf=${output}`,
    `file:///${source.replace(/\\/g, "/")}`,
  ],
  { stdio: "inherit" },
);

const { size } = statSync(output);
console.log(`Wrote ${output} (${(size / 1024).toFixed(1)} KB)`);
