# Small Bot, Strong Walls — Hugo edition

A beginner-friendly, 14-mission security learning game based on the supplied
*Hardening a Shared Hermes Agent on Telegram* PDF (28 October 2026 edition).

This is a real Hugo site: the game data is generated from editable Markdown
lesson pages, CSS/JavaScript pass through Hugo's asset pipeline, and every
mission also has a readable page. No external theme, CDN, API, framework, or
runtime server is required after the build.

**This is a teaching model, not a live security audit or a certification.**
It does not run commands, request credentials, or change any real bot settings.

## Run it

Install [Hugo](https://gohugo.io/installation/) **0.158.0 or newer**.
Tested with Hugo **0.167.0**. Standard Hugo is sufficient; Extended is not required.

From this directory:

```sh
hugo server --bind 127.0.0.1 --port 1313
```

Open **http://localhost:1313/**. Hugo watches lesson, layout, and asset changes.
Node.js and npm are **not** needed to run or build the site.

## Build and deploy

Set `baseURL` in `hugo.toml` to your real public URL, including any subpath.
For example:

```toml
baseURL = 'https://your-domain.example/learn/'
```

Then build:

```sh
hugo --minify --cleanDestinationDir
```

Or override the URL for one build:

```sh
hugo --minify --cleanDestinationDir --baseURL https://your-domain.example/learn/
```

Publish the **contents of `public/`** to a static host. For a subpath deployment,
serve those files at that same subpath. Assets, navigation, and the PDF use Hugo
URLs that respect the configured `baseURL` path. No SPA fallback is needed.

The included prebuilt output uses the placeholder `https://example.org/` for
canonical links and sitemap entries. Rebuild with your real URL before public
publication. Nothing has been deployed to a remote host.

For a local preview of a root-path static build:

```sh
python3 -m http.server 8080 --bind 127.0.0.1 --directory public
```

Use HTTP rather than double-clicking `public/index.html`: generated asset URLs
and directory URLs assume a web server. The original single-file HTML version
remains the portable file-opening version.

## Project structure

```text
hugo.toml                        Site URL, title, description, Hugo minimum
content/
  _index.md                      Homepage content metadata
  missions/
    _index.md                    Mission library introduction
    01-invitation.md             One Markdown file per mission
    ...
    14-final.md
layouts/
  baseof.html                    Shared document, metadata, CSS pipeline
  home.html                      Interactive game and generated mission JSON
  section.html                   No-JavaScript mission library
  page.html                      Readable mission page
  404.html
  _partials/
    header.html                  Site header
    dialogs.html                 Help, source, wordbook, confirmed reset
    missions-data.html           Ordered mission pages → game data
assets/
  css/game.css                   Responsive visual design
  js/game.js                     Vanilla JS game logic; no dependencies
static/downloads/
  hermes-security-guide-original.pdf
playwright.config.cjs            Browser-test configuration
package.json / package-lock.json Optional, pinned browser-test dependency
 tests/                         Build and browser regression tests
```

Hugo minifies and fingerprints CSS/JavaScript, with integrity attributes. The
original PDF is a normal downloadable static file, not a base64 blob in the JS.
A JavaScript-disabled browser can read the mission library and explanations.

## Edit a mission

Edit `content/missions/01-invitation.md`, or another mission file. Each starts
with **JSON front matter**, followed by Markdown. JSON is intentional: nested
choices, answer arrays, and explanations remain explicit and easy to validate.
Hugo reads this as normal content front matter.

Key fields:

| Field | Purpose |
|---|---|
| `id` | Stable identifier used for saved progress; do not casually rename |
| `weight` | Mission order; use unique ascending integers |
| `title`, `chapter`, `goal` | Heading and learning objective |
| `scene`, `speaker`, `message` | The story situation |
| `task` | Question or decision |
| `challenge_type` | `choice`, `multi`, or `order` |
| `options` | Objects containing a `title` and `detail` |
| `answer` | **Zero-based** option indexes; order matters for `order` only |
| `success`, `lesson`, `why` | Correct-answer explanation and takeaways |
| `term` | Object with `word` and `meaning` for the wordbook |
| `source` | PDF section identifier, e.g. `s13` |
| `reward` | Learning achievement label |
| `unlocks` | Learned defense concepts; empty array if none |

The six collection labels are `Host`, `Isolation`, `Network`, `Secrets`,
`Hermes`, and `Sandbox`. A mission's `unlocks` values should match these labels.
These are learned concepts, **not actual security status**.

The interactive game is generated from front matter. The prose after the JSON
is available for Hugo content use; the current readable template uses the same
front-matter explanations as the game to keep them synchronized.

To add a mission, copy an existing file, choose a unique `id`, adjust `weight`,
and update its fields. The game computes the mission count and score from the
content. Tests currently expect the supplied 14-mission curriculum; update that
expectation deliberately if the curriculum changes. Static introductory copy
(e.g. the site description) can be edited in `hugo.toml` or the layouts.

Hugo's pretty URLs use the filename, such as
`/missions/01-invitation/`. Renaming a file changes its readable-page URL.

## Learner data and privacy

Progress is saved only in this browser's `localStorage`, under
`hermes-security-adventure-v1`. The game does not transmit it. There is no
analytics script or remote font dependency. Loading the site still involves
normal hosting requests and whatever access logging your chosen host performs.

Progress survives reloads but is scoped to the browser and origin. Moving from
a local HTML file to a hosted site does not automatically transfer old progress.
The notes export saves a text summary, not an importable game-state backup.

Reset requires two clicks. A successful replay cannot farm points. Keep stable
mission IDs across content edits. A significantly changed curriculum may warrant
a new storage key in `assets/js/game.js`.

## Tests

Build tests need Hugo and Python 3 only:

```sh
python3 -m unittest discover -s tests -p 'test_*.py' -v
```

Browser tests additionally need Node.js/npm and Playwright Chromium:

```sh
npm ci
npx playwright install chromium
npm test
```

Or use an existing Chromium installation:

```sh
CHROMIUM_PATH=/usr/bin/chromium npm test
```

`CHROMIUM_PATH` must be the actual executable on your system. The tests launch
Hugo automatically on loopback port **1414**; leave that port free. Dev preview
uses port **1313**. No external service is required during tests after installing
the test dependencies/browser.

Coverage includes all missions and the final screen, wrong-answer retries,
unsafe multi-selects, incorrect ordering, point deduplication, reload recovery,
hints, dialogs, confirmed reset, notes download, all missions at 320px width,
44px mission navigation targets, readable lessons without JavaScript, the PDF,
real Hugo builds, subpath URLs, and a content edit reaching both renderings.

The core build and play paths have no npm dependency. npm is for testing only.

## Source material

The original PDF is included under `static/downloads/` for comparison. Security
claims depend on actual versions, configuration, verification, and threat model.
The game explains limits and ordinary-user habits instead of promising an
unbreakable or fully private service. No license or ownership claim is made for
the supplied document; check your permission before publishing it publicly.
