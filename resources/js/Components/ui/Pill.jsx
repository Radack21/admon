export default function Pill({ label, variant = "cobrado" }) {
    const variants = {
        cobrado: "bg-[#e6f5ec] text-[#1e7a48] border-[#1e7a48]/20",
        pendiente: "bg-[#fef3e2] text-[#7a5808] border-[#7a5808]/20",
        vencido: "bg-[#fdeaea] text-[#a02020] border-[#a02020]/20",
        active: "bg-[#e6f5ec] text-[#1e7a48] border-[#1e7a48]/20",
        inactive: "bg-[#f2f3f5] text-[#70747c] border-[#70747c]/20",
        prospect: "bg-[#e8f0fe] text-[#1a56db] border-[#1a56db]/20",
    };

    return (
        <span
            className={`inline-flex items-center justify-center min-w-[68px] h-5 px-2 rounded text-[10.5px] font-medium tracking-[0.02em] border ${variants[variant]}`}
        >
            {label}
        </span>
    );
}
