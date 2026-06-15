import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const GI_BLUE = "#123C8C";
const GI_ORANGE = "#F28C28";
const GI_DARK = "#030303";

const summary = [
  ["Problema", "La fricción no estaba en la intención de moverse, sino en la confianza, la claridad y la continuidad del hábito."],
  ["Solución", "Una experiencia móvil y de servicio con rutinas guiadas, progreso visible, lenguaje claro y seguimiento."],
  ["Proceso", "Entrevistas, benchmark, mapa de empatía, journey, blueprint, arquitectura, UI, métricas y roadmap."],
  ["Resultado", "Un sistema producto-servicio diseñado para activar, acompañar y sostener la adherencia."],
];

const research = [
  ["Entrevistas semiestructuradas", "Se exploraron motivaciones, miedos, lenguaje esperado y barreras de uso en adultos mayores."],
  ["Benchmark funcional", "Se analizaron patrones de salud, bienestar, accesibilidad, seguimiento y motivación en productos similares."],
  ["Mapa de empatía", "Se tradujeron frases, dudas y emociones en necesidades concretas de confianza, claridad y control."],
  ["Journey map", "Se identificaron momentos críticos: descubrimiento, configuración, primera rutina, progreso y continuidad."],
];

const insightToScreen = [
  {
    insight: "La intención existe, pero la incertidumbre detiene la acción.",
    method: "Entrevistas semiestructuradas + mapa de empatía.",
    evidence: "Los usuarios expresaron miedo a lastimarse, dudas sobre qué rutina elegir y necesidad de instrucciones simples.",
    decision: "Reducir opciones iniciales y proponer una rutina recomendada como acción principal.",
    screen: "Inicio con rutina del día, duración visible y CTA único para empezar.",
  },
  {
    insight: "El progreso visible aumenta la motivación para continuar.",
    method: "Quotes de usuario + journey map de continuidad.",
    evidence: "Ver avances pequeños ayudaba a reforzar la sensación de logro sin generar presión.",
    decision: "Diseñar indicadores simples: porcentaje, racha, logros semanales y mensajes de refuerzo positivo.",
    screen: "Pantalla de progreso con avance semanal y logros fáciles de interpretar.",
  },
  {
    insight: "El lenguaje técnico genera distancia y abandono.",
    method: "Evaluación heurística + criterios de accesibilidad cognitiva.",
    evidence: "Las instrucciones largas o ambiguas aumentaban inseguridad y hacían que el usuario prefiriera cerrar la app.",
    decision: "Usar microcopy humano, pasos cortos, ritmo guiado y feedback inmediato.",
    screen: "Rutina guiada paso a paso con instrucciones breves y control visible.",
  },
];

const quotes = [
  ["María, 68", "Me gusta caminar, pero no sé qué ejercicios hacer sin lastimarme."],
  ["Roberto, 72", "Cuando una app tiene demasiadas opciones, prefiero cerrarla."],
  ["Elena, 70", "Si veo mi avance, me dan ganas de seguir al día siguiente."],
  ["Jorge, 66", "Necesito instrucciones claras, no palabras técnicas."],
];

const personas = [
  {
    name: "María González",
    meta: "68 años · Jubilada · movilidad ligera",
    goal: "Mantener movilidad sin sentirse insegura.",
    pain: "Texto pequeño, interfaces saturadas y miedo a lastimarse.",
    need: "Rutinas claras, progreso visible y acompañamiento emocional.",
  },
  {
    name: "Roberto Martínez",
    meta: "72 años · Ex comerciante · usuario básico de smartphone",
    goal: "Mantener independencia y condición física.",
    pain: "Menús complejos, demasiadas decisiones y miedo a equivocarse.",
    need: "Pasos cortos, lenguaje simple y retroalimentación inmediata.",
  },
];

const empathy = [
  ["Dice", "“Quiero moverme, pero necesito sentirme seguro.”"],
  ["Piensa", "“Si no entiendo rápido, mejor lo dejo.”"],
  ["Hace", "Busca rutinas cortas y evita apps con demasiadas opciones."],
  ["Siente", "Motivación inicial, incertidumbre y necesidad de confianza."],
];

const journey = [
  ["01", "Descubre", "Comprende el beneficio del programa.", "Confianza"],
  ["02", "Configura", "Indica nivel de movilidad y preferencias.", "Control"],
  ["03", "Inicia", "Comienza una rutina guiada.", "Claridad"],
  ["04", "Completa", "Visualiza avance y logro.", "Motivación"],
  ["05", "Continúa", "Recibe seguimiento y recordatorios.", "Adherencia"],
];

const blueprint = [
  ["Usuario", "Descubre", "Configura", "Realiza", "Registra", "Continúa"],
  ["Touchpoints", "Invitación", "Onboarding", "Rutina guiada", "Progreso", "Recordatorios"],
  ["Frontstage", "Beneficio claro", "Perfil simple", "Instrucciones", "Logros", "Recomendación"],
  ["Backstage", "Segmentación", "Nivel movilidad", "Gestión rutinas", "Métricas", "Seguimiento"],
  ["Sistemas", "CMS", "Base usuarios", "Motor rutinas", "Analytics", "Push"],
  ["KPIs", "Interés", "Activación", "Finalización", "Engagement", "Retención"],
];

const architecture = [
  ["Inicio", "Rutina recomendada y resumen del día."],
  ["Rutinas", "Movilidad, equilibrio y respiración."],
  ["Progreso", "Historial, racha y rutinas completadas."],
  ["Logros", "Metas pequeñas y refuerzos positivos."],
  ["Perfil", "Movilidad, preferencias y accesibilidad."],
];

const metrics = [
  ["Activación", "Primera rutina completada", "72%"],
  ["Continuidad", "Rutinas por semana", "3.4x"],
  ["Retención", "Usuarios activos 30 días", "30d"],
  ["Seguimiento", "Detección de abandono", "24h"],
];

const roadmap = [
  ["MVP", "Rutinas, progreso, perfil y logros básicos."],
  ["V1", "Recordatorios, historial y recomendaciones por nivel."],
  ["V2", "Panel de facilitadores y reportes de seguimiento."],
  ["V3", "Acompañamiento familiar, retos y comunidad."],
];

export default function GenerationICaseV2() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#030303] text-white [background-image:radial-gradient(circle_at_72%_8%,rgba(18,60,140,.18),transparent_28%),radial-gradient(circle_at_22%_12%,rgba(242,140,40,.10),transparent_25%),linear-gradient(rgba(255,255,255,.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.022)_1px,transparent_1px)] [background-size:auto,auto,96px_96px,96px_96px]">
      <Header />

      <section className="relative px-6 pt-36 md:px-8">
        <BackgroundGrid />

        <div className="mx-auto grid min-h-[88vh] max-w-7xl items-center gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 lg:col-span-5"
          >
            <p className="text-xs uppercase tracking-[.35em]" style={{ color: GI_ORANGE }}>
              Caso 01 · Product & Service Design
            </p>

            <h1 className="mt-10 text-6xl font-light leading-[1.08] tracking-[-.055em] md:text-8xl">
              Generación <span style={{ color: GI_ORANGE }}>i</span>
            </h1>

            <p className="mt-10 max-w-xl text-lg leading-[1.95] tracking-[-.006em] text-slate-300">
              Una experiencia de producto y servicio para acompañar actividad física en adultos mayores, diseñada desde investigación, accesibilidad, continuidad y confianza.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {["Product Design", "Service Design", "UX/UI", "Accesibilidad"].map((tag, index) => (
                <span
                  key={tag}
                  className="rounded-xl px-5 py-3 text-xs font-semibold uppercase tracking-wide"
                  style={{ background: index === 1 ? GI_ORANGE : `${GI_BLUE}90` }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
              <Stat label="Rol" value="Product & Service" />
              <Stat label="Alcance" value="End-to-End" />
              <Stat label="Producto" value="iOS / Android" />
              <Stat label="Segmento" value="Adultos mayores" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="relative z-10 lg:col-span-7"
          >
            <HeroECG />
          </motion.div>
        </div>
      </section>

      <GridSection label="Executive summary" title="Una solución pensada como producto, servicio y sistema" items={summary} orange />

      <Split
        label="Contexto"
        title="El problema no era hacer ejercicio. Era sostener el hábito."
        text="Generación i se abordó como un ecosistema de producto y servicio para acompañar rutinas de activación física, reduciendo incertidumbre, carga cognitiva y abandono."
      >
        <HighlightCard
          label="How Might We"
          title="¿Cómo podríamos ayudar a adultos mayores a incorporar actividad física de manera constante sin generar ansiedad tecnológica?"
        />
      </Split>

      <GridSection label="Research" title="Métodos utilizados para convertir señales en decisiones" items={research} />

      <InsightsToInterface />

      <Section>
        <SectionTitle
          label="Voz del usuario"
          title="Voces que revelaron la fricción real"
          text="Las citas no se usaron como decoración del caso: funcionaron como evidencia para definir decisiones de producto, contenido, servicio y accesibilidad."
          orange
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {quotes.map(([person, quote], index) => (
            <MotionCard key={person} index={index}>
              <p className="text-xs uppercase tracking-[.25em]" style={{ color: GI_ORANGE }}>{person}</p>
              <p className="mt-5 text-lg leading-8 text-slate-200">“{quote}”</p>
            </MotionCard>
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle
          label="UX personas"
          title="Personas construidas para diseñar decisiones, no perfiles decorativos"
          text="Los perfiles sintetizan patrones de comportamiento detectados en research: inseguridad, baja tolerancia a la complejidad y necesidad de acompañamiento."
          orange
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {personas.map((persona, index) => (
            <MotionCard key={persona.name} index={index}>
              <div className="flex items-start gap-5">
                <Avatar label={persona.name[0]} />
                <div>
                  <h3 className="text-2xl font-light">{persona.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{persona.meta}</p>
                </div>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <MiniBlock title="Objetivo" text={persona.goal} />
                <MiniBlock title="Fricción" text={persona.pain} />
                <MiniBlock title="Necesidad" text={persona.need} />
              </div>
            </MotionCard>
          ))}
        </div>
      </Section>

      <GridSection label="Mapa de empatía" title="Entender al usuario más allá de la pantalla" items={empathy} orange />

      <Section>
        <SectionTitle
          label="Journey map"
          title="El viaje donde la intención se convierte en continuidad"
          text="El journey identifica dónde el usuario necesita claridad, control, motivación o seguimiento para no abandonar la experiencia."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-5">
          {journey.map(([num, title, text, feeling], index) => (
            <MotionCard key={title} index={index}>
              <p className="text-xs tracking-[.25em]" style={{ color: GI_ORANGE }}>{num}</p>
              <h3 className="mt-4 text-2xl font-light">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-400">{text}</p>
              <p className="mt-6 rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-xs text-slate-300">{feeling}</p>
            </MotionCard>
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle
          label="Proceso"
          title="Un proceso para pasar de señales humanas a un sistema usable"
          text="El doble diamante permitió abrir el problema, sintetizar insights, diseñar alternativas y cerrar una solución medible."
          orange
        />
        <DoubleDiamond />
      </Section>

      <GridSection label="MVP" title="Priorización enfocada en activación, adherencia y seguimiento" items={[
        ["Must Have", "Inicio, rutina diaria, instrucciones guiadas, progreso y perfil básico."],
        ["Should Have", "Logros, recordatorios, historial semanal y recomendaciones por nivel."],
        ["Could Have", "Retos semanales, acompañamiento familiar y reportes para facilitadores."],
        ["Won’t Have", "Comunidad, retos complejos o gamificación avanzada en la primera versión."]
      ]} orange />

      <Section>
        <SectionTitle
          label="Arquitectura"
          title="Estructura simple para tareas esenciales"
          text="La navegación se construyó alrededor de iniciar, seguir, registrar y visualizar progreso."
        />
        <div className="mt-12 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {architecture.map(([title, text], index) => (
            <ArchitectureCard key={title} title={title} text={text} index={index} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle
          label="Service blueprint"
          title="Blueprint para conectar experiencia, operación y medición"
          text="El servicio se diseñó más allá de la pantalla: qué ve el usuario, qué opera el equipo, qué sistemas sostienen la experiencia y cómo se mide."
          orange
        />
        <BlueprintTable />
      </Section>

      <Section>
        <SectionTitle
          label="UI Showcase"
          title="Pantallas nacidas de insights, no de supuestos"
          text="El flujo muestra cómo los insights se convierten en pantallas: iniciar con claridad, avanzar con seguridad y continuar con evidencia de progreso."
        />
        <UIShowcase />
      </Section>

      <Section>
        <SectionTitle
          label="Design system"
          title="Sistema visual para claridad, confianza y acción"
          text="El sistema visual usa contraste, color y escala tipográfica para reforzar accesibilidad, acción principal y lectura tranquila."
          orange
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <div className="rounded-[2rem] border border-white/10 bg-white/[.035] p-8 lg:col-span-5">
            <p className="text-xs uppercase tracking-[.25em]" style={{ color: GI_ORANGE }}>Gama cromática</p>
            <div className="mt-8 grid gap-4">
              <ColorSwatch name="Azul Generación i" value={GI_BLUE} />
              <ColorSwatch name="Naranja Activación" value={GI_ORANGE} />
              <ColorSwatch name="Blanco accesible" value="#FFFFFF" />
              <ColorSwatch name="Fondo premium" value={GI_DARK} />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:col-span-7">
            <Card title="Tipografía" text="Escala grande, legible y con contraste suficiente." />
            <Card title="Botón primario" text="Naranja para acciones principales y estados de avance." />
            <Card title="Botón secundario" text="Azul para navegación y acciones no críticas." />
            <Card title="Accesibilidad" text="Contraste alto, touch targets amplios y lenguaje claro." />
          </div>
        </div>
      </Section>

      <GridSection label="Tecnología" title="Stack recomendado para iOS, Android y operación" items={[
        ["Flutter", "Una sola base para iOS y Android, consistencia visual y menor costo inicial."],
        ["Firebase", "Auth, Analytics y Push Notifications para validar rápido el MVP."],
        ["Node / API", "Escalable para rutinas, progreso, logros, perfil y personalización."],
        ["React Admin", "Panel web para facilitadores, operación y seguimiento del programa."]
      ]} />

      <Section>
        <SectionTitle
          label="Métricas"
          title="Métricas de producto y servicio"
          text="Indicadores para medir activación, continuidad, adherencia y recuperación del servicio."
          orange
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map(([title, text, value], index) => (
            <MetricCard key={title} title={title} text={text} value={value} index={index} />
          ))}
        </div>
      </Section>

      <GridSection label="Roadmap" title="Evolución del producto" items={roadmap} />

      <Section>
        <CaseContactCTA />
      </Section>
    </main>
  );
}

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-1/2 top-6 z-50 -translate-x-1/2 transition duration-300 ${
        isScrolled ? "top-4 scale-[.985] opacity-95" : ""
      }`}
    >
      <nav className="relative flex min-h-[48px] items-center justify-center gap-1.5 rounded-full px-2 py-1.5 bg-[#050505]/95 border border-white/15 backdrop-blur-[18px] shadow-[0_24px_90px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.10)] before:absolute before:inset-[-18px] before:-z-10 before:rounded-full before:bg-black/50 before:blur-3xl isolate">
        <a className="rounded-full px-4 py-2 text-xs font-medium tracking-[.018em] text-white/60 transition hover:-translate-y-px hover:bg-white/[.055] hover:text-white" href="/">
          Home
        </a>
        <a className="rounded-full px-4 py-2 text-xs font-medium tracking-[.018em] text-white/60 transition hover:-translate-y-px hover:bg-white/[.055] hover:text-white" href="/#casos">
          Casos
        </a>
        <a className="rounded-full px-4 py-2 text-xs font-medium tracking-[.018em] text-white/60 transition hover:-translate-y-px hover:bg-white/[.055] hover:text-white" href="/experience-build">
          Experience.Build
        </a>
        <a className="rounded-full px-4 py-2 text-xs font-medium tracking-[.018em] text-white/60 transition hover:-translate-y-px hover:bg-white/[.055] hover:text-white" href="/contacto">
          Contacto
        </a>
      </nav>
    </header>
  );
}

function HeroECG() {
  return (
    <div className="relative min-h-[560px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#060606] p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(18,60,140,.75),transparent_38%),radial-gradient(circle_at_80%_70%,rgba(242,140,40,.22),transparent_34%)]" />
      <div className="absolute inset-0 opacity-[.18] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:54px_54px]" />

      <div className="relative z-10 flex h-full min-h-[500px] flex-col justify-between">
        <div>
          <p className="text-xs uppercase tracking-[.32em]" style={{ color: GI_ORANGE }}>
            Health-Tech Experience
          </p>
          <h2 className="mt-6 max-w-xl text-5xl font-light leading-tight md:text-6xl">
            Activación física guiada por un pulso de continuidad.
          </h2>
        </div>

        <div className="relative my-10 h-[220px] overflow-hidden rounded-[2rem] border border-white/10 bg-black/20">
          <div className="absolute inset-0 bg-gradient-to-r from-[#071121] via-transparent to-[#071121]" />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 980 220" fill="none">
            <motion.path
              d="M0 112 H146 C176 112 184 64 214 64 C252 64 252 176 292 176 C340 176 350 24 404 24 C456 24 456 112 506 112 H980"
              stroke={GI_ORANGE}
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0.86] }}
              transition={{ duration: 3.7, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.path
              d="M0 142 H180 C216 142 232 120 264 120 C304 120 312 188 360 188 C418 188 430 88 486 88 C532 88 548 142 596 142 H980"
              stroke="#60A5FA"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1], opacity: [0, 0.68, 0.28] }}
              transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut", delay: 0.65 }}
            />
          </svg>

          <motion.div
            animate={{ x: ["-15%", "115%"], opacity: [0, 1, 0] }}
            transition={{ duration: 3.7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 h-full w-36 bg-gradient-to-r from-transparent via-orange-300/35 to-transparent blur-md"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <PulseMetric label="Activación" value="Rutina diaria" />
          <PulseMetric label="Progreso" value="Seguimiento visible" />
          <PulseMetric label="Adherencia" value="Continuidad del hábito" />
        </div>
      </div>
    </div>
  );
}

function PulseMetric({ label, value }) {
  return (
    <motion.div
      animate={{ y: [0, -6, 0], opacity: [0.76, 1, 0.76] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="rounded-2xl border border-white/10 bg-black/25 p-5 backdrop-blur"
    >
      <p className="text-xs uppercase tracking-[.25em]" style={{ color: GI_ORANGE }}>{label}</p>
      <p className="mt-3 text-sm leading-6 text-slate-300">{value}</p>
    </motion.div>
  );
}

function UIShowcase() {
  const [active, setActive] = useState(0);

  const flow = [
    {
      label: "Inicio",
      nav: "Inicio",
      title: "Tu rutina de hoy",
      eyebrow: "BUENOS DÍAS, MARÍA",
      copy: "Movilidad suave para activar articulaciones, equilibrio y confianza.",
      metric: "12 min",
      progress: 68,
      action: "Comenzar",
      description: "Rutina recomendada, una acción principal y lectura clara para reducir incertidumbre.",
    },
    {
      label: "Rutina guiada",
      nav: "Rutina",
      title: "Movimiento de brazos",
      eyebrow: "PASO 2 DE 5",
      copy: "Levanta ambos brazos lentamente hasta la altura de los hombros.",
      metric: "04:30",
      progress: 42,
      action: "Continuar",
      description: "Guía paso a paso con ritmo, progreso visible y controles simples.",
    },
    {
      label: "Progreso",
      nav: "Progreso",
      title: "Vas muy bien",
      eyebrow: "SEMANA ACTIVA",
      copy: "Tu constancia semanal está mejorando sin forzar el ritmo.",
      metric: "72%",
      progress: 72,
      action: "Ver avance",
      description: "Progreso visible para reforzar motivación y continuidad del hábito.",
    },
    {
      label: "Logros",
      nav: "Logros",
      title: "Logros de la semana",
      eyebrow: "AVANCE SEMANAL",
      copy: "Pequeñas metas que celebran continuidad sin generar presión.",
      metric: "3/5",
      progress: 60,
      action: "Ver logros",
      description: "Reconocimiento visual para reforzar adherencia y confianza.",
    },
    {
      label: "Perfil",
      nav: "Perfil",
      title: "Rutina adaptada",
      eyebrow: "TU PERFIL",
      copy: "Nivel de movilidad, ritmo y preferencias para personalizar la experiencia.",
      metric: "Suave",
      progress: 50,
      action: "Ajustar",
      description: "Configuración simple para adaptar la experiencia al usuario.",
    },
  ];

  const current = flow[active];

  const next = () => setActive((prev) => (prev + 1) % flow.length);
  const prev = () => setActive((prev) => (prev - 1 + flow.length) % flow.length);

  return (
    <div
      id="showcase"
      className="mt-12 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[.035] p-6 md:p-8"
    >
      <div className="grid min-h-[620px] gap-8 lg:grid-cols-[.78fr_1.62fr]">
        <div className="rounded-[2rem] border border-white/10 bg-black/20 p-6">
          <p
            className="text-xs uppercase tracking-[.35em]"
            style={{ color: GI_ORANGE }}
          >
            Flujo principal
          </p>

          <div className="mt-8 grid gap-4">
            {flow.map((item, index) => {
              const isActive = active === index;

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setActive(index)}
                  className="cursor-pointer rounded-2xl border p-5 text-left transition duration-300 hover:border-orange-300/70 hover:bg-orange-400/[.06]"
                  style={{
                    borderColor: isActive ? GI_ORANGE : "rgba(255,255,255,.10)",
                    background: isActive ? "rgba(242,140,40,.06)" : "rgba(255,255,255,.025)",
                  }}
                >
                  <h4
                    className="text-sm font-semibold"
                    style={{ color: isActive ? GI_ORANGE : "#8AB4FF" }}
                  >
                    {item.label}
                  </h4>
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {item.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#060606] p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_50%,rgba(18,60,140,.55),transparent_38%),radial-gradient(circle_at_88%_20%,rgba(242,140,40,.24),transparent_36%)]" />

          <motion.div
            animate={{
              scale: [0.86, 1.16, 0.86],
              opacity: [0.13, 0.42, 0.13],
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-[47%] top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-300/20"
          />

          <motion.div
            animate={{
              scale: [0.72, 1.04, 0.72],
              opacity: [0.10, 0.32, 0.10],
            }}
            transition={{
              duration: 4.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.45,
            }}
            className="absolute left-[47%] top-1/2 h-[310px] w-[310px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/20"
          />

          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 980 620"
            fill="none"
          >
            <motion.path
              d="M70 316 H180 C210 316 220 256 250 256 C288 256 292 390 340 390 C396 390 406 162 468 162 C534 162 532 316 594 316 H910"
              stroke={GI_ORANGE}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 1],
                opacity: [0, 1, 0.72],
              }}
              transition={{
                duration: 4.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>

          <div className="relative z-10 grid h-full min-h-[560px] items-center gap-10 lg:grid-cols-[.95fr_.85fr]">
            <motion.div
              key={`phone-${active}`}
              initial={{ opacity: 0, y: 22, rotate: -4, scale: 0.96 }}
              animate={{ opacity: 1, y: [0, -10, 0], rotate: [-2.5, 1.5, -2.5], scale: 1 }}
              transition={{
                opacity: { duration: 0.35 },
                scale: { duration: 0.35 },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              }}
              className="flex justify-center"
            >
              <Phone screen={current} showcase />
            </motion.div>

            <motion.div
              key={`copy-${active}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="max-w-sm"
            >
              <p
                className="text-xs uppercase tracking-[.35em]"
                style={{ color: GI_ORANGE }}
              >
                {current.eyebrow}
              </p>

              <h3 className="mt-6 text-4xl font-light leading-tight md:text-5xl">
                {current.title}
              </h3>

              <p className="mt-6 text-lg leading-8 text-slate-400">
                {current.description}
              </p>

              <div className="mt-10 flex items-center gap-4">
                <button
                  type="button"
                  onClick={prev}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[.04] text-xl text-white transition hover:border-orange-300/70 hover:bg-orange-400/[.08]"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[.04] text-xl text-white transition hover:border-orange-300/70 hover:bg-orange-400/[.08]"
                >
                  →
                </button>
              </div>

              <div className="mt-8 flex items-center gap-3">
                {flow.map((_, dot) => (
                  <button
                    key={dot}
                    type="button"
                    onClick={() => setActive(dot)}
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: dot === active ? 42 : 10,
                      opacity: dot === active ? 1 : 0.35,
                      background: dot === active ? GI_ORANGE : "rgba(255,255,255,.35)",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Phone({ screen, compact = false, showcase = false }) {
  const phoneSize = showcase
    ? "h-[500px] w-[278px] rounded-[3.15rem]"
    : compact
      ? "h-[420px] w-[232px] rounded-[2.75rem]"
      : "h-[450px] w-[250px] rounded-[3rem]";

  const activeIndex = ["Inicio", "Rutina guiada", "Progreso", "Logros", "Perfil"].indexOf(screen.label);
  const isHome = screen.label === "Inicio";
  const isRoutine = screen.label === "Rutina guiada";
  const isProgress = screen.label === "Progreso";
  const isAchievements = screen.label === "Logros";
  const isProfile = screen.label === "Perfil";

  const AppHeader = () => (
    <div className="grid h-9 grid-cols-[36px_1fr_36px] items-center">
      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-base shadow-[0_8px_22px_rgba(18,60,140,.08)] ring-1 ring-slate-200/80"
        style={{ color: GI_BLUE }}
      >
        ←
      </button>

      <p className="text-center text-[8px] font-black uppercase tracking-[.24em]" style={{ color: GI_BLUE }}>
        {screen.nav}
      </p>

      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-[0_8px_22px_rgba(18,60,140,.08)] ring-1 ring-slate-200/80"
      >
        <span className="grid gap-[3px]">
          <i className="block h-[2px] w-4 rounded-full" style={{ background: GI_BLUE }} />
          <i className="block h-[2px] w-4 rounded-full" style={{ background: GI_BLUE }} />
          <i className="block h-[2px] w-4 rounded-full" style={{ background: GI_BLUE }} />
        </span>
      </button>
    </div>
  );

  const PageIntro = ({ title, text }) => (
    <div className="pt-6">
      <p className="text-[7px] font-black uppercase tracking-[.24em]" style={{ color: GI_ORANGE }}>
        {screen.eyebrow}
      </p>
      <h3 className="mt-3 text-[1.42rem] font-black leading-[1.02] tracking-[-.06em]" style={{ color: GI_BLUE }}>
        {title}
      </h3>
      <p className="mt-2 text-[10px] leading-[1.55] text-slate-500">
        {text}
      </p>
    </div>
  );

  const PrimaryButton = ({ label = screen.action }) => (
    <button
      className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl text-[11px] font-black text-white shadow-[0_14px_28px_rgba(242,140,40,.22)]"
      style={{ background: GI_ORANGE }}
    >
      {label} <span>→</span>
    </button>
  );

  const MinimalNav = () => (
    <div className="grid grid-cols-5 gap-1 rounded-full bg-white/85 p-1 shadow-[0_10px_25px_rgba(18,60,140,.06)] ring-1 ring-slate-200/70">
      {["⌂", "▤", "◔", "★", "●"].map((icon, index) => (
        <span
          key={icon}
          className="flex h-7 items-center justify-center rounded-full text-[10px]"
          style={{
            background: index === activeIndex ? GI_BLUE : "transparent",
            color: index === activeIndex ? "#fff" : "#94A3B8",
          }}
        >
          {icon}
        </span>
      ))}
    </div>
  );

  return (
    <div className={`mx-auto ${phoneSize} border border-white/15 bg-black p-3 shadow-[0_40px_100px_rgba(0,0,0,.55)]`}>
      <div className="relative h-full overflow-hidden rounded-[2.45rem] bg-[#F8FAFC] text-slate-900">
        <div className="absolute left-1/2 top-3 z-30 h-5 w-20 -translate-x-1/2 rounded-full bg-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(18,60,140,.10),transparent_34%),radial-gradient(circle_at_100%_12%,rgba(242,140,40,.07),transparent_26%),linear-gradient(180deg,#FCFDFE_0%,#F3F6FA_100%)]" />

        <div className="relative z-10 grid h-full grid-rows-[36px_1fr_104px] px-5 pb-4 pt-11">
          <AppHeader />

          <motion.div
            key={screen.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            className="min-h-0"
          >
            {isHome && (
              <div className="grid h-full grid-rows-[auto_1fr]">
                <PageIntro
                  title="Tu rutina de hoy"
                  text="Una sesión breve, clara y segura para iniciar sin fricción."
                />

                <div className="mt-5 grid h-[192px] grid-rows-[1fr_auto] rounded-[2rem] p-5 text-white shadow-[0_24px_52px_rgba(18,60,140,.20)]" style={{ background: `linear-gradient(145deg, ${GI_BLUE} 0%, #071B43 100%)` }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-[.16em] text-white/50">Movilidad suave</p>
                      <p className="mt-3 text-[2.95rem] font-light leading-none tracking-[-.09em]">{screen.metric}</p>
                    </div>
                    <span className="rounded-full px-3 py-1 text-[8px] font-black" style={{ background: GI_ORANGE }}>
                      Hoy
                    </span>
                  </div>

                  <div>
                    <p className="mb-3 text-[10px] leading-4 text-white/65">
                      Equilibrio · respiración · activación
                    </p>
                    <div className="h-2 rounded-full bg-white/15">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: `${screen.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-2 rounded-full"
                        style={{ background: GI_ORANGE }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isRoutine && (
              <div className="grid h-full grid-rows-[auto_1fr]">
                <PageIntro
                  title="Movimiento de brazos"
                  text="Una sola instrucción por pantalla. Sin ruido, sin duda."
                />

                <div className="mt-5 grid h-[192px] grid-rows-[24px_1fr_auto] rounded-[2rem] bg-white/84 p-5 shadow-[0_20px_44px_rgba(18,60,140,.09)] ring-1 ring-slate-200/80">
                  <div className="flex items-center justify-between">
                    <p className="text-[8px] font-black uppercase tracking-[.16em]" style={{ color: GI_BLUE }}>Paso 2/5</p>
                    <p className="text-[11px] font-black" style={{ color: GI_ORANGE }}>{screen.metric}</p>
                  </div>

                  <div className="relative mx-auto flex h-24 w-24 items-center justify-center self-center rounded-full" style={{ background: `${GI_BLUE}10` }}>
                    <motion.div
                      animate={{ rotate: [-8, 8, -8], y: [0, -6, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                      className="relative h-14 w-9 rounded-full border-[4px]"
                      style={{ borderColor: GI_BLUE }}
                    >
                      <span className="absolute -left-4 top-4 h-9 w-3 rotate-[-35deg] rounded-full" style={{ background: GI_BLUE }} />
                      <span className="absolute -right-4 top-4 h-9 w-3 rotate-[35deg] rounded-full" style={{ background: GI_BLUE }} />
                    </motion.div>
                    <motion.span
                      animate={{ scale: [1, 1.18, 1], opacity: [0.45, 1, 0.45] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute right-3 top-6 h-3.5 w-3.5 rounded-full"
                      style={{ background: GI_ORANGE }}
                    />
                  </div>

                  <div>
                    <p className="text-center text-[10px] font-black" style={{ color: GI_BLUE }}>Ritmo lento y controlado</p>
                    <div className="mt-3 h-2 rounded-full bg-slate-100">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: `${screen.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-2 rounded-full"
                        style={{ background: GI_ORANGE }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isProgress && (
              <div className="grid h-full grid-rows-[auto_1fr_auto]">
                <PageIntro
                  title="Vas muy bien"
                  text="Una lectura clara de continuidad sin saturar ni presionar."
                />

                <div className="mt-5 flex h-[166px] items-center justify-center rounded-[2rem] bg-white/84 p-4 shadow-[0_20px_44px_rgba(18,60,140,.09)] ring-1 ring-slate-200/80">
                  <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-white">
                    <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 128 128">
                      <circle cx="64" cy="64" r="50" stroke="#E5EAF2" strokeWidth="10" fill="none" />
                      <motion.circle
                        cx="64"
                        cy="64"
                        r="50"
                        stroke={GI_ORANGE}
                        strokeWidth="10"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: screen.progress / 100 }}
                        transition={{ duration: 1.1, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="text-center">
                      <p className="text-[2.45rem] font-light leading-none tracking-[-.08em]" style={{ color: GI_BLUE }}>{screen.metric}</p>
                      <p className="mt-1 text-[8px] font-black uppercase tracking-[.16em] text-slate-400">avance</p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white/80 p-3 ring-1 ring-slate-200/70">
                    <p className="text-base font-black" style={{ color: GI_BLUE }}>5</p>
                    <p className="text-[8px] font-bold uppercase tracking-[.12em] text-slate-400">días</p>
                  </div>
                  <div className="rounded-2xl bg-white/80 p-3 ring-1 ring-slate-200/70">
                    <p className="text-base font-black" style={{ color: GI_BLUE }}>3</p>
                    <p className="text-[8px] font-bold uppercase tracking-[.12em] text-slate-400">rutinas</p>
                  </div>
                </div>
              </div>
            )}

            {isAchievements && (
              <div className="grid h-full grid-rows-[auto_1fr]">
                <PageIntro
                  title="Logro semanal"
                  text="Un solo reconocimiento destacado para reforzar motivación."
                />

                <div className="mt-5 flex h-[220px] flex-col items-center justify-center rounded-[2rem] p-5 text-center text-white shadow-[0_24px_52px_rgba(18,60,140,.20)]" style={{ background: `linear-gradient(145deg, ${GI_BLUE} 0%, #071B43 100%)` }}>
                  <motion.div
                    animate={{ scale: [1, 1.06, 1], rotate: [0, 4, 0] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                    className="flex h-20 w-20 items-center justify-center rounded-full text-4xl shadow-[0_18px_42px_rgba(0,0,0,.20)]"
                    style={{ background: GI_ORANGE }}
                  >
                    🏆
                  </motion.div>

                  <p className="mt-6 text-[8px] font-black uppercase tracking-[.18em] text-white/50">Racha segura</p>
                  <p className="mt-2 text-[2.05rem] font-light leading-none tracking-[-.06em]">3 de 5</p>
                  <p className="mx-auto mt-3 max-w-[180px] text-[10px] leading-4 text-white/65">
                    Rutinas completadas sin dolor y con ritmo constante.
                  </p>
                </div>
              </div>
            )}

            {isProfile && (
              <div className="grid h-full grid-rows-[auto_1fr]">
                <PageIntro
                  title="Rutina adaptada"
                  text="Preferencias esenciales. Nada más de lo necesario."
                />

                <div className="mt-5 grid h-[220px] grid-rows-[1fr_auto] rounded-[2rem] bg-white/84 p-5 shadow-[0_20px_44px_rgba(18,60,140,.09)] ring-1 ring-slate-200/80">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div
                      className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] text-3xl font-black text-white shadow-[0_18px_40px_rgba(18,60,140,.16)]"
                      style={{ background: GI_BLUE }}
                    >
                      M
                    </div>
                    <p className="mt-4 text-lg font-black tracking-[-.04em]" style={{ color: GI_BLUE }}>María González</p>
                    <p className="mt-1 text-[10px] text-slate-500">Movilidad ligera</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {[
                      ["Ritmo", "Suave"],
                      ["Texto", "Grande"],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-2xl bg-slate-50 px-3 py-2.5 ring-1 ring-slate-100">
                        <p className="text-[8px] font-black uppercase tracking-[.13em] text-slate-400">{label}</p>
                        <p className="mt-1 text-[11px] font-black" style={{ color: GI_BLUE }}>{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          <div className="grid grid-rows-[44px_36px] gap-3 pt-4">
            <PrimaryButton />
            <MinimalNav />
          </div>
        </div>
      </div>
    </div>
  );
}
function InsightsToInterface() {
  return (
    <Section>
      <SectionTitle
        label="De insight a interfaz"
        title="Cómo los hallazgos se convirtieron en pantallas"
        text="El valor del caso no está solo en mostrar pantallas finales, sino en explicar la cadena de diseño: método, evidencia, insight, decisión UX y solución visible."
        orange
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {insightToScreen.map((item, index) => (
          <MotionCard key={item.insight} index={index}>
            <p className="text-xs uppercase tracking-[.3em]" style={{ color: GI_ORANGE }}>
              Insight 0{index + 1}
            </p>

            <h3 className="mt-6 text-2xl font-light leading-[1.28] tracking-[-.025em] text-white">
              {item.insight}
            </h3>

            <div className="mt-8 grid gap-4">
              <InsightRow label="Método" text={item.method} />
              <InsightRow label="Evidencia" text={item.evidence} />
              <InsightRow label="Decisión UX" text={item.decision} />
              <InsightRow label="Pantalla" text={item.screen} highlight />
            </div>
          </MotionCard>
        ))}
      </div>
    </Section>
  );
}

function InsightRow({ label, text, highlight = false }) {
  return (
    <div
      className="rounded-2xl border p-4"
      style={{
        borderColor: highlight ? `${GI_ORANGE}44` : "rgba(255,255,255,.10)",
        background: highlight ? "rgba(242,140,40,.065)" : "rgba(0,0,0,.20)",
      }}
    >
      <p className="text-[10px] font-bold uppercase tracking-[.22em]" style={{ color: highlight ? GI_ORANGE : "#8AB4FF" }}>
        {label}
      </p>
      <p className="mt-3 text-sm leading-7 text-slate-400">{text}</p>
    </div>
  );
}

function CaseContactCTA() {
  return (
    <section id="contacto" className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[.035] px-8 py-24 text-center md:px-14 md:py-32">
      <div
        className="absolute inset-0 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(242,140,40,.14), transparent 32%), radial-gradient(circle at 50% 72%, rgba(18,60,140,.16), transparent 34%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        <p className="text-xs font-bold uppercase tracking-[.38em]" style={{ color: GI_ORANGE }}>
          Contacto
        </p>

        <h2 className="mx-auto mt-8 max-w-4xl text-5xl font-light leading-[1.14] tracking-[-.04em] md:text-7xl">
          Diseñemos experiencias que conviertan claridad en continuidad.
        </h2>

        <p className="mx-auto mt-10 max-w-2xl text-lg leading-[1.95] tracking-[-.006em] text-slate-400">
          Si el reto combina producto, servicio, interfaz y operación, puedo ayudarte a convertirlo en una experiencia clara, medible y lista para evolucionar.
        </p>

        <a
          href="/contacto"
          className="mt-12 inline-flex min-h-[54px] items-center justify-center rounded-full px-8 text-sm font-bold text-white shadow-[0_20px_60px_rgba(242,140,40,.18)] transition duration-300 hover:-translate-y-1"
          style={{ background: GI_ORANGE }}
        >
          Ir al área de contacto
        </a>

        <div className="mt-16 flex flex-wrap justify-center gap-6 text-[11px] font-bold uppercase tracking-[.18em] text-white/25">
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

function ClosingSystem() {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[.035] p-10 md:p-14">
      <div className="absolute right-[-120px] top-[-120px] h-80 w-80 rounded-full blur-3xl" style={{ background: `${GI_ORANGE}35` }} />
      <div className="relative grid gap-10 lg:grid-cols-[1fr_.85fr]">
        <div>
          <p className="text-xs uppercase tracking-[.3em]" style={{ color: GI_ORANGE }}>Cierre</p>
          <h2 className="mt-4 max-w-5xl text-4xl font-light leading-tight md:text-5xl">
            Diseñar para adultos mayores no consistió en simplificar interfaces.
          </h2>
          <p className="mt-8 max-w-4xl leading-8 text-slate-400">
            Consistió en construir un sistema de confianza, acompañamiento y continuidad capaz de convertir una acción aislada en un hábito sostenible.
          </p>
        </div>
        <div className="relative min-h-[380px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#060606]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(242,140,40,.22),transparent_34%),radial-gradient(circle_at_78%_72%,rgba(18,60,140,.5),transparent_42%)]" />
          <div className="absolute inset-8">
            <PulseOnly />
          </div>
          <div className="absolute inset-x-8 bottom-8 grid grid-cols-3 gap-3">
            {[
              ["+38%", "Activación"],
              ["+52%", "Continuidad"],
              ["+41%", "Adherencia"],
            ].map(([value, label], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={{ y: [0, -6, 0] }}
                viewport={{ once: true }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                className="rounded-2xl border border-white/10 bg-black/35 p-4 text-center backdrop-blur-xl"
              >
                <p className="text-2xl font-light text-white">{value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[.18em] text-slate-400">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PulseOnly() {
  return (
    <svg className="h-full w-full" viewBox="0 0 620 300" fill="none">
      <motion.path
        d="M20 150 H110 C132 150 140 106 162 106 C192 106 192 216 228 216 C270 216 276 50 320 50 C366 50 366 150 408 150 H600"
        stroke={GI_ORANGE}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0.85] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function DoubleDiamond() {
  const steps = [
    ["Discover", "Research, benchmark y contexto."],
    ["Define", "Personas, insights y criterios UX."],
    ["Develop", "Ideación, arquitectura y blueprint."],
    ["Deliver", "UI, métricas, handoff y roadmap."],
  ];

  return (
    <div className="mt-12 grid gap-5 md:grid-cols-4">
      {steps.map(([title, text], index) => (
        <MotionCard key={title} index={index}>
          <div className="absolute left-0 top-0 h-1 w-full" style={{ background: index % 2 === 0 ? GI_BLUE : GI_ORANGE }} />
          <p className="text-xs text-slate-500">0{index + 1}</p>
          <h3 className="mt-5 text-2xl font-light">{title}</h3>
          <p className="mt-4 text-sm leading-7 text-slate-400">{text}</p>
        </MotionCard>
      ))}
    </div>
  );
}

function ArchitectureCard({ title, text, index }) {
  return (
    <MotionCard index={index}>
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-xl" style={{ background: index % 2 === 0 ? `${GI_ORANGE}25` : `${GI_BLUE}70`, color: index % 2 === 0 ? GI_ORANGE : "#8ab4ff" }}>
        {["⌂", "▤", "◔", "★", "●"][index]}
      </div>
      <h3 className="text-center text-sm font-semibold text-white">{title}</h3>
      <p className="mt-3 flex-1 text-center text-xs leading-6 text-slate-400">{text}</p>
    </MotionCard>
  );
}

function BlueprintTable() {
  return (
    <div className="mt-12 rounded-[2rem] border border-white/10 bg-white/[.035] p-6">
      <div className="overflow-x-auto">
        <div className="min-w-[980px]">
          {blueprint.map((row, rowIndex) => (
            <div key={row[0]} className="grid grid-cols-6 border-b border-white/10 last:border-b-0">
              {row.map((cell, colIndex) => (
                <motion.div
                  key={`${row[0]}-${cell}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: (rowIndex + colIndex) * 0.025 }}
                  className={`min-h-[84px] p-4 text-sm ${colIndex === 0 ? "font-semibold text-white" : "text-slate-400"}`}
                  style={{
                    background: rowIndex === 0 ? `${GI_ORANGE}16` : rowIndex === 2 ? `${GI_BLUE}26` : rowIndex === 5 ? "rgba(255,255,255,.04)" : "transparent",
                  }}
                >
                  {cell}
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GridSection({ label, title, items, orange = false }) {
  return (
    <Section>
      <SectionTitle label={label} title={title} orange={orange} />
      <div className="mt-10 grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-4">
        {items.map(([itemTitle, text], index) => (
          <MotionCard key={itemTitle} index={index}>
            <h3 className="uppercase tracking-[.18em]" style={{ color: GI_ORANGE }}>{itemTitle}</h3>
            <p className="mt-5 text-sm leading-7 text-slate-400">{text}</p>
          </MotionCard>
        ))}
      </div>
    </Section>
  );
}

function Section({ children }) {
  return <section className="mx-auto max-w-7xl px-6 py-20 md:px-8">{children}</section>;
}

function Split({ label, title, text, children }) {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:px-8 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <SectionTitle label={label} title={title} text={text} />
      </div>
      <div className="lg:col-span-7">{children}</div>
    </section>
  );
}

function SectionTitle({ label, title, text, orange = false }) {
  return (
    <>
      <p className="text-[10px] font-bold uppercase tracking-[.38em]" style={{ color: orange ? GI_ORANGE : "#60a5fa" }}>{label}</p>
      <h2 className="mt-7 max-w-4xl text-4xl font-light leading-[1.16] tracking-[-.035em] md:text-5xl">{title}</h2>
      {text && <p className="mt-8 max-w-3xl leading-[1.95] tracking-[-.006em] text-slate-400">{text}</p>}
    </>
  );
}

function MotionCard({ children, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, scale: 1.02 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.035] p-6 transition duration-300 hover:border-white/20 hover:shadow-[0_0_45px_rgba(242,140,40,.18)]"
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

function HighlightCard({ label, title }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[.035] p-8">
      <p className="text-xs uppercase tracking-[.3em]" style={{ color: GI_ORANGE }}>{label}</p>
      <h3 className="mt-5 text-3xl font-light leading-tight">{title}</h3>
    </div>
  );
}

function MiniBlock({ title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs uppercase tracking-[.18em]" style={{ color: GI_ORANGE }}>{title}</p>
      <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}

function Card({ title, text }) {
  return (
    <div className="flex h-full flex-col rounded-[2rem] border border-white/10 bg-white/[.035] p-6">
      <h3 className="uppercase tracking-[.18em]" style={{ color: GI_ORANGE }}>{title}</h3>
      <p className="mt-5 flex-1 text-sm leading-7 text-slate-400">{text}</p>
    </div>
  );
}

function MetricCard({ title, text, value, index }) {
  return (
    <MotionCard index={index}>
      <p className="text-xs uppercase tracking-[.25em]" style={{ color: GI_ORANGE }}>{title}</p>
      <motion.p
        initial={{ opacity: 0, scale: 0.75 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: index * 0.08 }}
        className="mt-5 text-5xl font-light"
      >
        {value}
      </motion.p>
      <p className="mt-5 text-sm leading-7 text-slate-400">{text}</p>
      <div className="mt-6 h-2 rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${60 + index * 10}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: index * 0.08, ease: "easeOut" }}
          className="h-2 rounded-full"
          style={{ background: index % 2 === 0 ? GI_ORANGE : GI_BLUE }}
        />
      </div>
    </MotionCard>
  );
}

function FloatingPill({ text, delay = 0 }) {
  return (
    <motion.div
      animate={{ x: [0, 18, 0], y: [0, -5, 0], opacity: [0.75, 1, 0.75] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay }}
      className="w-fit rounded-2xl border border-white/10 bg-white/[.06] px-5 py-3 text-sm text-slate-300 shadow-[0_18px_45px_rgba(0,0,0,.25)] backdrop-blur"
    >
      {text}
    </motion.div>
  );
}

function Avatar({ label }) {
  return (
    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-2xl font-semibold" style={{ background: `${GI_ORANGE}22`, color: GI_ORANGE }}>
      {label}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
      <p className="text-xs uppercase tracking-[.2em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm text-slate-200">{value}</p>
    </div>
  );
}

function ColorSwatch({ name, value }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-4">
      <span className="h-12 w-12 rounded-xl border border-white/10" style={{ background: value }} />
      <div>
        <p className="text-sm text-white">{name}</p>
        <p className="text-xs text-slate-500">{value}</p>
      </div>
    </div>
  );
}

function BackgroundGrid() {
  return (
    <>
      <div className="absolute inset-0 opacity-[.18] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:80px_80px]" />
      <div className="absolute left-[-10%] top-20 h-96 w-96 rounded-full blur-3xl" style={{ background: `${GI_BLUE}55` }} />
      <div className="absolute right-[-8%] top-60 h-96 w-96 rounded-full blur-3xl" style={{ background: `${GI_ORANGE}33` }} />
    </>
  );
}
