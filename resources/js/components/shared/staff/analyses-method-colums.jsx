import { Checkbox } from "@/components/ui/checkbox";

export const getMethodColumns = ({ selectedItems, onSelect }) => [
    { accessorKey: "no", header: "No." },
    { accessorKey: "analyses_method", header: "Nama Metode Analisis" },
    {
        accessorKey: "price",
        header: "Harga",
        cell: ({ row }) => {
            const price = row.price;
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
            }).format(price);
        },
    },

    {
        accessorKey: "select",
        header: "Aksi",
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

export const getMethodSelectedColumns = [
    { accessorKey: "no", header: "No." },
    { accessorKey: "analyses_method", header: "Nama" },
    { accessorKey: "description", header: "Deskripsi" },
    {
        accessorKey: "price",
        header: "Harga",
        cell: ({ row }) => {
            const price = row.price;
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
            }).format(price);
        },
    },
];
