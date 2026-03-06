"use client";

import { useState } from "react";

/* ── SVG decorativos ── */
const spiralSVG = `<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 30C30 25 35 20 40 22C45 24 44 32 38 34C32 36 24 32 24 26C24 18 32 12 40 14C50 16 54 28 48 38C42 48 28 52 20 46C10 38 8 22 16 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
const eyeSVG = `<svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 20C4 20 14 6 30 6C46 6 56 20 56 20C56 20 46 34 30 34C14 34 4 20 4 20Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="30" cy="20" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="30" cy="20" r="2.5" fill="currentColor"/></svg>`;
const snakeSVG = `<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 8C12 8 18 12 18 18C18 24 10 28 10 34C10 40 18 44 24 42C30 40 32 34 38 32C44 30 50 34 50 40C50 46 44 52 38 52" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="14" cy="8" r="2" fill="currentColor"/><path d="M8 10L12 8L10 5" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>`;

/* ── Tipos ── */
interface FormData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  situacion: string;
  vidaCambia: string;
  costoNoActuar: string;
  yaIntento: string;
  sesiones: string;
  disponibilidadHoraria: string;
  prioridad: number | null;
  compromiso: number | null;
  dispuestoDejar: string;
  comoLlegaste: string;
}

/* ── Componentes internos ── */

function FloatingIcon({
  svg,
  className,
  size = 40,
}: {
  svg: string;
  className: string;
  size?: number;
}) {
  return (
    <div
      className={`absolute text-accent opacity-25 pointer-events-none ${className}`}
      style={{ width: size, height: size, animation: `float 6s ease-in-out infinite` }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="h-2 rounded-full transition-all duration-500 ease-out"
          style={{
            width: i === current ? 32 : 8,
            background:
              i === current
                ? "var(--color-foreground)"
                : i < current
                  ? "var(--color-muted)"
                  : "var(--color-border)",
          }}
        />
      ))}
    </div>
  );
}

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

function FormInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div className="mb-5">
      <label className="block font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-muted mb-2">
        {label}
        {required && " *"}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-sm font-[family-name:var(--font-sans)] text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-foreground"
      />
    </div>
  );
}

function FormTextArea({
  label,
  sublabel,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string;
  sublabel?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  rows?: number;
}) {
  return (
    <div className="mb-7">
      <label className="block font-[family-name:var(--font-display)] text-[17px] font-medium text-foreground mb-1 leading-snug">
        {label}
      </label>
      {sublabel && (
        <p className="font-[family-name:var(--font-mono)] text-[11px] text-muted mb-2.5 tracking-wide leading-relaxed">
          {sublabel}
        </p>
      )}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-lg border border-border bg-transparent px-4 py-3.5 text-sm font-[family-name:var(--font-sans)] text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-foreground resize-vertical leading-relaxed"
      />
    </div>
  );
}

function RadioGroup({
  label,
  sublabel,
  options,
  value,
  onChange,
}: {
  label: string;
  sublabel?: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="mb-7">
      <label className="block font-[family-name:var(--font-display)] text-[17px] font-medium text-foreground mb-1">
        {label}
      </label>
      {sublabel && (
        <p className="font-[family-name:var(--font-mono)] text-[11px] text-muted mb-3 tracking-wide">
          {sublabel}
        </p>
      )}
      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-left text-sm transition-all ${
              value === opt.value
                ? "border-foreground bg-surface"
                : "border-border hover:border-muted"
            }`}
          >
            <div
              className={`w-[18px] h-[18px] rounded-full border-2 shrink-0 transition-all ${
                value === opt.value
                  ? "border-[5px] border-foreground"
                  : "border-border"
              }`}
            />
            <span>{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ScaleSelector({
  label,
  sublabel,
  value,
  onChange,
  low,
  high,
}: {
  label: string;
  sublabel?: string;
  value: number | null;
  onChange: (n: number) => void;
  low: string;
  high: string;
}) {
  return (
    <div className="mb-7">
      <label className="block font-[family-name:var(--font-display)] text-[17px] font-medium text-foreground mb-1">
        {label}
      </label>
      {sublabel && (
        <p className="font-[family-name:var(--font-mono)] text-[11px] text-muted mb-3.5 tracking-wide">
          {sublabel}
        </p>
      )}
      <div className="flex gap-1.5 justify-center mb-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`w-9 h-9 rounded-full font-[family-name:var(--font-mono)] text-[13px] transition-all duration-300 ${
              value === n
                ? "bg-foreground text-background scale-110 border-none"
                : "bg-transparent text-muted border border-border hover:border-muted"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="flex justify-between font-[family-name:var(--font-mono)] text-[10px] text-muted tracking-wider">
        <span>{low}</span>
        <span>{high}</span>
      </div>
    </div>
  );
}

/* ── Componente principal ── */

const WEB3FORMS_KEY = "0750786b-5250-4235-9362-e8e7f069e01c";

const STEPS = ["Inicio", "Datos", "Situacion", "Compromiso", "Confirmar"];

// TODO: Reemplazar con URL real del PDF cuando esté listo
const PDF_URL = "#";
// TODO: Reemplazar con URL real del episodio
const PODCAST_URL = "https://open.spotify.com/show/2ERQlZQycD77mt8rVM0Be5";

function getConfirmationMessage(compromiso: number | null) {
  const level = compromiso ?? 5;
  if (level <= 4)
    return "Gracias por tu honestidad. Mientras reviso las postulaciones, te dejo un recurso para que sigas explorandote.";
  if (level <= 7)
    return "Se nota que hay algo moviendose. Mientras reviso tu postulacion, te dejo algo para seguir con ese impulso.";
  return "Tu claridad habla por si sola. Mientras reviso tu postulacion, esto puede ser un buen punto de partida.";
}

export default function CoachingFormPage() {
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    situacion: "",
    vidaCambia: "",
    costoNoActuar: "",
    yaIntento: "",
    sesiones: "",
    disponibilidadHoraria: "",
    prioridad: null,
    compromiso: null,
    dispuestoDejar: "",
    comoLlegaste: "",
  });

  const set =
    (key: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string | number) => {
      const val = typeof e === "object" && "target" in e ? e.target.value : e;
      setForm((f) => ({ ...f, [key]: val }));
    };

  const goTo = (next: number) => {
    setAnimating(true);
    setTimeout(() => {
      setStep(next);
      setAnimating(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  };

  const canNext = () => {
    if (step === 1) return form.nombre && form.email;
    if (step === 2) return form.situacion && form.vidaCambia;
    if (step === 3) return form.compromiso && form.sesiones;
    return true;
  };

  const handleSubmit = async () => {
    setSending(true);
    setError(null);
    try {
      // Web3Forms
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Nueva solicitud coaching - ${form.nombre} ${form.apellido}`,
          from_name: "Como Ser Tu Mismo",
          Nombre: form.nombre,
          Apellido: form.apellido,
          Email: form.email,
          Telefono: form.telefono,
          "Como llego": form.comoLlegaste,
          Situacion: form.situacion,
          "Como cambiaria su vida": form.vidaCambia,
          "Costo de no actuar": form.costoNoActuar,
          "Que ya intento": form.yaIntento,
          Sesiones: form.sesiones,
          "Prioridad (1-10)": form.prioridad,
          "Compromiso (1-10)": form.compromiso,
          "Dispuesto a dejar": form.dispuestoDejar,
          "Horario fijo": form.disponibilidadHoraria,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        setError("Hubo un problema al enviar. Intenta de nuevo.");
        return;
      }

      // MailerLite — suscribir con tag
      try {
        await fetch("/api/mailerlite-subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            name: form.nombre,
            lastName: form.apellido,
          }),
        });
      } catch {
        // No bloquear si MailerLite falla
      }

      setSubmitted(true);
    } catch {
      setError("Error de conexion. Revisa tu internet e intenta de nuevo.");
    } finally {
      setSending(false);
    }
  };

  /* ── Pantalla de confirmacion ── */
  if (submitted) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-start justify-center px-5 py-10 relative overflow-hidden">
        <FloatingIcon svg={spiralSVG} className="top-[15%] left-[8%]" size={50} />
        <FloatingIcon svg={eyeSVG} className="top-[30%] right-[10%]" size={45} />

        <div className="w-full max-w-[560px] text-center pt-20 animate-[fadeInUp_0.8s_ease-out]">
          <div
            className="w-[50px] h-[50px] mx-auto mb-6 text-foreground opacity-60"
            dangerouslySetInnerHTML={{ __html: spiralSVG }}
          />
          <h2 className="font-[family-name:var(--font-display)] text-[28px] font-normal text-foreground mb-4">
            Gracias por tu honestidad.
          </h2>
          <p className="text-[15px] text-muted leading-relaxed max-w-[400px] mx-auto">
            {getConfirmationMessage(form.compromiso)}
          </p>

          <HandDrawnLine className="w-[200px] mx-auto my-8" />

          {/* Recurso */}
          <div className="rounded-xl border border-border p-8 text-left mb-8">
            <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-muted mb-3">
              Recurso para ti
            </p>
            <h3 className="font-[family-name:var(--font-display)] text-lg font-medium mb-2">
              5 preguntas para conocerte antes de tu primera sesion
            </h3>
            <p className="text-sm text-muted leading-relaxed mb-6">
              Un ejercicio breve para seguir con la auto-observacion que empezaste en este formulario. Funciona con o sin coach.
            </p>
            <a
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
            >
              Descargar PDF
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </a>
          </div>

          <p className="font-[family-name:var(--font-mono)] text-[11px] text-muted/50 tracking-[0.1em]">
            Como Ser Tu Mismo · Coaching Ontologico
          </p>
        </div>
      </div>
    );
  }

  /* ── Formulario ── */
  return (
    <div className="min-h-screen bg-background text-foreground flex items-start justify-center px-5 py-10 relative overflow-hidden">
      {/* Iconos flotantes decorativos */}
      <FloatingIcon svg={spiralSVG} className="top-[8%] left-[5%]" size={45} />
      <FloatingIcon svg={eyeSVG} className="top-[22%] right-[6%] delay-1000" size={40} />
      <FloatingIcon svg={snakeSVG} className="top-[55%] left-[3%] delay-2000" size={38} />
      <FloatingIcon svg={spiralSVG} className="top-[70%] right-[8%] delay-3000" size={35} />

      <div className="w-full max-w-[560px] relative z-10">
        {/* Header */}
        <div className="text-center mb-9">
          <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-muted mb-3">
            Como Ser Tu Mismo
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-[32px] font-normal text-foreground leading-tight">
            Sesiones de Coaching
          </h1>
          <HandDrawnLine className="w-[120px] mx-auto mt-4" />
        </div>

        <StepIndicator current={step} total={STEPS.length} />

        {/* Steps con animacion */}
        <div
          className="transition-all duration-400 ease-out"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(12px)" : "translateY(0)",
          }}
        >
          {/* STEP 0 — Intro */}
          {step === 0 && (
            <div className="text-center py-5">
              <div
                className="w-11 h-11 mx-auto mb-6 text-foreground opacity-50"
                dangerouslySetInnerHTML={{ __html: eyeSVG }}
              />
              <p className="font-[family-name:var(--font-display)] text-[19px] text-foreground/80 leading-relaxed max-w-[440px] mx-auto mb-3">
                Esto no es solo un formulario.
              </p>
              <p className="text-sm text-muted leading-relaxed max-w-[420px] mx-auto mb-2">
                Es una primera conversacion contigo mismo/a. Las preguntas que
                vienen estan disenadas para que te observes antes de que
                trabajemos juntos.
              </p>
              <p className="text-sm text-muted leading-relaxed max-w-[420px] mx-auto mb-8">
                Se honesto/a. No hay respuestas correctas — solo las tuyas.
              </p>
              <p className="font-[family-name:var(--font-mono)] text-[11px] text-muted/50 mb-8">
                Tiempo estimado: 5–8 minutos
              </p>
              <button
                onClick={() => goTo(1)}
                className="rounded-full bg-foreground px-8 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
              >
                Comenzar
              </button>
            </div>
          )}

          {/* STEP 1 — Datos personales */}
          {step === 1 && (
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-[22px] font-normal text-foreground mb-2">
                Cuentame quien eres
              </h2>
              <p className="text-[13px] text-muted mb-7">
                Informacion basica para poder contactarte.
              </p>

              <div className="grid grid-cols-2 gap-x-4">
                <FormInput
                  label="Nombre"
                  value={form.nombre}
                  onChange={set("nombre") as (e: React.ChangeEvent<HTMLInputElement>) => void}
                  placeholder="Tu nombre"
                  required
                />
                <FormInput
                  label="Apellido"
                  value={form.apellido}
                  onChange={set("apellido") as (e: React.ChangeEvent<HTMLInputElement>) => void}
                  placeholder="Tu apellido"
                />
              </div>
              <FormInput
                label="Email"
                type="email"
                value={form.email}
                onChange={set("email") as (e: React.ChangeEvent<HTMLInputElement>) => void}
                placeholder="tu@email.com"
                required
              />
              <FormInput
                label="Telefono / WhatsApp"
                type="tel"
                value={form.telefono}
                onChange={set("telefono") as (e: React.ChangeEvent<HTMLInputElement>) => void}
                placeholder="+56 9 ..."
              />

              <RadioGroup
                label="¿Como llegaste aca?"
                options={[
                  { value: "instagram", label: "Instagram" },
                  { value: "podcast", label: "Podcast Se Tu Mismo" },
                  { value: "recomendacion", label: "Me lo recomendo alguien" },
                  { value: "otro", label: "Otro camino" },
                ]}
                value={form.comoLlegaste}
                onChange={set("comoLlegaste") as unknown as (val: string) => void}
              />

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => goTo(0)}
                  className="px-6 py-3 font-[family-name:var(--font-mono)] text-xs text-muted tracking-wider hover:text-foreground transition-colors"
                >
                  ← Atras
                </button>
                <button
                  onClick={() => canNext() && goTo(2)}
                  disabled={!canNext()}
                  className="rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-30"
                >
                  Siguiente →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 — Situacion */}
          {step === 2 && (
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-[22px] font-normal text-foreground mb-2">
                Tu situacion actual
              </h2>
              <p className="text-[13px] text-muted mb-7">
                No necesitas tenerlo claro. Solo describe lo que sientes.
              </p>

              <FormTextArea
                label="¿Que situacion te tiene complicado/a y te gustaria cambiar?"
                sublabel="Describe con tus palabras, sin filtro. No hay respuesta incorrecta."
                value={form.situacion}
                onChange={set("situacion") as (e: React.ChangeEvent<HTMLTextAreaElement>) => void}
                placeholder="Lo que me pasa es que..."
              />
              <FormTextArea
                label="Si pudieras resolver esto, ¿como cambiaria tu vida concretamente?"
                sublabel="Piensa en tu dia a dia, no en conceptos abstractos."
                value={form.vidaCambia}
                onChange={set("vidaCambia") as (e: React.ChangeEvent<HTMLTextAreaElement>) => void}
                placeholder="Mi vida cambiaria en que..."
              />
              <FormTextArea
                label="¿Que costo tiene para ti seguir como estas?"
                sublabel="Emocional, relacional, profesional... ¿que estas perdiendo?"
                value={form.costoNoActuar}
                onChange={set("costoNoActuar") as (e: React.ChangeEvent<HTMLTextAreaElement>) => void}
                placeholder="Lo que me esta costando es..."
                rows={3}
              />
              <FormTextArea
                label="¿Ya intentaste algo para cambiar esto? ¿Que paso?"
                sublabel="Terapia, libros, coaching, conversaciones... todo cuenta."
                value={form.yaIntento}
                onChange={set("yaIntento") as (e: React.ChangeEvent<HTMLTextAreaElement>) => void}
                placeholder="Lo que ya intente fue..."
                rows={3}
              />

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => goTo(1)}
                  className="px-6 py-3 font-[family-name:var(--font-mono)] text-xs text-muted tracking-wider hover:text-foreground transition-colors"
                >
                  ← Atras
                </button>
                <button
                  onClick={() => canNext() && goTo(3)}
                  disabled={!canNext()}
                  className="rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-30"
                >
                  Siguiente →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 — Compromiso */}
          {step === 3 && (
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-[22px] font-normal text-foreground mb-2">
                Tu nivel de compromiso
              </h2>
              <p className="text-[13px] text-muted mb-7">
                El coaching funciona cuando hay compromiso real. Estas preguntas
                me ayudan a saber si es el momento adecuado.
              </p>

              <RadioGroup
                label="¿Cuantas sesiones te gustaria tomar?"
                sublabel="Cada sesion dura aprox. 60 minutos, con frecuencia semanal."
                options={[
                  { value: "1", label: "1 sesion — Clarificar un punto especifico" },
                  { value: "3", label: "3 sesiones — Trabajar algo con mas profundidad" },
                  { value: "4", label: "4 sesiones — Proceso mas completo" },
                ]}
                value={form.sesiones}
                onChange={set("sesiones") as unknown as (val: string) => void}
              />

              <ScaleSelector
                label="¿Que tan prioritario es esto para ti ahora mismo?"
                sublabel="1 = es algo que vengo postergando, 10 = necesito abordarlo ya"
                value={form.prioridad}
                onChange={set("prioridad") as unknown as (n: number) => void}
                low="Puedo esperar"
                high="Es urgente"
              />

              <ScaleSelector
                label="¿Que tan dispuesto/a estas a comprometerte sin desertar?"
                sublabel="1 = no estoy seguro/a, 10 = voy a estar en cada sesion pase lo que pase"
                value={form.compromiso}
                onChange={set("compromiso") as unknown as (n: number) => void}
                low="Tengo dudas"
                high="100% comprometido/a"
              />

              <FormTextArea
                label="¿Que estarias dispuesto/a a dejar de hacer por este proceso?"
                sublabel="Una hora semanal, una excusa, un habito... ¿que le haces espacio?"
                value={form.dispuestoDejar}
                onChange={set("dispuestoDejar") as (e: React.ChangeEvent<HTMLTextAreaElement>) => void}
                placeholder="Estoy dispuesto/a a..."
                rows={3}
              />

              <RadioGroup
                label="¿Puedes sostener un horario fijo semanal?"
                sublabel="Las sesiones funcionan mejor con un dia y hora consistente."
                options={[
                  { value: "si", label: "Si, puedo organizar mi agenda para esto" },
                  { value: "flexible", label: "Necesitaria algo de flexibilidad" },
                  { value: "dificil", label: "Me costaria bastante mantener un horario fijo" },
                ]}
                value={form.disponibilidadHoraria}
                onChange={set("disponibilidadHoraria") as unknown as (val: string) => void}
              />

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => goTo(2)}
                  className="px-6 py-3 font-[family-name:var(--font-mono)] text-xs text-muted tracking-wider hover:text-foreground transition-colors"
                >
                  ← Atras
                </button>
                <button
                  onClick={() => canNext() && goTo(4)}
                  disabled={!canNext()}
                  className="rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-30"
                >
                  Revisar →
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 — Revision */}
          {step === 4 && (
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-[22px] font-normal text-foreground mb-2">
                Revisa antes de enviar
              </h2>
              <p className="text-[13px] text-muted mb-7">
                Un ultimo vistazo. ¿Hay algo que quieras ajustar?
              </p>

              {/* Resumen datos */}
              <div className="bg-surface rounded-xl p-6 mb-6">
                {[
                  { label: "Nombre", value: `${form.nombre} ${form.apellido}`.trim() },
                  { label: "Email", value: form.email },
                  { label: "Telefono", value: form.telefono },
                  { label: "Sesiones", value: form.sesiones ? `${form.sesiones} sesiones` : "" },
                  { label: "Prioridad", value: form.prioridad ? `${form.prioridad}/10` : "" },
                  { label: "Compromiso", value: form.compromiso ? `${form.compromiso}/10` : "" },
                ]
                  .filter((r) => r.value)
                  .map((r, i, arr) => (
                    <div
                      key={r.label}
                      className={`flex justify-between py-2 ${
                        i < arr.length - 1 ? "border-b border-border" : ""
                      }`}
                    >
                      <span className="font-[family-name:var(--font-mono)] text-[11px] text-muted uppercase tracking-wider">
                        {r.label}
                      </span>
                      <span className="text-sm text-foreground">{r.value}</span>
                    </div>
                  ))}
              </div>

              {/* Situacion preview */}
              {form.situacion && (
                <div className="mb-5">
                  <p className="font-[family-name:var(--font-mono)] text-[11px] text-muted uppercase tracking-wider mb-1.5">
                    Situacion
                  </p>
                  <p className="text-sm text-muted leading-relaxed italic">
                    &ldquo;{form.situacion}&rdquo;
                  </p>
                </div>
              )}

              <HandDrawnLine className="w-full my-6" />

              <p className="text-[13px] text-muted leading-relaxed mb-7 text-center">
                Al enviar, acepto que mis datos seran usados unicamente para
                evaluar la compatibilidad con el proceso de coaching.
              </p>

              {error && (
                <p className="text-[13px] text-red-500 text-center mb-4">
                  {error}
                </p>
              )}

              <div className="flex justify-between">
                <button
                  onClick={() => goTo(3)}
                  className="px-6 py-3 font-[family-name:var(--font-mono)] text-xs text-muted tracking-wider hover:text-foreground transition-colors"
                >
                  ← Ajustar
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={sending}
                  className="rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-50"
                >
                  {sending ? "Enviando..." : "Enviar formulario"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pb-5">
          <p className="font-[family-name:var(--font-mono)] text-[10px] text-muted/30 tracking-[0.1em] uppercase">
            Como Ser Tu Mismo · Coaching Ontologico
          </p>
        </div>
      </div>
    </div>
  );
}
