import { test, expect } from "@playwright/test";

import { begin, submit as pick } from "./helpers.js";

// This is a learning exercise: answer data is intentionally public, not a secret.
test("all missions, forgiving retries, scoring, and replay", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await begin(page);
  await pick(page, [0]);
  await expect(page.locator(".feedback.bad")).toBeVisible();
  await expect(page.locator(".xp")).toContainText("0 learning points");
  await page.locator("#again").click();
  const missions = await page
    .locator("#mission-data")
    .evaluate((e) => JSON.parse(e.textContent));
  for (let i = 0; i < missions.length; i++) {
    await pick(page, missions[i].answer);
    await expect(page.locator(".feedback:not(.bad)")).toBeVisible();
    await expect(page.locator(".xp")).toContainText(`${(i + 1) * 100} learning points`);
    await page.locator("#next").click();
  }
  await expect(page.locator(".certificate h2")).toHaveText("Thoughtful defender");
  await expect(page.locator(".certificate")).toContainText("14/14");
  const downloadEvent = page.waitForEvent("download");
  await page.locator("#export").click();
  expect((await downloadEvent).suggestedFilename()).toBe("my-bot-security-notes.txt");
  await page.locator('[data-review="0"]').click();
  await pick(page, missions[0].answer);
  await expect(page.locator(".xp")).toContainText("1400 learning points");
  expect(errors).toEqual([]);
});

test("saved progress survives a real reload", async ({ page }) => {
  await begin(page);
  await pick(page, [1]);
  await page.locator("#next").click();
  await page.reload();
  await expect(page.locator(".mhead h2")).toHaveText("The message inside the message");
  await expect(page.locator(".xp")).toContainText("100 learning points");
});

test("multi-selection and ordering reject unsafe answers", async ({ page }) => {
  await page.goto("/");
  const missions = await page
    .locator("#mission-data")
    .evaluate((e) => JSON.parse(e.textContent));
  const jump = async (index) => {
    await page.evaluate(
      ({ ids, index }) => {
        localStorage.setItem(
          "hermes-security-adventure-v1",
          JSON.stringify({
            done: ids,
            retries: {},
            index,
            started: true,
          }),
        );
      },
      { ids: missions.slice(0, index).map((m) => m.id), index },
    );
    await page.reload();
  };
  await jump(4);
  await pick(page, [0, 1]);
  await expect(page.locator(".feedback.bad")).toBeVisible();
  await jump(11);
  await pick(page, [0, 1, 2, 3]);
  await expect(page.locator(".feedback.bad")).toBeVisible();
  await page.locator("#again").click();
  for (const i of [0, 1, 2, 3]) await page.locator(`[data-choice="${i}"]`).click();
  await pick(page, [2, 3, 0, 1]);
  await expect(page.locator(".feedback:not(.bad)")).toBeVisible();
});

test("hints, dialogs, and confirmed reset", async ({ page }) => {
  await begin(page);
  await page.locator("#hint").click();
  await expect(page.locator(".hint")).toBeVisible();
  await page.locator("#glossaryBtn").click();
  await expect(page.locator("#glossary")).toBeVisible();
  await page.locator("#glossary [data-close]").click();
  await pick(page, [1]);
  await page.locator("#aboutBtn").click();
  await page.locator("#resetBtn").click();
  await expect(page.locator("#resetNotice")).toBeVisible();
  await expect(page.locator(".xp")).toContainText("100 learning points");
  await page.locator("#resetBtn").click();
  await expect(page.locator("#start")).toBeVisible();
});

test("all missions fit a 320px phone and navigation is touch-sized", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/");
  const missions = await page
    .locator("#mission-data")
    .evaluate((e) => JSON.parse(e.textContent));
  for (let index = 0; index < missions.length; index++) {
    await page.evaluate(
      ({ ids, index }) =>
        localStorage.setItem(
          "hermes-security-adventure-v1",
          JSON.stringify({ done: ids, retries: {}, index, started: true }),
        ),
      { ids: missions.slice(0, index).map((m) => m.id), index },
    );
    await page.reload();
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth <= document.documentElement.clientWidth,
      ),
    ).toBe(true);
  }
  await page.locator("#progressBtn").click();
  expect(
    (await page.locator("#journeyDialog [data-go]").first().boundingBox()).height,
  ).toBeGreaterThanOrEqual(44);
});

test("native lesson library and PDF work without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:1414/");
  await page
    .getByRole("link", { name: "read every lesson in the mission library" })
    .click();
  await expect(page.locator(".reviewlist a")).toHaveCount(14);
  await page.locator(".reviewlist a").first().click();
  await expect(page.locator("h1")).toHaveText("Your first visitor");
  await page.locator("summary").click();
  await expect(page.locator("details")).toContainText(
    "An AI agent is a chatbot with hands",
  );
  const pdf = await context.request.get(
    "http://127.0.0.1:1414/downloads/hermes-security-guide-original.pdf",
  );
  expect(pdf.status()).toBe(200);
  expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");
  await context.close();
});
