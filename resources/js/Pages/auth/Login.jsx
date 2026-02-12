import { useState } from "react";
import InputIcon from "../../components/InputLogin";
import { User, Lock } from "lucide-react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
            <div className="relative z-10 flex flex-col items-center w-full max-w-4xl px-6 sm:px-4">
                <div className="mb-8 sm:mb-10 w-20 h-20 sm:w-28 sm:h-28 rounded-full border-2 border-white/40 bg-white flex items-center justify-center overflow-hidden shadow-lg">
                    <img
                        src="/images/logos/logoIntro.png"
                        alt="BriefData Logo"
                        className="w-14 h-14 sm:w-28 sm:h-28 object-contain"
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mb-2">
                        <div className="flex items-center gap-3 border-2 border-white/60 rounded-full px-5 py-3 flex-1 bg-transparent">
                            <User className="w-5 h-5 text-white shrink-0" />
                            <div className="w-px h-6 bg-white/60"></div>
                            <input
                                type="email"
                                placeholder="Usuario"
                                name="email"
                                className="bg-transparent outline-none text-white placeholder:text-white/70 w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="on"
                            />
                        </div>
                        <div className="flex items-center gap-3 border-2 border-white/60 rounded-full px-5 py-3 flex-1 bg-transparent">
                            <Lock className="w-5 h-5 text-white shrink-0" />
                            <div className="w-px h-6 bg-white/60"></div>
                            <input
                                type="password"
                                placeholder="Contraseña"
                                name="password"
                                autoComplete="on"
                                className="bg-transparent outline-none text-white placeholder:text-white/70 w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                </form>
                <div className="w-full max-w-2xl flex justify-end mb-6">
                    <button className="text-sm text-white/70 underline underline-offset-2 hover:text-white transition-colors">
                        Recuperar Contraseña
                    </button>
                </div>
                <button className="bg-linear-to-r from-[hsl(32,90%,65%)] to-[hsl(25,85%,58%)] text-primary-foreground font-semibold uppercase tracking-widest px-12 sm:px-16 py-3 rounded-full hover:opacity-90 transition-opacity text-sm w-full sm:w-auto max-w-xs cursor-pointer">
                    Ingresar
                </button>
            </div>
            <footer className="absolute bottom-6 z-10 flex flex-col items-center gap-2 text-white text-xs">
                <div className="flex items-center gap-2">
                    <img
                        src="/images/logos/brief.png"
                        alt="BriefData"
                        className="w-40"
                    />
                    {/* <span className="font-semibold text-white text-sm">
                        BriefData®
                    </span> */}
                </div>
                <p>
                    © Copyrigth 2024. MATEC® MATEMÁTICAS Y TECNOLOGÍA INDUSTRIAL
                    S.C.
                </p>
            </footer>
        </div>
    );
}
