import { usePage, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";

dayjs.locale("es");

export default function AppHeader({ breadcrumb = "Ingresos" }) {
    const { auth } = usePage().props;
    const [timeStr, setTimeStr] = useState("");
    const [dayStr, setDayStr] = useState("");
    const [dateStr, setDateStr] = useState("");

    useEffect(() => {
        const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
        const tick = () => {
            const n = dayjs();
            setDayStr(`${dias[n.day()]}:`);
            setDateStr(`${n.date()} de ${meses[n.month()]} de ${n.year()}`);
            setTimeStr(n.format("HH:mm"));
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    const initials = auth?.user?.name
        ? auth.user.name
              .trim()
              .split(" ")
              .map((p) => p[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()
        : "IR";

    return (
        <header className="fixed top-0 left-0 right-0 z-[200] h-14 flex items-center bg-black/40 backdrop-blur-[10px] border-b border-orange-700/20 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_22%_60%,rgba(231,96,35,0.12)_0%,transparent_50%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(231,96,35,0.25)_1px,transparent_1px)] bg-[length:80px_34px] bg-[position:5px_6px] opacity-50 pointer-events-none" />

            {/* Left: Logo */}
            <Link
                href={route("home")}
                className="relative z-10 flex items-center gap-2.5 shrink-0 pl-[22px] pr-4 min-w-[190px]"
            >
                <div className="w-[38px] h-[38px] rounded-full bg-white flex items-center justify-center shadow-[0_0_0_2px_rgba(255,255,255,0.2),0_0_16px_rgba(0,0,0,0.3)]">
                    <img
                        src="https://matecsoluciones.mx/Admon/imagenes/LogoIntro.png"
                        alt="Logo"
                        className="w-[26px] h-[26px] object-contain"
                    />
                </div>
                <div>
                    <div className="font-space text-[15px] font-bold text-white leading-none tracking-[-0.01em]">
                        Brief<span className="text-[#c8cacf]">Data</span>
                        <sup className="text-[7px] font-normal text-white/40 ml-0.5 relative top-[-2px]">®</sup>
                    </div>
                    <div className="text-[8px] text-white/30 tracking-[0.2em] uppercase mt-0.5">
                        Business Intelligence
                    </div>
                </div>
            </Link>

            {/* Center: Breadcrumb */}
            <div className="relative z-10 flex-1 flex items-center justify-center gap-1.5">
                <Link href={route("home")} className="text-[13px] text-white/40 font-outfit hover:text-white/70 transition-colors">
                    Inicio
                </Link>
                <span className="text-[12px] text-white/20">›</span>
                <span className="text-[13px] text-[#d0d2d6] font-outfit font-medium">{breadcrumb}</span>
            </div>

            {/* Right: Datetime + User */}
            <div className="relative z-10 flex items-center gap-3.5 shrink-0 pr-[22px] min-w-[240px] justify-end">
                {/* Datetime */}
                <div className="flex items-center gap-2.5">
                    <div className="flex flex-col items-end leading-tight">
                        <div className="text-[11px] text-white/45">{dayStr}</div>
                        <div className="text-[11px] text-white/45">{dateStr}</div>
                    </div>
                    <div className="font-space text-[22px] font-bold text-white tracking-[-0.02em] ml-1">
                        {timeStr}
                    </div>
                </div>

                {/* User capsule */}
                <div className="flex items-center gap-2 bg-white/[0.08] border border-white/[0.11] rounded-[22px] py-1 pr-[13px] pl-1 cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#e76023] to-[#c94e10] flex items-center justify-center text-[10px] font-bold text-white">
                        {initials}
                    </div>
                    <div>
                        <div className="text-[8px] text-white/30 uppercase tracking-[0.14em]">Sesión activa</div>
                        <div className="text-xs text-white/90 font-medium leading-none">
                            {auth?.user?.name || "Isabel Retana"}
                        </div>
                    </div>
                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="ml-1 opacity-45 hover:opacity-100 shrink-0"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M5 2H2.5A1.5 1.5 0 0 0 1 3.5v7A1.5 1.5 0 0 0 2.5 12H5" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
                            <path d="M9 4l3 3-3 3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 7H5" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
                        </svg>
                    </Link>
                </div>
            </div>
        </header>
    );
}
