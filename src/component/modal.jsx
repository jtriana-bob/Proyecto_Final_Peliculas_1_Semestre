import React from 'react';
import {buildUrlImage} from "../utilitary/buildUrlImage.js";
import QRCode from "react-qr-code";

export default function Modal({ isOpen, onClose, data }) {
    if (!isOpen || !data) return null;
    console.log(data)
    const qrdata = JSON.stringify({
        type: data.title ? "movie" : "tv",
        id: data.id,
        title: data.title || data.name,
        overview: data.overview,
        rating: data.vote_average.toFixed(2),
        date: data.release_date || data.first_air_date,
        poster: `https://image.tmdb.org/t/p/w300${data.poster_path}`
    });

    return (
        <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-amber-50 rounded-2xl p-6 min-w-[500px]">
                <div className="flex flex-col justify-between items-center m-4">
                    <h1 className="text-3xl font-bold text-black m-2">{data.title || data.name}</h1>
                    <img
                        src={buildUrlImage(data.poster_path)}
                        alt={data.title || data.name}
                        className="mx-auto"
                        width="200"
                    />
                    <h2 className="text-xl font-bold text-black m-2">Escanea el QR para obtener mas informacion</h2>
                    <div className="flex justify-center bg-white p-3 rounded m-2">
                        <QRCode value={qrdata} size={160} />
                    </div>
                    <button onClick={onClose} className="text-red-500 font-bold text-lg m-2">✕</button>
                </div>
            </div>
        </div>
    );
}
