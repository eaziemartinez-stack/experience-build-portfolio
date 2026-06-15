import React, { useEffect, useMemo, useRef, useState } from "react";
import { MeshGradient, PulsingBorder } from "@paper-design/shaders-react";
import { motion } from "framer-motion";
import * as THREE from "three";
import missPortrait from "../../assets/MISS.PNG";

/*
  ExperienceBuild_PROJECT.jsx
  Proyecto completo sobre la línea visual aprobada.

  Incluye:
  WF1 — Hero Paper Shader
  WF2 — Carrusel "La receta de una experiencia"
  WF3 — ScannerCardStream adaptado a Experience.Build
  WF4 — Artifact Glow Cards
  WF5 — Decision Engine
  WF6 — AI Augmentation / Synap
  WF7 — Experience Operating System
  WF8 — Impact Engine

  Dependencias:
  npm install @paper-design/shaders-react three
*/

/* -------------------------------------------------------------------------- */
/* DATA                                                                       */
/* -------------------------------------------------------------------------- */

const wf2Slides = [
  {
    n: "01",
    metaphor: "Ingredients",
    role: "Research",
    image: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=1400&q=80",
    alt: "Ingredientes sobre una mesa para preparar una receta",
    keywords: ["Usuarios", "Entrevistas", "Analytics", "Feedback", "KPIs", "Negocio"],
    title: "Primero reúno los ingredientes del proyecto.",
    text: "Antes de diseñar, necesito entender qué hay sobre la mesa: lo que dicen las personas, lo que muestran los datos, lo que necesita el negocio y lo que permite la operación o la tecnología.",
    what: "Research evita diseñar desde suposiciones. Reúne señales reales para entender el contexto antes de proponer una solución.",
    decision: "Permite decidir qué problema es real, qué necesidad importa y qué información falta antes de avanzar.",
    output: "Señales claras del contexto.",
  },
  {
    n: "02",
    metaphor: "The Recipe",
    role: "Sense Making",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80",
    alt: "Cuaderno de notas y receta escrita sobre una mesa",
    keywords: ["Patrones", "Causas raíz", "Hipótesis", "Prioridades", "Dirección"],
    title: "Tener ingredientes no significa saber qué cocinar.",
    text: "Aquí organizo la información, separo ruido de evidencia, detecto patrones y convierto hallazgos dispersos en una dirección clara para el equipo.",
    what: "Sense Making convierte datos sueltos en una lectura entendible del problema y sus oportunidades.",
    decision: "Permite definir qué resolver primero, qué validar y qué dejar fuera para no diseñar por intuición.",
    output: "Una receta estratégica.",
  },
  {
    n: "03",
    metaphor: "The Kitchen",
    role: "Service Design",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1400&q=80",
    alt: "Cocina profesional moderna y organizada",
    keywords: ["Actores", "Canales", "Backstage", "Handoffs", "Operación"],
    title: "Una experiencia no vive solo en una pantalla.",
    text: "Como una cocina, una experiencia necesita coordinación. Mapeo personas, canales, procesos, sistemas y backstage para entender qué ocurre detrás de la interfaz.",
    what: "Service Design conecta lo visible para el usuario con lo invisible que hace posible el servicio.",
    decision: "Permite detectar dónde se rompe el servicio y qué dependencia debe ajustarse para que funcione de punta a punta.",
    output: "Un servicio conectado.",
  },
  {
    n: "04",
    metaphor: "Preparation Plan",
    role: "Product Design",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
    alt: "Planeación de producto en una mesa de trabajo con laptop",
    keywords: ["MVP", "Roadmap", "Alcance", "Impacto", "Esfuerzo", "KPIs"],
    title: "No todo se prepara al mismo tiempo.",
    text: "Convierto oportunidades en decisiones de producto: qué construir ahora, qué validar primero, qué medir y qué dejar para después.",
    what: "Product Design alinea necesidades del usuario, objetivos de negocio, restricciones y viabilidad técnica.",
    decision: "Permite priorizar alcance, definir MVP, organizar roadmap y decidir qué tiene mayor valor.",
    output: "Un plan claro de construcción.",
  },
  {
    n: "05",
    metaphor: "Presentation",
    role: "UX/UI",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=80",
    alt: "Pastel presentado elegantemente en una mesa",
    keywords: ["Flujos", "Wireframes", "UI", "Componentes", "Estados", "Motion"],
    title: "La interfaz es la presentación de todas las decisiones.",
    text: "La UI no es decoración. Es la forma en que una persona entiende, usa y confía en una experiencia. Aquí aterrizo flujos, pantallas, componentes, estados y microinteracciones.",
    what: "UX/UI convierte estrategia, reglas de negocio y arquitectura en una experiencia visible y usable.",
    decision: "Permite definir qué ve el usuario primero, cómo avanza y qué feedback necesita recibir.",
    output: "Una experiencia clara y usable.",
  },
  {
    n: "06",
    metaphor: "Into The Oven",
    role: "Front-End",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=80",
    alt: "Código en una pantalla de laptop",
    keywords: ["Código", "Responsive", "Estados reales", "Interacción", "Prototipo"],
    title: "La experiencia empieza a vivir cuando se comporta.",
    text: "Como una receta que entra al horno, el diseño se prueba cuando pasa a código. Ahí se valida responsive, estados reales, motion e interacción fuera de Figma.",
    what: "Front-End convierte la propuesta en algo funcional y observable en navegador.",
    decision: "Permite descubrir ajustes reales de comportamiento, interacción y layout antes de escalar.",
    output: "Un producto que puede probarse.",
  },
  {
    n: "07",
    metaphor: "The First Bite",
    role: "Impact",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1400&q=80",
    alt: "Rebanada de pastel servida para probar",
    keywords: ["Conversión", "Adopción", "Eficiencia", "Aprendizaje", "Iteración"],
    title: "La verdad ocurre cuando alguien lo prueba.",
    text: "La experiencia se valida en uso real. Mido si generó claridad, eficiencia, adopción, conversión o aprendizaje para la siguiente iteración.",
    what: "Impact cierra el ciclo: transforma resultados y comportamiento real en nuevas decisiones.",
    decision: "Permite decidir qué funcionó, qué debe mejorar y qué aprendizaje alimenta la siguiente versión.",
    output: "Impacto medible.",
  },
];

const scannerCards = [
  {
    label: "Research",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    result: "Findings / Signals / Insights",
  },
  {
    label: "Journey Map",
    image: "https://images.unsplash.com/photo-1600267204091-5c1ab8b10c02?auto=format&fit=crop&w=900&q=80",
    result: "Pain Points / Moments / Opportunities",
  },
  {
    label: "Blueprint",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
    result: "Frontstage / Backstage / Handoffs",
  },
  {
    label: "Prototype",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=900&q=80",
    result: "Flows / States / Interactions",
  },
  {
    label: "Front-End",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
    result: "Responsive / Code / Motion",
  },
];

const artifactCards = [
  ["Research", "Revela comportamientos, necesidades, motivaciones y patrones."],
  ["Journey Map", "Revela pain points, momentos críticos, oportunidades y dependencias."],
  ["Service Blueprint", "Revela frontstage, backstage, procesos, sistemas y handoffs."],
  ["Prototype", "Revela lógica, estados, flujo, interacción y viabilidad de la solución."],
  ["Design System", "Revela componentes, consistencia, escalabilidad y accesibilidad."],
  ["Front-End", "Revela comportamiento real, responsive, motion y performance."],
];

const decisionCards = [
  ["Datos", "Recolectar señales de usuarios, negocio, operación y tecnología."],
  ["Patrones", "Separar ruido de evidencia y encontrar causas reales."],
  ["Decisiones", "Priorizar qué construir, qué validar y qué dejar fuera."],
  ["Experiencia", "Materializar decisiones en servicio, interfaz, código e impacto."],
];

const orbitNodes = [
  "Research",
  "Sense Making",
  "Service Design",
  "Product Design",
  "UX/UI",
  "Front-End",
  "AI Layer",
  "Impact",
];

/* -------------------------------------------------------------------------- */
/* MAIN                                                                       */
/* -------------------------------------------------------------------------- */


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

function ExperienceProgress({ progress }) {
  return (
    <div className="experience-progress" aria-hidden="true">
      <span style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}

export default function ExperienceBuildProject() {
  const progress = useScrollProgress();

  return (
    <main className="eb-project">
      <ProjectStyles />
      <ExperienceProgress progress={progress} />
      <PortfolioNav />
      <WF1Hero />
      <ExperienceBuildManifesto />
      <WF2RecipeCarousel />
      <WF3ScannerExperience />
      <WF4GlowArtifacts />
      <WF5DecisionEngine />
      <WF6AISection />
      <WF7OperatingSystem />
      <WF8ImpactEngine />
      <BehindArchitectureSection />
      <ExperienceContactCTA />
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* WF1                                                                        */
/* -------------------------------------------------------------------------- */


function PortfolioNav() {
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


function ExperienceOrbitSeal() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let timeout = null;

    const hideThenShow = () => {
      setVisible(false);

      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        setVisible(true);
      }, 900);
    };

    window.addEventListener("mousemove", hideThenShow, { passive: true });
    window.addEventListener("touchmove", hideThenShow, { passive: true });
    window.addEventListener("scroll", hideThenShow, { passive: true });

    return () => {
      window.removeEventListener("mousemove", hideThenShow);
      window.removeEventListener("touchmove", hideThenShow);
      window.removeEventListener("scroll", hideThenShow);

      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      className={`experience-orbit-seal ${visible ? "is-visible" : "is-hidden"}`}
      aria-hidden="true"
    >
      <div className="experience-orbit-inner">
        <PulsingBorder
          colors={["#BEECFF", "#E77EDC", "#FF4C3E", "#00FF88", "#FFD700", "#FF6B35", "#8A2BE2"]}
          colorBack="#00000000"
          speed={1.5}
          roundness={1}
          thickness={0.1}
          softness={0.2}
          intensity={5}
          spotsPerColor={5}
          spotSize={0.1}
          pulse={0.1}
          smoke={0.5}
          smokeSize={4}
          scale={0.65}
          rotation={0}
          frame={9161408.251009725}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
          }}
        />

        <motion.svg
          className="experience-orbit-copy"
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{ transform: "scale(1.6)" }}
        >
          <defs>
            <path
              id="experience-orbit-circle"
              d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
            />
          </defs>

          <text className="experience-orbit-text">
            <textPath href="#experience-orbit-circle" startOffset="0%">
              Service Design • Front-End • experience.build • UX/UI •
            </textPath>
          </text>
        </motion.svg>
      </div>
    </div>
  );
}


function WF1Hero() {
  return (
    <section className="wf1">
      <MeshGradient
        className="wf1__mesh"
        colors={["#030303", "#9DB9FF", "#BFA7FF", "#E7A7FF", "#FFC1D9", "#BFEAD8"]}
        speed={0.45}
        backgroundColor="#000000"
      />

      <div className="wf1__vignette" />

      <div className="wf1__content">
        <p className="eyebrow">Experience.Build</p>

        <h1>
          Toda experiencia tiene una arquitectura <span>invisible.</span>
        </h1>

        <div className="rule" />

        <h2>
          Investigación, servicio, producto, UX/UI, Front-End e IA conectados en un mismo sistema.
        </h2>

        <p>
          Transformando complejidad en claridad.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* WF2                                                                        */
/* -------------------------------------------------------------------------- */

function WF2RecipeCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = wf2Slides[activeIndex];

  const next = () => setActiveIndex((current) => (current + 1) % wf2Slides.length);
  const prev = () =>
    setActiveIndex((current) => (current - 1 + wf2Slides.length) % wf2Slides.length);

  const progress = ((activeIndex + 1) / wf2Slides.length) * 100;

  return (
    <section className="section wf2">
      <Header
        eyebrow="02 · How Experiences Are Built"
        title="Una experiencia se construye como una gran receta."
        body="Para explicar cómo trabajo, lo cuento como preparar un pastel: primero reunimos ingredientes, luego definimos la receta, organizamos la cocina, preparamos, presentamos, llevamos al horno y finalmente alguien lo prueba."
        center
      />

      <div className="recipe-carousel">
        <div className="recipe-image">
          <img key={active.image} src={active.image} alt={active.alt} />
          <div className="recipe-image__overlay" />
          <span className="counter">{active.n} / 07</span>
          <div className="recipe-image__title">
            <p>{active.role}</p>
            <h3>{active.metaphor}</h3>
          </div>
        </div>

        <div className="recipe-content">
          <div className="chips">
            {active.keywords.map((keyword) => (
              <span key={keyword}>{keyword}</span>
            ))}
          </div>

          <h4>{active.title}</h4>
          <p className="lead">{active.text}</p>

          <div className="explain">
            <div>
              <small>Qué hace</small>
              <p>{active.what}</p>
            </div>
            <div>
              <small>Qué decisión genera</small>
              <p>{active.decision}</p>
            </div>
            <div className="result">
              <small>Resultado</small>
              <strong>{active.output}</strong>
            </div>
          </div>

          <div className="carousel-bottom">
            <div className="progress">
              <i style={{ width: `${progress}%` }} />
            </div>

            <div className="carousel-controls">
              <div className="dots">
                {wf2Slides.map((slide, index) => (
                  <button
                    key={slide.n}
                    onClick={() => setActiveIndex(index)}
                    className={index === activeIndex ? "active" : ""}
                    aria-label={`Ir a ${slide.metaphor}`}
                  />
                ))}
              </div>

              <div className="arrows">
                <button onClick={prev}>← Prev</button>
                <button onClick={next}>Next →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* WF3 SCANNER                                                                */
/* -------------------------------------------------------------------------- */

const ASCII_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789(){}[]<>;:,._-+=!@#$%^&*|\\/\"'`~?";

function generateCode(width, height) {
  let text = "";
  for (let i = 0; i < width * height; i++) {
    text += ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
  }
  let out = "";
  for (let i = 0; i < height; i++) {
    out += text.substring(i * width, (i + 1) * width) + "\n";
  }
  return out;
}

function ScannerCardStreamLite({
  cardImages,
  labels,
  results,
  repeat = 5,
  cardGap = 56,
  initialSpeed = 120,
  direction = -1,
}) {
  const [isScanning, setIsScanning] = useState(false);
  const [speed, setSpeed] = useState(initialSpeed);

  const cards = useMemo(() => {
    const totalCards = cardImages.length * repeat;
    return Array.from({ length: totalCards }, (_, i) => ({
      id: i,
      image: cardImages[i % cardImages.length],
      label: labels[i % labels.length],
      result: results[i % results.length],
      ascii: generateCode(Math.floor(380 / 6.5), Math.floor(240 / 13)),
    }));
  }, [cardImages, labels, results, repeat]);

  const cardLineRef = useRef(null);
  const particleCanvasRef = useRef(null);
  const scannerCanvasRef = useRef(null);
  const originalAscii = useRef(new Map());

  const state = useRef({
    position: 0,
    velocity: initialSpeed,
    direction,
    lastTime: performance.now(),
    cardLineWidth: (380 + cardGap) * cards.length,
    friction: 0.985,
    minVelocity: 80,
  });

  useEffect(() => {
    const cardLine = cardLineRef.current;
    const particleCanvas = particleCanvasRef.current;
    const scannerCanvas = scannerCanvasRef.current;
    if (!cardLine || !particleCanvas || !scannerCanvas) return;

    cards.forEach((card) => originalAscii.current.set(card.id, card.ascii));

    let animationFrameId;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      -window.innerWidth / 2,
      window.innerWidth / 2,
      125,
      -125,
      1,
      1000
    );
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({
      canvas: particleCanvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, 250);
    renderer.setClearColor(0x000000, 0);

    const particleCount = 360;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount);
    const alphas = new Float32Array(particleCount);

    const texCanvas = document.createElement("canvas");
    texCanvas.width = 100;
    texCanvas.height = 100;
    const texCtx = texCanvas.getContext("2d");
    const gradient = texCtx.createRadialGradient(50, 50, 0, 50, 50, 50);
    gradient.addColorStop(0.025, "#fff");
    gradient.addColorStop(0.1, "hsl(217, 61%, 33%)");
    gradient.addColorStop(0.25, "hsl(217, 64%, 6%)");
    gradient.addColorStop(1, "transparent");
    texCtx.fillStyle = gradient;
    texCtx.arc(50, 50, 50, 0, Math.PI * 2);
    texCtx.fill();

    const texture = new THREE.CanvasTexture(texCanvas);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * window.innerWidth * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 250;
      velocities[i] = Math.random() * 60 + 30;
      alphas[i] = (Math.random() * 8 + 2) / 10;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: { pointTexture: { value: texture } },
      vertexShader:
        "attribute float alpha; varying float vAlpha; void main() { vAlpha = alpha; vec4 mvPosition = modelViewMatrix * vec4(position, 1.0); gl_PointSize = 15.0; gl_Position = projectionMatrix * mvPosition; }",
      fragmentShader:
        "uniform sampler2D pointTexture; varying float vAlpha; void main() { gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha) * texture2D(pointTexture, gl_PointCoord); }",
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const ctx = scannerCanvas.getContext("2d");
    scannerCanvas.width = window.innerWidth;
    scannerCanvas.height = 300;

    let scannerParticles = [];
    const createScannerParticle = () => ({
      x: window.innerWidth / 2 + (Math.random() - 0.5) * 4,
      y: Math.random() * 300,
      vx: Math.random() * 0.8 + 0.2,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 0.6 + 0.4,
      alpha: Math.random() * 0.4 + 0.6,
      life: 1.0,
      decay: Math.random() * 0.02 + 0.005,
    });

    for (let i = 0; i < 800; i++) scannerParticles.push(createScannerParticle());

    const updateCardEffects = () => {
      const scannerX = window.innerWidth / 2;
      const scannerWidth = 8;
      const scannerLeft = scannerX - scannerWidth / 2;
      const scannerRight = scannerX + scannerWidth / 2;
      let anyCardIsScanning = false;

      cardLine.querySelectorAll(".scanner-card").forEach((wrapper) => {
        const rect = wrapper.getBoundingClientRect();
        const normalCard = wrapper.querySelector(".card-normal");
        const asciiCard = wrapper.querySelector(".card-ascii");

        if (rect.left < scannerRight && rect.right > scannerLeft) {
          anyCardIsScanning = true;
          const intersectLeft = Math.max(scannerLeft - rect.left, 0);
          const intersectRight = Math.min(scannerRight - rect.left, rect.width);
          normalCard.style.setProperty("--clip-right", `${(intersectLeft / rect.width) * 100}%`);
          asciiCard.style.setProperty("--clip-left", `${(intersectRight / rect.width) * 100}%`);
        } else {
          if (rect.right < scannerLeft) {
            normalCard.style.setProperty("--clip-right", "100%");
            asciiCard.style.setProperty("--clip-left", "100%");
          } else {
            normalCard.style.setProperty("--clip-right", "0%");
            asciiCard.style.setProperty("--clip-left", "0%");
          }
        }
      });

      setIsScanning(anyCardIsScanning);
    };

    const animate = (currentTime) => {
      const deltaTime = (currentTime - state.current.lastTime) / 1000;
      state.current.lastTime = currentTime;

      if (state.current.velocity > state.current.minVelocity) {
        state.current.velocity *= state.current.friction;
      }

      state.current.position += state.current.velocity * state.current.direction * deltaTime;
      setSpeed(Math.round(state.current.velocity));

      const containerWidth = cardLine.parentElement?.offsetWidth || 0;
      if (state.current.position < -state.current.cardLineWidth) state.current.position = containerWidth;
      else if (state.current.position > containerWidth) state.current.position = -state.current.cardLineWidth;

      cardLine.style.transform = `translateX(${state.current.position}px)`;
      updateCardEffects();

      const time = currentTime * 0.001;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities[i] * 0.016;
        if (positions[i * 3] > window.innerWidth / 2 + 100) positions[i * 3] = -window.innerWidth / 2 - 100;
        positions[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.5;
        alphas[i] = Math.max(0.1, Math.min(1, alphas[i] + (Math.random() - 0.5) * 0.05));
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.alpha.needsUpdate = true;
      renderer.render(scene, camera);

      ctx.clearRect(0, 0, window.innerWidth, 300);
      scannerParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        if (p.life <= 0 || p.x > window.innerWidth) Object.assign(p, createScannerParticle());
        ctx.globalAlpha = p.alpha * p.life;
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      renderer.setSize(window.innerWidth, 250);
      scannerCanvas.width = window.innerWidth;
      scannerCanvas.height = 300;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();
    };
  }, [cards, cardGap, initialSpeed, direction]);

  return (
    <div className="scanner-stream">
      <canvas ref={particleCanvasRef} className="particle-canvas" />
      <canvas ref={scannerCanvasRef} className="scanner-canvas" />

      <div className={`scanner-line ${isScanning ? "visible" : ""}`} />

      <div className="scanner-rail">
        <div ref={cardLineRef} className="scanner-card-line" style={{ gap: `${cardGap}px` }}>
          {cards.map((card) => (
            <div key={card.id} className="scanner-card">
              <div className="card-normal card-layer">
                <img src={card.image} alt={card.label} />
                <div className="scanner-card-caption">
                  <small>{card.label}</small>
                  <strong>{card.result}</strong>
                </div>
              </div>

              <div className="card-ascii card-layer">
                <pre>{card.ascii}</pre>
              </div>
            </div>
          ))}
        </div>
      </div>

      <span className="scanner-speed">speed {speed}</span>
    </div>
  );
}

function WF3ScannerExperience() {
  const images = scannerCards.map((card) => card.image);
  const labels = scannerCards.map((card) => card.label);
  const results = scannerCards.map((card) => card.result);

  return (
    <section className="section wf3">
      <Header
        eyebrow="03 · Process X-Ray"
        title="La radiografía del proceso."
        body="Después de explicar la receta, esta sección muestra la transformación: una tarjeta visual entra en el scanner y revela la estructura invisible que existe detrás de cada entregable."
        center
      />

      <ScannerCardStreamLite
        cardImages={images}
        labels={labels}
        results={results}
        repeat={7}
        cardGap={64}
        initialSpeed={150}
      />
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* WF4                                                                        */
/* -------------------------------------------------------------------------- */

function WF4GlowArtifacts() {
  return (
    <section className="section wf4">
      <Header
        eyebrow="04 · Behind The Artifact"
        title="Lo que cada entregable revela."
        body="Cada artefacto tiene una función: no se entrega por verse bonito, se construye para tomar mejores decisiones."
      />

      <div className="artifact-grid">
        {artifactCards.map(([title, body], index) => (
          <article key={title} className="artifact-card">
            <small>{String(index + 1).padStart(2, "0")} · Artifact</small>
            <h3>{title}</h3>
            <p>{body}</p>
            <span>Reveal layer</span>
          </article>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* WF5                                                                        */
/* -------------------------------------------------------------------------- */

function WF5DecisionEngine() {
  return (
    <section className="section wf5">
      <Header
        eyebrow="05 · Decision Engine"
        title="La información se convierte en acción."
        body="El valor del proceso no está en acumular entregables. Está en transformar señales en decisiones claras que el equipo pueda construir, validar y medir."
        center
      />

      <div className="decision-grid">
        {decisionCards.map(([title, body], index) => (
          <article key={title} className="decision-card">
            <small>{String(index + 1).padStart(2, "0")}</small>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* WF6                                                                        */
/* -------------------------------------------------------------------------- */

function WF6AISection() {
  return (
    <section className="section wf6">
      <div className="ai-matter-section">
        <div className="ai-matter-visual" aria-hidden="true">
          <div className="ai-matter-orb">
            <div className="ai-matter-shape shape-a" />
            <div className="ai-matter-shape shape-b" />
            <div className="ai-matter-shape shape-c" />
            <div className="ai-matter-grid" />
            <div className="ai-matter-noise" />
          </div>
        </div>

        <div className="ai-matter-copy">
          <p className="eyebrow">06 · AI-Augmented Workflow</p>

          <h2>
            La IA acelera.
            <span> La decisión sigue siendo humana.</span>
          </h2>

          <p>
            La IA funciona como una capa de exploración, síntesis y velocidad.
            Ayuda a analizar, documentar, comparar alternativas y prototipar más
            rápido, pero no reemplaza el criterio de diseño: lo amplifica.
          </p>

          <div className="ai-matter-points">
            <article>
              <small>Explora</small>
              <strong>Alternativas más rápido</strong>
              <p>Abre rutas, escenarios y variaciones sin perder dirección estratégica.</p>
            </article>

            <article>
              <small>Sintetiza</small>
              <strong>Convierte ruido en señales</strong>
              <p>Ayuda a ordenar hallazgos, patrones, insights y decisiones accionables.</p>
            </article>

            <article>
              <small>Construye</small>
              <strong>Del concepto al prototipo</strong>
              <p>Acelera microcopy, documentación, estructura, código y validación.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* WF7                                                                        */
/* -------------------------------------------------------------------------- */

function WF7OperatingSystem() {
  const timelineData = [
    {
      id: 1,
      title: "Research",
      date: "01",
      content:
        "Recolecta señales reales: usuarios, entrevistas, analytics, feedback, negocio, operación y restricciones.",
      category: "Discovery",
      relatedIds: [2, 3, 8],
      status: "completed",
      energy: 92,
    },
    {
      id: 2,
      title: "Sense Making",
      date: "02",
      content:
        "Convierte información dispersa en patrones, causas raíz, hipótesis, prioridades y dirección estratégica.",
      category: "Strategy",
      relatedIds: [1, 3, 4, 8],
      status: "completed",
      energy: 96,
    },
    {
      id: 3,
      title: "Service Design",
      date: "03",
      content:
        "Conecta canales, actores, procesos, frontstage, backstage y handoffs para entender cómo opera el servicio completo.",
      category: "System",
      relatedIds: [1, 2, 4, 7],
      status: "completed",
      energy: 90,
    },
    {
      id: 4,
      title: "Product Design",
      date: "04",
      content:
        "Define alcance, MVP, roadmap, criterios de éxito y prioridades para convertir oportunidades en producto.",
      category: "Product",
      relatedIds: [2, 3, 5, 7],
      status: "completed",
      energy: 88,
    },
    {
      id: 5,
      title: "UX/UI",
      date: "05",
      content:
        "Materializa decisiones en flujos, wireframes, pantallas, componentes, estados, microcopy y microinteracciones.",
      category: "Interface",
      relatedIds: [4, 6, 7],
      status: "in-progress",
      energy: 86,
    },
    {
      id: 6,
      title: "Front-End",
      date: "06",
      content:
        "Lleva la experiencia a un entorno funcional para validar responsive, estados reales, motion e interacción.",
      category: "Build",
      relatedIds: [5, 7, 8],
      status: "in-progress",
      energy: 84,
    },
    {
      id: 7,
      title: "Impact",
      date: "07",
      content:
        "Mide si la experiencia generó claridad, eficiencia, adopción, conversión o aprendizaje para la siguiente iteración.",
      category: "Measure",
      relatedIds: [3, 4, 5, 6],
      status: "pending",
      energy: 89,
    },
    {
      id: 8,
      title: "AI Layer",
      date: "08",
      content:
        "Acelera síntesis, documentación, exploración, microcopy y prototipado sin sustituir el criterio humano.",
      category: "Amplify",
      relatedIds: [1, 2, 4, 6],
      status: "in-progress",
      energy: 82,
    },
  ];

  const [expandedItems, setExpandedItems] = useState({});
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState({});
  const [activeNodeId, setActiveNodeId] = useState(null);

  useEffect(() => {
    if (!autoRotate) return;

    const rotationTimer = setInterval(() => {
      setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
    }, 50);

    return () => clearInterval(rotationTimer);
  }, [autoRotate]);

  const getRelatedItems = (itemId) => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId) => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  const centerViewOnNode = (nodeId) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const toggleItem = (id) => {
    setExpandedItems((prev) => {
      const wasOpen = !!prev[id];
      const nextState = {};

      if (!wasOpen) {
        nextState[id] = true;
        setActiveNodeId(id);
        setAutoRotate(false);
        centerViewOnNode(id);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return nextState;
    });
  };

  const calculateNodePosition = (index, total) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 230;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.42,
      Math.min(1, 0.42 + 0.58 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getStatusLabel = (status) => {
    if (status === "completed") return "COMPLETE";
    if (status === "in-progress") return "IN PROGRESS";
    return "PENDING";
  };

  return (
    <section className="section wf7">
      <Header
        eyebrow="07 · Experience Operating System"
        title="Un sistema vivo, no una lista de skills."
        body="Research, Service Design, Product Design, UX/UI, Front-End, IA e impacto trabajan conectados. Cada decisión afecta a otra parte del sistema."
        center
      />

      <div
        className="radial-orbit-stage"
        onClick={(event) => {
          if (event.target.classList.contains("radial-orbit-stage")) {
            setExpandedItems({});
            setActiveNodeId(null);
            setPulseEffect({});
            setAutoRotate(true);
          }
        }}
      >
        <div className="radial-orbit-glow" />

        <div className="radial-orbit-core">
          <div className="radial-core-ping one" />
          <div className="radial-core-ping two" />
          <div className="radial-core-dot" />
        </div>

        <div className="radial-orbit-circle" />

        {timelineData.map((item, index) => {
          const position = calculateNodePosition(index, timelineData.length);
          const isExpanded = !!expandedItems[item.id];
          const isRelated = isRelatedToActive(item.id);
          const isPulsing = pulseEffect[item.id];

          return (
            <div
              key={item.id}
              className="radial-node-wrap"
              style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                zIndex: isExpanded ? 220 : position.zIndex,
                opacity: isExpanded ? 1 : position.opacity,
              }}
              onClick={(event) => {
                event.stopPropagation();
                toggleItem(item.id);
              }}
            >
              <div
                className={`radial-node-energy ${isPulsing ? "pulse" : ""}`}
                style={{
                  width: `${item.energy * 0.5 + 40}px`,
                  height: `${item.energy * 0.5 + 40}px`,
                  left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                }}
              />

              <div
                className={`radial-node-dot ${
                  isExpanded ? "expanded" : isRelated ? "related" : ""
                }`}
              >
                <span>{item.date}</span>
              </div>

              <div
                className={`radial-node-label ${
                  isExpanded ? "expanded" : ""
                }`}
              >
                {item.title}
              </div>

              {isExpanded && (
                <div className="radial-node-card">
                  <div className="radial-card-connector" />

                  <div className="radial-card-top">
                    <span className={`radial-status ${item.status}`}>
                      {getStatusLabel(item.status)}
                    </span>
                    <small>{item.category}</small>
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.content}</p>

                  <div className="radial-energy">
                    <div className="radial-energy-head">
                      <span>Energy Level</span>
                      <strong>{item.energy}%</strong>
                    </div>
                    <div className="radial-energy-bar">
                      <i style={{ width: `${item.energy}%` }} />
                    </div>
                  </div>

                  {item.relatedIds.length > 0 && (
                    <div className="radial-related">
                      <small>Connected Nodes</small>
                      <div>
                        {item.relatedIds.map((relatedId) => {
                          const relatedItem = timelineData.find(
                            (node) => node.id === relatedId
                          );

                          return (
                            <button
                              key={relatedId}
                              onClick={(event) => {
                                event.stopPropagation();
                                toggleItem(relatedId);
                              }}
                            >
                              {relatedItem?.title} →
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {!activeNodeId && (
          <div className="radial-helper">
            <small>Click any node</small>
            <strong>Explora cómo se conecta el sistema</strong>
          </div>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* WF8                                                                        */
/* -------------------------------------------------------------------------- */

function WF8ImpactEngine() {
  return (
    <section className="section wf8">
      <Header
        eyebrow="08 · Impact Engine"
        title="El diseño termina cuando genera valor."
        body="Una pantalla entregada no es el final. El cierre real ocurre cuando la experiencia reduce fricción, aumenta claridad, mejora adopción o produce aprendizaje."
      />

      <div className="impact-grid">
        <article>
          <small>Efficiency</small>
          <h3>37 min → 12 min</h3>
          <p>Reducción de tiempos operativos mediante rediseño de flujos, claridad y validación de etapas.</p>
        </article>
        <article>
          <small>Clarity</small>
          <h3>Menos fricción</h3>
          <p>Microcopy, estados y jerarquía visual para que el usuario entienda qué hacer y qué sigue.</p>
        </article>
        <article>
          <small>Learning</small>
          <h3>Iteración continua</h3>
          <p>Los resultados alimentan nuevas hipótesis, backlog de mejora y decisiones de producto.</p>
        </article>
      </div>
    </section>
  );
}


/* -------------------------------------------------------------------------- */
/* MANIFESTO + HUMAN LAYER                                                    */
/* -------------------------------------------------------------------------- */

function ExperienceBuildManifesto() {
  const principles = [
    ["01", "Señales", "Research · Usuarios · Negocio · Tecnología"],
    ["02", "Sentido", "Insights · Patrones · Decisiones"],
    ["03", "Servicio", "Journey Maps · Blueprints · Ecosistemas"],
    ["04", "Producto", "MVP · Roadmap · Impacto"],
    ["05", "Interfaz", "Flujos · Componentes · Interfaces"],
    ["06", "Construcción", "React · Motion · Performance"],
    ["07", "IA", "Síntesis · Exploración · Prototipos"],
    ["08", "Impacto", "Adopción · Conversión · Aprendizaje"],
  ];

  return (
    <section className="section eb-manifesto">
      <div className="manifesto-copy">
        <p className="eyebrow">Qué es Experience.Build</p>
        <h2>Un sistema para transformar complejidad en claridad.</h2>
        <p>
          Investigación, servicio, producto y tecnología trabajando como un solo sistema.
        </p>
      </div>

      <div className="manifesto-grid">
        {principles.map(([number, title, body]) => (
          <article key={title}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function BehindArchitectureSection() {
  return (
    <section className="section behind-architecture">
      <div className="behind-grid">
        <div className="behind-copy">
          <p className="eyebrow">Detrás de la arquitectura</p>
          <h2>
            Las experiencias no empiezan en una pantalla.
            <span> Empiezan entendiendo a las personas.</span>
          </h2>

          <p>
            Diseño productos, servicios e interfaces para convertir complejidad en experiencias claras, útiles y memorables.
          </p>

          <p>
            Toda experiencia tiene una arquitectura invisible. Mi trabajo consiste en descubrirla y convertirla en algo que las personas puedan entender y usar.
          </p>
        </div>

        <figure className="behind-photo">
          <img src={missPortrait} alt="Isaías sosteniendo a su gato negro" />
        </figure>
      </div>
    </section>
  );
}

function ExperienceContactCTA() {
  return (
    <section id="contacto" className="experience-contact-cta">
      <div className="contact-glow" />

      <div className="contact-inner">
        <p className="eyebrow">Contacto</p>

        <h2>Construyamos algo que las personas quieran usar.</h2>

        <p>
          Producto, servicio, UX/UI y tecnología alineados desde el inicio.
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

/* -------------------------------------------------------------------------- */
/* SHARED                                                                     */
/* -------------------------------------------------------------------------- */

function Header({ eyebrow, title, body, center = false }) {
  return (
    <div className={`section-header ${center ? "center" : ""}`}>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <p>{body}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* CSS                                                                        */
/* -------------------------------------------------------------------------- */

function ProjectStyles() {
  return (
    <style>{`
      html, body {
        background: #000;
        scroll-behavior: smooth;
      }

      .eb-project {
        min-height: 100vh;
        overflow: hidden;
        background: #000;
        color: white;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }


      .portfolio-nav {
        position: fixed;
        left: 50%;
        top: 28px;
        z-index: 150;
        transform: translateX(-50%);
        border: 1px solid rgba(255,255,255,.12);
        border-radius: 999px;
        background: rgba(0,0,0,.32);
        padding: 7px;
        backdrop-filter: blur(18px);
        box-shadow: 0 16px 50px rgba(0,0,0,.22);
      }

      .portfolio-nav nav {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .portfolio-nav a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 36px;
        border-radius: 999px;
        padding: 0 14px;
        color: rgba(255,255,255,.78);
        text-decoration: none;
        font-size: 12px;
        font-weight: 520;
        transition: 220ms ease;
      }

      .portfolio-nav a:hover {
        background: rgba(255,255,255,.10);
        color: white;
      }

      .experience-orbit-seal {
        position: fixed;
        right: 34px;
        bottom: 34px;
        z-index: 150;
        width: 80px;
        height: 80px;
        pointer-events: none;
        transition:
          opacity 420ms ease,
          transform 420ms cubic-bezier(.2,.8,.2,1),
          filter 420ms ease;
      }

      .experience-orbit-seal.is-visible {
        opacity: 1;
        transform: translate3d(0, 0, 0) scale(1);
        filter: blur(0);
      }

      .experience-orbit-seal.is-hidden {
        opacity: 0;
        transform: translate3d(0, 12px, 0) scale(.9);
        filter: blur(8px);
      }

      .experience-orbit-inner {
        position: relative;
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .experience-orbit-copy {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }

      .experience-orbit-text {
        font-size: 9px;
        fill: rgba(255,255,255,.8);
        letter-spacing: .02em;
      }

      .wf1 {
        padding-top: 140px;
      }

      .section {
        position: relative;
        overflow: hidden;
        background: #000;
        padding: 150px 20px;
      }

      .eyebrow {
        margin: 0;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 11px;
        letter-spacing: .44em;
        text-transform: uppercase;
        color: rgba(255,255,255,.42);
      }

      .rule {
        width: 288px;
        height: 1px;
        margin: 46px auto 0;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,.55), transparent);
      }

      .section-header {
        width: min(100%, 1440px);
        margin: 0 auto;
        display: grid;
        grid-template-columns: .9fr 1.1fr;
        gap: 72px;
        align-items: end;
      }

      .section-header.center {
        display: block;
        max-width: 980px;
        text-align: center;
      }

      .section-header h2 {
        margin: 24px 0 0;
        font-size: clamp(2.5rem, 5vw, 5rem);
        line-height: 1.02;
        letter-spacing: -.045em;
        font-weight: 520;
      }

      .section-header > p,
      .section-header.center > p {
        margin: 0;
        max-width: 720px;
        color: rgba(255,255,255,.52);
        font-size: 17px;
        line-height: 1.95;
      }

      .section-header.center > p {
        margin: 32px auto 0;
      }

      .wf1 {
        position: relative;
        min-height: 100vh;
        display: grid;
        place-items: center;
        overflow: hidden;
        background: #000;
        text-align: center;
        padding: 96px 24px;
      }

      .wf1__mesh {
        position: absolute;
        inset: 0;
        height: 100%;
        width: 100%;
      }

      .wf1__vignette {
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,.22) 45%, #000 92%);
      }

      .wf1__content {
        position: relative;
        z-index: 2;
        max-width: 980px;
      }

      .wf1 h1 {
        margin: 40px 0 0;
        font-size: clamp(3.4rem, 8vw, 6.4rem);
        line-height: 1;
        letter-spacing: -.045em;
        font-weight: 650;
      }

      .wf1 h1 span,
      .wf1 h2 span {
        color: rgba(255,255,255,.45);
      }

      .wf1 h2 {
        max-width: 780px;
        margin: 64px auto 0;
        font-size: clamp(2rem, 4.3vw, 4.25rem);
        line-height: 1.08;
        letter-spacing: -.035em;
        font-weight: 500;
      }

      .wf1 p:last-child {
        max-width: 680px;
        margin: 40px auto 0;
        color: rgba(255,255,255,.52);
        line-height: 1.95;
        font-size: 17px;
      }

      .recipe-carousel {
        width: min(100%, 1440px);
        margin: 88px auto 0;
        display: grid;
        min-height: 760px;
        grid-template-columns: 1.05fr .95fr;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,.1);
        border-radius: 48px;
        background: rgba(255,255,255,.035);
        box-shadow: 0 30px 90px rgba(0,0,0,.45);
      }

      .recipe-image {
        position: relative;
        min-height: 760px;
        overflow: hidden;
      }

      .recipe-image img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        animation: imageIn .55s cubic-bezier(.22,1,.36,1);
      }

      @keyframes imageIn {
        from { opacity: 0; transform: scale(1.05); filter: blur(10px); }
        to { opacity: 1; transform: scale(1); filter: blur(0); }
      }

      .recipe-image__overlay {
        position: absolute;
        inset: 0;
        background:
          linear-gradient(to top, rgba(0,0,0,.82), transparent 58%),
          linear-gradient(to right, rgba(0,0,0,.35), transparent 50%);
      }

      .counter {
        position: absolute;
        top: 24px;
        left: 24px;
        border: 1px solid rgba(255,255,255,.15);
        border-radius: 999px;
        background: rgba(0,0,0,.35);
        padding: 10px 14px;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 11px;
        letter-spacing: .24em;
        color: rgba(255,255,255,.65);
      }

      .recipe-image__title {
        position: absolute;
        left: 32px;
        right: 32px;
        bottom: 32px;
      }

      .recipe-image__title p {
        margin: 0;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 11px;
        letter-spacing: .34em;
        text-transform: uppercase;
        color: rgba(255,255,255,.5);
      }

      .recipe-image__title h3 {
        margin: 16px 0 0;
        font-size: clamp(2.5rem, 5vw, 5.6rem);
        line-height: .9;
        letter-spacing: -.045em;
        font-weight: 520;
      }

      .recipe-content {
        display: grid;
        align-content: space-between;
        gap: 48px;
        padding: clamp(28px, 4vw, 56px);
      }

      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .chips span {
        border: 1px solid rgba(255,255,255,.1);
        border-radius: 999px;
        background: rgba(255,255,255,.04);
        padding: 8px 12px;
        color: rgba(255,255,255,.58);
        font-size: 12px;
      }

      .recipe-content h4 {
        margin: 40px 0 0;
        font-size: clamp(2rem, 3.8vw, 4rem);
        line-height: 1.02;
        letter-spacing: -.02em;
        font-weight: 520;
      }

      .lead {
        margin: 32px 0 0;
        color: rgba(255,255,255,.58);
        font-size: 17px;
        line-height: 1.95;
      }

      .explain {
        margin-top: 40px;
        display: grid;
        gap: 22px;
      }

      .explain div {
        border-top: 1px solid rgba(255,255,255,.1);
        padding-top: 18px;
      }

      .explain small {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 10px;
        letter-spacing: .28em;
        text-transform: uppercase;
        color: rgba(255,255,255,.35);
      }

      .explain p {
        margin: 12px 0 0;
        color: rgba(255,255,255,.55);
        line-height: 1.8;
        font-size: 15px;
      }

      .result {
        border: 1px solid rgba(255,255,255,.1)!important;
        border-radius: 24px;
        background: rgba(0,0,0,.35);
        padding: 22px!important;
      }

      .result strong {
        display: block;
        margin-top: 12px;
        font-size: 24px;
        font-weight: 520;
        letter-spacing: -.02em;
      }

      .progress {
        height: 1px;
        width: 100%;
        background: rgba(255,255,255,.1);
      }

      .progress i {
        display: block;
        height: 1px;
        background: rgba(255,255,255,.72);
        transition: width .45s ease;
      }

      .carousel-controls {
        margin-top: 24px;
        display: flex;
        justify-content: space-between;
        gap: 24px;
        align-items: center;
      }

      .dots {
        display: flex;
        gap: 8px;
      }

      .dots button {
        width: 10px;
        height: 10px;
        border: 0;
        border-radius: 999px;
        background: rgba(255,255,255,.2);
        cursor: pointer;
        transition: .2s ease;
      }

      .dots button.active {
        width: 40px;
        background: rgba(255,255,255,.8);
      }

      .arrows {
        display: flex;
        gap: 12px;
      }

      .arrows button {
        border: 1px solid rgba(255,255,255,.12);
        border-radius: 999px;
        background: rgba(255,255,255,.05);
        color: rgba(255,255,255,.7);
        padding: 12px 18px;
        cursor: pointer;
      }

      .arrows button:last-child {
        background: white;
        color: black;
      }

      .scanner-stream {
        position: relative;
        width: min(100%, 1440px);
        height: 560px;
        margin: 96px auto 0;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,.1);
        border-radius: 48px;
        background: #f7f7f7;
      }

      .particle-canvas,
      .scanner-canvas {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: 300px;
        transform: translateY(-50%);
        pointer-events: none;
      }

      .particle-canvas { z-index: 1; }
      .scanner-canvas { z-index: 3; }

      .scanner-line {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 5;
        height: 300px;
        width: 2px;
        transform: translate(-50%, -50%);
        border-radius: 999px;
        background: linear-gradient(to bottom, transparent, #8b5cf6, transparent);
        opacity: 0;
        box-shadow: 0 0 10px #a78bfa, 0 0 30px #8b5cf6, 0 0 60px #6366f1;
        transition: opacity .3s ease;
        animation: scanPulse 1.5s infinite alternate ease-in-out;
      }

      .scanner-line.visible { opacity: 1; }

      @keyframes scanPulse {
        from { transform: translate(-50%, -50%) scaleY(1); }
        to { transform: translate(-50%, -50%) scaleY(1.04); }
      }

      .scanner-rail {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
      }

      .scanner-card-line {
        display: flex;
        align-items: center;
        white-space: nowrap;
        will-change: transform;
      }

      .scanner-card {
        position: relative;
        width: 380px;
        height: 240px;
        flex-shrink: 0;
      }

      .card-layer {
        position: absolute;
        inset: 0;
        overflow: hidden;
        border-radius: 22px;
        box-shadow: 0 15px 40px rgba(0,0,0,.28);
      }

      .card-normal {
        z-index: 2;
        clip-path: inset(0 0 0 var(--clip-right, 0%));
      }

      .card-ascii {
        z-index: 1;
        background: white;
        clip-path: inset(0 calc(100% - var(--clip-left, 0%)) 0 0);
      }

      .card-normal img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        filter: brightness(1.05) contrast(1.06);
      }

      .scanner-card-caption {
        position: absolute;
        inset: auto 18px 18px 18px;
        color: white;
      }

      .scanner-card-caption small {
        display: block;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 10px;
        letter-spacing: .26em;
        text-transform: uppercase;
        color: rgba(255,255,255,.68);
      }

      .scanner-card-caption strong {
        display: block;
        margin-top: 10px;
        font-size: 18px;
        letter-spacing: -.02em;
      }

      .card-ascii pre {
        margin: 0;
        height: 100%;
        width: 100%;
        overflow: hidden;
        padding: 0;
        color: rgba(100,80,255,.55);
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 11px;
        line-height: 13px;
        white-space: pre;
        animation: glitch .1s infinite linear alternate-reverse;
      }

      @keyframes glitch {
        0%, 16%, 50%, 100% { opacity: 1; }
        15%, 99% { opacity: .9; }
        49% { opacity: .8; }
      }

      .scanner-speed {
        position: absolute;
        right: 24px;
        bottom: 24px;
        z-index: 8;
        color: rgba(0,0,0,.35);
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 11px;
        letter-spacing: .22em;
        text-transform: uppercase;
      }

      .artifact-grid,
      .decision-grid,
      .impact-grid {
        width: min(100%, 1440px);
        margin: 88px auto 0;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 22px;
      }

      .artifact-card,
      .decision-card,
      .impact-grid article {
        min-height: 340px;
        border: 1px solid rgba(255,255,255,.1);
        border-radius: 32px;
        background:
          radial-gradient(circle at 80% 10%, rgba(255,255,255,.1), transparent 30%),
          rgba(255,255,255,.035);
        padding: 28px;
      }

      .artifact-card small,
      .decision-card small,
      .impact-grid small,
      .ai-panel small,
      .orbit-core small {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 10px;
        letter-spacing: .28em;
        text-transform: uppercase;
        color: rgba(255,255,255,.38);
      }

      .artifact-card h3,
      .decision-card h3,
      .impact-grid h3,
      .ai-panel h3 {
        margin: 32px 0 0;
        font-size: 32px;
        line-height: 1.05;
        letter-spacing: -.035em;
        font-weight: 520;
      }

      .artifact-card p,
      .decision-card p,
      .impact-grid p,
      .ai-panel p {
        margin-top: 20px;
        color: rgba(255,255,255,.56);
        line-height: 1.85;
      }

      .artifact-card span {
        display: inline-flex;
        margin-top: 40px;
        border: 1px solid rgba(255,255,255,.1);
        border-radius: 999px;
        padding: 10px 14px;
        color: rgba(255,255,255,.5);
        font-size: 12px;
      }

      .decision-grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }


      .ai-matter-section {
        position: relative;
        width: min(100%, 1440px);
        min-height: 760px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 72px;
        align-items: center;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,.1);
        border-radius: 56px;
        background:
          radial-gradient(circle at 60% 35%, rgba(255,255,255,.1), transparent 34%),
          radial-gradient(circle at 10% 90%, rgba(120,120,255,.08), transparent 34%),
          #000;
        padding: clamp(28px, 6vw, 84px);
      }

      .ai-matter-visual {
        position: relative;
        min-height: 560px;
        display: grid;
        place-items: center;
      }

      .ai-matter-orb {
        position: relative;
        width: min(82vw, 560px);
        height: min(82vw, 560px);
        display: grid;
        place-items: center;
        filter: drop-shadow(0 0 70px rgba(255,255,255,.14));
      }

      .ai-matter-shape {
        position: absolute;
        inset: 14%;
        border-radius: 42% 58% 47% 53% / 45% 40% 60% 55%;
        background:
          radial-gradient(circle at 32% 28%, rgba(255,255,255,.95), transparent 8%),
          radial-gradient(circle at 44% 36%, rgba(255,255,255,.35), transparent 14%),
          radial-gradient(circle at 68% 64%, rgba(255,255,255,.18), transparent 20%),
          linear-gradient(135deg, rgba(255,255,255,.72), rgba(255,255,255,.04));
        border: 1px solid rgba(255,255,255,.22);
        mix-blend-mode: screen;
        opacity: .78;
        transform-style: preserve-3d;
      }

      .ai-matter-shape::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background-image:
          linear-gradient(rgba(255,255,255,.38) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.22) 1px, transparent 1px);
        background-size: 9px 9px;
        opacity: .42;
        mask-image: radial-gradient(circle at center, black, transparent 72%);
      }

      .shape-a {
        animation: anomalousFloatA 8s ease-in-out infinite;
      }

      .shape-b {
        inset: 20%;
        opacity: .42;
        filter: blur(.4px);
        animation: anomalousFloatB 10s ease-in-out infinite;
      }

      .shape-c {
        inset: 8%;
        opacity: .22;
        filter: blur(2px);
        animation: anomalousFloatC 13s ease-in-out infinite;
      }

      @keyframes anomalousFloatA {
        0%, 100% {
          transform: rotate(0deg) scale(1) translate3d(0,0,0);
          border-radius: 42% 58% 47% 53% / 45% 40% 60% 55%;
        }

        50% {
          transform: rotate(12deg) scale(1.06) translate3d(10px,-14px,0);
          border-radius: 54% 46% 62% 38% / 45% 62% 38% 55%;
        }
      }

      @keyframes anomalousFloatB {
        0%, 100% {
          transform: rotate(22deg) scale(.94) translate3d(0,0,0);
          border-radius: 52% 48% 42% 58% / 38% 58% 42% 62%;
        }

        50% {
          transform: rotate(-10deg) scale(1.12) translate3d(-18px,12px,0);
          border-radius: 35% 65% 58% 42% / 55% 40% 60% 45%;
        }
      }

      @keyframes anomalousFloatC {
        0%, 100% {
          transform: rotate(-18deg) scale(1.04);
        }

        50% {
          transform: rotate(18deg) scale(.94);
        }
      }

      .ai-matter-grid {
        position: absolute;
        inset: 8%;
        border-radius: 999px;
        background:
          radial-gradient(circle at center, rgba(255,255,255,.08), transparent 58%),
          conic-gradient(from 90deg, transparent, rgba(255,255,255,.14), transparent, rgba(255,255,255,.06), transparent);
        mask-image: radial-gradient(circle at center, black, transparent 70%);
        animation: rotateMatter 34s linear infinite;
      }

      @keyframes rotateMatter {
        to {
          transform: rotate(360deg);
        }
      }

      .ai-matter-noise {
        position: absolute;
        inset: 0;
        background-image:
          radial-gradient(circle at 20% 30%, rgba(255,255,255,.2) 0 1px, transparent 2px),
          radial-gradient(circle at 80% 70%, rgba(255,255,255,.12) 0 1px, transparent 2px);
        background-size: 34px 34px, 48px 48px;
        opacity: .22;
        animation: matterNoise 4s steps(6) infinite;
      }

      @keyframes matterNoise {
        0%, 100% {
          transform: translate(0,0);
        }

        50% {
          transform: translate(12px,-8px);
        }
      }

      .ai-matter-copy h2 {
        margin: 28px 0 0;
        font-size: clamp(2.6rem, 5.6vw, 5.8rem);
        line-height: 1.02;
        letter-spacing: -.025em;
        font-weight: 560;
      }

      .ai-matter-copy h2 span {
        color: rgba(255,255,255,.52);
      }

      .ai-matter-copy > p {
        margin: 36px 0 0;
        max-width: 680px;
        color: rgba(255,255,255,.58);
        font-size: 18px;
        line-height: 1.95;
      }

      .ai-matter-points {
        margin-top: 48px;
        display: grid;
        gap: 16px;
      }

      .ai-matter-points article {
        border-top: 1px solid rgba(255,255,255,.1);
        padding-top: 18px;
      }

      .ai-matter-points small {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 10px;
        letter-spacing: .28em;
        text-transform: uppercase;
        color: rgba(255,255,255,.38);
      }

      .ai-matter-points strong {
        display: block;
        margin-top: 10px;
        font-size: 22px;
        letter-spacing: -.015em;
        font-weight: 540;
      }

      .ai-matter-points p {
        margin: 10px 0 0;
        color: rgba(255,255,255,.54);
        line-height: 1.75;
        font-size: 15px;
      }

      .radial-orbit-stage {
        position: relative;
        width: min(100%, 1180px);
        height: 760px;
        margin: 96px auto 0;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,.1);
        border-radius: 48px;
        background:
          radial-gradient(circle at center, rgba(255,255,255,.08), transparent 42%),
          #000;
      }

      .radial-orbit-glow {
        position: absolute;
        inset: 0;
        background:
          radial-gradient(circle at 50% 50%, rgba(255,255,255,.08), transparent 28%),
          radial-gradient(circle at 40% 60%, rgba(120,120,255,.12), transparent 36%);
        animation: radialGlow 5s ease-in-out infinite;
      }

      @keyframes radialGlow {
        0%, 100% {
          opacity: .5;
          transform: scale(1);
        }

        50% {
          opacity: 1;
          transform: scale(1.04);
        }
      }

      .radial-orbit-core {
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 20;
        display: grid;
        place-items: center;
        width: 72px;
        height: 72px;
        transform: translate(-50%, -50%);
        border-radius: 999px;
        background: linear-gradient(135deg, rgba(168,85,247,1), rgba(59,130,246,1), rgba(20,184,166,1));
        box-shadow: 0 0 42px rgba(255,255,255,.18);
      }

      .radial-core-dot {
        width: 34px;
        height: 34px;
        border-radius: 999px;
        background: rgba(255,255,255,.82);
        backdrop-filter: blur(12px);
      }

      .radial-core-ping {
        position: absolute;
        border-radius: 999px;
        border: 1px solid rgba(255,255,255,.18);
        animation: corePing 2.4s ease-out infinite;
      }

      .radial-core-ping.one {
        width: 92px;
        height: 92px;
      }

      .radial-core-ping.two {
        width: 116px;
        height: 116px;
        animation-delay: .55s;
        opacity: .6;
      }

      @keyframes corePing {
        0% {
          transform: scale(.85);
          opacity: .8;
        }

        100% {
          transform: scale(1.4);
          opacity: 0;
        }
      }

      .radial-orbit-circle {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 460px;
        height: 460px;
        transform: translate(-50%, -50%);
        border: 1px solid rgba(255,255,255,.1);
        border-radius: 999px;
      }

      .radial-node-wrap {
        position: absolute;
        left: 50%;
        top: 50%;
        cursor: pointer;
        transition:
          transform .7s ease,
          opacity .7s ease;
      }

      .radial-node-energy {
        position: absolute;
        border-radius: 999px;
        background: radial-gradient(circle, rgba(255,255,255,.2), rgba(255,255,255,0) 70%);
        pointer-events: none;
      }

      .radial-node-energy.pulse {
        animation: nodePulse 1s ease-in-out infinite;
      }

      @keyframes nodePulse {
        0%, 100% {
          opacity: .45;
          transform: scale(.9);
        }

        50% {
          opacity: 1;
          transform: scale(1.12);
        }
      }

      .radial-node-dot {
        position: relative;
        z-index: 3;
        display: grid;
        width: 44px;
        height: 44px;
        place-items: center;
        transform: translate(-50%, -50%);
        border: 2px solid rgba(255,255,255,.42);
        border-radius: 999px;
        background: rgba(0,0,0,.72);
        color: white;
        transition: .3s ease;
      }

      .radial-node-dot span {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 11px;
        color: currentColor;
      }

      .radial-node-dot.expanded {
        transform: translate(-50%, -50%) scale(1.5);
        border-color: white;
        background: white;
        color: black;
        box-shadow: 0 0 42px rgba(255,255,255,.3);
      }

      .radial-node-dot.related {
        border-color: white;
        background: rgba(255,255,255,.55);
        color: black;
        animation: nodePulse .9s ease-in-out infinite;
      }

      .radial-node-label {
        position: absolute;
        top: 34px;
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
        font-size: 12px;
        font-weight: 650;
        letter-spacing: .08em;
        color: rgba(255,255,255,.68);
        transition: .3s ease;
      }

      .radial-node-label.expanded {
        color: white;
        transform: translateX(-50%) scale(1.16);
      }

      .radial-node-card {
        position: absolute;
        top: 78px;
        left: 50%;
        z-index: 60;
        width: 288px;
        transform: translateX(-50%);
        overflow: visible;
        border: 1px solid rgba(255,255,255,.26);
        border-radius: 16px;
        background: rgba(0,0,0,.9);
        padding: 20px;
        box-shadow: 0 20px 80px rgba(255,255,255,.08);
        backdrop-filter: blur(18px);
      }

      .radial-card-connector {
        position: absolute;
        top: -14px;
        left: 50%;
        width: 1px;
        height: 14px;
        transform: translateX(-50%);
        background: rgba(255,255,255,.52);
      }

      .radial-card-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }

      .radial-status {
        border: 1px solid currentColor;
        border-radius: 999px;
        padding: 4px 9px;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 10px;
        letter-spacing: .08em;
      }

      .radial-status.completed {
        background: white;
        color: black;
      }

      .radial-status.in-progress {
        background: black;
        color: white;
      }

      .radial-status.pending {
        background: rgba(255,255,255,.08);
        color: rgba(255,255,255,.72);
      }

      .radial-card-top small {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 10px;
        color: rgba(255,255,255,.48);
      }

      .radial-node-card h3 {
        margin: 18px 0 0;
        font-size: 16px;
        letter-spacing: -.015em;
      }

      .radial-node-card p {
        margin: 12px 0 0;
        color: rgba(255,255,255,.72);
        font-size: 12px;
        line-height: 1.65;
      }

      .radial-energy {
        margin-top: 18px;
        border-top: 1px solid rgba(255,255,255,.1);
        padding-top: 14px;
      }

      .radial-energy-head {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        color: rgba(255,255,255,.72);
        font-size: 11px;
      }

      .radial-energy-bar {
        height: 4px;
        margin-top: 8px;
        overflow: hidden;
        border-radius: 999px;
        background: rgba(255,255,255,.1);
      }

      .radial-energy-bar i {
        display: block;
        height: 100%;
        border-radius: inherit;
        background: linear-gradient(90deg, #3b82f6, #a855f7);
      }

      .radial-related {
        margin-top: 18px;
        border-top: 1px solid rgba(255,255,255,.1);
        padding-top: 14px;
      }

      .radial-related small {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 10px;
        letter-spacing: .12em;
        text-transform: uppercase;
        color: rgba(255,255,255,.58);
      }

      .radial-related div {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 10px;
      }

      .radial-related button {
        border: 1px solid rgba(255,255,255,.18);
        background: transparent;
        color: rgba(255,255,255,.78);
        padding: 6px 8px;
        font-size: 11px;
        cursor: pointer;
      }

      .radial-related button:hover {
        background: rgba(255,255,255,.1);
        color: white;
      }

      .radial-helper {
        position: absolute;
        left: 50%;
        bottom: 34px;
        z-index: 10;
        width: min(90%, 420px);
        transform: translateX(-50%);
        text-align: center;
      }

      .radial-helper small {
        display: block;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 10px;
        letter-spacing: .28em;
        text-transform: uppercase;
        color: rgba(255,255,255,.38);
      }

      .radial-helper strong {
        display: block;
        margin-top: 10px;
        color: rgba(255,255,255,.74);
        font-size: 18px;
        letter-spacing: -.015em;
      }

      .impact-grid {
        grid-template-columns: repeat(3, minmax(0,1fr));
      }

      .impact-grid h3 {
        font-size: clamp(2rem, 4vw, 4rem);
      }


      /* Title readability tuning */
      .wf1 h1,
      .wf1 h2,
      .section-header h2,
      .recipe-image__title h3,
      .recipe-content h4,
      .artifact-card h3,
      .decision-card h3,
      .impact-grid h3,
      .ai-matter-copy h2 {
        letter-spacing: -.025em;
        text-wrap: balance;
      }

      .artifact-card h3,
      .decision-card h3,
      .impact-grid h3,
      .ai-matter-points strong,
      .radial-node-card h3,
      .radial-helper strong {
        letter-spacing: -.015em;
      }

      @media (max-width: 1100px) {

        .portfolio-nav {
          top: auto;
          bottom: 18px;
          max-width: calc(100vw - 28px);
          overflow-x: auto;
        }

        .portfolio-nav nav {
          min-width: max-content;
        }

        .experience-orbit-seal {
          right: 24px;
          bottom: 94px;
        }

        .experience-orbit-inner {
          transform: scale(.82);
        }

        .section-header,
        .recipe-carousel,
        .ai-matter-section {
          grid-template-columns: 1fr;
        }

        .recipe-image {
          min-height: 460px;
        }

        .recipe-carousel {
          min-height: auto;
        }

        .artifact-grid,
        .decision-grid,
        .impact-grid {
          grid-template-columns: repeat(2, minmax(0,1fr));
        }

        .ai-matter-section {
          text-align: center;
        }

        .ai-matter-copy > p {
          margin-left: auto;
          margin-right: auto;
        }

        .ai-matter-visual {
          min-height: 420px;
        }
      }

      @media (max-width: 720px) {
        .section {
          padding: 104px 16px;
        }

        .section-header h2 {
          font-size: clamp(2.25rem, 12vw, 3.4rem);
        }

        .section-header > p {
          font-size: 16px;
        }

        .wf1 h1 {
          font-size: clamp(3rem, 17vw, 4.4rem);
        }

        .wf1 h2 {
          font-size: clamp(2rem, 12vw, 3.2rem);
        }

        .recipe-carousel {
          border-radius: 32px;
        }

        .recipe-content {
          padding: 24px;
        }

        .recipe-image {
          min-height: 380px;
        }

        .carousel-controls {
          align-items: flex-start;
          flex-direction: column;
        }

        .artifact-grid,
        .decision-grid,
        .impact-grid {
          grid-template-columns: 1fr;
        }

        .scanner-stream {
          height: 520px;
          border-radius: 32px;
        }

        .scanner-card {
          width: 300px;
          height: 200px;
        }

        .radial-orbit-stage {
          height: 680px;
          border-radius: 32px;
        }

        .radial-orbit-circle {
          width: 320px;
          height: 320px;
        }

        .radial-node-wrap {
          transform: scale(.82);
        }

        .radial-node-card {
          width: 260px;
        }
      }

      .experience-progress {
        position: fixed;
        inset: 0 0 auto 0;
        z-index: 5000;
        height: 6px;
        background: rgba(255,255,255,.055);
        box-shadow: 0 0 22px rgba(157,185,255,.12);
      }

      .experience-progress span {
        display: block;
        height: 100%;
        transform-origin: left center;
        background: linear-gradient(90deg, #9DB9FF, #BFA7FF, #E7A7FF, #FFC1D9, #BFEAD8);
        box-shadow: 0 0 28px rgba(231,167,255,.42);
      }

      .eb-project {
        background:
          radial-gradient(circle at 72% 8%, rgba(157,185,255,.13), transparent 28%),
          radial-gradient(circle at 22% 12%, rgba(231,167,255,.08), transparent 25%),
          radial-gradient(circle at 50% 100%, rgba(191,234,216,.045), transparent 35%),
          linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px),
          #030303 !important;
        background-size: auto, auto, auto, 96px 96px, 96px 96px, auto;
      }

      .portfolio-nav {
        top: 24px !important;
        border: 0 !important;
        border-radius: 0 !important;
        background: transparent !important;
        padding: 0 !important;
        box-shadow: none !important;
        backdrop-filter: none !important;
        transition: 320ms cubic-bezier(.22,1,.36,1);
      }

      .portfolio-nav.is-scrolled {
        top: 16px !important;
        opacity: .94;
        transform: translateX(-50%) scale(.985);
      }

      .portfolio-nav nav {
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

      .portfolio-nav a {
        min-height: 32px !important;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        padding: 0 18px !important;
        color: rgba(255,255,255,.58) !important;
        text-decoration: none;
        font-size: 12px !important;
        font-weight: 460 !important;
        letter-spacing: .018em !important;
        transition: 260ms cubic-bezier(.22,1,.36,1);
        white-space: nowrap;
      }

      .portfolio-nav a:hover,
      .portfolio-nav a.active {
        color: white !important;
        background: rgba(255,255,255,.075) !important;
        transform: translateY(-1px);
      }

      .experience-orbit-seal {
        display: none !important;
      }

      .wf1__mesh {
        opacity: .92;
        filter: saturate(1.12) brightness(1.04);
      }

      .wf1__vignette {
        background:
          radial-gradient(circle at 50% 48%, rgba(255,255,255,.035), transparent 36%),
          radial-gradient(circle at 70% 18%, rgba(231,167,255,.12), transparent 34%),
          radial-gradient(circle at 28% 20%, rgba(157,185,255,.12), transparent 34%),
          linear-gradient(to bottom, rgba(3,3,3,.18), rgba(3,3,3,.08) 42%, rgba(3,3,3,.86)),
          radial-gradient(circle at center, transparent 0%, rgba(3,3,3,.22) 45%, #030303 92%) !important;
      }

      .section {
        background: transparent !important;
      }

      .section-header h2,
      .manifesto-copy h2,
      .behind-copy h2,
      .experience-contact-cta h2 {
        letter-spacing: -.055em !important;
        font-weight: 380 !important;
      }

      .section-header > p,
      .section-header.center > p,
      .manifesto-copy p,
      .behind-copy p,
      .experience-contact-cta p {
        letter-spacing: -.012em;
      }

      .eb-manifesto {
        width: min(100% - 84px, 1540px);
        margin: 48px auto 0;
        padding: 110px 72px;
        border: 1px solid rgba(255,255,255,.055);
        border-radius: 46px;
        background: linear-gradient(135deg, rgba(255,255,255,.044), rgba(255,255,255,.014)) !important;
        box-shadow: inset 0 1px 0 rgba(255,255,255,.065), 0 24px 80px rgba(0,0,0,.28);
        backdrop-filter: blur(16px);
      }

      .manifesto-copy {
        max-width: 1080px;
      }

      .manifesto-copy h2 {
        margin: 28px 0 0;
        max-width: 1120px;
        font-size: clamp(2.75rem, 4.8vw, 6.2rem);
        line-height: 1.1;
      }

      .manifesto-copy p {
        max-width: 74ch;
        margin: 34px 0 0;
        color: rgba(245,245,247,.64);
        font-size: 18px;
        line-height: 1.95;
      }

      .manifesto-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 18px;
        margin-top: 64px;
      }

      .manifesto-grid article {
        min-height: 250px;
        border: 1px solid rgba(255,255,255,.075);
        border-radius: 30px;
        background: rgba(0,0,0,.18);
        padding: 26px;
        transition: 260ms ease;
      }

      .manifesto-grid article:hover {
        transform: translateY(-6px);
        border-color: rgba(255,255,255,.14);
      }

      .manifesto-grid span {
        color: #BFA7FF;
        font-size: 11px;
        font-weight: 820;
        letter-spacing: .22em;
        text-transform: uppercase;
      }

      .manifesto-grid h3 {
        margin: 42px 0 0;
        font-size: 24px;
        line-height: 1.18;
        letter-spacing: -.03em;
        font-weight: 560;
      }

      .manifesto-grid p {
        margin: 18px 0 0;
        color: rgba(245,245,247,.58);
        font-size: 13px;
        line-height: 1.7;
      }

      .behind-architecture {
        width: min(100% - 84px, 1540px);
        margin: 48px auto 0;
        padding: 110px 72px;
        border: 1px solid rgba(255,255,255,.055);
        border-radius: 46px;
        background: linear-gradient(135deg, rgba(255,255,255,.044), rgba(255,255,255,.014)) !important;
        box-shadow: inset 0 1px 0 rgba(255,255,255,.065), 0 24px 80px rgba(0,0,0,.28);
        backdrop-filter: blur(16px);
      }

      .behind-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.08fr) minmax(420px, .92fr);
        gap: 72px;
        align-items: center;
      }

      .behind-copy h2 {
        max-width: 980px;
        margin: 28px 0 0;
        font-size: clamp(2.75rem, 4.8vw, 6.2rem);
        line-height: 1.1;
      }

      .behind-copy h2 span {
        color: rgba(245,245,247,.48);
      }

      .behind-copy p {
        max-width: 72ch;
        margin: 34px 0 0;
        color: rgba(245,245,247,.64);
        font-size: 18px;
        line-height: 1.95;
      }

      .behind-photo {
        position: relative;
        overflow: hidden;
        min-height: 720px;
        margin: 0;
        border-radius: 42px;
        border: 1px solid rgba(255,255,255,.075);
        background: rgba(255,255,255,.035);
        box-shadow: 0 34px 110px rgba(0,0,0,.34);
      }

      .behind-photo::after {
        content: "";
        position: absolute;
        inset: 0;
        background:
          radial-gradient(circle at 50% 0%, rgba(255,255,255,.10), transparent 28%),
          linear-gradient(to top, rgba(3,3,3,.10), transparent 40%);
        pointer-events: none;
      }

      .behind-photo img {
        width: 100%;
        height: 100%;
        min-height: 720px;
        object-fit: cover;
        display: block;
      }

      .experience-contact-cta {
        position: relative;
        overflow: hidden;
        width: min(100% - 84px, 1540px);
        margin: 48px auto 80px;
        padding: 140px 60px 90px;
        text-align: center;
        border: 1px solid rgba(255,255,255,.055);
        border-radius: 46px;
        background: linear-gradient(135deg, rgba(255,255,255,.044), rgba(255,255,255,.014));
        box-shadow: inset 0 1px 0 rgba(255,255,255,.065), 0 24px 80px rgba(0,0,0,.28);
        backdrop-filter: blur(16px);
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

      .experience-contact-cta h2 {
        max-width: 980px;
        margin: 26px auto 0;
        font-size: clamp(3.4rem, 5vw, 6.4rem);
        line-height: 1.14;
      }

      .experience-contact-cta p:not(.eyebrow) {
        max-width: 760px;
        margin: 42px auto 0;
        color: rgba(245,245,247,.58);
        font-size: 18px;
        line-height: 1.95;
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

      @media (max-width: 1280px) {
        .manifesto-grid {
          grid-template-columns: repeat(2, 1fr);
        }

        .behind-grid {
          grid-template-columns: 1fr;
        }

        .behind-photo,
        .behind-photo img {
          min-height: 620px;
        }
      }

      @media (max-width: 760px) {
        .experience-progress {
          height: 5px;
        }

        .portfolio-nav {
          top: 14px !important;
          width: calc(100% - 28px);
        }

        .portfolio-nav nav {
          justify-content: flex-start !important;
          width: 100%;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .portfolio-nav nav::-webkit-scrollbar {
          display: none;
        }

        .portfolio-nav a {
          padding: 0 13px !important;
          font-size: 12px !important;
        }

        .eb-manifesto,
        .behind-architecture,
        .experience-contact-cta {
          width: calc(100% - 28px);
          padding: 58px 22px;
          border-radius: 32px;
        }

        .manifesto-copy h2,
        .behind-copy h2,
        .experience-contact-cta h2 {
          font-size: clamp(2.15rem, 11vw, 3.7rem);
          line-height: 1.14;
          letter-spacing: -.04em;
        }

        .manifesto-copy p,
        .behind-copy p,
        .experience-contact-cta p:not(.eyebrow) {
          font-size: 16px;
          line-height: 1.86;
        }

        .manifesto-grid {
          grid-template-columns: 1fr;
        }

        .behind-photo,
        .behind-photo img {
          min-height: 420px;
        }

        .experience-contact-cta {
          text-align: left;
        }

        .contact-signature {
          justify-content: flex-start;
          gap: 14px;
          font-size: 10px;
        }

        .contact-signature span:not(:last-child)::after {
          right: -10px;
        }
      }

    `}</style>
  );
}
