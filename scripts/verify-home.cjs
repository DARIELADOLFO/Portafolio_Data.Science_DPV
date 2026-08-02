const { chromium } = require("playwright");
const path = require("path");

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1100 },
    deviceScaleFactor: 1
  });
  const consoleErrors = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });
  page.on("pageerror", (error) => {
    consoleErrors.push(error.message);
  });

  await page.goto("http://localhost:3000", {
    waitUntil: "networkidle",
    timeout: 60000
  });
  await page.waitForTimeout(2500);

  const desktopPath = path.resolve("verification-desktop.png");
  await page.screenshot({ path: desktopPath, fullPage: false });

  const desktopState = await page.evaluate(() => {
    const bodyText = document.body.innerText.trim();
    const lang = document.documentElement.lang;
    const overlay = Boolean(
      document.querySelector(
        "[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay"
      )
    );
    const canvas = document.querySelector("canvas");
    let canvasHasPixels = false;
    let canvasSample = null;

    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      canvasSample = {
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      };
      const scratch = document.createElement("canvas");
      scratch.width = canvas.width;
      scratch.height = canvas.height;
      const ctx = scratch.getContext("2d");

      try {
        ctx?.drawImage(canvas, 0, 0);
        const image = ctx?.getImageData(0, 0, scratch.width, scratch.height);
        if (image) {
          for (let y = 0; y < image.height; y += 12) {
            for (let x = 0; x < image.width; x += 12) {
              const index = (y * image.width + x) * 4;
              if (
                image.data[index] +
                  image.data[index + 1] +
                  image.data[index + 2] +
                  image.data[index + 3] >
                0
              ) {
                canvasHasPixels = true;
                break;
              }
            }
            if (canvasHasPixels) break;
          }
        }
      } catch {
        canvasHasPixels = rect.width > 0 && rect.height > 0;
      }
    }

    return {
      lang,
      bodyLength: bodyText.length,
      hasEnglishHeadline:
        bodyText.includes("Dariel Pena") &&
        bodyText.includes("Systems Engineer") &&
        bodyText.includes("Business Intelligence"),
      hasSpanishHeadline:
        bodyText.includes("Dariel Pena") &&
        bodyText.includes("Ingeniero en Sistemas") &&
        bodyText.includes("Business Intelligence"),
      hasProjects:
        bodyText.includes("Sistema de Detección de Fraude") ||
        bodyText.includes("Fraud Detection System"),
      overlay,
      canvasPresent: Boolean(canvas),
      canvasHasPixels,
      canvasSample,
      interactiveLabels: [...document.querySelectorAll("a,button")]
        .slice(0, 16)
        .map((element) => element.textContent?.trim())
        .filter(Boolean)
    };
  });

  const languageToggle = page
    .locator('button[aria-label="Toggle language"]')
    .first();
  await languageToggle.waitFor({ state: "visible", timeout: 15000 });
  try {
    await languageToggle.click({ timeout: 15000 });
  } catch {
    await languageToggle.evaluate((element) => element.click());
  }
  await page.waitForTimeout(1200);
  const bilingualState = await page.evaluate(() => {
    const bodyText = document.body.innerText.trim();
    return {
      lang: document.documentElement.lang,
      hasEnglishHeadline:
        bodyText.includes("Dariel Pena") &&
        bodyText.includes("Systems Engineer") &&
        bodyText.includes("Business Intelligence"),
      hasSpanishHeadline:
        bodyText.includes("Dariel Pena") &&
        bodyText.includes("Ingeniero en Sistemas") &&
        bodyText.includes("Business Intelligence")
    };
  });

  await page.setViewportSize({ width: 390, height: 900 });
  await page.waitForTimeout(1000);
  const mobilePath = path.resolve("verification-mobile.png");
  await page.screenshot({ path: mobilePath, fullPage: false });

  const mobileState = await page.evaluate(() => {
    const bodyText = document.body.innerText.trim();
    const h1 = document.querySelector("h1")?.getBoundingClientRect();
    const navButton = document.querySelector(
      'button[aria-label="Toggle navigation"]'
    );
    const horizontalOverflow =
      document.documentElement.scrollWidth > window.innerWidth + 2;

    return {
      bodyLength: bodyText.length,
      hasHeadline: bodyText.includes("Dariel Pena"),
      navButton: Boolean(navButton),
      h1Box: h1
        ? { width: Math.round(h1.width), height: Math.round(h1.height) }
        : null,
      horizontalOverflow
    };
  });

  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.evaluate(() => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await page.waitForTimeout(1800);
  const projectState = await page.evaluate(() => {
    const bodyText = document.body.innerText.trim();
    const project = [...document.querySelectorAll("h3")].find((heading) => {
      const text = heading.textContent ?? "";
      return (
        text.includes("Sistema de Detección de Fraude") ||
        text.includes("Fraud Detection System")
      );
    });
    return {
      hasProjects:
        bodyText.includes("Sistema de Detección de Fraude") ||
        bodyText.includes("Fraud Detection System"),
      projectVisible: project
        ? project.getBoundingClientRect().top < window.innerHeight &&
          project.getBoundingClientRect().bottom > 0
        : false
    };
  });

  await browser.close();

  console.log(
    JSON.stringify(
      {
        consoleErrors,
        desktopState,
        bilingualState,
        mobileState,
        projectState,
        desktopPath,
        mobilePath
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
