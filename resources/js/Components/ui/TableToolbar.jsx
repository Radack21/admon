import { useEffect, useState } from "react";

const DEFAULT_FIELDS = [
    { key: "fecha", label: "Fecha" },
    { key: "estatus", label: "Estatus" },
    { key: "monto", label: "Monto" },
    { key: "folio", label: "Folio" },
    { key: "cliente", label: "Cliente" },
];

const ICON_CALENDAR = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

const ICON_FILE = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="16" y2="17" />
    </svg>
);

function DateField({ label }) {
    return (
        <div className="floating-field has-icon-left">
            <input type="text" className="input-pill has-icon-left" placeholder="--/--/----" maxLength={10} autoComplete="off" />
            <div className="input-icon-left">{ICON_CALENDAR}</div>
            <label className="floating-label">{label}</label>
        </div>
    );
}

export default function TableToolbar({
    searchPlaceholder = "Buscar...",
    searchValue,
    onSearch,
    filterFields = DEFAULT_FIELDS,
    estatusOptions = ["Cobrado", "Pendiente", "Vencido"],
    showFilter = true,
    onAdd,
    onProgress,
    onExport,
    className = "",
}) {
    const controlled = onSearch !== undefined;
    const [internalSearch, setInternalSearch] = useState("");
    const search = controlled ? searchValue ?? "" : internalSearch;

    const [filterOpen, setFilterOpen] = useState(false);
    const [openSub, setOpenSub] = useState(null);
    const [poptrayOpen, setPoptrayOpen] = useState(false);
    const [dateMode, setDateMode] = useState("single");

    useEffect(() => {
        const onDocClick = () => {
            setFilterOpen(false);
            setOpenSub(null);
            setPoptrayOpen(false);
        };
        document.addEventListener("click", onDocClick);
        return () => document.removeEventListener("click", onDocClick);
    }, []);

    const hasValue = search.length > 0;

    const updateSearch = (v) => {
        if (controlled) onSearch(v);
        else setInternalSearch(v);
    };

    const renderSubmenu = (field) => {
        if (field.key === "fecha") {
            return (
                <div className="flex flex-col gap-2.5">
                    <div className="date-mode-switch" role="radiogroup" aria-label="Tipo de filtro de fecha">
                        <label className="date-mode-option">
                            <input type="radio" name="tb_fecha_modo" checked={dateMode === "single"} onChange={() => setDateMode("single")} />
                            <span>Una fecha</span>
                        </label>
                        <label className="date-mode-option">
                            <input type="radio" name="tb_fecha_modo" checked={dateMode === "period"} onChange={() => setDateMode("period")} />
                            <span>Periodo</span>
                        </label>
                    </div>
                    <div className={`date-fields ${dateMode}`}>
                        <div className="sub-field date-single-field">
                            <DateField label="Fecha" />
                        </div>
                        <div className="date-period-field">
                            <div className="sub-field">
                                <DateField label="Fecha inicial" />
                            </div>
                            <div className="sub-field">
                                <DateField label="Fecha final" />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        if (field.key === "estatus") {
            return (
                <>
                    {estatusOptions.map((s) => (
                        <label className="chk-row" key={s}>
                            <span className="chk-box-wrap">
                                <input type="checkbox" />
                                <span className="chk-box">
                                    <svg viewBox="0 0 24 24">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </span>
                            </span>
                            <span className="chk-text">{s}</span>
                        </label>
                    ))}
                </>
            );
        }
        return (
            <div className="floating-field">
                <input type="text" className="input-pill" placeholder=" " />
                <label className="floating-label">Contiene...</label>
            </div>
        );
    };

    return (
        <div className={`table-toolbar ${className}`}>
            <div className="toolbar-left">
                <div style={{ flex: 1, minWidth: 200, maxWidth: 300 }}>
                    <div className={`search-field ${hasValue ? "has-value" : ""}`}>
                        <button
                            type="button"
                            className="search-action-btn"
                            onClick={() => hasValue && updateSearch("")}
                            aria-label="Limpiar búsqueda"
                            data-tooltip="Limpiar término"
                        >
                            <svg className="icon-search" viewBox="0 0 24 24">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <svg className="icon-clear" viewBox="0 0 24 24">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                        <input
                            type="text"
                            className="search-pill"
                            value={search}
                            onChange={(e) => updateSearch(e.target.value)}
                            autoComplete="off"
                        />
                        <label className="floating-label">{searchPlaceholder}</label>
                    </div>
                </div>

                {showFilter && (
                    <div className="filter-wrap">
                        <button
                            type="button"
                            className={`btn-filter ${filterOpen ? "on" : ""}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setFilterOpen((o) => !o);
                            }}
                            aria-label="Filtros"
                            data-tooltip="Opciones de filtrado"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                            </svg>
                            <span className="count" style={{ display: "none" }} />
                        </button>
                        <div className={`filter-menu ${filterOpen ? "active" : ""}`} onClick={(e) => e.stopPropagation()}>
                            <div className="filter-menu-head">
                                <div className="menu-label">Filtros</div>
                                <button className="btn-apply-sm" type="button">
                                    Aplicar
                                </button>
                            </div>
                            <div className="field-list">
                                {filterFields.map((f) => (
                                    <div
                                        key={f.key}
                                        className={`field-row ${openSub === f.key ? "row-open" : ""}`}
                                        onClick={() => setOpenSub((s) => (s === f.key ? null : f.key))}
                                    >
                                        <span className="fname">
                                            <span className="dot" />
                                            {f.label}
                                        </span>
                                        <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="9 18 15 12 9 6" />
                                        </svg>
                                    </div>
                                ))}
                            </div>
                            <div className="menu-foot">
                                <button className="link-clear" type="button">
                                    Limpiar todo
                                </button>
                            </div>

                            {filterFields.map((f) => (
                                <div className={`field-submenu ${openSub === f.key ? "active" : ""}`} key={f.key}>
                                    <div className="sub-title">{f.label}</div>
                                    {renderSubmenu(f)}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="toolbar-right">
                <button
                    type="button"
                    className="btn-circle poptray-btn"
                    onClick={onProgress}
                    data-tooltip="Ver gráficos de progreso"
                    data-tooltip-align="left"
                    aria-label="Gráficos de progreso"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="20" x2="18" y2="10" />
                        <line x1="12" y1="20" x2="12" y2="4" />
                        <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                </button>
                <div className={`poptray-wrapper ${poptrayOpen ? "active" : ""}`}>
                    <button
                        type="button"
                        className="btn-circle poptray-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            setPoptrayOpen((o) => !o);
                        }}
                        data-tooltip="Descargar reporte"
                        data-tooltip-align="left"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                    </button>
                    <div className="poptray-menu" onClick={(e) => e.stopPropagation()}>
                        <div className="poptray-item excel" onClick={() => onExport?.("excel")}>
                            {ICON_FILE}
                            <span>Archivo de Excel</span>
                        </div>
                        <div className="poptray-item pdf" onClick={() => onExport?.("pdf")}>
                            {ICON_FILE}
                            <span>Documento PDF</span>
                        </div>
                    </div>
                </div>
                <button type="button" className="btn-circle primary" onClick={onAdd} data-tooltip="Agregar nuevo cliente">
                    +
                </button>
            </div>
        </div>
    );
}
