import React from 'react';
import { MdFactory, MdScience, MdSettings } from 'react-icons/md';

const ManufacturingSection = () => {
  return (
    <section className="flex flex-1 justify-center py-20 px-4 md:px-10 lg:px-40 bg-white">
      <div className="flex flex-col max-w-300 flex-1">
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
  );
};

export default ManufacturingSection;
