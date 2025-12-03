import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getSuppliersColumns } from "@/components/shared/admin/material-columns";
import SupplierDetailSheet from "@/components/shared/sheet/supplier-detail-sheet";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import Loading from "@/components/ui/loading";
import { useSuppliers } from "@/hooks/useAdmin";
import { editSupplierFields } from "@/utils/fields/admin";
import { useMemo, useState } from "react";

export default function AdminSuppliersPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);

    const { data: suppliers, isLoading: suppliersLoading, error: suppliersError, create: createSupplier, update: updateSupplier, delete: deleteSupplier } = useSuppliers();

    const handleShowDetail = (materials) => {
        setSelectedSupplier(materials);
        setIsOpen(true);
    };

    const columns = useMemo(() => getSuppliersColumns({ onShowDetail: handleShowDetail }), []);

    const handleCreate = async (formData) => createSupplier.mutateAsync(formData);

    const handleEdit = async (id, formData) => {
        await updateSupplier.mutateAsync({ id, data: formData });
    };

    const handleDelete = async (id) => deleteSupplier.mutateAsync(id);

    if (suppliersLoading) {
        return (
            <DashboardLayout title="Dashboard Admin"  header="Selamat Datang">
                <Loading />
            </DashboardLayout>
        );
    }

    if (suppliersError) {
        return (
            <DashboardLayout title="Dashboard Admin"  header="Selamat Datang">
                <div className="text-center text-red-500 py-8">
                    {suppliersError.message || "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout
            title="Manajemen Pemasok Reagent"
            header="Manajemen Pemasok Reagent"
        >
            <ManagedDataTable
                data={suppliers}
                columns={columns}
                editFields={editSupplierFields}
                onCreate={handleCreate}
                onDelete={handleDelete}
                onEdit={handleEdit}
                createTitle="Tambah Pemasok"
                editTitle="Edit Pemasok"
                deleteTitle="Hapus Pemasok"
            />
            <SupplierDetailSheet data={selectedSupplier} isOpen={isOpen} onOpenChange={setIsOpen} />
        </DashboardLayout>
    );
}
