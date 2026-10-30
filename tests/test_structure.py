"""Contributor-facing structure and public URL contracts."""
from pathlib import Path
import json
import subprocess
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]


class ContributorStructureTests(unittest.TestCase):
    def test_missions_group_translations_in_leaf_bundles(self):
        bundles = sorted((ROOT / 'content/missions').glob('[0-9]*'))
        self.assertEqual(len(bundles), 14)
        for bundle in bundles:
            self.assertTrue(bundle.is_dir(), f'{bundle.name}: use a mission directory')
            for lang in ['en', 'fa', 'es', 'de']:
                self.assertTrue((bundle / f'index.{lang}.md').is_file())
        self.assertTrue((ROOT / 'content/missions/_index.en.md').is_file())
        self.assertTrue((ROOT / 'content/missions/_index.de.md').is_file())
        self.assertTrue((ROOT / 'content/_index.de.md').is_file())

    def test_game_uses_imports_and_a_module_entry_point(self):
        entry = ROOT / 'assets/js/main.js'
        self.assertTrue(entry.is_file(), 'Missing ES module entry point')
        self.assertIn('import ', entry.read_text())
        self.assertFalse((ROOT / 'assets/js/game.js').exists(), 'Remove the duplicated monolithic implementation')
        self.assertIn('type="module"', (ROOT / 'layouts/home.html').read_text())

    def test_language_sections_have_matching_suffixed_files(self):
        sections = [p for p in (ROOT / 'data/locales').glob('*') if p.is_dir()]
        self.assertGreaterEqual(len(sections), 6)
        for section in sections:
            en = json.loads((section / 'strings.en.json').read_text())
            for lang in ['fa', 'es', 'de']:
                translated = json.loads((section / f'strings.{lang}.json').read_text())
                self.assertEqual(set(en), set(translated), f'{section.name}: {lang}')

    def test_bundle_move_preserves_translated_urls(self):
        with tempfile.TemporaryDirectory(prefix='hugo-structure-') as destination:
            build = subprocess.run(['hugo', '--source', str(ROOT), '--destination', destination, '--panicOnWarning'], capture_output=True, text=True)
            self.assertEqual(build.returncode, 0, build.stdout + build.stderr)
            for lang in ['', 'fa/', 'es/', 'de/']:
                self.assertTrue((Path(destination) / f'{lang}missions/01-invitation/index.html').exists())
                self.assertTrue((Path(destination) / f'{lang}missions/14-final/index.html').exists())

    def test_pull_requests_are_gated_and_only_main_deploys(self):
        checks = (ROOT / '.github/workflows/check.yml').read_text()
        deploy = (ROOT / '.github/workflows/deploy-pages.yml').read_text()

        self.assertIn('pull_request:', checks)
        self.assertIn('name: verify', checks)
        self.assertIn('branches: [main]', checks)
        self.assertIn('branches: [main]', deploy)
        self.assertNotIn('workflow_dispatch', deploy)
        self.assertIn('needs: test', deploy)
        self.assertIn('needs: build', deploy)


if __name__ == '__main__':
    unittest.main(verbosity=2)
