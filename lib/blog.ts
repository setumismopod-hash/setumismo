import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "src/content/blog");

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  spotifyUrl?: string;
  episodeNumber?: number;
  cover?: string;
  content?: string;
}

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const filePath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug: data.slug || fileName.replace(/\.md$/, ""),
        title: data.title,
        date: String(data.date),
        excerpt: data.excerpt,
        spotifyUrl: data.spotifyUrl,
        episodeNumber: data.episodeNumber,
        cover: data.cover,
      };
    });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getLatestEpisodes(limit = 4): Post[] {
  return getAllPosts()
    .filter((p) => typeof p.episodeNumber === "number" && p.spotifyUrl)
    .sort((a, b) => (b.episodeNumber ?? 0) - (a.episodeNumber ?? 0))
    .slice(0, limit);
}

export async function getPostBySlug(
  slug: string
): Promise<Post & { content: string; spotifyUrl?: string }> {
  // Find the file that contains this slug — either by filename or frontmatter slug
  const fileNames = fs.readdirSync(postsDirectory).filter((name) => name.endsWith(".md"));
  let filePath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    const match = fileNames.find((fileName) => {
      const raw = fs.readFileSync(path.join(postsDirectory, fileName), "utf8");
      const { data } = matter(raw);
      return data.slug === slug;
    });
    if (!match) throw new Error(`Post not found: ${slug}`);
    filePath = path.join(postsDirectory, match);
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(content);

  // Open all external links in a new tab
  const htmlContent = processedContent
    .toString()
    .replace(/<a href="(https?:\/\/[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener noreferrer"');

  return {
    slug: data.slug || slug,
    title: data.title,
    date: String(data.date),
    excerpt: data.excerpt,
    spotifyUrl: data.spotifyUrl,
    content: htmlContent,
  };
}
