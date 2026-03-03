"use client";

import { useRef, useCallback } from "react";

const episodes = [
  {
    title: "Tus hábitos no cambian porque no quieres dejar de ser tú",
    ep: "Ep. 127",
    url: "https://open.spotify.com/episode/0RvdZxwCiDvXkz7qjvEXQ0?si=SsqpC9u4QPWI5vz52si6dQ",
    cover: "/ep-127.jpg",
  },
  {
    title: "Respira y sigue: el arte de no engancharte con la mente",
    ep: "Ep. 114",
    url: "https://open.spotify.com/episode/6CijSIiPhsJlw9tRp2OBpa?si=VRHvClu-RfKFzvji8MBdlw",
    cover: "/ep-114.jpg",
  },
  {
    title: "El poder de actuar diferente (aunque incomode)",
    ep: "Ep. 109",
    url: "https://open.spotify.com/episode/6qRWddbPh8rAbESg91YNN5?si=pC6b72QORL60x5ICHIyiQg",
    cover: "/ep-109.jpg",
  },
  {
    title: "Cómo encontrarte a ti mismo en el caos",
    ep: "Ep. 52",
    url: "https://open.spotify.com/episode/2KAsCTXaJHf6QK8o1GpqK4?si=YuoGQvqBRWuAs-Jf437P3Q",
    cover: "/ep-52.jpg",
  },
];

export default function EpisodesCarousel() {
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

  return (
    <section className="bg-background text-foreground py-24 animate-on-scroll">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight section-heading">
          Capítulos
        </h2>
      </div>
      <div className="mt-10 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6">
          <div
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="flex gap-6 overflow-x-scroll pb-4 scrollbar-hide snap-x snap-mandatory -mr-6 cursor-grab select-none"
          >
            {episodes.map((episode) => (
              <a
                key={episode.ep}
                href={episode.url}
                target="_blank"
                rel="noopener noreferrer"
                className="episode-card group flex-none w-72 border border-border p-4 hover:border-foreground snap-start"
              >
                <div className="aspect-video bg-border/30 flex items-center justify-center">
                  <img
                    src={episode.cover}
                    alt={episode.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="mt-3 block text-xs text-muted">{episode.ep}</span>
                <h3 className="mt-1 text-sm font-semibold group-hover:text-accent transition-colors">
                  {episode.title}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
