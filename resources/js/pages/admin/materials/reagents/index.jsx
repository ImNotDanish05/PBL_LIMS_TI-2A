import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getReagentsColumns } from "@/components/shared/admin/material-columns";
import ReagentsDetailSheet from "@/components/shared/sheet/reagen_detail_sheet";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { editReagentFields } from "@/utils/fields/admin";
import { useMemo, useState } from "react";
import Loading from "@/components/ui/loading";
import { useGrades, useReagents, useSuppliers } from "@/hooks/useAdmin";

export default function AdminReagentsPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedReagents, setSelectedReagents] = useState(null);

    const handleShowDetail = (materials) => {
        setSelectedReagents(materials);
        setIsOpen(true);
    };

    const { data: grades, isLoading: gradesLoading, error: gradesError } = useGrades();
    const { data: suppliers, isLoading: suppliersLoading, error: suppliersError } = useSuppliers();
    const { data: reagents, isLoading: regeantsLoading, error: regeantsError, create: createReagent, update: updateReagent, delete: deleteReagent } = useReagents();

    const columns = useMemo(() => getReagentsColumns({ onShowDetail: handleShowDetail }), []);

    const handleCreate = async (formData) => createReagent.mutateAsync(formData);

    const handleEdit = async (id, formData) => {
        await updateReagent.mutateAsync({ id, data: formData });
    };

    const handleDelete = async (id) => deleteReagent.mutateAsync(id);

    if (gradesLoading || suppliersLoading || regeantsLoading) {
        return (
            <DashboardLayout title="Dashboard Admin"  header="Selamat Datang">
                <Loading />
            </DashboardLayout>
        );
    }

    if (regeantsError || suppliersError || gradesError) {
        return (
            <DashboardLayout title="Dashboard Admin"  header="Selamat Datang">
                <div className="text-center text-red-500 py-8">
                    {"Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout
            title="Manajemen Reagen"
            header="Manajemen Reagen"
        >
            <ManagedDataTable
                data={reagents}
                columns={columns}
                editFields={editReagentFields(suppliers, grades)}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onCreate={handleCreate}
                createTitle="Tambah Reagent"
                editTitle="Edit Reagent"
                deleteTitle="Hapus Reagent"
            />
            <ReagentsDetailSheet data={selectedReagents} isOpen={isOpen} onOpenChange={setIsOpen} />
        </DashboardLayout>
    );
}