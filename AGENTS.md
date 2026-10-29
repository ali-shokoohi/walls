# Agent guide

Guidance for AI coding assistants working on **Small Bot, Strong Walls**.
Read this file before editing, then follow the relevant guides below. This file
is a project guide, not part of the playable lessons.

## Read the existing documentation

Use the detailed guides as the source of truth instead of duplicating their
instructions here:

| Document                                                   | Read it for                                                                             |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| [README.md](README.md)                                     | Project purpose, setup, preview, deployment, progress and privacy behavior              |
| [CONTRIBUTING.md](CONTRIBUTING.md)                         | Contribution workflow, file ownership, review expectations and checks                   |
| [Architecture](docs/architecture.md)                       | Module boundaries, Hugo data flow, content bundles and CSS pipeline                     |
| [Content authoring](docs/content-authoring.md)             | Mission schema, answer indexes, prerequisite rules and useful wrong-answer explanations |
| [Translations and RTL](docs/translations.md)               | Locale files, adding languages, language dropdown, Persian typography and bidi handling |
| [Verification report](VERIFICATION.md)                     | Recorded checks and their scope; not a substitute for running checks on your changes    |
| [Font provenance](static/fonts/README.md)                  | Self-hosted Vazirmatn source and licensing information                                  |
| [Pull request checklist](.github/pull_request_template.md) | What a contribution should explain and verify                                           |

If a current task intentionally changes documented behavior, update the relevant
guide in the same change. Do not leave contradictory rules across Markdown files.

## Project constraints

- Keep the product a beginner-friendly learning game, not an operator dashboard.
  Preserve short scenarios, forgiving retries, optional hints and readable
  no-JavaScript lessons.
- Security outcomes are teaching models, not live tests, audits or certification.
  Do not request real credentials or introduce secrets into code, fixtures or logs.
- Stay with Hugo, vanilla JavaScript ES modules and local assets. Do not add a
  framework, backend, analytics, remote fonts or runtime service without approval.
- Build output must work at both `/` and a subpath such as `/learn/`. Use Hugo URL
  helpers rather than hardcoded root-relative asset or translation links.
- Preserve third-party attribution and license text. Do not invent redistribution
  rights for the supplied PDF or other source material.

## Make changes in the right layer

- Missions: `content/missions/<slug>/index.<language>.md`. Keep English `.en.md`
  explicit, alongside `.fa.md`, `.es.md` and future translations. Front matter is the shared
  source for interactive and readable lessons; do not duplicate it in prose.
- Interface copy: `data/locales/<section>/strings.<language>.json`. Preserve key
  and interpolation-placeholder parity across configured languages.
- Pure rules, persistence and localization: `assets/js/core/`.
- Screen markup: side-effect-free renderers in `assets/js/views/`.
- Transitions and event coordination: `assets/js/app.js`; DOM helpers belong in
  `assets/js/ui/`. Do not add test-only browser globals or duplicate core logic.
- Shared page structure and build-time data: `layouts/` and its partials.
- Styles: the concern-based files under `assets/css/`. Preserve the documented
  concatenation order and prefer logical CSS properties for shared layouts.

Read the existing implementation and focused tests before editing. Prefer a
small change to the owning module over a second implementation or a broad rewrite.

## Behavioral contracts

- **Previous** rewinds from the destination mission onward: clear its answer,
  completion, points, retries and affected unlocks, retaining earlier progress.
- **Back to the start** resets the entire run. **Save & pause** preserves it.
  The Help reset action still requires confirmation.
- Trail/briefing replay is non-destructive and cannot award duplicate points.
  Reloads and language switches must preserve the intended current state.
- Keep the storage key `hermes-security-adventure-v1` and stable mission IDs
  compatible unless the task explicitly includes a migration. Scores, progress
  and unlocks must agree with completion state.
- Wrong answers explain the actual selected decision or omitted safeguard, its
  failed assumption and a concrete consequence. Do not automatically reveal hints.
- English and Spanish stay LTR; Persian stays RTL. Load/use Vazirmatn only on Persian pages.
  Isolate technical tokens safely and escape contributor text before rendering.
- Language navigation lists actual page translations by native name and retains
  the corresponding lesson URL. Do not restore a hardcoded binary language toggle.
- Preserve keyboard access, focus return, reduced-motion support, touch-sized
  controls and narrow-screen reflow in both directions.

## Work and verification

1. Inspect `git status` and the relevant source/docs. Preserve existing user edits;
   do not reset, overwrite or include unrelated work in a commit.
2. For behavior changes, write a focused regression test and observe its expected
   failure before implementing. Use Node tests for pure logic, Playwright for
   interaction and persistence, and Python/Hugo tests for generated pages/content.
3. Implement the smallest complete change, then run the focused tests and the
   applicable project checks from the repository root:

   ```sh
   npm run validate
   npm run format:check
   npm run test:unit
   npm run test:build
   npm test
   hugo --minify --panicOnWarning
   git diff --check
   ```

   `npm run check` combines validation, formatting checks, unit tests, Python/Hugo
   tests and browser tests. See [CONTRIBUTING.md](CONTRIBUTING.md) for prerequisites
   and `CHROMIUM_PATH` when using an installed Chromium executable. Use focused
   formatting to avoid unrelated churn. Go templates and mission Markdown are
   intentionally excluded from general Prettier formatting.

4. For shared UI changes, inspect English/Persian/Spanish desktop and narrow-phone layouts,
   keyboard flow and console errors. For documentation-only changes, check links,
   commands against `package.json`, formatting and the diff; do not claim a full
   application test run if you did not perform one.
5. Update affected documentation and report what changed, what actually passed,
   and any limitations. Never invent test output or imply a local build deployed
   the website remotely.

Do not edit or commit generated `public/`, `resources/`, `node_modules/`, browser
reports or caches. Do not change the deployment URL, install new dependencies,
push, deploy or commit unless the task authorizes that action.
