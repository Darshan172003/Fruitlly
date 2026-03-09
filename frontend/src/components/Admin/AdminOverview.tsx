import React from 'react';
import { Boxes, ImageIcon, PackagePlus, Settings } from 'lucide-react';

interface AdminOverviewProps {
  productCount: number;
  onJumpToAddProduct: () => void;
  onJumpToCatalog: () => void;
}

const AdminOverview = ({ productCount, onJumpToAddProduct, onJumpToCatalog }: AdminOverviewProps) => {
  const stats = [
    {
      label: 'Live Products',
      value: String(productCount),
      icon: <Boxes size={18} />,
    },
    {
      label: 'Media Modules',
      value: 'Planned',
      icon: <ImageIcon size={18} />,
    },
    {
      label: 'Dashboard Status',
      value: 'Active',
      icon: <Settings size={18} />,
    },
  ];

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <article key={stat.label} className="rounded-[1.75rem] border border-slate-300 bg-white p-6 shadow-sm">
            <div className="inline-flex rounded-xl bg-slate-100 p-3 text-slate-700">{stat.icon}</div>
            <p className="mt-5 text-sm font-semibold text-slate-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-black text-slate-900">{stat.value}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[1.75rem] border border-slate-300 bg-white p-6 md:p-8 shadow-sm">
        <h2 className="text-2xl font-black text-slate-900">Quick actions</h2>
        <p className="mt-2 text-slate-500">Use the sidebar to move between product management and future sections.</p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onJumpToAddProduct}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0f172a] px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            <PackagePlus size={16} />
            Add Product
          </button>
          <button
            type="button"
            onClick={onJumpToCatalog}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
          >
            <Boxes size={16} />
            View Catalog
          </button>
        </div>
      </section>
    </div>
  );
};

export default AdminOverview;