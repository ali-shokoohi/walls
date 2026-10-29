# Writing or editing a mission

## Start with the learning objective

Teach one idea through a short scene and a decision, not a wall of server
commands. Keep the normal-user audience, conditional security claims and privacy
limits. Mistakes should help the learner reason, not cost lives or points.

Find the mission directory under `content/missions/`, and edit the appropriate
`index.en.md` or `index.fa.md`. These files start with **JSON front matter**.
The folder owns the URL; the language suffix links the translations.

## Schema

| Field                         | Meaning                                                                                |
| ----------------------------- | -------------------------------------------------------------------------------------- |
| `id`                          | Stable progress identifier, unique across missions; identical in translations          |
| `weight`                      | Unique ascending integer controlling lesson order                                      |
| `title`, `chapter`, `goal`    | Heading, curriculum group and one learning objective                                   |
| `scene`, `speaker`, `message` | Concrete situation and narrative prompt                                                |
| `task`                        | The decision the player makes                                                          |
| `challenge_type`              | `choice`, `multi`, or `order` (not Hugo's reserved `type`)                             |
| `options`                     | Ordered objects with `title`, `detail`, and, where needed, `feedback`                  |
| `answer`                      | Zero-based option indexes; exact ordering matters only for `order`                     |
| `success`, `lesson`, `why`    | Correct-answer explanation, transferable rule and supporting details                   |
| `term`                        | `{ "word": "…", "meaning": "…" }` for the wordbook                                     |
| `source`                      | Original PDF section code, such as `s13`                                               |
| `reward`                      | Label for the learning achievement                                                     |
| `unlocks`                     | Canonical defense IDs: Host, Isolation, Network, Secrets, Hermes, Sandbox              |
| `order_rules`                 | For order missions: prerequisite pairs with `before`, `after`, `reason`, `consequence` |

- `choice` must have exactly one correct index.
- `multi` requires the exact safe set; extras and omissions are diagnosed separately.
- `order` requires all options in the canonical sequence. Every adjacent pair in
  `answer` needs a corresponding prerequisite rule.
- Avoid HTML in content. The renderer escapes text and isolates technical tokens.
- Do not translate canonical IDs or rearrange translated options: saved answers
  must mean the same thing when the user switches language.

## Write useful wrong-answer feedback

Every wrong single-choice option needs:

```json
"feedback": {
  "reason": "The specific assumption in this option that does not hold.",
  "consequence": "A concrete example of how that assumption could fail."
}
```

Every option in `multi` and `order` needs feedback because it may be an unsafe
selection **or an omitted safeguard**. For a safe option, explain what fails when
it is left out. Do not repeat the hint or the general lesson. Do not label an
otherwise safe selected option as wrong just because the full answer is incomplete.

For ordering, explain why the prerequisite must precede the next step; merely
printing the correct order is not enough. Examples are teaching models, not
fabricated reports of a real attack or test.

## Add a mission

1. Copy a nearby bundle to a new directory, for example `15-new-scenario/`.
2. Keep matching `index.en.md` / `index.fa.md` files (and every other configured language).
3. Give the lesson a unique stable `id` and `weight`; adjust narrative and feedback.
4. Keep answers, option order, unlocks and prerequisites aligned across translations.
5. Run `python3 scripts/validate.py`, then the tests from `CONTRIBUTING.md`.
6. Update the curriculum-specific count assertions in tests deliberately if you
   changed the supplied 14-lesson curriculum. Runtime progress counts are derived
   from content, but editorial copy may mention the curriculum length.
7. Test both a wrong and a correct answer, plus a language switch during the mission.

Do not remove a mission ID casually after publishing; browsers may have saved
progress for it. Content changes that alter an answer's meaning need a considered
migration/storage-version decision, not just a text replacement.

The prose after front matter is not a second editable copy of the lesson. The
readable page and interactive game both render the same front-matter fields.
