import { useEffect, useRef, useState } from "react";

import brainImage from "./brain-white-network.png";
import vwLogo from "./assets/vw-logo.png";
import generacionLogo from "./assets/generacion-logo.png";
import santanderLogo from "./assets/Santander-logo.png";
import andonixLogo from "./assets/andonix-logo.png";
import fincomunLogo from "./assets/Fincomun-logo.png";

const brandPastels = {
  blue: "#9DB9FF",
  violet: "#BFA7FF",
  magenta: "#E7A7FF",
  pink: "#FFC1D9",
  mint: "#BFEAD8",
  coral: "#FFB28A",
  red: "#FFB2B2",
};

const disciplines = [
  { name: "Research", x: 18, y: 31, color: brandPastels.pink },
  { name: "UX/UI", x: 78, y: 27, color: brandPastels.blue },
  { name: "Product Design", x: 56, y: 54, color: brandPastels.magenta },
  { name: "Service Design", x: 24, y: 74, color: brandPastels.violet },
  { name: "Front-End", x: 82, y: 77, color: brandPastels.mint },
];

const brands = [
  { name: "Volkswagen México", logo: vwLogo, meta: "Automotive · Product UX", accent: brandPastels.blue },
  { name: "Generación i", logo: generacionLogo, meta: "EdTech · Service Experience", accent: brandPastels.coral },
  { name: "Santander", logo: santanderLogo, meta: "Banking · Service Design", accent: brandPastels.red },
  { name: "Andonix", logo: andonixLogo, meta: "AI · Product Design", accent: brandPastels.violet },
  { name: "Fincomún", logo: fincomunLogo, meta: "Fintech · UX Architecture", accent: brandPastels.mint },
];

const cases = [
  {
    n: "01",
    title: "Generación i",
    desc: "Una experiencia educativa diseñada para ordenar aprendizaje, operación y empleabilidad en un sistema más claro para usuarios y equipos internos.",
    icon: "logo-generacion",
    accent: brandPastels.coral,
    href: "/generacion-i",
  },
  {
    n: "02",
    title: "Eilik + AI",
    desc: "Exploración de producto, emoción e inteligencia artificial para entender cómo una interfaz puede sentirse cercana, útil y memorable.",
    icon: "robot",
    accent: brandPastels.violet,
    href: "/eilik",
  },
  {
    n: "03",
    title: "Bienes Raíces Guzmán",
    desc: "Transformación de una experiencia inmobiliaria para convertir información dispersa, atención comercial y decisiones de compra en un flujo más legible.",
    icon: "brg",
    accent: brandPastels.mint,
    href: "/bienes-raices",
  },
  {
    n: "04",
    title: "Making of Portfolio",
    desc: "La arquitectura detrás de experience.build: narrativa, diseño visual, decisiones UX, estructura front-end e integración progresiva con IA.",
    icon: "code",
    accent: brandPastels.blue,
    href: "/making-of-portfolio",
  },
];

const capabilities = [
  {
    icon: "⌕",
    title: "Investigar",
    body: "Antes de diseñar, leo el sistema: usuarios, negocio, operación, restricciones técnicas y momentos donde la experiencia pierde claridad.",
  },
  {
    icon: "◇",
    title: "Arquitecturar",
    body: "Ordeno información, flujos y decisiones para que un producto complejo pueda entenderse, navegarse y escalar sin perder intención.",
  },
  {
    icon: "◎",
    title: "Diseñar",
    body: "Transformo hallazgos en interfaces con jerarquía, ritmo, microcopy útil y componentes pensados para evolucionar.",
  },
  {
    icon: "✦",
    title: "Validar",
    body: "Uso prototipos, heurísticas, pruebas e indicadores para reducir incertidumbre antes de llevar una solución a desarrollo.",
  },
  {
    icon: "⌘",
    title: "Construir",
    body: "Trabajo cerca de front-end para que la intención del diseño viva también en la implementación: responsive, consistente y funcional.",
  },
  {
    icon: "✺",
    title: "Optimizar",
    body: "Mido, aprendo y ajusto la experiencia para mejorar claridad, eficiencia operativa, conversión y percepción de valor.",
  },
];

const stack = [
  {
    group: "Product Design",
    accent: brandPastels.violet,
    tools: ["Figma", "Design Systems", "Prototyping", "UX/UI"],
  },
  {
    group: "Research",
    accent: brandPastels.pink,
    tools: ["Maze", "Optimal Workshop", "UXCam", "Heuristics"],
  },
  {
    group: "Front-End",
    accent: brandPastels.blue,
    tools: ["React", "Tailwind CSS", "Vite", "Motion"],
  },
  {
    group: "AI",
    accent: brandPastels.magenta,
    tools: ["ChatGPT", "Claude", "Prompt Design", "AI Workflows"],
  },
];

const uiCards = [
  {
    label: "UI MOBILE",
    title: "Mobile interfaces",
    desc: "Experiencias móviles diseñadas para priorizar lo esencial: menos ruido, decisiones más claras y una interacción que acompaña al usuario sin estorbar.",
    href: "/ui/mobile",
    accent: brandPastels.pink,
    icon: "▯",
  },
  {
    label: "UI WEB",
    title: "Web products",
    desc: "Productos web con estructura editorial, jerarquía visual precisa y sistemas de interfaz pensados para comunicar valor con calma y dirección.",
    href: "/ui/web",
    accent: brandPastels.blue,
    icon: "◫",
  },
];

function MiniIcon({ type }) {
  if (type === "robot") {
    return (
      <svg viewBox="0 0 64 64" className="mini-svg" aria-hidden="true">
        <rect x="15" y="18" width="34" height="29" rx="12" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="26" cy="32" r="3" fill="currentColor" />
        <circle cx="38" cy="32" r="3" fill="currentColor" />
        <path d="M27 41h10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M32 18V10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="32" cy="8" r="3" fill="currentColor" />
      </svg>
    );
  }

  if (type === "brg") return <strong className="brg-icon">BRG</strong>;
  if (type === "code") return <span className="code-icon">&lt;/&gt;</span>;

  return <img src={generacionLogo} alt="Generación i" className="case-logo-img" />;
}

function ToolGlyph({ label }) {
  const initials = {
    Figma: "Fi",
    "Design Systems": "DS",
    Prototyping: "Pr",
    "UX/UI": "UI",
    Maze: "Mz",
    "Optimal Workshop": "OW",
    UXCam: "UX",
    Heuristics: "Hx",
    React: "⚛",
    "Tailwind CSS": "Tw",
    Vite: "Vi",
    Motion: "Mo",
    ChatGPT: "GPT",
    Claude: "Cl",
    "Prompt Design": "//",
    "AI Workflows": "AI",
  };

  return <span className="tool-glyph">{initials[label] || label.slice(0, 2)}</span>;
}

function NeuralCanvas({ activePoint, onPointChange }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const pointerRef = useRef({ x: activePoint.x, y: activePoint.y });

  useEffect(() => {
    pointerRef.current = activePoint;
  }, [activePoint]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let frame = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    particlesRef.current = Array.from({ length: 145 }, () => ({
      x: Math.random() * w(),
      y: Math.random() * h(),
      vx: (Math.random() - 0.5) * 0.55,
      vy: (Math.random() - 0.5) * 0.55,
      r: Math.random() * 1.8 + 0.7,
      pull: Math.random() * 0.032 + 0.014,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w(), h());

      const targetX = (pointerRef.current.x / 100) * w();
      const targetY = (pointerRef.current.y / 100) * h();
      const targetColor = pointerRef.current.color || "#E7A7FF";

      particlesRef.current.forEach((p) => {
        const dx = targetX - p.x;
        const dy = targetY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        p.vx += (dx / dist) * p.pull;
        p.vy += (dy / dist) * p.pull;
        p.vx *= 0.955;
        p.vy *= 0.955;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w()) p.vx *= -1;
        if (p.y < 0 || p.y > h()) p.vy *= -1;
      });

      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);

          if (d < 118) {
            ctx.beginPath();
            ctx.strokeStyle = targetColor;
            ctx.globalAlpha = (1 - d / 118) * 0.5;
            ctx.lineWidth = 0.7;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.globalAlpha = 0.88;
        ctx.fillStyle = targetColor;
        ctx.shadowBlur = 18;
        ctx.shadowColor = targetColor;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      frame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="neural-canvas"
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        onPointChange({
          name: "Custom focus",
          x: ((event.clientX - rect.left) / rect.width) * 100,
          y: ((event.clientY - rect.top) / rect.height) * 100,
          color: brandPastels.magenta,
        });
      }}
    />
  );
}

function UIShowcase() {
  return (
    <section id="showcase" className="content-section ui-showcase-section reveal-block">
      <div className="section-head editorial-head">
        <div>
          <p className="eyebrow">UI Showcase</p>
          <h2>Dos superficies. Una misma intención: claridad.</h2>
        </div>
        <p className="section-note">
          La interfaz no se presenta como decoración, sino como una capa editorial del producto: ordena, jerarquiza y guía la acción.
        </p>
      </div>

      <div className="ui-navigation-grid">
        {uiCards.map((item) => (
          <a className="ui-nav-card" href={item.href} key={item.label} style={{ "--accent": item.accent }}>
            <span className="ui-nav-label">{item.label}</span>
            <strong className="ui-nav-icon">{item.icon}</strong>
            <div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
            <small>Explorar →</small>
          </a>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const [activePoint, setActivePoint] = useState(disciplines[2]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 18);

      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      setScrollProgress(progress);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <main className="home-apple-dark">
      <style>{styles}</style>

      <div className="scroll-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${scrollProgress})` }} />
      </div>

      <header
  className={`fixed left-1/2 top-6 z-50 -translate-x-1/2 transition-all duration-300 ${
    isScrolled ? "top-4 scale-[0.985] opacity-95" : ""
  }`}
>
  <nav className="relative flex min-h-[48px] items-center justify-center gap-1.5 rounded-full border border-white/15 bg-[#050505]/95 px-2 py-1.5 backdrop-blur-[18px] shadow-[0_24px_90px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.10)] isolate before:absolute before:inset-[-18px] before:-z-10 before:rounded-full before:bg-black/50 before:blur-3xl">

    <a
      href="/"
      className="rounded-full px-4 py-2 text-xs font-medium tracking-[.018em] text-white transition hover:-translate-y-px hover:bg-white/[.055]"
    >
      Home
    </a>

    <a
      href="#casos"
      className="rounded-full px-4 py-2 text-xs font-medium tracking-[.018em] text-white/60 transition hover:-translate-y-px hover:bg-white/[.055] hover:text-white"
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

      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow reveal-1">Product · Service · UX/UI · Front-End</p>

          <h1 className="reveal-2">
            Toda experiencia tiene
            <span>una arquitectura invisible.</span>
          </h1>

          <p className="hero-text reveal-3">
            Diseño experiencias digitales donde investigación, servicio, interfaz y tecnología se conectan para transformar complejidad en claridad.
          </p>
        </div>

        <div className="brain-card reveal-3">
          <div className="dotted-surface" />
          <div className="shader-orb orb-one" />
          <div className="shader-orb orb-two" />
          <div className="brain-glow" />
          <img src={brainImage} alt="Cerebro 3D con conexiones neuronales" className="brain-image" />
          <NeuralCanvas activePoint={activePoint} onPointChange={setActivePoint} />

          {disciplines.map((item) => (
            <button
              key={item.name}
              className={`discipline-chip ${activePoint.name === item.name ? "is-active" : ""}`}
              style={{ left: `${item.x}%`, top: `${item.y}%`, "--chip": item.color }}
              onMouseEnter={() => setActivePoint(item)}
              onClick={() => setActivePoint(item)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </section>

      <section className="brand-section reveal-block" aria-label="Experiencia con marcas">
        <div className="section-head editorial-head compact">
          <div>
            <p className="eyebrow">Experiencia con marcas</p>
            <h2>Trabajo en sistemas donde diseño, negocio y tecnología se encuentran.</h2>
          </div>
          <p className="section-note">
            He colaborado en contextos donde la experiencia no se resuelve solo con pantallas: exige entender procesos, equipos, restricciones y decisiones reales.
          </p>
        </div>

        <div className="brand-row">
          {brands.map((brand, index) => (
            <article
              key={brand.name}
              className="brand-card"
              style={{ "--delay": `${index * 70}ms`, "--accent": brand.accent }}
            >
              <span className="brand-number">{String(index + 1).padStart(2, "0")}</span>
              <img src={brand.logo} alt={brand.name} />
              <div>
                <h3>{brand.name}</h3>
                <p>{brand.meta}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="casos" className="content-section reveal-block">
        <div className="section-head editorial-head">
          <div>
            <p className="eyebrow">Casos seleccionados</p>
            <h2>Proyectos contados desde el problema, no desde la pantalla.</h2>
          </div>
          <p className="section-note">
            Cada caso muestra cómo una experiencia toma forma cuando investigación, estrategia, arquitectura y ejecución se diseñan como una sola pieza.
          </p>
        </div>

        <div className="case-grid">
          {cases.map((item) => (
            <a
              key={item.title}
              href={item.href}
              onClick={(event) => {
                event.preventDefault();
                window.location.href = item.href;
              }}
              className="case-card"
              style={{
                "--accent": item.accent,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div className="case-top">
                <span>{item.n}</span>
                <div className="case-icon">
                  <MiniIcon type={item.icon} />
                </div>
              </div>

              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <span className="case-link">Abrir caso →</span>
            </a>
          ))}
        </div>
      </section>

      <UIShowcase />

      <section id="proceso" className="content-section capabilities-section reveal-block">
        <div className="section-head editorial-head">
          <div>
            <p className="eyebrow">Proceso de trabajo</p>
            <h2>Del hallazgo al producto, sin perder la arquitectura del servicio.</h2>
          </div>
          <p className="section-note">
            Trabajo entre Product Design, Service Design, UX/UI y Front-End para que la experiencia pueda explicarse, construirse y mejorar con evidencia.
          </p>
        </div>

        <div className="capability-grid">
          {capabilities.map((item, index) => (
            <article className="cap-card" key={item.title} style={{ "--delay": `${index * 70}ms` }}>
              <span className="cap-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section stack-section reveal-block">
        <div className="section-head editorial-head">
          <div>
            <p className="eyebrow">Stack ejecutivo</p>
            <h2>Herramientas como extensión del pensamiento de diseño.</h2>
          </div>
          <p className="section-note">
            El stack no aparece como una lista de software, sino como una forma de pensar: investigar mejor, diseñar con precisión y construir con consistencia.
          </p>
        </div>

        <div className="stack-grid">
          {stack.map((group) => (
            <article className="stack-card" key={group.group} style={{ "--accent": group.accent }}>
              <div className="stack-title">
                <span />
                <h3>{group.group}</h3>
              </div>
              <div className="tool-list">
                {group.tools.map((tool) => (
                  <div className="tool-pill" key={tool}>
                    <ToolGlyph label={tool} />
                    <span>{tool}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contacto" className="contact-section reveal-block">
        <div className="contact-glow" />

        <div className="contact-inner">
          <p className="eyebrow">Contacto</p>

          <h2>
            Diseñemos una experiencia clara,
            humana y lista para evolucionar.
          </h2>

          <p className="contact-copy">
            Producto, servicio, interfaz y tecnología trabajando como una sola arquitectura.
          </p>

          <a href="/contacto" className="contact-btn">
            Ir al área de contacto
          </a>

          <div className="contact-signature">
            <span>Product Design</span>
            <span>Service Design</span>
            <span>UX/UI DESIGN UX/UI </span>
            <span>Front-End DEVELOPER JR</span>
            <span>AI</span>
          </div>
        </div>
      </section>
    </main>
  );
}

const styles = `
  :root {
    --bg: #030303;
    --surface: rgba(255,255,255,.035);
    --surface-strong: rgba(255,255,255,.065);
    --line: rgba(255,255,255,.075);
    --line-soft: rgba(255,255,255,.045);
    --text: #F5F5F7;
    --muted: #A1A1A6;
    --dim: #6E6E73;
    --blue: #9DB9FF;
    --violet: #BFA7FF;
    --magenta: #E7A7FF;
    --pink: #FFC1D9;
    --mint: #BFEAD8;
    --coral: #FFB28A;
  }

  * { box-sizing: border-box; }

  html { scroll-behavior: smooth; }

  body {
    margin: 0;
    background: var(--bg);
  }

  .home-apple-dark {
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


  .scroll-progress {
    position: fixed;
    inset: 0 0 auto 0;
    z-index: 9999;
    height: 6px;
    background: rgba(255,255,255,.055);
    box-shadow: 0 0 22px rgba(157,185,255,.12);
    pointer-events: none;
  }

  .scroll-progress span {
    display: block;
    width: 100%;
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

  .project-nav a:hover {
    color: white;
    background: rgba(255,255,255,.055);
    transform: translateY(-1px);
  }

  .project-nav a.active {
    color: white;
    background: rgba(255,255,255,.075);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.08);
  }

  .hero-section {
    width: min(100%, 1540px);
    min-height: 100vh;
    margin: 0 auto;
    display: grid;
    grid-template-columns: .86fr 1.14fr;
    align-items: center;
    gap: 76px;
    padding: 140px 42px 88px;
  }

  .eyebrow {
    margin: 0;
    color: rgba(255,255,255,.46);
    font-size: 10px;
    font-weight: 720;
    letter-spacing: .38em;
    text-transform: uppercase;
  }

  .hero-copy h1 {
    max-width: 820px;
    margin: 38px 0 0;
    font-size: clamp(4.1rem, 6.9vw, 8.2rem);
    line-height: 1.04;
    letter-spacing: -.055em;
    font-weight: 380;
  }

  .hero-copy h1 span {
    display: block;
    margin-top: 18px;
    color: rgba(255,255,255,.48);
    letter-spacing: -.052em;
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

  .brain-card {
    position: relative;
    min-height: 600px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,.055);
    border-radius: 48px;
    background:
      radial-gradient(circle at 52% 48%, rgba(255,255,255,.075), transparent 43%),
      linear-gradient(135deg, rgba(255,255,255,.055), rgba(255,255,255,.014));
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,.075),
      0 38px 110px rgba(0,0,0,.50);
    transition: 600ms cubic-bezier(.22,1,.36,1);
  }

  .brain-card:hover {
    transform: translateY(-6px);
    border-color: rgba(255,255,255,.09);
  }

  .dotted-surface {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255,255,255,.09) 1px, transparent 1px);
    background-size: 22px 22px;
    mask-image: radial-gradient(circle at center, black 0%, transparent 72%);
    opacity: .42;
  }

  .shader-orb {
    position: absolute;
    width: 420px;
    height: 420px;
    border-radius: 50%;
    filter: blur(46px);
    opacity: .24;
    animation: orbDrift 11s ease-in-out infinite alternate;
  }

  .orb-one {
    left: -120px;
    top: 40px;
    background: var(--blue);
  }

  .orb-two {
    right: -140px;
    bottom: -80px;
    background: var(--magenta);
    animation-delay: -4s;
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

  .brain-image {
    position: absolute;
    left: 50%;
    top: 52%;
    width: min(920px, 124%);
    transform: translate(-50%, -50%);
    opacity: .88;
    filter: drop-shadow(0 46px 76px rgba(0,0,0,.64)) saturate(.76) brightness(.92);
    pointer-events: none;
    user-select: none;
    transition: 1000ms cubic-bezier(.22,1,.36,1);
  }

  .brain-card:hover .brain-image {
    transform: translate(-50%, -51%) scale(1.018);
    opacity: .94;
  }

  .neural-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    cursor: crosshair;
    mix-blend-mode: screen;
  }

  .discipline-chip {
    position: absolute;
    z-index: 4;
    transform: translate(-50%, -50%);
    border: 1px solid rgba(255,255,255,.10);
    border-radius: 999px;
    background: rgba(0,0,0,.24);
    color: rgba(255,255,255,.72);
    padding: 10px 18px;
    font-size: 10px;
    font-weight: 760;
    letter-spacing: .24em;
    text-transform: uppercase;
    backdrop-filter: blur(18px);
    transition: 280ms cubic-bezier(.22,1,.36,1);
  }

  .discipline-chip:hover,
  .discipline-chip.is-active {
    border-color: color-mix(in srgb, var(--chip), transparent 46%);
    color: var(--chip);
    background: color-mix(in srgb, var(--chip), transparent 90%);
    box-shadow:
      0 0 34px color-mix(in srgb, var(--chip), transparent 76%),
      inset 0 1px 0 rgba(255,255,255,.08);
    transform: translate(-50%, -50%) scale(1.05);
  }

  .brand-section,
  .content-section,
  .contact-section {
    width: min(100% - 84px, 1540px);
    margin: 0 auto 42px;
  }

  .brand-section,
  .content-section,
  .contact-section {
    border: 1px solid rgba(255,255,255,.055);
    border-radius: 46px;
    background:
      linear-gradient(135deg, rgba(255,255,255,.044), rgba(255,255,255,.014));
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,.065),
      0 24px 80px rgba(0,0,0,.28);
    backdrop-filter: blur(16px);
  }

  .brand-section {
    padding: 60px 50px;
  }

  .content-section {
    padding: 70px 52px;
  }

  .section-head {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 56px;
    margin-bottom: 52px;
  }

  .section-head h2 {
    margin: 26px 0 0;
    max-width: 980px;
    font-size: clamp(2.45rem, 3.8vw, 5.1rem);
    line-height: 1.12;
    letter-spacing: -.045em;
    font-weight: 420;
  }

  .section-head.compact h2 {
    max-width: 820px;
    font-size: clamp(2.05rem, 2.8vw, 3.65rem);
    line-height: 1.14;
    letter-spacing: -.04em;
  }

  .section-note {
    max-width: 440px;
    margin: 0 0 4px;
    color: rgba(245,245,247,.6);
    font-size: 14px;
    line-height: 1.95;
    font-weight: 400;
    letter-spacing: -.006em;
  }

  .brand-row {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
  }

  .brand-card {
    position: relative;
    min-height: 182px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    border: 1px solid rgba(255,255,255,.065);
    border-radius: 32px;
    padding: 25px;
    background: rgba(0,0,0,.16);
    overflow: hidden;
    transition: 300ms cubic-bezier(.22,1,.36,1);
  }

  .brand-card::before {
    content: "";
    position: absolute;
    inset: auto 16px -40px;
    height: 90px;
    background: var(--accent);
    filter: blur(48px);
    opacity: .10;
    transition: 300ms ease;
  }

  .brand-card:hover {
    transform: translateY(-8px) scale(1.015);
    border-color: color-mix(in srgb, var(--accent), transparent 58%);
    box-shadow: 0 0 70px color-mix(in srgb, var(--accent), transparent 84%);
  }

  .brand-card:hover::before {
    opacity: .32;
  }

  .brand-number {
    color: rgba(255,255,255,.34);
    font-size: 12px;
    font-weight: 820;
    letter-spacing: .2em;
  }

  .brand-card img {
    max-width: 118px;
    max-height: 42px;
    object-fit: contain;
    filter: grayscale(1) brightness(1.9);
    opacity: .86;
    transition: 300ms cubic-bezier(.22,1,.36,1);
  }

  .brand-card:hover img {
    filter: grayscale(0) brightness(1.08);
    opacity: 1;
    transform: scale(1.08);
  }

  .brand-card h3 {
    margin: 0;
    font-size: 17px;
    line-height: 1.24;
    letter-spacing: -.018em;
    font-weight: 620;
  }

  .brand-card p {
    margin: 8px 0 0;
    color: rgba(255,255,255,.53);
    font-size: 12px;
    line-height: 1.55;
    letter-spacing: -.004em;
    transform: translateY(4px);
    opacity: .78;
    transition: 280ms ease;
  }

  .brand-card:hover p {
    transform: translateY(0);
    opacity: 1;
    color: color-mix(in srgb, var(--accent), white 18%);
  }

  .case-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }

  .case-card {
    position: relative;
    min-height: 326px;
    border: 1px solid rgba(255,255,255,.065);
    border-radius: 34px;
    padding: 30px;
    background: rgba(0,0,0,.18);
    overflow: hidden;
    transition: 300ms cubic-bezier(.22,1,.36,1);
  }

  .case-card::before {
    content: "";
    position: absolute;
    inset: auto 20px -50px;
    height: 100px;
    background: var(--accent);
    filter: blur(54px);
    opacity: .08;
    transition: 300ms ease;
  }

  .case-card:hover {
    transform: translateY(-7px);
    border-color: color-mix(in srgb, var(--accent), transparent 55%);
    box-shadow: 0 0 70px color-mix(in srgb, var(--accent), transparent 86%);
  }

  .case-card:hover::before {
    opacity: .30;
  }

  .case-top {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: rgba(255,255,255,.45);
    font-size: 12px;
    font-weight: 760;
    letter-spacing: .2em;
  }

  .case-icon {
    width: 50px;
    height: 50px;
    display: grid;
    place-items: center;
    border-radius: 18px;
    border: 1px solid rgba(255,255,255,.10);
    background: rgba(255,255,255,.04);
    color: white;
    transition: 280ms ease;
  }

  .case-card:hover .case-icon {
    color: var(--accent);
    border-color: color-mix(in srgb, var(--accent), transparent 55%);
    background: color-mix(in srgb, var(--accent), transparent 90%);
    transform: rotate(-4deg) scale(1.08);
  }

  .case-card h3 {
    position: relative;
    z-index: 1;
    margin: 46px 0 18px;
    font-size: 24px;
    line-height: 1.18;
    letter-spacing: -.028em;
    font-weight: 560;
  }

  .case-card p {
    position: relative;
    z-index: 1;
    margin: 0;
    color: rgba(255,255,255,.6);
    line-height: 1.9;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: -.006em;
    transition: 260ms ease;
  }

  .case-card:hover p {
    color: rgba(255,255,255,.76);
  }

  .case-link {
    position: relative;
    z-index: 1;
    display: inline-flex;
    margin-top: 30px;
    color: color-mix(in srgb, var(--accent), white 10%);
    text-decoration: none;
    font-size: 13px;
    font-weight: 760;
    letter-spacing: -.002em;
  }

  .mini-svg {
    width: 25px;
    height: 25px;
  }

  .brg-icon {
    font-size: 13px;
    letter-spacing: .12em;
  }

  .code-icon {
    font-size: 13px;
    font-weight: 900;
  }

  .case-logo-img {
    width: 26px;
    max-height: 26px;
    object-fit: contain;
    filter: grayscale(1) brightness(2);
  }

  .ui-showcase-section {
    overflow: hidden;
  }

  .ui-navigation-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  .ui-nav-card {
    position: relative;
    min-height: 400px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid rgba(255,255,255,.065);
    border-radius: 36px;
    padding: 38px;
    background:
      radial-gradient(circle at 75% 18%, color-mix(in srgb, var(--accent), transparent 78%), transparent 34%),
      linear-gradient(135deg, rgba(255,255,255,.052), rgba(255,255,255,.018));
    color: white;
    text-decoration: none;
    transition: 320ms cubic-bezier(.22,1,.36,1);
  }

  .ui-nav-card::after {
    content: "";
    position: absolute;
    inset: auto 24px -70px;
    height: 140px;
    background: var(--accent);
    opacity: .12;
    filter: blur(58px);
    transition: 320ms ease;
  }

  .ui-nav-card:hover {
    transform: translateY(-8px);
    border-color: color-mix(in srgb, var(--accent), transparent 52%);
    box-shadow: 0 0 80px color-mix(in srgb, var(--accent), transparent 86%);
  }

  .ui-nav-card:hover::after {
    opacity: .32;
  }

  .ui-nav-label {
    position: relative;
    z-index: 1;
    color: color-mix(in srgb, var(--accent), white 18%);
    font-size: 11px;
    font-weight: 820;
    letter-spacing: .3em;
  }

  .ui-nav-icon {
    position: absolute;
    right: 38px;
    top: 34px;
    color: rgba(255,255,255,.18);
    font-size: 78px;
    line-height: 1;
    transition: 320ms ease;
  }

  .ui-nav-card:hover .ui-nav-icon {
    color: color-mix(in srgb, var(--accent), transparent 12%);
    transform: translateY(-4px) scale(1.08);
  }

  .ui-nav-card h3 {
    position: relative;
    z-index: 1;
    margin: 0;
    max-width: 460px;
    font-size: clamp(2.5rem, 3.9vw, 4.65rem);
    line-height: 1.08;
    letter-spacing: -.05em;
    font-weight: 410;
  }

  .ui-nav-card p {
    position: relative;
    z-index: 1;
    max-width: 440px;
    margin: 24px 0 0;
    color: rgba(255,255,255,.62);
    line-height: 1.94;
    font-size: 15px;
    font-weight: 400;
    letter-spacing: -.006em;
  }

  .ui-nav-card small {
    position: relative;
    z-index: 1;
    color: white;
    font-weight: 760;
    letter-spacing: -.002em;
  }

  .capability-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .cap-card {
    min-height: 270px;
    border: 1px solid rgba(255,255,255,.065);
    border-radius: 32px;
    padding: 32px;
    background: rgba(0,0,0,.16);
    transition: 300ms cubic-bezier(.22,1,.36,1);
  }

  .cap-card:hover {
    transform: translateY(-5px);
    border-color: rgba(231,167,255,.26);
    background: rgba(255,255,255,.04);
  }

  .cap-icon {
    width: 46px;
    height: 46px;
    display: grid;
    place-items: center;
    border-radius: 16px;
    color: #E7A7FF;
    background: rgba(231,167,255,.09);
    border: 1px solid rgba(231,167,255,.18);
    font-size: 22px;
  }

  .cap-card h3 {
    margin: 32px 0 16px;
    font-size: 22px;
    line-height: 1.22;
    letter-spacing: -.025em;
    font-weight: 590;
  }

  .cap-card p {
    margin: 0;
    color: rgba(255,255,255,.6);
    line-height: 1.9;
    font-size: 14px;
    letter-spacing: -.006em;
  }

  .stack-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }

  .stack-card {
    position: relative;
    min-height: 292px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,.065);
    border-radius: 32px;
    padding: 30px;
    background: rgba(0,0,0,.18);
    transition: 300ms cubic-bezier(.22,1,.36,1);
  }

  .stack-card::after {
    content: "";
    position: absolute;
    inset: auto 20px -20px;
    height: 70px;
    background: var(--accent);
    filter: blur(46px);
    opacity: .16;
    transition: 280ms ease;
  }

  .stack-card:hover {
    transform: translateY(-5px);
    border-color: color-mix(in srgb, var(--accent), transparent 64%);
  }

  .stack-card:hover::after {
    opacity: .34;
  }

  .stack-title {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 30px;
  }

  .stack-title span {
    width: 12px;
    height: 12px;
    border-radius: 999px;
    background: var(--accent);
    box-shadow: 0 0 24px color-mix(in srgb, var(--accent), transparent 35%);
  }

  .stack-title h3 {
    margin: 0;
    font-size: 22px;
    line-height: 1.22;
    letter-spacing: -.025em;
    font-weight: 590;
  }

  .tool-list {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .tool-pill {
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 44px;
    border: 1px solid rgba(255,255,255,.065);
    border-radius: 16px;
    background: rgba(255,255,255,.03);
    padding: 7px 11px;
    color: rgba(255,255,255,.76);
    font-size: 13px;
    font-weight: 700;
  }

  .tool-glyph {
    min-width: 28px;
    height: 28px;
    display: grid;
    place-items: center;
    border-radius: 10px;
    background: rgba(255,255,255,.07);
    color: white;
    font-size: 10px;
    font-weight: 900;
  }

  .contact-section {
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
      radial-gradient(circle at 50% 45%, rgba(231,167,255,.10), transparent 30%),
      radial-gradient(circle at 50% 75%, rgba(157,185,255,.06), transparent 32%);
    filter: blur(30px);
    pointer-events: none;
  }

  .contact-inner {
    position: relative;
    z-index: 2;
    max-width: 1100px;
    margin: 0 auto;
  }

  .contact-section .eyebrow {
    margin-bottom: 26px;
  }

  .contact-section h2 {
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

  @keyframes orbDrift {
    from {
      transform: translate3d(0,0,0) scale(1);
    }
    to {
      transform: translate3d(40px,28px,0) scale(1.14);
    }
  }

  @media (max-width: 1280px) {
    .stack-grid,
    .brand-row {
      grid-template-columns: repeat(2, 1fr);
    }

    .case-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 1100px) {
    .hero-section {
      grid-template-columns: 1fr;
      padding-top: 124px;
    }

    .brain-card {
      min-height: 520px;
    }

    .capability-grid,
    .ui-navigation-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .section-head {
      align-items: start;
      flex-direction: column;
    }

    .section-note {
      max-width: 680px;
    }
  }

  @media (max-width: 720px) {
    .scroll-progress {
      height: 5px;
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
      white-space: nowrap;
    }

    .hero-section {
      padding: 118px 20px 58px;
      gap: 42px;
    }

    .hero-copy h1 {
      font-size: 3.8rem;
      line-height: 1.08;
      letter-spacing: -.05em;
    }

    .hero-text {
      font-size: 16px;
      line-height: 1.86;
    }

    .brand-section,
    .content-section,
    .contact-section {
      width: calc(100% - 28px);
      padding: 34px 22px;
      border-radius: 32px;
    }

    .contact-section {
      padding: 90px 24px 70px;
    }

    .brand-row,
    .case-grid,
    .capability-grid,
    .stack-grid,
    .ui-navigation-grid {
      grid-template-columns: 1fr;
    }

    .section-head {
      gap: 28px;
      margin-bottom: 36px;
    }

    .section-head h2 {
      font-size: clamp(2.1rem, 10vw, 3.4rem);
      line-height: 1.14;
      letter-spacing: -.04em;
    }

    .brain-image {
      width: 150%;
    }

    .discipline-chip {
      font-size: 9px;
      padding: 9px 13px;
    }

    .ui-nav-card {
      min-height: 330px;
    }

    .contact-section h2 {
      font-size: clamp(2.4rem, 10vw, 4rem);
    }

    .contact-copy {
      font-size: 16px;
      line-height: 1.8;
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