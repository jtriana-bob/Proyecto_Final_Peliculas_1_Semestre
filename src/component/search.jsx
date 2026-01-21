import React, { useState } from 'react';
import { ApiMovie } from "../services/api-movie.js";
import { buildUrlImage } from "../utilitary/buildUrlImage.js";
import { Link } from "react-router-dom";

export default function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [type, setType] = useState(null);
    const [loading, setLoading] = useState(false);

    const search = async (searchType) => {
        if (!query.trim()) return;
        try {
            setLoading(true);
            setType(searchType);
            const data = await ApiMovie.getSearch(query, searchType);
            setResults(data.results);
        } catch (e) {
            console.error("Error buscando:", e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white p-6">
            <div className="max-w-3xl mx-auto bg-slate-800 p-6 rounded-xl shadow-xl space-y-4 mb-10">
                <h1 className="text-2xl font-bold text-center">🔍 Buscar películas o series</h1>

                <input
                    className="w-full p-3 rounded bg-slate-700 outline-none text-lg"
                    placeholder="Ej: Matrix, Dark, Avengers..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <div className="flex gap-4">
                    <button onClick={() => search("movie")} className="flex-1 bg-emerald-500 hover:bg-emerald-600 py-2 rounded font-semibold">
                        🎬 Buscar película
                    </button>
                    <button onClick={() => search("tv")} className="flex-1 bg-sky-500 hover:bg-sky-600 py-2 rounded font-semibold">
                        📺 Buscar serie
                    </button>
                </div>
            </div>

            {loading && <p className="text-center">Buscando...</p>}

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
                {results.map(item => (
                    <Link key={item.id} to={`/details/${type}/${item.id}`} className="bg-slate-800 rounded-xl overflow-hidden hover:scale-105 transition shadow-lg block">
                        <img
                            src={buildUrlImage(item.poster_path)}
                            alt={item.title || item.name}
                            className="w-full h-72 object-cover"
                        />

                        <div className="p-3">
                            <h3 className="font-semibold truncate">{item.title || item.name}</h3>
                            <p className="text-sm text-slate-400">⭐ {item.vote_average?.toFixed(1) || "N/A"}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
