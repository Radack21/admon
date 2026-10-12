export default function RowActions({ onView, onEdit, onTimeline, onDelete }) {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
            <button
                type="button"
                className="icon-btn view-btn"
                data-tooltip="Ver ficha técnica"
                aria-label="Ver"
                onClick={onView}
            >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
            </button>
            <button
                type="button"
                className="icon-btn edit-btn"
                data-tooltip="Editar registro"
                aria-label="Editar"
                onClick={onEdit}
            >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                </svg>
            </button>
            <button
                type="button"
                className="icon-btn timeline-btn"
                data-tooltip="Ver historial"
                aria-label="Historial"
                onClick={onTimeline}
            >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>
            </button>
            <button
                type="button"
                className="icon-btn delete-btn"
                data-tooltip="Eliminar cliente"
                data-tooltip-align="left"
                aria-label="Eliminar"
                onClick={onDelete}
            >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
            </button>
        </div>
    );
}
