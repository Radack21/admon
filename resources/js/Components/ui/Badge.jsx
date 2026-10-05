export default function Badge({ variant = "cobrado", children }) {
    return <span className={`status-badge ${variant}`}>{children}</span>;
}
