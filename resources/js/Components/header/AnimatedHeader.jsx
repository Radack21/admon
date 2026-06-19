import { useState, useEffect } from "react";
import { usePage, Link } from "@inertiajs/react";
import dayjs from "dayjs";
import "dayjs/locale/es";

dayjs.locale("es");

export default function AnimatedHeader({ breadcrumb = "Ingresos" }) {
    const { auth } = usePage().props;
    const [phase, setPhase] = useState("widgets"); // widgets | fading | final
    const [showDatetime, setShowDatetime] = useState(false);
    const [timeStr, setTimeStr] = useState("");
    const [dayStr, setDayStr] = useState("");
    const [dateStr, setDateStr] = useState("");

    const initials = auth?.user?.name
        ? auth.user.name
              .trim()
              .split(" ")
              .map((p) => p[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()
        : "IR";

    useEffect(() => {
        // Fase 1+2: widgets se expanden (0.2s + 1.5s) y deslizan (1.7s + 0.5s) = 2.2s
        const swapTimer = setTimeout(() => {
            setPhase("fading");
        }, 2200);

        // Fase 3: widgets desaparecen, header final aparece (0.2s después)
        const finalTimer = setTimeout(() => {
            setPhase("final");
        }, 2400);

        // Datetime aparece con fade radial 0.3s después del header
        const dtTimer = setTimeout(() => {
            setShowDatetime(true);
        }, 2700);

        return () => {
            clearTimeout(swapTimer);
            clearTimeout(finalTimer);
            clearTimeout(dtTimer);
        };
    }, []);

    // Reloj (solo arranca cuando el header final aparece)
    useEffect(() => {
        if (phase !== "final") return;
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
    }, [phase]);

    if (phase === "final") {
        return <FinalHeader breadcrumb={breadcrumb} initials={initials} timeStr={timeStr} dayStr={dayStr} dateStr={dateStr} showDatetime={showDatetime} />;
    }

    return <AnimatedWidgets phase={phase} initials={initials} />;
}

/* ── Fase 1+2: Widgets animados ── */
function AnimatedWidgets({ phase, initials }) {
    const isVisible = phase === "widgets";
    return (
        <>
            {/* Fondo compartido del header — evita doble backdrop */}
            <div
                className="fixed top-0 left-0 w-full h-[58px] z-[99] bg-white/5 backdrop-blur-[20px] border-b border-white/15 pointer-events-none animate-header-bg max-sm:hidden"
            />

            {/* Brand Widget (izquierda) */}
            <div
                className={`fixed top-0 left-1/2 -translate-x-full z-[100] flex items-center gap-3 py-2.5 pl-[30px] pr-5 whitespace-nowrap overflow-hidden animate-brand-expand max-sm:hidden transition-opacity duration-200 ${
                    isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                style={{ width: "50%" }}
            >
                <div className="w-[38px] h-[38px] rounded-full bg-white flex items-center justify-center shrink-0 shadow-[0_0_0_2px_rgba(249,115,22,0.35),0_4px_12px_rgba(0,0,0,0.3)] overflow-hidden">
                    <img
                        src="https://matecsoluciones.mx/Admon/imagenes/LogoIntro.png"
                        alt="Logo"
                        className="w-full h-full object-contain"
                    />
                </div>
                <div className="flex flex-col gap-px whitespace-nowrap">
                    <div className="text-[17px] font-bold font-outfit leading-none tracking-[-0.3px] bg-gradient-to-r from-white to-white/75 bg-clip-text text-transparent">
                        Brief
                        <span className="bg-gradient-to-r from-[#F97316] to-[#EF4444] bg-clip-text text-transparent">Data</span>
                        <sup className="text-[8px] font-normal text-white/40 ml-0.5" style={{ WebkitTextFillColor: "rgba(255,255,255,0.4)", background: "none" }}>®</sup>
                    </div>
                    <div className="text-[8.5px] font-medium text-white/35 font-outfit uppercase tracking-[1px]">
                        Business Intelligence
                    </div>
                </div>
            </div>

            {/* Session Widget (derecha) */}
            <div
                className={`fixed top-0 right-0 z-[100] flex items-center justify-end gap-3 py-2.5 pl-2.5 pr-[36px] whitespace-nowrap overflow-hidden animate-session-expand max-sm:hidden transition-opacity duration-200 ${
                    isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                style={{ width: "50%" }}
            >
                <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[#F97316] to-[#b83030] flex items-center justify-center text-sm font-bold text-white shrink-0 shadow-[0_0_0_2px_rgba(249,115,22,0.4)] tracking-[0.5px] font-outfit">
                    {initials}
                </div>
                <div className="flex flex-col gap-px whitespace-nowrap">
                    <span className="text-[9px] font-medium text-white/40 font-outfit uppercase tracking-[0.8px]">
                        Sesión activa
                    </span>
                    <span className="text-[13px] font-semibold text-white font-outfit whitespace-nowrap">
                        {usePage().props.auth?.user?.name || "Isabel Retana"}
                    </span>
                </div>
                <div className="w-px h-7 bg-white/15 shrink-0" />
                <button className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border-[1.5px] border-white/25 rounded-[25px] bg-black/30 backdrop-blur-[10px] text-white/75 text-[11px] font-medium cursor-pointer transition-all hover:border-red-500/60 hover:bg-red-500/12 hover:text-white shrink-0 font-outfit tracking-[0.3px]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Cerrar sesión
                </button>
            </div>

            {/* Widgets móvil (círculos colapsados, igual que el Home) */}
            <MobileWidgets initials={initials} isVisible={isVisible} />
        </>
    );
}

/* ── Widgets en móvil (círculos) ── */
function MobileWidgets({ initials, isVisible }) {
    return (
        <>
            {/* Logo círculo izquierda */}
            <Link
                href={route("home")}
                className={`sm:hidden fixed top-[14px] left-[14px] z-[100] w-[54px] h-[54px] p-[6px] rounded-full bg-[#140a05]/75 backdrop-blur-[20px] border border-white/12 shadow-2xl flex items-center justify-center transition-opacity duration-200 ${
                    isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            >
                <div className="w-[42px] h-[42px] rounded-full bg-white flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_2px_8px_rgba(0,0,0,0.4)] overflow-hidden">
                    <img
                        src="https://matecsoluciones.mx/Admon/imagenes/LogoIntro.png"
                        alt="Logo"
                        className="w-full h-full object-contain"
                    />
                </div>
            </Link>

            {/* Avatar círculo derecha */}
            <Link
                href={route("logout")}
                method="post"
                as="button"
                className={`sm:hidden fixed top-[14px] right-[14px] z-[100] w-[54px] h-[54px] p-[6px] rounded-full bg-[#140a05]/75 backdrop-blur-[20px] border border-white/12 shadow-2xl flex items-center justify-center transition-opacity duration-200 ${
                    isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            >
                <div className="w-[42px] h-[42px] rounded-full bg-[radial-gradient(circle_at_38%_32%,#ff7a2e_0%,#e8480a_45%,#b83010_100%)] flex items-center justify-center text-[13px] font-bold text-white tracking-[0.5px] shadow-[inset_0_1px_0_rgba(255,200,150,0.3),inset_0_-2px_6px_rgba(0,0,0,0.35),0_2px_8px_rgba(0,0,0,0.4)]">
                    {initials}
                </div>
            </Link>
        </>
    );
}

/* ── Fase 3: Header final unificado ── */
function FinalHeader({ breadcrumb, initials, timeStr, dayStr, dateStr, showDatetime }) {
    return (
        <header className="fixed top-0 left-0 right-0 z-[200] h-14 flex items-center bg-black/40 backdrop-blur-[10px] border-b border-orange-700/20 overflow-hidden animate-header-final">
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
                {/* Datetime — aparece con fade radial */}
                <div
                    className={`flex items-center gap-2.5 transition-opacity ${
                        showDatetime ? "animate-datetime-reveal pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                >
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
                            {usePage().props.auth?.user?.name || "Isabel Retana"}
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
