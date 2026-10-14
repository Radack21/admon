import { useEffect, useRef, useState } from "react";

export default function MultiSelect({
    label,
    options = [],
    value = [],
    onChange,
    placeholder = "Seleccionar...",
    className = "",
}) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [pos, setPos] = useState(null);
    const wrapRef = useRef(null);
    const triggerRef = useRef(null);
    const popRef = useRef(null);

    const computePos = () => {
        const trigger = triggerRef.current;
        if (!trigger) return;
        const rect = trigger.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom - 8;
        const spaceAbove = rect.top - 8;
        const downward = spaceBelow >= 180 || spaceBelow >= spaceAbove;
        const maxHeight = Math.max(140, Math.floor(downward ? spaceBelow : spaceAbove));
        setPos(
            downward
                ? { position: "fixed", left: rect.left, width: rect.width, top: rect.bottom + 6, bottom: "auto", maxHeight, overflowY: "auto" }
                : { position: "fixed", left: rect.left, width: rect.width, top: "auto", bottom: window.innerHeight - rect.top + 6, maxHeight, overflowY: "auto" }
        );
    };

    useEffect(() => {
        if (!open) return;
        computePos();
        const onReflow = () => computePos();
        window.addEventListener("scroll", onReflow, true);
        window.addEventListener("resize", onReflow);
        return () => {
            window.removeEventListener("scroll", onReflow, true);
            window.removeEventListener("resize", onReflow);
        };
    }, [open]);

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

    const selected = options.filter((o) => (value || []).map(String).includes(String(o.value)));

    const filtered = query
        ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
        : options;

    const toggle = (v) => {
        const set = new Set((value || []).map(String));
        if (set.has(String(v))) set.delete(String(v));
        else set.add(String(v));
        onChange?.([...set]);
    };

    const display = selected.length === 0 ? "" : `${selected.length} seleccionado(s)`;

    return (
        <div ref={wrapRef} className={`select-base-wrapper ${open ? "active" : ""} ${selected.length ? "has-value" : ""} ${className}`}>
            <button
                ref={triggerRef}
                type="button"
                className="select-trigger-base"
                onClick={() => setOpen((o) => !o)}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span>{display}</span>
                <svg className="select-chevron-base" width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 11L3 6h10l-5 5z" />
                </svg>
            </button>
            {label && <label className="floating-label-base">{label}</label>}
            <div ref={popRef} className="select-popover-base" role="listbox" style={pos || undefined}>
                <input
                    type="text"
                    className="select-search-input-base"
                    placeholder="Buscar..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoComplete="off"
                />
                <div className="select-options-list-base">
                    {filtered.length === 0 ? (
                        <div style={{ padding: "8px 12px", fontSize: 12.5, color: "var(--text-muted)" }}>
                            Sin coincidencias
                        </div>
                    ) : (
                        filtered.map((o) => {
                            const isSelected = (value || []).map(String).includes(String(o.value));
                            return (
                                <label className="chk-row" key={o.value}>
                                    <span className="chk-box-wrap">
                                        <input type="checkbox" checked={isSelected} onChange={() => toggle(o.value)} />
                                        <span className="chk-box">
                                            <svg viewBox="0 0 24 24">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </span>
                                    </span>
                                    <span className="chk-text">{o.label}</span>
                                </label>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
