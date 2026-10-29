import { failureDetails } from "../core/rules.js";

function failureCard(title, explanation, kind, i18n) {
  const { text, tr } = i18n;
  return `<div class="failure-detail failure-${kind}"><h4>${text(title)}</h4><p class="failure-label">${tr("whyFails")}</p><p class="failure-reason">${text(explanation.reason)}</p><p class="failure-label">${tr("consequence")}</p><p class="failure-consequence">${text(explanation.consequence)}</p></div>`;
}
function wrongAnswerFeedback(m, { i18n, selected }) {
  const { tr, t } = i18n;
  const details = failureDetails(m, selected).map((d) =>
    failureCard(t(d.label, d.values), d.explanation, d.kind, i18n),
  );
  return `<section class="feedback bad" tabindex="-1" id="resultBox"><div class="reward">${tr("tryLearn")}</div><h3>${tr("breaks")}</h3><p>${tr(m.type === "choice" ? "wrongChoiceIntro" : "wrongOtherIntro")} ${tr("exampleNote")}</p>${details.join("")}<p class="mini">${tr("retryNote")}</p><div class="actions"><button class="primary" id="again">${tr("retry")}</button></div></section>`;
}

export function renderFeedback(m, { missions, store, i18n, selected, result }) {
  const { tr, text, forward: FORWARD } = i18n;
  const state = store.state;

  if (!result) return "";
  if (result === "wrong") return wrongAnswerFeedback(m, { i18n, selected });
  return `<section class="feedback" tabindex="-1" id="resultBox"><div class="reward">${text(m.reward)} · ${store.isDone(m) ? tr("missionComplete") : ""}</div><h3>${tr(m.unlocks.length ? "defenseUnlocked" : "gotIt")}</h3><p>${text(m.success)}</p><p class="rule">${text(m.lesson)}</p><ul>${m.why.map((w) => `<li>${text(w)}</li>`).join("")}</ul><div class="term"><strong>${tr("plainWord")} ${text(m.term.word)}</strong><br>${text(m.term.meaning)}</div><p class="mini">${tr("fromPdf")} ${tr(m.source)}.</p><div class="actions"><button class="primary" id="next">${tr(state.index === missions.length - 1 ? "finalOpen" : "next")} ${FORWARD}</button><button class="quiet" id="reviewSource">${tr("aboutSource")}</button></div></section>`;
}
