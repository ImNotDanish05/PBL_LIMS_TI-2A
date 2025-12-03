import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getClientColumns } from "@/components/shared/staff/client-colums";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { editClientFields } from "@/utils/fields/staff";
import { useMemo, useState } from "react";
import ClientDetailSheet from "@/components/shared/sheet/client-detail-sheet";
import Loading from "@/components/ui/loading";
import { useClients } from "@/hooks/useStaff";

export default function ClientPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);

    const {
        data: clients,
        isLoading,
        error,
        create: createClient,
        update: updateClient,
        delete: deleteClient,
    } = useClients();

    const handleShowDetail = (client) => {
        setSelectedClient(client);
        setIsOpen(true);
    };

    const handleCreate = async (formData) => createClient.mutateAsync(formData);
    const handleEdit = async (id, formData) => {
        await updateClient.mutateAsync({ id, data: formData });
    };
    const handleDelete = async (id) => deleteClient.mutateAsync(id);

    const columns = useMemo(
        () => getClientColumns({ onShowDetail: handleShowDetail }),
        []
    );

    if (isLoading) {
        return (
            <DashboardLayout title="Manajemen Client" header="Client">
                <Loading />
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout title="Manajemen Client" header="Client">
                <div className="text-center text-red-500 py-8">
                    {error.message || "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title="Manajemen Client" header="Client">
            <ManagedDataTable
                data={clients}
                columns={columns}
                editFields={editClientFields}
                onCreate={handleCreate}
                onEdit={handleEdit}
                onDelete={handleDelete}
                createTitle="Tambah Data Klien"
                editTitle="Edit Data Klien"
                deleteTitle="Hapus Data Klien"
            />
            <ClientDetailSheet
                data={selectedClient}
                isOpen={isOpen}
                onOpenChange={setIsOpen}
            />
        </DashboardLayout>
    );
}
