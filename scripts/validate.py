#!/usr/bin/env python3
"""Validate contributor-authored Hugo missions and locale dictionaries."""
from __future__ import annotations

import argparse
import json
import re
import sys
import tomllib
from pathlib import Path
from typing import Any


MISSION_FIELDS = (
    "id",
    "chapter",
    "title",
    "goal",
    "scene",
    "speaker",
    "message",
    "task",
    "options",
    "answer",
    "success",
    "lesson",
    "why",
    "term",
    "source",
    "reward",
    "unlocks",
    "weight",
    "challenge_type",
)
IMMUTABLE_MISSION_FIELDS = ("id", "weight", "source", "challenge_type", "answer", "unlocks")
CHALLENGE_TYPES = {"choice", "multi", "order"}
PLACEHOLDER_RE = re.compile(r"\{([A-Za-z_][A-Za-z0-9_]*)\}")
MISSION_FILENAME_RE = re.compile(r"^index\.([^.]+)\.md$")
SECTION_FILENAME_RE = re.compile(r"^strings\.([^.]+)\.json$")


class DuplicateKey(ValueError):
    pass


def _no_duplicate_pairs(pairs: list[tuple[str, Any]]) -> dict[str, Any]:
    result: dict[str, Any] = {}
    for key, value in pairs:
        if key in result:
            raise DuplicateKey(f"duplicate key {key!r}")
        result[key] = value
    return result


class Validator:
    def __init__(self, root: Path):
        self.root = root.resolve()
        self.errors: list[str] = []
        self.languages: list[str] = []
        self.missions: list[tuple[str, dict[str, Any], dict[str, Path]]] = []
        self.sections: list[tuple[str, dict[str, dict[str, Any]], dict[str, Path]]] = []

    def rel(self, path: Path) -> str:
        try:
            return path.resolve().relative_to(self.root).as_posix()
        except ValueError:
            return str(path)

    def error(self, path: Path | str, field: str, message: str) -> None:
        name = self.rel(path) if isinstance(path, Path) else path
        self.errors.append(f"{name}:{field}: {message}")

    def run(self) -> int:
        self.load_languages()
        if not self.languages:
            return 1
        self.collect_missions()
        self.collect_sections()
        self.validate_missions()
        self.validate_sections()
        if self.errors:
            for error in self.errors:
                print(error)
            return 1
        print(
            f"Validated {len(self.missions)} missions, "
            f"{len(self.languages)} locales, {len(self.sections)} translation sections."
        )
        return 0

    def load_languages(self) -> None:
        config_path = self.root / "hugo.toml"
        if not config_path.is_file():
            self.error(config_path, "languages", "missing Hugo configuration")
            return
        try:
            with config_path.open("rb") as handle:
                config = tomllib.load(handle)
        except (OSError, tomllib.TOMLDecodeError) as exc:
            self.error(config_path, "TOML", str(exc))
            return
        languages = config.get("languages")
        if not isinstance(languages, dict):
            self.error(config_path, "languages", "expected [languages.<locale>] tables")
            return
        self.languages = sorted(str(locale) for locale in languages)
        if "en" not in self.languages:
            self.error(config_path, "languages.en", "English reference locale is required")

    def collect_missions(self) -> None:
        base = self.root / "content" / "missions"
        if not base.is_dir():
            self.error(base, "missions", "missing missions directory")
            return

        # Section index files are content files too, but are not mission data.
        for path in sorted(base.iterdir()):
            if path.is_file() and path.name.startswith("_index"):
                self.check_locale_filename(path, allow_section_index=True)

        bundles = [path for path in sorted(base.iterdir()) if path.is_dir() and not path.name.startswith(".")]
        if not bundles:
            self.error(base, "missions", "curriculum is empty; add a mission bundle")
        seen_ids: set[str] = set()
        seen_weights: set[int] = set()
        for bundle in bundles:
            files: dict[str, Path] = {}
            for path in sorted(bundle.iterdir()):
                if not path.is_file():
                    continue
                if path.name.startswith("index"):
                    locale = self.check_locale_filename(path)
                    if locale:
                        files[locale] = path
            missing = [locale for locale in self.languages if locale not in files]
            for locale in missing:
                self.error(bundle, f"index.{locale}", "missing mission translation")
            unknown = set(files) - set(self.languages)
            if unknown:
                continue
            source_path = files.get("en")
            if not source_path:
                continue
            source = self.load_mission(source_path)
            if source is None:
                continue
            mission_id = source.get("id")
            weight = source.get("weight")
            if isinstance(mission_id, str) and mission_id:
                if mission_id in seen_ids:
                    self.error(source_path, "id", f"duplicate mission id {mission_id!r}")
                seen_ids.add(mission_id)
            if isinstance(weight, int) and not isinstance(weight, bool):
                if weight in seen_weights:
                    self.error(source_path, "weight", f"duplicate mission weight {weight}")
                seen_weights.add(weight)
            self.missions.append((bundle.name, source, files))

    def check_locale_filename(self, path: Path, allow_section_index: bool = False) -> str | None:
        match = MISSION_FILENAME_RE.match(path.name)
        if match:
            locale = match.group(1)
            if locale not in self.languages:
                self.error(path, "locale", f"unknown locale suffix {locale!r}")
                return None
            return locale
        if allow_section_index and path.name.startswith("_index"):
            match = re.match(r"^_index\.([^.]+)\.md$", path.name)
            if not match:
                self.error(path, "locale", "section index must use _index.<locale>.md")
            elif match.group(1) not in self.languages:
                self.error(path, "locale", f"unknown locale suffix {match.group(1)!r}")
            return None
        self.error(path, "locale", "mission index must use index.<locale>.md")
        return None

    def load_mission(self, path: Path) -> dict[str, Any] | None:
        try:
            text = path.read_text(encoding="utf-8")
            decoder = json.JSONDecoder(object_pairs_hook=_no_duplicate_pairs)
            leading = len(text) - len(text.lstrip())
            data, end = decoder.raw_decode(text, leading)
        except (OSError, UnicodeDecodeError, json.JSONDecodeError, DuplicateKey, ValueError) as exc:
            self.error(path, "JSON", f"invalid JSON front matter ({exc})")
            return None
        if not isinstance(data, dict):
            self.error(path, "JSON", "front matter must be a JSON object")
            return None
        return data

    def collect_sections(self) -> None:
        base = self.root / "data" / "locales"
        if not base.is_dir():
            self.error(base, "locales", "missing data/locales directory")
            return
        all_keys: dict[tuple[str, str], Path] = {}
        for section in sorted(path for path in base.iterdir() if path.is_dir()):
            files: dict[str, Path] = {}
            for path in sorted(section.iterdir()):
                if not path.is_file():
                    continue
                if not path.name.startswith("strings") or not SECTION_FILENAME_RE.match(path.name):
                    self.error(path, "locale", "locale dictionary must use strings.<locale>.json")
            for path in sorted(section.iterdir()):
                if not path.is_file():
                    continue
                match = SECTION_FILENAME_RE.match(path.name)
                if not match:
                    continue
                locale = match.group(1)
                if locale not in self.languages:
                    self.error(path, "locale", f"unknown locale suffix {locale!r}")
                else:
                    files[locale] = path
            dictionaries: dict[str, dict[str, Any]] = {}
            for locale, path in files.items():
                parsed = self.load_dictionary(path)
                if parsed is not None:
                    dictionaries[locale] = parsed
                    for key in parsed:
                        identity = (locale, key)
                        previous = all_keys.get(identity)
                        if previous:
                            self.error(path, "key", f"duplicate key {key!r}; already defined in {self.rel(previous)}")
                        else:
                            all_keys[identity] = path
            for locale in self.languages:
                if locale not in files:
                    self.error(section, f"strings.{locale}", "missing locale dictionary")
            if "en" in dictionaries:
                self.sections.append((section.name, dictionaries, files))

    def load_dictionary(self, path: Path) -> dict[str, Any] | None:
        try:
            data = json.loads(path.read_text(encoding="utf-8"), object_pairs_hook=_no_duplicate_pairs)
        except (OSError, UnicodeDecodeError, json.JSONDecodeError, DuplicateKey, ValueError) as exc:
            self.error(path, "JSON", f"invalid JSON ({exc})")
            return None
        if not isinstance(data, dict):
            self.error(path, "dictionary", "must be a flat JSON object")
            return None
        for key, value in data.items():
            if not isinstance(key, str) or not isinstance(value, str):
                self.error(path, str(key), "translation keys and values must be strings")
            elif not value.strip():
                self.error(path, key, "translation must be nonempty")
        return data

    def validate_missions(self) -> None:
        for slug, source, files in self.missions:
            source_path = files["en"]
            self.validate_mission_shape(source_path, source)
            for locale in self.languages:
                if locale == "en" or locale not in files:
                    continue
                translated = self.load_mission(files[locale])
                if translated is None:
                    continue
                self.validate_mission_shape(files[locale], translated)
                self.validate_translation(source_path, source, files[locale], translated)

    def validate_mission_shape(self, path: Path, data: dict[str, Any]) -> None:
        for field in MISSION_FIELDS:
            if field not in data:
                self.error(path, field, "required field is missing")
        for field in ("id", "chapter", "title", "goal", "scene", "speaker", "message", "task", "success", "lesson", "source", "reward"):
            if field in data and (not isinstance(data[field], str) or not data[field].strip()):
                self.error(path, field, "must be a nonempty string")
        weight = data.get("weight")
        if not isinstance(weight, int) or isinstance(weight, bool) or weight < 0:
            self.error(path, "weight", "must be a nonnegative integer")
        challenge = data.get("challenge_type")
        if challenge not in CHALLENGE_TYPES:
            self.error(path, "challenge_type", "must be choice, multi, or order")
        options = data.get("options")
        if not isinstance(options, list) or not options:
            self.error(path, "options", "must be a nonempty list")
            options = []
        for index, option in enumerate(options):
            self.validate_option(path, index, option)
        answer = data.get("answer")
        valid_answer = self.validate_answer(path, answer, len(options))
        if challenge == "choice" and valid_answer and len(answer) != 1:
            self.error(path, "answer", "choice missions require exactly one answer index")
        if challenge == "order" and valid_answer and sorted(answer) != list(range(len(options))):
            self.error(path, "answer", "order missions must include every option exactly once")
        if challenge in {"multi", "order"}:
            for index, option in enumerate(options):
                if isinstance(option, dict) and not self.has_complete_feedback(option):
                    self.error(path, f"options[{index}].feedback", "reason and consequence are required for every option")
        elif challenge == "choice" and valid_answer:
            for index, option in enumerate(options):
                if index not in answer and isinstance(option, dict) and not self.has_complete_feedback(option):
                    self.error(path, f"options[{index}].feedback", "reason and consequence are required for every wrong choice")
        if not isinstance(data.get("why"), list) or not data.get("why"):
            self.error(path, "why", "must be a nonempty list")
        elif any(not isinstance(item, str) or not item.strip() for item in data["why"]):
            self.error(path, "why", "must contain only nonempty strings")
        term = data.get("term")
        if not isinstance(term, dict):
            self.error(path, "term", "must be an object")
        else:
            for key in ("word", "meaning"):
                if not isinstance(term.get(key), str) or not term[key].strip():
                    self.error(path, f"term.{key}", "must be a nonempty string")
        if not isinstance(data.get("unlocks"), list) or any(not isinstance(x, str) or not x.strip() for x in data.get("unlocks", [])):
            self.error(path, "unlocks", "must be a list of nonempty strings")
        if challenge == "order":
            self.validate_order_rules(path, data, options, answer if isinstance(answer, list) else [])
        elif "order_rules" in data and data["order_rules"] not in (None, []):
            self.error(path, "order_rules", "is only allowed for order missions")

    def validate_option(self, path: Path, index: int, option: Any) -> None:
        prefix = f"options[{index}]"
        if not isinstance(option, dict):
            self.error(path, prefix, "must be an object")
            return
        for field in ("title", "detail"):
            if not isinstance(option.get(field), str) or not option[field].strip():
                self.error(path, f"{prefix}.{field}", "must be a nonempty string")
        if "feedback" in option and not self.has_complete_feedback(option):
            self.error(path, f"{prefix}.feedback", "must contain nonempty reason and consequence")

    @staticmethod
    def has_complete_feedback(option: dict[str, Any]) -> bool:
        feedback = option.get("feedback")
        return isinstance(feedback, dict) and all(isinstance(feedback.get(key), str) and feedback[key].strip() for key in ("reason", "consequence"))

    def validate_answer(self, path: Path, answer: Any, option_count: int) -> bool:
        if not isinstance(answer, list) or not answer:
            self.error(path, "answer", "must be a nonempty list")
            return False
        if any(not isinstance(index, int) or isinstance(index, bool) or index < 0 for index in answer):
            self.error(path, "answer", "indexes must be unique nonnegative integers, not booleans")
            return False
        if len(set(answer)) != len(answer):
            self.error(path, "answer", "indexes must be unique")
        if any(index >= option_count for index in answer):
            self.error(path, "answer", "index is outside the options list")
        return True

    def validate_order_rules(self, path: Path, data: dict[str, Any], options: list[Any], answer: list[Any]) -> None:
        rules = data.get("order_rules")
        if not isinstance(rules, list):
            self.error(path, "order_rules", "must be a list for order missions")
            return
        actual: list[tuple[int, int]] = []
        for index, rule in enumerate(rules):
            prefix = f"order_rules[{index}]"
            if not isinstance(rule, dict):
                self.error(path, prefix, "must be an object")
                continue
            before, after = rule.get("before"), rule.get("after")
            if any(not isinstance(value, int) or isinstance(value, bool) for value in (before, after)):
                self.error(path, prefix, "before and after must be integer indexes")
                continue
            if before < 0 or after < 0 or before >= len(options) or after >= len(options) or before == after:
                self.error(path, prefix, "before and after must be distinct indexes within options")
            if not self.has_rule_feedback(rule):
                self.error(path, prefix, "reason and consequence are required")
            actual.append((before, after))
        expected = list(zip(answer, answer[1:])) if all(isinstance(x, int) for x in answer) else []
        if len(actual) != len(set(actual)):
            self.error(path, "order_rules", "before/after pairs must be unique")
        if set(actual) != set(expected) or len(actual) != len(expected):
            self.error(path, "order_rules", "must cover exactly each adjacent pair in canonical answer order")

    @staticmethod
    def has_rule_feedback(rule: dict[str, Any]) -> bool:
        return all(isinstance(rule.get(key), str) and rule[key].strip() for key in ("reason", "consequence"))

    def validate_translation(self, source_path: Path, source: dict[str, Any], path: Path, translated: dict[str, Any]) -> None:
        for field in IMMUTABLE_MISSION_FIELDS:
            if translated.get(field) != source.get(field):
                self.error(path, field, f"must match English source in {self.rel(source_path)}")
        if len(translated.get("options", [])) != len(source.get("options", [])):
            self.error(path, "options", "must have the same number of options as English")
        source_rules = self.rule_pairs(source.get("order_rules"))
        translated_rules = self.rule_pairs(translated.get("order_rules"))
        if source_rules != translated_rules:
            self.error(path, "order_rules", "before/after indexes must match English")
        self.validate_nonempty_translated_values(path, translated)

    @staticmethod
    def rule_pairs(rules: Any) -> list[tuple[Any, Any]]:
        if not isinstance(rules, list):
            return []
        return [(rule.get("before"), rule.get("after")) for rule in rules if isinstance(rule, dict)]

    def validate_nonempty_translated_values(self, path: Path, data: dict[str, Any]) -> None:
        def walk(value: Any, field: str, skipped: bool = False) -> None:
            if isinstance(value, str):
                if not skipped and not value.strip():
                    self.error(path, field, "translated field must be nonempty")
            elif isinstance(value, dict):
                for key, child in value.items():
                    walk(child, f"{field}.{key}", skipped=False)
            elif isinstance(value, list):
                for index, child in enumerate(value):
                    walk(child, f"{field}[{index}]")
        for key, value in data.items():
            walk(value, key, skipped=key in {"id", "source", "challenge_type"})

    def validate_sections(self) -> None:
        for section, dictionaries, files in self.sections:
            english = dictionaries.get("en", {})
            for locale in self.languages:
                if locale == "en" or locale not in dictionaries:
                    continue
                translated = dictionaries[locale]
                if set(translated) != set(english):
                    missing = sorted(set(english) - set(translated))
                    extra = sorted(set(translated) - set(english))
                    detail = []
                    if missing:
                        detail.append(f"missing {missing}")
                    if extra:
                        detail.append(f"extra {extra}")
                    self.error(files.get(locale, Path(section)), "keys", "; ".join(detail))
                for key, source_value in english.items():
                    target_value = translated.get(key)
                    if not isinstance(source_value, str) or not isinstance(target_value, str):
                        continue
                    source_placeholders = set(PLACEHOLDER_RE.findall(source_value))
                    target_placeholders = set(PLACEHOLDER_RE.findall(target_value))
                    if source_placeholders != target_placeholders:
                        self.error(files[locale], key, "interpolation placeholders must match English")


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1], help="Hugo project root")
    args = parser.parse_args(argv)
    return Validator(args.root).run()


if __name__ == "__main__":
    sys.exit(main())
