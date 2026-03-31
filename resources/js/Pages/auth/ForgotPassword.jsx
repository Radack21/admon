import ParticleBackground from "../../Components/ParticleBackground";
import { User } from "lucide-react";
import { useForm, Link } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/forgot-password");
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-x-hidden overflow-y-auto bg-black text-white selection:bg-orange-500 selection:text-white">
            {/* Gradiente de fondo (gradientPulse animation) */}
            <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.3)_0%,rgba(249,115,22,0.2)_30%,transparent_70%)] z-0 animate-[gradientPulse_8s_ease-in-out_infinite]"></div>

            {/* Canvas para partículas */}
            <ParticleBackground />

            <div className="relative z-10 w-full max-w-225 px-4 sm:px-5 flex flex-col items-center flex-1 min-h-screen">
                <main className="flex-1 w-full flex flex-col items-center justify-center pt-6 pb-4 sm:pt-10 lg:py-10">
                    {/* Logo Section */}
                    <div className="w-[30vw] h-[30vw] mb-6 sm:w-28.25 sm:h-28.25 sm:mb-9 lg:w-40 lg:h-40 flex items-center justify-center">
                        <div className="w-[30vw] h-[30vw] rounded-full bg-white flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.3)] outline-2 outline-white/70 outline-offset-[5px] sm:w-28.25 sm:h-28.25 lg:w-35 lg:h-35 lg:outline-[3px]">
                            <div className="w-[calc(30vw*0.857)] h-[calc(30vw*0.857)] rounded-full bg-white flex items-center justify-center sm:w-24.25 sm:h-24.25 lg:w-30 lg:h-30">
                                <img
                                    src="/images/logos/logoIntro.png"
                                    alt="BriefData Logo"
                                    className="w-full h-full object-contain p-2"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Forgot Password Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="w-full flex flex-col items-center gap-4 lg:gap-6"
                    >
                        <div className="text-center mb-2 px-4 max-w-sm">
                            <h2 className="text-xl sm:text-2xl font-bold mb-2">
                                Recuperar Contraseña
                            </h2>
                            <p className="text-white/70 text-sm sm:text-base">
                                Ingresa tu usuario (correo electrónico) y te
                                enviaremos un enlace para restablecerla.
                            </p>
                        </div>

                        {status && (
                            <div className="mb-4 font-medium text-sm text-green-500 max-w-sm text-center">
                                {status}
                            </div>
                        )}

                        <div className="flex flex-col items-center gap-3.5 w-[80%] sm:gap-4 sm:max-w-120 sm:w-full lg:flex-row lg:gap-5 lg:max-w-150 lg:justify-center">
                            {/* Email / Usuario Input */}
                            <div className="w-full relative">
                                <div className="flex items-center gap-2 px-4 py-[6.7px] border-2 border-white/70 rounded-[50px] transition-all focus-within:border-white/50 focus-within:bg-white/2 sm:py-[9.2px] sm:px-[15.8px] sm:gap-1.75 lg:border-[3px] lg:py-3.5 lg:px-6 lg:gap-3">
                                    <User className="w-4.5 h-4.5 text-white/60 shrink-0 sm:w-[15.8px] sm:h-[15.8px] lg:w-6 lg:h-6" />
                                    <div className="w-0.5 h-5.5 bg-white/50 shrink-0"></div>
                                    <input
                                        type="email"
                                        placeholder="Usuario (Correo electrónico)"
                                        required
                                        autoComplete="email"
                                        className="flex-1 min-w-0 bg-transparent border-none outline-none text-white text-[9.8px] sm:text-[10.5px] lg:text-base placeholder:text-white/40"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                </div>
                                {errors.email && (
                                    <div className="absolute -bottom-5 left-4 text-red-500 text-[10px] sm:text-xs">
                                        {errors.email}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Back to password */}
                        <div className="w-[80%] text-right -mt-1 sm:max-w-120 sm:w-full lg:max-w-150 relative">
                            <Link
                                href="/login"
                                className="text-white/60 underline text-[8.4px] transition-colors hover:text-orange-500 sm:text-[9.2px] lg:text-sm"
                            >
                                Regresar al Login
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className={`w-1/2 max-w-[50%] py-[7.3px] px-5 bg-linear-to-r from-orange-500 to-[#b83030] border-none rounded-[50px] text-white/85 text-[9.8px] font-semibold uppercase tracking-[0.5px] cursor-pointer transition-all shadow-[0_4px_20px_rgba(249,115,22,0.2)] mt-2 hover:from-orange-500 hover:to-red-500 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(249,115,22,0.5)] hover:text-white active:translate-y-0 ${processing ? "opacity-50 cursor-not-allowed" : ""} sm:w-full sm:max-w-[150px] sm:py-[9.2px] sm:px-[21px] sm:text-[10.5px] lg:max-w-[220px] lg:py-3.5 lg:px-8 lg:text-base lg:mt-4`}
                        >
                            {processing ? "ENVIANDO..." : "ENVIAR ENLACE"}
                        </button>
                    </form>
                </main>

                {/* Footer Section */}
                <footer className="relative z-10 text-center py-6 px-4 pb-5 w-full mt-auto sm:py-8 sm:px-5 lg:py-8 lg:pb-7">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <img
                            src="/images/logos/brief.png"
                            alt="BriefData"
                            className="h-[3vh] max-h-7.5 min-h-4 w-auto"
                        />
                    </div>
                    <p className="text-[clamp(9px,1.8vw,12px)] text-white/50 font-normal leading-normal sm:text-[10px]">
                        © Copyright 2026
                        <br />
                        MATEMÁTICAS Y TECNOLOGÍA INDUSTRIAL S.C.
                    </p>
                </footer>
            </div>
        </div>
    );
}
