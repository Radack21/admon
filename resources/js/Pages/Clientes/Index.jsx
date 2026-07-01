import { useState, useCallback, useRef } from "react";
import { router, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import TabsBar from "@/Components/tabs/TabsBar";
import TableCard from "@/Components/table/TableCard";
import Pagination from "@/Components/table/Pagination";
import ClientesDataTable from "./ClientesDataTable";
import CreateClientModal from "./CreateClientModal";

export default function ClientesIndex() {
    const { clientes, filters } = usePage().props;
    const [activeTab, setActiveTab] = useState(
        filters.tab === "potenciales" ? 1 : filters.tab === "mailing" ? 2 : 0
    );
    const [search, setSearch] = useState(filters.search || "");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const debounceRef = useRef(null);

    const tabs = ["Directorio", "Potenciales", "Mailing"];

    const debouncedSearch = useCallback(
        (value) => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(() => {
                router.get(
                    route("clientes.index"),
                    {
                        tab: tabs[activeTab].toLowerCase(),
                        search: value,
                        sort: filters.sort,
                        direction: filters.direction,
                    },
                    { preserveState: true, replace: true }
                );
            }, 300);
        },
        [activeTab, filters.sort, filters.direction]
    );

    const handleSearch = (value) => {
        setSearch(value);
        debouncedSearch(value);
    };

    const handleTabChange = (index) => {
        setActiveTab(index);
        router.get(
            route("clientes.index"),
            {
                tab: tabs[index].toLowerCase(),
                search: search,
                sort: filters.sort,
                direction: filters.direction,
            },
            { preserveState: true, replace: true }
        );
    };

    const currentTab = tabs[activeTab].toLowerCase();

    return (
        <AppLayout breadcrumb="Clientes">
            <TabsBar tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />

            <div className="flex-1 overflow-y-auto py-[18px] flex flex-col gap-3.5 scrollbar-thin">
                {currentTab !== "mailing" ? (
                    <TableCard
                        searchValue={search}
                        onSearch={handleSearch}
                        searchPlaceholder="Buscar cliente, RFC, folio, contacto..."
                        actionLabel={currentTab === "potenciales" ? "+ Nuevo potencial" : "+ Nuevo cliente"}
                        onAction={() => setShowCreateModal(true)}
                        showDateRange={false}
                    >
                        <ClientesDataTable clientes={clientes} filters={filters} />
                        <Pagination
                            currentPage={clientes.current_page || 1}
                            total={clientes.total || 0}
                            perPage={clientes.per_page || 10}
                        />
                    </TableCard>
                ) : (
                    <TableCard>
                        <div className="flex items-center justify-center py-20 text-white/40 text-sm">
                            Historial de mailing — próximamente
                        </div>
                    </TableCard>
                )}
            </div>

            {showCreateModal && (
                <CreateClientModal
                    onClose={() => setShowCreateModal(false)}
                    type={currentTab}
                />
            )}
        </AppLayout>
    );
}
