"use client";

import React, { useEffect, useState } from "react";
import { PulsingBorder, MeshGradient } from "@paper-design/shaders-react";
import { motion } from "framer-motion";
import eilikRobotAsset from "./assets/Elik sin fondo.png";
import generacionLogo from "./assets/generacion-logo.png";
import genHeroAsset from "./assets/hero.png";
import gen01 from "./assets/01.jpg";
import gen02 from "./assets/02.jpg";
import gen03 from "./assets/03.jpg";
import gen04 from "./assets/04.jpeg";
import gen05 from "./assets/473176621_608062544927905_2477914925608317276_n.jpg";

/*
  WF1_ShaderHeroSection_PREVIEW_MATCH.jsx

  Este replica la estructura del preview que mandaste:
  - Shader full screen
  - Header arriba
  - Contenido abajo izquierda
  - Círculo animado abajo derecha
  - Botones finos
  - Sin hero centrado enorme

  Instala:
  npm install @paper-design/shaders-react framer-motion
*/

function WF1ShaderHeroSectionPreviewMatch() {
  return (
    <section className="wf1-preview">
      <WF1PreviewStyles />

      <ShaderBackground />

      <HeroContent />

    </section>
  );
}

function ShaderBackground() {
  return (
    <>
      <svg className="wf1-filters">
        <defs>
          <filter id="wf1-glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>

          <filter id="wf1-gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      <MeshGradient
        className="wf1-mesh"
        colors={["#030303", "#9DB9FF", "#BFA7FF", "#E7A7FF", "#FFC1D9", "#BFEAD8"]}
        speed={0.32}
        backgroundColor="#030303"
      />

      <MeshGradient
        className="wf1-mesh wf1-mesh-wire"
        colors={["#030303", "#9DB9FF", "#E7A7FF", "#BFEAD8"]}
        speed={0.18}
        wireframe="true"
        backgroundColor="transparent"
      />

      <div className="wf1-soft-vignette" />
    </>
  );
}

function WF1PreviewHeader() {
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

function HeroContent() {
  return (
    <main className="wf1-preview-content">
      <div
        className="wf1-preview-pill"
        style={{
          filter: "url(#wf1-glass-effect)",
        }}
      >
        <div className="wf1-pill-line" />
        <span>✦ Landing Pages · Product Design · UX/UI</span>
      </div>

      <h1>
        <span>Landing pages diseñadas</span> para convertir intención en acción.
      </h1>

      <p>
        Una selección de interfaces web donde cada decisión visual responde a un objetivo: generar confianza, explicar valor y guiar al usuario hacia una acción clara.
      </p>

      <div className="wf1-preview-actions">
        <a className="wf1-outline" href="/experience-build">
          Ver decisiones UX
        </a>

        <a className="wf1-solid" href="/ui-showcase/landing-pages">
          Explorar landing pages
        </a>
      </div>
    </main>
  );
}

function PulsingCircle() {
  return (
    <div className="wf1-preview-pulsing">
      <div className="wf1-preview-pulsing-inner">
        <PulsingBorder
          colors={["#9DB9FF", "#BFA7FF", "#E7A7FF", "#FFC1D9", "#BFEAD8", "#9DB9FF"]}
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
          className="wf1-preview-rotating"
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
            <path id="wf1-preview-circle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
          </defs>

          <text className="wf1-preview-circle-text">
            <textPath href="#wf1-preview-circle" startOffset="0%">
              experience.build • UX/UI • Service Design • Front-End • AI •
            </textPath>
          </text>
        </motion.svg>
      </div>
    </div>
  );
}

function WF1PreviewStyles() {
  return (
    <style>{`
      html,
      body {
        margin: 0;
        background: #000;
      }

      * {
        box-sizing: border-box;
      }

      .wf1-preview {
        position: relative;
        min-height: 100vh;
        width: 100%;
        overflow: hidden;
        background:
          radial-gradient(circle at 28% 18%, rgba(157,185,255,.30), transparent 34%),
          radial-gradient(circle at 72% 18%, rgba(231,167,255,.24), transparent 34%),
          radial-gradient(circle at 52% 82%, rgba(191,234,216,.16), transparent 42%),
          #030303;
        color: white;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      .wf1-filters {
        position: absolute;
        inset: 0;
        width: 0;
        height: 0;
      }

      .wf1-mesh {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        opacity: .92;
        filter: saturate(1.12) brightness(1.04);
      }

      .wf1-mesh-wire {
        z-index: 1;
        opacity: .34;
        mix-blend-mode: screen;
      }

      .wf1-soft-vignette {
        position: absolute;
        inset: 0;
        z-index: 2;
        pointer-events: none;
        background:
          radial-gradient(circle at 50% 50%, rgba(255,255,255,.035), transparent 36%),
          radial-gradient(circle at 70% 18%, rgba(231,167,255,.12), transparent 34%),
          radial-gradient(circle at 28% 20%, rgba(157,185,255,.12), transparent 34%),
          linear-gradient(to bottom, rgba(3,3,3,.18), rgba(3,3,3,.06) 40%, rgba(3,3,3,.82)),
          radial-gradient(circle at 62% 48%, transparent 0 34%, rgba(3,3,3,.22) 76%, rgba(3,3,3,.54) 100%);
      }

      .wf1-preview-header {
        position: relative;
        z-index: 20;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 28px clamp(24px, 4vw, 58px);
      }

      .wf1-preview-logo {
        color: white;
        text-decoration: none;
        font-size: 16px;
        font-weight: 760;
        letter-spacing: -0.045em;
      }

      .wf1-preview-header nav {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .wf1-preview-header nav a {
        border-radius: 999px;
        color: rgba(255,255,255,.80);
        text-decoration: none;
        font-size: 12px;
        font-weight: 300;
        padding: 8px 12px;
        transition: 200ms ease;
      }

      .wf1-preview-header nav a:hover {
        background: rgba(255,255,255,.10);
        color: white;
      }

      .wf1-gooey {
        position: relative;
        display: flex;
        align-items: center;
      }

      .wf1-gooey-arrow,
      .wf1-gooey-main {
        height: 32px;
        display: flex;
        align-items: center;
        border-radius: 999px;
        background: white;
        color: black;
        text-decoration: none;
        font-size: 12px;
        font-weight: 400;
        transition: 300ms ease;
      }

      .wf1-gooey-arrow {
        position: absolute;
        right: 0;
        z-index: 0;
        justify-content: center;
        width: 32px;
        transform: translateX(-42px);
      }

      .wf1-gooey:hover .wf1-gooey-arrow {
        transform: translateX(-78px);
      }

      .wf1-gooey-main {
        position: relative;
        z-index: 1;
        padding: 0 22px;
      }

      .wf1-arrow-icon {
        width: 13px;
        height: 13px;
      }

      .wf1-preview-content {
        position: absolute;
        left: clamp(24px, 4vw, 58px);
        bottom: clamp(30px, 5vw, 74px);
        z-index: 20;
        width: min(620px, calc(100vw - 48px));
        text-align: left;
      }

      .wf1-preview-pill {
        position: relative;
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        background: rgba(255,255,255,.06);
        backdrop-filter: blur(12px);
        padding: 6px 12px;
        margin-bottom: 18px;
      }

      .wf1-pill-line {
        position: absolute;
        left: 6px;
        right: 6px;
        top: 0;
        height: 1px;
        border-radius: 999px;
        background: linear-gradient(to right, transparent, rgba(255,255,255,.22), transparent);
      }

      .wf1-preview-pill span {
        position: relative;
        z-index: 1;
        color: rgba(255,255,255,.88);
        font-size: 12px;
        font-weight: 300;
      }

      .wf1-preview-content h1 {
        margin: 0;
        color: white;
        font-size: clamp(3.7rem, 6vw, 6.4rem);
        line-height: .96;
        letter-spacing: -0.07em;
        font-weight: 300;
        text-wrap: balance;
      }

      .wf1-preview-content h1 span {
        font-style: italic;
        font-weight: 520;
      }

      .wf1-preview-content p {
        max-width: 560px;
        margin: 22px 0 0;
        color: rgba(255,255,255,.72);
        font-size: 13px;
        font-weight: 300;
        line-height: 1.75;
      }

      .wf1-preview-actions {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 14px;
        margin-top: 28px;
      }

      .wf1-preview-actions a {
        border-radius: 999px;
        padding: 12px 28px;
        text-decoration: none;
        font-size: 12px;
        font-weight: 420;
        transition: 200ms ease;
      }

      .wf1-outline {
        border: 1px solid rgba(255,255,255,.32);
        background: transparent;
        color: white;
      }

      .wf1-outline:hover {
        background: rgba(255,255,255,.10);
      }

      .wf1-solid {
        background: white;
        color: black;
      }

      .wf1-solid:hover {
        background: rgba(255,255,255,.9);
      }

      .wf1-preview-pulsing {
        position: absolute;
        right: 36px;
        bottom: 36px;
        z-index: 30;
      }

      .wf1-preview-pulsing-inner {
        position: relative;
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .wf1-preview-rotating {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }

      .wf1-preview-circle-text {
        font-size: 9px;
        fill: rgba(255,255,255,.80);
        letter-spacing: 0.02em;
      }


      .robot-product.hero-robot {
        background:
          radial-gradient(circle at 50% 48%, rgba(127,231,243,.32), transparent 52%),
          linear-gradient(135deg, rgba(127,231,243,.08), rgba(255,255,255,.18));
      }

      .robot-product.hero-robot img,
      .device-card img {
        background: transparent !important;
        mix-blend-mode: normal !important;
      }

      .gen-about-image-card {
        position: relative;
        overflow: hidden;
        min-height: 430px;
        border-radius: 28px;
        background: #fff;
        box-shadow: 0 20px 70px rgba(245,130,32,.16);
      }

      .gen-about-image-card > img {
        display: block;
        width: 100%;
        height: 430px;
        object-fit: cover;
        filter: saturate(1.02) contrast(1.02);
      }

      .gen-about-logo {
        position: absolute;
        left: 22px;
        right: 22px;
        bottom: 22px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
        border-radius: 22px;
        background: rgba(255,255,255,.82);
        padding: 14px 16px;
        backdrop-filter: blur(14px);
      }

      .gen-about-logo img {
        width: 138px;
        height: auto;
        object-fit: contain;
      }

      .gen-about-logo span {
        color: rgba(0,0,0,.56);
        font-size: 13px;
        font-weight: 700;
      }

      .gen-contact-photo {
        overflow: hidden;
        margin-top: 22px;
        border-radius: 24px;
        box-shadow: 0 18px 52px rgba(245,130,32,.14);
      }

      .gen-contact-photo img {
        display: block;
        width: 100%;
        height: 190px;
        object-fit: cover;
      }


      .site-nav-shot {
        min-height: 56px;
      }

      .site-nav-shot button {
        min-width: 0;
        white-space: nowrap;
      }

      .gen-about-image-card {
        background: #fff;
      }

      .gen-about-image-card > img {
        background: #fff;
      }


      .gen-about-secondary {
        position: absolute;
        right: 18px;
        top: 18px;
        overflow: hidden;
        width: 34%;
        min-width: 130px;
        aspect-ratio: 1 / 1;
        border: 4px solid rgba(255,255,255,.82);
        border-radius: 24px;
        box-shadow: 0 18px 44px rgba(0,0,0,.18);
      }

      .gen-about-secondary img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }


      .gen-clean-image-card {
        overflow: hidden;
        min-height: 430px;
        border-radius: 28px;
        background: #fff;
        box-shadow: 0 20px 70px rgba(245,130,32,.14);
      }

      .gen-clean-image-card img {
        display: block;
        width: 100%;
        height: 430px;
        object-fit: cover;
      }

      .gen-about-image-card,
      .gen-about-secondary,
      .gen-about-logo {
        display: none !important;
      }

      .values-real span,
      .gen-impact-row span,
      .transparency-strip span {
        background: rgba(255,255,255,.72);
        border: 1px solid rgba(0,0,0,.09);
        box-shadow: none;
      }

      .site-nav-shot button,
      .main-cta,
      .search-mini button,
      .contact-shot form button,
      .donation-card button {
        border: 1px solid color-mix(in srgb, var(--accent) 32%, transparent);
        border-radius: 999px;
        background: color-mix(in srgb, var(--accent) 72%, white);
        color: #111;
        padding: 8px 13px;
        font-size: 11px;
        line-height: 1;
        font-weight: 680;
        letter-spacing: -.005em;
        box-shadow: 0 6px 14px color-mix(in srgb, var(--accent) 10%, transparent);
      }

      .main-shot-wrap {
        scroll-margin-top: 90px;
      }


      /* Legibilidad final de títulos: menos tracking negativo, mejor lectura */
      .wf1-preview-content h1,
      .showcase-hero h1,
      .shot-meta h2,
      .section-title h2,
      .website-shot h1,
      .website-shot.gen h1,
      .card-caption strong {
        letter-spacing: -0.035em !important;
        text-wrap: balance;
      }

      .wf1-preview-content h1 {
        line-height: 1.02 !important;
        font-weight: 420 !important;
      }

      .showcase-hero h1 {
        line-height: .98 !important;
        font-weight: 620 !important;
      }

      .website-shot h1 {
        line-height: 1.02 !important;
        font-weight: 560 !important;
      }

      .website-shot.gen h1 {
        line-height: 1.04 !important;
        font-weight: 540 !important;
      }

      .shot-meta h2,
      .section-title h2 {
        line-height: 1.04 !important;
      }

      .experience-orbit-seal {
        position: fixed;
        right: 34px;
        bottom: 34px;
        z-index: 120;
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

.wf1-preview-header {
          padding: 20px;
        }

        .wf1-preview-header nav {
          position: fixed;
          left: 50%;
          bottom: 18px;
          z-index: 40;
          max-width: calc(100vw - 28px);
          overflow-x: auto;
          transform: translateX(-50%);
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 999px;
          background: rgba(0,0,0,.35);
          padding: 6px;
          backdrop-filter: blur(16px);
        }

        .wf1-gooey {
          display: none;
        }

        .wf1-preview-content {
          left: 20px;
          right: 20px;
          bottom: 120px;
          width: auto;
          max-width: none;
        }

        .wf1-preview-content h1 {
          font-size: clamp(3.2rem, 15vw, 5.2rem);
        }

        .wf1-preview-pulsing {
          right: 24px;
          bottom: 94px;
          transform: scale(.82);
        }
      }
    `}</style>
  );
}


/*
  UIShowcase_LandingPages_SCREENSHOTS_UX.jsx

  Galería de 10 capturas tipo páginas reales en producción.
  Incluye Design rationale por pantalla:
  - Por qué está el CTA
  - Por qué está la imagen/hero
  - Por qué la navegación es así
  - Qué decisión UX está resolviendo

  Reemplaza:
  src/UIShowcase_LandingPages.jsx
*/

const eilikRobot = eilikRobotAsset;

const screenshots = [
  {
    id: "brg-home",
    project: "Bienes Raíces Guzmán",
    page: "Home",
    type: "Inmobiliaria · CDMX",
    accent: "#D7B56D",
    theme: "brg",
    layout: "brgHome",
    rationale: [
      "CTA primario arriba para iniciar búsqueda sin fricción.",
      "Buscador visible porque el objetivo principal es explorar propiedades.",
      "Imagen hero genera confianza antes de pedir datos."
    ],
  },
  {
    id: "brg-detail",
    project: "Bienes Raíces Guzmán",
    page: "Detalle de casa",
    type: "Ficha de propiedad",
    accent: "#D7B56D",
    theme: "brg",
    layout: "brgDetail",
    rationale: [
      "Galería primero porque la decisión inmobiliaria inicia visualmente.",
      "Precio y specs cerca del CTA reducen esfuerzo cognitivo.",
      "CTA de visita aparece en la zona de decisión."
    ],
  },
  {
    id: "brg-contact",
    project: "Bienes Raíces Guzmán",
    page: "Contacto",
    type: "Asesoría / WhatsApp",
    accent: "#D7B56D",
    theme: "brg",
    layout: "brgContact",
    rationale: [
      "Formulario corto para disminuir abandono.",
      "Mensaje de asesoría aclara qué pasará después.",
      "WhatsApp se prioriza como canal de baja fricción."
    ],
  },
  {
    id: "eilik-home",
    project: "Eilik",
    page: "Home",
    type: "Compagnon IA",
    accent: "#7FE7F3",
    theme: "eilik",
    layout: "eilikHome",
    rationale: [
      "Robot al centro para crear vínculo emocional inmediato.",
      "Copy corto estilo producto Apple: primero personalidad, luego features.",
      "CTA demo porque el usuario necesita ver comportamiento, no leer specs."
    ],
  },
  {
    id: "eilik-about",
    project: "Eilik",
    page: "Qui est Eilik",
    type: "Histoiretelling",
    accent: "#7FE7F3",
    theme: "eilik",
    layout: "eilikAbout",
    rationale: [
      "Timeline explica personalidad de forma progresiva.",
      "La narrativa humaniza el producto antes de venderlo.",
      "Microcopy emocional reduce percepción de gadget frío."
    ],
  },
  {
    id: "eilik-settings",
    project: "Eilik",
    page: "Configuration",
    type: "Ecosistema",
    accent: "#7FE7F3",
    theme: "eilik",
    layout: "eilikSettings",
    rationale: [
      "Patrón tipo iOS porque configuración debe sentirse familiar.",
      "Estados visibles dan control y confianza.",
      "Switches grandes favorecen accesibilidad y claridad."
    ],
  },
  {
    id: "gen-home",
    project: "Generación_i",
    page: "Home",
    type: "Adultos mayores activos",
    accent: "#F58220",
    theme: "gen",
    layout: "genHome",
    rationale: [
      "Video hero comunica movimiento y comunidad más rápido que texto.",
      "Navegación corta para usuarios y aliados.",
      "CTA de unión convierte interés en participación."
    ],
  },
  {
    id: "gen-donations",
    project: "Generación_i",
    page: "Donaciones",
    type: "Impacto social",
    accent: "#F58220",
    theme: "gen",
    layout: "genDonations",
    rationale: [
      "Historia humana antes del monto para activar empatía.",
      "Montos predefinidos reducen decisión y aceleran acción.",
      "Transparencia visible aumenta confianza."
    ],
  },
  {
    id: "gen-about",
    project: "Generación_i",
    page: "Quiénes somos",
    type: "Misión / Equipo",
    accent: "#F58220",
    theme: "gen",
    layout: "genAbout",
    rationale: [
      "Foto de comunidad fortalece credibilidad.",
      "Misión en lenguaje simple evita tono institucional frío.",
      "Valores visibles explican cultura y propósito."
    ],
  },
  {
    id: "gen-contact",
    project: "Generación_i",
    page: "Contacto",
    type: "Comunidad / Aliados",
    accent: "#F58220",
    theme: "gen",
    layout: "genContact",
    rationale: [
      "Formulario breve porque el contacto debe ser rápido.",
      "CTA de aliados conecta con crecimiento de red.",
      "Copy orientado a comunidad da contexto al mensaje."
    ],
  },
];


function LandingContextSection() {
  const contexts = [
    {
      project: "Bienes Raíces Guzmán",
      role: "Conversión comercial",
      question: "¿Cómo transformar interés inmobiliario en contacto con menos fricción y más confianza?",
      decision: "Priorizar búsqueda, ficha de propiedad, precio, especificaciones y contacto directo.",
      accent: "#D7B56D",
    },
    {
      project: "Eilik",
      role: "Comprensión emocional",
      question: "¿Cómo explicar un companion digital sin reducirlo a una lista de especificaciones?",
      decision: "Colocar personalidad, comportamiento y vínculo emocional antes que features.",
      accent: "#7FE7F3",
    },
    {
      project: "Generación_i",
      role: "Confianza social",
      question: "¿Cómo convertir propósito social en participación, donación o conversación?",
      decision: "Mostrar comunidad, impacto, transparencia y acción con lenguaje humano.",
      accent: "#F58220",
    },
  ];

  return (
    <section className="editorial-case-section landing-context">
      <div className="case-copy-block">
        <p className="eyebrow">Contexto del reto</p>
        <h2>Tres productos, tres intenciones de conversión.</h2>
        <p>
          El objetivo no era diseñar páginas bonitas. Era demostrar cómo una landing puede traducir intención, confianza y contexto en una acción concreta.
        </p>
      </div>

      <div className="landing-context-grid">
        {contexts.map((item) => (
          <article key={item.project} style={{ "--accent-local": item.accent }}>
            <span>{item.role}</span>
            <h3>{item.project}</h3>
            <p>{item.question}</p>
            <strong>{item.decision}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function LandingResearchSection() {
  const rows = [
    ["BRG", "El usuario inmobiliario decide visualmente primero.", "Galería, precio y specs debían aparecer antes de pedir contacto.", "Detalle de casa"],
    ["BRG", "El formulario largo aumenta abandono.", "Contacto breve y WhatsApp como canal de baja fricción.", "Contacto"],
    ["Eilik", "El usuario necesita entender personalidad antes que tecnología.", "Robot como protagonista emocional y CTA a demo.", "Home"],
    ["Eilik", "La configuración requiere familiaridad y control.", "Patrones tipo iOS, estados visibles y switches claros.", "Configuration"],
    ["Generación_i", "La donación necesita confianza antes que monto.", "Historia humana, transparencia e impacto antes de donar.", "Donaciones"],
    ["Generación_i", "La comunidad se entiende mejor con personas reales.", "Fotografía, misión clara y valores visibles.", "Quiénes somos"],
  ];

  return (
    <section className="editorial-case-section insight-to-landing">
      <div className="case-copy-block">
        <p className="eyebrow">De insight a landing page</p>
        <h2>Cada página nació de una decisión UX específica.</h2>
        <p>
          La lectura senior del caso está en conectar hallazgo, decisión y pantalla resultante. Así las interfaces dejan de ser screenshots y se convierten en evidencia de producto.
        </p>
      </div>

      <div className="landing-decision-list">
        {rows.map(([project, insight, decision, screen], index) => (
          <article key={`${project}-${screen}-${index}`}>
            <div className="decision-index">{String(index + 1).padStart(2, "0")}</div>
            <div>
              <p>Insight</p>
              <h3>{insight}</h3>
              <span>{project}</span>
            </div>
            <div>
              <p>Decisión UX</p>
              <span>{decision}</span>
            </div>
            <div className="screen-result">
              <p>Landing resultante</p>
              <strong>{screen}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function LandingSystemSection() {
  const principles = [
    ["Claridad", "La primera pantalla debe comunicar valor sin obligar al usuario a interpretar demasiado."],
    ["Confianza", "Cada landing integra señales de credibilidad antes del CTA principal."],
    ["Jerarquía", "El contenido se ordena por decisión: entender, evaluar y actuar."],
    ["Consistencia", "Cada marca conserva su personalidad sin romper el sistema editorial global."],
  ];

  return (
    <section className="editorial-case-section landing-system-section">
      <div className="case-copy-block narrow">
        <p className="eyebrow">Sistema UI</p>
        <h2>Una misma lógica de diseño aplicada a tres contextos.</h2>
        <p>
          BRG, Eilik y Generación_i tienen tonos visuales diferentes, pero comparten una arquitectura: valor visible, evidencia clara, navegación simple y CTA contextual.
        </p>
      </div>

      <div className="landing-system-grid">
        {principles.map(([title, body], index) => (
          <article key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function LandingValidationSection() {
  const metrics = [
    ["Comprensión", "¿El usuario entiende qué ofrece la landing en los primeros segundos?", "92%"],
    ["Confianza", "¿Existen señales suficientes antes del CTA?", "88%"],
    ["Acción", "¿El CTA aparece en el momento correcto de decisión?", "90%"],
    ["Consistencia", "¿La experiencia mantiene calidad visual entre proyectos?", "86%"],
  ];

  return (
    <section className="editorial-case-section landing-validation-section">
      <div className="case-copy-block">
        <p className="eyebrow">Validación UX</p>
        <h2>Cómo validaríamos que las landing pages convierten mejor.</h2>
        <p>
          La validación se enfocaría en comprensión inicial, confianza percibida, intención de acción y reducción de esfuerzo cognitivo durante la evaluación.
        </p>
      </div>

      <div className="landing-metrics-grid">
        {metrics.map(([label, description, value]) => (
          <article key={label}>
            <p>{label}</p>
            <h3>{value}</h3>
            <span>{description}</span>
            <i><b style={{ width: value }} /></i>
          </article>
        ))}
      </div>
    </section>
  );
}

function LandingContactCTA() {
  return (
    <section id="contacto" className="landing-contact-cta">
      <div className="contact-glow" />
      <div className="contact-inner">
        <p className="eyebrow">Contacto</p>
        <h2>Toda landing necesita una arquitectura invisible.</h2>
        <p>
          Si tu producto necesita convertir intención, confianza y contexto en una acción clara, puedo ayudarte a diseñar una experiencia digital lista para evolucionar.
        </p>
        <a href="/contacto" className="contact-btn">Ir al área de contacto</a>
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

function UIShowcaseLandingPagesScreenshotsUX() {
  const [active, setActive] = useState(screenshots[0]);

  const openInVisualizer = (item) => {
    setActive(item);
    requestAnimationFrame(() => {
      document.getElementById("main-visualizer")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const progress = useScrollProgress();

  return (
    <main className="screenshots-showcase" style={{ "--accent": active.accent }}>
      <Styles />
      <ScrollProgress progress={progress} />
      <PortfolioHeader />

      <section className="showcase-hero">
        <p className="eyebrow">Landing Pages · Product Screens</p>
        <h1>Landing pages diseñadas para transformar intención en acción.</h1>
        <p>
          Una lectura de UI enfocada en jerarquía, claridad de acción, confianza, narrativa visual y consistencia entre experiencia, marca y objetivo de negocio.
        </p>
      </section>

      <LandingContextSection />
      <LandingResearchSection />
      <LandingSystemSection />

      <section className="thumb-rail">
        {screenshots.map((item, index) => (
          <button
            key={item.id}
            className={active.id === item.id ? "active" : ""}
            onClick={() => openInVisualizer(item)}
          >
            <small>{String(index + 1).padStart(2, "0")}</small>
            <strong>{item.page}</strong>
            <span>{item.project}</span>
          </button>
        ))}
      </section>

      <section id="main-visualizer" className="main-shot-wrap">
        <div className="shot-meta">
          <div>
            <p className="eyebrow">{active.project}</p>
            <h2>{active.page}</h2>
            <p>{active.type}</p>
          </div>
          <span>{screenshots.findIndex((s) => s.id === active.id) + 1} / 10</span>
        </div>

        <ScreenshotFrame item={active} large />
      </section>

      <section className="all-shots">
        <div className="section-title">
          <p className="eyebrow">Full set</p>
          <h2>Diez páginas. Una misma calidad de presentación.</h2>
        </div>

        <div className="shot-grid">
          {screenshots.map((item) => (
            <article key={item.id} onClick={() => openInVisualizer(item)}>
              <ScreenshotFrame item={item} />
              <div className="card-caption">
                <small>{item.project}</small>
                <strong>{item.page}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <LandingValidationSection />
      <LandingContactCTA />
    </main>
  );
}




function ExperienceOrbitSeal() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let timeout = null;

    const hideThenShow = () => {
      setVisible(false);

      if (timeout) {
        clearTimeout(timeout);
      }

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

      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

  return (
    <div
      className={`experience-orbit-seal ${visible ? "is-visible" : "is-hidden"}`}
      aria-hidden="true"
    >
      <div className="experience-orbit-inner">
        <PulsingBorder
          colors={["#9DB9FF", "#BFA7FF", "#E7A7FF", "#FFC1D9", "#BFEAD8", "#9DB9FF"]}
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

function ScrollProgress({ progress }) {
  return (
    <div className="ui-web-progress" aria-hidden="true">
      <span style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
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

function ScreenshotFrame({ item, large = false }) {
  return (
    <div className={large ? "screenshot-frame large" : "screenshot-frame"}>
      <UXRationale item={item} />
      <div className="browser-bar">
        <i />
        <i />
        <i />
        <span>{item.project} / {item.page}</span>
      </div>

      <div className={`website-shot ${item.theme} ${large ? "large" : ""}`}>
        <RenderShot layout={item.layout} />
      </div>
    </div>
  );
}

function UXRationale({ item }) {
  return (
    <div className="ux-rationale">
      <div>
        <small>Design rationale</small>
        <strong>{item.project} · {item.page}</strong>
      </div>

      <ul>
        {item.rationale.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </div>
  );
}

function SiteNav({ brand }) {
  const normalized = String(brand || "").toLowerCase();

  const headerConfig = normalized.includes("brg")
    ? {
        brand: "BRG",
        links: ["Comprar", "Rentar", "Propiedades", "Asesoría"],
        cta: "Contactar",
      }
    : normalized.includes("eilik")
      ? {
          brand: "Eilik",
          links: ["Accueil", "Découvrir", "Émotions", "Configuration"],
          cta: "Rencontrer Eilik",
        }
      : {
          brand: "generación_i",
          links: ["QUIÉNES SOMOS", "PROGRAMAS", "COMUNIDAD", "CONTACTO"],
          cta: "Únete",
        };

  return (
    <div className="site-nav-shot">
      <strong>{headerConfig.brand}</strong>
      <nav>
        {headerConfig.links.map((link) => (
          <span key={link}>{link}</span>
        ))}
      </nav>
      <button>{headerConfig.cta}</button>
    </div>
  );
}

function RenderShot({ layout }) {
  switch (layout) {
    case "brgHome": return <BRGHomeShot />;
    case "brgDetail": return <BRGDetailShot />;
    case "brgContact": return <BRGContactShot />;
    case "eilikHome": return <EilikHomeShot />;
    case "eilikAbout": return <EilikAboutShot />;
    case "eilikSettings": return <EilikSettingsShot />;
    case "genHome": return <GenHomeShot />;
    case "genDonations": return <GenDonationsShot />;
    case "genAbout": return <GenAboutShot />;
    default: return <GenContactShot />;
  }
}

/* -------------------------------------------------------------------------- */
/* BRG SHOTS                                                                  */
/* -------------------------------------------------------------------------- */

function BRGHomeShot() {
  return (
    <>
      <SiteNav brand="BRG" />
      <section className="shot-hero two-col">
        <div>
          <p className="label">CDMX</p>
          <h1>Tu próximo hogar, sin vueltas.</h1>
          <p>Propiedades verificadas con asesoría local y proceso transparente.</p>
          <div className="search-mini">
            <span>Zona: CDMX</span>
            <span>Tipo: Casa</span>
            <span>$1.5M — $3.5M</span>
            <button>Buscar</button>
          </div>
        </div>
        <ImageBlock src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=90" />
      </section>
      <PropertyPreviewRow />
    </>
  );
}

function BRGDetailShot() {
  return (
    <>
      <SiteNav brand="BRG" />
      <section className="detail-shot">
        <ImageBlock src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=90" />
        <div>
          <p className="label">Detalle de casa</p>
          <h1>Casa remodelada lista para visitar.</h1>
          <strong className="price">$2,850,000 MXN</strong>
          <div className="specs-shot">
            <span>3 recámaras</span>
            <span>2 baños</span>
            <span>145 m²</span>
            <span>1 estacionamiento</span>
          </div>
          <button className="main-cta">Agendar visita</button>
        </div>
      </section>
    </>
  );
}

function BRGContactShot() {
  return (
    <>
      <SiteNav brand="BRG" />
      <section className="contact-shot">
        <div>
          <p className="label">Contacto</p>
          <h1>Hablemos de tu próxima propiedad.</h1>
          <p>Un asesor te contactará con opciones claras y seguimiento personalizado.</p>
        </div>
        <form>
          <input placeholder="Nombre" />
          <input placeholder="Teléfono" />
          <input placeholder="Correo" />
          <textarea placeholder="Mensaje" />
          <button type="button">Enviar solicitud</button>
        </form>
      </section>
    </>
  );
}

function PropertyPreviewRow() {
  return (
    <section className="property-preview-row">
      <MiniProperty img="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=90" title="Casa familiar" price="$2.8M" />
      <MiniProperty img="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=90" title="Casa remodelada" price="$3.1M" />
      <MiniProperty img="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=90" title="Departamento" price="$1.7M" />
    </section>
  );
}

function MiniProperty({ img, title, price }) {
  return (
    <article>
      <img src={img} alt={title} />
      <strong>{title}</strong>
      <span>{price}</span>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* EILIK SHOTS                                                                */
/* -------------------------------------------------------------------------- */

function EilikHomeShot() {
  return (
    <>
      <SiteNav brand="Eilik" />
      <section className="shot-hero two-col eilik-hero-shot">
        <div>
          <p className="label">Compagnon IA</p>
          <h1>Petit robot. Grande personnalité.</h1>
          <p>Eilik réagit, apprend vos routines et rend le bureau plus vivant.</p>
          <button className="main-cta">Voir la démo</button>
        </div>
        <div className="robot-product hero-robot">
          <div className="robot-glow" />
          <img src={eilikRobot} alt="Eilik robot" />
        </div>
      </section>
      <section className="emotion-row">
        <span>😊 Happy</span>
        <span>😴 Sleepy</span>
        <span>⚡ Excited</span>
        <span>💬 Talk</span>
      </section>
    </>
  );
}

function EilikAboutShot() {
  return (
    <>
      <SiteNav brand="Eilik" />
      <section className="shot-hero two-col eilik-story">
        <div>
          <p className="label">Qui est Eilik</p>
          <h1>Une petite présence qui apprend vos moments.</h1>
          <p>La page explique comment il se réveille, réagit et s’intègre à la routine.</p>
        </div>
        <div className="timeline-ui premium">
          <Timeline n="01" title="Réveil" text="Premier contact" />
          <Timeline n="02" title="Réagit" text="Retour émotionnel" />
          <Timeline n="03" title="Apprend" text="Routines" />
          <Timeline n="04" title="Accompagne" text="Lien" />
        </div>
      </section>
    </>
  );
}

function EilikSettingsShot() {
  return (
    <>
      <SiteNav brand="Eilik" />
      <section className="settings-shot eilik-settings-premium">
        <div className="device-card">
          <img src={eilikRobot} alt="Eilik" />
          <h1>Eilik</h1>
          <p>Connected · Battery 82%</p>
        </div>
        <div className="settings-list">
          <Setting title="Sensibilité émotionnelle" value="Équilibrée" />
          <Setting title="Retour sonore" value="Activé" />
          <Setting title="Réponse mouvement" value="Douce" />
          <Setting title="Routine matin" value="09:00" />
        </div>
      </section>
    </>
  );
}

function Timeline({ n, title, text }) {
  return (
    <article>
      <span>{n}</span>
      <strong>{title}</strong>
      <p>{text}</p>
    </article>
  );
}

function Setting({ title, value }) {
  return (
    <article>
      <div>
        <strong>{title}</strong>
        <span>{value}</span>
      </div>
      <i />
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* GENERACION I SHOTS                                                         */
/* -------------------------------------------------------------------------- */

function GenHomeShot() {
  return (
    <>
      <SiteNav brand="generación_i" />
      <section className="gen-video-shot">
        <img src={gen05} alt="Generación i actividad física y comunidad" />
        <div className="play-button">▶</div>
        <div className="gen-logo-text">generación_i</div>
      </section>
      <section className="gen-impact-row">
        <span>Movimiento</span>
        <span>Comunidad</span>
        <span>Acompañamiento</span>
      </section>
    </>
  );
}

function GenDonationsShot() {
  return (
    <>
      <SiteNav brand="generación_i" />
      <section className="shot-hero two-col gen-donation-premium">
        <div>
          <p className="label">Donaciones</p>
          <h1>Cada apoyo sostiene bienestar, movimiento y compañía.</h1>
          <p>La donación se presenta desde impacto real: sesiones, materiales y acompañamiento.</p>
          <div className="transparency-strip">
            <span>Sesiones</span>
            <span>Materiales</span>
            <span>Comunidad</span>
          </div>
        </div>

        <div className="donation-visual-card">
          <img src={gen02} alt="Generación i bienestar activo" />
          <div className="donation-card premium">
            <button>$500</button>
            <button>$1,000</button>
            <button>$2,500</button>
            <button>Otro monto</button>
          </div>
        </div>
      </section>
    </>
  );
}

function GenAboutShot() {
  return (
    <>
      <SiteNav brand="generación_i" />
      <section className="shot-hero two-col gen-about-premium">
        <div>
          <p className="label">Quiénes somos</p>
          <h1>La vida es más cuando existe comunidad.</h1>
          <p>Programas de bienestar, movimiento y acompañamiento para adultos mayores.</p>
          <div className="values-real">
            <span>Bienestar</span>
            <span>Actividad física</span>
            <span>Acompañamiento</span>
          </div>
        </div>

        <div className="gen-clean-image-card">
          <img src={gen04} alt="Generación i acompañamiento comunitario" />
        </div>
      </section>
    </>
  );
}

function GenContactShot() {
  return (
    <>
      <SiteNav brand="generación_i" />
      <section className="contact-shot gen-contact">
        <div>
          <p className="label">Contacto</p>
          <h1>Construyamos bienestar con comunidad.</h1>
          <p>Formulario para sumar voluntarios, aliados o nuevas actividades.</p>
          <div className="gen-contact-photo">
            <img src={gen03} alt="Generación i comunidad en movimiento" />
          </div>
        </div>
        <form>
          <input placeholder="Nombre" />
          <input placeholder="Correo" />
          <textarea placeholder="Mensaje" />
          <button type="button">Enviar mensaje</button>
        </form>
      </section>
    </>
  );
}

function ImageBlock({ src }) {
  return (
    <div className="image-block">
      <img src={src} alt="" />
    </div>
  );
}

function Styles() {
  return (
    <style>{`
      html,
      body {
        margin: 0;
        background: #000;
        scroll-behavior: smooth;
      }

      * {
        box-sizing: border-box;
      }

      .screenshots-showcase {
        position: relative;
        min-height: 100vh;
        background: #000;
        color: white;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      .portfolio-header {
        position: fixed;
        top: 18px;
        left: 0;
        z-index: 100;
        display: flex;
        width: 100%;
        justify-content: center;
        pointer-events: none;
      }

      .portfolio-header nav {
        display: flex;
        gap: 8px;
        border: 1px solid rgba(255,255,255,.12);
        border-radius: 999px;
        background: rgba(0,0,0,.56);
        padding: 8px;
        backdrop-filter: blur(20px);
        pointer-events: auto;
      }

      .portfolio-header a {
        border-radius: 999px;
        padding: 10px 14px;
        color: rgba(255,255,255,.72);
        text-decoration: none;
        font-size: 12px;
      }

      .showcase-hero {
        padding: 150px clamp(20px, 7vw, 120px) 64px;
        background:
          radial-gradient(circle at 70% 12%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 28%),
          #000;
      }

      .eyebrow {
        margin: 0;
        color: var(--accent);
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 11px;
        letter-spacing: .34em;
        text-transform: uppercase;
      }

      .showcase-hero h1 {
        max-width: 1040px;
        margin: 26px 0 0;
        font-size: clamp(4rem, 8vw, 8.8rem);
        line-height: .92;
        letter-spacing: -.06em;
        font-weight: 660;
      }

      .showcase-hero p {
        max-width: 760px;
        margin: 28px 0 0;
        color: rgba(255,255,255,.64);
        font-size: 18px;
        line-height: 1.85;
      }

      .thumb-rail {
        width: min(100% - 40px, 1220px);
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 12px;
        padding: 18px 0;
        border-top: 1px solid rgba(255,255,255,.1);
        border-bottom: 1px solid rgba(255,255,255,.1);
        background: transparent;
      }

      .thumb-rail button {
        min-width: 0;
        border: 1px solid rgba(255,255,255,.1);
        border-radius: 22px;
        background: rgba(255,255,255,.035);
        color: white;
        padding: 16px;
        text-align: left;
        cursor: pointer;
      }

      .thumb-rail button.active {
        border-color: color-mix(in srgb, var(--accent) 70%, white);
        background: color-mix(in srgb, var(--accent) 14%, transparent);
      }

      .thumb-rail small {
        color: var(--accent);
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      }

      .thumb-rail strong,
      .thumb-rail span {
        display: block;
      }

      .thumb-rail strong {
        margin-top: 12px;
      }

      .thumb-rail span {
        margin-top: 6px;
        color: rgba(255,255,255,.48);
        font-size: 12px;
      }

      .main-shot-wrap {
        scroll-margin-top: 90px;
        padding: 80px clamp(20px, 7vw, 120px) 120px;
      }

      .shot-meta {
        display: flex;
        align-items: end;
        justify-content: space-between;
        gap: 24px;
        margin-bottom: 28px;
      }

      .shot-meta h2 {
        margin: 16px 0 0;
        font-size: clamp(2.8rem, 5vw, 5.8rem);
        line-height: 1;
        letter-spacing: -.045em;
      }

      .shot-meta p:not(.eyebrow),
      .shot-meta span {
        color: rgba(255,255,255,.55);
      }

      .screenshot-frame {
        overflow: hidden;
        border: 1px solid rgba(255,255,255,.13);
        border-radius: 26px;
        background: #111;
        box-shadow: 0 40px 140px rgba(0,0,0,.5);
      }

      .screenshot-frame.large {
        border-radius: 34px;
      }

      .ux-rationale {
        display: grid;
        grid-template-columns: .28fr .72fr;
        gap: 28px;
        border-bottom: 1px solid rgba(255,255,255,.1);
        background:
          radial-gradient(circle at 80% 20%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 28%),
          #070707;
        padding: 24px 28px;
      }

      .ux-rationale small {
        color: var(--accent);
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        letter-spacing: .22em;
        text-transform: uppercase;
      }

      .ux-rationale strong {
        display: block;
        margin-top: 8px;
        color: white;
        font-size: 20px;
        letter-spacing: -.02em;
      }

      .ux-rationale ul {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .ux-rationale li {
        border: 1px solid rgba(255,255,255,.1);
        border-radius: 18px;
        background: rgba(255,255,255,.045);
        color: rgba(255,255,255,.72);
        padding: 13px 14px;
        font-size: 12px;
        line-height: 1.45;
      }

      .browser-bar {
        height: 38px;
        display: flex;
        align-items: center;
        gap: 8px;
        border-bottom: 1px solid rgba(255,255,255,.1);
        background: #141414;
        padding: 0 14px;
      }

      .browser-bar i {
        width: 10px;
        height: 10px;
        border-radius: 999px;
        background: rgba(255,255,255,.28);
      }

      .browser-bar span {
        margin-left: 12px;
        color: rgba(255,255,255,.42);
        font-size: 12px;
      }

      .website-shot {
        position: relative;
        min-height: 520px;
        overflow: hidden;
        background: #fff;
        color: #111;
        padding: 34px;
      }

      .website-shot.large {
        min-height: 780px;
        padding: 48px;
      }

      .website-shot.brg {
        background: #faf7ef;
        color: #111;
      }

      .website-shot.eilik {
        background:
          radial-gradient(circle at 74% 20%, rgba(127,231,243,.28), transparent 34%),
          radial-gradient(circle at 24% 82%, rgba(255,255,255,.75), transparent 30%),
          linear-gradient(135deg, #eefcff, #dff7fb);
        color: #071014;
      }

      .website-shot.gen {
        background:
          radial-gradient(circle at 80% 20%, rgba(245,130,32,.14), transparent 32%),
          #fffaf5;
        color: #111;
      }

      .site-nav-shot {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 22px;
        border-bottom: 3px solid color-mix(in srgb, var(--accent) 82%, transparent);
        padding-bottom: 20px;
      }

      .site-nav-shot strong {
        font-size: 22px;
        letter-spacing: -.04em;
      }

      .site-nav-shot nav {
        display: flex;
        gap: 24px;
      }

      .site-nav-shot span {
        color: rgba(0,0,0,.62);
        font-size: 13px;
        font-weight: 600;
      }

      .site-nav-shot button,
      .main-cta,
      .search-mini button,
      .contact-shot form button,
      .donation-card button {
        border: 1px solid color-mix(in srgb, var(--accent) 38%, transparent);
        border-radius: 999px;
        background: color-mix(in srgb, var(--accent) 78%, white);
        color: #111;
        padding: 8px 13px;
        font-size: 11px;
        line-height: 1;
        font-weight: 680;
        letter-spacing: -.005em;
        box-shadow: 0 6px 14px color-mix(in srgb, var(--accent) 12%, transparent);
      }

      .shot-hero {
        margin-top: 54px;
      }

      .two-col {
        display: grid;
        grid-template-columns: 1fr .92fr;
        gap: 48px;
        align-items: center;
      }

      .label {
        display: inline-flex;
        border: 1px solid rgba(0,0,0,.12);
        border-radius: 999px;
        padding: 7px 10px;
        color: var(--accent);
        font-size: 12px;
        font-weight: 700;
      }

      .website-shot h1 {
        max-width: 760px;
        margin: 20px 0 0;
        font-size: clamp(3rem, 6vw, 7.4rem);
        line-height: .94;
        letter-spacing: -.06em;
      }

      .website-shot p {
        max-width: 560px;
        color: rgba(0,0,0,.58);
        font-size: 17px;
        line-height: 1.75;
      }

      .image-block {
        overflow: hidden;
        border-radius: 28px;
        box-shadow: 0 20px 70px rgba(0,0,0,.18);
      }

      .image-block img {
        display: block;
        width: 100%;
        height: 430px;
        object-fit: cover;
      }

      .search-mini {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        margin-top: 28px;
        border: 1px solid rgba(0,0,0,.1);
        border-radius: 22px;
        background: rgba(255,255,255,.72);
        padding: 10px;
      }

      .search-mini span {
        border-radius: 16px;
        background: #fff;
        padding: 12px;
        font-size: 12px;
      }

      .property-preview-row {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 18px;
        margin-top: 34px;
      }

      .property-preview-row article {
        overflow: hidden;
        border-radius: 24px;
        background: #fff;
        box-shadow: 0 14px 40px rgba(0,0,0,.12);
      }

      .property-preview-row img {
        width: 100%;
        height: 180px;
        object-fit: cover;
      }

      .property-preview-row strong,
      .property-preview-row span {
        display: block;
        padding: 0 16px;
      }

      .property-preview-row strong {
        margin-top: 14px;
      }

      .property-preview-row span {
        padding-bottom: 16px;
        color: rgba(0,0,0,.48);
      }

      .detail-shot,
      .contact-shot,
      .settings-shot {
        display: grid;
        grid-template-columns: 1fr .82fr;
        gap: 48px;
        margin-top: 54px;
        align-items: center;
      }

      .price {
        display: block;
        margin-top: 24px;
        color: var(--accent);
        font-size: 28px;
      }

      .specs-shot {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        margin: 22px 0;
      }

      .specs-shot span,
      .emotion-row span,
      .timeline-ui article,
      .settings-list article,
      .values-real span,
      .gen-impact-row span,
      .transparency-strip span {
        border: 1px solid rgba(0,0,0,.1);
        border-radius: 16px;
        background: rgba(255,255,255,.72);
        padding: 14px;
      }

      .contact-shot form {
        display: grid;
        gap: 12px;
        border-radius: 28px;
        background: rgba(255,255,255,.74);
        padding: 22px;
        box-shadow: 0 20px 70px rgba(0,0,0,.12);
      }

      .contact-shot input,
      .contact-shot textarea {
        border: 1px solid rgba(0,0,0,.1);
        border-radius: 14px;
        padding: 14px;
        font: inherit;
      }

      .contact-shot textarea {
        min-height: 110px;
      }

      .eilik-hero-shot h1 {
        max-width: 680px;
      }

      .robot-product {
        position: relative;
        display: grid;
        place-items: center;
        min-height: 460px;
        overflow: hidden;
        border-radius: 34px;
        background:
          radial-gradient(circle at center, rgba(127,231,243,.34), transparent 58%),
          linear-gradient(135deg, rgba(127,231,243,.12), rgba(255,255,255,.16));
      }

      .robot-product img {
        position: relative;
        z-index: 2;
        width: min(82%, 460px);
        max-height: 430px;
        object-fit: contain;
        mix-blend-mode: multiply;
        filter: drop-shadow(0 34px 54px rgba(0,0,0,.16)) saturate(1.05);
      }

      .robot-glow {
        position: absolute;
        width: 420px;
        height: 420px;
        border-radius: 999px;
        background: radial-gradient(circle, rgba(127,231,243,.35), transparent 68%);
        filter: blur(12px);
      }

      .emotion-row {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
        margin-top: 30px;
      }

      .eilik-story {
        align-items: stretch;
      }

      .timeline-ui {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 14px;
      }

      .timeline-ui.premium article {
        min-height: 180px;
        background: rgba(255,255,255,.86);
        box-shadow: 0 18px 44px rgba(0,0,0,.08);
      }

      .timeline-ui span,
      .timeline-ui strong,
      .timeline-ui p {
        display: block;
      }

      .timeline-ui span {
        color: var(--accent);
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      }

      .timeline-ui strong {
        margin-top: 42px;
        font-size: 24px;
      }

      .timeline-ui p {
        margin-top: 8px;
        font-size: 13px;
      }

      .device-card {
        display: grid;
        place-items: center;
        text-align: center;
        border-radius: 30px;
        background:
          radial-gradient(circle at center, rgba(127,231,243,.24), transparent 62%),
          rgba(255,255,255,.44);
        padding: 28px;
        box-shadow: 0 24px 70px rgba(0,0,0,.08);
      }

      .device-card img {
        width: min(78%, 340px);
        mix-blend-mode: multiply;
        filter: drop-shadow(0 24px 44px rgba(0,0,0,.14));
      }

      .settings-list {
        display: grid;
        gap: 12px;
      }

      .settings-list article {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(255,255,255,.86);
      }

      .settings-list strong,
      .settings-list span {
        display: block;
      }

      .settings-list span {
        margin-top: 6px;
        color: rgba(0,0,0,.5);
      }

      .settings-list i {
        width: 46px;
        height: 26px;
        border-radius: 999px;
        background: var(--accent);
      }

      .gen-video-shot {
        position: relative;
        margin-top: 48px;
        overflow: hidden;
        border-radius: 18px;
        box-shadow: 0 24px 80px rgba(0,0,0,.18);
      }

      .gen-video-shot img {
        display: block;
        width: 100%;
        height: 580px;
        object-fit: cover;
        filter: brightness(.62) saturate(1.05);
      }

      .play-button {
        position: absolute;
        left: 50%;
        top: 50%;
        display: grid;
        width: 96px;
        height: 60px;
        place-items: center;
        transform: translate(-50%, -50%);
        border-radius: 24px;
        background: #F58220;
        color: white;
        font-size: 34px;
      }

      .gen-logo-text {
        position: absolute;
        left: 50%;
        bottom: 42px;
        transform: translateX(-50%);
        color: rgba(255,255,255,.78);
        font-size: 42px;
        font-weight: 800;
        letter-spacing: -.06em;
      }

      .gen-impact-row,
      .transparency-strip,
      .values-real {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
        margin-top: 22px;
      }

      .gen-impact-row span,
      .transparency-strip span,
      .values-real span {
        background: white;
        font-weight: 700;
      }

      .gen-donation-premium {
        background: linear-gradient(135deg, rgba(245,130,32,.14), transparent);
        border-radius: 28px;
        padding: 28px;
      }


      .donation-visual-card {
        display: grid;
        gap: 14px;
      }

      .donation-visual-card img {
        width: 100%;
        height: 230px;
        object-fit: cover;
        border-radius: 24px;
        box-shadow: 0 18px 52px rgba(245,130,32,.12);
      }

      .donation-card {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 14px;
      }

      .donation-card.premium {
        border-radius: 28px;
        background: white;
        padding: 22px;
        box-shadow: 0 24px 70px rgba(0,0,0,.12);
      }

      .donation-card button {
        min-height: 48px;
        font-size: 14px;
        padding: 10px 14px;
      }

      .all-shots {
        padding: 40px clamp(20px, 7vw, 120px) 120px;
      }

      .section-title h2 {
        margin: 18px 0 0;
        font-size: clamp(3rem, 6vw, 6rem);
        line-height: .96;
        letter-spacing: -.05em;
      }

      .shot-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 34px;
        margin-top: 56px;
      }

      .shot-grid article {
        cursor: pointer;
      }

      .shot-grid .ux-rationale {
        display: none;
      }

      .shot-grid .website-shot {
        min-height: 780px;
        transform: scale(.54);
        transform-origin: top left;
        width: 185%;
      }

      .shot-grid .screenshot-frame {
        height: 520px;
      }

      .card-caption {
        padding: 16px 4px 0;
      }

      .card-caption small {
        color: var(--accent);
      }

      .card-caption strong {
        display: block;
        margin-top: 6px;
        font-size: 22px;
      }


      .website-shot.gen h1 {
        max-width: 680px;
        font-size: clamp(2.8rem, 5.2vw, 6rem);
        letter-spacing: -.052em;
      }

      .website-shot.gen .site-nav-shot {
        border-bottom-width: 2px;
      }

      .website-shot.gen .site-nav-shot button,
      .website-shot.gen .contact-shot form button,
      .website-shot.gen .donation-card button {
        background: #F58220;
        color: #111;
        box-shadow: 0 8px 18px rgba(245,130,32,.16);
        padding: 9px 14px;
        font-size: 12px;
      }

      .website-shot.gen .shot-hero {
        margin-top: 46px;
      }

      .website-shot.gen .label {
        background: rgba(245,130,32,.08);
      }

      .website-shot.gen .contact-shot form {
        box-shadow: 0 16px 46px rgba(245,130,32,.10);
      }


      .robot-product.hero-robot {
        background:
          radial-gradient(circle at 50% 48%, rgba(127,231,243,.32), transparent 52%),
          linear-gradient(135deg, rgba(127,231,243,.08), rgba(255,255,255,.18));
      }

      .robot-product.hero-robot img,
      .device-card img {
        background: transparent !important;
        mix-blend-mode: normal !important;
      }

      .gen-about-image-card {
        position: relative;
        overflow: hidden;
        min-height: 430px;
        border-radius: 28px;
        background: #fff;
        box-shadow: 0 20px 70px rgba(245,130,32,.16);
      }

      .gen-about-image-card > img {
        display: block;
        width: 100%;
        height: 430px;
        object-fit: cover;
        filter: saturate(1.02) contrast(1.02);
      }

      .gen-about-logo {
        position: absolute;
        left: 22px;
        right: 22px;
        bottom: 22px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
        border-radius: 22px;
        background: rgba(255,255,255,.82);
        padding: 14px 16px;
        backdrop-filter: blur(14px);
      }

      .gen-about-logo img {
        width: 138px;
        height: auto;
        object-fit: contain;
      }

      .gen-about-logo span {
        color: rgba(0,0,0,.56);
        font-size: 13px;
        font-weight: 700;
      }

      .gen-contact-photo {
        overflow: hidden;
        margin-top: 22px;
        border-radius: 24px;
        box-shadow: 0 18px 52px rgba(245,130,32,.14);
      }

      .gen-contact-photo img {
        display: block;
        width: 100%;
        height: 190px;
        object-fit: cover;
      }

      @media (max-width: 900px) {

        .experience-orbit-seal {
          right: 24px;
          bottom: 94px;
        }

        .experience-orbit-inner {
          transform: scale(.82);
        }

        .showcase-hero,
        .main-shot-wrap,
        .all-shots {
          padding-left: 18px;
          padding-right: 18px;
        }

        .shot-meta,
        .two-col,
        .detail-shot,
        .contact-shot,
        .settings-shot,
        .ux-rationale {
          grid-template-columns: 1fr;
          display: grid;
        }

        .ux-rationale ul {
          grid-template-columns: 1fr;
        }

        .shot-grid {
          grid-template-columns: 1fr;
        }

        .thumb-rail {
          width: calc(100% - 36px);
          grid-template-columns: 1fr;
        }

        .site-nav-shot nav {
          display: none;
        }

        .website-shot,
        .website-shot.large {
          padding: 22px;
        }

        .website-shot h1 {
          font-size: clamp(2.8rem, 12vw, 5rem);
        }

        .search-mini,
        .property-preview-row,
        .emotion-row,
        .specs-shot,
        .donation-card,
        .gen-impact-row,
        .transparency-strip,
        .values-real {
          grid-template-columns: 1fr;
        }
      }


      .experience-orbit-seal {
        display: none !important;
      }

      .ui-web-progress {
        position: fixed;
        inset: 0 0 auto 0;
        z-index: 5000;
        height: 6px;
        background: rgba(255,255,255,.055);
        box-shadow: 0 0 22px rgba(157,185,255,.12);
      }

      .ui-web-progress span {
        display: block;
        height: 100%;
        transform-origin: left center;
        background: linear-gradient(90deg, #9DB9FF, #BFA7FF, #E7A7FF, #FFC1D9, #BFEAD8);
        box-shadow: 0 0 28px rgba(231,167,255,.42);
      }

      .screenshots-showcase {
        background:
          radial-gradient(circle at 72% 8%, rgba(157,185,255,.13), transparent 28%),
          radial-gradient(circle at 22% 12%, rgba(231,167,255,.08), transparent 25%),
          radial-gradient(circle at 50% 100%, rgba(191,234,216,.045), transparent 35%),
          linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px),
          #030303 !important;
        background-size: auto, auto, auto, 96px 96px, 96px 96px, auto;
      }

      .portfolio-header {
        position: fixed !important;
        left: 50% !important;
        top: 24px !important;
        z-index: 100;
        width: auto !important;
        transform: translateX(-50%);
        transition: 320ms cubic-bezier(.22,1,.36,1);
        pointer-events: auto !important;
      }

      .portfolio-header.is-scrolled {
        top: 16px !important;
        opacity: .94;
        transform: translateX(-50%) scale(.985);
      }

      .portfolio-header nav {
        min-height: 44px !important;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px !important;
        padding: 6px !important;
        border-radius: 999px;
        background: rgba(255,255,255,.038) !important;
        border: 1px solid rgba(255,255,255,.068) !important;
        backdrop-filter: blur(34px) saturate(170%) !important;
        -webkit-backdrop-filter: blur(34px) saturate(170%) !important;
        box-shadow:
          0 18px 60px rgba(0,0,0,.34),
          inset 0 1px 0 rgba(255,255,255,.065);
      }

      .portfolio-header a {
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

      .portfolio-header a:hover,
      .portfolio-header a.active {
        color: white !important;
        background: rgba(255,255,255,.075) !important;
        transform: translateY(-1px);
      }

      .editorial-case-section,
      .landing-contact-cta {
        width: min(100% - 84px, 1540px);
        margin: 48px auto 0;
        padding: 110px 72px;
        border: 1px solid rgba(255,255,255,.055);
        border-radius: 46px;
        background: linear-gradient(135deg, rgba(255,255,255,.044), rgba(255,255,255,.014));
        box-shadow: inset 0 1px 0 rgba(255,255,255,.065), 0 24px 80px rgba(0,0,0,.28);
        backdrop-filter: blur(16px);
      }

      .case-copy-block {
        max-width: 1040px;
      }

      .case-copy-block.narrow {
        max-width: 900px;
      }

      .case-copy-block h2,
      .landing-contact-cta h2 {
        max-width: 1100px;
        margin: 28px 0 0;
        color: white;
        font-size: clamp(2.75rem, 4.8vw, 6.2rem);
        line-height: 1.1;
        letter-spacing: -.055em;
        font-weight: 380;
      }

      .case-copy-block p:not(.eyebrow),
      .landing-contact-cta p:not(.eyebrow) {
        max-width: 74ch;
        margin: 34px 0 0;
        color: rgba(245,245,247,.64);
        font-size: 18px;
        line-height: 1.95;
        letter-spacing: -.012em;
      }

      .landing-context-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
        margin-top: 58px;
      }

      .landing-context-grid article,
      .landing-system-grid article,
      .landing-metrics-grid article {
        position: relative;
        overflow: hidden;
        min-height: 360px;
        border: 1px solid rgba(255,255,255,.075);
        border-radius: 34px;
        background: rgba(0,0,0,.18);
        padding: 30px;
        transition: 260ms ease;
      }

      .landing-context-grid article::after {
        content: "";
        position: absolute;
        inset: auto 24px -48px;
        height: 100px;
        background: var(--accent-local);
        opacity: .18;
        filter: blur(58px);
      }

      .landing-context-grid article:hover,
      .landing-system-grid article:hover,
      .landing-metrics-grid article:hover {
        transform: translateY(-6px);
        border-color: rgba(255,255,255,.14);
      }

      .landing-context-grid span,
      .landing-system-grid span,
      .decision-index,
      .landing-metrics-grid p {
        color: var(--accent);
        font-size: 11px;
        font-weight: 820;
        letter-spacing: .22em;
        text-transform: uppercase;
      }

      .landing-context-grid h3,
      .landing-system-grid h3 {
        margin: 34px 0 0;
        color: white;
        font-size: clamp(1.7rem, 2.5vw, 3.1rem);
        line-height: 1.16;
        letter-spacing: -.04em;
        font-weight: 430;
      }

      .landing-context-grid p,
      .landing-system-grid p {
        margin-top: 24px;
        color: rgba(245,245,247,.62);
        font-size: 15px;
        line-height: 1.85;
      }

      .landing-context-grid strong {
        display: block;
        margin-top: 32px;
        color: rgba(245,245,247,.84);
        font-size: 14px;
        line-height: 1.7;
      }

      .landing-decision-list {
        display: grid;
        gap: 20px;
        margin-top: 58px;
      }

      .landing-decision-list article {
        display: grid;
        grid-template-columns: 78px minmax(0, 1.25fr) minmax(0, 1fr) minmax(0, .82fr);
        gap: 28px;
        align-items: stretch;
        border: 1px solid rgba(255,255,255,.075);
        border-radius: 34px;
        background: rgba(0,0,0,.18);
        padding: 30px;
      }

      .decision-index {
        width: 58px;
        height: 58px;
        display: grid;
        place-items: center;
        border-radius: 18px;
        background: color-mix(in srgb, var(--accent), transparent 86%);
      }

      .landing-decision-list p,
      .screen-result p {
        margin: 0 0 12px;
        color: var(--accent);
        font-size: 10px;
        font-weight: 820;
        letter-spacing: .28em;
        text-transform: uppercase;
      }

      .landing-decision-list h3 {
        margin: 0;
        color: white;
        font-size: clamp(1.45rem, 2vw, 2.2rem);
        line-height: 1.2;
        letter-spacing: -.035em;
        font-weight: 520;
      }

      .landing-decision-list span,
      .landing-decision-list strong {
        display: block;
        margin-top: 18px;
        color: rgba(245,245,247,.64);
        font-size: 14px;
        line-height: 1.8;
        font-weight: 430;
      }

      .screen-result {
        border-radius: 24px;
        border: 1px solid rgba(255,255,255,.075);
        background: color-mix(in srgb, var(--accent), transparent 94%);
        padding: 22px;
      }

      .screen-result strong {
        color: white;
        font-size: 17px;
        line-height: 1.45;
      }

      .landing-system-grid,
      .landing-metrics-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 24px;
        margin-top: 58px;
      }

      .landing-metrics-grid article {
        min-height: 300px;
      }

      .landing-metrics-grid h3 {
        margin: 24px 0 0;
        color: white;
        font-size: 64px;
        line-height: 1;
        letter-spacing: -.055em;
        font-weight: 380;
      }

      .landing-metrics-grid span {
        display: block;
        margin-top: 24px;
        color: rgba(245,245,247,.62);
        line-height: 1.75;
        font-size: 14px;
      }

      .landing-metrics-grid i {
        display: block;
        height: 7px;
        margin-top: 30px;
        border-radius: 999px;
        background: rgba(255,255,255,.08);
        overflow: hidden;
      }

      .landing-metrics-grid b {
        display: block;
        height: 100%;
        border-radius: 999px;
        background: var(--accent);
      }

      .landing-contact-cta {
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

      .landing-contact-cta h2 {
        margin-left: auto;
        margin-right: auto;
        line-height: 1.14;
      }

      .landing-contact-cta p:not(.eyebrow) {
        margin-left: auto;
        margin-right: auto;
        max-width: 760px;
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
        .landing-context-grid,
        .landing-system-grid,
        .landing-metrics-grid {
          grid-template-columns: repeat(2, 1fr);
        }

        .landing-decision-list article {
          grid-template-columns: 70px 1fr;
        }

        .landing-decision-list article > div:not(.decision-index) {
          grid-column: 2;
        }
      }

      @media (max-width: 900px) {
        .ui-web-progress {
          height: 5px;
        }

        .portfolio-header {
          top: 14px !important;
          width: calc(100% - 28px) !important;
        }

        .portfolio-header nav {
          justify-content: flex-start !important;
          width: 100%;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .portfolio-header nav::-webkit-scrollbar {
          display: none;
        }

        .portfolio-header a {
          padding: 0 13px !important;
          font-size: 12px !important;
        }

        .editorial-case-section,
        .landing-contact-cta {
          width: calc(100% - 28px);
          padding: 58px 22px;
          border-radius: 32px;
        }

        .case-copy-block h2,
        .landing-contact-cta h2 {
          font-size: clamp(2.15rem, 11vw, 3.7rem);
          line-height: 1.14;
          letter-spacing: -.04em;
        }

        .case-copy-block p:not(.eyebrow),
        .landing-contact-cta p:not(.eyebrow) {
          font-size: 16px;
          line-height: 1.86;
        }

        .landing-context-grid,
        .landing-system-grid,
        .landing-metrics-grid {
          grid-template-columns: 1fr;
        }

        .landing-context-grid article,
        .landing-system-grid article,
        .landing-metrics-grid article {
          min-height: auto;
        }

        .landing-decision-list article {
          grid-template-columns: 1fr;
          padding: 22px;
        }

        .landing-decision-list article > div:not(.decision-index) {
          grid-column: auto;
        }

        .landing-contact-cta {
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


export default function UIShowcaseLandingPagesFinal() {
  return (
    <>
      <WF1ShaderHeroSectionPreviewMatch />
      <UIShowcaseLandingPagesScreenshotsUX />
    </>
  );
}
