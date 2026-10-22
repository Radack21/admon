import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import { X } from "lucide-react";
import { useAssistant } from "./useAssistant";
import ChatPanel from "./ChatPanel";
import { IconBotFab, IconBotAvatar } from "@/Components/Icons";

/**
 * Widget flotante global del asistente de IA. Se monta en el layout raíz y
 * aparece en todas las páginas internas.
 *
 * Como está fuera del árbol de `<App>` de Inertia, no puede usar `usePage()`.
 * Por eso el estado de autenticación se resuelve con la prop inicial y se
 * mantiene al día escuchando los eventos de navegación de Inertia.
 */
const isGuestComponent = (component) =>
    typeof component === "string" && component.startsWith("auth/");

export default function AssistantWidget({ initialAuthed = false, initialComponent = "" }) {
    const [authed, setAuthed] = useState(initialAuthed);
    const [guest, setGuest] = useState(isGuestComponent(initialComponent));
    const [open, setOpen] = useState(false);
    const { messages, streaming, send, clear, applyChange, discardChange } = useAssistant();

    useEffect(() => {
        const update = (event) => {
            const page = event.detail?.page;
            setAuthed(Boolean(page?.props?.auth?.user));
            setGuest(isGuestComponent(page?.component));
        };
        router.on("navigate", update);
        return () => router.off("navigate", update);
    }, []);

    if (!authed || guest) {
        return null;
    }

    return (
        <>
            {/* FAB */}
            <button
                className="assistant-fab"
                onClick={() => setOpen((v) => !v)}
                type="button"
                title="Asistente IA"
                aria-label="Abrir asistente de IA"
            >
                {open ? <X size={22} /> : <IconBotFab className="assistant-fab-icon" />}
            </button>

            {/* Panel */}
            {open && (
                <div className="assistant-panel">
                    <div className="assistant-panel-head">
                        <div className="assistant-panel-title">
                            <span className="assistant-panel-avatar">
                                <IconBotAvatar />
                            </span>
                            <div>
                                <div className="assistant-panel-name">Asistente IA</div>
                                <div className="assistant-panel-sub">Claude Opus · genera y modifica código</div>
                            </div>
                        </div>
                        <button className="assistant-panel-close" onClick={() => setOpen(false)} type="button">
                            <X size={18} />
                        </button>
                    </div>

                    <ChatPanel
                        messages={messages}
                        streaming={streaming}
                        onSend={send}
                        onApply={applyChange}
                        onDiscard={discardChange}
                        onClear={clear}
                        emptyHint="Soy Brief, tu asistente de código. Pregúntame algo o pídeme modificar un archivo."
                    />
                </div>
            )}
        </>
    );
}
