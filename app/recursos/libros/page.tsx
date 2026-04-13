"use client";

import { useState } from "react";

const ALL_BOOKS = [
  { title: "No eres una piedra", author: "Mark Freeman" },
  { title: "El arte de la contemplación", author: "Richard Rudd" },
  { title: "El hombre en busca de sentido", author: "Viktor Frankl" },
  { title: "La validez eterna del alma", author: "Jane Roberts" },
  { title: "La naturaleza de la realidad personal", author: "Jane Roberts" },
  { title: "El método Silva de control mental", author: "José Silva" },
  { title: "El héroe de las mil caras", author: "Joseph Campbell" },
  {
    title: "Las cinco heridas que impiden ser uno mismo",
    author: "Lise Bourbeau",
  },
  { title: "Psico-cibernética", author: "Maxwell Maltz" },
  { title: "La liberación del alma", author: "Michael A. Singer" },
  { title: "El proceso de la culminación", author: "Teal Swan" },
  {
    title: "Transurfing de la realidad: El espacio de las variantes",
    author: "Vadim Zeland",
  },
  {
    title: "Transurfing de la realidad: El susurro de las estrellas de la madrugada",
    author: "Vadim Zeland",
  },
  { title: "Aquí y ahora", author: "Ram Dass" },
  { title: "El acto creativo", author: "Rick Rubin" },
  { title: "El camino del artista", author: "Julia Cameron" },
  { title: "El poder del ahora", author: "Eckhart Tolle" },
  { title: "El monje que vendió su Ferrari", author: "Robin Sharma" },
  { title: "Los secretos de la mente millonaria", author: "T. Harv Eker" },
  { title: "La semana laboral de 4 horas", author: "Timothy Ferriss" },
  { title: "El milagro metabólico", author: "Carlos Jaramillo" },
  { title: "Padre rico, padre pobre", author: "Robert T. Kiyosaki" },
];

const DRIVE_LINK =
  "https://docs.google.com/document/d/1SQcul45AHW0BBsJ-uKjsp_7MgZUqtLO408niQfSHS9E/edit?usp=drive_link";

export default function LibrosPage() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/mailerlite-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("subscribe failed");
      setSubscribed(true);
    } catch {
      // Show the list anyway so the user isn't blocked from the resource
      setSubscribed(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <main className="mx-auto max-w-2xl px-6 py-24">
        {/* Header */}
        <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold tracking-tight">
          Mi selección de libros
        </h1>
        <p className="mt-6 text-muted leading-relaxed">
          Estos son libros que he leído en los últimos años y que me han
          gustado o han sido un aporte para mi desarrollo. Algunos tuvieron
          un impacto directo en la forma que tengo de ver las cosas. Hay de
          todo: creatividad, espiritualidad, nutrición, dinero, filosofía.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          En la lista encontrarás los 22 títulos en PDF gratis, y links de
          compra en caso de que prefieras tenerlos en físico.
        </p>

        {!subscribed && (
          <>
            {/* Newsletter form */}
            <div className="mt-12 rounded-xl border border-border p-8">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight">
                Accede a la lista completa
              </h2>
              <p className="mt-3 text-sm text-muted">
                Suscríbete y recibe acceso inmediato a los 22 libros que
                recomiendo, más ideas y reflexiones para vivir con más
                intención.
              </p>
              <form onSubmit={handleSubmit} className="mt-6 flex gap-3">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="flex-1 rounded-xl border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted focus:border-foreground"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-50"
                >
                  {submitting ? "..." : "Suscribirme"}
                </button>
              </form>
            </div>
          </>
        )}

        {/* Full list (after subscription) */}
        {subscribed && (
          <div className="mt-12">
            <div className="mb-8 rounded-xl border border-accent/50 bg-accent/5 p-6">
              <p className="text-sm font-medium">
                Gracias por suscribirte. Aquí tienes la lista completa.
              </p>
              <a
                href={DRIVE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
              >
                Abrir lista en Google Drive
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </a>
            </div>

            <p className="text-xs uppercase tracking-widest text-muted mb-6">
              22 libros recomendados
            </p>
            <div className="space-y-4">
              {ALL_BOOKS.map((book, i) => (
                <div
                  key={`${book.title}-${i}`}
                  className="flex items-baseline gap-3 border-b border-border pb-4"
                >
                  <span className="text-xs text-accent font-semibold tabular-nums w-6">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium">{book.title}</span>
                  <span className="text-xs text-muted">— {book.author}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
