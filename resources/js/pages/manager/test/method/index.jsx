import { useMemo } from "react";

import DashboardLayout from "@/components/layouts/dashboard-layout";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { Badge } from "@/components/ui/badge";

const columns = [
    { accessorKey: "no", header: "No." },
    { accessorKey: "name", header: "Metode Uji" },
    { accessorKey: "applicable_parameter", header: "Parameter Berlaku" },
    {
        accessorKey: "duration",
        header: "Durasi (menit)",
        cell: ({ row }) =>
            typeof row.duration === "number" ? `${row.duration} menit` : "-",
    },
    {
        accessorKey: "validity_period",
        header: "Masa Berlaku",
        cell: ({ row }) =>
            row.validity_period
                ? new Date(row.validity_period).toLocaleDateString()
                : "-",
    },
    {
        accessorKey: "reference",
        header: "Standar Referensi",
        cell: ({ row }) => (
            <Badge variant="info" className="bg-primary-hijauMuda/10 text-primary-hijauTua border-primary-hijauMuda">
                {row.reference || "Tidak ada"}
            </Badge>
        ),
    },
];

export default function ManagerTestMethodsPage({ methods = [] }) {
    const tableData = useMemo(
        () =>
            (methods || []).map((method) => ({
                id: method.id,
                name: method.name || "-",
                applicable_parameter: method.applicable_parameter || "-",
                duration:
                    typeof method.duration === "number"
                        ? method.duration
                        : Number(method.duration) || null,
                validity_period: method.validity_period || null,
                reference: method.reference_standards?.name || "-",
            })),
        [methods]
    );

    const referenceFilterOptions = useMemo(() => {
        const unique = Array.from(
            new Set(
                tableData
                    .map((item) => item.reference)
                    .filter((item) => item && item !== "-")
            )
        );

        return [
            { value: "all", label: "Semua Referensi" },
            ...unique.map((value) => ({ value, label: value })),
        ];
    }, [tableData]);

    return (
        <DashboardLayout title="Metode Uji" header="Metode Uji">
            <ManagedDataTable
                data={tableData}
                columns={columns}
                showCreate={false}
                showFilter={true}
                filterColumn="reference"
                filterOptions={referenceFilterOptions}
            />
        </DashboardLayout>
    );
}
