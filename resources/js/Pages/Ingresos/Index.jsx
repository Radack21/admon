import AppLayout from "@/Layouts/AppLayout";
import TabsBar from "@/Components/tabs/TabsBar";
import TableCard from "@/Components/table/TableCard";
import DataTable from "@/Components/table/DataTable";
import Pagination from "@/Components/table/Pagination";

export default function IngresosIndex() {
    return (
        <AppLayout breadcrumb="Ingresos">
            <TabsBar tabs={["Ingresos", "Categorías", "Estatus"]} activeTab={0} />

            <div className="flex-1 overflow-y-auto py-[18px] flex flex-col gap-3.5 scrollbar-thin">
                <TableCard>
                    <DataTable />
                    <Pagination currentPage={1} total={248} perPage={10} />
                </TableCard>
            </div>
        </AppLayout>
    );
}
