import { useEffect, useRef, useState } from "react";

const BLOCK_FORMATS = [
    { tag: "<p>", label: "Párrafo" },
    { tag: "<h1>", label: "Título H1" },
    { tag: "<h2>", label: "Subtítulo H2" },
    { tag: "<h3>", label: "Encabezado H3" },
    { tag: "blockquote", label: "Cita textual" },
];

const SYNC_CMDS = [
    "bold",
    "italic",
    "underline",
    "justifyLeft",
    "justifyCenter",
    "justifyRight",
    "justifyFull",
    "insertUnorderedList",
    "insertOrderedList",
];

export default function RichTextEditor({
    placeholder = "Escriba aquí la descripción detallada...",
    className = "",
}) {
    const editorRef = useRef(null);
    const [formatOpen, setFormatOpen] = useState(false);
    const [formatLabel, setFormatLabel] = useState("Párrafo");
    const [active, setActive] = useState({});

    const sync = () => {
        const next = {};
        SYNC_CMDS.forEach((cmd) => {
            try {
                next[cmd] = document.queryCommandState(cmd);
            } catch {
                next[cmd] = false;
            }
        });
        setActive(next);
    };

    useEffect(() => {
        document.addEventListener("selectionchange", sync);
        const onDocClick = (e) => {
            if (!(e.target instanceof Element) || !e.target.closest(".rte-select-capsule")) setFormatOpen(false);
        };
        document.addEventListener("click", onDocClick);
        return () => {
            document.removeEventListener("selectionchange", sync);
            document.removeEventListener("click", onDocClick);
        };
    }, []);

    const run = (cmd) => {
        editorRef.current?.focus();
        document.execCommand(cmd, false, null);
        sync();
    };

    const block = (tag) => {
        editorRef.current?.focus();
        document.execCommand("formatBlock", false, tag);
        sync();
    };

    const insertLink = () => {
        editorRef.current?.focus();
        const url = window.prompt("Ingrese la URL del enlace:");
        if (url) document.execCommand("createLink", false, url);
    };

    const insertImage = () => {
        editorRef.current?.focus();
        const url = window.prompt("Ingrese la URL de la imagen:");
        if (url) document.execCommand("insertImage", false, url);
    };

    const Btn = ({ cmd, title, onClick, children }) => (
        <button type="button" className={`rte-btn ${active[cmd] ? "active" : ""}`} title={title} onClick={onClick}>
            {children}
        </button>
    );

    return (
        <div className={`rte-monolithic-container ${className}`}>
            <div className="rte-toolbar-actions">
                <div className="rte-tool-group">
                    <Btn title="Deshacer (Ctrl+Z)" onClick={() => run("undo")}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 7v6h6" />
                            <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
                        </svg>
                    </Btn>
                    <Btn title="Rehacer (Ctrl+Y)" onClick={() => run("redo")}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 7v6h-6" />
                            <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" />
                        </svg>
                    </Btn>
                </div>
                <div className="rte-tool-divider" />
                <div className={`rte-select-capsule ${formatOpen ? "active" : ""}`}>
                    <button
                        type="button"
                        className="rte-select-trigger"
                        onClick={(e) => {
                            e.stopPropagation();
                            setFormatOpen((o) => !o);
                        }}
                    >
                        <span>{formatLabel}</span>
                        <svg className="rte-select-chevron" viewBox="0 0 16 16">
                            <path d="M8 11L3 6h10l-5 5z" />
                        </svg>
                    </button>
                    <div className="rte-select-popover">
                        {BLOCK_FORMATS.map((f) => (
                            <div
                                className="rte-select-option"
                                key={f.label}
                                onClick={() => {
                                    setFormatLabel(f.label);
                                    setFormatOpen(false);
                                    block(f.tag);
                                }}
                            >
                                {f.label}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="rte-tool-divider" />
                <div className="rte-tool-group">
                    <Btn cmd="bold" title="Negrita (Ctrl+B)" onClick={() => run("bold")}>
                        <strong>B</strong>
                    </Btn>
                    <Btn cmd="italic" title="Cursiva (Ctrl+I)" onClick={() => run("italic")}>
                        <em style={{ fontFamily: "serif" }}>I</em>
                    </Btn>
                    <Btn cmd="underline" title="Subrayado (Ctrl+U)" onClick={() => run("underline")}>
                        <span style={{ textDecoration: "underline" }}>U</span>
                    </Btn>
                </div>
                <div className="rte-tool-divider" />
                <div className="rte-tool-group">
                    <Btn cmd="justifyLeft" title="Alinear a la izquierda" onClick={() => run("justifyLeft")}>
                        <svg viewBox="0 0 24 24">
                            <line x1="17" y1="10" x2="3" y2="10" />
                            <line x1="21" y1="6" x2="3" y2="6" />
                            <line x1="21" y1="14" x2="3" y2="14" />
                            <line x1="17" y1="18" x2="3" y2="18" />
                        </svg>
                    </Btn>
                    <Btn cmd="justifyCenter" title="Centrar" onClick={() => run("justifyCenter")}>
                        <svg viewBox="0 0 24 24">
                            <line x1="18" y1="10" x2="6" y2="10" />
                            <line x1="21" y1="6" x2="3" y2="6" />
                            <line x1="21" y1="14" x2="3" y2="14" />
                            <line x1="18" y1="18" x2="6" y2="18" />
                        </svg>
                    </Btn>
                    <Btn cmd="justifyRight" title="Alinear a la derecha" onClick={() => run("justifyRight")}>
                        <svg viewBox="0 0 24 24">
                            <line x1="21" y1="10" x2="7" y2="10" />
                            <line x1="21" y1="6" x2="3" y2="6" />
                            <line x1="21" y1="14" x2="3" y2="14" />
                            <line x1="21" y1="18" x2="7" y2="18" />
                        </svg>
                    </Btn>
                    <Btn cmd="justifyFull" title="Justificar" onClick={() => run("justifyFull")}>
                        <svg viewBox="0 0 24 24">
                            <line x1="21" y1="10" x2="3" y2="10" />
                            <line x1="21" y1="6" x2="3" y2="6" />
                            <line x1="21" y1="14" x2="3" y2="14" />
                            <line x1="21" y1="18" x2="3" y2="18" />
                        </svg>
                    </Btn>
                </div>
                <div className="rte-tool-divider" />
                <div className="rte-tool-group">
                    <Btn cmd="insertUnorderedList" title="Lista viñetas" onClick={() => run("insertUnorderedList")}>
                        <svg viewBox="0 0 24 24">
                            <line x1="8" y1="6" x2="21" y2="6" />
                            <line x1="8" y1="12" x2="21" y2="12" />
                            <line x1="8" y1="18" x2="21" y2="18" />
                            <line x1="3" y1="6" x2="3.01" y2="6" />
                            <line x1="3" y1="12" x2="3.01" y2="12" />
                            <line x1="3" y1="18" x2="3.01" y2="18" />
                        </svg>
                    </Btn>
                    <Btn cmd="insertOrderedList" title="Lista numerada" onClick={() => run("insertOrderedList")}>
                        <svg viewBox="0 0 24 24">
                            <line x1="10" y1="6" x2="21" y2="6" />
                            <line x1="10" y1="12" x2="21" y2="12" />
                            <line x1="10" y1="18" x2="21" y2="18" />
                            <path d="M4 6h1v4" />
                            <path d="M4 10h2" />
                        </svg>
                    </Btn>
                    <Btn title="Disminuir sangría" onClick={() => run("outdent")}>
                        <svg viewBox="0 0 24 24">
                            <polyline points="7 8 3 12 7 16" />
                            <line x1="21" y1="12" x2="11" y2="12" />
                            <line x1="21" y1="6" x2="11" y2="6" />
                            <line x1="21" y1="18" x2="11" y2="18" />
                        </svg>
                    </Btn>
                    <Btn title="Aumentar sangría" onClick={() => run("indent")}>
                        <svg viewBox="0 0 24 24">
                            <polyline points="17 8 21 12 17 16" />
                            <line x1="3" y1="12" x2="13" y2="12" />
                            <line x1="3" y1="6" x2="13" y2="6" />
                            <line x1="3" y1="18" x2="13" y2="18" />
                        </svg>
                    </Btn>
                </div>
                <div className="rte-tool-divider" />
                <div className="rte-tool-group">
                    <Btn title="Insertar enlace" onClick={insertLink}>
                        <svg viewBox="0 0 24 24">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                        </svg>
                    </Btn>
                    <Btn title="Insertar imagen" onClick={insertImage}>
                        <svg viewBox="0 0 24 24">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                        </svg>
                    </Btn>
                </div>
            </div>
            <div
                ref={editorRef}
                className="rte-content-canvas"
                contentEditable
                suppressContentEditableWarning
                data-placeholder={placeholder}
                onKeyUp={sync}
                onMouseUp={sync}
            />
        </div>
    );
}
