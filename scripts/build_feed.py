#!/usr/bin/env python3
"""Build the public RSS feed from the CCC announcement JSON."""
import json
from datetime import datetime, timezone
from email.utils import format_datetime
from pathlib import Path
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://ccconsciousness.github.io/Church-of-Cosmic-Consciousness/'
posts = json.loads((ROOT / 'announcements.json').read_text(encoding='utf-8'))['posts']
if not isinstance(posts, list):
    raise ValueError('posts must be an array')
rss = ET.Element('rss', version='2.0')
channel = ET.SubElement(rss, 'channel')
for tag, val in [('title','Church of Cosmic Consciousness — Official Broadcasts'), ('link', BASE+'#broadcast'), ('description','Official CCC announcements and updates'), ('language','en-us')]:
    ET.SubElement(channel,tag).text = val
seen=set()
for post in sorted(posts, key=lambda p: p['date'], reverse=True):
    ident = post['id']
    if not isinstance(ident,str) or not ident or ident in seen:
        raise ValueError('Each post needs a unique nonempty id')
    seen.add(ident)
    dt=datetime.fromisoformat(post['date'].replace('Z','+00:00'))
    if dt.tzinfo is None:
        raise ValueError('Post dates must include a timezone')
    dt=dt.astimezone(timezone.utc)
    item=ET.SubElement(channel,'item')
    for tag,val in [('title',post['title']),('link',post.get('url') or BASE+'#broadcast'),('guid',BASE+'#broadcast?post='+ident),('description',post['body']),('pubDate',format_datetime(dt))]:
        ET.SubElement(item,tag).text=val
ET.indent(rss,space='  ')
ET.ElementTree(rss).write(ROOT/'feed.xml', encoding='utf-8', xml_declaration=True)
print(f'Generated feed.xml with {len(posts)} posts')
