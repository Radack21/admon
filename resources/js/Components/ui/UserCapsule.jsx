import { Link } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";

export default function UserCapsule({ user }) {
    // Usamos refs para medir el ancho real del contenido
    const contentRef = useRef(null);
    const [widgetWidth, setWidgetWidth] = useState(58); // Arranca exactamente en 58px
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (contentRef.current) {
                // Medimos el ancho exacto que ocupa todo el contenido (textos, botón, gaps)
                const exactWidth = contentRef.current.scrollWidth;
                setWidgetWidth(exactWidth);
                setIsExpanded(true);
            }
        }, 750);

        return () => clearTimeout(timer);
    }, []);

    const getInitials = (name) => {
        if (!name) return "U";
        const parts = name.trim().split(" ");
        if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
        return name.substring(0, 2).toUpperCase();
    };

    return (
        <div
            style={{ width: `${widgetWidth}px` }}
            className="
                fixed top-5 right-5 z-[100] 
                bg-white/5 backdrop-blur-[20px] 
                border border-white/15 rounded-full 
                shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]
                overflow-hidden
                /* Animamos la propiedad 'width' exacta, no max-width */
                transition-[width] duration-[550ms] ease-[cubic-bezier(0.4,0,0.2,1)]
            "
        >
            {/* Envolvemos todo en un div interior con w-max. 
              Esto obliga al contenido a no romperse, permitiendo que scrollWidth lo mida perfectamente.
            */}
            <div
                ref={contentRef}
                className="flex items-center gap-3 py-2.5 pl-2.5 pr-4 w-max"
            >
                {/* Avatar */}
                <div
                    className="
                        relative flex items-center justify-center shrink-0
                        w-[38px] h-[38px] rounded-full 
                        bg-gradient-to-br from-[#F97316] to-[#b83030] 
                        text-white text-sm font-bold tracking-wide
                        shadow-[0_0_0_2px_rgba(249,115,22,0.4)]
                        animate-logo-radial
                    "
                >
                    {getInitials(user?.name || "Isabel Retana")}
                </div>

                {/* Textos y Divisor */}
                <div
                    className={`flex flex-col gap-[1px] ${isExpanded ? "animate-brand-text" : "opacity-0"}`}
                >
                    <span className="text-[9px] font-medium text-white/40 uppercase tracking-[0.8px]">
                        Sesión activa
                    </span>
                    <span className="text-[13px] font-semibold text-white">
                        {user?.name || "Isabel Retana"}
                    </span>
                </div>

                <div
                    className={`w-px h-7 bg-white/15 shrink-0 ${isExpanded ? "animate-brand-text" : "opacity-0"}`}
                ></div>

                {/* Botón */}
                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className={`
                        inline-flex items-center gap-1.5 shrink-0
                        px-3.5 py-1.5 border-[1.5px] border-white/25 rounded-full 
                        bg-black/30 backdrop-blur-md 
                        text-white/75 text-[11px] font-medium tracking-wide
                        transition-colors duration-250
                        hover:border-red-500/60 hover:bg-red-500/12 hover:text-white hover:shadow-[0_0_16px_rgba(239,68,68,0.2)]
                        focus:outline-none
                        ${isExpanded ? "animate-brand-text" : "opacity-0"}
                    `}
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-3 h-3"
                    >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Cerrar sesión
                </Link>
            </div>
        </div>
    );
}
