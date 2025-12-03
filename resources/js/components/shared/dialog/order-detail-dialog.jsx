import DetailDialog from "../dialog/detail-dialog";

const statusVariantMap = {
    Completed: "completed",
    "In Progress": "inProgress",
    Pending: "pending",
    Disapproved: "disapproved",
    Approved: "approved",
    Received: "received",
};
const tipeVariantMap = {
    Eksternal: "eksternal",
    Internal: "internal",
    Urgent: "urgent",
};

export default function OrderDetailsDialog({ order, isOpen, onOpenChange }) {
    if (!order) return null;

    return (
        <DetailDialog
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            title={`Detail Order #${order.id}`}
            description={`Detail untuk order yang dibuat oleh ${order.user}.`}
            fields={[
                { label: "ID", value: order.id },
                { label: "User", value: order.user, bold: true },
                { label: "Nomor Order", value: order.order_number },
                { label: "Judul Analisis", value: order.title },
                { label: "Metode Analisis", value: order.analyses_method },
                { label: "Estimasi Selesai", value: order.estimasi },
                { label: "Tanggal Laporan", value: order.report_issued_at },
                { label: "Lokasi File Laporan", value: order.report_file_path },
                {
                    label: "Hasil Analisis",
                    value: Array.isArray(order.result_value)
                        ? order.result_value.join(", ")
                        : order.result_value,
                    alignTop: true,
                },
                {
                    label: "Tipe",
                    value: order.tipe,
                    badge: true,
                    variant: tipeVariantMap[order.tipe] || "outline",
                },
                {
                    label: "Status",
                    value:
                        order.status.charAt(0).toUpperCase() +
                        order.status.slice(1).replace(/([A-Z])/g, " $1"),
                    badge: true,
                    variant: statusVariantMap[order.status] || "outline",
                },
                {
                    label: "Catatan",
                    value: order.catatan,
                    alignTop: true,
                },
            ]}
        />
    );
}
