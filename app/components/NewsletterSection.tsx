"use client";

import { useState } from "react";

export default function NewsletterSection() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get("email");

    try {
      const res = await fetch("/api/mailerlite-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("subscribe failed");
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="newsletter" className="bg-background text-foreground py-24 animate-on-scroll">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight section-heading section-heading-center">
            Recibe ideas que importan
          </h2>
          <p className="mt-4 text-muted">
            Ideas, reflexiones y herramientas para vivir con más intención.
            Directo a tu bandeja.
          </p>

          {submitted ? (
            <div className="mt-8 newsletter-success-enter">
              <p className="text-lg font-semibold">Gracias por suscribirte</p>
              <p className="mt-2 text-muted">
                Pronto recibirás ideas que importan en tu bandeja.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex gap-3">
              <input
                type="email"
                name="email"
                placeholder="tu@email.com"
                required
                className="flex-1 border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted focus:border-foreground"
              />
              <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-50"
              >
                {submitting ? "..." : "Suscribirme"}
              </button>
            </form>
          )}
          {error && (
            <p className="mt-4 text-sm text-red-600">
              Hubo un error. Intenta de nuevo en un momento.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
