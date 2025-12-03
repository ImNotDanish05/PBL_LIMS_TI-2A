import Loading from "@/components/ui/loading";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getSampleCategoriesColumns } from "@/components/shared/admin/test-columns";
import CategoryDetailSheet from "@/components/shared/sheet/category-detail-sheets";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { editCategorySampleFields } from "@/utils/fields/admin";
import { useMemo, useState } from "react";
import { useCategories } from "@/hooks/useAdmin";

export default function AdminSampleCategoriesPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const { data: categories, isLoading, error, create: createCategory, update: updateCategory, delete: deleteCategory } = useCategories();

    const handleShowDetail = (tests) => {
        setSelectedCategory(tests);
        setIsOpen(true);
    };

    const columns = useMemo(() => getSampleCategoriesColumns({ onShowDetail: handleShowDetail }), []);

    const handleCreate = async (formData) => createCategory.mutateAsync(formData);

    const handleEdit = async (id, formData) => {
        await updateCategory.mutateAsync({ id, data: formData });
    };

    const handleDelete = async (id) => deleteCategory.mutateAsync(id);

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
            title="Manajemen Kategori Sampel"
            header="Manajemen Kategori Sampel"
        >
            <ManagedDataTable
                data={categories}
                columns={columns}
                editFields={editCategorySampleFields}
                onCreate={handleCreate}
                onEdit={handleEdit}
                onDelete={handleDelete}
                createTitle="Tambah Kategori Sampel"
                editTitle="Edit Kategori Sampel"
                deleteTitle="Hapus Kategori Sampel"
            />
            <CategoryDetailSheet data={selectedCategory} isOpen={isOpen} onOpenChange={setIsOpen} />
        </DashboardLayout>
    );
}