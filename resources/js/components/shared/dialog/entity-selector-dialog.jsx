import { useMemo, useCallback } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import Loading from "@/components/ui/loading";
import { ENTITY_CONFIG } from "@/utils/constant/users";

export default function EntitySelectorDialog({
    type,
    hook,
    isOpen,
    onOpenChange,
    selectedItems,
    onSelect,
    onConfirm,
    getColumns,
    editFields,
    showCreate = true,
}) {
    const { data, isLoading, error, create } = hook();
    const config = ENTITY_CONFIG[type];
    const columns = useMemo(() => {
        return getColumns({ selectedItems, onSelect });
    }, [getColumns, selectedItems, onSelect]);

    const handleCreate = useCallback(
        async (formData) => {
            return create.mutateAsync(formData);
        },
        [create]
    );

    const handleCancel = useCallback(() => {
        onOpenChange(false);
    }, [onOpenChange]);

    const handleConfirm = useCallback(() => {
        onConfirm();
    }, [onConfirm]);

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl flex flex-col max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>{config.title}</DialogTitle>
                    <DialogDescription>{config.description}</DialogDescription>
                </DialogHeader>

                <div className="flex-grow overflow-y-auto">
                    {isLoading ? (
                        <Loading />
                    ) : error ? (
                        <div className="text-center text-red-500 py-8">
                            {error?.message ||
                                "Terjadi kesalahan saat memuat data"}
                        </div>
                    ) : (
                        <ManagedDataTable
                            data={data || []}
                            columns={columns}
                            editFields={editFields || []}
                            showFilter={false}
                            showSearch
                            showCreate={showCreate}
                            onCreate={handleCreate}
                            createTitle={config.createTitle}
                        />
                    )}
                </div>

                <DialogFooter className="flex justify-between gap-2">
                    <Button variant="outline" onClick={handleCancel}>
                        Batal
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={selectedItems.length === 0}
                        className="!bg-primary-hijauMuda hover:!bg-primary-hijauTua"
                    >
                        Tambahkan ({selectedItems.length} dipilih)
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
