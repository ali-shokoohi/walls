export function learningNotes(missions, store, { t }) {
  return [
    t("notesTitle"),
    t("notesDisclaimer"),
    "",
    ...missions
      .filter((m) => store.isDone(m))
      .flatMap((m) => [
        m.title,
        m.lesson,
        ...m.why.map((x) => "• " + x),
        m.term.word + ": " + m.term.meaning,
        "",
      ]),
    t("notesNormal"),
  ].join("\n");
}

export function downloadNotes(missions, store, i18n) {
  const url = URL.createObjectURL(
    new Blob([learningNotes(missions, store, i18n)], {
      type: "text/plain;charset=utf-8",
    }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = i18n.isFarsi
    ? "my-bot-security-notes-fa.txt"
    : "my-bot-security-notes.txt";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
