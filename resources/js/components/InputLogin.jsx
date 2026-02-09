export default function InputIcon({
    label = "Usuario",
    value,
    onChange,
    placeholder = "Usuario",
    className = "",
    icon,
}) {
    return (
        <div className={`relative w-full ${className}`}>
            {/* Input */}
            <div className="relative flex items-center rounded-full border border-white bg-black/80 px-4 py-3 ">
                <div className="border-r-2 border-white pr-2">{icon}</div>
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full bg-transparent text-white placeholder-white outline-none pl-2"
                />
            </div>
        </div>
    );
}
