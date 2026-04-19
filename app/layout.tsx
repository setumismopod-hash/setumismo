import type { Metadata } from "next";
import { DM_Sans, DM_Mono, Syne } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import LayoutShell from "./components/LayoutShell";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://comosertumismo.com"),
  title: {
    default: "Sé Tú Mismo — Podcast & Blog de Gaxpar Uriarte",
    template: "%s — Sé Tú Mismo",
  },
  description:
    "Podcast y blog de Gaxpar Uriarte sobre crecimiento personal, autenticidad y vida intencional. Episodios, reflexiones y recursos para ser tú mismo.",
  applicationName: "Sé Tú Mismo",
  authors: [{ name: "Gaxpar Uriarte" }],
  creator: "Gaxpar Uriarte",
  publisher: "Sé Tú Mismo",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://comosertumismo.com",
    siteName: "Sé Tú Mismo",
    title: "Sé Tú Mismo — Podcast & Blog de Gaxpar Uriarte",
    description:
      "Podcast y blog sobre crecimiento personal, autenticidad y vida intencional.",
    images: [
      {
        url: "/podcast-cover.png",
        width: 1200,
        height: 1200,
        alt: "Sé Tú Mismo — Podcast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sé Tú Mismo — Podcast & Blog",
    description:
      "Crecimiento personal, autenticidad y vida intencional con Gaxpar Uriarte.",
    images: ["/podcast-cover.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${dmSans.variable} ${syne.variable} ${dmMono.variable} antialiased`}>
        <LayoutShell>{children}</LayoutShell>
        <Analytics />
      </body>
    </html>
  );
}
