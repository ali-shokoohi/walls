"""Tests for the dependency-free contributor content validator."""
from __future__ import annotations

import json
import subprocess
import sys
import tempfile
import textwrap
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VALIDATOR = ROOT / "scripts" / "validate.py"


def mission(language: str = "en", **overrides):
    data = {
        "id": "first",
        "chapter": "Chapter",
        "title": "A title",
        "goal": "A goal",
        "scene": "A scene",
        "speaker": "Speaker",
        "message": "A message",
        "task": "A task",
        "options": [
            {"title": "Wrong", "detail": "Wrong detail", "feedback": {"reason": "Reason", "consequence": "Consequence"}},
            {"title": "Right", "detail": "Right detail"},
        ],
        "answer": [1],
        "success": "Success",
        "lesson": "Lesson",
        "why": ["Why"],
        "term": {"word": "Term", "meaning": "Meaning"},
        "source": "s1",
        "reward": "Reward",
        "unlocks": [],
        "weight": 1,
        "challenge_type": "choice",
    }
    data.update(overrides)
    body = json.dumps(data, ensure_ascii=False) + "\n\n" + ("ترجمه" if language == "fa" else "A prose explanation")
    return body


def write_fixture(root: Path, *, config="""[languages.en]
weight = 1
[languages.fa]
weight = 2
""", en=None, fa=None, strings=None, suffix=True):
    (root / "content/missions/first").mkdir(parents=True)
    (root / "data/locales/ui").mkdir(parents=True)
    (root / "hugo.toml").write_text(config)
    (root / "content/missions/first/index.en.md").write_text(en or mission())
    (root / "content/missions/first/index.fa.md").write_text(fa or mission("fa", title="عنوان", chapter="فصل", goal="هدف", scene="صحنه", speaker="گوینده", message="پیام", task="وظیفه", options=[{"title":"اشتباه","detail":"جزئیات","feedback":{"reason":"دلیل","consequence":"پیامد"}},{"title":"درست","detail":"جزئیات درست"}], success="موفقیت", lesson="درس", why=["چرا"], term={"word":"اصطلاح","meaning":"معنی"}, reward="پاداش", source="s1"))
    strings = strings or {"greeting": "Hello {name}"}
    (root / "data/locales/ui/strings.en.json").write_text(json.dumps(strings))
    (root / "data/locales/ui/strings.fa.json").write_text(json.dumps({k: ("سلام {name}" if k == "greeting" else v) for k, v in strings.items()}, ensure_ascii=False))


def run_validator(root: Path):
    return subprocess.run([sys.executable, str(VALIDATOR), "--root", str(root)], text=True, capture_output=True)


class ValidationTests(unittest.TestCase):
    def test_valid_fixture_prints_summary_and_succeeds(self):
        with tempfile.TemporaryDirectory() as d:
            root = Path(d)
            write_fixture(root)
            result = run_validator(root)
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            self.assertIn("validated", result.stdout.lower())

    def test_front_matter_is_the_single_source_without_duplicate_prose(self):
        with tempfile.TemporaryDirectory() as d:
            root = Path(d)
            write_fixture(root)
            for path in (root / "content/missions/first").glob("index.*.md"):
                data, _ = json.JSONDecoder().raw_decode(path.read_text())
                path.write_text(json.dumps(data, ensure_ascii=False) + "\n")
            result = run_validator(root)
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)

    def test_invalid_json_reports_path_and_field(self):
        with tempfile.TemporaryDirectory() as d:
            root = Path(d)
            write_fixture(root, en=mission().replace('"weight": 1', '"weight":'))
            result = run_validator(root)
            self.assertEqual(result.returncode, 1)
            self.assertIn("content/missions/first/index.en.md", result.stdout)
            self.assertIn("JSON", result.stdout)

    def test_mission_invariants_and_feedback_are_checked(self):
        cases = [
            ({"challenge_type": "bogus"}, "challenge_type"),
            ({"answer": [True]}, "answer"),
            ({"answer": [2]}, "answer"),
            ({"options": [{"title": "A", "detail": "D"}, {"title": "B", "detail": "D"}]}, "feedback"),
            ({"id": "", "weight": -1}, "id"),
        ]
        for changes, field in cases:
            with self.subTest(field=field), tempfile.TemporaryDirectory() as d:
                root = Path(d)
                write_fixture(root, en=mission(**changes))
                result = run_validator(root)
                self.assertEqual(result.returncode, 1)
                self.assertIn(field, result.stdout)

    def test_multi_and_order_rules_are_checked(self):
        with tempfile.TemporaryDirectory() as d:
            root = Path(d)
            options = [
                {"title": "A", "detail": "A", "feedback": {"reason": "r", "consequence": "c"}},
                {"title": "B", "detail": "B", "feedback": {"reason": "r", "consequence": "c"}},
                {"title": "C", "detail": "C"},
            ]
            en = mission(challenge_type="order", options=options, answer=[0, 2, 1], order_rules=[{"before": 0, "after": 1, "reason": "r", "consequence": "c"}, {"before": 2, "after": 1, "reason": "r", "consequence": "c"}])
            write_fixture(root, en=en)
            result = run_validator(root)
            self.assertEqual(result.returncode, 1)
            self.assertIn("order_rules", result.stdout)

    def test_translation_invariants_parity_and_placeholders_are_checked(self):
        with tempfile.TemporaryDirectory() as d:
            root = Path(d)
            fa = json.loads(json.dumps({}))
            write_fixture(root, fa=mission("fa", id="different"))
            result = run_validator(root)
            self.assertEqual(result.returncode, 1)
            self.assertIn("id", result.stdout)

        with tempfile.TemporaryDirectory() as d:
            root = Path(d)
            write_fixture(root)
            (root / "data/locales/ui/strings.fa.json").write_text(json.dumps({"greeting": "سلام"}))
            result = run_validator(root)
            self.assertEqual(result.returncode, 1)
            self.assertTrue("greeting" in result.stdout or "placeholder" in result.stdout)

        with tempfile.TemporaryDirectory() as d:
            root = Path(d)
            write_fixture(root)
            (root / "data/locales/ui/strings.fa.json").write_text(json.dumps({"greeting": "سلام {other}"}))
            result = run_validator(root)
            self.assertEqual(result.returncode, 1)
            self.assertIn("placeholder", result.stdout)

    def test_configured_future_locale_is_discovered_and_required(self):
        with tempfile.TemporaryDirectory() as d:
            root = Path(d)
            write_fixture(root, config="""[languages.en]
weight = 1
[languages.fa]
weight = 2
[languages.es]
weight = 3
""")
            result = run_validator(root)
            self.assertEqual(result.returncode, 1)
            self.assertIn("index.es", result.stdout)
            self.assertIn("strings.es", result.stdout)

    def test_locale_suffixes_and_duplicate_flat_keys_are_checked(self):
        with tempfile.TemporaryDirectory() as d:
            root = Path(d)
            write_fixture(root)
            (root / "content/missions/first/index.es.md").write_text(mission())
            result = run_validator(root)
            self.assertEqual(result.returncode, 1)
            self.assertIn("locale", result.stdout)

        with tempfile.TemporaryDirectory() as d:
            root = Path(d)
            write_fixture(root)
            (root / "data/locales/other").mkdir(parents=True)
            (root / "data/locales/other/strings.en.json").write_text(json.dumps({"greeting": "Again"}))
            (root / "data/locales/other/strings.fa.json").write_text(json.dumps({"greeting": "دوباره"}))
            result = run_validator(root)
            self.assertEqual(result.returncode, 1)
            self.assertIn("duplicate", result.stdout.lower())


if __name__ == "__main__":
    unittest.main()
