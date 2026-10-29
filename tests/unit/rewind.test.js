import test from "node:test";
import assert from "node:assert/strict";
import { createStore } from "../../assets/js/core/state.js";

const missions = ["one", "two", "three"].map((id, index) => ({
  id,
  options: [{}],
  type: "choice",
  unlocks: [index ? "Isolation" : "Host"],
}));

test("rewind removes completion, retries, draft and unlocks from target onward and persists", () => {
  let value = JSON.stringify({
    done: ["one", "two", "three"],
    retries: { one: 1, two: 2, three: 1 },
    index: 2,
    started: true,
    screen: "briefing",
    resumeScreen: "briefing",
    draft: { id: "three", selected: [0], result: "correct" },
  });
  const storage = {
    getItem: () => value,
    setItem: (_, next) => {
      value = next;
    },
  };
  const store = createStore(missions, storage);
  store.rewind(1);
  assert.deepEqual(store.state, {
    done: ["one"],
    retries: { one: 1 },
    index: 1,
    started: true,
    screen: "mission",
  });
  assert.equal(store.completed(), 1);
  assert.deepEqual([...store.unlocked()], ["Host"]);
  assert.equal(store.highest(), 1);
  assert.deepEqual(createStore(missions, storage).state, store.state);
  const before = value;
  for (const invalid of [-1, 3, 0.5, NaN]) store.rewind(invalid);
  assert.equal(value, before);
  store.rewind(0);
  assert.equal(store.completed(), 0);
  assert.deepEqual(store.state.retries, {});
  assert.equal(store.unlocked().size, 0);
});
