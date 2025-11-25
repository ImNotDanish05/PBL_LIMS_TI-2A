import DetailSheet from "@/components/layouts/detail-sheet";

export default function ClientDetailSheet({ data, isOpen, onOpenChange }) {
    if (!data) return null;

    return (
        <DetailSheet
            open={isOpen}
            onOpenChange={onOpenChange}
            title={`Detail Client #${data.id}`}
            description={`Detail Client dari ${data.name}.`}
            fields={[
                { label: "Nama Client", value: data.name },
                { label: "Email", value: data.email },
                { label: "Alamat", value: data.address },
                { label: "Nomor Telepon", value: data.phone_number },
                { label: "NPWP", value: data.npwp_number },
            ]}
        />
    );
}
