import { router } from "@inertiajs/react";

export default function TablePagination({ currentPage = 1, total = 0, perPage = 10 }) {
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const from = total === 0 ? 0 : (currentPage - 1) * perPage + 1;
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

    const handlePage = (page) => {
        if (page === "…" || page === currentPage || page < 1 || page > totalPages) return;
        const params = new URLSearchParams(window.location.search);
        params.set("page", page);
        router.visit(`${window.location.pathname}?${params.toString()}`, { preserveState: true, replace: true });
    };

    return (
        <div className="pagination-bar">
            <span className="pagination-info">
                Mostrando {from}–{to} de {total} registros
            </span>
            <div className="pagination-controls">
                <button className="page-btn" onClick={() => handlePage(currentPage - 1)} disabled={currentPage <= 1}>
                    ‹
                </button>
                {pages.map((p, i) =>
                    p === "…" ? (
                        <span key={`dots-${i}`} style={{ color: "var(--text-muted)", padding: "0 4px" }}>
                            …
                        </span>
                    ) : (
                        <button
                            key={p}
                            className={`page-btn ${p === currentPage ? "active" : ""}`}
                            onClick={() => handlePage(p)}
                        >
                            {p}
                        </button>
                    )
                )}
                <button className="page-btn" onClick={() => handlePage(currentPage + 1)} disabled={currentPage >= totalPages}>
                    ›
                </button>
            </div>
        </div>
    );
}
