export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00e5ff15,transparent_60%)]"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-8 text-center">

          <span className="inline-flex px-4 py-2 rounded-full border border-cyan-500/30 text-cyan-400 text-sm mb-8">
            UX Case Study
          </span>

          <h1 className="text-7xl font-bold mb-6">
            Eilik
          </h1>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Diseño de experiencia centrado en la conexión emocional entre
            humanos y robots de compañía.
          </p>

          <div className="flex justify-center gap-4 mt-10">

            <button className="px-8 py-4 rounded-full bg-cyan-500 text-slate-950 font-semibold hover:scale-105 transition">
              Ver Caso
            </button>

            <button className="px-8 py-4 rounded-full border border-cyan-500/30 hover:border-cyan-500 transition">
              Proceso UX
            </button>

          </div>

        </div>

      </section>

      {/* REFERENCIAS */}
      <section className="max-w-7xl mx-auto px-8 py-32">

        <h2 className="text-5xl font-bold mb-4">
          Referencias
        </h2>

        <p className="text-slate-400 mb-16">
          Inspiraciones visuales y tecnológicas utilizadas para el análisis.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="rounded-[32px] border border-cyan-500/20 p-8 bg-slate-900/50">
            <h3 className="text-3xl font-semibold">Tamagotchi</h3>
            <p className="text-slate-400 mt-2">1996</p>
          </div>

          <div className="rounded-[32px] border border-cyan-500/20 p-8 bg-slate-900/50">
            <h3 className="text-3xl font-semibold">Anki Vector</h3>
            <p className="text-slate-400 mt-2">2018</p>
          </div>

          <div className="rounded-[32px] border border-cyan-500/20 p-8 bg-slate-900/50">
            <h3 className="text-3xl font-semibold">Anki Cozmo</h3>
            <p className="text-slate-400 mt-2">2016</p>
          </div>

        </div>

      </section>

    </div>
  )
}