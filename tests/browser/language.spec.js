import { test, expect } from "@playwright/test";

test("English stays LTR; Farsi is native RTL with Vazirmatn only on Farsi", async ({
  page,
}) => {
  const requests = [];
  page.on("request", (r) => requests.push(r.url()));
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  expect(
    await page.locator("body").evaluate((e) => getComputedStyle(e).fontFamily),
  ).not.toContain("Vazirmatn");
  expect(requests.some((u) => u.toLowerCase().includes("vazirmatn"))).toBe(false);
  await page.locator(".language-switch").click();
  await expect(page).toHaveURL(/\/fa\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "fa-IR");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page
      .locator("body")
      .evaluate((e) => getComputedStyle(e).fontFamily.toLowerCase()),
  ).toContain("vazirmatn");
  expect(await page.evaluate(() => document.fonts.check("16px Vazirmatn"))).toBe(true);
  expect(
    await page.evaluate(() =>
      [...document.fonts].some(
        (font) =>
          font.family.toLowerCase().includes("vazirmatn") && font.status === "loaded",
      ),
    ),
  ).toBe(true);
  await expect(page.locator("#start")).toContainText("شروع");
  await page.locator("#start").click();
  await expect(page.locator(".mhead h2")).toHaveText("اولین مهمان شما");
  expect(
    await page
      .locator(".choice")
      .first()
      .evaluate((e) => getComputedStyle(e).textAlign),
  ).toBe("start");
  await page.locator('[data-choice="0"]').click();
  await page.locator("#check").click();
  await expect(page.locator(".failure-reason")).not.toContainText("This assumes");
  await expect(page.locator("#hintPanel")).toBeHidden();
  await page.locator(".language-switch").click();
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  await expect(page.locator(".feedback.bad")).toContainText("Only a server expert");
});

test("Farsi missions, order, progress and language-specific text remain functional on phones", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/fa/");
  const missions = await page
    .locator("#mission-data")
    .evaluate((e) => JSON.parse(e.textContent));
  expect(missions).toHaveLength(14);
  await page.locator("#start").click();
  for (let i = 0; i < missions.length; i++) {
    for (const j of missions[i].answer)
      await page.locator(`[data-choice="${j}"]`).click();
    await page.locator("#check").click();
    await expect(page.locator(".feedback:not(.bad)")).toBeVisible();
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth <= document.documentElement.clientWidth,
      ),
    ).toBe(true);
    await page.locator("#next").click();
  }
  await expect(page.locator(".certificate h2")).toHaveText("مدافع آگاه");
  await page.reload();
  await expect(page.locator(".certificate h2")).toHaveText("مدافع آگاه");
  const dl = page.waitForEvent("download");
  await page.locator("#export").click();
  expect((await dl).suggestedFilename()).toContain("fa");
});

test("Farsi mirrors answer controls and isolates technical tokens without executing markup", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/fa/");
  await page.locator("#start").click();
  const geometry = await page
    .locator(".choice")
    .first()
    .evaluate((e) => {
      const key = e.querySelector(".key").getBoundingClientRect();
      const copy = e.querySelector(".copy").getBoundingClientRect();
      return { keyStart: key.x, copyEnd: copy.right };
    });
  expect(geometry.keyStart).toBeGreaterThanOrEqual(geometry.copyEnd);
  expect(await page.locator("#previous").innerText()).toContain("→");
  // Assert real rendered content, not a global implementation detail.
  const missions = await page
    .locator("#mission-data")
    .evaluate((e) => JSON.parse(e.textContent));
  await page.evaluate(
    (ids) =>
      localStorage.setItem(
        "hermes-security-adventure-v1",
        JSON.stringify({ done: ids, index: 6, started: true, retries: {} }),
      ),
    missions.slice(0, 6).map((m) => m.id),
  );
  await page.reload();
  await page.locator('[data-choice="0"]').click();
  await page.locator("#check").click();
  await expect(
    page.locator(".failure-consequence bdi").filter({ hasText: "api.telegram.org" }),
  ).toHaveCount(1);
  await page.goto("/fa/missions/05-network/");
  await page.locator("summary").click();
  expect(await page.locator('bdi[dir="ltr"]').count()).toBeGreaterThan(0);
});

test("readable translated lesson switches to its corresponding English page without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:1414/fa/missions/01-invitation/");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.locator("h1")).toHaveText("اولین مهمان شما");
  await page.locator(".language-switch").click();
  await expect(page).toHaveURL("http://127.0.0.1:1414/missions/01-invitation/");
  await expect(page.locator("h1")).toHaveText("Your first visitor");
  await context.close();
});
