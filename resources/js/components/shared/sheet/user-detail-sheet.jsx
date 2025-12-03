import DetailSheet from "@/components/layouts/detail-sheet";

export default function UserDetailSheet({ data, isOpen, onOpenChange }) {
    if (!data) return null;

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const getCertificateStatus = (expiredDate) => {
        if (!expiredDate) return { text: 'Tidak Ada Tanggal', variant: 'secondary' };

        const expiry = new Date(expiredDate);
        const now = new Date();
        const diffTime = expiry - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return { text: 'Kedaluwarsa', variant: 'error' };
        if (diffDays <= 30) return { text: `${diffDays} hari lagi`, variant: 'warning' };
        if (diffDays <= 90) return { text: 'Segera berakhir', variant: 'warning' };
        return { text: 'Aktif', variant: 'success' };
    };

    const certificateDetails = data.analyst?.certificates?.map(cert => {
        const status = getCertificateStatus(cert.expired_date);
        return {
            label: cert.name,
            value: status.text,
            badge: true,
            variant: status.variant,
        };
    }) || [];

    const trainingDetails = data.analyst?.trainings?.map(training => ({
        label: training.name,
        value: `${training.provider}`,
        badge: training.result === 'Lulus',
        variant: training.result === 'Lulus' ? 'success' : 'error',
    })) || [];

    const roleVariant = {
        'admin': 'success',
        'staff': 'warning',
        'analyst': 'info',
        'supervisor': 'received',
        'manager': 'approved',
        'client': 'default',
    }[data.role] || 'secondary';

    const baseFields = [
        { label: "Nama", value: data.name, bold: true },
        {
            label: "Role",
            value: data.role.charAt(0).toUpperCase() + data.role.slice(1),
            badge: true,
            variant: roleVariant
        },
        { label: "Email", value: data.email },
        {
            label: "Status Email",
            value: data.email_verified_at ? "Terverifikasi" : "Belum Terverifikasi",
            badge: true,
            variant: data.email_verified_at ? "success" : "error",
        },
        { label: "Terdaftar Sejak", value: formatDate(data.created_at) },
    ];

    const analystFields = data.analyst ? [
        { label: "Spesialisasi", value: data.analyst.specialist, bold: true },
    ] : [];

    const certificateSection = certificateDetails.length > 0 ? [
        ...certificateDetails
    ] : [];

    const trainingSection = trainingDetails.length > 0 ? [
        ...trainingDetails
    ] : [];

    return (
        <DetailSheet
            open={isOpen}
            onOpenChange={onOpenChange}
            title={data.name}
            description={`${data.role.charAt(0).toUpperCase() + data.role.slice(1)} • ${data.email}`}
            fields={[
                ...baseFields,
                ...analystFields,
                ...certificateSection,
                ...trainingSection,
            ]}
        />
    );
}