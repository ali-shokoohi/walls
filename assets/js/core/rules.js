export const DEFENSES = ["Host", "Isolation", "Network", "Secrets", "Hermes", "Sandbox"];

export function answerStatus(mission, selected, { t, num }) {
  if (!selected.length) return t(mission.type === "order" ? "noSteps" : "chooseFirst");
  return mission.type === "order"
    ? t("stepCount", {
        n: num(selected.length),
        total: num(mission.options.length),
      })
    : t(selected.length === 1 ? "oneAnswer" : "answers", {
        n: num(selected.length),
      });
}

export function isCorrect(mission, selected) {
  const normalize = (values) =>
    mission.type === "order" ? values : [...values].sort((a, b) => a - b);
  return (
    JSON.stringify(normalize(selected)) === JSON.stringify(normalize(mission.answer))
  );
}

export function choiceKey(mission, selected, index, { num, letter }) {
  const active = selected.includes(index);
  if (mission.type === "order") return active ? num(selected.indexOf(index) + 1) : "·";
  if (mission.type === "multi") return active ? "✓" : "+";
  return letter(index);
}

export function sequenceText(mission, selected, { t, forward }) {
  return t("sequence", {
    steps: selected
      .map((i) => mission.options[i].title.split(";")[0])
      .join(` ${forward} `),
  });
}

// Pure diagnosis shared by the renderer and unit tests. No DOM or storage access.
export function failureDetails(mission, selected) {
  const missing = mission.answer
    .filter((i) => !selected.includes(i))
    .map((index) => ({
      kind: "missing",
      index,
      explanation: mission.options[index].feedback,
      label: mission.type === "order" ? "missingStep" : "missingProtection",
      values: { title: mission.options[index].title },
    }));
  if (mission.type === "order") {
    return [
      ...(mission.order_rules || [])
        .filter(
          (rule) =>
            selected.includes(rule.before) &&
            selected.includes(rule.after) &&
            selected.indexOf(rule.before) > selected.indexOf(rule.after),
        )
        .map((rule) => ({
          kind: "order",
          explanation: rule,
          label: "orderProblem",
          values: {
            before: mission.options[rule.before].title,
            after: mission.options[rule.after].title,
          },
        })),
      ...missing,
    ];
  }
  const extra = selected
    .filter((i) => !mission.answer.includes(i))
    .map((index) => ({
      kind: "extra",
      index,
      explanation: mission.options[index].feedback,
      label: "chose",
      values: { title: mission.options[index].title },
    }));
  return mission.type === "multi" ? [...extra, ...missing] : extra;
}
