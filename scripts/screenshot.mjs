/**
 * Capture une page entière du site en cours d'exécution.
 * Sert à comparer le rendu avec les maquettes Figma de `design/`.
 *
 *   node scripts/screenshot.mjs <fichier.png> [largeur] [url]
 */
import puppeteer from "puppeteer-core";

const [, , out = "capture.png", width = "1600", url = "http://localhost:3000/"] =
  process.argv;

const CHROME =
  process.env.CHROME_PATH ??
  "C:/Program Files/Google/Chrome/Application/chrome.exe";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--force-prefers-reduced-motion", "--hide-scrollbars"],
});

const page = await browser.newPage();
await page.setViewport({ width: Number(width), height: 900 });
await page.goto(url, { waitUntil: "networkidle0" });

// Fait défiler la page pour déclencher le chargement des images.
await page.evaluate(
  () =>
    new Promise((resolve) => {
      let y = 0;
      const id = setInterval(() => {
        window.scrollTo(0, (y += 600));
        if (y > document.body.scrollHeight) {
          clearInterval(id);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 30);
    }),
);
await new Promise((r) => setTimeout(r, 1000));

await page.screenshot({ path: out, fullPage: true });
console.log(`→ ${out}`);
await browser.close();
