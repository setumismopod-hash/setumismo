"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactoPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-bold tracking-tight">
            Sé Tú Mismo
          </Link>
          <Link
            href="/"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            Volver al inicio
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-xl px-6 py-24">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight">
          Trabaja conmigo
        </h1>
        <p className="mt-4 text-muted">
          Si sientes que es momento de hacer un cambio, escríbeme.
          Cuéntame un poco sobre ti y lo que estás buscando.
        </p>

        {submitted ? (
          <div className="mt-12 rounded-md border border-border p-8 text-center">
            <p className="text-lg font-semibold">Mensaje enviado</p>
            <p className="mt-2 text-muted">
              Gracias por escribirme. Te respondo lo antes posible.
            </p>
          </div>
        ) : (
          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            onSubmit={() => {
              setTimeout(() => setSubmitted(true), 100);
            }}
            className="mt-12 flex flex-col gap-6"
          >
            {/* TODO: Reemplazar con tu access key de https://web3forms.com */}
            <input
              type="hidden"
              name="access_key"
              value="0750786b-5250-4235-9362-e8e7f069e01c"
            />
            <input type="hidden" name="subject" value="Nuevo mensaje desde Sé Tú Mismo" />

            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-2 w-full border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted focus:border-foreground"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-2 w-full border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted focus:border-foreground"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="mt-2 w-full border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted focus:border-foreground resize-none"
                placeholder="Cuéntame qué estás buscando..."
              />
            </div>

            <button
              type="submit"
              className="self-start rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
            >
              Enviar mensaje
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
