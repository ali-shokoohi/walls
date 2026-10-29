import { test, expect } from "@playwright/test";
import { begin, readMissions } from "./helpers.js";

for (const language of ["", "fa"]) {
  for (const width of [1440, 390]) {
    test(`scene entrances are animated without blocking focus (${language || "en"}, ${width}px)`, async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.setViewportSize({ width, height: 844 });
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(language ? `/${language}/` : "/");
      const entrance = await page.locator("#start").evaluate((button) => {
        button.click();
        const mission = document.querySelector(".mission");
        return {
          animated: mission
            .getAnimations()
            .some((animation) => animation.playState === "running"),
          focused: document.activeElement === document.querySelector("#app h1"),
        };
      });
      expect(entrance.animated).toBe(true);
      expect(entrance.focused).toBe(true);
      await page.waitForFunction(() =>
        document.getAnimations().every((animation) => animation.playState === "finished"),
      );
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      ).toBe(true);
      expect(errors).toEqual([]);
    });
  }
}

test("the bot greets the player, then settles instead of looping forever", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const greeting = await page.locator(".bot").evaluate((bot) =>
    bot.getAnimations().map((animation) => ({
      name: animation.animationName,
      iterations: animation.effect.getTiming().iterations,
    })),
  );
  expect(greeting.length).toBeGreaterThan(0);
  expect(greeting.every((animation) => Number.isFinite(animation.iterations))).toBe(true);
  await page.waitForFunction(() =>
    document.getAnimations().every((animation) => animation.playState === "finished"),
  );
});

test("selection responds in place and success animates actual progress, not the whole scene", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await begin(page);
  const [mission] = await readMissions(page);
  await page.waitForFunction(() =>
    document.getAnimations().every((animation) => animation.playState === "finished"),
  );
  const selection = await page
    .locator(`[data-choice="${mission.answer[0]}"]`)
    .evaluate((button) => {
      button.focus();
      button.click();
      return {
        focused: document.activeElement === button,
        animated: button.querySelector(".key").getAnimations().length > 0,
      };
    });
  expect(selection).toEqual({ focused: true, animated: true });
  const success = await page.locator("#check").evaluate((button) => {
    button.click();
    const meter = document.querySelector(".meter i");
    return {
      sceneAnimations: document.querySelector(".mission").getAnimations().length,
      progressAnimations: meter.getAnimations().length,
      progressFrom: meter.style.getPropertyValue("--progress-from"),
      progressTo: meter.style.width,
      feedbackAnimations: document.querySelector("#resultBox").getAnimations().length,
      rewardAnimations: document.querySelector(".reward").getAnimations().length,
    };
  });
  expect(success.sceneAnimations).toBe(0);
  expect(success.progressAnimations).toBeGreaterThan(0);
  expect(success.progressFrom).toBe("0%");
  expect(parseFloat(success.progressTo)).toBeGreaterThan(0);
  expect(success.feedbackAnimations).toBeGreaterThan(0);
  expect(success.rewardAnimations).toBeGreaterThan(0);
  await expect(page.locator("#resultBox")).toBeFocused();
});

for (const language of ["", "fa"]) {
  test(`reduced motion disables entrances, feedback, and dialog backdrops (${language || "en"})`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(language ? `/${language}/` : "/");
    expect(await page.locator(".bot").evaluate((bot) => bot.getAnimations().length)).toBe(
      0,
    );
    await page.locator("#start").click();
    const [mission] = await readMissions(page);
    await page.locator(`[data-choice="${mission.answer[0]}"]`).click();
    await page.locator("#check").click();
    expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
    await page.locator("#progressBtn").click();
    expect(
      await page.locator("#journeyDialog").evaluate((dialog) => ({
        animation: getComputedStyle(dialog).animationName,
        backdrop: getComputedStyle(dialog, "::backdrop").animationName,
      })),
    ).toEqual({ animation: "none", backdrop: "none" });
    await page.keyboard.press("Escape");
    await expect(page.locator("#progressBtn")).toBeFocused();
  });
}

test("switching to reduced motion immediately stops an active greeting", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  expect(
    await page.locator(".bot").evaluate((bot) => bot.getAnimations().length),
  ).toBeGreaterThan(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(() => page.evaluate(() => document.getAnimations().length)).toBe(0);
  await expect(page.locator("#start")).toBeEnabled();
});
