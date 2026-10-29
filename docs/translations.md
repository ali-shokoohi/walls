# Translations and bidirectional text

## Files you edit

```text
data/locales/
  navigation/strings.en.json + strings.fa.json
  help/strings.en.json       + strings.fa.json
  welcome/strings.en.json    + strings.fa.json
  progress/strings.en.json   + strings.fa.json
  mission/strings.en.json    + strings.fa.json
  feedback/strings.en.json   + strings.fa.json
  sources/strings.en.json    + strings.fa.json
  briefing/strings.en.json   + strings.fa.json
```

Each section owns its message keys once. Keep the English `.en.json` suffix just
like `.fa.json`; do not add unsuffixed English files. Hugo merges these sections
at build time, so existing keys remain stable to the game and templates.

For a wording change, edit its section pair. Keep placeholders like `{n}`,
`{total}`, `{before}` and `{title}` unchanged. Do not translate field names,
mission IDs, source codes, unlock IDs or answer indexes.

Mission translations belong together inside the mission bundle:
`content/missions/<slug>/index.en.md` and `index.fa.md`. Translate every human
field, including incorrect-choice reasons, consequences, ordering rules, term
meanings and rewards. Preserve the exact option order.

## Persian rules

- English stays LTR. Persian is RTL at the document root and in the language
  configuration—not a global CSS flip applied to both languages.
- Use **Vazirmatn only on Persian pages**. The font is self-hosted with its OFL
  license and pinned upstream commit under `static/fonts/`. Do not add a remote
  font request or apply Persian typography to English pages.
- Use Persian ی and ک, appropriate نیم‌فاصله, and consistent respectful register.
- Use logical CSS (`margin-inline-start`, `padding-inline-start`, `text-align:
start`) so shared layout follows document direction.
- Keep code identifiers, URLs, IP addresses, status codes and credential examples
  unchanged. JavaScript and the Hugo prose partial isolate these LTR runs safely
  within RTL text. Never insert unsafe raw HTML to fix punctuation.
- Mirror forward/back arrows, not technical identifiers. Let Intl format display
  numbers; do not localize the actual numeric answer indexes in JSON.
- Verify mixed-direction strings in answer feedback as well as the first screen.

## Language dropdown

The header shows the current language inside a compact disclosure. Opening it
lists available translations by native name, in Hugo language-weight order, with
a checkmark and `aria-current="page"` for the current page. No flags or hardcoded
English/Persian toggle is used.

The picker uses `.AllTranslations`, so a newly translated page appears without
editing the component. It links to the corresponding lesson, not the homepage;
languages without a translation of that page are not offered. The scrollable
list stays bounded on phones and follows the document's LTR/RTL direction.

Native `<details>` and ordinary links work without JavaScript. A small shared
module adds Escape-to-close with focus return, outside-click dismissal, and
closing when keyboard focus leaves. Enter/Space opens the disclosure; Tab moves
through links. It is a navigation disclosure, not an ARIA application menu.

## Adding a third language

1. Add its Hugo `[languages.<code>]` entry with `locale`, `label`, `direction`,
   `weight`, title and description. Do not rename existing language codes.
2. Add `strings.<code>.json` in **every** locale section, preserving keys/placeholders.
3. Add `index.<code>.md` in every mission bundle and `_index.<code>.md` for homepage
   and mission-library sections.
4. Review the intentionally language-specific typography and alphabet choices in
   `core/i18n.js`, `farsi.css`, `baseof.html`, and `language-switch.html`.
   Language navigation discovers Hugo's linked translations automatically; no
   language-specific target URL should be hardcoded in that partial.
5. Run validation and add browser checks for the new direction/font/links.

The validator discovers configured language codes rather than assuming only two.
Shared progress works because canonical mission IDs and choices stay invariant.
No saved state is translated or sent to a server.

## Checks

```sh
python3 scripts/validate.py
npm run test:unit
npm run test:build
npm test
```

Inspect desktop, 320px phone, short landscape dialogs, readable no-JavaScript
pages and language switches. The original reference PDF remains English and is
labeled as such; translating the game does not mean the PDF itself was translated.
