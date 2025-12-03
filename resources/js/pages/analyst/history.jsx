import DashboardLayout from "@/components/layouts/dashboard-layout";

const History = () => {
    const user = {
        name: 'Nardo',
        role: 'Analyst',
        avatar: 'https://i.pravatar.cc/150?img=3',
    }

    return (
        <DashboardLayout title="Analyst" user={user} header='Selamat Datang Analyst!'>
            <div className="flex items-center justify-center text-primary-hijauTua font-bold">
                <h1>Histories here!</h1>
            </div>
        </DashboardLayout>
    )
}

export default History
