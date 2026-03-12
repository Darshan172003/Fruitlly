import React, { useState, type ReactNode } from 'react';
import { HiOutlineArrowRightOnRectangle, HiOutlineBars3, HiOutlineXMark } from 'react-icons/hi2';
import type { AdminSectionId, AdminSidebarItem } from './types';
import FruitllyLogo from '../../assets/Logo.png'

interface AdminShellProps {
  activeSection: AdminSectionId;
  items: AdminSidebarItem[];
  userEmail: string;
  onSectionChange: (sectionId: AdminSectionId) => void;
  onLogout: () => void;
  children: ReactNode;
}

const AdminShell = ({
  activeSection,
  items,
  userEmail,
  onSectionChange,
  onLogout,
  children,
}: AdminShellProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSectionSelect = (sectionId: AdminSectionId) => {
    onSectionChange(sectionId);
    setIsMobileMenuOpen(false);
  };

  const sidebarNavigation = (
    <nav className="space-y-2">
      {items.map((item) => {
        const isActive = item.id === activeSection;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => handleSectionSelect(item.id)}
            className={
              isActive
                ? 'flex w-full items-center gap-3 rounded-xl bg-[#0f172a] p-3 text-left text-white'
                : 'flex w-full items-center gap-3 rounded-2xl bg-transparent p-3 text-left text-slate-600 transition hover:bg-slate-200'
            }
          >
            <span className={isActive ? 'text-white' : 'text-slate-400'}>{item.icon}</span>
            <span>
              <span className="block text-base font-semibold">{item.label}</span>
            </span>
          </button>
        );
      })}
    </nav>
  );

  return (
    <div className="h-screen overflow-hidden bg-[#eef1f5] text-slate-900">
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-[2px] lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <div className="mx-auto flex h-screen flex-col overflow-hidden border-x border-slate-300 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
        <header className="flex flex-col gap-4 border-b border-slate-300 px-4 py-4 sm:px-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-100 lg:hidden"
                aria-label="Open admin menu"
              >
                <HiOutlineBars3 size={22} />
              </button>
              <img src={FruitllyLogo} alt="Fruitlly Logo" className="h-10 w-auto" />
              <p className="text-lg font-bold text-slate-900 sm:text-xl">Fruitlly Admin Panel</p>
            </div>
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

        <aside
          className={`fixed inset-y-0 left-0 z-50 w-70 border-r border-slate-300 bg-[#f8fafc] p-3 shadow-[0_20px_50px_rgba(15,23,42,0.18)] transition-transform duration-300 lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="mb-4 flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div className="flex items-center gap-3">
              <img src={FruitllyLogo} alt="Fruitlly Logo" className="h-9 w-auto" />
              <p className="text-base font-bold text-slate-900">Admin Menu</p>
            </div>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-100"
              aria-label="Close admin menu"
            >
              <HiOutlineXMark size={20} />
            </button>
          </div>
          {sidebarNavigation}
        </aside>

        <div className="grid min-h-0 flex-1 lg:grid-cols-[280px_1fr]">
          <aside className="hidden border-b border-slate-300 bg-[#f8fafc] p-2 lg:sticky lg:top-0 lg:block lg:h-full lg:overflow-y-auto lg:border-b-0 lg:border-r">
            {sidebarNavigation}
          </aside>

          <main className="min-h-0 overflow-y-auto bg-[#f3f5f9] p-4 md:p-5 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminShell;