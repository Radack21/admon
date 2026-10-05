export default function Checkbox({ label, checked, onChange, ...rest }) {
    return (
        <label className="chk-row">
            <span className="chk-box-wrap">
                <input type="checkbox" checked={checked} onChange={onChange} {...rest} />
                <span className="chk-box">
                    <svg viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </span>
            </span>
            {label && <span className="chk-text">{label}</span>}
        </label>
    );
}
