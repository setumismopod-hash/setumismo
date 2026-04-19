import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";

export const alt = "Sé Tú Mismo — Post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadSyne() {
  const css = await (
    await fetch(
      "https://fonts.googleapis.com/css2?family=Syne:wght@700&display=swap"
    )
  ).text();
  const url = css.match(/src: url\((https:\/\/[^)]+\.woff2?)\)/)?.[1];
  if (!url) return null;
  return await (await fetch(url)).arrayBuffer();
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const syneFont = await loadSyne();

  const dateStr = new Date(post.date + "T12:00:00").toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#f8f6f3",
          padding: "80px",
          position: "relative",
          fontFamily: "Syne, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "#c8b89a",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#666",
            fontSize: "26px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          <span>Sé Tú Mismo</span>
          <span style={{ color: "#c8b89a" }}>·</span>
          <span>Podcast</span>
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            marginTop: "40px",
          }}
        >
          <div
            style={{
              fontSize: post.title.length > 70 ? "62px" : "78px",
              fontWeight: 700,
              color: "#1a1a1a",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            {post.title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#666",
            fontSize: "26px",
          }}
        >
          <div style={{ display: "flex" }}>{dateStr}</div>
          <div style={{ display: "flex", color: "#1a1a1a" }}>
            comosertumismo.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: syneFont
        ? [{ name: "Syne", data: syneFont, style: "normal", weight: 700 }]
        : undefined,
    }
  );
}
