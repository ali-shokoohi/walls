import { test, expect } from "@playwright/test";

test("language dropdown shows current language and dismisses with Escape or outside click", async ({
  page,
}) => {
  await page.goto("/");
  const picker = page.locator(".language-picker");
  const trigger = picker.locator("summary");
  await expect(trigger).toContainText("English");
  await expect(picker.locator('a[hreflang="fa"]')).toBeHidden();
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(picker.locator('a[hreflang="en"]')).toHaveAttribute(
    "aria-current",
    "page",
  );
  await page.keyboard.press("Tab");
  await page.keyboard.press("Escape");
  await expect(picker).not.toHaveAttribute("open", "");
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.locator("h1").click();
  await expect(picker).not.toHaveAttribute("open", "");
});

test("language dropdown fits narrow screens in both directions", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  for (const path of ["/", "/fa/"]) {
    await page.goto(path);
    const picker = page.locator(".language-picker");
    await picker.locator("summary").click();
    for (const item of await picker.locator("a").all()) {
      const box = await item.boundingBox();
      expect(box.height).toBeGreaterThanOrEqual(44);
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(320);
    }
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth <= document.documentElement.clientWidth,
      ),
    ).toBe(true);
  }
});
