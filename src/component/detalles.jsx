import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiMovie } from "../services/api-movie.js";
import { buildUrlImage } from "../utilitary/buildUrlImage.js";

export default function Detalles() {
    const { type, id } = useParams();
    const [detalles, setDetalles] = useState(null);
    const [video, setVideo] = useState(null);
    const [error, setError] = useState(null);

    const fetchDetalle = async () => {
        try {
            const response = await ApiMovie.getDetails(type, id);
            setDetalles(response);
        } catch {
            setError("No se pudieron cargar los detalles");
        }
    };

    const fetchVideo = async () => {
        try {
            const response = await ApiMovie.getVideo(id, type);
            const trailer = response.results?.find(
                (v) => v.site === "YouTube" && v.type === "Trailer"
            );
            setVideo(trailer);
        } catch {}
    };

    useEffect(() => {
        fetchDetalle();
        fetchVideo();
    }, [type, id]);

    if (error)
        return <div className="text-red-500 text-center mt-12 text-xl">{error}</div>;

    if (!detalles)
        return <div className="text-center mt-12 text-xl">Cargando...</div>;

    return (
        <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-6 lg:p-10">
            <div className="max-w-7xl mx-auto bg-slate-900/40 border border-white/10 rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8">

                    <div className="h-auto lg:h-[700px] flex justify-center">
                        <img
                            src={buildUrlImage(detalles.poster_path)}
                            alt={detalles.title || detalles.name}
                            className="w-full max-w-[420px] max-h-[500px] lg:max-h-full object-cover rounded-2xl shadow-xl"
                            onError={(e) => (e.target.src = "/no-image.png")}
                        />
                    </div>

                    <div className="flex flex-col h-auto lg:h-[700px]">

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                            {detalles.title || detalles.name}
                        </h1>

                        {type === "movie" && detalles.original_title && (
                            <p className="text-lg sm:text-xl lg:text-2xl text-slate-400 italic mt-1">
                                {detalles.original_title}
                            </p>
                        )}

                        <div className="flex flex-wrap gap-4 text-base sm:text-lg lg:text-xl text-slate-300 mt-3">
                            <span>📅 {detalles.release_date || detalles.first_air_date}</span>
                            <span>⭐ {detalles.vote_average?.toFixed(1)}</span>
                            <span>🎬 {type === "movie" ? "Película" : "Serie"}</span>
                        </div>

                        {detalles.budget > 0 && (
                            <p className="text-base sm:text-lg lg:text-xl text-emerald-400 mt-2">
                                💰 ${detalles.budget.toLocaleString()}
                            </p>
                        )}

                        <div className="mt-4">
                            <h3 className="text-xl sm:text-2xl font-semibold mb-2">🏷️ Géneros</h3>
                            <div className="flex flex-wrap gap-2">
                                {detalles.genres.map((g) => (
                                    <span key={g.id} className="bg-slate-800 px-3 py-1 rounded-full text-sm sm:text-base">
                                        {g.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {detalles.production_companies?.length > 0 && (
                            <div className="mt-4">
                                <h3 className="text-xl sm:text-2xl font-semibold mb-2">🎬 Productoras</h3>
                                <div className="flex flex-wrap gap-2">
                                    {detalles.production_companies.slice(0, 5).map((p) => (
                                        <span key={p.id} className="bg-slate-800 px-3 py-1 rounded-full text-sm sm:text-base">
                                            {p.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="mt-2 rounded-xl border border-white/10 bg-slate-950/60max-h-[180px] sm:max-h-[240px] lg:max-h-[320px] overflow-y-auto p-4 text-sm sm:text-base leading-relaxed text-slate-200 scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-transparent">
                            {detalles.overview || "No hay descripción disponible."}
                        </div>
                    </div>
                </div>

                {video && (
                    <div className="mt-10">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                            🎬 Tráiler oficial
                        </h2>
                        <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
                            <iframe
                                src={`https://www.youtube.com/embed/${video.key}?autoplay=1&mute=1&controls=1&rel=0`}
                                allow="autoplay; encrypted-media; picture-in-picture"
                                allowFullScreen
                                className="w-full aspect-video"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
