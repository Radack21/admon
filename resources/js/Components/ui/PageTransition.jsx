import { usePage } from "@inertiajs/react";

export default function PageTransition({ children, className = "" }) {
    const { component } = usePage();

    return (
        <div key={component} className={className}>
            {children}
        </div>
    );
}
