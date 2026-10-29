import { test, expect } from "@playwright/test";
import { readMissions, submit } from "./helpers.js";

const savedState = (page) =>
  page.evaluate(() => JSON.parse(localStorage.getItem("hermes-security-adventure-v1")));

for (const language of ["en", "fa"]) {
  test(`${language}: Previous undoes the returned mission and later progress, including after reload`, async ({
    page,
  }) => {
    await page.goto(language === "fa" ? "/fa/" : "/");
    const missions = await readMissions(page);
    await page.evaluate((missions) => {
      localStorage.setItem(
        "hermes-security-adventure-v1",
        JSON.stringify({
          done: missions.slice(0, 4).map((m) => m.id),
          retries: { [missions[0].id]: 1, [missions[2].id]: 2, [missions[3].id]: 1 },
          index: 3,
          started: true,
          screen: "mission",
          draft: { id: missions[3].id, selected: missions[3].answer, result: "correct" },
        }),
      );
    }, missions);
    await page.reload();
    await expect(page.locator('[role="progressbar"]')).toHaveAttribute(
      "aria-valuenow",
      "4",
    );
    await page.locator("#previous").click();
    await expect(page.locator(".mhead h2")).toHaveText(missions[2].title);
    await expect(page.locator('[aria-pressed="true"]')).toHaveCount(0);
    await expect(page.locator("#check")).toBeDisabled();
    await expect(page.locator("#feedback")).toBeEmpty();
    await expect(page.locator('[role="progressbar"]')).toHaveAttribute(
      "aria-valuenow",
      "2",
    );
    const state = await savedState(page);
    expect(state.done).toEqual(missions.slice(0, 2).map((m) => m.id));
    expect(state.retries).toEqual({ [missions[0].id]: 1 });
    expect(state.draft).toBeUndefined();
    const points = new Intl.NumberFormat(language === "fa" ? "fa-IR" : "en-US").format(
      200,
    );
    await expect(page.locator(".xp b")).toHaveText(new RegExp(points));
    await page.reload();
    await expect(page.locator('[role="progressbar"]')).toHaveAttribute(
      "aria-valuenow",
      "2",
    );
    await expect(page.locator('[aria-pressed="true"]')).toHaveCount(0);
    await submit(page, missions[2].answer);
    await expect(page.locator('[role="progressbar"]')).toHaveAttribute(
      "aria-valuenow",
      "3",
    );
    await page.locator("#next").click();
    await page.locator("#previous").click();
    await expect(page.locator('[role="progressbar"]')).toHaveAttribute(
      "aria-valuenow",
      "2",
    );
  });

  test(`${language}: Back to the start resets the whole run instead of pausing`, async ({
    page,
  }) => {
    await page.goto(language === "fa" ? "/fa/" : "/");
    const missions = await readMissions(page);
    await page.evaluate((missions) => {
      localStorage.setItem(
        "hermes-security-adventure-v1",
        JSON.stringify({
          done: missions.map((m) => m.id),
          retries: { invitation: 3 },
          index: missions.length - 1,
          started: true,
          screen: "briefing",
          resumeScreen: "briefing",
          draft: {
            id: missions.at(-1).id,
            selected: missions.at(-1).answer,
            result: "correct",
          },
        }),
      );
    }, missions);
    await page.reload();
    await page.locator("#home").click();
    expect(await savedState(page)).toEqual({
      done: [],
      retries: {},
      index: 0,
      started: false,
    });
    await page.reload();
    await page.locator("#start").click();
    await expect(page.locator(".mhead h2")).toHaveText(missions[0].title);
    await expect(page.locator('[role="progressbar"]')).toHaveAttribute(
      "aria-valuenow",
      "0",
    );
    await expect(page.locator('[aria-pressed="true"]')).toHaveCount(0);
    await expect(page.locator("#previous")).toBeDisabled();
  });
}
