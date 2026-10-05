export default function Textarea({
    label,
    required = false,
    invalid = false,
    value,
    onChange,
    className = "",
    ...rest
}) {
    const hasValue = value !== undefined && value !== null && String(value).length > 0;

    return (
        <div className={`floating-field ${className}`}>
            <textarea
                value={value}
                onChange={onChange}
                placeholder=" "
                className={`input-pill ${hasValue ? "has-value" : ""} ${invalid ? "invalid" : ""}`}
                {...rest}
            />
            {label && (
                <label className="floating-label">
                    {label}
                    {required && <span className="req">*</span>}
                </label>
            )}
        </div>
    );
}
