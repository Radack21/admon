import TableToolbar from "./TableToolbar";

export default function TableCard({
    children,
    searchPlaceholder,
    onAdd,
    onProgress,
    filters = [],
    className = "",
}) {
    return (
        <div className={`table-card ${className}`}>
            <TableToolbar searchPlaceholder={searchPlaceholder} onAdd={onAdd} onProgress={onProgress} />
            <div className={`active-filters-bar ${filters.length ? "has-filters" : ""}`}>
                <span className="active-filters-label">Filtros activos</span>
                <div className="active-filters-list">
                    {filters.map((f) => (
                        <span className="filter-chip" key={f}>
                            {f}
                            <button type="button" className="filter-chip-close" aria-label="Quitar filtro">
                                ✕
                            </button>
                        </span>
                    ))}
                </div>
                <button type="button" className="active-filters-clear">
                    Limpiar
                </button>
            </div>
            {children}
        </div>
    );
}
