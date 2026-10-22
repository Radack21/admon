import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, Trash2 } from "lucide-react";
import Markdown from "./Markdown";
import DiffCard from "./DiffCard";
import { IconBotAvatar } from "@/Components/Icons";

function TypingIndicator() {
    return (
        <div className="typing-dots">
            <span />
            <span />
            <span />
        </div>
    );
}

/**
 * Panel de chat reutilizable (lo usan la página dedicada y el widget flotante).
 */
export default function ChatPanel({ messages, streaming, onSend, onApply, onDiscard, onClear, emptyHint }) {
    const [input, setInput] = useState("");
    const scrollRef = useRef(null);

    useEffect(() => {
        const el = scrollRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [messages, streaming]);

    const submit = () => {
        const value = input.trim();
        if (!value || streaming) return;
        onSend(value);
        setInput("");
    };

    const onKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
        }
    };

    return (
        <div className="chat-panel">
            <div className="chat-messages scrollbar-thin" ref={scrollRef}>
                {messages.length === 0 && (
                    <div className="chat-empty">
                        <div className="chat-empty-icon">
                            <Sparkles size={22} />
                        </div>
                        <p>{emptyHint || "Pregúntame sobre el código del proyecto."}</p>
                    </div>
                )}

                {messages.map((msg) => (
                    <div key={msg.id} className={`chat-message ${msg.role === "user" ? "user" : "assistant"}`}>
                        {msg.role === "assistant" && (
                            <div className="chat-avatar">
                                <IconBotAvatar />
                            </div>
                        )}

                        <div className="chat-bubble-wrap">
                            {msg.role === "assistant" && msg.tools?.length > 0 && (
                                <div className="chat-tools">
                                    {msg.tools.map((t, i) => (
                                        <span key={i} className="chat-tool-chip">
                                            {t.name === "read_file" && "📖"}
                                            {t.name === "list_directory" && "📁"}
                                            {t.name === "search_code" && "🔎"}
                                            {t.detail ? ` ${t.detail}` : ""}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className={`chat-bubble ${msg.role === "user" ? "user" : "assistant"}`}>
                                {msg.role === "user" ? (
                                    <div className="chat-user-text">{msg.content}</div>
                                ) : (
                                    <>
                                        {msg.content ? (
                                            <Markdown text={msg.content} />
                                        ) : msg.done ? null : (
                                            <TypingIndicator />
                                        )}
                                        {msg.content && !msg.done && <TypingIndicator />}
                                    </>
                                )}
                            </div>

                            {msg.role === "assistant" && msg.diffs?.length > 0 && (
                                <div className="chat-diffs">
                                    {msg.diffs.map((d) => (
                                        <DiffCard
                                            key={d.change_id}
                                            diff={d}
                                            onApply={onApply}
                                            onDiscard={onDiscard}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="chat-input-area">
                <textarea
                    className="chat-textarea scrollbar-thin"
                    placeholder="Escribe tu petición… (Enter para enviar)"
                    value={input}
                    rows={1}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                />
                <div className="chat-input-actions">
                    {onClear && messages.length > 0 && (
                        <button className="chat-icon-btn" onClick={onClear} type="button" title="Limpiar conversación">
                            <Trash2 size={16} />
                        </button>
                    )}
                    <button
                        className="chat-send"
                        onClick={submit}
                        disabled={!input.trim() || streaming}
                        type="button"
                        title="Enviar"
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
