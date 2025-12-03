import { useState } from "react";
import { toast } from "sonner";
import {
    DataTableCard,
    DataTableHeader,
    DataTableContent,
    DataTablePagination,
} from "./data-table";
import UpsertDialog from "../dialog/upsert-dialog";
import DeleteDialog from "../dialog/delete-dialog";
import { useTable } from "@/hooks/useTables";

export default function ManagedDataTable({
    data,
    columns,
    editFields,

    onCreate,
    onEdit,
    onDelete,
    onFormOpen,

    filterOptions = [],
    filterColumn = "status",
    showSearch = true,
    showFilter = false,
    showCreate = true,
    pageSize = 10,
    meta = {},

    createTitle = "Tambah Data Baru",
    createDescription = "Isi data baru, lalu simpan.",
    editTitle = "Edit Data",
    editDescription = "Ubah data dan klik simpan untuk menyimpan perubahan.",
    deleteTitle = "Konfirmasi Hapus Data",
    deleteDescription = "Data akan dihapus permanen.",
}) {
    const table = useTable({
        data,
        defaultPageSize: pageSize,
        filterColumn,
        showFilter,
        showSearch,
    });

    const [formDialog, setFormDialog] = useState({
        open: false,
        data: null,
        mode: "create",
    });
    const [deleteDialog, setDeleteDialog] = useState({
        open: false,
        data: null,
    });

    const handleOpenCreate = () => {
        onFormOpen?.(null);
        setFormDialog({ open: true, data: null, mode: "create" });
    };

    const handleOpenEdit = (row) => {
        onFormOpen?.(row);
        setFormDialog({ open: true, data: row, mode: "edit" });
    };

    const handleOpenDelete = (row) => setDeleteDialog({ open: true, data: row });

    const handleSave = async (formData) => {
        const isEdit = formDialog.mode === "edit";
        try {
            if (isEdit) {
                await onEdit?.(formDialog.data.id, formData);
            } else {
                await onCreate?.(formData);
            }
            setFormDialog({ open: false, data: null, mode: "create" });
        } catch (err) {
            toast.error(err.message || "Gagal menyimpan data");
        }
    };

    const handleConfirmDelete = async () => {
        try {
            await onDelete?.(deleteDialog.data.id);
        } catch (err) {
            toast.error(err.message || "Gagal menghapus data");
        } finally {
            setDeleteDialog({ open: false, data: null });
        }
    };

    const isCreating = formDialog.mode === "create";
    const dialogTitle = isCreating ? createTitle : editTitle;
    const dialogDescription = isCreating ? createDescription : editDescription;

    return (
        <>
            <DataTableCard>
                <DataTableHeader
                    showSearch={showSearch}
                    showFilter={showFilter}
                    showCreate={showCreate}
                    onCreate={handleOpenCreate}
                    filterOptions={filterOptions}
                    searchTerm={table.searchTerm}
                    onSearchChange={table.setSearchTerm}
                    filterValue={table.filterValue}
                    onFilterChange={table.setFilterValue}
                />

                <DataTableContent
                    columns={columns}
                    data={table.currentData}
                    startIndex={table.startIndex}
                    onEdit={handleOpenEdit}
                    onDelete={handleOpenDelete}
                    meta={meta}
                    sorting={table.sorting}
                    setSorting={table.setSorting}
                />

                <DataTablePagination
                    currentPage={table.currentPage}
                    totalPages={table.totalPages}
                    goToPage={table.goToPage}
                />
            </DataTableCard>

            <UpsertDialog
                open={formDialog.open}
                onOpenChange={(open) =>
                    setFormDialog((prev) => ({ ...prev, open }))
                }
                data={formDialog.data}
                onSave={handleSave}
                fields={editFields}
                title={dialogTitle}
                description={dialogDescription}
            />

            <DeleteDialog
                open={deleteDialog.open}
                onOpenChange={(open) =>
                    setDeleteDialog((prev) => ({ ...prev, open }))
                }
                data={deleteDialog.data}
                onConfirm={handleConfirmDelete}
                title={deleteTitle}
                description={deleteDescription}
            />
        </>
    );
}