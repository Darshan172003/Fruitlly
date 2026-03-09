import React from 'react';
import { Clock3 } from 'lucide-react';

interface AdminPlaceholderPanelProps {
  title: string;
  description: string;
}

const AdminPlaceholderPanel = ({ title, description }: AdminPlaceholderPanelProps) => {
  return (
    <section className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white p-8 shadow-sm">
      <div className="inline-flex rounded-xl bg-slate-100 p-3 text-slate-600">
        <Clock3 size={18} />
      </div>
      <h2 className="mt-5 text-2xl font-black text-slate-900">{title}</h2>
      <p className="mt-3 max-w-2xl text-slate-500 leading-relaxed">{description}</p>
    </section>
  );
};

export default AdminPlaceholderPanel;