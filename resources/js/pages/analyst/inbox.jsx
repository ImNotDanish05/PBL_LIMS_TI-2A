import DashboardLayout from "@/components/layouts/dashboard-layout";

export default function AnalystInbox() {
    return (
        <DashboardLayout title="Inbox Analis" header="Inbox Analis">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
                    <p className="text-gray-700">Inbox belum memiliki konten.</p>
                </div>
            </div>
        </DashboardLayout>
    );
}
