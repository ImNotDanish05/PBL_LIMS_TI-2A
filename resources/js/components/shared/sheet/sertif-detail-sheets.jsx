import DetailSheet from "@/components/layouts/detail-sheet";

export default function SertifDetailSheet({ data, isOpen, onOpenChange }) {
    if (!data) return null;

    return (
        <DetailSheet
            open={isOpen}
            onOpenChange={onOpenChange}
            title={`Detail Sertifikat ke-${data.id}`}
            description={`Detail Sertifikat ${data.name}.`}
            fields={[
                { label: "Nama Sertifikat", value: data.name },
                { label: "Nama Analis", value: data.analyst.name },
                { label: "Tanggal Terbit", value: data.issued_date },
                { label: "Tanggal Kadaluarsa", value: data.expired_date },
            ]}
        />

    );
}