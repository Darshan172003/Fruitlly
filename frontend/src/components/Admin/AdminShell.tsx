import React, { type ReactNode } from 'react';
import { HiOutlineArrowRightOnRectangle } from 'react-icons/hi2';
import type { AdminSectionId, AdminSidebarItem } from './types';
import FruitllyLogo from '../../assets/Logo.png'

interface AdminShellProps {
  activeSection: AdminSectionId;
  items: AdminSidebarItem[];
  userEmail: string;
  sectionTitle: string;
  sectionDescription: string;
  onSectionChange: (sectionId: AdminSectionId) => void;
  onLogout: () => void;
  children: ReactNode;
}

const AdminShell = ({
  activeSection,
  items,
  userEmail,
  sectionTitle,
  sectionDescription,
  onSectionChange,
  onLogout,
  children,
}: AdminShellProps) => {
  return (
    <div className="h-screen overflow-hidden bg-[#eef1f5] text-slate-900">
      <div className="mx-auto flex h-screen  flex-col overflow-hidden border-x border-slate-300 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
        <header className="flex flex-col gap-4 border-b border-slate-300 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <img src={FruitllyLogo} alt="Fruitlly Logo" className="h-10 w-auto" />
            <p className="text-xl font-bold text-slate-900">Fruitlly Admin Panel</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-slate-500">{userEmail}</span>
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-2 rounded-xl bg-[#0f172a] px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              <HiOutlineArrowRightOnRectangle size={16} />
              Logout
            </button>
          </div>
        </header>

        <div className="grid min-h-0 flex-1 lg:grid-cols-[280px_1fr]">
          <aside className="border-b border-slate-300 bg-[#f8fafc] p-2 lg:sticky lg:top-0 lg:h-full lg:overflow-y-auto lg:border-b-0 lg:border-r">
            <nav className="space-y-2">
              {items.map((item) => {
                const isActive = item.id === activeSection;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSectionChange(item.id)}
                    className={
                      isActive
                        ? 'flex w-full items-center gap-3 rounded-xl bg-[#0f172a] p-3 text-left text-white'
                        : 'flex w-full items-center gap-3 rounded-2xl bg-transparent p-3 text-left text-slate-600 transition hover:bg-slate-200'
                    }
                  >
                    <span className={isActive ? 'text-white' : 'text-slate-400'}>{item.icon}</span>
                    <span>
                      <span className="block text-base font-semibold">{item.label}</span>
                      {/* <span className={isActive ? 'block text-xs text-slate-300' : 'block text-xs text-slate-400'}>
                        {item.description}
                      </span> */}
                    </span>
                  </button>
                );
              })}
            </nav>
          </aside>

          <main className="min-h-0 overflow-y-auto bg-[#f3f5f9] p-6 md:p-8 lg:p-10">
            <div className="mb-8">
              <h1 className="text-3xl font-black text-slate-900">{sectionTitle}</h1>
              <p className="mt-2 text-base text-slate-500">{sectionDescription}</p>
            </div>

            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminShell;