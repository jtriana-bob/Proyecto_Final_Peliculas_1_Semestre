import React, { useEffect, useState } from "react";
import { buildUrlImage } from "../utilitary/buildUrlImage.js";
import Modal from "./modal.jsx";
import { ApiMovie } from "../services/api-movie.js";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeft, ArrowRight, LoaderIcon } from "lucide-react";

export default function Series() {
    const [series, setSeries] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        page: 1,
        total_pages: 10,
    });

    const fetchPopularSeries = async () => {
        try {
            setLoading(true);
            const response = await ApiMovie.getPopularSeries(pagination.page);
            setSeries(response.results);
            setPagination({
                page: response.page,
                total_pages: response.total_pages,
            });
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const canReturn = () => pagination.page > 1;
    const canContinue = () => pagination.page < pagination.total_pages;

    const handleReturn = () => {
        setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
    };

    const handleNext = () => {
        setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
    };

    useEffect(() => {
        fetchPopularSeries();
    }, [pagination.page]);

    const closeModal = () => {
        setIsModalOpen(false);
        setSelected(null);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <LoaderIcon className="size-16 animate-spin text-slate-400" />
            </div>
        );
    }

    return (
        <section className="px-4 sm:px-8 py-10">
            <h1 className="text-center text-3xl sm:text-4xl font-bold mb-10 text-white">
                📺 Series populares
            </h1>

            {/* Grid */}
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {series.map((serie) => (
                    <div className="group h-[360px] sm:h-[420px] flex flex-col cursor-pointer rounded-xl overflow-hidden bg-slate-800/60 border border-white/10 hover:scale-[1.04] hover:border-indigo-400/40 hover:shadow-xl transition-all duration-300"
                        key={serie.id}
                        onClick={() => {
                            setSelected(serie);
                            setIsModalOpen(true);
                        }}
                    >
                        <div className="aspect-[2/3] w-full overflow-hidden">
                            <img
                                src={buildUrlImage(serie.poster_path)}
                                alt={serie.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                loading="lazy"
                            />
                        </div>

                        <div className="p-2 sm:p-3 h-[80px] sm:h-[96px] flex flex-col justify-between">
                            <h2 className="text-sm sm:text-base font-semibold line-clamp-2 text-white leading-snug">
                                {serie.name}
                            </h2>

                            <p className="text-[11px] sm:text-sm text-slate-300">
                                ⭐ {serie.vote_average.toFixed(1)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 my-12 text-lg text-slate-300">
                <Button size="lg" disabled={!canReturn()} onClick={handleReturn}>
                    <ArrowLeft className="mr-2" /> Anterior
                </Button>
                <span>
                    Página {pagination.page} de {pagination.total_pages}
                </span>
                <Button size="lg" disabled={!canContinue()} onClick={handleNext}>
                    Siguiente <ArrowRight className="ml-2" />
                </Button>
            </div>
            <Modal isOpen={isModalOpen} data={selected} onClose={closeModal} />
        </section>
    );
}
