import { TrendingUp, Activity, AlertCircle, Beaker, Gauge, Microscope, TestTube, Users, Wrench } from "lucide-react";
import { Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import StatCard from '@/components/shared/card/stat-card';
import DashboardLayout from '@/components/layouts/dashboard-layout';
import Loading from "@/components/ui/loading";
import { useDashboard } from "@/hooks/useAdmin";
import { useMemo } from "react";

const baseStats = [
  { key: "totalUser", title: "Total User", icon: Users },
  { key: "totalEquipment", title: "Total Peralatan", icon: Wrench },
  { key: "totalReagent", title: "Total Reagen", icon: Beaker },
  { key: "totalOrder", title: "Total Order", icon: TestTube },
  { key: "totalParameter", title: "Total Parameter", icon: Gauge },
  { key: "totalMethod", title: "Total Metode Uji", icon: Microscope },
];

export default function AdminDashboard() {
  const { data: dashboard, isLoading: dashboardLoading, error } = useDashboard();

  const stats = useMemo(
    () =>
      baseStats.map((item) => ({
        ...item,
        value: dashboard?.[item.key] ?? "0",
      })),
    [dashboard]
  );

  if (dashboardLoading) {
    return (
      <DashboardLayout title="Dashboard Admin" header="Selamat Datang, Admin!">
        <Loading />
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout title="Dashboard Admin" header="Selamat Datang, Admin!">
        <div className="text-center text-red-500 py-8">
          {error.message}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Dashboard Admin" header="Selamat Datang, Admin!">
      <div className="max-w-7xl mx-auto space-y-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Tren Bulanan</h2>
                <p className="text-sm text-gray-500 mt-1">Data 6 bulan terakhir</p>
              </div>
              <Activity className="w-6 h-6 text-emerald-600" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dashboard?.monthlyTrendData}>
                <defs>
                  <linearGradient id="colorClient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorSampel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="clients" stroke="#10b981" fillOpacity={1} fill="url(#colorUsers)" name="Pengguna" strokeWidth={2} />
                <Area type="monotone" dataKey="sampel" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSampel)" name="Sampel" strokeWidth={2} />
                <Line type="monotone" dataKey="pengujian" stroke="#8b5cf6" strokeWidth={2} name="Pengujian" dot={{ fill: '#8b5cf6', r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Distribusi</h2>
                <p className="text-sm text-gray-500 mt-1">Resource allocation</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dashboard?.resourceDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dashboard?.resourceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {dashboard?.resourceDistribution.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-xs text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Aktivitas Mingguan</h2>
                <p className="text-sm text-gray-500 mt-1">Total pengujian per hari</p>
              </div>
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dashboard?.weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Bar dataKey="tests" fill="#10b981" radius={[8, 8, 0, 0]} name="Pengujian" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-2xl shadow-lg text-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">Ringkasan Cepat</h2>
                <p className="text-emerald-100 text-sm mt-1">Status sistem saat ini</p>
              </div>
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-emerald-100">Total Resources</span>
                  <span className="text-2xl font-bold">{dashboard?.quickSummary.totalResources}</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-emerald-100">Pengujian Bulan Ini</span>
                  <span className="text-2xl font-bold">{dashboard?.quickSummary.pengujianBulanIni}</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-emerald-100">Rata-rata Harian</span>
                  <span className="text-2xl font-bold">{dashboard?.quickSummary.rataRataHarian}</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-emerald-100">Tingkat Efisiensi</span>
                  <span className="text-2xl font-bold">{dashboard?.quickSummary.efisiensi}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}