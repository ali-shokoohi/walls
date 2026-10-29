export async function begin(page, language = "") {
  await page.goto(language ? `/${language}/` : "/");
  await page.locator("#start").click();
}

export async function readMissions(page) {
  return page
    .locator("#mission-data")
    .evaluate((element) => JSON.parse(element.textContent));
}

export async function submit(page, indexes) {
  for (const index of indexes) await page.locator(`[data-choice="${index}"]`).click();
  await page.locator("#check").click();
}

export async function loadMission(page, index, language = "") {
  await page.goto(language ? `/${language}/` : "/");
  const missions = await readMissions(page);
  await page.evaluate(
    ({ ids, index }) =>
      localStorage.setItem(
        "hermes-security-adventure-v1",
        JSON.stringify({ done: ids, retries: {}, index, started: true }),
      ),
    { ids: missions.slice(0, index).map((m) => m.id), index },
  );
  await page.reload();
  return missions[index];
}
