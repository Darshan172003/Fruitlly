import React from 'react';
import { MdFactory, MdPublic, MdVerifiedUser } from 'react-icons/md';

const LegacySection = () => {
  return (
    <section className="flex flex-1 justify-center py-16 px-4 md:px-10 lg:px-40 bg-slate-50">
      <div className="flex flex-col max-w-300 flex-1">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4 max-w-180">
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
  );
};

export default LegacySection;
