import React, { useState } from "react";
import { ApiMovie } from "../services/api-movie.js";
import { buildUrlImage } from "../utilitary/buildUrlImage.js";
import { Link } from "react-router-dom";
import { LoaderIcon, Search as SearchIcon, Film, Tv } from "lucide-react";

export default function Search() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [type, setType] = useState(null);
    const [loading, setLoading] = useState(false);

    const search = async (searchType) => {
        if (!query.trim()) return;

        try {
            setLoading(true);
            setType(searchType);
            const data = await ApiMovie.getSearch(query, searchType);
            setResults(data.results || []);
        } catch (e) {
            console.error("Error buscando:", e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen bg-slate-950 text-white px-4 sm:px-8 py-10">
            <div className="max-w-3xl mx-auto bg-slate-900/60 border border-white/10 rounded-2xl shadow-xl p-6 sm:p-8 space-y-5 mb-12">
                <h1 className="text-2xl sm:text-3xl font-bold text-center flex items-center justify-center gap-2">
                    <SearchIcon className="size-6" />
                    Buscar películas o series
                </h1>

                <input
                    className="w-full p-3 rounded-xl bg-slate-800 outline-none text-lg
                     focus:ring-2 focus:ring-indigo-500 transition"
                    placeholder="Ej: Matrix, Dark, Avengers..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") search("movie");
                    }}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 py-3 rounded-xl font-semibold transition"
                        onClick={() => search("movie")}
                    >
                        <Film size={18} /> Buscar película
                    </button>

                    <button className="flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 py-3 rounded-xl font-semibold transition"
                        onClick={() => search("tv")}
                    >
                        <Tv size={18} /> Buscar serie
                    </button>
                </div>
            </div>

            {loading && (
                <div className="flex justify-center my-10">
                    <LoaderIcon className="size-12 animate-spin text-slate-400" />
                </div>
            )}

            {!loading && results.length === 0 && type && (
                <p className="text-center text-slate-400">
                    No se encontraron resultados 😕
                </p>
            )}

            <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                {results.map((item) => (
                    <Link className="group bg-slate-900/60 border border-white/10 rounded-xl overflow-hidden hover:scale-[1.04] hover:border-indigo-400/40 hover:shadow-xl transition-all duration-300"
                        key={item.id}
                        to={`/details/${type}/${item.id}`}
                    >
                        <div className="aspect-[2/3] w-full overflow-hidden">
                            <img
                                src={buildUrlImage(item.poster_path)}
                                alt={item.title || item.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                loading="lazy"
                            />
                        </div>

                        <div className="p-2 sm:p-3">
                            <h3 className="font-semibold text-sm sm:text-base line-clamp-2">
                                {item.title || item.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-400 mt-1">
                                ⭐ {item.vote_average?.toFixed(1) || "N/A"}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
