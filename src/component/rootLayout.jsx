import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Film, Tv, History, Search, Menu, X } from "lucide-react";

export default function RootLayout() {
    const [open, setOpen] = useState(false);

    const linkClass = ({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 rounded-lg transition text-base
     ${
            isActive
                ? "bg-indigo-600 text-white"
                : "text-slate-300 hover:bg-slate-700 hover:text-white"
        }`;

    return (
        <div className="min-h-screen flex flex-col bg-slate-950 text-white">
            <header className="bg-slate-900/80 backdrop-blur border-b border-white/10 sticky top-0 z-50">
                <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
                    <h1 className="text-base sm:text-xl font-bold text-indigo-400">
                        🎬 MovieApp
                    </h1>

                    <div className="hidden sm:flex gap-2">
                        <NavLink to="/" className={linkClass}>
                            <Film size={16} /> Películas
                        </NavLink>
                        <NavLink to="/series" className={linkClass}>
                            <Tv size={16} /> Series
                        </NavLink>
                        <NavLink to="/history" className={linkClass}>
                            <History size={16} /> Historial
                        </NavLink>
                        <NavLink to="/search" className={linkClass}>
                            <Search size={16} /> Buscar
                        </NavLink>
                    </div>

                    <button
                        className="sm:hidden text-slate-200"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </nav>

                {open && (
                    <div className="sm:hidden bg-slate-900 border-t border-white/10 px-3 py-4 space-y-2">
                        <NavLink to="/" onClick={() => setOpen(false)} className={linkClass}>
                            <Film size={18} /> Películas
                        </NavLink>
                        <NavLink to="/series" onClick={() => setOpen(false)} className={linkClass}>
                            <Tv size={18} /> Series
                        </NavLink>
                        <NavLink to="/history" onClick={() => setOpen(false)} className={linkClass}>
                            <History size={18} /> Historial
                        </NavLink>
                        <NavLink to="/search" onClick={() => setOpen(false)} className={linkClass}>
                            <Search size={18} /> Buscar
                        </NavLink>
                    </div>
                )}
            </header>

            <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-4 py-5">
                <Outlet />
            </main>

            <footer className="bg-slate-900 border-t border-white/10 text-center py-3 text-xs sm:text-sm text-slate-400">
                © 2026 MovieApp — Todos los derechos reservados.
            </footer>
        </div>
    );
}
