import { Link } from "@inertiajs/react";

export default function MenuItem({
    label,
    icon: Icon,
    accentColor,
    href = "#",
}) {
    return (
        <Link
            href={href}
            className="group flex flex-col items-center outline-none text-center w-[90px] mx-auto transition-transform duration-300 hover:-translate-y-2"
            style={{
                "--accent-color": accentColor,
                "--accent-glow": `${accentColor}60`, // 60 en hex = ~38% opacidad
            }}
        >
            <div
                className="relative flex items-center justify-center w-[82px] h-[82px] rounded-full mb-3
                            bg-[#646469]/20 backdrop-blur-[18px] border-[1.5px] border-white/20
                            shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.15)]
                            transition-all duration-300 cubic-bezier(0.4,0,0.2,1) overflow-hidden
                            group-hover:scale-105 group-hover:bg-[#828287]/30 group-hover:border-white/30
                            group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.28),0_0_20px_var(--accent-glow)]"
            >
                {/* Anillo exterior animado */}
                <div
                    className="absolute inset-0 opacity-50 rounded-full border-2 animate-[iconPulse_3s_ease-in-out_infinite]"
                    style={{ borderColor: accentColor }}
                />

                {/* SVG del Icono */}
                <div className="w-[42px] h-[42px] relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                    <Icon />
                </div>
            </div>

            {/* Etiqueta animada */}
            <span
                className="text-xs font-normal text-white/65 tracking-[0.06em] mt-2 font-outfit transition-all duration-300 origin-top
                             group-hover:text-white group-hover:tracking-[0.10em] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]"
            >
                {label}
            </span>
        </Link>
    );
}
