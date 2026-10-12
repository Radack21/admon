export default function MetricBar({ label, value = 0, text, valueLabel, className = "" }) {
    const pct = Math.max(0, Math.min(100, Number(value) || 0));
    const right = valueLabel !== undefined ? valueLabel : `${pct}%`;

    const content = (
        <div className="bar-text-layer">
            <span>{text}</span>
            <span>{right}</span>
        </div>
    );

    return (
        <div className={`progress-section-block ${className}`}>
            {label && <span className="progress-section-label">{label}</span>}
            <div className="progress-bar-1a">
                {content}
                <div className="bar-fill-layer" style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}>
                    {content}
                </div>
            </div>
        </div>
    );
}
