import { useState } from "react";
import InputIcon from "../../components/InputLogin";
import { User, Lock } from "lucide-react";

export default function Login() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('/images/backgrounds/login3.jpg')" }}
        >
            {/* Contenedor principal */}
            <div className="flex-9 flex flex-col items-baseline justify-center">
                <div className="mt-10">
                    {/* Logo superior */}
                    <div className="mb-10 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full border-2 border-white flex items-center justify-center">
                            <img
                                src="/images/logos/logo.png"
                                alt="Logo"
                                className="w-28 h-28 object-cover rounded-full"
                            />
                        </div>
                    </div>

                    {/* Formulario */}
                    <form className="w-full max-w-3xl">
                        {/* Inputs en fila */}
                        <div className="flex flex-col md:flex-row gap-6">
                            <InputIcon
                                icon={
                                    <User className="h-8 w-8 text-white border-2 border-white rounded-full p-1" />
                                }
                                type="text"
                                placeholder="Usuario"
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                            />

                            <InputIcon
                                icon={
                                    <Lock className="h-8 w-8 text-white border-2 border-white rounded-full p-1" />
                                }
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Recuperar contraseña */}
                        <div className="flex justify-end mt-3">
                            <a
                                href="#"
                                className="text-white text-sm underline hover:opacity-80"
                            >
                                Recuperar contraseña
                            </a>
                        </div>

                        {/* Botón */}
                        <div className="flex justify-center mt-8">
                            <button
                                type="submit"
                                className="px-10 py-2 rounded-full uppercase font-semibold
                                       bg-brand-gradient text-white
                                       hover:opacity-90 transition"
                            >
                                Ingresar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {/* Footer */}
            <div className="flex-1 flex items-center">
                <footer className="flex flex-col items-center text-center">
                    <img
                        src="/images/logos/brief.png"
                        alt="BriefData"
                        className="w-52 mb-3"
                    />
                    <p className="text-white text-xs opacity-80">
                        © Copyright 2024. MATEC® Matemáticas y Tecnología
                        Industrial S.C.
                    </p>
                </footer>
            </div>
        </div>
    );
}
