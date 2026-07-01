import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Section({ title, defaultOpen = false, children }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border border-gray-200 rounded-lg">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-t-lg transition-colors"
            >
                <span className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <span className="w-1 h-4 bg-orange-500 rounded-full" />
                    {title}
                </span>
                <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>
            {isOpen && <div className="p-4 space-y-4">{children}</div>}
        </div>
    );
}
