// resources/js/pages/client/history/index.jsx
import React from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Link } from "@inertiajs/react";
import {
  ChevronsLeft, FlaskConical, ClipboardCheck, RotateCw, PackageCheck,
  Clock, CalendarDays, CheckCircle2, Loader2, XCircle,
} from "lucide-react";
import { useClientHistory } from "@/hooks/useClientHistory";

export default function HistoryPage({ auth, orderId }) {
  console.log("props dari Inertia:", orderId);
  const { order, statuses, isLoading, isError, errorMessage } =
    useClientHistory(orderId);

  const iconMap = {
    received: FlaskConical,
    approved: ClipboardCheck,
    pending: Clock,
    in_progress: RotateCw,
    completed: PackageCheck,
    disapproved: XCircle,
  };

  if (isLoading) {
    return (
      <DashboardLayout
        title="Riwayat"
        header="Memuat Data..."
      >
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-10 h-10 animate-spin text-primary-hijauTua" />
        </div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout title="Riwayat">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <XCircle className="w-12 h-12 text-red-500 mb-4" />
          <p className="text-lg font-semibold text-red-600">
            {errorMessage}
          </p>
          <Link
            href="/client"
            className="mt-6 bg-primary-hijauTua hover:bg-primary-hijauGelap text-white px-6 py-3 rounded-xl shadow-lg"
          >
            Kembali
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const activeStatuses = statuses.filter((s) => s.is_active);
  const progressPercent =
    statuses.length > 0
      ? (activeStatuses.length / statuses.length) * 100
      : 0;

  return (
    <DashboardLayout
      title={`Riwayat ${order?.order_number || ""}`}
      header="Status Pesanan Anda"
    >
      <div className="w-full flex flex-col px-8 pt-8 pb-6 bg-gradient-to-br from-primary-hijauTerang via-white to-primary-toska overflow-auto rounded-3xl shadow-xl border border-primary-hijauPudar min-h-[75vh]">
        {/* Header Order */}
        <div className="flex-shrink-0 mb-8">
          <div className="inline-flex items-center gap-3 bg-primary-hijauTua text-white px-6 py-3 rounded-2xl shadow-md">
            <div className="w-2 h-2 rounded-full bg-primary-hijauMuda animate-pulse" />
            <span className="text-lg font-bold tracking-wide">
              Kode Order: {order?.order_number || "M-XX"}
            </span>
          </div>
        </div>

        {/* Timeline */}
        <div className="flex-grow flex flex-col justify-center w-full">
          <div className="relative w-full py-8 overflow-x-auto">
            <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16 min-w-max px-6">
              <div className="hidden lg:block absolute top-[52px] left-0 right-0 h-1.5 bg-primary-hijauPudar rounded-full">
                <div
                  className="h-full bg-gradient-to-r from-primary-hijauTua to-primary-hijauMuda rounded-full transition-all duration-1000"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {statuses.map((item, index) => {
                const Icon = iconMap[item.name] || FlaskConical;
                return (
                  <div
                    key={index}
                    className="relative z-10 flex flex-row lg:flex-col items-center text-left lg:text-center gap-4 lg:gap-0 flex-shrink-0 group"
                  >
                    <div
                      className={`relative w-16 h-16 top-5 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300
                      ${
                        item.is_active
                          ? "bg-white border-4 border-primary-hijauTua text-primary-hijauTua shadow-lg scale-110"
                          : "bg-primary-hijauTua text-white border-4 border-primary-hijauMuda shadow-md"
                      }`}
                    >
                      <Icon size={28} strokeWidth={2.5} />
                      {item.is_active && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary-hijauMuda rounded-full flex items-center justify-center border-2 border-white">
                          <CheckCircle2
                            size={14}
                            className="text-white"
                            strokeWidth={3}
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 lg:flex-none lg:mt-10">
                      <h3
                        className={`text-base font-bold mb-2 transition-colors ${
                          item.is_active
                            ? "text-primary-hijauTua"
                            : "text-primary-hijauGelap"
                        }`}
                      >
                        {item.label}
                      </h3>
                      <div className="flex justify-center items-center gap-2 text-sm text-primary-hijauTua/70">
                        <CalendarDays size={16} />
                        <span className="whitespace-nowrap font-medium">
                          {new Date(order?.updated_at).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 w-full flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 mt-6 border-t-2 border-primary-hijauPudar">
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-md border border-primary-hijauPudar">
            <div className="w-10 h-10 rounded-xl bg-primary-hijauTua flex items-center justify-center">
              <Clock size={20} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-primary-hijauTua/60 font-medium">
                Estimasi
              </span>
              <span className="text-xl font-bold text-primary-hijauTua">
                {order?.estimasi || "-"}
              </span>
            </div>
          </div>

          <Link
            href="/client"
            className="bg-primary-hijauTua hover:bg-primary-hijauGelap text-white font-semibold py-3 px-8 rounded-2xl flex items-center gap-3 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            <ChevronsLeft size={20} />
            <span>Kembali</span>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
