import React, { useState, useEffect, useMemo } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react"; // Import Search icon
import ManagedDataTable from "../tabel/managed-data-table";
import { getMethodColumns } from "./analyses-method-colums";
import { getClientOrderColumns } from "./client-colums";

export default function OrdersForm({
    clients,
    methods,
    orderNumber,
    data,
    setData,
}) {
    const [isMethodDialogOpen, setIsMethodDialogOpen] = useState(false);
    const [dialogClientOpen, setDialogClientOpen] = useState(false);
    const [dialogSelectedMethods, setDialogSelectedMethods] = useState([]);

    useEffect(() => {
        if (isMethodDialogOpen) {
            setDialogSelectedMethods(
                (data.metodeAnalisis || []).map((m) => ({ ...m }))
            );
        }
    }, [isMethodDialogOpen, data.metodeAnalisis]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    // Fungsi yang dipanggil saat tombol "Pilih Klien" di klik ATAU saat input diubah (jika ingin membuka dialog saat mengetik)
    const handleOpenClientDialog = () => {
        setDialogClientOpen(true);
    };

    // Fungsi baru untuk menangani pemilihan klien dari dialog
    const handleSelectClient = (client) => {
        setData((prev) => ({
            ...prev,
            selectedKlien: client,
            nomorOrder: orderNumber,
        }));
        setDialogClientOpen(false); // Tutup dialog
    };

    // --- Logika Penanganan Metode Analisis (Tetap) ---

    const handleOpenDialog = () => {
        setIsMethodDialogOpen(true);
    };

    const handleDialogChange = (open) => {
        if (!open) {
            setDialogSelectedMethods(
                (data.metodeAnalisis || []).map((m) => ({ ...m }))
            );
        }
        setIsMethodDialogOpen(open);
    };

    const handleSelectionUpdate = (selectedMethod) => {
        setDialogSelectedMethods((prev) => {
            const exists = prev.find((m) => m.id === selectedMethod.id);
            return exists
                ? prev.filter((m) => m.id !== selectedMethod.id)
                : [...prev, { ...selectedMethod }];
        });
    };

    const handleTambahkanMetode = () => {
        const normalized = dialogSelectedMethods.map((s) =>
            s.hasOwnProperty("value") ? s : { ...s, value: "" }
        );

        setData((prev) => ({
            ...prev,
            metodeAnalisis: normalized,
        }));
        setDialogSelectedMethods(normalized);
        setIsMethodDialogOpen(false);
    };

    const handleRemoveMethod = (methodId) => {
        const updatedMethods = data.metodeAnalisis.filter(
            (m) => m.id !== methodId
        );
        setData((prev) => ({
            ...prev,
            metodeAnalisis: updatedMethods,
        }));
    };

    const handleMethodDescChange = (methodId, description) => {
        setData((prev) => {
            const updated = (prev.metodeAnalisis || []).map((m) =>
                m.id === methodId ? { ...m, description } : m
            );
            return { ...prev, metodeAnalisis: updated };
        });
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(number);
    };

    const totalHarga = useMemo(() => {
        return data.metodeAnalisis.reduce(
            (sum, method) => sum + (method.price || 0),
            0
        );
    }, [data.metodeAnalisis]);

    useEffect(() => {
        setData((prev) => ({
            ...prev,
            totalHarga: totalHarga,
        }));
    }, [totalHarga, setData]);

    return (
        <div className="p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
                {/* Left Column - Nomor Order & Pilih Klien */}
                <div className="space-y-6">
                    {/* Header Langkah 1 */}
                    <div className="flex items-center space-x-4 mb-8">
                        <span className="flex items-center justify-center w-10 h-10 text-white bg-teal-500 rounded-full font-bold">
                            1
                        </span>
                        <h2 className="text-xl font-bold text-gray-800">
                            Klien dan Order
                        </h2>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Nomor Order
                        </label>
                        <div
                            className="w-full px-4 py-3 bg-gray-100 border border-gray-300
                            rounded-lg text-gray-700 font-medium"
                        >
                            {orderNumber}
                        </div>
                    </div>

                    {/* Input Pilih Klien dengan Tombol Dialog */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold">
                            Pilih Klien
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                name="selectedKlien"
                                value={data.selectedKlien?.name}
                                onChange={handleChange}
                                placeholder="Pilih klien dari daftar..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                               focus:outline-none focus:ring-2 focus:ring-teal-500
                               focus:border-transparent cursor-pointer"
                                readOnly // Agar tidak bingung apakah harus diketik atau klik tombol
                                onClick={handleOpenClientDialog}
                            />
                        </div>
                    </div>

                    {/* Informasi Klien yang Dipilih (Tetap) */}
                    <div className="space-y-3 pt-2">
                        {/* ... (Konten Informasi Klien Tetap) ... */}
                        <div>
                            <p className="text-xs font-medium text-gray-500">
                                Nama
                            </p>
                            <p className="text-gray-700 font-semibold">
                                {data.selectedKlien
                                    ? data.selectedKlien.name
                                    : "-"}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500">
                                Email
                            </p>
                            <p className="text-gray-700 font-semibold">
                                {data.selectedKlien
                                    ? data.selectedKlien.email
                                    : "-"}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500">
                                Nomor
                            </p>
                            <p className="text-gray-700 font-semibold">
                                {data.selectedKlien
                                    ? data.selectedKlien.phone_number
                                    : "-"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column - Judul Order & Metode Analisis (Tetap) */}
                <div className="space-y-6">
                    {/* ... (Konten Judul Order dan Metode Analisis Tetap) ... */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Judul Order
                        </label>
                        <input
                            type="text"
                            name="judulOrder"
                            value={data.judulOrder}
                            onChange={handleChange}
                            placeholder="Masukkan judul order"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-teal-500
                           focus:border-transparent"
                        />
                    </div>

                    {/* Bagian Metode Analisis dengan Tombol Dialog */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-semibold">
                                Metode Analisis
                            </label>
                            <button
                                type="button"
                                onClick={handleOpenDialog}
                                className="px-3 py-1.5 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-md transition-colors text-xs"
                            >
                                Pilih Metode
                            </button>
                        </div>

                        {/* Kotak daftar metode yang dipilih */}
                        <div className="border border-gray-300 rounded-lg p-4 bg-white space-y-3">
                            {data.metodeAnalisis.length > 0 ? (
                                data.metodeAnalisis.map((method, index) => (
                                    <div key={method.id} className="pb-3">
                                        <div className="flex items-start justify-between">
                                            <p className="font-semibold text-sm">
                                                {index + 1}.{" "}
                                                {method.analyses_method}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-bold text-teal-600 ml-1">
                                                    {formatRupiah(method.price)}
                                                </p>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleRemoveMethod(
                                                            method.id
                                                        )
                                                    }
                                                    className="text-red-500 hover:text-red-700 flex items-center"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                        <input
                                            type="text"
                                            value={method.description ?? ""}
                                            onChange={(e) =>
                                                handleMethodDescChange(
                                                    method.id,
                                                    e.target.value
                                                )
                                            }
                                            placeholder="masukkan deskripsi"
                                            className="w-full text-sm px-2 py-1 mt-2 border border-gray-200 rounded-md bg-white focus:ring-teal-500"
                                        />
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-400 text-center py-6">
                                    Belum ada metode analisis dipilih
                                </p>
                            )}

                            {data.metodeAnalisis.length > 0 && (
                                <div className="text-right pt-3 border-t border-gray-300 mt-3">
                                    <span className="text-md font-bold text-gray-800">
                                        Total Harga: {formatRupiah(totalHarga)}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={dialogClientOpen} onOpenChange={handleSelectClient}>
                <DialogContent className="max-w-4xl flex flex-col max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>Pilih Klien</DialogTitle>
                        <DialogDescription>
                            Cari dan pilih klien yang akan dibuatkan order.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex-grow overflow-y-auto">
                        <ManagedDataTable
                            data={clients}
                            columns={getClientOrderColumns({
                                onSelectClient: handleSelectClient,
                            })}
                            showFilter={false}
                            showSearch={true}
                            showCreate={false}
                            pageSize={5}
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDialogClientOpen(false)}
                            className="bg-gray-200 hover:bg-gray-300"
                        >
                            Tutup
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Dialog Pilih Metode Analisis (Tetap) */}
            <Dialog open={isMethodDialogOpen} onOpenChange={handleDialogChange}>
                <DialogContent className="max-w-4xl flex flex-col max-h-[90vh]">
                    {/* ... (Konten Dialog Metode Analisis Tetap) ... */}
                    <DialogHeader>
                        <DialogTitle>Pilih Metode Analisis</DialogTitle>
                        <DialogDescription className="sr-only">
                            Dialog untuk memilih metode analisis yang akan
                            ditambahkan ke order
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex-grow overflow-y-auto">
                        <ManagedDataTable
                            data={methods}
                            columns={getMethodColumns({
                                selectedMethods: dialogSelectedMethods,
                                onSelectMethod: handleSelectionUpdate,
                            })}
                            showFilter={false}
                            showSearch={true}
                            showCreate={false}
                            pageSize={5}
                        />
                    </div>

                    <DialogFooter className="flex justify-between">
                        <Button
                            variant="outline"
                            onClick={() => setIsMethodDialogOpen(false)}
                            className="bg-gray-200 hover:bg-gray-300"
                        >
                            Tutup
                        </Button>
                        <Button
                            onClick={handleTambahkanMetode}
                            disabled={dialogSelectedMethods.length === 0}
                            className="!bg-teal-500 hover:!bg-teal-600"
                        >
                            Tambahkan ({dialogSelectedMethods.length})
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
