import { useMemo } from "react";

import DashboardLayout from "@/components/layouts/dashboard-layout";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";

const columns = [
    { accessorKey: "no", header: "No." },
    { accessorKey: "name", header: "Standar Referensi" },
    {
        accessorKey: "created_at",
        header: "Dibuat",
        cell: ({ row }) =>
            row.created_at
                ? new Date(row.created_at).toLocaleDateString()
                : "-",
    },
];

export default function ManagerStandardReferencePage({ references = [] }) {
    const tableData = useMemo(
        () =>
            (references || []).map((reference) => ({
                id: reference.id,
                name: reference.name || "-",
                created_at: reference.created_at,
            })),
        [references]
    );

    return (
        <DashboardLayout title="Standar Referensi" header="Standar Referensi">
            <ManagedDataTable
                data={tableData}
                columns={columns}
                showCreate={false}
                showFilter={false}
            />
        </DashboardLayout>
    );
}
