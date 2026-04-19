import { getAllPosts, getPostBySlug } from "@/lib/blog";
import PodcastBanner from "@/app/components/PodcastBanner";
import type { Metadata } from "next";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const url = `/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: ["Gaxpar Uriarte"],
      siteName: "Sé Tú Mismo",
      locale: "es_ES",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

function injectBanner(html: string, banner: React.ReactNode) {
  // Split after the 2nd <h2> heading
  const h2Regex = /<h2[\s>]/g;
  let match;
  let count = 0;
  let splitIndex = -1;

  while ((match = h2Regex.exec(html)) !== null) {
    count++;
    if (count === 2) {
      splitIndex = match.index;
      break;
    }
  }

  if (splitIndex === -1) return { before: html, after: "" };

  return {
    before: html.slice(0, splitIndex),
    after: html.slice(splitIndex),
  };
}

const SITE_URL = "https://comosertumismo.com";

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const hasBanner = !!post.spotifyUrl;
  const { before, after } = hasBanner
    ? injectBanner(post.content, null)
    : { before: post.content, after: "" };

  const publishedIso = new Date(post.date + "T12:00:00Z").toISOString();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: publishedIso,
    dateModified: publishedIso,
    author: {
      "@type": "Person",
      name: "Gaxpar Uriarte",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Sé Tú Mismo",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/podcast-cover.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    image: `${SITE_URL}/podcast-cover.png`,
    inLanguage: "es",
  };

  const podcastEpisodeSchema = post.spotifyUrl
    ? {
        "@context": "https://schema.org",
        "@type": "PodcastEpisode",
        name: post.title,
        description: post.excerpt,
        datePublished: publishedIso,
        url: `${SITE_URL}/blog/${post.slug}`,
        associatedMedia: {
          "@type": "MediaObject",
          contentUrl: post.spotifyUrl,
        },
        partOfSeries: {
          "@type": "PodcastSeries",
          name: "Sé Tú Mismo",
          url: SITE_URL,
        },
      }
    : null;

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {podcastEpisodeSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(podcastEpisodeSchema) }}
        />
      )}
      <article className="mx-auto max-w-3xl px-6 py-16">
        <time className="text-sm text-muted">
          {new Date(post.date + "T12:00:00").toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          {post.title}
        </h1>
        <div className="prose prose-neutral mt-12 max-w-none">
          <div dangerouslySetInnerHTML={{ __html: before }} />
          {hasBanner && <PodcastBanner spotifyUrl={post.spotifyUrl!} />}
          {after && <div dangerouslySetInnerHTML={{ __html: after }} />}
        </div>
      </article>
    </div>
  );
}
