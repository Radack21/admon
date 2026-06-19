import Pill from "@/Components/ui/Pill";

const INGRESOS = [
    { cliente: "Acme Corp", folio: "ING-2026-0314", emision: "12 mar 2026", vencimiento: "28 mar 2026", estatus: "cobrado", monto: "48,500" },
    { cliente: "Tecnología Libre", folio: "ING-2026-0315", emision: "15 mar 2026", vencimiento: "31 mar 2026", estatus: "pendiente", monto: "32,000" },
    { cliente: "Grupo Solaris", folio: "ING-2026-0316", emision: "18 mar 2026", vencimiento: "04 abr 2026", estatus: "cobrado", monto: "15,800" },
    { cliente: "Nexo Retail", folio: "ING-2026-0317", emision: "10 mar 2026", vencimiento: "20 mar 2026", estatus: "vencido", monto: "12,000" },
    { cliente: "MetaPro S.A.", folio: "ING-2026-0318", emision: "22 mar 2026", vencimiento: "08 abr 2026", estatus: "pendiente", monto: "89,040" },
    { cliente: "Comercial Peralta", folio: "ING-2026-0319", emision: "24 mar 2026", vencimiento: "10 abr 2026", estatus: "cobrado", monto: "22,500" },
    { cliente: "Innovatech MX", folio: "ING-2026-0320", emision: "25 mar 2026", vencimiento: "11 abr 2026", estatus: "pendiente", monto: "55,200" },
    { cliente: "Soluciones Delta", folio: "ING-2026-0321", emision: "26 mar 2026", vencimiento: "15 abr 2026", estatus: "cobrado", monto: "18,750" },
    { cliente: "Grupo Nórdika", folio: "ING-2026-0322", emision: "27 mar 2026", vencimiento: "05 abr 2026", estatus: "vencido", monto: "9,800" },
    { cliente: "DataFusion Labs", folio: "ING-2026-0323", emision: "28 mar 2026", vencimiento: "18 abr 2026", estatus: "pendiente", monto: "67,300" },
];

const ESTATUS_LABEL = { cobrado: "Cobrado", pendiente: "Pendiente", vencido: "Vencido" };

function SortArrow() {
    return (
        <span className="inline-flex flex-col gap-[1.5px] mt-px">
            <span className="block w-0 h-0 border-l-[4.5px] border-r-[4.5px] border-b-[4.5px] border-l-transparent border-r-transparent border-b-[#1a1a1a] opacity-85" />
            <span className="block w-0 h-0 border-l-[4.5px] border-r-[4.5px] border-t-[4.5px] border-l-transparent border-r-transparent border-t-[#1a1a1a] opacity-85" />
        </span>
    );
}

export default function DataTable() {
    return (
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-56px-100px-44px-50px-52px)] scrollbar-thin">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-[#cdd0d7]">
                        <th className="sticky top-0 z-[2] px-5 py-[11px] text-left text-[10.5px] font-bold text-[#1a1a1a] tracking-[0.13em] uppercase whitespace-nowrap border-b-2 border-[#e76023] relative select-none [text-shadow:0_1px_0_rgba(255,255,255,0.3)]">
                            <span className="inline-flex items-center gap-1.5 cursor-pointer hover:text-black">
                                CLIENTE <SortArrow />
                            </span>
                        </th>
                        <th className="sticky top-0 z-[2] px-5 py-[11px] text-left text-[10.5px] font-bold text-[#1a1a1a] tracking-[0.13em] uppercase whitespace-nowrap border-b-2 border-[#e76023] relative select-none [text-shadow:0_1px_0_rgba(255,255,255,0.3)] before:absolute before:left-0 before:top-[20%] before:bottom-[20%] before:w-px before:bg-white/10">
                            <span className="inline-flex items-center gap-1.5 cursor-pointer hover:text-black">
                                FOLIO <SortArrow />
                            </span>
                        </th>
                        <th className="sticky top-0 z-[2] px-5 py-[11px] text-left text-[10.5px] font-bold text-[#1a1a1a] tracking-[0.13em] uppercase whitespace-nowrap border-b-2 border-[#e76023] relative select-none [text-shadow:0_1px_0_rgba(255,255,255,0.3)] before:absolute before:left-0 before:top-[20%] before:bottom-[20%] before:w-px before:bg-white/10">
                            <span className="inline-flex items-center gap-1.5 cursor-pointer hover:text-black">
                                FECHA EMISIÓN <SortArrow />
                            </span>
                        </th>
                        <th className="sticky top-0 z-[2] px-5 py-[11px] text-left text-[10.5px] font-bold text-[#1a1a1a] tracking-[0.13em] uppercase whitespace-nowrap border-b-2 border-[#e76023] relative select-none [text-shadow:0_1px_0_rgba(255,255,255,0.3)] before:absolute before:left-0 before:top-[20%] before:bottom-[20%] before:w-px before:bg-white/10">
                            <span className="inline-flex items-center gap-1.5 cursor-pointer hover:text-black">
                                VENCIMIENTO <SortArrow />
                            </span>
                        </th>
                        <th className="sticky top-0 z-[2] px-5 py-[11px] text-left text-[10.5px] font-bold text-[#1a1a1a] tracking-[0.13em] uppercase whitespace-nowrap border-b-2 border-[#e76023] relative select-none [text-shadow:0_1px_0_rgba(255,255,255,0.3)] before:absolute before:left-0 before:top-[20%] before:bottom-[20%] before:w-px before:bg-white/10">
                            <span className="inline-flex items-center gap-1.5 cursor-pointer hover:text-black">
                                ESTATUS <SortArrow />
                            </span>
                        </th>
                        <th className="sticky top-0 z-[2] px-5 py-[11px] text-right text-[10.5px] font-bold text-[#1a1a1a] tracking-[0.13em] uppercase whitespace-nowrap border-b-2 border-[#e76023] relative select-none [text-shadow:0_1px_0_rgba(255,255,255,0.3)] before:absolute before:left-0 before:top-[20%] before:bottom-[20%] before:w-px before:bg-white/10">
                            <span className="inline-flex items-center gap-1.5 cursor-pointer hover:text-black">
                                MONTO <SortArrow />
                            </span>
                        </th>
                        <th className="sticky top-0 z-[2] w-[68px] px-5 py-[11px] border-b-2 border-[#e76023] relative select-none before:absolute before:left-0 before:top-[20%] before:bottom-[20%] before:w-px before:bg-white/10" />
                    </tr>
                </thead>
                <tbody>
                    {INGRESOS.map((row, i) => (
                        <tr key={i} className="border-b border-black/[0.05] last:border-none group transition-colors">
                            <td className="px-5 py-[5px] text-[13px] text-[#3a3d42] bg-white group-even:bg-[#f0f0f0] group-hover:bg-black/[0.04]">
                                <div className="text-[13.5px] font-semibold text-[#18191c]">{row.cliente}</div>
                            </td>
                            <td className="px-5 py-[5px] text-[13px] text-[#3a3d42] bg-white group-even:bg-[#f0f0f0] group-hover:bg-black/[0.04]">
                                <span className="text-xs text-[#3a3d42] font-space">{row.folio}</span>
                            </td>
                            <td className="px-5 py-[5px] text-[13px] text-[#3a3d42] bg-white group-even:bg-[#f0f0f0] group-hover:bg-black/[0.04]">
                                {row.emision}
                            </td>
                            <td className="px-5 py-[5px] text-[13px] text-[#3a3d42] bg-white group-even:bg-[#f0f0f0] group-hover:bg-black/[0.04]">
                                {row.vencimiento}
                            </td>
                            <td className="px-5 py-[5px] bg-white group-even:bg-[#f0f0f0] group-hover:bg-black/[0.04]">
                                <Pill label={ESTATUS_LABEL[row.estatus]} variant={row.estatus} />
                            </td>
                            <td className="px-5 py-[5px] text-right bg-white group-even:bg-[#f0f0f0] group-hover:bg-black/[0.04]">
                                <div className="font-space text-sm font-semibold text-[#3a3d42] tracking-[-0.02em]">
                                    <span className="text-[11px] font-normal opacity-55 mr-px align-[0.5px]">$</span>
                                    {row.monto}
                                </div>
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
                    ))}
                </tbody>
            </table>
        </div>
    );
}
