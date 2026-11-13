# Sé Tú Mismo — setumismo

Web del podcast, blog y coaching de Gaxpar. Next.js 16, desplegada en Vercel.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de produccion
```

## Cómo publicar cambios (ramas + preview)

`main` es lo que está en producción: todo lo que llega ahí se publica solo.
Por eso los cambios se hacen en una rama y se revisan en una preview antes.

1. **Crea una rama** para el cambio:
   ```bash
   git switch main && git pull
   git switch -c ep167
   ```
   Nombres cortos: `ep167`, `rediseno-hero`, `fix-formulario`.
2. **Haz tus cambios y súbelos:**
   ```bash
   git add -A && git commit -m "Add ep167 blog post"
   git push -u origin ep167
   ```
3. **Abre un Pull Request** en GitHub (aparece un botón amarillo "Compare & pull request").
4. **Revisa la preview:** Vercel comenta en el PR con un link propio para esa rama.
   Ábrelo en el computador y en el celular. El check **CI** revisa los posts y que el sitio compile.
5. **Merge:** si todo se ve bien y CI está en verde, "Merge pull request". En un par de minutos está en producción.

¿Algo salió mal en producción? En el PR ya mergeado está el botón **Revert**, que crea un PR que deshace el cambio.

Para cambios mínimos (un typo) se puede seguir commiteando directo a `main`.

## Posts del blog

Van en `src/content/blog/` como markdown con este frontmatter:

```yaml
---
title: "Título del post"
date: "2026-11-16"
excerpt: "Entre 120 y 160 caracteres, es lo que muestra Google."
slug: "slug-en-minusculas-con-guiones"
episodeNumber: 167
youtubeUrl: "[PENDIENTE]"
---
```

`youtubeUrl` y `spotifyUrl` se rellenan solos (ver abajo). Para revisar los posts a mano:

```bash
python3 scripts/validate-blog.py
```

## Automatizaciones (GitHub Actions)

| Workflow | Cuándo | Qué hace |
|---|---|---|
| `ci.yml` | Cada push y PR | Valida el frontmatter de los posts, corre lint y build |
| `sync-youtube-links.yml` | Todos los días 09:30 (Chile) | Rellena `youtubeUrl` y `spotifyUrl` de los posts nuevos y hace commit |

Spotify necesita los secrets `SPOTIFY_CLIENT_ID` y `SPOTIFY_CLIENT_SECRET`
en GitHub (Settings → Secrets and variables → Actions). En local, los scripts los leen de `.env.local`.
