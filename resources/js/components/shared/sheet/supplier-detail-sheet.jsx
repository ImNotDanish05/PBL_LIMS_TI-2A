import DetailSheet from "@/components/layouts/detail-sheet";

const statusVariantMap = {
    active: "success",
    maintenance: "warning",
    broken: "error",
};

export default function SupplierDetailSheet({ data, isOpen, onOpenChange }) {
    if (!data) return null;

    return (
        <DetailSheet
            open={isOpen}
            onOpenChange={onOpenChange}
            title={`Detail Supplier #${data.id}`}
            description={`Detail Supplier ${data.name}.`}
            fields={[
                { label: "Nama Supplier", value: data.name },
                { label: "Telephone", value: data.phone_number },
                { label: "alamat", value: data.address },

            ]}
        />

    );
}