import { Checkbox } from "@/components/ui/checkbox";

export const getTrainingAnalystColumns = ({ selectedTrainings, onSelectTraining }) => [
    { accessorKey: "no", header: "No." },
    { accessorKey: "name", header: "Nama Pelatihan" },
    { accessorKey: "provider", header: "Penyedia" },
    { accessorKey: "date", header: "Tanggal Pelatihan" },
    { accessorKey: "result", header: "Hasil" },
    {
        accessorKey: "select",
        header: "Pilih",
        enableSorting: false,
        cell: ({ row }) => {
            const data = row;
            const isSelected = selectedTrainings.some((s) => s.id === data.id);
            return (
                <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => onSelectTraining(data)}
                />
            );
        },
    },
];

export const getCertificateAnalystColumns = ({ selectedCertificates, onSelectCertificate }) => [
    { accessorKey: "no", header: "No." },
    { accessorKey: "name", header: "Nama Sertifikat" },
    { accessorKey: "issued_date", header: "Tanggal Terbit" },
    { accessorKey: "expired_date", header: "Tanggal Kadaluarsa" },
    {
        accessorKey: "select",
        header: "Pilih",
        enableSorting: false,
        cell: ({ row }) => {
            const data = row;
            const isSelected = selectedCertificates.some((s) => s.id === data.id);
            return (
                <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => onSelectCertificate(data)}
                />
            );
        },
    },
];