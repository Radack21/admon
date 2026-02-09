import { User } from "lucide-react";

export default function UserInput({
    label = "Usuario",
    value,
    onChange,
    placeholder = "Usuario",
    className = "",
}) {
    return (
        <div className={`relative w-full ${className}`}>
            {/* Input */}
            <div className="relative flex items-center rounded-full border border-white/30 bg-black/80 px-4 py-3 ">
                <User className="mr-3 h-5 w-5 text-white/70" />

                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full bg-transparent text-white placeholder-white/60 outline-none"
                />
            </div>
        </div>
    );
}
