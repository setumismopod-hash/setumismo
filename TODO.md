# TODO — Sé Tú Mismo

## Contenido por rellenar (Placeholders)

- [x] **Descripción del podcast** — Escribir la descripción real en la sección Podcast
- [x] **Bio de Gaxpar** — Reemplazar los dos párrafos placeholder en la sección "Sobre Gaxpar"
- [x] **Foto de Gaxpar** — Subir foto real y reemplazar el placeholder en la sección "Sobre Gaxpar"
- [x] **Capítulos del podcast** — Reemplazar los 4 episodios placeholder con episodios reales (títulos, miniaturas, links)
- [ ] **SVG overlay de dibujos a mano** — Crear o quitar el overlay decorativo planeado para el hero
- [x] **Imagen del hero** — Reemplazado con slideshow de 6 videos propios (3s cada uno)

## Links rotos (href="#")

- [x] **Link de Apple Podcasts** — Agregar URL real del podcast en Apple Podcasts
- [x] **Recursos: Lista de libros** — Página `/recursos/libros` creada y enlazada desde el nav
- [ ] **Recursos: Guía de hábitos** — Crear página o enlace
- [ ] **Recursos: Prompts autoconocimiento** — Crear página o enlace

## Páginas y funcionalidades por crear

- [ ] **Páginas de Recursos faltantes** — Crear Guía de hábitos y Prompts de autoconocimiento (libros ya está)
- [ ] **Newsletter funcional** — Conectar el formulario a un servicio real (MailerLite, ConvertKit, etc.) — actualmente apunta a una URL placeholder de MailerLite
- [ ] **Página de contacto** — El link "Contacto" del nav apunta a la sección newsletter, evaluar si necesita su propia página
- [ ] **Página 404** — Crear una página de error personalizada

## Mejoras pendientes

- [x] **SEO** — Open Graph + twitter cards, meta tags por página, sitemap.xml, robots.txt, JSON-LD (PodcastSeries + Article + PodcastEpisode), OG image dinámica por post vía `next/og`
- [x] **Google Search Console** — Dominio verificado y sitemap enviado
- [x] **Favicon** — Generado desde `podcast-cover.png` vía `app/icon.png`
- [x] **Analytics** — Vercel Analytics integrado en `app/layout.tsx`
- [x] **Episodios dinámicos (parcial)** — Home lee los episodios desde los markdown del blog (`getLatestEpisodes`). Pendiente: conectar a RSS/Spotify API si se quiere automatizar más
- [x] **Blog: más artículos** — 9 posts publicados en `src/content/blog/`
- [ ] **Responsive final** — Revisar diseño en móvil, especialmente el hero y la sección de capítulos
- [ ] **Accesibilidad** — Revisar contraste de colores, alt texts, navegación por teclado, aria labels
- [ ] **Performance** — Optimizar imágenes (next/image), lazy loading, Web Vitals
- [ ] **Limpiar assets** — Eliminar los SVGs default de Next.js que no se usan (file.svg, globe.svg, next.svg, vercel.svg, window.svg)

## Pendiente puntual

- [x] **ep137 `spotifyUrl`** — URL real del episodio agregada
- [ ] **Re-validar Rich Results** — Confirmar que los warnings de `datePublished`/`dateModified` desaparecieron tras el fix ISO 8601
