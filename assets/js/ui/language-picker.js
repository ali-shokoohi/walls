// Native <details> and ordinary links work without JavaScript. These are
// progressive enhancements, shared by game and readable lesson pages.
for (const picker of document.querySelectorAll(".language-picker")) {
  const trigger = picker.querySelector("summary");
  document.addEventListener("click", (event) => {
    if (!picker.contains(event.target)) picker.open = false;
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && picker.open) {
      picker.open = false;
      trigger.focus();
      event.preventDefault();
    }
  });
  picker.addEventListener("focusout", (event) => {
    if (!picker.contains(event.relatedTarget)) picker.open = false;
  });
}
