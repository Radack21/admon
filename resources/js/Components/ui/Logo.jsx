import { useState, useEffect, useRef } from "react";
import { Link } from "@inertiajs/react";

export default function Logo() {
    // Usamos refs para medir el ancho real del contenido (igual que en SessionWidget)
    const contentRef = useRef(null);
    const [widgetWidth, setWidgetWidth] = useState(58); // Ancho inicial para el círculo
    const [isExpanded, setIsExpanded] = useState(false);

    // Estado para manejar el error de carga de la imagen
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        // Retardo de 750ms para empezar a abrir la cápsula
        const timer = setTimeout(() => {
            if (contentRef.current) {
                const exactWidth = contentRef.current.scrollWidth;
                setWidgetWidth(exactWidth);
                setIsExpanded(true);
            }
        }, 750);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Link
            href={route("home")} // O la ruta a tu inicio
            style={{ width: `${widgetWidth}px` }}
            className="
                fixed top-4 left-4 sm:top-5 sm:left-5 z-[100] 
                bg-white/5 backdrop-blur-[20px] 
                border border-white/15 rounded-full 
                shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]
                overflow-hidden
                /* Animamos la propiedad 'width' exacta hacia la derecha */
                transition-[width] duration-[550ms] ease-[cubic-bezier(0.4,0,0.2,1)]
                focus:outline-none focus:ring-2 focus:ring-[#F97316]/50
            "
        >
            {/* Contenedor interior medible (w-max) */}
            <div
                ref={contentRef}
                className="flex items-center gap-3.5 sm:py-2.5 sm:pl-2.5 sm:pr-6 w-max"
            >
                {/* Círculo del Logo */}
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

                {/* Textos de la Marca (Ocultos en móvil) */}
                <div
                    className={`hidden sm:flex flex-col gap-[2px] ${isExpanded ? "animate-brand-text" : "opacity-0"}`}
                >
                    {/* Nombre: BriefData® */}
                    <div className="text-[17px] font-bold leading-none flex items-start">
                        {/* 'Brief' en blanco sólido */}
                        <span className="text-white tracking-[-0.2px]">
                            Brief
                        </span>
                        {/* 'Data' en gradiente naranja/rojo */}
                        <span className="bg-gradient-to-r from-[#F97316] to-[#EF4444] bg-clip-text text-transparent tracking-[-0.3px]">
                            Data
                        </span>
                        {/* Símbolo ® - Ajuste milimétrico */}
                        <span className="text-[4.5px] font-normal text-white/40 ml-[2px] relative top-[2px]">
                            ®
                        </span>
                    </div>

                    {/* Tagline */}
                    <div className="text-[8.5px] font-medium text-white/40 uppercase tracking-[1.2px]">
                        Business Intelligence
                    </div>
                </div>
            </div>
        </Link>
    );
}
