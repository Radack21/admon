export default function SavingOverlay({
    show = false,
    title = "Guardando información...",
    description = "Procesando cambios.",
    onClose,
    className = "",
}) {
    return (
        <div className={`modal-loading-overlay ${show ? "active" : ""} ${className}`} aria-hidden={!show}>
            {onClose && (
                <button
                    type="button"
                    className="btn-close icon-btn delete-btn modal-loading-close"
                    onClick={onClose}
                    aria-label="Volver al formulario"
                    data-tooltip="Volver al formulario"
                    data-tooltip-align="left"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            )}
            <div className="loading-card-a">
                <div className="spinner-outer-a" />
                <div>
                    <div className="loading-title">{title}</div>
                    <div className="loading-desc">{description}</div>
                </div>
            </div>
        </div>
    );
}
