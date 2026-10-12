import { useRef, useState } from "react";

const EMPTY_ICON = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
    </svg>
);

export default function MediaUploader({ label = "Evidencia", className = "" }) {
    const [slides, setSlides] = useState([]);
    const [index, setIndex] = useState(0);
    const camRef = useRef(null);
    const browseRef = useRef(null);
    const appendRef = useRef(null);
    const replaceRef = useRef(null);

    const addFiles = (files) => {
        const arr = Array.from(files || []);
        if (!arr.length) return;
        const next = arr.map((f) => ({ url: URL.createObjectURL(f), name: f.name }));
        setSlides((prev) => {
            const merged = [...prev, ...next];
            setIndex(merged.length - next.length);
            return merged;
        });
    };

    const handleInput = (e) => {
        addFiles(e.target.files);
        e.target.value = "";
    };

    const replaceCurrent = (e) => {
        const file = e.target.files?.[0];
        e.target.value = "";
        if (!file) return;
        setSlides((prev) => prev.map((s, i) => (i === index ? { url: URL.createObjectURL(file), name: file.name } : s)));
    };

    const deleteCurrent = () => {
        setSlides((prev) => {
            const next = prev.filter((_, i) => i !== index);
            setIndex((idx) => Math.max(0, Math.min(idx, next.length - 1)));
            return next;
        });
    };

    const move = (dir) => setIndex((i) => Math.max(0, Math.min(slides.length - 1, i + dir)));

    const hasSlides = slides.length > 0;
    const current = slides[index];

    return (
        <div className={`flex flex-col gap-5 ${className}`}>
            <input ref={camRef} type="file" accept="image/*" capture="environment" className="ficha-hidden-input" onChange={handleInput} />
            <input ref={browseRef} type="file" accept="image/*" className="ficha-hidden-input" onChange={handleInput} />
            <input ref={appendRef} type="file" accept="image/*" multiple className="ficha-hidden-input" onChange={handleInput} />
            <input ref={replaceRef} type="file" accept="image/*" className="ficha-hidden-input" onChange={replaceCurrent} />

            <div className={`photo-capsule-split ${current ? "has-file" : ""}`}>
                <span className="ficha-photo-floating-label">{label}</span>
                <span className="capsule-status-text">{current ? current.name : "Sin captura"}</span>
                <div className="split-actions-container">
                    <button type="button" className="split-btn" onClick={() => camRef.current?.click()}>
                        Cámara
                    </button>
                    <button type="button" className="split-btn primary" onClick={() => browseRef.current?.click()}>
                        Archivo
                    </button>
                </div>
            </div>

            <div className="ficha-carousel-container">
                <div className="ficha-carousel-wrapper">
                    {!hasSlides ? (
                        <div className="ficha-slide-empty-state" onClick={() => browseRef.current?.click()}>
                            <div className="ficha-empty-icon-circle">{EMPTY_ICON}</div>
                            <div className="ficha-empty-title">Sin evidencia adjunta</div>
                            <div className="ficha-empty-subtitle">Arrastra tu imagen o haz clic para subir</div>
                        </div>
                    ) : (
                        <>
                            <div className="ficha-carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
                                {slides.map((s) => (
                                    <div className="ficha-carousel-slide" key={s.url}>
                                        <img src={s.url} alt={s.name} />
                                    </div>
                                ))}
                            </div>
                            <div className="ficha-slide-actions-capsule">
                                <button type="button" className="ficha-action-icon-btn" title="Añadir diapositiva" onClick={() => appendRef.current?.click()}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19" />
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                </button>
                                <button type="button" className="ficha-action-icon-btn" title="Cambiar esta imagen" onClick={() => replaceRef.current?.click()}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                        <path d="M3 3v5h5" />
                                        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                                        <path d="M16 16h5v5" />
                                    </svg>
                                </button>
                                <button type="button" className="ficha-action-icon-btn delete-btn" title="Eliminar imagen" onClick={deleteCurrent}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                    </svg>
                                </button>
                            </div>
                            <button
                                className="ficha-invisible-arrow left"
                                onClick={() => move(-1)}
                                disabled={index === 0}
                                aria-label="Anterior"
                            >
                                <span className="ficha-arrow-icon-wrapper">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="15 18 9 12 15 6" />
                                    </svg>
                                </span>
                            </button>
                            <button
                                className="ficha-invisible-arrow right"
                                onClick={() => move(1)}
                                disabled={index === slides.length - 1}
                                aria-label="Siguiente"
                            >
                                <span className="ficha-arrow-icon-wrapper">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </span>
                            </button>
                            <div className="ficha-dots-container">
                                {slides.map((s, i) => (
                                    <button
                                        key={s.url}
                                        type="button"
                                        className={`ficha-dot ${i === index ? "active" : ""}`}
                                        onClick={() => setIndex(i)}
                                        aria-label={`Ir a la imagen ${i + 1}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
