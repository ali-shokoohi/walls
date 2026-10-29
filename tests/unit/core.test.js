import test from "node:test";
import assert from "node:assert/strict";
import { isCorrect, choiceKey, failureDetails } from "../../assets/js/core/rules.js";
import { createI18n } from "../../assets/js/core/i18n.js";
import { createStore } from "../../assets/js/core/state.js";
import { nextTheme } from "../../assets/js/ui/theme-toggle.js";

test("answer rules keep unordered multi-select separate from ordered steps", () => {
  assert.equal(isCorrect({ type: "multi", answer: [0, 2] }, [2, 0]), true);
  assert.equal(isCorrect({ type: "multi", answer: [0, 2] }, [0, 1, 2]), false);
  assert.equal(isCorrect({ type: "order", answer: [2, 0, 1] }, [0, 2, 1]), false);
  assert.equal(
    choiceKey({ type: "multi" }, [2], 2, { num: String, letter: String }),
    "✓",
  );
});

test("wrong-answer diagnosis reports gaps without criticizing safe choices", () => {
  const m = {
    type: "multi",
    answer: [0, 2],
    options: [
      { title: "A" },
      { title: "B", feedback: { reason: "unsafe" } },
      { title: "C", feedback: { reason: "missing" } },
    ],
  };
  assert.deepEqual(
    failureDetails(m, [0, 1]).map((d) => [d.kind, d.index]),
    [
      ["extra", 1],
      ["missing", 2],
    ],
  );
});

test("Persian technical tokens are isolated after safe escaping", () => {
  const fa = createI18n({
    locale: "fa-IR",
    strings: { message: "سلام {name}" },
  });
  assert.match(fa.text("آدرس 10.90.0.10:8081"), /<bdi dir="ltr">10.90.0.10:8081<\/bdi>/);
  assert.ok(!fa.text("<img src=x>").includes("<img"));
  assert.equal(fa.t("message", { name: "دنیا" }), "سلام دنیا");
  assert.throws(() => fa.t("missing"), /Missing translation/);
});

test("store preserves legacy progress, deduplicates IDs, and validates drafts", () => {
  const missions = [
    { id: "one", options: [{}, {}], type: "choice", unlocks: ["Host"] },
    { id: "two", options: [{}, {}], type: "choice", unlocks: [] },
  ];
  let value = JSON.stringify({
    done: ["one", "one", "gone"],
    index: 1,
    started: true,
    draft: { id: "two", selected: [1, 99], result: null },
  });
  const storage = {
    getItem: () => value,
    setItem: (key, next) => {
      value = next;
    },
  };
  const store = createStore(missions, storage);
  assert.deepEqual(store.state.done, ["one"]);
  assert.deepEqual(store.validDraft(), [1]);
  store.save();
  assert.equal(JSON.parse(value).index, 1);
});

test("theme toggle alternates explicit light and dark modes", () => {
  assert.equal(nextTheme("light"), "dark");
  assert.equal(nextTheme("dark"), "light");
  assert.equal(nextTheme("system"), "dark");
});
