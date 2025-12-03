import { Badge } from "@/components/ui/badge";
import ActionColumn from "../tabel/action-column";
import { Copy } from "lucide-react";
import { getCategoryTypeVariant, getDetectionTypeVariant } from "@/utils/statusUtils";

export const getParametersColumns = ({ onShowDetail }) => [
    { accessorKey: "no", header: "No.", enableSorting: false },
    { accessorKey: "name", header: "Nama Parameter", enableSorting: true },
    {
        accessorKey: "category",
        header: "Kategori",
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.category;
            return (
                <Badge
                    variant={getCategoryTypeVariant(value) || "outline"}
                    className="capitalize"
                >
                    {value}
                </Badge>
            );
        },
    },
    {
        accessorKey: "detection_limit",
        header: "Detection Limit",
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.detection_limit;
            return (
                <Badge
                    variant={getDetectionTypeVariant(value) || "outline"}
                    className="capitalize"
                >
                    {value}
                </Badge>
            );
        },
    },
    { accessorKey: "quality_standard", header: "Standar Kualitas", enableSorting: true },
    {
        id: "aksi",
        header: "Aksi",
        enableSorting: false,
        cell: ({ row, onEdit, onDelete }) => (
            <ActionColumn onDetail={onShowDetail} onEdit={onEdit} onDelete={onDelete} row={row} />
        ),
    },
];

export const getMethodsColumns = ({ onShowDetail }) => [
    { accessorKey: "no", header: "No.", enableSorting: false },
    { accessorKey: "name", header: "Nama Metode", enableSorting: true },
    { accessorKey: "applicable_parameter", header: "Parameter Berlaku", enableSorting: true },
    { accessorKey: "duration", header: "Durasi", enableSorting: true },
    { accessorKey: "validity_period", header: "Masa Berlaku", enableSorting: true },
    {
        id: "aksi",
        header: "Aksi",
        enableSorting: false,
        cell: ({ row, onEdit, onDelete }) => (
            <ActionColumn onDetail={onShowDetail} onEdit={onEdit} onDelete={onDelete} row={row} />
        ),
    },
];

export const getUnitsColumns = ({ onShowDetail }) => [
    { accessorKey: "no", header: "No.", enableSorting: false },
    { accessorKey: "value", header: "Satuan", enableSorting: true },
    {
        id: "aksi",
        header: "Aksi",
        enableSorting: false,
        cell: ({ row, onEdit, onDelete }) => (
            <ActionColumn onDetail={onShowDetail} onEdit={onEdit} onDelete={onDelete} row={row} />
        ),
    },
];

export const getStandardsColumns = ({ onShowDetail }) => [
    { accessorKey: "no", header: "No.", enableSorting: false },
    { accessorKey: "name", header: "Nama Alat", enableSorting: true },
    {
        id: "aksi",
        header: "Aksi",
        enableSorting: false,
        cell: ({ row, onEdit, onDelete }) => (
            <ActionColumn onDetail={onShowDetail} onEdit={onEdit} onDelete={onDelete} row={row} />
        ),
    },
];

export const getSampleCategoriesColumns = ({ onShowDetail }) => [
    { accessorKey: "no", header: "No.", enableSorting: false },
    { accessorKey: "name", header: "Nama Kategori", enableSorting: true },
    {
        id: "aksi",
        header: "Aksi",
        enableSorting: false,
        cell: ({ row, onEdit, onDelete }) => (
            <ActionColumn onDetail={onShowDetail} onEdit={onEdit} onDelete={onDelete} row={row} />
        ),
    },
];

export const getSertifColumns = ({ onShowDetail }) => [
    { accessorKey: "no", header: "No.", enableSorting: false },
    { accessorKey: "name", header: "Nama Sertifikat", enableSorting: true },
    {
        accessorKey: "analyst.name",
        header: "Analis",
        enableSorting: true,
        cell: ({ row }) => {
            return row.analyst?.name || "-";
        },
    },
    { accessorKey: "issued_date", header: "Tanggal Terbit", enableSorting: true },
    { accessorKey: "expired_date", header: "Tanggal Kadaluarsa", enableSorting: true },
    {
        accessorKey: "file_path",
        header: "File",
        enableSorting: true,
        cell: ({ row }) => (
            <button className="flex items-center gap-1.5 text-xs bg-primary-hijauMuda hover:bg-primary-hijauTua text-white px-3 py-1.5 rounded-md font-semibold">
                File <Copy size={12} />
            </button>
        ),
    },
    {
        id: "aksi",
        header: "Aksi",
        enableSorting: false,
        cell: ({ row, onEdit, onDelete }) => (
            <ActionColumn onDetail={onShowDetail} onEdit={onEdit} onDelete={onDelete} row={row} />
        ),
    },
];

export const getTrainingColumns = ({ onShowDetail }) => [
    { accessorKey: "no", header: "No.", enableSorting: false },
    { accessorKey: "name", header: "Nama Sertifikat", enableSorting: true },
    { accessorKey: "provider", header: "Nama Penyedia", enableSorting: true },
    { accessorKey: "date", header: "Tanggal Pelatihan", enableSorting: true },
    { accessorKey: "result", header: "Hasil", enableSorting: true },
    {
        id: "aksi",
        header: "Aksi",
        enableSorting: false,
        cell: ({ row, onEdit, onDelete }) => (
            <ActionColumn onDetail={onShowDetail} onEdit={onEdit} onDelete={onDelete} row={row} />
        ),
    },
];
