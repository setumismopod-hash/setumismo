import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "5 Preguntas Antes de tu Sesion — Se Tu Mismo",
  description:
    "Un ejercicio breve de auto-observacion para prepararte antes de una sesion de coaching.",
};

const questions = [
  {
    q: "Describe un momento concreto de los ultimos dias donde esto que quieres trabajar aparecio.",
    hint: "¿Donde estabas? ¿Que estaba pasando?",
  },
  {
    q: "En ese momento, ¿que sentiste?",
    hint: "No lo que pensaste, sino lo que notaste en ti: en el cuerpo, en el animo, en la energia.",
  },
  {
    q: "¿Como reaccionaste?",
    hint: "¿Que hiciste, dijiste o dejaste de hacer?",
  },
  {
    q: "Si esa misma situacion se repitiera mañana, ¿que te gustaria que fuera diferente?",
    hint: "No en lo externo, sino en ti.",
  },
  {
    q: "¿Hay algo que ya sabes que deberias hacer distinto pero no logras?",
    hint: "¿Que crees que te frena?",
  },
];

export default function PreguntasCoachingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-[640px] mx-auto px-5 py-16 md:py-24">
        {/* Header */}
        <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-muted mb-3">
          Recurso gratuito
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-[32px] md:text-[40px] font-normal text-foreground leading-tight mb-4">
          Antes de tu sesion
        </h1>
        <p className="text-[15px] text-muted leading-relaxed max-w-[480px] mb-12">
          Estas preguntas no tienen respuestas correctas y responderlas ayuda a
          aclarar tu situacion. Tomate unos minutos.
        </p>

        {/* Questions */}
        <div className="space-y-10 mb-16">
          {questions.map((item, i) => (
            <div key={i} className="border-l-2 border-border pl-6">
              <p className="font-[family-name:var(--font-display)] text-lg font-medium text-foreground mb-2">
                {i + 1}) {item.q}
              </p>
              <p className="text-sm text-muted italic">{item.hint}</p>
            </div>
          ))}
        </div>

        {/* Closing note */}
        <div className="rounded-xl bg-surface p-8 mb-12">
          <p className="text-[15px] text-muted leading-relaxed italic">
            Si al responder sientes que el tema real puede ser otro, suele
            suceder y de ser asi lo descubriremos.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <a
            href="/downloads/preguntas-precoaching.pdf"
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
          <a
            href="https://cal.com/gaxpar-uriarte-3nwoir/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
          >
            Agendar llamada de descubrimiento
          </a>
        </div>

        {/* Footer */}
        <p className="font-[family-name:var(--font-mono)] text-[11px] text-muted/50 tracking-[0.1em] mt-16">
          Como Ser Tu Mismo · comosertumismo.com
        </p>
      </div>
    </div>
  );
}
