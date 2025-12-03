import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getEquipmentsColumns } from "@/components/shared/admin/tool-columns";
import EquipmentDetailSheet from "@/components/shared/sheet/equipment-detail-sheet";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import Loading from "@/components/ui/loading";
import { useBrands, useEquipments } from "@/hooks/useAdmin";
import { editEquipmentFields } from "@/utils/fields/admin";
import { useMemo, useState } from "react";

const filterData = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "maintenance", label: "Maintenance" },
    { value: "broken", label: "Broken" },
];

export default function AdminEquipmentsPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState(null);

    const { data: brands, isLoading: brandLoading, error: brandError } = useBrands();
    const { data: equipments, isLoading: equipmentLoading, error: equipmentError, create: createEquipment, update: updateEquipment, delete: deleteEquipment } = useEquipments();

    const handleShowDetail = (equipment) => {
        setSelectedEquipment(equipment);
        setIsOpen(true);
    };

    const columns = useMemo(() => getEquipmentsColumns({ onShowDetail: handleShowDetail }), []);

    const handleCreate = async (formData) => createEquipment.mutateAsync(formData);

    const handleEdit = async (id, formData) => {
        await updateEquipment.mutateAsync({ id, data: formData });
    };

    const handleDelete = async (id) => deleteEquipment.mutateAsync(id);

    if (brandLoading || equipmentLoading) {
        return (
            <DashboardLayout title="Dashboard Admin" header="Selamat Datang">
                <Loading />
            </DashboardLayout>
        );
    }

    if (brandError || equipmentError) {
        return (
            <DashboardLayout title="Dashboard Admin" header="Selamat Datang">
                <div className="text-center text-red-500 py-8">
                    {equipmentError.message || "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout
            title="Manajemen Alat"
            header="Manajemen Alat"
        >
            <ManagedDataTable
                data={equipments}
                columns={columns}
                editFields={editEquipmentFields(brands)}
                onCreate={handleCreate}
                onEdit={handleEdit}
                onDelete={handleDelete}
                createTitle="Tambah Data Peralatan"
                editTitle="Edit Data Peralatan"
                deleteTitle="Hapus Data Peralatan"
                showFilter={true}
                filterColumn="status"
                filterOptions={filterData}
            />
            <EquipmentDetailSheet data={selectedEquipment} isOpen={isOpen} onOpenChange={setIsOpen} />
        </DashboardLayout>
    );
}