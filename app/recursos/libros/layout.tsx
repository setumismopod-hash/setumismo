import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Libros recomendados",
  description:
    "Selección de libros sobre crecimiento personal, autoconocimiento, ontología y autenticidad recomendados por Gaxpar Uriarte.",
  alternates: { canonical: "/recursos/libros" },
  openGraph: {
    title: "Libros recomendados — Sé Tú Mismo",
    description:
      "Lecturas seleccionadas sobre crecimiento personal y autoconocimiento.",
    url: "/recursos/libros",
    type: "website",
  },
};

export default function LibrosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
