import { Link } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";

export default function UserCapsule({ user }) {
    const contentRef = useRef(null);
    const [widgetWidth, setWidgetWidth] = useState(58);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false); // Estado para el giro en móvil

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 640) {
                // En Desktop/Tablet (> 640px)
                const timer = setTimeout(() => {
                    if (contentRef.current) {
                        const exactWidth = contentRef.current.scrollWidth;
                        setWidgetWidth(exactWidth);
                        setIsExpanded(true);
                    }
                }, 350);
                return () => clearTimeout(timer);
            } else {
                // En móvil forzamos el estado colapsado y reseteamos el giro
                setWidgetWidth(58);
                setIsExpanded(false);
                setIsFlipped(false);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [user]);

    const getInitials = (name) => {
        if (!name) return "IR"; // Default del HTML original
        const parts = name.trim().split(" ");
        if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
        return name.substring(0, 2).toUpperCase();
    };

    const handleMobileClick = () => {
        if (window.innerWidth <= 640) {
            setIsFlipped(!isFlipped);
        }
    };

    return (
        <div
            onClick={handleMobileClick} // Click en el widget para girar en móvil
            style={{
                width: window.innerWidth > 640 ? `${widgetWidth}px` : "54px",
            }}
            className={`
                fixed top-5 right-5 z-[100] transition-all duration-[550ms] ease-[cubic-bezier(0.4,0,0.2,1)]
                overflow-hidden cursor-pointer sm:cursor-default
                ${isExpanded ? "rounded-full" : "rounded-full"}
                
                /* Estilos Desktop (>640px) */
                sm:h-auto sm:bg-white/5 sm:border-white/15 sm:shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]
                
                /* Estilos Móvil (<640px) - Forzado a Círculo Perfecto y Oscuro */
                max-sm:w-[54px] max-sm:h-[54px] max-sm:p-[6px] max-sm:justify-center max-sm:items-center max-sm:flex
                max-sm:bg-[#140a05]/75 max-sm:backdrop-blur-[20px] 
                max-sm:border max-sm:border-white/12 max-sm:shadow-2xl
            `}
        >
            <div
                ref={contentRef}
                className="flex items-center gap-2 sm:gap-3 sm:py-2.5 sm:pl-2.5 sm:pr-4 sm:w-max"
            >
                {/* Avatar con lógica de giro en móvil - PERSPECTIVA AGREGADA */}
                <div className="relative shrink-0 w-[42px] h-[42px] sm:w-[32px] sm:h-[32px] lg:w-[38px] lg:h-[38px] perspective-sm">
                    <div
                        className={`
                            relative w-full h-full transition-transform duration-500 preserve-3d
                            ${isFlipped ? "rotate-y-180" : ""}
                        `}
                    >
                        {/* Cara Frontal: Iniciales */}
                        <div className="absolute inset-0 backface-hidden flex items-center justify-center rounded-full bg-gradient-to-br from-[#F97316] to-[#b83030] text-white text-sm font-bold animate-logo-radial">
                            {getInitials(user?.name || "Isabel Retana")}
                        </div>

                        {/* Cara Trasera: Icono de Logout (Solo visible en móvil) */}
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center rounded-full bg-red-600/90 text-white"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                className="w-5 h-5"
                            >
                                <path
                                    d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <polyline
                                    points="16 17 21 12 16 7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Info y Divisor: Ocultos COMPLETAMENTE en móvil via 'hidden sm:flex' */}
                <div
                    className={`hidden sm:flex flex-col gap-[1px] transition-opacity duration-300 ${
                        isExpanded
                            ? "animate-brand-text opacity-100"
                            : "opacity-0 invisible"
                    }`}
                >
                    <span className="text-[8px] lg:text-[9px] font-medium text-white/40 uppercase tracking-[0.8px]">
                        Sesión activa
                    </span>
                    <span className="text-[12px] lg:text-[13px] font-semibold text-white whitespace-nowrap">
                        {user?.name || "Isabel Retana"}
                    </span>
                </div>

                {/* Divisor - Oculto en móvil */}
                <div
                    className={`hidden sm:block w-px h-7 bg-white/15 shrink-0 transition-opacity duration-500 ${isExpanded ? "opacity-100" : "opacity-0 invisible"}`}
                ></div>

                {/* Botón Logout Desktop - Oculto en móvil */}
                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className={`
                        hidden sm:inline-flex items-center gap-1.5 shrink-0
                        px-2.5 py-1 lg:px-3.5 lg:py-1.5 border-[1.5px] border-white/25 rounded-full 
                        bg-black/30 backdrop-blur-md text-white/75 text-[10px] lg:text-[11px] font-medium
                        transition-all duration-500 hover:border-red-500/60 hover:bg-red-500/12 hover:text-white
                        ${isExpanded ? "animate-brand-text opacity-100" : "opacity-0 invisible"}
                    `}
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="w-3 h-3"
                    >
                        <path
                            d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <polyline
                            points="16 17 21 12 16 7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span>Cerrar sesión</span>
                </Link>
            </div>
        </div>
    );
}
