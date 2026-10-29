import { test, expect } from "@playwright/test";

for (const prefix of ["", "/fa"]) {
  test(`repository link is accessible and responsive (${prefix || "en"})`, async ({
    page,
  }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const width of [320, 390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const colorScheme of ["light", "dark"]) {
        await page.emulateMedia({ colorScheme });
        for (const path of ["/", "/missions/", "/missions/01-invitation/"]) {
          await page.goto(`${prefix}${path}`);
          const link = page.locator("header .github-link");
          await expect(link).toHaveAttribute(
            "href",
            "https://github.com/ali-shokoohi/walls",
          );
          await expect(link).toHaveAccessibleName(
            prefix ? "مخزن پروژه در گیت‌هاب" : "GitHub repository",
          );
          await expect(link.locator("svg")).toBeVisible();
          if (width <= 460) {
            await expect(link.locator(".github-label")).toBeHidden();
          } else {
            await expect(link.locator(".github-label")).toBeVisible();
          }
          const box = await link.boundingBox();
          expect(box.width).toBeGreaterThanOrEqual(44);
          expect(box.height).toBeGreaterThanOrEqual(44);
          expect(box.x).toBeGreaterThanOrEqual(0);
          expect(box.x + box.width).toBeLessThanOrEqual(width);
          expect(
            await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
          ).toBe(true);
          await link.focus();
          await expect(link).toBeFocused();
        }
      }
    }
    expect(errors).toEqual([]);
  });
}

test("repository link works without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:1414/missions/01-invitation/");
  await expect(page.locator("header .github-link")).toHaveAttribute(
    "href",
    "https://github.com/ali-shokoohi/walls",
  );
  await context.close();
});
