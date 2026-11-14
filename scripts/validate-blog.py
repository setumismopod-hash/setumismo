#!/usr/bin/env python3
"""
Revisa el frontmatter de los posts del blog antes de publicar.

Errores (hacen fallar el CI):
  - falta title, date, excerpt o slug
  - date no tiene formato YYYY-MM-DD
  - slug repetido entre dos posts
  - episodeNumber repetido o que no es numero
  - youtubeUrl / spotifyUrl que no es un link ni el placeholder [PENDIENTE]

Avisos (no hacen fallar):
  - excerpt muy corto o muy largo para SEO (ideal 120-160 caracteres)

Uso:
    python3 scripts/validate-blog.py
"""
import re, sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BLOG_DIR = ROOT / "src/content/blog"
REQUIRED = ["title", "date", "excerpt", "slug"]
EXCERPT_MIN, EXCERPT_MAX = 120, 160


def frontmatter(text):
    m = re.match(r"^---\r?\n(.*?)\r?\n---\r?\n", text, re.S)
    if not m:
        return None
    data = {}
    for line in m.group(1).splitlines():
        km = re.match(r"^([A-Za-z]\w*):\s*(.*)$", line)
        if km:
            value = km.group(2).strip()
            if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
                value = value[1:-1]
            data[km.group(1)] = value
    return data


def main():
    errors, warnings = [], []
    slugs, episodes = {}, {}

    files = sorted(BLOG_DIR.glob("*.md"))
    for md in files:
        name = md.name
        data = frontmatter(md.read_text(encoding="utf-8"))
        if data is None:
            errors.append(f"{name}: no tiene frontmatter (bloque --- al inicio)")
            continue

        for key in REQUIRED:
            if not data.get(key):
                errors.append(f"{name}: falta '{key}'")

        d = data.get("date", "")
        if d:
            try:
                date.fromisoformat(d)
            except ValueError:
                errors.append(f"{name}: date '{d}' no tiene formato YYYY-MM-DD")

        slug = data.get("slug")
        if slug:
            if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", slug):
                errors.append(f"{name}: slug '{slug}' debe ir en minusculas, sin tildes y con guiones")
            if slug in slugs:
                errors.append(f"{name}: slug '{slug}' repetido (tambien en {slugs[slug]})")
            slugs[slug] = name

        ep = data.get("episodeNumber")
        if ep:
            if not ep.isdigit():
                errors.append(f"{name}: episodeNumber '{ep}' no es un numero")
            elif ep in episodes:
                errors.append(f"{name}: episodeNumber {ep} repetido (tambien en {episodes[ep]})")
            else:
                episodes[ep] = name

        for key in ("youtubeUrl", "spotifyUrl"):
            v = data.get(key)
            if v and not re.match(r"^https?://", v) and not re.fullmatch(r"\[[^\]]*\]", v):
                errors.append(f"{name}: {key} '{v}' no es un link ni un placeholder tipo [PENDIENTE]")

        excerpt = data.get("excerpt", "")
        if excerpt and not EXCERPT_MIN <= len(excerpt) <= EXCERPT_MAX:
            warnings.append(f"{name}: excerpt tiene {len(excerpt)} caracteres "
                            f"(ideal {EXCERPT_MIN}-{EXCERPT_MAX} para Google)")

    for w in warnings:
        print(f"::warning::{w}" if "--github" in sys.argv else f"aviso: {w}")
    for e in errors:
        print(f"::error::{e}" if "--github" in sys.argv else f"ERROR: {e}")

    print(f"\n{len(files)} posts revisados: {len(errors)} errores, {len(warnings)} avisos")
    sys.exit(1 if errors else 0)


if __name__ == "__main__":
    main()
