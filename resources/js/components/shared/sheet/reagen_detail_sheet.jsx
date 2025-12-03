import DetailSheet from "@/components/layouts/detail-sheet";

export default function ReagentsDetailSheet({ data, isOpen, onOpenChange }) {
    if (!data) return null;

    return (
        <DetailSheet
            open={isOpen}
            onOpenChange={onOpenChange}
            title={`Detail materials #${data.id}`}
            description={`Detail materials ${data.name}.`}
            fields={[
                { label: "Nama Reagen", value: data.name },
                { label: "Suplier", value: data.suppliers.name},
                { label: "Grade", value: data.grades.name },
                { label: "Formula", value: data.formula },
                { label: "Batch Number", value: data.batch_number },
                { label: "Storage Location", value: data.storage_location}

            ]}
        />

    );
}