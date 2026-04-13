"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import type { Post } from "@/lib/blog";

export default function EpisodesCarousel({ episodes }: { episodes: Post[] }) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftVal = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const slider = sliderRef.current;
    if (!slider) return;
    isDragging.current = true;
    slider.style.cursor = "grabbing";
    startX.current = e.pageX - slider.offsetLeft;
    scrollLeftVal.current = slider.scrollLeft;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const slider = sliderRef.current;
    if (!slider) return;
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    slider.scrollLeft = scrollLeftVal.current - walk;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    if (sliderRef.current) sliderRef.current.style.cursor = "grab";
  }, []);

  if (episodes.length === 0) return null;

  return (
    <section className="bg-background text-foreground py-24 animate-on-scroll">
      <div className="mx-auto max-w-6xl px-6 flex items-end justify-between gap-6">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight section-heading">
            Blog
          </h2>
          <p className="mt-3 text-sm text-muted">
            La versión escrita de cada episodio.
          </p>
        </div>
        <Link
          href="/blog"
          className="hidden sm:inline-block text-xs uppercase tracking-widest text-muted transition-colors hover:text-foreground whitespace-nowrap"
        >
          Ver todos →
        </Link>
      </div>
      <div className="mt-10 mx-auto max-w-6xl px-6">
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="grid grid-cols-2 gap-6 md:grid-cols-4 max-md:flex max-md:overflow-x-scroll max-md:pb-4 max-md:custom-scrollbar max-md:snap-x max-md:snap-mandatory max-md:cursor-grab max-md:select-none"
        >
          {episodes.map((episode) => (
            <Link
              key={episode.slug}
              href={`/blog/${episode.slug}`}
              className="episode-card group flex flex-col rounded-xl border border-border p-6 hover:border-foreground max-md:flex-none max-md:w-72 max-md:snap-start"
            >
              <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-accent">
                Ep. {episode.episodeNumber}
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-semibold leading-snug line-clamp-3 group-hover:text-accent transition-colors">
                {episode.title}
              </h3>
              <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-2 flex-1">
                {episode.excerpt}
              </p>
              <span className="mt-6 text-[11px] uppercase tracking-widest text-muted group-hover:text-foreground transition-colors">
                Leer →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
