import { useEffect, useState } from 'react'
import { ApiMovie } from "../services/api-movie.js";
import { buildUrlImage } from "../utilitary/buildUrlImage.js";
import Modal from "../component/modal.jsx";
import PlayingNowSwiper from "./playingNowSwiper.jsx";
import {Button} from "@/components/ui/button.tsx";
import {ArrowLeft, ArrowRight} from "lucide-react";
import { LoaderIcon } from "lucide-react"

export default function Movies() {
    const [movies, setMovies] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        page: 1,
        total_pages: 10
    })

    const fetchPopularMovies = async () => {
        setLoading(true);
        const response = await ApiMovie.getPopularMovies(pagination.page);
        setPagination({
            page: response.page,
            total_pages: response.total_pages,
        })
        console.log("movies", response)
        setMovies(response.results);
        setLoading(false);
    };

    const canReturn = () =>{
        return pagination.page > 1;
    }
    const handleReturn = () => {
        setPagination({
            ...pagination,
            page: pagination.page - 1
        })
    }
    const canContinue = () =>{
        return pagination.page < pagination.total_pages;
    }
    const handleNext = () => {
        setPagination({
            ...pagination,
            page: pagination.page + 1
        })
    }
    console.log(pagination);

    useEffect(() => {
        fetchPopularMovies();
    }, [pagination.page]);

    const closeModal = () => {
        setIsModalOpen(false);
        setSelected(null);
    };
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <LoaderIcon
                    className="size-16 animate-spin text-gray-400"
                    aria-label="Cargando..."
                />
                <div>CARGANDO</div>
            </div>
        );
    }

    return (
        <>
            <PlayingNowSwiper/>
            <h1 className="text-center text-4xl mb-6">Películas populares</h1>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {movies.map(movie => (
                    <div
                        key={movie.id}
                        onClick={() => {
                            setSelected(movie);
                            setIsModalOpen(true);
                        }}
                        className="bg-gray-500 cursor-pointer text-amber-50 text-xl p-3 rounded text-center"
                    >
                        <img src={buildUrlImage(movie.poster_path)} alt={movie.title} className="mx-auto" width="300"/>
                        <h2>{movie.title}</h2>
                        <p>Calificación:⭐ {movie.vote_average.toFixed(1)}</p>
                    </div>
                ))}
            </div>
            <div className="flex justify-center items-center gap-6 my-10 text_lg font-medium">
                <Button  size="lg" className="text-gray-300"
                         disabled={!canReturn() || loading}
                         onClick={handleReturn}
                >
                    <ArrowLeft/>  Anterior
                </Button>
                <span> Pagina: {pagination.page} de {pagination.total_pages} </span>
                <Button  size="lg" className="text-gray-300"
                         disabled={!canContinue() || loading}
                         onClick={handleNext}
                >
                    Siguiente <ArrowRight/>
                </Button>
            </div>
            <Modal isOpen={isModalOpen} data={selected} onClose={closeModal}/>
        </>
    );
}
