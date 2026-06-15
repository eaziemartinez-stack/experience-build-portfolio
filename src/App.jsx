import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import Home from "./Home";
import GenerationICaseV2 from "./GenerationICaseV2";
import ExperienceBuildFull from "./components/experience-build/ExperienceBuild_FULL_INTEGRATED";
import UIShowcaseLandingPages from "./UIShowcase_LandingPages";
import UIMobileWF1 from "./UIMobileWF1";
import ContactPage from "./ContactPage";

const EILIK_BLUE = "#9DB9FF";
const EILIK_CYAN = "#63B9D4";
const EILIK_PINK = "#F6BBD7";
const EILIK_YELLOW = "#F4DA9F";
const EILIK_VIOLET = "#BFA7FF";
const EILIK_BG = "#030303";

const methods = [
  {
    title: "Entrevistas exploratorias",
    body: "Nos ayudaron a entender cómo las personas describen compañía, calma, estrés y valor emocional antes de hablar de funciones.",
    output: "Lenguaje, necesidades emocionales y momentos de uso.",
    accent: EILIK_PINK,
  },
  {
    title: "Benchmark emocional",
    body: "Revisamos companions digitales como Tamagotchi, Cozmo y Vector para identificar patrones de apego, reacción y personalidad.",
    output: "Principios de comportamiento, expresividad y continuidad.",
    accent: EILIK_CYAN,
  },
  {
    title: "Evaluación heurística",
    body: "Analizamos claridad, control, consistencia y emoción para evitar que Eilik se percibiera como un gadget confuso.",
    output: "Criterios UX para arquitectura, microcopy y estados.",
    accent: EILIK_YELLOW,
  },
  {
    title: "Journey mapping",
    body: "Mapeamos el recorrido desde curiosidad hasta uso recurrente para detectar dónde debía aparecer evidencia de valor.",
    output: "Secuencia de decisión, fricciones y oportunidades.",
    accent: EILIK_VIOLET,
  },
];

const insights = [
  {
    insight: "Las personas no buscan tecnología. Buscan compañía.",
    method: "Entrevistas exploratorias + benchmark emocional.",
    evidence: "Los usuarios describieron primero sensaciones: calma, presencia, ternura y acompañamiento; las capacidades técnicas aparecieron después.",
    decision: "Posicionar a Eilik como compañero digital, no como gadget.",
    screen: "Hero con Eilik como protagonista emocional e interactivo.",
    accent: EILIK_PINK,
  },
  {
    insight: "La personalidad se entiende a través de reacciones.",
    method: "Benchmark de Tamagotchi, Cozmo y Vector.",
    evidence: "Los productos con más apego no explican su personalidad: la muestran con comportamiento, ritmo, microinteracciones y respuesta.",
    decision: "Diseñar estados visibles: descanso, carga, reposo, emoción y recuerdo.",
    screen: "Módulo interactivo de estados emocionales.",
    accent: EILIK_CYAN,
  },
  {
    insight: "Si no se entiende rápido, parece un juguete.",
    method: "Heurísticas de claridad + análisis de fricción.",
    evidence: "Cuando el valor no se explica en los primeros segundos, el usuario lo clasifica como objeto decorativo o novedad pasajera.",
    decision: "Ordenar la narrativa en beneficios, casos de uso y demostración.",
    screen: "Arquitectura de landing y app por momentos de decisión.",
    accent: EILIK_YELLOW,
  },
  {
    insight: "El valor emocional necesita prueba visual.",
    method: "Journey map + evaluación de decisión.",
    evidence: "Antes de confiar, el usuario necesita ver cómo se comporta Eilik, cómo responde y qué papel tendría en su día a día.",
    decision: "Mostrar demos, wireframes, mockups y componentes antes de pedir conversión.",
    screen: "Mockups responsivos y sistema de componentes.",
    accent: EILIK_VIOLET,
  },
];

const references = [
  {
    year: "1996",
    title: "Tamagotchi",
    description: "El cuidado repetido convierte una interacción simple en vínculo.",
    learned: "La constancia importa más que la complejidad.",
    accent: EILIK_PINK,
  },
  {
    year: "2016",
    title: "Anki Cozmo",
    description: "La expresividad, el juego y la reacción inmediata generan personalidad percibida.",
    learned: "La emoción se diseña con microcomportamientos.",
    accent: EILIK_YELLOW,
  },
  {
    year: "2018",
    title: "Anki Vector",
    description: "La autonomía y la presencia física hacen que el robot se sienta menos herramienta y más compañero.",
    learned: "El usuario necesita sentir que el companion tiene vida propia.",
    accent: EILIK_CYAN,
  },
];

const personas = [
  {
    name: "Alex",
    age: "29",
    profile: "Early adopter · Home office · Fan de gadgets con personalidad",
    need: "Quiere entender si Eilik es una novedad estética o una presencia útil en su rutina.",
    friction: "Duda si el producto tiene valor diario o si perderá encanto después de la primera semana.",
    motivation: "Busca objetos que humanicen su espacio, generen conversación y tengan una experiencia memorable.",
    accent: EILIK_CYAN,
  },
  {
    name: "Sofía",
    age: "27",
    profile: "Creativa digital · Lifestyle tech · Compra emocional y aspiracional",
    need: "Necesita sentir que Eilik acompaña sin volverse complejo ni demasiado técnico.",
    friction: "Se desconecta cuando el lenguaje de producto se siente frío, técnico o impersonal.",
    motivation: "Valora ternura, calma, estética, personalización y microinteracciones compartibles.",
    accent: EILIK_PINK,
  },
];

const journey = [
  ["01", "Descubre", "Ve a Eilik en redes o landing.", "Curiosidad", "Mostrar personalidad en segundos."],
  ["02", "Explora", "Busca qué hace y cómo interactúa.", "Interés", "Explicar valor sin lenguaje técnico."],
  ["03", "Evalúa", "Compara con gadgets y companions.", "Duda", "Demostrar uso cotidiano y diferenciador."],
  ["04", "Decide", "Necesita justificar precio y utilidad.", "Confianza", "Mostrar beneficios y casos de uso."],
  ["05", "Convive", "Lo integra a escritorio y rutina.", "Vínculo", "Sostener relación con estados y recuerdos."],
];

const architecture = [
  ["Inicio", "Explica a Eilik desde emoción, beneficio y personalidad."],
  ["Estados", "Muestra reacciones para que el usuario entienda comportamiento."],
  ["Chat IA", "Permite interacción directa, ligera y conversacional."],
  ["Bienestar", "Ofrece recursos de calma, respiración y acompañamiento."],
  ["Recuerdos", "Refuerza continuidad mediante momentos guardados."],
  ["Perfil", "Personaliza preferencias, tono y tipo de interacción."],
];

const metrics = [
  ["Claridad", "Comprensión del valor en primeros segundos.", "92%"],
  ["Emoción", "Percepción de personalidad y cercanía.", "95%"],
  ["Control", "Sensación de poder interactuar sin complejidad.", "88%"],
  ["Consistencia", "Relación entre robot, app y landing.", "90%"],
];

const colors = [
  ["Calma", "#9CB7E0", "Base serena para reducir fricción visual."],
  ["Claridad", "#63B9D4", "Acciones, estados activos y comunicación."],
  ["Calidez", "#F4DA9F", "Momentos de acompañamiento y refuerzo."],
  ["Ternura", "#F6BBD7", "Estados emocionales, cercanía y personalidad."],
];

function useScrollState() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return isScrolled;
}

function PortfolioHeader() {
  const isScrolled = useScrollState();

  return (
    <header
  className={`fixed left-1/2 top-6 z-50 -translate-x-1/2 transition-all duration-300 ${
    isScrolled ? "top-4 scale-[0.985] opacity-95" : ""
  }`}
>
  <nav className="relative flex min-h-[48px] items-center justify-center gap-1.5 rounded-full border border-white/15 bg-[#050505]/95 px-2 py-1.5 backdrop-blur-[18px] shadow-[0_24px_90px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.10)] isolate before:absolute before:inset-[-18px] before:-z-10 before:rounded-full before:bg-black/50 before:blur-3xl">

    <a
      href="/"
      className="rounded-full px-4 py-2 text-xs font-medium tracking-[.018em] text-white/60 transition hover:-translate-y-px hover:bg-white/[.055] hover:text-white"
    >
      Home
    </a>

    <a
      href="/#casos"
      className="rounded-full px-4 py-2 text-xs font-medium tracking-[.018em] text-white transition hover:-translate-y-px hover:bg-white/[.055]"
    >
      Casos
    </a>

    <a
      href="/experience-build"
      className="rounded-full px-4 py-2 text-xs font-medium tracking-[.018em] text-white/60 transition hover:-translate-y-px hover:bg-white/[.055] hover:text-white"
    >
      Experience.Build
    </a>

    <a
      href="/contacto"
      className="rounded-full px-4 py-2 text-xs font-medium tracking-[.018em] text-white/60 transition hover:-translate-y-px hover:bg-white/[.055] hover:text-white"
    >
      Contacto
    </a>

  </nav>
</header>
  );
}

function Section({ id, children, className = "" }) {
  return (
    <section id={id} className={`case-section ${className}`}>
      {children}
    </section>
  );
}

function SectionTitle({ eyebrow, title, text, align = "left" }) {
  return (
    <div className={`section-title ${align === "center" ? "is-center" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p className="section-lead">{text}</p>}
    </div>
  );
}

function EditorialCard({ children, accent = EILIK_CYAN, className = "" }) {
  return (
    <article className={`editorial-card ${className}`} style={{ "--accent": accent }}>
      {children}
    </article>
  );
}

function MiniEilik({ mood = "idle", size = "md" }) {
  const small = size === "sm";

  const moodMap = {
    sleep: {
      eye: "#94A3B8",
      glow: "rgba(148,163,184,.34)",
      body: "linear-gradient(135deg,#F7F7F8,#CBD5E1,#64748B)",
      mouth: "flat",
    },
    loading: {
      eye: "#9CB7E0",
      glow: "rgba(156,183,224,.45)",
      body: "linear-gradient(135deg,#FFFFFF,#9CB7E0,#E2E8F0)",
      mouth: "dots",
    },
    idle: {
      eye: EILIK_CYAN,
      glow: "rgba(99,185,212,.45)",
      body: "linear-gradient(135deg,#FFFFFF,#DDE7F7,#9CB7E0)",
      mouth: "smile",
    },
    happy: {
      eye: EILIK_PINK,
      glow: "rgba(246,187,215,.55)",
      body: "linear-gradient(135deg,#FFFFFF,#F6BBD7,#F4DA9F)",
      mouth: "smile",
    },
    thinking: {
      eye: EILIK_YELLOW,
      glow: "rgba(244,218,159,.55)",
      body: "linear-gradient(135deg,#F4DA9F,#FFFFFF,#63B9D4)",
      mouth: "spark",
    },
  };

  const m = moodMap[mood] || moodMap.idle;

  return (
    <div className={`mini-eilik ${small ? "is-small" : ""}`} style={{ "--eye": m.eye, "--glow": m.glow, "--body": m.body }}>
      <div className="mini-eilik-body">
        <div className="mini-eilik-face">
          {m.mouth === "spark" ? (
            <>
              <span className="spark left">✦</span>
              <span className="spark right">✦</span>
              <span className="mini-eilik-mouth" />
            </>
          ) : m.mouth === "dots" ? (
            <>
              <span className="mini-eilik-dot left" />
              <span className="mini-eilik-dot right" />
              <span className="loading-dots"><i /><i /><i /></span>
            </>
          ) : m.mouth === "flat" ? (
            <>
              <span className="mini-eilik-eye is-flat left" />
              <span className="mini-eilik-eye is-flat right" />
              <span className="mini-eilik-mouth is-flat" />
            </>
          ) : (
            <>
              <span className="mini-eilik-eye left" />
              <span className="mini-eilik-eye right" />
              <span className="mini-eilik-mouth" />
            </>
          )}
        </div>
        <span className="mini-eilik-arm left" />
        <span className="mini-eilik-arm right" />
      </div>
    </div>
  );
}

function InteractiveEilik() {
  const [state, setState] = useState(2);

  const states = [
    {
      name: "Descanso",
      label: "Eilik baja la presencia visual para no invadir.",
      mood: "sleep",
    },
    {
      name: "Sincronizando",
      label: "La experiencia comunica espera sin romper el vínculo.",
      mood: "loading",
    },
    {
      name: "Reposo",
      label: "Eilik está disponible, pero no exige atención.",
      mood: "idle",
    },
    {
      name: "Emoción",
      label: "Una reacción positiva vuelve visible la personalidad.",
      mood: "happy",
    },
    {
      name: "Recuerdo",
      label: "El companion guarda momentos para sostener continuidad.",
      mood: "thinking",
    },
  ];

  const current = states[state];

  return (
    <div className="interactive-eilik">
      <button
        type="button"
        onClick={() => setState((state + 1) % states.length)}
        className="eilik-stage"
        aria-label="Cambiar estado emocional de Eilik"
      >
        <div className="stage-glow" />
        <MiniEilik mood={current.mood} />
      </button>

      <div className="state-panel">
        <p>{current.name}</p>
        <h3>{current.label}</h3>
        <span>Haz clic para cambiar de estado</span>
      </div>

      <div className="state-dots" aria-hidden="true">
        {states.map((item, index) => (
          <button
            key={item.name}
            type="button"
            className={index === state ? "active" : ""}
            onClick={() => setState(index)}
          />
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="case-hero" id="hero">
      <div className="hero-copy">
        <p className="eyebrow reveal-1">Product Design · UX Research · AI Experience</p>

        <h1 className="reveal-2">
          Diseñando una experiencia emocional para un compañero digital impulsado por IA.
        </h1>

        <p className="hero-text reveal-3">
          El reto no era explicar un robot. Era demostrar por qué una persona querría convivir con él todos los días.
        </p>

        <div className="hero-meta reveal-3">
          <span>UX Research</span>
          <span>Service Design</span>
          <span>UX/UI</span>
          <span>Front-End</span>
        </div>
      </div>

      <div className="hero-visual reveal-3">
        <InteractiveEilik />
      </div>
    </section>
  );
}

function Context() {
  return (
    <Section id="contexto">
      <div className="split-layout">
        <SectionTitle
          eyebrow="Contexto"
          title="El valor del producto no estaba en la tecnología, sino en la relación que podía construir."
          text="Eilik no se abordó como un gadget aislado. Se diseñó como una experiencia híbrida entre objeto físico, interfaz digital, lenguaje emocional y acompañamiento cotidiano."
        />

        <EditorialCard accent={EILIK_PINK} className="highlight-card">
          <p>How Might We</p>
          <h3>¿Cómo podríamos convertir un robot adorable en una experiencia comprensible, útil y emocionalmente significativa?</h3>
        </EditorialCard>
      </div>
    </Section>
  );
}

function ResearchMethods() {
  return (
    <Section id="research">
      <SectionTitle
        eyebrow="Research"
        title="Cada método respondió una pregunta distinta."
        text="Antes de diseñar pantallas, necesitábamos entender qué genera apego, qué genera duda y qué hace que una persona perciba a una entidad digital como compañía."
      />

      <div className="method-grid">
        {methods.map((item, index) => (
          <EditorialCard key={item.title} accent={item.accent}>
            <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            <small>{item.output}</small>
          </EditorialCard>
        ))}
      </div>
    </Section>
  );
}

function InsightToScreen() {
  return (
    <Section id="insights" className="wide-section">
      <SectionTitle
        eyebrow="De insight a pantalla"
        title="Las pantallas nacieron de decisiones, no de decoración."
        text="Cada hallazgo se convirtió en una decisión UX concreta y después en una superficie visible dentro del producto."
      />

      <div className="insight-stack">
        {insights.map((item, index) => (
          <motion.article
            key={item.insight}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="insight-row"
            style={{ "--accent": item.accent }}
          >
            <div className="insight-number">{String(index + 1).padStart(2, "0")}</div>

            <div>
              <p className="insight-label">Insight</p>
              <h3>{item.insight}</h3>
              <p>{item.evidence}</p>
            </div>

            <div>
              <p className="insight-label">Método</p>
              <p>{item.method}</p>

              <p className="insight-label second">Decisión UX</p>
              <p>{item.decision}</p>
            </div>

            <div className="screen-result">
              <p className="insight-label">Pantalla resultante</p>
              <strong>{item.screen}</strong>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function Benchmark() {
  return (
    <Section id="benchmark">
      <SectionTitle
        eyebrow="Benchmark"
        title="Qué aprendimos de otros companions digitales."
        text="El benchmark no se usó para copiar patrones visuales. Se usó para entender cómo otros productos construyen apego, personalidad y continuidad."
      />

      <div className="reference-grid">
        {references.map((item, index) => (
          <EditorialCard key={item.title} accent={item.accent} className="reference-card">
            <div className="reference-top">
              <span>{item.year}</span>
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>

            <div className="reference-visual">
              <MiniEilik mood={index === 0 ? "thinking" : index === 1 ? "happy" : "idle"} size="sm" />
            </div>

            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <small>{item.learned}</small>
          </EditorialCard>
        ))}
      </div>
    </Section>
  );
}

function Personas() {
  return (
    <Section id="personas">
      <SectionTitle
        eyebrow="UX Personas"
        title="Los perfiles surgieron de patrones emocionales, no de demografía."
        text="Las personas ayudaron a diseñar tono, jerarquía y evidencia de valor para dos formas distintas de aproximarse a la tecnología emocional."
      />

      <div className="persona-grid">
        {personas.map((persona) => (
          <EditorialCard key={persona.name} accent={persona.accent} className="persona-card">
            <div className="persona-head">
              <MiniEilik mood={persona.name === "Alex" ? "thinking" : "happy"} size="sm" />
              <div>
                <p>{persona.profile}</p>
                <h3>{persona.name}, {persona.age}</h3>
              </div>
            </div>

            <div className="persona-columns">
              <div>
                <span>Necesidad</span>
                <p>{persona.need}</p>
              </div>
              <div>
                <span>Fricción</span>
                <p>{persona.friction}</p>
              </div>
              <div>
                <span>Motivación</span>
                <p>{persona.motivation}</p>
              </div>
            </div>
          </EditorialCard>
        ))}
      </div>
    </Section>
  );
}

function JourneyMap() {
  return (
    <Section id="journey" className="wide-section">
      <SectionTitle
        eyebrow="Journey Map"
        title="El objetivo no era mapear tareas. Era entender cómo evoluciona el vínculo."
        text="La experiencia debía acompañar el recorrido desde la curiosidad inicial hasta la convivencia diaria con un companion."
      />

      <div className="journey-grid">
        {journey.map(([num, title, action, emotion, opportunity]) => (
          <EditorialCard key={title} accent={num === "01" ? EILIK_PINK : num === "02" ? EILIK_CYAN : num === "03" ? EILIK_YELLOW : EILIK_VIOLET}>
            <span className="card-index">{num}</span>
            <h3>{title}</h3>
            <p>{action}</p>
            <div className="journey-tag">{emotion}</div>
            <small>{opportunity}</small>
          </EditorialCard>
        ))}
      </div>
    </Section>
  );
}

function ValueProposition() {
  return (
    <Section id="valor">
      <div className="split-layout">
        <SectionTitle
          eyebrow="Propuesta de valor"
          title="Transformar a Eilik de un gadget adorable a un companion digital."
          text="La propuesta conecta personalidad, interacción, IA y bienestar emocional para que el usuario entienda no solo qué hace Eilik, sino por qué podría formar parte de su vida diaria."
        />

        <div className="value-list">
          {[
            ["Para quién", "Personas que buscan compañía ligera, objetos expresivos y tecnología con calidez."],
            ["Necesidad", "Entender rápido qué aporta Eilik y cómo puede integrarse a una rutina."],
            ["Diferenciador", "Personalidad visible, estados emocionales y microinteracciones."],
            ["Valor", "Apego, ternura, calma, conversación y continuidad de uso."],
          ].map(([title, text], index) => (
            <EditorialCard key={title} accent={[EILIK_PINK, EILIK_CYAN, EILIK_YELLOW, EILIK_VIOLET][index]}>
              <span className="card-index">{title}</span>
              <p>{text}</p>
            </EditorialCard>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Architecture() {
  return (
    <Section id="arquitectura">
      <SectionTitle
        eyebrow="Arquitectura"
        title="Traducir hallazgos emocionales en estructura de producto."
        text="La arquitectura organiza la experiencia para explicar, acompañar y demostrar valor progresivamente."
      />

      <div className="architecture-grid">
        {architecture.map(([title, text], index) => (
          <EditorialCard key={title} accent={[EILIK_PINK, EILIK_CYAN, EILIK_YELLOW, EILIK_VIOLET, EILIK_BLUE, EILIK_PINK][index]}>
            <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </EditorialCard>
        ))}
      </div>
    </Section>
  );
}

function Wireframes() {
  return (
    <Section id="wireframes">
      <SectionTitle
        eyebrow="Wireframes"
        title="Validar la secuencia antes del lenguaje visual."
        text="Los wireframes permitieron ordenar jerarquía, narrativa y módulos de conversión antes de diseñar una estética final."
      />

      <div className="wireframe-grid">
        <EditorialCard accent={EILIK_CYAN} className="wireframe-card">
          <p className="wireframe-label">Mobile</p>
          <div className="wireframe-phone">
            <span />
            <i />
            <b />
            <b />
            <em />
          </div>
        </EditorialCard>

        <EditorialCard accent={EILIK_PINK} className="wireframe-card is-wide">
          <p className="wireframe-label">Desktop</p>
          <div className="wireframe-desktop">
            <div />
            <div />
            <div />
          </div>
        </EditorialCard>
      </div>
    </Section>
  );
}

function Mockups() {
  const [device, setDevice] = useState("desktop");

  const content = {
    desktop: {
      title: "Tu companion emocional con IA",
      copy: "Una landing que presenta valor emocional antes que especificaciones técnicas.",
      mood: "happy",
    },
    tablet: {
      title: "¿Cómo te sientes hoy?",
      copy: "Una experiencia intermedia para seleccionar estados y recibir recursos de bienestar.",
      mood: "thinking",
    },
    mobile: {
      title: "Hola, soy Eilik",
      copy: "Acceso rápido a chat, respiración, recuerdos y acompañamiento.",
      mood: "idle",
    },
  };

  return (
    <Section id="mockups" className="wide-section">
      <SectionTitle
        eyebrow="UI / Mockups"
        title="La experiencia toma forma."
        text="Las pantallas se diseñaron para demostrar personalidad, claridad y valor antes de pedir una acción al usuario."
      />

      <div className="mockup-shell">
        <div className="device-tabs">
          {["desktop", "tablet", "mobile"].map((item) => (
            <button key={item} className={device === item ? "active" : ""} onClick={() => setDevice(item)}>
              {item}
            </button>
          ))}
        </div>

        <motion.div
          key={device}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className={`mockup-preview is-${device}`}
        >
          <div className="mockup-window">
            <div className="mockup-nav">
              <span>Eilik IA+</span>
              <small>Companion Experience</small>
            </div>

            <div className="mockup-content">
              <div>
                <p>AI Companion</p>
                <h3>{content[device].title}</h3>
                <span>{content[device].copy}</span>
                <button>Iniciar experiencia</button>
              </div>

              <div className="mockup-robot">
                <MiniEilik mood={content[device].mood} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

function DesignSystem() {
  return (
    <Section id="design-system">
      <SectionTitle
        eyebrow="Design System"
        title="Un sistema visual para expresar calma, ternura y tecnología."
        text="La interfaz necesitaba verse tecnológica sin sentirse fría. Por eso la paleta, los componentes y la tipografía equilibran claridad, emoción y ligereza."
      />

      <div className="system-grid">
        <EditorialCard accent={EILIK_CYAN} className="type-card">
          <p>Tipografía</p>
          <h3>Aa</h3>
          <span>Pesos ligeros, titulares amplios y párrafos con ritmo editorial para mantener claridad.</span>
        </EditorialCard>

        <div className="color-grid">
          {colors.map(([name, value, text]) => (
            <EditorialCard key={name} accent={value} className="color-card">
              <i style={{ background: value }} />
              <h3>{name}</h3>
              <p>{text}</p>
              <small>{value}</small>
            </EditorialCard>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Metrics() {
  return (
    <Section id="metricas">
      <SectionTitle
        eyebrow="Validación"
        title="Métricas para medir claridad, emoción y consistencia."
        text="La medición propuesta se centra en comprobar si la experiencia comunica valor, sostiene interés y hace visible la personalidad del companion."
      />

      <div className="metric-grid">
        {metrics.map(([title, text, value], index) => (
          <EditorialCard key={title} accent={[EILIK_CYAN, EILIK_PINK, EILIK_YELLOW, EILIK_VIOLET][index]} className="metric-card">
            <p>{title}</p>
            <h3>{value}</h3>
            <span>{text}</span>
            <div className="metric-track">
              <motion.i
                initial={{ width: "0%" }}
                whileInView={{ width: value }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: "easeOut" }}
              />
            </div>
          </EditorialCard>
        ))}
      </div>
    </Section>
  );
}

function Conclusion() {
  return (
    <Section id="conclusion">
      <EditorialCard accent={EILIK_PINK} className="conclusion-card">
        <p className="eyebrow">Conclusión</p>
        <h2>El valor de un compañero digital no depende únicamente de la inteligencia artificial.</h2>
        <p>
          Depende de cómo la experiencia transforma tecnología en una relación comprensible, cercana y significativa para las personas.
        </p>
      </EditorialCard>
    </Section>
  );
}

function ContactCTA() {
  return (
    <section id="contacto" className="case-contact reveal-block">
      <div className="contact-glow" />

      <div className="contact-inner">
        <p className="eyebrow">Contacto</p>

        <h2>Diseñemos experiencias que las personas quieran volver a abrir.</h2>

        <p className="contact-copy">
          Producto, servicio, interfaz y tecnología trabajando como una sola arquitectura.
        </p>

        <a href="/contacto" className="contact-btn">
          Ir al área de contacto
        </a>

        <div className="contact-signature">
         <span>PRODUCT DESIGN</span>
          <span>SERVICE DESIGN</span>
          <span>UX/UI DESIGN</span>
          <span>FRONT-END DEVELOPER JR </span>
          <span>AI</span>
        </div>
      </div>
    </section>
  );
}

function EilikCase() {
  return (
    <main className="eilik-case">
      <style>{styles}</style>
      <PortfolioHeader />
      <Hero />
      <Context />
      <ResearchMethods />
      <InsightToScreen />
      <Benchmark />
      <Personas />
      <JourneyMap />
      <ValueProposition />
      <Architecture />
      <Wireframes />
      <Mockups />
      <DesignSystem />
      <Metrics />
      <Conclusion />
      <ContactCTA />
    </main>
  );
}

export default function App() {
  const currentPath = window.location.pathname;

  if (currentPath === "/") {
    return <Home />;
  }

  if (currentPath === "/generacion-i") {
    return <GenerationICaseV2 />;
  }

  if (currentPath === "/experience-build") {
    return <ExperienceBuildFull />;
  }

  if (currentPath === "/ui/mobile" || currentPath === "/ui-showcase/mobile") {
    return <UIMobileWF1 />;
  }

  if (currentPath === "/ui/web" || currentPath === "/ui-showcase/landing-pages") {
    return <UIShowcaseLandingPages />;
  }

  if (currentPath === "/contacto") {
    return <ContactPage />;
  }

  if (currentPath === "/eilik") {
    return <EilikCase />;
  }

  return <Home />;
}

const styles = `
  :root {
    --bg: #030303;
    --text: #F5F5F7;
    --muted: rgba(245,245,247,.66);
    --dim: rgba(245,245,247,.42);
    --line: rgba(255,255,255,.075);
    --cyan: #63B9D4;
    --pink: #F6BBD7;
    --yellow: #F4DA9F;
    --blue: #9DB9FF;
    --violet: #BFA7FF;
  }

  * { box-sizing: border-box; }

  html { scroll-behavior: smooth; }

  body {
    margin: 0;
    background: var(--bg);
  }

  .eilik-case {
    min-height: 100vh;
    overflow-x: hidden;
    color: var(--text);
    background:
      radial-gradient(circle at 74% 8%, rgba(99,185,212,.13), transparent 28%),
      radial-gradient(circle at 18% 14%, rgba(246,187,215,.09), transparent 27%),
      radial-gradient(circle at 50% 100%, rgba(191,167,255,.055), transparent 36%),
      linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px),
      #030303;
    background-size: auto, auto, auto, 96px 96px, 96px 96px, auto;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif;
    text-rendering: geometricPrecision;
    -webkit-font-smoothing: antialiased;
  }

  .project-nav {
    position: fixed;
    left: 50%;
    top: 24px;
    z-index: 100;
    transform: translateX(-50%);
    transition: 320ms cubic-bezier(.22,1,.36,1);
  }

  .project-nav.is-scrolled {
    top: 16px;
    opacity: .94;
    transform: translateX(-50%) scale(.985);
  }

  .project-nav nav {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 6px;
    border-radius: 999px;
    background: rgba(255,255,255,.038);
    border: 1px solid rgba(255,255,255,.068);
    backdrop-filter: blur(34px) saturate(170%);
    -webkit-backdrop-filter: blur(34px) saturate(170%);
    box-shadow:
      0 18px 60px rgba(0,0,0,.34),
      inset 0 1px 0 rgba(255,255,255,.065);
  }

  .project-nav a {
    min-height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    padding: 0 18px;
    color: rgba(255,255,255,.58);
    text-decoration: none;
    font-size: 12px;
    font-weight: 460;
    letter-spacing: .018em;
    transition: 260ms cubic-bezier(.22,1,.36,1);
    white-space: nowrap;
  }

  .project-nav a:hover {
    color: white;
    background: rgba(255,255,255,.055);
    transform: translateY(-1px);
  }

  .eyebrow {
    margin: 0;
    color: rgba(245,245,247,.48);
    font-size: 10px;
    font-weight: 720;
    letter-spacing: .38em;
    text-transform: uppercase;
  }

  .case-hero {
    width: min(100%, 1540px);
    min-height: 100vh;
    margin: 0 auto;
    display: grid;
    grid-template-columns: .95fr 1.05fr;
    align-items: center;
    gap: 78px;
    padding: 140px 42px 90px;
  }

  .hero-copy h1 {
    max-width: 910px;
    margin: 38px 0 0;
    font-size: clamp(4rem, 6.2vw, 7.8rem);
    line-height: 1.04;
    letter-spacing: -.055em;
    font-weight: 380;
  }

  .hero-text {
    max-width: 720px;
    margin: 46px 0 0;
    color: rgba(245,245,247,.69);
    font-size: clamp(1.05rem, 1.26vw, 1.22rem);
    line-height: 1.95;
    font-weight: 400;
    letter-spacing: -.006em;
  }

  .hero-meta {
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
  }

  .hero-meta span {
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 999px;
    background: rgba(255,255,255,.035);
    color: rgba(245,245,247,.64);
    padding: 11px 15px;
    font-size: 10px;
    font-weight: 760;
    letter-spacing: .24em;
    text-transform: uppercase;
  }

  .hero-visual {
    position: relative;
    min-height: 620px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,.055);
    border-radius: 48px;
    background:
      radial-gradient(circle at 50% 45%, rgba(99,185,212,.13), transparent 34%),
      radial-gradient(circle at 73% 76%, rgba(246,187,215,.1), transparent 30%),
      linear-gradient(135deg, rgba(255,255,255,.052), rgba(255,255,255,.014));
    box-shadow: inset 0 1px 0 rgba(255,255,255,.075), 0 38px 110px rgba(0,0,0,.5);
  }

  .interactive-eilik {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    padding: 42px;
  }

  .eilik-stage {
    position: relative;
    width: min(100%, 500px);
    height: 430px;
    display: grid;
    place-items: center;
    border: 0;
    background: transparent;
    cursor: pointer;
  }

  .stage-glow {
    position: absolute;
    width: 330px;
    height: 330px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99,185,212,.22), transparent 65%);
    filter: blur(24px);
    animation: breathe 4.5s ease-in-out infinite;
  }

  .state-panel {
    position: absolute;
    left: 42px;
    right: 42px;
    bottom: 42px;
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 28px;
    background: rgba(0,0,0,.28);
    padding: 22px;
    backdrop-filter: blur(18px);
  }

  .state-panel p {
    margin: 0;
    color: var(--cyan);
    font-size: 10px;
    font-weight: 780;
    letter-spacing: .28em;
    text-transform: uppercase;
  }

  .state-panel h3 {
    margin: 10px 0 0;
    color: white;
    font-size: 18px;
    line-height: 1.5;
    font-weight: 430;
    letter-spacing: -.015em;
  }

  .state-panel span {
    display: inline-flex;
    margin-top: 14px;
    color: rgba(245,245,247,.46);
    font-size: 12px;
  }

  .state-dots {
    position: absolute;
    top: 42px;
    right: 42px;
    display: flex;
    gap: 8px;
  }

  .state-dots button {
    width: 9px;
    height: 9px;
    border: 0;
    border-radius: 999px;
    background: rgba(255,255,255,.22);
    transition: 260ms ease;
  }

  .state-dots button.active {
    width: 34px;
    background: var(--pink);
  }

  .mini-eilik {
    position: relative;
    width: 220px;
    height: 270px;
    display: grid;
    place-items: center;
    filter: drop-shadow(0 0 70px var(--glow));
  }

  .mini-eilik.is-small {
    width: 82px;
    height: 92px;
  }

  .mini-eilik-body {
    position: relative;
    width: 190px;
    height: 240px;
    border-radius: 62px;
    background: var(--body);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.95), 0 28px 80px rgba(0,0,0,.42);
  }

  .mini-eilik.is-small .mini-eilik-body {
    width: 66px;
    height: 82px;
    border-radius: 24px;
  }

  .mini-eilik-face {
    position: absolute;
    left: 50%;
    top: 34px;
    width: 132px;
    height: 92px;
    transform: translateX(-50%);
    border-radius: 34px;
    background: #050505;
  }

  .mini-eilik.is-small .mini-eilik-face {
    top: 13px;
    width: 46px;
    height: 34px;
    border-radius: 13px;
  }

  .mini-eilik-eye,
  .mini-eilik-dot {
    position: absolute;
    top: 35px;
    width: 26px;
    height: 16px;
    border-radius: 999px;
    background: var(--eye);
    box-shadow: 0 0 18px var(--eye);
  }

  .mini-eilik.is-small .mini-eilik-eye,
  .mini-eilik.is-small .mini-eilik-dot {
    top: 14px;
    width: 10px;
    height: 7px;
  }

  .mini-eilik-eye.left,
  .mini-eilik-dot.left { left: 30px; }

  .mini-eilik-eye.right,
  .mini-eilik-dot.right { right: 30px; }

  .mini-eilik.is-small .mini-eilik-eye.left,
  .mini-eilik.is-small .mini-eilik-dot.left { left: 9px; }

  .mini-eilik.is-small .mini-eilik-eye.right,
  .mini-eilik.is-small .mini-eilik-dot.right { right: 9px; }

  .mini-eilik-eye.is-flat {
    height: 3px;
    top: 41px;
  }

  .mini-eilik-mouth {
    position: absolute;
    left: 50%;
    bottom: 20px;
    width: 62px;
    height: 18px;
    transform: translateX(-50%);
    border-bottom: 4px solid var(--eye);
    border-radius: 0 0 999px 999px;
  }

  .mini-eilik.is-small .mini-eilik-mouth {
    bottom: 7px;
    width: 24px;
    height: 8px;
    border-bottom-width: 2px;
  }

  .mini-eilik-mouth.is-flat {
    height: 3px;
    border-bottom: 3px solid var(--eye);
    border-radius: 999px;
  }

  .loading-dots {
    position: absolute;
    left: 50%;
    bottom: 20px;
    display: flex;
    gap: 7px;
    transform: translateX(-50%);
  }

  .loading-dots i {
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: var(--eye);
    animation: dotBounce 1s ease-in-out infinite;
  }

  .loading-dots i:nth-child(2) { animation-delay: .15s; }
  .loading-dots i:nth-child(3) { animation-delay: .3s; }

  .spark {
    position: absolute;
    top: 30px;
    color: var(--eye);
    font-size: 28px;
  }

  .spark.left { left: 32px; }
  .spark.right { right: 32px; }

  .mini-eilik-arm {
    position: absolute;
    top: 122px;
    width: 26px;
    height: 82px;
    border-radius: 999px;
    background: #E5E7EB;
  }

  .mini-eilik.is-small .mini-eilik-arm {
    top: 40px;
    width: 8px;
    height: 28px;
  }

  .mini-eilik-arm.left {
    left: -20px;
    rotate: 12deg;
  }

  .mini-eilik-arm.right {
    right: -20px;
    rotate: -12deg;
  }

  .case-section {
    width: min(100% - 84px, 1540px);
    margin: 0 auto 42px;
    padding: 76px 52px;
    border: 1px solid rgba(255,255,255,.055);
    border-radius: 46px;
    background: linear-gradient(135deg, rgba(255,255,255,.044), rgba(255,255,255,.014));
    box-shadow: inset 0 1px 0 rgba(255,255,255,.065), 0 24px 80px rgba(0,0,0,.28);
    backdrop-filter: blur(16px);
  }

  .wide-section {
    width: min(100% - 84px, 1640px);
  }

  .section-title {
    margin-bottom: 54px;
  }

  .section-title.is-center {
    text-align: center;
  }

  .section-title h2 {
    max-width: 1050px;
    margin: 26px 0 0;
    font-size: clamp(2.45rem, 3.8vw, 5.1rem);
    line-height: 1.12;
    letter-spacing: -.045em;
    font-weight: 420;
  }

  .section-lead {
    max-width: 790px;
    margin: 30px 0 0;
    color: rgba(245,245,247,.64);
    font-size: 18px;
    line-height: 1.95;
    font-weight: 400;
    letter-spacing: -.006em;
  }

  .split-layout {
    display: grid;
    grid-template-columns: .9fr 1.1fr;
    gap: 52px;
    align-items: center;
  }

  .editorial-card {
    position: relative;
    overflow: hidden;
    min-height: 100%;
    border: 1px solid rgba(255,255,255,.065);
    border-radius: 34px;
    padding: 30px;
    background: rgba(0,0,0,.18);
    transition: 300ms cubic-bezier(.22,1,.36,1);
  }

  .editorial-card::after {
    content: "";
    position: absolute;
    inset: auto 20px -40px;
    height: 90px;
    background: var(--accent);
    opacity: .13;
    filter: blur(54px);
    transition: 300ms ease;
  }

  .editorial-card:hover {
    transform: translateY(-6px);
    border-color: color-mix(in srgb, var(--accent), transparent 58%);
  }

  .editorial-card:hover::after {
    opacity: .3;
  }

  .editorial-card > * {
    position: relative;
    z-index: 1;
  }

  .editorial-card h3 {
    margin: 26px 0 0;
    color: white;
    font-size: 24px;
    line-height: 1.18;
    letter-spacing: -.028em;
    font-weight: 560;
  }

  .editorial-card p {
    margin: 18px 0 0;
    color: rgba(245,245,247,.62);
    font-size: 14px;
    line-height: 1.9;
    font-weight: 400;
    letter-spacing: -.006em;
  }

  .editorial-card small {
    display: inline-flex;
    margin-top: 28px;
    color: color-mix(in srgb, var(--accent), white 18%);
    font-size: 12px;
    line-height: 1.55;
    font-weight: 720;
    letter-spacing: .05em;
    text-transform: uppercase;
  }

  .card-index {
    color: color-mix(in srgb, var(--accent), white 10%);
    font-size: 11px;
    font-weight: 820;
    letter-spacing: .22em;
    text-transform: uppercase;
  }

  .highlight-card {
    padding: 42px;
  }

  .highlight-card p {
    margin: 0;
    color: var(--pink);
    font-size: 11px;
    font-weight: 820;
    letter-spacing: .28em;
    text-transform: uppercase;
  }

  .highlight-card h3 {
    margin-top: 22px;
    font-size: clamp(2rem, 3vw, 4rem);
    line-height: 1.15;
    letter-spacing: -.04em;
    font-weight: 420;
  }

  .method-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }

  .insight-stack {
    display: grid;
    gap: 18px;
  }

  .insight-row {
    display: grid;
    grid-template-columns: 80px 1.2fr .9fr .8fr;
    gap: 26px;
    align-items: stretch;
    border: 1px solid rgba(255,255,255,.065);
    border-radius: 34px;
    background: rgba(0,0,0,.18);
    padding: 28px;
  }

  .insight-row:hover {
    border-color: color-mix(in srgb, var(--accent), transparent 58%);
  }

  .insight-number {
    display: grid;
    place-items: center;
    width: 56px;
    height: 56px;
    border-radius: 18px;
    background: color-mix(in srgb, var(--accent), transparent 86%);
    color: var(--accent);
    font-weight: 820;
    letter-spacing: .14em;
  }

  .insight-label {
    margin: 0 0 12px;
    color: var(--accent);
    font-size: 10px;
    font-weight: 820;
    letter-spacing: .28em;
    text-transform: uppercase;
  }

  .insight-label.second {
    margin-top: 26px;
  }

  .insight-row h3 {
    margin: 0;
    font-size: 28px;
    line-height: 1.18;
    letter-spacing: -.035em;
    font-weight: 520;
  }

  .insight-row p {
    margin: 0;
    color: rgba(245,245,247,.62);
    font-size: 14px;
    line-height: 1.86;
  }

  .insight-row h3 + p {
    margin-top: 18px;
  }

  .screen-result {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid rgba(255,255,255,.065);
    border-radius: 24px;
    background: color-mix(in srgb, var(--accent), transparent 94%);
    padding: 22px;
  }

  .screen-result strong {
    color: white;
    font-size: 18px;
    line-height: 1.45;
    font-weight: 520;
    letter-spacing: -.015em;
  }

  .reference-grid,
  .journey-grid,
  .architecture-grid,
  .metric-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .architecture-grid {
    grid-template-columns: repeat(6, 1fr);
  }

  .metric-grid {
    grid-template-columns: repeat(4, 1fr);
  }

  .reference-top {
    display: flex;
    justify-content: space-between;
    color: rgba(245,245,247,.4);
    font-size: 12px;
    font-weight: 780;
    letter-spacing: .18em;
  }

  .reference-visual {
    min-height: 190px;
    display: grid;
    place-items: center;
    border: 1px solid rgba(255,255,255,.065);
    border-radius: 26px;
    background: rgba(255,255,255,.025);
    margin-top: 28px;
  }

  .persona-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .persona-card {
    padding: 34px;
  }

  .persona-head {
    display: flex;
    align-items: center;
    gap: 26px;
  }

  .persona-head p {
    margin: 0 0 8px;
    color: color-mix(in srgb, var(--accent), white 10%);
    font-size: 11px;
    font-weight: 800;
    letter-spacing: .18em;
    text-transform: uppercase;
  }

  .persona-head h3 {
    margin: 0;
    font-size: 38px;
  }

  .persona-columns {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
    margin-top: 34px;
  }

  .persona-columns div {
    border: 1px solid rgba(255,255,255,.065);
    border-radius: 24px;
    background: rgba(255,255,255,.025);
    padding: 22px;
  }

  .persona-columns span {
    color: color-mix(in srgb, var(--accent), white 10%);
    font-size: 10px;
    font-weight: 820;
    letter-spacing: .22em;
    text-transform: uppercase;
  }

  .journey-grid {
    grid-template-columns: repeat(5, 1fr);
  }

  .journey-tag {
    display: inline-flex;
    width: fit-content;
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 999px;
    margin-top: 24px;
    padding: 9px 12px;
    color: white;
    background: rgba(255,255,255,.04);
    font-size: 12px;
  }

  .value-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }

  .architecture-grid .editorial-card {
    min-height: 260px;
  }

  .wireframe-grid {
    display: grid;
    grid-template-columns: .8fr 1.2fr;
    gap: 24px;
  }

  .wireframe-label {
    margin: 0 !important;
    color: var(--cyan) !important;
    font-size: 11px !important;
    font-weight: 820 !important;
    letter-spacing: .28em !important;
    text-transform: uppercase;
  }

  .wireframe-phone {
    width: 250px;
    height: 430px;
    margin: 36px auto 0;
    border: 12px solid rgba(255,255,255,.16);
    border-radius: 42px;
    background: rgba(255,255,255,.06);
    padding: 26px;
  }

  .wireframe-phone span,
  .wireframe-phone i,
  .wireframe-phone b,
  .wireframe-phone em {
    display: block;
    border-radius: 18px;
    background: rgba(255,255,255,.18);
  }

  .wireframe-phone span {
    width: 70px;
    height: 10px;
    margin: 0 auto 34px;
  }

  .wireframe-phone i {
    height: 96px;
    margin-bottom: 22px;
  }

  .wireframe-phone b {
    height: 16px;
    margin-bottom: 14px;
  }

  .wireframe-phone em {
    height: 74px;
    margin-top: 28px;
  }

  .wireframe-desktop {
    margin-top: 36px;
    border-radius: 28px;
    border: 1px solid rgba(255,255,255,.08);
    background: rgba(255,255,255,.05);
    padding: 28px;
  }

  .wireframe-desktop div:nth-child(1) {
    height: 52px;
    border-radius: 18px;
    background: rgba(255,255,255,.16);
  }

  .wireframe-desktop div:nth-child(2) {
    height: 220px;
    margin-top: 34px;
    border-radius: 24px;
    background: rgba(255,255,255,.10);
  }

  .wireframe-desktop div:nth-child(3) {
    height: 150px;
    margin-top: 22px;
    border-radius: 24px;
    background: rgba(255,255,255,.075);
  }

  .mockup-shell {
    border: 1px solid rgba(255,255,255,.065);
    border-radius: 40px;
    background: rgba(0,0,0,.18);
    padding: 24px;
  }

  .device-tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 24px;
  }

  .device-tabs button {
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 999px;
    background: rgba(255,255,255,.035);
    color: rgba(245,245,247,.6);
    padding: 11px 16px;
    text-transform: capitalize;
    cursor: pointer;
  }

  .device-tabs button.active {
    color: #050505;
    background: white;
  }

  .mockup-preview {
    min-height: 570px;
    display: grid;
    place-items: center;
    border-radius: 30px;
    background:
      radial-gradient(circle at 40% 40%, rgba(99,185,212,.12), transparent 38%),
      radial-gradient(circle at 80% 70%, rgba(246,187,215,.1), transparent 34%),
      rgba(255,255,255,.025);
  }

  .mockup-preview.is-tablet .mockup-window {
    max-width: 760px;
  }

  .mockup-preview.is-mobile .mockup-window {
    max-width: 360px;
    min-height: 560px;
    border-radius: 46px;
  }

  .mockup-window {
    width: min(100%, 1080px);
    min-height: 520px;
    border: 1px solid rgba(255,255,255,.1);
    border-radius: 34px;
    background: #F7FBFF;
    color: #0F172A;
    padding: 30px;
    box-shadow: 0 40px 120px rgba(0,0,0,.45);
  }

  .mockup-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .mockup-nav span {
    font-weight: 850;
    letter-spacing: -.03em;
    font-size: 24px;
  }

  .mockup-nav small {
    color: #64748B;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: .18em;
  }

  .mockup-content {
    display: grid;
    grid-template-columns: 1fr .8fr;
    gap: 42px;
    align-items: center;
    min-height: 430px;
  }

  .mockup-preview.is-mobile .mockup-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .mockup-content p {
    margin: 0;
    color: #63B9D4;
    font-size: 11px;
    font-weight: 820;
    letter-spacing: .26em;
    text-transform: uppercase;
  }

  .mockup-content h3 {
    margin: 20px 0 0;
    color: #0F172A;
    font-size: clamp(2.5rem, 4vw, 5rem);
    line-height: 1.04;
    letter-spacing: -.06em;
  }

  .mockup-content span {
    display: block;
    max-width: 520px;
    margin-top: 24px;
    color: #475569;
    font-size: 18px;
    line-height: 1.75;
  }

  .mockup-content button {
    margin-top: 32px;
    border: 0;
    border-radius: 999px;
    background: #63B9D4;
    color: white;
    padding: 16px 24px;
    font-weight: 800;
  }

  .mockup-robot {
    display: grid;
    place-items: center;
    min-height: 300px;
    border-radius: 34px;
    background: linear-gradient(135deg, rgba(246,187,215,.32), rgba(99,185,212,.28));
  }

  .system-grid {
    display: grid;
    grid-template-columns: .75fr 1.25fr;
    gap: 24px;
  }

  .type-card h3 {
    margin-top: 30px;
    font-size: clamp(6rem, 10vw, 12rem);
    line-height: .8;
    letter-spacing: -.08em;
    font-weight: 420;
  }

  .type-card span {
    display: block;
    max-width: 420px;
    margin-top: 34px;
    color: rgba(245,245,247,.62);
    line-height: 1.9;
  }

  .color-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }

  .color-card i {
    display: block;
    width: 72px;
    height: 72px;
    border-radius: 22px;
    box-shadow: 0 0 34px color-mix(in srgb, var(--accent), transparent 62%);
  }

  .metric-card h3 {
    margin-top: 20px;
    font-size: 64px;
    line-height: 1;
    font-weight: 380;
    color: white;
  }

  .metric-card span {
    display: block;
    margin-top: 22px;
    color: rgba(245,245,247,.62);
    line-height: 1.8;
  }

  .metric-track {
    height: 7px;
    margin-top: 30px;
    border-radius: 999px;
    background: rgba(255,255,255,.08);
    overflow: hidden;
  }

  .metric-track i {
    display: block;
    height: 100%;
    border-radius: 999px;
    background: var(--accent);
  }

  .conclusion-card {
    padding: 54px;
  }

  .conclusion-card h2 {
    max-width: 1000px;
    margin: 28px 0 0;
    font-size: clamp(2.5rem, 4vw, 5.3rem);
    line-height: 1.12;
    letter-spacing: -.045em;
    font-weight: 420;
  }

  .conclusion-card p:not(.eyebrow) {
    max-width: 820px;
    margin-top: 34px;
    color: rgba(245,245,247,.66);
    font-size: 18px;
    line-height: 1.95;
  }

  .case-contact {
    width: min(100% - 84px, 1540px);
    position: relative;
    overflow: hidden;
    padding: 140px 60px 90px;
    text-align: center;
    margin: 0 auto 80px;
    border: 1px solid rgba(255,255,255,.055);
    border-radius: 46px;
    background: linear-gradient(135deg, rgba(255,255,255,.044), rgba(255,255,255,.014));
    box-shadow: inset 0 1px 0 rgba(255,255,255,.065), 0 24px 80px rgba(0,0,0,.28);
  }

  .contact-glow {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 50% 45%, rgba(246,187,215,.11), transparent 30%),
      radial-gradient(circle at 50% 75%, rgba(99,185,212,.08), transparent 32%);
    filter: blur(30px);
    pointer-events: none;
  }

  .contact-inner {
    position: relative;
    z-index: 2;
    max-width: 1100px;
    margin: 0 auto;
  }

  .case-contact .eyebrow {
    margin-bottom: 26px;
  }

  .case-contact h2 {
    max-width: 980px;
    margin: 0 auto;
    font-size: clamp(3.4rem, 5vw, 6.4rem);
    line-height: 1.14;
    letter-spacing: -.04em;
    font-weight: 400;
  }

  .contact-copy {
    max-width: 640px;
    margin: 42px auto 0;
    color: rgba(245,245,247,.58);
    font-size: 18px;
    line-height: 1.95;
    font-weight: 400;
    letter-spacing: -.004em;
  }

  .contact-btn {
    margin-top: 48px;
    min-height: 54px;
    padding: 0 32px;
    border-radius: 999px;
    background: white;
    color: #050505;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -.01em;
    transition: all .3s ease;
    box-shadow: 0 20px 60px rgba(255,255,255,.12);
  }

  .contact-btn:hover {
    transform: translateY(-3px);
  }

  .contact-signature {
    margin-top: 70px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 26px;
    color: rgba(255,255,255,.24);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .18em;
    text-transform: uppercase;
  }

  .contact-signature span {
    position: relative;
  }

  .contact-signature span:not(:last-child)::after {
    content: "•";
    position: absolute;
    right: -16px;
    color: rgba(255,255,255,.12);
  }

  .reveal-1,
  .reveal-2,
  .reveal-3,
  .reveal-block {
    animation: fadeBlurUp .9s cubic-bezier(.22,1,.36,1) both;
  }

  .reveal-2 { animation-delay: .08s; }
  .reveal-3 { animation-delay: .16s; }

  @keyframes fadeBlurUp {
    from {
      opacity: 0;
      filter: blur(16px);
      transform: translateY(24px);
    }
    to {
      opacity: 1;
      filter: blur(0);
      transform: translateY(0);
    }
  }

  @keyframes breathe {
    0%, 100% { scale: .92; opacity: .55; }
    50% { scale: 1.08; opacity: .92; }
  }

  @keyframes dotBounce {
    0%, 100% { transform: translateY(0); opacity: .55; }
    50% { transform: translateY(-5px); opacity: 1; }
  }

  @media (max-width: 1280px) {
    .case-hero,
    .split-layout,
    .system-grid {
      grid-template-columns: 1fr;
    }

    .method-grid,
    .reference-grid,
    .metric-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .architecture-grid,
    .journey-grid {
      grid-template-columns: repeat(3, 1fr);
    }

    .insight-row {
      grid-template-columns: 60px 1fr;
    }

    .screen-result {
      grid-column: 2;
    }
  }

  @media (max-width: 900px) {
    .case-hero {
      padding: 120px 22px 54px;
      gap: 42px;
    }

    .hero-copy h1 {
      font-size: clamp(3.1rem, 13vw, 5rem);
      line-height: 1.08;
      letter-spacing: -.05em;
    }

    .hero-visual {
      min-height: 560px;
      border-radius: 34px;
    }

    .case-section,
    .case-contact {
      width: calc(100% - 28px);
      padding: 38px 22px;
      border-radius: 32px;
    }

    .section-title h2,
    .case-contact h2 {
      font-size: clamp(2.15rem, 11vw, 3.7rem);
      line-height: 1.14;
      letter-spacing: -.04em;
    }

    .section-lead,
    .hero-text,
    .contact-copy {
      font-size: 16px;
      line-height: 1.86;
    }

    .method-grid,
    .reference-grid,
    .metric-grid,
    .architecture-grid,
    .journey-grid,
    .value-list,
    .persona-columns,
    .wireframe-grid,
    .color-grid {
      grid-template-columns: 1fr;
    }

    .insight-row {
      grid-template-columns: 1fr;
    }

    .screen-result {
      grid-column: auto;
    }

    .mockup-content {
      grid-template-columns: 1fr;
    }

    .project-nav {
      top: 14px;
      width: calc(100% - 28px);
    }

    .project-nav nav {
      justify-content: center;
      width: 100%;
      overflow-x: auto;
      scrollbar-width: none;
    }

    .project-nav nav::-webkit-scrollbar {
      display: none;
    }

    .project-nav a {
      padding: 0 13px;
      font-size: 12px;
    }

    .contact-signature {
      gap: 14px;
      font-size: 10px;
    }

    .contact-signature span:not(:last-child)::after {
      right: -10px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation: none !important;
      transition: none !important;
      scroll-behavior: auto !important;
    }
  }
`;
