import { test, expect } from "@playwright/test";
import { readMissions, submit } from "./helpers.js";

for (const width of [320, 1440]) {
  test(`Spanish missions, retries and completion work at ${width}px`, async ({
    page,
  }) => {
    const errors = [];
    const requests = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("request", (request) => requests.push(request.url()));
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/es/");
    await expect(page.locator("html")).toHaveAttribute("lang", "es-ES");
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    expect(
      await page
        .locator("body")
        .evaluate((element) => getComputedStyle(element).fontFamily),
    ).not.toContain("Vazirmatn");
    const missions = await readMissions(page);
    expect(missions).toHaveLength(14);
    await page.locator("#start").click();
    await submit(page, [0]);
    await expect(page.locator(".feedback.bad")).toBeVisible();
    await expect(page.locator(".failure-reason")).not.toContainText("This assumes");
    await expect(page.locator("#hintPanel")).toBeHidden();
    await page.locator("#again").click();
    for (const mission of missions) {
      await expect(page.locator(".mhead h2")).toHaveText(mission.title);
      await submit(page, mission.answer);
      await expect(page.locator(".feedback:not(.bad)")).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      ).toBe(true);
      await page.locator("#next").click();
    }
    await expect(page.locator(".certificate")).toContainText("14/14");
    await page.reload();
    await expect(page.locator(".certificate")).toContainText("14/14");
    const downloadEvent = page.waitForEvent("download");
    await page.locator("#export").click();
    const download = await downloadEvent;
    const stream = await download.createReadStream();
    const chunks = [];
    for await (const chunk of stream) chunks.push(chunk);
    const notes = Buffer.concat(chunks).toString("utf8");
    expect(notes).toContain(missions[0].lesson);
    expect(notes).toContain(missions[13].lesson);
    expect(notes).not.toContain("MY LEARNING NOTES");
    expect(requests.some((url) => /vazirmatn/i.test(url))).toBe(false);
    expect(errors).toEqual([]);
  });
}

test("keyboard language switching preserves Spanish answers and shared progress", async ({
  page,
}) => {
  await page.goto("/");
  const missions = await readMissions(page);
  await page.locator("#start").click();
  await submit(page, missions[0].answer);
  await page.locator("#next").click();
  await page.locator('[data-choice="0"]').click();
  const trigger = page.locator(".language-picker > summary");
  await trigger.focus();
  await page.keyboard.press("Enter");
  const spanishLink = page.locator('.language-switch[hreflang="es"]');
  await expect(spanishLink).toHaveText("Español");
  await spanishLink.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/es\/$/);
  const spanish = await readMissions(page);
  await expect(page.locator(".mhead h2")).toHaveText(spanish[1].title);
  await expect(page.locator('[data-choice="0"]')).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".xp")).toContainText("100");
  await page.reload();
  await expect(page.locator('[data-choice="0"]')).toHaveAttribute("aria-pressed", "true");
  await page.locator(".language-picker > summary").click();
  await page.locator('.language-switch[hreflang="fa"]').click();
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.locator('[data-choice="0"]')).toHaveAttribute("aria-pressed", "true");
  await page.locator(".language-picker > summary").click();
  await page.locator('.language-switch[hreflang="en"]').click();
  await expect(page.locator(".mhead h2")).toHaveText(missions[1].title);
  await expect(page.locator(".xp")).toContainText("100 learning points");
});

test("Spanish library and corresponding lesson links work without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:1414/es/");
    await page.locator("noscript a").click();
    await expect(page).toHaveURL(/\/es\/missions\/$/);
    await expect(page.locator(".reviewlist a")).toHaveCount(14);
    await page.locator(".reviewlist a").first().click();
    await expect(page.locator("html")).toHaveAttribute("lang", "es-ES");
    await page.locator("details.starter > summary").click();
    await expect(page.locator("details.starter")).not.toContainText("An AI agent");
    await page.locator(".language-picker > summary").click();
    await page.locator('.language-switch[hreflang="en"]').click();
    await expect(page).toHaveURL(/\/missions\/01-invitation\/$/);
    await expect(page.locator("h1")).toHaveText("Your first visitor");
  } finally {
    await context.close();
  }
});
