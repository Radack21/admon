import { useEffect, useRef, useState } from "react";

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const MINUTES = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, "0"));

function splitValue(value) {
    const match = /^(\d{2}):(\d{2})$/.exec(value || "");
    return match ? [match[1], match[2]] : null;
}

export default function TimeInput({
    label,
    value,
    onChange,
    required = false,
    placeholder = "--:--",
    className = "",
}) {
    const [open, setOpen] = useState(false);
    const wrapRef = useRef(null);
    const hoursRef = useRef(null);
    const minutesRef = useRef(null);

    const parsed = splitValue(value);
    const activeHour = parsed ? parsed[0] : "09";
    const activeMinute = parsed ? parsed[1] : "00";

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

    useEffect(() => {
        if (!open) return;
        const hEl = hoursRef.current?.querySelector(".selected");
        const mEl = minutesRef.current?.querySelector(".selected");
        if (hEl && hoursRef.current) hoursRef.current.scrollTop = hEl.offsetTop - hoursRef.current.offsetTop - 60;
        if (mEl && minutesRef.current) minutesRef.current.scrollTop = mEl.offsetTop - minutesRef.current.offsetTop - 60;
    }, [open]);

    const handleChange = (e) => {
        let v = e.target.value.replace(/\D/g, "");
        if (v.length > 4) v = v.slice(0, 4);
        if (v.length >= 2 && parseInt(v.slice(0, 2), 10) > 23) v = "23" + v.slice(2);
        if (v.length >= 4 && parseInt(v.slice(2, 4), 10) > 59) v = v.slice(0, 2) + "59";

        let out;
        if (v.length >= 3) out = v.slice(0, 2) + ":" + v.slice(2);
        else if (v.length === 2) out = v.slice(0, 2) + ":";
        else out = v;

        onChange?.(out);
        if (v.length === 4) setOpen(false);
    };

    const handleBlur = () => {
        const digits = (value || "").replace(/\D/g, "");
        if (!digits) {
            onChange?.("");
            return;
        }
        let h = 0;
        let m = 0;
        if (digits.length <= 2) h = parseInt(digits, 10) || 0;
        else if (digits.length === 3) {
            h = parseInt(digits.slice(0, 1), 10) || 0;
            m = parseInt(digits.slice(1), 10) || 0;
        } else {
            h = parseInt(digits.slice(0, 2), 10) || 0;
            m = parseInt(digits.slice(2, 4), 10) || 0;
        }
        if (h > 23) h = 23;
        if (m > 59) m = 59;
        onChange?.(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    };

    const pickHour = (h) => onChange?.(`${h}:${activeMinute}`);
    const pickMinute = (m) => {
        onChange?.(`${activeHour}:${m}`);
        setOpen(false);
    };

    const hasValue = !!value;

    return (
        <div ref={wrapRef} className={`floating-field has-icon-left ${className}`}>
            <input
                type="text"
                className={`input-pill has-icon-left ${hasValue ? "has-value" : ""}`}
                value={value}
                onChange={handleChange}
                onFocus={() => setOpen(true)}
                onBlur={handleBlur}
                placeholder={placeholder}
                maxLength={5}
                inputMode="numeric"
                autoComplete="off"
            />
            <div className="input-icon-left">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>
            </div>
            {label && (
                <label className="floating-label">
                    {label}
                    {required && <span className="req">*</span>}
                </label>
            )}
            <div className={`popover-minimal ${open ? "active" : ""}`}>
                <div className="columns-header">
                    <span>Hora</span>
                    <span>Minuto</span>
                </div>
                <div className="columns-body">
                    <div className="column-list" ref={hoursRef}>
                        {HOURS.map((h) => (
                            <button
                                type="button"
                                key={h}
                                className={`column-item ${h === activeHour ? "selected" : ""}`}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => pickHour(h)}
                            >
                                {h}
                            </button>
                        ))}
                    </div>
                    <div className="column-list" ref={minutesRef}>
                        {MINUTES.map((m) => (
                            <button
                                type="button"
                                key={m}
                                className={`column-item ${m === activeMinute ? "selected" : ""}`}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => pickMinute(m)}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
