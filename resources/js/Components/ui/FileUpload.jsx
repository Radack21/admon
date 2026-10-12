import { useEffect, useRef, useState } from "react";

const ICON_UPLOAD = (
    <svg className="upload-icon" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
);

const ICON_FOLDER = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent)", flexShrink: 0 }}>
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
);

const ICON_EYE = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const ICON_X = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const ICON_CHEVRON = (
    <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 11L3 6h10l-5 5z" />
    </svg>
);

function formatFileSize(bytes) {
    if (!bytes) return "0 KB";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function getExt(name) {
    return name.split(".").pop().toLowerCase();
}

export default function FileUpload({
    label,
    required = false,
    multiple = false,
    accept,
    placeholder,
    onChange,
    className = "",
}) {
    const [files, setFiles] = useState([]);
    const [dragging, setDragging] = useState(false);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const inputRef = useRef(null);
    const appendRef = useRef(null);
    const wrapRef = useRef(null);

    const hasFile = files.length > 0;
    const defaultPlaceholder = multiple
        ? "Arrastra o selecciona uno o varios archivos..."
        : "Arrastra o selecciona tu archivo...";

    useEffect(() => {
        onChange?.(files);
    }, [files]);

    useEffect(() => {
        const onDocClick = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) setPopoverOpen(false);
        };
        document.addEventListener("click", onDocClick);
        return () => document.removeEventListener("click", onDocClick);
    }, []);

    const addFiles = (fileList) => {
        const arr = Array.from(fileList || []);
        if (!arr.length) return;
        setFiles((prev) => (multiple ? [...prev, ...arr] : [arr[0]]));
    };

    const handleInput = (e) => {
        addFiles(e.target.files);
        e.target.value = "";
    };

    const openPicker = () => inputRef.current?.click();

    const onBarClick = () => {
        if (multiple && hasFile) setPopoverOpen((o) => !o);
        else if (!hasFile) openPicker();
    };

    const onDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        addFiles(e.dataTransfer.files);
    };

    const viewFile = (file, e) => {
        e?.stopPropagation();
        const url = URL.createObjectURL(file);
        window.open(url, "_blank");
    };

    const removeAt = (index, e) => {
        e?.stopPropagation();
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const clearAll = (e) => {
        e?.stopPropagation();
        setFiles([]);
        setPopoverOpen(false);
    };

    const totalSize = files.reduce((acc, f) => acc + f.size, 0);

    return (
        <div ref={wrapRef} className={`file-upload-wrapper ${hasFile ? "has-value" : ""} ${className}`}>
            <input
                ref={inputRef}
                type="file"
                className="file-upload-input"
                accept={accept}
                multiple={multiple}
                onChange={handleInput}
            />
            <input
                ref={appendRef}
                type="file"
                className="file-upload-input"
                accept={accept}
                multiple
                onChange={handleInput}
            />
            {label && (
                <label className="floating-label">
                    {label}
                    {required && <span className="req">*</span>}
                </label>
            )}
            <div
                className={`file-upload-bar ${hasFile ? "has-file" : ""} ${dragging ? "dragover" : ""}`}
                onClick={onBarClick}
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                }}
                onDragLeave={(e) => {
                    e.preventDefault();
                    setDragging(false);
                }}
                onDrop={onDrop}
            >
                <div className="file-info-group">
                    {!hasFile ? (
                        <>
                            {ICON_UPLOAD}
                            <span className="file-text-placeholder">{placeholder || defaultPlaceholder}</span>
                        </>
                    ) : multiple ? (
                        <>
                            {ICON_FOLDER}
                            <span className="file-text-main">
                                {files.length} archivo(s) adjunto(s){" "}
                                <span style={{ color: "var(--text-muted)", fontSize: 11 }}>({formatFileSize(totalSize)})</span>
                            </span>
                        </>
                    ) : (
                        <>
                            <div className="file-badge">{getExt(files[0].name)}</div>
                            <span className="file-text-main">
                                {files[0].name}{" "}
                                <span style={{ color: "var(--text-muted)", fontSize: 11 }}>({formatFileSize(files[0].size)})</span>
                            </span>
                        </>
                    )}
                </div>
                <div className="action-group">
                    {!hasFile ? (
                        <button
                            type="button"
                            className="file-action-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                openPicker();
                            }}
                        >
                            Examinar
                        </button>
                    ) : multiple ? (
                        <>
                            <button
                                type="button"
                                className="file-action-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    appendRef.current?.click();
                                }}
                            >
                                + Añadir
                            </button>
                            <button
                                type="button"
                                className="file-action-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setPopoverOpen((o) => !o);
                                }}
                            >
                                <span>Ver</span>
                                {ICON_CHEVRON}
                            </button>
                        </>
                    ) : (
                        <>
                            <button type="button" className="icon-btn view-btn" title="Ver / Descargar archivo" onClick={(e) => viewFile(files[0], e)}>
                                {ICON_EYE}
                            </button>
                            <button type="button" className="icon-btn delete-btn" title="Eliminar archivo" onClick={(e) => clearAll(e)}>
                                {ICON_X}
                            </button>
                        </>
                    )}
                </div>
            </div>
            {multiple && (
                <div className={`files-popover ${popoverOpen ? "active" : ""}`}>
                    <div className="files-popover-list">
                        {files.map((file, index) => (
                            <div className="files-popover-item" key={`${file.name}-${index}`}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                                    <div className="file-badge">{getExt(file.name)}</div>
                                    <span className="file-text-main" style={{ maxWidth: 180 }}>
                                        {file.name}
                                    </span>
                                    <span style={{ fontSize: 10.5, color: "var(--text-muted)", flexShrink: 0 }}>
                                        {formatFileSize(file.size)}
                                    </span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    <button type="button" className="icon-btn view-btn" title="Ver / Descargar" onClick={(e) => viewFile(file, e)}>
                                        {ICON_EYE}
                                    </button>
                                    <button type="button" className="icon-btn delete-btn" title="Eliminar" onClick={(e) => removeAt(index, e)}>
                                        {ICON_X}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="files-popover-footer">
                        <button
                            type="button"
                            className="btn-add-more-link"
                            onClick={(e) => {
                                e.stopPropagation();
                                appendRef.current?.click();
                            }}
                        >
                            + Añadir archivo
                        </button>
                        <span style={{ color: "var(--text-muted)" }}>{formatFileSize(totalSize)} total</span>
                        <button type="button" className="btn-clear-all" onClick={clearAll}>
                            Vaciar todos
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
