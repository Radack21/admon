const CIRCUMFERENCE = 219.9;

export default function MetricDonut({ label, value = 0, sub = "Calidad", title, description, className = "" }) {
    const pct = Math.max(0, Math.min(100, Number(value) || 0));
    const offset = CIRCUMFERENCE * (1 - pct / 100);

    return (
        <div className={`progress-section-block ${className}`}>
            {label && <span className="progress-section-label">{label}</span>}
            <div className="progress-donut-1b">
                <div className="donut-gauge-1b">
                    <svg className="donut-svg-1b" viewBox="0 0 80 80">
                        <circle className="donut-bg-1b" cx="40" cy="40" r="35" />
                        <circle
                            className="donut-meter-1b"
                            cx="40"
                            cy="40"
                            r="35"
                            style={{ strokeDashoffset: offset }}
                        />
                    </svg>
                    <div className="donut-center-1b">
                        <span className="donut-percent-1b">{pct}%</span>
                        <span className="donut-sub-1b">{sub}</span>
                    </div>
                </div>
                <div className="donut-info-1b">
                    <span className="donut-title-1b">{title}</span>
                    <span className="donut-desc-1b">{description}</span>
                </div>
            </div>
        </div>
    );
}
