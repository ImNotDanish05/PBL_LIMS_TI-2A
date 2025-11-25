import DetailSheet from "@/components/layouts/detail-sheet";

const statusVariantMap = {
    active: "success",
    maintenance: "warning",
    broken: "error",
};

export default function MethodDetailSheet({ data, isOpen, onOpenChange }) {
    if (!data) return null;

    return (
        <DetailSheet
            open={isOpen}
            onOpenChange={onOpenChange}
            title={`Detail Method #${data.id}`}
            description={`Detail Method ${data.name}.`}
            fields={[
                { label: "Nama Methode", value: data.name },
                { label: "Referensi", value: data.reference_standards.name },
                { label: "Parameter Berlaku", value: data.applicable_parameter },
                { label: "Durasi", value: data.duration },
                { label: "Masa Berlaku", value: data.validity_period },

            ]}
        />

    );
}