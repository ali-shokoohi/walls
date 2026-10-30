# Translations and bidirectional text

## Files you edit

```text
data/locales/
  navigation/strings.en.json + strings.fa.json + strings.es.json + strings.de.json
  help/strings.en.json       + strings.fa.json + strings.es.json + strings.de.json
  welcome/strings.en.json    + strings.fa.json + strings.es.json + strings.de.json
  progress/strings.en.json   + strings.fa.json + strings.es.json + strings.de.json
  mission/strings.en.json    + strings.fa.json + strings.es.json + strings.de.json
  feedback/strings.en.json   + strings.fa.json + strings.es.json + strings.de.json
  sources/strings.en.json    + strings.fa.json + strings.es.json + strings.de.json
  briefing/strings.en.json   + strings.fa.json + strings.es.json + strings.de.json
```

Each section owns its message keys once. Keep the English `.en.json` suffix just
like `.fa.json`, `.es.json` and `.de.json`; do not add unsuffixed English files. Hugo merges these sections
at build time, so existing keys remain stable to the game and templates.

For a typo, grammar correction or wording improvement that preserves meaning,
edit only the affected language. If you change the shared meaning, add/remove a
message key, or change placeholders, update all configured languages together.
If you cannot translate a shared change, ask for help in a draft pull request
rather than publishing English copies as completed translations.

Keep placeholders like `{n}`, `{total}`, `{before}` and `{title}` unchanged in
translation-only edits. Do not translate field names,
mission IDs, source codes, unlock IDs or answer indexes.

Mission translations belong together inside the mission bundle:
`content/missions/<slug>/index.en.md`, `index.fa.md`, `index.es.md`, and `index.de.md`. Translate every human
field, including incorrect-choice reasons, consequences, ordering rules, term
meanings and rewards. Preserve the exact option order.

## Spanish rules

- Spanish lives at `/es/`, uses locale `es-ES`, and stays LTR with the shared fonts.
- Use clear, beginner-friendly Spanish and a consistent **tú** register. Translate
  explanations, feedback, wordbook entries and exported notes, not just headings.
- Preserve technical tokens and canonical defense IDs. The original PDF stays
  English and must be labeled as such.
- Verify all 14 lessons, retries, saved progress across language switches, keyboard
  navigation and the no-JavaScript library at desktop and 320px phone widths.

## German rules

- German lives at `/de/`, uses locale `de-DE`, and stays LTR with the shared fonts.
- Use clear, beginner-friendly German and a consistent **du** register. Translate
  explanations, feedback, wordbook entries and exported notes, not just headings.
- Preserve technical tokens and canonical defense IDs. The original PDF stays
  English and must be labeled as such.
- Verify all 14 lessons, retries, saved progress across language switches, keyboard
  navigation and the no-JavaScript library at desktop and 320px phone widths.

## Persian rules

- English, Spanish and German stay LTR. Persian is RTL at the document root and in the language
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

## Adding another language

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

Use the Spanish implementation as a complete LTR example:
`[languages.es]` in `hugo.toml`, `data/locales/*/strings.es.json`,
`content/_index.es.md`, `content/missions/_index.es.md`, and every
`content/missions/<slug>/index.es.md`. Start from the English reference, translate
every human-facing field, and keep proper names and technical identifiers when
appropriate. Do not enable a partially translated language for publication;
coordinate unfinished work in a draft pull request.

### Extend the test coverage

The validator discovers configured languages, but some tests intentionally name
the supported locales. When adding one, update:

- `tests/unit/views.test.js`: the language list and locale map, so all authored
  views render with the new dictionary.
- `tests/test_structure.py`: the language lists for bundles, dictionaries and URLs.
- `tests/test_build.py`: cover the new homepage, every lesson, local assets and
  corresponding translation URLs under `/learn/`. Keep the additional-language
  discovery test meaningful: its synthetic locale must not conflict with a real
  locale; update the expected picker count and fixture weight as needed.
- `tests/browser/language-picker.spec.js`: include the new homepage in the narrow
  picker check. Use explicit `hreflang` selectors rather than assuming there is
  only one other language.
- Add browser coverage following `tests/browser/spanish.spec.js`: all missions,
  retries, reloads, translated notes export, direction/font behavior, keyboard
  language switching with saved progress and drafts, and no-JavaScript lessons.

Update the supported-language lists and preview URLs in `README.md`,
`CONTRIBUTING.md`, and the relevant guides/checklists. Record new verification
results in `VERIFICATION.md` without rewriting historical results as new checks.

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

## Translation review in a pull request

State which language and screens/lessons changed, your familiarity with that
language, and whether someone else reviewed the translation. Disclose automated
translation assistance when used and distinguish generated text from text that
has received human language review.

List actual automated checks and manual checks, including desktop/phone widths,
keyboard navigation and any skipped checks. For a new language, review the full
curriculum and UI, including wrong-answer explanations, hints, wordbook, final
briefing and exported notes. Screenshots help with layout but cannot establish
translation accuracy. Passing key/placeholder validation is not a native-speaker
review or a security certification.
