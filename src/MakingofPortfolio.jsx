import { useEffect, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

import brainImage from "./brain-white-network.png";
import pizarronImage from "./assets/pizarron .png";

const brandPastels = {
  blue: "#9DB9FF",
  violet: "#BFA7FF",
  magenta: "#E7A7FF",
  pink: "#FFC1D9",
  mint: "#BFEAD8",
  coral: "#FFB28A",
};

const brandColors = [
  brandPastels.blue,
  brandPastels.violet,
  brandPastels.magenta,
  brandPastels.pink,
  brandPastels.mint,
  "#F7F3FF",
];

const audiences = [
  {
    role: "Reclutamiento",
    time: "30–60s",
    need: "Entender perfil, foco y disponibilidad de valor.",
    evidence: "Hero claro, marcas, casos y contacto sin fricción.",
    accent: brandPastels.blue,
  },
  {
    role: "Product",
    time: "3–5 min",
    need: "Identificar criterio, impacto y decisiones.",
    evidence: "Problema, insights, arquitectura y resultado.",
    accent: brandPastels.violet,
  },
  {
    role: "Design",
    time: "5–8 min",
    need: "Evaluar proceso, sistema y madurez visual.",
    evidence: "Research, service design, UI, retícula y narrativa.",
    accent: brandPastels.magenta,
  },
  {
    role: "Technology",
    time: "2–4 min",
    need: "Comprobar si el diseño puede vivir en producto.",
    evidence: "React, rutas, responsive, motion y componentes.",
    accent: brandPastels.mint,
  },
];

const insights = [
  {
    title: "Los reclutadores no leen: escanean.",
    method: "Análisis de CV, LinkedIn y tiempos reales de revisión.",
    decision: "Diseñar un Home que comunique perfil, valor y confianza en menos de un minuto.",
    result: "Hero editorial, marcas visibles y acceso directo a casos.",
    accent: brandPastels.blue,
  },
  {
    title: "Los proyectos con NDA no pueden mostrarse, pero sí explicarse.",
    method: "Revisión de restricciones, evidencia disponible y riesgos de exposición.",
    decision: "Narrar contexto, proceso, decisiones e impacto sin exponer pantallas sensibles.",
    result: "Casos estructurados desde problema, método, insight y decisión.",
    accent: brandPastels.pink,
  },
  {
    title: "Un Design Lead necesita ver criterio, no solo UI.",
    method: "Matriz de audiencia y señales profesionales esperadas.",
    decision: "Dar prioridad a arquitectura, service design, sistemas y storytelling.",
    result: "Casos narrados como producto, no como galería visual.",
    accent: brandPastels.magenta,
  },
  {
    title: "La experiencia debía demostrar ejecución.",
    method: "Pruebas en navegador, responsive y revisión de viabilidad front-end.",
    decision: "Construir el portafolio en React con rutas, motion, componentes y estructura escalable.",
    result: "Un producto navegable, no un PDF ni una presentación estática.",
    accent: brandPastels.mint,
  },
];

const conversion = [
  ["Claridad rápida", "Home", "Tesis clara, rol, marcas, casos y contacto visible."],
  ["Evidencia protegida", "Casos", "Proceso e impacto narrados sin violar confidencialidad."],
  ["Criterio senior", "Proceso", "Research, arquitectura, service design y decisiones visibles."],
  ["Ejecución real", "Front-End", "React, rutas, responsive, motion y componentes funcionales."],
  ["Conversación", "Contacto", "Un cierre único, directo y diseñado para convertir."],
];

const architecture = [
  ["Home", "Primera impresión", "Comunica tesis, perfil y señales de confianza."],
  ["Casos", "Evidencia", "Demuestra criterio aplicado a problemas reales."],
  ["UI", "Ejecución visual", "Muestra calidad de interfaz y responsive."],
  ["Experience.Build", "Profundidad", "Explica cómo pienso, diseño y construyo."],
  ["Contacto", "Conversión", "Cierra la experiencia en una conversación profesional."],
];

const serviceJourney = [
  ["Entrada", "CV / LinkedIn / correo", "Necesita entender rápido quién soy."],
  ["Orientación", "Home + marcas", "Busca señales de confianza y foco."],
  ["Validación", "Casos + proceso", "Evalúa profundidad, criterio y resultados."],
  ["Ejecución", "UI + Front-End", "Comprueba si puedo llevar diseño a producto."],
  ["Conversión", "Contacto", "Decide si vale la pena iniciar conversación."],
];

const visualPrinciples = [
  ["Contraste", "Negro editorial como base para elevar foco, lectura y profundidad."],
  ["Sensibilidad", "Pasteles suaves para equilibrar tecnología, cercanía y memoria visual."],
  ["Profundidad", "Glass, blur y capas para representar la arquitectura invisible detrás de cada experiencia."],
  ["Ritmo", "Espaciado amplio, titulares respirados y lectura pausada para reducir ruido."],
];

const frontendLayers = [
  ["React", "Componentes vivos, reutilizables y listos para crecer."],
  ["Rutas", "Cada caso existe como parte del ecosistema, no como pantalla aislada."],
  ["Responsive", "La narrativa funciona en desktop, tablet y mobile."],
  ["Motion", "Las animaciones guían foco sin robar protagonismo al contenido."],
];

const techStack = [
  {
    name: "React",
    short: "UI",
    role: "Base del producto",
    why: "Permite construir el portafolio como un sistema de componentes, no como páginas aisladas.",
    link: "Conecta Home, casos, UI y contacto bajo una misma arquitectura navegable.",
    accent: "#9DB9FF",
    logo: "⚛",
  },
  {
    name: "Vite",
    short: "Build",
    role: "Velocidad de desarrollo",
    why: "Fue la mejor opción para iterar rápido, levantar el proyecto en local y probar cambios sin fricción.",
    link: "Acelera el ciclo diseño → código → ajuste → validación.",
    accent: "#BFA7FF",
    logo: "⚡",
  },
  {
    name: "Tailwind / CSS in JS",
    short: "System",
    role: "Sistema visual",
    why: "Ayuda a controlar retícula, espaciado, responsive, glass, blur y jerarquía editorial desde el mismo componente.",
    link: "Mantiene consistencia visual entre Home, casos, UI y Experience.Build.",
    accent: "#E7A7FF",
    logo: "⌁",
  },
  {
    name: "Framer Motion",
    short: "Motion",
    role: "Interacción con intención",
    why: "Permite animar transiciones, estados y microinteracciones sin convertir la interfaz en ruido visual.",
    link: "Refuerza la narrativa: cada aparición guía foco y lectura.",
    accent: "#FFC1D9",
    logo: "◆",
  },
  {
    name: "Paper Shaders",
    short: "Visual",
    role: "Identidad viva",
    why: "El mesh gradient permite crear una atmósfera tecnológica y emocional alineada al Home.",
    link: "Une visualmente cerebro, partículas, fondos y casos bajo una misma identidad.",
    accent: "#BFEAD8",
    logo: "◌",
  },
  {
    name: "Figma",
    short: "Design",
    role: "Diseño y handoff",
    why: "Centraliza wireframes, pantallas, componentes, decisiones visuales y alineación con front-end.",
    link: "Traduce investigación y arquitectura en interfaces listas para construir.",
    accent: "#FFB28A",
    logo: "F",
  },
];

const iterations = [
  ["V1", "Portafolio descriptivo", "Había información, pero no una historia profesional."],
  ["V2", "Casos aislados", "Cada proyecto vivía separado y sin sistema común."],
  ["V3", "Mejora visual", "El look subió, pero todavía faltaba arquitectura narrativa."],
  ["V4", "Sistema editorial", "Se ordenaron casos, retícula, tono y jerarquía."],
  ["Actual", "Producto navegable", "El portafolio funciona como evidencia construida."],
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
    <div className="mk-progress" aria-hidden="true">
      <span style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}

function Hero() {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const update = () =>
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section className="making-hero">
      <div className="making-hero-bg">
        {mounted && (
          <>
            <MeshGradient
              width={dimensions.width}
              height={dimensions.height}
              colors={brandColors}
              distortion={0.76}
              swirl={0.58}
              grainMixer={0}
              grainOverlay={0}
              speed={0.32}
              offsetX={0.05}
            />
            <div className="making-hero-veil" />
          </>
        )}
      </div>

      <div className="making-hero-content">
        <p className="eyebrow reveal-1">Making of Portfolio · Product Case</p>
        <h1 className="reveal-2">
          Cómo diseñé y construí un portafolio como producto digital.
        </h1>
        <p className="hero-text reveal-3">
          El objetivo no era mostrar proyectos. Era transformar experiencia, procesos y decisiones en una experiencia capaz de comunicar valor a reclutadores, líderes de diseño, producto y tecnología.
        </p>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, text, center = false }) {
  return (
    <div className={`section-title ${center ? "is-center" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function EditorialSection({ id, children, className = "" }) {
  return (
    <section id={id} className={`editorial-section ${className}`}>
      {children}
    </section>
  );
}

function Challenge() {
  return (
    <EditorialSection id="reto" className="challenge-section">
      <div className="section-grid">
        <SectionTitle
          eyebrow="01 · El reto"
          title="No necesitaba otro portafolio. Necesitaba un sistema de evidencia."
          text="El problema era hacer visible una trayectoria multidisciplinaria sin depender de un PDF, una presentación o una galería visual. La experiencia debía explicar pensamiento estratégico, UX/UI, Service Design, Product Thinking y ejecución front-end en un mismo recorrido."
        />

        <div className="statement-card">
          <p>Hipótesis central</p>
          <h3>Si el portafolio se diseña como producto, puede demostrar no solo lo que hice, sino cómo pienso, decido y construyo.</h3>
        </div>
      </div>
    </EditorialSection>
  );
}

function Audience() {
  return (
    <EditorialSection id="audiencia">
      <SectionTitle
        eyebrow="02 · Comprender la audiencia"
        title="El portafolio no tenía un solo usuario."
        text="Cada audiencia necesitaba evidencia distinta. La arquitectura debía permitir una lectura rápida para reclutamiento y una lectura profunda para diseño, producto y tecnología."
      />

      <div className="audience-grid">
        {audiences.map((item) => (
          <article key={item.role} style={{ "--accent": item.accent }}>
            <div>
              <span>{item.time}</span>
              <h3>{item.role}</h3>
            </div>
            <p>{item.need}</p>
            <small>{item.evidence}</small>
          </article>
        ))}
      </div>
    </EditorialSection>
  );
}

function Insights() {
  return (
    <EditorialSection id="insights">
      <SectionTitle
        eyebrow="03 · Insights"
        title="Los hallazgos definieron la arquitectura, no al revés."
        text="La estructura del portafolio nació de fricciones reales: poco tiempo de lectura, proyectos confidenciales, necesidad de criterio y validación técnica."
      />

      <div className="insight-list">
        {insights.map((item, index) => (
          <article key={item.title} style={{ "--accent": item.accent }}>
            <div className="insight-index">{String(index + 1).padStart(2, "0")}</div>

            <div className="insight-main">
              <p>Insight</p>
              <h3>{item.title}</h3>
              <span>{item.method}</span>
            </div>

            <div className="insight-detail">
              <p>Decisión UX</p>
              <span>{item.decision}</span>
            </div>

            <div className="insight-result">
              <p>Resultado</p>
              <strong>{item.result}</strong>
            </div>
          </article>
        ))}
      </div>
    </EditorialSection>
  );
}

function InsightToExperience() {
  return (
    <EditorialSection id="de-insight-a-experiencia" className="conversion-section">
      <SectionTitle
        eyebrow="04 · De insight a experiencia"
        title="Cada hallazgo terminó convertido en una sección concreta."
        text="La experiencia dejó de organizarse por gusto visual y empezó a organizarse por evidencia: qué necesita entender el usuario, qué decisión lo resuelve y dónde aparece dentro del producto."
      />

      <div className="conversion-flow">
        {conversion.map(([insight, section, result], index) => (
          <article key={section}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{insight}</h3>
            <i />
            <strong>{section}</strong>
            <p>{result}</p>
          </article>
        ))}
      </div>
    </EditorialSection>
  );
}

function Whiteboard() {
  return (
    <EditorialSection id="pizarron" className="whiteboard-section">
      <div className="whiteboard-grid">
        <div>
          <SectionTitle
            eyebrow="05 · Síntesis visual"
            title="Antes del navegador, la hipótesis tomó forma en sistema."
            text="El pizarrón funcionó como espacio de síntesis: audiencias, necesidades, rutas, pantallas, flujos y próximos pasos. Ahí la metodología dejó de ser teoría y empezó a convertirse en producto."
          />

          <div className="whiteboard-note">
            <span>Rol del pizarrón</span>
            <p>Ordenar pensamiento antes de producir interfaz. La evidencia física del proceso permitió ver el portafolio como servicio, producto y experiencia navegable.</p>
          </div>
        </div>

        <figure>
          <img src={pizarronImage} alt="Pizarrón con proceso UX/UI, post-its, flujo de usuario, wireframes y próximos pasos" />
        </figure>
      </div>
    </EditorialSection>
  );
}

function Architecture() {
  return (
    <EditorialSection id="arquitectura">
      <SectionTitle
        eyebrow="06 · Arquitectura del producto"
        title="La navegación se diseñó como una conversación progresiva."
        text="El objetivo era que cualquier persona pudiera pasar de una primera impresión a una evaluación profunda sin perder orientación."
      />

      <div className="architecture-flow">
        {architecture.map(([title, role, body], index) => (
          <article key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{title}</h3>
            <small>{role}</small>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </EditorialSection>
  );
}

function ServiceDesign() {
  return (
    <EditorialSection id="service-design">
      <SectionTitle
        eyebrow="07 · Service Design"
        title="El portafolio funciona como servicio, no como vitrina."
        text="El recorrido considera entrada, orientación, validación, ejecución y conversión. No se trata de mostrar pantallas: se trata de ayudar a alguien a confiar."
      />

      <div className="service-timeline">
        {serviceJourney.map(([phase, touchpoint, need], index) => (
          <article key={phase}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{phase}</h3>
            <p>{touchpoint}</p>
            <strong>{need}</strong>
          </article>
        ))}
      </div>
    </EditorialSection>
  );
}

function VisualSystem() {
  return (
    <EditorialSection id="sistema-visual" className="visual-section">
      <div className="visual-grid">
        <div>
          <SectionTitle
            eyebrow="08 · Sistema visual"
            title="El lenguaje visual debía sentirse tecnológico, editorial y humano."
            text="El sistema toma elementos del Home real: cerebro, partículas, glass, retícula, pasteles y motion. La intención era sostener una identidad coherente en todos los casos."
          />

          <div className="principle-list">
            {visualPrinciples.map(([title, text], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="visual-proof">
          <div className="brain-card">
            <img src={brainImage} alt="Cerebro 3D con conexiones neuronales" />
            <div className="brain-glow" />
          </div>

          <div className="color-strip">
            {brandColors.map((color) => (
              <i key={color} style={{ background: color }} />
            ))}
          </div>
        </div>
      </div>
    </EditorialSection>
  );
}

function FrontEnd() {
  return (
    <EditorialSection id="frontend">
      <SectionTitle
        eyebrow="09 · Producción Front-End"
        title="Diseñar también implicaba hacerlo funcionar."
        text="La diferencia estaba en cerrar el ciclo: estrategia, arquitectura y dirección visual convertidas en React, rutas, responsive, motion y componentes mantenibles."
      />

      <div className="frontend-layout">
        <div className="code-card">
          <div className="code-top">
            <i />
            <i />
            <i />
            <span>src / MakingofPortfolio.jsx</span>
          </div>

          <pre>{`const portfolio = {
  product: "strategy",
  service: "journey",
  uxui: "system",
  frontend: "react"
};

buildEvidence(portfolio);`}</pre>
        </div>

        <div className="frontend-grid">
          {frontendLayers.map(([title, body], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </EditorialSection>
  );
}


function TechStackSection() {
  return (
    <EditorialSection id="tecnologias" className="tech-stack-section">
      <SectionTitle
        eyebrow="10 · Tecnologías utilizadas"
        title="La tecnología se eligió como decisión de producto."
        text="Como Product Designer con bases de Front-End, elegí herramientas que me permitieran pasar de estrategia a una experiencia real, navegable y responsive."
      />

      <div className="tech-stack-layout">
        <div className="tech-code-panel" aria-label="Pantalla de código del stack del portafolio">
          <div className="tech-code-top">
            <i />
            <i />
            <i />
            <span>portfolio.stack.jsx</span>
          </div>

          <div className="tech-code-body">
            <pre>{`const portfolioStack = {
  role: "Product Designer",
  frontend: "basic but intentional",

  design: ["Figma", "UX/UI", "Service Design"],
  build: ["React", "Vite", "CSS", "Framer Motion"],
  visual: ["Paper Shaders", "Responsive Layout"],
  purpose: "turn strategy into a real product"
};

export function buildPortfolio() {
  return connect({
    research: "insights",
    product: "architecture",
    ui: "interfaces",
    frontend: "interaction",
    outcome: "evidence"
  });
}`}</pre>
          </div>

          <div className="tech-code-footer">
            <span>Design thinking</span>
            <span>Front-End basics</span>
            <span>Product evidence</span>
          </div>
        </div>

        <div className="tech-stack-grid">
          {techStack.map((tech, index) => (
            <article key={tech.name} style={{ "--accent": tech.accent }}>
              <div className="tech-card-top">
                <div className="tech-logo animated">{tech.logo}</div>
                <span>{String(index + 1).padStart(2, "0")} · {tech.short}</span>
              </div>

              <h3>{tech.name}</h3>
              <small>{tech.role}</small>

              <div className="tech-card-copy">
                <p><b>Por qué se usó</b>{tech.why}</p>
                <p><b>Cómo se enlaza</b>{tech.link}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </EditorialSection>
  );
}

function Iteration() {
  return (
    <EditorialSection id="iteracion" className="iteration-section">
      <SectionTitle
        eyebrow="10 · Iteración"
        title="La calidad apareció al eliminar ruido y ordenar decisiones."
        text="Cada versión redujo ambigüedad. El proceso pasó de una colección de piezas a un producto con narrativa, sistema y coherencia."
      />

      <div className="iteration-timeline">
        {iterations.map(([version, title, body]) => (
          <article key={version}>
            <span>{version}</span>
            <div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          </article>
        ))}
      </div>
    </EditorialSection>
  );
}

function Result() {
  return (
    <EditorialSection id="resultado" className="result-section">
      <p className="eyebrow">Resultado final</p>
      <h2>El resultado fue un producto digital diseñado para transformar experiencia en evidencia.</h2>
      <p>
        Making of Portfolio demuestra una forma de trabajar: investigar, ordenar, diseñar, construir, iterar y convertir decisiones invisibles en una experiencia clara, navegable y lista para presentarse.
      </p>
    </EditorialSection>
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

export default function MakingofPortfolio() {
  const progress = useScrollProgress();

  return (
    <main className="making-page">
      <style>{styles}</style>
      <ProgressBar progress={progress} />
      <PortfolioHeader />
      <Hero />
      <Challenge />
      <Audience />
      <Insights />
      <InsightToExperience />
      <Whiteboard />
      <Architecture />
      <ServiceDesign />
      <VisualSystem />
      <FrontEnd />
      <TechStackSection />
      <Iteration />
      <Result />
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

  .making-page {
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

  .mk-progress {
    position: fixed;
    inset: 0 0 auto 0;
    z-index: 5000;
    height: 6px;
    background: rgba(255,255,255,.055);
    box-shadow: 0 0 22px rgba(157,185,255,.12);
  }

  .mk-progress span {
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

  .making-hero {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
    display: grid;
    place-items: center;
    background: #030303;
    color: #f5f5f7;
  }

  .making-hero-bg {
    position: absolute;
    inset: 0;
  }

  .making-hero-bg canvas {
    width: 100% !important;
    height: 100% !important;
  }

  .making-hero-veil {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at center, rgba(0,0,0,.05), rgba(0,0,0,.72) 72%),
      linear-gradient(to bottom, rgba(0,0,0,.08), rgba(0,0,0,.88));
    backdrop-filter: blur(1px);
  }

  .making-hero-content {
    position: relative;
    z-index: 2;
    width: min(100% - 44px, 1180px);
    margin: 0 auto;
    text-align: center;
  }

  .making-hero h1 {
    max-width: 1120px;
    margin: 38px auto 0;
    font-size: clamp(4rem, 6.5vw, 8rem);
    line-height: 1.05;
    letter-spacing: -.06em;
    font-weight: 380;
  }

  .hero-text {
    max-width: 820px;
    margin: 46px auto 0;
    color: rgba(245,245,247,.72);
    font-size: clamp(1.05rem, 1.26vw, 1.22rem);
    line-height: 1.95;
    font-weight: 400;
    letter-spacing: -.006em;
  }

  .editorial-section,
  .case-contact {
    width: min(100% - 84px, 1540px);
    margin: 0 auto 48px;
    padding: 110px 72px;
    border: 1px solid rgba(255,255,255,.055);
    border-radius: 46px;
    background: linear-gradient(135deg, rgba(255,255,255,.044), rgba(255,255,255,.014));
    box-shadow: inset 0 1px 0 rgba(255,255,255,.065), 0 24px 80px rgba(0,0,0,.28);
    backdrop-filter: blur(16px);
  }

  .challenge-section { margin-top: 48px; }

  .section-grid,
  .whiteboard-grid,
  .visual-grid,
  .frontend-layout {
    display: grid;
    grid-template-columns: minmax(0, 7fr) minmax(360px, 5fr);
    gap: 72px;
    align-items: center;
  }

  .section-title {
    max-width: 980px;
  }

  .section-title h2 {
    margin: 28px 0 0;
    font-size: clamp(2.55rem, 4.2vw, 5.65rem);
    line-height: 1.12;
    letter-spacing: -.045em;
    font-weight: 420;
  }

  .section-title p:not(.eyebrow) {
    max-width: 68ch;
    margin: 34px 0 0;
    color: rgba(245,245,247,.64);
    font-size: 18px;
    line-height: 1.95;
    font-weight: 400;
    letter-spacing: -.006em;
  }

  .statement-card {
    position: relative;
    overflow: hidden;
    min-height: 430px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    border-radius: 38px;
    padding: 42px;
    background:
      radial-gradient(circle at 85% 10%, rgba(231,167,255,.20), transparent 36%),
      rgba(255,255,255,.045);
    border: 1px solid rgba(255,255,255,.075);
  }

  .statement-card p {
    margin: 0;
    color: var(--pink);
    font-size: 10px;
    font-weight: 820;
    letter-spacing: .32em;
    text-transform: uppercase;
  }

  .statement-card h3 {
    margin: 26px 0 0;
    font-size: clamp(2rem, 3vw, 4rem);
    line-height: 1.15;
    letter-spacing: -.04em;
    font-weight: 420;
  }

  .audience-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    margin-top: 58px;
  }

  .audience-grid article,
  .conversion-flow article,
  .architecture-flow article,
  .service-timeline article,
  .principle-list article,
  .frontend-grid article {
    position: relative;
    overflow: hidden;
    border-radius: 34px;
    border: 1px solid rgba(255,255,255,.065);
    background: rgba(0,0,0,.18);
    padding: 30px;
    transition: 300ms cubic-bezier(.22,1,.36,1);
  }

  .audience-grid article {
    min-height: 330px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .audience-grid article::after {
    content: "";
    position: absolute;
    inset: auto 22px -44px;
    height: 94px;
    background: var(--accent);
    opacity: .14;
    filter: blur(54px);
  }

  .audience-grid article:hover,
  .conversion-flow article:hover,
  .architecture-flow article:hover,
  .service-timeline article:hover,
  .principle-list article:hover,
  .frontend-grid article:hover {
    transform: translateY(-6px);
    border-color: rgba(255,255,255,.14);
  }

  .audience-grid span,
  .architecture-flow span,
  .service-timeline span,
  .principle-list span,
  .frontend-grid span,
  .iteration-timeline span,
  .conversion-flow span {
    color: var(--pink);
    font-size: 11px;
    font-weight: 820;
    letter-spacing: .22em;
    text-transform: uppercase;
  }

  .audience-grid span { color: var(--accent); }

  .audience-grid h3,
  .architecture-flow h3,
  .service-timeline h3,
  .principle-list h3,
  .frontend-grid h3 {
    margin: 42px 0 0;
    font-size: 24px;
    line-height: 1.18;
    letter-spacing: -.03em;
    font-weight: 560;
  }

  .audience-grid h3 {
    margin-top: 22px;
    font-size: 26px;
  }

  .audience-grid p {
    margin: 0;
    color: rgba(245,245,247,.78);
    font-size: 20px;
    line-height: 1.36;
    letter-spacing: -.02em;
  }

  .audience-grid small {
    color: rgba(245,245,247,.56);
    font-size: 14px;
    line-height: 1.7;
  }

  .insight-list {
    display: grid;
    gap: 20px;
    margin-top: 58px;
  }

  .insight-list article {
    display: grid;
    grid-template-columns: 78px minmax(0, 1.25fr) minmax(0, 1fr) minmax(0, .9fr);
    gap: 30px;
    align-items: stretch;
    border-radius: 34px;
    border: 1px solid rgba(255,255,255,.065);
    background: rgba(0,0,0,.18);
    padding: 30px;
  }

  .insight-index {
    width: 58px;
    height: 58px;
    display: grid;
    place-items: center;
    border-radius: 18px;
    color: var(--accent);
    background: color-mix(in srgb, var(--accent), transparent 86%);
    font-size: 12px;
    font-weight: 820;
    letter-spacing: .16em;
  }

  .insight-list p {
    margin: 0 0 12px;
    color: var(--accent);
    font-size: 10px;
    font-weight: 820;
    letter-spacing: .28em;
    text-transform: uppercase;
  }

  .insight-list h3 {
    margin: 0;
    font-size: clamp(1.5rem, 2vw, 2.2rem);
    line-height: 1.18;
    letter-spacing: -.035em;
    font-weight: 520;
  }

  .insight-list span,
  .insight-list strong {
    display: block;
    margin-top: 18px;
    color: rgba(245,245,247,.62);
    font-size: 14px;
    line-height: 1.85;
    font-weight: 420;
  }

  .insight-result {
    border-radius: 24px;
    border: 1px solid rgba(255,255,255,.07);
    background: color-mix(in srgb, var(--accent), transparent 94%);
    padding: 22px;
  }

  .conversion-flow,
  .architecture-flow,
  .service-timeline {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 18px;
    margin-top: 58px;
  }

  .conversion-flow article,
  .architecture-flow article,
  .service-timeline article {
    min-height: 320px;
  }

  .conversion-flow h3 {
    min-height: 78px;
    margin: 34px 0 0;
    font-size: 22px;
    line-height: 1.18;
    letter-spacing: -.03em;
    font-weight: 560;
  }

  .conversion-flow i {
    display: block;
    width: 1px;
    height: 72px;
    margin: 28px 0;
    background: linear-gradient(to bottom, rgba(255,255,255,.18), transparent);
  }

  .conversion-flow strong,
  .service-timeline strong {
    display: block;
    margin-top: 28px;
    color: rgba(245,245,247,.82);
    font-size: 14px;
    line-height: 1.55;
  }

  .conversion-flow p,
  .architecture-flow p,
  .service-timeline p,
  .principle-list p,
  .frontend-grid p {
    margin: 18px 0 0;
    color: rgba(245,245,247,.58);
    font-size: 13px;
    line-height: 1.7;
  }

  .architecture-flow small {
    display: block;
    margin-top: 10px;
    color: rgba(245,245,247,.4);
    font-size: 10px;
    font-weight: 820;
    letter-spacing: .14em;
    text-transform: uppercase;
  }

  .whiteboard-grid { align-items: start; }

  .whiteboard-note {
    max-width: 560px;
    margin-top: 48px;
    border-radius: 32px;
    border: 1px solid rgba(255,255,255,.075);
    background: rgba(255,255,255,.04);
    padding: 30px;
  }

  .whiteboard-note span {
    color: var(--pink);
    font-size: 10px;
    font-weight: 820;
    letter-spacing: .26em;
    text-transform: uppercase;
  }

  .whiteboard-note p {
    margin: 18px 0 0;
    color: rgba(245,245,247,.64);
    font-size: 15px;
    line-height: 1.8;
  }

  .whiteboard-grid figure {
    margin: 0;
    min-height: 640px;
    overflow: hidden;
    border-radius: 38px;
    border: 1px solid rgba(255,255,255,.08);
    background: rgba(255,255,255,.03);
  }

  .whiteboard-grid img {
    width: 100%;
    height: 100%;
    min-height: 640px;
    object-fit: cover;
    display: block;
    filter: saturate(.92) contrast(1.03);
  }

  .visual-grid { align-items: stretch; }

  .principle-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
    margin-top: 58px;
  }

  .principle-list article,
  .frontend-grid article {
    min-height: 210px;
  }

  .visual-proof {
    display: grid;
    grid-template-rows: 1fr auto;
    gap: 18px;
  }

  .brain-card {
    position: relative;
    min-height: 540px;
    overflow: hidden;
    border-radius: 38px;
    background:
      radial-gradient(circle at 52% 48%, rgba(255,255,255,.075), transparent 43%),
      linear-gradient(135deg, rgba(255,255,255,.055), rgba(255,255,255,.014));
    border: 1px solid rgba(255,255,255,.07);
  }

  .brain-card img {
    position: absolute;
    left: 50%;
    top: 52%;
    width: min(760px, 132%);
    transform: translate(-50%, -50%);
    opacity: .82;
    filter: drop-shadow(0 46px 76px rgba(0,0,0,.64)) saturate(.76) brightness(.92);
  }

  .brain-glow {
    position: absolute;
    inset: -20%;
    background:
      radial-gradient(circle at 60% 54%, rgba(231,167,255,.18), transparent 34%),
      radial-gradient(circle at 30% 36%, rgba(157,185,255,.15), transparent 30%),
      radial-gradient(circle at 75% 75%, rgba(191,234,216,.11), transparent 28%);
    filter: blur(26px);
    opacity: .9;
  }

  .color-strip {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
  }

  .color-strip i {
    height: 84px;
    border-radius: 22px;
    border: 1px solid rgba(255,255,255,.16);
  }

  .frontend-layout { align-items: stretch; }

  .code-card {
    min-height: 520px;
    overflow: hidden;
    border-radius: 36px;
    background: rgba(0,0,0,.34);
    border: 1px solid rgba(255,255,255,.085);
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

  .frontend-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }

  .iteration-timeline {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0;
    margin-top: 58px;
  }

  .iteration-timeline article {
    position: relative;
    min-height: 320px;
    padding: 28px;
    border-top: 1px solid rgba(255,255,255,.16);
  }

  .iteration-timeline article::before {
    content: "";
    position: absolute;
    top: -7px;
    left: 28px;
    width: 14px;
    height: 14px;
    border-radius: 999px;
    background: var(--pink);
    box-shadow: 0 0 30px rgba(255,193,217,.42);
  }

  .iteration-timeline h3 {
    margin: 58px 0 0;
    font-size: 24px;
    line-height: 1.18;
    letter-spacing: -.03em;
  }

  .iteration-timeline p {
    margin: 18px 0 0;
    color: rgba(245,245,247,.56);
    font-size: 13px;
    line-height: 1.75;
  }

  .result-section {
    padding: 118px 72px;
  }

  .result-section h2 {
    max-width: 1040px;
    margin: 30px 0 0;
    font-size: clamp(2.9rem, 4.6vw, 6rem);
    line-height: 1.12;
    letter-spacing: -.045em;
    font-weight: 410;
  }

  .result-section p:not(.eyebrow) {
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


  .tech-stack-section {
    overflow: hidden;
  }

  .tech-stack-layout {
    display: grid;
    grid-template-columns: minmax(360px, .8fr) minmax(0, 1.2fr);
    gap: 42px;
    align-items: stretch;
  }

  .tech-code-panel {
    position: relative;
    min-height: 690px;
    overflow: hidden;
    border-radius: 38px;
    border: 1px solid rgba(255,255,255,.075);
    background:
      radial-gradient(circle at 78% 18%, rgba(157,185,255,.16), transparent 30%),
      radial-gradient(circle at 24% 72%, rgba(231,167,255,.14), transparent 34%),
      rgba(0,0,0,.34);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,.08),
      0 34px 110px rgba(0,0,0,.34);
  }

  .tech-code-panel::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(rgba(255,255,255,.024) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.024) 1px, transparent 1px);
    background-size: 32px 32px;
    mask-image: linear-gradient(to bottom, black, transparent 92%);
    pointer-events: none;
  }

  .tech-code-top {
    position: relative;
    z-index: 2;
    min-height: 58px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 22px;
    border-bottom: 1px solid rgba(255,255,255,.08);
    background: rgba(0,0,0,.26);
  }

  .tech-code-top i {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: rgba(255,255,255,.22);
  }

  .tech-code-top span {
    margin-left: auto;
    color: rgba(245,245,247,.42);
    font-size: 12px;
    letter-spacing: .02em;
  }

  .tech-code-body {
    position: relative;
    z-index: 2;
    padding: 34px;
  }

  .tech-code-body pre {
    margin: 0;
    color: rgba(245,245,247,.78);
    font-size: clamp(12px, .9vw, 15px);
    line-height: 1.9;
    white-space: pre-wrap;
  }

  .tech-code-body pre::selection {
    background: rgba(157,185,255,.22);
  }

  .tech-code-footer {
    position: absolute;
    z-index: 3;
    left: 24px;
    right: 24px;
    bottom: 24px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .tech-code-footer span {
    border: 1px solid rgba(255,255,255,.09);
    border-radius: 999px;
    background: rgba(255,255,255,.045);
    padding: 10px 13px;
    color: rgba(245,245,247,.58);
    font-size: 11px;
    font-weight: 720;
    letter-spacing: .12em;
    text-transform: uppercase;
    backdrop-filter: blur(14px);
  }

  .tech-stack-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }

  .tech-stack-grid article {
    position: relative;
    overflow: hidden;
    min-height: 320px;
    border-radius: 34px;
    border: 1px solid rgba(255,255,255,.065);
    background: rgba(0,0,0,.18);
    padding: 28px;
    transition: 300ms cubic-bezier(.22,1,.36,1);
  }

  .tech-stack-grid article::after {
    content: "";
    position: absolute;
    inset: auto 22px -44px;
    height: 94px;
    background: var(--accent);
    opacity: .12;
    filter: blur(54px);
  }

  .tech-stack-grid article:hover {
    transform: translateY(-6px);
    border-color: color-mix(in srgb, var(--accent), transparent 58%);
  }

  .tech-card-top {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
  }

  .tech-card-top span {
    color: var(--accent);
    font-size: 10px;
    font-weight: 820;
    letter-spacing: .18em;
    text-transform: uppercase;
  }

  .tech-stack-grid h3 {
    position: relative;
    z-index: 2;
    margin: 34px 0 0;
    color: white;
    font-size: clamp(1.8rem, 2.4vw, 3.1rem);
    line-height: 1.08;
    letter-spacing: -.04em;
    font-weight: 470;
  }

  .tech-stack-grid small {
    position: relative;
    z-index: 2;
    display: block;
    margin-top: 12px;
    color: rgba(245,245,247,.42);
    font-size: 10px;
    font-weight: 820;
    letter-spacing: .14em;
    text-transform: uppercase;
  }

  .tech-card-copy {
    position: relative;
    z-index: 2;
    display: grid;
    gap: 18px;
    margin-top: 28px;
  }

  .tech-card-copy p {
    margin: 0;
    color: rgba(245,245,247,.62);
    font-size: 13px;
    line-height: 1.7;
  }

  .tech-card-copy b {
    display: block;
    margin-bottom: 8px;
    color: rgba(255,255,255,.86);
    font-size: 11px;
    letter-spacing: .12em;
    text-transform: uppercase;
  }

  @keyframes techFloat {
    0%, 100% {
      margin-top: 0;
      filter: brightness(1);
    }
    50% {
      margin-top: -14px;
      filter: brightness(1.18);
    }
  }

  @keyframes logoPulse {
    0%, 100% {
      transform: translateY(0) scale(1);
      box-shadow: 0 20px 70px color-mix(in srgb, var(--accent), transparent 84%);
    }
    50% {
      transform: translateY(-4px) scale(1.04);
      box-shadow: 0 26px 90px color-mix(in srgb, var(--accent), transparent 76%);
    }
  }

  @keyframes orbitRotate {
    to {
      rotate: 360deg;
    }
  }


  @media (max-width: 1280px) {
    .editorial-section,
    .case-contact {
      width: min(100% - 56px, 1180px);
      padding: 86px 46px;
    }

    .section-grid,
    .whiteboard-grid,
    .visual-grid,
    .frontend-layout,
    .tech-stack-layout {
      grid-template-columns: 1fr;
      gap: 50px;
    }

    .tech-code-panel {
      min-height: 560px;
    }

    .audience-grid,
    .conversion-flow,
    .architecture-flow,
    .service-timeline,
    .iteration-timeline,
    .tech-stack-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .insight-list article {
      grid-template-columns: 70px 1fr;
    }

    .insight-detail,
    .insight-result {
      grid-column: 2;
    }

    .whiteboard-grid figure,
    .whiteboard-grid img {
      min-height: 520px;
    }
  }

  @media (max-width: 760px) {
    .mk-progress {
      height: 5px;
    }

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

    .project-nav nav::-webkit-scrollbar {
      display: none;
    }

    .project-nav a {
      padding: 0 13px;
      font-size: 12px;
    }

    .making-hero-content {
      width: calc(100% - 32px);
      text-align: left;
    }

    .making-hero h1 {
      font-size: clamp(3rem, 12vw, 5rem);
      line-height: 1.08;
      letter-spacing: -.05em;
    }

    .hero-text {
      margin-left: 0;
      margin-right: 0;
      font-size: 16px;
      line-height: 1.86;
    }

    .editorial-section,
    .case-contact {
      width: calc(100% - 28px);
      padding: 58px 22px;
      border-radius: 32px;
      margin-bottom: 28px;
    }

    .section-title h2,
    .result-section h2,
    .case-contact h2 {
      font-size: clamp(2.15rem, 11vw, 3.7rem);
      line-height: 1.14;
      letter-spacing: -.04em;
    }

    .section-title p:not(.eyebrow),
    .result-section p:not(.eyebrow),
    .contact-copy {
      font-size: 16px;
      line-height: 1.86;
    }

    .audience-grid,
    .conversion-flow,
    .architecture-flow,
    .service-timeline,
    .principle-list,
    .frontend-grid,
    .iteration-timeline,
    .tech-stack-grid {
      grid-template-columns: 1fr;
    }

    .tech-code-panel {
      min-height: auto;
    }

    .tech-code-body {
      padding: 22px;
      padding-bottom: 120px;
    }

    .tech-logo {
      width: 54px;
      height: 54px;
      border-radius: 18px;
      font-size: 22px;
    }

    .audience-grid article,
    .conversion-flow article,
    .architecture-flow article,
    .service-timeline article {
      min-height: auto;
    }

    .insight-list article {
      grid-template-columns: 1fr;
      padding: 22px;
    }

    .insight-detail,
    .insight-result {
      grid-column: auto;
    }

    .whiteboard-grid figure,
    .whiteboard-grid img {
      min-height: 360px;
    }

    .brain-card {
      min-height: 360px;
    }

    .color-strip {
      grid-template-columns: repeat(3, 1fr);
    }

    .color-strip i {
      height: 64px;
    }

    .code-card {
      min-height: auto;
    }

    .code-card pre {
      font-size: 13px;
      padding: 22px;
    }

    .iteration-timeline article {
      min-height: auto;
      padding: 24px 0 34px 26px;
      border-top: none;
      border-left: 1px solid rgba(255,255,255,.16);
    }

    .iteration-timeline article::before {
      content: "";
      position: absolute;
      top: 26px;
      left: -7px;
      width: 14px;
      height: 14px;
      border-radius: 999px;
      background: var(--pink);
      box-shadow: 0 0 30px rgba(255,193,217,.42);
    }

    .iteration-timeline h3 {
      margin-top: 20px;
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
