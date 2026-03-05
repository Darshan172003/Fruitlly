import React from 'react';
import { MdEco, MdGroups, MdHandshake, MdScience } from 'react-icons/md';

const ValuesSection = () => {
  return (
    <section className="flex flex-1 justify-center py-20 px-4 md:px-10 lg:px-40 bg-slate-50">
      <div className="flex flex-col max-w-300 flex-1">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-slate-900 text-3xl font-bold font-display mb-4">Our Core Values</h2>
          <p className="text-slate-500 max-w-150">The principles that guide our decisions and define our culture every day.</p>
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
  );
};

export default ValuesSection;
