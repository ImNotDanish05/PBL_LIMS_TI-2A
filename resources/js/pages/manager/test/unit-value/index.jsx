import { useMemo } from "react";

import DashboardLayout from "@/components/layouts/dashboard-layout";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";

const columns = [
    { accessorKey: "no", header: "No." },
    { accessorKey: "value", header: "Nilai Satuan" },
    {
        accessorKey: "created_at",
        header: "Dibuat",
        cell: ({ row }) =>
            row.created_at
                ? new Date(row.created_at).toLocaleDateString()
                : "-",
    },
];

export default function ManagerUnitValuePage({ units = [] }) {
    const tableData = useMemo(
        () =>
            (units || []).map((unit) => ({
                id: unit.id,
                value: unit.value || "-",
                created_at: unit.created_at,
            })),
        [units]
    );

    return (
        <DashboardLayout title="Nilai Satuan" header="Nilai Satuan">
            <ManagedDataTable
                data={tableData}
                columns={columns}
                showCreate={false}
                showFilter={false}
            />
        </DashboardLayout>
    );
}
