# Verification report

## Environment

- Hugo 0.167.0 (Linux/amd64; installed build is Extended, but this project uses no Extended-only feature).
- Playwright test dependency pinned to 1.64.1; tested against installed Chromium.
- No external theme, remote font, runtime API, or browser JS library.

## Spanish language support

- Contributor preflight passed: `Validated 14 missions, 3 locales, 8 translation sections.`
- `CHROMIUM_PATH=/usr/bin/chromium npm run check` passed:
  - Formatting checks passed with the pinned Prettier version.
  - All 9 Node unit tests passed, including authored Spanish view rendering.
  - All 21 Python validation/structure/Hugo tests passed, including Spanish lesson
    URLs and local assets under `/learn/`, all 14 translated missions, stable
    answer indexes and translation links to the corresponding English/Persian lesson.
  - All 45 Playwright tests passed. New Spanish checks cover all 14 missions,
    wrong-answer retry, completion persistence and translated notes export at
    320px and 1440px, LTR direction with no Persian font requests, keyboard language
    switching with shared progress/draft preservation, and the no-JavaScript library.
  - The narrow language-picker check includes English, Persian and Spanish.
- `hugo --minify --panicOnWarning` and `git diff --check` passed.
- English/Persian regression tests remain green. Spanish screenshots have not
  received a separate visual review, and the translation has not received an
  independent native-speaker review.
- No dependencies, storage format, mission IDs or answer indexes changed. The
  original reference PDF remains English; no remote deployment was performed.

## Earlier baseline results

- Contributor preflight passed: `Validated 14 missions, 2 locales, 8 translation sections.`
- `npm run format:check` passed using the pinned Prettier version.
- 7 Node unit tests passed for answer rules, wrong-answer diagnosis, escaping/RTL isolation, legacy state normalization, and browser-independent English/Persian view rendering.
- 19 Python validation/structure/Hugo tests passed (including 7 Hugo integration/content tests):
  - A real Hugo build publishes the game, 14 ordered missions, and local assets.
  - A minified subpath build keeps local asset/navigation URLs under `/learn/`.
  - Editing a Markdown mission changes both game data and the readable lesson page.
  - Every wrong choice or omitted safeguard has authored reasoning and a concrete consequence; ordering rules cover the prerequisite chain.
  - English/Farsi translation keys and mission invariants match; stable IDs, option order and answer indexes are preserved.
  - Farsi subpath assets and translated lesson links resolve to generated files.
  - A temporary third-language fixture appears automatically in the dropdown and retains corresponding lesson URLs under `/learn/`.
- 37 Playwright browser tests passed:
  - All 14 missions, final screen, wrong-answer retry, scoring, notes download, and no duplicate replay points.
  - Progress recovery after a real page reload.
  - In English and Persian, Previous clears the returned-to and later completion/answers, rolls back points/progress, and persists the rewind through reload.
  - Back to the start clears all saved run state in both languages; Save & pause still preserves it.
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
  - Animated scene entrances in English/Persian at desktop and phone widths, with immediate heading focus and no horizontal overflow.
  - A finite bot greeting; in-place selection animation; feedback/reward and previous-to-current progress animation without replaying the question entrance.
  - Reduced-motion mode suppresses scene, selection, feedback and dialog/backdrop motion in both languages; changing the preference stops an active greeting immediately.
- Production smoke test passed using Hugo's imported, bundled ES module output served at `/learn/`:
  - A fingerprinted `type="module"` game bundle initializes without global compatibility shims; a small shared module enhances language navigation on all pages.
  - First mission completed; language switching preserved checked feedback.
  - English/Persian bundle URLs and their translation links remained unchanged.
  - Persian font, direction and technical-token isolation remained functional.
  - No JavaScript page errors.
- The earlier organization-only refactor screenshots were pixel-identical; the subsequent dropdown intentionally changes header navigation. Its production screenshots were reviewed in Persian at 390px and English at 1440px, with no clipping or layering problems.
- Contributor workflow, PR checklist, formatting configuration and focused architecture/content/translation guides are included. GitHub Actions runs contributor checks and the Pages workflow publishes the production build from `main`.
- Visual inspection passed for desktop, tablet, and 390px mobile Persian screenshots, including RTL layout and readable lesson pages.
- Production Hugo build completed without warnings; JavaScript syntax check passed.

## Motion update inspection

- Re-ran validation, formatting, all 7 unit tests, all 19 Python/Hugo tests,
  all 37 Playwright tests, the warning-strict minified build and `git diff --check`.
- All 37 browser tests also passed with the default reduced-motion setting
  overridden to `no-preference`, exercising the ordinary game flow with motion.
- Inspected production-build screenshots for English/Persian at 1440px and
  390px across welcome, mission, success feedback and mission-trail dialog states.
  No new clipping or overlap was identified. Browser measurements confirmed no
  horizontal overflow, heading focus after navigation, Escape focus return, and
  scrolling to the last trail mission with the close control still reachable.
- No JavaScript page errors were observed. The static preview requested an absent
  `/favicon.ico` (404); this unrelated missing asset was left unchanged.
- Kept `AGENTS.md` as the single agent guide, removed the identical `AGENT.md`,
  and updated the README link. No game content, scoring or storage format changed.

## Scope and limits

The configured GitHub Pages deployment uses `https://walls.shokoohi.dev/`.
Tests validate the
learning website, not any of the real security controls described by the game.
