import { useMemo } from "react";

import DashboardLayout from "@/components/layouts/dashboard-layout";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";

const columns = [
    { accessorKey: "no", header: "No." },
    { accessorKey: "name", header: "Kategori Sampel" },
    {
        accessorKey: "created_at",
        header: "Dibuat",
        cell: ({ row }) =>
            row.created_at
                ? new Date(row.created_at).toLocaleDateString()
                : "-",
    },
];

export default function ManagerSampleCategoryPage({ categories = [] }) {
    const tableData = useMemo(
        () =>
            (categories || []).map((category) => ({
                id: category.id,
                name: category.name || "-",
                created_at: category.created_at,
            })),
        [categories]
    );

    return (
        <DashboardLayout title="Kategori Sampel" header="Kategori Sampel">
            <ManagedDataTable
                data={tableData}
                columns={columns}
                showCreate={false}
                showFilter={false}
            />
        </DashboardLayout>
    );
}
