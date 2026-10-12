import { useEffect, useRef, useState } from "react";

function hslToRgb(h, s, l) {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color);
    };
    return [f(0), f(8), f(4)];
}

function toHex(r, g, b) {
    return `#${[r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}

export default function ColorPicker({ label = "Color identificador", onChange, className = "" }) {
    const [h, setH] = useState(24);
    const [s, setS] = useState(0.85);
    const [v, setV] = useState(0.92);
    const [a, setA] = useState(1);
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const wrapRef = useRef(null);
    const canvasRef = useRef(null);
    const dragging = useRef(false);

    const [r, g, b] = hslToRgb(h, s * 100, (v * (2 - s)) * 50 || 1);
    const colorStr = a < 1 ? `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})` : toHex(r, g, b);

    useEffect(() => {
        onChange?.(colorStr);
    }, [colorStr]);

    useEffect(() => {
        const onDocClick = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
        };
        const onKey = (e) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("click", onDocClick);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("click", onDocClick);
            document.removeEventListener("keydown", onKey);
        };
    }, []);

    const updateFromPointer = (e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
        const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
        setS(x / rect.width);
        setV(1 - y / rect.height);
    };

    useEffect(() => {
        const onMove = (e) => {
            if (dragging.current) updateFromPointer(e);
        };
        const onUp = () => {
            dragging.current = false;
        };
        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
        return () => {
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", onUp);
        };
    }, []);

    const copy = () => {
        navigator.clipboard?.writeText(colorStr);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div ref={wrapRef} className={`color-picker-component ${className}`}>
            <button
                type="button"
                className={`color-picker-trigger ${open ? "active" : ""}`}
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen((o) => !o);
                }}
                aria-haspopup="dialog"
                aria-expanded={open}
            >
                <span className="floating-label">{label}</span>
                <span className="swatch-preview-circle" style={{ backgroundColor: colorStr }} />
                <span className="color-code-label">{colorStr}</span>
                <svg className="chevron-arrow-filled" viewBox="0 0 24 24">
                    <path d="M7 10l5 5 5-5H7z" />
                </svg>
            </button>
            <div
                className={`color-popover-panel ${open ? "open" : ""}`}
                role="dialog"
                aria-label="Selector de color"
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    ref={canvasRef}
                    className="hsv-canvas-2d"
                    style={{ backgroundColor: `hsl(${h}, 100%, 50%)` }}
                    onPointerDown={(e) => {
                        dragging.current = true;
                        updateFromPointer(e);
                    }}
                >
                    <div
                        className="canvas-crosshair"
                        style={{ left: `${s * 100}%`, top: `${(1 - v) * 100}%` }}
                    />
                </div>
                <div className="slider-row hue-gradient-bg">
                    <input
                        type="range"
                        className="custom-color-slider"
                        min="0"
                        max="360"
                        value={h}
                        onChange={(e) => setH(parseFloat(e.target.value))}
                        aria-label="Tono de color"
                    />
                </div>
                <div className="slider-row alpha-checker-bg">
                    <div
                        className="alpha-overlay-track"
                        style={{ background: `linear-gradient(to right, transparent, hsl(${h}, 100%, 50%))` }}
                    />
                    <input
                        type="range"
                        className="custom-color-slider"
                        min="0"
                        max="100"
                        value={a * 100}
                        onChange={(e) => setA(parseFloat(e.target.value) / 100)}
                        aria-label="Opacidad del color"
                    />
                </div>
                <div className="popover-footer-row">
                    <input
                        type="text"
                        className="hex-output-field"
                        value={colorStr}
                        maxLength={25}
                        readOnly
                        aria-label="Código hexadecimal del color"
                    />
                    <button type="button" className="copy-action-btn" onClick={copy}>
                        {copied ? "¡Copiado!" : "Copiar"}
                    </button>
                </div>
            </div>
        </div>
    );
}
