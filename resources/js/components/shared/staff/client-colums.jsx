import ActionColumn from "../tabel/action-column";
import { Button } from "@/components/ui/button";

export const getClientColumns = ({ onShowDetail }) => [
    { accessorKey: "no", header: "No." },
    { accessorKey: "name", header: "Nama" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone_number", header: "Nomor Telepon" },
    {
        accessorKey: "aksi",
        header: "Aksi",
        cell: ({ row, onEdit, onDelete }) => (
            <ActionColumn
                onDetail={onShowDetail}
                onEdit={onEdit}
                onDelete={onDelete}
                row={row}
            />
        ),
    },
];

export const getClientOrderColumns = ({ onSelectClient }) => [
    { accessorKey: "no", header: "No." },
    { accessorKey: "name", header: "Nama Client" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone_number", header: "Nomor Telepon" },
    {
        accessorKey: "select",
        header: "Aksi",
        cell: ({ row }) => {
            const data = row; // pastikan ambil data lengkap
            // const isSelected = selectedMethods.some((s) => s.id === data.id);
            return (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSelectClient(data)}
                >
                    Pilih
                </Button>
            );
        },
    },
];
