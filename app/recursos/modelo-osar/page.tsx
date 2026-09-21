import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "La Estructura Detrás de tus Patrones",
  description:
    "¿Por qué te esfuerzas y sigues en el mismo lugar? Descubre el Modelo OSAR y entiende qué hay detrás de tus resultados.",
  alternates: { canonical: "/recursos/modelo-osar" },
};

const checklist = [
  "¿Los resultados que tengo en mi situación son insatisfactorios?",
  "¿Mis respuestas son una elección real o un modo automático?",
  "¿He intentado cambiar lo que hago y sigo cayendo en lo mismo?",
  "¿Puedo identificar qué creencia o patrón está eligiendo por mí?",
];

export default function ModeloOsarPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-[640px] mx-auto px-5 py-16 md:py-24">
        {/* Header */}
        <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-muted mb-3">
          Recurso gratuito
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-[32px] md:text-[40px] font-normal text-foreground leading-tight mb-4">
          La estructura detrás de tus patrones
        </h1>
        <p className="text-[21px] text-muted leading-relaxed mb-12">
          ¿Por qué te esfuerzas y sigues en el mismo lugar?
        </p>

        {/* Intro text */}
        <div className="text-[15px] text-foreground/85 leading-relaxed space-y-5 mb-12">
          <p>
            Intentaste hacer las cosas distinto. Cambiaste la rutina, la
            estrategia, la conversación. Y por un rato funcionó. Pero después
            volviste al mismo lugar.
          </p>
          <p>
            ¿Hiciste algo mal o el problema era más profundo? No es lo que haces
            sino desde dónde haces lo que haces.
          </p>
        </div>

        {/* Diagram */}
        <div className="rounded-xl border border-border p-6 mb-12">
          <Image
            src="/modelo-osar.png"
            alt="Diagrama del Modelo OSAR: Observador, Sistema, Acción, Resultado con loops de aprendizaje de primer orden y aprendizaje transformacional"
            width={800}
            height={450}
            className="w-full h-auto"
          />
        </div>

        {/* OSAR breakdown */}
        <div className="space-y-6 mb-12">
          <div className="flex gap-4 items-start">
            <span className="font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground shrink-0 w-8">
              O
            </span>
            <div>
              <p className="font-medium text-foreground">Tu lente</p>
              <p className="text-sm text-muted">Filtra lo que ves.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground shrink-0 w-8">
              S
            </span>
            <div>
              <p className="font-medium text-foreground">El sistema</p>
              <p className="text-sm text-muted">
                Condiciona dónde estás parado.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground shrink-0 w-8">
              A
            </span>
            <div>
              <p className="font-medium text-foreground">Tu acción</p>
              <p className="text-sm text-muted">Es lo que haces desde ahí.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground shrink-0 w-8">
              R
            </span>
            <div>
              <p className="font-medium text-foreground">El resultado</p>
              <p className="text-sm text-muted">Es lo que obtienes.</p>
            </div>
          </div>
        </div>

        {/* Key insight */}
        <div className="text-[15px] text-foreground/85 leading-relaxed space-y-5 mb-12">
          <p>
            Cuando el resultado se repite, la mayoría intenta cambiar la acción.
            Y a veces eso es suficiente. Pero cuando no alcanza, el tema está
            más atrás: en el observador que elige esa acción o que reconoce el
            problema como problema.
          </p>
        </div>

        {/* Self-diagnosis */}
        <div className="rounded-xl bg-surface p-8 mb-12">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-medium mb-6">
            Autodiagnóstico
          </h2>
          <div className="space-y-4">
            {checklist.map((item, i) => (
              <label
                key={i}
                className="flex items-start gap-3 text-[15px] text-foreground/85 leading-relaxed cursor-default"
              >
                <span className="w-5 h-5 shrink-0 rounded border border-border mt-0.5" />
                {item}
              </label>
            ))}
          </div>
          <p className="text-sm text-muted mt-6 italic">
            Si marcaste más de una, probablemente es momento de buscar más en
            profundidad.
          </p>
        </div>

        {/* Closing */}
        <div className="text-[15px] text-foreground/85 leading-relaxed space-y-5 mb-12">
          <p className="font-medium text-foreground">
            El modelo te muestra dónde estás.
          </p>
          <p>
            Pero ver el patrón no es lo mismo que salir de él. Para eso
            necesitas a alguien que te haga las preguntas que no te estás
            haciendo.
          </p>
          <p>
            Cambiar al observador abre acciones que antes ni existían como
            opción. Y a veces, el resultado que querías cambiar deja de ser un
            problema porque tú ya no eres el mismo.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <a
            href="/downloads/Modelo%20Osar.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
          >
            Descargar PDF
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </a>
        </div>

        {/* Footer */}
        <p className="font-[family-name:var(--font-mono)] text-[11px] text-muted/50 tracking-[0.1em] mt-16">
          Cómo Ser Tú Mismo · comosertumismo.com · Basado en ontología del
          lenguaje — Rafael Echeverría
        </p>
      </div>
    </div>
  );
}
