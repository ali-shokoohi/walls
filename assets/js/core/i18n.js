export function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
}

export function createI18n({
  locale,
  strings,
  direction = locale.startsWith("fa") ? "rtl" : "ltr",
}) {
  const isFarsi = locale.startsWith("fa");
  const numbers = new Intl.NumberFormat(locale, { useGrouping: false });
  const t = (key, values = {}) => {
    if (!(key in strings)) throw new Error(`Missing translation: ${key}`);
    return strings[key].replace(/\{(\w+)\}/g, (_, name) => values[name] ?? `{${name}}`);
  };
  const text = (value) => {
    if (direction !== "rtl") return escapeHtml(value);
    return String(value)
      .split(
        /((?:https?:\/\/[^\s،؛«»]+)|(?:[A-Za-z][A-Za-z0-9_]*(?:[.:/_-][A-Za-z0-9_]+)*)|(?:[0-9]+(?:[.:/-][0-9]+)*))/g,
      )
      .map((part) =>
        /^[A-Za-z0-9]/.test(part)
          ? `<bdi dir="ltr">${escapeHtml(part)}</bdi>`
          : escapeHtml(part),
      )
      .join("");
  };
  return {
    t,
    text,
    tr: (key, values) => text(t(key, values)),
    esc: escapeHtml,
    num: (n) => numbers.format(n),
    letter: (i) => (isFarsi ? ["الف", "ب", "پ", "ت"][i] : String.fromCharCode(65 + i)),
    forward: direction === "rtl" ? "←" : "→",
    back: direction === "rtl" ? "→" : "←",
    openQuote: isFarsi ? "«" : "“",
    closeQuote: isFarsi ? "»" : "”",
    isFarsi,
    locale,
    direction,
  };
}
