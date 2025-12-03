import DetailSheet from "@/components/layouts/detail-sheet";

const statusVariantMap = {
    kimia: "success",
    fisika: "warning",
    mikrobiologi: "error",
};

const statusVariantDescription = {
    LOQ: "warning",
    LOD: "error",
};

export default function ParameterDetailSheet({ data, isOpen, onOpenChange }) {
    if (!data) return null;

    return (
        <DetailSheet
            open={isOpen}
            onOpenChange={onOpenChange}
            title={`Detail Parameter #${data.id}`}
            description={`Detail Parameter ${data.name}.`}
            fields={[
                { label: "Nama Parameter", value: data.name },
                { label: "Satuan", value: data.unit_values.value},
                { label: "Referensi", value: data.reference_standards.name },
                { label: "Kategori", value: data.category, badge: true, variant: statusVariantMap[data.category] || "outline" },
                { label: "Direction Limit", value: data.detection_limit, badge: true, variant: statusVariantDescription[data.detection_limit] || "outline" },
                { label: "Standar Kualitas", value: data.quality_standard}

            ]}
        />

    );
}