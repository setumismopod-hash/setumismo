import Link from "next/link";

export default function AboutSection() {
  return (
    <section id="sobre" className="bg-surface text-foreground py-24 animate-on-scroll">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          {/* Photo */}
          <img
            src="/foto-gax.jpg"
            alt="Gaxpar"
            className="aspect-square rounded-md object-cover"
          />

          {/* Text */}
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight section-heading">
              Sobre Gaxpar
            </h2>
            <p className="mt-6 text-muted leading-relaxed">
              Desde chico me sentí llamado a hacer las cosas de manera diferente. Dejar carreras, cambiar de rumbo, irme lejos, volver. Nunca me consideré un rebelde, sino alguien dejándose llevar por la necesidad de vivir una vida que tuviera sentido para mí y no dejarme arrastrar por la que &quot;me tocó&quot;. Desde siempre tuve una inquietud espiritual por explorar la vida desde otros ojos, y en ese camino me encontré con el autoconocimiento, donde hallé respuestas a preguntas que incesantemente buscaba afuera. Hoy estoy convencido de que todos tenemos una verdad dentro que vale la pena descubrir.
            </p>
            <p className="mt-4 text-muted leading-relaxed">
              A eso me dedico: acompañar a personas a cambiar la forma en que perciben y crean su realidad para que puedan vivir una vida alineada con quienes realmente son. A través de Sé Tú Mismo, el coaching y el contenido que creo, busco abrir espacios de conversación profundos que inspiren a mirarnos con otros ojos y vivir desde un lugar más honesto con quienes somos.
            </p>
            <Link
              href="/contacto"
              className="mt-8 inline-block rounded-full bg-accent px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
            >
              Trabaja conmigo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
