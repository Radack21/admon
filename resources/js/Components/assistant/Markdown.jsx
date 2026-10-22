import { createElement, useState } from "react";

function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

/**
 * Render inline markdown: `code`, **bold**, *italic*, [links](url).
 * Se asume que el texto ya está escapado como HTML.
 */
function renderInline(text) {
    let s = escapeHtml(text);
    s = s.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, "$1<em>$2</em>");
    return s;
}

function CodeBlock({ lang, code }) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            // ignorar
        }
    };

    return (
        <div className="code-block">
            <div className="code-block-head">
                <span className="code-lang">{lang || "code"}</span>
                <button className="code-copy" onClick={copy} type="button">
                    {copied ? "Copiado" : "Copiar"}
                </button>
            </div>
            <pre>
                <code>{code}</code>
            </pre>
        </div>
    );
}

/**
 * Renderizador de markdown ligero (sin dependencias). Soporta bloques de
 * código con triple backtick, encabezados, listas y estilos inline.
 */
export default function Markdown({ text }) {
    if (!text) return null;

    const lines = text.split("\n");
    const blocks = [];
    let i = 0;

    const key = (n) => `${n}-${blocks.length}`;

    while (i < lines.length) {
        const line = lines[i];

        // Bloque de código con valla
        if (/^```/.test(line)) {
            const lang = line.slice(3).trim();
            const codeLines = [];
            i++;
            while (i < lines.length && !/^```/.test(lines[i])) {
                codeLines.push(lines[i]);
                i++;
            }
            i++; // cierra la valla
            blocks.push(<CodeBlock key={key("code")} lang={lang} code={codeLines.join("\n")} />);
            continue;
        }

        // Encabezados
        const heading = line.match(/^(#{1,4})\s+(.*)/);
        if (heading) {
            const level = heading[1].length;
            blocks.push(
                createElement(`h${level}`, {
                    key: key("h"),
                    className: "md-heading",
                    dangerouslySetInnerHTML: { __html: renderInline(heading[2]) },
                })
            );
            i++;
            continue;
        }

        // Lista no ordenada
        if (/^\s*[-*]\s+/.test(line)) {
            const items = [];
            while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
                items.push(lines[i].replace(/^\s*[-*]\s+/, ""));
                i++;
            }
            blocks.push(
                <ul key={key("ul")} className="md-list">
                    {items.map((it, j) => (
                        <li key={j} dangerouslySetInnerHTML={{ __html: renderInline(it) }} />
                    ))}
                </ul>
            );
            continue;
        }

        // Lista ordenada
        if (/^\s*\d+\.\s+/.test(line)) {
            const items = [];
            while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
                items.push(lines[i].replace(/^\s*\d+\.\s+/, ""));
                i++;
            }
            blocks.push(
                <ol key={key("ol")} className="md-list">
                    {items.map((it, j) => (
                        <li key={j} dangerouslySetInnerHTML={{ __html: renderInline(it) }} />
                    ))}
                </ol>
            );
            continue;
        }

        // Línea en blanco
        if (line.trim() === "") {
            i++;
            continue;
        }

        // Párrafo
        const para = [];
        while (
            i < lines.length &&
            lines[i].trim() !== "" &&
            !/^```/.test(lines[i]) &&
            !/^#{1,4}\s/.test(lines[i]) &&
            !/^\s*[-*]\s+/.test(lines[i]) &&
            !/^\s*\d+\.\s+/.test(lines[i])
        ) {
            para.push(lines[i]);
            i++;
        }
        blocks.push(
            <p
                key={key("p")}
                className="md-para"
                dangerouslySetInnerHTML={{ __html: renderInline(para.join("\n")).replace(/\n/g, "<br/>") }}
            />
        );
    }

    return <div className="markdown">{blocks}</div>;
}
