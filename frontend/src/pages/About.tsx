import React from 'react';
import { motion } from 'motion/react';
import { 
  MdFactory, 
  MdPublic, 
  MdVerifiedUser, 
  MdRocketLaunch, 
  MdVisibility,
  MdScience,
  MdSettings,
  MdLanguage,
  MdGroups,
  MdHandshake,
  MdEco
} from 'react-icons/md';

const About = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col flex-1"
    >
      {/* Hero Section */}
      <section className="flex flex-1 justify-center py-12 px-4 md:px-10 lg:px-40">
        <div className="flex flex-col max-w-[1200px] flex-1">
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
                <button className="flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-tight hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                  View Products
                </button>
                <button className="flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-primary-green text-white text-base font-bold leading-normal tracking-tight hover:scale-105 transition-transform shadow-lg shadow-primary-green/20">
                  Certifications
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="flex flex-1 justify-center py-16 px-4 md:px-10 lg:px-40 bg-slate-50">
        <div className="flex flex-col max-w-[1200px] flex-1">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4 max-w-[720px]">
              <h2 className="text-slate-900 text-3xl font-bold leading-tight md:text-4xl md:font-black tracking-tight font-display">
                The Legacy of Tulsi Foods
              </h2>
              <p className="text-slate-600 text-base font-normal leading-relaxed">
                With decades of expertise in the confectionery industry, Tulsi Foods is committed to delivering quality and taste across the globe. Our parent company serves as the backbone of innovation and ethical sourcing for every Fruitlly product.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-primary p-3 bg-primary/10 rounded-xl w-fit">
                  <MdFactory size={32} />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-slate-900 text-lg font-bold leading-tight">Industry Expertise</h3>
                  <p className="text-slate-500 text-sm font-normal leading-normal">
                    Over 20 years of excellence in high-volume confectionery manufacturing and supply chain management.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-primary-green p-3 bg-primary-green/10 rounded-xl w-fit">
                  <MdPublic size={32} />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-slate-900 text-lg font-bold leading-tight">Global Reach</h3>
                  <p className="text-slate-500 text-sm font-normal leading-normal">
                    Supplying premium jelly treats and snacks to B2B partners across 15+ countries worldwide.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-primary p-3 bg-primary/10 rounded-xl w-fit">
                  <MdVerifiedUser size={32} />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-slate-900 text-lg font-bold leading-tight">Quality Assurance</h3>
                  <p className="text-slate-500 text-sm font-normal leading-normal">
                    Strict adherence to ISO and HACCP international food safety standards for every batch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Excellence */}
      <section className="flex flex-1 justify-center py-20 px-4 md:px-10 lg:px-40 bg-white">
        <div className="flex flex-col max-w-[1200px] flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <span className="text-primary font-bold text-sm uppercase tracking-widest">Manufacturing Excellence</span>
                <h2 className="text-slate-900 text-3xl font-bold leading-tight md:text-4xl font-display">
                  State-of-the-Art Production
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Our manufacturing facility is equipped with the latest technology to ensure consistency, hygiene, and efficiency. We operate at a scale that allows us to meet the demands of global B2B partners without compromising on the artisanal quality of our jelly cubes.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="text-primary-green mt-1">
                    <MdSettings size={24} />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold mb-1">Advanced Automation</h4>
                    <p className="text-slate-500 text-sm">Precision cooking and cooling systems for perfect texture.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-primary mt-1">
                    <MdScience size={24} />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold mb-1">R&D Laboratory</h4>
                    <p className="text-slate-500 text-sm">Continuous flavor innovation and shelf-life testing.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full aspect-square bg-slate-100 rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6Q1qPF-MG-mx_tmeEvyxmfqK2nzN2CzeYRemZHacvRJC3cYns6piGWabC2ulWeMwnHA2xLSxoAwPuRU4SCAktJjI1kqDdw7fbIP6USFWGXJhpNwd36dxVN_yR3fSRzox0brQpGEhAg2AkT0wm3ohZ7aNjt9zUaN7By4fK6-sYreeZzGgwXIt53ZcCXLo00tbj5zx3iV5Pp3RwX8boVHreax4ZMtbd7SkcTJHcT4MnagP4li_fY53xcKYLs4P_k23JdYjg8Ilw3GrV" 
                  alt="Factory Floor" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="size-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <MdFactory size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-slate-900">50,000+</p>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Units Daily Capacity</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Export Network */}
      <section className="flex flex-1 justify-center py-20 px-4 md:px-10 lg:px-40 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full blur-[120px]"></div>
        </div>
        <div className="flex flex-col max-w-[1200px] flex-1 relative z-10">
          <div className="flex flex-col items-center text-center gap-6 mb-12">
            <span className="text-white/80 font-bold text-sm uppercase tracking-widest">Global Export Network</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight font-display">Connecting Sweetness Worldwide</h2>
            <p className="text-white/80 text-lg max-w-[720px]">
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

      {/* Pillars Section */}
      <section className="flex flex-1 justify-center py-20 px-4 md:px-10 lg:px-40 bg-white">
        <div className="flex flex-col max-w-[1200px] flex-1">
          <div className="flex flex-col items-center mb-12">
            <span className="text-primary-green font-bold text-sm mb-2 uppercase tracking-widest">Driven by Purpose</span>
            <h2 className="text-slate-900 text-3xl font-bold leading-tight text-center font-display">Our Core Pillars</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-6 p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:-translate-y-1 transition-transform">
              <div 
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-2xl shadow-inner"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBir-Eo_fZ8k7J0j9cjpUkdOhHp_zgV8iSpAgvY32JOBusCq7Wcj-tmHV6kc-obqIjL0d21o47MU9vcjC-MLUL-1GvLVwMbUmjsH377uELv8DRvTa4ybzh_WiGT6jwAroMxrZspvpOxeSkpq_RoThudEWjEFrmGnFMAONeDesEv_TT55czmOTjrm2aXcMPYfP-gd-r-4EJNesjBsZLYD0zqi74C_rScshxf_2KNBsXevMuXBjBVh3vWVT1uWQhzeRKxoPQlyBrDSG83")' }}
              ></div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="text-primary">
                    <MdRocketLaunch size={28} />
                  </div>
                  <h3 className="text-slate-900 text-2xl font-bold leading-normal">Our Mission</h3>
                </div>
                <p className="text-slate-600 text-base font-normal leading-relaxed">
                  To be the leading provider of high-quality confectionery products that bring joy to every bite while empowering our B2B partners through reliable supply chains and innovative product development.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-6 p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:-translate-y-1 transition-transform">
              <div 
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-2xl shadow-inner"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB6Q1qPF-MG-mx_tmeEvyxmfqK2nzN2CzeYRemZHacvRJC3cYns6piGWabC2ulWeMwnHA2xLSxoAwPuRU4SCAktJjI1kqDdw7fbIP6USFWGXJhpNwd36dxVN_yR3fSRzox0brQpGEhAg2AkT0wm3ohZ7aNjt9zUaN7By4fK6-sYreeZzGgwXIt53ZcCXLo00tbj5zx3iV5Pp3RwX8boVHreax4ZMtbd7SkcTJHcT4MnagP4li_fY53xcKYLs4P_k23JdYjg8Ilw3GrV")' }}
              ></div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="text-primary-green">
                    <MdVisibility size={28} />
                  </div>
                  <h3 className="text-slate-900 text-2xl font-bold leading-normal">Our Vision</h3>
                </div>
                <p className="text-slate-600 text-base font-normal leading-relaxed">
                  To set the global standard for innovation and excellence in the jelly candy market through sustainable practices, cutting-edge food technology, and a commitment to customer satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="flex flex-1 justify-center py-20 px-4 md:px-10 lg:px-40 bg-slate-50">
        <div className="flex flex-col max-w-[1200px] flex-1">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-slate-900 text-3xl font-bold font-display mb-4">Our Core Values</h2>
            <p className="text-slate-500 max-w-[600px]">The principles that guide our decisions and define our culture every day.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="size-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary border border-slate-100">
                <MdHandshake size={32} />
              </div>
              <h4 className="text-slate-900 font-bold">Integrity</h4>
              <p className="text-slate-500 text-sm">Honesty and transparency in every business dealing.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="size-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary-green border border-slate-100">
                <MdScience size={32} />
              </div>
              <h4 className="text-slate-900 font-bold">Innovation</h4>
              <p className="text-slate-500 text-sm">Constantly pushing the boundaries of flavor and texture.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="size-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary border border-slate-100">
                <MdGroups size={32} />
              </div>
              <h4 className="text-slate-900 font-bold">Partnership</h4>
              <p className="text-slate-500 text-sm">Growing together with our clients and suppliers.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="size-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary-green border border-slate-100">
                <MdEco size={32} />
              </div>
              <h4 className="text-slate-900 font-bold">Sustainability</h4>
              <p className="text-slate-500 text-sm">Commitment to ethical sourcing and waste reduction.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="flex flex-1 justify-center py-24 px-4 md:px-10 lg:px-40 bg-white">
        <div className="flex flex-col max-w-[1200px] flex-1 bg-slate-900 rounded-[40px] p-12 md:p-20 text-center items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-green/20 rounded-full blur-[80px] -ml-32 -mb-32"></div>
          
          <h2 className="text-white text-4xl md:text-5xl font-black font-display relative z-10">Ready to Partner with Fruitlly?</h2>
          <p className="text-slate-400 text-lg max-w-[600px] relative z-10">
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
    </motion.div>
  );
};

export default About;
