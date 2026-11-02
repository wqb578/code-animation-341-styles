#!/usr/bin/env python3
"""Check the X-series preview mapping, frozen GIFs and catalog counts (stdlib only)."""
import hashlib
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]


def main():
    lock = json.loads((ROOT / '动画预览/X_code-video/source-lock.json').read_text())
    html = (ROOT / '风格挑选.html').read_text()
    data = json.loads(re.search(r'<script id="data" type="application/json">(.*?)</script>', html, re.S)[1])
    entries = data['entries']
    x_entries = {e['id']: e for e in entries if e['s'] == 'X'}
    assert set(x_entries) == set(lock['styles']) == {f'X{i}' for i in range(1, 32)}
    expected_gifs = set()
    for id, mapping in lock['styles'].items():
        entry = x_entries[id]
        assert entry['img'] == mapping['file'], id
        assert entry['previewType'] == 'gif', id
        assert entry['previewSource'] == f"{lock['repository']}/blob/{lock['commit']}/{mapping['source_path']}", id
        payload = (ROOT / mapping['file']).read_bytes()
        assert payload.startswith(b'GIF8'), id
        expected_gifs.add(mapping['file'])
    actual_gifs = {str(p.relative_to(ROOT)) for p in (ROOT / '动画预览/X_code-video').glob('*.gif')}
    assert actual_gifs == expected_gifs
    for name, digest in lock['sha256'].items():
        assert hashlib.sha256((ROOT / name).read_bytes()).hexdigest() == digest, name
    for entry in entries:
        if entry.get('img'):
            assert (ROOT / entry['img']).is_file(), entry['id']
    stats = json.loads((ROOT / '_统计.json').read_text())
    assert len(entries) == stats['total'] == 341
    assert sum(bool(e.get('img')) for e in entries) == stats['withPreview'] == 224
    assert sum(e.get('previewType') == 'gif' for e in entries) == stats['withAnimatedPreview'] == 31
    assert len(list((ROOT / '风格提示词').rglob('*.jpg'))) == stats['withStill'] == 193
    print('PASS: 31 original GIFs, exact mapping and SHA-256; 224 previews; 193 original stills.')


if __name__ == '__main__':
    main()
