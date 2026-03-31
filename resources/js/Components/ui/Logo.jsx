export default function Logo() {
    return (
        <div className="flex items-center gap-3 px-5 py-2 bg-black/40 border border-white/10 backdrop-blur-xl rounded-full">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg">
                BD
            </div>
            <div className="flex flex-col leading-none">
                <span className="text-white font-bold text-sm tracking-tight">
                    BriefData<span className="text-red-500">®</span>
                </span>
                <span className="text-[9px] text-white/40 uppercase tracking-tighter">
                    Business Intelligence
                </span>
            </div>
        </div>
    );
}
