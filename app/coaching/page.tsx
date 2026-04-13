"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

/* ── Scroll animation hook ── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        }),
      { threshold: 0.15 }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ── SVG decorativo ── */
const spiralSVG = `<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 30C30 25 35 20 40 22C45 24 44 32 38 34C32 36 24 32 24 26C24 18 32 12 40 14C50 16 54 28 48 38C42 48 28 52 20 46C10 38 8 22 16 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;

function HandDrawnLine({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 6"
      className={`h-1.5 block ${className}`}
      preserveAspectRatio="none"
    >
      <path
        d="M0 3C40 1 80 5 120 3C160 1 200 4 240 3C280 2 320 5 360 3C380 2 400 3 400 3"
        stroke="var(--color-border)"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Componente principal ── */
export default function CoachingPage() {
  const containerRef = useScrollReveal();

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground pt-20">
      {/* ── Hero ── */}
      <section className="mx-auto max-w-2xl px-6 pt-20 pb-16 text-center">
        <div
          className="w-10 h-10 mx-auto mb-8 text-foreground opacity-40"
          dangerouslySetInnerHTML={{ __html: spiralSVG }}
        />
        <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-muted mb-4">
          Coaching Ontológico
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-normal tracking-tight leading-[1.1]">
          Sabes que algo tiene que cambiar.
          <br />
          <span className="text-muted">Solo no sabes por dónde empezar.</span>
        </h1>
        <p className="mt-6 text-muted text-base md:text-lg leading-relaxed max-w-lg mx-auto">
          No vengo a motivarte. Vengo a ayudarte a ver lo que no estás viendo
          para que puedas tomar decisiones que realmente muevan la aguja.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://calendly.com/gaxpar"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-foreground px-8 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
          >
            Agendar discovery call gratis
          </a>
          <Link
            href="/coaching-form"
            className="rounded-full border border-border px-8 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
          >
            Llenar formulario
          </Link>
        </div>
        <p className="mt-4 font-[family-name:var(--font-mono)] text-[11px] text-muted/50 tracking-wide">
          La discovery call es una conversación de 20-30 min. Sin compromiso.
        </p>
      </section>

      <HandDrawnLine className="w-[200px] mx-auto" />

      {/* ── Para quien es ── */}
      <section className="mx-auto max-w-2xl px-6 py-20">
        <div className="reveal animate-on-scroll">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-normal mb-4">
            Esto es para ti si...
          </h2>
          <p className="text-sm text-muted mb-10">
            Especialmente si eres artista, creativo o alguien que sabe que tiene algo para dar pero no logra sacarlo.
          </p>
          <div className="grid gap-6">
            {[
              {
                title: "Te sientes estancado/a",
                desc: "Sabes que hay algo más pero no logras avanzar. Postergas, te autosaboteas o simplemente no puedes moverte.",
              },
              {
                title: "Sabes qué hacer pero no te atreves",
                desc: "El problema no es información. Es que algo adentro te frena cada vez que estás a punto de dar el paso.",
              },
              {
                title: "Consumiste todo y nada cambió",
                desc: "Libros, podcasts, cursos, terapia. Sabes mucho sobre ti pero sigues en el mismo lugar.",
              },
              {
                title: "Necesitas un espejo, no un gurú",
                desc: "No buscas que alguien te diga qué hacer. Buscas a alguien que te ayude a ver lo que no estás viendo.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border border-border rounded-xl p-6 transition-all hover:border-muted"
              >
                <h3 className="font-[family-name:var(--font-display)] text-lg font-medium mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HandDrawnLine className="w-[120px] mx-auto" />

      {/* ── Como trabajo ── */}
      <section className="mx-auto max-w-2xl px-6 py-20">
        <div className="reveal animate-on-scroll">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-normal mb-4">
            Cómo funciona
          </h2>
          <p className="text-sm text-muted mb-10">
            El coaching ontológico trabaja con lo que no ves: las interpretaciones, creencias y
            patrones que te mantienen donde estás. No es terapia. No es mentoría. Es un espacio
            para que veas lo que necesitas ver.
          </p>

          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Discovery call",
                desc: "20-30 minutos gratis. Conversamos sobre tu situación y vemos si tiene sentido trabajar juntos. Sin compromiso.",
              },
              {
                step: "02",
                title: "Sesiones semanales",
                desc: "Sesiones de 60 minutos por videollamada. Con frecuencia semanal para mantener el momentum.",
              },
              {
                step: "03",
                title: "Entre sesiones",
                desc: "En los paquetes de acompañamiento tienes acceso a WhatsApp para lo que surja entre sesiones. No estás solo/a en el proceso.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-5">
                <span className="font-[family-name:var(--font-mono)] text-[13px] text-accent mt-1 shrink-0">
                  {item.step}
                </span>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-medium mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HandDrawnLine className="w-[120px] mx-auto" />

      {/* ── Opciones ── */}
      <section className="mx-auto max-w-2xl px-6 py-20">
        <div className="reveal animate-on-scroll">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-normal mb-10 text-center">
            Opciones
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Sesión suelta */}
            <div className="border border-border rounded-xl p-8 flex flex-col">
              <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-muted mb-3">
                Sesión individual
              </p>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-normal mb-2">
                Sesión suelta
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-6 flex-1">
                Para clarificar un punto específico, tomar una decisión importante o probar cómo se siente el coaching.
              </p>
              <div className="mb-6">
                <span className="font-[family-name:var(--font-display)] text-3xl font-normal">
                  $40.000
                </span>
                <span className="text-sm text-muted ml-1">CLP</span>
              </div>
              <ul className="text-sm text-muted space-y-2 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">—</span>
                  1 sesión de 60 minutos
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">—</span>
                  Por videollamada
                </li>
              </ul>
              <a
                href="https://calendly.com/gaxpar"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground text-center"
              >
                Agendar discovery call
              </a>
            </div>

            {/* Acompañamiento */}
            <div className="border border-foreground rounded-xl p-8 flex flex-col relative">
              <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-muted mb-3">
                Acompañamiento
              </p>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-normal mb-2">
                Paquete de 4 o 6 sesiones
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-6 flex-1">
                Para un proceso real de transformación. Trabajamos un tema en profundidad durante 8 a 12 semanas.
              </p>
              <div className="mb-1">
                <span className="font-[family-name:var(--font-display)] text-3xl font-normal">
                  $140.000
                </span>
                <span className="text-sm text-muted ml-1">CLP / 4 sesiones</span>
              </div>
              <div className="mb-6">
                <span className="font-[family-name:var(--font-display)] text-3xl font-normal">
                  $200.000
                </span>
                <span className="text-sm text-muted ml-1">CLP / 6 sesiones</span>
              </div>
              <ul className="text-sm text-muted space-y-2 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">—</span>
                  Sesiones semanales de 60 min
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">—</span>
                  Soporte por WhatsApp entre sesiones
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">—</span>
                  Recursos y ejercicios personalizados
                </li>
              </ul>
              <a
                href="https://calendly.com/gaxpar"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80 text-center"
              >
                Agendar discovery call
              </a>
            </div>
          </div>

          <p className="text-center text-sm text-muted mt-8">
            Todos los procesos empiezan con una discovery call gratuita de 20-30 min.
          </p>
        </div>
      </section>

      <HandDrawnLine className="w-[120px] mx-auto" />

      {/* ── Sobre mi ── */}
      <section className="mx-auto max-w-2xl px-6 py-20">
        <div className="reveal animate-on-scroll">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-normal mb-6">
            Quién soy
          </h2>
          <div className="text-sm text-muted leading-relaxed space-y-4">
            <p>
              Soy Gaxpar. Coach ontológico, creador del podcast Sé Tú Mismo y artista.
              Llevo más de 130 episodios hablando de autoconocimiento, patrones mentales
              y lo que significa realmente hacerte cargo de tu vida.
            </p>
            <p>
              Antes de dedicarme a esto fui productor musical, diseñador, y pasé por mi
              propia crisis de propósito. Sé lo que se siente tener talento y no poder sacarlo.
              Sé lo que se siente saber exactamente qué hay que hacer y no hacerlo.
            </p>
            <p>
              Mi enfoque es directo. No te voy a decir lo que quieres escuchar. Te voy a
              ayudar a ver lo que necesitas ver. Sin poses, sin frases motivacionales, sin humo.
            </p>
          </div>
        </div>
      </section>

      <HandDrawnLine className="w-[200px] mx-auto" />

      {/* ── CTA final ── */}
      <section className="mx-auto max-w-2xl px-6 py-20 text-center">
        <div className="reveal animate-on-scroll">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-normal mb-4">
            El contenido te abre los ojos.
            <br />
            El acompañamiento te cambia la vida.
          </h2>
          <p className="text-sm text-muted mb-10 max-w-md mx-auto">
            Si llevas meses consumiendo contenido y nada cambia, tal vez lo que necesitas
            no es más información. Es alguien que te acompañe en el proceso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendly.com/gaxpar"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-foreground px-8 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
            >
              Agendar discovery call gratis
            </a>
            <Link
              href="/coaching-form"
              className="rounded-full border border-border px-8 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              Llenar formulario
            </Link>
          </div>
          <p className="mt-4 font-[family-name:var(--font-mono)] text-[11px] text-muted/50 tracking-wide">
            20-30 min · Sin compromiso · Por videollamada
          </p>
        </div>
      </section>

      <div className="pb-16" />
    </div>
  );
}
