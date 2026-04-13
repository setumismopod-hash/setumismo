"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [recursosOpen, setRecursosOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navBackground = isHome
    ? scrolled
      ? "bg-background/80 backdrop-blur-md border-b border-border"
      : "bg-transparent"
    : "bg-background/80 backdrop-blur-md border-b border-border";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBackground}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-4">
        {/* Desktop nav */}
        <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest text-muted">
          <Link href="/" className={`nav-link transition-colors hover:text-accent ${pathname === "/" ? "text-foreground" : ""}`}>
            Home
          </Link>
          <Link href="/#podcast" className="nav-link transition-colors hover:text-accent">
            Podcast
          </Link>
          <Link href="/blog" className={`nav-link transition-colors hover:text-accent ${pathname.startsWith("/blog") ? "text-foreground" : ""}`}>
            Blog
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setRecursosOpen(true)}
            onMouseLeave={() => setRecursosOpen(false)}
          >
            <button className={`nav-link transition-colors hover:text-accent uppercase tracking-widest text-xs ${pathname.startsWith("/recursos") ? "text-foreground" : ""}`}>
              Recursos
            </button>
            {recursosOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                <div className="bg-background/95 backdrop-blur-md border border-border rounded-md py-2 min-w-[220px]">
                  <Link
                    href="/recursos/libros"
                    className="block px-4 py-2 text-xs normal-case tracking-normal text-muted transition-colors hover:text-foreground hover:bg-border/30"
                  >
                    Lista de libros
                  </Link>
                  <Link
                    href="/recursos/modelo-osar"
                    className="block px-4 py-2 text-xs normal-case tracking-normal text-muted transition-colors hover:text-foreground hover:bg-border/30"
                  >
                    Modelo OSAR
                  </Link>
                  <Link
                    href="/recursos/preguntas-coaching"
                    className="block px-4 py-2 text-xs normal-case tracking-normal text-muted transition-colors hover:text-foreground hover:bg-border/30"
                  >
                    Preguntas de coaching
                  </Link>
                </div>
              </div>
            )}
          </div>
          <Link href="/coaching" className={`nav-link transition-colors hover:text-accent ${pathname.startsWith("/coaching") ? "text-foreground" : ""}`}>
            Coaching
          </Link>
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
            <Link
              href="/"
              className="transition-colors hover:text-foreground"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/#podcast"
              className="transition-colors hover:text-foreground"
              onClick={() => setMenuOpen(false)}
            >
              Podcast
            </Link>
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
                <Link
                  href="/recursos/libros"
                  className="text-xs normal-case tracking-normal transition-colors hover:text-foreground"
                  onClick={() => setMenuOpen(false)}
                >
                  Lista de libros
                </Link>
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
            <Link
              href="/coaching"
              className="transition-colors hover:text-foreground"
              onClick={() => setMenuOpen(false)}
            >
              Coaching
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
