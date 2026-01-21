import React from 'react';
import { Link, Outlet} from "react-router";


export default function RootLayout() {

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">

            <header className="bg-gray-800 shadow-md">
                <nav className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
                    <h1 className="text-xl font-bold text-blue-400">🎬 Aplicacion peliculas 1 semestre</h1>

                    <div className="flex gap-3">
                        <Link to="/">
                            Películas
                        </Link>
                        <Link to="/series">
                            Series
                        </Link>
                        <Link to="/history">
                            Historial de Escaneos
                        </Link>
                        <Link to="/search">
                            Buscador
                        </Link>
                    </div>
                </nav>
            </header>

            <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
                <Outlet />
            </main>

            <footer className="bg-gray-800 text-center py-4 text-sm text-gray-400">
                © 2026 MovieApp — Todos los derechos reservados.
            </footer>
        </div>
    );
}
