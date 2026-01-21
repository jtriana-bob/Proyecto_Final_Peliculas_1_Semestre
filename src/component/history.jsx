import React, { useEffect, useState } from 'react';
import supabase from "../utilitary/supabase.js";
import {Link} from "react-router";

export default function History() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDataSupabase = async () => {
        const { data, error } = await supabase
            .from("peliculas")
            .select("*")
            .order("escaneos", { ascending: false });

        if (error) console.error(error);
        else setList(data);
        setLoading(false);
    };

    useEffect( () => {
        const fetchData = async () => {
           await fetchDataSupabase();
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-3xl font-semibold">
                Cargando...
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">
            <h1 className="text-center text-3xl font-bold mb-8">🎬 Historial de películas escaneadas</h1>

            {list.length === 0 && (
                <p className="text-center text-gray-500">No hay registros</p>
            )}

            <div className="bg-slate-800 rounded-xl shadow-lg overflow-hidden" >
                <div className="grid grid-cols-4 text-slate-300 font-semibold bg-slate-900 px-6 py-3">
                    <span>Película</span>
                    <span>ID</span>
                    <span>Escaneos</span>
                    <span>Tipo</span>
                </div>

                {list.map((data) => (
                    <Link to={`/details/${data.type}/${data.id}`} key={data.id}>
                        <div key={data.id} className="grid grid-cols-4 px-6 py-4 border-t border-slate-700 text-white hover:bg-slate-700 transition">
                            <span className="font-medium">{data.nombre}</span>
                            <span className="text-slate-400">{data.id}</span>
                            <span className="text-emerald-400 font-semibold">{data.escaneos}</span>
                            <span className="text-slate-400">{data.type}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
