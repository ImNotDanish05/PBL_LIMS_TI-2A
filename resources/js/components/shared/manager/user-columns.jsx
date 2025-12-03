import { Button } from "@/components/ui/button";

export const getUsersColumns = ({ onShowDetail }) => [
    { accessorKey: 'no', header: 'No.' },
    { accessorKey: 'name', header: 'Nama' },
    { accessorKey: 'role', header: 'Role' },
    { accessorKey: 'email', header: 'Email' },
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