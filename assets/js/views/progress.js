import { DEFENSES } from "../core/rules.js";

export function renderSidebar({ missions, store, i18n }) {
  const { t, tr, num, esc } = i18n;
  const state = store.state;

  const U = store.unlocked();
  return `<aside aria-label="${esc(t("progressLabel"))}"><div class="map"><div class="maptop"><span class="label">${tr("collection")}</span></div><div class="layers">${DEFENSES.map((l, i) => `<div class="layer ${U.has(l) ? "on" : ""}"><i aria-hidden="true">${U.has(l) ? "✓" : num(i + 1)}</i><span>${tr(l)}${U.has(l) ? " · " + tr("unlocked") : ""}</span></div>`).join("")}</div><p class="mini">${tr("conceptsNote")}</p></div><div class="progresscard"><div class="label">${tr("trail")}</div><div class="journey">${missions.map((m, i) => `<button class="dot ${store.isDone(m) ? "done" : ""} ${state.index === i ? "current" : ""}" data-go="${i}" ${i > store.highest() ? "disabled" : ""} title="${esc(m.title)}" aria-label="${esc(t("missionLabel", { n: num(i + 1), title: m.title }) + (store.isDone(m) ? t("completedSuffix") : ""))}" ${i === state.index ? 'aria-current="step"' : ""}>${store.isDone(m) ? "✓" : num(i + 1)}</button>`).join("")}</div><p class="saved">${tr(store.available ? "saved" : "notSaved")}</p><div class="normal"><strong>${tr("normal")}</strong>${tr("normalBody")}</div></div></aside>`;
}

export function renderTrail({ missions, store, i18n }) {
  const { tr, text, num } = i18n;
  const state = store.state;
  return `<p class="muted">${tr("trailIntro", { n: num(store.completed()), total: num(missions.length) })}</p><p class="mini">${tr(store.available ? "savedAnswers" : "noStorage")}</p><p class="mini"><strong>${tr("learned", { n: num(store.unlocked().size) })}</strong> ${[...store.unlocked()].map((l) => tr(l)).join(" · ") || tr("firstDefense")} ${tr("achievementsNote")}</p><div class="mission-list">${missions.map((m, i) => `<button class="mission-link ${i === state.index ? "current" : ""}" data-go="${i}" ${i > store.highest() ? "disabled" : ""} ${i === state.index ? 'aria-current="step"' : ""}><span class="mission-number">${store.isDone(m) ? "✓" : num(i + 1)}</span><span><b>${text(m.title)}</b><small>${tr(i > store.highest() ? "locked" : store.isDone(m) ? "replayAnytime" : "ready")}</small></span></button>`).join("")}</div>`;
}
