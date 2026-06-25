import { useState, useEffect } from "react";
import { usePage, Link } from "@inertiajs/react";
import dayjs from "dayjs";
import "dayjs/locale/es";

dayjs.locale("es");

export default function AnimatedHeader({ breadcrumb = "Ingresos" }) {
    const { auth } = usePage().props;
    const [phase, setPhase] = useState("pills");
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
        // 0.1s: Píldoras empiezan a expandirse
        const expandTimer = setTimeout(() => {
            setPhase("expanding");
            // Forzar transición: aplicar la clase de transición después del primer render
        }, 100);

        // 1.0s: Crossfade widgets → FinalHeader
        const crossfadeTimer = setTimeout(() => {
            setPhase("crossfade");
        }, 1000);

        // 1.5s: Solo FinalHeader
        const finalTimer = setTimeout(() => {
            setPhase("final");
        }, 1500);

        // 1.8s: Datetime con fade radial
        const dtTimer = setTimeout(() => {
            setShowDatetime(true);
        }, 1800);

        return () => {
            clearTimeout(expandTimer);
            clearTimeout(crossfadeTimer);
            clearTimeout(finalTimer);
            clearTimeout(dtTimer);
        };
    }, []);

    // Reloj arranca en crossfade
    useEffect(() => {
        if (phase !== "crossfade" && phase !== "final") return;
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

    const showWidgets = phase === "pills" || phase === "expanding" || phase === "crossfade";
    const showFinalHeader = phase === "crossfade" || phase === "final";

    return (
        <>
            {showWidgets && <AnimatedWidgets phase={phase} initials={initials} />}
            {showFinalHeader && (
                <FinalHeader
                    breadcrumb={breadcrumb}
                    initials={initials}
                    timeStr={timeStr}
                    dayStr={dayStr}
                    dateStr={dateStr}
                    showDatetime={showDatetime}
                />
            )}
        </>
    );
}

/* ── Fases pills → expanding → crossfade ── */
function AnimatedWidgets({ phase, initials }) {
    const isPills = phase === "pills";
    const isExpanding = phase === "expanding";
    const isCrossfading = phase === "crossfade";

    // Vidrio de las píldoras (idéntico al Home)
    const glass =
        "bg-white/5 backdrop-blur-[20px] border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]";

    // Solo en fase "pills" las cápsulas tienen vidrio propio
    const brandGlass = isPills ? glass : "bg-transparent border-transparent shadow-none";
    const brandPos = isPills ? "left-5" : "left-0";
    const brandRadius = isPills ? "rounded-full" : "";
    const transition = isExpanding ? "transition-all duration-700 ease-out" : "";
    const fadeOut = isCrossfading ? "animate-widget-fadeout" : "";
    const opacity = isCrossfading ? "" : "opacity-100";

    // Barra de fondo unificada: invisible en pills, aparece en expanding
    const barVisible = !isPills;
    const barFadeOut = isCrossfading ? "animate-widget-fadeout" : "";

    return (
        <>
            {/* Barra de vidrio unificada — aparece al expandir */}
            <div
                className={`fixed top-0 left-0 w-full h-[58px] z-[99] bg-white/5 backdrop-blur-[20px] border-b border-white/15 pointer-events-none max-sm:hidden transition-opacity duration-500 ${barFadeOut} ${
                    barVisible ? "opacity-100" : "opacity-0"
                }`}
            />

            {/* Brand Píldora (izquierda) */}
            <div
                className={`fixed top-0 z-[100] flex items-center gap-3 py-2.5 pl-[30px] pr-5 whitespace-nowrap overflow-hidden max-sm:hidden ${brandPos} ${brandGlass} ${brandRadius} ${transition} ${fadeOut} ${opacity}`}
                style={{ width: isPills ? "auto" : "50%" }}
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

            {/* Session Píldora (derecha) */}
            <div
                className={`fixed top-0 z-[100] flex items-center justify-end gap-3 py-2.5 pl-2.5 pr-[36px] whitespace-nowrap overflow-hidden max-sm:hidden ${brandPos === "left-5" ? "right-5" : "right-0"} ${brandGlass} ${brandRadius} ${transition} ${fadeOut} ${opacity}`}
                style={{ width: isPills ? "auto" : "50%" }}
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
                <button className="inline-flex items-center gap-1.5 py-[5px] px-[14px] border-[1.5px] border-white/25 rounded-[25px] bg-black/30 backdrop-blur-[10px] text-white/75 text-[11px] font-medium cursor-pointer transition-all hover:border-red-500/60 hover:bg-red-500/12 hover:text-white shrink-0 font-outfit tracking-[0.3px]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Cerrar sesión
                </button>
            </div>

            {/* Widgets móvil */}
            <MobileWidgets initials={initials} isVisible={!isCrossfading && isPills} />
        </>
    );
}

/* ── Widgets en móvil (círculos) ── */
function MobileWidgets({ initials, isVisible }) {
    return (
        <>
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

/* ── Header final unificado — idéntico a los widgets ── */
function FinalHeader({ breadcrumb, initials, timeStr, dayStr, dateStr, showDatetime }) {
    return (
        <header className="fixed top-0 left-0 right-0 z-[200] h-[58px] flex items-center bg-white/5 backdrop-blur-[20px] border-b border-white/15 overflow-hidden animate-header-final">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_22%_60%,rgba(231,96,35,0.12)_0%,transparent_50%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(231,96,35,0.25)_1px,transparent_1px)] bg-[length:80px_34px] bg-[position:5px_6px] opacity-50 pointer-events-none" />

            {/* Left: Logo — idéntico al brand widget */}
            <Link
                href={route("home")}
                className="relative z-10 flex items-center gap-3 shrink-0 pl-[30px] pr-5"
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
            </Link>

            {/* Center: Breadcrumb */}
            <div className="relative z-10 flex-1 flex items-center justify-center gap-1.5">
                <Link href={route("home")} className="text-[13px] text-white/40 font-outfit hover:text-white/70 transition-colors">
                    Inicio
                </Link>
                <span className="text-[12px] text-white/20">›</span>
                <span className="text-[13px] text-[#d0d2d6] font-outfit font-medium">{breadcrumb}</span>
            </div>

            {/* Right: Datetime + User — idéntico al session widget */}
            <div className="relative z-10 flex items-center justify-end gap-3 shrink-0 pr-[36px]">
                {/* Datetime — fade radial */}
                <div
                    className={`flex items-center gap-2.5 ${
                        showDatetime ? "animate-datetime-reveal pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                >
                    <div className="flex flex-col items-end gap-px leading-tight">
                        <div className="text-[9.5px] text-white/45">{dayStr}</div>
                        <div className="text-[9.5px] text-white/45">{dateStr}</div>
                    </div>
                    <div className="font-outfit text-[26px] font-bold text-white tracking-[-1.5px] leading-none ml-1">
                        {timeStr}
                    </div>
                </div>

                {/* Avatar — idéntico al session widget */}
                <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[#F97316] to-[#b83030] flex items-center justify-center text-sm font-bold text-white shrink-0 shadow-[0_0_0_2px_rgba(249,115,22,0.4)] tracking-[0.5px] font-outfit">
                    {initials}
                </div>

                {/* Nombre usuario — inline, sin cápsula */}
                <div className="flex flex-col gap-px whitespace-nowrap">
                    <span className="text-[9px] font-medium text-white/40 font-outfit uppercase tracking-[0.8px]">
                        Sesión activa
                    </span>
                    <span className="text-[13px] font-semibold text-white font-outfit whitespace-nowrap">
                        {usePage().props.auth?.user?.name || "Isabel Retana"}
                    </span>
                </div>

                <div className="w-px h-7 bg-white/15 shrink-0" />

                {/* Logout — idéntico al session widget */}
                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="inline-flex items-center gap-1.5 py-[5px] px-[14px] border-[1.5px] border-white/25 rounded-[25px] bg-black/30 backdrop-blur-[10px] text-white/75 text-[11px] font-medium cursor-pointer transition-all hover:border-red-500/60 hover:bg-red-500/12 hover:text-white shrink-0 font-outfit tracking-[0.3px]"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Cerrar sesión
                </Link>
            </div>
        </header>
    );
}
