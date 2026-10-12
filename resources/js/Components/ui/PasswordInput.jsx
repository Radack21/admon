import { useRef, useState } from "react";

const ICON_LOCK = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

const ICON_EYE_OFF = (
    <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
    </>
);

const ICON_EYE = (
    <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </>
);

export default function PasswordInput({
    label,
    value,
    onChange,
    required = false,
    placeholder = "Ingresa tu contraseña",
    className = "",
}) {
    const [show, setShow] = useState(false);
    const [capsOn, setCapsOn] = useState(false);
    const inputRef = useRef(null);

    const syncCaps = (e) => {
        if (e && typeof e.getModifierState === "function") {
            setCapsOn(e.getModifierState("CapsLock"));
        }
    };

    const toggleShow = () => {
        setShow((s) => !s);
        inputRef.current?.focus();
    };

    const hasValue = value !== undefined && value !== null && String(value).length > 0;

    return (
        <div className={`floating-field has-icon-left ${className}`}>
            <input
                ref={inputRef}
                type={show ? "text" : "password"}
                className={`input-pill has-icon-left password-pill ${hasValue ? "has-value" : ""}`}
                value={value}
                onChange={onChange}
                onKeyDown={syncCaps}
                onKeyUp={syncCaps}
                onFocus={syncCaps}
                onBlur={() => setCapsOn(false)}
                placeholder={placeholder}
                autoComplete="current-password"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
            />
            <div className="input-icon-left">{ICON_LOCK}</div>
            {label && (
                <label className="floating-label">
                    {label}
                    {required && <span className="req">*</span>}
                </label>
            )}
            <div className="right-action-wrapper">
                <div
                    className={`caps-indicator ${capsOn ? "active" : ""}`}
                    data-tooltip="Bloqueo de Mayúsculas activo"
                >
                    <svg viewBox="0 0 24 24">
                        <path d="M12 3L4 11H9V16H15V11H20L12 3Z" />
                        <path d="M4 18H20V20H4V18Z" />
                    </svg>
                    <span>Mayús</span>
                </div>
                <button
                    type="button"
                    className="toggle-eye-btn"
                    onClick={toggleShow}
                    aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
                    data-tooltip="Mostrar/Ocultar contraseña"
                    data-tooltip-align="left"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        {show ? ICON_EYE : ICON_EYE_OFF}
                    </svg>
                </button>
            </div>
        </div>
    );
}
