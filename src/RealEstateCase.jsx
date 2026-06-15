import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const IMG = {
  hero: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=90",
  land: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=90",
  house: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=90",
  construction: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=90",
  office: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=90",
  event: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=90",
  neighborhood: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=90",
  blueprint: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=90",
  facade: "https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=1600&q=90",
};

const brand = {
  cream: "#F5EFE7",
  slate: "#C8D9E6",
  blue: "#9DB9FF",
  violet: "#BFA7FF",
  magenta: "#E7A7FF",
  pink: "#FFC1D9",
  mint: "#BFEAD8",
  sand: "#D8B98A",
};

const smooth = [0.22, 1, 0.36, 1];

const scenarios = [
  {
    id: "family",
    title: "Casa familiar",
    short: "Hogar + patrimonio",
    image: IMG.house,
    value: "Patrimonio familiar",
    roi: 18,
    icon: "⌂",
    promise: "Convertir un terreno vacío en un hogar posible.",
    narrative: "La experiencia ayuda a imaginar vida diaria, seguridad, espacio y patrimonio antes de pedir una cita.",
    metrics: { confidence: 86, leadScore: 92, roi: 18, visitIntent: 74, doubtsReduction: 30 },
  },
  {
    id: "business",
    title: "Negocio / Local",
    short: "Flujo comercial",
    image: IMG.office,
    value: "ROI estimado",
    roi: 22,
    icon: "▦",
    promise: "Evaluar el terreno como punto de operación y venta.",
    narrative: "El usuario entiende accesos, visibilidad, flujo peatonal y retorno potencial antes de hablar con un asesor.",
    metrics: { confidence: 82, leadScore: 88, roi: 22, visitIntent: 78, doubtsReduction: 28 },
  },
  {
    id: "events",
    title: "Salón de eventos",
    short: "Renta potencial",
    image: IMG.event,
    value: "Renta potencial",
    roi: 26,
    icon: "◇",
    promise: "Visualizar el terreno como una fuente de ingresos recurrentes.",
    narrative: "El terreno deja de ser superficie y se convierte en experiencia social: capacidad, renta, eventos y operación.",
    metrics: { confidence: 79, leadScore: 84, roi: 26, visitIntent: 81, doubtsReduction: 26 },
  },
  {
    id: "mixed",
    title: "Proyecto mixto",
    short: "Vivienda + inversión",
    image: IMG.hero,
    value: "Mayor versatilidad",
    roi: 31,
    icon: "◫",
    promise: "Combinar vida, negocio y plusvalía en un solo proyecto.",
    narrative: "La plataforma ayuda a pensar en fases: construir, habitar, rentar, operar y escalar el valor del activo.",
    metrics: { confidence: 88, leadScore: 94, roi: 31, visitIntent: 83, doubtsReduction: 32 },
  },
];

const methods = [
  {
    title: "Entrevistas con asesores",
    question: "¿Qué dudas se repetían antes de agendar una visita?",
    finding: "Los leads llegaban con preguntas básicas sobre uso, ubicación, construcción y potencial.",
    accent: brand.blue,
  },
  {
    title: "Preguntas frecuentes",
    question: "¿Dónde se atoraba la decisión?",
    finding: "La mayor fricción no era el precio: era imaginar qué podía construirse y si valía la pena.",
    accent: brand.pink,
  },
  {
    title: "Benchmark inmobiliario",
    question: "¿Qué hacen las plataformas actuales?",
    finding: "El mercado resuelve búsqueda y filtros, pero casi nunca ayuda a proyectar posibilidades futuras.",
    accent: brand.violet,
  },
  {
    title: "Mapeo comercial",
    question: "¿Qué necesitaba operación para vender mejor?",
    finding: "El asesor necesitaba leads con contexto, intención y preguntas más avanzadas.",
    accent: brand.mint,
  },
];

const findings = [
  {
    title: "El usuario preguntaba: ¿qué puedo construir aquí?",
    insight: "El usuario no compra tierra. Compra una posibilidad futura.",
    decision: "Diseñar escenarios interactivos según intención: vivir, invertir, rentar u operar.",
    screen: "Configurador IA de terrenos.",
    accent: brand.blue,
  },
  {
    title: "La ubicación se interpretaba como dato, no como valor.",
    insight: "Un mapa no genera confianza si no explica rutina, seguridad y entorno.",
    decision: "Convertir ubicación en lectura contextual: accesos, servicios, tiempos y plusvalía.",
    screen: "Ubicación exacta contextual.",
    accent: brand.mint,
  },
  {
    title: "La construcción generaba desconfianza porque era invisible.",
    insight: "La calidad constructiva necesita evidencia antes de pedir contacto.",
    decision: "Mostrar etapas, materiales, avance y criterios de confianza.",
    screen: "Transparencia constructiva.",
    accent: brand.sand,
  },
  {
    title: "El asesor recibía dudas repetidas y leads poco calificados.",
    insight: "La experiencia debía preparar mejor la conversación comercial.",
    decision: "Diseñar un dashboard de decisión con score, intención y métricas.",
    screen: "Decision Dashboard + lead score.",
    accent: brand.pink,
  },
];

const strategy = [
  ["Usuario", "Entender posibilidades antes de contactar.", "Menos incertidumbre"],
  ["Negocio", "Recibir leads más calificados.", "Mejor conversación"],
  ["Servicio", "Conectar pantalla, asesoría y operación.", "Menos fricción"],
  ["Producto", "Pasar de catálogo a herramienta de decisión.", "Más valor"],
];

const architecture = [
  ["Intención", "¿Qué quiere lograr?", "Vivir, invertir, rentar u operar."],
  ["Escenario", "¿Cómo se ve el futuro?", "Casa, negocio, eventos o mixto."],
  ["Contexto", "¿Dónde está el valor?", "Ubicación, entorno y plusvalía."],
  ["Evidencia", "¿Por qué confiar?", "Construcción, avance y materiales."],
  ["Decisión", "¿Conviene avanzar?", "Dashboard, ROI y lead score."],
  ["Contacto", "¿Qué sigue?", "Asesor con contexto útil."],
];

const journey = [
  ["Descubre", "Curiosidad", "No sabe por dónde empezar", "Guiar por intención."],
  ["Explora", "Interés", "La información se siente incompleta", "Fichas más claras."],
  ["Visualiza", "Duda", "No imagina el terreno", "Escenarios generados."],
  ["Confía", "Seguridad", "Falta evidencia", "Historial constructivo."],
  ["Contacta", "Decisión", "Dudas repetitivas", "Lead más calificado."],
];

const blueprint = [
  ["Usuario", "Busca", "Visualiza", "Compara", "Contacta", "Visita"],
  ["Frontstage", "Home", "Configurador", "Dashboard", "Formulario", "Agenda"],
  ["Backstage", "Catálogo", "Escenarios IA", "Lead score", "CRM", "Asesor"],
  ["Operación", "Inventario", "Datos", "Seguimiento", "Disponibilidad", "Cierre"],
];

const construction = [
  ["Cimentación", "Base estructural y preparación del terreno.", IMG.construction],
  ["Estructura", "Volumetría, avance y calidad visible.", IMG.blueprint],
  ["Instalaciones", "Elementos técnicos que suelen ser invisibles.", IMG.construction],
  ["Fachada", "Cierre visual y percepción de valor.", IMG.facade],
];

const results = [
  ["+32%", "Reducción de dudas", "Menos preguntas repetitivas antes del contacto."],
  ["94", "Lead score", "Mayor claridad sobre intención de compra."],
  ["+31%", "ROI estimado", "Escenarios de inversión más tangibles."],
  ["83%", "Intención de visita", "Mejor transición de exploración a acción."],
];

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return progress;
}

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

function ProgressBar({ progress }) {
  return (
    <div className="case-progress" aria-hidden="true">
      <span style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="section-title">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function CaseSection({ id, children, className = "" }) {
  return (
    <section id={id} className={`case-section ${className}`}>
      {children}
    </section>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="mini-stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Hero({ active, setActive, current }) {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <p className="eyebrow reveal-1">Case Study · Real Estate Experience</p>

        <h1 className="reveal-2">
          Bienes Raíces Guzmán
          <span>De propiedades a posibilidades.</span>
        </h1>

        <p className="hero-text reveal-3">
          Rediseño estratégico para transformar un catálogo inmobiliario en una experiencia de decisión: visualizar, confiar, comparar y avanzar con más claridad antes de pedir una cita.
        </p>

        <div className="hero-meta reveal-3">
          <MiniStat label="Product" value="Strategy · Research" />
          <MiniStat label="Service" value="Journey · Blueprint" />
          <MiniStat label="Front-End" value="React · Motion · UI" />
        </div>
      </div>

      <ScenarioStage current={current} />

      <div className="scenario-tabs">
        {scenarios.map((item, index) => (
          <button
            key={item.id}
            className={active === index ? "active" : ""}
            onClick={() => setActive(index)}
            style={{ "--accent": active === index ? brand.slate : "rgba(255,255,255,.25)" }}
          >
            <span>{item.icon}</span>
            <strong>{item.title}</strong>
            <small>{item.short} · +{item.roi}%</small>
          </button>
        ))}
      </div>
    </section>
  );
}

function ScenarioStage({ current }) {
  const phases = useMemo(() => {
    if (current.id === "family") return ["Hogar", "Patrimonio", "Seguridad", "Visita"];
    if (current.id === "business") return ["Ubicación", "Flujo", "ROI", "Operación"];
    if (current.id === "events") return ["Capacidad", "Renta", "Operación", "Agenda"];
    return ["Construir", "Habitar", "Rentar", "Escalar"];
  }, [current]);

  return (
    <motion.div
      key={current.id}
      initial={{ opacity: 0, scale: 0.965, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: smooth }}
      className="scenario-stage reveal-3"
    >
      <div className="stage-inner">
        <AnimatePresence mode="wait">
          <motion.img
            key={current.image}
            src={current.image}
            alt={current.title}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.75, ease: smooth }}
          />
        </AnimatePresence>

        <div className="stage-grid" />
        <div className="stage-overlay" />

        <div className="floating-kpi top">
          <span>ROI estimado</span>
          <strong>+{current.roi}%</strong>
        </div>

        <div className="floating-kpi bottom">
          <span>Lead Score</span>
          <strong>{current.metrics.leadScore}</strong>
        </div>

        <div className="stage-card">
          <p>Escenario activo</p>
          <h3>{current.icon} {current.title}</h3>
          <span>{current.promise}</span>

          <div className="phase-list">
            {phases.map((phase, index) => (
              <div key={phase}>
                <i>{index + 1}</i>
                <small>{phase}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Problem() {
  return (
    <CaseSection id="problema" className="problem-section">
      <div className="split-grid">
        <SectionTitle
          eyebrow="01 · Problema redefinido"
          title="El terreno no era el producto. La posibilidad era el producto."
          text="El reto real no era mostrar más fotos o más metros cuadrados. Era ayudar al usuario a transformar incertidumbre en imaginación, confianza y decisión."
        />

        <div className="problem-card">
          <img src={IMG.land} alt="Terreno vacío" />
          <div>
            <p>Antes</p>
            <h3>Terreno vacío</h3>
            <span>El usuario veía tierra, precio y medidas. No podía imaginar vida, negocio, renta, plusvalía ni futuro.</span>
          </div>
        </div>
      </div>

      <div className="central-insight">
        <p>Insight central</p>
        <h3>El usuario no abandona porque no le guste el terreno; abandona porque no alcanza a imaginar qué puede construir con él.</h3>
      </div>
    </CaseSection>
  );
}

function Discovery() {
  return (
    <CaseSection id="discovery">
      <SectionTitle
        eyebrow="02 · Cómo descubrimos el problema"
        title="Antes de diseñar pantallas, había que entender por qué la decisión se detenía."
        text="La investigación conectó señales de usuario, negocio y operación para ubicar el problema real: el catálogo resolvía búsqueda, pero no ayudaba a imaginar ni a confiar."
      />

      <div className="method-grid">
        {methods.map((item, index) => (
          <article key={item.title} style={{ "--accent": item.accent }}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            <p>{item.question}</p>
            <strong>{item.finding}</strong>
          </article>
        ))}
      </div>
    </CaseSection>
  );
}

function Findings() {
  return (
    <CaseSection id="hallazgos">
      <SectionTitle
        eyebrow="03 · Hallazgos e insights"
        title="Los insights no aparecieron como frases bonitas. Salieron de preguntas repetidas, fricciones comerciales y comportamiento de decisión."
        text="Cada hallazgo se tradujo en una decisión UX concreta para que la experiencia no solo informara, sino que ayudara a decidir."
      />

      <div className="finding-list">
        {findings.map((item, index) => (
          <article key={item.title} style={{ "--accent": item.accent }}>
            <div className="finding-index">{String(index + 1).padStart(2, "0")}</div>

            <div>
              <p>Hallazgo</p>
              <h3>{item.title}</h3>
            </div>

            <div>
              <p>Insight</p>
              <span>{item.insight}</span>
            </div>

            <div>
              <p>Decisión UX</p>
              <span>{item.decision}</span>
            </div>

            <div className="screen-result">
              <p>Pantalla resultante</p>
              <strong>{item.screen}</strong>
            </div>
          </article>
        ))}
      </div>
    </CaseSection>
  );
}

function Strategy() {
  return (
    <CaseSection id="estrategia">
      <SectionTitle
        eyebrow="04 · Estrategia de experiencia"
        title="La estrategia fue alinear deseo del usuario, objetivo comercial y operación."
        text="El rediseño tenía que generar una experiencia más clara para el comprador y una conversación mejor preparada para el asesor."
      />

      <div className="strategy-grid">
        {strategy.map(([title, description, result], index) => (
          <article key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{title}</h3>
            <p>{description}</p>
            <strong>{result}</strong>
          </article>
        ))}
      </div>
    </CaseSection>
  );
}

function Architecture() {
  return (
    <CaseSection id="arquitectura">
      <SectionTitle
        eyebrow="05 · Arquitectura de información"
        title="La arquitectura se organizó por decisiones, no por inventario."
        text="El contenido se ordenó según el momento mental del usuario: intención, escenario, contexto, evidencia, decisión y contacto."
      />

      <div className="architecture-flow">
        {architecture.map(([title, question, body], index) => (
          <article key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{title}</h3>
            <small>{question}</small>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </CaseSection>
  );
}

function Journey() {
  return (
    <CaseSection id="journey">
      <SectionTitle
        eyebrow="06 · Customer Journey"
        title="El recorrido muestra cómo el usuario pasa de curiosidad a decisión."
        text="El objetivo no era mapear pantallas. Era entender qué necesita sentir y comprobar el usuario antes de contactar."
      />

      <div className="journey-grid">
        {journey.map(([stage, emotion, pain, opportunity], index) => (
          <article key={stage}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{stage}</h3>
            <p>Emoción: {emotion}</p>
            <small>Pain: {pain}</small>
            <strong>{opportunity}</strong>
          </article>
        ))}
      </div>
    </CaseSection>
  );
}

function Blueprint() {
  return (
    <CaseSection id="blueprint">
      <SectionTitle
        eyebrow="07 · Service Blueprint"
        title="La pantalla debía conectar con el asesor, el CRM y la operación."
        text="El servicio no termina cuando el usuario envía un formulario. Empieza una conversación comercial que debe llegar con intención y contexto."
      />

      <div className="blueprint-table">
        {blueprint.map((row) => (
          <div className="blueprint-row" key={row[0]}>
            <strong>{row[0]}</strong>
            {row.slice(1).map((cell) => (
              <span key={cell}>{cell}</span>
            ))}
          </div>
        ))}
      </div>
    </CaseSection>
  );
}

function ExperienceModules({ active, setActive, current }) {
  return (
    <CaseSection id="experiencia">
      <SectionTitle
        eyebrow="08 · Experiencias diseñadas"
        title="Las pantallas nacieron de las dudas que detenían la decisión."
        text="Cada módulo resuelve una fricción específica: imaginar potencial, entender entorno, comparar valor y confiar en la construcción."
      />

      <div className="module-grid">
        <Configurator active={active} setActive={setActive} current={current} />
        <LocationModule />
        <DashboardModule current={current} />
        <ConstructionModule />
      </div>
    </CaseSection>
  );
}

function Configurator({ active, setActive, current }) {
  const [budget, setBudget] = useState(62);

  return (
    <article className="module-card large">
      <div className="module-copy">
        <p>Configurador IA</p>
        <h3>Convertir intención en escenario.</h3>
        <span>La funcionalidad estrella transforma presupuesto, uso e intención en posibilidades visuales.</span>
      </div>

      <div className="config-ui">
        <div className="config-panel">
          <label>Objetivo</label>
          <strong>{current.short}</strong>
        </div>

        <div className="config-panel">
          <label>Presupuesto estimado</label>
          <strong>${budget / 10}M MXN</strong>
          <input
            aria-label="Presupuesto estimado"
            type="range"
            min={20}
            max={90}
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          />
        </div>

        <div className="scenario-mini-grid">
          {scenarios.map((scenario, index) => (
            <button key={scenario.id} className={active === index ? "active" : ""} onClick={() => setActive(index)}>
              <span>{scenario.icon}</span>
              <small>{scenario.title}</small>
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}

function LocationModule() {
  return (
    <article className="module-card">
      <div className="module-copy">
        <p>Ubicación contextual</p>
        <h3>Mapa cercano, no mapa decorativo.</h3>
        <span>La ubicación se convirtió en lectura de entorno: servicios, accesos, rutina y plusvalía.</span>
      </div>

      <div className="map-mock">
        <i className="road r1" />
        <i className="road r2" />
        <i className="road r3" />
        <b className="pin">⌖</b>
        <span className="map-chip c1">Escuela · 8 min</span>
        <span className="map-chip c2">Vialidad · 3 min</span>
        <span className="map-chip c3">Plusvalía · +18%</span>
      </div>
    </article>
  );
}

function DashboardModule({ current }) {
  const data = [
    ["Confianza", current.metrics.confidence],
    ["Lead Score", current.metrics.leadScore],
    ["Visita", current.metrics.visitIntent],
    ["Dudas -", current.metrics.doubtsReduction],
  ];

  return (
    <article className="module-card">
      <div className="module-copy">
        <p>Dashboard de decisión</p>
        <h3>Comparar antes de contactar.</h3>
        <span>El usuario ve señales de valor y el asesor recibe contexto más útil.</span>
      </div>

      <div className="dashboard-bars">
        {data.map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{value}%</strong>
            <i><b style={{ width: `${value}%` }} /></i>
          </div>
        ))}
      </div>
    </article>
  );
}

function ConstructionModule() {
  return (
    <article className="module-card wide">
      <div className="module-copy">
        <p>Transparencia constructiva</p>
        <h3>Hacer visible lo que normalmente genera desconfianza.</h3>
        <span>El proceso constructivo se convierte en evidencia: etapas, calidad, materiales y avance.</span>
      </div>

      <div className="construction-grid">
        {construction.map(([title, text, image], index) => (
          <div key={title}>
            <img src={image} alt={title} />
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{title}</strong>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

function UISystem() {
  return (
    <CaseSection id="ui-system">
      <SectionTitle
        eyebrow="09 · Sistema UI"
        title="La interfaz debía sentirse patrimonial, clara y confiable."
        text="La dirección visual combina fotografía amplia, cards oscuras, datos accionables y microcopy orientado a decisión."
      />

      <div className="ui-system-grid">
        {[
          ["Color", "Negro editorial + acentos fríos para confianza."],
          ["Cards", "Módulos amplios para explicar valor sin saturar."],
          ["Motion", "Transiciones suaves para visualizar escenarios."],
          ["Copy", "Lenguaje orientado a decisión, no a catálogo."],
        ].map(([title, text], index) => (
          <article key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </CaseSection>
  );
}

function FrontEnd() {
  return (
    <CaseSection id="frontend">
      <SectionTitle
        eyebrow="10 · Front-End"
        title="La experiencia se construyó como producto navegable."
        text="React permitió convertir escenarios, dashboards y estados interactivos en una experiencia real, responsive y lista para evolucionar."
      />

      <div className="frontend-grid">
        <div className="code-card">
          <div className="code-top"><i /><i /><i /><span>RealEstateCase.jsx</span></div>
          <pre>{`const scenario = {
  intent: "invertir",
  context: "ubicación",
  evidence: "construcción",
  nextStep: "contactar"
};

qualifyLead(scenario);`}</pre>
        </div>

        <div className="tech-grid">
          {["React", "Framer Motion", "Responsive", "IA Workflow"].map((item, index) => (
            <article key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item}</h3>
              <p>{index === 0 ? "Componentes vivos para escenarios y módulos." : index === 1 ? "Transiciones para reforzar cambio de posibilidad." : index === 2 ? "Retícula adaptable sin romper narrativa." : "Síntesis de intención, escenario y lead score."}</p>
            </article>
          ))}
        </div>
      </div>
    </CaseSection>
  );
}

function Results() {
  return (
    <CaseSection id="resultados">
      <SectionTitle
        eyebrow="11 · Resultados"
        title="El rediseño cambió la conversación: de mostrar propiedades a preparar decisiones."
        text="La experiencia redujo incertidumbre, hizo visible el potencial del terreno y permitió que el asesor recibiera contactos con mayor intención."
      />

      <div className="result-grid">
        {results.map(([value, label, text]) => (
          <article key={label}>
            <strong>{value}</strong>
            <h3>{label}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </CaseSection>
  );
}

function Reflection() {
  return (
    <CaseSection id="reflexion" className="reflection-section">
      <p className="eyebrow">Reflexión final</p>
      <h2>El mayor cambio no fue visual. Fue conceptual.</h2>
      <p>
        Bienes Raíces Guzmán dejó de funcionar como un catálogo y empezó a comportarse como una herramienta de decisión: una experiencia que ayuda a imaginar, confiar, comparar y avanzar con contexto.
      </p>
    </CaseSection>
  );
}

function ContactCTA() {
  return (
    <section id="contacto" className="case-contact reveal-block">
      <div className="contact-glow" />

      <div className="contact-inner">
        <p className="eyebrow">Contacto</p>

        <h2>Construyamos una experiencia digital clara, estratégica y lista para evolucionar.</h2>

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

export default function RealEstateCase() {
  const [active, setActive] = useState(0);
  const current = scenarios[active];
  const progress = useScrollProgress();

  return (
    <main className="real-estate-case">
      <style>{styles}</style>
      <ProgressBar progress={progress} />
      <PortfolioHeader />
      <Hero active={active} setActive={setActive} current={current} />
      <Problem />
      <Discovery />
      <Findings />
      <Strategy />
      <Architecture />
      <Journey />
      <Blueprint />
      <ExperienceModules active={active} setActive={setActive} current={current} />
      <UISystem />
      <FrontEnd />
      <Results />
      <Reflection />
      <ContactCTA />
    </main>
  );
}

const styles = `
  :root {
    --bg: #030303;
    --text: #F5F5F7;
    --muted: rgba(245,245,247,.66);
    --line: rgba(255,255,255,.075);
    --slate: #C8D9E6;
    --cream: #F5EFE7;
    --blue: #9DB9FF;
    --violet: #BFA7FF;
    --magenta: #E7A7FF;
    --pink: #FFC1D9;
    --mint: #BFEAD8;
  }

  * { box-sizing: border-box; }

  html { scroll-behavior: smooth; }

  body {
    margin: 0;
    background: var(--bg);
  }

  .real-estate-case {
    min-height: 100vh;
    overflow-x: hidden;
    color: var(--text);
    background:
      radial-gradient(circle at 72% 8%, rgba(157,185,255,.13), transparent 28%),
      radial-gradient(circle at 22% 12%, rgba(231,167,255,.08), transparent 25%),
      radial-gradient(circle at 50% 100%, rgba(191,234,216,.045), transparent 35%),
      linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px),
      #030303;
    background-size: auto, auto, auto, 96px 96px, 96px 96px, auto;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif;
    text-rendering: geometricPrecision;
    -webkit-font-smoothing: antialiased;
  }

  .case-progress {
    position: fixed;
    inset: 0 0 auto 0;
    z-index: 5000;
    height: 6px;
    background: rgba(255,255,255,.055);
    box-shadow: 0 0 22px rgba(157,185,255,.12);
  }

  .case-progress span {
    display: block;
    height: 100%;
    transform-origin: left center;
    background: linear-gradient(90deg, #9DB9FF, #BFA7FF, #E7A7FF, #FFC1D9, #BFEAD8);
    box-shadow: 0 0 28px rgba(231,167,255,.42);
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

  .project-nav a:hover,
  .project-nav a.active {
    color: white;
    background: rgba(255,255,255,.075);
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

  .hero-section {
    width: min(100%, 1540px);
    min-height: 100vh;
    margin: 0 auto;
    display: grid;
    grid-template-columns: .88fr 1.12fr;
    align-items: center;
    gap: 76px;
    padding: 140px 42px 64px;
  }

  .hero-copy h1 {
    max-width: 840px;
    margin: 38px 0 0;
    font-size: clamp(4.1rem, 6.5vw, 8rem);
    line-height: 1.04;
    letter-spacing: -.055em;
    font-weight: 380;
  }

  .hero-copy h1 span {
    display: block;
    margin-top: 18px;
    color: rgba(255,255,255,.48);
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
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    max-width: 680px;
    margin-top: 50px;
  }

  .mini-stat {
    border: 1px solid rgba(255,255,255,.075);
    border-radius: 22px;
    background: rgba(255,255,255,.035);
    padding: 18px;
  }

  .mini-stat span {
    display: block;
    color: var(--slate);
    font-size: 10px;
    font-weight: 820;
    letter-spacing: .24em;
    text-transform: uppercase;
  }

  .mini-stat strong {
    display: block;
    margin-top: 10px;
    color: rgba(245,245,247,.72);
    font-size: 13px;
    line-height: 1.45;
  }

  .scenario-stage {
    position: relative;
    min-height: 650px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,.055);
    border-radius: 48px;
    background: linear-gradient(135deg, rgba(255,255,255,.052), rgba(255,255,255,.014));
    box-shadow: inset 0 1px 0 rgba(255,255,255,.075), 0 38px 110px rgba(0,0,0,.50);
    padding: 14px;
  }

  .stage-inner {
    position: relative;
    height: 100%;
    min-height: 622px;
    overflow: hidden;
    border-radius: 38px;
  }

  .stage-inner img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .stage-grid {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(rgba(200,217,230,.055) 1px, transparent 1px),
      linear-gradient(90deg, rgba(200,217,230,.055) 1px, transparent 1px);
    background-size: 42px 42px;
    opacity: .45;
    mask-image: linear-gradient(to bottom, transparent, black 22%, black 76%, transparent);
  }

  .stage-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(3,3,3,.94), rgba(3,3,3,.22), transparent);
  }

  .floating-kpi {
    position: absolute;
    border: 1px solid rgba(255,255,255,.14);
    border-radius: 22px;
    background: rgba(0,0,0,.36);
    padding: 18px;
    backdrop-filter: blur(18px);
  }

  .floating-kpi.top { right: 28px; top: 28px; }
  .floating-kpi.bottom { left: 28px; bottom: 28px; }

  .floating-kpi span {
    display: block;
    color: var(--slate);
    font-size: 10px;
    font-weight: 820;
    letter-spacing: .24em;
    text-transform: uppercase;
  }

  .floating-kpi strong {
    display: block;
    margin-top: 8px;
    font-size: 34px;
    letter-spacing: -.04em;
  }

  .stage-card {
    position: absolute;
    right: 28px;
    bottom: 28px;
    max-width: 380px;
    border: 1px solid rgba(255,255,255,.18);
    border-radius: 30px;
    background: rgba(0,0,0,.40);
    padding: 24px;
    backdrop-filter: blur(22px);
  }

  .stage-card p,
  .module-copy p {
    margin: 0;
    color: var(--slate);
    font-size: 10px;
    font-weight: 820;
    letter-spacing: .28em;
    text-transform: uppercase;
  }

  .stage-card h3 {
    margin: 16px 0 0;
    font-size: 28px;
    line-height: 1.15;
    letter-spacing: -.03em;
  }

  .stage-card > span {
    display: block;
    margin-top: 12px;
    color: rgba(255,255,255,.72);
    line-height: 1.7;
    font-size: 14px;
  }

  .phase-list {
    display: grid;
    gap: 10px;
    margin-top: 20px;
  }

  .phase-list div {
    display: flex;
    align-items: center;
    gap: 12px;
    border-radius: 16px;
    background: rgba(255,255,255,.10);
    padding: 10px;
  }

  .phase-list i {
    width: 28px;
    height: 28px;
    display: grid;
    place-items: center;
    border-radius: 999px;
    background: rgba(200,217,230,.14);
    color: var(--slate);
    font-style: normal;
    font-size: 12px;
    font-weight: 820;
  }

  .scenario-tabs {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .scenario-tabs button {
    border: 1px solid rgba(255,255,255,.075);
    border-radius: 28px;
    background: rgba(255,255,255,.035);
    color: white;
    text-align: left;
    padding: 22px;
    transition: 260ms ease;
    cursor: pointer;
  }

  .scenario-tabs button:hover,
  .scenario-tabs button.active {
    transform: translateY(-5px);
    border-color: rgba(200,217,230,.42);
    background: rgba(200,217,230,.11);
  }

  .scenario-tabs span {
    display: block;
    color: var(--slate);
    font-size: 22px;
  }

  .scenario-tabs strong {
    display: block;
    margin-top: 14px;
    font-size: 17px;
  }

  .scenario-tabs small {
    display: block;
    margin-top: 7px;
    color: rgba(245,245,247,.56);
  }

  .case-section,
  .case-contact {
    width: min(100% - 84px, 1540px);
    margin: 0 auto 48px;
    padding: 96px 64px;
    border: 1px solid rgba(255,255,255,.055);
    border-radius: 46px;
    background: linear-gradient(135deg, rgba(255,255,255,.044), rgba(255,255,255,.014));
    box-shadow: inset 0 1px 0 rgba(255,255,255,.065), 0 24px 80px rgba(0,0,0,.28);
    backdrop-filter: blur(16px);
  }

  .section-title {
    max-width: 1020px;
    margin-bottom: 56px;
  }

  .section-title h2 {
    margin: 28px 0 0;
    font-size: clamp(2.55rem, 4.2vw, 5.65rem);
    line-height: 1.12;
    letter-spacing: -.045em;
    font-weight: 420;
  }

  .section-title p:not(.eyebrow) {
    max-width: 74ch;
    margin: 34px 0 0;
    color: rgba(245,245,247,.64);
    font-size: 18px;
    line-height: 1.95;
    font-weight: 400;
    letter-spacing: -.006em;
  }

  .split-grid,
  .frontend-grid {
    display: grid;
    grid-template-columns: minmax(0, .95fr) minmax(420px, 1.05fr);
    gap: 52px;
    align-items: center;
  }

  .problem-card,
  .module-card,
  .code-card {
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,.075);
    border-radius: 38px;
    background: rgba(0,0,0,.18);
  }

  .problem-card {
    min-height: 520px;
  }

  .problem-card img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: .82;
  }

  .problem-card::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(3,3,3,.94), transparent);
  }

  .problem-card div {
    position: absolute;
    left: 28px;
    right: 28px;
    bottom: 28px;
    z-index: 1;
  }

  .problem-card p,
  .central-insight p {
    margin: 0;
    color: var(--slate);
    font-size: 10px;
    font-weight: 820;
    letter-spacing: .28em;
    text-transform: uppercase;
  }

  .problem-card h3 {
    margin: 14px 0 0;
    font-size: 32px;
    letter-spacing: -.035em;
  }

  .problem-card span {
    display: block;
    max-width: 580px;
    margin-top: 12px;
    color: rgba(255,255,255,.72);
    line-height: 1.75;
  }

  .central-insight {
    margin-top: 42px;
    border-radius: 34px;
    border: 1px solid rgba(255,255,255,.075);
    background: rgba(255,255,255,.035);
    padding: 42px;
  }

  .central-insight h3 {
    max-width: 1120px;
    margin: 20px 0 0;
    font-size: clamp(2rem, 3.1vw, 4rem);
    line-height: 1.16;
    letter-spacing: -.04em;
    font-weight: 430;
  }

  .method-grid,
  .strategy-grid,
  .ui-system-grid,
  .result-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }

  .method-grid article,
  .strategy-grid article,
  .ui-system-grid article,
  .tech-grid article,
  .result-grid article {
    position: relative;
    overflow: hidden;
    min-height: 300px;
    border: 1px solid rgba(255,255,255,.075);
    border-radius: 32px;
    background: rgba(0,0,0,.18);
    padding: 30px;
    transition: 260ms ease;
  }

  .method-grid article::after {
    content: "";
    position: absolute;
    inset: auto 20px -40px;
    height: 90px;
    background: var(--accent);
    opacity: .14;
    filter: blur(54px);
  }

  .method-grid article:hover,
  .strategy-grid article:hover,
  .ui-system-grid article:hover,
  .tech-grid article:hover,
  .result-grid article:hover {
    transform: translateY(-6px);
    border-color: rgba(255,255,255,.14);
  }

  .method-grid span,
  .strategy-grid span,
  .ui-system-grid span,
  .tech-grid span,
  .architecture-flow span,
  .journey-grid span {
    color: var(--slate);
    font-size: 11px;
    font-weight: 820;
    letter-spacing: .22em;
    text-transform: uppercase;
  }

  .method-grid h3,
  .strategy-grid h3,
  .ui-system-grid h3,
  .tech-grid h3,
  .architecture-flow h3,
  .journey-grid h3,
  .module-copy h3 {
    margin: 38px 0 0;
    font-size: 24px;
    line-height: 1.18;
    letter-spacing: -.03em;
    font-weight: 560;
  }

  .method-grid p,
  .strategy-grid p,
  .ui-system-grid p,
  .tech-grid p,
  .architecture-flow p,
  .journey-grid p {
    margin: 18px 0 0;
    color: rgba(245,245,247,.58);
    font-size: 14px;
    line-height: 1.75;
  }

  .method-grid strong,
  .strategy-grid strong,
  .journey-grid strong {
    display: block;
    margin-top: 28px;
    color: rgba(245,245,247,.82);
    line-height: 1.58;
    font-size: 14px;
  }

  .finding-list {
    display: grid;
    gap: 20px;
  }

  .finding-list article {
    display: grid;
    grid-template-columns: 70px 1.2fr .9fr 1fr .9fr;
    gap: 24px;
    align-items: stretch;
    border: 1px solid rgba(255,255,255,.075);
    border-radius: 34px;
    background: rgba(0,0,0,.18);
    padding: 26px;
  }

  .finding-index {
    width: 54px;
    height: 54px;
    display: grid;
    place-items: center;
    border-radius: 18px;
    color: var(--accent);
    background: color-mix(in srgb, var(--accent), transparent 86%);
    font-size: 12px;
    font-weight: 820;
    letter-spacing: .14em;
  }

  .finding-list p,
  .screen-result p {
    margin: 0 0 12px;
    color: var(--accent);
    font-size: 10px;
    font-weight: 820;
    letter-spacing: .24em;
    text-transform: uppercase;
  }

  .finding-list h3 {
    margin: 0;
    font-size: 22px;
    line-height: 1.2;
    letter-spacing: -.03em;
  }

  .finding-list span {
    color: rgba(245,245,247,.64);
    line-height: 1.75;
    font-size: 14px;
  }

  .screen-result {
    border: 1px solid rgba(255,255,255,.075);
    border-radius: 24px;
    background: color-mix(in srgb, var(--accent), transparent 94%);
    padding: 22px;
  }

  .screen-result strong {
    color: white;
    font-size: 16px;
    line-height: 1.45;
  }

  .architecture-flow,
  .journey-grid,
  .service-timeline {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 18px;
  }

  .journey-grid {
    grid-template-columns: repeat(5, 1fr);
  }

  .architecture-flow article,
  .journey-grid article {
    position: relative;
    min-height: 300px;
    border: 1px solid rgba(255,255,255,.075);
    border-radius: 32px;
    background: rgba(0,0,0,.18);
    padding: 28px;
  }

  .architecture-flow small,
  .journey-grid small {
    display: block;
    margin-top: 10px;
    color: rgba(245,245,247,.42);
    font-size: 11px;
    line-height: 1.5;
  }

  .blueprint-table {
    display: grid;
    gap: 10px;
    overflow-x: auto;
  }

  .blueprint-row {
    min-width: 980px;
    display: grid;
    grid-template-columns: 150px repeat(5, 1fr);
    gap: 10px;
  }

  .blueprint-row strong,
  .blueprint-row span {
    min-height: 62px;
    display: grid;
    place-items: center;
    border-radius: 18px;
    border: 1px solid rgba(255,255,255,.075);
    background: rgba(0,0,0,.20);
    color: rgba(245,245,247,.72);
    font-size: 13px;
  }

  .blueprint-row strong {
    color: white;
    background: rgba(200,217,230,.10);
  }

  .module-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
  }

  .module-card {
    min-height: 560px;
    padding: 32px;
  }

  .module-card.large,
  .module-card.wide {
    grid-column: span 2;
  }

  .module-copy {
    max-width: 660px;
  }

  .module-copy h3 {
    margin-top: 18px;
    font-size: clamp(2rem, 3vw, 4.2rem);
    line-height: 1.12;
    font-weight: 430;
  }

  .module-copy span {
    display: block;
    margin-top: 18px;
    color: rgba(245,245,247,.64);
    line-height: 1.8;
  }

  .config-ui {
    display: grid;
    grid-template-columns: .8fr .8fr 1.4fr;
    gap: 18px;
    margin-top: 40px;
  }

  .config-panel,
  .scenario-mini-grid button {
    border: 1px solid rgba(255,255,255,.075);
    border-radius: 24px;
    background: rgba(255,255,255,.035);
    padding: 22px;
  }

  .config-panel label {
    display: block;
    color: var(--slate);
    font-size: 10px;
    font-weight: 820;
    letter-spacing: .22em;
    text-transform: uppercase;
  }

  .config-panel strong {
    display: block;
    margin-top: 14px;
    font-size: 24px;
  }

  .config-panel input {
    width: 100%;
    margin-top: 22px;
    accent-color: var(--slate);
  }

  .scenario-mini-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }

  .scenario-mini-grid button {
    color: white;
    text-align: left;
    cursor: pointer;
  }

  .scenario-mini-grid button.active {
    background: rgba(200,217,230,.12);
    border-color: rgba(200,217,230,.38);
  }

  .scenario-mini-grid span {
    font-size: 24px;
  }

  .scenario-mini-grid small {
    display: block;
    margin-top: 10px;
    color: rgba(245,245,247,.62);
  }

  .map-mock {
    position: relative;
    min-height: 380px;
    margin-top: 36px;
    overflow: hidden;
    border-radius: 30px;
    background: #F2F0EA;
  }

  .road {
    position: absolute;
    border-radius: 999px;
    background: white;
    box-shadow: 0 2px 18px rgba(0,0,0,.06);
  }

  .r1 { left: -10%; top: 24%; width: 120%; height: 28px; rotate: 8deg; }
  .r2 { left: -8%; top: 56%; width: 118%; height: 34px; rotate: -4deg; }
  .r3 { left: 54%; top: -10%; width: 34px; height: 120%; rotate: 2deg; }

  .pin {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 74px;
    height: 74px;
    display: grid;
    place-items: center;
    transform: translate(-50%, -50%);
    border-radius: 999px;
    background: #2F4156;
    color: white;
    font-size: 32px;
    box-shadow: 0 20px 60px rgba(0,0,0,.22);
  }

  .map-chip {
    position: absolute;
    border-radius: 18px;
    background: rgba(255,255,255,.92);
    color: #2F4156;
    padding: 12px 14px;
    font-size: 12px;
    font-weight: 800;
    box-shadow: 0 12px 30px rgba(0,0,0,.10);
  }

  .c1 { left: 10%; top: 15%; }
  .c2 { right: 10%; top: 32%; }
  .c3 { left: 18%; bottom: 16%; }

  .dashboard-bars {
    display: grid;
    gap: 16px;
    margin-top: 36px;
  }

  .dashboard-bars div {
    border: 1px solid rgba(255,255,255,.075);
    border-radius: 22px;
    background: rgba(255,255,255,.035);
    padding: 18px;
  }

  .dashboard-bars span {
    color: rgba(245,245,247,.62);
    font-size: 13px;
  }

  .dashboard-bars strong {
    float: right;
    color: white;
  }

  .dashboard-bars i {
    clear: both;
    display: block;
    height: 7px;
    margin-top: 18px;
    border-radius: 999px;
    background: rgba(255,255,255,.08);
    overflow: hidden;
  }

  .dashboard-bars b {
    display: block;
    height: 100%;
    border-radius: 999px;
    background: var(--slate);
  }

  .construction-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 18px;
    margin-top: 36px;
  }

  .construction-grid div {
    overflow: hidden;
    border-radius: 26px;
    border: 1px solid rgba(255,255,255,.075);
    background: rgba(255,255,255,.035);
  }

  .construction-grid img {
    width: 100%;
    height: 190px;
    object-fit: cover;
    display: block;
  }

  .construction-grid span,
  .construction-grid strong,
  .construction-grid p {
    display: block;
    margin: 18px;
  }

  .construction-grid span {
    color: var(--slate);
    font-size: 11px;
    font-weight: 820;
  }

  .construction-grid p {
    color: rgba(245,245,247,.58);
    font-size: 13px;
    line-height: 1.6;
  }

  .code-top {
    min-height: 58px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 20px;
    border-bottom: 1px solid rgba(255,255,255,.08);
  }

  .code-top i {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: rgba(255,255,255,.22);
  }

  .code-top span {
    margin-left: auto;
    color: rgba(245,245,247,.42);
    font-size: 12px;
  }

  .code-card pre {
    margin: 0;
    padding: 34px;
    color: rgba(245,245,247,.74);
    font-size: 15px;
    line-height: 1.9;
    white-space: pre-wrap;
  }

  .tech-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }

  .reflection-section {
    padding: 118px 72px;
  }

  .reflection-section h2 {
    max-width: 1040px;
    margin: 30px 0 0;
    font-size: clamp(2.9rem, 4.6vw, 6rem);
    line-height: 1.12;
    letter-spacing: -.045em;
    font-weight: 410;
  }

  .reflection-section p:not(.eyebrow) {
    max-width: 820px;
    margin-top: 38px;
    color: rgba(245,245,247,.66);
    font-size: 18px;
    line-height: 1.95;
  }

  .case-contact {
    position: relative;
    overflow: hidden;
    padding: 140px 60px 90px;
    text-align: center;
    margin-bottom: 80px;
  }

  .contact-glow {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 50% 45%, rgba(231,167,255,.12), transparent 30%),
      radial-gradient(circle at 50% 75%, rgba(157,185,255,.08), transparent 32%);
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

  .contact-signature span { position: relative; }

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

  @media (max-width: 1280px) {
    .hero-section,
    .split-grid,
    .frontend-grid {
      grid-template-columns: 1fr;
    }

    .hero-section {
      padding-top: 124px;
    }

    .method-grid,
    .strategy-grid,
    .ui-system-grid,
    .result-grid,
    .construction-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .architecture-flow,
    .journey-grid {
      grid-template-columns: repeat(3, 1fr);
    }

    .finding-list article {
      grid-template-columns: 70px 1fr;
    }

    .finding-list article > div:not(.finding-index) {
      grid-column: 2;
    }

    .config-ui {
      grid-template-columns: 1fr;
    }

    .module-grid {
      grid-template-columns: 1fr;
    }

    .module-card.large,
    .module-card.wide {
      grid-column: auto;
    }
  }

  @media (max-width: 760px) {
    .case-progress { height: 5px; }

    .project-nav {
      top: 14px;
      width: calc(100% - 28px);
    }

    .project-nav nav {
      justify-content: flex-start;
      width: 100%;
      overflow-x: auto;
      scrollbar-width: none;
    }

    .project-nav nav::-webkit-scrollbar { display: none; }

    .project-nav a {
      padding: 0 13px;
      font-size: 12px;
    }

    .hero-section {
      padding: 118px 20px 58px;
      gap: 42px;
    }

    .hero-copy h1 {
      font-size: clamp(3.4rem, 13vw, 5.2rem);
      line-height: 1.08;
      letter-spacing: -.05em;
    }

    .hero-text,
    .section-title p:not(.eyebrow),
    .reflection-section p:not(.eyebrow),
    .contact-copy {
      font-size: 16px;
      line-height: 1.86;
    }

    .hero-meta,
    .scenario-tabs,
    .method-grid,
    .strategy-grid,
    .ui-system-grid,
    .result-grid,
    .construction-grid,
    .architecture-flow,
    .journey-grid,
    .scenario-mini-grid,
    .tech-grid {
      grid-template-columns: 1fr;
    }

    .scenario-stage {
      min-height: 560px;
      border-radius: 34px;
    }

    .stage-inner {
      min-height: 532px;
      border-radius: 28px;
    }

    .floating-kpi {
      display: none;
    }

    .stage-card {
      left: 20px;
      right: 20px;
      bottom: 20px;
      max-width: none;
    }

    .case-section,
    .case-contact {
      width: calc(100% - 28px);
      padding: 58px 22px;
      border-radius: 32px;
      margin-bottom: 28px;
    }

    .section-title h2,
    .reflection-section h2,
    .case-contact h2 {
      font-size: clamp(2.15rem, 11vw, 3.7rem);
      line-height: 1.14;
      letter-spacing: -.04em;
    }

    .central-insight,
    .reflection-section {
      padding: 34px 22px;
    }

    .central-insight h3 {
      font-size: clamp(2rem, 9vw, 3rem);
    }

    .finding-list article {
      grid-template-columns: 1fr;
      padding: 22px;
    }

    .finding-list article > div:not(.finding-index) {
      grid-column: auto;
    }

    .problem-card {
      min-height: 420px;
    }

    .module-card {
      min-height: auto;
      padding: 24px;
    }

    .module-copy h3 {
      font-size: clamp(2rem, 9vw, 3.3rem);
    }

    .blueprint-row {
      min-width: 760px;
      grid-template-columns: 120px repeat(5, 130px);
    }

    .map-mock {
      min-height: 320px;
    }

    .code-card pre {
      font-size: 13px;
      padding: 22px;
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
