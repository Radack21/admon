export default function RightSidebar() {
    return (
        <div className="fixed top-0 right-0 bottom-0 z-[150] w-14 flex flex-col items-center py-3.5 gap-1.5">
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(231,96,35,0.3)_1px,transparent_1px)] bg-[length:18px_18px] opacity-25 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-[160px] bg-[radial-gradient(ellipse_at_50%_100%,rgba(231,96,35,0.1)_0%,transparent_70%)] pointer-events-none" />
        </div>
    );
}
