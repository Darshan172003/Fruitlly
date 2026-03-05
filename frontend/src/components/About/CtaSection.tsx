import React from 'react';

const CtaSection = () => {
  return (
    <section className="flex flex-1 justify-center py-24 px-4 md:px-10 lg:px-40 bg-white">
      <div className="flex flex-col max-w-300 flex-1 bg-slate-900 rounded-[40px] p-12 md:p-20 text-center items-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-green/20 rounded-full blur-[80px] -ml-32 -mb-32"></div>

        <h2 className="text-white text-4xl md:text-5xl font-black font-display relative z-10">Ready to Partner with Fruitlly?</h2>
        <p className="text-slate-400 text-lg max-w-150 relative z-10">
          Join our network of global B2B partners and bring premium jelly treats to your market.
        </p>
        <div className="flex flex-wrap justify-center gap-4 relative z-10">
          <button className="bg-primary hover:bg-red-700 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-primary/20">
            Contact Sales
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-2xl font-bold transition-all backdrop-blur-md">
            Download Brochure
          </button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
