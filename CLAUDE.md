# Setumismo — Sé Tú Mismo

Plataforma de marca personal de Gaxpar sobre desarrollo personal, autenticidad y vida intencional. Incluye podcast, blog, coaching y recursos.

## Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Estilos**: Tailwind CSS 4 + CSS custom en `app/globals.css`
- **Blog**: Markdown con frontmatter YAML en `src/content/blog/`
- **Integraciones**: Web3Forms (contacto), MailerLite (newsletter)

## Estructura clave

- `app/` — Páginas y layout (App Router)
- `src/content/blog/` — Posts en markdown
- `lib/blog.ts` — Utilidades de blog (getAllPosts, getPostBySlug)
- `public/` — Assets estáticos (videos hero, covers de episodios, fotos)

## Comandos

- `npm run dev` — Servidor de desarrollo
- `npm run build` — Build de producción
- `npm run lint` — ESLint

## Convenciones

- Todo el contenido y la UI están en **español**
- Archivos en kebab-case, variables/funciones en camelCase
- `"use client"` para componentes interactivos
- Estilos con clases de Tailwind directo en JSX
- Path alias: `@/*` apunta a la raíz del proyecto
- Commits en inglés

## Skills

- Usar `/frontend-design` al trabajar en UI, componentes o diseño visual para lograr interfaces pulcras y profesionales

## Notas

- El TODO.md tiene el backlog del proyecto
- No hay config de deploy explícita (preparado para Vercel)
- Los videos hero rotan cada 3 segundos (6 videos en public/)
