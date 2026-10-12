import { useEffect, useRef, useState } from "react";

const DEFAULT_COUNTRIES = [
    { name: "México", code: "+52", flag: "🇲🇽", iso: "MX" },
    { name: "Estados Unidos", code: "+1", flag: "🇺🇸", iso: "US" },
    { name: "Canadá", code: "+1", flag: "🇨🇦", iso: "CA" },
    { name: "Colombia", code: "+57", flag: "🇨🇴", iso: "CO" },
    { name: "España", code: "+34", flag: "🇪🇸", iso: "ES" },
    { name: "Argentina", code: "+54", flag: "🇦🇷", iso: "AR" },
];

function formatPhone(raw) {
    let digits = String(raw).replace(/\D/g, "");
    if (digits.length > 10 && digits.startsWith("52")) digits = digits.slice(2);
    if (digits.length > 10) digits = digits.slice(0, 10);
    if (digits.length > 6) return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    if (digits.length > 3) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    return digits;
}

export default function PhoneInput({
    label,
    value,
    onChange,
    required = false,
    countries = DEFAULT_COUNTRIES,
    className = "",
}) {
    const [country, setCountry] = useState(countries[0]);
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const wrapRef = useRef(null);

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

    const toggleOpen = () => {
        setOpen((o) => {
            const next = !o;
            if (next) setQuery("");
            return next;
        });
    };

    const filtered = countries.filter(
        (c) => c.name.toLowerCase().includes(query.toLowerCase()) || c.code.includes(query)
    );

    const select = (c) => {
        setCountry(c);
        setOpen(false);
        setQuery("");
    };

    return (
        <div ref={wrapRef} className={`floating-field has-prefix ${className}`}>
            <button
                type="button"
                className={`prefix-trigger ${open ? "active" : ""}`}
                onClick={toggleOpen}
                aria-label="Seleccionar país"
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span className="prefix-flag">{country.flag}</span>
                <span className="prefix-code">{country.code}</span>
                <svg className="prefix-chevron" width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 11L3 6h10l-5 5z" />
                </svg>
            </button>
            <input
                type="tel"
                className={`input-pill ${value ? "has-value" : ""}`}
                value={value}
                onChange={(e) => onChange?.(formatPhone(e.target.value))}
                placeholder="--- --- ----"
                maxLength={12}
                inputMode="numeric"
                autoComplete="off"
            />
            {label && (
                <label className="floating-label">
                    {label}
                    {required && <span className="req">*</span>}
                </label>
            )}
            <div className={`country-popover ${open ? "active" : ""}`} role="listbox">
                <input
                    type="text"
                    className="country-search-input"
                    placeholder="Buscar país..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoComplete="off"
                />
                <div className="country-list">
                    {filtered.map((c) => (
                        <div
                            key={c.iso}
                            role="option"
                            aria-selected={c.iso === country.iso}
                            className={`country-item ${c.iso === country.iso ? "selected" : ""}`}
                            onClick={() => select(c)}
                        >
                            <span className="country-item-left">
                                <span>{c.flag}</span>
                                <span>{c.name}</span>
                            </span>
                            <span className="country-item-code">{c.code}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
