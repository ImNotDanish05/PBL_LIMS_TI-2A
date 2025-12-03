import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from '@inertiajs/react';
import { FileText, History } from "lucide-react";

const statusVariantMap = {
    done: "success",
    in_progress: "warning",
};

const conditionVariantMap = {
    Eksternal: "warning",
    Internal: "info",
    Urgent: "error",
};

export const getSampleColumns = ({ onShowDetail }) => [
    { accessorKey: "name", header: "Nama Sampel" },
    { accessorKey: "cathegory", header: "Kategori Sampel" },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const value = row.status;
            return (
                <Badge variant={statusVariantMap[value] || "outline"}>
                    {value}
                </Badge>
            );
        },
    },
    {
        id: "aksi",
        header: "Aksi",
        cell: ({ row }) => (
            <div className="flex gap-2">
                <Button
                variant="outline"
                size="sm"
                onClick={() => onShowDetail(row)}
                >
                    <FileText/>
                </Button>
            </div>
        ),
    },
];
