import DetailSheet from "@/components/layouts/detail-sheet";

export default function TrainingDetailSheet({ data, isOpen, onOpenChange }) {
    if (!data) return null;

    return (
        <DetailSheet
            open={isOpen}
            onOpenChange={onOpenChange}
            title={`Detail Pelatihan #${data.id}`}
            description={`Detail Pelatihan ${data.name}.`}
            fields={[
                { label: "Nama Pelatihan", value: data.name },
                { label: "Provider",value: data.provider},
                { label: "Tanggal Pelatihan",value: data.date},
                { label: "Hasil",value: data.result}
            ]}
        />

    );
}