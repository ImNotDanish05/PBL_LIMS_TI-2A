import { Button } from "@/components/ui/button";
import { Copy, ListFilter } from "lucide-react";

export const getReportsColumns = ({ onShowDetail }) => [
    { accessorKey: "no", header: "No." },
    {
        accessorKey: "sample",
        header: (
            <div className="flex items-center gap-2">
                Sample
                <ListFilter size={16} />
            </div>
        ),
    },
    {
        accessorKey: "client",
        header: (
            <div className="flex items-center gap-2">
                Client
                <ListFilter size={16} />
            </div>
        ),
    },
    {
        accessorKey: "analis",
        header: (
            <div className="flex items-center gap-2">
                Analis
                <ListFilter size={16} />
            </div>
        ),
    },
    {
        accessorKey: "report",
        header: "Report",
        cell: ({ row }) => (
            <button className="flex items-center gap-1.5 text-xs bg-primary-hijauMuda hover:bg-primary-hijauTua text-white px-3 py-1.5 rounded-md font-semibold">
                File <Copy size={12} />
            </button>
        ),
    },
    {
        accessorKey: "aksi",
        header: "Aksi",
        cell: ({ row }) => (
            <Button
                variant="outline"
                size="sm"
                onClick={() => onShowDetail(row)}
            >
                Detail
            </Button>
        ),
    },
];
