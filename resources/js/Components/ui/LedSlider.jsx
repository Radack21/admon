import { useEffect, useState } from "react";

export default function LedSlider({
    label = "Descuento autorizado",
    value = 0,
    onChange,
    min = 0,
    max = 100,
    blocks = 16,
    className = "",
}) {
    const [dragging, setDragging] = useState(false);

    const pct = Math.max(min, Math.min(max, Number(value) || 0));
    const ratio = (pct - min) / (max - min || 1);
    const handleLeft = `calc(44px + (100% - 88px) * ${ratio})`;
    const leftOpacity = pct < 12 ? (pct / 12) * 0.4 : 0.4;
    const rightOpacity = pct > 88 ? ((100 - pct) / 12) * 0.4 : 0.4;

    useEffect(() => {
        if (!dragging) return;
        const up = () => setDragging(false);
        window.addEventListener("pointerup", up);
        return () => window.removeEventListener("pointerup", up);
    }, [dragging]);

    const blocksArray = Array.from({ length: blocks });

    return (
        <div className={`slider-block-wrapper ${className}`}>
            <div className={`led-integral-container ${dragging ? "active-drag" : ""}`}>
                <span className="floating-label">{label}</span>
                <span className="internal-limit left" style={{ opacity: leftOpacity }}>
                    {min}%
                </span>
                <span className="internal-limit right" style={{ opacity: rightOpacity }}>
                    {max}%
                </span>
                <div className="led-grid-bg">
                    {blocksArray.map((_, i) => (
                        <div className="led-block" key={i} />
                    ))}
                </div>
                <div className="led-grid-active" style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}>
                    {blocksArray.map((_, i) => (
                        <div className="led-block" key={i} />
                    ))}
                </div>
                <div className="handle-dial" style={{ left: handleLeft }}>
                    <span className="handle-val">{pct}%</span>
                </div>
                <input
                    type="range"
                    className="range-led-input"
                    min={min}
                    max={max}
                    value={pct}
                    onChange={(e) => onChange?.(Number(e.target.value))}
                    onPointerDown={() => setDragging(true)}
                    aria-label={label}
                />
            </div>
        </div>
    );
}
