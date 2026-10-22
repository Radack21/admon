import { Check, Trash2, X } from "lucide-react";

/**
 * Tarjeta que muestra un diff propuesto por la IA con acciones de
 * Aplicar / Descartar.
 */
export default function DiffCard({ diff, onApply, onDiscard }) {
    const lines = (diff.diff || "").split("\n");

    const lineClass = (line) => {
        if (line.startsWith("+")) return "diff-add";
        if (line.startsWith("-")) return "diff-del";
        if (line.startsWith("@@")) return "diff-hunk";
        if (line.startsWith("---") || line.startsWith("+++")) return "diff-header";
        return "diff-context";
    };

    return (
        <div className="diff-card">
            <div className="diff-card-head">
                <div className="diff-path">
                    <span className="diff-file-icon">📄</span>
                    <code>{diff.path}</code>
                </div>

                {diff.status === "pending" && (
                    <div className="diff-actions">
                        <button className="btn-apply" onClick={() => onApply(diff.change_id)} type="button">
                            <Check size={14} /> Aplicar
                        </button>
                        <button className="btn-discard" onClick={() => onDiscard(diff.change_id)} type="button">
                            <Trash2 size={14} /> Descartar
                        </button>
                    </div>
                )}

                {diff.status === "applied" && <span className="diff-badge applied">✓ Aplicado</span>}
                {diff.status === "discarded" && <span className="diff-badge discarded">Descartado</span>}
                {diff.status === "error" && (
                    <span className="diff-badge error" title={diff.error}>
                        <X size={13} /> Error
                    </span>
                )}
            </div>

            {diff.status === "error" && diff.error && (
                <div className="diff-error-text">{diff.error}</div>
            )}

            <pre className="diff-body">
                {lines.map((line, i) => (
                    <div key={i} className={`diff-line ${lineClass(line)}`}>
                        {line || "\u00A0"}
                    </div>
                ))}
            </pre>
        </div>
    );
}
