import { useState } from "react";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,} from "firebase/auth";
import { useLocation } from "react-router-dom";
import { auth } from "../services/firebase.js";

export default function Login() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const location = useLocation();
    const message = location.state?.message;
    const googleProvider = new GoogleAuthProvider();

    const login = async () => {
        if (!loginEmail || !loginPassword) {
            alert("Completa todos los campos");
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            alert("Se inicio seccion correctamente. ✅");
        } catch (err) {
            console.log(err);
            alert(err.code);
        }
    };

    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            alert("Se inicio seccion correctamente. ✅");
        } catch (err) {
            console.log(err);
            alert(err.code);
        }
    };

    const register = async () => {
        if (!registerEmail || !registerPassword) {
            alert("Completa todos los campos");
            return;
        }
        try {
            await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
            alert("Cuenta creada correctamente ✅");
            setRegisterEmail("");
            setRegisterPassword("");
        } catch (err) {
            console.log(err);
            alert(err.code);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
            <div className="w-full max-w-md bg-slate-900/80 backdrop-blur border border-white/10 rounded-2xl shadow-2xl p-8 space-y-6">
                {message && (
                    <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 px-4 py-3 text-sm text-center">
                        {message}
                    </div>
                )}

                <div className="text-center space-y-1">
                    <h2 className="text-2xl font-bold text-indigo-400">Bienvenido 👋</h2>
                    <p className="text-sm text-slate-400">Inicia sesión para ver el historial</p>
                </div>

                <div className="space-y-4">
                    <input className="w-full bg-slate-800 text-white rounded-lg px-4 py-3"
                        type="email"
                        placeholder="Correo electrónico"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                    />

                    <input className="w-full bg-slate-800 text-white rounded-lg px-4 py-3"
                        type="password"
                        placeholder="Contraseña"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                    />
                </div>

                <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg"
                    onClick={login}
                >
                    Iniciar sesión
                </button>

                <button className="w-full bg-white text-black py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition"
                    onClick={loginWithGoogle}
                >
                    <img className="w-5 h-5"
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        alt="Google"
                    />
                    Continuar con Google
                </button>

                <div className="text-center pt-4">
                    <h2 className="text-lg font-bold text-indigo-400">Crear cuenta</h2>
                </div>

                <div className="space-y-4">
                    <input className="w-full bg-slate-800 text-white rounded-lg px-4 py-3"
                        type="email"
                        placeholder="Correo electrónico"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                    />

                    <input className="w-full bg-slate-800 text-white rounded-lg px-4 py-3"
                        type="password"
                        placeholder="Contraseña"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                    />
                </div>

                <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-lg"
                    onClick={register}
                >
                    Crear cuenta
                </button>
            </div>
        </div>
    );
}
