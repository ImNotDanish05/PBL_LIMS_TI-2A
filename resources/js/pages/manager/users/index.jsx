import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getUsersColumns } from "@/components/shared/manager/user-columns";
import UserDetailSheet from "@/components/shared/sheet/user-detail-sheet";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { users } from "@/data/admin/users";
import { useMemo, useState } from "react";

const filterData = [
    { value: "all", label: "All Role" },
    { value: "Staff", label: "Staff" },
    { value: "Analis", label: "Analis" },
    { value: "Supervisor", label: "Supervisor" },
    { value: "Manager", label: "Manager" },
];

export default function ManagerUsersPage({ auth, usersData }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleShowDetail = (user) => {
        setSelectedUser(user);
        setIsDialogOpen(true);
    };

    const parameters = usersData || users;

    const columns = useMemo(() => getUsersColumns({ onShowDetail: handleShowDetail }), []);

    return (
        <DashboardLayout title="Users"  header="Users">
            <ManagedDataTable
                data={parameters}
                columns={columns}
                showFilter={true}
                filterColumn="role"
                filterOptions={filterData}
                showCreate={false}
            />
            <UserDetailSheet
                data={selectedUser}
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
            />
        </DashboardLayout>
    );
}