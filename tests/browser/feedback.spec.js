import { test, expect } from "@playwright/test";

import { loadMission, submit } from "./helpers.js";

test("wrong choice explains that exact decision and consequence without printing the hint", async ({
  page,
}) => {
  const m = await loadMission(page, 0);
  await page.locator("#hint").click();
  await submit(page, [0]);
  const feedback = page.locator(".feedback.bad");
  await expect(feedback).toContainText(m.options[0].title);
  await expect(feedback.locator(".failure-reason")).toContainText("ordinary message");
  await expect(feedback.locator(".failure-consequence")).toContainText("file");
  await expect(feedback).not.toContainText(m.lesson);
  await expect(feedback).not.toContainText("Think about this");
  await expect(page.locator("#hintPanel")).toBeHidden();
  await page.locator("#again").click();
  await submit(page, [2]);
  await expect(feedback).toContainText(m.options[2].title);
  await expect(feedback.locator(".failure-reason")).toContainText(/untrusted/i);
  await expect(feedback).not.toContainText(m.options[0].title);
  await page.reload();
  await expect(feedback).toContainText(m.options[2].title);
});

test("every wrong single choice has its own authored explanation", async ({ page }) => {
  test.setTimeout(60000);
  await page.goto("/");
  const missions = await page
    .locator("#mission-data")
    .evaluate((e) => JSON.parse(e.textContent));
  for (let i = 0; i < missions.length; i++) {
    const m = missions[i];
    if (m.type !== "choice") continue;
    for (let j = 0; j < m.options.length; j++) {
      if (m.answer.includes(j)) continue;
      await loadMission(page, i);
      await submit(page, [j]);
      const feedback = page.locator(".feedback.bad");
      await expect(feedback).toContainText(m.options[j].title);
      expect(
        m.options[j].feedback?.reason,
        `${m.id} option ${j} needs a reason`,
      ).toBeTruthy();
      expect(
        m.options[j].feedback?.consequence,
        `${m.id} option ${j} needs an example`,
      ).toBeTruthy();
      await expect(feedback.locator(".failure-reason")).toHaveText(
        m.options[j].feedback.reason,
      );
      await expect(feedback.locator(".failure-consequence")).toHaveText(
        m.options[j].feedback.consequence,
      );
      await expect(feedback).not.toContainText(m.lesson);
    }
  }
});

test("multi-select diagnoses extra choices and missing protections without calling safe selections wrong", async ({
  page,
}) => {
  let m = await loadMission(page, 4);
  await submit(page, [0, 1]);
  let card = page.locator(".failure-detail");
  await expect(card).toHaveCount(1);
  await expect(card).toContainText(m.options[1].title);
  await expect(card).not.toContainText(m.options[0].title);
  m = await loadMission(page, 8);
  await submit(page, [0, 3]);
  await expect(page.locator(".failure-extra")).toHaveCount(1);
  await expect(page.locator(".failure-missing")).toHaveCount(2);
  await expect(page.locator(".failure-extra")).toContainText(
    m.options[3].feedback.consequence,
  );
  for (const j of [1, 2]) {
    await expect(
      page.locator(".failure-missing").filter({ hasText: m.options[j].title }),
    ).toContainText(m.options[j].feedback.consequence);
  }
});

test("ordering explains broken prerequisites and incomplete sequences", async ({
  page,
}) => {
  const m = await loadMission(page, 11);
  await submit(page, [2, 0, 3, 1]);
  const feedback = page.locator(".feedback.bad");
  await expect(feedback).toContainText("Preserve evidence");
  await expect(feedback).toContainText("before");
  await expect(feedback.locator(".failure-reason")).toContainText("evidence");
  await expect(feedback.locator(".failure-consequence")).toContainText("rebuild");
  await expect(feedback).not.toContainText(m.lesson);
  await loadMission(page, 11);
  await submit(page, [2]);
  await expect(page.locator(".failure-missing")).toHaveCount(3);
});
