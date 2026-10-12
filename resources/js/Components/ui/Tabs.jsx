export default function Tabs({ tabs = [], value, onChange, variant = "capsule", className = "" }) {
    const items = tabs.map((t) => (typeof t === "string" ? { label: t, value: t } : t));
    const isCapsule = variant === "capsule";
    const activeValue = value !== undefined ? value : items[0]?.value;
    const btnClass = isCapsule ? "nav-tab-btn" : "tab-btn";

    return (
        <div className={`${isCapsule ? "nav-tabs-capsule" : "modal-tabs"} ${className}`} role="tablist">
            {items.map((t) => {
                const active = t.value === activeValue;
                return (
                    <button
                        key={t.value}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        disabled={t.disabled}
                        className={`${btnClass} ${active ? "active" : ""}`}
                        onClick={() => onChange?.(t.value)}
                    >
                        {t.label}
                    </button>
                );
            })}
        </div>
    );
}
