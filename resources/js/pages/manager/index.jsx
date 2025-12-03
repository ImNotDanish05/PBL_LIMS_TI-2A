import DashboardLayout from "@/components/layouts/dashboard-layout";
import StatCard from "@/components/shared/card/stat-card";
import { stats, Pendapatan, TotalOrder } from "@/data/manager/beranda";
import React from 'react';
import { TrendingUp } from "lucide-react";
import { Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label, Area, AreaChart } from 'recharts';

export default function ManagerPage() {
  const user = {
    name: 'Yapi',
    role: 'Manager',
    avatar: 'https://i.pravatar.cc/150?img=3',
  }

  return (
    <DashboardLayout title="Dashboard Manager" user={user} header='Selamat Datang, Manager!'>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1 text-center">
              <h2 className="text-xl font-bold text-gray-900">Pendapatan</h2>
              <p className="text-sm text-gray-500 mt-1">Data 6 bulan terakhir</p>
            </div>
            <TrendingUp className="w-6 h-6 text-emerald-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={Pendapatan} margin={{ left: 40, top: 5, right: 30, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 8" stroke="#594f4fff" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af">
                <Label
                  value="Total Pendapatan (IDR)"
                  offset={30}
                  angle={-90}
                  position="left"
                  style={{ textAnchor: 'middle', fontWeight: 'bold', fill: 'black', fontSize: '15px' }}
                />
              </YAxis>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Line type="dashed" dataKey="penjualan" stroke="#8b5cf6" strokeWidth={2} name="Pendapatan" dot={{ fill: '#8b5cf6', r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1 text-center">
              <h2 className="text-xl font-bold text-gray-900">Total Order</h2>
              <p className="text-sm text-gray-500 mt-1">Total pesanan per bulan</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={TotalOrder} margin={{ left: 40, top: 5, right: 30, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="months" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af">
                <Label
                  value="Jumlah Pesanan"
                  angle={-90}
                  position="left"
                  offset={30}
                  style={{ textAnchor: 'middle', fontWeight: 'bold', fill: 'black', fontSize: '15px' }}
                />
              </YAxis>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Bar dataKey="pesanan" fill="#10b981" radius={[8, 8, 0, 0]} name="Pesanan" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </DashboardLayout>
  );
}