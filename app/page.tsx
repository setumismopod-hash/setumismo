"use client";

import { useEffect } from "react";
import HeroSection from "./components/HeroSection";
import PodcastSection from "./components/PodcastSection";
import EpisodesCarousel from "./components/EpisodesCarousel";
import AboutSection from "./components/AboutSection";
import NewsletterSection from "./components/NewsletterSection";

export default function Home() {
  useEffect(() => {
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

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <PodcastSection />
      <EpisodesCarousel />
      <AboutSection />
      <NewsletterSection />
    </div>
  );
}
