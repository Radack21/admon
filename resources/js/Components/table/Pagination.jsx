export default function Pagination({ currentPage = 1, total = 248, perPage = 10 }) {
    const totalPages = Math.ceil(total / perPage);
    const from = (currentPage - 1) * perPage + 1;
    const to = Math.min(currentPage * perPage, total);

    const pages = [];
    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
        pages.push(1);
        if (currentPage > 3) pages.push("…");
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            pages.push(i);
        }
        if (currentPage < totalPages - 2) pages.push("…");
        pages.push(totalPages);
    }

    return (
        <div className="flex items-center justify-between px-[22px] py-2.5 border-t border-black/[0.09] bg-white flex-shrink-0">
            <div className="text-xs text-[#70747c]">
                Mostrando {from}–{to} de {total} registros
            </div>
            <div className="flex items-center gap-[5px]">
                <button className="min-w-[30px] h-[30px] px-[7px] rounded-lg border border-black/[0.14] bg-white text-sm text-[#3a3d42] flex items-center justify-center hover:border-black/25 hover:text-[#25272c] transition-all">
                    ‹
                </button>
                {pages.map((p, i) =>
                    p === "…" ? (
                        <span
                            key={`dots-${i}`}
                            className="min-w-[30px] h-[30px] flex items-center justify-center text-[#a0a4aa] cursor-default"
                        >
                            ···
                        </span>
                    ) : (
                        <button
                            key={p}
                            className={`min-w-[30px] h-[30px] px-[7px] rounded-lg border text-xs flex items-center justify-center transition-all ${
                                p === currentPage
                                    ? "bg-[#25272c] border-[#25272c] text-white font-semibold"
                                    : "bg-white border-black/[0.14] text-[#3a3d42] hover:border-black/25 hover:text-[#25272c]"
                            }`}
                        >
                            {p}
                        </button>
                    )
                )}
                <button className="min-w-[30px] h-[30px] px-[7px] rounded-lg border border-black/[0.14] bg-white text-sm text-[#70747c] flex items-center justify-center hover:border-black/25 hover:text-[#25272c] transition-all">
                    ›
                </button>
            </div>
        </div>
    );
}
