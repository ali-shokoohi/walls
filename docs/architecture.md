# Architecture and ownership

## Request/build flow

```text
content/missions/<slug>/index.en.md + index.fa.md + index.es.md
            ↓ Hugo page bundles, ordered by weight
layouts/_partials/missions-data.html → JSON inside the homepage

data/locales/<section>/strings.<language>.json
            ↓ layouts/_partials/translations.html merges sections
HTML shell + localized JSON
            ↓ assets/js/main.js (ES module entry)
app.js → core helpers + view renderers + UI helpers
```

Hugo's `js.Build` follows standard relative `import` statements and bundles them
into one fingerprinted module asset. There is no second JS bundler, framework,
remote dependency, or parallel monolithic implementation. Source imports remain
readable; production users do not incur a module-per-file request waterfall.

## JavaScript boundaries

- **`main.js`** reads Hugo's JSON and supplies browser dependencies to the app.
- **`app.js`** owns screen transitions, ephemeral selection/hint state, event
  binding, and coordination. It does not contain the screen HTML.
- **`core/rules.js`** contains pure answer/sequence/diagnosis helpers, canonical
  defenses, choice markers and selection status. Rendering and in-place DOM
  updates use the same helpers—fix an answer marker in one place.
- **`core/state.js`** owns the versioned storage key, loading/normalization,
  draft validation, score/progress queries and saving. Injected storage makes
  failures testable without the browser. Keep the current storage key compatible.
- **`core/i18n.js`** owns locale formatting, interpolation, HTML escaping and
  bidirectional token isolation. Views receive the instance, not global functions.
- **`views/`** returns markup for welcome, mission, feedback, progress and final
  briefing. These functions receive context and have no DOM/storage side effects.
- **`ui/dom.js`** handles focus, reduced-motion scrolling, and dialog dismissal.
- **`ui/notes.js`** creates text notes and triggers their download.

Do not import the app/controller from a core module or a view. Keep dependencies
pointing from orchestration to views/helpers, never back up. No module is attached
to `window` for test convenience. Browser tests interact through controls; unit
tests import pure helpers directly.

## Content and localization

Each mission is a Hugo **leaf bundle** containing its translations:

```text
content/missions/
  _index.en.md
  _index.fa.md
  _index.es.md
  _index.de.md
  01-invitation/
    index.en.md
    index.fa.md
    index.es.md
    index.de.md
  02-injection/
    index.en.md
    index.fa.md
    index.es.md
    index.de.md
```

The directory is the public slug; this reorganization preserves existing URLs
such as `/missions/01-invitation/`, `/fa/missions/01-invitation/`,
`/es/missions/01-invitation/`, and `/de/missions/01-invitation/`.
Hugo `.Translations` links the corresponding pages. `_index.<lang>.md` files
represent sections; `index.<lang>.md` files represent individual lesson bundles.

Eight interface sections own their flat message dictionaries: `navigation`,
`help`, `welcome`, `progress`, `mission`, `feedback`, `sources`, and `briefing`.
Both Hugo templates and JavaScript consume the **same merged dictionary**. Do
not maintain an extra copy of a UI string in separate template/game catalogs.
`translations.html` rejects duplicate keys. Python validation catches missing
keys, language files and mismatched placeholders before deployment.

## Styles and templates

`styles.html` concatenates CSS in a documented order: tokens → base → components
→ interactions → responsive → accessibility. This preserves the cascade and
publishes one minified fingerprinted stylesheet, without runtime `@import`
requests. Persian-only typography remains in `farsi.css`; English, Spanish and
German never load it.

Motion lives in `interactions.css` behind `prefers-reduced-motion: no-preference`.
`app.js` marks scene entrances versus feedback updates with `#app[data-motion]`,
so checking an answer does not reanimate the question. It captures the previous
progress width before rendering and supplies `--progress-from` only when the
value changes. CSS handles the fill animation without changing score or storage.
Decorative animations are finite, controls never await animation completion, and
`accessibility.css` disables motion (including pseudo-elements) for reduced-motion
preferences and print. Use backwards-only entrance fills so finished transforms
do not retain stacking contexts or override later hover/press feedback.

The existing cascade was preserved during this organization-only change. Put a
new component next to its ownership group and avoid a growing pile of unrelated
overrides. Use logical inline spacing, not separate copied LTR/RTL stylesheets.

Hugo templates own SEO metadata, the language switcher, readable no-JavaScript
pages, shared dialogs, and data serialization. Raw mission prose is escaped
before becoming HTML; do not use `safeHTML` on contributor content without a
specific reviewed escaping boundary.

## Tests and deployment

- `tests/unit/`: Node's built-in test runner, no DOM/browser.
- `tests/browser/`: Playwright; shared `helpers.js` replaces repeated setup.
- `tests/test_*.py`: schema/validator and actual Hugo builds/URL checks.
- `scripts/validate.py`: contributor content and translation preflight.

Changes enter through a topic branch based on a clean, current `main`.
`.github/workflows/check.yml` runs the `verify` job for pull requests targeting
`main`; repository settings must require that check and pull requests before
allowing a merge. `.github/workflows/deploy-pages.yml` listens only for pushes
to `main`, runs its own test job, and deploys only after that test and build
chain succeeds. It has no manual trigger, so a topic-branch push cannot deploy.

Output remains static and deployable under a root or subpath. The original PDF
and locally licensed Vazirmatn font are static assets. The refactor does not add
a backend, analytics, remote font calls, or public deployment.
