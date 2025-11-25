import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from '@inertiajs/react';
import { FileText, History } from "lucide-react";

const statusVariantMap = {
    completed: "success",
    in_progress: "warning",
    pending: "info",
    disapproved: "error",
    approved: "approved",
    received: "received",
};


export const getOrdersColumns = ({ onShowDetail, onShowHistory }) => [
    { accessorKey: "no", header: "No." },
    { accessorKey: "order_number", header: "Kode Pesanan" },
    { accessorKey: "title", header: "Judul Pesanan" },
    { accessorKey: "estimate_date", header: "Estimasi Selesai" },
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
                    onClick={() => onShowHistory(row)}
                >
                    History
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onShowDetail(row)}
                >
                    Detail
                </Button>
            </div>
        ),
    },
];
