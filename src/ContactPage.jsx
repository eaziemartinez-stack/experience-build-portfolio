import { useEffect, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

/**
 * ContactPage.jsx
 * Contacto minimalista en una sola pantalla.
 *
 * Requiere:
 * npm install @paper-design/shaders-react
 */

const EMAIL = "isaias.mirafuentes@gmail.com";
const WHATSAPP_NUMBER = "525536713671";
const LINKEDIN_URL = "https://www.linkedin.com/in/isaias-mirafuentes/";

const WHATSAPP_MESSAGE =
  "Hola Isaías, vi tu portafolio experience.build y me gustaría conversar contigo sobre una oportunidad profesional.";

const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

const disciplines = [
  "Product Design",
  "Service Design",
  "UX/UI Design",
  "Front-End developer jr ",
  "AI ",
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

export default function ContactPage() {
  return (
    <main className="contact-page">
      <style>{styles}</style>
      <PortfolioHeader />

      <section className="contact-stage">
        <MeshGradient
          className="paper-shader"
          colors={["#030303", "#9DB9FF", "#BFA7FF", "#E7A7FF", "#FFC1D9", "#BFEAD8"]}
          speed={0.32}
          distortion={0.82}
          swirl={0.64}
          grainMixer={0}
          grainOverlay={0}
          backgroundColor="#030303"
        />

        <div className="shader-vignette" />
        <div className="grid-overlay" />

        <div className="content">
          <p className="eyebrow">Contacto</p>

          <h1>
            Toda experiencia
            <span>comienza con una conversación.</span>
          </h1>

          <p className="lead">
            Producto, servicio, interfaz y tecnología alineados para convertir complejidad en claridad.
          </p>

          <div className="discipline-row">
            {disciplines.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <div className="actions">
            <a className="primary" href={whatsappHref} target="_blank" rel="noreferrer">
              WhatsApp →
            </a>

            <a
              className="secondary"
              href={`mailto:${EMAIL}?subject=Contacto%20profesional%20-%20Isaías%20Martínez`}
            >
              Email →
            </a>

            <a className="ghost" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
              LinkedIn →
            </a>
          </div>

          <div className="mini-meta">
            <span>Puebla, México</span>
            <span>Remoto LATAM / Híbrido CDMX</span>
            <span>Disponible para conversar</span>
          </div>
        </div>
      </section>
    </main>
  );
}

const styles = `
  html,
  body,
  #root {
    min-height: 100%;
    margin: 0;
  }

  .contact-page {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    color: #f5f5f7;
    background: #030303;
    font-family:
      Inter,
      ui-sans-serif,
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "SF Pro Display",
      "Segoe UI",
      sans-serif;
    text-rendering: geometricPrecision;
    -webkit-font-smoothing: antialiased;
  }

  .contact-page * {
    box-sizing: border-box;
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

  .contact-stage {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background:
      radial-gradient(circle at 72% 8%, rgba(157,185,255,.13), transparent 28%),
      radial-gradient(circle at 22% 12%, rgba(231,167,255,.08), transparent 25%),
      radial-gradient(circle at 50% 100%, rgba(191,234,216,.045), transparent 35%),
      #030303;
  }

  .paper-shader {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: .9;
    filter: saturate(1.08) contrast(1.04) brightness(.92);
    transform: scale(1.08);
  }

  .shader-vignette {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(circle at 32% 30%, rgba(157,185,255,.16), transparent 25%),
      radial-gradient(circle at 68% 28%, rgba(231,167,255,.14), transparent 28%),
      radial-gradient(circle at 50% 68%, rgba(191,234,216,.10), transparent 32%),
      radial-gradient(circle at 50% 60%, rgba(0,0,0,.82), rgba(0,0,0,.16) 34%, rgba(0,0,0,.88) 82%),
      linear-gradient(to bottom, rgba(0,0,0,.16), rgba(0,0,0,.86));
  }

  .grid-overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      linear-gradient(rgba(255,255,255,.023) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.023) 1px, transparent 1px);
    background-size: 96px 96px;
    mask-image: radial-gradient(circle at 50% 46%, black, transparent 72%);
    opacity: .44;
  }

  .content {
    position: relative;
    z-index: 4;
    width: min(100% - 40px, 1120px);
    height: 100vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: clamp(92px, 12vh, 132px) 0 clamp(18px, 3vh, 42px);
    text-align: center;
  }

  .eyebrow {
    margin: 0 0 clamp(16px, 2vh, 24px);
    color: rgba(245,245,247,.48);
    font-size: clamp(9px, 1.2vw, 11px);
    font-weight: 720;
    letter-spacing: .38em;
    text-transform: uppercase;
  }

  h1 {
    max-width: 1120px;
    margin: 0;
    color: white;
    font-size: clamp(4.1rem, 8.1vw, 9.6rem);
    line-height: .92;
    letter-spacing: -.072em;
    font-weight: 380;
    text-wrap: balance;
  }

  h1 span {
    display: block;
    color: rgba(255,255,255,.46);
  }

  .lead {
    max-width: 680px;
    margin: clamp(22px, 3vh, 34px) auto 0;
    color: rgba(255,255,255,.70);
    font-size: clamp(.95rem, 1.15vw, 1.18rem);
    line-height: 1.78;
    letter-spacing: -.006em;
  }

  .discipline-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: clamp(7px, 1vw, 10px);
    margin-top: clamp(20px, 3vh, 30px);
  }

  .discipline-row span {
    min-height: 34px;
    display: inline-flex;
    align-items: center;
    border-radius: 999px;
    padding: 0 13px;
    color: rgba(255,255,255,.78);
    background: rgba(255,255,255,.07);
    border: 1px solid rgba(255,255,255,.13);
    font-size: clamp(8px, .72vw, 10px);
    font-weight: 850;
    letter-spacing: .16em;
    text-transform: uppercase;
    backdrop-filter: blur(16px);
    animation: chipFloat 5s ease-in-out infinite;
  }

  .discipline-row span:nth-child(2) { animation-delay: -.7s; }
  .discipline-row span:nth-child(3) { animation-delay: -1.4s; }
  .discipline-row span:nth-child(4) { animation-delay: -2.1s; }
  .discipline-row span:nth-child(5) { animation-delay: -2.8s; }

  .actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-top: clamp(22px, 3vh, 32px);
  }

  .actions a {
    min-height: 46px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    padding: 0 23px;
    text-decoration: none;
    font-size: 14px;
    font-weight: 800;
    transition: 280ms cubic-bezier(.22,1,.36,1);
    border: 1px solid rgba(255,255,255,.12);
    backdrop-filter: blur(18px);
  }

  .actions a:hover {
    transform: translateY(-3px) scale(1.02);
  }

  .primary {
    color: #06140f;
    background: #BFEAD8;
    border-color: rgba(191,234,216,.92);
    box-shadow: 0 20px 60px rgba(191,234,216,.12);
  }

  .secondary {
    color: #030303;
    background: white;
    border-color: white;
  }

  .ghost {
    color: rgba(255,255,255,.78);
    background: rgba(255,255,255,.065);
  }

  .mini-meta {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px 18px;
    margin-top: clamp(18px, 3vh, 28px);
    color: rgba(255,255,255,.42);
    font-size: clamp(11px, .9vw, 13px);
    line-height: 1.4;
  }

  .mini-meta span {
    position: relative;
  }

  .mini-meta span + span::before {
    content: "·";
    position: absolute;
    left: -12px;
    color: rgba(255,255,255,.26);
  }

  @keyframes chipFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
  }

  @media (max-width: 860px) {
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

    .content {
      width: min(100% - 28px, 720px);
      padding: 96px 0 18px;
    }

    h1 {
      font-size: clamp(3.2rem, 15vw, 5.4rem);
      line-height: .98;
      letter-spacing: -.062em;
    }

    .lead {
      font-size: 14.5px;
      line-height: 1.68;
      max-width: 560px;
    }

    .actions {
      width: 100%;
      max-width: 420px;
    }

    .actions a {
      flex: 1 1 100%;
    }

    .mini-meta {
      display: grid;
      gap: 6px;
    }

    .mini-meta span + span::before {
      display: none;
    }
  }

  @media (max-height: 760px) and (min-width: 861px) {
    h1 {
      font-size: clamp(3.7rem, 7vw, 7.2rem);
    }

    .lead {
      margin-top: 18px;
      line-height: 1.55;
    }

    .discipline-row,
    .actions,
    .mini-meta {
      margin-top: 16px;
    }

    .discipline-row span {
      min-height: 30px;
    }

    .actions a {
      min-height: 42px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation: none !important;
      transition: none !important;
    }
  }
`;
