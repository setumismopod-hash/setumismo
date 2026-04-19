import type { Metadata } from "next";
import HeroSection from "./components/HeroSection";
import PodcastSection from "./components/PodcastSection";
import EpisodesCarousel from "./components/EpisodesCarousel";
import AboutSection from "./components/AboutSection";
import NewsletterSection from "./components/NewsletterSection";
import ScrollReveal from "./components/ScrollReveal";
import { getLatestEpisodes } from "@/lib/blog";

const SITE_URL = "https://comosertumismo.com";

export const metadata: Metadata = {
  title: "Sé Tú Mismo — Podcast de crecimiento personal y autenticidad",
  description:
    "Podcast y blog de Gaxpar Uriarte sobre crecimiento personal, autoconocimiento y cómo vivir una vida más auténtica e intencional.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Sé Tú Mismo — Podcast de crecimiento personal",
    description:
      "Episodios, reflexiones y recursos sobre autenticidad, autoconocimiento y vida intencional.",
    url: "/",
    type: "website",
  },
};

export default function Home() {
  const episodes = getLatestEpisodes(4);

  const podcastSeriesSchema = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    name: "Sé Tú Mismo",
    description:
      "Podcast de Gaxpar Uriarte sobre crecimiento personal, autenticidad y vida intencional.",
    url: SITE_URL,
    image: `${SITE_URL}/podcast-cover.png`,
    inLanguage: "es",
    author: {
      "@type": "Person",
      name: "Gaxpar Uriarte",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sé Tú Mismo",
    url: SITE_URL,
    inLanguage: "es",
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(podcastSeriesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <ScrollReveal />
      <HeroSection />
      <PodcastSection />
      <EpisodesCarousel episodes={episodes} />
      <AboutSection />
      <NewsletterSection />
    </div>
  );
}
