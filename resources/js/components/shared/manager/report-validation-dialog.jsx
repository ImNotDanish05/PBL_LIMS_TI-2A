import DetailDialog from "../dialog/detail-dialog";

export default function ReportDetailsDialog({ order, isOpen, onOpenChange }) {
    if (!order) return null;

    return (
        <DetailDialog
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            title={`Detail Order #${order.id}`}
            description={`Detail order oleh ${order.client}.`}
            fields={[
                { label: "Sampel", value: order.sample, bold: true },
                { label: "Client", value: order.client },
                { label: "Analis", value: order.analis, alignTop: true },
            ]}
        />
    );
}
