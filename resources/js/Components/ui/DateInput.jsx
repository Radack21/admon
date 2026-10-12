import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(customParseFormat);
dayjs.extend(localeData);
dayjs.locale("es");

const WEEKDAYS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];

const ICON_CALENDAR = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

function Chevron({ dir }) {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {dir === "prev" ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
        </svg>
    );
}

export default function DateInput({
    label,
    value,
    onChange,
    required = false,
    placeholder = "--/--/----",
    className = "",
    minYear = 1990,
    maxYear = dayjs().year() + 10,
}) {
    const [open, setOpen] = useState(false);
    const [view, setView] = useState(() => {
        const parsed = dayjs(value, "DD/MM/YYYY", true);
        return parsed.isValid() ? parsed.startOf("month") : dayjs().startOf("month");
    });
    const wrapRef = useRef(null);

    const parsed = dayjs(value, "DD/MM/YYYY", true);
    const hasValue = parsed.isValid();

    useEffect(() => {
        const onDocClick = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
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

    const handleFocus = () => {
        if (hasValue) setView(parsed.startOf("month"));
        setOpen(true);
    };

    const handleChange = (e) => {
        let v = e.target.value.replace(/\D/g, "");
        if (v.length > 8) v = v.slice(0, 8);

        let out;
        if (v.length >= 5) out = `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
        else if (v.length >= 4) out = `${v.slice(0, 2)}/${v.slice(2, 4)}/`;
        else if (v.length >= 3) out = `${v.slice(0, 2)}/${v.slice(2)}`;
        else if (v.length === 2) out = `${v.slice(0, 2)}/`;
        else out = v;

        onChange?.(out);
    };

    const startOfMonth = view.startOf("month");
    const leading = (startOfMonth.day() + 6) % 7;
    const daysInMonth = view.daysInMonth();

    const cells = [];
    for (let i = 0; i < leading; i++) {
        cells.push({ date: startOfMonth.subtract(leading - i, "day"), outside: true });
    }
    for (let d = 1; d <= daysInMonth; d++) {
        cells.push({ date: view.date(d), outside: false });
    }
    while (cells.length < 42) {
        const last = cells[cells.length - 1].date;
        cells.push({ date: last.add(1, "day"), outside: true });
    }

    const years = [];
    for (let y = minYear; y <= maxYear; y++) years.push(y);

    const selectDay = (date) => {
        onChange?.(date.format("DD/MM/YYYY"));
        setOpen(false);
    };

    return (
        <div ref={wrapRef} className={`floating-field has-icon-left ${className}`}>
            <input
                type="text"
                className={`input-pill has-icon-left ${hasValue ? "has-value" : ""}`}
                value={value}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder={placeholder}
                maxLength={10}
                inputMode="numeric"
                autoComplete="off"
            />
            <div className="input-icon-left">{ICON_CALENDAR}</div>
            {label && (
                <label className="floating-label">
                    {label}
                    {required && <span className="req">*</span>}
                </label>
            )}
            <div className={`date-popover ${open ? "active" : ""}`}>
                <div className="date-nav">
                    <button
                        type="button"
                        className="date-nav-btn"
                        aria-label="Mes anterior"
                        onClick={() => setView((v) => v.subtract(1, "month"))}
                    >
                        <Chevron dir="prev" />
                    </button>
                    <div className="date-selectors">
                        <select
                            className="date-select"
                            value={view.month()}
                            onChange={(e) => setView((v) => v.month(Number(e.target.value)))}
                            aria-label="Mes"
                        >
                            {dayjs.months().map((m, i) => (
                                <option key={m} value={i}>
                                    {m}
                                </option>
                            ))}
                        </select>
                        <select
                            className="date-select"
                            value={view.year()}
                            onChange={(e) => setView((v) => v.year(Number(e.target.value)))}
                            aria-label="Año"
                        >
                            {years.map((y) => (
                                <option key={y} value={y}>
                                    {y}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="button"
                        className="date-nav-btn"
                        aria-label="Mes siguiente"
                        onClick={() => setView((v) => v.add(1, "month"))}
                    >
                        <Chevron dir="next" />
                    </button>
                </div>
                <div className="date-weekdays">
                    {WEEKDAYS.map((w) => (
                        <span key={w} className="date-weekday">
                            {w}
                        </span>
                    ))}
                </div>
                <div className="date-grid">
                    {cells.map(({ date, outside }) => {
                        const isToday = date.isSame(dayjs(), "day");
                        const isSelected = hasValue && date.isSame(parsed, "day");
                        return (
                            <button
                                type="button"
                                key={date.format("YYYY-MM-DD")}
                                className={`date-cell ${outside ? "outside" : ""} ${isToday ? "today" : ""} ${
                                    isSelected ? "selected" : ""
                                }`}
                                onClick={() => selectDay(date)}
                            >
                                {date.date()}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
