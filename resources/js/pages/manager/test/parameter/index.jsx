import { useMemo } from "react";

import DashboardLayout from "@/components/layouts/dashboard-layout";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { Badge } from "@/components/ui/badge";

const columns = [
    { accessorKey: "no", header: "No." },
    { accessorKey: "name", header: "Parameter Uji" },
    {
        accessorKey: "category",
        header: "Kategori",
        cell: ({ row }) => (
            <Badge variant="secondary" className="capitalize">
                {row.category || "-"}
            </Badge>
        ),
    },
    {
        accessorKey: "detection_limit",
        header: "Detection Limit",
        cell: ({ row }) => (
            <Badge variant="info" className="uppercase">
                {row.detection_limit || "-"}
            </Badge>
        ),
    },
    { accessorKey: "unit", header: "Satuan" },
    { accessorKey: "quality_standard", header: "Baku Mutu" },
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

export default function ManagerTestParametersPage({ parameters = [] }) {
    const tableData = useMemo(
        () =>
            (parameters || []).map((param) => ({
                id: param.id,
                name: param.name || "-",
                category: param.category || "-",
                detection_limit:
                    (param.detection_limit || "").toString().toUpperCase() ||
                    "-",
                unit: param.unit_values?.value || "-",
                reference: param.reference_standards?.name || "-",
                quality_standard: param.quality_standard || "-",
            })),
        [parameters]
    );

    const categoryFilterOptions = useMemo(() => {
        const unique = Array.from(
            new Set(
                tableData
                    .map((item) => item.category)
                    .filter((item) => item && item !== "-")
            )
        );

        return [
            { value: "all", label: "Semua Kategori" },
            ...unique.map((value) => ({
                value,
                label: value.charAt(0).toUpperCase() + value.slice(1),
            })),
        ];
    }, [tableData]);

    return (
        <DashboardLayout title="Parameter Uji" header="Parameter Uji">
            <ManagedDataTable
                data={tableData}
                columns={columns}
                showCreate={false}
                showFilter={true}
                filterColumn="category"
                filterOptions={categoryFilterOptions}
            />
        </DashboardLayout>
    );
}
