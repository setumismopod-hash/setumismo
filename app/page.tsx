import HeroSection from "./components/HeroSection";
import PodcastSection from "./components/PodcastSection";
import EpisodesCarousel from "./components/EpisodesCarousel";
import AboutSection from "./components/AboutSection";
import NewsletterSection from "./components/NewsletterSection";
import ScrollReveal from "./components/ScrollReveal";
import { getLatestEpisodes } from "@/lib/blog";

export default function Home() {
  const episodes = getLatestEpisodes(4);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollReveal />
      <HeroSection />
      <PodcastSection />
      <EpisodesCarousel episodes={episodes} />
      <AboutSection />
      <NewsletterSection />
    </div>
  );
}
