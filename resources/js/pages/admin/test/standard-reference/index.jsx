import Loading from "@/components/ui/loading";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getStandardsColumns } from "@/components/shared/admin/test-columns";
import ReferenceDetailSheet from "@/components/shared/sheet/reference-detail-sheet";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { editStandardFields } from "@/utils/fields/admin";
import { useMemo, useState } from "react";
import { useReferences } from "@/hooks/useAdmin";

export default function AdminStandardsPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedReference, setSelectedReference] = useState(null);

    const { data: references, isLoading, error, create: createReference, update: updateReference, delete: deleteReference } = useReferences();

    const handleShowDetail = (tests) => {
        setSelectedReference(tests);
        setIsOpen(true);
    };

    const columns = useMemo(() => getStandardsColumns({ onShowDetail: handleShowDetail }), []);

    const handleCreate = async (formData) => createReference.mutateAsync(formData);

    const handleEdit = async (id, formData) => {
        await updateReference.mutateAsync({ id, data: formData });
    };

    const handleDelete = async (id) => deleteReference.mutateAsync(id);

    if (isLoading) {
        return (
            <DashboardLayout title="Dashboard Admin" header="Selamat Datang">
                <Loading />
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout title="Dashboard Admin" header="Selamat Datang">
                <div className="text-center text-red-500 py-8">
                    {error.message || "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout
            title="Manajemen Standar Referensi"
            header="Manajemen Standar Referensi"
        >
            <ManagedDataTable
                data={references}
                columns={columns}
                editFields={editStandardFields}
                onCreate={handleCreate}
                onEdit={handleEdit}
                onDelete={handleDelete}
                createTitle="Tambah Standar Referensi"
                editTitle="Edit Standar Referensi"
                deleteTitle="Hapus Standar Referensi"
            />
            <ReferenceDetailSheet data={selectedReference} isOpen={isOpen} onOpenChange={setIsOpen} />
        </DashboardLayout>
    );
}
