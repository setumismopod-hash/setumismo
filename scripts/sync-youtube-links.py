#!/usr/bin/env python3
"""
Rellena el campo youtubeUrl de los posts del blog que aun no lo tienen.

El blog se sube antes de que salga el video, con un placeholder. El episodio
de podcast y el video salen el mismo dia, asi que se cruzan por fecha:
numero de episodio -> fecha en el RSS del podcast -> video del canal
publicado ese mismo dia (sin contar shorts).

Uso:
    python3 scripts/sync-youtube-links.py            # dry run, no escribe
    python3 scripts/sync-youtube-links.py --write    # escribe los archivos

Corre solo todos los dias via .github/workflows/sync-youtube-links.yml
"""
import re, subprocess, sys
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BLOG_DIR = ROOT / "src/content/blog"
PODCAST_RSS = "https://anchor.fm/s/e8638cb8/podcast/rss"
YOUTUBE_RSS = "https://www.youtube.com/feeds/videos.xml?channel_id=UCNnrji8j3068waCTkbhX9Jg"


def http(url):
    """Usamos curl: el Python de python.org en macOS no trae el bundle de
    certificados y falla el handshake TLS."""
    out = subprocess.run(["curl", "-sS", "--fail-with-body", "-L", url],
                         capture_output=True, text=True)
    if out.returncode != 0:
        raise RuntimeError(out.stdout or out.stderr)
    return out.stdout


def podcast_dates():
    """numero de episodio -> fecha y hora de publicacion (UTC)"""
    out = {}
    for item in re.findall(r"<item>(.*?)</item>", http(PODCAST_RSS), re.S):
        num = re.search(r"<itunes:episode>(\d+)</itunes:episode>", item)
        date = re.search(r"<pubDate>(.*?)</pubDate>", item)
        if num and date:
            out[int(num.group(1))] = parsedate_to_datetime(date.group(1)).astimezone(timezone.utc)
    return out


def youtube_videos():
    """lista de (fecha UTC, url) de los videos largos del canal"""
    vids = []
    for entry in re.findall(r"<entry>(.*?)</entry>", http(YOUTUBE_RSS), re.S):
        link = re.search(r'<link rel="alternate" href="([^"]+)"', entry).group(1)
        if "/shorts/" in link:
            continue
        published = re.search(r"<published>(.*?)</published>", entry).group(1)
        vids.append((datetime.fromisoformat(published).astimezone(timezone.utc), link))
    return vids


def main():
    write = "--write" in sys.argv
    pend = re.compile(r'^youtubeUrl:\s*"?(\[[^\]]*\])?"?\s*$', re.M)

    pendientes = []
    for md in sorted(BLOG_DIR.glob("*.md")):
        text = md.read_text(encoding="utf-8")
        m = re.search(r"^episodeNumber:\s*(\d+)\s*$", text, re.M)
        if m and pend.search(text):
            pendientes.append((md, int(m.group(1)), text))

    if not pendientes:
        print("Ningun post pendiente.")
        return

    print(f"{len(pendientes)} posts sin link de YouTube. Leyendo feeds...")
    fechas = podcast_dates()
    videos = youtube_videos()
    usados = {m.group(1) for md in BLOG_DIR.glob("*.md")
              for m in re.finditer(r'^youtubeUrl:\s*"?(https?://[^"\s]+)', md.read_text(encoding="utf-8"), re.M)}

    cambios = 0
    for md, num, text in pendientes:
        fecha = fechas.get(num)
        if not fecha:
            print(f"  {md.name}: ep{num} todavia no esta en el RSS del podcast")
            continue
        candidatos = [(abs((d - fecha).total_seconds()), url) for d, url in videos
                      if d.date() == fecha.date() and url not in usados]
        if not candidatos:
            print(f"  {md.name}: no hay video del {fecha.date()} en el canal")
            continue
        url = min(candidatos)[1]
        usados.add(url)
        new = pend.sub(f'youtubeUrl: "{url}"', text, count=1)
        if write:
            md.write_text(new, encoding="utf-8")
        print(f"  {'escrito ' if write else 'pendiente'} {md.name} -> {url}")
        cambios += 1

    print(f"\n{cambios} posts {'actualizados' if write else 'por actualizar (corre con --write)'}")


if __name__ == "__main__":
    main()
