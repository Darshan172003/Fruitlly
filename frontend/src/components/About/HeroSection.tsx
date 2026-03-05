import React from 'react';

const HeroSection = () => {
  return (
    <section className="flex flex-1 justify-center py-12 px-4 md:px-10 lg:px-40">
      <div className="flex flex-col max-w-300 flex-1">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
          <div
            className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-2xl shadow-lg lg:w-1/2"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC5TtGsFdK6IkktWJhzqcf3lH_ekdoBiOAzV5_blJOTE-JttkFok9bSQ-O-L_WfQtwA09UGsHH7-vmvIOKJ9wVhAAkjglhTg2HAfLttjoPTyUVnoUp97tSBqNzXTXLr_Cys2xueAWV_3WZVEWOHeUE8q_XMIGX9zZgTKTTLKM6mwDKMqx37t-s6sHSmeo2uhN5sHiQNDTyWD77w4ALqGouuBBDdWy0imyyB81LJN3nf3L95sUr_Dx-I5ex_6S2A4rqj7-UzTe7J3iKd")' }}
          ></div>
          <div className="flex flex-col gap-6 lg:w-1/2 lg:pl-12">
            <div className="flex flex-col gap-3">
              <span className="text-primary-green font-bold text-sm uppercase tracking-widest">Our Heritage</span>
              <h1 className="text-slate-900 text-4xl font-black leading-tight tracking-tight md:text-5xl font-display">
                About Fruitlly
              </h1>
              <p className="text-slate-600 text-lg font-normal leading-relaxed">
                A premium sub-brand of <span className="text-primary font-bold">Tulsi Foods</span>, bringing you the finest sugar-coated jelly cubes crafted with passion and precision. We combine traditional recipes with modern manufacturing to deliver unparalleled taste.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="flex min-w-35 cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-tight hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                View Products
              </button>
              <button className="flex min-w-35 cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-primary-green text-white text-base font-bold leading-normal tracking-tight hover:scale-105 transition-transform shadow-lg shadow-primary-green/20">
                Certifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
