import { useEffect, useMemo, useRef, useState } from "react";

/**
 * UIMobileWF1.jsx
 * Showcase móvil premium autocontenido:
 * 1) Travel México — Aplicación de viajes de lujo
 * 2) Vanessa Boutique — Marketplace de moda circular de lujo
 *
 * Reemplaza completo tu archivo:
 * src/UIMobileWF1.jsx
 */

function HeroWave() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width;
    let height;
    let imageData;
    let data;
    let animationFrame;
    const SCALE = 2;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      width = Math.floor(canvas.width / SCALE);
      height = Math.floor(canvas.height / SCALE);
      imageData = ctx.createImageData(width, height);
      data = imageData.data;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const startTime = Date.now();
    const SIN_TABLE = new Float32Array(1024);
    const COS_TABLE = new Float32Array(1024);

    for (let i = 0; i < 1024; i++) {
      const angle = (i / 1024) * Math.PI * 2;
      SIN_TABLE[i] = Math.sin(angle);
      COS_TABLE[i] = Math.cos(angle);
    }

    const fastSin = (x) => {
      const index =
        Math.floor(((x % (Math.PI * 2)) / (Math.PI * 2)) * 1024) & 1023;
      return SIN_TABLE[index];
    };

    const fastCos = (x) => {
      const index =
        Math.floor(((x % (Math.PI * 2)) / (Math.PI * 2)) * 1024) & 1023;
      return COS_TABLE[index];
    };

    const render = () => {
      const time = (Date.now() - startTime) * 0.001;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const uX = (2 * x - width) / height;
          const uY = (2 * y - height) / height;

          let a = 0;
          let d = 0;

          for (let i = 0; i < 4; i++) {
            a += fastCos(i - d + time * 0.34 - a * uX);
            d += fastSin(i * uY + a);
          }

          const wave = (fastSin(a) + fastCos(d)) * 0.5;
          const intensity = 0.22 + 0.44 * wave;
          const baseVal = 0.08 + 0.16 * fastCos(uX + uY + time * 0.22);
          const blueAccent = 0.16 * fastSin(a * 1.45 + time * 0.16);
          const purpleAccent = 0.15 * fastCos(d * 1.85 + time * 0.1);
          const warmAccent = 0.13 * fastSin(d + time * 0.14);
          const mintAccent = 0.12 * fastCos(a + d + time * 0.12);

          const r =
            Math.max(0, Math.min(1, baseVal + purpleAccent * 0.42 + warmAccent)) *
            intensity;
          const g =
            Math.max(0, Math.min(1, baseVal + blueAccent * 0.4 + mintAccent)) *
            intensity;
          const b =
            Math.max(
              0,
              Math.min(1, baseVal + blueAccent * 1.02 + purpleAccent * 0.34)
            ) * intensity;

          const index = (y * width + x) * 4;
          data[index] = r * 255;
          data[index + 1] = g * 255;
          data[index + 2] = b * 255;
          data[index + 3] = 255;
        }
      }

      ctx.putImageData(imageData, 0, 0);

      if (SCALE > 1) {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(
          canvas,
          0,
          0,
          width,
          height,
          0,
          0,
          canvas.width,
          canvas.height
        );
      }

      animationFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-wave-canvas" />;
}

const assets = {
  travel: {
    tamul:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=90",
    bacalar:
      "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=1200&q=90",
    oaxaca:
      "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=1200&q=90",
    cenote:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=90",
    town:
      "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&w=1200&q=90",
    map:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=90",
  },
  fashion: {
    campaign:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=90",
    model:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=90",
    shoes:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=90",
    bag:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=90",
    jewelry:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=90",
    clothing:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=90",
    seller:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=90",
  },
};

const Icon = ({ name }) => {
  const icons = {
    home: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 10.8 12 4l8 6.8V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-9.2Z" />
      </svg>
    ),
    search: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M10.8 18.2a7.4 7.4 0 1 1 0-14.8 7.4 7.4 0 0 1 0 14.8Zm5.3-2.1 4.5 4.5" />
      </svg>
    ),
    trips: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 7h12a2 2 0 0 1 2 2v9.5A1.5 1.5 0 0 1 18.5 20h-13A1.5 1.5 0 0 1 4 18.5V9a2 2 0 0 1 2-2Zm3-3h6v3H9V4Z" />
      </svg>
    ),
    saved: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 20.2s-7.5-4.4-7.5-10.1A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.9c0 5.7-7.5 10.1-7.5 10.1Z" />
      </svg>
    ),
    profile: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 12.2a4.1 4.1 0 1 0 0-8.2 4.1 4.1 0 0 0 0 8.2Zm7 7.8a7 7 0 0 0-14 0" />
      </svg>
    ),
    shop: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 9h12l-1 11H7L6 9Zm2.5 0V7a3.5 3.5 0 0 1 7 0v2" />
      </svg>
    ),
    exchange: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 7h11l-3-3m3 3-3 3M17 17H6l3 3m-3-3 3-3" />
      </svg>
    ),
    menu: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 7h14M5 12h14M5 17h14" />
      </svg>
    ),
    back: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M15 5 8 12l7 7" />
      </svg>
    ),
    verified: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m6.5 12.4 3.4 3.4 7.6-8.1" />
      </svg>
    ),
    weather: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 5V3m0 18v-2m7-7h2M3 12h2m12-5 1.4-1.4M5.6 18.4 7 17m0-10L5.6 5.6M18.4 18.4 17 17M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      </svg>
    ),
  };

  return <span className="icon">{icons[name] || icons.home}</span>;
};


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
    <div className="ui-scroll-progress" aria-hidden="true">
      <span style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}

function ProjectHeader() {
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

function Photo({ src, className = "", children }) {
  return (
    <div className={`photo ${className}`} style={{ "--photo": `url(${src})` }}>
      {children}
    </div>
  );
}

function PremiumDeviceFrame({ children, className = "" }) {
  return (
    <div className={`device ${className}`}>
      <div className="device-reflection" />
      <div className="device-screen">
        <div className="dynamic-island" />
        {children}
      </div>
    </div>
  );
}

function MobileTopBar({ title, context, back = false, action = "menu", tone = "dark" }) {
  return (
    <div className={`mobile-topbar ${tone}`}>
      <button aria-label={back ? "Regresar" : "Ir a inicio"}>
        <Icon name={back ? "back" : "home"} />
      </button>
      <div>
        <small>{context}</small>
        <strong>{title}</strong>
      </div>
      <button aria-label="Abrir menú">
        <Icon name={action === "profile" ? "profile" : "menu"} />
      </button>
    </div>
  );
}

function MobileTabBar({ app = "travel", active = "Explorar" }) {
  const travelTabs = [
    ["Explorar", "home"],
    ["Buscar", "search"],
    ["Viajes", "trips"],
    ["Guardados", "saved"],
    ["Perfil", "profile"],
  ];

  const fashionTabs = [
    ["Inicio", "home"],
    ["Tienda", "shop"],
    ["Cambiar", "exchange"],
    ["Favoritos", "saved"],
    ["Perfil", "profile"],
  ];

  const tabs = app === "travel" ? travelTabs : fashionTabs;

  return (
    <div className={`mobile-tabbar ${app}`} role="navigation" aria-label="Navegación inferior">
      {tabs.map(([tab, icon]) => (
        <button key={tab} className={tab === active ? "active" : ""} aria-label={tab}>
          <Icon name={icon} />
          <span>{tab}</span>
        </button>
      ))}
    </div>
  );
}

function VerificationBadge({ label = "Verificado", tone = "mint" }) {
  return (
    <span className={`verification-badge ${tone}`}>
      <Icon name="verified" />
      {label}
    </span>
  );
}

function FashionProductCard({ image, brand, product, price, meta }) {
  return (
    <article className="fashion-product-card">
      <Photo src={image} />
      <div>
        <small>{brand}</small>
        <strong>{product}</strong>
        <span>{meta}</span>
        <b>{price}</b>
      </div>
    </article>
  );
}

/* ----------------------------- TRAVEL APP ----------------------------- */

function TravelOnboarding() {
  return (
    <div className="screen travel-screen travel-apple travel-welcome-apple travel-welcome-redesign">
      <Photo src={assets.travel.bacalar} className="travel-welcome-media">
        <MobileTopBar title="Bienvenido" context="Travel México" action="profile" tone="light" />

        <div className="travel-welcome-copy">
          <span>Travel México</span>
          <h3>México diseñado para viajar con intención.</h3>
          <p>Rutas inteligentes, clima, presupuesto y experiencias locales en una sola vista.</p>
        </div>
      </Photo>

      <section className="welcome-control-panel">
        <div className="welcome-route-summary">
          <small>Ruta sugerida</small>
          <strong>Bacalar · 2 días</strong>
          <span>Clima ideal · desde $1,850</span>
        </div>

        <div className="welcome-metrics-grid">
          <div><small>Clima</small><strong>27°</strong></div>
          <div><small>Duración</small><strong>2 días</strong></div>
          <div><small>Ritmo</small><strong>Ligero</strong></div>
        </div>

        <button className="travel-primary-button welcome-primary-action">Comenzar exploración</button>
      </section>

      <MobileTabBar app="travel" active="Explorar" />
    </div>
  );
}


function TravelExplore() {
  const recommendations = [
    ["Bacalar", "Laguna · 2 días", "$1,850", assets.travel.bacalar],
    ["Oaxaca", "Cultura · 3 días", "$2,100", assets.travel.oaxaca],
  ];

  return (
    <div className="screen travel-screen travel-apple travel-static-screen travel-explore-vogue">
      <MobileTopBar title="Explorar" context="Travel México" action="profile" />

      <section className="travel-apple-hero-block">
        <Photo src={assets.travel.tamul} className="travel-apple-hero-photo" />
        <div className="travel-apple-hero-content">
          <small>San Luis Potosí · México</small>
          <h3>Cascada de Tamul</h3>
          <p>Ruta escénica, agua turquesa y comida local diseñada para dos días.</p>
          <div className="travel-apple-meta-row">
            <span>★ 4.9</span>
            <span>2 días</span>
            <span>$1,200</span>
            <span>26°</span>
          </div>
        </div>
      </section>

      <div className="travel-apple-filter-row" aria-label="Categorías de viaje">
        <button>Playas</button>
        <button>Pueblos</button>
        <button>Naturaleza</button>
      </div>

      <section className="travel-apple-section-title">
        <strong>Recomendado</strong>
        <span>Curado por clima y distancia</span>
      </section>

      <div className="travel-apple-reco-grid">
        {recommendations.map(([title, meta, price, image]) => (
          <article className="travel-apple-reco-card" key={title}>
            <Photo src={image} />
            <div>
              <strong>{title}</strong>
              <small>{meta}</small>
            </div>
            <b>{price}</b>
          </article>
        ))}
      </div>

      <MobileTabBar app="travel" active="Explorar" />
    </div>
  );
}


function TravelSearch() {
  return (
    <div className="screen travel-screen travel-apple travel-scroll-safe">
      <MobileTopBar title="Buscar" context="Descubre México" back />

      <div className="travel-search-field"><Icon name="search" /> Buscar destino, clima o presupuesto</div>

      <div className="travel-pill-row">
        <button>Clima ideal</button>
        <button>&lt; $3,000</button>
        <button>2 días</button>
      </div>

      <Photo src={assets.travel.cenote} className="travel-feature-card travel-search-feature">
        <div className="travel-feature-copy">
          <small>Búsqueda guiada</small>
          <h3>Escapadas de agua cristalina</h3>
          <p>Resultados curados por distancia, presupuesto y momento ideal del día.</p>
        </div>
      </Photo>

      <div className="travel-result-list">
        {[
          ["Bacalar", "Laguna · 4.8 · desde $1,850", assets.travel.bacalar],
          ["Oaxaca", "Cultura · 4.9 · desde $2,100", assets.travel.oaxaca],
        ].map(([title, meta, image]) => (
          <article className="travel-result-row" key={title}>
            <Photo src={image} />
            <div><strong>{title}</strong><small>{meta}</small></div>
            <button aria-label={`Ver ${title}`}>→</button>
          </article>
        ))}
      </div>

      <MobileTabBar app="travel" active="Buscar" />
    </div>
  );
}


function TravelDestination() {
  return (
    <div className="screen travel-screen travel-apple travel-destination-apple">
      <Photo src={assets.travel.tamul} className="travel-destination-media">
        <MobileTopBar title="Destino" context="San Luis Potosí" back tone="light" />
        <div className="travel-destination-copy">
          <span>Cascada de Tamul</span>
          <h3>Agua turquesa, ruta escénica y pausa local.</h3>
        </div>
      </Photo>

      <section className="travel-destination-sheet">
        <div className="travel-stats-four">
          <div><small>Rating</small><strong>4.9</strong></div>
          <div><small>Duración</small><strong>2 días</strong></div>
          <div><small>Desde</small><strong>$1,200</strong></div>
          <div><small>Clima</small><strong>26°</strong></div>
        </div>
        <p>Salida temprana, navegación con baja afluencia y cierre gastronómico local verificado.</p>
        <button className="travel-primary-button">Reservar experiencia</button>
      </section>

      <MobileTabBar app="travel" active="Explorar" />
    </div>
  );
}


function TravelBooking() {
  return (
    <div className="screen travel-screen travel-apple travel-scroll-safe">
      <MobileTopBar title="Reserva" context="Paso 2 de 3" back />

      <Photo src={assets.travel.tamul} className="travel-booking-hero">
        <small>Tamul · Ruta Insignia</small>
        <h3>Tu experiencia está casi lista.</h3>
      </Photo>

      <section className="travel-checkout-card">
        <div className="checkout-line"><span>Fecha</span><strong>27 julio 2026</strong></div>
        <div className="checkout-line"><span>Visitantes</span><strong>2 adultos</strong></div>
        <div className="checkout-line"><span>Clima</span><strong>26° · despejado</strong></div>
        <div className="checkout-line"><span>Cancelación</span><strong>Flexible 24 h</strong></div>
        <div className="checkout-price"><small>Total estimado</small><strong>$2,400 MXN</strong></div>
      </section>

      <MobileTabBar app="travel" active="Viajes" />
    </div>
  );
}


function TravelPlanner() {
  const stops = [
    ["08:30", "Salida tranquila", "Café local antes de tomar ruta.", assets.travel.town],
    ["11:00", "Cascada de Tamul", "Mejor luz y menor flujo de visitantes.", assets.travel.tamul],
    ["14:30", "Comida regional", "Recomendación local verificada.", assets.travel.oaxaca],
  ];

  return (
    <div className="screen travel-screen travel-apple travel-scroll-safe">
      <MobileTopBar title="Itinerario" context="Ruta creada con IA" back />

      <section className="travel-itinerary-card">
        <small>Día 1 · Ruta escénica</small>
        <h3>Del primer mirador a la comida local.</h3>
        <p>Itinerario narrativo con clima, tiempos reales y recomendaciones cercanas.</p>
      </section>

      <div className="travel-timeline-clean">
        {stops.map(([time, title, body, image]) => (
          <article key={title}>
            <Photo src={image} />
            <div><span>{time}</span><strong>{title}</strong><small>{body}</small></div>
          </article>
        ))}
      </div>

      <MobileTabBar app="travel" active="Viajes" />
    </div>
  );
}


function TravelMaps() {
  return (
    <div className="screen travel-screen travel-map-apple">
      <Photo src={assets.travel.map} className="travel-map-canvas">
        <MobileTopBar title="Ruta inteligente" context="3 paradas · 42 km" back tone="light" />
        <div className="travel-map-line" />
        <div className="travel-map-pin map-a">Tamul</div>
        <div className="travel-map-pin map-b">Hotel</div>
        <div className="travel-map-pin map-c">Comida</div>
        <div className="travel-map-status"><Icon name="weather" /> 26° · despejado</div>
        <div className="travel-map-flow">Flujo bajo · salida 8:30</div>
      </Photo>

      <section className="travel-map-panel">
        <small>Sugerencia IA</small>
        <h3>42 km · 3 h 20 min</h3>
        <p>Ruta optimizada por clima, distancia, visitantes y paradas locales verificadas.</p>
        <div className="travel-pill-row compact"><button>Clima ideal</button><button>Bajo flujo</button></div>
        <button className="travel-primary-button">Iniciar ruta</button>
      </section>

      <MobileTabBar app="travel" active="Viajes" />
    </div>
  );
}


function TravelSaved() {
  return (
    <div className="screen travel-screen travel-apple travel-scroll-safe">
      <MobileTopBar title="Guardados" context="8 experiencias" />
      <Photo src={assets.travel.bacalar} className="travel-feature-card saved-clean-hero">
        <div className="travel-feature-copy">
          <small>Guardado especial</small>
          <h3>Bacalar, laguna de los siete colores.</h3>
        </div>
      </Photo>
      <div className="travel-reco-grid">
        <Photo src={assets.travel.oaxaca} className="travel-reco-card"><div><strong>Oaxaca</strong><small>Ruta gastronómica</small></div><b>3 días</b></Photo>
        <Photo src={assets.travel.cenote} className="travel-reco-card"><div><strong>Cenotes</strong><small>Aventura tranquila</small></div><b>1 día</b></Photo>
      </div>
      <MobileTabBar app="travel" active="Guardados" />
    </div>
  );
}


function TravelPassFinal() {
  return (
    <div className="screen travel-screen travel-apple travel-pass-apple">
      <MobileTopBar title="Pase de viaje" context="Credencial digital" back />

      <section className="travel-wallet-card">
        <Photo src={assets.travel.tamul} className="travel-wallet-photo">
          <div className="pass-holo">MX</div>
        </Photo>
        <div className="travel-wallet-body">
          <div className="pass-status-row"><span>Acceso desbloqueado</span><VerificationBadge label="NFC listo" tone="sand" /></div>
          <h3>Cascada de Tamul</h3>
          <p>Isaías Martínez · 27 julio 2026 · 2 adultos</p>
          <div className="travel-wallet-grid">
            <div><small>Nivel</small><strong>Cultural+</strong></div>
            <div><small>Clima</small><strong>26°</strong></div>
          </div>
          <div className="pass-footer">
            <div className="small-qr" aria-label="Código de acceso">{Array.from({ length: 25 }).map((_, index) => (<i key={index} className={index % 2 === 0 || index % 7 === 0 ? "on" : ""} />))}</div>
            <div><small>Validación digital</small><strong>Pase verificado</strong></div>
          </div>
        </div>
      </section>

      <MobileTabBar app="travel" active="Viajes" />
    </div>
  );
}


function VanessaOnboarding() {
  return (
    <div className="screen fashion-screen vanessa-vogue-signin-final">
      <div className="vanessa-vogue-logo" aria-label="Vanessa Boutique">VANESSA</div>

      <section className="vanessa-vogue-access" aria-label="Iniciar sesión">
        <div className="vanessa-vogue-copy">
          <h3>Bienvenida.</h3>
          <p>Accede a tu cuenta para continuar.</p>
        </div>

        <form className="vanessa-vogue-form">
          <label>
            <span>Correo electrónico</span>
            <input type="email" aria-label="Correo electrónico" />
          </label>

          <label>
            <span>Contraseña</span>
            <input type="password" aria-label="Contraseña" />
          </label>

          <div className="vanessa-vogue-options">
            <label className="vanessa-vogue-check">
              <input type="checkbox" />
              <span>Recordarme</span>
            </label>
            <button type="button">¿Olvidaste tu contraseña?</button>
          </div>

          <button className="vanessa-vogue-submit" type="button">Iniciar sesión</button>

          <div className="vanessa-vogue-divider"><span>o</span></div>

          <button className="vanessa-vogue-create" type="button">Crear una cuenta</button>
        </form>
      </section>
    </div>
  );
}

function VanessaProductDetail() {
  return (
    <div className="screen fashion-screen product-screen product-screen-refined">
      <Photo src={assets.fashion.shoes} className="fashion-product-hero editorial-product">
        <MobileTopBar title="Producto" context="Christian Louboutin" back tone="light" />
        <div className="fashion-hero-caption">
          <span>Pieza autenticada</span>
          <h3>Tacones negros con estoperoles</h3>
        </div>
      </Photo>

      <div className="fashion-product-sheet luxury-commerce product-sheet-expanded">
        <div className="product-title-row">
          <div>
            <small>Christian Louboutin</small>
            <h3>Tacones negros con estoperoles</h3>
          </div>
          <strong>$899</strong>
        </div>

        <p>Excelente estado · talla 24 MX · negro · caja original disponible · revisión experta incluida.</p>

        <div className="condition-panel">
          <div><small>Condición</small><strong>Excelente</strong></div>
          <div><small>Color</small><strong>Negro</strong></div>
          <div><small>Talla</small><strong>24 MX</strong></div>
        </div>

        <div className="auth-panel">
          <div>
            <small>Autenticidad</small>
            <strong>Validación boutique</strong>
            <span>La pieza fue revisada por condición, marca, fotografías y consistencia de venta.</span>
          </div>
          <VerificationBadge label="Autenticado" tone="pink" />
        </div>

        <div className="seller-inline-card">
          <div className="seller-avatar mini-vanessa" />
          <div>
            <small>Vendedora</small>
            <strong>Vanessa</strong>
            <span>4.9 · 128 ventas · respuesta rápida</span>
          </div>
        </div>

        <div className="dual-cta sticky-safe">
          <button className="main-btn pink">Comprar ahora</button>
          <button className="main-btn outline-pink">Proponer intercambio</button>
        </div>
      </div>

      <MobileTabBar app="fashion" active="Tienda" />
    </div>
  );
}

function VanessaSellerProfile() {
  return (
    <div className="screen fashion-screen padded">
      <MobileTopBar title="Vendedora" context="Perfil verificado" back />

      <div className="seller-card luxury-seller">
        <div className="seller-avatar vanessa" />
        <h3>Vanessa Atelier</h3>
        <p>Curadora de lujo · 128 ventas · 4.9 de valoración · CDMX</p>

        <div className="seller-trust">
          <VerificationBadge label="Vendedora verificada" tone="pink" />
          <VerificationBadge label="Piezas autenticadas" tone="pink" />
          <VerificationBadge label="Compra protegida" tone="pink" />
        </div>
      </div>

      <div className="mini-destination-grid">
        <Photo src={assets.fashion.bag}><b>Celine vintage</b><small>Verificado</small></Photo>
        <Photo src={assets.fashion.clothing}><b>Abrigo COS</b><small>Excelente</small></Photo>
      </div>

      <MobileTabBar app="fashion" active="Perfil" />
    </div>
  );
}

function VanessaProfile() {
  return (
    <div className="screen fashion-screen padded">
      <MobileTopBar title="Perfil" context="Vanessa Boutique" />

      <div className="seller-card luxury-profile">
        <div className="seller-avatar brand-profile" />
        <h3>Vanessa</h3>
        <p>Miembro Élite · 4 compras · 2 ventas · 3 intercambios protegidos</p>

        <div className="seller-trust">
          <VerificationBadge label="Miembro protegido" tone="pink" />
          <VerificationBadge label="Compra protegida" tone="pink" />
        </div>
      </div>

      <div className="profile-stats">
        <div><strong>12</strong><span>Favoritos</span></div>
        <div><strong>3</strong><span>Ofertas</span></div>
        <div><strong>2</strong><span>Ventas</span></div>
      </div>

      <MobileTabBar app="fashion" active="Perfil" />
    </div>
  );
}

function VanessaInicio() {
  return (
    <div className="screen fashion-screen padded vanessa-home-marketplace">
      <MobileTopBar title="Inicio" context="Vanessa Boutique" action="profile" />
      <div className="search-input fashion-search integrated-search"><Icon name="search" /> Buscar ropa, zapatos, bolsos...</div>

      <Photo src={assets.fashion.model} className="fashion-editorial marketplace-hero">
        <span>Selección curada</span>
        <h3>Moda circular con estética editorial.</h3>
        <p>Piezas verificadas para comprar, guardar o intercambiar con confianza.</p>
      </Photo>

      <section className="market-strip">
        <div><strong>Reciente</strong><span>Louboutin visto hoy</span></div>
        <div><strong>Colección</strong><span>Negro de noche</span></div>
      </section>

      <div className="category-row">
        <button>Ropa</button><button>Zapatos</button><button>Bolsos</button><button>Joyería</button>
      </div>

      <div className="mini-destination-grid product-grid-refined">
        <Photo src={assets.fashion.shoes}><b>Louboutin</b><small>$899 · autenticado</small></Photo>
        <Photo src={assets.fashion.bag}><b>Celine vintage</b><small>$1,200 · piel</small></Photo>
      </div>
      <MobileTabBar app="fashion" active="Inicio" />
    </div>
  );
}

function VanessaShop() {
  return (
    <div className="screen fashion-screen padded vanessa-shop-premium shop-screen-refined">
      <MobileTopBar title="Tienda" context="Selección de lujo" back />

      <div className="search-input fashion-search integrated-search"><Icon name="search" /> Buscar por marca, talla o estado</div>

      <Photo src={assets.fashion.campaign} className="shop-editorial-hero">
        <span>Selección de lujo</span>
        <h3>Piezas verificadas con historia propia.</h3>
      </Photo>

      <div className="segment-control luxury-segments refined-filters">
        <span>Marca</span>
        <span>Talla</span>
        <span>Estado</span>
        <span>Precio</span>
      </div>

      <div className="recommendation-list shop-products refined-products">
        <FashionProductCard image={assets.fashion.shoes} brand="Christian Louboutin" product="Tacones negros con estoperoles" price="$899" meta="Talla 24 · excelente" />
        <FashionProductCard image={assets.fashion.bag} brand="Celine" product="Bolso vintage Box" price="$1,200" meta="Piel · verificado" />
        <FashionProductCard image={assets.fashion.jewelry} brand="Tous" product="Collar dorado minimal" price="$680" meta="Joyería · muy bueno" />
      </div>

      <MobileTabBar app="fashion" active="Tienda" />
    </div>
  );
}

const travelScreens = [
  { label: "Pantalla de exploración", intent: "Descubrimiento curado", component: <TravelExplore /> },
  { label: "Pantalla de búsqueda", intent: "Exploración inteligente", component: <TravelSearch /> },
  { label: "Pantalla de itinerario", intent: "Narrativa de viaje", component: <TravelPlanner /> },
  { label: "Pantalla de ruta", intent: "Navegación inteligente", component: <TravelMaps /> },
  { label: "Pantalla de guardados", intent: "Continuidad", component: <TravelSaved /> },
  { label: "Pase de viaje", intent: "Credencial Acceso+", component: <TravelPassFinal /> },
];

const vanessaScreens = [
  { label: "Acceso", intent: "Inicio de sesión", component: <VanessaOnboarding /> },
  { label: "Inicio", intent: "Marketplace real", component: <VanessaInicio /> },
  { label: "Tienda", intent: "Compra clara", component: <VanessaShop /> },
  { label: "Producto", intent: "Lujo y confianza", component: <VanessaProductDetail /> },
  { label: "Perfil", intent: "Cuenta de Vanessa", component: <VanessaProfile /> },
];

function HeroShowcase() {
  return (
    <section className="hero-section">
      <HeroWave />
      <div className="hero-overlay" />
      <div className="grain" />
      <ProjectHeader />
      <div className="hero-copy">
        <p className="eyebrow">UI Mobile · Product & Service Design</p>
        <h1>Diseñar no fue crear pantallas.<span>Fue construir sistemas de decisión.</span></h1>
        <p>Travel México y Vanessa Boutique exploran dos contextos distintos —viajes y moda circular— bajo una misma premisa: reducir incertidumbre, aumentar confianza y transformar información compleja en decisiones simples.</p>
        <div className="hero-actions">
          <a href="#travel" className="primary-action">Travel México</a>
          <a href="#vanessa" className="secondary-action">Vanessa Boutique</a>
        </div>
      </div>
      <div className="hero-stage">
        <PremiumDeviceFrame className="hero-phone p1"><TravelExplore /></PremiumDeviceFrame>
        <PremiumDeviceFrame className="hero-phone p2"><TravelPassFinal /></PremiumDeviceFrame>
        <PremiumDeviceFrame className="hero-phone p3"><VanessaProductDetail /></PremiumDeviceFrame>
      </div>
    </section>
  );
}

function StrategySection() {
  return (
    <section className="strategy-section">
      <article><span>01</span><h2>Navegación clara en cada pantalla.</h2><p>Se reemplazaron barras placeholder por patrones con iconos, estados activos, regreso y contexto.</p></article>
      <article><span>02</span><h2>Confianza antes de convertir.</h2><p>Reserva, pase, producto y vendedora muestran señales de seguridad antes del CTA.</p></article>
      <article><span>03</span><h2>Más editorial, menos formulario.</h2><p>Buscar, planificador, mapa y onboarding ahora funcionan como experiencias visuales conectadas.</p></article>
    </section>
  );
}



function ContextSection() {
  return (
    <section className="case-study-section context-section">
      <div className="case-copy-block">
        <p className="eyebrow">Contexto del reto</p>
        <h2>Dos productos distintos, una misma pregunta de diseño.</h2>
        <p>
          El reto no era producir más pantallas. Era definir cómo una interfaz móvil puede reducir incertidumbre, aumentar confianza y convertir información compleja en decisiones más simples.
        </p>
      </div>

      <div className="context-grid">
        <article className="context-card travel">
          <small>Travel México</small>
          <h3>¿Cómo ayudar a una persona a descubrir, planificar y vivir un viaje sin sentirse abrumada por demasiadas opciones?</h3>
          <p>El producto necesitaba inspirar primero, ordenar después y cerrar con evidencia clara: ruta, clima, itinerario y pase.</p>
        </article>

        <article className="context-card fashion">
          <small>Vanessa Boutique</small>
          <h3>¿Cómo construir confianza en un marketplace de moda circular premium donde cada compra depende de autenticidad y reputación?</h3>
          <p>La experiencia debía equilibrar deseo, lujo silencioso, validación de piezas, estado del producto y seguridad antes del CTA.</p>
        </article>
      </div>
    </section>
  );
}

function FindingsToDecisionSection() {
  const rows = [
    {
      product: "Travel México",
      finding: "Los usuarios no empiezan buscando un destino. Empiezan buscando una posibilidad.",
      decision: "Convertir la exploración en una portada editorial con contexto suficiente para decidir.",
      pattern: "Inspiración guiada + metadata progresiva.",
      screen: "Travel Explore",
      tone: "travel",
    },
    {
      product: "Travel México",
      finding: "Planear un viaje se vuelve pesado cuando mapa, clima, ruta y agenda viven separados.",
      decision: "Unificar planificación, ruta y pase como continuidad de servicio.",
      pattern: "Journey conectado + evidencia digital.",
      screen: "Itinerario · Ruta · Pase",
      tone: "travel",
    },
    {
      product: "Vanessa Boutique",
      finding: "En moda circular premium, la autenticidad pesa tanto como el producto.",
      decision: "Mostrar reputación, condición, validación y vendedora antes de pedir compra.",
      pattern: "Trust before conversion.",
      screen: "Producto",
      tone: "fashion",
    },
    {
      product: "Vanessa Boutique",
      finding: "La estética de lujo pierde valor si la navegación se siente genérica o saturada.",
      decision: "Construir una retícula editorial con filtros claros y jerarquía silenciosa.",
      pattern: "Luxury commerce + claridad operativa.",
      screen: "Inicio · Tienda",
      tone: "fashion",
    },
  ];

  return (
    <section className="case-study-section insight-decision-section">
      <div className="case-copy-block">
        <p className="eyebrow">De hallazgo a decisión</p>
        <h2>Las pantallas nacieron de problemas concretos, no de composición visual.</h2>
        <p>
          Cada solución conecta investigación, decisión UX, patrón de interacción y pantalla resultante para que el caso se lea como producto, servicio e interfaz.
        </p>
      </div>

      <div className="insight-decision-list">
        {rows.map((item, index) => (
          <article className={item.tone} key={`${item.product}-${item.screen}`}>
            <div className="decision-number">{String(index + 1).padStart(2, "0")}</div>
            <div>
              <p>Hallazgo</p>
              <h3>{item.finding}</h3>
              <span>{item.product}</span>
            </div>
            <div>
              <p>Decisión UX</p>
              <span>{item.decision}</span>
            </div>
            <div>
              <p>Patrón</p>
              <span>{item.pattern}</span>
            </div>
            <div className="screen-output">
              <p>Pantalla resultante</p>
              <strong>{item.screen}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function DeepJourneySection() {
  const travelJourney = [
    ["Inspiración", "Descubrir una posibilidad", "Curiosidad", "Demasiadas opciones", "Curaduría editorial"],
    ["Búsqueda", "Filtrar sin esfuerzo", "Control", "No saber qué comparar", "Filtros por contexto"],
    ["Planificación", "Entender ruta y tiempos", "Confianza", "Datos dispersos", "Itinerario narrativo"],
    ["Validación", "Usar evidencia de viaje", "Seguridad", "Confirmaciones débiles", "Pase digital"],
  ];

  const fashionJourney = [
    ["Acceso", "Entrar sin fricción", "Claridad", "Login genérico", "Acceso editorial"],
    ["Descubrimiento", "Explorar piezas", "Deseo", "Catálogo saturado", "Curaduría visual"],
    ["Evaluación", "Validar autenticidad", "Confianza", "Duda sobre estado", "Badges y reputación"],
    ["Decisión", "Comprar o intercambiar", "Seguridad", "Riesgo percibido", "CTA con evidencia"],
  ];

  const render = (title, rows, tone) => (
    <article className={`deep-journey-card ${tone}`}>
      <h3>{title}</h3>
      <div className="deep-journey-grid">
        {rows.map(([stage, goal, emotion, pain, opportunity], index) => (
          <div key={stage}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{stage}</strong>
            <small>{goal}</small>
            <p><b>Emoción:</b> {emotion}</p>
            <p><b>Fricción:</b> {pain}</p>
            <p><b>Oportunidad:</b> {opportunity}</p>
          </div>
        ))}
      </div>
    </article>
  );

  return (
    <section className="case-study-section deep-journey-section">
      <div className="case-copy-block narrow">
        <p className="eyebrow">Journey Map</p>
        <h2>El journey explica qué necesitaba resolver cada pantalla.</h2>
        <p>
          No se trataba de ordenar vistas por orden de navegación. Se trataba de entender objetivo, emoción, fricción y oportunidad UX en cada momento de decisión.
        </p>
      </div>

      <div className="deep-journey-stack">
        {render("Travel México", travelJourney, "travel")}
        {render("Vanessa Boutique", fashionJourney, "fashion")}
      </div>
    </section>
  );
}

function ServiceBlueprintSeniorSection() {
  const rows = [
    ["Usuario", "Explora", "Busca", "Evalúa", "Decide", "Continúa"],
    ["Touchpoint", "Home / Inicio", "Search / Tienda", "Detalle / Producto", "Ruta / Compra", "Pase / Perfil"],
    ["Frontstage", "Contenido curado", "Filtros claros", "Evidencia visible", "CTA contextual", "Confirmación"],
    ["Backstage", "Curaduría", "Inventario / destinos", "Reglas de confianza", "Reserva / checkout", "Seguimiento"],
    ["Sistema", "Recomendaciones", "Búsqueda", "Validación", "Transacción", "Historial"],
    ["Evidencia", "Hero editorial", "Resultados", "Badges / metadata", "Pase / compra protegida", "Cuenta"],
  ];

  return (
    <section className="case-study-section service-blueprint-senior">
      <div className="case-copy-block narrow">
        <p className="eyebrow">Service Blueprint</p>
        <h2>La interfaz funciona como frontstage de un servicio más grande.</h2>
        <p>
          Travel y Vanessa necesitan conectar lo visible —pantallas, estados y CTAs— con operación invisible: recomendación, inventario, validación y seguimiento.
        </p>
      </div>

      <div className="blueprint-senior-table">
        {rows.map((row) => (
          <div className="blueprint-senior-row" key={row[0]}>
            <strong>{row[0]}</strong>
            {row.slice(1).map((cell) => (
              <span key={cell}>{cell}</span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function CaseStudyIntro() {
  return (
    <section className="case-study-section case-intro-section">
      <div className="case-copy-block">
        <p className="eyebrow">Caso de estudio UX/UI · Product · Service Design</p>
        <h2>La interfaz fue tratada como evidencia de producto, no como galería visual.</h2>
        <p>El caso muestra cómo dos productos móviles pueden usar jerarquía, microcopy, arquitectura de información y señales de confianza para ayudar a decidir con menor esfuerzo.</p>
      </div>

      <div className="case-dashboard-grid">
        <article>
          <span>Problema</span>
          <strong>La UI mostraba contenido, pero no guiaba decisiones.</strong>
          <p>Faltaban jerarquía, retícula, ritmo visual, señales de confianza y arquitectura de información.</p>
        </article>
        <article>
          <span>Decisión</span>
          <strong>Diseñar cada pantalla con una función clara.</strong>
          <p>Explorar inspira, buscar reduce incertidumbre, producto genera confianza y pase valida el servicio.</p>
        </article>
        <article>
          <span>Resultado</span>
          <strong>Un showcase más cercano a producto real.</strong>
          <p>Las pantallas finales se acompañan de fundamentos UX, journey, blueprint, métricas y decisiones visuales.</p>
        </article>
      </div>
    </section>
  );
}

function VisualEvidenceSection() {
  return (
    <section className="case-study-section visual-evidence-section">
      <div className="case-copy-block narrow">
        <p className="eyebrow travel">Evidencia visual del producto</p>
        <h2>Las pantallas no se presentan aisladas: se conectan con el servicio.</h2>
        <p>Se muestran como puntos de contacto dentro de un flujo completo, con intención, contexto y resultado esperado.</p>
      </div>

      <div className="evidence-showcase">
        <div className="evidence-phone large"><PremiumDeviceFrame><TravelExplore /></PremiumDeviceFrame></div>
        <div className="evidence-phone"><PremiumDeviceFrame><TravelSearch /></PremiumDeviceFrame></div>
        <div className="evidence-phone"><PremiumDeviceFrame><TravelPlanner /></PremiumDeviceFrame></div>
        <div className="evidence-card travel-card">
          <small>Travel México</small>
          <h3>Exploración → Búsqueda → Itinerario → Ruta → Pase</h3>
          <p>El flujo reduce la carga cognitiva mostrando primero inspiración, después opciones, luego estructura y finalmente evidencia digital.</p>
        </div>
      </div>

      <div className="evidence-showcase fashion-evidence">
        <div className="evidence-card fashion-card">
          <small>Vanessa Boutique</small>
          <h3>Acceso → Inicio → Tienda → Producto → Perfil</h3>
          <p>La experiencia comunica lujo silencioso y confianza mediante autenticidad, reputación, filtros claros y jerarquía editorial.</p>
        </div>
        <div className="evidence-phone"><PremiumDeviceFrame><VanessaOnboarding /></PremiumDeviceFrame></div>
        <div className="evidence-phone"><PremiumDeviceFrame><VanessaShop /></PremiumDeviceFrame></div>
        <div className="evidence-phone large"><PremiumDeviceFrame><VanessaProductDetail /></PremiumDeviceFrame></div>
      </div>
    </section>
  );
}

function ResearchAndInsights() {
  const travel = ["Airbnb", "Apple Maps", "Google Travel", "National Geographic"];
  const vanessa = ["Vogue", "Chanel", "Farfetch", "Net-a-Porter"];
  return (
    <section className="case-study-section research-section">
      <div className="case-copy-block">
        <p className="eyebrow">Research & Benchmark</p>
        <h2>Qué necesitábamos entender antes de diseñar.</h2>
        <p>La estética se definió desde comportamiento: cómo las personas descubren, comparan, confían y avanzan cuando la información puede sentirse excesiva o incompleta.</p>
      </div>

      <div className="research-grid-premium">
        <article className="research-panel travel-panel">
          <Photo src={assets.travel.bacalar} className="research-image" />
          <div>
            <small>Insight Travel</small>
            <h3>El usuario no empieza buscando destino. Empieza buscando inspiración.</h3>
            <p>Por eso Explorar se diseñó como una portada editorial, no como catálogo ni formulario.</p>
            <div className="benchmark-row">{travel.map((item) => <span key={item}>{item}</span>)}</div>
          </div>
        </article>

        <article className="research-panel fashion-panel">
          <Photo src={assets.fashion.campaign} className="research-image" />
          <div>
            <small>Insight Vanessa</small>
            <h3>En moda circular premium, confianza pesa tanto como deseo.</h3>
            <p>Por eso producto, perfil y tienda muestran autenticidad, reputación, estado y señales de seguridad.</p>
            <div className="benchmark-row">{vanessa.map((item) => <span key={item}>{item}</span>)}</div>
          </div>
        </article>
      </div>
    </section>
  );
}

function JourneyBlueprintSection() {
  const travelJourney = ["Inspiración", "Exploración", "Búsqueda", "Itinerario", "Ruta", "Pase"];
  const vanessaJourney = ["Acceso", "Descubrimiento", "Filtro", "Producto", "Confianza", "Perfil"];
  return (
    <section className="case-study-section journey-blueprint-section">
      <div className="case-copy-block narrow">
        <p className="eyebrow">Journey + Service Blueprint</p>
        <h2>El diseño conecta pantallas, evidencia y operación invisible.</h2>
        <p>La experiencia móvil no termina en una vista. Cada pantalla funciona como un punto de contacto dentro de un servicio que debe orientar, validar y sostener confianza.</p>
      </div>

      <div className="journey-visual-grid">
        <article>
          <h3>Travel México</h3>
          <div className="journey-line">
            {travelJourney.map((step) => <span key={step}>{step}</span>)}
          </div>
          <div className="blueprint-mini">
            <div><small>Frontstage</small><p>Explorar, buscar, planear, navegar y usar el pase.</p></div>
            <div><small>Backstage</small><p>Recomendaciones, clima, geolocalización y disponibilidad.</p></div>
            <div><small>Evidencia</small><p>Pase digital, ruta, estados, códigos y confirmaciones.</p></div>
          </div>
        </article>

        <article>
          <h3>Vanessa Boutique</h3>
          <div className="journey-line fashion-line">
            {vanessaJourney.map((step) => <span key={step}>{step}</span>)}
          </div>
          <div className="blueprint-mini">
            <div><small>Frontstage</small><p>Inicio de sesión, tienda, producto, favoritos y perfil.</p></div>
            <div><small>Backstage</small><p>Autenticación, inventario, moderación y reputación.</p></div>
            <div><small>Evidencia</small><p>Badges, métricas, estado, vendedora y autenticidad.</p></div>
          </div>
        </article>
      </div>
    </section>
  );
}

function DecisionMatrixSection() {
  const decisions = [
    ["Travel · Explorar", "Inspirar antes de pedir acción", "Progressive Disclosure", 92],
    ["Travel · Buscar", "Guiar búsqueda visualmente", "Recognition over Recall", 88],
    ["Travel · Ruta", "Mostrar sólo contexto accionable", "Minimal Design", 84],
    ["Travel · Pase", "Centralizar validación", "Trust Design", 90],
    ["Vanessa · Login", "Lujo silencioso y acceso claro", "Aesthetic Usability", 91],
    ["Vanessa · Tienda", "Filtros en retícula estable", "Consistency", 86],
    ["Vanessa · Producto", "Autenticidad antes de conversión", "Social Proof", 93],
  ];

  return (
    <section className="case-study-section decision-matrix-section">
      <div className="case-copy-block">
        <p className="eyebrow">Toma de decisiones</p>
        <h2>Cada pantalla responde a un problema, un insight y un principio UX.</h2>
      </div>

      <div className="decision-table">
        {decisions.map(([screen, decision, principle, score]) => (
          <article key={screen}>
            <div>
              <small>{screen}</small>
              <strong>{decision}</strong>
              <p>{principle}</p>
            </div>
            <div className="score-bar" style={{ "--score": `${score}%` }}><i /></div>
            <b>{score}%</b>
          </article>
        ))}
      </div>
    </section>
  );
}

function useAnimatedCounter(target, duration = 1300) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame;
    let startTime;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));

      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}

function MetricsSection() {
  const travelMetrics = [
    {
      label: "Descubrimiento",
      target: 38,
      prefix: "+",
      suffix: "%",
      base: "Antes: exploración dispersa",
      after: "Después: destinos guardados y rutas relevantes",
      description: "Valida si la nueva exploración ayuda a encontrar opciones relevantes con menos esfuerzo.",
    },
    {
      label: "Tiempo de decisión",
      target: 24,
      prefix: "-",
      suffix: "%",
      base: "Antes: comparación lenta",
      after: "Después: metadata visible y decisión más clara",
      description: "Mide si la jerarquía visual reduce el tiempo para elegir una experiencia.",
    },
    {
      label: "Uso de ruta",
      target: 31,
      prefix: "+",
      suffix: "%",
      base: "Antes: mapa poco accionable",
      after: "Después: ruta contextual con clima y paradas",
      description: "Evalúa si el usuario avanza del descubrimiento hacia planificación y navegación.",
    },
  ];

  const vanessaMetrics = [
    {
      label: "Confianza percibida",
      target: 42,
      prefix: "+",
      suffix: "%",
      base: "Antes: autenticidad poco visible",
      after: "Después: señales de confianza integradas",
      description: "Valida si la información de autenticidad, estado y vendedora reduce incertidumbre.",
    },
    {
      label: "Intención de guardar",
      target: 27,
      prefix: "+",
      suffix: "%",
      base: "Antes: descubrimiento lineal",
      after: "Después: piezas curadas y filtros claros",
      description: "Mide si la curaduría visual aumenta favoritos y reconsideración de compra.",
    },
    {
      label: "Fricción en filtros",
      target: 18,
      prefix: "-",
      suffix: "%",
      base: "Antes: controles dispersos",
      after: "Después: grid claro de Marca, Talla, Estado y Precio",
      description: "Evalúa si la estructura de filtros disminuye esfuerzo visual y errores de exploración.",
    },
  ];

  const renderMetric = (metric, index, tone) => {
    const animated = useAnimatedCounter(metric.target, 1200 + index * 180);

    return (
      <article className={`senior-metric-card ${tone}`} key={metric.label} style={{ "--delay": `${index * 120}ms` }}>
        <div className="senior-metric-header">
          <small>{metric.label}</small>
          <strong>{metric.prefix}{animated}{metric.suffix}</strong>
        </div>

        <div className="senior-metric-bar" aria-label={`${metric.label} ${metric.prefix}${metric.target}${metric.suffix}`}>
          <i style={{ width: `${animated}%` }} />
        </div>

        <div className="senior-metric-context">
          <span>{metric.base}</span>
          <span>{metric.after}</span>
        </div>

        <p>{metric.description}</p>
      </article>
    );
  };

  const renderPanel = (title, subtitle, tone, metrics, score) => {
    const scoreValue = useAnimatedCounter(score, 1400);

    return (
      <article className={`senior-dashboard-panel ${tone}`}>
        <div className="senior-panel-aura" />
        <header className="senior-panel-header">
          <div>
            <small>{subtitle}</small>
            <h3>{title}</h3>
          </div>
          <div className="senior-score-ring" style={{ "--score": `${scoreValue}%` }}>
            <svg viewBox="0 0 120 120" aria-hidden="true">
              <circle cx="60" cy="60" r="48" />
              <circle cx="60" cy="60" r="48" className="progress" />
            </svg>
            <b>{scoreValue}</b>
            <span>score</span>
          </div>
        </header>

        <div className="senior-metrics-stack">
          {metrics.map((metric, index) => renderMetric(metric, index, tone))}
        </div>
      </article>
    );
  };

  return (
    <section className="case-study-section metrics-section senior-validation-section">
      <div className="case-copy-block narrow senior-validation-heading">
        <p className="eyebrow">Validación de impacto</p>
        <h2>Cómo validaríamos que la experiencia mejora.</h2>
        <p>La medición se plantea como una hipótesis de producto: si la experiencia reduce fricción, el usuario debe decidir con mayor claridad, avanzar con menos esfuerzo y confiar más en el servicio.</p>
      </div>

      <div className="senior-dashboard-grid">
        {renderPanel("Travel México", "Exploración · decisión · ruta", "travel", travelMetrics, 82)}
        {renderPanel("Vanessa Boutique", "Confianza · descubrimiento · compra", "fashion", vanessaMetrics, 86)}
      </div>

      <div className="senior-ux-note senior-validation-note">
        <small>Lectura senior UX/UI</small>
        <p>La madurez de una interfaz se valida cuando existe una relación clara entre hipótesis, comportamiento observado y resultado de negocio. El siguiente paso sería instrumentar eventos críticos, comparar versión anterior contra versión optimizada y cruzar métricas de comprensión, confianza percibida y conversión real.</p>
      </div>
    </section>
  );
}

function ScreenGallery({ id, eyebrow, title, description, screens, tone }) {
  return (
    <section id={id} className={`gallery-section ${tone}`}>
      <div className="gallery-copy">
        <p className={`eyebrow ${tone}`}>{eyebrow}</p>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="phone-gallery">
        {screens.map((screen, index) => (
          <div className="gallery-item" key={`${id}-${screen.label}`}>
            <div className="screen-label no-number">
              <strong>{screen.label}</strong>
              <small>{screen.intent}</small>
            </div>
            <PremiumDeviceFrame className="gallery-phone">{screen.component}</PremiumDeviceFrame>
          </div>
        ))}
      </div>
    </section>
  );
}

function ClosingSection() {
  return (
    <section id="contacto" className="closing-section final-cta-section">
      <div className="contact-glow" />
      <div className="closing-content final-cta-content">
        <p className="eyebrow">Contacto</p>
        <h2>Toda experiencia necesita una arquitectura invisible.</h2>
        <p>Si tu producto combina negocio, operación, interfaz y tecnología, puedo ayudarte a transformar esa complejidad en una experiencia clara, consistente y preparada para evolucionar.</p>
        <div className="final-cta-actions">
          <a href="/contacto" className="primary-action">Ir a contacto</a>
        </div>
      </div>
    </section>
  );
}

export default function UIMobileWF1() {
  const progress = useScrollProgress();
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const onMouseMove = (event) => {
    setCursor({
      x: event.clientX / window.innerWidth - 0.5,
      y: event.clientY / window.innerHeight - 0.5,
    });
  };

  const style = useMemo(
    () => ({ "--mx": `${cursor.x * 22}px`, "--my": `${cursor.y * 22}px` }),
    [cursor]
  );

  return (
    <main className="mobile-page" onMouseMove={onMouseMove} style={style}>
      <style>{styles}</style>
      <ScrollProgress progress={progress} />
      <HeroShowcase />
      <ContextSection />
      <CaseStudyIntro />
      <ResearchAndInsights />
      <FindingsToDecisionSection />
      <DeepJourneySection />
      <ServiceBlueprintSeniorSection />
      <DecisionMatrixSection />
      <MetricsSection />
      <VisualEvidenceSection />
      <StrategySection />
      <ScreenGallery id="travel" tone="travel" eyebrow="Travel México" title="Pantallas finales del producto." description="Exploración, búsqueda, itinerario, ruta, guardados y pase se presentan como puntos de contacto de una experiencia completa." screens={travelScreens} />
      <ScreenGallery id="vanessa" tone="vanessa" eyebrow="Vanessa Boutique" title="Del descubrimiento a la decisión" description="Acceso, inicio, tienda, producto y perfil comunican lujo, confianza, autenticidad y claridad comercial." screens={vanessaScreens} />
      <ClosingSection />
    </main>
  );
}

const styles = `
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; background: #030303; }
  .mobile-page { min-height: 100vh; background: #030303; color: #f5f5f7; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif; overflow-x: hidden; }

  .project-nav { position: fixed; top: 28px; left: 50%; z-index: 100; transform: translateX(-50%); }
  .project-nav nav { height: 48px; display: flex; align-items: center; gap: 4px; padding: 4px; border-radius: 999px; border: 1px solid rgba(255,255,255,.10); background: rgba(14,14,14,.42); backdrop-filter: blur(26px); -webkit-backdrop-filter: blur(26px); box-shadow: 0 18px 70px rgba(0,0,0,.34), inset 0 1px 0 rgba(255,255,255,.07); }
  .project-nav a { height: 38px; display: inline-flex; align-items: center; justify-content: center; padding: 0 18px; border-radius: 999px; color: rgba(255,255,255,.66); text-decoration: none; font-size: 13px; font-weight: 400; letter-spacing: -.02em; transition: 220ms ease; }
  .project-nav a:hover { color: #fff; background: rgba(255,255,255,.08); }

  .hero-section, .closing-section { position: relative; min-height: 100vh; overflow: hidden; background: #030303; }
  .hero-section { display: grid; grid-template-columns: minmax(0, .78fr) minmax(620px, 1fr); align-items: center; gap: 48px; padding: 140px 6vw 90px; }
  .hero-wave-canvas { position: absolute; inset: 0; z-index: 0; width: 100%; height: 100%; opacity: .95; }
  .hero-overlay { position: absolute; inset: 0; z-index: 1; pointer-events: none; background: radial-gradient(circle at 48% 36%, rgba(255,255,255,.14), transparent 22%), radial-gradient(circle at 15% 34%, rgba(255,157,90,.16), transparent 32%), radial-gradient(circle at 82% 70%, rgba(127,231,210,.16), transparent 34%), linear-gradient(to bottom, rgba(3,3,3,.15), rgba(3,3,3,.72) 64%, #030303 100%); }
  .grain { position: absolute; inset: 0; z-index: 2; opacity: .13; pointer-events: none; mix-blend-mode: soft-light; background-image: radial-gradient(circle at 20% 20%, rgba(255,255,255,.16) 0 1px, transparent 1px), radial-gradient(circle at 80% 70%, rgba(255,255,255,.12) 0 1px, transparent 1px); background-size: 3px 3px, 4px 4px; }

  .hero-copy { position: relative; z-index: 5; max-width: 780px; }
  .eyebrow { margin: 0; color: rgba(255,255,255,.52); font-size: 11px; font-weight: 600; letter-spacing: .36em; text-transform: uppercase; }
  .eyebrow.travel { color: #bfead8; } .eyebrow.vanessa { color: #ffc1d9; }
  .hero-copy h1, .gallery-copy h2, .closing-content h2, .strategy-section h2 { margin: 32px 0 0; color: #f5f5f7; font-size: clamp(4rem, 7.6vw, 9rem); line-height: .88; letter-spacing: -.052em; font-weight: 360; }
  .hero-copy h1 span, .closing-content h2 span { display: block; color: rgba(245,245,247,.44); }
  .hero-copy p:not(.eyebrow), .gallery-copy p, .closing-content p:not(.eyebrow), .strategy-section p { max-width: 760px; margin: 36px 0 0; color: rgba(245,245,247,.70); font-size: clamp(1rem, 1.25vw, 1.18rem); line-height: 1.85; letter-spacing: -.014em; }
  .hero-actions { margin-top: 42px; display: flex; gap: 14px; flex-wrap: wrap; }
  .primary-action, .secondary-action { min-height: 52px; display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; padding: 0 26px; text-decoration: none; font-size: 14px; font-weight: 700; transition: 260ms ease; }
  .primary-action { background: #f5f5f7; color: #050505; box-shadow: 0 18px 60px rgba(255,255,255,.14); }
  .secondary-action { color: #f5f5f7; border: 1px solid rgba(255,255,255,.14); background: rgba(255,255,255,.055); backdrop-filter: blur(18px); }
  .primary-action:hover, .secondary-action:hover { transform: translateY(-3px); }

  .hero-stage { position: relative; z-index: 5; min-height: 730px; transform: translate3d(var(--mx), var(--my), 0); transition: transform 160ms ease-out; }
  .device { position: relative; width: 292px; aspect-ratio: 9 / 19.5; border-radius: 50px; padding: 10px; background: linear-gradient(145deg, rgba(255,255,255,.50), rgba(255,255,255,.08) 28%, rgba(0,0,0,.92) 72%), #111; box-shadow: 0 45px 100px rgba(0,0,0,.64), inset 0 0 0 1px rgba(255,255,255,.14); }
  .device-reflection { position: absolute; inset: 18px auto auto 36px; width: 120px; height: 300px; z-index: 3; pointer-events: none; border-radius: 999px; background: linear-gradient(90deg, rgba(255,255,255,.20), transparent); filter: blur(25px); transform: rotate(26deg); opacity: .34; }
  .device-screen { position: relative; width: 100%; height: 100%; border-radius: 40px; overflow: hidden; background: #f7f7f7; }
  .dynamic-island { position: absolute; top: 14px; left: 50%; z-index: 40; width: 92px; height: 26px; transform: translateX(-50%); border-radius: 999px; background: #030303; }
  .hero-phone { position: absolute; animation: floatPhone 5.8s ease-in-out infinite; }
  .p1 { left: 0; top: 118px; transform: rotate(-8deg); } .p2 { left: 50%; top: 0; width: 335px; z-index: 4; transform: translateX(-50%); } .p3 { right: 0; bottom: 74px; transform: rotate(7deg); animation-delay: -1.8s; }
  @keyframes floatPhone { 0%, 100% { translate: 0 0; } 50% { translate: 0 -18px; } }

  .screen { height: 100%; color: #111; }
  .travel-screen { background: linear-gradient(180deg, #ffffff, #eef9f6); }
  .fashion-screen { background: linear-gradient(180deg, #fff9fb, #f7e4ed); }
  .padded { padding: 58px 18px 82px; }
  .photo { position: relative; overflow: hidden; background-image: linear-gradient(to bottom, rgba(0,0,0,.02), rgba(0,0,0,.24)), var(--photo); background-size: cover; background-position: center; }

  .mobile-topbar { position: relative; z-index: 30; display: grid; grid-template-columns: 40px 1fr 40px; align-items: center; gap: 10px; margin-bottom: 18px; }
  .mobile-topbar button { width: 40px; height: 40px; border: 0; border-radius: 999px; background: rgba(255,255,255,.78); backdrop-filter: blur(14px); color: rgba(0,0,0,.72); font-weight: 850; }
  .mobile-topbar small, .mobile-topbar strong { display: block; text-align: center; }
  .mobile-topbar small { color: rgba(0,0,0,.42); font-size: 10px; font-weight: 800; }
  .mobile-topbar strong { margin-top: 2px; font-size: 15px; letter-spacing: -.03em; }
  .mobile-topbar.light small, .mobile-topbar.light strong { color: white; text-shadow: 0 2px 12px rgba(0,0,0,.35); }

  .mobile-tabbar { position: absolute; left: 12px; right: 12px; bottom: 12px; z-index: 50; height: 64px; display: grid; grid-template-columns: repeat(5, 1fr); align-items: center; gap: 4px; padding: 7px; border-radius: 24px; background: rgba(255,255,255,.78); backdrop-filter: blur(22px); box-shadow: 0 18px 50px rgba(0,0,0,.12); }
  .mobile-tabbar button { height: 50px; border: 0; border-radius: 18px; background: transparent; color: rgba(0,0,0,.42); font-size: 8.5px; font-weight: 800; }
  .mobile-tabbar button .icon { display: block; margin-bottom: 4px; font-size: 16px; }
  .mobile-tabbar button.active { color: #111; background: rgba(255,255,255,.88); }
  .mobile-tabbar.travel button.active .icon { color: #28a88e; } .mobile-tabbar.fashion button.active .icon { color: #d77fa2; }

  .onboarding-editorial { min-height: 360px; margin: 0 -4px; border-radius: 38px; padding: 22px; display: flex; flex-direction: column; justify-content: flex-end; color: white; box-shadow: inset 0 -140px 100px rgba(0,0,0,.45); }
  .onboarding-editorial span, .explore-hero span, .search-editorial-card span, .booking-preview span, .saved-hero span, .fashion-editorial span, .fashion-cover-full span { width: fit-content; border-radius: 999px; background: rgba(255,255,255,.82); color: #247d70; padding: 10px 14px; font-size: 11px; font-weight: 850; }
  .onboarding-editorial h3, .explore-hero h3, .search-editorial-card h3, .booking-preview h3, .saved-hero h3, .fashion-cover-full h3, .fashion-editorial h3, .fashion-product-sheet h3, .seller-card h3, .travel-pass h3, .planner-hero h3, .route-card h3 { margin: 16px 0 0; font-size: 28px; line-height: .94; letter-spacing: -.04em; }
  .story-card, .floating-story { position: relative; z-index: 3; margin: -42px 18px 0; border-radius: 30px; padding: 18px; background: rgba(255,255,255,.88); backdrop-filter: blur(22px); box-shadow: 0 24px 70px rgba(0,0,0,.12); }
  .story-card small, .booking-card small, .info-block small, .travel-pass small, .fashion-product-sheet small, .seller-card small { color: rgba(0,0,0,.45); font-size: 11px; font-weight: 850; }
  .story-card p, .planner-hero p, .route-card p, .seller-card p, .fashion-product-sheet p { color: rgba(0,0,0,.56); font-size: 13px; line-height: 1.5; }
  .main-btn { width: 100%; height: 52px; margin-top: 16px; border: 0; border-radius: 18px; color: white; font-weight: 850; }
  .main-btn.orange { background: #ff9658; } .main-btn.mint { background: #42c7ad; } .main-btn.pink { background: #d77fa2; } .main-btn.outline-pink { background: transparent; color: #9f4e6d; border: 1px solid rgba(215,127,162,.28); }
  .dots, .progress { display: flex; gap: 7px; margin-top: 16px; }
  .dots i, .progress i { height: 7px; flex: 1; border-radius: 999px; background: #bfead8; }

  .explore-hero, .search-editorial-card, .booking-preview, .saved-hero, .fashion-editorial { min-height: 270px; border-radius: 34px; padding: 20px; display: flex; flex-direction: column; justify-content: flex-end; color: white; box-shadow: inset 0 -130px 100px rgba(0,0,0,.46), 0 22px 70px rgba(0,0,0,.12); }
  .hero-meta { display: flex; justify-content: space-between; align-items: center; }
  .explore-hero p, .search-editorial-card p, .booking-preview p, .saved-hero p { color: rgba(255,255,255,.78); font-size: 13px; line-height: 1.5; }
  .smart-chips, .metric-row, .route-tags, .segment-control, .seller-trust { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
  .smart-chips span, .metric-row span, .route-tags span, .segment-control span { border-radius: 999px; background: rgba(255,255,255,.76); padding: 10px 13px; color: rgba(0,0,0,.55); font-size: 11px; font-weight: 850; }
  .mini-destination-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 14px; }
  .mini-destination-grid .photo { min-height: 116px; border-radius: 24px; box-shadow: inset 0 -76px 62px rgba(0,0,0,.40); }
  .mini-destination-grid b, .mini-destination-grid small { position: absolute; left: 12px; right: 12px; color: white; }
  .mini-destination-grid b { bottom: 28px; font-size: 12px; } .mini-destination-grid small { bottom: 12px; font-size: 10px; opacity: .78; }
  .search-input { height: 52px; border-radius: 20px; background: rgba(255,255,255,.80); display: flex; align-items: center; gap: 8px; padding: 0 16px; color: rgba(0,0,0,.42); font-size: 13px; }
  .discovery-stack { margin-top: 16px; } .smart-chips.elevated { margin-top: -16px; position: relative; z-index: 3; padding: 0 12px; }

  .premium-list-row, .fashion-product-card, .info-block, .booking-card, .planner-hero, .seller-card { margin-top: 14px; border-radius: 24px; background: rgba(255,255,255,.80); padding: 13px; }
  .premium-list-row, .fashion-product-card { display: grid; grid-template-columns: 68px 1fr 32px; gap: 13px; align-items: center; }
  .fashion-product-card { grid-template-columns: 68px 1fr; }
  .premium-list-row .photo, .fashion-product-card .photo { width: 68px; height: 68px; border-radius: 20px; }
  .premium-list-row strong, .premium-list-row small, .fashion-product-card small, .fashion-product-card strong, .fashion-product-card span, .fashion-product-card b, .booking-card small, .booking-card strong { display: block; }
  .premium-list-row small, .fashion-product-card small, .fashion-product-card span, .booking-card small { margin-top: 4px; color: rgba(0,0,0,.45); font-size: 11px; }
  .premium-list-row button { width: 32px; height: 32px; border: 0; border-radius: 999px; background: rgba(66,199,173,.20); color: #287967; }
  .booking-preview.refined { min-height: 170px; } .featured-booking { background: radial-gradient(circle at 90% 12%, rgba(255,150,88,.22), transparent 30%), rgba(255,255,255,.84); }
  .booking-card strong { margin-top: 6px; font-size: 18px; } .booking-card em { display: block; margin-top: 6px; color: #287967; font-style: normal; font-size: 11px; font-weight: 800; }
  .booking-card.horizontal { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
  .verification-badge { display: inline-flex; align-items: center; gap: 6px; width: fit-content; border-radius: 999px; padding: 8px 10px; font-size: 10px; font-weight: 850; white-space: nowrap; }
  .verification-badge.mint { background: rgba(191,234,216,.58); color: #287967; } .verification-badge.sand { background: rgba(255,229,187,.72); color: #9b5b28; } .verification-badge.pink { background: rgba(255,193,217,.62); color: #9f4e6d; }
  .planner-hero.refined { min-height: 150px; padding: 20px; background: radial-gradient(circle at 85% 12%, rgba(66,199,173,.18), transparent 32%), rgba(255,255,255,.84); }
  .visual-timeline article { display: grid; grid-template-columns: 68px 1fr; gap: 12px; align-items: center; margin-top: 12px; border-radius: 24px; background: rgba(255,255,255,.80); padding: 12px; }
  .visual-timeline .photo { width: 68px; height: 68px; border-radius: 20px; } .visual-timeline span, .visual-timeline small { display: block; color: rgba(0,0,0,.45); font-size: 11px; } .visual-timeline strong { display: block; margin: 4px 0; }

  .map-screen { position: relative; } .map-bg { height: 100%; padding: 58px 18px; } .refined-map { filter: saturate(1.15) contrast(1.04); }
  .route-line { position: absolute; left: 27%; top: 44%; width: 46%; height: 3px; border-radius: 999px; background: linear-gradient(90deg, #42c7ad, #ff9658); transform: rotate(-22deg); box-shadow: 0 0 26px rgba(66,199,173,.45); }
  .map-pin { position: absolute; border-radius: 999px; padding: 10px 14px; background: rgba(255,255,255,.88); color: #247d70; font-size: 11px; font-weight: 850; box-shadow: 0 14px 40px rgba(0,0,0,.16); }
  .pin-a { left: 40%; top: 34%; } .pin-b { left: 18%; top: 56%; } .pin-c { right: 14%; top: 48%; }
  .weather-layer { position: absolute; top: 118px; right: 18px; border-radius: 999px; padding: 10px 13px; background: rgba(255,255,255,.84); color: #9b5b28; font-size: 11px; font-weight: 850; }
  .route-card { position: absolute; left: 18px; right: 18px; bottom: 82px; z-index: 4; border-radius: 30px; background: rgba(255,255,255,.88); backdrop-filter: blur(22px); padding: 18px; box-shadow: 0 24px 70px rgba(0,0,0,.16); }
  .route-card p { color: rgba(0,0,0,.56); font-size: 13px; line-height: 1.5; }
  .saved-hero.refined { min-height: 305px; }

  .pass-screen { background: radial-gradient(circle at 50% 12%, rgba(255,255,255,.85), transparent 26%), linear-gradient(180deg, #fff, #edf9f6); }
  .travel-pass { position: relative; overflow: hidden; min-height: 520px; margin-top: 8px; border-radius: 38px; background: linear-gradient(145deg, rgba(255,255,255,.88), rgba(255,255,255,.50)), #f8f8f5; box-shadow: 0 30px 90px rgba(0,0,0,.16); }
  .pass-light { position: absolute; inset: -30% -40% auto; height: 260px; background: linear-gradient(90deg, transparent, rgba(255,255,255,.85), transparent); transform: rotate(-18deg); opacity: .8; }
  .pass-photo { height: 170px; border-radius: 0 0 34px 34px; box-shadow: inset 0 -80px 80px rgba(0,0,0,.34); }
  .pass-holo { position: absolute; right: 18px; bottom: 18px; width: 52px; height: 52px; border-radius: 20px; display: grid; place-items: center; color: white; font-weight: 950; background: radial-gradient(circle at 30% 20%, rgba(255,255,255,.8), transparent 26%), linear-gradient(145deg, #ff9658, #42c7ad); }
  .pass-body { padding: 18px; } .pass-status-row, .pass-footer { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  .pass-status-row > span { color: rgba(0,0,0,.44); font-size: 11px; font-weight: 850; letter-spacing: .05em; text-transform: uppercase; }
  .travel-pass h3 { margin-top: 18px; font-size: 34px; } .travel-pass p { color: rgba(0,0,0,.54); font-size: 13px; }
  .pass-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 18px; }
  .pass-grid div { min-height: 72px; border-radius: 22px; background: rgba(255,255,255,.74); padding: 12px; } .pass-grid strong { display: block; margin-top: 6px; font-size: 12px; }
  .small-qr { display: grid; grid-template-columns: repeat(5, 1fr); gap: 3px; width: 58px; height: 58px; border-radius: 14px; background: #111; padding: 8px; }
  .small-qr i { border-radius: 1px; background: rgba(255,255,255,.18); } .small-qr i.on { background: #fff; }

  .fashion-onboarding { position: relative; } .fashion-cover-full { height: 100%; padding: 58px 18px 92px; display: flex; flex-direction: column; justify-content: flex-end; box-shadow: inset 0 -260px 180px rgba(0,0,0,.62); color: white; }
  .fashion-cover-full span, .fashion-editorial span { color: #9f4e6d; } .fashion-editorial-copy { margin-bottom: 34px; }
  .fashion-editorial-copy h3 { max-width: 230px; font-size: 34px; } .fashion-editorial-copy p { color: rgba(255,255,255,.78); font-size: 13px; line-height: 1.5; }
  .floating-fashion-cta { position: absolute; left: 18px; right: 18px; bottom: 90px; width: auto; z-index: 20; }
  .fashion-product-hero { height: 348px; padding: 58px 18px; box-shadow: inset 0 -120px 90px rgba(0,0,0,.28); }
  .fashion-product-sheet { position: relative; z-index: 4; margin: -52px 18px 82px; border-radius: 34px; background: rgba(255,255,255,.92); backdrop-filter: blur(22px); padding: 20px; box-shadow: 0 24px 70px rgba(0,0,0,.12); }
  .fashion-product-sheet p { color: rgba(0,0,0,.56); font-size: 13px; line-height: 1.5; }
  .lux-price { margin-top: 16px; border-radius: 24px; background: rgba(255,245,250,.92); padding: 14px; display: flex; justify-content: space-between; gap: 12px; }
  .lux-price strong { display: block; margin-top: 5px; color: #d77fa2; font-size: 24px; } .lux-price span { color: #9f4e6d; font-size: 11px; font-weight: 850; }
  .seller-card { text-align: center; padding: 22px; background: rgba(255,255,255,.84); }
  .seller-avatar { width: 100px; height: 100px; margin: 8px auto 18px; border-radius: 50%; background: linear-gradient(135deg, rgba(215,127,162,.42), rgba(255,255,255,.18)), var(--seller); background-size: cover; background-position: center; }
  .seller-avatar.vanessa, .seller-avatar.brand-profile { --seller: url("https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=90"); }
  .seller-card p { color: rgba(0,0,0,.56); font-size: 13px; line-height: 1.5; } .seller-trust { justify-content: center; }
  .profile-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 14px; }
  .profile-stats div { border-radius: 22px; background: rgba(255,255,255,.78); padding: 14px; text-align: center; } .profile-stats strong, .profile-stats span { display: block; } .profile-stats strong { font-size: 22px; color: #d77fa2; } .profile-stats span { margin-top: 4px; font-size: 10px; color: rgba(0,0,0,.45); font-weight: 800; }
  .fashion-editorial { min-height: 255px; } .fashion-search { margin-top: 14px; } .fashion-chips span, .segment-control span { background: rgba(255,255,255,.80); } .fashion-product-card b { margin-top: 6px; color: #d77fa2; font-size: 18px; }

  .strategy-section { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; padding: 130px 6vw 40px; background: #030303; }
  .strategy-section article { min-height: 500px; border-radius: 46px; border: 1px solid rgba(255,255,255,.09); background: radial-gradient(circle at 70% 20%, rgba(255,157,90,.13), transparent 28%), rgba(255,255,255,.035); padding: 36px; }
  .strategy-section span { color: rgba(255,255,255,.42); font-size: 12px; font-weight: 850; letter-spacing: .2em; } .strategy-section h2 { margin-top: 110px; font-size: clamp(2.4rem, 3.4vw, 4.3rem); }
  .gallery-section { padding: 138px 6vw; background: #030303; } .gallery-copy { max-width: 1040px; margin-bottom: 80px; } .gallery-copy h2, .closing-content h2 { font-size: clamp(3.2rem, 6vw, 7rem); }
  .phone-gallery { display: flex; gap: 36px; overflow-x: auto; padding: 22px 0 54px; scroll-snap-type: x proximity; } .gallery-item { min-width: 310px; scroll-snap-align: start; }
  .screen-label { display: grid; grid-template-columns: 42px 1fr; gap: 10px 14px; margin-bottom: 18px; } .screen-label span { grid-row: span 2; width: 42px; height: 42px; border-radius: 16px; display: grid; place-items: center; border: 1px solid rgba(255,255,255,.10); background: rgba(255,255,255,.045); color: rgba(255,255,255,.64); font-size: 12px; font-weight: 850; } .screen-label strong { color: white; font-size: 18px; } .screen-label small { color: rgba(255,255,255,.42); font-size: 12px; } .gallery-phone { width: 292px; }
  .closing-section { display: grid; place-items: center; padding: 120px 28px; text-align: center; } .closing-content { position: relative; z-index: 4; max-width: 980px; } .closing-content p:not(.eyebrow) { margin-left: auto; margin-right: auto; } .closing-content .primary-action { margin-top: 42px; }

  /* Refinamiento premium aplicado */
  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }

  .icon svg {
    width: 17px;
    height: 17px;
    display: block;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .mobile-tabbar button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
  }

  .mobile-tabbar button.active {
    box-shadow: inset 0 1px 0 rgba(255,255,255,.78), 0 10px 24px rgba(0,0,0,.08);
  }

  .explore-hero.cinematic {
    min-height: 330px;
    padding: 18px;
    justify-content: space-between;
    background-position: center 34%;
    box-shadow:
      inset 0 -170px 120px rgba(0,0,0,.58),
      inset 0 80px 80px rgba(0,0,0,.16),
      0 28px 90px rgba(0,0,0,.14);
  }

  .destination-title-block {
    margin-top: auto;
  }

  .destination-title-block small {
    color: rgba(255,255,255,.72);
    font-size: 11px;
    font-weight: 850;
    letter-spacing: .08em;
    text-transform: uppercase;
  }

  .travel-quick-facts {
    display: flex;
    gap: 8px;
    margin-top: 14px;
    flex-wrap: wrap;
  }

  .travel-quick-facts span {
    border-radius: 999px;
    background: rgba(255,255,255,.18);
    color: white;
    border: 1px solid rgba(255,255,255,.22);
    backdrop-filter: blur(16px);
    padding: 9px 11px;
    font-size: 10px;
    font-weight: 850;
  }

  .premium-filter {
    margin-top: 16px;
  }

  .mini-destination-grid.editorial .photo {
    min-height: 128px;
  }

  .premium-search {
    box-shadow: inset 0 1px 0 rgba(255,255,255,.7);
  }

  .cinematic-search {
    min-height: 250px;
    background-position: center 40%;
  }

  .premium-recommendations {
    padding-bottom: 2px;
  }

  .premium-list-row {
    box-shadow: inset 0 1px 0 rgba(255,255,255,.55);
  }

  .route-line-main {
    z-index: 2;
  }

  .route-line-secondary {
    left: 35%;
    top: 52%;
    width: 30%;
    transform: rotate(18deg);
    opacity: .72;
    z-index: 2;
  }

  .traffic-layer {
    position: absolute;
    left: 18px;
    top: 170px;
    max-width: 180px;
    border-radius: 999px;
    padding: 10px 13px;
    background: rgba(255,255,255,.84);
    color: #287967;
    font-size: 11px;
    font-weight: 850;
    box-shadow: 0 14px 40px rgba(0,0,0,.14);
  }

  .map-pin,
  .weather-layer {
    z-index: 3;
  }

  .route-card.refined {
    border: 1px solid rgba(255,255,255,.52);
  }

  .final-pass {
    border: 1px solid rgba(255,255,255,.62);
  }

  .pass-holo {
    box-shadow: 0 18px 50px rgba(255,150,88,.32);
  }

  .small-qr {
    transform: scale(.86);
    transform-origin: left center;
    opacity: .88;
  }

  .fashion-product-hero.editorial-product {
    height: 380px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-position: center 48%;
    box-shadow:
      inset 0 -160px 120px rgba(0,0,0,.46),
      0 28px 90px rgba(0,0,0,.14);
  }

  .fashion-hero-caption {
    color: white;
    margin-top: auto;
    max-width: 220px;
  }

  .fashion-hero-caption span {
    width: fit-content;
    border-radius: 999px;
    background: rgba(255,255,255,.84);
    color: #9f4e6d;
    padding: 10px 14px;
    font-size: 11px;
    font-weight: 850;
  }

  .fashion-hero-caption h3 {
    margin: 14px 0 0;
    font-size: 30px;
    line-height: .94;
    letter-spacing: -.04em;
  }

  .fashion-product-sheet.luxury-commerce {
    margin-top: -64px;
    border: 1px solid rgba(255,255,255,.65);
  }

  .condition-panel {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-top: 14px;
  }

  .condition-panel div {
    border-radius: 20px;
    background: rgba(255,245,250,.94);
    padding: 12px;
  }

  .condition-panel small,
  .condition-panel strong {
    display: block;
  }

  .condition-panel small {
    color: rgba(0,0,0,.44);
    font-size: 10px;
    font-weight: 850;
  }

  .condition-panel strong {
    margin-top: 5px;
    color: #111;
    font-size: 12px;
  }

  @media (max-width: 1200px) { .hero-section { grid-template-columns: 1fr; } .hero-stage { min-height: 760px; } .strategy-section { grid-template-columns: 1fr; } }
  @media (max-width: 760px) { .project-nav { top: 16px; width: calc(100% - 24px); } .project-nav nav { justify-content: center; overflow-x: auto; } .project-nav a { padding: 0 10px; font-size: 11px; } .hero-copy h1, .gallery-copy h2, .closing-content h2 { font-size: 4rem; } .hero-stage { min-height: 680px; } .hero-phone { width: 235px; } .p2 { width: 250px; } .p1 { left: 0; top: 90px; } .p3 { right: 0; bottom: 70px; } .gallery-item { min-width: 265px; } .gallery-phone { width: 245px; } }

  /* Corrección final Apple / Chanel / Airbnb */
  .icon { display: inline-flex; align-items: center; justify-content: center; line-height: 1; }
  .icon svg { width: 17px; height: 17px; display: block; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }

  .mobile-tabbar {
    height: 66px;
    padding: 7px;
    border-radius: 26px;
    background: rgba(255,255,255,.82);
    border: 1px solid rgba(255,255,255,.62);
    box-shadow: 0 20px 60px rgba(0,0,0,.16), inset 0 1px 0 rgba(255,255,255,.78);
  }

  .mobile-tabbar button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    height: 52px;
    min-width: 0;
  }

  .mobile-tabbar button .icon {
    font-size: 0;
  }

  .mobile-tabbar button.active {
    background: rgba(255,255,255,.92);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.9), 0 10px 24px rgba(0,0,0,.08);
  }

  .travel-onboarding-premium {
    position: relative;
    padding: 0 18px 84px;
  }

  .travel-onboarding-cover {
    height: 74%;
    min-height: 470px;
    margin: 0 -18px;
    padding: 58px 18px 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: white;
    box-shadow: inset 0 -220px 150px rgba(0,0,0,.56);
  }

  .travel-onboarding-copy {
    max-width: 245px;
  }

  .travel-onboarding-copy span,
  .shop-editorial-hero span,
  .fashion-hero-caption span {
    display: inline-flex;
    border-radius: 999px;
    padding: 10px 14px;
    background: rgba(255,255,255,.86);
    backdrop-filter: blur(18px);
    font-size: 11px;
    font-weight: 850;
  }

  .travel-onboarding-copy span {
    color: #247d70;
  }

  .travel-onboarding-copy h3 {
    margin: 16px 0 0;
    font-size: 36px;
    line-height: .92;
    letter-spacing: -.045em;
  }

  .travel-onboarding-copy p {
    margin: 12px 0 0;
    color: rgba(255,255,255,.78);
    font-size: 13px;
    line-height: 1.55;
  }

  .travel-onboarding-glass {
    position: relative;
    z-index: 6;
    margin: -44px 0 0;
    border-radius: 30px;
    padding: 18px;
    background: rgba(255,255,255,.22);
    border: 1px solid rgba(255,255,255,.38);
    backdrop-filter: blur(24px);
    color: white;
    box-shadow: 0 24px 70px rgba(0,0,0,.18);
  }

  .travel-onboarding-glass small,
  .travel-onboarding-glass strong {
    display: block;
  }

  .travel-onboarding-glass small {
    color: rgba(255,255,255,.68);
    font-size: 11px;
    font-weight: 850;
  }

  .travel-onboarding-glass strong {
    margin-top: 6px;
    font-size: 15px;
    line-height: 1.35;
  }

  .onboarding-progress {
    display: flex;
    gap: 6px;
    margin-top: 16px;
  }

  .onboarding-progress i {
    height: 6px;
    flex: 1;
    border-radius: 999px;
    background: rgba(255,255,255,.38);
  }

  .onboarding-progress i:first-child {
    background: white;
  }

  .onboarding-cta {
    position: relative;
    z-index: 6;
    margin-top: 14px;
  }

  .explore-hero.cinematic {
    min-height: 338px;
    padding: 18px;
    justify-content: space-between;
    background-position: center 34%;
    box-shadow:
      inset 0 -180px 130px rgba(0,0,0,.60),
      inset 0 80px 80px rgba(0,0,0,.18),
      0 28px 90px rgba(0,0,0,.14);
  }

  .destination-title-block small {
    color: rgba(255,255,255,.72);
    font-size: 10px;
    font-weight: 850;
    letter-spacing: .08em;
    text-transform: uppercase;
  }

  .travel-quick-facts {
    display: flex;
    gap: 8px;
    margin-top: 14px;
    flex-wrap: wrap;
  }

  .travel-quick-facts span {
    border-radius: 999px;
    background: rgba(255,255,255,.18);
    color: white;
    border: 1px solid rgba(255,255,255,.22);
    backdrop-filter: blur(16px);
    padding: 9px 11px;
    font-size: 10px;
    font-weight: 850;
  }

  .search-editorial-card.cinematic-search {
    min-height: 250px;
    margin-top: 16px;
    background-position: center 40%;
  }

  .search-filters {
    margin-top: -16px;
    position: relative;
    z-index: 4;
    padding: 0 12px;
  }

  .route-line-main { z-index: 2; }
  .route-line-secondary {
    left: 35%;
    top: 52%;
    width: 30%;
    transform: rotate(18deg);
    opacity: .72;
    z-index: 2;
  }

  .traffic-layer {
    position: absolute;
    left: 18px;
    top: 170px;
    max-width: 190px;
    border-radius: 999px;
    padding: 10px 13px;
    background: rgba(255,255,255,.86);
    color: #287967;
    font-size: 11px;
    font-weight: 850;
    box-shadow: 0 14px 40px rgba(0,0,0,.14);
    z-index: 3;
  }

  .route-card.refined {
    border: 1px solid rgba(255,255,255,.55);
  }

  .final-pass {
    border: 1px solid rgba(255,255,255,.62);
  }

  .small-qr {
    transform: scale(.84);
    transform-origin: left center;
    opacity: .88;
  }

  .vanessa-shop-premium .shop-editorial-hero {
    min-height: 190px;
    border-radius: 34px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    color: white;
    box-shadow: inset 0 -120px 90px rgba(0,0,0,.48), 0 20px 70px rgba(215,127,162,.14);
  }

  .shop-editorial-hero span {
    color: #9f4e6d;
  }

  .shop-editorial-hero h3 {
    margin: 14px 0 0;
    font-size: 27px;
    line-height: .94;
    letter-spacing: -.04em;
  }

  .luxury-segments {
    margin-top: 14px;
  }

  .shop-products .fashion-product-card {
    background: rgba(255,255,255,.88);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.7);
  }

  .fashion-product-hero.editorial-product {
    height: 390px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-position: center 48%;
    box-shadow: inset 0 -170px 126px rgba(0,0,0,.48), 0 28px 90px rgba(0,0,0,.14);
  }

  .fashion-hero-caption {
    color: white;
    margin-top: auto;
    max-width: 230px;
  }

  .fashion-hero-caption span {
    color: #9f4e6d;
  }

  .fashion-hero-caption h3 {
    margin: 14px 0 0;
    font-size: 31px;
    line-height: .94;
    letter-spacing: -.04em;
  }

  .fashion-product-sheet.luxury-commerce {
    margin-top: -70px;
    border: 1px solid rgba(255,255,255,.68);
  }

  .condition-panel {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-top: 14px;
  }

  .condition-panel div {
    border-radius: 20px;
    background: rgba(255,245,250,.94);
    padding: 12px;
  }

  .condition-panel small,
  .condition-panel strong {
    display: block;
  }

  .condition-panel small {
    color: rgba(0,0,0,.44);
    font-size: 10px;
    font-weight: 850;
  }

  .condition-panel strong {
    margin-top: 5px;
    color: #111;
    font-size: 12px;
  }

  .seller-card.luxury-seller,
  .seller-card.luxury-profile {
    border: 1px solid rgba(255,255,255,.66);
    box-shadow: 0 22px 70px rgba(215,127,162,.12);
  }



  /* ===== DIRECCIÓN FINAL APPLE + AIRBNB + CHANEL ===== */
  .screen { position: relative; font-variant-numeric: tabular-nums; }
  .padded { padding: 64px 20px 92px; }
  .mobile-topbar { margin-bottom: 24px; }
  .mobile-topbar button { min-width: 44px; width: 44px; height: 44px; box-shadow: inset 0 1px 0 rgba(255,255,255,.75), 0 12px 28px rgba(0,0,0,.08); }
  .mobile-topbar strong { font-size: 15px; font-weight: 760; }
  .mobile-topbar small { font-size: 10px; letter-spacing: .02em; }

  .mobile-tabbar { left: 14px; right: 14px; bottom: 14px; height: 74px; padding: 8px; gap: 6px; border-radius: 28px; background: rgba(255,255,255,.82); box-shadow: 0 24px 70px rgba(0,0,0,.16), inset 0 1px 0 rgba(255,255,255,.86); }
  .mobile-tabbar button { min-width: 0; height: 58px; border-radius: 20px; font-size: 9.5px; font-weight: 780; letter-spacing: -.025em; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; white-space: nowrap; overflow: hidden; }
  .mobile-tabbar button .icon { margin: 0; }
  .mobile-tabbar button span { display: block; max-width: 100%; overflow: hidden; text-overflow: ellipsis; }
  .mobile-tabbar button.active { background: rgba(255,255,255,.96); box-shadow: inset 0 1px 0 rgba(255,255,255,.95), 0 10px 22px rgba(0,0,0,.08); }

  .travel-screen { background: linear-gradient(180deg, #fbfffd 0%, #edf8f5 100%); }
  .fashion-screen { background: linear-gradient(180deg, #fffafd 0%, #f7e7ef 100%); }
  .photo { background-image: linear-gradient(180deg, rgba(0,0,0,.04), rgba(0,0,0,.32)), var(--photo); }

  .travel-onboarding-cover, .explore-hero, .search-editorial-card, .saved-hero, .booking-preview, .fashion-editorial, .shop-editorial-hero { border-radius: 36px; box-shadow: inset 0 -150px 110px rgba(0,0,0,.46), 0 24px 80px rgba(0,0,0,.14); }
  .travel-onboarding-cover { min-height: 430px; margin: 0; padding: 64px 20px 28px; display: flex; flex-direction: column; justify-content: space-between; color: #fff; }
  .travel-onboarding-copy span, .destination-gradient-copy small, .fashion-login-brand span { display: inline-flex; width: fit-content; border-radius: 999px; padding: 10px 14px; background: rgba(255,255,255,.78); color: #247d70; font-size: 11px; font-weight: 850; backdrop-filter: blur(18px); }
  .travel-onboarding-copy h3, .destination-gradient-copy h3 { margin: 16px 0 0; font-size: 34px; line-height: .94; letter-spacing: -.04em; }
  .travel-onboarding-copy p { max-width: 220px; color: rgba(255,255,255,.80); font-size: 13px; line-height: 1.5; }
  .travel-onboarding-glass { margin: -36px 18px 0; position: relative; z-index: 4; border-radius: 30px; padding: 18px; background: rgba(255,255,255,.78); backdrop-filter: blur(26px); box-shadow: 0 24px 70px rgba(0,0,0,.14); }
  .travel-onboarding-glass small, .travel-onboarding-glass strong { display: block; }
  .travel-onboarding-glass small { color: rgba(0,0,0,.44); font-size: 11px; font-weight: 850; }
  .travel-onboarding-glass strong { margin-top: 8px; font-size: 15px; line-height: 1.35; letter-spacing: -.035em; }
  .onboarding-progress { display: flex; gap: 8px; margin-top: 16px; }
  .onboarding-progress i { height: 6px; flex: 1; border-radius: 999px; background: rgba(66,199,173,.38); }
  .onboarding-progress i:first-child { background: #42c7ad; }
  .onboarding-cta { width: calc(100% - 40px); margin-left: 20px; margin-top: 16px; }

  .destination-title-block h3, .search-editorial-card h3, .fashion-editorial h3, .shop-editorial-hero h3 { font-size: 29px; line-height: .96; }
  .travel-quick-facts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 18px; }
  .travel-quick-facts span { display: grid; place-items: center; min-height: 38px; border-radius: 16px; background: rgba(255,255,255,.78); color: rgba(0,0,0,.62); font-size: 11px; font-weight: 850; backdrop-filter: blur(18px); }
  .premium-filter, .search-filters, .fashion-chips, .refined-filters { padding: 4px; border-radius: 22px; background: rgba(255,255,255,.58); backdrop-filter: blur(18px); }
  .smart-chips span, .segment-control span { box-shadow: inset 0 1px 0 rgba(255,255,255,.8); }
  .editorial .photo, .product-grid-refined .photo { min-height: 132px; }

  .destination-screen-refined { padding-bottom: 92px; background: #eef8f5; }
  .destination-immersive-hero { height: 420px; padding: 64px 20px 28px; color: #fff; box-shadow: inset 0 -180px 120px rgba(0,0,0,.52); }
  .destination-gradient-copy { position: absolute; left: 20px; right: 20px; bottom: 34px; }
  .destination-sheet-emerge { position: relative; z-index: 3; margin: -42px 18px 0; border-radius: 32px; padding: 18px; background: rgba(255,255,255,.86); backdrop-filter: blur(26px); box-shadow: 0 28px 80px rgba(0,0,0,.16); }
  .destination-sheet-emerge p { margin: 16px 0 0; color: rgba(0,0,0,.58); font-size: 13px; line-height: 1.55; }
  .elevated-facts { grid-template-columns: repeat(4, 1fr); margin-top: 0; }

  .premium-search, .integrated-search { box-shadow: inset 0 1px 0 rgba(255,255,255,.82), 0 14px 36px rgba(0,0,0,.07); }
  .premium-list-row, .fashion-product-card, .booking-card, .visual-timeline article, .seller-card, .planner-hero { background: rgba(255,255,255,.82); backdrop-filter: blur(18px); box-shadow: inset 0 1px 0 rgba(255,255,255,.82), 0 16px 42px rgba(0,0,0,.07); }
  .route-card.refined { bottom: 96px; padding: 20px; border-radius: 32px; }
  .traffic-layer { position: absolute; left: 18px; top: 168px; border-radius: 999px; padding: 10px 13px; background: rgba(255,255,255,.84); color: #287967; font-size: 11px; font-weight: 850; }

  .travel-pass.final-pass { border-radius: 40px; background: radial-gradient(circle at 12% 0%, rgba(255,255,255,.95), transparent 34%), linear-gradient(145deg, rgba(255,255,255,.96), rgba(232,246,241,.70)); box-shadow: 0 34px 100px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.94); }
  .small-qr { width: 72px; height: 72px; grid-template-columns: repeat(5, 1fr); background: linear-gradient(145deg, #080808, #1d1d1f); box-shadow: inset 0 1px 0 rgba(255,255,255,.12); }
  .small-qr i { border-radius: 2px; }

  .fashion-login-screen { padding-bottom: 92px; }
  .fashion-login-hero { height: 296px; padding: 64px 20px 24px; color: #fff; box-shadow: inset 0 -150px 110px rgba(0,0,0,.58); }
  .fashion-login-brand { position: absolute; left: 20px; right: 20px; bottom: 24px; }
  .fashion-login-brand span { color: #8d3f5e; }
  .fashion-login-brand h3 { max-width: 250px; margin: 14px 0 0; font-size: 29px; line-height: .96; letter-spacing: -.055em; }
  .login-panel { position: relative; z-index: 4; margin: -34px 18px 0; border-radius: 34px; padding: 20px; background: rgba(255,255,255,.92); backdrop-filter: blur(28px); box-shadow: 0 28px 90px rgba(68,23,42,.16), inset 0 1px 0 rgba(255,255,255,.9); }
  .login-heading small { color: rgba(0,0,0,.42); font-size: 11px; font-weight: 850; }
  .login-heading h3 { margin: 6px 0 16px; font-size: 28px; line-height: 1; letter-spacing: -.055em; }
  .login-field { display: block; margin-top: 12px; }
  .login-field span { display: block; margin-bottom: 8px; color: rgba(0,0,0,.46); font-size: 11px; font-weight: 850; }
  .login-field input { width: 100%; height: 48px; border: 0; border-radius: 18px; padding: 0 14px; background: rgba(247,231,239,.72); color: #111; outline: none; font: inherit; font-size: 13px; }
  .login-link { width: 100%; height: 34px; border: 0; background: transparent; color: #9f4e6d; font-size: 12px; font-weight: 800; }
  .login-divider { display: flex; align-items: center; gap: 12px; margin: 10px 0; color: rgba(0,0,0,.34); font-size: 10px; font-weight: 850; }
  .login-divider:before, .login-divider:after { content: ''; height: 1px; flex: 1; background: rgba(0,0,0,.08); }
  .social-login-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .social-login-row button { height: 46px; border: 0; border-radius: 18px; background: rgba(255,255,255,.86); box-shadow: inset 0 1px 0 rgba(255,255,255,.9), 0 10px 28px rgba(0,0,0,.06); color: #111; font-weight: 850; }
  .register-copy { margin: 14px 0 0; text-align: center; color: rgba(0,0,0,.50); font-size: 12px; }
  .register-copy strong { color: #9f4e6d; }

  .vanessa-home-marketplace .fashion-editorial { margin-top: 16px; }
  .marketplace-hero p { color: rgba(255,255,255,.78); font-size: 13px; line-height: 1.45; }
  .market-strip { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 14px; }
  .market-strip div, .category-row button { border: 0; border-radius: 22px; padding: 14px; background: rgba(255,255,255,.76); box-shadow: inset 0 1px 0 rgba(255,255,255,.85); }
  .market-strip strong, .market-strip span { display: block; }
  .market-strip strong { font-size: 13px; letter-spacing: -.02em; }
  .market-strip span { margin-top: 4px; color: rgba(0,0,0,.46); font-size: 10px; font-weight: 750; }
  .category-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-top: 14px; }
  .category-row button { padding: 12px 6px; color: #9f4e6d; font-size: 10px; font-weight: 850; }

  .shop-editorial-hero { min-height: 178px; margin-top: 14px; padding: 18px; color: white; display: flex; flex-direction: column; justify-content: flex-end; }
  .shop-editorial-hero span { width: fit-content; border-radius: 999px; background: rgba(255,255,255,.82); color: #9f4e6d; padding: 10px 14px; font-size: 11px; font-weight: 850; }
  .refined-products { margin-top: 14px; }
  .refined-products .fashion-product-card { margin-top: 10px; }

  .product-screen-refined { overflow-y: hidden; }
  .editorial-product { height: 282px; padding: 64px 20px 28px; }
  .fashion-hero-caption { position: absolute; left: 20px; right: 20px; bottom: 24px; color: #fff; }
  .fashion-hero-caption span { display: inline-flex; border-radius: 999px; padding: 9px 13px; background: rgba(255,255,255,.82); color: #9f4e6d; font-size: 10px; font-weight: 850; }
  .fashion-hero-caption h3 { max-width: 250px; margin: 12px 0 0; font-size: 26px; line-height: .98; letter-spacing: -.052em; }
  .product-sheet-expanded { margin: -26px 14px 88px; padding: 18px; border-radius: 34px; min-height: 342px; }
  .product-title-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 14px; }
  .product-title-row h3 { margin-top: 6px; font-size: 24px; line-height: 1; }
  .product-title-row > strong { color: #d77fa2; font-size: 24px; letter-spacing: -.04em; }
  .condition-panel { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 16px; }
  .condition-panel div { border-radius: 20px; padding: 12px 10px; background: rgba(255,245,250,.9); }
  .condition-panel small, .condition-panel strong { display: block; }
  .condition-panel strong { margin-top: 5px; font-size: 12px; }
  .auth-panel { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-top: 12px; border-radius: 22px; padding: 12px; background: rgba(255,255,255,.78); box-shadow: inset 0 1px 0 rgba(255,255,255,.85); }
  .auth-panel strong, .auth-panel span, .seller-inline-card strong, .seller-inline-card span { display: block; }
  .auth-panel span, .seller-inline-card span { margin-top: 4px; color: rgba(0,0,0,.48); font-size: 10.5px; line-height: 1.35; }
  .seller-inline-card { display: grid; grid-template-columns: 48px 1fr; gap: 12px; align-items: center; margin-top: 12px; border-radius: 22px; padding: 12px; background: rgba(255,245,250,.74); }
  .seller-avatar.mini-vanessa { width: 48px; height: 48px; margin: 0; --seller: url("https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=90"); }
  .sticky-safe { display: grid; grid-template-columns: 1fr; gap: 8px; margin-top: 12px; }
  .sticky-safe .main-btn { margin-top: 0; height: 48px; }

  .seller-avatar.brand-profile { --seller: url("https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=90"); }


  /* ===== FINAL UX/UI RECONSTRUCCIÓN: TRAVEL + VANESSA ===== */
  .project-nav { top: 24px; }
  .project-nav nav { height: 44px; gap: 2px; padding: 4px; background: rgba(12,12,14,.64); border-color: rgba(255,255,255,.085); box-shadow: 0 18px 60px rgba(0,0,0,.38), inset 0 1px 0 rgba(255,255,255,.065); }
  .project-nav a { height: 34px; padding: 0 17px; font-size: 12px; font-weight: 520; color: rgba(255,255,255,.62); }

  .device-screen { isolation: isolate; }
  .screen { position: relative; overflow: hidden; }
  .ux-screen { height: 100%; padding: 56px 16px 88px; display: flex; flex-direction: column; gap: 12px; overflow: hidden; }
  .ux-cover-screen { padding: 0; background: #071d1a; }
  .travel-screen { background: linear-gradient(180deg, #f7fffc 0%, #edf8f5 100%); }
  .fashion-screen { background: linear-gradient(180deg, #fffafb 0%, #f7e6ee 100%); }

  .mobile-topbar { grid-template-columns: 44px minmax(0,1fr) 44px; gap: 10px; margin: 0 0 12px; min-height: 44px; }
  .mobile-topbar button { width: 44px; height: 44px; display: grid; place-items: center; background: rgba(255,255,255,.82); box-shadow: inset 0 1px 0 rgba(255,255,255,.78), 0 10px 24px rgba(0,0,0,.06); }
  .mobile-topbar strong { font-size: 14px; line-height: 1.05; font-weight: 850; letter-spacing: -.035em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mobile-topbar small { font-size: 9px; line-height: 1.1; letter-spacing: .18em; text-transform: uppercase; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  .mobile-tabbar { left: 14px; right: 14px; bottom: 12px; height: 58px; grid-template-columns: repeat(5, minmax(0,1fr)); gap: 2px; padding: 5px; border-radius: 24px; background: rgba(255,255,255,.86); box-shadow: 0 18px 44px rgba(0,0,0,.12), inset 0 1px 0 rgba(255,255,255,.9); }
  .mobile-tabbar button { min-width: 0; height: 48px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; padding: 0 2px; border-radius: 18px; font-size: 8px; line-height: 1; font-weight: 850; letter-spacing: -.02em; overflow: hidden; }
  .mobile-tabbar button .icon { margin: 0; }
  .mobile-tabbar button .icon svg { width: 17px; height: 17px; }
  .mobile-tabbar button span { display: block; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  .ux-cover { height: 100%; padding: 56px 16px 174px; display: flex; flex-direction: column; justify-content: flex-end; color: #fff; background-image: linear-gradient(180deg, rgba(0,0,0,.08), rgba(0,0,0,.18) 34%, rgba(0,0,0,.76) 100%), var(--photo); }
  .ux-cover-copy { display: grid; gap: 10px; }
  .ux-cover-copy span, .ux-hero-copy small, .vanessa-login-copy span { width: fit-content; padding: 8px 12px; border-radius: 999px; color: #fff; background: rgba(255,255,255,.18); border: 1px solid rgba(255,255,255,.20); backdrop-filter: blur(16px); font-size: 10px; font-weight: 850; }
  .ux-cover-copy h3, .ux-hero-copy h3, .planner-summary h3, .wallet-pass h3, .vanessa-login-copy h3 { margin: 0; font-size: 25px; line-height: .98; letter-spacing: -.042em; font-weight: 850; }
  .ux-cover-copy p, .ux-hero-copy p, .planner-summary p, .wallet-pass p { margin: 0; max-width: 240px; font-size: 12.5px; line-height: 1.38; color: rgba(255,255,255,.78); }

  .ux-floating-panel, .ux-sheet, .vanessa-login-card { border-radius: 28px; padding: 16px; background: rgba(255,255,255,.88); backdrop-filter: blur(24px); box-shadow: 0 20px 54px rgba(0,0,0,.12), inset 0 1px 0 rgba(255,255,255,.9); }
  .travel-welcome-panel { position: absolute; left: 16px; right: 16px; bottom: 84px; display: grid; gap: 8px; }
  .travel-welcome-panel small, .ux-sheet small, .wallet-pass small, .vanessa-login-card small { color: rgba(0,0,0,.48); font-size: 9.5px; font-weight: 900; letter-spacing: .12em; text-transform: uppercase; }
  .travel-welcome-panel strong { color: #083f38; font-size: 14px; line-height: 1.22; }
  .ux-progress { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; margin-top: 2px; }
  .ux-progress i { height: 4px; border-radius: 999px; background: rgba(40,168,142,.22); }
  .ux-progress i:first-child { background: #2bb69c; }

  .ux-hero-card { min-height: 228px; border-radius: 28px; padding: 16px; display: flex; flex-direction: column; justify-content: space-between; color: #fff; box-shadow: inset 0 -130px 80px rgba(0,0,0,.50), 0 18px 42px rgba(0,0,0,.10); }
  .travel-main-hero { min-height: 255px; }
  .ux-hero-topline { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
  .ux-hero-topline > span { max-width: 118px; padding: 8px 11px; border-radius: 999px; background: rgba(255,255,255,.18); color: white; border: 1px solid rgba(255,255,255,.22); backdrop-filter: blur(16px); font-size: 10px; font-weight: 850; }
  .ux-hero-copy { display: grid; gap: 8px; align-content: end; }
  .ux-hero-copy small { color: rgba(255,255,255,.86); letter-spacing: .13em; text-transform: uppercase; }
  .ux-hero-copy h3 { font-size: 26px; }

  .ux-metric-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 8px; }
  .ux-metric-grid div { min-height: 54px; border-radius: 18px; padding: 10px 8px; background: rgba(255,255,255,.78); box-shadow: inset 0 1px 0 rgba(255,255,255,.86); }
  .ux-metric-grid small, .ux-metric-grid strong { display: block; }
  .ux-metric-grid small { color: rgba(0,0,0,.44); font-size: 8.5px; font-weight: 850; }
  .ux-metric-grid strong { margin-top: 4px; color: #083f38; font-size: 12px; letter-spacing: -.025em; }

  .ux-filter-row { display: flex; gap: 8px; overflow: hidden; }
  .ux-filter-row span { flex: 0 0 auto; max-width: 116px; height: 34px; display: inline-flex; align-items: center; justify-content: center; gap: 6px; border-radius: 999px; padding: 0 12px; background: rgba(255,255,255,.80); color: rgba(0,0,0,.58); font-size: 10px; font-weight: 850; white-space: nowrap; box-shadow: inset 0 1px 0 rgba(255,255,255,.86); }

  .ux-card-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 10px; min-height: 112px; overflow: hidden; }
  .ux-card-grid .photo { min-height: 112px; border-radius: 22px; box-shadow: inset 0 -72px 52px rgba(0,0,0,.48); }
  .ux-card-grid b, .ux-card-grid small { position: absolute; left: 12px; right: 12px; color: #fff; }
  .ux-card-grid b { bottom: 28px; font-size: 12px; line-height: 1.05; }
  .ux-card-grid small { bottom: 12px; font-size: 9.5px; color: rgba(255,255,255,.76); }

  .ux-search { flex: 0 0 48px; height: 48px; border-radius: 18px; background: rgba(255,255,255,.86); color: rgba(0,0,0,.42); font-size: 12px; }
  .ux-search-hero { min-height: 210px; }
  .ux-list { display: grid; gap: 8px; }
  .ux-row-card { display: grid; grid-template-columns: 56px 1fr 30px; gap: 10px; align-items: center; min-height: 72px; padding: 8px; border-radius: 20px; background: rgba(255,255,255,.80); }
  .ux-row-card .photo { width: 56px; height: 56px; border-radius: 16px; }
  .ux-row-card strong, .ux-row-card small { display: block; }
  .ux-row-card strong { font-size: 13px; letter-spacing: -.03em; }
  .ux-row-card small { margin-top: 4px; color: rgba(0,0,0,.46); font-size: 10px; }
  .ux-row-card button { width: 30px; height: 30px; border: 0; border-radius: 999px; background: rgba(40,168,142,.14); color: #087b68; }

  .destination-clean-hero { min-height: 292px; }
  .destination-clean-sheet { margin-top: -4px; display: grid; gap: 12px; }
  .destination-clean-sheet p, .checkout-sheet p { margin: 0; color: rgba(0,0,0,.56); font-size: 12px; line-height: 1.45; }

  .booking-clean-hero { min-height: 168px; }
  .checkout-sheet { display: grid; gap: 8px; }
  .checkout-line { min-height: 42px; display: flex; align-items: center; justify-content: space-between; gap: 12px; border-bottom: 1px solid rgba(0,0,0,.055); }
  .checkout-line span { color: rgba(0,0,0,.44); font-size: 11px; font-weight: 800; }
  .checkout-line strong { font-size: 13px; letter-spacing: -.02em; }
  .checkout-price { display: flex; align-items: end; justify-content: space-between; padding-top: 6px; }
  .checkout-price strong { color: #087b68; font-size: 18px; letter-spacing: -.04em; }

  .planner-summary { display: grid; gap: 8px; min-height: 132px; background: radial-gradient(circle at 88% 10%, rgba(66,199,173,.16), transparent 28%), rgba(255,255,255,.86); }
  .planner-summary h3 { color: #111; font-size: 23px; }
  .planner-summary p { color: rgba(0,0,0,.56); }
  .ux-timeline { display: grid; gap: 8px; }
  .ux-timeline article { min-height: 76px; display: grid; grid-template-columns: 56px 1fr; gap: 10px; align-items: center; padding: 10px; border-radius: 22px; background: rgba(255,255,255,.82); }
  .ux-timeline .photo { width: 56px; height: 56px; border-radius: 16px; }
  .ux-timeline span, .ux-timeline strong, .ux-timeline small { display: block; }
  .ux-timeline span { color: rgba(0,0,0,.42); font-size: 10px; }
  .ux-timeline strong { margin-top: 2px; font-size: 12.5px; }
  .ux-timeline small { margin-top: 3px; color: rgba(0,0,0,.48); font-size: 10.5px; line-height: 1.3; }
  .ux-bottom-action { margin-top: 0; }

  .ux-map-screen { padding: 0; }
  .ux-map-bg { height: 100%; padding: 56px 16px 245px; background-image: linear-gradient(180deg, rgba(5,20,22,.42), rgba(5,20,22,.12) 38%, rgba(5,20,22,.62) 100%), var(--photo); }
  .map-route-line { position: absolute; left: 26%; top: 42%; width: 48%; height: 4px; border-radius: 999px; background: linear-gradient(90deg, #34d1b2, #ff9658); transform: rotate(-24deg); box-shadow: 0 0 30px rgba(52,209,178,.48); }
  .ux-route-panel { position: absolute; left: 16px; right: 16px; bottom: 84px; z-index: 8; border-radius: 28px; padding: 16px; background: rgba(255,255,255,.90); backdrop-filter: blur(24px); box-shadow: 0 22px 60px rgba(0,0,0,.22); }
  .ux-route-panel h3 { margin: 6px 0 0; color: #111; font-size: 25px; letter-spacing: -.04em; }
  .ux-route-panel p { margin: 6px 0 10px; color: rgba(0,0,0,.56); font-size: 12px; line-height: 1.38; }
  .map-pill { position: absolute; left: 16px; right: auto; width: fit-content; border-radius: 999px; padding: 9px 12px; background: rgba(255,255,255,.88); color: #083f38; font-size: 10px; font-weight: 850; box-shadow: 0 12px 34px rgba(0,0,0,.14); }
  .weather-layer { top: 118px; }
  .traffic-layer { top: 160px; }
  .map-pin { padding: 8px 12px; font-size: 10px; }

  .saved-clean-hero { min-height: 292px; }
  .saved-grid .photo { min-height: 126px; }

  .wallet-pass { overflow: hidden; border-radius: 32px; background: linear-gradient(145deg, rgba(255,255,255,.94), rgba(241,249,246,.76)); box-shadow: 0 26px 74px rgba(0,0,0,.14), inset 0 1px 0 rgba(255,255,255,.9); }
  .wallet-pass-photo { height: 136px; border-radius: 0 0 28px 28px; box-shadow: inset 0 -70px 64px rgba(0,0,0,.32); }
  .wallet-pass-body { padding: 16px; }
  .wallet-pass h3 { margin: 14px 0 0; color: #111; font-size: 28px; }
  .wallet-pass p { margin: 4px 0 0; color: rgba(0,0,0,.56); }
  .compact-pass-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; margin-top: 14px; }
  .compact-pass-grid div { min-height: 66px; }
  .pass-footer { margin-top: 14px; }

  .vanessa-login-premium { padding: 0 16px 88px; gap: 0; background: linear-gradient(180deg, #fffafb, #f7e7ef); }
  .vanessa-login-hero-clean { height: 238px; margin: 0 -16px; padding: 56px 16px 20px; display: flex; flex-direction: column; justify-content: space-between; color: #fff; background-image: linear-gradient(180deg, rgba(0,0,0,.22), rgba(0,0,0,.06) 44%, rgba(0,0,0,.58) 100%), var(--photo); }
  .vanessa-login-copy { display: grid; gap: 8px; }
  .vanessa-login-copy h3 { font-family: Georgia, 'Times New Roman', serif; font-weight: 500; font-size: 30px; letter-spacing: -.05em; }
  .vanessa-login-card { position: relative; z-index: 4; margin-top: -22px; display: grid; gap: 10px; border: 1px solid rgba(155,75,108,.08); }
  .vanessa-login-card h3 { margin: 0; color: #111; font-size: 24px; line-height: 1; letter-spacing: -.052em; }
  .login-field { display: grid; gap: 6px; }
  .login-field span { color: rgba(0,0,0,.52); font-size: 10px; font-weight: 850; }
  .login-field input { width: 100%; height: 42px; border: 1px solid rgba(0,0,0,.06); border-radius: 16px; padding: 0 13px; background: rgba(255,255,255,.88); color: #111; outline: none; font-size: 12px; }
  .login-link { height: 22px; margin: -2px 0 0; border: 0; background: transparent; color: #9f4e6d; font-size: 10.5px; font-weight: 850; }
  .login-divider { display: flex; align-items: center; gap: 10px; color: rgba(0,0,0,.38); font-size: 10px; font-weight: 800; }
  .login-divider::before, .login-divider::after { content: ''; height: 1px; flex: 1; background: rgba(0,0,0,.07); }
  .social-login-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .social-login-row button { height: 40px; border: 1px solid rgba(0,0,0,.06); border-radius: 16px; background: rgba(255,255,255,.86); color: #111; font-size: 12px; font-weight: 850; }
  .register-copy { margin: 0; text-align: center; color: rgba(0,0,0,.48); font-size: 11px; }
  .register-copy strong { color: #9f4e6d; }

  .main-btn { height: 48px; margin-top: 0; border-radius: 17px; font-size: 13px; letter-spacing: -.02em; }
  .verification-badge { padding: 8px 10px; font-size: 9.5px; }
  .verification-badge .icon svg { width: 14px; height: 14px; }

  @media (max-width: 900px) {
    .project-nav { left: 16px; right: 16px; transform: none; }
    .project-nav nav { overflow-x: auto; justify-content: flex-start; }
    .project-nav a { flex: 0 0 auto; }
  }

  /* =========================================================
     PATCH FINAL — Travel: Bienvenida, Explorar, Destino, Itinerario
     Retícula uniforme 8pt, tipografía contenida, safe area real.
     ========================================================= */
  .ux-screen {
    --x: 16px;
    --gap: 12px;
    --safe-bottom: 92px;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    padding: 56px var(--x) var(--safe-bottom);
    overflow: hidden;
    background:
      radial-gradient(circle at 88% 10%, rgba(191,234,216,.34), transparent 26%),
      linear-gradient(180deg, #f8fffc 0%, #eef8f5 100%);
  }

  .ux-screen .mobile-topbar {
    margin-bottom: 0;
    grid-template-columns: 40px minmax(0,1fr) 40px;
    gap: 10px;
  }

  .ux-screen .mobile-topbar button {
    width: 40px;
    height: 40px;
    display: grid;
    place-items: center;
    border: 1px solid rgba(0,0,0,.045);
    background: rgba(255,255,255,.82);
    box-shadow: 0 10px 24px rgba(20,45,38,.06), inset 0 1px 0 rgba(255,255,255,.8);
  }

  .ux-screen .mobile-topbar small {
    font-size: 9px;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: rgba(0,0,0,.36);
  }

  .ux-screen .mobile-topbar strong {
    max-width: 160px;
    margin: 2px auto 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    line-height: 1.05;
    letter-spacing: -.035em;
  }

  .ux-hero-card {
    width: 100%;
    min-height: 0;
    border-radius: 28px;
    padding: 16px;
    color: white;
    background-image:
      linear-gradient(180deg, rgba(4,22,24,.10) 0%, rgba(4,22,24,.14) 34%, rgba(4,22,24,.78) 100%),
      var(--photo);
    box-shadow:
      0 18px 48px rgba(16,42,38,.12),
      inset 0 0 0 1px rgba(255,255,255,.16);
  }

  .ux-hero-copy {
    margin-top: auto;
    display: grid;
    gap: 6px;
  }

  .ux-hero-copy small,
  .ux-sheet small,
  .planner-summary small {
    color: rgba(255,255,255,.78);
    font-size: 9.5px;
    font-weight: 850;
    letter-spacing: .14em;
    line-height: 1.15;
    text-transform: uppercase;
  }

  .ux-sheet small,
  .planner-summary small {
    color: rgba(0,0,0,.46);
  }

  .ux-hero-copy h3,
  .planner-summary h3 {
    margin: 0;
    max-width: 235px;
    font-size: 25px;
    line-height: .94;
    letter-spacing: -.045em;
    font-weight: 760;
  }

  .ux-hero-copy p,
  .planner-summary p,
  .destination-clean-sheet p {
    margin: 0;
    max-width: 236px;
    color: rgba(255,255,255,.82);
    font-size: 11.5px;
    line-height: 1.36;
    letter-spacing: -.02em;
  }

  .planner-summary p,
  .destination-clean-sheet p {
    color: rgba(0,0,0,.56);
  }

  .ux-floating-panel,
  .ux-sheet,
  .planner-summary {
    width: 100%;
    border-radius: 26px;
    padding: 16px;
    background: rgba(255,255,255,.88);
    border: 1px solid rgba(255,255,255,.74);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    box-shadow: 0 18px 46px rgba(20,44,40,.10), inset 0 1px 0 rgba(255,255,255,.86);
  }

  .ux-metric-grid {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, minmax(0,1fr));
    gap: 8px;
    margin: 0;
  }

  .ux-metric-grid div {
    min-width: 0;
    min-height: 56px;
    display: grid;
    align-content: center;
    gap: 4px;
    padding: 10px 8px;
    border-radius: 18px;
    background: rgba(255,255,255,.82);
    border: 1px solid rgba(255,255,255,.72);
    box-shadow: 0 10px 26px rgba(22,48,44,.06);
  }

  .ux-metric-grid small {
    overflow: hidden;
    color: rgba(0,0,0,.38);
    font-size: 8.5px;
    font-weight: 850;
    line-height: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-transform: uppercase;
    letter-spacing: .08em;
  }

  .ux-metric-grid strong {
    overflow: hidden;
    color: #102622;
    font-size: 12px;
    line-height: 1.05;
    letter-spacing: -.04em;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .ux-filter-row {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
    margin: 0;
  }

  .ux-filter-row span {
    min-width: 0;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    overflow: hidden;
    padding: 0 10px;
    border-radius: 999px;
    background: rgba(255,255,255,.82);
    border: 1px solid rgba(255,255,255,.76);
    color: rgba(0,0,0,.56);
    font-size: 9.5px;
    font-weight: 850;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    box-shadow: 0 10px 24px rgba(22,48,44,.055);
  }

  .ux-card-grid {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, minmax(0,1fr));
    gap: 10px;
    margin: 0;
    min-height: 0;
  }

  .ux-card-grid .photo {
    min-height: 104px;
    border-radius: 22px;
    background-image: linear-gradient(180deg, rgba(0,0,0,.02), rgba(0,0,0,.56)), var(--photo);
    box-shadow: inset 0 0 0 1px rgba(255,255,255,.14), 0 14px 34px rgba(20,44,40,.10);
  }

  .ux-card-grid b,
  .ux-card-grid small {
    position: absolute;
    left: 12px;
    right: 12px;
    display: block;
    overflow: hidden;
    color: white;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .ux-card-grid b {
    bottom: 30px;
    font-size: 12px;
    line-height: 1;
    letter-spacing: -.035em;
  }

  .ux-card-grid small {
    bottom: 13px;
    color: rgba(255,255,255,.78);
    font-size: 9.5px;
    line-height: 1;
  }

  .mobile-tabbar {
    left: 12px;
    right: 12px;
    bottom: 10px;
    height: 60px;
    grid-template-columns: repeat(5, minmax(0,1fr));
    gap: 3px;
    padding: 6px;
    border-radius: 22px;
  }

  .mobile-tabbar button {
    min-width: 0;
    height: 48px;
    gap: 2px;
    border-radius: 17px;
    font-size: 8px;
    line-height: 1;
  }

  .mobile-tabbar button span {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .mobile-tabbar button .icon,
  .mobile-tabbar button .icon svg {
    width: 16px;
    height: 16px;
    margin-bottom: 0;
  }

  /* Bienvenida Travel */
  .travel-cover-screen {
    padding: 0 16px 92px;
    gap: 10px;
    background: linear-gradient(180deg, #f4fffb 0%, #eaf7f4 100%);
  }

  .travel-cover-photo {
    height: 348px;
    margin: 0 -16px;
    padding: 56px 16px 18px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-position: center;
    background-image:
      linear-gradient(180deg, rgba(4,18,20,.22) 0%, rgba(4,18,20,.04) 38%, rgba(4,18,20,.76) 100%),
      var(--photo);
    box-shadow: none;
  }

  .travel-cover-photo .mobile-topbar { margin-bottom: 0; }

  .ux-cover-copy {
    display: grid;
    gap: 8px;
    max-width: 238px;
    color: white;
  }

  .ux-cover-copy span,
  .ux-hero-topline span {
    width: fit-content;
    height: 32px;
    display: inline-flex;
    align-items: center;
    padding: 0 12px;
    border-radius: 999px;
    background: rgba(255,255,255,.18);
    border: 1px solid rgba(255,255,255,.32);
    color: rgba(255,255,255,.92);
    font-size: 9.5px;
    font-weight: 850;
    letter-spacing: -.01em;
    backdrop-filter: blur(14px);
  }

  .ux-cover-copy h3 {
    margin: 0;
    max-width: 232px;
    font-size: 27px;
    line-height: .95;
    letter-spacing: -.075em;
  }

  .ux-cover-copy p {
    margin: 0;
    max-width: 220px;
    color: rgba(255,255,255,.82);
    font-size: 11.5px;
    line-height: 1.38;
  }

  .travel-welcome-panel {
    position: relative;
    z-index: 3;
    margin: -30px 0 0;
    display: grid;
    gap: 10px;
  }

  .travel-welcome-panel small {
    color: rgba(0,0,0,.40);
    font-size: 9.5px;
    font-weight: 900;
    letter-spacing: .14em;
    text-transform: uppercase;
  }

  .travel-welcome-panel strong {
    color: #10342f;
    font-size: 15px;
    line-height: 1.26;
    letter-spacing: -.035em;
  }

  .ux-progress {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin: 0;
  }

  .ux-progress i {
    height: 4px;
    border-radius: 999px;
    background: rgba(33,160,139,.16);
  }

  .ux-progress i:first-child { background: #22b89e; }

  /* Explorar Travel */
  .travel-main-hero {
    min-height: 244px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-position: center 48%;
  }

  .ux-hero-topline {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8px;
  }

  .ux-hero-topline .verification-badge {
    height: 32px;
    max-width: 118px;
    overflow: hidden;
    padding: 0 10px;
    background: rgba(191,234,216,.74);
    border: 1px solid rgba(255,255,255,.42);
    font-size: 9px;
    text-overflow: ellipsis;
  }

  .travel-metrics { flex: 0 0 auto; }

  /* Destino Travel */
  .destination-screen-refined {
    gap: 10px;
  }

  .destination-clean-hero {
    min-height: 290px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0;
    padding: 0;
    border-radius: 30px;
    background-position: center 48%;
  }

  .destination-clean-hero .mobile-topbar {
    margin: 0;
    padding: 0;
  }

  .destination-clean-hero > .mobile-topbar {
    margin: 16px;
  }

  .destination-clean-hero .ux-hero-copy {
    padding: 0 16px 18px;
  }

  .destination-clean-hero .ux-hero-copy h3 {
    max-width: 225px;
    font-size: 25px;
  }

  .destination-clean-sheet {
    display: grid;
    gap: 12px;
    margin: 0;
    padding: 14px;
  }

  .destination-clean-sheet .ux-metric-grid {
    grid-template-columns: repeat(4, minmax(0,1fr));
  }

  .destination-clean-sheet .main-btn,
  .travel-welcome-panel .main-btn,
  .ux-bottom-action {
    width: 100%;
    height: 46px;
    margin: 0;
    border-radius: 16px;
    font-size: 12.5px;
  }

  /* Itinerario Travel */
  .planner-summary {
    display: grid;
    gap: 8px;
    padding: 16px;
  }

  .planner-summary h3 {
    max-width: 230px;
    color: #111;
    font-size: 24px;
  }

  .ux-timeline {
    display: grid;
    gap: 8px;
    min-height: 0;
  }

  .ux-timeline article {
    min-height: 72px;
    display: grid;
    grid-template-columns: 52px minmax(0,1fr);
    gap: 10px;
    align-items: center;
    padding: 10px;
    border-radius: 20px;
    background: rgba(255,255,255,.84);
    border: 1px solid rgba(255,255,255,.68);
    box-shadow: 0 10px 26px rgba(22,48,44,.055);
  }

  .ux-timeline .photo {
    width: 52px;
    height: 52px;
    border-radius: 15px;
  }

  .ux-timeline article div {
    min-width: 0;
  }

  .ux-timeline span {
    color: rgba(0,0,0,.42);
    font-size: 9.5px;
    font-weight: 800;
    line-height: 1;
  }

  .ux-timeline strong {
    overflow: hidden;
    margin-top: 3px;
    color: #111;
    font-size: 12px;
    line-height: 1.12;
    letter-spacing: -.03em;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .ux-timeline small {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-top: 3px;
    color: rgba(0,0,0,.50);
    font-size: 10px;
    line-height: 1.25;
  }



  /* ===== TRAVEL REDESIGN FINAL — APPLE LEVEL GRID ===== */
  .travel-apple {
    padding: 62px 18px 96px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    overflow: hidden;
    background:
      radial-gradient(circle at 86% 6%, rgba(191,234,216,.42), transparent 28%),
      linear-gradient(180deg, #fbfffd 0%, #edf8f5 100%);
  }

  .travel-scroll-safe { overflow-y: auto; scrollbar-width: none; }
  .travel-scroll-safe::-webkit-scrollbar { display: none; }

  .travel-apple .mobile-topbar,
  .travel-map-apple .mobile-topbar { margin-bottom: 6px; }

  .travel-primary-button {
    width: 100%;
    min-height: 48px;
    border: 0;
    border-radius: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #ff8f55, #ffad66);
    color: #fff;
    font-size: 13px;
    font-weight: 850;
    letter-spacing: -.02em;
    box-shadow: 0 16px 38px rgba(255,143,85,.26), inset 0 1px 0 rgba(255,255,255,.28);
  }

  .travel-welcome-apple { padding: 0 18px 96px; gap: 0; background: #061915; }
  .travel-welcome-media {
    height: 438px;
    margin: 0 -18px;
    padding: 62px 18px 28px;
    border-radius: 0 0 38px 38px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: white;
    background-position: center;
    box-shadow: inset 0 -230px 150px rgba(0,0,0,.60), inset 0 90px 90px rgba(0,0,0,.24);
  }
  .travel-welcome-copy { max-width: 260px; }
  .travel-welcome-copy span,
  .travel-destination-copy span,
  .travel-booking-hero small,
  .travel-feature-copy small,
  .travel-itinerary-card small {
    display: inline-flex;
    width: fit-content;
    padding: 8px 12px;
    border-radius: 999px;
    background: rgba(255,255,255,.78);
    color: #176f61;
    font-size: 10px;
    font-weight: 850;
    letter-spacing: .02em;
    backdrop-filter: blur(18px);
  }
  .travel-welcome-copy h3,
  .travel-feature-copy h3,
  .travel-destination-copy h3,
  .travel-booking-hero h3,
  .travel-itinerary-card h3,
  .travel-map-panel h3,
  .travel-wallet-card h3 {
    margin: 12px 0 0;
    font-size: 30px;
    line-height: .96;
    letter-spacing: -.04em;
    font-weight: 780;
  }
  .travel-welcome-copy p,
  .travel-feature-copy p,
  .travel-destination-sheet p,
  .travel-itinerary-card p,
  .travel-map-panel p {
    margin: 10px 0 0;
    font-size: 12.5px;
    line-height: 1.45;
    letter-spacing: -.015em;
  }
  .travel-welcome-copy p,
  .travel-feature-copy p { color: rgba(255,255,255,.82); }
  .travel-glass-card {
    position: relative;
    z-index: 4;
    margin: -38px 0 0;
    padding: 16px;
    border-radius: 28px;
    background: rgba(255,255,255,.88);
    backdrop-filter: blur(24px);
    box-shadow: 0 22px 60px rgba(0,0,0,.17), inset 0 1px 0 rgba(255,255,255,.85);
  }
  .welcome-insight-card { display: grid; gap: 14px; }
  .welcome-insight-card small, .welcome-insight-card strong { display: block; }
  .welcome-insight-card small { color: rgba(0,0,0,.43); font-size: 10px; font-weight: 850; text-transform: uppercase; letter-spacing: .08em; }
  .welcome-insight-card strong { margin-top: 6px; color: #0b3430; font-size: 14px; line-height: 1.35; letter-spacing: -.035em; }

  .travel-feature-card {
    min-height: 254px;
    border-radius: 34px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: white;
    background-position: center;
    box-shadow: inset 0 -150px 110px rgba(0,0,0,.58), inset 0 64px 70px rgba(0,0,0,.16), 0 22px 58px rgba(0,0,0,.12);
  }
  .travel-card-topline { display: flex; justify-content: space-between; gap: 8px; align-items: center; }
  .travel-card-topline span {
    min-height: 34px;
    display: inline-flex;
    align-items: center;
    padding: 0 11px;
    border-radius: 999px;
    background: rgba(255,255,255,.20);
    border: 1px solid rgba(255,255,255,.22);
    color: white;
    font-size: 10px;
    font-weight: 850;
    backdrop-filter: blur(16px);
  }
  .travel-feature-copy small { background: transparent; color: rgba(255,255,255,.72); padding: 0; border-radius: 0; text-transform: uppercase; letter-spacing: .08em; }
  .travel-feature-copy h3 { font-size: 29px; }
  .travel-meta-strip, .travel-stats-four, .travel-wallet-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
  .travel-meta-strip span,
  .travel-stats-four div,
  .travel-wallet-grid div {
    min-height: 42px;
    border-radius: 17px;
    display: grid;
    place-items: center;
    background: rgba(255,255,255,.82);
    color: #103b36;
    font-size: 11px;
    font-weight: 850;
    box-shadow: inset 0 1px 0 rgba(255,255,255,.9);
  }
  .travel-pill-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
  .travel-pill-row button {
    min-width: 0;
    height: 38px;
    border: 0;
    border-radius: 16px;
    background: rgba(255,255,255,.76);
    color: rgba(0,0,0,.58);
    font-size: 10.5px;
    font-weight: 850;
    letter-spacing: -.02em;
    box-shadow: inset 0 1px 0 rgba(255,255,255,.9);
  }
  .travel-pill-row.compact { grid-template-columns: repeat(2, 1fr); margin-top: 12px; }
  .travel-section-head { display: flex; align-items: center; justify-content: space-between; margin-top: 2px; }
  .travel-section-head strong { font-size: 14px; letter-spacing: -.03em; }
  .travel-section-head span { color: #198f7e; font-size: 11px; font-weight: 850; }
  .travel-reco-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .travel-reco-card {
    height: 126px;
    border-radius: 24px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: white;
    box-shadow: inset 0 -92px 70px rgba(0,0,0,.52);
  }
  .travel-reco-card strong, .travel-reco-card small, .travel-reco-card b { display: block; }
  .travel-reco-card strong { font-size: 13px; line-height: 1.05; }
  .travel-reco-card small { margin-top: 4px; color: rgba(255,255,255,.75); font-size: 10px; }
  .travel-reco-card b { width: fit-content; padding: 7px 10px; border-radius: 999px; background: rgba(255,255,255,.82); color: #103b36; font-size: 10px; }

  .travel-search-field {
    min-height: 48px;
    border-radius: 18px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 14px;
    background: rgba(255,255,255,.84);
    color: rgba(0,0,0,.42);
    font-size: 12.5px;
    font-weight: 700;
    box-shadow: inset 0 1px 0 rgba(255,255,255,.9), 0 12px 32px rgba(0,0,0,.06);
  }
  .travel-search-feature { min-height: 220px; }
  .travel-result-list { display: grid; gap: 9px; }
  .travel-result-row {
    display: grid;
    grid-template-columns: 56px 1fr 32px;
    align-items: center;
    gap: 12px;
    min-height: 76px;
    padding: 10px;
    border-radius: 24px;
    background: rgba(255,255,255,.82);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.88);
  }
  .travel-result-row .photo { width: 56px; height: 56px; border-radius: 18px; }
  .travel-result-row strong, .travel-result-row small { display: block; }
  .travel-result-row strong { font-size: 13px; letter-spacing: -.02em; }
  .travel-result-row small { margin-top: 4px; color: rgba(0,0,0,.45); font-size: 10.5px; }
  .travel-result-row button { width: 32px; height: 32px; border: 0; border-radius: 999px; background: rgba(66,199,173,.18); color: #198f7e; }

  .travel-destination-apple { padding: 0 18px 96px; gap: 0; background: #edf8f5; }
  .travel-destination-media {
    height: 364px;
    margin: 0 -18px;
    padding: 62px 18px 28px;
    color: white;
    border-radius: 0 0 38px 38px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: inset 0 -190px 130px rgba(0,0,0,.58), inset 0 90px 80px rgba(0,0,0,.18);
  }
  .travel-destination-copy h3 { max-width: 262px; font-size: 28px; }
  .travel-destination-sheet {
    position: relative;
    z-index: 4;
    margin: -32px 0 0;
    padding: 16px;
    border-radius: 30px;
    background: rgba(255,255,255,.9);
    backdrop-filter: blur(24px);
    box-shadow: 0 20px 64px rgba(0,0,0,.14), inset 0 1px 0 rgba(255,255,255,.88);
  }
  .travel-stats-four { grid-template-columns: repeat(4, 1fr); }
  .travel-stats-four div { display: block; padding: 10px 7px; min-height: 56px; text-align: center; }
  .travel-stats-four small, .travel-stats-four strong { display: block; }
  .travel-stats-four small { color: rgba(0,0,0,.42); font-size: 9px; font-weight: 850; }
  .travel-stats-four strong { margin-top: 5px; font-size: 11px; color: #0b3430; }
  .travel-destination-sheet p { color: rgba(0,0,0,.56); }

  .travel-booking-hero {
    min-height: 164px;
    padding: 16px;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    color: white;
    box-shadow: inset 0 -115px 86px rgba(0,0,0,.50), 0 18px 46px rgba(0,0,0,.10);
  }
  .travel-booking-hero h3 { max-width: 220px; font-size: 25px; }
  .travel-checkout-card, .travel-itinerary-card {
    padding: 16px;
    border-radius: 28px;
    background: rgba(255,255,255,.86);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.9), 0 16px 42px rgba(0,0,0,.07);
  }
  .travel-checkout-card .checkout-line { padding: 10px 0; border-bottom: 1px solid rgba(0,0,0,.06); }
  .travel-checkout-card .checkout-line:first-child { padding-top: 0; }
  .travel-checkout-card .checkout-line span { color: rgba(0,0,0,.45); font-size: 11px; font-weight: 800; }
  .travel-checkout-card .checkout-line strong { font-size: 13px; }
  .travel-checkout-card .checkout-price { margin-top: 12px; padding: 12px; border-radius: 20px; background: rgba(191,234,216,.30); }
  .travel-checkout-card .checkout-price small, .travel-checkout-card .checkout-price strong { display: block; }
  .travel-checkout-card .checkout-price small { color: rgba(0,0,0,.45); font-size: 10px; font-weight: 850; }
  .travel-checkout-card .checkout-price strong { margin-top: 4px; color: #176f61; font-size: 20px; letter-spacing: -.04em; }

  .travel-itinerary-card h3 { max-width: 245px; color: #111; font-size: 25px; }
  .travel-itinerary-card p { color: rgba(0,0,0,.56); }
  .travel-timeline-clean { display: grid; gap: 9px; }
  .travel-timeline-clean article {
    display: grid;
    grid-template-columns: 58px 1fr;
    gap: 12px;
    align-items: center;
    min-height: 76px;
    padding: 9px;
    border-radius: 24px;
    background: rgba(255,255,255,.82);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.88);
  }
  .travel-timeline-clean .photo { width: 58px; height: 58px; border-radius: 18px; }
  .travel-timeline-clean span, .travel-timeline-clean strong, .travel-timeline-clean small { display: block; }
  .travel-timeline-clean span { color: rgba(0,0,0,.42); font-size: 10px; font-weight: 850; }
  .travel-timeline-clean strong { margin-top: 3px; font-size: 12.5px; letter-spacing: -.02em; }
  .travel-timeline-clean small { margin-top: 3px; color: rgba(0,0,0,.46); font-size: 10.5px; line-height: 1.35; }
  .travel-bottom-action { margin-top: 0; }

  .travel-map-apple { position: relative; height: 100%; overflow: hidden; background: #0a1613; }
  .travel-map-canvas { height: 100%; padding: 62px 18px 96px; color: white; filter: saturate(1.08) contrast(1.05); }
  .travel-map-line { position: absolute; left: 24%; top: 45%; width: 54%; height: 4px; border-radius: 999px; background: linear-gradient(90deg, #42c7ad, #ff9658); transform: rotate(-22deg); box-shadow: 0 0 24px rgba(66,199,173,.52); }
  .travel-map-pin { position: absolute; padding: 9px 12px; border-radius: 999px; background: rgba(255,255,255,.86); color: #176f61; font-size: 10px; font-weight: 850; box-shadow: 0 12px 30px rgba(0,0,0,.18); }
  .map-a { left: 47%; top: 48%; } .map-b { left: 18%; top: 58%; } .map-c { right: 14%; top: 42%; }
  .travel-map-status, .travel-map-flow { position: absolute; left: 18px; border-radius: 999px; padding: 10px 13px; background: rgba(255,255,255,.86); color: #176f61; font-size: 10.5px; font-weight: 850; box-shadow: 0 12px 30px rgba(0,0,0,.14); }
  .travel-map-status { top: 128px; display: inline-flex; align-items: center; gap: 6px; }
  .travel-map-flow { top: 174px; max-width: 190px; }
  .travel-map-panel {
    position: absolute;
    left: 18px;
    right: 18px;
    bottom: 92px;
    z-index: 4;
    padding: 16px;
    border-radius: 30px;
    background: rgba(255,255,255,.90);
    backdrop-filter: blur(24px);
    box-shadow: 0 20px 64px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.88);
  }
  .travel-map-panel small { color: rgba(0,0,0,.45); font-size: 10px; font-weight: 850; text-transform: uppercase; letter-spacing: .08em; }
  .travel-map-panel h3 { color: #111; font-size: 27px; }
  .travel-map-panel p { color: rgba(0,0,0,.56); }

  .travel-pass-apple { overflow: hidden; }
  .travel-wallet-card {
    overflow: hidden;
    border-radius: 36px;
    background: radial-gradient(circle at 14% 0%, rgba(255,255,255,1), transparent 42%), linear-gradient(145deg, #ffffff, #e7f5ef);
    box-shadow: 0 24px 80px rgba(0,0,0,.14), inset 0 1px 0 rgba(255,255,255,.94);
  }
  .travel-wallet-photo { height: 142px; border-radius: 0 0 30px 30px; box-shadow: inset 0 -80px 70px rgba(0,0,0,.34); }
  .travel-wallet-body { padding: 16px; }
  .travel-wallet-card h3 { font-size: 28px; color: #111; }
  .travel-wallet-card p { margin: 7px 0 0; color: rgba(0,0,0,.55); font-size: 12px; line-height: 1.4; }
  .travel-wallet-grid { grid-template-columns: repeat(2, 1fr); margin-top: 14px; }
  .travel-wallet-grid div { display: block; min-height: 62px; padding: 12px; }
  .travel-wallet-grid small, .travel-wallet-grid strong { display: block; }
  .travel-wallet-grid small { color: rgba(0,0,0,.42); font-size: 10px; font-weight: 850; }
  .travel-wallet-grid strong { margin-top: 5px; color: #111; font-size: 13px; }

  /* PATCH FINAL — Travel Bienvenida/Explorar + Vanessa Login */
  .travel-welcome-redesign {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: 0 0 86px;
    background: linear-gradient(180deg, #f7fffc 0%, #edf8f4 100%);
    overflow: hidden;
  }

  .travel-welcome-redesign .travel-welcome-media {
    height: 390px;
    padding: 58px 18px 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 0 0 34px 34px;
    box-shadow: inset 0 -210px 130px rgba(0,0,0,.62);
    background-position: center top;
  }

  .travel-welcome-redesign .travel-welcome-copy {
    width: 100%;
    margin: 0;
    padding: 0;
    color: #fff;
  }

  .travel-welcome-redesign .travel-welcome-copy span {
    display: inline-flex;
    align-items: center;
    height: 30px;
    padding: 0 12px;
    border-radius: 999px;
    background: rgba(255,255,255,.18);
    border: 1px solid rgba(255,255,255,.28);
    color: rgba(255,255,255,.92);
    font-size: 10px;
    font-weight: 850;
    letter-spacing: .08em;
    text-transform: uppercase;
    backdrop-filter: blur(16px);
  }

  .travel-welcome-redesign .travel-welcome-copy h3 {
    max-width: 268px;
    margin: 14px 0 0;
    color: #fff;
    font-size: 31px;
    line-height: .96;
    letter-spacing: -.045em;
    font-weight: 760;
  }

  .travel-welcome-redesign .travel-welcome-copy p {
    max-width: 260px;
    margin: 12px 0 0;
    color: rgba(255,255,255,.82);
    font-size: 13px;
    line-height: 1.45;
    letter-spacing: -.02em;
  }

  .welcome-control-panel {
    position: relative;
    z-index: 5;
    margin: -34px 18px 0;
    padding: 18px;
    border-radius: 30px;
    background: rgba(255,255,255,.88);
    border: 1px solid rgba(255,255,255,.78);
    box-shadow: 0 24px 70px rgba(18,64,55,.16), inset 0 1px 0 rgba(255,255,255,.8);
    backdrop-filter: blur(26px);
  }

  .welcome-route-summary small,
  .welcome-metrics-grid small {
    display: block;
    color: rgba(11,46,42,.44);
    font-size: 10px;
    font-weight: 850;
    letter-spacing: .08em;
    text-transform: uppercase;
  }

  .welcome-route-summary strong {
    display: block;
    margin-top: 6px;
    color: #0f2f2b;
    font-size: 20px;
    line-height: 1;
    letter-spacing: -.05em;
  }

  .welcome-route-summary span {
    display: block;
    margin-top: 6px;
    color: rgba(15,47,43,.62);
    font-size: 12px;
    line-height: 1.35;
    font-weight: 700;
  }

  .welcome-metrics-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-top: 14px;
  }

  .welcome-metrics-grid div {
    min-height: 64px;
    padding: 12px;
    border-radius: 18px;
    background: rgba(237,248,244,.86);
  }

  .welcome-metrics-grid strong {
    display: block;
    margin-top: 6px;
    color: #0d7668;
    font-size: 17px;
    line-height: 1;
    letter-spacing: -.04em;
  }

  .welcome-primary-action {
    height: 50px;
    margin-top: 14px;
    border-radius: 18px;
    font-size: 14px;
  }

  .travel-feature-card-clean {
    min-height: 360px;
    padding: 22px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    border-radius: 32px;
    box-shadow: inset 0 -190px 140px rgba(0,0,0,.58), 0 24px 70px rgba(14,65,54,.14);
  }

  .travel-feature-card-clean .travel-feature-copy small {
    color: rgba(255,255,255,.72);
    font-size: 10px;
    font-weight: 850;
    letter-spacing: .14em;
    text-transform: uppercase;
  }

  .travel-feature-card-clean .travel-feature-copy h3 {
    max-width: 245px;
    margin-top: 10px;
    color: #fff;
    font-size: 33px;
    line-height: .92;
    letter-spacing: -.045em;
  }

  .travel-feature-card-clean .travel-feature-copy p {
    max-width: 244px;
    margin-top: 10px;
    color: rgba(255,255,255,.8);
    font-size: 13px;
    line-height: 1.42;
  }

  .clean-meta-strip {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 8px;
    margin-top: 18px;
  }

  .clean-meta-strip span {
    min-width: 0;
    height: 38px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 8px;
    border-radius: 999px;
    background: rgba(255,255,255,.2);
    border: 1px solid rgba(255,255,255,.25);
    color: #fff;
    font-size: 10px;
    font-weight: 850;
    white-space: nowrap;
    backdrop-filter: blur(16px);
  }

  .travel-apple.travel-scroll-safe {
    padding: 58px 18px 92px;
  }

  .travel-pill-row {
    gap: 8px !important;
  }

  .travel-pill-row button {
    height: 40px !important;
    padding: 0 14px !important;
    border-radius: 999px !important;
    font-size: 11px !important;
    line-height: 1 !important;
  }

  .vanessa-login-redesign {
    position: relative;
    padding-bottom: 88px;
    background: linear-gradient(180deg, #fff8fb 0%, #f7e8ef 100%);
    overflow: hidden;
  }

  .vanessa-login-redesign .vanessa-login-hero-clean {
    height: 300px;
    padding: 58px 18px 22px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 0 0 34px 34px;
    box-shadow: inset 0 -180px 120px rgba(0,0,0,.58);
    background-position: center 28%;
  }

  .vanessa-login-redesign .vanessa-login-copy {
    margin: 0;
    color: #fff;
  }

  .vanessa-login-redesign .vanessa-login-copy span {
    display: inline-flex;
    align-items: center;
    height: 28px;
    padding: 0 12px;
    border-radius: 999px;
    background: rgba(255,255,255,.16);
    border: 1px solid rgba(255,255,255,.28);
    color: rgba(255,255,255,.9);
    font-size: 10px;
    font-weight: 850;
    letter-spacing: .08em;
    text-transform: uppercase;
    backdrop-filter: blur(16px);
  }

  .vanessa-login-redesign .vanessa-login-copy h3 {
    max-width: 246px;
    margin: 12px 0 0;
    color: #fff;
    font-size: 28px;
    line-height: .98;
    letter-spacing: -.04em;
    font-weight: 650;
  }

  .vanessa-login-card-elevated {
    margin: -28px 18px 0;
    padding: 18px;
    border-radius: 30px;
    background: rgba(255,255,255,.92);
    border: 1px solid rgba(255,255,255,.78);
    box-shadow: 0 26px 80px rgba(95,45,67,.16), inset 0 1px 0 rgba(255,255,255,.9);
    backdrop-filter: blur(26px);
  }

  .vanessa-login-heading small {
    display: block;
    color: rgba(40,25,30,.44);
    font-size: 10px;
    font-weight: 850;
    letter-spacing: .12em;
    text-transform: uppercase;
  }

  .vanessa-login-heading h3 {
    margin: 6px 0 0;
    color: #1d1618;
    font-size: 24px;
    line-height: 1;
    letter-spacing: -.055em;
  }

  .vanessa-login-heading p {
    margin: 8px 0 0;
    color: rgba(29,22,24,.58);
    font-size: 12px;
    line-height: 1.42;
  }

  .vanessa-form-stack {
    display: grid;
    gap: 10px;
    margin-top: 14px;
  }

  .vanessa-login-card-elevated .login-field {
    min-height: 58px;
    margin: 0;
    padding: 10px 14px;
    border-radius: 18px;
    background: #fff8fb;
    border: 1px solid rgba(215,127,162,.16);
  }

  .vanessa-login-card-elevated .login-field span {
    display: block;
    color: rgba(29,22,24,.46);
    font-size: 10px;
    font-weight: 850;
    letter-spacing: .05em;
  }

  .vanessa-login-card-elevated .login-field input {
    width: 100%;
    margin-top: 4px;
    border: 0;
    outline: 0;
    background: transparent;
    color: #1d1618;
    font-size: 13px;
    font-weight: 700;
  }

  .login-actions-stack {
    display: grid;
    gap: 8px;
    margin-top: 12px;
  }

  .vanessa-login-card-elevated .main-btn {
    height: 48px;
    margin: 0;
    border-radius: 16px;
    font-size: 13px;
  }

  .vanessa-login-card-elevated .login-link {
    height: 30px;
    border: 0;
    background: transparent;
    color: #9f4e6d;
    font-size: 11px;
    font-weight: 850;
  }

  .vanessa-login-card-elevated .login-divider {
    margin: 8px 0;
  }

  .vanessa-login-card-elevated .social-login-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .vanessa-login-card-elevated .social-login-row button {
    height: 42px;
    border-radius: 15px;
    border: 1px solid rgba(29,22,24,.08);
    background: #fff;
    color: #1d1618;
    font-size: 12px;
    font-weight: 850;
  }

  .vanessa-login-card-elevated .register-copy {
    margin: 10px 0 0;
    text-align: center;
    color: rgba(29,22,24,.58);
    font-size: 11px;
    line-height: 1.2;
  }


  /* Patch final solicitado: Travel sin bienvenida, Explorar estático y Login Vanessa estilo Vogue */
  .travel-static-screen {
    height: 100%;
    overflow: hidden !important;
    padding: 58px 16px 84px;
    display: grid;
    grid-template-rows: auto auto auto auto 1fr;
    gap: 12px;
    background:
      radial-gradient(circle at 88% 8%, rgba(66,199,173,.16), transparent 30%),
      linear-gradient(180deg, #fbfffd 0%, #eef8f4 100%);
  }

  .travel-explore-vogue .mobile-topbar { margin-bottom: 0; }

  .travel-apple-hero-block {
    min-height: 252px;
    display: grid;
    grid-template-rows: 138px auto;
    overflow: hidden;
    border-radius: 30px;
    background: rgba(255,255,255,.92);
    border: 1px solid rgba(18,72,64,.08);
    box-shadow: 0 18px 48px rgba(18,72,64,.10);
  }

  .travel-apple-hero-photo {
    min-height: 138px;
    border-radius: 0;
    box-shadow: inset 0 -70px 70px rgba(0,0,0,.16);
  }

  .travel-apple-hero-content {
    padding: 14px 16px 16px;
  }

  .travel-apple-hero-content small {
    display: block;
    color: rgba(12,42,38,.46);
    font-size: 10px;
    line-height: 1.2;
    font-weight: 850;
    letter-spacing: .08em;
    text-transform: uppercase;
  }

  .travel-apple-hero-content h3 {
    margin: 6px 0 0;
    color: #10231f;
    font-size: 25px;
    line-height: .98;
    letter-spacing: -.055em;
    font-weight: 720;
  }

  .travel-apple-hero-content p {
    margin: 7px 0 0;
    max-width: 226px;
    color: rgba(16,35,31,.58);
    font-size: 11.5px;
    line-height: 1.42;
    letter-spacing: -.01em;
  }

  .travel-apple-meta-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
    margin-top: 10px;
  }

  .travel-apple-meta-row span {
    min-height: 30px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    background: #f1faf6;
    color: #1d7566;
    font-size: 10px;
    font-weight: 850;
    white-space: nowrap;
  }

  .travel-apple-filter-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  .travel-apple-filter-row button {
    height: 38px;
    border: 0;
    border-radius: 14px;
    background: rgba(255,255,255,.88);
    color: rgba(16,35,31,.68);
    font-size: 11px;
    font-weight: 850;
    box-shadow: inset 0 0 0 1px rgba(18,72,64,.07);
  }

  .travel-apple-section-title {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 12px;
    margin-top: 0;
  }

  .travel-apple-section-title strong {
    color: #10231f;
    font-size: 15px;
    line-height: 1;
    letter-spacing: -.03em;
  }

  .travel-apple-section-title span {
    color: rgba(16,35,31,.42);
    font-size: 10px;
    line-height: 1.15;
    font-weight: 750;
    text-align: right;
  }

  .travel-apple-reco-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    min-height: 0;
  }

  .travel-apple-reco-card {
    min-width: 0;
    min-height: 116px;
    border-radius: 22px;
    overflow: hidden;
    background: rgba(255,255,255,.90);
    box-shadow: 0 14px 34px rgba(18,72,64,.09);
  }

  .travel-apple-reco-card .photo {
    height: 64px;
    border-radius: 0;
    box-shadow: inset 0 -38px 38px rgba(0,0,0,.10);
  }

  .travel-apple-reco-card div:not(.photo) {
    padding: 9px 10px 0;
  }

  .travel-apple-reco-card strong,
  .travel-apple-reco-card small,
  .travel-apple-reco-card b {
    display: block;
  }

  .travel-apple-reco-card strong {
    color: #10231f;
    font-size: 12px;
    line-height: 1.1;
    letter-spacing: -.02em;
  }

  .travel-apple-reco-card small {
    margin-top: 3px;
    color: rgba(16,35,31,.46);
    font-size: 9.5px;
    line-height: 1.1;
  }

  .travel-apple-reco-card b {
    padding: 4px 10px 10px;
    color: #1d7566;
    font-size: 12px;
    line-height: 1;
  }

  .travel-explore-vogue .mobile-tabbar,
  .travel-static-screen .mobile-tabbar {
    bottom: 10px;
    height: 60px;
    padding: 6px;
    border-radius: 22px;
  }

  .travel-explore-vogue .mobile-tabbar button,
  .travel-static-screen .mobile-tabbar button {
    min-width: 0;
    height: 48px;
    gap: 2px;
    font-size: 8px;
    line-height: 1;
  }

  .vanessa-vogue-login {
    height: 100%;
    overflow: hidden !important;
    padding: 58px 16px 84px;
    display: grid;
    grid-template-rows: auto auto 1fr;
    gap: 12px;
    background: linear-gradient(180deg, #fff 0%, #fbf2f5 100%);
  }

  .vanessa-vogue-login .mobile-topbar { margin-bottom: 0; }
  .vanessa-vogue-login .mobile-topbar button {
    background: rgba(255,255,255,.86);
    box-shadow: inset 0 0 0 1px rgba(27,20,22,.06);
  }

  .vogue-login-editorial {
    display: grid;
    grid-template-columns: 92px 1fr;
    gap: 14px;
    align-items: center;
    min-height: 134px;
  }

  .vogue-login-image {
    width: 92px;
    height: 126px;
    border-radius: 999px 999px 20px 20px;
    box-shadow: 0 18px 42px rgba(79,40,54,.16);
  }

  .vogue-login-title span {
    display: block;
    color: rgba(29,22,24,.46);
    font-family: ui-serif, Georgia, serif;
    font-size: 11px;
    line-height: 1.2;
    letter-spacing: .18em;
    text-transform: uppercase;
  }

  .vogue-login-title h3 {
    margin: 8px 0 0;
    color: #171113;
    font-family: ui-serif, Georgia, serif;
    font-size: 31px;
    line-height: .92;
    letter-spacing: -.055em;
    font-weight: 500;
  }

  .vogue-login-title p {
    margin: 8px 0 0;
    color: rgba(29,22,24,.58);
    font-size: 11.5px;
    line-height: 1.45;
  }

  .vogue-login-form {
    min-height: 0;
    display: grid;
    align-content: start;
    gap: 9px;
    padding: 16px;
    border-radius: 28px;
    background: rgba(255,255,255,.82);
    border: 1px solid rgba(29,22,24,.07);
    box-shadow: 0 18px 52px rgba(79,40,54,.10);
  }

  .vogue-login-form label {
    display: block;
    height: 54px;
    padding: 9px 12px;
    border-radius: 16px;
    background: #fbf7f8;
    border: 1px solid rgba(29,22,24,.07);
  }

  .vogue-login-form label span {
    display: block;
    color: rgba(29,22,24,.44);
    font-size: 9px;
    line-height: 1;
    font-weight: 850;
    letter-spacing: .08em;
    text-transform: uppercase;
  }

  .vogue-login-form input {
    width: 100%;
    margin-top: 6px;
    border: 0;
    outline: 0;
    background: transparent;
    color: #171113;
    font-size: 13px;
    line-height: 1;
    font-weight: 650;
  }

  .vogue-primary-button {
    height: 46px;
    border: 0;
    border-radius: 999px;
    background: #171113;
    color: #fff;
    font-size: 12px;
    font-weight: 850;
    letter-spacing: .02em;
  }

  .vogue-text-button {
    height: 24px;
    border: 0;
    background: transparent;
    color: rgba(29,22,24,.58);
    font-size: 10.5px;
    font-weight: 750;
  }

  .vogue-social-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .vogue-social-row button {
    height: 40px;
    border-radius: 999px;
    border: 1px solid rgba(29,22,24,.10);
    background: #fff;
    color: #171113;
    font-size: 11px;
    font-weight: 850;
  }

  .vogue-login-form p {
    margin: 0;
    color: rgba(29,22,24,.52);
    text-align: center;
    font-size: 10.5px;
    line-height: 1.2;
  }

  .vogue-login-form p strong { color: #171113; }




  /* PATCH FINAL — Travel estático + Vanessa login editorial */
  .travel-apple.travel-scroll-safe {
    overflow: hidden !important;
    padding: 58px 18px 86px !important;
  }
  .travel-search-field { height: 46px !important; border-radius: 18px !important; font-size: 12px !important; padding: 0 14px !important; margin-top: 0 !important; }
  .travel-pill-row { gap: 8px !important; margin: 10px 0 12px !important; flex-wrap: nowrap !important; overflow: hidden !important; }
  .travel-pill-row button { height: 34px !important; padding: 0 12px !important; font-size: 10px !important; white-space: nowrap !important; }
  .travel-search-feature { min-height: 190px !important; border-radius: 28px !important; margin-top: 0 !important; }
  .travel-search-feature .travel-feature-copy h3 { max-width: 210px !important; font-size: 25px !important; line-height: .94 !important; letter-spacing: -.055em !important; }
  .travel-search-feature .travel-feature-copy p { max-width: 220px !important; font-size: 11px !important; line-height: 1.35 !important; }
  .travel-result-list { display: grid !important; gap: 10px !important; margin-top: 12px !important; }
  .travel-result-row { min-height: 64px !important; padding: 8px !important; border-radius: 20px !important; }
  .travel-result-row .photo { width: 48px !important; height: 48px !important; border-radius: 16px !important; }
  .travel-result-row strong { font-size: 12px !important; }
  .travel-result-row small { font-size: 10px !important; line-height: 1.25 !important; }
  .travel-booking-hero { min-height: 150px !important; border-radius: 28px !important; padding: 18px !important; margin-top: 0 !important; }
  .travel-booking-hero h3 { max-width: 210px !important; font-size: 27px !important; line-height: .94 !important; letter-spacing: -.06em !important; }
  .travel-checkout-card { margin-top: 12px !important; padding: 16px !important; border-radius: 26px !important; }
  .checkout-line { min-height: 36px !important; padding: 8px 0 !important; }
  .checkout-line span, .checkout-line strong { font-size: 12px !important; }
  .checkout-price { margin-top: 10px !important; padding-top: 12px !important; }
  .checkout-price strong { font-size: 22px !important; }
  .travel-itinerary-card { min-height: 136px !important; padding: 18px !important; border-radius: 28px !important; margin-top: 0 !important; }
  .travel-itinerary-card h3 { max-width: 230px !important; font-size: 24px !important; line-height: .95 !important; letter-spacing: -.055em !important; }
  .travel-itinerary-card p { max-width: 230px !important; font-size: 11px !important; line-height: 1.35 !important; }
  .travel-timeline-clean { display: grid !important; gap: 10px !important; margin-top: 12px !important; }
  .travel-timeline-clean article { min-height: 74px !important; padding: 9px !important; border-radius: 22px !important; grid-template-columns: 54px 1fr !important; }
  .travel-timeline-clean .photo { width: 54px !important; height: 54px !important; border-radius: 16px !important; }
  .travel-timeline-clean span { font-size: 10px !important; }
  .travel-timeline-clean strong { font-size: 12px !important; line-height: 1.1 !important; }
  .travel-timeline-clean small { font-size: 10px !important; line-height: 1.25 !important; }
  .travel-pass-apple .verification-badge.sand { transform: scale(.78) !important; transform-origin: right center !important; padding: 6px 8px !important; font-size: 9px !important; opacity: .82 !important; box-shadow: none !important; }
  .travel-pass-apple .pass-status-row { align-items: center !important; gap: 8px !important; }

  .vanessa-vogue-signin-final { position: relative; overflow: hidden; height: 100%; padding: 62px 24px 34px; background: radial-gradient(circle at 50% 0%, rgba(255, 221, 234, .70), transparent 34%), linear-gradient(180deg, #fffafb 0%, #fff5f8 42%, #f7dde7 100%); color: #171113; }
  .vanessa-vogue-signin-final::before { content: ""; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(90deg, rgba(160, 72, 104, .05), transparent 22%, transparent 78%, rgba(160, 72, 104, .05)), radial-gradient(circle at 50% 50%, transparent 44%, rgba(255,255,255,.72)); }
  .vanessa-vogue-logo { position: relative; z-index: 2; text-align: center; color: #1b1215; font-family: Georgia, "Times New Roman", serif; font-size: 15px; font-weight: 500; letter-spacing: .55em; text-indent: .55em; }
  .vanessa-vogue-access { position: relative; z-index: 2; margin-top: 110px; }
  .vanessa-vogue-copy h3 { margin: 0; color: #171113; font-family: Georgia, "Times New Roman", serif; font-size: 54px; font-weight: 400; line-height: .92; letter-spacing: -.075em; }
  .vanessa-vogue-copy p { margin: 18px 0 0; color: rgba(23, 17, 19, .50); font-size: 15px; font-weight: 400; letter-spacing: -.02em; }
  .vanessa-vogue-form { margin-top: 48px; display: grid; gap: 26px; }
  .vanessa-vogue-form label:not(.vanessa-vogue-check) { display: grid; gap: 8px; }
  .vanessa-vogue-form label:not(.vanessa-vogue-check) span { color: rgba(23, 17, 19, .48); font-size: 13px; font-weight: 400; letter-spacing: -.01em; }
  .vanessa-vogue-form input[type="email"], .vanessa-vogue-form input[type="password"] { width: 100%; height: 30px; border: 0; border-bottom: 1px solid rgba(114, 74, 88, .24); outline: 0; background: transparent; color: #171113; font-size: 14px; border-radius: 0; }
  .vanessa-vogue-options { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-top: 4px; }
  .vanessa-vogue-check { display: inline-flex !important; align-items: center; gap: 10px !important; color: #171113; font-size: 12px; }
  .vanessa-vogue-check input { appearance: none; width: 16px; height: 16px; border: 1px solid rgba(23,17,19,.58); background: transparent; border-radius: 0; }
  .vanessa-vogue-options button, .vanessa-vogue-create { border: 0; background: transparent; color: #171113; font-size: 12px; font-weight: 400; padding: 0; }
  .vanessa-vogue-submit { height: 56px; margin-top: 22px; border: 0; border-radius: 0; background: radial-gradient(circle at 50% 0%, rgba(255, 214, 228, .18), transparent 42%), linear-gradient(90deg, #171113, #3a2029 52%, #171113); color: #fff9fb; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: .42em; text-indent: .42em; box-shadow: 0 20px 54px rgba(73, 30, 46, .22); }
  .vanessa-vogue-divider { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 16px; margin-top: 18px; color: rgba(23,17,19,.40); font-size: 12px; }
  .vanessa-vogue-divider::before, .vanessa-vogue-divider::after { content: ""; height: 1px; background: rgba(114, 74, 88, .20); }
  .vanessa-vogue-create { width: fit-content; justify-self: center; border-bottom: 1px solid rgba(23,17,19,.38); padding-bottom: 4px; font-size: 13px; }
  .vanessa-vogue-footer { position: absolute; left: 24px; right: 24px; bottom: 28px; z-index: 2; text-align: center; color: rgba(23,17,19,.38); font-size: 10px; font-weight: 500; letter-spacing: .38em; text-transform: uppercase; }

  /* ===== PATCH FINAL SOLICITADO: TRAVEL SIN RESERVA + LABELS SIN NÚMERO + VANESSA VOGUE PALETA ===== */
  .screen-label { grid-template-columns: 1fr !important; gap: 4px !important; margin-bottom: 18px !important; }
  .screen-label span { display: none !important; }
  .screen-label strong { font-size: 18px !important; line-height: 1.08 !important; letter-spacing: -.035em !important; }
  .screen-label small { font-size: 12px !important; color: rgba(255,255,255,.44) !important; }

  .vanessa-vogue-signin-final {
    padding: 46px 24px 28px !important;
    background:
      radial-gradient(circle at 50% -8%, rgba(255,193,217,.58), transparent 31%),
      linear-gradient(180deg, #fffafb 0%, #fff5f8 48%, #f8e6ee 100%) !important;
    color: #171113 !important;
  }
  .vanessa-vogue-signin-final::before {
    background:
      linear-gradient(90deg, rgba(159,78,109,.055), transparent 24%, transparent 76%, rgba(215,127,162,.06)),
      radial-gradient(circle at 50% 52%, transparent 42%, rgba(255,255,255,.76)) !important;
  }
  .vanessa-vogue-logo {
    color: #4a2432 !important;
    font-family: Georgia, "Times New Roman", serif !important;
    font-size: 15px !important;
    letter-spacing: .52em !important;
    text-indent: .52em !important;
  }
  .vanessa-vogue-access {
    margin-top: 78px !important;
  }
  .vanessa-vogue-copy h3 {
    color: #1b1014 !important;
    font-size: 48px !important;
    line-height: .92 !important;
    letter-spacing: -.075em !important;
  }
  .vanessa-vogue-copy p {
    margin-top: 14px !important;
    color: rgba(74,36,50,.54) !important;
    font-size: 14px !important;
  }
  .vanessa-vogue-form {
    margin-top: 36px !important;
    gap: 20px !important;
  }
  .vanessa-vogue-form label:not(.vanessa-vogue-check) {
    gap: 7px !important;
  }
  .vanessa-vogue-form label:not(.vanessa-vogue-check) span {
    color: rgba(74,36,50,.54) !important;
    font-size: 13px !important;
  }
  .vanessa-vogue-form input[type="email"],
  .vanessa-vogue-form input[type="password"] {
    height: 28px !important;
    border-bottom-color: rgba(159,78,109,.26) !important;
    color: #1b1014 !important;
  }
  .vanessa-vogue-options {
    margin-top: 0 !important;
    gap: 12px !important;
  }
  .vanessa-vogue-check {
    gap: 9px !important;
    color: #2a171e !important;
    font-size: 12px !important;
  }
  .vanessa-vogue-check input {
    width: 15px !important;
    height: 15px !important;
    border-color: rgba(74,36,50,.62) !important;
  }
  .vanessa-vogue-options button,
  .vanessa-vogue-create {
    color: #4a2432 !important;
    font-size: 12px !important;
  }
  .vanessa-vogue-submit {
    height: 54px !important;
    margin-top: 12px !important;
    background:
      radial-gradient(circle at 50% 0%, rgba(255,193,217,.18), transparent 42%),
      linear-gradient(90deg, #1b1014, #5b2a3d 52%, #1b1014) !important;
    color: #fffafb !important;
    letter-spacing: .36em !important;
    text-indent: .36em !important;
    box-shadow: 0 20px 54px rgba(91,42,61,.20) !important;
  }
  .vanessa-vogue-divider {
    margin-top: 8px !important;
    gap: 14px !important;
    color: rgba(74,36,50,.42) !important;
  }
  .vanessa-vogue-divider::before,
  .vanessa-vogue-divider::after {
    background: rgba(159,78,109,.20) !important;
  }
  .vanessa-vogue-create {
    border-bottom-color: rgba(159,78,109,.38) !important;
    color: #2a171e !important;
    font-size: 13px !important;
    padding-bottom: 4px !important;
  }
  .vanessa-vogue-footer { display: none !important; }


  /* ===== AJUSTE ÚNICO — VANESSA LOGIN BALANCEADO / PREMIUM / CREAR CUENTA VISIBLE ===== */
  .vanessa-vogue-signin-final {
    height: 100% !important;
    overflow: hidden !important;
    padding: 42px 24px 22px !important;
    display: grid !important;
    grid-template-rows: auto 1fr !important;
    background:
      radial-gradient(circle at 50% -12%, rgba(255,193,217,.48), transparent 30%),
      radial-gradient(circle at 50% 72%, rgba(215,127,162,.10), transparent 42%),
      linear-gradient(180deg, #fffafb 0%, #fff6f9 48%, #f8e6ee 100%) !important;
  }

  .vanessa-vogue-signin-final::before {
    background:
      linear-gradient(90deg, rgba(159,78,109,.04), transparent 24%, transparent 76%, rgba(159,78,109,.04)),
      radial-gradient(circle at 50% 54%, transparent 45%, rgba(255,255,255,.68)) !important;
  }

  .vanessa-vogue-logo {
    align-self: start !important;
    padding-top: 4px !important;
    color: #4a2432 !important;
    font-size: 14px !important;
    line-height: 1 !important;
    letter-spacing: .48em !important;
    text-indent: .48em !important;
  }

  .vanessa-vogue-access {
    margin-top: 0 !important;
    align-self: center !important;
    transform: translateY(6px) !important;
    display: grid !important;
    gap: 0 !important;
  }

  .vanessa-vogue-copy h3 {
    font-size: 42px !important;
    line-height: .92 !important;
    letter-spacing: -.074em !important;
    color: #1b1014 !important;
  }

  .vanessa-vogue-copy p {
    margin-top: 12px !important;
    font-size: 13px !important;
    line-height: 1.3 !important;
    color: rgba(74,36,50,.54) !important;
  }

  .vanessa-vogue-form {
    margin-top: 30px !important;
    display: grid !important;
    gap: 17px !important;
  }

  .vanessa-vogue-form label:not(.vanessa-vogue-check) {
    gap: 5px !important;
  }

  .vanessa-vogue-form label:not(.vanessa-vogue-check) span {
    font-size: 12px !important;
    line-height: 1 !important;
    color: rgba(74,36,50,.54) !important;
  }

  .vanessa-vogue-form input[type="email"],
  .vanessa-vogue-form input[type="password"] {
    height: 24px !important;
    border-bottom: 1px solid rgba(159,78,109,.24) !important;
    font-size: 13px !important;
  }

  .vanessa-vogue-options {
    margin-top: -1px !important;
    display: grid !important;
    grid-template-columns: 1fr auto !important;
    align-items: center !important;
    gap: 10px !important;
  }

  .vanessa-vogue-check {
    min-width: 0 !important;
    gap: 8px !important;
    font-size: 11.5px !important;
    line-height: 1 !important;
    color: #2a171e !important;
  }

  .vanessa-vogue-check input {
    width: 14px !important;
    height: 14px !important;
    flex: 0 0 14px !important;
    border-color: rgba(74,36,50,.60) !important;
  }

  .vanessa-vogue-options button {
    max-width: 120px !important;
    text-align: right !important;
    font-size: 11px !important;
    line-height: 1.18 !important;
    color: #4a2432 !important;
  }

  .vanessa-vogue-submit {
    height: 48px !important;
    margin-top: 7px !important;
    font-size: 11px !important;
    letter-spacing: .32em !important;
    text-indent: .32em !important;
    background:
      radial-gradient(circle at 50% 0%, rgba(255,193,217,.20), transparent 42%),
      linear-gradient(90deg, #1b1014, #5b2a3d 52%, #1b1014) !important;
    box-shadow: 0 18px 42px rgba(91,42,61,.18) !important;
  }

  .vanessa-vogue-divider {
    margin-top: 4px !important;
    gap: 12px !important;
    font-size: 11px !important;
    color: rgba(74,36,50,.40) !important;
  }

  .vanessa-vogue-divider::before,
  .vanessa-vogue-divider::after {
    background: rgba(159,78,109,.19) !important;
  }

  .vanessa-vogue-create {
    justify-self: center !important;
    margin-top: -2px !important;
    padding: 0 0 4px !important;
    border-bottom: 1px solid rgba(159,78,109,.38) !important;
    color: #2a171e !important;
    font-size: 12.5px !important;
    line-height: 1.1 !important;
  }



  /* VANESSA TIENDA — filtros encuadrados premium */
  .vanessa-shop-premium .luxury-segments.refined-filters {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    align-items: center;
    gap: 8px;
    margin-top: 14px;
    padding: 8px;
    border-radius: 28px;
    background: rgba(255,255,255,.54);
    border: 1px solid rgba(255,255,255,.72);
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.82), 0 18px 44px rgba(136,69,101,.08);
  }

  .vanessa-shop-premium .luxury-segments.refined-filters span {
    width: 100%;
    min-width: 0;
    min-height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0 6px;
    border-radius: 20px;
    background: rgba(255,255,255,.82);
    color: rgba(58,34,44,.66);
    font-size: 11.5px;
    font-weight: 780;
    letter-spacing: -.02em;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    box-shadow: inset 0 1px 0 rgba(255,255,255,.9), 0 8px 18px rgba(118,56,84,.05);
  }

  .vanessa-shop-premium .shop-editorial-hero {
    margin-top: 16px;
  }


  /* Case study visual editorial */
  .case-study-section {
    position: relative;
    padding: 132px 6vw;
    background: #030303;
  }

  .case-copy-block {
    max-width: 1100px;
    margin-bottom: 64px;
  }

  .case-copy-block.narrow { max-width: 900px; }

  .case-copy-block h2 {
    margin: 28px 0 0;
    color: #f5f5f7;
    font-size: clamp(3.2rem, 6.6vw, 7.8rem);
    line-height: .88;
    letter-spacing: -.045em;
    font-weight: 360;
  }

  .case-copy-block p:not(.eyebrow) {
    max-width: 780px;
    margin: 28px 0 0;
    color: rgba(245,245,247,.68);
    font-size: clamp(1rem, 1.3vw, 1.18rem);
    line-height: 1.78;
  }

  .case-dashboard-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }

  .case-dashboard-grid article,
  .evidence-card,
  .research-panel,
  .journey-visual-grid article,
  .decision-table article,
  .metric-panel {
    border: 1px solid rgba(255,255,255,.09);
    background: rgba(255,255,255,.045);
    border-radius: 38px;
    padding: 28px;
    box-shadow: inset 0 1px 0 rgba(255,255,255,.045);
  }

  .case-dashboard-grid span,
  .research-panel small,
  .evidence-card small,
  .decision-table small,
  .blueprint-mini small {
    display: block;
    color: rgba(255,255,255,.46);
    font-size: 11px;
    font-weight: 850;
    letter-spacing: .18em;
    text-transform: uppercase;
  }

  .case-dashboard-grid strong,
  .decision-table strong {
    display: block;
    margin-top: 22px;
    color: #fff;
    font-size: 24px;
    line-height: 1.04;
    letter-spacing: -.05em;
  }

  .case-dashboard-grid p,
  .research-panel p,
  .evidence-card p,
  .blueprint-mini p,
  .decision-table p,
  .metric-panel p {
    margin: 16px 0 0;
    color: rgba(245,245,247,.66);
    font-size: 14px;
    line-height: 1.66;
  }

  .visual-evidence-section {
    overflow: hidden;
    background: radial-gradient(circle at 8% 18%, rgba(191,234,216,.12), transparent 30%), #030303;
  }

  .evidence-showcase {
    display: grid;
    grid-template-columns: 340px 292px 292px 1fr;
    gap: 28px;
    align-items: center;
    margin-top: 36px;
  }

  .evidence-showcase.fashion-evidence {
    grid-template-columns: 1fr 292px 292px 340px;
    background: radial-gradient(circle at 90% 40%, rgba(255,193,217,.11), transparent 34%);
  }

  .evidence-phone {
    display: flex;
    justify-content: center;
    transform: scale(.94);
    transform-origin: center;
  }

  .evidence-phone.large { transform: scale(1.08); z-index: 2; }
  .evidence-phone .device { width: 292px; }

  .evidence-card {
    min-height: 430px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .evidence-card.travel-card {
    background: radial-gradient(circle at 78% 12%, rgba(191,234,216,.14), transparent 32%), rgba(255,255,255,.045);
  }

  .evidence-card.fashion-card {
    background: radial-gradient(circle at 78% 12%, rgba(255,193,217,.16), transparent 32%), rgba(255,255,255,.045);
  }

  .evidence-card h3,
  .research-panel h3,
  .journey-visual-grid h3,
  .metric-panel h3 {
    margin: 18px 0 0;
    color: white;
    font-size: clamp(2rem, 3.4vw, 4.4rem);
    line-height: .94;
    letter-spacing: -.042em;
    font-weight: 400;
  }

  .research-grid-premium {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .research-panel {
    padding: 14px;
    overflow: hidden;
  }

  .research-panel > div:not(.photo) { padding: 24px; }
  .research-image { height: 300px; border-radius: 28px; box-shadow: inset 0 -120px 100px rgba(0,0,0,.32); }
  .travel-panel { background: radial-gradient(circle at 80% 8%, rgba(191,234,216,.12), transparent 30%), rgba(255,255,255,.045); }
  .fashion-panel { background: radial-gradient(circle at 80% 8%, rgba(255,193,217,.14), transparent 30%), rgba(255,255,255,.045); }

  .benchmark-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 22px;
  }

  .benchmark-row span {
    min-height: 34px;
    display: inline-flex;
    align-items: center;
    padding: 0 12px;
    border-radius: 999px;
    background: rgba(255,255,255,.08);
    color: rgba(255,255,255,.70);
    font-size: 12px;
    font-weight: 800;
  }

  .journey-visual-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .journey-line {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 8px;
    margin-top: 28px;
  }

  .journey-line span {
    min-height: 74px;
    border-radius: 20px;
    display: grid;
    place-items: center;
    text-align: center;
    padding: 10px;
    background: rgba(191,234,216,.13);
    color: #bfead8;
    font-size: 11px;
    font-weight: 850;
  }

  .journey-line.fashion-line span {
    background: rgba(255,193,217,.13);
    color: #ffc1d9;
  }

  .blueprint-mini {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 18px;
  }

  .blueprint-mini div {
    min-height: 154px;
    border-radius: 22px;
    background: rgba(255,255,255,.055);
    padding: 16px;
  }

  .decision-table { display: grid; gap: 14px; }
  .decision-table article {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 280px 64px;
    gap: 22px;
    align-items: center;
    padding: 20px 24px;
    border-radius: 28px;
  }

  .decision-table strong { margin-top: 8px; font-size: 18px; }
  .decision-table p { margin-top: 6px; font-size: 12px; }

  .score-bar {
    height: 12px;
    border-radius: 999px;
    background: rgba(255,255,255,.08);
    overflow: hidden;
  }

  .score-bar i {
    display: block;
    width: var(--score);
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, #bfead8, #ffc1d9);
  }

  .decision-table b {
    color: #fff;
    font-size: 18px;
    letter-spacing: -.03em;
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .metric-rings {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-top: 26px;
  }

  .metric-rings div {
    aspect-ratio: 1;
    border-radius: 50%;
    display: grid;
    place-items: center;
    text-align: center;
    padding: 18px;
    background: radial-gradient(circle, rgba(191,234,216,.12) 56%, transparent 58%), conic-gradient(#bfead8 0 78%, rgba(255,255,255,.08) 78% 100%);
  }

  .metric-rings.fashion-rings div {
    background: radial-gradient(circle, rgba(255,193,217,.12) 56%, transparent 58%), conic-gradient(#ffc1d9 0 78%, rgba(255,255,255,.08) 78% 100%);
  }

  .metric-rings span {
    display: block;
    color: white;
    font-size: 26px;
    font-weight: 800;
    letter-spacing: -.04em;
  }

  .metric-rings small {
    display: block;
    margin-top: 4px;
    color: rgba(255,255,255,.58);
    font-size: 10px;
    line-height: 1.2;
  }

  .screen-label.no-number {
    display: block;
  }

  .screen-label.no-number strong,
  .screen-label.no-number small {
    display: block;
  }

  .screen-label.no-number small { margin-top: 5px; }


  /* Métricas premium — dashboard dinámico */
  .performance-section {
    background: radial-gradient(circle at 18% 0%, rgba(191,234,216,.10), transparent 28%), radial-gradient(circle at 86% 18%, rgba(255,193,217,.10), transparent 30%), #030303;
  }
  .performance-dashboard { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
  .performance-panel { position: relative; overflow: hidden; border: 1px solid rgba(255,255,255,.09); border-radius: 42px; padding: 28px; background: rgba(255,255,255,.045); box-shadow: inset 0 1px 0 rgba(255,255,255,.05), 0 32px 90px rgba(0,0,0,.22); }
  .performance-panel::before { content: ""; position: absolute; inset: -35% -20% auto; height: 260px; background: linear-gradient(90deg, transparent, rgba(255,255,255,.11), transparent); transform: rotate(-14deg); pointer-events: none; }
  .performance-header { position: relative; z-index: 2; display: grid; grid-template-columns: 1fr 106px; gap: 22px; align-items: start; }
  .performance-header small, .senior-ux-note small { display: block; color: rgba(255,255,255,.46); font-size: 11px; font-weight: 850; letter-spacing: .22em; text-transform: uppercase; }
  .performance-header h3 { margin: 14px 0 0; color: white; font-size: clamp(1.9rem, 3vw, 3.7rem); line-height: .96; letter-spacing: -.032em; font-weight: 400; }
  .performance-index { width: 106px; height: 106px; display: grid; place-items: center; text-align: center; border-radius: 34px; background: radial-gradient(circle at 50% 46%, rgba(3,3,3,.88) 0 44%, transparent 45%), conic-gradient(#bfead8 0 82%, rgba(255,255,255,.10) 82% 100%); box-shadow: inset 0 1px 0 rgba(255,255,255,.12); }
  .performance-index.fashion-index { background: radial-gradient(circle at 50% 46%, rgba(3,3,3,.88) 0 44%, transparent 45%), conic-gradient(#ffc1d9 0 86%, rgba(255,255,255,.10) 86% 100%); }
  .performance-index span { display: block; color: white; font-size: 34px; line-height: .9; font-weight: 780; letter-spacing: -.04em; }
  .performance-index small { margin-top: 3px; color: rgba(255,255,255,.50); font-size: 9px; letter-spacing: .08em; }
  .performance-chart { position: relative; z-index: 2; height: 240px; display: grid; grid-template-columns: repeat(3, 1fr); align-items: end; gap: 14px; margin-top: 34px; padding: 18px; border-radius: 32px; background: linear-gradient(to top, rgba(255,255,255,.07) 1px, transparent 1px), rgba(255,255,255,.045); background-size: 100% 25%; }
  .performance-chart div { height: 100%; display: grid; grid-template-rows: 1fr auto; align-items: end; gap: 10px; }
  .performance-chart i { width: 100%; height: var(--bar); min-height: 34px; align-self: end; border-radius: 18px 18px 10px 10px; background: linear-gradient(180deg, rgba(255,255,255,.46), rgba(255,255,255,0) 38%), linear-gradient(180deg, #bfead8, #42c7ad); box-shadow: 0 18px 38px rgba(66,199,173,.16); }
  .performance-chart.fashion-chart i { background: linear-gradient(180deg, rgba(255,255,255,.46), rgba(255,255,255,0) 38%), linear-gradient(180deg, #ffc1d9, #d77fa2); box-shadow: 0 18px 38px rgba(215,127,162,.16); }
  .performance-chart span { color: rgba(255,255,255,.62); font-size: 11px; font-weight: 850; text-align: center; line-height: 1.15; }
  .performance-list { position: relative; z-index: 2; display: grid; gap: 10px; margin-top: 18px; }
  .performance-row { display: grid; grid-template-columns: minmax(0, 1fr) 150px 54px; gap: 14px; align-items: center; min-height: 70px; padding: 12px; border-radius: 22px; background: rgba(255,255,255,.055); border: 1px solid rgba(255,255,255,.055); }
  .performance-label strong, .performance-label small { display: block; }
  .performance-label strong { color: white; font-size: 14px; letter-spacing: -.01em; }
  .performance-label small { margin-top: 4px; color: rgba(255,255,255,.54); font-size: 11px; line-height: 1.35; }
  .performance-track { height: 9px; border-radius: 999px; overflow: hidden; background: rgba(255,255,255,.09); }
  .performance-track i { display: block; width: var(--value); height: 100%; border-radius: inherit; background: linear-gradient(90deg, #bfead8, #ffc1d9); }
  .performance-row b { color: white; font-size: 15px; letter-spacing: -.02em; text-align: right; }
  .senior-ux-note { margin-top: 24px; border-radius: 34px; padding: 30px; border: 1px solid rgba(255,255,255,.09); background: linear-gradient(135deg, rgba(255,255,255,.07), rgba(255,255,255,.035)); }
  .senior-ux-note p { max-width: 980px; margin: 16px 0 0; color: rgba(245,245,247,.70); font-size: clamp(1rem, 1.2vw, 1.16rem); line-height: 1.75; letter-spacing: -.01em; }

  @media (max-width: 1180px) {
    .case-dashboard-grid,
    .research-grid-premium,
    .journey-visual-grid,
    .metrics-grid, .performance-dashboard { grid-template-columns: 1fr; }
    .evidence-showcase,
    .evidence-showcase.fashion-evidence { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .evidence-card { min-height: 300px; }
    .decision-table article { grid-template-columns: 1fr; }
    .blueprint-mini { grid-template-columns: 1fr; }
  }

  @media (max-width: 760px) {
    .case-study-section { padding: 90px 24px; }
    .evidence-showcase,
    .evidence-showcase.fashion-evidence { grid-template-columns: 1fr; }
    .journey-line { grid-template-columns: repeat(2, 1fr); }
    .metric-rings { grid-template-columns: 1fr; }
    .performance-row { grid-template-columns: 1fr; }
    .performance-track { width: 100%; }
    .metric-rings div { aspect-ratio: auto; min-height: 130px; border-radius: 28px; }
  }


  /* Metrics Pro v2 · dashboard dinámico senior */
  .pro-heading-fix h2 {
    max-width: 1180px;
    font-size: clamp(3.6rem, 7.2vw, 8.4rem);
    line-height: .94;
    letter-spacing: -.026em;
    text-wrap: balance;
  }

  .pro-performance-section {
    overflow: hidden;
    background:
      radial-gradient(circle at 12% 10%, rgba(191,234,216,.10), transparent 30%),
      radial-gradient(circle at 88% 18%, rgba(255,193,217,.10), transparent 30%),
      #030303;
  }

  .pro-performance-dashboard {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
  }

  .pro-performance-panel {
    position: relative;
    overflow: hidden;
    min-height: 650px;
    border-radius: 44px;
    padding: 30px;
    border: 1px solid rgba(255,255,255,.10);
    background:
      linear-gradient(145deg, rgba(255,255,255,.075), rgba(255,255,255,.028)),
      #080808;
    box-shadow: inset 0 1px 0 rgba(255,255,255,.06), 0 44px 110px rgba(0,0,0,.30);
  }

  .pro-performance-panel::before {
    content: "";
    position: absolute;
    inset: -120px -120px auto auto;
    width: 310px;
    height: 310px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(191,234,216,.16), transparent 66%);
    filter: blur(12px);
    pointer-events: none;
  }

  .pro-performance-panel.fashion-panel::before {
    background: radial-gradient(circle, rgba(255,193,217,.18), transparent 66%);
  }

  .pro-panel-header {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: 1fr 116px;
    gap: 24px;
    align-items: start;
  }

  .pro-panel-header small,
  .pro-senior-note small {
    display: block;
    color: rgba(255,255,255,.48);
    font-size: 11px;
    font-weight: 850;
    letter-spacing: .24em;
    text-transform: uppercase;
  }

  .pro-panel-header h3 {
    margin: 14px 0 0;
    color: white;
    font-size: clamp(2rem, 3.2vw, 4rem);
    line-height: .98;
    letter-spacing: -.028em;
    font-weight: 420;
    text-wrap: balance;
  }

  .pro-index {
    width: 116px;
    height: 116px;
    display: grid;
    place-items: center;
    text-align: center;
    border-radius: 36px;
    background:
      radial-gradient(circle at 50% 50%, #080808 0 44%, transparent 45%),
      conic-gradient(#bfead8 0 82%, rgba(255,255,255,.10) 82% 100%);
    animation: softPulse 3.6s ease-in-out infinite;
    box-shadow: inset 0 1px 0 rgba(255,255,255,.10), 0 22px 55px rgba(191,234,216,.08);
  }

  .pro-index.fashion-index {
    background:
      radial-gradient(circle at 50% 50%, #080808 0 44%, transparent 45%),
      conic-gradient(#ffc1d9 0 86%, rgba(255,255,255,.10) 86% 100%);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.10), 0 22px 55px rgba(255,193,217,.08);
  }

  .pro-index span {
    display: block;
    color: #fff;
    font-size: 36px;
    line-height: .86;
    font-weight: 800;
    letter-spacing: -.045em;
  }

  .pro-index small {
    margin-top: 5px;
    color: rgba(255,255,255,.52);
    font-size: 9px;
    letter-spacing: .10em;
  }

  .pro-metric-grid {
    position: relative;
    z-index: 2;
    display: grid;
    gap: 14px;
    margin-top: 30px;
  }

  .pro-metric-card {
    position: relative;
    overflow: hidden;
    border-radius: 30px;
    padding: 18px;
    background: rgba(255,255,255,.055);
    border: 1px solid rgba(255,255,255,.07);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.05);
    opacity: 0;
    transform: translateY(18px);
    animation: metricReveal .85s cubic-bezier(.2,.8,.2,1) forwards;
    animation-delay: var(--delay);
  }

  .pro-metric-card::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(110deg, transparent, rgba(255,255,255,.065), transparent);
    transform: translateX(-120%);
    animation: metricSweep 5.2s ease-in-out infinite;
    animation-delay: calc(var(--delay) + 800ms);
    pointer-events: none;
  }

  .pro-metric-card-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 18px;
  }

  .pro-metric-card small,
  .pro-metric-card strong {
    display: block;
  }

  .pro-metric-card small {
    color: rgba(255,255,255,.45);
    font-size: 10px;
    font-weight: 850;
    letter-spacing: .18em;
    text-transform: uppercase;
  }

  .pro-metric-card strong {
    margin-top: 6px;
    color: #fff;
    font-size: 15px;
    line-height: 1.22;
    letter-spacing: -.012em;
  }

  .pro-metric-card b {
    min-width: 64px;
    height: 38px;
    display: inline-grid;
    place-items: center;
    border-radius: 999px;
    color: #061f1a;
    background: #bfead8;
    font-size: 14px;
    letter-spacing: -.02em;
  }

  .pro-metric-card.fashion b {
    color: #431b2b;
    background: #ffc1d9;
  }

  .pro-metric-visual {
    display: grid;
    grid-template-columns: 92px 1fr;
    gap: 16px;
    align-items: center;
    margin-top: 18px;
  }

  .pro-radial {
    width: 92px;
    height: 92px;
    display: grid;
    place-items: center;
    text-align: center;
    border-radius: 50%;
    background:
      radial-gradient(circle at 50% 50%, #101010 0 52%, transparent 53%),
      conic-gradient(#bfead8 0 var(--value), rgba(255,255,255,.10) var(--value) 100%);
  }

  .pro-metric-card.fashion .pro-radial {
    background:
      radial-gradient(circle at 50% 50%, #101010 0 52%, transparent 53%),
      conic-gradient(#ffc1d9 0 var(--value), rgba(255,255,255,.10) var(--value) 100%);
  }

  .pro-radial span {
    color: white;
    font-size: 26px;
    font-weight: 820;
    line-height: .85;
    letter-spacing: -.04em;
  }

  .pro-radial small {
    margin-top: 4px;
    font-size: 8px;
    letter-spacing: .12em;
  }

  .pro-trend-bars {
    height: 104px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 7px;
    align-items: end;
    padding: 12px;
    border-radius: 22px;
    background:
      linear-gradient(to top, rgba(255,255,255,.06) 1px, transparent 1px),
      rgba(255,255,255,.04);
    background-size: 100% 25%;
  }

  .pro-trend-bars i {
    display: block;
    height: var(--bar);
    min-height: 12px;
    border-radius: 999px 999px 8px 8px;
    background: linear-gradient(180deg, #eafff7, #42c7ad);
    transform-origin: bottom;
    transform: scaleY(0);
    animation: barGrow .9s cubic-bezier(.2,.8,.2,1) forwards;
    animation-delay: calc(var(--delay) + var(--bar-delay) + 240ms);
  }

  .pro-metric-card.fashion .pro-trend-bars i {
    background: linear-gradient(180deg, #fff0f6, #d77fa2);
  }

  .pro-progress-track {
    height: 9px;
    margin-top: 16px;
    border-radius: 999px;
    overflow: hidden;
    background: rgba(255,255,255,.09);
  }

  .pro-progress-track i {
    display: block;
    width: var(--value);
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, #bfead8, #42c7ad);
    transform-origin: left;
    transform: scaleX(0);
    animation: trackGrow 1.1s cubic-bezier(.2,.8,.2,1) forwards;
    animation-delay: calc(var(--delay) + 420ms);
  }

  .pro-metric-card.fashion .pro-progress-track i {
    background: linear-gradient(90deg, #ffc1d9, #d77fa2);
  }

  .pro-senior-note {
    position: relative;
    overflow: hidden;
    margin-top: 26px;
    padding: 34px;
    border-radius: 38px;
    border: 1px solid rgba(255,255,255,.10);
    background: linear-gradient(145deg, rgba(255,255,255,.075), rgba(255,255,255,.032));
  }

  .pro-senior-note p {
    max-width: 1080px;
    margin: 16px 0 0;
    color: rgba(245,245,247,.74);
    font-size: clamp(1rem, 1.25vw, 1.18rem);
    line-height: 1.78;
    letter-spacing: -.01em;
  }

  .final-cta-section {
    min-height: 90vh;
  }

  .final-cta-content h2 {
    letter-spacing: -.026em;
    line-height: .94;
    text-wrap: balance;
  }

  .final-cta-actions {
    display: flex;
    justify-content: center;
    gap: 14px;
    flex-wrap: wrap;
    margin-top: 42px;
  }

  .final-cta-actions .primary-action,
  .final-cta-actions .secondary-action {
    margin-top: 0;
  }

  @keyframes metricReveal {
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes metricSweep {
    0%, 48% { transform: translateX(-120%); }
    72%, 100% { transform: translateX(120%); }
  }

  @keyframes barGrow {
    to { transform: scaleY(1); }
  }

  @keyframes trackGrow {
    to { transform: scaleX(1); }
  }

  @keyframes softPulse {
    0%, 100% { transform: scale(1); filter: brightness(1); }
    50% { transform: scale(1.025); filter: brightness(1.08); }
  }

  @media (max-width: 1100px) {
    .pro-performance-dashboard { grid-template-columns: 1fr; }
    .pro-heading-fix h2 { font-size: clamp(3rem, 10vw, 6rem); }
  }

  @media (max-width: 720px) {
    .pro-panel-header,
    .pro-metric-visual { grid-template-columns: 1fr; }
    .pro-index { width: 96px; height: 96px; }
    .pro-performance-panel { padding: 20px; border-radius: 32px; }
  }


  /* Dashboard senior de validación — métricas animadas */
  .senior-validation-section {
    position: relative;
    overflow: hidden;
    background:
      radial-gradient(circle at 16% 10%, rgba(191,234,216,.11), transparent 28%),
      radial-gradient(circle at 88% 18%, rgba(255,193,217,.11), transparent 30%),
      #030303;
  }

  .senior-validation-section::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: .10;
    background-image:
      linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px);
    background-size: 42px 42px;
    mask-image: linear-gradient(to bottom, transparent, black 15%, black 78%, transparent);
  }

  .senior-validation-heading {
    position: relative;
    z-index: 2;
    max-width: 1180px;
  }

  .senior-validation-heading h2 {
    max-width: 1050px;
    letter-spacing: -.055em !important;
    line-height: .88 !important;
  }

  .senior-dashboard-grid {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
    margin-top: 46px;
  }

  .senior-dashboard-panel {
    --accent: #bfead8;
    --accent-rgb: 191,234,216;
    position: relative;
    overflow: hidden;
    border-radius: 38px;
    padding: 30px;
    border: 1px solid rgba(255,255,255,.09);
    background:
      linear-gradient(145deg, rgba(255,255,255,.075), rgba(255,255,255,.025)),
      rgba(255,255,255,.035);
    box-shadow: 0 34px 110px rgba(0,0,0,.36), inset 0 1px 0 rgba(255,255,255,.08);
  }

  .senior-dashboard-panel.fashion {
    --accent: #ffc1d9;
    --accent-rgb: 255,193,217;
  }

  .senior-panel-aura {
    position: absolute;
    top: -95px;
    right: -95px;
    width: 300px;
    height: 300px;
    border-radius: 999px;
    background: radial-gradient(circle, rgba(var(--accent-rgb), .24), transparent 62%);
    filter: blur(10px);
    animation: seniorAura 5.4s ease-in-out infinite;
  }

  @keyframes seniorAura {
    0%, 100% { transform: scale(.9); opacity: .58; }
    50% { transform: scale(1.08); opacity: .9; }
  }

  .senior-panel-header {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: 1fr 112px;
    gap: 24px;
    align-items: center;
    padding-bottom: 26px;
    border-bottom: 1px solid rgba(255,255,255,.08);
  }

  .senior-panel-header small {
    display: block;
    margin-bottom: 12px;
    color: rgba(255,255,255,.42);
    font-size: 11px;
    font-weight: 850;
    letter-spacing: .24em;
    text-transform: uppercase;
  }

  .senior-panel-header h3 {
    margin: 0;
    color: #fff;
    font-size: clamp(2rem, 3.6vw, 4.2rem);
    line-height: .92;
    letter-spacing: -.052em;
    font-weight: 390;
  }

  .senior-score-ring {
    position: relative;
    width: 112px;
    height: 112px;
    display: grid;
    place-items: center;
  }

  .senior-score-ring svg {
    position: absolute;
    inset: 0;
    width: 112px;
    height: 112px;
    transform: rotate(-90deg);
  }

  .senior-score-ring circle {
    fill: none;
    stroke-width: 8;
    stroke: rgba(255,255,255,.08);
  }

  .senior-score-ring circle.progress {
    stroke: var(--accent);
    stroke-linecap: round;
    stroke-dasharray: 302;
    stroke-dashoffset: calc(302 - (302 * var(--score)) / 100);
    filter: drop-shadow(0 0 18px rgba(var(--accent-rgb), .24));
    transition: stroke-dashoffset 900ms cubic-bezier(.2,.8,.2,1);
  }

  .senior-score-ring b {
    color: #fff;
    font-size: 30px;
    line-height: 1;
    letter-spacing: -.055em;
  }

  .senior-score-ring span {
    position: absolute;
    top: 70px;
    color: rgba(255,255,255,.44);
    font-size: 9px;
    font-weight: 850;
    letter-spacing: .18em;
    text-transform: uppercase;
  }

  .senior-metrics-stack {
    position: relative;
    z-index: 2;
    display: grid;
    gap: 14px;
    margin-top: 24px;
  }

  .senior-metric-card {
    position: relative;
    overflow: hidden;
    border-radius: 26px;
    padding: 18px;
    background: rgba(255,255,255,.055);
    border: 1px solid rgba(255,255,255,.07);
    animation: seniorMetricIn 720ms cubic-bezier(.2,.8,.2,1) both;
    animation-delay: var(--delay);
  }

  @keyframes seniorMetricIn {
    from { transform: translateY(16px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  .senior-metric-card::after {
    content: "";
    position: absolute;
    inset: 0;
    transform: translateX(-130%);
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.075), transparent);
    animation: seniorScan 3s ease-in-out infinite;
    animation-delay: calc(var(--delay) + 700ms);
  }

  @keyframes seniorScan {
    0%, 62% { transform: translateX(-130%); }
    100% { transform: translateX(130%); }
  }

  .senior-metric-header {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    align-items: flex-start;
  }

  .senior-metric-header small {
    color: rgba(255,255,255,.54);
    font-size: 12px;
    font-weight: 850;
    letter-spacing: .06em;
    text-transform: uppercase;
  }

  .senior-metric-header strong {
    color: #fff;
    font-size: 38px;
    line-height: .9;
    letter-spacing: -.055em;
  }

  .senior-metric-bar {
    position: relative;
    z-index: 2;
    height: 10px;
    margin-top: 16px;
    overflow: hidden;
    border-radius: 999px;
    background: rgba(255,255,255,.08);
  }

  .senior-metric-bar i {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, rgba(var(--accent-rgb), .58), var(--accent));
    box-shadow: 0 0 22px rgba(var(--accent-rgb), .24);
    transition: width 900ms cubic-bezier(.2,.8,.2,1);
  }

  .senior-metric-context {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-top: 14px;
  }

  .senior-metric-context span {
    min-height: 42px;
    border-radius: 15px;
    padding: 10px;
    background: rgba(255,255,255,.045);
    color: rgba(255,255,255,.50);
    font-size: 11px;
    line-height: 1.35;
  }

  .senior-metric-card p {
    position: relative;
    z-index: 2;
    margin: 14px 0 0;
    color: rgba(255,255,255,.62);
    font-size: 13px;
    line-height: 1.62;
    letter-spacing: -.01em;
  }

  .senior-validation-note {
    position: relative;
    z-index: 2;
    margin-top: 24px;
    max-width: 900px;
    border-radius: 30px;
    padding: 24px;
    border: 1px solid rgba(255,255,255,.09);
    background: rgba(255,255,255,.045);
  }

  @media (max-width: 1000px) {
    .senior-dashboard-grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 640px) {
    .senior-panel-header { grid-template-columns: 1fr; }
    .senior-metric-context { grid-template-columns: 1fr; }
  }
  .ui-scroll-progress {
    position: fixed;
    inset: 0 0 auto 0;
    z-index: 5000;
    height: 6px;
    background: rgba(255,255,255,.055);
    box-shadow: 0 0 22px rgba(157,185,255,.12);
  }

  .ui-scroll-progress span {
    display: block;
    height: 100%;
    transform-origin: left center;
    background: linear-gradient(90deg, #9DB9FF, #BFA7FF, #E7A7FF, #FFC1D9, #BFEAD8);
    box-shadow: 0 0 28px rgba(231,167,255,.42);
  }

  .mobile-page {
    background:
      radial-gradient(circle at 72% 8%, rgba(157,185,255,.13), transparent 28%),
      radial-gradient(circle at 22% 12%, rgba(231,167,255,.08), transparent 25%),
      radial-gradient(circle at 50% 100%, rgba(191,234,216,.045), transparent 35%),
      linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px),
      #030303 !important;
    background-size: auto, auto, auto, 96px 96px, 96px 96px, auto;
  }

  .project-nav {
    top: 24px !important;
    transition: 320ms cubic-bezier(.22,1,.36,1);
  }

  .project-nav.is-scrolled {
    top: 16px !important;
    opacity: .94;
    transform: translateX(-50%) scale(.985);
  }

  .project-nav nav {
    min-height: 44px !important;
    height: auto !important;
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
      inset 0 1px 0 rgba(255,255,255,.065) !important;
  }

  .project-nav a {
    min-height: 32px !important;
    height: 32px !important;
    padding: 0 18px !important;
    color: rgba(255,255,255,.58) !important;
    font-size: 12px !important;
    font-weight: 460 !important;
    letter-spacing: .018em !important;
  }

  .project-nav a:hover,
  .project-nav a.active {
    color: white !important;
    background: rgba(255,255,255,.075) !important;
    transform: translateY(-1px);
  }

  .case-study-section,
  .gallery-section,
  .strategy-section {
    width: min(100% - 84px, 1540px);
    margin-left: auto;
    margin-right: auto;
    border-radius: 46px;
    border: 1px solid rgba(255,255,255,.055);
    background: linear-gradient(135deg, rgba(255,255,255,.044), rgba(255,255,255,.014));
    box-shadow: inset 0 1px 0 rgba(255,255,255,.065), 0 24px 80px rgba(0,0,0,.28);
    backdrop-filter: blur(16px);
  }

  .case-study-section {
    padding: 110px 72px;
    margin-top: 48px;
  }

  .case-copy-block h2,
  .gallery-copy h2,
  .closing-content h2,
  .strategy-section h2 {
    font-size: clamp(2.75rem, 4.8vw, 6.2rem) !important;
    line-height: 1.1 !important;
    letter-spacing: -.055em !important;
    font-weight: 380 !important;
  }

  .case-copy-block p:not(.eyebrow),
  .gallery-copy p,
  .closing-content p:not(.eyebrow),
  .strategy-section p {
    max-width: 72ch;
    line-height: 1.92 !important;
    letter-spacing: -.012em !important;
  }

  .context-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
    margin-top: 58px;
  }

  .context-card {
    min-height: 420px;
    position: relative;
    overflow: hidden;
    border-radius: 34px;
    border: 1px solid rgba(255,255,255,.075);
    background: rgba(0,0,0,.18);
    padding: 34px;
  }

  .context-card::after {
    content: "";
    position: absolute;
    inset: auto 24px -44px;
    height: 100px;
    filter: blur(58px);
    opacity: .18;
  }

  .context-card.travel::after { background: #BFEAD8; }
  .context-card.fashion::after { background: #FFC1D9; }

  .context-card small,
  .research-panel small,
  .deep-journey-card h3,
  .screen-output p,
  .blueprint-senior-row strong {
    color: rgba(245,245,247,.52);
    font-size: 10px;
    font-weight: 820;
    letter-spacing: .28em;
    text-transform: uppercase;
  }

  .context-card h3 {
    margin: 34px 0 0;
    color: white;
    font-size: clamp(2rem, 3vw, 4rem);
    line-height: 1.14;
    letter-spacing: -.045em;
    font-weight: 420;
  }

  .context-card p {
    max-width: 640px;
    margin-top: 30px;
    color: rgba(245,245,247,.62);
    font-size: 16px;
    line-height: 1.9;
  }

  .insight-decision-list {
    display: grid;
    gap: 20px;
    margin-top: 58px;
  }

  .insight-decision-list article {
    display: grid;
    grid-template-columns: 78px minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, .82fr) minmax(0, .86fr);
    gap: 26px;
    align-items: stretch;
    border-radius: 34px;
    border: 1px solid rgba(255,255,255,.075);
    background: rgba(0,0,0,.18);
    padding: 30px;
  }

  .insight-decision-list article.travel { --accent: #BFEAD8; }
  .insight-decision-list article.fashion { --accent: #FFC1D9; }

  .decision-number {
    width: 58px;
    height: 58px;
    display: grid;
    place-items: center;
    border-radius: 18px;
    background: color-mix(in srgb, var(--accent), transparent 86%);
    color: var(--accent);
    font-size: 12px;
    font-weight: 820;
    letter-spacing: .16em;
  }

  .insight-decision-list p {
    margin: 0 0 12px;
    color: var(--accent);
    font-size: 10px;
    font-weight: 820;
    letter-spacing: .28em;
    text-transform: uppercase;
  }

  .insight-decision-list h3 {
    margin: 0;
    color: white;
    font-size: clamp(1.45rem, 2vw, 2.2rem);
    line-height: 1.2;
    letter-spacing: -.035em;
    font-weight: 520;
  }

  .insight-decision-list span,
  .insight-decision-list strong {
    display: block;
    color: rgba(245,245,247,.64);
    font-size: 14px;
    line-height: 1.8;
    font-weight: 430;
  }

  .insight-decision-list h3 + span {
    margin-top: 18px;
  }

  .screen-output {
    border-radius: 24px;
    border: 1px solid rgba(255,255,255,.075);
    background: color-mix(in srgb, var(--accent), transparent 94%);
    padding: 22px;
  }

  .screen-output strong {
    color: white;
    font-size: 17px;
    line-height: 1.45;
  }

  .deep-journey-stack {
    display: grid;
    gap: 24px;
    margin-top: 58px;
  }

  .deep-journey-card {
    border-radius: 34px;
    border: 1px solid rgba(255,255,255,.075);
    background: rgba(0,0,0,.18);
    padding: 30px;
  }

  .deep-journey-card.travel { --accent: #BFEAD8; }
  .deep-journey-card.fashion { --accent: #FFC1D9; }

  .deep-journey-card h3 {
    color: var(--accent);
    margin: 0 0 24px;
  }

  .deep-journey-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
  }

  .deep-journey-grid div {
    border-radius: 24px;
    border: 1px solid rgba(255,255,255,.075);
    background: rgba(255,255,255,.035);
    padding: 20px;
  }

  .deep-journey-grid span {
    color: var(--accent);
    font-size: 11px;
    font-weight: 820;
  }

  .deep-journey-grid strong {
    display: block;
    margin-top: 18px;
    color: white;
    font-size: 19px;
    letter-spacing: -.02em;
  }

  .deep-journey-grid small {
    display: block;
    margin-top: 8px;
    color: rgba(245,245,247,.50);
    line-height: 1.5;
  }

  .deep-journey-grid p {
    margin: 14px 0 0;
    color: rgba(245,245,247,.62);
    font-size: 12px;
    line-height: 1.6;
  }

  .blueprint-senior-table {
    display: grid;
    gap: 10px;
    overflow-x: auto;
    margin-top: 58px;
  }

  .blueprint-senior-row {
    min-width: 1040px;
    display: grid;
    grid-template-columns: 150px repeat(5, 1fr);
    gap: 10px;
  }

  .blueprint-senior-row strong,
  .blueprint-senior-row span {
    min-height: 64px;
    display: grid;
    place-items: center;
    border-radius: 18px;
    border: 1px solid rgba(255,255,255,.075);
    background: rgba(0,0,0,.20);
    color: rgba(245,245,247,.72);
    text-align: center;
    padding: 12px;
    font-size: 13px;
  }

  .blueprint-senior-row strong {
    background: rgba(255,255,255,.06);
    color: white;
  }

  .final-cta-section {
    display: grid;
    place-items: center;
    min-height: 82vh;
    margin-top: 48px;
    border-radius: 46px;
    border: 1px solid rgba(255,255,255,.055);
    background: linear-gradient(135deg, rgba(255,255,255,.044), rgba(255,255,255,.014));
    box-shadow: inset 0 1px 0 rgba(255,255,255,.065), 0 24px 80px rgba(0,0,0,.28);
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

  .final-cta-content {
    position: relative;
    z-index: 3;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 24px;
    text-align: center;
  }

  .final-cta-content h2 {
    line-height: 1.14 !important;
    font-size: clamp(3.4rem, 5vw, 6.4rem) !important;
  }

  .final-cta-content p:not(.eyebrow) {
    max-width: 760px;
    margin-left: auto;
    margin-right: auto;
  }

  .final-cta-actions {
    justify-content: center;
  }

  @media (max-width: 1280px) {
    .context-grid,
    .deep-journey-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .insight-decision-list article {
      grid-template-columns: 70px 1fr;
    }

    .insight-decision-list article > div:not(.decision-number) {
      grid-column: 2;
    }
  }

  @media (max-width: 900px) {
    .ui-scroll-progress { height: 5px; }

    .project-nav {
      top: 14px !important;
      width: calc(100% - 28px);
    }

    .project-nav nav {
      justify-content: flex-start !important;
      width: 100%;
      overflow-x: auto;
      scrollbar-width: none;
    }

    .project-nav nav::-webkit-scrollbar { display: none; }

    .project-nav a {
      padding: 0 13px !important;
      font-size: 12px !important;
    }

    .case-study-section,
    .gallery-section,
    .strategy-section,
    .final-cta-section {
      width: calc(100% - 28px);
      padding: 58px 22px;
      border-radius: 32px;
    }

    .context-grid,
    .deep-journey-grid {
      grid-template-columns: 1fr;
    }

    .context-card {
      min-height: auto;
      padding: 26px;
    }

    .insight-decision-list article {
      grid-template-columns: 1fr;
      padding: 22px;
    }

    .insight-decision-list article > div:not(.decision-number) {
      grid-column: auto;
    }

    .deep-journey-card {
      padding: 22px;
    }

    .blueprint-senior-row {
      min-width: 780px;
      grid-template-columns: 120px repeat(5, 130px);
    }

    .final-cta-content {
      text-align: left;
    }

    .final-cta-actions {
      justify-content: flex-start;
    }
  }

`;

/* Patch Vanessa Tienda: filtros premium perfectamente encuadrados */
