import DetailSheet from "@/components/layouts/detail-sheet";

const statusVariantMap = {
    active: "success",
    maintenance: "warning",
    broken: "error",
};

export default function ReferenceDetailSheet({ data, isOpen, onOpenChange }) {
    if (!data) return null;

    return (
        <DetailSheet
            open={isOpen}
            onOpenChange={onOpenChange}
            title={`Detail Referensi #${data.id}`}
            description={`Detail Referensi ${data.name}.`}
            fields={[
                { label: "Nama Referensi", value: data.name },
            ]}
        />

    );
}