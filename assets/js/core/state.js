export const STORAGE_KEY = "hermes-security-adventure-v1";
const emptyState = () => ({ done: [], retries: {}, index: 0, started: false });

export function createStore(missions, storage) {
  let state = emptyState();
  let available = true;
  try {
    const saved = JSON.parse(storage.getItem(STORAGE_KEY));
    if (saved && Array.isArray(saved.done)) {
      state = { ...state, ...saved };
      state.done = [...new Set(saved.done)].filter((id) =>
        missions.some((m) => m.id === id),
      );
      state.index = Math.max(
        0,
        Math.min(missions.length - 1, Math.trunc(Number(state.index) || 0)),
      );
      state.retries =
        state.retries &&
        typeof state.retries === "object" &&
        !Array.isArray(state.retries)
          ? state.retries
          : {};
    }
  } catch {
    available = false;
  }
  return {
    get state() {
      return state;
    },
    get available() {
      return available;
    },
    save() {
      try {
        storage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        available = false;
      }
    },
    reset() {
      state = emptyState();
      this.save();
    },
    completed() {
      return state.done.length;
    },
    isDone(m) {
      return state.done.includes(m.id);
    },
    highest() {
      let i = 0;
      while (i < missions.length && this.isDone(missions[i])) i++;
      return Math.min(i, missions.length - 1);
    },
    unlocked() {
      return new Set(missions.filter((m) => this.isDone(m)).flatMap((m) => m.unlocks));
    },
    validDraft() {
      const draft = state.draft,
        m = missions[state.index];
      if (!draft || draft.id !== m.id || !Array.isArray(draft.selected)) return [];
      const choices = [...new Set(draft.selected)].filter(
        (i) => Number.isInteger(i) && i >= 0 && i < m.options.length,
      );
      return m.type === "choice" ? choices.slice(0, 1) : choices;
    },
    saveDraft(selected, result) {
      state.draft = {
        id: missions[state.index].id,
        selected: [...selected],
        result,
      };
      this.save();
    },
  };
}
