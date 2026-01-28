import React, { useEffect, useState } from "react";
import supabase from "../utilitary/supabase.js";
import { Link, useNavigate } from "react-router-dom";
import { LoaderIcon, Film, Tv } from "lucide-react";
import { useAuth } from "../context/AuthContext";


export default function History() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authLoading && !user) {
            navigate("/login", {
                state: { message: "Debes iniciar sesión para ver tu historial." }
            });
        }
    }, [user, authLoading, navigate]);

    const fetchDataSupabase = async () => {
        if (!user) return;

        const { data, error } = await supabase
            .from("peliculas")
            .select("*")
            .order("escaneos", { ascending: false });

        if (error) console.error(error);
        else setList(data);

        setLoading(false);
    };

    useEffect(() => {
        const fetchData = async() => {
            if (user) await fetchDataSupabase();
        }

        fetchData();

    }, [user]);

    if (authLoading || loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <LoaderIcon className="size-14 animate-spin text-slate-400" />
            </div>
        );
    }

    return (
        <section className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
            <h1 className="text-center text-3xl sm:text-4xl font-bold mb-10 text-white">
                📜 Historial de escaneos
            </h1>

            {list.length === 0 && (
                <p className="text-center text-slate-400">No hay registros todavía</p>
            )}

            <div className="hidden md:block bg-slate-900/60 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                <div className="grid grid-cols-4 text-slate-300 font-semibold bg-slate-950 px-6 py-4 text-sm uppercase tracking-wide">
                    <span>Película</span>
                    <span>ID</span>
                    <span>Escaneos</span>
                    <span>Tipo</span>
                </div>

                {list.map((data) => (
                    <Link
                        to={`/details/${data.type}/${data.id}`}
                        key={data.id}
                        className="block"
                    >
                        <div className="grid grid-cols-4 px-6 py-4 border-t border-white/10 text-white hover:bg-slate-800/60 transition-all duration-200">
                            <span className="font-medium truncate">{data.nombre}</span>
                            <span className="text-slate-400">{data.id}</span>
                            <span className="text-emerald-400 font-semibold">{data.escaneos}</span>
                            <span className="flex items-center gap-2 text-slate-300">
                                {data.type === "movie" ? (
                                    <>
                                        <Film size={16} /> Película
                                    </>
                                ) : (
                                    <>
                                        <Tv size={16} /> Serie
                                    </>
                                )}
                                </span>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="md:hidden space-y-4">
                {list.map((data) => (
                    <Link
                        to={`/details/${data.type}/${data.id}`}
                        key={data.id}
                        className="block"
                    >
                        <div
                            className="bg-slate-900/60 border border-white/10 rounded-xl p-4
                         hover:bg-slate-800/60 transition-all duration-200"
                        >
                            <div className="flex justify-between items-start gap-3">
                                <h2 className="font-semibold text-white line-clamp-2">
                                    {data.nombre}
                                </h2>
                                <span className="text-emerald-400 font-bold text-sm">
                                    {data.escaneos}
                                </span>
                            </div>

                            <div className="mt-2 flex justify-between items-center text-sm text-slate-400">
                                <span>ID: {data.id}</span>

                                <span className="flex items-center gap-1">
                                      {data.type === "movie" ? (
                                          <>
                                              <Film size={14} /> Película
                                          </>
                                      ) : (
                                          <>
                                              <Tv size={14} /> Serie
                                          </>
                                      )}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
