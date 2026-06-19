export default function RightSidebar() {
    return (
        <div className="fixed top-0 right-0 bottom-0 z-[150] w-14 flex flex-col items-center py-3.5 gap-1.5">
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(231,96,35,0.3)_1px,transparent_1px)] bg-[length:18px_18px] opacity-25 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-[160px] bg-[radial-gradient(ellipse_at_50%_100%,rgba(231,96,35,0.1)_0%,transparent_70%)] pointer-events-none" />

            <div className="flex-1" />

            <button
                className="relative z-10 w-[42px] h-[42px] rounded-full bg-[#2d2d32]/90 backdrop-blur-[20px] border border-white/[0.12] flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.07)] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_0_0_2px_rgba(231,96,35,0.6),0_0_18px_rgba(231,96,35,0.4)] shrink-0 mb-2"
            >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2 C12 2 12.8 7.5 12 12 C11.2 7.5 12 2 12 2Z" fill="white" fillOpacity="0.95"/>
                    <path d="M12 22 C12 22 12.8 16.5 12 12 C11.2 16.5 12 22 12 22Z" fill="white" fillOpacity="0.95"/>
                    <path d="M22 12 C22 12 16.5 12.8 12 12 C16.5 11.2 22 12 22 12Z" fill="white" fillOpacity="0.95"/>
                    <path d="M2 12 C2 12 7.5 12.8 12 12 C7.5 11.2 2 12 2 12Z" fill="white" fillOpacity="0.95"/>
                    <circle cx="12" cy="12" r="1.5" fill="white"/>
                    <path d="M17.5 6.5 C17.5 6.5 15.2 9.2 12 12 C14.7 9.2 17.5 6.5 17.5 6.5Z" fill="white" fillOpacity="0.45"/>
                    <path d="M6.5 17.5 C6.5 17.5 8.8 14.8 12 12 C9.3 14.8 6.5 17.5 6.5 17.5Z" fill="white" fillOpacity="0.45"/>
                    <path d="M17.5 17.5 C17.5 17.5 14.8 14.8 12 12 C14.8 9.2 17.5 6.5 17.5 6.5Z" fill="white" fillOpacity="0.45"/>
                    <path d="M6.5 6.5 C6.5 6.5 9.2 9.2 12 12 C9.2 14.8 6.5 17.5 6.5 17.5Z" fill="white" fillOpacity="0.45"/>
                </svg>
            </button>
        </div>
    );
}
