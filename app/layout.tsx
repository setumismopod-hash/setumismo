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
  title: "Sé Tú Mismo — Podcast & Blog",
  description:
    "Un espacio para explorar el crecimiento personal, la autenticidad y el poder de ser tú mismo.",
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
