import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog — Sé Tú Mismo",
  description:
    "Reflexiones sobre autenticidad, crecimiento personal y el poder de ser tú mismo.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
        <p className="mt-2 text-muted">
          Reflexiones sobre autenticidad y crecimiento personal.
        </p>

        <div className="mt-12 flex flex-col gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block border-b border-border pb-8 last:border-0"
            >
              <time className="text-sm text-muted">{post.date}</time>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight group-hover:underline">
                {post.title}
              </h2>
              <p className="mt-2 text-muted">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
