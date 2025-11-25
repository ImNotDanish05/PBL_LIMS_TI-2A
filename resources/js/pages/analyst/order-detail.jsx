import React, { useState, useMemo } from 'react';
import DashboardLayout from "@/components/layouts/dashboard-layout";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { Link } from '@inertiajs/react';
import { samples } from "@/data/client/samples";
import { getSampleColumns } from "@/components/shared/analyst/sample-columns";
import SampleDetailsDialog from "@/components/shared/dialog/sample-detail-dialog";
import { Button } from '@/components/ui/button';
import SampleConfirmDialog from "@/components/shared/dialog/sample-confirm-dialog";
import SampleUnConfirmDialog from "@/components/shared/dialog/sample-unconfirm-dialog";
import { FileDown, FileUp } from "lucide-react";


const details = () => {

    const user = {
        name: 'Nardo',
        role: 'Analyst',
        avatar: 'https://i.pravatar.cc/150?img=3',
    }

    // --- Data Detail Pemesanan ---
    const orderDetails = [
        { label: 'ID Pemesanan', value: 'M - 10' },
        { label: 'ID klien', value: '1234' },
        { label: 'Judul', value: 'Gas Metabolisme Tubuh' },
        { label: 'Tipe Pemesanan', value: 'Urgent' },
        { label: 'Metode Analisis', value: 'Basah' },
        { label: 'Tanggal Order', value: '10/10/2000' },
        { label: 'Estimasi Selesai', value: '23/10/2000' },
        { label: 'Nilai Hasil', value: '98' },
        { label: 'Waktu Laporan', value: '10/10/2000 11:14:45' },
        { label: 'Catatan', value: 'Cukup baik' },
        { label: 'Status', value: 'Completed' },
    ];

    const filterData = [
        { value: "all", label: "All Status" },
        { value: "Done", label: "Done" },
        { value: "In Progress", label: "In Progress" },
    ]

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [selectedSample, setSelectedSample] = useState(null);

    const handleShowDetail = (sample) => {
        setSelectedSample(sample);
        setIsDialogOpen(true);
    };

    const handleShowConfirm = (sample) => {
        setSelectedSample(sample);
        setIsConfirmDialogOpen(true);
    };

    const handleConfirmAction = (sample) => {
        console.log("Sampel diselesaikan:", sample);
        sample.status = "Done";
        setIsConfirmDialogOpen(false);
    };

    const [isUnConfirmDialogOpen, setIsUnConfirmDialogOpen] = useState(false);

    const handleShowUnConfirm = (sample) => {
        setSelectedSample(sample);
        setIsUnConfirmDialogOpen(true);
    };

    const handleUnConfirmAction = (sample) => {
        console.log("Sampel dibatalkan statusnya:", sample);
        sample.status = "In Progress"; // atau sesuai kebutuhan
        setIsUnConfirmDialogOpen(false);
    };
        

    const columns = useMemo(() => getSampleColumns({  onShowDetail: handleShowDetail, onShowConfirm: handleShowConfirm, onShowUnConfirm: handleShowUnConfirm }), []);

    return (
        <DashboardLayout title="Analyst" user={user} header='Selamat Datang Analyst!'>
            <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 text-primary-hijauTua p-4">

                {/* --- Bagian 1: Detail Pemesanan --- */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <h2 className="text-xl font-bold mb-5 text-gray-800">Detail Pemesanan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-y-2 text-sm font-medium">
                        {orderDetails.map((item, index) => (
                            <React.Fragment key={index}>
                                <span className="text-gray-600">{item.label}</span>
                                <span className="ml-2">: {item.value}</span>
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Unduh Laporan */}
                <div className="bg-white rounded-xl shadow-md p-5 flex items-center justify-between ">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary-hijauMuda/30">
                    <FileDown className="text-primary-hijauTua" size={20} />
                    </div>
                    <div>
                    <p className="text-sm font-semibold text-gray-800">Laporan Pengujian</p>
                    <p className="text-xs text-gray-500">File PDF tersedia</p>
                    </div>
                </div>

                <a
                    href="/files/laporan.pdf"
                    download
                    className="px-3 py-1.5 rounded-lg bg-primary-hijauTua text-white text-sm hover:bg-primary-hijauTua/90"
                >
                    Download
                </a>
                </div>

                {/* Upload / Ganti Laporan */}
                <div className="bg-white rounded-xl shadow-md p-5 flex items-center justify-between mt-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary-hijauMuda/30">
                    <FileUp className="text-primary-hijauTua" size={20} />
                    </div>
                    <div>
                    <label className="text-sm font-semibold text-gray-800">
                        Upload / Ganti Laporan
                    </label>
                    <p className="text-xs text-gray-500">Format PDF</p>
                    </div>
                </div>

                <label className="px-3 py-1.5 rounded-lg bg-gray-200 text-sm text-gray-700 cursor-pointer hover:bg-gray-300">
                    Pilih File
                    <input type="file" accept="application/pdf" className="hidden" />
                </label>
                </div>


                <ManagedDataTable
                    data={samples}
                    columns={columns}
                    searchColumn="name"
                    showFilter={true}
                    filterColumn="status"
                    filterOptions={filterData}
                />

                <SampleDetailsDialog
                    sample={selectedSample}
                    isOpen={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                />

                <SampleConfirmDialog
                    sample={selectedSample}
                    isOpen={isConfirmDialogOpen}
                    onOpenChange={setIsConfirmDialogOpen}
                    onConfirm={handleConfirmAction}
                />

                <SampleUnConfirmDialog
                    sample={selectedSample}
                    isOpen={isUnConfirmDialogOpen}
                    onOpenChange={setIsUnConfirmDialogOpen}
                    onUnconfirm={handleUnConfirmAction}
                />

                <div className="w-full flex justify-end mt-4">
                    <Button className="bg-primary-hijauTua">
                        <Link
                            href="/analyst/order"
                            >
                            Kembali
                        </Link>
                    </Button>
                </div>
            </div>

        </DashboardLayout>
    )
}

export default details;
