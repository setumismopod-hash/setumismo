import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="#" className="text-lg font-bold tracking-tight">
            Sé Tú Mismo
          </a>
          <div className="flex gap-6 text-sm text-muted">
            <a href="#podcast" className="transition-colors hover:text-foreground">
              Podcast
            </a>
            <a href="#blog" className="transition-colors hover:text-foreground">
              Blog
            </a>
            <a href="#newsletter" className="transition-colors hover:text-foreground">
              Newsletter
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
          Sé Tú Mismo
        </h1>
        <p className="mt-6 max-w-lg text-lg text-muted">
          Un espacio para dejar el piloto automático. Autoconocimiento,
          responsabilidad personal y herramientas para vivir una vida más
          alineada contigo.
        </p>
        <a
          href="#podcast"
          className="mt-10 inline-block rounded-full border border-foreground bg-foreground px-8 py-3 text-sm font-medium text-background transition-colors hover:bg-transparent hover:text-foreground"
        >
          Escuchar el podcast
        </a>
      </section>

      {/* Podcast */}
      <section id="podcast" className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-3xl font-bold tracking-tight">Podcast</h2>
        <p className="mt-2 text-muted">
          Escucha los últimos episodios en Spotify.
        </p>
        <div className="mt-8">
          <iframe
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/show/2ERQlZQycD77mt8rVM0Be5?utm_source=generator&theme=0"
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Podcast Player"
          />
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-3xl font-bold tracking-tight">Blog</h2>
        <p className="mt-2 text-muted">
          Reflexiones sobre autenticidad y crecimiento personal.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block border border-border p-6 transition-colors hover:border-foreground"
            >
              <time className="text-sm text-muted">{post.date}</time>
              <h3 className="mt-2 text-xl font-semibold tracking-tight group-hover:underline">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="mx-auto max-w-5xl px-6 py-16">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">Newsletter</h2>
          <p className="mt-2 text-muted">
            Recibe ideas y reflexiones directamente en tu bandeja de entrada.
          </p>
          <form
            action="https://assets.mailerlite.com/jsonp/1149338/forms/135498912498498498/subscribe"
            method="post"
            className="mt-8 flex gap-3"
          >
            <input
              type="email"
              name="fields[email]"
              placeholder="tu@email.com"
              required
              className="flex-1 border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted focus:border-foreground"
            />
            <button
              type="submit"
              className="rounded-full border border-foreground bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-transparent hover:text-foreground"
            >
              Suscribirme
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-12 sm:flex-row sm:justify-between">
          <div className="flex gap-6 text-sm text-muted">
            <a
              href="https://instagram.com/setumismo"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Instagram
            </a>
            <a
              href="https://youtube.com/@setumismo"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              YouTube
            </a>
            <a
              href="https://tiktok.com/@setumismo"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              TikTok
            </a>
            <a
              href="https://open.spotify.com/show/2ERQlZQycD77mt8rVM0Be5"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Spotify
            </a>
          </div>
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} Cómo Ser Tú Mismo. Todos los
            derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
