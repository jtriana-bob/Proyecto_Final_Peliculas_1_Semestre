import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import React, { useEffect, useRef, useState } from "react";
import { buildUrlImage } from "../utilitary/buildUrlImage.js";
import { ApiMovie } from "../services/api-movie.js";
import Modal from "./modal.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {swiperConfig} from "../constants/swiperConfig.js";

export default function PlayingNowSwiper() {
    const [nowPlaying, setNowPlaying] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const swiperRef = useRef(null);

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
        <section className="relative px-3 sm:px-8 py-8 sm:py-10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <h1 className="text-xl sm:text-3xl font-bold text-center text-white mb-6 sm:mb-8">
                🎬 Películas en cartelera
            </h1>

            {/* Flechas */}
            <button
                className="swiper-prev absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20
                   bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition"
            >
                <ChevronLeft size={26} />
            </button>

            <button
                className="swiper-next absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20
                   bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition"
            >
                <ChevronRight size={26} />
            </button>

            <Swiper
                {...swiperConfig}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
                onMouseLeave={() => swiperRef.current?.autoplay?.start()}
                className="!overflow-visible"
            >

            {nowPlaying.map((movie) => (
                    <SwiperSlide key={movie.id} className="flex justify-center">
                        <div
                            onClick={() => {
                                setSelected(movie);
                                setIsModalOpen(true);
                            }}
                            className="group w-[200px] sm:w-[230px] h-[340px] sm:h-[400px]
                         flex flex-col cursor-pointer rounded-xl overflow-hidden
                         bg-slate-800/60 border border-white/10
                         transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-indigo-400/40"
                        >
                            <div className="aspect-[2/3] w-full overflow-hidden">
                                <img
                                    src={buildUrlImage(movie.poster_path)}
                                    alt={movie.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    loading="lazy"
                                />
                            </div>

                            <div className="p-2 sm:p-3 h-[80px] sm:h-[96px] flex flex-col justify-between">
                                <h2 className="text-sm sm:text-base font-semibold line-clamp-2 text-white leading-snug">
                                    {movie.title}
                                </h2>

                                <p className="text-[11px] sm:text-sm text-slate-300">
                                    ⭐ {movie.vote_average.toFixed(1)}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <Modal isOpen={isModalOpen} data={selected} onClose={closeModal} />
        </section>
    );
}
