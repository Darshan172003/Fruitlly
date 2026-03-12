import React, { type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
    HiOutlineEnvelope,
    HiOutlineKey,
    HiOutlineLockClosed,
    HiOutlineShieldCheck,
} from 'react-icons/hi2';
import { ImSpinner8 } from 'react-icons/im';

interface AdminLoginProps {
    email: string;
    password: string;
    authError: string;
    submittingLogin: boolean;
    onEmailChange: (value: string) => void;
    onPasswordChange: (value: string) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const AdminLogin = ({
    email,
    password,
    authError,
    submittingLogin,
    onEmailChange,
    onPasswordChange,
    onSubmit,
}: AdminLoginProps) => {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#edf2f7] px-4 py-8 sm:px-6 lg:px-8">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-[8%] top-16 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
                <div className="absolute bottom-20 right-[10%] h-64 w-64 rounded-full bg-emerald-400/15 blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),rgba(255,255,255,0)_60%)]" />
            </div>

            <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/70 bg-white/95 shadow-[0_30px_90px_rgba(15,23,42,0.18)] backdrop-blur"
                >
                    <div className="flex items-center justify-center">
                        <section className="p-8 md:p-10 lg:p-12">
                            <div className="max-w-xl">
                                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-600 shadow-sm">
                                    <HiOutlineShieldCheck size={14} />
                                    Admin Access
                                </div>
                                <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                                    Sign in to the Fruitlly dashboard.
                                </h1>
                                <p className="mt-3 text-base leading-relaxed text-slate-600">
                                    Use your Firebase Authentication email and password to access the sidebar-based admin workspace.
                                </p>
                            </div>

                            <form className="mt-10 max-w-xl space-y-5" onSubmit={onSubmit}>
                                <label className="block">
                                    <span className="mb-2 block text-sm font-semibold text-slate-700">Email address</span>
                                    <div className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-primary focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(239,68,68,0.12)]">
                                        <span className="shrink-0 text-slate-400 transition group-focus-within:text-primary">
                                            <HiOutlineEnvelope size={18} />
                                        </span>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(event) => onEmailChange(event.target.value)}
                                            className="w-full bg-transparent py-3 text-slate-900 outline-none placeholder:text-slate-400"
                                            placeholder="admin@fruitlly.com"
                                            autoComplete="email"
                                            required
                                        />
                                    </div>
                                </label>

                                <label className="block">
                                    <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
                                    <div className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-primary focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(239,68,68,0.12)]">
                                        <span className="shrink-0 text-slate-400 transition group-focus-within:text-primary">
                                            <HiOutlineKey size={18} />
                                        </span>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(event) => onPasswordChange(event.target.value)}
                                            className="w-full bg-transparent py-3 text-slate-900 outline-none placeholder:text-slate-400"
                                            placeholder="........"
                                            autoComplete="current-password"
                                            required
                                        />
                                    </div>
                                </label>

                                {authError && (
                                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                                        {authError}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={submittingLogin}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-[#0f172a] to-[#1e293b] px-5 py-3 text-sm font-bold text-white shadow-[0_10px_30px_rgba(15,23,42,0.28)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {submittingLogin ? <span className="inline-flex animate-spin"><ImSpinner8 size={18} /></span> : <HiOutlineLockClosed size={18} />}
                                    Sign in
                                </button>
                            </form>

                            <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <Link
                                    to="/"
                                    className="inline-flex text-sm font-semibold text-primary transition hover:text-red-700"
                                >
                                    Return to Home
                                </Link>
                                <p className="text-xs text-slate-500">
                                    Authorized team members only
                                </p>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminLogin;
