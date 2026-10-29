# Verification report

## Environment

- Hugo 0.167.0 (Linux/amd64; installed build is Extended, but this project uses no Extended-only feature).
- Playwright test dependency pinned to 1.64.1; tested against installed Chromium.
- No external theme, remote font, runtime API, or browser JS library.

## Results

- Contributor preflight passed: `Validated 14 missions, 2 locales, 8 translation sections.`
- `npm run format:check` passed using the pinned Prettier version.
- 6 Node unit tests passed for answer rules, wrong-answer diagnosis, escaping/RTL isolation, legacy state normalization, and browser-independent English/Persian view rendering.
- 19 Python validation/structure/Hugo tests passed (including 7 Hugo integration/content tests):
  - A real Hugo build publishes the game, 14 ordered missions, and local assets.
  - A minified subpath build keeps local asset/navigation URLs under `/learn/`.
  - Editing a Markdown mission changes both game data and the readable lesson page.
  - Every wrong choice or omitted safeguard has authored reasoning and a concrete consequence; ordering rules cover the prerequisite chain.
  - English/Farsi translation keys and mission invariants match; stable IDs, option order and answer indexes are preserved.
  - Farsi subpath assets and translated lesson links resolve to generated files.
  - A temporary third-language fixture appears automatically in the dropdown and retains corresponding lesson URLs under `/learn/`.
- 24 Playwright browser tests passed:
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
  - Every wrong single-choice answer renders its own explanation, not the general lesson/hint.
  - Optional hints collapse on submission; wrong-answer reasoning survives reloads.
  - Multi-select feedback identifies unsafe extras and missing protections without criticizing safe selections.
  - Wrong-answer reasoning, bilingual content, and correct language selection on English/Farsi pages.
  - Farsi RTL layout, self-hosted Vazirmatn loading, LTR isolation for technical tokens, and 320px Farsi mission flow.
  - Language dropdown current selection, keyboard opening, Escape/focus return, outside-click dismissal, and 320px LTR/RTL sizing.
- Production smoke test passed using Hugo's imported, bundled ES module output served at `/learn/`:
  - A fingerprinted `type="module"` game bundle initializes without global compatibility shims; a small shared module enhances language navigation on all pages.
  - First mission completed; language switching preserved checked feedback.
  - English/Persian bundle URLs and their translation links remained unchanged.
  - Persian font, direction and technical-token isolation remained functional.
  - No JavaScript page errors.
- The earlier organization-only refactor screenshots were pixel-identical; the subsequent dropdown intentionally changes header navigation. Its production screenshots were reviewed in Persian at 390px and English at 1440px, with no clipping or layering problems.
- Contributor workflow, PR checklist, formatting configuration and focused architecture/content/translation guides are included. GitHub Actions configuration was added but no remote workflow run or deployment was performed.
- Visual inspection passed for desktop, tablet, and 390px mobile Persian screenshots, including RTL layout and readable lesson pages.
- Production Hugo build completed without warnings; JavaScript syntax check passed.

## Scope and limits

No remote deployment was performed. `baseURL` is intentionally `https://example.org/`;
set it to the real site URL and rebuild before public deployment. Tests validate the
learning website, not any of the real security controls described by the game.
