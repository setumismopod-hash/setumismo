export default function Footer() {
  return (
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
  );
}
