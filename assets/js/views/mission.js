import { renderSidebar } from "./progress.js";
import { renderFeedback } from "./feedback.js";
import { choiceKey, sequenceText, answerStatus } from "../core/rules.js";

export function renderMission({ missions, store, i18n, selected, result, showHint }) {
  const { t, tr, text, num, esc, back: BACK, openQuote, closeQuote } = i18n;
  const state = store.state;
  const m = missions[state.index],
    n = store.completed();
  return `
<nav class="mission-nav" aria-label="${esc(t("controls"))}">
<button class="quiet" id="previous" aria-label="${esc(t("previousMission"))}" ${state.index === 0 ? "disabled" : ""}>${BACK}<span class="nav-label"> ${tr("previous")}</span></button>
<button class="quiet" id="pause" aria-label="${esc(t("savePause"))}">${tr("savePause")}</button>
<button class="quiet" id="progressBtn" aria-haspopup="dialog">${tr("trail")} <span aria-hidden="true">${num(state.index + 1)}/${num(missions.length)}</span></button></nav>
<div class="gamebar"><div><div class="label muted">${text(m.chapter)}</div><h1>${tr("yourAdventure")}</h1></div><div class="xp"><b>${tr("points", { n: num(n * 100) })}</b> · ${tr("completedCount", { n: num(n), total: num(missions.length) })}<div class="meter" role="progressbar" aria-label="${esc(t("completedMissions"))}" aria-valuenow="${n}" aria-valuemin="0" aria-valuemax="${missions.length}"><i style="width:${(n / missions.length) * 100}%"></i></div></div></div>
<div class="layout"><article class="mission"><div class="mhead"><div class="label">${tr("missionCount", { n: num(state.index + 1), total: num(missions.length) })}</div><h2>${text(m.title)}</h2><p class="goal">${text(m.goal)}</p></div>
<div class="scene"><div class="worldline"><span class="pulse"></span>${tr("moment")}</div><p>${text(m.scene)}</p><div class="speech"><small>${text(m.speaker)}</small><blockquote>${openQuote}${text(m.message)}${closeQuote}</blockquote></div></div>
<div class="challenge"><p class="task" id="task">${text(m.task)}</p><p class="hintline">${tr(m.type === "multi" ? "multiInstructions" : m.type === "order" ? "orderInstructions" : "choiceInstructions")}</p>
<div class="choices" role="group" aria-labelledby="task">${m.options.map((o, i) => `<button class="choice ${selected.includes(i) ? "selected" : ""}" data-choice="${i}" aria-pressed="${selected.includes(i)}" ${result === "correct" ? "disabled" : ""}><span class="key" aria-hidden="true">${choiceKey(m, selected, i, i18n)}</span><span class="copy"><b>${text(o.title)}</b><small>${text(o.detail)}</small></span></button>`).join("")}</div>
${m.type === "order" ? `<p id="sequence" class="mini" ${selected.length ? "" : "hidden"}>${text(sequenceText(m, selected, i18n))}</p>` : ""}
<div class="answer-meta" id="answerStatus" role="status" aria-live="polite">${esc(answerStatus(m, selected, i18n))}</div>
<div class="actions answer-actions"><button class="primary" id="check" ${!selected.length || result === "correct" ? "disabled" : ""}>${tr("check")}</button><button class="quiet" id="hint" aria-controls="hintPanel" aria-expanded="${showHint}">${tr(showHint ? "hideHint" : "hint")}</button></div>
<div class="selection-tools"><button class="text-button" id="clearSelection" ${!selected.length || result === "correct" ? "disabled" : ""}>${tr("clear")}</button><span class="mini">${tr("noPenalty")}</span></div>
<div class="hint" id="hintPanel" ${showHint ? "" : "hidden"}><b>${tr("clue")}</b> ${text(m.lesson)}</div><div id="feedback" aria-live="polite">${renderFeedback(m, { missions, store, i18n, selected, result })}</div></div></article>${renderSidebar({ missions, store, i18n })}</div><div class="footerline">${tr("safeNote")}</div>`;
}
