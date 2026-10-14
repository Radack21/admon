import { router } from "@inertiajs/react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import Badge from "@/Components/ui/Badge";
import RowActions from "@/Components/ui/RowActions";

dayjs.locale("es");

const TYPE_LABEL = {
    active: "Activo",
    inactive: "Inactivo",
    prospect: "Potencial",
};

const SORT_COLUMNS = [
    { label: "Cliente", column: "nombre_comercial" },
    { label: "Folio", column: "folio" },
    { label: "RFC", column: "rfc" },
    { label: "Estatus", column: "type" },
    { label: "Fecha", column: "fecha_registro" },
    { label: "Contacto", column: "contacto_nombre" },
];

function SortIcon({ active, direction }) {
    const up = active && direction === "asc";
    const down = active && direction === "desc";
    return (
        <svg className="sort-icon" viewBox="0 0 8 10">
            <polygon points="4,0 8,4 0,4" fill={up ? "var(--accent)" : "currentColor"} opacity={up ? 1 : 0.4} />
            <polygon points="4,10 0,6 8,6" fill={down ? "var(--accent)" : "currentColor"} opacity={down ? 1 : 0.4} />
        </svg>
    );
}

export default function ClientesDataTable({ clientes, filters, onEdit, onDelete, onView }) {
    const data = clientes?.data || [];

    const handleSort = (column) => {
        const direction = filters.sort === column && filters.direction === "asc" ? "desc" : "asc";
        router.get(
            route("clientes.index"),
            { tab: filters.tab, search: filters.search, sort: column, direction },
            { preserveState: true, replace: true }
        );
    };

    return (
        <div className="table-wrapper">
            <div className="table-responsive">
                <table className="data-table">
                    <thead>
                        <tr>
                            {SORT_COLUMNS.map((col) => (
                                <th key={col.column} onClick={() => handleSort(col.column)}>
                                    <div className="th-content">
                                        <span>{col.label}</span>
                                        <SortIcon active={filters.sort === col.column} direction={filters.direction} />
                                    </div>
                                </th>
                            ))}
                            <th style={{ textAlign: "center", width: 120 }}>
                                <div className="th-content" style={{ justifyContent: "center" }}>
                                    <span>Acciones</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={7} style={{ textAlign: "center", padding: "48px 18px", color: "var(--text-muted)" }}>
                                    No se encontraron resultados
                                </td>
                            </tr>
                        ) : (
                            data.map((row) => (
                                <tr key={row.id}>
                                    <td style={{ fontWeight: 600 }}>{row.nombre_comercial}</td>
                                    <td style={{ color: "var(--text-muted)" }}>{row.folio}</td>
                                    <td style={{ color: "var(--text-muted)" }}>{row.rfc || "—"}</td>
                                    <td>
                                        <Badge variant={row.type}>{TYPE_LABEL[row.type] || row.type}</Badge>
                                    </td>
                                    <td>
                                        {row.fecha_registro ? dayjs(row.fecha_registro).format("DD MMM YYYY") : "—"}
                                    </td>
                                    <td>{row.contacto_nombre || "—"}</td>
                                    <td style={{ textAlign: "center" }}>
                                        <RowActions
                                            view
                                            edit
                                            timeline={false}
                                            remove={false}
                                            onView={() => onView?.(row)}
                                            onEdit={() => onEdit?.(row)}
                                        />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
