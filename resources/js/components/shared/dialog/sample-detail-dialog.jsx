import DetailDialog from "../dialog/detail-dialog";

const statusVariantMap = {
    done: "success",
    in_progress: "warning",
};

const conditionVariantMap = {
    good: "success",
    gamaged: "error",
    expired: "error",
};

export default function SampleDetailsDialog({ sample, isOpen, onOpenChange }) {
    if (!sample) return null;

    return (
        <DetailDialog
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            title={`Detail sampel - ${sample.name}.`}
            fields={[
                { label: "Kategori", value: sample.cathegory },
                { label: "Wujud", value: sample.form },
                { label: "Metode Penyimpanan", value: sample.preservation_method },
                {
                    label: "Kondisi",
                    value: sample.condition,
                    badge: true,
                    variant: conditionVariantMap[sample.condition] || "outline",
                },
                {
                    label: "Status",
                    value:
                        sample.status.charAt(0).toUpperCase() +
                        sample.status.slice(1).replace(/([A-Z])/g, " $1"),
                    badge: true,
                    variant: statusVariantMap[sample.status] || "outline",
                },
            ]}
        />
    );
}
