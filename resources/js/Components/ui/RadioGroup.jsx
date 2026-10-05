export default function RadioGroup({ name, options = [], value, onChange }) {
    return (
        <div className="radio-group" role="radiogroup">
            {options.map((o) => (
                <label key={o.value} className="radio-row">
                    <input
                        type="radio"
                        name={name}
                        value={o.value}
                        checked={String(value) === String(o.value)}
                        onChange={() => onChange?.(o.value)}
                    />
                    <span className="radio-box" />
                    <span className="radio-text">{o.label}</span>
                </label>
            ))}
        </div>
    );
}
