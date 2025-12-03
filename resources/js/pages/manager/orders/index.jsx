import { useMemo, useState } from "react";
import { orders } from "@/data/manager/orders";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getOrdersColumns } from "@/components/shared/manager/order-columns";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { router } from "@inertiajs/react";

const filterData = [
    { value: "all", label: "All Status" },
    { value: "Completed", label: "Completed" },
    { value: "In Progress", label: "In Progress" },
    { value: "Pending", label: "Pending" },
    { value: "Disapproved", label: "Disapproved" },
    { value: "Approved", label: "Approved" },
    { value: "Received", label: "Received" },
];

export default function OrdersPage({ auth, ordersData }) {
    const handleShowDetail = () => {
        router.visit(route("manager.orders.detail"));
    };

    const parameters = ordersData || orders;

    const columns = useMemo(() => getOrdersColumns({ onShowDetail: handleShowDetail }), []);

    return (
        <DashboardLayout title="Orders"  header="Orders">
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
