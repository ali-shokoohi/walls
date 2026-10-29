import { createStore } from "./core/state.js";
import { isCorrect, choiceKey, sequenceText, answerStatus } from "./core/rules.js";
import { renderWelcome } from "./views/welcome.js";
import { renderMission } from "./views/mission.js";
import { renderBriefing } from "./views/briefing.js";
import { renderTrail } from "./views/progress.js";
import { $, $$, topFocus, scrollBehavior, bindDialogDismissal } from "./ui/dom.js";
import { downloadNotes } from "./ui/notes.js";

// Single owner for transitions and event binding. Renderers are side-effect free.
export function startGame({ missions, i18n, storage }) {
  if (!missions.length)
    throw new Error("No missions were generated. Check content/missions.");
  const store = createStore(missions, storage);
  let selected = [],
    result = null,
    showHint = false,
    resetArmed = false;
  const current = () => missions[store.state.index];
  const context = () => ({ missions, store, i18n, selected, result, showHint });
  const saveDraft = () => store.saveDraft(selected, result);
  const openAbout = () => $("#about").showModal();

  function welcome() {
    $("#app").dataset.motion = "scene";
    $("#app").innerHTML = renderWelcome(context());
    $("#start").onclick = resume;
  }
  function resume() {
    const state = store.state;
    state.started = true;
    state.screen =
      state.resumeScreen === "briefing" && store.completed() === missions.length
        ? "briefing"
        : "mission";
    store.save();
    if (state.screen === "briefing") briefing();
    else mission();
    topFocus();
  }
  function pause() {
    store.state.resumeScreen = store.state.screen || "mission";
    store.state.screen = "home";
    store.save();
    welcome();
    topFocus();
  }
  function backToStart() {
    store.reset();
    selected = [];
    result = null;
    showHint = false;
    welcome();
    topFocus();
  }
  function previous() {
    if (store.state.index <= 0) return;
    store.rewind(store.state.index - 1);
    mission();
    topFocus();
  }
  function mission() {
    selected = store.validDraft();
    const draft = store.state.draft;
    result =
      selected.length &&
      draft?.id === current().id &&
      ["correct", "wrong"].includes(draft.result)
        ? draft.result
        : null;
    showHint = false;
    paint();
  }
  function navigate(index) {
    if (!Number.isInteger(index) || index < 0 || index > store.highest()) return;
    store.state.index = index;
    store.state.screen = "mission";
    delete store.state.draft;
    store.save();
    mission();
    topFocus();
  }
  function next() {
    if (store.state.index === missions.length - 1) {
      briefing();
      topFocus();
    } else navigate(store.state.index + 1);
  }
  function updateSelection() {
    const m = current();
    $$("[data-choice]").forEach((button) => {
      const i = Number(button.dataset.choice),
        active = selected.includes(i);
      button.classList.toggle("selected", active);
      button.setAttribute("aria-pressed", String(active));
      $(".key", button).textContent = choiceKey(m, selected, i, i18n);
    });
    $("#check").disabled = !selected.length;
    $("#clearSelection").disabled = !selected.length;
    $("#answerStatus").textContent = answerStatus(m, selected, i18n);
    const sequence = $("#sequence");
    if (sequence) {
      sequence.hidden = !selected.length;
      sequence.innerHTML = i18n.text(sequenceText(m, selected, i18n));
    }
    $("#feedback").replaceChildren();
  }
  function check() {
    const m = current(),
      good = isCorrect(m, selected);
    result = good ? "correct" : "wrong";
    showHint = false;
    if (good && !store.isDone(m)) store.state.done.push(m.id);
    if (!good) store.state.retries[m.id] = (store.state.retries[m.id] || 0) + 1;
    saveDraft();
    paint(false);
    $("#resultBox")?.focus({ preventScroll: true });
    $("#resultBox")?.scrollIntoView({
      block: "nearest",
      behavior: scrollBehavior(),
    });
  }
  function paint(enterScene = true) {
    const previousProgress = $(".meter i")?.style.width;
    $("#app").dataset.motion = enterScene ? "scene" : "feedback";
    $("#app").innerHTML = renderMission(context());
    const meter = $(".meter i");
    if (previousProgress && previousProgress !== meter.style.width) {
      meter.style.setProperty("--progress-from", previousProgress);
      meter.classList.add("progress-changed");
    }
    $$("[data-choice]").forEach(
      (button) =>
        (button.onclick = () => {
          const index = Number(button.dataset.choice);
          selected =
            current().type === "choice"
              ? [index]
              : selected.includes(index)
                ? selected.filter((i) => i !== index)
                : [...selected, index];
          result = null;
          saveDraft();
          updateSelection();
        }),
    );
    $("#hint").onclick = () => {
      showHint = !showHint;
      $("#hintPanel").hidden = !showHint;
      $("#hint").setAttribute("aria-expanded", String(showHint));
      $("#hint").textContent = i18n.t(showHint ? "hideHint" : "hint");
    };
    $("#pause").onclick = pause;
    $("#previous").onclick = previous;
    $("#progressBtn").onclick = openProgress;
    $("#clearSelection").onclick = () => {
      selected = [];
      result = null;
      saveDraft();
      updateSelection();
      $("[data-choice]").focus({ preventScroll: true });
    };
    $("#check").onclick = check;
    $$("aside [data-go]").forEach(
      (button) => (button.onclick = () => navigate(Number(button.dataset.go))),
    );
    $("#next")?.addEventListener("click", next);
    $("#again")?.addEventListener("click", () => {
      result = null;
      saveDraft();
      updateSelection();
      const first = $("[data-choice]");
      first.focus({ preventScroll: true });
      first.scrollIntoView({ block: "center", behavior: scrollBehavior() });
    });
    $("#reviewSource")?.addEventListener("click", openAbout);
  }
  function briefing() {
    store.state.screen = "briefing";
    store.save();
    $("#app").dataset.motion = "scene";
    $("#app").innerHTML = renderBriefing(context());
    $$("[data-review]").forEach(
      (button) => (button.onclick = () => navigate(Number(button.dataset.review))),
    );
    $("#export").onclick = () => downloadNotes(missions, store, i18n);
    $("#print").onclick = () => window.print();
    $("#home").onclick = backToStart;
  }
  function openProgress() {
    $("#journeyContent").innerHTML = renderTrail(context());
    $$("#journeyContent [data-go]").forEach(
      (button) =>
        (button.onclick = () => {
          $("#journeyDialog").close();
          navigate(Number(button.dataset.go));
        }),
    );
    $("#journeyDialog").showModal();
  }

  bindDialogDismissal();
  $("#glossaryBtn").onclick = () => $("#glossary").showModal();
  $("#aboutBtn").onclick = openAbout;
  $("#wordlist").innerHTML = missions
    .map((m) => `<dt>${i18n.text(m.term.word)}</dt><dd>${i18n.text(m.term.meaning)}</dd>`)
    .join("");
  $("#resetBtn").onclick = () => {
    if (!resetArmed) {
      resetArmed = true;
      $("#resetNotice").hidden = false;
      setTimeout(() => {
        resetArmed = false;
        $("#resetNotice").hidden = true;
      }, 7000);
      return;
    }
    resetArmed = false;
    $("#resetNotice").hidden = true;
    $("#about").close();
    backToStart();
  };
  if (store.state.screen === "briefing" && store.completed() === missions.length)
    briefing();
  else if (store.state.started && store.state.screen !== "home") mission();
  else welcome();
}
