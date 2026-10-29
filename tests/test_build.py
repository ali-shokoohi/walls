"""Real Hugo builds; no third-party Python test dependencies."""
from pathlib import Path
import json
import re
import shutil
import subprocess
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]


class HugoBuildTests(unittest.TestCase):
    def test_homepage_publishes_playable_game(self):
        self.assertTrue((ROOT / 'hugo.toml').is_file(), 'Missing Hugo project configuration')
        with tempfile.TemporaryDirectory(prefix='hugo-test-') as destination:
            result = subprocess.run(
                ['hugo', '--source', str(ROOT), '--destination', destination, '--panicOnWarning'],
                capture_output=True, text=True,
            )
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            home = (Path(destination) / 'index.html').read_text()
            self.assertIn('Small Bot, Strong Walls', home)
            match = re.search(r'<script id="mission-data" type="application/json">(.*?)</script>', home, re.S)
            self.assertIsNotNone(match, 'Hugo must render editable missions into the game')
            missions = json.loads(match.group(1))
            self.assertEqual(len(missions), 14)
            self.assertEqual(missions[0]['id'], 'invitation')
            self.assertEqual(missions[-1]['id'], 'final')
            self.assertEqual({m['type'] for m in missions}, {'choice', 'multi', 'order'})
            for url in re.findall(r'(?:src|href)="([^"]+\.(?:css|js|pdf))"', home):
                self.assertTrue((Path(destination) / url.lstrip('/')).is_file(), url)

    def test_subpath_deployment_keeps_assets_and_navigation_local(self):
        with tempfile.TemporaryDirectory(prefix='hugo-subpath-') as destination:
            result = subprocess.run(
                ['hugo', '--source', str(ROOT), '--destination', destination,
                 '--baseURL', 'https://example.org/learn/', '--minify', '--panicOnWarning'],
                capture_output=True, text=True,
            )
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            home = (Path(destination) / 'index.html').read_text()
            urls = re.findall(r'(?:src|href)=[\"\']?([^\"\' >]+)', home)
            local = [url for url in urls if url.startswith('/')]
            self.assertTrue(local)
            for url in local:
                self.assertTrue(url.startswith('/learn/'), url)
                path = Path(destination) / url.removeprefix('/learn/')
                if url.endswith('/'):
                    path /= 'index.html'
                self.assertTrue(path.exists(), url)

    def test_editing_a_mission_changes_game_and_lesson_page(self):
        with tempfile.TemporaryDirectory(prefix='hugo-edit-') as temp:
            project = Path(temp) / 'site'
            shutil.copytree(ROOT, project, ignore=shutil.ignore_patterns(
                'node_modules', 'public', 'resources', '__pycache__', 'test-results'))
            mission = project / 'content/missions/01-invitation.md'
            text = mission.read_text().replace('Your first visitor', 'A newly edited mission')
            mission.write_text(text)
            result = subprocess.run(['hugo', '--source', str(project), '--panicOnWarning'],
                                    capture_output=True, text=True)
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            self.assertIn('A newly edited mission', (project / 'public/index.html').read_text())
            page = project / 'public/missions/01-invitation/index.html'
            self.assertIn('A newly edited mission', page.read_text())


if __name__ == '__main__':
    unittest.main(verbosity=2)
