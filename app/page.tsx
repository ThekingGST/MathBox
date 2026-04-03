import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-600/10 blur-[140px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] rounded-full bg-sky-500/10 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-5xl px-8 text-center animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-10 glass rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Next-Gen Math Platform
        </div>
        
        <h1 className="text-6xl md:text-8xl font-extrabold mb-10 tracking-tighter leading-[0.9]">
          Master Math for <br />
          <span className="text-gradient">Intelligence.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-14 max-w-2xl mx-auto font-medium">
          An interactive platform to visualize, code, and truly understand the mathematics powering the modern AI revolution. No installation required.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link 
            href="/learn" 
            className="px-12 py-5 bg-indigo-600 hover:bg-indigo-500 text-white transform hover:-translate-y-1 transition-all duration-300 rounded-2xl font-bold shadow-2xl shadow-indigo-500/25 w-full sm:w-auto"
          >
            Begin Journey
          </Link>
          <Link 
            href="/playground" 
            className="px-12 py-5 glass hover:bg-white/5 transform hover:-translate-y-1 transition-all duration-300 rounded-2xl font-bold border border-white/10 w-full sm:w-auto backdrop-blur-xl"
          >
            Interactive Sandbox
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 text-left">
          <div className="p-8 glass-card rounded-[2rem]">
            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 mb-8 text-3xl shadow-inner border border-indigo-500/20">
              📐
            </div>
            <h3 className="text-xl font-bold mb-4 text-white tracking-tight">Linear Algebra</h3>
            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              Visualize multidimensional vectors and matrix transformations in interactive 3D space.
            </p>
          </div>
          
          <div className="p-8 glass-card rounded-[2rem]">
            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-sky-500/10 text-sky-400 mb-8 text-3xl shadow-inner border border-sky-500/20">
              📉
            </div>
            <h3 className="text-xl font-bold mb-4 text-white tracking-tight">Calculus</h3>
            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              Explore gradient descent, optimization, and neural backpropagation through live derivations.
            </p>
          </div>
          
          <div className="p-8 glass-card rounded-[2rem]">
            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 mb-8 text-3xl shadow-inner border border-amber-500/20">
              🐍
            </div>
            <h3 className="text-xl font-bold mb-4 text-white tracking-tight">WASM Playground</h3>
            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              Run real Python code with NumPy and SymPy in your browser without a backend.
            </p>
          </div>
        </div>
      </div>

      <footer className="mt-32 pb-16 text-slate-500 text-xs font-bold tracking-[0.3em] uppercase opacity-50">
        Mathbox — Architected for Deep Understanding.
      </footer>
    </main>
  );
}
