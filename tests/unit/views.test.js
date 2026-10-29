import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { createStore } from "../../assets/js/core/state.js";
import { createI18n } from "../../assets/js/core/i18n.js";
import { renderWelcome } from "../../assets/js/views/welcome.js";
import { renderMission } from "../../assets/js/views/mission.js";
import { renderBriefing } from "../../assets/js/views/briefing.js";
import { renderTrail } from "../../assets/js/views/progress.js";

const root = fileURLToPath(new URL("../../", import.meta.url));
const frontmatter = (source) => {
  const end = source.lastIndexOf("}");
  return JSON.parse(source.slice(0, end + 1));
};
for (const language of ["en", "fa", "es"]) {
  test(`${language} views render actual authored content without browser globals`, () => {
    const strings = Object.assign(
      {},
      ...readdirSync(join(root, "data/locales")).map((section) =>
        JSON.parse(
          readFileSync(
            join(root, `data/locales/${section}/strings.${language}.json`),
            "utf8",
          ),
        ),
      ),
    );
    const missions = readdirSync(join(root, "content/missions"))
      .filter((name) => /^\d/.test(name))
      .sort()
      .map((name) => {
        const m = frontmatter(
          readFileSync(
            join(root, `content/missions/${name}/index.${language}.md`),
            "utf8",
          ),
        );
        return { ...m, type: m.challenge_type };
      });
    const store = createStore(missions, { getItem: () => null, setItem: () => {} });
    const locales = { en: "en-US", fa: "fa-IR", es: "es-ES" };
    const i18n = createI18n({ locale: locales[language], strings });
    const ctx = { missions, store, i18n, selected: [], result: null, showHint: false };
    assert.match(renderWelcome(ctx), /id="start"/);
    assert.match(renderTrail(ctx), /mission-list/);
    for (let index = 0; index < missions.length; index++) {
      store.state.index = index;
      assert.match(renderMission(ctx), /class="choices"/);
      const answer = missions[index].answer;
      assert.match(
        renderMission({ ...ctx, selected: answer, result: "correct" }),
        /id="next"/,
      );
    }
    store.state.done = missions.map((m) => m.id);
    assert.match(renderBriefing(ctx), /id="export"/);
  });
}
