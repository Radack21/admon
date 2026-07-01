import { router } from "@inertiajs/react";
import Pill from "@/Components/ui/Pill";

const TYPE_LABEL = {
    active: "Activo",
    inactive: "Inactivo",
    prospect: "Potencial",
};

function SortArrow({ active, direction }) {
    const upActive = active && direction === "asc";
    const downActive = active && direction === "desc";

    return (
        <span className="inline-flex flex-col gap-[1.5px] mt-px">
            <span className={`block w-0 h-0 border-l-[4.5px] border-r-[4.5px] border-b-[4.5px] border-l-transparent border-r-transparent ${upActive ? "border-b-[#1a1a1a] opacity-100" : "border-b-[#1a1a1a] opacity-30"}`} />
            <span className={`block w-0 h-0 border-l-[4.5px] border-r-[4.5px] border-t-[4.5px] border-l-transparent border-r-transparent ${downActive ? "border-t-[#1a1a1a] opacity-100" : "border-t-[#1a1a1a] opacity-30"}`} />
        </span>
    );
}

const SORT_COLUMNS = [
    { label: "CLIENTE", column: "nombre_comercial" },
    { label: "FOLIO", column: "folio" },
    { label: "RFC", column: "rfc" },
    { label: "ESTATUS", column: "type" },
    { label: "FECHA", column: "fecha_registro" },
    { label: "CONTACTO", column: "contacto_nombre" },
];

export default function ClientesDataTable({ clientes, filters }) {
    const data = clientes?.data || [];

    const handleSort = (column) => {
        const newDirection = filters.sort === column && filters.direction === "asc" ? "desc" : "asc";
        router.get(
            route("clientes.index"),
            { tab: filters.tab, search: filters.search, sort: column, direction: newDirection },
            { preserveState: true, replace: true }
        );
    };

    return (
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-56px-100px-44px-50px-52px)] scrollbar-thin">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-[#cdd0d7]">
                        {SORT_COLUMNS.map((col, i) => (
                            <th
                                key={col.column}
                                onClick={() => handleSort(col.column)}
                                className={`sticky top-0 z-[2] px-5 py-[11px] text-left text-[10.5px] font-bold tracking-[0.13em] uppercase whitespace-nowrap border-b-2 border-[#e76023] relative select-none cursor-pointer hover:bg-black/[0.04] transition-colors ${col.label === "FOLIO" ? "text-[#1a1a1a]" : "text-[#1a1a1a]"} [text-shadow:0_1px_0_rgba(255,255,255,0.3)]`}
                            >
                                <span className="inline-flex items-center gap-1.5">
                                    {col.label}
                                    <SortArrow
                                        active={filters.sort === col.column}
                                        direction={filters.direction}
                                    />
                                </span>
                            </th>
                        ))}
                        <th className="sticky top-0 z-[2] w-[68px] px-5 py-[11px] border-b-2 border-[#e76023] relative select-none before:absolute before:left-0 before:top-[20%] before:bottom-[20%] before:w-px before:bg-white/10" />
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="px-5 py-16 text-center text-[#70747c] bg-white text-sm">
                                No se encontraron resultados
                            </td>
                        </tr>
                    ) : (
                        data.map((row, i) => (
                            <tr key={row.id} className="border-b border-black/[0.05] last:border-none group transition-colors">
                                <td className="px-5 py-[5px] text-[13px] text-[#3a3d42] bg-white group-even:bg-[#f0f0f0] group-hover:bg-black/[0.04]">
                                    <div className="text-[13.5px] font-semibold text-[#18191c]">{row.nombre_comercial}</div>
                                </td>
                                <td className="px-5 py-[5px] text-[13px] text-[#3a3d42] bg-white group-even:bg-[#f0f0f0] group-hover:bg-black/[0.04]">
                                    <span className="text-xs text-[#3a3d42] font-space">{row.folio}</span>
                                </td>
                                <td className="px-5 py-[5px] text-[13px] text-[#3a3d42] bg-white group-even:bg-[#f0f0f0] group-hover:bg-black/[0.04]">
                                    <span className="text-xs text-[#3a3d42] font-space">{row.rfc || "—"}</span>
                                </td>
                                <td className="px-5 py-[5px] bg-white group-even:bg-[#f0f0f0] group-hover:bg-black/[0.04]">
                                    <Pill label={TYPE_LABEL[row.type] || row.type} variant={row.type} />
                                </td>
                                <td className="px-5 py-[5px] text-[13px] text-[#3a3d42] bg-white group-even:bg-[#f0f0f0] group-hover:bg-black/[0.04]">
                                    {row.fecha_registro || "—"}
                                </td>
                                <td className="px-5 py-[5px] text-[13px] text-[#3a3d42] bg-white group-even:bg-[#f0f0f0] group-hover:bg-black/[0.04]">
                                    {row.contacto_nombre || "—"}
                                </td>
                                <td className="px-5 py-[5px] bg-white group-even:bg-[#f0f0f0] group-hover:bg-black/[0.04]">
                                    <div className="flex items-center gap-[5px] opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="w-[30px] h-[30px] rounded-lg border-none bg-black/[0.05] flex items-center justify-center cursor-pointer text-[#70747c] hover:bg-black/10 hover:text-[#18191c] hover:scale-110 transition-all">
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                <path d="M9.5 2.5l2 2L4 12H2v-2L9.5 2.5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M8 4l2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                                            </svg>
                                        </button>
                                        <button className="w-[30px] h-[30px] rounded-lg border-none bg-black/[0.05] flex items-center justify-center cursor-pointer text-[#70747c] hover:bg-[#a02020]/[0.08] hover:text-[#a02020] hover:scale-110 transition-all">
                                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                                                <path d="M2 3.5h9M5 3.5V2h3v1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                                                <path d="M3 3.5l.7 7.5h5.6l.7-7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
