import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coaching 1:1 con Gaxpar Uriarte",
  description:
    "Sesiones de coaching personal para soltar la presión, conectar contigo y vivir con más claridad. Trabaja conmigo de forma directa y privada.",
  alternates: { canonical: "/coaching" },
  openGraph: {
    title: "Coaching 1:1 con Gaxpar Uriarte",
    description:
      "Sesiones de coaching personal para soltar la presión y vivir con más claridad.",
    url: "/coaching",
    type: "website",
  },
};

export default function CoachingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
