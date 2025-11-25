import React from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCog, Users, BarChart3, ClipboardList, User } from "lucide-react";

export default function ProfileLayout({ user }) {
  // Map ikon dan warna berdasarkan role
  const roleConfig = {
    Manager: { icon: <UserCog size={60} className="text-blue-500" />, color: "from-blue-500 to-blue-700", description: "Bertanggung jawab atas pengelolaan tim dan pengambilan keputusan strategis." },
    Staff: { icon: <Users size={60} className="text-green-500" />, color: "from-green-500 to-green-700", description: "Melaksanakan tugas operasional sesuai dengan instruksi atasan." },
    Supervisor: { icon: <ClipboardList size={60} className="text-yellow-500" />, color: "from-yellow-500 to-yellow-700", description: "Mengawasi dan memastikan kualitas kerja anggota tim." },
    Analyst: { icon: <BarChart3 size={60} className="text-purple-500" />, color: "from-purple-500 to-purple-700", description: "Menganalisis data dan memberikan laporan untuk mendukung pengambilan keputusan." },
    Client: { icon: <User size={60} className="text-teal-500" />, color: "from-teal-500 to-teal-700", description: "Menggunakan layanan dan menerima hasil analisis dari tim laboratorium." },
  };

  const { icon, color, description } = roleConfig[user.role] || roleConfig["Client"];

  // Properti tambahan selain name, email, role
  const baseKeys = ["name", "email", "role"];
  const extraKeys = Object.keys(user).filter((key) => !baseKeys.includes(key));

  return (
    <DashboardLayout title="Profil Pengguna" user={user}>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header Profil */}
        <Card className={`bg-gradient-to-r ${color} text-white shadow-lg rounded-2xl border-none`}>
          <CardHeader className="flex flex-col items-center text-center space-y-4">
            {icon}
            <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
            <p className="text-sm opacity-90">{user.role}</p>
          </CardHeader>
          <CardContent className="text-center pb-6">
            <p className="text-white/90 text-sm max-w-md mx-auto">{description}</p>
          </CardContent>
        </Card>

        {/* Informasi Akun */}
        <Card className="bg-white shadow-lg rounded-2xl border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">Informasi Akun</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Nama Lengkap</p>
              <p className="text-base font-medium text-gray-800">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-base font-medium text-gray-800">{user.email || "user@example.com"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Peran</p>
              <p className="text-base font-medium text-gray-800">{user.role}</p>
            </div>

            {/* Render properti tambahan secara dinamis */}
            {extraKeys.map((key) => (
              <div key={key}>
                <p className="text-sm text-gray-500">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                <p className="text-base font-medium text-gray-800">
                  {Array.isArray(user[key]) ? user[key].join(", ") : user[key]}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Tombol Aksi */}
        <div className="flex justify-end gap-3">
          <Button className="bg-primary-hijauTua hover:bg-primary-hijauTerang text-white">Edit Profil</Button>
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100">Kembali</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
