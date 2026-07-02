import React from 'react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-provocative-primary/10 via-provocative-dark to-provocative-secondary/20 animate-gradient-x" />
        <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-gradient-to-br from-amber-900/30 via-stone-800/20 to-amber-800/30" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-7xl md:text-9xl font-burtons mb-6 text-provocative-accent tracking-tight">
            <span className="block">WASATCH</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-provocative-primary to-provocative-secondary">
              ROCKHOUND
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl mb-12 text-provocative-light/90 max-w-2xl">
            Gear that survives Utah's BLM land — where ordinary equipment becomes{' '}
            <span className="relative">
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-provocative-accent transform scale-x-0 hover:scale-x-100 transition-transform" />
              <span className="relative hover:text-provocative-accent">history</span>
            </span>
          </p>

          <div className="flex flex-wrap gap-6">
            <button className="px-10 py-4 text-xl font-bold bg-provocative-primary hover:bg-provocative-accent text-provocative-dark rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(255,209,102,0.5)]">
              Gear That Lasts
            </button>
            <button className="px-10 py-4 text-xl border-2 border-provocative-accent text-provocative-accent rounded-full hover:bg-provocative-accent/10 transition-all">
              Map Your Hunt
            </button>
          </div>
        </div>
      </div>

      {/* Animated particle effect */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-provocative-dark to-transparent">
        <div className="absolute inset-0 opacity-20 bg-gradient-to-t from-stone-900/40 to-transparent" />
      </div>
    </section>
  );
}