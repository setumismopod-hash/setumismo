#!/usr/bin/env python3
"""
Cruza el RSS del podcast con la Spotify Web API y rellena el campo
spotifyUrl de los posts del blog que aun no lo tienen.

Uso:
    python3 scripts/sync-spotify-links.py            # dry run, no escribe
    python3 scripts/sync-spotify-links.py --write    # escribe los archivos

Lee SPOTIFY_CLIENT_ID y SPOTIFY_CLIENT_SECRET desde .env.local
"""
import base64, json, os, re, subprocess, sys, unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BLOG_DIR = ROOT / "src/content/blog"
RSS_URL = "https://anchor.fm/s/e8638cb8/podcast/rss"
SHOW_CANDIDATES = ["2ERQlZQycD77mt8rVM0Be5", "2jheJptKOT2FoAyUCovFzf"]


def load_env():
    env = {}
    path = ROOT / ".env.local"
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        env[k.strip()] = v.strip().strip('"').strip("'")
    return env


def http(url, headers=None, data=None):
    """Usamos curl: el Python de python.org en macOS no trae el bundle de
    certificados y falla el handshake TLS contra las APIs."""
    cmd = ["curl", "-sS", "--fail-with-body", url]
    for k, v in (headers or {}).items():
        cmd += ["-H", f"{k}: {v}"]
    if data is not None:
        cmd += ["--data", data]
    out = subprocess.run(cmd, capture_output=True, text=True)
    if out.returncode != 0:
        raise RuntimeError(out.stdout or out.stderr)
    return out.stdout


def get_token(cid, secret):
    auth = base64.b64encode(f"{cid}:{secret}".encode()).decode()
    body = http(
        "https://accounts.spotify.com/api/token",
        headers={"Authorization": f"Basic {auth}",
                 "Content-Type": "application/x-www-form-urlencoded"},
        data="grant_type=client_credentials",
    )
    return json.loads(body)["access_token"]


def api(path, token):
    return json.loads(http(f"https://api.spotify.com/v1{path}",
                           headers={"Authorization": f"Bearer {token}"}))


def resolve_show(token):
    """Hay dos IDs de show dando vueltas en el repo. Usamos el que responda."""
    for sid in SHOW_CANDIDATES:
        try:
            show = api(f"/shows/{sid}?market=CL", token)
            print(f"  show {sid} -> {show['name']} ({show['total_episodes']} episodios)")
            return sid
        except Exception as e:
            print(f"  show {sid} -> no sirve ({e})")
    sys.exit("Ningun show ID funciono.")


def fetch_episodes(show_id, token):
    eps, offset = [], 0
    while True:
        page = api(f"/shows/{show_id}/episodes?market=CL&limit=50&offset={offset}", token)
        eps.extend(page["items"])
        if not page.get("next"):
            break
        offset += 50
    return [e for e in eps if e]


def norm(s):
    s = unicodedata.normalize("NFKD", s or "")
    s = "".join(c for c in s if not unicodedata.combining(c))
    return re.sub(r"[^a-z0-9]+", " ", s.lower()).strip()


def parse_rss():
    xml = http(RSS_URL)
    out = {}
    for item in re.findall(r"<item>(.*?)</item>", xml, re.S):
        num = re.search(r"<itunes:episode>(\d+)</itunes:episode>", item)
        title = re.search(r"<title><!\[CDATA\[(.*?)\]\]></title>", item, re.S) \
             or re.search(r"<title>(.*?)</title>", item, re.S)
        if num and title:
            out[int(num.group(1))] = title.group(1).strip()
    return out


def main():
    write = "--write" in sys.argv
    env = load_env()
    cid, secret = env.get("SPOTIFY_CLIENT_ID"), env.get("SPOTIFY_CLIENT_SECRET")
    if not cid or not secret:
        sys.exit("Faltan SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET en .env.local")

    print("Autenticando...")
    token = get_token(cid, secret)

    print("Resolviendo show...")
    show_id = resolve_show(token)

    print("Bajando episodios de Spotify...")
    spotify_eps = fetch_episodes(show_id, token)
    by_title = {norm(e["name"]): e for e in spotify_eps}
    print(f"  {len(spotify_eps)} episodios")

    print("Leyendo RSS...")
    rss = parse_rss()
    print(f"  {len(rss)} episodios numerados")

    # numero de episodio -> url de spotify
    links, sin_match = {}, []
    for num, title in rss.items():
        ep = by_title.get(norm(title))
        if ep:
            links[num] = ep["external_urls"]["spotify"]
        else:
            sin_match.append((num, title))

    print(f"\nMapeados {len(links)} episodios. Sin match: {len(sin_match)}")
    for num, title in sorted(sin_match)[:10]:
        print(f"  ep{num}: {title}")

    # rellenar los posts
    pend = re.compile(r"^spotifyUrl:\s*(\[[^\]]*\]|)\s*$", re.M)
    cambios = 0
    for md in sorted(BLOG_DIR.glob("*.md")):
        text = md.read_text(encoding="utf-8")
        m = re.search(r"^episodeNumber:\s*(\d+)\s*$", text, re.M)
        if not m:
            continue
        num = int(m.group(1))
        if not pend.search(text):
            continue
        url = links.get(num)
        if not url:
            print(f"  {md.name}: ep{num} sin link en Spotify")
            continue
        new = pend.sub(f'spotifyUrl: "{url}"', text, count=1)
        if write:
            md.write_text(new, encoding="utf-8")
        print(f"  {'escrito ' if write else 'pendiente'} {md.name} -> {url}")
        cambios += 1

    print(f"\n{cambios} posts {'actualizados' if write else 'por actualizar (corre con --write)'}")


if __name__ == "__main__":
    main()
