# Small Bot, Strong Walls

A bilingual **Hugo** learning game about sharing an AI agent safely: 14 short
story missions, forgiving retries, choice-specific feedback, a wordbook, and saved
progress. No coding or server experience is needed to play.

- **English:** `/`, left-to-right, original fonts.
- **فارسی:** `/fa/`, right-to-left, locally hosted **Vazirmatn only on Persian pages**.
- A readable mission library works without JavaScript.
- Everything deploys as static files; no backend, analytics, CDN, or runtime API.

This is a teaching model, **not a security audit or certification**. It does not
run commands, request real credentials, or change a real bot. The original PDF
(_Hardening a Shared Hermes Agent on Telegram_, 28 October 2026) is included for
comparison and remains English.

## Preview

Install [Hugo](https://gohugo.io/installation/) **0.158+** (verified with **0.167.0**).
Standard Hugo is sufficient; Extended and npm are not required to build/play.

```sh
hugo server --bind 127.0.0.1 --port 1313
```

Open **http://localhost:1313/** or **http://localhost:1313/fa/**.

## Contribute

Start with **[CONTRIBUTING.md](CONTRIBUTING.md)**. Content, translation, and code
changes each have a small, clearly owned place:

```text
content/
  _index.en.md                  # English homepage
  _index.fa.md                  # Persian homepage
  missions/
    _index.en.md                # English mission library
    _index.fa.md                # Persian mission library
    01-invitation/
      index.en.md               # One mission, English
      index.fa.md               # Same mission, Persian
    ...
data/locales/
  welcome/strings.en.json       # Welcome-section interface strings
  welcome/strings.fa.json
  mission/strings.en.json       # Other sections follow the same convention
  mission/strings.fa.json
  ...
assets/js/
  main.js                       # ES module entry; imports app and locale helpers
  app.js                        # Screen/event orchestration
  core/                         # Pure rules, i18n, persistence
  views/                        # Welcome, mission, feedback, trail, briefing markup
  ui/                           # DOM/focus/dialog helpers and notes download
assets/css/                     # Tokens, base, components, interaction, responsive, a11y
layouts/                        # Hugo shell, shared partials, readable lesson pages
scripts/validate.py             # Dependency-free content/translation preflight
 tests/                         # Node unit, Playwright, Python/Hugo tests
 docs/                          # Focused contributor guides
```

- [Agent guide](AGENTS.md) — project instructions and documentation map for AI coding assistants
- [Architecture and ownership](docs/architecture.md)
- [Writing missions and wrong-answer feedback](docs/content-authoring.md)
- [Translations, language files, and RTL](docs/translations.md)
- [Verification report](VERIFICATION.md)

The game uses actual ES `import`/`export` modules. Hugo's built-in `js.Build`
bundles them into a fingerprinted `type="module"` script. Shared answer rules,
choice markers, sequence labels, feedback diagnosis and translation data have one
owner rather than separate implementations. CSS is concatenated in a fixed order,
not loaded through a chain of runtime CSS imports.

## Development checks

Use Python **3.11+**, Node **24+** (see `.nvmrc`), and Hugo:

```sh
npm ci
npx playwright install chromium
npm run check
```

Useful focused commands:

```sh
python3 scripts/validate.py    # No npm dependencies needed
npm run format                # Uses the pinned formatter
npm run test:unit             # Pure helpers, no browser
npm run test:build            # Python schema/validator and real Hugo builds
npm test                      # Playwright starts Hugo on loopback port 1414
```

To use an existing Chromium binary, set `CHROMIUM_PATH` to its actual path, for
example `CHROMIUM_PATH=/usr/bin/chromium npm run check`. Node tooling is for
contributors/tests only. No npm packages are loaded by the deployed game.

## Build and deploy

The repository publishes automatically to GitHub Pages from `main` using
[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml). The
published site is:

https://ali-shokoohi.github.io/hermes-security-workstation-guide/

The workflow builds Hugo's `public/` output, uploads it as a Pages artifact, and
deploys it with the official GitHub Pages actions. After enabling Pages once in
the repository settings, pushes to `main` and manual workflow runs publish the
site. In **Settings → Pages**, set **Source** to **GitHub Actions**.

For a local production build:

```sh
hugo --minify --cleanDestinationDir --panicOnWarning
```

Or override it for another host or subpath:

```sh
hugo --minify --cleanDestinationDir --baseURL https://your-domain.example/learn/
```

Language switches, fonts, CSS, scripts and the PDF respect the configured
subpath. No SPA fallback or runtime server is required on the static host.

Preview a production build locally with:

```sh
python3 -m http.server 8080 --bind 127.0.0.1 --directory public
```

Use HTTP, not double-clicking `public/index.html`: generated assets and directory
URLs assume a web server. Generated files are ignored by Git; edit source instead.
No remote deployment is performed by local build commands.

## Motion and interaction

Scenes and answer cards arrive with short, staggered transitions. The welcome bot
bobs and blinks, choices respond to hover/press/selection, and progress fills from
its previous value when completion changes. Feedback, hints, dialogs and the
language dropdown ease into view without delaying controls or keyboard focus.
Checking an answer does not replay the whole scene entrance.

Decorative greetings settle within four seconds rather than looping while you
read. System **Reduce motion** preferences disable animations and transitions,
including dialog backdrops, and use instant scrolling. No animation library or
new runtime dependency is required.

## Progress and privacy

Completed mission IDs, the current draft, feedback and paused/final screen stay
in this browser under `hermes-security-adventure-v1`. Language switching shares
progress because both translations use the same canonical IDs and answer indexes.
The game does not transmit progress. Your static host may still log normal page
requests according to its own policy.

**Previous** rewinds the run: the returned-to lesson and all later lessons lose
completion, points, unlocks, retries and the saved answer. Earlier lessons stay
completed. **Back to the start** on the final briefing clears the whole run;
**Save & pause** preserves it. The separate reset action in Help still requires
confirmation. Replaying from the trail/briefing is non-destructive and cannot
farm points. Only the current mission's draft is retained; moving to another
lesson starts a fresh selection.
The notes export is a text summary, not an importable progress backup. Progress
does not automatically move between browsers, origins, or devices.

## Third-party material

The font's OFL license and pinned source are under `static/fonts/`. No ownership
or redistribution license is invented for the supplied PDF; check permission
before publishing third-party material. The game describes containment goals and
remaining privacy/security risks, not a promise of invulnerability.
