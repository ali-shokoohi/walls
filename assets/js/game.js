const MISSIONS = JSON.parse(
  document.getElementById("mission-data").textContent,
);

const $ = (s) => document.querySelector(s),
  $$ = (s) => Array.from(document.querySelectorAll(s));
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const KEY = "hermes-security-adventure-v1";
let storageOK = true;
let state = { done: [], retries: {}, index: 0, started: false };
try {
  const s = JSON.parse(localStorage.getItem(KEY));
  if (s && Array.isArray(s.done)) {
    state = { ...state, ...s };
    state.done = state.done.filter((id) => MISSIONS.some((m) => m.id === id));
    state.index = Math.max(
      0,
      Math.min(MISSIONS.length - 1, Number(state.index) || 0),
    );
  }
} catch (e) {
  storageOK = false;
}
let selected = validDraft(),
  result = null,
  showHint = false,
  resetArmed = false;
function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    storageOK = false;
  }
}
function completed() {
  return state.done.length;
}
function isDone(m) {
  return state.done.includes(m.id);
}
function highest() {
  let n = 0;
  while (n < MISSIONS.length && isDone(MISSIONS[n])) n++;
  return Math.min(n, MISSIONS.length - 1);
}
function unlocked() {
  return new Set(MISSIONS.filter(isDone).flatMap((m) => m.unlocks));
}
function topFocus() {
  window.scrollTo({ top: 0, behavior: "instant" });
  const h = $("#app h1");
  if (h) {
    h.tabIndex = -1;
    h.focus({ preventScroll: true });
  }
}
function start() {
  state.started = true;
  state.screen =
    state.resumeScreen === "briefing" && completed() === MISSIONS.length
      ? "briefing"
      : "mission";
  save();
  if (state.screen === "briefing") finish();
  else mission();
  topFocus();
}
function pause() {
  state.resumeScreen = state.screen || "mission";
  state.screen = "home";
  save();
  intro();
  topFocus();
}
function intro() {
  $("#app").innerHTML =
    `<section class="intro"><div><div class="label muted">You don’t need to be a server expert.</div><h1>A small bot.<br>Six strong walls.<br>Your decisions.</h1><p>Meet two friends, a helpful AI, and a few very sneaky messages. Build defenses one choice at a time—and find out what happens when a bot gets fooled.</p><button class="primary" id="start">${state.started ? "Continue your adventure" : "Start your adventure"} →</button><p class="subnote">${MISSIONS.length} short missions · No code · No timer · Mistakes welcome</p></div><div class="starter"><div class="botface" aria-hidden="true"><span class="orb a"></span><span class="orb b"></span><span class="orb c"></span><div class="bot"><span class="eye"></span><span class="eye"></span><span class="mouth"></span></div></div><div class="body"><h2>Protect the bot’s little world.</h2><ol><li><strong>Meet a problem.</strong> A stolen account. A tricky document. A secret in the wrong place.</li><li><strong>Make a decision.</strong> Choose what to allow, protect, or shut down.</li><li><strong>See why it matters.</strong> Unlock a defense and learn a useful idea.</li></ol></div><div class="footer">You can learn the operator’s choices without becoming an operator.</div></div></section><div class="footerline">Based on your supplied security guide. This is a learning game, not a live system or a security certification.</div>`;
  $("#start").onclick = start;
}
function aside() {
  const U = unlocked();
  return `<aside aria-label="Your progress"><div class="map"><div class="maptop"><span class="label">Your defense collection</span></div><div class="layers">${["Host", "Isolation", "Network", "Secrets", "Hermes", "Sandbox"].map((l, i) => `<div class="layer ${U.has(l) ? "on" : ""}"><i aria-hidden="true">${U.has(l) ? "✓" : i + 1}</i><span>${l}${U.has(l) ? " · unlocked" : ""}</span></div>`).join("")}</div><p class="mini">These are concepts you’ve learned—not a live security status.</p></div><div class="progresscard"><div class="label">Mission trail</div><div class="journey">${MISSIONS.map((m, i) => `<button class="dot ${isDone(m) ? "done" : ""} ${state.index === i ? "current" : ""}" data-go="${i}" ${i > highest() ? "disabled" : ""} title="${esc(m.title)}" aria-label="Mission ${i + 1}: ${esc(m.title)}${isDone(m) ? ", completed" : ""}" ${i === state.index ? 'aria-current="step"' : ""}>${isDone(m) ? "✓" : i + 1}</button>`).join("")}</div><p class="saved">${storageOK ? "Progress saved on this device." : "Browser storage unavailable; keep this tab open."}</p><div class="normal"><strong>As a normal user</strong>Your most important tools are a secure account, caution with sensitive information, and knowing when to tell the operator.</div></div></aside>`;
}
function validDraft() {
  const draft = state.draft;
  const m = MISSIONS[state.index];
  if (!draft || draft.id !== m.id || !Array.isArray(draft.selected)) return [];
  const choices = [...new Set(draft.selected)].filter(
    (i) => Number.isInteger(i) && i >= 0 && i < m.options.length,
  );
  return m.type === "choice" ? choices.slice(0, 1) : choices;
}
function storeDraft() {
  state.draft = {
    id: MISSIONS[state.index].id,
    selected: [...selected],
    result,
  };
  save();
}
function answerStatus(m) {
  if (!selected.length)
    return m.type === "order"
      ? "No steps added yet"
      : "Choose an answer to continue";
  return m.type === "order"
    ? `${selected.length} of ${m.options.length} steps added`
    : `${selected.length} answer${selected.length === 1 ? "" : "s"} selected`;
}
function updateSelection() {
  const m = MISSIONS[state.index];
  $$("[data-choice]").forEach((button) => {
    const i = Number(button.dataset.choice);
    const active = selected.includes(i);
    button.classList.toggle("selected", active);
    button.setAttribute("aria-pressed", String(active));
    button.querySelector(".key").textContent =
      m.type === "order"
        ? active
          ? selected.indexOf(i) + 1
          : "·"
        : m.type === "multi"
          ? active
            ? "✓"
            : "+"
          : String.fromCharCode(65 + i);
  });
  $("#check").disabled = !selected.length;
  $("#clearSelection").disabled = !selected.length;
  $("#answerStatus").textContent = answerStatus(m);
  const sequence = $("#sequence");
  if (sequence) {
    sequence.hidden = !selected.length;
    sequence.textContent = `Your sequence: ${selected.map((i) => m.options[i].title.split(";")[0]).join(" → ")}`;
  }
  $("#feedback").replaceChildren();
}
function mission() {
  selected = validDraft();
  result =
    selected.length &&
    state.draft?.id === MISSIONS[state.index].id &&
    ["correct", "wrong"].includes(state.draft.result)
      ? state.draft.result
      : null;
  showHint = false;
  paint();
}
function paint() {
  const m = MISSIONS[state.index],
    n = completed();
  $("#app").innerHTML =
    `<nav class="mission-nav" aria-label="Mission controls"><button class="quiet" id="previous" aria-label="Previous mission" ${state.index === 0 ? "disabled" : ""}>←<span class="nav-label"> Previous</span></button><button class="quiet" id="pause" aria-label="Save and pause"><span class="pause-prefix">Save &amp; </span>pause</button><button class="quiet" id="progressBtn" aria-haspopup="dialog">Mission trail <span aria-hidden="true">${state.index + 1}/${MISSIONS.length}</span></button></nav><div class="gamebar"><div><div class="label muted">${esc(m.chapter)}</div><h1>Your security adventure</h1></div><div class="xp"><b>${n * 100} learning points</b> · ${n}/${MISSIONS.length} completed<div class="meter" role="progressbar" aria-label="Missions completed" aria-valuenow="${n}" aria-valuemin="0" aria-valuemax="${MISSIONS.length}"><i style="width:${(n / MISSIONS.length) * 100}%"></i></div></div></div><div class="layout"><article class="mission"><div class="mhead"><div class="label">Mission ${String(state.index + 1).padStart(2, "0")} / ${MISSIONS.length}</div><h2>${esc(m.title)}</h2><p class="goal">${esc(m.goal)}</p></div><div class="scene"><div class="worldline"><span class="pulse"></span> A moment in your bot’s world</div><p>${esc(m.scene)}</p><div class="speech"><small>${esc(m.speaker)}</small><blockquote>“${esc(m.message)}”</blockquote></div></div><div class="challenge"><p class="task" id="task">${esc(m.task)}</p><p class="hintline">${m.type === "multi" ? "Choose all the safe answers." : m.type === "order" ? "Tap to add a step to the sequence. Tap it again to remove it." : "Choose one answer. Nothing happens on a real server."}</p><div class="choices" role="group" aria-labelledby="task">${m.options.map((o, i) => `<button class="choice ${selected.includes(i) ? "selected" : ""}" data-choice="${i}" aria-pressed="${selected.includes(i)}" ${result === "correct" ? "disabled" : ""}><span class="key" aria-hidden="true">${m.type === "order" ? (selected.includes(i) ? selected.indexOf(i) + 1 : "·") : m.type === "multi" ? (selected.includes(i) ? "✓" : "+") : String.fromCharCode(65 + i)}</span><span class="copy"><b>${esc(o.title)}</b><small>${esc(o.detail)}</small></span></button>`).join("")}</div>${m.type === "order" ? `<p id="sequence" class="mini" ${selected.length ? "" : "hidden"}>Your sequence: ${selected.map((i) => esc(m.options[i].title.split(";")[0])).join(" → ")}</p>` : ""}<div class="answer-meta" id="answerStatus" role="status" aria-live="polite">${answerStatus(m)}</div><div class="actions answer-actions"><button class="primary" id="check" ${!selected.length || result === "correct" ? "disabled" : ""}>Check my decision</button><button class="quiet" id="hint" aria-controls="hintPanel" aria-expanded="${showHint}">${showHint ? "Hide hint" : "Need a hint?"}</button></div><div class="selection-tools"><button class="text-button" id="clearSelection" ${!selected.length || result === "correct" ? "disabled" : ""}>Clear selection</button><span class="mini">No penalty for trying again.</span></div><div class="hint" id="hintPanel" ${showHint ? "" : "hidden"}><b>A small clue:</b> ${esc(m.lesson)}</div><div id="feedback" aria-live="polite">${feedback(m)}</div></div></article>${aside()}</div><div class="footerline">Safe to experiment here. No requests, commands, keys, or settings from this game affect a real bot.</div>`;
  $$("[data-choice]").forEach(
    (b) =>
      (b.onclick = () => {
        const i = Number(b.dataset.choice);
        if (m.type === "choice") selected = [i];
        else
          selected = selected.includes(i)
            ? selected.filter((v) => v !== i)
            : [...selected, i];
        result = null;
        storeDraft();
        updateSelection();
      }),
  );
  $("#hint").onclick = () => {
    showHint = !showHint;
    $("#hintPanel").hidden = !showHint;
    $("#hint").setAttribute("aria-expanded", String(showHint));
    $("#hint").textContent = showHint ? "Hide hint" : "Need a hint?";
  };
  $("#pause").onclick = pause;
  $("#previous").onclick = () => go(state.index - 1);
  $("#progressBtn").onclick = openProgress;
  $("#clearSelection").onclick = () => {
    selected = [];
    result = null;
    storeDraft();
    updateSelection();
    $("[data-choice]").focus({ preventScroll: true });
  };
  $("#check").onclick = check;
  $$("[data-go]").forEach((b) => (b.onclick = () => go(Number(b.dataset.go))));
  $("#next")?.addEventListener("click", next);
  $("#again")?.addEventListener("click", () => {
    result = null;
    storeDraft();
    updateSelection();
    const answer = $("[data-choice]");
    answer.focus({ preventScroll: true });
    answer.scrollIntoView({ block: "center", behavior: scrollBehavior() });
  });
  $("#reviewSource")?.addEventListener("click", openAbout);
}
function failureCard(title, explanation, kind) {
  return `<div class="failure-detail failure-${kind}"><h4>${esc(title)}</h4><p class="failure-label">Why this fails</p><p class="failure-reason">${esc(explanation.reason)}</p><p class="failure-label">What could happen</p><p class="failure-consequence">${esc(explanation.consequence)}</p></div>`;
}
function wrongAnswerFeedback(m) {
  let details;
  if (m.type === "order") {
    const violations = (m.order_rules || []).filter(
      (rule) =>
        selected.includes(rule.before) &&
        selected.includes(rule.after) &&
        selected.indexOf(rule.before) > selected.indexOf(rule.after),
    );
    details = violations.map((rule) =>
      failureCard(
        `Order problem: “${m.options[rule.before].title}” must come before “${m.options[rule.after].title}”`,
        rule,
        "order",
      ),
    );
    details.push(
      ...m.answer
        .filter((i) => !selected.includes(i))
        .map((i) =>
          failureCard(
            `Missing step: ${m.options[i].title}`,
            m.options[i].feedback,
            "missing",
          ),
        ),
    );
  } else {
    details = selected
      .filter((i) => !m.answer.includes(i))
      .map((i) =>
        failureCard(
          `You chose: ${m.options[i].title}`,
          m.options[i].feedback,
          "extra",
        ),
      );
    if (m.type === "multi") {
      details.push(
        ...m.answer
          .filter((i) => !selected.includes(i))
          .map((i) =>
            failureCard(
              `Missing protection: ${m.options[i].title}`,
              m.options[i].feedback,
              "missing",
            ),
          ),
      );
    }
  }
  return `<section class="feedback bad" tabindex="-1" id="resultBox"><div class="reward">Try, learn, adjust</div><h3>Here’s where this decision breaks.</h3><p>${m.type === "choice" ? "This is the assumption in your chosen answer that does not hold." : "These are the specific gaps in your submitted answer."} The consequences below are examples, not actions run by this game.</p>${details.join("")}<p class="mini">There is no penalty. Change your answer and test your reasoning again.</p><div class="actions"><button class="primary" id="again">Try another decision</button></div></section>`;
}
function feedback(m) {
  if (!result) return "";
  if (result === "wrong") return wrongAnswerFeedback(m);
  return `<section class="feedback" tabindex="-1" id="resultBox"><div class="reward">${esc(m.reward)} · ${isDone(m) ? "Mission complete" : ""}</div><h3>${m.unlocks.length ? "Defense unlocked." : "You’ve got the idea."}</h3><p>${esc(m.success)}</p><p class="rule">${esc(m.lesson)}</p><ul>${m.why.map((w) => `<li>${esc(w)}</li>`).join("")}</ul><div class="term"><strong>Plain-language word: ${esc(m.term.word)}</strong><br>${esc(m.term.meaning)}</div><p class="mini">From the PDF: ${sourceName(m.source)}.</p><div class="actions"><button class="primary" id="next">${state.index === MISSIONS.length - 1 ? "Open my final briefing" : "Next mission"} →</button><button class="quiet" id="reviewSource">About the source</button></div></section>`;
}
function sourceName(s) {
  return (
    {
      s1: "Summary and Verdict",
      s2: "Threat Model",
      s7: "Layer 1: Host Hardening",
      s8: "Layer 2: Execution Isolation",
      s9: "Layer 3: Network Isolation",
      s10: "Layer 4: Secrets",
      s11: "Layer 5: Hardening Hermes",
      s12: "Layer 6: Execution Sandbox",
      s13: "Verification",
      s14: "Monitoring",
      s15: "Incident Response",
      s16: "Maintenance",
      s18: "Residual Risks",
    }[s] || s
  );
}
function check() {
  const m = MISSIONS[state.index];
  const a = m.type === "order" ? selected : [...selected].sort((a, b) => a - b),
    b = m.type === "order" ? m.answer : [...m.answer].sort((a, b) => a - b);
  const good = JSON.stringify(a) === JSON.stringify(b);
  result = good ? "correct" : "wrong";
  showHint = false;
  if (good && !isDone(m)) state.done.push(m.id);
  if (!good) state.retries[m.id] = (state.retries[m.id] || 0) + 1;
  storeDraft();
  paint();
  $("#resultBox")?.focus({ preventScroll: true });
  $("#resultBox")?.scrollIntoView({
    block: "nearest",
    behavior: scrollBehavior(),
  });
}
function go(i) {
  if (!Number.isInteger(i) || i < 0 || i > highest()) return;
  state.index = i;
  state.screen = "mission";
  delete state.draft;
  save();
  mission();
  topFocus();
}
function next() {
  if (state.index === MISSIONS.length - 1) {
    finish();
    topFocus();
  } else go(state.index + 1);
}
function finish() {
  state.screen = "briefing";
  save();
  const n = completed();
  $("#app").innerHTML =
    `<section class="outro"><div class="label">Your final briefing</div><h1>You don’t have to trust the bot with everything.</h1><p class="muted">The big idea: a helpful AI can make mistakes—or be misled. Limit what it can reach, keep real secrets elsewhere, and prove the limits with tests.</p><div class="certificate"><div class="label">Learning milestone · not a security certificate</div><h2>${n === MISSIONS.length ? "Thoughtful defender" : "Defender in training"}</h2><p>You practiced thinking about consequences, not just trusting a bot’s promises.</p><div class="facts"><div><b>${n}/${MISSIONS.length}</b><span>Missions completed</span></div><div><b>${unlocked().size}/6</b><span>Defense ideas unlocked</span></div><div><b>${n * 100}</b><span>Learning points</span></div></div></div><div class="takeaways"><section><h3>Your everyday habits</h3><ul><li>Enable Telegram two-step verification and review active sessions.</li><li>Never send API keys, bot tokens, or highly sensitive secrets to the bot.</li><li>Treat unexpected requests for secrets or approvals as a reason to stop and ask.</li><li>Report strange bot behavior to the operator; don’t try to fix a suspected compromise by chatting with it.</li><li>Ask who can access your chats and what the model provider retains.</li></ul></section><section><h3>What to ask the operator</h3><ul><li>Is each person isolated from the others?</li><li>Are real credentials outside the agent’s environment?</li><li>Can commands reach its own settings or the internet?</li><li>Which tools are enabled—and are they really needed?</li><li>Were the restrictions actually tested after the last update?</li><li>What risks and privacy limits still remain?</li></ul></section></div><h3 style="font:28px Georgia,serif;margin:25px 0 14px">Replay a lesson</h3><div class="reviewlist">${MISSIONS.filter(
      (m, i) => i <= highest(),
    )
      .map(
        (m) =>
          `<button class="reviewrow" data-review="${MISSIONS.indexOf(m)}"><b>${isDone(m) ? "✓ " : ""}${esc(m.title)}</b><span>${esc(m.lesson)}</span></button>`,
      )
      .join(
        "",
      )}</div><div class="actions"><button class="primary" id="export">Save my learning notes</button><button class="quiet" id="print">Print this briefing</button><button class="quiet" id="home">Back to the start</button></div><div class="footerline">Completing these missions does not secure any real system. Setup, independent verification, updates, and incident handling are still the operator’s responsibility.</div></section>`;
  $$("[data-review]").forEach(
    (b) => (b.onclick = () => go(Number(b.dataset.review))),
  );
  $("#export").onclick = exportNotes;
  $("#print").onclick = () => window.print();
  $("#home").onclick = pause;
}
function exportNotes() {
  const content = [
    "SMALL BOT, STRONG WALLS — MY LEARNING NOTES",
    "A teaching game based on the supplied security guide. Not a security audit or certification.",
    "",
    ...MISSIONS.filter(isDone).flatMap((m) => [
      m.title,
      m.lesson,
      ...m.why.map((x) => "• " + x),
      m.term.word + ": " + m.term.meaning,
      "",
    ]),
    "NORMAL USER: Enable two-step verification. Avoid sharing sensitive secrets. Report unusual behavior. Ask about privacy.",
  ].join("\n");
  const url = URL.createObjectURL(
    new Blob([content], { type: "text/plain;charset=utf-8" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = "my-bot-security-notes.txt";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function scrollBehavior() {
  return matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "instant"
    : "smooth";
}
function openProgress() {
  const content = $("#journeyContent");
  content.innerHTML = `<p class="muted">${completed()} of ${MISSIONS.length} missions completed. Choose an unlocked mission to revisit it.</p><p class="mini">${storageOK ? "Progress and answers are saved in this browser." : "Browser storage is unavailable. Keep this tab open; your progress will not survive a reload."}</p><p class="mini"><strong>Defense ideas learned: ${unlocked().size}/6.</strong> ${esc([...unlocked()].join(" · ") || "Complete missions to collect your first defense.")} These are learning achievements, not a live security status.</p><div class="mission-list">${MISSIONS.map((m, i) => `<button class="mission-link ${i === state.index ? "current" : ""}" data-go="${i}" ${i > highest() ? "disabled" : ""} ${i === state.index ? 'aria-current="step"' : ""}><span class="mission-number">${isDone(m) ? "✓" : i + 1}</span><span><b>${esc(m.title)}</b><small>${i > highest() ? "Complete the earlier missions to unlock" : isDone(m) ? "Completed · replay anytime" : "Ready to play"}</small></span></button>`).join("")}</div>`;
  $$("#journeyContent [data-go]").forEach(
    (b) =>
      (b.onclick = () => {
        $("#journeyDialog").close();
        go(Number(b.dataset.go));
      }),
  );
  $("#journeyDialog").showModal();
}
function openAbout() {
  $("#about").showModal();
}
$("#glossaryBtn").onclick = () => $("#glossary").showModal();
$("#aboutBtn").onclick = openAbout;
$$("[data-close]").forEach(
  (b) => (b.onclick = () => b.closest("dialog").close()),
);
$$("dialog").forEach(
  (d) =>
    (d.onclick = (e) => {
      if (e.target === d) {
        const r = d.getBoundingClientRect();
        if (
          e.clientX < r.left ||
          e.clientX > r.right ||
          e.clientY < r.top ||
          e.clientY > r.bottom
        )
          d.close();
      }
    }),
);
$("#wordlist").innerHTML = MISSIONS.map(
  (m) => `<dt>${esc(m.term.word)}</dt><dd>${esc(m.term.meaning)}</dd>`,
).join("");
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
  state = { done: [], retries: {}, index: 0, started: false };
  save();
  resetArmed = false;
  $("#resetNotice").hidden = true;
  $("#about").close();
  intro();
  topFocus();
};
if (state.screen === "briefing" && completed() === MISSIONS.length) finish();
else if (state.started && state.screen !== "home") mission();
else intro();
