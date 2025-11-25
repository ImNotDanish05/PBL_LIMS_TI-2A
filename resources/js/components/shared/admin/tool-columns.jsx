import { Badge } from "@/components/ui/badge";
import ActionColumn from "../tabel/action-column";
import { getEquipmentStatusVariant, getOrderTypeVariant } from "@/utils/statusUtils";

export const getEquipmentsColumns = ({ onShowDetail }) => [
    { accessorKey: 'no', header: 'No.', enableSorting: false, },
    { accessorKey: 'name', header: 'Nama Alat', enableSorting: true, },
    { accessorKey: 'purchase_year', header: 'Tahun Pembelian', enableSorting: true, },
    {
        accessorKey: "calibration_schedule",
        header: "Jadwal Kalibrasi",
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.calibration_schedule;
            return (
                <Badge
                    variant={getOrderTypeVariant(value) || "outline"}
                    className="capitalize"
                >
                    {value}
                </Badge>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.status;
            return (
                <Badge
                    variant={getEquipmentStatusVariant(value) || "outline"}
                    className="capitalize"
                >
                    {value}
                </Badge>
            );
        },
    },
    { accessorKey: 'location', header: 'Lokasi', enableSorting: true, },
    {
        id: "aksi",
        header: "Aksi",
        enableSorting: false,
        cell: ({ row, onEdit, onDelete }) => (
            <ActionColumn onDetail={onShowDetail} onEdit={onEdit} onDelete={onDelete} row={row} />
        ),
    },
];

export const getBrandsColumns = ({ onShowDetail }) => [
    { accessorKey: 'no', header: 'No.', enableSorting: false, },
    { accessorKey: 'name', header: 'Nama Alat', enableSorting: true, },
    {
        id: "aksi",
        header: "Aksi",
        enableSorting: false,
        cell: ({ row, onEdit, onDelete }) => (
            <ActionColumn onDetail={onShowDetail} onEdit={onEdit} onDelete={onDelete} row={row} />
        ),
    },
];


