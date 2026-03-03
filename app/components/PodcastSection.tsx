export default function PodcastSection() {
  return (
    <section id="podcast" className="bg-surface py-24 animate-on-scroll">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-[280px_1fr] items-start">
          {/* Podcast cover */}
          <img
            src="/podcast-cover.png"
            alt="Sé Tú Mismo - El Podcast"
            className="aspect-square rounded-md object-cover"
          />

          <div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight section-heading">
              El Podcast
            </h2>
            <p className="mt-4 max-w-xl text-muted">
              Sé Tú Mismo es un podcast para los que están cansados de vivir en piloto automático y quieren salir de ahí. Cada episodio es una conversación honesta entre tú y yo sobre lo que vivimos a diario y cómo nuestra forma de ser crea la realidad que experimentamos (y qué podemos hacer al respecto). Es un espacio espontáneo, profundo y cercano donde compartimos herramientas concretas y puntos de vista que pueden, o no, serte útiles.
            </p>

            {/* Platform buttons */}
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="https://open.spotify.com/show/2ERQlZQycD77mt8rVM0Be5"
                target="_blank"
                rel="noopener noreferrer"
                className="platform-btn relative z-0 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                Spotify
              </a>
              <a
                href="https://podcasts.apple.com/us/podcast/se-tu-mismo/id1778049117"
                target="_blank"
                rel="noopener noreferrer"
                className="platform-btn relative z-0 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm"
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
                className="platform-btn relative z-0 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm"
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
  );
}
