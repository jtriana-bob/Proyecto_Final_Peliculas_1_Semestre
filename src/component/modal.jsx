import React from "react";
import { buildUrlImage } from "../utilitary/buildUrlImage.js";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";

export default function Modal({ isOpen, onClose, data }) {
    if (!isOpen || !data) return null;

    const mediaType = data.title ? "movie" : "tv";

    const qrdata = JSON.stringify({
        type: mediaType,
        id: data.id,
        title: data.title || data.name,
        overview: data.overview,
        rating: data.vote_average.toFixed(2),
        date: data.release_date || data.first_air_date,
        poster: `https://image.tmdb.org/t/p/w300${data.poster_path}`,
    });

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md sm:max-w-lg bg-amber-50 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in"
            >
                <div className="flex justify-between items-start p-4 border-b border-black/10">
                    <h1 className="text-lg sm:text-2xl font-bold text-black pr-4">
                        {data.title || data.name}
                    </h1>
                    <button
                        onClick={onClose}
                        className="text-red-500 text-xl font-bold hover:scale-110 transition"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-4 sm:p-6 flex flex-col items-center gap-4 max-h-[75vh] overflow-y-auto">
                    <img
                        src={buildUrlImage(data.poster_path)}
                        alt={data.title || data.name}
                        className="w-35 sm:w-45 rounded-xl shadow-md"
                    />

                    <p className="text-sm sm:text-base text-gray-700 text-center">
                        Escanea el QR para obtener más información
                    </p>

                    <div className="bg-white p-3 rounded-xl shadow">
                        <QRCode value={qrdata} size={200} />
                    </div>

                    <Link className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                        to={`/details/${mediaType}/${data.id}`}
                        onClick={onClose}
                    >
                        Ver detalles
                    </Link>
                </div>
            </div>
        </div>
    );
}
