import DashboardLayout from "@/components/layouts/dashboard-layout";

export default function ClientProfile() {
    return (
        <DashboardLayout title="Profil Client" header="Profil Client">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
                    <p className="text-gray-700">Halaman profil client belum memiliki konten.</p>
                </div>
            </div>
        </DashboardLayout>
    );
}
