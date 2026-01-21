import React, { useEffect, useState } from 'react';
import { buildUrlImage } from "../utilitary/buildUrlImage.js";
import Modal from "./modal.jsx";
import { ApiMovie } from "../services/api-movie.js";
import {Button} from "@/components/ui/button.tsx";
import {ArrowLeft, ArrowRight, LoaderIcon} from "lucide-react";

export default function Series() {
    const [series, setSeries] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        page: 1,
        total_pages: 10
    })

    const fetchPopularSeries = async () => {
        setLoading(true);
        const response = await ApiMovie.getPopularSeries(pagination.page);
        setSeries(response.results);
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
        fetchPopularSeries();
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
            </div>
        );
    }

    return (
        <>
            <h1 className="text-center text-4xl mb-6">Listado Series populares</h1>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {series.map(serie => (
                    <div
                        key={serie.id}
                        onClick={() => {
                            setSelected(serie);
                            setIsModalOpen(true);
                        }}
                        className="bg-gray-500 cursor-pointer text-amber-50 text-xl p-3 rounded text-center"
                    >
                        <img src={buildUrlImage(serie.poster_path)} alt={serie.name} className="mx-auto" width="300"/>
                        <h2>{serie.name}</h2>
                        <p>Calificación:⭐ {serie.vote_average.toFixed(1)}</p>
                    </div>
                ))}
            </div>
            <div className="flex justify-center items-center gap-6 my-10 text_lg font-medium">
                <Button  size="lg" className="text-gray-300"
                         disabled={!canReturn()}
                         onClick={handleReturn}
                >
                    <ArrowLeft/>  Anterior
                </Button>
                <span> Pagina: {pagination.page} de {pagination.total_pages} </span>
                <Button  size="lg" className="text-gray-300"
                         disabled={!canContinue()}
                         onClick={handleNext}
                >
                    Siguiente <ArrowRight/>
                </Button>
            </div>
            <Modal isOpen={isModalOpen} data={selected} onClose={closeModal}/>
        </>
    );
}
