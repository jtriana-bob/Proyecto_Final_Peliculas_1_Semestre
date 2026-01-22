import { useEffect, useState } from "react";
import { ApiMovie } from "../services/api-movie.js";
import { buildUrlImage } from "../utilitary/buildUrlImage.js";
import Modal from "../component/modal.jsx";
import PlayingNowSwiper from "./playingNowSwiper.jsx";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeft, ArrowRight, LoaderIcon } from "lucide-react";

export default function Movies() {
    const [movies, setMovies] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        page: 1,
        total_pages: 10,
    });

    const fetchPopularMovies = async () => {
        setLoading(true);
        const response = await ApiMovie.getPopularMovies(pagination.page);
        setPagination({
            page: response.page,
            total_pages: response.total_pages,
        });
        setMovies(response.results);
        setLoading(false);
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
        fetchPopularMovies();
    }, [pagination.page]);

    const closeModal = () => {
        setIsModalOpen(false);
        setSelected(null);
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4 text-slate-400">
                <LoaderIcon className="size-16 animate-spin" />
                <span className="text-lg tracking-wide">Cargando películas...</span>
            </div>
        );
    }

    return (
        <>
            <PlayingNowSwiper />

            <h1 className="text-center text-3xl sm:text-4xl font-bold mb-8">
                🎬 Películas populares
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 px-2">
                {movies.map((movie) => (
                    <div
                        key={movie.id}
                        onClick={() => {
                            setSelected(movie);
                            setIsModalOpen(true);
                        }}
                        className="group relative cursor-pointer rounded-xl overflow-hidden
                       bg-slate-800/60 border border-white/10
                       hover:scale-[1.03] hover:shadow-2xl hover:border-indigo-400/40
                       transition-all duration-300"
                    >
                        <div className="aspect-[2/3] w-full overflow-hidden">
                            <img
                                src={buildUrlImage(movie.poster_path)}
                                alt={movie.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                loading="lazy"
                            />
                        </div>

                        <div className="p-3 space-y-1">
                            <h2 className="text-sm sm:text-base font-semibold line-clamp-2">
                                {movie.title}
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300">
                                ⭐ {movie.vote_average.toFixed(1)}
                            </p>
                        </div>

                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition pointer-events-none" />
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4 my-12 text-sm sm:text-base text-slate-300">
                <Button
                    size="lg"
                    className="text-gray-300"
                    disabled={!canReturn() || loading}
                    onClick={handleReturn}
                >
                    <ArrowLeft className="mr-1" /> Anterior
                </Button>

                <span className="px-4 py-2 rounded-full bg-slate-800/60 border border-white/10">
          Página {pagination.page} de {pagination.total_pages}
        </span>

                <Button
                    size="lg"
                    className="text-gray-300"
                    disabled={!canContinue() || loading}
                    onClick={handleNext}
                >
                    Siguiente <ArrowRight className="ml-1" />
                </Button>
            </div>

            <Modal isOpen={isModalOpen} data={selected} onClose={closeModal} />
        </>
    );
}
