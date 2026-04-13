# Plan de mejoras — Sé Tú Mismo

Plan de trabajo para resolver los hallazgos de la evaluación del sitio (2026-04-13).
Cada item tiene: qué, dónde, criterio de "listo".

---

## Fase 1 — Bugs y cosas rotas

Impacto alto, esfuerzo bajo. Hacer primero.

### 1.1 Unificar sistema de booking
- **Qué**: decidir entre `cal.com/gaxpar-uriarte-3nwoir/30min` y `calendly.com/gaxpar`. Reemplazar todas las ocurrencias.
- **Dónde**: `app/components/AboutSection.tsx:27`, `app/coaching/page.tsx` (4 ocurrencias).
- **Listo cuando**: un solo dominio de booking en todo el repo (`rg "cal\.com\|calendly"` devuelve una sola URL).

### 1.2 Arreglar dropdown "Recursos" del Navbar
- **Qué**: los links "Guía de hábitos" y "Prompts autoconocimiento" apuntan a `#`. Además `app/recursos/modelo-osar` y `app/recursos/preguntas-coaching` existen pero no están en el menú.
- **Acción**: decidir por cada item — enlazar a la página real, convertirlo en "próximamente" visiblemente deshabilitado, o eliminarlo del menú. Auditar las 4 páginas de `app/recursos/` y dejar solo las que están listas.
- **Dónde**: `app/components/Navbar.tsx:57-75, 137-157`.
- **Listo cuando**: ningún `href="#"` en el menú y cada link apunta a una página que existe.

### 1.3 Linkear `/contacto` o eliminarlo
- **Qué**: `/contacto` es una página huérfana con formulario Web3Forms funcional.
- **Decisión necesaria**: ¿entra en Navbar/Footer o se elimina? Si entra, agregar link en Navbar y Footer.
- **Dónde**: `app/components/Navbar.tsx`, `app/components/Footer.tsx`, o eliminar `app/contacto/`.

### 1.4 Verificar MailerLite form ID
- **Qué**: `NewsletterSection.tsx:17` usa el ID `135498912498498498` (18 dígitos — muy raro). Probar suscripción real y revisar si llega al dashboard de MailerLite. Si está roto, reemplazar por el ID correcto.
- **Dónde**: `app/components/NewsletterSection.tsx:17`.
- **Listo cuando**: una suscripción de prueba aparece en MailerLite.

### 1.5 Arreglar acentos en página de Coaching
- **Qué**: toda la landing de coaching tiene acentos stripped ("ontologico", "guru", "estas", "acompanamiento", "postergues", etc.). En una página que pide $140.000 CLP esto daña credibilidad.
- **Dónde**: `app/coaching/page.tsx` (completo).
- **Listo cuando**: revisión manual de texto en español correcto.

### 1.6 Carrusel de episodios dinámico
- **Qué**: hoy está hardcodeado con ep 127, 114, 109, 52. Vamos por ep136. Leer de un JSON o exponer los últimos N episodios desde un solo lugar.
- **Opciones**:
  - A) JSON local en `src/content/episodes.json` con todos los eps, y la home lee los últimos 4.
  - B) Extender frontmatter del blog con `episodeNumber` y `spotifyUrl`, derivar del blog.
- **Decisión**: probablemente B, porque ya hay `spotifyUrl` en el frontmatter y es una sola fuente de verdad.
- **Dónde**: `app/components/EpisodesCarousel.tsx`, `lib/blog.ts`, frontmatter de `src/content/blog/*.md`.
- **Listo cuando**: agregar un blog post con `episodeNumber` actualiza la home automáticamente.

### 1.7 Limpiar dead code
- **Qué**: `import Link from "next/link"` en `AboutSection.tsx:1` no se usa. Hero videos rotan solo 3 de 7 disponibles — decidir si rotar los 6-7 o eliminar los archivos no usados de `public/`.
- **Dónde**: `app/components/AboutSection.tsx`, `app/components/HeroSection.tsx:5`.

---

## Fase 2 — SEO / performance

Impacto alto en tráfico orgánico. Esfuerzo medio.

### 2.1 Sitemap dinámico
- **Qué**: crear `app/sitemap.ts` que liste home + todas las páginas estáticas + todos los blog posts.
- **Dónde**: nuevo `app/sitemap.ts`.
- **Listo cuando**: `curl localhost:3000/sitemap.xml` devuelve todos los URLs del sitio.

### 2.2 robots.txt
- **Qué**: crear `app/robots.ts` que permita todo excepto `/instagram` (herramienta interna).
- **Dónde**: nuevo `app/robots.ts`.

### 2.3 Metadata por página
- **Qué**: agregar `export const metadata` (o `generateMetadata`) en cada página que hoy hereda del root.
- **Páginas a tocar**: `app/coaching/page.tsx`, `app/coaching-form/page.tsx`, `app/contacto/page.tsx`, `app/recursos/**/page.tsx`.
- **Instagram**: `metadata: { robots: { index: false } }`.

### 2.4 OG images para blog posts
- **Qué**: hoy `generateMetadata` en `app/blog/[slug]/page.tsx` define `openGraph` pero sin imagen. Generar una OG dinámica por post usando `opengraph-image.tsx` con el cover del episodio si existe.
- **Dónde**: nuevo `app/blog/[slug]/opengraph-image.tsx`, posiblemente frontmatter `coverImage`.
- **Listo cuando**: pegar un link de blog en WhatsApp muestra preview con imagen.

### 2.5 JSON-LD Schema.org
- **Qué**: agregar structured data para `PodcastSeries` en home y `BlogPosting` en posts. Ayuda a rich results en Google.
- **Dónde**: `app/page.tsx`, `app/blog/[slug]/page.tsx`.

### 2.6 Migrar `<img>` a `next/image`
- **Qué**: Hero (videos están bien), PodcastSection, AboutSection, EpisodesCarousel usan `<img>` — perdemos optimización automática.
- **Dónde**: `app/components/PodcastSection.tsx:7`, `app/components/AboutSection.tsx:10`, `app/components/EpisodesCarousel.tsx:89`.
- **Nota**: requiere anchos/altos explícitos. Revisar `podcast-cover.png` y `foto-gax.jpg`.

### 2.7 Poster para videos del hero
- **Qué**: los MP4s pesan MBs. Mientras cargan hay pantalla negra → LCP malo.
- **Acción**: extraer frame 0 de cada video como `.jpg` pequeño, usarlo como `poster` del `<video>`.
- **Dónde**: `app/components/HeroSection.tsx:48-60`, `public/hero-*.jpg`.

### 2.8 Parallax con rAF
- **Qué**: `HeroSection.tsx:34-42` setea `transform` en cada evento `scroll` sin throttle. Janka en móvil.
- **Acción**: envolver en `requestAnimationFrame` con flag de "pending".
- **Dónde**: `app/components/HeroSection.tsx:34-42`.

---

## Fase 3 — Producto y conversión

Impacto alto en negocio. Esfuerzo medio-alto.

### 3.1 Sección "Últimos artículos" en la home
- **Qué**: la home hoy no menciona el blog. Agregar una sección entre About y Newsletter con los últimos 3 posts.
- **Dónde**: nuevo `app/components/LatestPosts.tsx`, incluir en `app/page.tsx`.
- **Requiere**: convertir `app/page.tsx` a server component (hoy es `"use client"` por el IntersectionObserver — mover el observer a un subcomponente).

### 3.2 Newsletter con lead magnet
- **Qué**: "Ideas que importan" + un input es demasiado tibio. Sumar:
  - Prueba social ("X personas reciben esto cada domingo") si ya hay base.
  - Lead magnet: PDF de hábitos o de preguntas de coaching (ya existen en `/recursos`).
  - Frecuencia clara.
- **Dónde**: `app/components/NewsletterSection.tsx`.

### 3.3 CTA del hero más útil
- **Qué**: "Escucha el podcast" → `#podcast` es un anchor a la sección que viene justo debajo. No aporta.
- **Acción**: cambiar a link directo al último episodio en Spotify o al blog post más reciente.
- **Dónde**: `app/components/HeroSection.tsx:73-81`.

### 3.4 Prueba social en Coaching
- **Qué**: la página de coaching pide $140k-200k CLP pero no tiene testimonios, resultados, ni foto de Gaxpar en la página.
- **Acción**: agregar sección de testimonios (mínimo 3), foto, y ojalá 1-2 casos de antes/después.
- **Dónde**: `app/coaching/page.tsx` entre "Como funciona" y "Opciones".
- **Bloqueador**: requiere input del usuario para los testimonios.

### 3.5 Navbar mobile con logo
- **Qué**: en mobile solo aparece la hamburguesa. Agregar wordmark "Sé Tú Mismo" a la izquierda que linkee a home.
- **Dónde**: `app/components/Navbar.tsx:85`.

---

## Fase 4 — Accesibilidad y pulido

Impacto medio. Esfuerzo bajo.

### 4.1 `aria-hidden` en videos decorativos del hero
- **Dónde**: `app/components/HeroSection.tsx:49-60`.

### 4.2 Página 404 custom
- **Qué**: crear `app/not-found.tsx` con mensaje en español y link a home.
- **Dónde**: nuevo `app/not-found.tsx`.

### 4.3 Unificar estilos de prose
- **Qué**: `app/blog/[slug]/page.tsx` usa `prose-neutral` (Tailwind typography) + custom `.prose` en `globals.css`. Decidir uno y limpiar.
- **Dónde**: `app/globals.css:49-109`, `app/blog/[slug]/page.tsx:76`.

---

## Orden sugerido de ejecución

1. **Fase 1** completa (bugs) — 1 sesión.
2. **Fase 2.1 + 2.2 + 2.3** (sitemap, robots, metadata) — rápido, mucho ROI SEO.
3. **Fase 3.1** (últimos artículos en home) + **Fase 3.3** (CTA hero) — conecta el ecosistema.
4. **Fase 2.4 + 2.5** (OG images, JSON-LD).
5. **Fase 2.6 + 2.7 + 2.8** (imágenes, poster, rAF).
6. **Fase 3.2** (newsletter con lead magnet).
7. **Fase 3.4** (prueba social coaching) — bloqueada por testimonios reales.
8. **Fase 4** (pulido).

## Decisiones tomadas (2026-04-13)

- **1.1**: Calendly. Reemplazar cal.com en todo el repo.
- **1.2**: Mantener "Lista de libros" y "Guía de hábitos" (existe). Eliminar "Prompts autoconocimiento".
- **1.3**: Eliminar `/contacto` — choca con coaching como CTA "trabaja conmigo".
- **3.3**: CTA del hero → Spotify (plataforma principal del podcast).
- **3.4**: Hay testimonios — pedirlos cuando lleguemos a 3.4.
