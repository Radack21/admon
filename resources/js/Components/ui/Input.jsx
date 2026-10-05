export default function Input({
    label,
    icon = null,
    invalid = false,
    required = false,
    value,
    onChange,
    type = "text",
    className = "",
    ...rest
}) {
    const hasValue = value !== undefined && value !== null && String(value).length > 0;

    return (
        <div className={`floating-field ${icon ? "has-icon-left" : ""} ${className}`}>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder=" "
                className={`input-pill ${icon ? "has-icon-left" : ""} ${hasValue ? "has-value" : ""} ${invalid ? "invalid" : ""}`}
                {...rest}
            />
            {icon && <div className="input-icon-left">{icon}</div>}
            {label && (
                <label className="floating-label">
                    {label}
                    {required && <span className="req">*</span>}
                </label>
            )}
        </div>
    );
}
