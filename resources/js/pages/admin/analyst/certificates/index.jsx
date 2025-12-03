import Loading from "@/components/ui/loading";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getSertifColumns } from "@/components/shared/admin/test-columns";
import SertifDetailSheet from "@/components/shared/sheet/sertif-detail-sheets";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { editSertificateFields } from "@/utils/fields/admin";
import { useMemo, useState } from "react";
import { useSertif, useAnalysts } from "@/hooks/useAdmin";

export default function AdminCertificatePage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const { data: sertif, isLoading, error, create: createSertif, update: updateSertif, delete: deleteSertif } = useSertif();
    const { data: analysts, isLoading: isLoadingAnalysts, error: errorAnalysts } = useAnalysts();

    const handleShowDetail = (tests) => {
        setSelectedCategory(tests);
        setIsOpen(true);
    };

    const columns = useMemo(() => getSertifColumns({ onShowDetail: handleShowDetail }), []);

    const handleCreate = async (formData) => createSertif.mutateAsync(formData);

    const handleEdit = async (id, formData) => {
        await updateSertif.mutateAsync({ id, data: formData });
    };

    const handleDelete = async (id) => deleteSertif.mutateAsync(id);

    if (isLoading || isLoadingAnalysts) {
        return (
            <DashboardLayout title="Dashboard Admin" header="Selamat Datang">
                <Loading />
            </DashboardLayout>
        );
    }

    if (error || errorAnalysts) {
        return (
            <DashboardLayout title="Dashboard Admin" header="Selamat Datang">
                <div className="text-center text-red-500 py-8">
                    {error.message || errorAnalysts.message || "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout
            title="Manajemen Sertifikat"
            header="Manajemen Sertifikat"
        >
            <ManagedDataTable
                data={sertif}
                columns={columns}
                editFields={editSertificateFields(analysts)}
                onCreate={handleCreate}
                onEdit={handleEdit}
                onDelete={handleDelete}
                createTitle="Tambah Sertifikat"
                editTitle="Edit Sertifikat"
                deleteTitle="Hapus Sertifikat"
            />
            <SertifDetailSheet data={selectedCategory} isOpen={isOpen} onOpenChange={setIsOpen} />
        </DashboardLayout>
    );
}