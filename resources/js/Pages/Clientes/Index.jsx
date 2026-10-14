import { useState, useCallback, useRef } from "react";
import { router, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import Tabs from "@/Components/ui/Tabs";
import TableCard from "@/Components/ui/TableCard";
import TablePagination from "@/Components/ui/TablePagination";
import ClientesDataTable from "./ClientesDataTable";
import CreateClientModal from "./CreateClientModal";
import ClientDetailModal from "./ClientDetailModal";

const TABS = [
    { label: "Directorio", value: "directorio" },
    { label: "Potenciales", value: "potenciales" },
    { label: "Mailing", value: "mailing" },
];

export default function ClientesIndex() {
    const { clientes, filters } = usePage().props;
    const [search, setSearch] = useState(filters.search || "");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingClient, setEditingClient] = useState(null);
    const [viewingClient, setViewingClient] = useState(null);
    const debounceRef = useRef(null);

    const currentTab = filters.tab || "directorio";

    const go = (params) =>
        router.get(
            route("clientes.index"),
            { tab: currentTab, search, sort: filters.sort, direction: filters.direction, ...params },
            { preserveState: true, replace: true }
        );

    const debouncedSearch = useCallback(
        (value) => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(() => {
                router.get(
                    route("clientes.index"),
                    { tab: currentTab, search: value, sort: filters.sort, direction: filters.direction },
                    { preserveState: true, replace: true }
                );
            }, 300);
        },
        [currentTab, filters.sort, filters.direction]
    );

    const handleSearch = (value) => {
        setSearch(value);
        debouncedSearch(value);
    };

    const handleTabChange = (value) => {
        setSearch("");
        router.get(
            route("clientes.index"),
            { tab: value, search: "", sort: filters.sort, direction: filters.direction },
            { preserveState: true, replace: true }
        );
    };

    return (
        <AppLayout breadcrumb="Clientes">
            <div className="mx-[22px] mt-3">
                <Tabs variant="capsule" value={currentTab} onChange={handleTabChange} tabs={TABS} />
            </div>

            <div className="flex-1 overflow-y-auto py-[18px] flex flex-col gap-3.5 scrollbar-thin">
                {currentTab !== "mailing" ? (
                    <TableCard
                        className="mx-[22px]"
                        searchPlaceholder="Buscar cliente, RFC, folio, contacto..."
                        searchValue={search}
                        onSearch={handleSearch}
                        filterFields={[
                            { key: "fecha", label: "Fecha" },
                            { key: "estatus", label: "Estatus" },
                            { key: "rfc", label: "RFC" },
                            { key: "contacto", label: "Contacto" },
                        ]}
                        estatusOptions={["Activo", "Inactivo", "Potencial"]}
                        onAdd={() => setShowCreateModal(true)}
                    >
                        <ClientesDataTable
                            clientes={clientes}
                            filters={filters}
                            onView={(row) => setViewingClient(row)}
                            onEdit={(row) => setEditingClient(row)}
                        />
                        <TablePagination
                            currentPage={clientes.current_page || 1}
                            total={clientes.total || 0}
                            perPage={clientes.per_page || 10}
                        />
                    </TableCard>
                ) : (
                    <TableCard className="mx-[22px]" showFilter={false} searchPlaceholder="Buscar...">
                        <div
                            className="flex items-center justify-center py-20"
                            style={{ color: "var(--text-muted)", fontSize: 13 }}
                        >
                            Historial de mailing — próximamente
                        </div>
                    </TableCard>
                )}
            </div>

            {showCreateModal && (
                <CreateClientModal onClose={() => setShowCreateModal(false)} type={currentTab} />
            )}

            {editingClient && (
                <CreateClientModal
                    onClose={() => setEditingClient(null)}
                    client={editingClient}
                    type={currentTab}
                />
            )}

            {viewingClient && (
                <ClientDetailModal
                    client={viewingClient}
                    onClose={() => setViewingClient(null)}
                    onEdit={(client) => {
                        setViewingClient(null);
                        setEditingClient(client);
                    }}
                />
            )}
        </AppLayout>
    );
}
