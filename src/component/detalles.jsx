import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { ApiMovie } from "../services/api-movie.js";
import { buildUrlImage } from "../utilitary/buildUrlImage.js";

export default function Detalles() {
    const { type, id } = useParams();
    const [detalles, setDetalles] = useState(null);
    const [error, setError] = useState(null);

    const fetchDetalle = async () => {
        try {
            const response = await ApiMovie.getDetails(type, id);
            setDetalles(response);
            console.log(response);
        } catch (e) {
            console.error("Error cargando detalles:", e);
            setError("No se pudieron cargar los detalles");
        }
    };

    useEffect(() => {
        fetchDetalle();
    }, [type, id]);

    if (error) return <div className="text-red-500 text-center mt-12 text-2xl">{error}</div>;
    if (!detalles) return <div className="text-center mt-12 text-2xl">Cargando...</div>;

    return (
        <div className="min-h-screen bg-slate-900 text-white p-8">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

                <div>
                    <img
                        src={buildUrlImage(detalles.poster_path)}
                        alt={detalles.title || detalles.name}
                        className="rounded-2xl shadow-xl w-full"
                        onError={(e) => e.target.src = "/no-image.png"}
                    />
                </div>
                <div className="w-full">
                    <h1 className="text-5xl font-extrabold leading-tight">{detalles.title || detalles.name}</h1>

                    {type === "movie" ? (
                        detalles.original_title && (
                            <p className="text-2xl text-slate-400 italic">
                                {detalles.original_title}
                            </p>
                        )
                    ) : (
                        <div className="text-2xl text-slate-400 space-y-1">
                            <p>📺 Temporadas: {detalles.number_of_seasons}</p>
                            <p>🎞️ Episodios: {detalles.number_of_episodes}</p>
                            <p>{detalles.in_production}</p>
                        </div>
                    )}

                    <div className="flex flex-wrap m-4 gap-6 text-xl text-slate-300">
                        <span>📅 {detalles.release_date || detalles.first_air_date || "N/A"}</span>
                        <span>⭐ {detalles.vote_average?.toFixed(1)}</span>
                        <span>🎬 {type === "movie" ? "Película" : "Serie"}</span>
                    </div>

                    {detalles.budget > 0 && (
                        <p className="text-2xl text-emerald-400">
                            💰 Presupuesto: ${detalles.budget.toLocaleString()}
                        </p>
                    )}

                    <div className="m-4">
                        <h3 className="text-2xl font-semibold mb-3">🏷️ Géneros</h3>
                        <div className="flex flex-wrap gap-3">
                            {detalles.genres.map(genre => (
                                <span key={genre.id} className="bg-slate-800 px-4 py-2 rounded-full text-lg text-slate-200 shadow">
                                    {genre.name}
                                    </span>
                            ))}
                        </div>
                    </div>


                    {detalles.production_companies?.length > 0 && (
                        <div className="m-4">
                            <h3 className="text-2xl font-semibold mb-3">🎬 Productoras</h3>
                            <div className="flex flex-wrap gap-3">
                                {detalles.production_companies.map(c => (
                                    <span key={c.id} className="bg-slate-800 px-4 py-2 rounded-full text-lg text-slate-200 shadow">
                                    {c.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="flex flex-wrap m-4 gap-6 text-xl text-slate-300">
                        <h2 className="text-3xl font-semibold">Resumen</h2>
                        <p className="text-xl text-slate-200 leading-relaxed">
                            {detalles.overview || "No hay descripción disponible."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
