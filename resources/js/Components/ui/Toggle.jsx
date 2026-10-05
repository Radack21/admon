export default function Toggle({ label, checked, onChange, onLabel = "Sí", offLabel = "No", ...rest }) {
    return (
        <label className="toggle-row">
            <input type="checkbox" checked={checked} onChange={onChange} {...rest} />
            <span className="pill-segment-track">
                <span className="pill-segment-thumb" />
                <span className="pill-segment-options">
                    <span className="pill-opt opt-no">{offLabel}</span>
                    <span className="pill-opt opt-si">{onLabel}</span>
                </span>
            </span>
            {label && <span className="toggle-label">{label}</span>}
        </label>
    );
}
