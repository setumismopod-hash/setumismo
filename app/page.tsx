"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [recursosOpen, setRecursosOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Scroll detection for navbar
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    // IntersectionObserver for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-4">
          {/* Desktop nav */}
          <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest text-muted">
            <a href="#" className="transition-colors hover:text-foreground">
              Home
            </a>
            <a href="#podcast" className="transition-colors hover:text-foreground">
              Podcast
            </a>
            <Link href="/blog" className="transition-colors hover:text-foreground">
              Blog
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setRecursosOpen(true)}
              onMouseLeave={() => setRecursosOpen(false)}
            >
              <button className="transition-colors hover:text-foreground uppercase tracking-widest text-xs">
                Recursos
              </button>
              {recursosOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                  <div className="bg-background/95 backdrop-blur-md border border-border rounded-md py-2 min-w-[200px]">
                    <a
                      href="#"
                      className="block px-4 py-2 text-xs normal-case tracking-normal text-muted transition-colors hover:text-foreground hover:bg-border/30"
                    >
                      Lista de libros
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-xs normal-case tracking-normal text-muted transition-colors hover:text-foreground hover:bg-border/30"
                    >
                      Guía de hábitos
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-xs normal-case tracking-normal text-muted transition-colors hover:text-foreground hover:bg-border/30"
                    >
                      Prompts autoconocimiento
                    </a>
                  </div>
                </div>
              )}
            </div>
            <a href="#newsletter" className="transition-colors hover:text-foreground">
              Contacto
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 ml-auto"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 bg-foreground transition-transform duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-foreground transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-foreground transition-transform duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border px-6 pb-6">
            <div className="flex flex-col gap-4 text-sm uppercase tracking-widest text-muted">
              <a
                href="#"
                className="transition-colors hover:text-foreground"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#podcast"
                className="transition-colors hover:text-foreground"
                onClick={() => setMenuOpen(false)}
              >
                Podcast
              </a>
              <Link
                href="/blog"
                className="transition-colors hover:text-foreground"
                onClick={() => setMenuOpen(false)}
              >
                Blog
              </Link>
              <div>
                <span className="text-foreground">Recursos</span>
                <div className="mt-2 flex flex-col gap-2 pl-4">
                  <a
                    href="#"
                    className="text-xs normal-case tracking-normal transition-colors hover:text-foreground"
                    onClick={() => setMenuOpen(false)}
                  >
                    Lista de libros
                  </a>
                  <a
                    href="#"
                    className="text-xs normal-case tracking-normal transition-colors hover:text-foreground"
                    onClick={() => setMenuOpen(false)}
                  >
                    Guía de hábitos
                  </a>
                  <a
                    href="#"
                    className="text-xs normal-case tracking-normal transition-colors hover:text-foreground"
                    onClick={() => setMenuOpen(false)}
                  >
                    Prompts autoconocimiento
                  </a>
                </div>
              </div>
              <a
                href="#newsletter"
                className="transition-colors hover:text-foreground"
                onClick={() => setMenuOpen(false)}
              >
                Contacto
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero (100vh) */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
        {/* Background gradient — prepared for <video> replacement */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1a1a1a_0%,_#0a0a0a_70%)]" />

        {/* [PLACEHOLDER] SVG overlay de dibujos a mano */}
        <div className="absolute inset-0" />

        {/* Hero content */}
        <div className="relative z-10 text-center px-6">
          <h1 className="font-[family-name:var(--font-display)] text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight uppercase">
            Sé Tú Mismo
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-lg text-muted">
            Un espacio para vivir la vida que quieres.
          </p>
        </div>

        {/* Credit */}
        <span className="absolute bottom-8 right-16 text-sm italic text-muted z-10">
          con Gaxpar
        </span>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-muted to-transparent animate-pulse" />
        </div>
      </section>

      {/* Podcast */}
      <section id="podcast" className="bg-background py-24 animate-on-scroll">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 md:grid-cols-[280px_1fr] items-start">
            {/* Podcast cover */}
            <div className="aspect-square bg-border/30 rounded-md flex items-center justify-center text-sm text-muted">
              [PLACEHOLDER] Portada del Podcast
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight">
                El Podcast
              </h2>
              <p className="mt-4 max-w-xl text-muted">
                [PLACEHOLDER] Descripción del podcast...
              </p>

              {/* Platform buttons */}
              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href="https://open.spotify.com/show/2ERQlZQycD77mt8rVM0Be5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm transition-colors hover:border-foreground"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                  Spotify
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm transition-colors hover:border-foreground"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.09 13.38c.02-3.19 2.6-4.72 2.72-4.79-1.48-2.17-3.79-2.47-4.62-2.5-1.96-.2-3.84 1.16-4.84 1.16-1 0-2.55-1.13-4.19-1.1-2.15.03-4.14 1.25-5.25 3.18-2.24 3.89-.57 9.65 1.61 12.81 1.07 1.55 2.34 3.29 4.01 3.23 1.61-.06 2.22-1.04 4.17-1.04s2.49 1.04 4.2 1.01c1.73-.03 2.82-1.58 3.88-3.14 1.22-1.8 1.73-3.54 1.76-3.63-.04-.02-3.37-1.3-3.41-5.14zM14.88 3.55c.89-1.08 1.49-2.57 1.32-4.07-1.28.05-2.83.85-3.75 1.93-.82.95-1.54 2.48-1.35 3.94 1.43.11 2.89-.73 3.78-1.8z" />
                  </svg>
                  Apple Podcasts
                </a>
                <a
                  href="https://www.youtube.com/@Setumismo.elpodcast"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm transition-colors hover:border-foreground"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Capítulos — white */}
      <section className="bg-[#f5f5f0] text-[#0a0a0a] py-24 animate-on-scroll">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight">
            Capítulos
          </h2>
        </div>
        <div className="mt-10 overflow-hidden">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex gap-6 overflow-x-scroll pb-4 scrollbar-hide snap-x snap-mandatory -mr-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="group flex-none w-72 border border-[#d4d4d0] p-4 transition-colors hover:border-[#999] snap-start"
                >
                  <div className="aspect-video bg-[#d4d4d0] flex items-center justify-center text-sm text-[#666]">
                    [PLACEHOLDER] Miniatura Ep. {i}
                  </div>
                  <h3 className="mt-3 text-sm font-semibold">
                    [PLACEHOLDER] Título del Episodio {i}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Gaxpar */}
      <section id="sobre" className="bg-background text-foreground py-24 animate-on-scroll">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            {/* Photo placeholder */}
            <div className="aspect-square bg-border/30 flex items-center justify-center text-sm text-muted">
              [PLACEHOLDER] Foto
            </div>

            {/* Text */}
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight">
                Sobre Gaxpar
              </h2>
              <p className="mt-6 text-muted leading-relaxed">
                [PLACEHOLDER] Primer párrafo de bio. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.
              </p>
              <p className="mt-4 text-muted leading-relaxed">
                [PLACEHOLDER] Segundo párrafo de bio. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
              </p>
              <a
                href="#newsletter"
                className="mt-8 inline-block rounded-full bg-accent px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
              >
                Trabaja conmigo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="bg-[#f5f5f0] text-[#0a0a0a] py-24 animate-on-scroll">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight">
              Recibe ideas que importan
            </h2>
            <p className="mt-4 text-[#555]">
              Ideas, reflexiones y herramientas para vivir con más intención.
              Directo a tu bandeja.
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
                className="flex-1 border border-[#ccc] bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-[#999] focus:border-[#0a0a0a]"
              />
              <button
                type="submit"
                className="rounded-full bg-[#0a0a0a] px-6 py-3 text-sm font-medium text-[#f5f5f0] transition-opacity hover:opacity-80"
              >
                Suscribirme
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-12 sm:flex-row sm:justify-between">
          <div className="flex gap-6 text-sm text-muted">
            <a
              href="https://www.instagram.com/comosertumismo"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Instagram
            </a>
            <a
              href="https://www.youtube.com/@Setumismo.elpodcast"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              YouTube
            </a>
            <a
              href="https://www.tiktok.com/@comosertumismo"
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
