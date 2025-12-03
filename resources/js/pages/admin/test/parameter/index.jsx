import Loading from "@/components/ui/loading";

import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getParametersColumns } from "@/components/shared/admin/test-columns";
import ParameterDetailSheet from "@/components/shared/sheet/parameter-detail-sheet";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { editParameterFields } from "@/utils/fields/admin";
import { useMemo, useState } from "react";
import { useParameters, useReferences, useUnits } from "@/hooks/useAdmin";

export default function AdminParametersPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedParameter, setSelectedParameter] = useState(null);


    const { data: parameters, isLoading, error, create: createParameter, update: updateParameter, delete: deleteParameter } = useParameters();
    const { data: units, isLoading: unitLoading, error: unitError } = useUnits();
    const { data: references, isLoading: referenceLoading, error: referenceError } = useReferences();

    const handleShowDetail = (brand) => {
        setSelectedParameter(brand);
        setIsOpen(true);
    };

    const columns = useMemo(
        () => getParametersColumns({ onShowDetail: handleShowDetail }),
        []
    );



    const handleCreate = async (formData) => createParameter.mutateAsync(formData);

    const handleEdit = async (id, formData) => {
        await updateParameter.mutateAsync({ id, data: formData });
    };

    const handleDelete = async (id) => deleteParameter.mutateAsync(id);

    if (isLoading || unitLoading || referenceLoading) {
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
            title="Manajemen Tes Parameter"
            header="Manajemen Tes Parameter"
        >
            <ManagedDataTable
                data={parameters}
                columns={columns}
                editFields={editParameterFields(units, references)}
                onCreate={handleCreate}
                onEdit={handleEdit}
                onDelete={handleDelete}
                createTitle="Tambah Tes Parameter"
                editTitle="Edit Tes Parameter"
                deleteTitle="Hapus Tes Parameter"
            />
            <ParameterDetailSheet data={selectedParameter} isOpen={isOpen} onOpenChange={setIsOpen} />
        </DashboardLayout>
    );
}