export default function StatusBar() {
    return (
        <div className="fixed bottom-0 left-[22px] right-[calc(56px+22px)] z-50 h-[34px] flex items-center gap-4 px-4 bg-white/[0.07] backdrop-blur-md border border-orange-200/15 rounded-t">
            <div className="flex items-center gap-[5px] text-[11px] text-orange-100/60">
                <div className="w-[7px] h-[7px] rounded-full bg-[#2e8b5a]" />
                Producción
            </div>
            <div className="ml-auto text-[11px] text-orange-100/60">
                BriefData® v2.4.1
            </div>
        </div>
    );
}
