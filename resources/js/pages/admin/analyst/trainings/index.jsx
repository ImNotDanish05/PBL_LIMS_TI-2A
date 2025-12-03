import Loading from "@/components/ui/loading";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getTrainingColumns } from "@/components/shared/admin/test-columns";//
import TrainingDetailSheet from "@/components/shared/sheet/training-detail-sheets";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { editTrainingFields } from "@/utils/fields/admin";
import { useMemo, useState } from "react";
import { useTrainings } from "@/hooks/useAdmin";

export default function AdminTrainingPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const { data: training, isLoading, error, create: createTraining, update: updateTraining, delete: deleteTraining } = useTrainings();

    const handleShowDetail = (tests) => {
        setSelectedCategory(tests);
        setIsOpen(true);
    };

    const columns = useMemo(() => getTrainingColumns({ onShowDetail: handleShowDetail }), []);


    const handleCreate = async (formData) => createTraining.mutateAsync(formData);

    const handleEdit = async (id, formData) => {
        await updateTraining.mutateAsync({ id, data: formData });
    };

    const handleDelete = async (id) => deleteTraining.mutateAsync(id);

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
            title="Manajemen Pelatihan Sampel"
            header="Manajemen Pelatihan Sampel"
        >
            <ManagedDataTable
                data={training}
                columns={columns}
                editFields={editTrainingFields}
                onCreate={handleCreate}
                onEdit={handleEdit}
                onDelete={handleDelete}
                createTitle="Tambah Pelatihan"
                editTitle="Edit Pelatihan"
                deleteTitle="Hapus Pelatihan"
            />
            <TrainingDetailSheet data={selectedCategory} isOpen={isOpen} onOpenChange={setIsOpen} />
        </DashboardLayout>
    );
}