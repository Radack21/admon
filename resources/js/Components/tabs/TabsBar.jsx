import { useState } from "react";

export default function TabsBar({ tabs = ["Ingresos", "Categorías", "Estatus"], activeTab = 0, onTabChange }) {
    const [active, setActive] = useState(activeTab);

    const handleClick = (i) => {
        setActive(i);
        onTabChange?.(i);
    };

    return (
        <div className="flex items-end h-11 px-4 mx-[22px] mt-3 bg-white/[0.07] backdrop-blur-md border border-orange-200/15 rounded-xl flex-shrink-0">
            {tabs.map((tab, i) => (
                <button
                    key={tab}
                    onClick={() => handleClick(i)}
                    className={`pl-1 pr-4 py-2.5 pb-2 text-[13.5px] border-b-[2.5px] -mb-px transition-all whitespace-nowrap ${
                        i === 0 ? "pl-0" : ""
                    } ${
                        i === active
                            ? "text-white border-white/85 font-semibold"
                            : "text-orange-100/55 border-transparent hover:text-orange-100/85"
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}
