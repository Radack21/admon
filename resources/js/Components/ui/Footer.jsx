import { useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es"; // Importamos el idioma español

// Configuramos dayjs para que use español por defecto
dayjs.locale("es");

export default function Footer() {
    const [timeString, setTimeString] = useState("");

    useEffect(() => {
        const updateTime = () => {
            // Genera la fecha actual
            const now = dayjs();

            // Formateamos: "dddd" (Día), "D" (Número), "MMMM" (Mes), "h:mm a" (Hora am/pm)
            // Capitalizamos la primera letra para que diga "Miércoles" en vez de "miércoles"
            let formattedDate = now.format("dddd D MMMM · h:mm a");
            formattedDate =
                formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

            setTimeString(formattedDate);
        };

        updateTime(); // Llamada inicial
        const interval = setInterval(updateTime, 1000); // Actualización cada segundo

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* =========================================
                FOOTER DESKTOP (Fijo al fondo) 
            ========================================= */}
            <div className="hidden sm:block pointer-events-none">
                <p
                    className="
                    fixed bottom-[calc(30px+env(safe-area-inset-bottom))] 
                    left-1/2 -translate-x-1/2 z-10 
                    text-[10px] font-normal tracking-[0.12em] text-white/35 whitespace-nowrap
                    animate-[pageFadeIn_0.9s_ease_1.2s_both]
                "
                >
                    {timeString}
                </p>

                <p
                    className="
                    fixed bottom-0 left-0 right-0 z-10
                    pb-[calc(8px+env(safe-area-inset-bottom))] pt-2.5 text-center
                    text-[10px] font-normal tracking-[0.06em] text-white/50 whitespace-nowrap
                    before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 
                    before:w-[120px] before:h-px before:bg-white/20
                "
                >
                    &copy; Copyright 2026 &nbsp;MATEMÁTICAS Y TECNOLOGÍA
                    INDUSTRIAL S.C.
                </p>
            </div>

            {/* =========================================
                FOOTER MÓVIL 
            ========================================= */}
            <div className="sm:hidden flex flex-col items-center gap-1 w-full px-4 pt-6 pb-[calc(16px+env(safe-area-inset-bottom))] mt-2 pointer-events-none">
                <p className="text-[9px] tracking-[0.10em] text-white/35 text-center whitespace-nowrap animate-[pageFadeIn_0.9s_ease_1.2s_both]">
                    {timeString}
                </p>

                <p
                    className="
                    relative w-full pt-2.5 text-center
                    text-[8px] tracking-[0.03em] text-white/40 whitespace-normal
                    before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 
                    before:w-[80px] before:h-px before:bg-white/20
                "
                >
                    &copy; Copyright 2026 &nbsp;MATEMÁTICAS Y TECNOLOGÍA
                    INDUSTRIAL S.C.
                </p>
            </div>
        </>
    );
}
