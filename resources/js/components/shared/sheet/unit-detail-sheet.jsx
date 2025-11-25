import DetailSheet from "@/components/layouts/detail-sheet";

const statusVariantMap = {
    active: "success",
    maintenance: "warning",
    broken: "error",
};

export default function UnitDetailSheet({ data, isOpen, onOpenChange }) {
    if (!data) return null;

    return (
        <DetailSheet
            open={isOpen}
            onOpenChange={onOpenChange}
            title={`Detail Parameter #${data.id}`}
            description={`Detail Unit ${data.value}.`}
            fields={[
                { label: "Satuan", value: data.value },
            ]}
        />

    );
}