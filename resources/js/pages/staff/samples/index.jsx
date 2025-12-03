import DashboardLayout from "@/components/layouts/dashboard-layout";
import SampleDetailsDialog from "@/components/shared/staff/sample-dialog";
import { getSamplesColumns } from "@/components/shared/staff/sample-colums";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { samples } from "@/data/staff/sample";
import { useMemo, useState } from "react";

const filterData = [
    { value: "all", label: "Kondisi" },
    { value: "good", label: "Good" },
    { value: "damaged", label: "Damaged" },
    { value: "expired", label: "Expired" },
];

export default function SamplesPage({ auth, samplesData }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedSample, setSelectedSample] = useState(null);

    const handleShowDetail = (sample) => {
        setSelectedSample(sample);
        setIsDialogOpen(true);
    };

    const parameters = samplesData || samples;

    const columns = useMemo(
        () => getSamplesColumns({ onShowDetail: handleShowDetail }),
        []
    );

    return (
        <DashboardLayout
            title="Manajemen Sample"
            header="Manajemen Sample"
        >
            <ManagedDataTable
                data={parameters}
                columns={columns}
                showFilter={true}
                filterColumn="condition"
                filterOptions={filterData}
            />
            <SampleDetailsDialog
                sample={selectedSample}
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
            />
        </DashboardLayout>
    );
}
