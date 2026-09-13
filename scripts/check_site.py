"""Validate static site links, metadata, and shared publication data (stdlib only)."""
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote

ROOT = Path(__file__).resolve().parents[1]

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.links, self.schemas, self.schema = [], [], [], None
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        for key in ('href', 'src'):
            if key in attrs:
                self.links.append(attrs[key])
        if tag == 'script' and attrs.get('type') == 'application/ld+json':
            self.schema = ''
    def handle_data(self, data):
        if self.schema is not None:
            self.schema += data
    def handle_endtag(self, tag):
        if tag == 'script' and self.schema is not None:
            self.schemas.append(json.loads(self.schema))
            self.schema = None

for name in ('index.html', 'en/index.html'):
    path = ROOT / name
    page = Page()
    page.feed(path.read_text())
    assert len(page.ids) == len(set(page.ids)), f'Duplicate IDs: {name}'
    assert page.schemas, f'Missing structured metadata: {name}'
    for link in page.links:
        url = urlsplit(link)
        if url.scheme or url.netloc:
            continue
        if url.path:
            target = path.parent / unquote(url.path)
            assert target.exists(), f'Missing file: {name} -> {link}'
        elif url.fragment:
            assert url.fragment in page.ids, f'Missing anchor: {name} -> {link}'
    print(f'PASS {name}: metadata, local assets, IDs, anchors')

publications = json.loads((ROOT / 'data/publications.json').read_text())
assert len({p['id'] for p in publications}) == len(publications)
for p in publications:
    assert p['category'] in ('health-promo', 'data-science', 'interdisciplinary')
    assert isinstance(p['year'], int)
    for language in ('zh', 'en'):
        assert p[f'title_{language}']
        assert p[f'authors_{language}']
        assert p[f'journal_{language}']
print(f'PASS {len(publications)} publications: IDs, categories, bilingual content')
json.loads((ROOT / 'data/news.json').read_text())
print('PASS media data')
