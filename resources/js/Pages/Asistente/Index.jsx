import { usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import ChatPanel from "@/Components/assistant/ChatPanel";
import { useAssistant } from "@/Components/assistant/useAssistant";

export default function AsistenteIndex() {
    const { config } = usePage().props;
    const { messages, streaming, send, clear, applyChange, discardChange } = useAssistant();

    return (
        <AppLayout breadcrumb="Asistente IA">
            <div className="flex-1 min-h-0 flex flex-col mx-[22px] mt-3 mb-[46px]">
                <div className="assistant-page-head">
                    <div>
                        <h2 className="assistant-page-title">Asistente de código</h2>
                        <p className="assistant-page-sub">
                            Genera y modifica código con aprobación explícita. Cada cambio propuesto se
                            revisa antes de aplicarse.
                        </p>
                    </div>
                    {config?.model && <span className="assistant-model-badge">{config.model}</span>}
                </div>

                <ChatPanel
                    messages={messages}
                    streaming={streaming}
                    onSend={send}
                    onApply={applyChange}
                    onDiscard={discardChange}
                    onClear={clear}
                    emptyHint="Soy Brief, tu asistente de código. Puedo leer archivos, buscar y proponer cambios. Pregúntame algo."
                />
            </div>
        </AppLayout>
    );
}
