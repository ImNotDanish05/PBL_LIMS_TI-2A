import ActionColumn from "../tabel/action-column";

export const getReagentsColumns = ({ onShowDetail }) => [
    { accessorKey: "no", header: "No.", enableSorting: false },
    { accessorKey: "name", header: "Nama", enableSorting: true },
    { accessorKey: "formula", header: "Formula", enableSorting: true },
    { accessorKey: "storage_location", header: "Lokasi", enableSorting: true },
    {
        id: "aksi",
        header: "Aksi",
        enableSorting: true,
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

export const getGradesColumns = ({ onShowDetail }) => [
    { accessorKey: "no", header: "No.", enableSorting: false },
    { accessorKey: "name", header: "Nama", enableSorting: true },
    {
        id: "aksi",
        header: "Aksi",
        enableSorting: true,
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

export const getSuppliersColumns = ({ onShowDetail }) => [
    { accessorKey: "no", header: "No.", enableSorting: false },
    { accessorKey: "name", header: "Nama", enableSorting: true },
    { accessorKey: "phone_number", header: "Telepon", enableSorting: true },
    { accessorKey: "address", header: "Alamat", enableSorting: true },
    {
        id: "aksi",
        header: "Aksi",
        enableSorting: true,
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
