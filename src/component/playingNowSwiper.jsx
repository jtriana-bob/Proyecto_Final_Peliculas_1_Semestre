import { Swiper, SwiperSlide } from 'swiper/react';
import {Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import React, { useEffect, useState } from 'react';
import { buildUrlImage } from "../utilitary/buildUrlImage.js";
import { ApiMovie } from "../services/api-movie.js";
import Modal from "./modal.jsx";

export default function PlayingNowSwiper() {
    const [nowPlaying, setNowPlaying] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const fetchNowPlaying = async () => {
        const result = await ApiMovie.getNowPlaying();
        setNowPlaying(result.results || result);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelected(null);
    };

    useEffect(() => {
        fetchNowPlaying();
    }, []);

    return (
        <div className="px-6 py-8 bg-gradient-to-b bg-black">
            <h1 className="text-3xl font-bold text-center text-white mb-6">
                🎬 Películas en cartelera
            </h1>

            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={24}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                breakpoints={{
                    320: { slidesPerView: 1.2 },
                    640: { slidesPerView: 2.2 },
                    1024: { slidesPerView: 4 },
                }}
            >
                {nowPlaying.map(movie => (
                    <SwiperSlide key={movie.id}>
                        <div className="group relative overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
                             onClick={() => {
                                 setSelected(movie);
                                 setIsModalOpen(true);
                             }}
                        >
                            <img
                                src={buildUrlImage(movie.poster_path)}
                                alt={movie.title}
                                className="w-full h-[380px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <h2 className="text-lg font-semibold line-clamp-2">
                                    {movie.title}
                                </h2>
                                <p className="text-sm mt-1">
                                    ⭐ {movie.vote_average.toFixed(1)}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <Modal isOpen={isModalOpen} data={selected} onClose={closeModal}/>
        </div>
    );
}
