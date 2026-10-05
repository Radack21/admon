export default function Button({ variant = "primary", children, className = "", ...rest }) {
    const variants = {
        primary: "btn-primary",
        secondary: "btn-secondary",
        outline: "btn-outline",
        circle: "btn-circle primary",
        "circle-ghost": "btn-circle ghost",
    };

    return (
        <button type="button" className={`${variants[variant] || variants.primary} ${className}`} {...rest}>
            {children}
        </button>
    );
}
