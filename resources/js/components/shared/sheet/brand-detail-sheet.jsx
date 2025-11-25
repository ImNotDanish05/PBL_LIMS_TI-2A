import DetailSheet from "@/components/layouts/detail-sheet";

export default function BrandDetailSheet({ data, isOpen, onOpenChange }) {
    if (!data) return null;

    return (
        <DetailSheet
            open={isOpen}
            onOpenChange={onOpenChange}
            title={`Detail brand #${data.id}`}
            description={`Detail brand ${data.name}.`}
            fields={[
                { label: "Nama Brand", value: data.name },
            ]}
        />

    );
}