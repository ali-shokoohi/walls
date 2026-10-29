# Verification report

## Environment

- Hugo 0.167.0 (Linux/amd64; installed build is Extended, but this project uses no Extended-only feature).
- Playwright test dependency pinned to 1.64.1; tested against installed Chromium.
- No external theme, remote font, runtime API, or browser JS library.

## Results

- 3 Python/Hugo integration tests passed:
  - A real Hugo build publishes the game, 14 ordered missions, and local assets.
  - A minified subpath build keeps local asset/navigation URLs under `/learn/`.
  - Editing a Markdown mission changes both game data and the readable lesson page.
- 14 Playwright browser tests passed:
  - All 14 missions, final screen, wrong-answer retry, scoring, notes download, and no duplicate replay points.
  - Progress recovery after a real page reload.
  - Unsafe extra multi-select answers and incorrect ordering rejected.
  - Hints, wordbook/help dialogs, and two-step reset.
  - Every mission fits a 320px viewport; mission buttons are at least 44px high.
  - No-JavaScript mission library, readable explanation, and original PDF download.
  - Stable answer DOM and keyboard focus, with no selection-induced scroll jump.
  - Draft answers, checked feedback, pause state, and the final briefing survive reloads.
  - Mission-trail dialog navigation, Escape handling, and focus restoration.
  - Layout, minimum text sizes, and touch targets at 320, 390, 600, 820, 1024, and 1440px widths.
  - Hints expand without replacing the question; Clear selection resets submission state.
  - Dialogs scroll on a 568×320 landscape viewport while keeping the close button reachable.
  - Enlarged text reflows and the keyboard skip link focuses the content.
- Production smoke test passed using Hugo's minified output served at `/learn/`:
  - First mission completed, 100 points awarded.
  - 14-entry mission library available.
  - Original PDF returned HTTP 200.
  - No JavaScript page errors.
- Visual inspection passed for desktop and 390px mobile screenshots of the Hugo-rendered game.
- Production Hugo build completed without warnings; JavaScript syntax check passed.

## Scope and limits

No remote deployment was performed. `baseURL` is intentionally `https://example.org/`;
set it to the real site URL and rebuild before public deployment. Tests validate the
learning website, not any of the real security controls described by the game.
