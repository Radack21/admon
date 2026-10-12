import { useState } from "react";

const CATEGORIES = [
    "Observación Técnica",
    "Aprobación de Cliente",
    "Cambio de Requisito",
    "Nota General",
];

const INITIAL_DAYS = [
    {
        date: "10 SEP 2026",
        records: [
            {
                time: "08:45 AM",
                category: "Aprobación de Cliente",
                author: "Usuario actual",
                isUser: true,
                text: "Se revisó y aprobó la alineación final de las firmas electrónicas en los reportes PDF.",
                attachment: "📄 Minuta_Firmas.pdf",
            },
        ],
    },
    {
        date: "09 SEP 2026",
        records: [
            {
                time: "09:30 AM",
                category: "Sincronización API REST v2.4",
                author: "Sincronizador Swagger (#c8a91f)",
                isUser: false,
                text: "Carga automática de especificación API REST con soporte para exportación masiva en XLSX.",
            },
            {
                time: "02:15 PM",
                category: "Observación Técnica",
                author: "Usuario actual",
                isUser: true,
                text: "Se confirmó con desarrollo que el límite de exportación masiva será de 50,000 registros por lote.",
            },
        ],
    },
];

function nowTime() {
    const d = new Date();
    let h = d.getHours();
    const m = String(d.getMinutes()).padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${String(h).padStart(2, "0")}:${m} ${ampm}`;
}

function Arrow() {
    return (
        <span className="timeline-arrow" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M2 2 L10 6 L2 10 Z" />
            </svg>
        </span>
    );
}

export default function Timeline({ className = "" }) {
    const [days, setDays] = useState(INITIAL_DAYS);
    const [collapsed, setCollapsed] = useState({});
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [text, setText] = useState("");
    const [staged, setStaged] = useState([]);
    const [newIndex, setNewIndex] = useState(-1);

    const toggleDay = (i) => setCollapsed((c) => ({ ...c, [i]: !c[i] }));

    const publish = () => {
        const value = text.trim();
        if (!value) return;
        setDays((prev) => {
            const next = [...prev];
            const record = {
                time: nowTime(),
                category,
                author: "Usuario actual",
                isUser: true,
                text: value,
                attachments: staged,
            };
            if (next.length === 0) {
                next.unshift({ date: "HOY", records: [record] });
                setNewIndex(0);
            } else {
                next[0] = { ...next[0], records: [record, ...next[0].records] };
                setNewIndex(0);
            }
            return next;
        });
        setText("");
        setStaged([]);
    };

    const onAttach = (e) => {
        const names = Array.from(e.target.files || []).map((f) => f.name);
        setStaged((s) => [...s, ...names]);
        e.target.value = "";
    };

    return (
        <div className={`flex flex-col gap-6 ${className}`}>
            <div className="timeline-composer">
                <div className="timeline-composer-header">
                    <select
                        className="timeline-composer-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {CATEGORIES.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                    <span className="timeline-composer-hint">Definir categoría</span>
                </div>
                <textarea
                    className="timeline-composer-textarea"
                    placeholder="Escribir la descripción técnica o nota sobre el expediente..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                {staged.length > 0 && (
                    <div className="timeline-staged-files-list">
                        {staged.map((n, i) => (
                            <span className="timeline-staged-file-chip" key={`${n}-${i}`}>
                                📎 {n}
                            </span>
                        ))}
                    </div>
                )}
                <div className="timeline-composer-divider" />
                <div className="timeline-composer-toolbar">
                    <div className="timeline-attach-group">
                        <input type="file" style={{ display: "none" }} id="tl-doc" onChange={onAttach} />
                        <input type="file" accept="image/*" style={{ display: "none" }} id="tl-img" onChange={onAttach} />
                        <button
                            type="button"
                            className="timeline-attach-btn"
                            title="Adjuntar documento"
                            onClick={() => document.getElementById("tl-doc").click()}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            className="timeline-attach-btn"
                            title="Adjuntar imagen/mockup"
                            onClick={() => document.getElementById("tl-img").click()}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <path d="M21 15l-5-5L5 21" />
                            </svg>
                        </button>
                    </div>
                    <button type="button" className="timeline-publish-btn" onClick={publish}>
                        Publicar Registro
                    </button>
                </div>
            </div>

            <div className="timeline-flow">
                {days.map((day, di) => (
                    <div className={`timeline-day-block ${collapsed[di] ? "collapsed" : ""}`} key={day.date}>
                        <div className="timeline-day-header" onClick={() => toggleDay(di)}>
                            <div className="timeline-day-meta">
                                <div className="timeline-date-node">
                                    <span>{day.date}</span>
                                    <Arrow />
                                </div>
                            </div>
                            <div className="timeline-day-spine" />
                            <div />
                            <span className="timeline-date-stem" aria-hidden="true" />
                        </div>
                        <div className="timeline-day-records">
                            {day.records.map((r, ri) => (
                                <div className={`timeline-record-row ${di === newIndex && ri === 0 ? "is-new" : ""}`} key={`${r.time}-${ri}`}>
                                    <div className="timeline-record-meta">
                                        <span className="timeline-record-time">{r.time}</span>
                                    </div>
                                    <div className="timeline-record-spine">
                                        <span className="timeline-time-node" />
                                    </div>
                                    <div className="timeline-record-content">
                                        <span className={`timeline-pill ${r.isUser ? "timeline-pill-user" : "timeline-pill-system"}`}>
                                            {r.category}
                                        </span>
                                        <span className="timeline-author">{r.author}</span>
                                        <p className="timeline-description">{r.text}</p>
                                        {r.attachment && (
                                            <div className="timeline-attachments">
                                                <a href="#" className="timeline-attachment" onClick={(e) => e.preventDefault()}>
                                                    {r.attachment}
                                                </a>
                                            </div>
                                        )}
                                        {r.attachments?.length > 0 && (
                                            <div className="timeline-attachments">
                                                {r.attachments.map((n, i) => (
                                                    <a href="#" className="timeline-attachment" key={`${n}-${i}`} onClick={(e) => e.preventDefault()}>
                                                        📎 {n}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
