import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Lee el token CSRF de la cookie XSRF-TOKEN (igual que hace axios por defecto).
 */
function getCsrfToken() {
    const match = document.cookie.match(/(?:^|; )XSRF-TOKEN=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : "";
}

/**
 * Hook que gestiona la conversación con el asistente de IA mediante SSE
 * (Server-Sent Events) consumido con fetch + ReadableStream.
 */
export function useAssistant() {
    const [messages, setMessages] = useState([]);
    const [streaming, setStreaming] = useState(false);
    const abortRef = useRef(null);
    const idRef = useRef(0);

    const messagesRef = useRef(messages);
    useEffect(() => {
        messagesRef.current = messages;
    }, [messages]);

    const nextId = useCallback(() => `m${++idRef.current}`, []);

    const updateMessage = useCallback((id, updater) => {
        setMessages((prev) => prev.map((m) => (m.id === id ? updater(m) : m)));
    }, []);

    const buildHistory = useCallback((msgs) => {
        return msgs
            .filter((m) => (m.role === "user" || m.role === "assistant") && m.content)
            .slice(-20)
            .map((m) => ({ role: m.role, content: m.content }));
    }, []);

    const clear = useCallback(() => {
        abortRef.current?.abort();
        setMessages([]);
        setStreaming(false);
    }, []);

    const send = useCallback(async (text) => {
        const trimmed = String(text ?? "").trim();
        if (!trimmed || streaming) return;

        const history = buildHistory(messagesRef.current);

        const userMsg = { id: nextId(), role: "user", content: trimmed };
        const assistantId = nextId();
        const assistantMsg = {
            id: assistantId,
            role: "assistant",
            content: "",
            tools: [],
            diffs: [],
            done: false,
        };

        setMessages((prev) => [...prev, userMsg, assistantMsg]);
        setStreaming(true);

        const controller = new AbortController();
        abortRef.current = controller;

        try {
            const response = await fetch(route("api.asistente.chat"), {
                method: "POST",
                credentials: "same-origin",
                signal: controller.signal,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "text/event-stream",
                    "X-Requested-With": "XMLHttpRequest",
                    "X-XSRF-TOKEN": getCsrfToken(),
                },
                body: JSON.stringify({ message: trimmed, history }),
            });

            if (!response.ok) {
                const errBody = await response.text().catch(() => "");
                throw new Error(`Error ${response.status}${errBody ? `: ${errBody}` : ""}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = "";

            const handleEvent = (payload) => {
                switch (payload.type) {
                    case "text":
                        updateMessage(assistantId, (m) => ({ ...m, content: m.content + (payload.text || "") }));
                        break;
                    case "tool":
                        updateMessage(assistantId, (m) => ({
                            ...m,
                            tools: [...m.tools, { name: payload.name, detail: payload.detail }],
                        }));
                        break;
                    case "diff":
                        updateMessage(assistantId, (m) => ({
                            ...m,
                            diffs: [
                                ...m.diffs,
                                {
                                    change_id: payload.change_id,
                                    path: payload.path,
                                    diff: payload.diff,
                                    status: "pending",
                                },
                            ],
                        }));
                        break;
                    case "error":
                        updateMessage(assistantId, (m) => ({
                            ...m,
                            content: m.content
                                ? `${m.content}\n\n⚠️ ${payload.message}`
                                : `⚠️ ${payload.message}`,
                        }));
                        break;
                    default:
                        break;
                }
            };

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });

                let nl;
                while ((nl = buffer.indexOf("\n")) !== -1) {
                    const line = buffer.slice(0, nl).replace(/\r$/, "");
                    buffer = buffer.slice(nl + 1);
                    if (line.startsWith("data:")) {
                        const raw = line.slice(5).trim();
                        if (raw) {
                            try {
                                handleEvent(JSON.parse(raw));
                            } catch {
                                // evento malformado: se ignora
                            }
                        }
                    }
                }
            }
        } catch (e) {
            if (e.name !== "AbortError") {
                updateMessage(assistantId, (m) => ({
                    ...m,
                    content: m.content
                        ? `${m.content}\n\n⚠️ ${e.message}`
                        : `⚠️ ${e.message}`,
                }));
            }
        } finally {
            updateMessage(assistantId, (m) => ({ ...m, done: true }));
            setStreaming(false);
            abortRef.current = null;
        }
    }, [streaming, buildHistory, nextId, updateMessage]);

    const applyChange = useCallback(async (changeId) => {
        const mark = (status, error) => {
            setMessages((prev) =>
                prev.map((m) => ({
                    ...m,
                    diffs: (m.diffs || []).map((d) =>
                        d.change_id === changeId ? { ...d, status, error } : d
                    ),
                }))
            );
        };

        try {
            const response = await fetch(route("api.asistente.apply"), {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "X-XSRF-TOKEN": getCsrfToken(),
                },
                body: JSON.stringify({ change_id: changeId }),
            });
            const data = await response.json().catch(() => ({}));
            mark(data.ok ? "applied" : "error", data.error);
            return data;
        } catch (e) {
            mark("error", e.message);
            return { ok: false, error: e.message };
        }
    }, []);

    const discardChange = useCallback(async (changeId) => {
        const mark = (status) => {
            setMessages((prev) =>
                prev.map((m) => ({
                    ...m,
                    diffs: (m.diffs || []).map((d) =>
                        d.change_id === changeId ? { ...d, status } : d
                    ),
                }))
            );
        };

        try {
            await fetch(route("api.asistente.discard"), {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "X-XSRF-TOKEN": getCsrfToken(),
                },
                body: JSON.stringify({ change_id: changeId }),
            });
        } catch {
            // incluso si falla el descarte remoto, lo marcamos localmente
        } finally {
            mark("discarded");
        }
    }, []);

    return { messages, streaming, send, clear, applyChange, discardChange };
}
