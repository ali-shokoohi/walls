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
    def test_spanish_game_and_readable_lessons_publish_under_a_subpath(self):
        with tempfile.TemporaryDirectory(prefix='hugo-es-') as destination:
            result = subprocess.run(
                ['hugo', '--source', str(ROOT), '--destination', destination,
                 '--baseURL', 'https://example.org/learn/', '--panicOnWarning'],
                capture_output=True, text=True,
            )
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            spanish_home = Path(destination) / 'es/index.html'
            self.assertTrue(spanish_home.is_file(), 'Missing Spanish homepage')
            home = spanish_home.read_text()
            self.assertIn('lang="es-ES"', home)
            self.assertIn('dir="ltr"', home)
            self.assertNotIn('Vazirmatn', home)
            self.assertIn('Español', home)
            self.assertIn('Bot pequeño, muros fuertes', home)
            match = re.search(
                r'<script id="mission-data" type="application/json">(.*?)</script>',
                home, re.S)
            self.assertIsNotNone(match)
            assert match is not None
            missions = json.loads(match.group(1))
            self.assertEqual(len(missions), 14)
            for source in sorted((ROOT / 'content/missions').glob('[0-9]*/index.en.md')):
                en, _ = json.JSONDecoder().raw_decode(source.read_text())
                es, _ = json.JSONDecoder().raw_decode(source.with_name('index.es.md').read_text())
                for key in ['id', 'weight', 'source', 'challenge_type', 'answer', 'unlocks']:
                    self.assertEqual(en[key], es[key], f'{source.parent.name}: {key}')
                self.assertEqual(len(en['options']), len(es['options']))
                # Proper names in speaker labels (for example Sina) stay unchanged.
                for key in ['title', 'chapter', 'goal', 'scene', 'message',
                            'task', 'success', 'lesson', 'why', 'term', 'reward']:
                    self.assertNotEqual(en[key], es[key], f'{source.parent.name}: {key}')
                lesson = (Path(destination) / 'es/missions' / source.parent.name / 'index.html').read_text()
                self.assertIn(es['title'], lesson)
                self.assertIn(f'href="/learn/missions/{source.parent.name}/" lang="en"', lesson)
                self.assertIn(f'href="/learn/fa/missions/{source.parent.name}/" lang="fa"', lesson)
            self.assertTrue((Path(destination) / 'es/missions/index.html').is_file())
            for url in re.findall(r'(?:src|href)="([^"]+)"', home):
                if not url.startswith('/'):
                    continue
                self.assertTrue(url.startswith('/learn/'), url)
                target = Path(destination) / url.removeprefix('/learn/')
                if url.endswith('/'):
                    target /= 'index.html'
                self.assertTrue(target.exists(), url)

    def test_dark_theme_follows_system_preference(self):
        with tempfile.TemporaryDirectory(prefix='hugo-theme-') as destination:
            result = subprocess.run(
                ['hugo', '--source', str(ROOT), '--destination', destination,
                 '--baseURL', 'https://example.org/', '--panicOnWarning'],
                capture_output=True, text=True,
            )
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            home = (Path(destination) / 'index.html').read_text()
            self.assertIn('<meta name="color-scheme" content="light dark">', home)
            css_url = re.search(r'href="([^"]+\.css)', home).group(1)
            css = (Path(destination) / css_url.lstrip('/')).read_text()
            self.assertIn(':root[data-theme=dark]', css)
            self.assertIn('matchMedia("(prefers-color-scheme: dark)")', home)

    def test_homepage_publishes_playable_game(self):
        self.assertTrue((ROOT / 'hugo.toml').is_file(), 'Missing Hugo project configuration')
        with tempfile.TemporaryDirectory(prefix='hugo-test-') as destination:
            result = subprocess.run(
                ['hugo', '--source', str(ROOT), '--destination', destination,
                 '--baseURL', 'https://example.org/', '--panicOnWarning'],
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
            mission = project / 'content/missions/01-invitation/index.en.md'
            text = mission.read_text().replace('Your first visitor', 'A newly edited mission')
            mission.write_text(text)
            result = subprocess.run(['hugo', '--source', str(project), '--panicOnWarning'],
                                    capture_output=True, text=True)
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            self.assertIn('A newly edited mission', (project / 'public/index.html').read_text())
            page = project / 'public/missions/01-invitation/index.html'
            self.assertIn('A newly edited mission', page.read_text())

    def test_language_dropdown_discovers_an_additional_locale_and_preserves_lesson_links(self):
        with tempfile.TemporaryDirectory(prefix='hugo-languages-') as temp:
            project = Path(temp) / 'site'
            shutil.copytree(ROOT, project, ignore=shutil.ignore_patterns(
                '.git', 'node_modules', 'public', 'resources', '__pycache__', 'test-results'))
            with (project / 'hugo.toml').open('a') as config:
                config.write("\n[languages.de]\nweight = 4\nlabel = 'Deutsch'\nlocale = 'de-DE'\ndirection = 'ltr'\n")
            # English copies are a test fixture only, not a published translation.
            for source in list((project / 'content').rglob('*.en.md')):
                shutil.copyfile(source, source.with_name(source.name.replace('.en.', '.de.')))
            for source in list((project / 'data/locales').rglob('strings.en.json')):
                shutil.copyfile(source, source.with_name('strings.de.json'))
            result = subprocess.run(['hugo', '--source', str(project), '--panicOnWarning',
                                     '--baseURL', 'https://example.org/learn/'],
                                    capture_output=True, text=True)
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            lesson = (project / 'public/fa/missions/01-invitation/index.html').read_text()
            picker = re.search(r'<ul class="language-options">(.*?)</ul>', lesson, re.S).group(1)
            self.assertEqual(len(re.findall(r'<a ', picker)), 4)
            self.assertIn('href="/learn/de/missions/01-invitation/" lang="de"', picker)
            self.assertIn('Deutsch', picker)
            self.assertEqual(picker.count('aria-current="page"'), 1)
            self.assertIn('hreflang="fa" aria-current="page"', picker)

    def test_failure_feedback_is_authored_for_every_possible_gap(self):
        for path in sorted((ROOT / 'content/missions').glob('[0-9]*/index.*.md')):
            mission, _ = json.JSONDecoder().raw_decode(path.read_text())
            answer = mission['answer']
            for i, option in enumerate(mission['options']):
                if mission['challenge_type'] == 'choice' and i in answer:
                    continue
                explanation = option.get('feedback', {})
                self.assertGreater(len(explanation.get('reason', '')), 40, f'{path.name} option {i}')
                self.assertGreater(len(explanation.get('consequence', '')), 40, f'{path.name} option {i}')
            if mission['challenge_type'] == 'order':
                rules = mission['order_rules']
                self.assertEqual([(r['before'], r['after']) for r in rules], list(zip(answer, answer[1:])))
                for rule in rules:
                    self.assertTrue(rule['reason'] and rule['consequence'])

    def test_translation_keys_and_mission_invariants_match(self):
        for group in sorted((ROOT / 'data/locales').iterdir()):
            en = json.loads((group / 'strings.en.json').read_text())
            fa = json.loads((group / 'strings.fa.json').read_text())
            self.assertEqual(set(en), set(fa), group)
            for key in en:
                self.assertTrue(fa[key], key)
                self.assertEqual(set(re.findall(r'\{\w+\}', en[key])), set(re.findall(r'\{\w+\}', fa[key])), key)
        english = sorted((ROOT / 'content/missions').glob('[0-9]*/index.en.md'))
        self.assertEqual(len(english), 14)
        for source in english:
            en, _ = json.JSONDecoder().raw_decode(source.read_text())
            fa, _ = json.JSONDecoder().raw_decode(source.with_name(source.name.replace('.en.', '.fa.')).read_text())
            for key in ['id', 'weight', 'source', 'challenge_type', 'answer', 'unlocks']:
                self.assertEqual(en[key], fa[key], f'{source.name}: {key}')
            self.assertEqual(len(en['options']), len(fa['options']))
            for key in ['title', 'scene', 'task', 'success', 'lesson']:
                self.assertRegex(fa[key], r'[\u0600-\u06ff]', key)
                self.assertNotEqual(en[key], fa[key])
            self.assertEqual([(r['before'], r['after']) for r in en.get('order_rules', [])], [(r['before'], r['after']) for r in fa.get('order_rules', [])])

    def test_farsi_subpath_assets_and_linked_translations(self):
        with tempfile.TemporaryDirectory(prefix='hugo-fa-') as destination:
            result = subprocess.run(['hugo', '--source', str(ROOT), '--destination', destination,
                                     '--baseURL', 'https://example.org/learn/', '--panicOnWarning'],
                                    capture_output=True, text=True)
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            home = (Path(destination) / 'fa/index.html').read_text()
            en = (Path(destination) / 'index.html').read_text()
            self.assertIn('dir="rtl"', home)
            self.assertIn('dir="ltr"', en)
            self.assertIn('Vazirmatn-Variable.woff2', home)
            self.assertNotIn('Vazirmatn', en)
            self.assertIn('href="/learn/" lang="en"', home)
            for url in re.findall(r'(?:src|href)="([^"]+)"', home):
                if not url.startswith('/'):
                    continue
                self.assertTrue(url.startswith('/learn/'), url)
                target = Path(destination) / url.removeprefix('/learn/')
                if url.endswith('/'):
                    target /= 'index.html'
                self.assertTrue(target.exists(), url)
            lesson = (Path(destination) / 'fa/missions/01-invitation/index.html').read_text()
            self.assertIn('href="/learn/missions/01-invitation/"', lesson)


if __name__ == '__main__':
    unittest.main(verbosity=2)
