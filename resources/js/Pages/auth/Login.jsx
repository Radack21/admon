import { useState } from "react";
import UserInput from "../../components/InputLogin";

export default function Login() {
    const [user, setUser] = useState("");

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('/images/backgrounds/login.jpg')" }}
        >
            <div className="w-full max-w-3xl p-8 rounded-lg shadow-md flex flex-col items-center">
                {/* Icono */}
                <div className="w-[170px] mb-6 rounded-full border-white border-2 h-[170px]">
                    <img
                        src="images/logos/logo.png"
                        alt="Logo"
                        className="w-full h-full object-cover rounded-full p-2"
                    />
                </div>
                {/* Formulario */}
                <form className="w-full max-w-md">
                    <div className="flex gap-4 w-full">
                        <UserInput
                            label="Usuario"
                            type="text"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        />
                        <UserInput
                            label="Contraseña"
                            type="password"
                            value={""}
                            onChange={(e) => {}}
                        />
                    </div>
                    <div className="flex justify-center mt-6">
                        <button className="w-1/2 uppercase bg-brand-gradient text-white py-2 px-4 rounded-lg hover:bg-indigo-700">
                            Ingresar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
