export default function TableCard({
    children,
    searchValue = "",
    onSearch,
    searchPlaceholder = "Buscar registros...",
    actionLabel,
    onAction,
    showDateRange = false,
    showExport = true,
    onExport,
    onDownload,
}) {
    return (
        <div className="bg-white border border-black/[0.09] rounded overflow-hidden shadow-[0_1px_8px_rgba(0,0,0,0.05)] animate-fade-up mx-[22px]">
            {/* Top bar */}
            <div className="flex items-center px-[22px] py-3 gap-2.5 border-b border-black/[0.09] flex-wrap">
                {/* Search left */}
                <div className="relative flex items-center shrink-0 basis-[280px]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                        <circle cx="7" cy="7" r="5.2" stroke="#a0a4aa" strokeWidth="1.5"/>
                        <path d="M11 11l3.5 3.5" stroke="#a0a4aa" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <input
                        className="w-full h-8 pl-[34px] pr-3.5 bg-[#f2f3f5] border border-black/[0.14] rounded-[1em] text-[12.5px] text-[#3a3d42] font-outfit outline-none transition-all placeholder:text-[#a0a4aa] focus:bg-white focus:border-black/[0.18] focus:shadow-[0_0_0_3px_rgba(0,0,0,0.05)]"
                        type="text"
                        placeholder={searchPlaceholder}
                        value={searchValue}
                        onChange={(e) => onSearch?.(e.target.value)}
                    />
                </div>

                <div className="flex-1" />

                {/* Right actions */}
                <div className="flex items-center gap-2.5 ml-auto">
                    {showDateRange && (
                        <div className="flex items-center gap-2 bg-[#f2f3f5] border border-black/[0.14] rounded-[1em] px-[13px] h-8 text-[12.5px] text-[#3a3d42] cursor-pointer whitespace-nowrap hover:border-black/[0.22] transition-colors">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <rect x="1" y="2" width="12" height="11" rx="2" stroke="#8a7060" strokeWidth="1.2"/>
                                <path d="M1 6h12" stroke="#8a7060" strokeWidth="1.2"/>
                                <path d="M4.5 1v2M9.5 1v2" stroke="#8a7060" strokeWidth="1.2" strokeLinecap="round"/>
                            </svg>
                            01/01/2026 – 31/12/2026
                        </div>
                    )}

                    {showExport && (
                        <>
                            <button
                                onClick={onDownload}
                                className="w-8 h-8 rounded-[1em] border border-black/[0.14] bg-[#f2f3f5] flex items-center justify-center cursor-pointer text-[#70747c] hover:border-black/25 hover:text-[#25272c] transition-all"
                                title="Descargar"
                            >
                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                                    <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
                                    <path d="M6.5 4v5M4 6.5h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                                </svg>
                            </button>
                            <button
                                onClick={onExport}
                                className="w-8 h-8 rounded-[1em] border border-black/[0.14] bg-[#f2f3f5] flex items-center justify-center cursor-pointer text-[#70747c] hover:border-black/25 hover:text-[#25272c] transition-all"
                                title="Exportar"
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M7 1.5v7M4.5 6l2.5 3 2.5-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M2 10.5v1.5h10v-1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                                </svg>
                            </button>
                        </>
                    )}

                    {actionLabel && (
                        <button
                            onClick={onAction}
                            className="h-8 px-[18px] bg-gradient-to-br from-[#3a3d44] to-[#25272c] border-none rounded-[1em] font-outfit text-[13px] font-medium text-white cursor-pointer whitespace-nowrap flex items-center gap-[5px] shadow-[0_2px_10px_rgba(0,0,0,0.25)] hover:opacity-[0.88] transition-opacity"
                        >
                            {actionLabel}
                        </button>
                    )}
                </div>
            </div>

            {children}
        </div>
    );
}
