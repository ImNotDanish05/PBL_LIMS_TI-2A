import React from "react";
import ManagedDataTable from "../tabel/managed-data-table";
import { getSampleSelectedColumnsOrder } from "./sample-order-colums";
import { getMethodSelectedColumns } from "./analyses-method-colums";

const HeaderBar = ({ title }) => (
    <div className="bg-primary-hijauTua hover:bg-primary-hijauTuas rounded-lg p-3 shadow-md mb-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
);

const DetailRow = ({ label, value }) => (
    <div className="flex justify-start items-start py-1">
        <p className="text-gray-700 w-32 font-semibold">{label}</p>
        <span className="mr-4">:</span>
        <p className="text-gray-800 flex-1">{value || "-"}</p>
    </div>
);

const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(number);
};

export default function OrderForms3({ data }) {
    const klien = data.selectedKlien || {};
    const sampletext =
        data.samples.length > 0
            ? data.samples.map((m) => m.name).join(", ")
            : "-";
    const metodeAnalisisText =
        data.metodeAnalisis.length > 0
            ? data.metodeAnalisis.map((m) => m.analyses_method).join(", ")
            : "-";
    return (
        <div className="p-6 min-h-screen font-sans">
            <div className="rounded-xl">
                {/* --- Bagian Klien --- */}
                <div className="mb-8">
                    <HeaderBar title="Client" />
                    <div className="px-4 py-2 space-y-2">
                        <DetailRow label="ID" value={klien.id} />
                        <DetailRow label="Nama" value={klien.name} />
                        <DetailRow label="Alamat" value={klien.address} />
                        <DetailRow
                            label="Nomor HP"
                            value={klien.phone_number}
                        />
                    </div>
                </div>

                {/* --- Bagian Order --- */}
                <div>
                    <HeaderBar title="Order" />
                    <div className="px-4 py-2 space-y-2">
                        <DetailRow
                            label="Nomor Order"
                            value={data.nomorOrder}
                        />
                        <DetailRow
                            label="Judul Order"
                            value={data.judulOrder}
                        />
                        <DetailRow label="Tipe Order" value={data.tipeOrder} />
                        <DetailRow label="Catatan" value={data.catatan} />
                        <DetailRow
                            label="Metode Analisis"
                            value={metodeAnalisisText}
                        />
                    </div>

                    {/* --- Tabel Analyses Method --- */}
                    <div className="mb-6">
                        <ManagedDataTable
                            data={data.metodeAnalisis}
                            columns={getMethodSelectedColumns}
                            showFilter={false}
                            showSearch={false}
                            showCreate={false}
                        />
                    </div>
                    <div className="px-4 py-2 space-y-2">
                        <DetailRow label="Samples" value={sampletext} />
                    </div>
                    {/* --- Tabel Sample --- */}
                    <div className="mb-6">
                        <ManagedDataTable
                            data={data.samples}
                            columns={getSampleSelectedColumnsOrder}
                            showFilter={false}
                            showSearch={false}
                            showCreate={false}
                        />
                    </div>

                    {/* --- Tanggal dan Estimasi --- */}
                    <div className="px-4 py-2 space-y-2">
                        <DetailRow
                            label="Tanggal Masuk"
                            value={data.tanggalOrder}
                        />
                        <DetailRow
                            label="Total Harga"
                            value={formatRupiah(data.totalHarga)}
                        />
                        <DetailRow
                            label="Estimasi Selesai"
                            value={data.estimasiSelesai}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
