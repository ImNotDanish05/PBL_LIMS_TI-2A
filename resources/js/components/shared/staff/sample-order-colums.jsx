import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const conditionVariantMap = {
    good: "success",
    damaged: "warning",
    expired: "error",
};

export const getSampleColumnsOrder = ({ selectedItems, onSelect }) => [
    { accessorKey: "no", header: "No." },
    { accessorKey: "name", header: "Nama Sampel" },
    {
        accessorKey: "sample_categories.name",
        header: "Kategori",
        cell: ({ row }) => {
            return row.sample_categories?.name || "-";
        },
    },
    {
        accessorKey: "condition",
        header: "Kondisi",
        cell: ({ row }) => {
            const value = row.condition;
            return (
                <Badge
                    variant={conditionVariantMap[value] || "outline"}
                    className="capitalize"
                >
                    {value}
                </Badge>
            );
        },
    },
    {
        accessorKey: "select",
        header: "Pilih",
        cell: ({ row }) => {
            const data = row; // pastikan ambil data lengkap
            const isSelected = selectedItems?.some((s) => s.id === data.id);
            return (
                <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => onSelect(data)}
                />
            );
        },
    },
];

export const getSampleSelectedColumnsOrder = [
    { accessorKey: "no", header: "No." },
    { accessorKey: "name", header: "Nama" },
    {
        accessorKey: "sample_categories.name",
        header: "Kategori",
        cell: ({ row }) => {
            return row.sample_categories?.name || "-";
        },
    },
    { accessorKey: "form", header: "Bentuk" },
    {
        accessorKey: "condition",
        header: "Kondisi",
        cell: ({ row }) => {
            const value = row.condition;
            return (
                <Badge
                    variant={conditionVariantMap[value] || "outline"}
                    className="capitalize"
                >
                    {value}
                </Badge>
            );
        },
    },
    { accessorKey: "sample_volume", header: "Volume" },
];
