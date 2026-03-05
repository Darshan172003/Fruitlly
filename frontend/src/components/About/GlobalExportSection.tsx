import React from 'react';
import { MdGroups, MdLanguage, MdPublic, MdVerifiedUser } from 'react-icons/md';

const GlobalExportSection = () => {
  return (
    <section className="flex flex-1 justify-center py-20 px-4 md:px-10 lg:px-40 bg-primary text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-white rounded-full blur-[120px]"></div>
      </div>
      <div className="flex flex-col max-w-300 flex-1 relative z-10">
        <div className="flex flex-col items-center text-center gap-6 mb-12">
          <span className="text-white/80 font-bold text-sm uppercase tracking-widest">Global Export Network</span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight font-display">Connecting Sweetness Worldwide</h2>
          <p className="text-white/80 text-lg max-w-180">
            From our central manufacturing hub, we export to major markets across Asia, Europe, and the Middle East. Our logistics network is optimized for temperature-controlled shipping to preserve product integrity.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center gap-2">
            <span className="mb-2">
              <MdLanguage size={40} />
            </span>
            <p className="text-2xl font-bold">15+</p>
            <p className="text-sm text-white/70 uppercase tracking-widest">Countries</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="mb-2">
              <MdGroups size={40} />
            </span>
            <p className="text-2xl font-bold">200+</p>
            <p className="text-sm text-white/70 uppercase tracking-widest">B2B Partners</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="mb-2">
              <MdPublic size={40} />
            </span>
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm text-white/70 uppercase tracking-widest">Continents</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="mb-2">
              <MdVerifiedUser size={40} />
            </span>
            <p className="text-2xl font-bold">100%</p>
            <p className="text-sm text-white/70 uppercase tracking-widest">Export Grade</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalExportSection;
