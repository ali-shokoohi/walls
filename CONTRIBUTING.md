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

Work on a topic branch in your fork, not directly on `main`. Describe what changed
and which checks you actually ran in the pull request. You do not need to deploy
the website or configure GitHub Pages to contribute.

### A small translation fix

For a typo, grammar fix or clearer wording that keeps the same meaning:

1. Find the affected `strings.<language>.json` or `index.<language>.md` using the
   table below. Edit only that language; you do not need to know all three.
2. Preserve JSON keys, placeholders such as `{n}`, mission IDs, option order and
   answer indexes. See the [translation guide](docs/translations.md) for changes
   that affect the shared meaning or add a language.
3. Run `python3 scripts/validate.py` and preview the affected screen or lesson
   with `hugo server`: English is at `/`, Persian at `/fa/`, Spanish at `/es/`.
4. Open a pull request with the before/after wording, your familiarity with the
   language, and the checks you ran. State any checks you could not run; a draft
   pull request is welcome if you need help completing them.

This initial path needs Hugo and Python, not Node or JavaScript experience. It
does not replace the full pre-merge checks below. Automated validation checks
structure, not translation accuracy; human review still matters.

Do not put API keys, bot tokens, private logs, or real credentials in issues,
examples, screenshots, or commits. The game never needs them.

## Where to make changes

| Change                             | Location                                                            |
| ---------------------------------- | ------------------------------------------------------------------- |
| Mission story, choices, feedback   | `content/missions/<slug>/index.<language>.md` (`en`, `fa`, `es`)    |
| Interface wording                  | `data/locales/<section>/strings.<language>.json` (`en`, `fa`, `es`) |
| Answer correctness / diagnosis     | `assets/js/core/rules.js`                                           |
| Progress saving / recovery         | `assets/js/core/state.js`                                           |
| Escaping, numbers, text direction  | `assets/js/core/i18n.js`                                            |
| Screen markup                      | `assets/js/views/`                                                  |
| Click/keyboard flow, navigation    | `assets/js/app.js` and `assets/js/ui/`                              |
| Visual design                      | `assets/css/`                                                       |
| Readable lesson pages / HTML shell | `layouts/`                                                          |

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
warning-strict production build on pushes and pull requests. The separate
[Pages workflow](.github/workflows/deploy-pages.yml) also runs tests before
building and deploying on pushes to `main` or a manual run. A local build does
not deploy anything.

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
- Test shared interface changes in English, Persian and Spanish, at desktop and
  narrow-phone widths. Keep keyboard focus and reduced-motion behavior intact.
- Do not commit `public/`, `resources/`, `node_modules/`, test output, or caches.
- Avoid reformatting unrelated files. Go templates and JSON-front-matter Markdown
  are intentionally excluded from the general Prettier command.
- Document a new field, dependency, or workflow in the same change.

The project has not assigned a redistribution license to the supplied PDF or
other original content. Do not infer that public hosting or this contribution
guide grants rights; check permission before publishing third-party material.
