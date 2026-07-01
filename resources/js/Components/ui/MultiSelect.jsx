import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, X, Check } from "lucide-react";

export default function MultiSelect({
    label,
    name,
    options = [],
    value = [],
    onChange,
    required = false,
    placeholder = "Seleccionar...",
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

    const selectedItems = options.filter((o) =>
        (value || []).includes(String(o.id))
    );

    const filtered = options.filter((o) =>
        o.nombre?.toLowerCase().includes(search.toLowerCase())
    );

    const handleToggle = (id) => {
        const current = [...(value || [])];
        const strId = String(id);
        const index = current.indexOf(strId);
        if (index >= 0) {
            current.splice(index, 1);
        } else {
            current.push(strId);
        }
        onChange(current);
    };

    const handleSelectAll = () => {
        const allIds = options.map((o) => String(o.id));
        onChange(allIds);
    };

    const handleClearAll = () => {
        onChange([]);
    };

    const displayText = selectedItems.length > 0
        ? `${selectedItems.length} seleccionado(s)`
        : placeholder;

    return (
        <div ref={wrapperRef} className="relative">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}{required && <span className="text-red-500 ml-0.5">*</span>}
                </label>
            )}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-md text-sm cursor-pointer bg-white hover:border-gray-400 transition-colors"
            >
                <div className="flex-1 min-w-0">
                    {selectedItems.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                            {selectedItems.map((item) => (
                                <span
                                    key={item.id}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 text-orange-800 text-xs rounded-full"
                                >
                                    {item.nombre}
                                    <X
                                        className="w-3 h-3 cursor-pointer hover:text-orange-600"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleToggle(item.id);
                                        }}
                                    />
                                </span>
                            ))}
                        </div>
                    ) : (
                        <span className="text-gray-400">{placeholder}</span>
                    )}
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 ml-2" />
            </div>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-64 overflow-hidden">
                    <div className="sticky top-0 bg-white p-2 border-b border-gray-100 space-y-2">
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
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); handleSelectAll(); }}
                                className="text-xs text-orange-600 hover:text-orange-800 font-medium"
                            >
                                Seleccionar todos
                            </button>
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); handleClearAll(); }}
                                className="text-xs text-gray-500 hover:text-gray-700 font-medium"
                            >
                                Limpiar
                            </button>
                        </div>
                    </div>
                    <div className="overflow-y-auto max-h-40">
                        {filtered.length === 0 ? (
                            <div className="px-3 py-2 text-sm text-gray-400 text-center">
                                Sin resultados
                            </div>
                        ) : (
                            filtered.map((option) => {
                                const isSelected = (value || []).includes(String(option.id));
                                return (
                                    <div
                                        key={option.id}
                                        onClick={() => handleToggle(option.id)}
                                        className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-orange-50 transition-colors ${
                                            isSelected ? "bg-orange-50" : ""
                                        }`}
                                    >
                                        <div
                                            className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                                                isSelected
                                                    ? "bg-orange-500 border-orange-500"
                                                    : "border-gray-300"
                                            }`}
                                        >
                                            {isSelected && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                        <span className="text-gray-700">{option.nombre}</span>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
