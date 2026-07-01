import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, X } from "lucide-react";

export default function SelectSearchable({
    label,
    name,
    options = [],
    value = "",
    onChange,
    required = false,
    placeholder = "Seleccionar...",
    disabled = false,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selected = options.find((o) => String(o.id) === String(value));

    const filtered = options.filter((o) =>
        o.nombre?.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = (option) => {
        onChange(option.id);
        setIsOpen(false);
        setSearch("");
    };

    return (
        <div ref={wrapperRef} className="relative">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}{required && <span className="text-red-500 ml-0.5">*</span>}
                </label>
            )}
            <div
                onClick={() => !disabled && setIsOpen(!isOpen)}
                className={`flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-md text-sm cursor-pointer bg-white hover:border-gray-400 transition-colors ${
                    disabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                <span className={selected ? "text-gray-900" : "text-gray-400"}>
                    {selected ? selected.nombre : placeholder}
                </span>
                <input type="hidden" name={name} value={value} />
                <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-hidden">
                    <div className="sticky top-0 bg-white p-2 border-b border-gray-100">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Buscar..."
                                className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                                onClick={(e) => e.stopPropagation()}
                                autoFocus
                            />
                            {search && (
                                <X
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-gray-600"
                                    onClick={(e) => { e.stopPropagation(); setSearch(""); }}
                                />
                            )}
                        </div>
                    </div>
                    <div className="overflow-y-auto max-h-48">
                        {filtered.length === 0 ? (
                            <div className="px-3 py-2 text-sm text-gray-400 text-center">
                                Sin resultados
                            </div>
                        ) : (
                            filtered.map((option) => (
                                <div
                                    key={option.id}
                                    onClick={() => handleSelect(option)}
                                    className={`px-3 py-2 text-sm cursor-pointer hover:bg-orange-50 transition-colors ${
                                        String(option.id) === String(value)
                                            ? "bg-orange-100 text-orange-800 font-medium"
                                            : "text-gray-700"
                                    }`}
                                >
                                    {option.nombre}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
