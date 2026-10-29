const { test, expect } = require("@playwright/test");

async function begin(page) {
  await page.goto("/");
  await page.locator("#start").click();
}

// Changing selection must not replace the focused control or jump the viewport.
test("answer selection is stable, clear, and saved across reloads", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 700 });
  await begin(page);
  const answer = page.locator('[data-choice="1"]');
  await answer.focus();
  await answer.evaluate((e) => {
    window.originalAnswer = e;
  });
  const before = await page.evaluate(() => scrollY);
  await page.keyboard.press("Space");
  expect(await answer.evaluate((e) => e === window.originalAnswer)).toBe(true);
  expect(Math.abs((await page.evaluate(() => scrollY)) - before)).toBeLessThan(
    3,
  );
  await expect(answer).toBeFocused();
  await expect(page.locator("#answerStatus")).toContainText(
    "1 answer selected",
  );
  await page.reload();
  await expect(page.locator('[data-choice="1"]')).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(page.locator("#check")).toBeEnabled();
});

test("feedback, a pause, and the final briefing resume without repeating a mission", async ({
  page,
}) => {
  await begin(page);
  await page.locator('[data-choice="1"]').click();
  await page.locator("#check").click();
  await page.reload();
  await expect(page.locator("#next")).toBeVisible();
  await page.locator("#pause").click();
  await expect(page.locator("#start")).toContainText("Continue");
  await page.reload();
  await expect(page.locator("#start")).toBeVisible();
  await page.locator("#start").click();
  await expect(page.locator("#next")).toBeVisible();
  const ids = await page
    .locator("#mission-data")
    .evaluate((el) => JSON.parse(el.textContent).map((m) => m.id));
  await page.evaluate(
    (ids) =>
      localStorage.setItem(
        "hermes-security-adventure-v1",
        JSON.stringify({
          done: ids,
          retries: {},
          index: ids.length - 1,
          started: true,
          screen: "briefing",
        }),
      ),
    ids,
  );
  await page.reload();
  await expect(page.locator(".certificate h2")).toHaveText(
    "Thoughtful defender",
  );
});

test("progress is available without a phone sidebar and restores keyboard focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 740 });
  await begin(page);
  await expect(page.locator('aside[aria-label="Your progress"]')).toBeHidden();
  await page.locator("#progressBtn").click();
  await expect(
    page.getByRole("dialog", { name: "Your mission trail" }),
  ).toBeVisible();
  await expect(page.locator("#journeyDialog [data-go]")).toHaveCount(14);
  await page.keyboard.press("Escape");
  await expect(page.locator("#progressBtn")).toBeFocused();
  await page.locator('[data-choice="1"]').click();
  await page.locator("#check").click();
  await page.locator("#next").click();
  await page.locator("#previous").click();
  await expect(page.locator(".mhead h2")).toHaveText("Your first visitor");
});

test("readable type, comfortable tablet width, and touch targets across breakpoints", async ({
  page,
}) => {
  for (const width of [320, 390, 600, 820, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.locator("#start")).toBeVisible();
    await page.locator("#start").click();
    const sizes = await page.evaluate(() => ({
      detail: parseFloat(
        getComputedStyle(document.querySelector(".choice small")).fontSize,
      ),
      hint: parseFloat(
        getComputedStyle(document.querySelector(".hintline")).fontSize,
      ),
      mission: document.querySelector(".mission").getBoundingClientRect().width,
      overflow:
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
      tools: Array.from(document.querySelectorAll(".tools button")).map(
        (e) => e.getBoundingClientRect().height,
      ),
    }));
    expect(sizes.detail).toBeGreaterThanOrEqual(14);
    expect(sizes.hint).toBeGreaterThanOrEqual(14);
    expect(sizes.overflow).toBe(false);
    expect(Math.min(...sizes.tools)).toBeGreaterThanOrEqual(44);
    if (width === 820) expect(sizes.mission).toBeGreaterThan(650);
    await page.locator("#pause").click();
  }
});

test("hints and clearing choices do not recreate the question", async ({
  page,
}) => {
  await begin(page);
  await page.locator('[data-choice="1"]').click();
  await page.locator(".choices").evaluate((e) => {
    window.choicesNode = e;
  });
  await page.locator("#hint").click();
  await expect(page.locator("#hintPanel")).toBeVisible();
  expect(
    await page.locator(".choices").evaluate((e) => e === window.choicesNode),
  ).toBe(true);
  await page.locator("#clearSelection").click();
  await expect(page.locator('[aria-pressed="true"]')).toHaveCount(0);
  await expect(page.locator("#check")).toBeDisabled();
});

test("dialogs stay scrollable on short screens and keep their close action reachable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 568, height: 320 });
  await begin(page);
  await page.locator("#progressBtn").click();
  const dialog = page.locator("#journeyDialog");
  const box = await dialog.boundingBox();
  expect(box.height).toBeLessThanOrEqual(320);
  await dialog.evaluate((el) => {
    el.scrollTop = el.scrollHeight;
  });
  await expect(dialog.locator('[data-go="13"]')).toBeInViewport();
  await expect(dialog.locator("[data-close]")).toBeInViewport();
  await page.keyboard.press("Escape");
  await expect(page.locator("#progressBtn")).toBeFocused();
  await page.locator("#aboutBtn").click();
  await page.keyboard.press("Escape");
  await expect(page.locator("#aboutBtn")).toBeFocused();
});

test("large text reflows without hiding the question or actions", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await begin(page);
  await page.addStyleTag({
    content:
      "body { font-size: 200% !important; } button { font-size: 1em !important; }",
  });
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth,
    ),
  ).toBe(true);
  await page.locator('[data-choice="1"]').click();
  await page.locator("#check").click();
  await expect(page.locator("#next")).toBeVisible();
});

test("keyboard skip link lands on the learning content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#app")).toBeFocused();
});
