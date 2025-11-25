import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from '@inertiajs/react';
import { FileText, Check, Ban } from "lucide-react";

const statusVariantMap = {
    Done: "success",
    "In Progress": "warning",
};

export const getSampleColumns = ({ onShowDetail, onShowConfirm, onShowUnConfirm }) => [
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
                {row.status === 'In Progress' && (
                    <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onShowConfirm(row)}
                    >
                        <Check/>
                    </Button>
                )}
                {row.status === 'Done' && (
                    <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onShowUnConfirm(row)}
                    >
                        <Ban className="text-red-600"/>
                    </Button>
                )}
            </div>
        ),
    },
];
