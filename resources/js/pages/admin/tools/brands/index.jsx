import DashboardLayout from "@/components/layouts/dashboard-layout";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import BrandDetailSheet from "@/components/shared/sheet/brand-detail-sheet";
import { getBrandsColumns } from "@/components/shared/admin/tool-columns";
import { editBrandFields } from "@/utils/fields/admin";
import { useMemo, useState } from "react";
import Loading from "@/components/ui/loading";
import { useBrands } from "@/hooks/useAdmin";

export default function AdminBrandsPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);

    const { data: brands, isLoading, error, create: createBrand, update: updateBrand, delete: deleteBrand } = useBrands();

    const handleShowDetail = (brand) => {
        setSelectedBrand(brand);
        setIsOpen(true);
    };

    const columns = useMemo(
        () => getBrandsColumns({ onShowDetail: handleShowDetail }),
        []
    );

    const handleCreate = async (formData) => createBrand.mutateAsync(formData);

    const handleEdit = async (id, formData) => {
        await updateBrand.mutateAsync({ id, data: formData });
    };

    const handleDelete = async (id) => deleteBrand.mutateAsync(id);

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
            title="Manajemen Jenis Brand"
            header="Manajemen Jenis Brand"
        >
            <ManagedDataTable
                data={brands}
                columns={columns}
                editFields={editBrandFields}
                onCreate={handleCreate}
                onEdit={handleEdit}
                onDelete={handleDelete}
                createTitle="Tambah Brand"
                editTitle="Edit Brand"
                deleteTitle="Hapus Brand"
            />
            <BrandDetailSheet
                data={selectedBrand}
                isOpen={isOpen}
                onOpenChange={setIsOpen}
            />
        </DashboardLayout>
    );
}
