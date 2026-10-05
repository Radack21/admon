import { useEffect, useRef, useState } from "react";

export default function Select({
    label,
    options = [],
    value,
    onChange,
    searchable = false,
    emptyText = "Sin coincidencias",
    className = "",
}) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const wrapRef = useRef(null);

    const selected = options.find((o) => String(o.value) === String(value));

    useEffect(() => {
        const onDocClick = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) {
                setOpen(false);
                setQuery("");
            }
        };
        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, []);

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open]);

    const filtered =
        searchable && query
            ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
            : options;

    return (
        <div
            ref={wrapRef}
            className={`select-base-wrapper ${open ? "active" : ""} ${selected ? "has-value" : ""} ${className}`}
        >
            <button
                type="button"
                className="select-trigger-base"
                onClick={() => setOpen((o) => !o)}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span>{selected?.label || ""}</span>
                <svg className="select-chevron-base" width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 11L3 6h10l-5 5z" />
                </svg>
            </button>
            {label && <label className="floating-label-base">{label}</label>}
            <div className="select-popover-base" role="listbox">
                {searchable && (
                    <input
                        type="text"
                        className="select-search-input-base"
                        placeholder="Buscar..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoComplete="off"
                    />
                )}
                <div className="select-options-list-base">
                    {filtered.length === 0 ? (
                        <div style={{ padding: "8px 12px", fontSize: 12.5, color: "var(--text-muted)" }}>
                            {emptyText}
                        </div>
                    ) : (
                        filtered.map((o) => (
                            <button
                                key={o.value}
                                type="button"
                                role="option"
                                aria-selected={String(o.value) === String(value)}
                                className={`select-option-base ${String(o.value) === String(value) ? "selected" : ""}`}
                                onClick={() => {
                                    onChange?.(o.value);
                                    setOpen(false);
                                    setQuery("");
                                }}
                            >
                                <span>{o.label}</span>
                            </button>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
