import { usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

export default function UserCapsule({ user }) {
    return (
        <div className="flex items-center gap-4 p-1.5 pl-4 bg-black/40 border border-white/10 backdrop-blur-xl rounded-full">
            <div className="flex flex-col text-right leading-none">
                <span className="text-[9px] text-white/40 uppercase">
                    Sesión Activa
                </span>
                <span className="text-xs text-white font-medium">EBER</span>
            </div>
            <div className="w-9 h-9 bg-orange-600 rounded-full flex items-center justify-center text-sm font-bold text-white border border-white/20">
                ES
            </div>
            <Link
                href="/logout"
                method="post"
                as="button"
                className="px-4 py-2 text-[10px] uppercase tracking-widest text-white/60 hover:text-white border-l border-white/10 transition-colors"
            >
                Cerrar sesión
            </Link>
        </div>
    );
}
