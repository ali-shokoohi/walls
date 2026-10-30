# Contributing

Thank you for improving the lessons, translations, or game. Small, focused changes
are welcome. You can contribute content without writing JavaScript.

## First contribution

1. Fork/clone the project, then open its root folder (the one with `hugo.toml`).
2. Install Hugo **0.158+** and Python **3.11+**. The verified Hugo version is
   **0.167.0**; Python 3.11 supplies the standard-library TOML parser.
3. For code/tests, use Node **24+** (`nvm use`) and run:

   ```sh
   npm ci
   npx playwright install chromium
   ```

4. Preview with `hugo server` and open `http://localhost:1313/`.
5. Find the smallest matching file using [the architecture map](docs/architecture.md).
6. Make one focused change, run the checks below, and open a pull request.

Work on a topic branch created from an up-to-date `main`, not directly on `main`.
Before switching branches, confirm the current worktree is clean. If it contains
uncommitted changes, stop and commit or otherwise preserve that work before
updating `main`; never discard it. Pull the latest `origin/main`, create a
related topic branch, and keep the branch focused.

Run the complete local gate before committing. Push the branch only after the
gate passes, then open a pull request targeting `main`. The `verify` check must
pass before the pull request can merge; do not merge while checks are pending or
failed. After merge, update local `main` and let the Pages workflow deploy the
merged commit. Do not deploy from a topic branch or treat a local build as a
deployment. Describe what changed and which checks actually ran in the pull
request.

### A small translation fix

For a typo, grammar fix or clearer wording that keeps the same meaning:

1. Find the affected `strings.<language>.json` or `index.<language>.md` using the
   table below. Edit only that language; you do not need to know all four.
2. Preserve JSON keys, placeholders such as `{n}`, mission IDs, option order and
   answer indexes. See the [translation guide](docs/translations.md) for changes
   that affect the shared meaning or add a language.
3. Run `python3 scripts/validate.py` and preview the affected screen or lesson
   with `hugo server`: English is at `/`, Persian at `/fa/`, Spanish at `/es/`,
   German at `/de/`.
4. Open a pull request with the before/after wording, your familiarity with the
   language, and the checks you ran. State any checks you could not run; a draft
   pull request is welcome if you need help completing them.

This initial path needs Hugo and Python, not Node or JavaScript experience. It
does not replace the full pre-merge checks below. Automated validation checks
structure, not translation accuracy; human review still matters.

Do not put API keys, bot tokens, private logs, or real credentials in issues,
examples, screenshots, or commits. The game never needs them.

## Where to make changes

| Change                             | Location                                                              |
| ---------------------------------- | --------------------------------------------------------------------- |
| Mission files                      | `content/missions/<slug>/index.<lang>.md` (`en`, `fa`, `es`, `de`)    |
| Interface strings                  | `data/locales/<section>/strings.<lang>.json` (`en`, `fa`, `es`, `de`) |
| Answer correctness / diagnosis     | `assets/js/core/rules.js`                                             |
| Progress saving / recovery         | `assets/js/core/state.js`                                             |
| Escaping, numbers, text direction  | `assets/js/core/i18n.js`                                              |
| Screen markup                      | `assets/js/views/`                                                    |
| Click/keyboard flow, navigation    | `assets/js/app.js` and `assets/js/ui/`                                |
| Visual design                      | `assets/css/`                                                         |
| Readable lesson pages / HTML shell | `layouts/`                                                            |

Read [content authoring](docs/content-authoring.md) before adding a mission and
[translation/RTL guidance](docs/translations.md) before editing a locale.

## Checks before a pull request

```sh
npm run validate       # schema, translation parity, answer indexes, stable IDs
npm run format        # format supported source files
npm run test:unit      # pure JS rules, state and i18n; no browser required
npm run test:build     # Python validation and real Hugo integration tests
npm test               # Playwright starts Hugo on 127.0.0.1:1414
hugo --minify --panicOnWarning
```

Or run the combined gate: **`npm run check`**, followed by
`hugo --minify --panicOnWarning` and `git diff --check`. The combined gate checks
formatting but does not format files or run the final production build. Prefer
formatting only edited files (for example,
`npx prettier --write data/locales/navigation/strings.es.json`); avoid unrelated
changes from a repository-wide `npm run format`. Use `npm run format:check` to
check formatting without changing files. If using system Chromium:

```sh
CHROMIUM_PATH=/usr/bin/chromium npm run check
```

Use the actual executable path on your system. Build/validation scripts only
need Hugo and Python; npm is for development tooling, not a runtime dependency.
[Contributor checks](.github/workflows/check.yml) runs the combined checks and a
warning-strict production build on pushes to `main` and pull requests targeting
`main`. The `verify` job is the required pre-merge gate. The separate [Pages
workflow](.github/workflows/deploy-pages.yml) runs its test job before building
and deploying only after a push to `main`, which represents a merged change. A
local build does not deploy anything.

## Delivery rules

The repository follows this sequence for every change:

1. Confirm the current worktree is clean. If it is not, stop rather than
   switching branches; commit or preserve the uncommitted work first.
2. Check out `main` and fast-forward it from `origin/main`.
3. Create a related topic branch from that updated `main`.
4. Make the change and run the complete local gate.
5. Commit and push the tested branch, then open a pull request into `main`.
6. Wait for the required `verify` check to pass. Failed checks must be fixed and
   re-run; pending checks are not approval to merge.
7. Merge the pull request into `main` only after the gate is green.
8. Pull the merged `main` locally and verify the Pages workflow completed before
   calling the site deployed.

Repository administrators should protect `main` with the `verify` status check,
require pull requests, require the branch to be up to date before merging, and
disable direct pushes. The deployment workflow intentionally has no manual
trigger: deployment follows the merged `main` path only.

### Match verification to the change

- Documentation only: check Markdown formatting, relative links, commands against
  `package.json`, and `git diff --check`. No full application test run is needed.
- Lesson or translation changes: run validation and the full checks above; preview
  the affected language and check both a wrong and a correct answer. For a new
  language, follow the complete [language checklist](docs/translations.md#adding-another-language).
- JavaScript or shared UI changes: run the full checks above, add a regression
  test for changed behavior, and check English/Spanish LTR and Persian RTL at
  desktop and narrow-phone widths with keyboard navigation.

In every case, report what you actually ran rather than marking an unrun check
as passed. CI results do not replace language review or visual inspection.

## Keep contributions reviewable

- Preserve the existing beginner-friendly **Learn** flow and forgiving retries.
- Explain wrong answers with the selected decision's failed assumption and a
  concrete consequence. Do not substitute the lesson or auto-open a hint.
- Keep IDs, option order, answers, unlock keys and prerequisites aligned across
  languages. They affect saved progress, not just presentation.
- Add a regression test before changing behavior. Pure logic belongs in unit
  tests; actual focus, navigation, scrolling and font loading belong in browser tests.
- Do not duplicate JavaScript implementations or publish test-only globals. Import
  shared logic, and test pure helpers directly rather than calling browser globals.
- Test shared interface changes in English, Persian, Spanish and German, at desktop
  and narrow-phone widths. Keep keyboard focus and reduced-motion behavior intact.
- Do not commit `public/`, `resources/`, `node_modules/`, test output, or caches.
- Avoid reformatting unrelated files. Go templates and JSON-front-matter Markdown
  are intentionally excluded from the general Prettier command.
- Document a new field, dependency, or workflow in the same change.

The project has not assigned a redistribution license to the supplied PDF or
other original content. Do not infer that public hosting or this contribution
guide grants rights; check permission before publishing third-party material.
