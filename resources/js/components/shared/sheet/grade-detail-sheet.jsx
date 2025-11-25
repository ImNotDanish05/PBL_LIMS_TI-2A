import DetailSheet from "@/components/layouts/detail-sheet";

const statusVariantMap = {
    active: "success",
    maintenance: "warning",
    broken: "error",
};

export default function GradeDetailSheet({ data, isOpen, onOpenChange }) {
    if (!data) return null;

    return (
        <DetailSheet
            open={isOpen}
            onOpenChange={onOpenChange}
            title={`Detail Grade #${data.id}`}
            description={`Detail Grade ${data.name}.`}
            fields={[
                { label: "Grades", value: data.name },
            ]}
        />

    );
}