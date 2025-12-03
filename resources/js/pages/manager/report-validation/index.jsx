import DashboardLayout from "../../../components/layouts/dashboard-layout";
import { useMemo } from "react";
import { getReportsColumns } from "@/components/shared/manager/report-columns";
import { reports } from "@/data/manager/reports";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { router } from "@inertiajs/react";

const filterData = [
    { value: "all", label: "All Report" },
    { value: "Completed", label: "Completed" },
    { value: "In Progress", label: "In Progress" },
    { value: "Pending", label: "Pending" },
    { value: "Disapproved", label: "Disapproved" },
    { value: "Approved", label: "Approved" },
    { value: "Received", label: "Received" },
];

export default function ReportValidationPage({ auth, reportData }) {
    const handleShowDetail = () => {
        router.visit(route("manager.report.detail"));
    };

    const columns = useMemo(
        () => getReportsColumns({ onShowDetail: handleShowDetail }),
        []
    );

    const parameters = reportData || reports;

    return (
        <DashboardLayout
            title="Validasi Laporan"
            header="Validasi Laporan"
        >
            <ManagedDataTable
                data={parameters}
                columns={columns}
                showFilter={true}
                filterColumn="status"
                filterOptions={filterData}
            />
        </DashboardLayout>
    );
}
