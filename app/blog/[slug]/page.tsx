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
  return {
    title: `${post.title} — Sé Tú Mismo`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
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

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const hasBanner = !!post.spotifyUrl;
  const { before, after } = hasBanner
    ? injectBanner(post.content, null)
    : { before: post.content, after: "" };

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
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
