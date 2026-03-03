"use client";

import { useEffect, useRef, useState } from "react";

const heroVideos = ["/hero-1.mp4", "/hero-2.mp4"];

export default function HeroSection() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Video slideshow: play/pause based on current index
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === currentVideo) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [currentVideo]);

  // Rotate every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % heroVideos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Parallax on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (heroBgRef.current) {
        heroBgRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Video slideshow background */}
      <div ref={heroBgRef} className="absolute inset-0 will-change-transform">
        {heroVideos.map((src, i) => (
          <video
            key={src}
            ref={(el) => { videoRefs.current[i] = el; }}
            src={src}
            muted
            playsInline
            preload="auto"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              i === currentVideo ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Hero content */}
      <div className="relative z-10 text-left px-6 sm:px-16 text-white max-w-6xl w-full">
        <h1 className="hero-stagger-1 font-[family-name:var(--font-display)] text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight uppercase">
          Sé Tú Mismo
        </h1>
        <p className="hero-stagger-2 mt-6 max-w-lg text-lg text-white/70">
          Un espacio para vivir la vida que quieres.
        </p>
        <a
          href="#podcast"
          className="hero-stagger-3 mt-8 inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
        >
          Escucha el podcast
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>

      {/* Credit */}
      <span className="absolute bottom-8 right-16 text-sm italic text-white/70 z-10">
        con Gaxpar
      </span>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="scroll-indicator w-px h-12 bg-gradient-to-b from-transparent via-white/60 to-transparent" />
      </div>
    </section>
  );
}
