export default function Stepper({ label, value, onChange, min = 0, max = 99, step = 1 }) {
    const clamp = (v) => Math.min(max, Math.max(min, v));
    const dec = () => onChange?.(clamp(Number(value) - step));
    const inc = () => onChange?.(clamp(Number(value) + step));

    return (
        <div className="floating-field">
            <input
                type="number"
                className={`input-pill has-stepper ${value !== "" ? "has-value" : ""}`}
                value={value}
                onChange={(e) => onChange?.(clamp(Number(e.target.value) || 0))}
                placeholder=" "
                min={min}
                max={max}
                step={step}
            />
            {label && <label className="floating-label">{label}</label>}
            <div className="stepper-controls">
                <button
                    type="button"
                    className="step-btn"
                    disabled={Number(value) <= min}
                    onClick={dec}
                    aria-label="Disminuir"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </button>
                <span className="stepper-divider" />
                <button
                    type="button"
                    className="step-btn"
                    disabled={Number(value) >= max}
                    onClick={inc}
                    aria-label="Aumentar"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
