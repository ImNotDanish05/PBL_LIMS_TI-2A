import { useMemo, useCallback } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getUsersColumns } from "@/components/shared/admin/user-columns";
import UserDetailSheet from "@/components/shared/sheet/user-detail-sheet";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import Loading from "@/components/ui/loading";
import { useUsers } from "@/hooks/useAdmin";
import { editUsersFields } from "@/utils/fields/admin";
import { useUserDetail } from "./hooks/useUserDetail";
import { useUserFormState } from "./hooks/useUserFormState";
import { useUserActions } from "./hooks/useUserAction";
import { FILTER_OPTIONS } from "@/utils/constant/users";
import EntitySelectorDialog from "@/components/shared/dialog/entity-selector-dialog";

export default function AdminUsersPage() {
    const {
        data: users,
        isLoading,
        error,
        create: createUser,
        update: updateUser,
        delete: deleteUser,
    } = useUsers();

    const { selectedUser, isOpen, handleShowDetail, handleClose } = useUserDetail();

    const formState = useUserFormState();

    const { handleCreate, handleEdit, handleDelete } = useUserActions({
        createUser,
        updateUser,
        deleteUser,
        formState,
    });

    const columns = useMemo(
        () => getUsersColumns({ onShowDetail: handleShowDetail }),
        [handleShowDetail]
    );

    const editFields = useMemo(
        () =>
            editUsersFields(
                formState.trainings.confirmed,
                formState.trainings.openDialog,
                formState.trainings.remove,
            ),
        [
            formState.trainings.confirmed,
            formState.trainings.openDialog,
            formState.trainings.remove,
        ]
    );

    const handleFormOpen = useCallback(
        (user) => {
            formState.trainings.initialize(user?.analyst?.trainings || []);
        },
        [formState.trainings]
    );

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
                    {error?.message || "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title="Manajemen Pengguna" header="Manajemen Pengguna">
            <ManagedDataTable
                data={users}
                columns={columns}
                editFields={editFields}
                onCreate={handleCreate}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onFormOpen={handleFormOpen}
                showFilter
                filterColumn="role"
                filterOptions={FILTER_OPTIONS}
                createTitle="Tambah Pengguna"
                editTitle="Edit Pengguna"
                deleteTitle="Hapus Pengguna"
            />

            <UserDetailSheet
                data={selectedUser}
                isOpen={isOpen}
                onOpenChange={handleClose}
            />

            <EntitySelectorDialog
                type="training"
                isOpen={formState.trainings.isDialogOpen}
                onOpenChange={formState.trainings.setDialogOpen}
                selectedItems={formState.trainings.temp}
                onSelect={formState.trainings.toggleTemp}
                onConfirm={formState.trainings.confirm}
            />

        </DashboardLayout>
    );
}