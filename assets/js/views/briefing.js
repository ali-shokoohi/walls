export function renderBriefing({ missions, store, i18n }) {
  const { tr, text, num } = i18n;
  const state = store.state;
  const n = store.completed();
  return `<section class="outro"><div class="label">${tr("finalBriefing")}</div><h1>${tr("finalTitle")}</h1><p class="muted">${tr("finalBody")}</p><div class="certificate"><div class="label">${tr("milestone")}</div><h2>${tr(n === missions.length ? "defender" : "training")}</h2><p>${tr("certificateBody")}</p><div class="facts"><div><b>${num(n)}/${num(missions.length)}</b><span>${tr("completedMissions")}</span></div><div><b>${num(store.unlocked().size)}/${num(6)}</b><span>${tr("defenseIdeas")}</span></div><div><b>${num(n * 100)}</b><span>${tr("learningPoints")}</span></div></div></div>
<div class="takeaways"><section><h3>${tr("habits")}</h3><ul>${[1, 2, 3, 4, 5].map((i) => `<li>${tr("habit" + i)}</li>`).join("")}</ul></section><section><h3>${tr("askOperator")}</h3><ul>${[1, 2, 3, 4, 5, 6].map((i) => `<li>${tr("ask" + i)}</li>`).join("")}</ul></section></div>
<h3 class="replay-heading">${tr("replay")}</h3><div class="reviewlist">${missions
    .filter((m, i) => i <= store.highest())
    .map(
      (m) =>
        `<button class="reviewrow" data-review="${missions.indexOf(m)}"><b>${store.isDone(m) ? "✓ " : ""}${text(m.title)}</b><span>${text(m.lesson)}</span></button>`,
    )
    .join(
      "",
    )}</div><div class="actions"><button class="primary" id="export">${tr("export")}</button><button class="quiet" id="print">${tr("print")}</button><button class="quiet" id="home">${tr("home")}</button></div><div class="footerline">${tr("finalDisclaimer")}</div></section>`;
}
