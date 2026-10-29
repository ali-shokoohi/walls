export function nextTheme(theme) {
  return theme === "dark" ? "light" : "dark";
}

function getTheme() {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function updateButton(button) {
  const dark = getTheme() === "dark";
  const label = dark ? button.dataset.lightLabel : button.dataset.darkLabel;
  button.querySelector(".theme-label").textContent = label;
  button.setAttribute("aria-label", label);
  button.dataset.theme = dark ? "dark" : "light";
  button.setAttribute("aria-pressed", String(dark));
}

if (typeof document !== "undefined") {
  for (const button of document.querySelectorAll(".theme-toggle")) {
    updateButton(button);
    button.addEventListener("click", () => {
      const theme = nextTheme(getTheme());
      document.documentElement.dataset.theme = theme;
      updateButton(button);
      try {
        localStorage.setItem("hermes-theme", theme);
      } catch {
        // Theme still applies for this page when storage is unavailable.
      }
    });
  }
}
