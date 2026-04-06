import { useState, useEffect, useRef } from "react";
import { Link } from "@inertiajs/react";

export default function Logo() {
    const contentRef = useRef(null);
    const [widgetWidth, setWidgetWidth] = useState(58);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            // Solo medimos y expandimos si es Desktop/Tablet (> 640px)
            if (window.innerWidth > 640) {
                const timer = setTimeout(() => {
                    if (contentRef.current) {
                        const exactWidth = contentRef.current.scrollWidth;
                        setWidgetWidth(300);
                        setIsExpanded(true);
                    }
                }, 350);
                return () => clearTimeout(timer);
            } else {
                // En móvil forzamos el estado colapsado
                setWidgetWidth(58);
                setIsExpanded(false);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Link
            href={route("home")}
            style={{
                width: window.innerWidth > 640 ? `${widgetWidth}px` : "54px",
            }}
            className="
                fixed top-5 left-5 z-[100] 
                flex items-center
                /* Transición fluida de todas las propiedades */
                transition-all duration-[550ms] ease-[cubic-bezier(0.4,0,0.2,1)]
                
                /* Estilos Desktop (>640px) */
                sm:bg-white/5 sm:backdrop-blur-[20px] 
                sm:border sm:border-white/15 rounded-full 
                sm:shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]
                
                /* Estilos Móvil (<640px) - Forzado a Círculo */
                max-sm:w-[54px] max-sm:h-[54px] max-sm:p-[6px] max-sm:justify-center
                max-sm:bg-[#140a05]/75 max-sm:backdrop-blur-[20px] 
                max-sm:border max-sm:border-white/12 max-sm:shadow-2xl
                
                overflow-hidden focus:outline-none
            "
        >
            <div
                ref={contentRef}
                className="flex items-center gap-3.5 sm:py-2.5 sm:pl-2.5 sm:pr-6 w-max"
            >
                {/* Círculo del Logo - Escala responsiva */}
                <div
                    className="
                        relative flex items-center justify-center shrink-0
                        w-[42px] h-[42px] sm:w-[38px] sm:h-[38px] rounded-full 
                        bg-white
                        shadow-[0_0_0_1px_rgba(249,115,22,0.4),0_3px_10px_rgba(0,0,0,0.5)]
                        animate-logo-radial overflow-hidden
                    "
                >
                    <img
                        src="https://matecsoluciones.mx/Admon/imagenes/LogoIntro.png"
                        alt="Logo"
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Textos: Ocultos por completo en móvil via 'hidden sm:flex' */}
                <div
                    className={`hidden sm:flex flex-col gap-[2px] transition-opacity duration-300 ${
                        isExpanded
                            ? "animate-brand-text opacity-100"
                            : "opacity-0"
                    }`}
                >
                    <div className="text-[17px] font-bold leading-none flex items-start">
                        <span className="text-white tracking-[-0.2px]">
                            Brief
                        </span>
                        <span className="bg-gradient-to-r from-[#F97316] to-[#EF4444] bg-clip-text text-transparent tracking-[-0.3px]">
                            Data
                        </span>
                        <span className="text-[4.5px] font-normal text-white/40 ml-[2px] relative top-[2px]">
                            ®
                        </span>
                    </div>
                    <div className="text-[8.5px] font-medium text-white/40 uppercase tracking-[1.2px]">
                        Business Intelligence
                    </div>
                </div>
            </div>
        </Link>
    );
}
