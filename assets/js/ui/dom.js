export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) =>
  Array.from(root.querySelectorAll(selector));

export function scrollBehavior() {
  return matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
}

export function topFocus() {
  window.scrollTo({ top: 0, behavior: "instant" });
  const heading = $("#app h1");
  if (heading) {
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  }
}

export function bindDialogDismissal() {
  $$("[data-close]").forEach((button) =>
    button.addEventListener("click", () => button.closest("dialog").close()),
  );
  $$("dialog").forEach((dialog) =>
    dialog.addEventListener("click", (event) => {
      if (event.target !== dialog) return;
      const box = dialog.getBoundingClientRect();
      if (
        event.clientX < box.left ||
        event.clientX > box.right ||
        event.clientY < box.top ||
        event.clientY > box.bottom
      )
        dialog.close();
    }),
  );
}
